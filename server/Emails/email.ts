import transporter from "./gmailSMTP";
import {
  generateAccountDeletionCanceledEmailHtml,
  generateAccountDeletionEmailHtml,
  generateOrderCancelledEmailHtml,
  generateOrderConfirmationEmailHtml,
  generateOrderDeliveryEmailHtml,
  generateOrderReturnedEmailHtml,
  generateOrderShippedEmailHtml,
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

// Send Verification Email
export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string
) => {
  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Verify your email",
      html: htmlContent(name, email, verificationToken),
    });
    // console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Welcome to ZaykaHub",
      html: generateWelcomeEmailHtml(name, email),
    });
    // console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetPasswordLink: string
) => {
  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Reset your password",
      html: generatePasswordResetEmailHtml(name, email, resetPasswordLink),
    });
    // console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

// Send reset success email
export const sendResetSuccessEmail = async (email: string, name: string) => {

  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Password Reset Successful",
      html: generateResetSuccessEmailHtml(name, email),
    });
    // console.log(`✅ Reset success email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};

// Send account deletion email
export const sendAccountDeletionEmail = async (
  email: string,
  deletionDate: string,
  userId: string
) => {
  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Account Deletion Notice",
      html: generateAccountDeletionEmailHtml(email, deletionDate, userId),
    });
    console.log(`✅ Account deletion email sent to ${email}`);
  } catch (error) {
    // console.error("❌ Failed to send account deletion email:", error);
    throw new Error("Failed to send account deletion email");
  }
};

// Send account deletion canceled email
export const sendAccountDeletionCanceledEmail = async (email: string) => {
  try {
    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Account Deletion Canceled",
      html: generateAccountDeletionCanceledEmailHtml( email ),
    });
    // console.log(`✅ Account deletion canceled email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send account deletion canceled email:", error);
    throw new Error("Failed to send account deletion canceled email");
  }
};

// ------------------ Orders se Related ------------------------------

// send Order Confirmation Email
export const sendOrderConfirmationEmail = async (
  email: string,
  orderId: string,
  orderDate: string,
  customerName: string,
  items: { name: string; quantity: number; price: number }[],
  totalAmount: number
) => {
  try {
    console.log("🚀 Sending order confirmation email to:", email);
    console.log("📦 Order Items:", items);
    
    const emailHtml = generateOrderConfirmationEmailHtml(
      orderId,
      orderDate,
      customerName,
      items,
      totalAmount,
      email
    );

    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Order Confirmation - ZaykaHub",
      html: emailHtml,
    });

    console.log(`✅ Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send order confirmation email:", error);
    throw new Error("Failed to send order confirmation email");
  }
};

// send order shipped email
export const sendOrderShippedEmail = async (
  email: string,
  orderId: string,
  trackingLink: string,
  estimatedDeliveryDate: string,
  customerName: string
) => {
  try {
    const emailHtml = generateOrderShippedEmailHtml(
      orderId,
      trackingLink,
      estimatedDeliveryDate,
      customerName,
      email
    );

    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Your Order Has Been Shipped! 🚚",
      html: emailHtml,
    });

    console.log(`✅ Order shipped email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send order shipped email:", error);
    throw new Error("Failed to send order shipped email");
  }
};

// send order delivery email
export const sendOrderDeliveryEmail = async (
  email: string,
  orderId: string,
  deliveryDate: string,
  customerName: string,
  items: { name: string; quantity: number; price: number }[],
  totalAmount: number
) => {
  try {
    const emailHtml = generateOrderDeliveryEmailHtml(
      orderId,
      deliveryDate,
      customerName,
      items,
      totalAmount,
      email
    );

    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "Your Order Has Been Delivered! 🎉",
      html: emailHtml,
    });

    console.log(`✅ Order delivery email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send order delivery email:", error);
    throw new Error("Failed to send order delivery email");
  }
};

// send Order Cancelled email
export const sendOrderCancelledEmail = async (
  email: string,
  orderId: string,
  cancellationReason: string,
  customerName: string
) => {
  try {
    const emailHtml = generateOrderCancelledEmailHtml(
      orderId,
      cancellationReason,
      customerName,
      email
    );

    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "🚫 Order Cancelled - Important Update!",
      html: emailHtml,
    });

    console.log(`✅ Order cancellation email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send order cancellation email:", error);
    throw new Error("Failed to send order cancellation email");
  }
};

// send order Returned email
export const sendOrderReturnedEmail = async (
  email: string,
  orderId: string,
  returnReason: string,
  customerName: string
) => {
  try {
    const emailHtml = generateOrderReturnedEmailHtml(
      orderId,
      returnReason,
      customerName,
      email
    );

    await transporter.sendMail({
      from: `"ZaykaHub" <${process.env.SMTP_USER_MAIL}>`,
      to: email,
      subject: "🔄 Order Returned - Update on Your Request",
      html: emailHtml,
    });

    console.log(`✅ Order return email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send order return email:", error);
    throw new Error("Failed to send order return email");
  }
};

// ------------------------------------------------------------------------
