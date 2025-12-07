import { useState } from 'react';
import { FiUser, FiUpload, FiX, FiCheck } from 'react-icons/fi';

const AvatarUpload = ({
  currentAvatar = '',
  onUpload,
  onRemove,
  size = 'md',
  disabled = false,
  loading = false
}) => {
  const [preview, setPreview] = useState(currentAvatar);
  const [error, setError] = useState('');

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setPreview(imageUrl);
      
      // Call onUpload callback with file and preview
      if (onUpload) {
        onUpload(file, imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    setError('');
    if (onRemove) {
      onRemove();
    }
  };

  const handleTriggerUpload = () => {
    if (disabled || loading) return;
    document.getElementById('avatar-upload-input').click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Preview */}
      <div className={`relative ${sizeClasses[size]} mb-4`}>
        <div className={`
          w-full h-full rounded-full border-2 border-dashed 
          flex items-center justify-center overflow-hidden
          ${preview ? 'border-transparent' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50 cursor-pointer hover:bg-gray-100'}
          transition-all duration-200
        `}>
          {preview ? (
            <img
              src={preview}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser className={`text-gray-400 ${size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'}`} />
          )}
          
          {/* Upload Overlay */}
          {!disabled && !loading && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
              onClick={handleTriggerUpload}
            >
              <div className="opacity-0 hover:opacity-100 transition-opacity">
                <FiUpload className="text-white w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        {/* Remove Button */}
        {preview && !disabled && !loading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Upload Controls */}
      <div className="space-y-2">
        {/* Hidden File Input */}
        <input
          id="avatar-upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || loading}
          className="hidden"
        />

        {/* Upload Button */}
        {!preview && !disabled && !loading && (
          <button
            type="button"
            onClick={handleTriggerUpload}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <FiUpload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        )}

        {/* Change Button */}
        {preview && !disabled && !loading && (
          <button
            type="button"
            onClick={handleTriggerUpload}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <FiUpload className="w-4 h-4" />
            <span>Change Photo</span>
          </button>
        )}

        {/* Success Message */}
        {preview && !error && !loading && (
          <div className="flex items-center justify-center space-x-1 text-green-600 text-sm">
            <FiCheck className="w-4 h-4" />
            <span>Photo uploaded</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm text-center max-w-xs">
            {error}
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-gray-500 text-center">
          JPG, PNG, GIF, WebP • Max 5MB
        </div>
      </div>

      {/* Size Indicator */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['sm', 'md', 'lg', 'xl'].map((sizeOption) => (
          <button
            key={sizeOption}
            type="button"
            onClick={() => {}}
            className={`text-xs px-2 py-1 rounded ${
              size === sizeOption
                ? 'bg-red-100 text-red-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {sizeOption.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarUpload;