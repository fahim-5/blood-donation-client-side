import { FiCheck, FiX, FiClock, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

const StatusButton = ({
  status = 'pending', // pending, inprogress, done, canceled, processing
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'default', // default, outline, subtle, solid
  icon: customIcon,
  label = '',
  showIcon = true,
  fullWidth = false,
  confirmation = false
}) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: <FiClock />,
      default: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
      outline: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50',
      subtle: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
      solid: 'bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700'
    },
    inprogress: {
      label: 'In Progress',
      icon: <FiRefreshCw />,
      default: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      outline: 'border-blue-300 text-blue-700 hover:bg-blue-50',
      subtle: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      solid: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
    },
    done: {
      label: 'Completed',
      icon: <FiCheck />,
      default: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      outline: 'border-green-300 text-green-700 hover:bg-green-50',
      subtle: 'bg-green-50 text-green-700 hover:bg-green-100',
      solid: 'bg-green-600 text-white border-green-600 hover:bg-green-700'
    },
    canceled: {
      label: 'Canceled',
      icon: <FiX />,
      default: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      outline: 'border-red-300 text-red-700 hover:bg-red-50',
      subtle: 'bg-red-50 text-red-700 hover:bg-red-100',
      solid: 'bg-red-600 text-white border-red-600 hover:bg-red-700'
    },
    processing: {
      label: 'Processing',
      icon: <FiRefreshCw className="animate-spin" />,
      default: 'bg-purple-100 text-purple-800 border-purple-200',
      outline: 'border-purple-300 text-purple-700',
      subtle: 'bg-purple-50 text-purple-700',
      solid: 'bg-purple-600 text-white border-purple-600'
    },
    warning: {
      label: 'Warning',
      icon: <FiAlertCircle />,
      default: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
      outline: 'border-orange-300 text-orange-700 hover:bg-orange-50',
      subtle: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      solid: 'bg-orange-600 text-white border-orange-600 hover:bg-orange-700'
    }
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg'
  };

  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const config = statusConfig[status] || statusConfig.pending;
  const displayLabel = label || config.label;
  const displayIcon = customIcon || config.icon;

  const baseClasses = `
    inline-flex items-center space-x-2 rounded-lg border font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full justify-center' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${confirmation ? 'ring-2 ring-current ring-opacity-50' : ''}
  `;

  const variantClasses = config[variant] || config.default;

  const focusRingColors = {
    pending: 'focus:ring-yellow-500',
    inprogress: 'focus:ring-blue-500',
    done: 'focus:ring-green-500',
    canceled: 'focus:ring-red-500',
    processing: 'focus:ring-purple-500',
    warning: 'focus:ring-orange-500'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses}
        ${focusRingColors[status]}
        ${loading ? 'relative' : ''}
      `}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-current bg-opacity-20 rounded-lg">
          <FiRefreshCw className={`${iconSizeClasses[size]} animate-spin`} />
        </div>
      )}

      {/* Icon */}
      {showIcon && !loading && (
        <span className={iconSizeClasses[size]}>
          {displayIcon}
        </span>
      )}

      {/* Label */}
      <span className={loading ? 'invisible' : ''}>
        {displayLabel}
      </span>

      {/* Confirmation Badge */}
      {confirmation && !loading && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </button>
  );
};

// Convenience components for common status buttons
export const PendingButton = (props) => (
  <StatusButton status="pending" {...props} />
);

export const InProgressButton = (props) => (
  <StatusButton status="inprogress" {...props} />
);

export const DoneButton = (props) => (
  <StatusButton status="done" {...props} />
);

export const CanceledButton = (props) => (
  <StatusButton status="canceled" {...props} />
);

export const ProcessingButton = (props) => (
  <StatusButton status="processing" {...props} />
);

export const WarningButton = (props) => (
  <StatusButton status="warning" {...props} />
);

export default StatusButton;
export {
  PendingButton,
  InProgressButton,
  DoneButton,
  CanceledButton,
  ProcessingButton,
  WarningButton
};