import React from 'react';

const GoogleMap = ({ location, hotelName }) => {
  // For demo purposes, using coordinates based on location
  const locationCoordinates = {
    'Miami, FL': { lat: 25.7617, lng: -80.1918 },
    'Aspen, CO': { lat: 39.1911, lng: -106.8175 },
    'New York, NY': { lat: 40.7128, lng: -74.0060 },
    'Dubai, UAE': { lat: 25.2048, lng: 55.2708 },
    'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
    'Paris, France': { lat: 48.8566, lng: 2.3522 },
    'Bali, Indonesia': { lat: -8.3405, lng: 115.0920 },
    'Zurich, Switzerland': { lat: 47.3769, lng: 8.5417 },
    'Sydney, Australia': { lat: -33.8688, lng: 151.2093 },
    'Las Vegas, NV': { lat: 36.1699, lng: -115.1398 }
  };

  const coords = locationCoordinates[location] || { lat: 0, lng: 0 };
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(hotelName + ' ' + location)}&zoom=14`;

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
        title={`Map showing ${hotelName} location`}
      ></iframe>
      
      {/* Fallback if API key not configured */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-gray-900/80 backdrop-blur-sm" style={{ display: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? 'none' : 'flex' }}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">{hotelName}</h3>
          <p className="text-xl text-white mb-4">{location}</p>
          <p className="text-gray-400 text-sm">Coordinates: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName + ' ' + location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition"
          >
            🗺️ Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
