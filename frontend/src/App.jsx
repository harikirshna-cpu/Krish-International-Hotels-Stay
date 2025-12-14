import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HotelProvider } from './contexts/HotelContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';

import ApiKeyGate from './components/ApiKeyGate';
import Navbar from './components/Navbar';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import AdminPanel from './pages/AdminPanel';
import AdvancedAdminPanel from './pages/AdvancedAdminPanel';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <SettingsProvider>
        <ApiKeyGate>
          <AuthProvider>
            <HotelProvider>
              <FavoritesProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hotels/:id" element={<HotelDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-advanced"
                  element={
                    <ProtectedRoute>
                      <AdvancedAdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-success"
                  element={
                    <ProtectedRoute>
                      <PaymentSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-failed"
                  element={
                    <ProtectedRoute>
                      <PaymentFailed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <ThemeSwitcher />
            </FavoritesProvider>
          </HotelProvider>
        </AuthProvider>
      </ApiKeyGate>
        </SettingsProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
