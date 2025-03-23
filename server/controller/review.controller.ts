import { Request, Response } from "express";
import { Review } from "../models/review.model";
import { Comment } from "../models/comment.model";
import { Restaurant } from "../models/restaurant.model"; // ✅ Import Restaurant Model

// ➤ Add a new review
export const addRating = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;
    const { restaurant } = req.params;
    const userId = req.id; // ✅ Assuming `req.id` contains authenticated user ID

    if (!restaurant) {
      return res.status(400).json({ success: false, message: "Missing restaurant ID" });
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ **Step 1: Pehle Restaurant Exist Hai Ya Nahi Check Kar**
    const existingRestaurant = await Restaurant.findById(restaurant);
    if (!existingRestaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    // ✅ **Step 2: Review Create Karna**
    const newReview = new Review({
      user: userId,
      rating,
      restaurant,
    });

    await newReview.save(); // ✅ **Review save karna bhool mat**

    res.status(201).json({ success: true, message: "Review added", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// edit rating controller
export const editRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;
    const { rating } = req.body;
    const userId = req.id;

    const review = await Review.findById(ratingId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    review.rating = rating;
    await review.save();
    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}

// ✅ Get All Reviews for a Restaurant
export const getRatings = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const ratings = await Review.find({ restaurant: restaurantId })
      .populate("user", "name email") // ✅ Fetch user details
      .populate({
        path: "comments",
        populate: { path: "user", select: "name email" }, // ✅ Populate comments with user details
      });

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Delete a Review (Admin/User who posted)
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { ratingId } = req.params;
    const userId = req.id;

    const review = await Review.findById(ratingId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // ✅ Delete comments linked to this review
    await Comment.deleteMany({ review: ratingId });

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
