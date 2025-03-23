import express, { RequestHandler } from "express";
import {
  addRating,
  getRatings,
  deleteRating,
  editRating,
} from "../controller/review.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// add Rating Route
router.post(
  "/add-rating/:restaurantId",
  isAuthenticated as unknown as RequestHandler,
  addRating as unknown as RequestHandler
);

// edit Rating Route
router.put(
  "/edit/:ratingId",
  isAuthenticated as unknown as RequestHandler,
  editRating as unknown as RequestHandler
);

// Get Ratings Route
router.get("/:restaurantId", getRatings);

// Delete Rating Route
router.delete(
  "/:ratingId",
  isAuthenticated as unknown as RequestHandler,
  deleteRating as unknown as RequestHandler
);

export default router;
