const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY || 'hotel-booking-api-key-2024';

  // Skip API key check for auth routes
  if (req.path.includes('/auth/')) {
    return next();
  }

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or missing API key. Please provide a valid API key in x-api-key header.'
    });
  }

  next();
};

module.exports = apiKeyAuth;
