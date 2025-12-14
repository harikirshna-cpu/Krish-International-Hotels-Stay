const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send booking confirmation email
const sendBookingConfirmation = async (userEmail, bookingDetails) => {
  const { hotelName, checkIn, checkOut, guests, totalAmount } = bookingDetails;

  const mailOptions = {
    from: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_FROM,
    to: userEmail,
    subject: '✅ Booking Confirmation - KRISH International Hotels',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 24px; font-weight: bold; color: #667eea; margin-top: 20px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏨 KRISH International Hotels</h1>
            <h2>Booking Confirmation</h2>
          </div>
          <div class="content">
            <p>Dear Guest,</p>
            <p>Thank you for choosing KRISH International Hotels! Your booking has been confirmed.</p>
            
            <div class="booking-details">
              <h3>Booking Details</h3>
              <div class="detail-row">
                <span><strong>Hotel:</strong></span>
                <span>${hotelName}</span>
              </div>
              <div class="detail-row">
                <span><strong>Check-in:</strong></span>
                <span>${new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div class="detail-row">
                <span><strong>Check-out:</strong></span>
                <span>${new Date(checkOut).toLocaleDateString()}</span>
              </div>
              <div class="detail-row">
                <span><strong>Guests:</strong></span>
                <span>${guests}</span>
              </div>
              <div class="total">
                Total Amount: $${totalAmount}
              </div>
            </div>
            
            <p>We look forward to welcoming you!</p>
            <p>If you have any questions, please contact our support team.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">View Booking Details</a>
            </center>
            
            <p style="margin-top: 30px; font-size: 12px; color: #777;">
              Best regards,<br>
              KRISH International Hotels Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_FROM,
    to: userEmail,
    subject: '🔐 Password Reset - KRISH International Hotels',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f5576c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password for your KRISH International Hotels account.</p>
            
            <center>
              <a href="${resetUrl}" class="button">Reset Password</a>
            </center>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong><br>
              This link will expire in 1 hour.<br>
              If you didn't request this, please ignore this email.
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            
            <p style="margin-top: 30px; font-size: 12px; color: #777;">
              Best regards,<br>
              KRISH International Hotels Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_FROM,
    to: userEmail,
    subject: '🎉 Welcome to KRISH International Hotels!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature-item { padding: 10px 0; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏨 Welcome to KRISH International Hotels!</h1>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            <p>Welcome to the KRISH International Hotels family! We're thrilled to have you with us.</p>
            
            <div class="features">
              <h3>What you can do:</h3>
              <div class="feature-item">✅ Browse luxury hotels worldwide</div>
              <div class="feature-item">✅ Book rooms with secure payment</div>
              <div class="feature-item">✅ Manage your bookings from dashboard</div>
              <div class="feature-item">✅ Save your favorite hotels</div>
              <div class="feature-item">✅ Leave reviews and ratings</div>
              <div class="feature-item">✅ Customize your experience with themes</div>
            </div>
            
            <center>
              <a href="${process.env.FRONTEND_URL}" class="button">Start Exploring</a>
            </center>
            
            <p style="margin-top: 30px;">
              If you have any questions, our support team is here to help!
            </p>
            
            <p style="margin-top: 30px; font-size: 12px; color: #777;">
              Best regards,<br>
              KRISH International Hotels Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendBookingConfirmation,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
