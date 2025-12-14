require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const User = require('../models/User');

const hotels = [
  // ⭐ LUXURY CATEGORY
  {
    name: "Royal Palace Luxury Hotel",
    location: "Paris, France",
    category: "Luxury",
    price: 850,
    rating: 4.9,
    amenities: ["Michelin Star Restaurant", "Butler Service", "Private Spa", "Champagne Bar", "Helicopter Pad", "24/7 Concierge", "Limousine Service", "Indoor Pool", "Art Gallery"],
    services: ["Personal Chef", "Private Tours", "Yacht Rentals", "Shopping Assistant", "Exclusive Events"],
    lat: 48.8566,
    lng: 2.3522,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop"
    ],
    description: "💎 Experience unparalleled luxury in the heart of Paris. 5-star elegance with breathtaking Eiffel Tower views. Michelin-starred dining and exclusive butler service.",
    rooms: 200,
    availableRooms: 45,
    offers: ["🎄 Christmas Special: 30% OFF + Free Champagne", "🎁 New Year Package: 5 Nights for 4"],
    europeanReviews: [
      { name: "Sophie Dubois", country: "France", rating: 5, comment: "Magnifique! The epitome of luxury and elegance." },
      { name: "Hans Mueller", country: "Germany", rating: 5, comment: "Outstanding service and incredible attention to detail." }
    ]
  },
  {
    name: "Crown Jewel Resort & Spa",
    location: "Dubai, UAE",
    category: "Luxury",
    price: 1200,
    rating: 5.0,
    amenities: ["Gold-Plated Interior", "Private Beach", "Underwater Restaurant", "Diamond Spa", "Presidential Suite", "Casino", "Exotic Car Rental", "Private Cinema", "Infinity Pool"],
    services: ["Personal Trainer", "Yacht Charter", "Desert Safari", "Golf Course Access", "VIP Shopping Tours"],
    lat: 25.2048,
    lng: 55.2708,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop"
    ],
    description: "👑 Ultimate opulence in Dubai. Gold interiors, underwater dining, and unmatched extravagance. Experience Arabian luxury at its finest.",
    rooms: 300,
    availableRooms: 78,
    offers: ["🎅 Christmas Gala: Free Dinner + Entertainment", "❄️ Winter Wonder: Complimentary Ski Dubai Access"],
    europeanReviews: [
      { name: "Isabella Romano", country: "Italy", rating: 5, comment: "Absolutely stunning! Worth every penny." },
      { name: "Carlos Sanchez", country: "Spain", rating: 5, comment: "The most luxurious hotel I've ever experienced." }
    ]
  },
  {
    name: "Imperial Vienna Grand Hotel",
    location: "Vienna, Austria",
    category: "Luxury",
    price: 720,
    rating: 4.9,
    amenities: ["Classical Concert Hall", "Imperial Spa", "Fine Dining", "Wine Cellar", "Library", "Ballroom", "Rooftop Garden", "Valet Service"],
    services: ["Opera Tickets", "Cultural Tours", "Private Music Lessons", "Art Collection Viewing"],
    lat: 48.2082,
    lng: 16.3738,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop"
    ],
    description: "🎻 Historic elegance meets modern luxury in Vienna's cultural heart. Classical music, imperial architecture, and Austrian hospitality.",
    rooms: 150,
    availableRooms: 62,
    offers: ["🎄 Christmas Market Package: Free Concert Tickets", "🎁 Holiday Romance: Couples Spa + Dinner"],
    europeanReviews: [
      { name: "Maximilian Koch", country: "Austria", rating: 5, comment: "Pure elegance! Like stepping back in time." },
      { name: "Emma Thompson", country: "UK", rating: 5, comment: "Impeccable service and stunning architecture." }
    ]
  },

  // 🏖️ RESORT CATEGORY
  {
    name: "Ocean View Paradise Resort",
    location: "Maldives",
    category: "Resort",
    price: 950,
    rating: 4.9,
    amenities: ["Overwater Bungalows", "Coral Reef", "Water Sports", "Island Spa", "Sunset Cruise", "Diving Center", "Beach Bar", "Infinity Pool"],
    services: ["Snorkeling Tours", "Romantic Dinners", "Dolphin Watching", "Island Hopping", "Fishing Trips"],
    lat: 3.2028,
    lng: 73.2207,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop"
    ],
    description: "🏝️ Tropical paradise with crystal waters and overwater villas. Private island experience with world-class diving and marine life.",
    rooms: 100,
    availableRooms: 35,
    offers: ["🎄 Christmas Paradise: 7 Nights + Free Snorkeling", "🌊 Ocean Adventure: Water Sports Package Included"],
    europeanReviews: [
      { name: "Lars Anderson", country: "Sweden", rating: 5, comment: "Paradise on Earth! Perfect honeymoon destination." },
      { name: "Marie Leclerc", country: "France", rating: 5, comment: "Breathtaking beauty and exceptional service." }
    ]
  },
  {
    name: "Mountain Retreat Lodge",
    location: "Swiss Alps, Switzerland",
    category: "Resort",
    price: 680,
    rating: 4.9,
    amenities: ["Premium Spa", "Ski-in/Ski-out", "Gourmet Breakfast", "Ski Storage", "Hot Tub", "Fireplace", "Sauna", "Mountain Views"],
    services: ["Ski Lessons", "Hiking Guides", "Mountain Biking", "Paragliding", "Alpine Photography Tours"],
    lat: 46.8182,
    lng: 8.2275,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop"
    ],
    description: "⛷️ Alpine luxury with direct ski access. Breathtaking mountain views, world-class spa, and Swiss hospitality at its finest.",
    rooms: 85,
    availableRooms: 42,
    offers: ["❄️ Christmas Ski Package: Lift Passes Included", "🎿 Winter Wonderland: Free Ski Lessons"],
    europeanReviews: [
      { name: "Klaus Schneider", country: "Germany", rating: 5, comment: "Perfect ski resort! Amazing facilities and location." },
      { name: "Olivia Jensen", country: "Denmark", rating: 5, comment: "Cozy, luxurious, and stunning mountain views." }
    ]
  },
  {
    name: "Santorini Sunset Resort",
    location: "Santorini, Greece",
    category: "Resort",
    price: 580,
    rating: 4.8,
    amenities: ["Cliffside Pool", "Greek Cuisine", "Wine Tasting", "Sunset Views", "Private Terraces", "Spa", "Beach Shuttle", "Yoga Classes"],
    services: ["Boat Tours", "Winery Visits", "Photography Sessions", "Cooking Classes", "Island Tours"],
    lat: 36.3932,
    lng: 25.4615,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop"
    ],
    description: "🌅 Iconic white-washed elegance with stunning caldera views. Romantic sunsets, Greek hospitality, and Mediterranean charm.",
    rooms: 65,
    availableRooms: 28,
    offers: ["🎄 Christmas in Greece: Free Wine Tour", "🍷 Holiday Romance: Couples Package + Dinner"],
    europeanReviews: [
      { name: "Andreas Papadopoulos", country: "Greece", rating: 5, comment: "The most beautiful sunset views in the world!" },
      { name: "Charlotte Martin", country: "France", rating: 5, comment: "Romantic and absolutely stunning. Highly recommend!" }
    ]
  },

  // 💼 BUSINESS CATEGORY
  {
    name: "City Lights Grand Hotel",
    location: "Manhattan, New York",
    category: "Business",
    price: 450,
    rating: 4.8,
    amenities: ["Rooftop Bar", "Business Center", "Free WiFi", "Fine Dining", "Concierge", "Valet Parking", "Meeting Rooms", "Gym"],
    services: ["Airport Transfer", "Corporate Events", "Video Conferencing", "Executive Lounge", "Printing Services"],
    lat: 40.7128,
    lng: -74.0060,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop"
    ],
    description: "🏙️ Modern luxury hotel in the heart of NYC with panoramic city views and easy access to Times Square. Perfect for business travelers.",
    rooms: 200,
    availableRooms: 150,
    offers: ["🎄 Corporate Christmas: Meeting Rooms 40% OFF", "💼 Business Plus: Free Executive Lounge Access"],
    europeanReviews: [
      { name: "Thomas Weber", country: "Germany", rating: 5, comment: "Perfect for business! Excellent facilities and location." },
      { name: "Sophie Laurent", country: "Belgium", rating: 5, comment: "Outstanding business center and meeting spaces." }
    ]
  },
  {
    name: "Tokyo Skyline Tower",
    location: "Shibuya, Tokyo",
    category: "Business",
    price: 380,
    rating: 4.9,
    amenities: ["Sky Lounge", "Free WiFi", "Onsen Bath", "Sushi Restaurant", "Business Center", "Robot Concierge", "Co-working Space"],
    services: ["Translation Services", "Airport Limo", "Corporate Packages", "Tech Support", "Japanese Etiquette Training"],
    lat: 35.6762,
    lng: 139.6503,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop"
    ],
    description: "🗼 Futuristic hotel in the heart of Tokyo with traditional onsen baths and cutting-edge technology. Business meets culture.",
    rooms: 180,
    availableRooms: 140,
    offers: ["🎅 Tech Christmas: Free High-Speed Internet Upgrade", "🎁 Winter Business: Extended Checkout + Breakfast"],
    europeanReviews: [
      { name: "Nikolai Petrov", country: "Russia", rating: 5, comment: "Amazing blend of technology and tradition!" },
      { name: "Anna Kowalski", country: "Poland", rating: 5, comment: "Perfect location and incredible service." }
    ]
  },
  {
    name: "London Bridge Executive Hotel",
    location: "London, United Kingdom",
    category: "Business",
    price: 420,
    rating: 4.8,
    amenities: ["Thames Views", "Business Suites", "Free WiFi", "British Pub", "Conference Halls", "Gym", "Executive Lounge"],
    services: ["Chauffeur Service", "Document Printing", "Secretarial Services", "Corporate Catering"],
    lat: 51.5074,
    lng: -0.1278,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop"
    ],
    description: "🇬🇧 Classic British elegance with modern business facilities. Thames views, executive lounges, and traditional afternoon tea.",
    rooms: 140,
    availableRooms: 95,
    offers: ["🎄 Christmas Business: Free Meeting Room Rental", "☕ Holiday Work: Complimentary Afternoon Tea"],
    europeanReviews: [
      { name: "James Wilson", country: "UK", rating: 5, comment: "Quintessentially British! Perfect for business meetings." },
      { name: "Pierre Dubois", country: "France", rating: 5, comment: "Excellent location near financial district." }
    ]
  },

  // 🎨 BOUTIQUE CATEGORY
  {
    name: "Amsterdam Canal House",
    location: "Amsterdam, Netherlands",
    category: "Boutique",
    price: 320,
    rating: 4.7,
    amenities: ["Canal Views", "Bicycle Rentals", "Cozy Fireplace", "Art Collection", "Craft Beer Bar", "Breakfast Included"],
    services: ["City Tours", "Museum Tickets", "Bike Guides", "Art Gallery Access", "Local Food Tours"],
    lat: 52.3676,
    lng: 4.9041,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop"
    ],
    description: "🚲 Charming canal-side boutique hotel in historic Amsterdam. Dutch character, bicycle adventures, and artistic ambiance.",
    rooms: 45,
    availableRooms: 22,
    offers: ["🎄 Christmas Canal Tour: Free Boat Ride", "🎁 Holiday Bikes: Free Bicycle Rental"],
    europeanReviews: [
      { name: "Jan van Dijk", country: "Netherlands", rating: 5, comment: "Authentic Amsterdam experience! Love the canal views." },
      { name: "Ingrid Larsen", country: "Norway", rating: 5, comment: "Cozy, artistic, and perfectly located." }
    ]
  },
  {
    name: "Barcelona Gothic Quarter Inn",
    location: "Barcelona, Spain",
    category: "Boutique",
    price: 290,
    rating: 4.8,
    amenities: ["Rooftop Terrace", "Tapas Bar", "Wine Cellar", "Gothic Architecture", "Free WiFi", "Flamenco Shows"],
    services: ["Gaudi Tours", "Cooking Classes", "Wine Tastings", "Beach Shuttle", "Cultural Events"],
    lat: 41.3851,
    lng: 2.1734,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop"
    ],
    description: "🎭 Historic boutique inn in Barcelona's Gothic Quarter. Medieval charm meets modern comfort with rooftop tapas bar.",
    rooms: 38,
    availableRooms: 18,
    offers: ["🎄 Christmas Flamenco: Free Show + Dinner", "🍷 Holiday Wine: Tapas & Wine Tour Included"],
    europeanReviews: [
      { name: "Maria Garcia", country: "Spain", rating: 5, comment: "Beautiful historic building! Amazing tapas bar." },
      { name: "Luca Rossi", country: "Italy", rating: 5, comment: "Perfect location in the heart of Gothic Quarter." }
    ]
  },
  {
    name: "Prague Castle View Hotel",
    location: "Prague, Czech Republic",
    category: "Boutique",
    price: 260,
    rating: 4.7,
    amenities: ["Castle Views", "Czech Beer Bar", "Historic Rooms", "Free WiFi", "Library", "Terrace Garden"],
    services: ["Castle Tours", "Beer Brewing Workshop", "Old Town Walking Tours", "Concert Tickets"],
    lat: 50.0755,
    lng: 14.4378,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop"
    ],
    description: "🏰 Enchanting boutique hotel with Prague Castle views. Medieval architecture, Czech beer culture, and fairy-tale ambiance.",
    rooms: 32,
    availableRooms: 15,
    offers: ["🎄 Christmas Castle: Free Castle Night Tour", "🍺 Holiday Beer: Brewing Workshop Included"],
    europeanReviews: [
      { name: "Pavel Novak", country: "Czech Republic", rating: 5, comment: "Stunning castle views! Very romantic setting." },
      { name: "Helena Schmidt", country: "Austria", rating: 5, comment: "Charming hotel with authentic Czech character." }
    ]
  },

  // 🏖️ BEACH CATEGORY
  {
    name: "Miami Beach Luxury Resort",
    location: "Miami Beach, Florida",
    category: "Beach",
    price: 380,
    rating: 4.7,
    amenities: ["Beachfront", "Infinity Pool", "Water Sports", "Beach Bar", "Spa", "Surfing Lessons", "Ocean View Rooms"],
    services: ["Jet Ski Rentals", "Parasailing", "Scuba Diving", "Beach Yoga", "Sunset Cruises"],
    lat: 25.7617,
    lng: -80.1918,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop"
    ],
    description: "🌊 Luxurious beachfront resort with direct ocean access. Water sports, infinity pools, and vibrant Miami nightlife.",
    rooms: 120,
    availableRooms: 85,
    offers: ["🎄 Christmas Beach: Water Sports Package FREE", "🏄 Holiday Surf: Free Surfing Lessons"],
    europeanReviews: [
      { name: "Marco Ferrari", country: "Italy", rating: 5, comment: "Perfect beach vacation! Amazing water sports." },
      { name: "Sofia Andersson", country: "Sweden", rating: 5, comment: "Beautiful resort with excellent service." }
    ]
  },
  {
    name: "Bali Tropical Paradise",
    location: "Ubud, Bali",
    category: "Beach",
    price: 280,
    rating: 4.9,
    amenities: ["Private Villas", "Jungle Views", "Infinity Pool", "Balinese Spa", "Yoga Studio", "Rice Paddy Tours", "Temple Access"],
    services: ["Meditation Classes", "Balinese Massage", "Cooking Classes", "Temple Tours", "Rice Farming Experience"],
    lat: -8.5069,
    lng: 115.2625,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop"
    ],
    description: "🌴 Serene tropical paradise in Ubud's jungle. Private villas, yoga retreats, and authentic Balinese culture.",
    rooms: 55,
    availableRooms: 28,
    offers: ["🎄 Christmas Zen: Free Yoga & Meditation", "🧘 Holiday Retreat: Spa Package Included"],
    europeanReviews: [
      { name: "Amelie Dubois", country: "France", rating: 5, comment: "Pure tranquility! The spa is incredible." },
      { name: "Erik Johansson", country: "Sweden", rating: 5, comment: "Perfect for relaxation and spiritual renewal." }
    ]
  },
  {
    name: "Amalfi Coast Seaside Villa",
    location: "Amalfi Coast, Italy",
    category: "Beach",
    price: 620,
    rating: 5.0,
    amenities: ["Cliffside Villa", "Mediterranean Views", "Private Beach", "Italian Restaurant", "Wine Terrace", "Lemon Grove", "Boat Tours"],
    services: ["Yacht Rentals", "Cooking Classes", "Wine Tours", "Coastal Hikes", "Capri Day Trips"],
    lat: 40.6340,
    lng: 14.6028,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop"
    ],
    description: "🍋 Breathtaking cliffside villa on Italy's Amalfi Coast. Mediterranean elegance, lemon groves, and coastal beauty.",
    rooms: 42,
    availableRooms: 19,
    offers: ["🎄 Christmas Italiano: Free Cooking Class + Wine", "🍝 Holiday Feast: Gourmet Italian Dinner Included"],
    europeanReviews: [
      { name: "Giuseppe Conti", country: "Italy", rating: 5, comment: "La dolce vita! Most beautiful coast in the world." },
      { name: "Francesca Bianchi", country: "Italy", rating: 5, comment: "Spectacular views and authentic Italian hospitality." }
    ]
  },

  // 🌆 URBAN CATEGORY
  {
    name: "Singapore Marina Bay Hotel",
    location: "Marina Bay, Singapore",
    category: "Urban",
    price: 490,
    rating: 4.9,
    amenities: ["Rooftop Infinity Pool", "Sky Bar", "Michelin Dining", "Casino", "Shopping Mall", "Gardens Access", "City Views"],
    services: ["Private Tours", "Shopping Assistance", "Airport Transfer", "Cultural Shows", "Food Tours"],
    lat: 1.2836,
    lng: 103.8607,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop"
    ],
    description: "🌃 Iconic urban resort with world-famous rooftop infinity pool. Skyline views, luxury shopping, and culinary excellence.",
    rooms: 250,
    availableRooms: 112,
    offers: ["🎄 Christmas Lights: Gardens by the Bay Tour FREE", "🎁 Holiday Shopping: Mall Vouchers Included"],
    europeanReviews: [
      { name: "Viktor Petrov", country: "Russia", rating: 5, comment: "Absolutely stunning! The rooftop pool is amazing." },
      { name: "Elena Popov", country: "Bulgaria", rating: 5, comment: "Modern luxury at its finest." }
    ]
  },
  {
    name: "Berlin Modern Design Hotel",
    location: "Berlin, Germany",
    category: "Urban",
    price: 310,
    rating: 4.7,
    amenities: ["Contemporary Design", "Art Gallery", "Craft Beer Bar", "Free WiFi", "Bike Rentals", "Co-working Space", "Vinyl Collection"],
    services: ["Street Art Tours", "Museum Tickets", "Nightlife Guide", "Historical Tours", "Bike Tours"],
    lat: 52.5200,
    lng: 13.4050,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop"
    ],
    description: "🎨 Cutting-edge design hotel in Berlin's creative heart. Street art, craft beer culture, and vibrant nightlife.",
    rooms: 95,
    availableRooms: 58,
    offers: ["🎄 Christmas Markets: Free Tour + Mulled Wine", "🎁 Holiday Culture: Museum Pass Included"],
    europeanReviews: [
      { name: "Stefan Muller", country: "Germany", rating: 5, comment: "Very cool and modern! Great location." },
      { name: "Katarina Novak", country: "Slovenia", rating: 5, comment: "Perfect for exploring Berlin's art scene." }
    ]
  },

  // 🎄 WINTER & SKI CATEGORY
  {
    name: "Alpine Snow Paradise",
    location: "Chamonix, France",
    category: "Resort",
    price: 620,
    rating: 4.9,
    amenities: ["Ski-in/Ski-out", "Mountain Spa", "Fondue Restaurant", "Sauna", "Hot Tub", "Equipment Rental", "Ski School"],
    services: ["Heli-Skiing", "Mountain Guides", "Snowshoeing", "Backcountry Tours", "Avalanche Training"],
    lat: 45.9237,
    lng: 6.8694,
    images: [
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop"
    ],
    description: "⛷️ Premier ski destination in the French Alps. World-class slopes, stunning Mont Blanc views, and après-ski luxury.",
    rooms: 75,
    availableRooms: 35,
    offers: ["❄️ Christmas Ski: Free Equipment Rental", "🎿 New Year Special: Ski Pass Included"],
    europeanReviews: [
      { name: "Jean-Pierre Dubois", country: "France", rating: 5, comment: "Best skiing in the Alps! Incredible resort." },
      { name: "Anna Kowalski", country: "Poland", rating: 5, comment: "Perfect winter getaway with amazing slopes." }
    ]
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@hotel.com',
  password: 'admin123',
  role: 'admin'
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking');
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Hotel.deleteMany({});
    await User.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Seed hotels
    await Hotel.insertMany(hotels);
    console.log('Hotels seeded successfully');
    
    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created successfully');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
