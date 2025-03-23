import mongoose, { Document } from "mongoose";

export interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  address: string;
  country: string;
  openingHours: string;
  closingHours: string;
  deliveryTime: string;
  cuisines: string[];
  imageUrl: string;
  lastUpdated?: Date;
  menus: mongoose.Schema.Types.ObjectId[];
  orders: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[]; // Review IDs only
}

export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    closingHours: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String || Number,
      required: true,
    },
    cuisines: [{ type: String, required: true }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    imageUrl: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference Only
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
