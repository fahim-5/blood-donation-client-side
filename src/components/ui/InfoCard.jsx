import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle, FiHelpCircle } from 'react-icons/fi';

const InfoCard = ({
  title,
  description,
  type = 'info', // info, success, warning, error, neutral
  icon: customIcon,
  size = 'md',
  variant = 'filled', // filled, outline, subtle
  action,
  onActionClick,
  dismissible = false,
  onDismiss,
  loading = false
}) => {
  const typeConfig = {
    info: {
      icon: <FiInfo />,
      filled: 'bg-blue-50 border-blue-200 text-blue-800',
      outline: 'border-blue-300 text-blue-700 bg-white',
      subtle: 'bg-blue-100 text-blue-700',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    success: {
      icon: <FiCheckCircle />,
      filled: 'bg-green-50 border-green-200 text-green-800',
      outline: 'border-green-300 text-green-700 bg-white',
      subtle: 'bg-green-100 text-green-700',
      iconBg: 'bg-green-100 text-green-600'
    },
    warning: {
      icon: <FiAlertCircle />,
      filled: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      outline: 'border-yellow-300 text-yellow-700 bg-white',
      subtle: 'bg-yellow-100 text-yellow-700',
      iconBg: 'bg-yellow-100 text-yellow-600'
    },
    error: {
      icon: <FiXCircle />,
      filled: 'bg-red-50 border-red-200 text-red-800',
      outline: 'border-red-300 text-red-700 bg-white',
      subtle: 'bg-red-100 text-red-700',
      iconBg: 'bg-red-100 text-red-600'
    },
    neutral: {
      icon: <FiHelpCircle />,
      filled: 'bg-gray-50 border-gray-200 text-gray-800',
      outline: 'border-gray-300 text-gray-700 bg-white',
      subtle: 'bg-gray-100 text-gray-700',
      iconBg: 'bg-gray-100 text-gray-600'
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className={`
      relative rounded-lg border transition-all
      ${config[variant]} ${sizeClasses[size]}
      ${loading ? 'opacity-70' : ''}
    `}>
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className={`animate-spin rounded-full ${iconSizeClasses[size]} border-b-2 ${type === 'info' ? 'border-blue-600' : type === 'success' ? 'border-green-600' : type === 'warning' ? 'border-yellow-600' : type === 'error' ? 'border-red-600' : 'border-gray-600'}`}></div>
        </div>
      )}

      {/* Dismiss Button */}
      {dismissible && !loading && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <FiXCircle className={iconSizeClasses[size]} />
        </button>
      )}

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 rounded-lg ${config.iconBg}`}>
          {customIcon || <span className={iconSizeClasses[size]}>{config.icon}</span>}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold mb-1">
              {title}
            </h4>
          )}
          
          {description && (
            <p className="opacity-90">
              {description}
            </p>
          )}

          {/* Action */}
          {action && onActionClick && !loading && (
            <button
              onClick={onActionClick}
              className={`mt-3 text-sm font-medium ${
                type === 'info' ? 'text-blue-700 hover:text-blue-800' :
                type === 'success' ? 'text-green-700 hover:text-green-800' :
                type === 'warning' ? 'text-yellow-700 hover:text-yellow-800' :
                type === 'error' ? 'text-red-700 hover:text-red-800' :
                'text-gray-700 hover:text-gray-800'
              } transition-colors`}
            >
              {action}
            </button>
          )}
        </div>
      </div>

      {/* List Items Variant */}
      {Array.isArray(description) && (
        <div className="mt-3 space-y-2">
          {description.map((item, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
                type === 'info' ? 'bg-blue-400' :
                type === 'success' ? 'bg-green-400' :
                type === 'warning' ? 'bg-yellow-400' :
                type === 'error' ? 'bg-red-400' :
                'bg-gray-400'
              }`}></div>
              <span className="text-sm opacity-90">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoCard;