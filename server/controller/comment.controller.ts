import { Request, Response } from "express";
import { Comment } from "../models/comment.model";
import mongoose from "mongoose";

// ➤ Add a new comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const { reviewId, text } = req.body;
    const userId = req.id; // Assuming user ID is stored in `req.user`

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newComment = new Comment({
      user: userId,
      review: reviewId,
      text,
      likes: [],
      replies: [],
    });

    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// ➤ Edit a comment
export const editComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to edit this comment" });
    }

    comment.text = text;
    await comment.save();

    res
      .status(200)
      .json({ success: true, message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// get comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const comments = await Comment.find({ review: reviewId }).populate( 
      "user",
      "fullname email"
    );
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// like/unlike toggle style controller
export const likeUnlikeComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Toggle Like
    const index = comment.likes.indexOf(new mongoose.Types.ObjectId(userId));
    if (index === -1) {
      comment.likes.push(new mongoose.Types.ObjectId(userId)); // Like
    } else {
      comment.likes.splice(index, 1); // Unlike
    }

    await comment.save();

    res.status(200).json({ success: true, message: "Like status updated", likes: comment.likes.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


// ➤ Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.id;

    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const comment = await Comment.findById(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized to delete this comment",
        });
    }

    await comment.deleteOne();
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
