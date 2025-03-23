import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      isAdmin?: boolean;
    }
  }
}

// ✅ Middleware: Check if user is authenticated
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;
    // check is decoding was successful
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Middleware: Check if user is an admin
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    // Fetch user from database
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    if (!user.admin) {
      return res.status(403).json({
        success: false,
        message: "User is not authorized or not admin",
      });
    }

    req.isAdmin = user.admin; // ✅ Adding `isAdmin` to request
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
