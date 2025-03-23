import express, { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getOrders,
  stripeWebhook,
} from "../controller/order.controller";

const router = express.Router();

// get orders route
router
  .route("/orders")
  .get(
    isAuthenticated as unknown as RequestHandler,
    getOrders as unknown as RequestHandler
  );

// checkout order route
router
  .route("/checkout/create-checkout-session")
  .post(
    isAuthenticated as unknown as RequestHandler,
    createCheckoutSession as unknown as RequestHandler
  );

// webhook request route
router
  .route("/webhook")
  .post(
    express.raw({ type: "application/json" }),
    stripeWebhook as unknown as RequestHandler
  );

export default router;
