import { FiArrowUpRight, FiTrendingUp, FiTrendingDown, FiMoreVertical } from 'react-icons/fi';

const DashboardCard = ({
  title,
  value,
  icon,
  color = 'blue',
  trend = null,
  trendValue = '',
  subtitle = '',
  onClick,
  loading = false,
  compact = false,
  actionMenu = false,
  onActionClick
}) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-100 text-red-700',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-green-50 border-green-100 text-green-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-700',
    pink: 'bg-pink-50 border-pink-100 text-pink-700',
    gray: 'bg-gray-50 border-gray-100 text-gray-700'
  };

  const iconColorClasses = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    pink: 'bg-pink-100 text-pink-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <FiTrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <FiTrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 bg-green-50 border-green-200';
    if (trend === 'down') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  if (compact) {
    return (
      <div 
        className={`relative rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer ${colorClasses[color]}`}
        onClick={onClick}
      >
        {actionMenu && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onActionClick) onActionClick();
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            {loading ? (
              <div className="h-8 w-16 bg-current bg-opacity-20 rounded mt-1 animate-pulse"></div>
            ) : (
              <p className="text-2xl font-bold mt-1">{value}</p>
            )}
          </div>
          
          <div className={`p-3 rounded-full ${iconColorClasses[color]}`}>
            {icon}
          </div>
        </div>
        
        {subtitle && (
          <p className="text-xs opacity-70 mt-2">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-xl border p-6 transition-all hover:shadow-lg cursor-pointer ${colorClasses[color]}`}
      onClick={onClick}
    >
      {actionMenu && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onActionClick) onActionClick();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiMoreVertical className="w-5 h-5" />
        </button>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className={`p-3 rounded-xl ${iconColorClasses[color]}`}>
              {icon}
            </div>
            {trend && (
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{trendValue}</span>
              </span>
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            {loading ? (
              <div className="h-10 w-32 bg-current bg-opacity-20 rounded mt-2 animate-pulse"></div>
            ) : (
              <p className="text-3xl font-bold mt-2">{value}</p>
            )}
          </div>
        </div>
      </div>
      
      {subtitle && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <p className="text-sm opacity-70">{subtitle}</p>
        </div>
      )}
      
      {onClick && (
        <div className="mt-4 flex items-center text-sm font-medium opacity-80">
          <span>View details</span>
          <FiArrowUpRight className="ml-1 w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;