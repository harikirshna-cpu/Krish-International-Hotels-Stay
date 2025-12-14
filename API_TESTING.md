# 🧪 API Testing Guide

## API Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get Profile (Protected)
```http
GET /auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Update Profile (Protected)
```http
PUT /auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210"
}
```

## Hotel Endpoints

### 1. Get All Hotels
```http
GET /hotels
```

### 2. Get Hotels with Filters
```http
GET /hotels?minPrice=100&maxPrice=300&minRating=4&location=Miami&page=1&limit=10
```

### 3. Search Hotels
```http
GET /hotels/search?q=ocean
```

### 4. Get Recommended Hotels
```http
GET /hotels/recommended
```

### 5. Get Hotel by ID
```http
GET /hotels/HOTEL_ID
```

### 6. Add Review (Protected)
```http
POST /hotels/HOTEL_ID/reviews
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing hotel! Great service and beautiful views."
}
```

### 7. Create Hotel (Admin Only)
```http
POST /hotels
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Sunset Paradise",
  "location": "Hawaii",
  "price": 350,
  "amenities": ["Pool", "Spa", "Restaurant"],
  "lat": 21.3099,
  "lng": -157.8581,
  "images": ["https://example.com/image1.jpg"],
  "description": "Beautiful beachfront hotel",
  "rooms": 100,
  "availableRooms": 100
}
```

## Booking Endpoints (All Protected)

### 1. Create Booking
```http
POST /bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "hotel": "HOTEL_ID",
  "checkInDate": "2025-12-20",
  "checkOutDate": "2025-12-25",
  "guests": 2,
  "paymentMethod": "credit_card"
}
```

### 2. Get My Bookings
```http
GET /bookings/my-bookings
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get Booking by ID
```http
GET /bookings/BOOKING_ID
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Cancel Booking
```http
PATCH /bookings/BOOKING_ID/cancel
Authorization: Bearer YOUR_TOKEN_HERE
```

### 5. Get All Bookings (Admin Only)
```http
GET /bookings?page=1&limit=10
Authorization: Bearer ADMIN_TOKEN
```

## User Endpoints (All Protected)

### 1. Get Favorites
```http
GET /users/favorites
Authorization: Bearer YOUR_TOKEN_HERE
```

### 2. Add to Favorites
```http
POST /users/favorites
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "hotelId": "HOTEL_ID"
}
```

### 3. Remove from Favorites
```http
DELETE /users/favorites/HOTEL_ID
Authorization: Bearer YOUR_TOKEN_HERE
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Hotels
```bash
curl http://localhost:5000/api/hotels
```

### Get Profile (with token)
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing with PowerShell

### Register
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Get Hotels
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/hotels" -Method Get
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

## Rate Limiting

- General API: 100 requests per 15 minutes per IP
- Auth endpoints: 5 requests per 15 minutes per IP

## Notes

1. Replace `YOUR_TOKEN_HERE` with the actual JWT token from login/register response
2. Replace `HOTEL_ID`, `BOOKING_ID` with actual MongoDB ObjectIDs
3. Admin token is obtained by logging in as admin (admin@hotel.com / admin123)
4. All dates should be in ISO 8601 format (YYYY-MM-DD)
5. Tokens expire after 30 days (configurable in .env)

## Postman Collection

You can import this as a Postman collection by:
1. Creating a new collection
2. Adding these endpoints manually
3. Setting up an environment variable for `token` and `baseUrl`

## Recommended Testing Tools

- **Postman** - GUI-based API testing
- **Insomnia** - Alternative to Postman
- **Thunder Client** - VS Code extension
- **cURL** - Command-line testing
- **HTTPie** - User-friendly command-line client
