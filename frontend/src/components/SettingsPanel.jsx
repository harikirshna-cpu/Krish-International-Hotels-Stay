import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPanel = ({ onClose }) => {
  const { currency, setCurrency, language, setLanguage, currencies, languages } = useSettings();

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="glass-dark rounded-3xl p-8 max-w-2xl w-full border-2 border-cyan-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-cyan-300">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl transition"
          >
            ✕
          </button>
        </div>

        {/* Currency Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">💰 Currency</h3>
          <div className="grid grid-cols-3 gap-4">
            {currencies.map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`p-4 rounded-xl font-bold transition transform hover:scale-105 ${
                  currency === curr
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">🌐 Language</h3>
          <div className="grid gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-xl font-bold transition transform hover:scale-105 flex items-center justify-between ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-3xl">{lang.flag}</span>
                <span className="text-xl">{lang.name}</span>
                <span className="text-sm opacity-70">{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CEO Information */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">👨‍💼 CEO Information</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-bold text-white text-lg">Krish</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="text-sm text-gray-400">Education</p>
                <p className="font-bold text-white">Masters in Engineering Computer Science</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-sm text-gray-400">Contact</p>
                <p className="font-bold text-white">123456789</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white hover:from-cyan-600 hover:to-purple-600 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
