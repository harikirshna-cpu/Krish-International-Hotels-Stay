import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { themes, currentTheme, changeTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Theme Selector Dropdown */}
      {isOpen && (
        <div className="absolute bottom-32 right-0 glass-dark neon-border rounded-2xl p-6 w-96 animate-bounce-in shadow-2xl">
          <h3 className="text-2xl font-black holographic mb-4 text-center flex items-center justify-center gap-2">
            🎨 CHOOSE YOUR THEME
          </h3>
          
          {/* Dark/Light Mode Toggle */}
          <div className="mb-6 p-4 glass rounded-xl">
            <button
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all font-bold text-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
              <div className={`w-14 h-7 rounded-full transition-all ${isDarkMode ? 'bg-blue-600' : 'bg-yellow-400'} relative`}>
                <div className={`absolute top-1 transition-all ${isDarkMode ? 'left-1' : 'left-7'} w-5 h-5 rounded-full bg-white`}></div>
              </div>
            </button>
          </div>

          {/* Theme Options */}
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  changeTheme(key);
                  setIsOpen(false);
                }}
                className={`w-full p-4 rounded-xl text-left font-bold transition-all ${
                  currentTheme === key
                    ? 'neon-border bg-gradient-to-r from-cyan-500/20 to-purple-500/20 scale-105 shadow-lg'
                    : 'glass border-2 border-gray-500/30 hover:border-cyan-400/50 hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg flex items-center gap-2" style={{ color: theme.primary }}>
                    {theme.name}
                    {currentTheme === key && <span className="text-green-400">✓</span>}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg" style={{ background: theme.primary }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg" style={{ background: theme.secondary }}></div>
                    <div className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg" style={{ background: theme.accent }}></div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-bold text-white transition-all"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-2xl hover:scale-110 transition-all neon-button flex items-center justify-center text-4xl animate-pulse border-4 border-white/20"
        title="Change Theme & Mode"
      >
        🎨
      </button>
    </div>
  );
};

export default ThemeSwitcher;
