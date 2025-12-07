import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiArrowRight } from 'react-icons/fi';

const StatsCard = ({
  title,
  value,
  icon,
  color = 'blue',
  trend = null, // 'up', 'down', or null
  trendValue = '',
  changeText = '',
  subtitle = '',
  onClick,
  loading = false,
  format = 'number', // 'number', 'percentage', 'currency', 'time'
  compact = false,
  highlight = false
}) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-800',
      icon: 'bg-red-100 text-red-600',
      trendUp: 'text-red-600',
      trendDown: 'text-red-400'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-800',
      icon: 'bg-blue-100 text-blue-600',
      trendUp: 'text-blue-600',
      trendDown: 'text-blue-400'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      icon: 'bg-green-100 text-green-600',
      trendUp: 'text-green-600',
      trendDown: 'text-green-400'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      text: 'text-purple-800',
      icon: 'bg-purple-100 text-purple-600',
      trendUp: 'text-purple-600',
      trendDown: 'text-purple-400'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
      text: 'text-yellow-800',
      icon: 'bg-yellow-100 text-yellow-600',
      trendUp: 'text-yellow-600',
      trendDown: 'text-yellow-400'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-indigo-800',
      icon: 'bg-indigo-100 text-indigo-600',
      trendUp: 'text-indigo-600',
      trendDown: 'text-indigo-400'
    }
  };

  const formatValue = (val) => {
    if (val === undefined || val === null) return '0';
    
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `৳${Number(val).toLocaleString()}`;
      case 'time':
        return `${val} days`;
      default:
        return Number(val).toLocaleString();
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  if (compact) {
    return (
      <div 
        className={`
          relative rounded-lg border p-4 transition-all
          ${colors.bg} ${colors.border} ${colors.text}
          ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-1' : ''}
          ${highlight ? 'ring-2 ring-current ring-opacity-30' : ''}
        `}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
            {loading ? (
              <div className="h-7 w-20 bg-current bg-opacity-20 rounded animate-pulse"></div>
            ) : (
              <p className="text-2xl font-bold">{formatValue(value)}</p>
            )}
          </div>
          
          <div className={`p-2 rounded-lg ${colors.icon}`}>
            {icon}
          </div>
        </div>

        {(trend || changeText) && !loading && (
          <div className="flex items-center space-x-2 mt-2">
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${
                trend === 'up' ? colors.trendUp : colors.trendDown
              }`}>
                {trend === 'up' ? (
                  <FiTrendingUp className="w-4 h-4" />
                ) : (
                  <FiTrendingDown className="w-4 h-4" />
                )}
                <span>{trendValue}</span>
              </div>
            )}
            {changeText && (
              <span className="text-xs opacity-70">{changeText}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`
        relative rounded-xl border p-6 transition-all
        ${colors.bg} ${colors.border} ${colors.text}
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}
        ${highlight ? 'ring-2 ring-current ring-opacity-30' : ''}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          {loading ? (
            <div className="h-10 w-32 bg-current bg-opacity-20 rounded mt-2 animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold mt-2">{formatValue(value)}</p>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${colors.icon}`}>
          {icon}
        </div>
      </div>

      {/* Trend & Change */}
      {(trend || changeText || subtitle) && !loading && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {subtitle && (
              <p className="text-sm opacity-70">{subtitle}</p>
            )}
            
            {changeText && (
              <p className="text-xs opacity-70">{changeText}</p>
            )}
          </div>
          
          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              trend === 'up' ? colors.trendUp : colors.trendDown
            }`}>
              {trend === 'up' ? (
                <FiTrendingUp className="w-5 h-5" />
              ) : (
                <FiTrendingDown className="w-5 h-5" />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      )}

      {/* Comparison Bar */}
      {trend && !loading && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{trendValue}</span>
          </div>
          <div className="h-2 bg-current bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                trend === 'up' ? colors.trendUp : colors.trendDown
              }`}
              style={{ 
                width: trend === 'up' ? '75%' : '25%',
                backgroundColor: 'currentColor'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Button */}
      {onClick && !loading && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <button className="flex items-center text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
            <span>View details</span>
            <FiArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${colors.text}`}></div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;