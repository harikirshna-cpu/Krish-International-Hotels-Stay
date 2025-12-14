# 🚀 Quick Start Guide

## Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

## Setup Environment Files

### Backend (.env)
```powershell
cd backend
Copy-Item .env.example .env
```

Edit the .env file with your MongoDB connection string.

### Frontend (.env)
```powershell
cd frontend
Copy-Item .env.example .env
```

## Start MongoDB

Make sure MongoDB is running on your system:
```powershell
# If MongoDB is installed as a service, it should already be running
# Otherwise, start it manually
mongod
```

## Seed Database (Recommended)

```powershell
cd backend
npm run seed
```

This creates:
- 3 sample hotels
- Admin user (admin@hotel.com / admin123)

## Start the Application

### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

### Terminal 2 - Frontend
```powershell
cd frontend
npm start
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## Test the Application

1. **Register a new user** at http://localhost:3000/register
2. **Login** with your credentials
3. **Browse hotels** on the home page
4. **Search and filter** hotels
5. **Add to favorites** (heart icon)
6. **View hotel details** and create a booking
7. **Check your dashboard** to see bookings
8. **Cancel bookings** if needed

## Test Admin Features

Login with:
- Email: admin@hotel.com
- Password: admin123

Admins can:
- Access all bookings
- Create/update/delete hotels (via API)

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in backend/.env

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: React will prompt to use a different port

### Module Not Found
- Run `npm install` in both backend and frontend directories

## Tech Stack Summary

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Repository Pattern
- Email Notifications

**Frontend:**
- React 18
- React Router v6
- Context API
- Tailwind CSS
- Axios

## Need Help?

Check the main README.md for detailed documentation and API endpoints.
