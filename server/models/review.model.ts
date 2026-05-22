import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  rating: number;
  comments: mongoose.Types.ObjectId[]; // ✅ Reviews will have comments
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // ✅ Reviews will contain comments
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
