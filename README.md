KRISH International Hotels - Luxury Hotel Booking Platform

A full-stack, enterprise-grade hotel booking platform with modern design, internationalization, AI support, and professional features. Built with React, Node.js, MongoDB, and Tailwind CSS.

CEO Information
Krish - Masters in Engineering Computer Science  
Contact: 123456789

Features Overview

Internationalization & Currency
- 6 Currencies with real-time conversion:
  - USD ($) - US Dollar
  - EUR (€) - Euro
  - GBP (£) - British Pound
  - INR (₹) - Indian Rupee
  - JPY (¥) - Japanese Yen
  - AUD (A$) - Australian Dollar
- 3 Languages with full UI translation:
  - English
  - Telugu (తెలుగు)
  - German (Deutsch)
- Persistent Settings saved in localStorage
- Real-time Price Conversion across all hotel listings

AI Chat Support
- Intelligent Chatbot with predefined responses
- Quick Action Buttons for common queries:
  - Booking assistance
  - Payment information
  - Cancellation policies
  - Contact details
  - CEO information
  - Special offers
- 24/7 Virtual Support with typing indicators
- Beautiful Modal Interface with glass morphism design

User Authentication & Authorization
- Sign Up / Login System with JWT authentication
- Role-Based Access Control (Admin & Standard Users)
- Profile Management - Update name, email, phone
- Password Change functionality
- Password Reset via email (with token expiration)
- Secure Authentication with bcrypt password hashing

Hotel Management
- 20+ Luxury Hotels across international locations with diverse pricing
- 6 Hotel Categories:
  - Luxury Hotels
  - Beach Resorts
  - Business Hotels
  - Boutique Hotels
  - Resort & Spa
  - Urban Hotels

- Advanced Search & Filtering:
  - Category filtering (7 options including "All")
  - Price range filtering (5 ranges: Budget, Moderate, Luxury, Ultra-Luxury)
  - Location-based search
  - Date availability
- Hotel Details with amenities, ratings, European guest reviews
- Favorites System - Save preferred hotels with heart icon
- Christmas Special Offers - Up to 50% OFF on selected hotels
- European Guest Reviews - Authentic reviews from international travelers

Advanced Admin Panel
- Hotel Management - Add, edit, delete hotels with full CRUD operations
- Booking Management - View and update booking status (pending, confirmed, cancelled)
- User Management - View, edit roles, delete users
- Stats Dashboard - Total hotels, bookings, users, revenue with live updates
- Analytics Dashboard - Visual charts and metrics
- Export Functionality - Export data as JSON
- Admin-Only Access - Protected routes with role-based authorization

Analytics Dashboard
- Visual Charts using Chart.js:
  - Monthly Revenue (Bar Chart)
  - User Growth (Line Chart)
  - Bookings by Hotel (Doughnut Chart)
- Key Metrics: Total revenue, bookings, users, hotels
- Recent Activity feed
- Admin-Only Feature

Booking & Payment System
- Real-Time Booking with date selection and guest count
- Multiple Payment Methods:
  - Credit/Debit Card
  - PayPal (with email and password)
- Demo Mode - Payments always succeed for testing
- Transaction ID generation for each booking
- Instant Confirmation - Bookings confirmed immediately
- Payment Success/Failure pages with details
- Booking Confirmation emails via SendGrid/Nodemailer
- Booking Dashboard - View past bookings with status tracking
- Quick Book Option - One-click booking for 1 night

Review & Testimonials System
- European Guest Reviews - 2 reviews per hotel from international travelers
- 5-Star Rating System with detailed feedback
- Featured Testimonials on homepage:
  - Leo Jonowich (5 stars)
  - Abas (5 stars)
  - Venky (5 stars)
- Write Reviews with comments
- Edit/Delete Reviews for own reviews
- Average Ratings automatically calculated
- Prevent Duplicate Reviews from same user

Theme Customization
- 8 Beautiful Themes:
  1. Cyber Neon (Cyan/Purple) - Default
  2. Matrix Green
  3. Sunset Vibes (Orange/Pink)
  4. Deep Ocean (Blue)
  5. Royal Purple
  6. Fire Blaze (Red/Orange)
  7. Christmas Special (Red/Green/Gold)
  8. Light Mode (Clean & Bright)
- Floating Theme Switcher with live preview
- Persistent Selection (localStorage)

Maps & API Integrations
- Google Maps Integration:
  - Interactive maps for each hotel location
  - Collapsible Map View - Toggle visibility
  - Hidden by default to prevent UI blocking
  - Direct link to Google Maps
