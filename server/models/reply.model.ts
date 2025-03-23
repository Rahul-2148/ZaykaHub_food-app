import mongoose, { Document } from "mongoose";

export interface IReply extends Document {
  user: mongoose.Types.ObjectId;
  comment: mongoose.Types.ObjectId;
  text: string;
}

const replySchema = new mongoose.Schema<IReply>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Reply = mongoose.model<IReply>("Reply", replySchema);
