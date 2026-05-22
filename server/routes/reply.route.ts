import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { RequestHandler } from "express-serve-static-core";
import { addReply, deleteReply, editReply } from "../controller/reply.controller";

const router = express.Router();

// post Reply Routes
router.post("/add-reply", isAuthenticated as unknown as RequestHandler, addReply as unknown as RequestHandler);

// Edit Reply Route
router.put("/:replyId", isAuthenticated as unknown as RequestHandler, editReply as unknown as RequestHandler);

// Delete Reply Route
router.delete(
  "/:replyId",
  isAuthenticated as unknown as RequestHandler,
  deleteReply as unknown as RequestHandler
);

export default router;
