import express, { RequestHandler } from "express";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated";
import {
  addMenu,
  deleteAllMenus,
  deleteMenu,
  editMenu,
} from "../controller/menu.controller";
import upload from "../middlewares/multer";

const router = express.Router();

// add menu route
router
  .route("/add-menu")
  .post(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    upload.single("image"),
    addMenu as unknown as RequestHandler
  );

// edit menu route
router
  .route("/:id")
  .put(
    isAuthenticated as unknown as RequestHandler,
    upload.single("image"),
    editMenu as unknown as RequestHandler
  );

// single menu delete route
router
  .route("/delete-menu/:id")
  .delete(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    deleteMenu as unknown as RequestHandler
  );

// multiple menus delete route
router
  .route("/delete/menus")
  .delete(
    isAuthenticated as unknown as RequestHandler,
    isAdmin as unknown as RequestHandler,
    deleteAllMenus as unknown as RequestHandler
  );

export default router;