- Stripe Payment Gateway - Secure online payments
- SendGrid / Nodemailer - Email notifications
- Twilio SMS (optional) - SMS notifications

Email Notifications
- Welcome Email on registration
- Booking Confirmation email
- Password Reset email with secure token
- Professional HTML templates with branding

Security Features
- API Key Authentication (optional, configurable)
- Rate Limiting on API endpoints
- Helmet.js security headers
- CORS protection
- JWT Token authentication
- bcrypt password hashing
- Input Validation middleware

Professional Homepage Features
- Live Statistics Dashboard with 4 key metrics:
  - Premium Hotels Count
  - Global Cities Coverage
  - Average Rating Display
  - Happy Guests Counter
- Category Filtering - 7 categories with icons
- Price Range Filtering - 5 price brackets
- Featured Testimonials Section with customer reviews
- Newsletter Subscription - Stay updated with offers
- Partners & Brands Section - Trusted partnerships
- "Why Choose Us?" Section - 3 key value propositions
- Christmas Special Offers Banner with animated gradient
- Wide Professional Layout - 1920px max-width for desktop
- 4-Column Grid for hotel listings on large screens

Floating Action Buttons
- Settings Panel - Currency, Language, CEO Info
- AI Chatbot - Instant support
- Scroll to Top - Quick navigation
- Favorites - Quick access to saved hotels
- My Bookings - View reservations

User Dashboard
- View All Bookings with status
- Manage Profile information
- Change Password securely
- Favorite Hotels quick access
- Account Statistics
- CEO Information Display in footer

Design Features
- Fully Responsive - Works on desktop, tablet, mobile
- Futuristic Cyberpunk Design:
  - Glassmorphism effects
  - Neon gradients
  - Holographic text
  - Particle backgrounds
  - 3D transforms
  - Smooth animations
- Modern UI/UX with Tailwind CSS

Technology Stack

Backend
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer / SendGrid for emails
- Helmet for security
- Morgan for logging
- Express Validator for input validation
- Express Rate Limit for rate limiting

Frontend
- React 18 with Hooks
- React Router v6 for navigation
- Context API for state management
- Axios for HTTP requests
- Tailwind CSS for styling
- Chart.js + React-Chart.js-2 for analytics
- React Icons for icons

Database Schema
- Users - Authentication, roles, favorites
- Hotels - Properties, amenities, pricing, ratings
- Bookings - Reservations with status tracking
- Reviews - Ratings and comments

Getting Started

Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

Installation

1. Clone the repository
cd "Project K"

2. Install Backend Dependencies
cd backend
npm install

3. Install Frontend Dependencies
cd ../frontend
npm install

4. Environment Configuration

Create backend/.env:

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000

Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@krishhotels.com

API Security (optional)
ENABLE_API_KEY=false
API_KEY=hotel-booking-secure-api-key-2024

Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@krishhotels.com

