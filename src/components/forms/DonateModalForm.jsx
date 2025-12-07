import { useState } from 'react';
import { FiUser, FiMail, FiCheck, FiX } from 'react-icons/fi';

const DonateModalForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false,
  requestDetails 
}) => {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    confirmation: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.confirmation) {
      newErrors.confirmation = 'You must confirm to proceed with donation';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Blood Donation
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              You're about to donate blood for this request
            </p>
          </div>

          {/* Request Info */}
          {requestDetails && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-100">
              <h4 className="font-medium text-red-800 mb-2">Request Details:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Recipient:</span>
                  <span className="font-medium">{requestDetails.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Blood Group:</span>
                  <span className="font-medium">{requestDetails.bloodGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Location:</span>
                  <span className="font-medium">{requestDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Hospital:</span>
                  <span className="font-medium">{requestDetails.hospitalName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Donor Name (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.donorName}
                  readOnly
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            {/* Donor Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.donorEmail}
                  readOnly
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            {/* Donation Confirmation */}
            <div className={`border rounded-lg p-4 ${
              errors.confirmation ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <input
                    id="confirmation"
                    name="confirmation"
                    type="checkbox"
                    checked={formData.confirmation}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-4 w-4 mt-1 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="confirmation" className="block text-sm font-medium text-gray-900">
                    I confirm that:
                  </label>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <FiCheck className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>I am eligible to donate blood</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>I have read the donation guidelines</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>I will go to the specified hospital</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheck className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>I understand this is a voluntary commitment</span>
                    </li>
                  </ul>
                </div>
              </div>
              {errors.confirmation && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmation}</p>
              )}
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-800 mb-1">⚠️ Important Notice</p>
              <p className="text-sm text-yellow-700">
                By confirming, you commit to donating blood. Please ensure you can fulfill this commitment.
                The request status will change to "In Progress" and your contact information will be shared with the requester.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Confirming...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-4 h-4 mr-2" />
                    Confirm Donation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateModalForm;