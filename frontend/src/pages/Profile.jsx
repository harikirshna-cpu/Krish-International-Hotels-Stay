import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      updateUser(response.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/auth/change-password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          👤 My Profile
        </h1>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-900/30 border-green-500/50 text-green-300' 
              : 'bg-red-900/30 border-red-500/50 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-cyan-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-cyan-400">📋 Profile Info</h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition"
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50"
                  >
                    {loading ? '⏳ Saving...' : '✅ Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setProfileData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phone: user?.phone || ''
                      });
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Name</p>
                  <p className="text-xl font-semibold">{user?.name}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-xl font-semibold">{user?.email}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-xl font-semibold">{user?.phone || 'Not provided'}</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Role</p>
                  <p className="text-xl font-semibold capitalize">{user?.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-3xl p-8 border-2 border-purple-500/30">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">🔐 Change Password</h2>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-purple-500/30 text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-purple-500/30 text-white focus:border-purple-500 focus:outline-none"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-purple-500/30 text-white focus:border-purple-500 focus:outline-none"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
              >
                {loading ? '⏳ Changing...' : '🔐 Change Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-6 bg-gradient-to-br from-cyan-800 to-blue-900 rounded-3xl p-8 border-2 border-cyan-500/30">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">📊 Account Stats</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">0</div>
              <div className="text-gray-400 mt-2">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">0</div>
              <div className="text-gray-400 mt-2">Favorite Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">0</div>
              <div className="text-gray-400 mt-2">Reviews Written</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
