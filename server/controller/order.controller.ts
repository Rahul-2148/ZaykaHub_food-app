// 4242424242424242

import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";
import { sendOrderConfirmationEmail } from "../Emails/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  restaurantId: string;
  totalAmount: number;
  orderedDate: Date;
};

// Create checkout session for stripe
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    console.log(checkoutSessionRequest);
    const frontendUrl = process.env.FRONTEND_ORIGIN || process.env.FRONTEND_URL || "http://localhost:5173";

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menus");
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

      // Generate unique order ID
      const orderId = 'ORD' + Date.now();

    const order: any = new Order({
      orderId,
      restaurant: restaurant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      totalAmount: checkoutSessionRequest.totalAmount,
      orderedDate: checkoutSessionRequest.orderedDate,
      status: "Pending",
    });

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating order" });
    }

    // line items
    const menuItems = restaurant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    // Save order first to get _id
    await order.save();

    // ✅ Now update restaurant's order list
    restaurant.orders.push(order._id);
    await restaurant.save();

    // Now create Stripe session with correct orderId
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN", "GB", "US", "CA"],
      },
      line_items: lineItems,
      // line_items: [
      //   {
      //     price_data: {
      //       currency: "inr",
      //       product_data: {
      //         name: "Your Product",
      //         images: ["https://bit.ly/example-image"], // Use a single shortened URL
      //       },
      //       unit_amount: 100000 * 100, // Example price in rupees
      //     },
      //     quantity: 1,
      //   },
      // ],
      metadata: {
        // orderId: "123456",
        // imageRef: "img_001", // Store an ID instead of long URLs
        orderId: order._id.toString(),
        imageRef: order._id.toString(), // Store an ID instead of long URLs
      },
      mode: "payment",
      success_url: `${frontendUrl}/order/status`,
      cancel_url: `${frontendUrl}/cart`,
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Send order confirmation email
    await sendOrderConfirmationEmail(
      checkoutSessionRequest.deliveryDetails.email,
      orderId,
      checkoutSessionRequest.orderedDate.toString(),
      checkoutSessionRequest.deliveryDetails.name,
      checkoutSessionRequest.cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity, 
        price: item.price, 
      })),
      checkoutSessionRequest.totalAmount
    );
    
    await order.save();

    console.log(session);
    console.log(session.url);
    console.log(order);
    console.log(order.status);

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};

// Handle stripe webhook
export const stripeWebhook = async (req: Request, res: Response) => {
  let event: Stripe.Event;

  try {
    const signature = req.headers["stripe-signature"];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    if (!signature) {
      return res.status(400).send("Missing stripe-signature header");
    }

    // Webhook route should receive raw request body (Buffer)
    const payload = req.body as Buffer;
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) {
        return res.status(400).json({ message: "Missing orderId in session metadata" });
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (session.amount_total) {
        order.totalAmount = session.amount_total / 100;
      }

      order.status = "Confirmed";
      await order.save();
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Failed to process payment webhook" });
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
};

// Create line items and send them
export const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: any
) => {
  // 1. create line items
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error(`Menu item id not found`);

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  // 2. return lineItems
  return lineItems;
};

// Get all orders (kn sa user kis restaurant me kya menu order kiya h)
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user", "fullname email contact")
      .populate("restaurant");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders" });
  }
};
