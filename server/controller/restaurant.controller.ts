import { Request, Response } from "express";
import mongoose from "mongoose";
import { Menu } from "../models/menu.model";
import { Order } from "../models/order.model";
import { Restaurant } from "../models/restaurant.model";
import { Review } from "../models/review.model";
import cloudinary from "../utils/cloudinary";
import uploadImageOnCloudinary from "../utils/imageUpload";

// Create a new restaurant controller
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      address,
      country,
      openingHours,
      closingHours,
      deliveryTime,
      cuisines,
    } = req.body;
    const file = req.file;

    if (
      !restaurantName ||
      !city ||
      !address ||
      !country ||
      !openingHours ||
      !closingHours ||
      !deliveryTime ||
      !cuisines ||
      !file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "You already have a restaurant",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    const newRestaurant = await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      address,
      country,
      openingHours,
      closingHours,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: `Restaurant ${restaurantName} created successfully`,
      newRestaurant,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get restaurant of user
export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id })
      .populate("menus") // Populate menus
      .populate({
        path: "reviews",
        populate: [
          {
            path: "user",
            select: "fullname email",
          },
          {
            path: "comments.user",
            select: "fullname email",
          },
          {
            path: "comments.replies.user",
            select: "fullname email",
          },
          {
            path: "comments.likes.user",
            select: "fullname email",
          },
        ],
      });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        restaurant: [],
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a specific single restaurant by user ID
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      address,
      country,
      openingHours,
      closingHours,
      deliveryTime,
      cuisines,
    } = req.body;
    const file = req.file;

    // Find restaurant by user ID
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Update fields if provided
    restaurant.restaurantName = restaurantName || restaurant.restaurantName;
    restaurant.city = city || restaurant.city;
    restaurant.address = address || restaurant.address;
    restaurant.country = country || restaurant.country;
    restaurant.openingHours = openingHours || restaurant.openingHours;
    restaurant.closingHours = closingHours || restaurant.closingHours;
    restaurant.deliveryTime = deliveryTime || restaurant.deliveryTime;
    restaurant.cuisines =
      typeof cuisines === "string"
        ? JSON.parse(cuisines)
        : cuisines || restaurant.cuisines;
    restaurant.lastUpdated = new Date();

    // If user uploaded a new image
    if (file) {
      try {
        if (restaurant.imageUrl) {
          const oldImagePublicId = restaurant.imageUrl
            .split("/")
            .pop()
            ?.split(".")[0];
          if (oldImagePublicId) {
            await cloudinary.uploader.destroy(
              `Food-Restaurant_ZaykaHub/restaurants/${oldImagePublicId}`
            );
          }
        }

        // Upload new image to Cloudinary
        const imageUrl = await uploadImageOnCloudinary(
          file as Express.Multer.File
        );
        restaurant.imageUrl = imageUrl;
      } catch (imgError) {
        console.error("Error updating image:", imgError);
      }
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Restaurant Orders
export const getRestaurantOrder = async (req: Request, res: Response) => {
  try {
      const restaurant = await Restaurant.findOne({ user: req.id });
      if (!restaurant) {
          return res.status(404).json({
              success: false,
              message: "Restaurant not found"
          })
      };
      const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
      return res.status(200).json({
          success: true,
          orders
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" })
  }
}

// Update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
          return res.status(404).json({
              success: false,
              message: "Order not found"
          })
      }
      order.status = status;
      await order.save();
      return res.status(200).json({
          success: true,
          status:order.status,
          message: "Status updated"
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" })
  }
}

// Search Restaurant
export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query: any = {};

    // console.log(searchText, searchQuery, selectedCuisines);

    // Basic search based on restaurantName, city, address, or country
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { address: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    // Apply searchQuery without overwriting previous $or
    if (searchQuery) {
      query.$or = query.$or || [];
      query.$or.push(
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } }
      );
    }
    // console.log("Query:", query);
    // ["momos", "pizza", "burger"]

    // Apply cuisine filter only if valid cuisines exist
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query);
    // console.log("Results found:", restaurants.length);

    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Restaurant
export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurant ID",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId)
      .populate({ path: "menus", options: { sort: { createdAt: -1 } } }) // Sort menus by createdAt
      .populate("user", "name email") // Fetch restaurant owner details
      .populate({
        path: "reviews.user",
        select: "name email",
      });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error in getSingleRestaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Restaurants with Pagination
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const restaurants = await Restaurant.find({})
      .populate("user", "name email") // Fetch owner details
      .populate("menus") // Fetch menus
      .populate({
        path: "reviews.user",
        select: "name email",
      })
      .skip(skip)
      .limit(limit);

    const totalRestaurants = await Restaurant.countDocuments();

    return res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalRestaurants / limit),
      totalRestaurants,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error in getAllRestaurants:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Restaurant and its associated data
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    // Ensure the user ID is valid
    if (!req.id || !mongoose.Types.ObjectId.isValid(req.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Find the restaurant associated with the user
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Extract Image Public ID for Cloudinary deletion
    let imagePublicId = null;
    if (restaurant.imageUrl) {
      const imageParts = restaurant.imageUrl.split("/");
      imagePublicId = imageParts.pop()?.split(".")[0]; // Extract file name without extension
    }

    // Delete related data concurrently using Promise.all()
    await Promise.all([
      Menu.deleteMany({ restaurant: restaurant._id }),
      Order.deleteMany({ restaurant: restaurant._id }),
      Review.deleteMany({ restaurant: restaurant._id }),
      imagePublicId
        ? cloudinary.uploader.destroy(
            `Food-Restaurant_ZaykaHub/restaurants/${imagePublicId}`
          )
        : Promise.resolve(),
    ]);

    // Delete the restaurant itself
    await restaurant.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Restaurant and all related data (menus, orders, reviews) deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
