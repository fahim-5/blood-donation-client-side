import { FiDroplet } from 'react-icons/fi';

const BloodGroupBadge = ({ bloodGroup, size = "md", showIcon = true, variant = "default" }) => {
  if (!bloodGroup) return null;

  const getColorClass = (group) => {
    switch (group) {
      case 'A+':
      case 'A-':
        return variant === 'outline' 
          ? 'border-red-300 text-red-700 bg-red-50'
          : 'bg-red-100 text-red-800 border-red-200';
      
      case 'B+':
      case 'B-':
        return variant === 'outline'
          ? 'border-blue-300 text-blue-700 bg-blue-50'
          : 'bg-blue-100 text-blue-800 border-blue-200';
      
      case 'AB+':
      case 'AB-':
        return variant === 'outline'
          ? 'border-purple-300 text-purple-700 bg-purple-50'
          : 'bg-purple-100 text-purple-800 border-purple-200';
      
      case 'O+':
      case 'O-':
        return variant === 'outline'
          ? 'border-green-300 text-green-700 bg-green-50'
          : 'bg-green-100 text-green-800 border-green-200';
      
      default:
        return variant === 'outline'
          ? 'border-gray-300 text-gray-700 bg-gray-50'
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-4 py-2 text-lg',
    xl: 'px-5 py-2.5 text-xl'
  };

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  return (
    <span className={`
      inline-flex items-center space-x-1.5 rounded-full border font-bold
      ${getColorClass(bloodGroup)} ${sizeClasses[size]}
    `}>
      {showIcon && (
        <FiDroplet className={`${iconSizes[size]} ${variant === 'outline' ? 'opacity-80' : ''}`} />
      )}
      <span>{bloodGroup}</span>
    </span>
  );
};

export default BloodGroupBadge;