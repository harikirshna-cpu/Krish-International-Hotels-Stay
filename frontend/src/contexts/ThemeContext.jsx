import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  cyber: {
    name: 'Cyber Neon',
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0e27 100%)',
    text: '#00ffff',
    textSecondary: '#ff00ff',
    isDark: true
  },
  matrix: {
    name: 'Matrix Green',
    primary: '#00ff00',
    secondary: '#00cc00',
    accent: '#00ff88',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 25%, #002200 50%, #003300 75%, #001a00 100%)',
    text: '#00ff00',
    textSecondary: '#00cc00',
    isDark: true
  },
  sunset: {
    name: 'Sunset Vibes',
    primary: '#ff6b6b',
    secondary: '#ffd93d',
    accent: '#ff8c42',
    background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #3d1a1a 50%, #2d1515 75%, #1a0a0a 100%)',
    text: '#ff6b6b',
    textSecondary: '#ffd93d',
    isDark: true
  },
  ocean: {
    name: 'Deep Ocean',
    primary: '#00d4ff',
    secondary: '#0088ff',
    accent: '#00ffcc',
    background: 'linear-gradient(135deg, #001f3f 0%, #003366 25%, #002244 50%, #003366 75%, #001f3f 100%)',
    text: '#00d4ff',
    textSecondary: '#00ffcc',
    isDark: true
  },
  royal: {
    name: 'Royal Purple',
    primary: '#8b00ff',
    secondary: '#ff00ff',
    accent: '#b300ff',
    background: 'linear-gradient(135deg, #1a0033 0%, #2d0055 25%, #220044 50%, #2d0055 75%, #1a0033 100%)',
    text: '#8b00ff',
    textSecondary: '#ff00ff',
    isDark: true
  },
  fire: {
    name: 'Fire Blaze',
    primary: '#ff3300',
    secondary: '#ff6600',
    accent: '#ffcc00',
    background: 'linear-gradient(135deg, #1a0000 0%, #330000 25%, #220000 50%, #330000 75%, #1a0000 100%)',
    text: '#ff3300',
    textSecondary: '#ff6600',
    isDark: true
  },
  christmas: {
    name: '🎄 Christmas Special',
    primary: '#ff0000',
    secondary: '#00ff00',
    accent: '#ffd700',
    background: 'linear-gradient(135deg, #0f1f0f 0%, #1a0a0a 25%, #0a1a0a 50%, #1a0a0a 75%, #0f1f0f 100%)',
    text: '#ff0000',
    textSecondary: '#00ff00',
    isDark: true
  },
  light: {
    name: '☀️ Light Mode',
    primary: '#2563eb',
    secondary: '#7c3aed',
    accent: '#059669',
    background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%, #ffffff 100%)',
    text: '#1f2937',
    textSecondary: '#4b5563',
    isDark: false
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('hotelTheme');
    return saved || 'cyber';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = themes[currentTheme] || themes.cyber;
    return theme.isDark !== false;
  });

  useEffect(() => {
    localStorage.setItem('hotelTheme', currentTheme);
    const theme = themes[currentTheme];
    
    setIsDarkMode(theme.isDark !== false);
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--text-secondary', theme.textSecondary);
    
    // Apply background
    document.body.style.background = theme.background;
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradient-shift 15s ease infinite';
    
    // Update text color based on theme
    if (theme.isDark === false) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    if (newMode) {
      // Switch to a dark theme
      changeTheme('cyber');
    } else {
      // Switch to light theme
      changeTheme('light');
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
    isDarkMode,
    toggleDarkMode
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
