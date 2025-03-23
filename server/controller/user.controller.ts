import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import {
  sendAccountDeletionCanceledEmail,
  sendAccountDeletionEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../Emails/email";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import cloudinary from "../utils/cloudinary";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import upload from "../middlewares/multer";

// signup controller business logic
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact, agreeToTerms } = req.body;

    // Check if all required fields are provided
    if (
      !fullname ||
      !email ||
      !password ||
      !contact ||
      agreeToTerms === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including agree to terms.",
      });
    }
    // Check if user has agreed to the terms
    if (!agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: "Please agree to the terms and conditions",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      agreeToTerms,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hour means 1 day expiry
    });
    generateToken(res, user);

    await sendVerificationEmail(email, fullname, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please verify your email",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller Business logic
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    user.lastLogin = new Date();
    user.isRememberMeEnabled = rememberMe;
    await user.save();

    // Token expiry logic
    const tokenExpiry = rememberMe ? "30d" : "7d"; // 30 days if rememberMe, else 7 day
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: tokenExpiry,
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 30 days or 7 day
    });

    // Send user data without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify Email Business logic
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Verification code is required",
      });
    }

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout controller business logic
export const logout = async (_: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot Password Business logic
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email" });
    }

    /* The line `const resetPasswordToken = crypto.randomBytes(20).toString("hex");` is generating a
    random string of 20 bytes and converting it to a hexadecimal format. This random string is
    typically used as a token for resetting a user's password. It provides a secure and unique token
    that can be sent to the user via email for the password reset process. */
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour expiry

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send password reset email
    await sendPasswordResetEmail(
      user.email,
      user.fullname,
      `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Reset Password Business logic
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired reset password token",
      });
    }
    // update password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // send reset success email
    await sendResetSuccessEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully, please login with new password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// check authentication
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// All users controller
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile controller business logic
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, contact, address, city, country, postalCode } =
      req.body;

    // Get existing user data to delete old profile picture
    const existingUser = await User.findById(userId);

    let profilePictureUrl;

    if (req.file) {
      try {
        // ✅ Step 1: Delete Old Profile Picture (If Exists)
        if (existingUser?.profilePicture) {
          const publicId = existingUser.profilePicture
            .split("/")
            .pop()
            ?.split(".")[0]; // Extract public_id
          if (publicId) {
            await cloudinary.uploader.destroy(
              `Food-Restaurant_ZaykaHub/${publicId}`
            );
          }
        }

        // ✅ Step 2: Upload New Profile Picture
        const base64Image = `data:${
          req.file.mimetype
        };base64,${req.file.buffer.toString("base64")}`;
        const cloudResponse = await cloudinary.uploader.upload(base64Image, {
          folder: "Food-Restaurant_ZaykaHub",
          resource_type: "image",
        });

        profilePictureUrl = cloudResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res
          .status(500)
          .json({
            success: false,
            message: "Failed to upload profile picture",
          });
      }
    }

    const updatedData: any = {
      fullname,
      email,
      contact,
      address,
      city,
      country,
      postalCode,
      lastUpdated: new Date(),
    };
    if (profilePictureUrl) updatedData.profilePicture = profilePictureUrl;

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Search User Controller
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // If no query is provided, return all users (with a reasonable limit)
    if (!query) {
      const allUsers = await User.find().select("-password").limit(20); // Limiting to 20 users for performance
      return res.status(200).json(allUsers);
    }

    // Prepare the search condition
    const searchCondition: any = {
      $or: [],
    };

    // Check if the query is numeric (for contact search)
    if (!isNaN(Number(query))) {
      searchCondition.$or.push({ contact: Number(query) });
    } else {
      searchCondition.$or.push(
        { fullname: { $regex: `${query as string}`, $options: "i" } },
        { email: { $regex: `${query as string}`, $options: "i" } },
        { address: { $regex: `${query as string}`, $options: "i" } },
        { city: { $regex: `${query as string}`, $options: "i" } },
        { country: { $regex: `${query as string}`, $options: "i" } }
      );
    }

    // Query the database with the search condition
    const users = await User.find(searchCondition).select("-password");

    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // If users are found, send the result
    return res.status(200).json(users);
  } catch (error) {
    console.error("Search User Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user controller
// Request Account Deletion (Marks for deletion after 15 days)
export const requestAccountDeletion = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate deletion requests
    if (user.deletionDate) {
      return res.status(400).json({
        message:
          "Account deletion already requested. You can cancel before the deadline.",
      });
    }

    // Set deletion date 15 days from now
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 15);

    user.deletionDate = deletionDate;
    await user.save();

    // Send email with cancellation option
    await sendAccountDeletionEmail(
      user.email,
      deletionDate.toISOString(),
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Account deletion requested. You can cancel within 15 days.",
      deletionDate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel Account Deletion (Before 15 Days)
export const cancelAccountDeletion = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure deletion is still cancellable
    if (!user.deletionDate || new Date(user.deletionDate) < new Date()) {
      return res.status(400).json({
        message:
          "Cannot cancel deletion. The 15-day period has passed or was never requested.",
      });
    }

    // Reset deletion date
    user.deletionDate = null;
    await user.save();

    // Send email with cancellation confirmation
    await sendAccountDeletionCanceledEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Account deletion canceled successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Background Job to Delete Expired Users (Optimized with Bulk Delete)
export const deleteExpiredUsers = async () => {
  try {
    const currentDate = new Date();

    // Find users whose deletion date has passed
    const usersToDelete = await User.find({
      deletionDate: { $lte: currentDate },
    });

    if (usersToDelete.length === 0) {
      console.log("No users to delete.");
      return;
    }

    // Delete profile pictures from Cloudinary if present
    for (const user of usersToDelete) {
      if (user.profilePicture) {
        await cloudinary.uploader.destroy(user.profilePicture);
      }
    }

    // Delete users in bulk
    const userIds = usersToDelete.map((user) => user._id);
    await User.deleteMany({ _id: { $in: userIds } });

    console.log(`${usersToDelete.length} users deleted.`);
  } catch (error) {
    console.error("Error deleting expired users:", error);
  }
};

// Email Unsubscribe controller
export const EmailUnSubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    user.isEmailSubscribed = false;
    await user.save();

    return res.send("You have been unsubscribed successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server error.");
  }
};

// Re-Subscribe Email controller
export const EmailReSubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found.");
    }

    user.isEmailSubscribed = true;
    await user.save();

    res.send("You have been re-subscribed successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server error.");
  }
};
