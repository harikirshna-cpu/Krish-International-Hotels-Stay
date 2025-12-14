import React, { useState } from 'react';

const AIChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m your AI assistant. How can I help you today? 🤖',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses = {
    'booking': 'To book a hotel, browse our collection, select your preferred hotel, choose your dates, and proceed to payment. It\'s quick and secure! 🏨',
    'payment': 'We accept Credit Cards, Debit Cards, PayPal, and Stripe. All transactions are secured with 256-bit encryption. 💳',
    'cancel': 'You can cancel your booking from "My Bookings" section. Cancellation policy varies by hotel. 📋',
    'contact': 'You can reach us at:\n📧 support@krishhotels.com\n📱 +1 (555) 123-4567\n⏰ 24/7 Support',
    'ceo': 'Our CEO is Krish, who holds a Master\'s in Engineering Computer Science. Contact: 123456789 👨‍💼',
    'offers': 'We have amazing Christmas offers with up to 50% OFF! Check our special deals section. 🎄',
    'help': 'I can help you with:\n✓ Booking hotels\n✓ Payment methods\n✓ Cancellations\n✓ Contact information\n✓ Special offers\n✓ CEO details',
    'default': 'I\'m here to help! You can ask me about bookings, payments, offers, CEO details, or contact information. 😊'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = predefinedResponses.default;

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage = {
        type: 'bot',
        text: response,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    { label: '🏨 Book Hotel', query: 'How do I book a hotel?' },
    { label: '💳 Payment', query: 'What payment methods do you accept?' },
    { label: '👨‍💼 CEO Info', query: 'Tell me about the CEO' },
    { label: '📞 Contact', query: 'How can I contact you?' }
  ];

  return (
    <div className="fixed bottom-24 right-8 z-50 w-96 h-[600px] glass-dark rounded-3xl shadow-2xl border-2 border-cyan-500/30 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-t-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-white">AI Assistant</h3>
            <p className="text-xs text-cyan-100">Online • 24/7</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-cyan-500/30">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(action.query);
                setTimeout(() => handleSend(), 100);
              }}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-cyan-300 px-2 py-2 rounded-lg transition"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-cyan-500/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white hover:from-cyan-600 hover:to-purple-600 transition"
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
