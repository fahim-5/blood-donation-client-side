import { FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';

const FeatureCard = ({
  title,
  description,
  icon,
  color = 'blue',
  variant = 'default',
  stats = null,
  tags = [],
  actionLabel = 'Learn more',
  onClick,
  highlighted = false,
  loading = false
}) => {
  const colorClasses = {
    red: {
      default: 'bg-red-50 border-red-100 text-red-800',
      outline: 'border-red-300 text-red-700 bg-white',
      solid: 'bg-red-600 text-white border-red-600'
    },
    blue: {
      default: 'bg-blue-50 border-blue-100 text-blue-800',
      outline: 'border-blue-300 text-blue-700 bg-white',
      solid: 'bg-blue-600 text-white border-blue-600'
    },
    green: {
      default: 'bg-green-50 border-green-100 text-green-800',
      outline: 'border-green-300 text-green-700 bg-white',
      solid: 'bg-green-600 text-white border-green-600'
    },
    purple: {
      default: 'bg-purple-50 border-purple-100 text-purple-800',
      outline: 'border-purple-300 text-purple-700 bg-white',
      solid: 'bg-purple-600 text-white border-purple-600'
    },
    yellow: {
      default: 'bg-yellow-50 border-yellow-100 text-yellow-800',
      outline: 'border-yellow-300 text-yellow-700 bg-white',
      solid: 'bg-yellow-600 text-white border-yellow-600'
    }
  };

  const iconColorClasses = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  const textColorClasses = {
    red: variant === 'solid' ? 'text-white' : 'text-red-900',
    blue: variant === 'solid' ? 'text-white' : 'text-blue-900',
    green: variant === 'solid' ? 'text-white' : 'text-green-900',
    purple: variant === 'solid' ? 'text-white' : 'text-purple-900',
    yellow: variant === 'solid' ? 'text-white' : 'text-yellow-900'
  };

  const descColorClasses = {
    red: variant === 'solid' ? 'text-red-100' : 'text-red-700',
    blue: variant === 'solid' ? 'text-blue-100' : 'text-blue-700',
    green: variant === 'solid' ? 'text-green-100' : 'text-green-700',
    purple: variant === 'solid' ? 'text-purple-100' : 'text-purple-700',
    yellow: variant === 'solid' ? 'text-yellow-100' : 'text-yellow-700'
  };

  return (
    <div className={`
      relative rounded-xl border p-6 transition-all duration-300
      ${colorClasses[color][variant]}
      ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}
      ${highlighted ? 'ring-2 ring-current ring-opacity-50' : ''}
    `}>
      {/* Highlight Badge */}
      {highlighted && (
        <div className="absolute -top-2 right-4">
          <div className="flex items-center space-x-1 bg-current text-white px-3 py-1 rounded-full text-xs font-medium">
            <FiStar className="w-3 h-3" />
            <span>Popular</span>
          </div>
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex p-3 rounded-xl ${iconColorClasses[color]} mb-4`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-3 ${textColorClasses[color]}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`mb-4 ${descColorClasses[color]}`}>
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                variant === 'solid'
                  ? 'bg-white bg-opacity-20 text-white'
                  : 'bg-current bg-opacity-10 text-current'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className={`mb-4 p-3 rounded-lg ${
          variant === 'solid' ? 'bg-white bg-opacity-10' : 'bg-current bg-opacity-5'
        }`}>
          <div className="flex items-center justify-between">
            {Object.entries(stats).map(([key, value], index) => (
              <div key={key} className="text-center">
                <div className={`text-2xl font-bold ${textColorClasses[color]}`}>
                  {value}
                </div>
                <div className={`text-xs ${descColorClasses[color]}`}>
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features List */}
      {variant === 'solid' && (
        <div className="mb-6 space-y-2">
          {['24/7 Support', 'Easy to Use', 'Secure Platform', 'Quick Response'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <FiCheck className="w-4 h-4 text-green-300" />
              <span className="text-sm text-white text-opacity-90">{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      {onClick && (
        <button
          onClick={onClick}
          className={`w-full mt-4 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            variant === 'solid'
              ? 'bg-white text-current hover:bg-opacity-90'
              : 'bg-current text-white hover:opacity-90'
          }`}
        >
          <span>{actionLabel}</span>
          <FiArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;