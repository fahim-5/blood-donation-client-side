import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiDroplet, FiImage, FiSave, FiEdit2, FiX } from 'react-icons/fi';
import LocationSelect from '../ui/LocationSelect';
import BloodGroupBadge from '../ui/BloodGroupBadge';

const ProfileEditForm = ({ user, onSave, onCancel, isEditing: externalIsEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    avatar: ''
  });
  
  const [avatarPreview, setAvatarPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(externalIsEditing || false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bloodGroup: user.bloodGroup || '',
        district: user.district || '',
        upazila: user.upazila || '',
        avatar: user.avatar || ''
      });
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  useEffect(() => {
    if (externalIsEditing !== undefined) {
      setIsEditing(externalIsEditing);
    }
  }, [externalIsEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLocationChange = (district, upazila) => {
    setFormData(prev => ({
      ...prev,
      district,
      upazila
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'Image size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.upazila) {
      newErrors.upazila = 'Upazila is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const updatedData = {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        avatar: formData.avatar
      };
      
      if (onSave) {
        await onSave(updatedData);
      }
      
      if (!externalIsEditing) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Profile update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bloodGroup: user.bloodGroup || '',
        district: user.district || '',
        upazila: user.upazila || '',
        avatar: user.avatar || ''
      });
      setAvatarPreview(user.avatar || '');
    }
    setErrors({});
    
    if (onCancel) {
      onCancel();
    }
    
    if (!externalIsEditing) {
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <FiEdit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-sm">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-red-600 w-10 h-10" />
              )}
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{formData.name}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <BloodGroupBadge bloodGroup={formData.bloodGroup} size="lg" />
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-gray-900 font-medium">{formData.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-900 font-medium">
                  {formData.district && formData.upazila 
                    ? `${formData.district}, ${formData.upazila}`
                    : 'Not specified'
                  }
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Blood Group</p>
                <p className="text-gray-900 font-medium">{formData.bloodGroup || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Account Type</p>
                <p className="text-gray-900 font-medium capitalize">{user?.role || 'Donor'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
        <button
          onClick={handleCancel}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <FiX className="w-4 h-4 mr-2" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } ${isSubmitting ? 'bg-gray-50' : ''}`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field (Read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                readOnly
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>

          {/* Blood Group Field */}
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDroplet className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none ${
                  errors.bloodGroup ? 'border-red-300' : 'border-gray-300'
                } ${isSubmitting ? 'bg-gray-50' : ''}`}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            {errors.bloodGroup && (
              <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>
            )}
          </div>

          {/* Location Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <LocationSelect
              selectedDistrict={formData.district}
              selectedUpazila={formData.upazila}
              onChange={handleLocationChange}
              disabled={isSubmitting}
              error={errors.district || errors.upazila}
            />
            {(errors.district || errors.upazila) && (
              <p className="mt-1 text-sm text-red-600">{errors.district || errors.upazila}</p>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Profile Picture
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiImage className="h-10 w-10 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="cursor-pointer">
                  <div className={`px-4 py-3 border rounded-lg transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-100 border-gray-300 text-gray-400' 
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}>
                    <span className="text-sm font-medium">
                      {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </div>
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  JPG, PNG or GIF (Max 5MB)
                </p>
              </div>
            </div>
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
            )}
          </div>
        </div>

        {/* Selected Blood Group Preview */}
        {formData.bloodGroup && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <BloodGroupBadge bloodGroup={formData.bloodGroup} size="lg" />
              <div>
                <p className="font-medium text-gray-900">
                  Your blood group: {formData.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  This information helps recipients find compatible donors
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;