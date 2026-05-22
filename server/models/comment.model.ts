import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  review: mongoose.Types.ObjectId;
  text: string;
  likes: mongoose.Types.ObjectId[]; // ✅ Users who liked the comment
  replies: mongoose.Types.ObjectId[]; // ✅ Replies to the comment
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ Like System
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }], // ✅ Replies stored here
  },
  { timestamps: true }
);

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
