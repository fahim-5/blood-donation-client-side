import { FiMenu, FiBell, FiSearch, FiHelpCircle } from 'react-icons/fi';
import { useState } from 'react';

const DashboardHeader = ({
  title,
  subtitle = '',
  showSearch = false,
  showNotifications = true,
  showHelp = true,
  onMenuClick,
  onSearch,
  onNotificationClick,
  onHelpClick,
  user,
  breadcrumbs = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Title & Breadcrumbs */}
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {user?.role && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === 'volunteer'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              )}
            </div>
            
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
            
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 mt-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <span className="text-gray-400 mx-2">/</span>
                    )}
                    {crumb.href ? (
                      <a
                        href={crumb.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className={`${index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {crumb.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dashboard..."
                  className="block w-48 lg:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>
            </form>
          )}

          {/* Help Button */}
          {showHelp && (
            <button
              onClick={onHelpClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              title="Help"
            >
              <FiHelpCircle className="w-5 h-5" />
            </button>
          )}

          {/* Notifications */}
          {showNotifications && (
            <div className="relative">
              <button
                onClick={onNotificationClick}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors relative"
              >
                <FiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          )}

          {/* User Profile */}
          {user && (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center overflow-hidden ring-2 ring-white">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-red-600 font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <form onSubmit={handleSearch} className="mt-4 sm:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dashboard..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>
        </form>
      )}
    </header>
  );
};

export default DashboardHeader;