SMS (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

5. Seed Database
cd backend
node utils/seed.js

6. Start Backend Server
npm start

Backend runs on: http://localhost:5000

7. Start Frontend Server (new terminal)
cd frontend
npm start

Frontend runs on: http://localhost:3000

Default Admin Credentials

Email: admin@hotel.com
Password: admin123

Demo API Keys (Optional)
If API Key Gate is enabled:
- KRISH-2024-LUXURY
- HOTEL-BOOKING-PRO
- CHRISTMAS-SPECIAL-2024
- ADMIN-ACCESS-KEY

API Endpoints

Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (protected)
- PUT /api/auth/profile - Update profile (protected)
- PUT /api/auth/change-password - Change password (protected)
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password/:token - Reset password

Hotels
- GET /api/hotels - Get all hotels
- GET /api/hotels/:id - Get hotel by ID
- POST /api/hotels - Create hotel (admin only)
- PUT /api/hotels/:id - Update hotel (admin only)
- DELETE /api/hotels/:id - Delete hotel (admin only)

Bookings
- GET /api/bookings - Get user bookings (protected)
- GET /api/bookings/:id - Get booking by ID (protected)
- POST /api/bookings - Create booking (protected)
- PUT /api/bookings/:id - Update booking (protected)
- DELETE /api/bookings/:id - Cancel booking (protected)

Reviews
- GET /api/reviews/hotel/:hotelId - Get hotel reviews
- POST /api/reviews - Create review (protected)
- PUT /api/reviews/:id - Update review (protected)
- DELETE /api/reviews/:id - Delete review (protected)

Analytics
- GET /api/analytics - Get analytics data (admin only)

Theme Options

1. Cyber Neon - Cyan, Purple, Pink (Default)
2. Matrix Green - Green terminals
3. Sunset Vibes - Orange, Pink, Yellow
4. Deep Ocean - Dark blue, Cyan
5. Royal Purple - Deep purple, Violet
6. Fire Blaze - Red, Orange, Yellow
7. Christmas Special - Festive red, green, gold
8. Light Mode - Clean and bright for daytime use

Project Structure

Project K/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── hotelController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── apiKey.js
│   │   ├── rateLimiter.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Hotel.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── repositories/
│   │   ├── UserRepository.js
│   │   ├── HotelRepository.js
│   │   └── BookingRepository.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── reviews.js
│   │   └── analytics.js
│   ├── services/
│   │   ├── AuthService.js
│   │   ├── HotelService.js
│   │   └── BookingService.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── errorHandler.js
│   │   ├── notificationService.js
│   │   └── seed.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FavoriteButton.jsx
│   │   │   ├── ThemeSwitcher.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AIChatbot.jsx          (NEW: AI chat support)
│   │   │   ├── SettingsPanel.jsx      (NEW: Settings modal)
│   │   │   ├── GoogleMap.jsx
│   │   │   └── ApiKeyGate.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── HotelContext.jsx
│   │   │   ├── FavoritesContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── SettingsContext.jsx     (NEW: Currency & Language)
│   │   ├── pages/
│   │   │   ├── Home.jsx               (Enhanced with filters & features)
│   │   │   ├── HotelDetails.jsx       (With collapsible map)
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AdvancedAdminPanel.jsx (Enhanced admin features)
│   │   │   ├── Analytics.jsx
│   │   │   ├── Payment.jsx            (With PayPal option)
│   │   │   ├── PaymentSuccess.jsx
│   │   │   └── PaymentFailed.jsx
│   │   ├── services/
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md

Security Best Practices

1. Environment Variables - Never commit .env files
2. API Keys - Use environment variables for all keys
3. Password Hashing - bcrypt with salt rounds
4. JWT Tokens - Secure, expiring tokens
5. Rate Limiting - Prevent brute force attacks
6. Input Validation - Validate all user inputs
7. SQL Injection - MongoDB protects against NoSQL injection
8. XSS Protection - React automatically escapes content

Deployment

Backend (Railway/Render/Heroku)
1. Set environment variables
2. Configure MongoDB Atlas connection
3. Deploy backend code
4. Run seed script: node utils/seed.js

Frontend (Vercel/Netlify)
1. Build: npm run build
2. Set REACT_APP_API_URL to backend URL
3. Deploy build folder

License

MIT License - Feel free to use this project for learning and commercial purposes.

Developer

Built by the KRISH International Hotels team

Complete Feature Checklist

Implemented Features
- 20+ luxury hotels with full details
- 6 hotel categories with filtering
- 5 price range filters
- 6 currency options with real-time conversion
- 3 language options (English, Telugu, German)
- AI chatbot with intelligent responses
- CEO information display (Settings + Footer)
- Professional homepage with statistics
- Featured testimonials (Leo Jonowich, Abas, Venky)
- Newsletter subscription
- Partners section
- Christmas special offers
- Collapsible Google Maps
- PayPal payment option
- 8 theme options including Christmas & Light Mode
- Floating action buttons (5 buttons)
- Wide professional layout (1920px)
- Advanced admin panel with CRUD
- Analytics dashboard with charts
- European guest reviews
- Favorites system
- Quick book option
- JWT authentication
- Role-based access control
- Rate limiting & security features

Quick Start Guide

For Users:
1. Access http://localhost:3000
2. Enter API key (optional): KRISH-2024-LUXURY
3. Browse 20+ hotels
4. Click Settings to change currency/language
5. Click AI Chat for support
6. Register or login to book hotels
7. Select hotel and click "Book This Hotel"
8. Choose payment method (Card/PayPal)
9. Complete booking - Always succeeds in demo mode!

For Admins:
1. Login with admin@hotel.com / admin123
2. Access /admin-advanced for full control
3. Manage hotels, bookings, users
4. View analytics and export data

Support

For support, email support@krishhotels.com or visit our help center.

Technical Support:
- CEO: Krish
- Contact: 123456789
- Email: support@krishhotels.com

---

KRISH International Hotels - Experience Luxury Worldwide
Built with React, Node.js, MongoDB, and Tailwind CSS
Features: Currency Conversion | Multi-Language | AI Chat Support
>>>>>>> master
