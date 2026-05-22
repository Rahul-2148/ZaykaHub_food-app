import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // 465 port ke liye true
  auth: {
    user: process.env.SMTP_USER_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;