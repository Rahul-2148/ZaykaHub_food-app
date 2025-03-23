import { Request, Response } from "express";
import { Reply } from "../models/reply.model";
import { Comment } from "../models/comment.model";
import mongoose from "mongoose";

// ✅ Add a Reply to a Comment controller
export const addReply = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const { commentId } = req.params;
    const userId = req.id;

    if (!commentId) {
      return res.status(400).json({ success: false, message: "Missing comment ID" });
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Create a new reply
    const newReply = new Reply({
      user: userId,
      comment: commentId,
      text,
    });

    await newReply.save();

    // Push reply into comment
    comment.replies.push(newReply._id as mongoose.Types.ObjectId);
    await comment.save();

    res.status(201).json({ success: true, message: "Reply added", reply: newReply });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


// ✅ Edit a Reply (User/Admin)
export const editReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const { text } = req.body;
    const userId = req.id;

    const reply = await Reply.findById(replyId);
    if (!reply)
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });

    if (reply.user.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    reply.text = text;
    await reply.save();
    res.status(200).json({ success: true, reply });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server error", error });
  }
};

// ✅ Delete a Reply (User/Admin)
export const deleteReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const userId = req.id;

    const reply = await Reply.findById(replyId);
    if (!reply)
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });

    if (reply.user.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await reply.deleteOne();
    res.status(200).json({ success: true, message: "Reply deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
