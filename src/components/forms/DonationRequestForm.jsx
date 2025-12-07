import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiMapPin, FiDroplet, FiCalendar, FiClock, FiMessageSquare, FiHome } from 'react-icons/fi';
import LocationSelect from '../ui/LocationSelect';
import BloodGroupBadge from '../ui/BloodGroupBadge';

const DonationRequestForm = ({ initialData = {}, onSubmit, isEdit = false, isLoading = false }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
    requesterName: user?.name || '',
    requesterEmail: user?.email || ''
  });
  
  const [errors, setErrors] = useState({});

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        recipientName: initialData.recipientName || '',
        recipientDistrict: initialData.recipientDistrict || '',
        recipientUpazila: initialData.recipientUpazila || '',
        hospitalName: initialData.hospitalName || '',
        fullAddress: initialData.fullAddress || '',
        bloodGroup: initialData.bloodGroup || '',
        donationDate: initialData.donationDate 
          ? new Date(initialData.donationDate).toISOString().split('T')[0]
          : '',
        donationTime: initialData.donationTime || '',
        requestMessage: initialData.requestMessage || '',
        requesterName: user?.name || '',
        requesterEmail: user?.email || ''
      });
    } else {
      setFormData(prev => ({
        ...prev,
        requesterName: user?.name || '',
        requesterEmail: user?.email || ''
      }));
    }
  }, [initialData, isEdit, user]);

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
      recipientDistrict: district,
      recipientUpazila: upazila
    }));
    
    if (errors.recipientDistrict || errors.recipientUpazila) {
      setErrors(prev => ({
        ...prev,
        recipientDistrict: '',
        recipientUpazila: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }
    
    if (!formData.recipientDistrict) {
      newErrors.recipientDistrict = 'District is required';
    }
    
    if (!formData.recipientUpazila) {
      newErrors.recipientUpazila = 'Upazila is required';
    }
    
    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital name is required';
    }
    
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full address is required';
    }
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.donationDate) {
      newErrors.donationDate = 'Donation date is required';
    } else {
      const selectedDate = new Date(formData.donationDate);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.donationDate = 'Donation date cannot be in the past';
      }
    }
    
    if (!formData.donationTime) {
      newErrors.donationTime = 'Donation time is required';
    }
    
    if (!formData.requestMessage.trim()) {
      newErrors.requestMessage = 'Request message is required';
    } else if (formData.requestMessage.trim().length < 20) {
      newErrors.requestMessage = 'Please provide more details (at least 20 characters)';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Donation Request' : 'Create Donation Request'}
          </h2>
          <p className="text-gray-600 mt-1">
            Fill in the details below to request blood donation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requester Info (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requester Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.requesterName}
                  readOnly
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requester Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.requesterEmail}
                  readOnly
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient Name */}
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  value={formData.recipientName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.recipientName ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
                  placeholder="Enter recipient's full name"
                />
              </div>
              {errors.recipientName && (
                <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                Required Blood Group *
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
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none ${
                    errors.bloodGroup ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
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

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Location *
              </label>
              <LocationSelect
                selectedDistrict={formData.recipientDistrict}
                selectedUpazila={formData.recipientUpazila}
                onChange={handleLocationChange}
                disabled={isLoading}
                error={errors.recipientDistrict || errors.recipientUpazila}
              />
              {(errors.recipientDistrict || errors.recipientUpazila) && (
                <p className="mt-1 text-sm text-red-600">{errors.recipientDistrict || errors.recipientUpazila}</p>
              )}
            </div>

            {/* Hospital Name */}
            <div className="md:col-span-2">
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.hospitalName ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
                  placeholder="e.g., Dhaka Medical College Hospital"
                />
              </div>
              {errors.hospitalName && (
                <p className="mt-1 text-sm text-red-600">{errors.hospitalName}</p>
              )}
            </div>

            {/* Full Address */}
            <div className="md:col-span-2">
              <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Full Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullAddress"
                  name="fullAddress"
                  type="text"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.fullAddress ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
                  placeholder="e.g., Zahir Raihan Rd, Dhaka 1000"
                />
              </div>
              {errors.fullAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.fullAddress}</p>
              )}
            </div>

            {/* Donation Date */}
            <div>
              <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Donation Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="donationDate"
                  name="donationDate"
                  type="date"
                  value={formData.donationDate}
                  onChange={handleChange}
                  disabled={isLoading}
                  min={minDate}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.donationDate ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
                />
              </div>
              {errors.donationDate && (
                <p className="mt-1 text-sm text-red-600">{errors.donationDate}</p>
              )}
            </div>

            {/* Donation Time */}
            <div>
              <label htmlFor="donationTime" className="block text-sm font-medium text-gray-700 mb-1">
                Donation Time *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="donationTime"
                  name="donationTime"
                  type="time"
                  value={formData.donationTime}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.donationTime ? 'border-red-300' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-50' : ''}`}
                />
              </div>
              {errors.donationTime && (
                <p className="mt-1 text-sm text-red-600">{errors.donationTime}</p>
              )}
            </div>
          </div>

          {/* Request Message */}
          <div>
            <label htmlFor="requestMessage" className="block text-sm font-medium text-gray-700 mb-1">
              Request Message *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3">
                <FiMessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="requestMessage"
                name="requestMessage"
                rows={5}
                value={formData.requestMessage}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none ${
                  errors.requestMessage ? 'border-red-300' : 'border-gray-300'
                } ${isLoading ? 'bg-gray-50' : ''}`}
                placeholder="Please explain why blood is needed, medical condition, and any other important information..."
              />
            </div>
            {errors.requestMessage && (
              <p className="mt-1 text-sm text-red-600">{errors.requestMessage}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Minimum 20 characters. Please provide clear details to help donors understand the urgency.
            </p>
          </div>

          {/* Blood Group Preview */}
          {formData.bloodGroup && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BloodGroupBadge bloodGroup={formData.bloodGroup} size="lg" />
                <div>
                  <p className="font-medium text-gray-900">
                    Requesting {formData.bloodGroup} blood for {formData.recipientName || 'the recipient'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Donors with matching blood group will be notified of your request
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isEdit ? 'Updating Request...' : 'Creating Request...'}
                </>
              ) : (
                <>
                  {isEdit ? 'Update Donation Request' : 'Create Donation Request'}
                </>
              )}
            </button>
            
            <p className="mt-3 text-sm text-gray-500">
              * Required fields. Your request will be visible to potential donors after submission.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationRequestForm;