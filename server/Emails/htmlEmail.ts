
// Verification Email HTML
export const htmlContent = (name: string, email: string, verificationToken: string) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - ZaykaHub</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .header {
        background-color: #ff6600;
        padding: 20px;
        border-radius: 10px 10px 0 0;
      }
      .header h1 {
        margin: 0;
        color: #ffffff;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #333333;
      }
      .content p {
        color: #666666;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .verification-code {
        display: inline-block;
        font-size: 26px;
        font-weight: bold;
        color: #ff6600;
        background-color: #fff5e6;
        padding: 15px 30px;
        border-radius: 5px;
        border: 2px dashed #ff6600;
        margin: 20px 0;
      }
      .cta-button {
        display: inline-block;
        margin-top: 20px;
        background-color: #ff6600;
        color: #ffffff;
        padding: 12px 25px;
        font-size: 16px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        padding: 20px;
        font-size: 14px;
        color: #999999;
      }
      .footer a {
        color: #ff6600;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>
      <div class="content">
        <h2>Hello, ${name}!</h2>
        <p>Welcome to <strong>ZaykaHub Food</strong>. To complete your registration, please verify your email address using the code below:</p>
        <div class="verification-code">${verificationToken}</div>
        <p>Or, click the button below to verify directly:</p>
        <a href="http://localhost:8000/api/v1/user/verify-email?token=${verificationToken}" class="cta-button">Verify My Email</a>
        <p>If you did not request this verification, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ZaykaHub Food. All rights reserved.</p>
        <p>Need help? <a href="https://zaykahub.com/support">Contact Support</a></p>
        </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};


// Welcome Email HTML
export const generateWelcomeEmailHtml = (name: string, email: string) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ZaykaHub Food!</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background: linear-gradient(90deg, #ff7e5f, #feb47b);
              color: white;
              text-align: center;
              padding: 20px;
          }
          .email-header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: bold;
          }
          .email-body {
              padding: 30px;
              text-align: center;
          }
          .email-body h2 {
              color: #333;
              font-size: 22px;
          }
          .email-body p {
              color: #555;
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
          }
          .explore-btn {
              display: inline-block;
              background: #ff7e5f;
              color: #ffffff;
              padding: 12px 25px;
              font-size: 16px;
              font-weight: bold;
              border-radius: 5px;
              text-decoration: none;
              margin-top: 20px;
              transition: 0.3s;
          }
          .explore-btn:hover {
              background: #e76a4d;
          }
          .email-footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #777;
          }
          .email-footer a {
              color: #ff7e5f;
              text-decoration: none;
              font-weight: bold;
          }
          .social-icons {
              margin-top: 10px;
              display: flex;
              justify-content: center;
              gap: 15px;
          }
          .social-icons a {
              display: inline-block;
              font-size: 20px;
              text-decoration: none;
          }
          .app-links {
              margin-top: 15px;
          }
          .app-links a {
              display: inline-block;
              margin: 5px;
              padding: 10px 15px;
              background: #ff7e5f;
              color: white;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              transition: 0.3s;
          }
          .app-links a:hover {
              background: #e76a4d;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Welcome to ZaykaHub Food!</h1>
          </div>
          <div class="email-body">
              <h2>Hello, ${name}! 🍽️</h2>
              <p>🎉 Congratulations! Your email has been successfully verified.</p>
              <p>We are thrilled to have you onboard at <strong>ZaykaHub Food</strong>! 🍽🚀</p>
              <p>Explore our wide range of delicious food options, share reviews, and be part of our amazing community.</p>
  
              <a href="https://zaykahub.com/explore" class="explore-btn">Start Exploring</a>
  
           <p>If you have any questions or need assistance, feel free to reach out to us.</p>
              
              <div class="app-links">
    <a href="https://play.google.com/store/apps/details?id=com.zaykahub">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width="140">
    </a>
    <a href="https://apps.apple.com/app/zaykahub">
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width="140">
    </a>
</div>

          </div>
          <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} ZaykaHub Food. All rights reserved.</p>
              <p>Follow us on:</p>
              <div class="social-icons">
    <table align="center" style="margin-top: 15px;">
    <tr>
        <td>
            <a href="https://facebook.com/zaykahub">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" 
                alt="Facebook" width="30" style="margin-right: 15px;">
            </a>
        </td>
        <td>
            <a href="https://twitter.com/zaykahub">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" 
                alt="Twitter" width="30" style="margin-right: 15px;">
            </a>
        </td>
        <td>
            <a href="https://instagram.com/zaykahub">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
                alt="Instagram" width="30">
            </a>
        </td>
    </tr>
</table>

</div>
              <p>Need help? <a href="https://zaykahub.com/support">Contact Support</a> | <a href="https://zaykahub.com/privacy-policy">Privacy Policy</a></p>
              </br>
              </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};

// Password Reset Email HTML
export const generatePasswordResetEmailHtml = (name: string, resetPasswordLink: string, email: string) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - ZaykaHub Food</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .email-header {
              background: linear-gradient(90deg, #d9534f, #ff7e5f);
              color: white;
              text-align: center;
              padding: 20px;
          }
          .email-header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
          }
          .email-body {
              padding: 30px;
              text-align: center;
          }
          .email-body h2 {
              color: #333;
              font-size: 22px;
          }
          .email-body p {
              color: #555;
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
          }
          .reset-btn {
              display: inline-block;
              background: #d9534f;
              color: #ffffff;
              padding: 12px 25px;
              font-size: 16px;
              font-weight: bold;
              border-radius: 5px;
              text-decoration: none;
              margin-top: 20px;
              transition: 0.3s;
          }
          .reset-btn:hover {
              background: #b52b27;
          }
          .email-footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #777;
          }
          .email-footer a {
              color: #d9534f;
              text-decoration: none;
              font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Reset Your Password</h1>
          </div>
          <div class="email-body">
              <h2>Hello, ${name}</h2>
              <p>We received a request to reset your password for your <strong>ZaykaHub Food</strong> account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetPasswordLink}" class="reset-btn">Reset Password</a>
              <p>This link will expire in 30 minutes. If you did not request a password reset, please ignore this email or contact support.</p>
              <p>For further assistance, reach out to our <a href="https://zaykahub.com/support">Support Team</a>.</p>
              <p>Thank you,<br/>The ZaykaHub Food Team</p>
          </div>
          <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} ZaykaHub Food. All rights reserved.</p>
              <p>Follow us for updates:</p>
              <p>
                  <a href="https://facebook.com/zaykahub">Facebook</a> |
                  <a href="https://twitter.com/zaykahub">Twitter</a> |
                  <a href="https://instagram.com/zaykahub">Instagram</a>
              </p>
              </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
      </div>
  </body>
  </html>
  `;
};

// Password Reset Success Email HTML
export const generateResetSuccessEmailHtml = (name: string, email: string) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #ff6b6b, #ff4757);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
          }
          .email-body {
            padding: 25px;
            text-align: left;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
          .button {
            display: inline-block;
            background: #ff4757;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 10px;
          }
          .button:hover {
            background: #e84118;
          }
          .divider {
            height: 1px;
            background: #ddd;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            ✅ Password Reset Successful
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi, ${name}</strong></p>
            <p>Your password has been successfully reset. You can now log in to your account with your new password.</p>
            <p>If you did not request this change, please contact our support team immediately to secure your account.</p>

            <!-- Call to Action Button -->
            <p style="text-align: center;">
              <a href="https://zaykahub.com/login" class="button">Log In Now</a>
            </p>

            <div class="divider"></div>

            <p>Stay safe,</p>
            <p>Thank You, </br><strong>The ZaykaHub Food Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub Food. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Account Deletion Email HTML
export const generateAccountDeletionEmailHtml = (
  deletionDate: string,
  userId: string,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  const cancelDeletionLink = `http://localhost:5173/cancel-deletion?userId=${userId}`;

  const formattedDeletionDate = new Date(deletionDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #d9534f, #c9302c);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            position: relative;
          }
          .email-header::before {
            content: "🚨";
            font-size: 28px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
          .email-body {
            padding: 25px;
            text-align: left;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
          }
          .button:hover {
            background: #218838;
          }
          .divider {
            height: 1px;
            background: #ddd;
            margin: 20px 0;
          }
          .warning-box {
            background: #fff3cd;
            color: #856404;
            padding: 15px;
            border-left: 5px solid #ffcc00;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            Account Deletion Notice
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi,</strong></p>
            <p>Your account is scheduled for permanent deletion on <strong>${formattedDeletionDate}</strong>.</p>

            <div class="warning-box">
              ⚠️ <strong>Warning:</strong> This action is irreversible. All your data, including orders, preferences, and saved items, will be lost forever.
            </div>

            <p>If this was a mistake or you wish to cancel this action, click the button below:</p>

            <!-- Call to Action Button -->
            <div class="button-container">
              <a href="${cancelDeletionLink}" class="button">Cancel Account Deletion</a>
            </div>

            <p>If you take no action, your account will be <strong>permanently deleted</strong> after the specified date.</p>

            <div class="divider"></div>

            <p>Stay safe,</p>
            <p>Thank You, </br><strong>The ZaykaHub Food Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub Food. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Accont deletion cancel Email Html
export const generateAccountDeletionCanceledEmailHtml = (email: string) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #28a745, #218838);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            position: relative;
          }
          .email-header::before {
            content: "✅";
            font-size: 28px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
          .email-body {
            padding: 25px;
            text-align: left;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
          }
          .button:hover {
            background: #0056b3;
          }
          .divider {
            height: 1px;
            background: #ddd;
            margin: 20px 0;
          }
          .info-box {
            background: #e7f3ff;
            color: #004085;
            padding: 15px;
            border-left: 5px solid #007bff;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            Account Deletion Canceled
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi,</strong></p>
            <p>We’re happy to inform you that your account deletion request has been successfully <strong>canceled</strong>. You can continue using your ZaykaHub account as usual.</p>

            <div class="info-box">
              🎉 <strong>Good News:</strong> All your data, preferences, and saved items are still available.  
              If you need help managing your account, visit your dashboard or update your preferences.
            </div>

            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>

            <!-- Call to Action Button -->
            <div class="button-container">
              <a href="http://localhost:5173/dashboard" class="button">Go to Dashboard</a>
            </div>

            <p>Thank you for staying with us! ❤️</p>
            <p><strong>The ZaykaHub Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// ------------------ Orders se Related Html ------------------------------

// Order Confirmation Email Html
export const generateOrderConfirmationEmailHtml = (
  orderId: string,
  orderDate: string,
  customerName: string,
  items: { name: string; quantity: number; price: number }[],
  totalAmount: number,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  const formattedOrderDate = new Date(orderDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const orderItemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.name
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.quantity
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price.toFixed(
            2
          )}</td>
        </tr>
      `
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #ff9800, #ff5722);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
          }
          .email-body {
            padding: 25px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .order-summary {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .order-summary th, .order-summary td {
            padding: 10px;
            text-align: left;
          }
          .order-summary th {
            background: #ff9800;
            color: white;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
          }
          .button:hover {
            background: #218838;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            Order Confirmation 📦
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi ${customerName},</strong></p>
            <p>Thank you for your order! Your order <strong>#${orderId}</strong> has been successfully placed on <strong>${formattedOrderDate}</strong>.</p>

            <h3>Order Summary:</h3>
            <table class="order-summary">
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              ${orderItemsHtml}
            </table>

            <h3>Total Amount: ₹${totalAmount.toFixed(2)}</h3>

            <p>You can track your order status by clicking the button below:</p>

            <!-- Call to Action Button -->
            <div class="button-container">
              <a href="http://localhost:5173/track-order?orderId=${orderId}" class="button">Track Your Order</a>
            </div>

            <p>If you have any questions, feel free to contact our support team.</p>
            <p><strong>The ZaykaHub Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Ordered Product Shipped Email Html
export const generateOrderShippedEmailHtml = (
  orderId: string,
  trackingLink: string,
  estimatedDeliveryDate: string,
  customerName: string,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  const formattedDeliveryDate = new Date(
    estimatedDeliveryDate
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #ff9800, #ff5722);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
          }
          .email-body {
            padding: 25px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
          }
          .button:hover {
            background: #0056b3;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            🚚 Your Order Has Been Shipped!
          </div>

          <div class="email-body">
            <p><strong>Hi ${customerName},</strong></p>
            <p>Your order <strong>#${orderId}</strong> has been shipped and is on its way! 🎉</p>
            <p>Estimated delivery date: <strong>${formattedDeliveryDate}</strong>.</p>

            <div class="button-container">
              <a href="${trackingLink}" class="button">Track Your Order 📦</a>
            </div>

            <p>Thank you for shopping with <strong>ZaykaHub</strong>! We hope you enjoy your purchase.</p>
          </div>

          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Order Delivery Email Html
export const generateOrderDeliveryEmailHtml = (
  orderId: string,
  deliveryDate: string,
  customerName: string,
  items: { name: string; quantity: number; price: number }[],
  totalAmount: number,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  const formattedDeliveryDate = new Date(deliveryDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const orderItemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.name
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${
            item.quantity
          }</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price.toFixed(
            2
          )}</td>
        </tr>
      `
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #28a745, #218838);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
          }
          .email-body {
            padding: 25px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .order-summary {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .order-summary th, .order-summary td {
            padding: 10px;
            text-align: left;
          }
          .order-summary th {
            background: #28a745;
            color: white;
          }
          .button-container {
            text-align: center;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
          }
          .button:hover {
            background: #e68900;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #777;
            background: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            Your Order Has Been Delivered! 🚚
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi ${customerName},</strong></p>
            <p>We're happy to let you know that your order <strong>#${orderId}</strong> has been successfully delivered on <strong>${formattedDeliveryDate}</strong>.</p>

            <h3>Order Summary:</h3>
            <table class="order-summary">
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
              ${orderItemsHtml}
            </table>

            <h3>Total Amount: ₹${totalAmount.toFixed(2)}</h3>

            <p>We hope you loved your order! Please share your feedback by clicking the button below:</p>

            <!-- Call to Action Button -->
            <div class="button-container">
              <a href="http://localhost:5173/review-order?orderId=${orderId}" class="button">Give Feedback</a>
            </div>

            <p>If you have any concerns or issues, feel free to contact our support team.</p>
            <p><strong>The ZaykaHub Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Order Cancelled Email Html
export const generateOrderCancelledEmailHtml = (
  orderId: string,
  cancellationReason: string,
  customerName: string,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #fce4e4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #dc3545, #b71c1c);
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .email-body {
            padding: 30px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .highlight {
            background-color: #ffecec;
            padding: 12px;
            border-left: 5px solid #dc3545;
            font-weight: bold;
            color: #b71c1c;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            background: #ff3b30;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
          }
          .button:hover {
            background: #c82333;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #555;
            background: #f8d7da;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            🚫 Order Cancelled
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi ${customerName},</strong></p>
            <p>We regret to inform you that your order <strong>#${orderId}</strong> has been cancelled.</p>

            <div class="highlight">
              <strong>Reason:</strong> ${cancellationReason}
            </div>

            <p>We understand this may be disappointing, and we sincerely apologize for any inconvenience.</p>
            <p>If you need assistance or want to place a new order, please visit our website.</p>

            <!-- Action Button -->
            <div class="button-container">
              <a href="http://localhost:5173/shop" class="button">Browse Products</a>
            </div>

            <p>For any questions, feel free to contact our support team.</p>
            <p><strong>The ZaykaHub Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Order Returned Email Html
export const generateOrderReturnedEmailHtml = (
  orderId: string,
  returnReason: string,
  customerName: string,
  email: string
) => {
  const unsubscribeLink = `https://localhost:8000/api/v1/user/unsubscribe/${email}`;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #e3f2fd;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }
          .email-header {
            background: linear-gradient(90deg, #1976d2, #0d47a1);
            color: white;
            padding: 25px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .email-body {
            padding: 30px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
          }
          .email-body p {
            margin: 15px 0;
          }
          .highlight {
            background-color: #bbdefb;
            padding: 12px;
            border-left: 5px solid #1976d2;
            font-weight: bold;
            color: #0d47a1;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            background: #1565c0;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
          }
          .button:hover {
            background: #0d47a1;
          }
          .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #555;
            background: #bbdefb;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="email-header">
            🔄 Order Returned Successfully
          </div>

          <!-- Body -->
          <div class="email-body">
            <p><strong>Hi ${customerName},</strong></p>
            <p>We have successfully processed your return request for order <strong>#${orderId}</strong>.</p>

            <div class="highlight">
              <strong>Return Reason:</strong> ${returnReason}
            </div>

            <p>Your refund/replacement will be processed shortly. You will receive a confirmation once it's done.</p>
            <p>To check your return status, visit your account.</p>

            <!-- Action Button -->
            <div class="button-container">
              <a href="http://localhost:5173/orders" class="button">View Order Status</a>
            </div>

            <p>If you need further assistance, feel free to contact our support team.</p>
            <p><strong>The ZaykaHub Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} ZaykaHub. All rights reserved.
            </br>
        <p>If you do not want to receive emails from us, <a href="${unsubscribeLink}">click here to unsubscribe</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// ----------------------------------------------------------------------
