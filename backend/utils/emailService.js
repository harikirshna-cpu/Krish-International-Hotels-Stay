const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendBookingConfirmation(booking, user, hotel) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@hotelbooking.com',
      to: user.email,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${user.name},</p>
        <p>Your booking at <strong>${hotel.name}</strong> has been confirmed.</p>
        <h3>Booking Details:</h3>
        <ul>
          <li>Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}</li>
          <li>Check-out: ${new Date(booking.checkOutDate).toLocaleDateString()}</li>
          <li>Guests: ${booking.guests}</li>
          <li>Total Price: $${booking.totalPrice}</li>
        </ul>
        <p>We look forward to your stay!</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent');
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }

  async sendCancellationEmail(booking, user, hotel) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@hotelbooking.com',
      to: user.email,
      subject: 'Booking Cancellation',
      html: `
        <h1>Booking Cancelled</h1>
        <p>Dear ${user.name},</p>
        <p>Your booking at <strong>${hotel.name}</strong> has been cancelled.</p>
        <p>If you have any questions, please contact our support team.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Cancellation email sent');
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }
}

module.exports = new EmailService();
