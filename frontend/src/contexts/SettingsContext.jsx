import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

const translations = {
  en: {
    home: 'Home',
    hotels: 'Hotels',
    bookings: 'My Bookings',
    favorites: 'Favorites',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    search: 'Search',
    category: 'Category',
    priceRange: 'Price Range',
    allHotels: 'All Hotels',
    currency: 'Currency',
    language: 'Language'
  },
  te: {
    home: 'హోమ్',
    hotels: 'హోటల్స్',
    bookings: 'నా బుకింగ్‌లు',
    favorites: 'ఇష్టమైనవి',
    admin: 'అడ్మిన్',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    search: 'శోధించు',
    category: 'వర్గం',
    priceRange: 'ధర పరిధి',
    allHotels: 'అన్ని హోటళ్ళు',
    currency: 'కరెన్సీ',
    language: 'భాష'
  },
  de: {
    home: 'Startseite',
    hotels: 'Hotels',
    bookings: 'Meine Buchungen',
    favorites: 'Favoriten',
    admin: 'Administrator',
    login: 'Anmelden',
    logout: 'Abmelden',
    bookNow: 'Jetzt buchen',
    viewDetails: 'Details anzeigen',
    search: 'Suchen',
    category: 'Kategorie',
    priceRange: 'Preisspanne',
    allHotels: 'Alle Hotels',
    currency: 'Währung',
    language: 'Sprache'
  }
};

const currencyRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  JPY: 149.50,
  AUD: 1.52
};

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'USD');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const convertPrice = (price) => {
    const rate = currencyRates[currency];
    return (price * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      JPY: '¥',
      AUD: 'A$'
    };
    return symbols[currency];
  };

  const translate = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const value = {
    currency,
    setCurrency,
    language,
    setLanguage,
    convertPrice,
    getCurrencySymbol,
    translate,
    currencies: Object.keys(currencyRates),
    languages: [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
    ]
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
