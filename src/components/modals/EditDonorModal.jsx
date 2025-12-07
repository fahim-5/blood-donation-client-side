// client/src/components/modals/EditDonorModal.jsx
import { FiX, FiUser, FiMail, FiMapPin, FiDroplet, FiUpload, FiCamera } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import BloodGroupBadge from '../ui/BloodGroupBadge';
import LocationSelect from '../ui/LocationSelect';
import AvatarUpload from '../ui/AvatarUpload';

const EditDonorModal = ({
  isOpen,
  onClose,
  donor,
  onSave,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    phone: '',
    avatar: '',
    lastDonationDate: ''
  });
  
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');

  // Initialize form data when donor changes
  useEffect(() => {
    if (donor) {
      setFormData({
        name: donor.name || '',
        email: donor.email || '',
        bloodGroup: donor.bloodGroup || '',
        district: donor.district || '',
        upazila: donor.upazila || '',
        phone: donor.phone || '',
        avatar: donor.avatar || '',
        lastDonationDate: donor.lastDonationDate ? new Date(donor.lastDonationDate).toISOString().split('T')[0] : ''
      });
      setAvatarPreview(donor.avatar || '');
    }
  }, [donor]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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

    if (formData.phone && !/^[0-9+\-\s()]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLocationChange = (district, upazila) => {
    setFormData(prev => ({
      ...prev,
      district,
      upazila
    }));
    // Clear location errors
    setErrors(prev => ({ 
      ...prev, 
      district: '', 
      upazila: '' 
    }));
  };

  const handleAvatarUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, avatar: imageUrl }));
    setAvatarPreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen || !donor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Donor Information
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Update donor details and contact information
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="p-6 space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      {avatarPreview ? (
                        <img 
                          src={avatarPreview} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FiUser className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <AvatarUpload 
                      onUpload={handleAvatarUpload}
                      className="absolute bottom-0 right-0"
                      buttonSize="sm"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Click the camera icon to update profile picture
                  </p>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <FiUser className="w-5 h-5 mr-2 text-gray-500" />
                    Personal Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg">
                        <FiMail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{formData.email}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    {/* Blood Group */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Group *
                      </label>
                      <div className="relative">
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none ${
                            errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <FiDroplet className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      {errors.bloodGroup && (
                        <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>
                      )}
                    </div>

                    {/* Last Donation Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Donation Date
                      </label>
                      <input
                        type="date"
                        name="lastDonationDate"
                        value={formData.lastDonationDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Leave empty if never donated before
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <FiMapPin className="w-5 h-5 mr-2 text-gray-500" />
                    Location Information *
                  </h4>
                  
                  <LocationSelect
                    selectedDistrict={formData.district}
                    selectedUpazila={formData.upazila}
                    onChange={handleLocationChange}
                    errors={errors}
                  />
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Note:</span> Your location helps us match you with nearby donation requests and show you to users searching for donors in your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="mt-3 sm:mt-0 w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonorModal;