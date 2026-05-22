import express, { RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  addComment,
  deleteComment,
  editComment,
  likeUnlikeComment,
} from "../controller/comment.controller";

const router = express.Router();

// Post a comment
router.post(
  "/add-comment",
  isAuthenticated as unknown as RequestHandler,
  addComment as unknown as RequestHandler
);

// Edit a comment
router.put(
  "/edit/:commentId",
  isAuthenticated as unknown as RequestHandler,
  editComment as unknown as RequestHandler
);

// Like a comment
router.put(
  "/like/:commentId",
  isAuthenticated as unknown as RequestHandler,
  likeUnlikeComment as unknown as RequestHandler
);

// Delete a comment
router.delete(
  "/:commentId",
  isAuthenticated as unknown as RequestHandler,
  deleteComment as unknown as RequestHandler
);

export default router;
