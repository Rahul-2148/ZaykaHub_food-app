import express, { RequestHandler } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantOrder,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";

const router = express.Router();

// create a new restaurant route
router
  .route("/create-restaurant")
  .post(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    upload.single("image"),
    createRestaurant as unknown as RequestHandler
  );

//   Get restaurant of user route
router
  .route("/get-restaurant")
  .get(
    isAuthenticated as unknown as RequestHandler,
    getRestaurant as unknown as RequestHandler
  );

// update restaurant route
router
  .route("/update-restaurant")
  .patch(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    upload.single("image"),
    updateRestaurant as unknown as RequestHandler
  );

// get restaurant order
router
  .route("/order")
  .get(
    isAuthenticated as unknown as RequestHandler,
    getRestaurantOrder as unknown as RequestHandler
  );

// update order status
router
  .route("/order/:orderId/status")
  .put(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    updateOrderStatus as unknown as RequestHandler
  );

// search route
router
  .route("/search/:searchText")
  .get(
    isAuthenticated as unknown as RequestHandler,
    searchRestaurant as unknown as RequestHandler
  );

// Get single restaurant by id route
router
  .route("/get-restaurant/:id")
  .get(
    isAuthenticated as unknown as RequestHandler,
    getSingleRestaurant as unknown as RequestHandler
  );

//  Get all restaurants route
router
  .route("/get-all-restaurants")
  .get(
    isAuthenticated as unknown as RequestHandler,
    getAllRestaurants as unknown as RequestHandler
  );

// delete restaurant route
router
  .route("/delete-restaurant/:id")
  .delete(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    deleteRestaurant as unknown as RequestHandler
  );

// // Add review route
// router
//   .route("/:id/review")
//   .post(
//     isAuthenticated as unknown as RequestHandler,
//     addReview as unknown as RequestHandler
//   );

// // Get all reviews route
// router
//   .route("/:id/reviews")
//   .get(
//     isAuthenticated as unknown as RequestHandler,
//     getReviews as unknown as RequestHandler
//   );

// // update review route
// router
//   .route("/:id/reviews")
//   .patch(
//     isAuthenticated as unknown as RequestHandler,
//     updateReview as unknown as RequestHandler
//   );

// // Delete review route (only author and admin can do this
// router
//   .route("/:restaurantId/reviews/:reviewId")
//   .delete(
//     isAuthenticated as unknown as RequestHandler,
//     deleteReview as unknown as RequestHandler
//   );

export default router;
