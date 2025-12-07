import { FiUser, FiCalendar, FiDroplet, FiMapPin, FiBell } from 'react-icons/fi';
import { useState } from 'react';

const WelcomeBanner = ({
  user,
  stats = [],
  showNotifications = true,
  onNotificationClick,
  onProfileClick,
  loading = false
}) => {
  const [dismissed, setDismissed] = useState(false);

  const defaultStats = [
    { label: 'Blood Group', value: user?.bloodGroup || 'N/A', icon: <FiDroplet /> },
    { label: 'Location', value: `${user?.district || 'N/A'}, ${user?.upazila || ''}`, icon: <FiMapPin /> },
    { label: 'Member Since', value: '2024', icon: <FiCalendar /> },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  if (dismissed) return null;

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-6 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-6 w-48 bg-red-200 rounded"></div>
            <div className="h-4 w-64 bg-red-200 rounded"></div>
            <div className="flex space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-24 bg-red-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="h-10 w-10 bg-red-200 rounded-full"></div>
            <div className="h-10 w-10 bg-red-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-400 to-orange-400 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Left Content */}
        <div className="flex-1">
          {/* Welcome Message */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-red-600">{user?.name || 'Donor'}!</span> 👋
            </h2>
            <p className="text-gray-700">
              {getGreetingMessage(user?.role)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-3 border border-red-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            {getQuickActions(user?.role).map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center space-x-2"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Profile & Notifications */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Notifications */}
          {showNotifications && (
            <button
              onClick={onNotificationClick}
              className="relative p-3 bg-white rounded-xl border border-red-100 hover:shadow-md transition-shadow"
            >
              <FiBell className="w-6 h-6 text-red-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          )}

          {/* Profile Avatar */}
          <button
            onClick={onProfileClick}
            className="group relative"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-red-100">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiUser className="w-10 h-10 text-red-600" />
                </div>
              )}
            </div>
            
            {/* Role Badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                user?.role === 'admin' ? 'bg-purple-600' :
                user?.role === 'volunteer' ? 'bg-blue-600' :
                'bg-green-600'
              }`}>
                {user?.role?.toUpperCase() || 'DONOR'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Today's Tip */}
      <div className="mt-6 pt-6 border-t border-red-100 border-opacity-50">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Today's Tip</p>
            <p className="text-sm text-gray-700">
              {getDailyTip(user?.role)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getGreetingMessage = (role) => {
  const messages = {
    admin: "Manage the platform and help save lives.",
    volunteer: "Your efforts are making a difference in people's lives.",
    donor: "Ready to save a life today? Check out donation requests."
  };
  return messages[role] || "Thank you for being part of our lifesaving community!";
};

const getQuickActions = (role) => {
  const baseActions = [
    { label: 'Donate Blood', icon: <FiDroplet />, onClick: () => {} },
    { label: 'View Requests', icon: <FiBell />, onClick: () => {} },
  ];

  if (role === 'admin') {
    return [
      ...baseActions,
      { label: 'Manage Users', icon: <FiUser />, onClick: () => {} },
    ];
  }

  if (role === 'volunteer') {
    return [
      ...baseActions,
      { label: 'Manage Requests', icon: <FiBell />, onClick: () => {} },
    ];
  }

  return baseActions;
};

const getDailyTip = (role) => {
  const tips = {
    admin: "Review pending verification requests to ensure platform safety.",
    volunteer: "Check urgent donation requests that need immediate attention.",
    donor: "Drink plenty of water and have a healthy meal before donating blood."
  };
  return tips[role] || "Stay hydrated and maintain a healthy diet for better donation experience.";
};

export default WelcomeBanner;

