import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";

export const generateToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict", // for security reasons
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  return token;
};
