import express, { RequestHandler } from "express";
import { cancelAccountDeletion, checkAuth, EmailReSubscribe, EmailUnSubscribe, forgotPassword, getAllUsers, login, logout, requestAccountDeletion, resetPassword, searchUsers, signup, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";


const router = express.Router();

// check authentication route
router.route("/check-auth").get(isAuthenticated as unknown as RequestHandler, checkAuth as unknown as RequestHandler);

// signup route
router.route("/signup").post(signup as unknown as RequestHandler);

// login route
router.route("/login").post(login as unknown as RequestHandler);

// Logout route
router.route("/logout").post(logout as unknown as RequestHandler);

// Verify email route
router.route("/verify-email").post(verifyEmail as unknown as RequestHandler);

// Forgot password route
router.route("/forgot-password").post(forgotPassword as unknown as RequestHandler);

// Reset password route
router.route("/reset-password/:token").post(resetPassword as unknown as RequestHandler);

// Profile Update route
router.route("/profile/update").patch(isAuthenticated as unknown as RequestHandler, upload.single("profilePicture"), updateProfile as unknown as RequestHandler);

// search user route
router.get("/search", isAuthenticated as unknown as RequestHandler, isAdmin as unknown as RequestHandler, searchUsers as unknown as RequestHandler);


// All users routes
router.route("/all-users").get(isAuthenticated as unknown as RequestHandler, isAdmin as unknown as RequestHandler, getAllUsers as unknown as RequestHandler);

// Request account deletion
router.route("/request-deletion/:userId").delete(requestAccountDeletion as unknown as RequestHandler);

// Cancel account deletion
router.route("/cancel-deletion/:userId").patch(cancelAccountDeletion as unknown as RequestHandler);

// Email unsubscribe route
router.route("/unsubscribe/:email").delete(EmailUnSubscribe as unknown as RequestHandler);

// Re-Subscribe email route
router.route("/reSubscribe/:email").post(EmailReSubscribe as unknown as RequestHandler);

export default router;
