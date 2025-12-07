import { useState } from 'react';
import { FiSearch, FiDroplet, FiMapPin, FiFilter } from 'react-icons/fi';
import LocationSelect from '../ui/LocationSelect';

const SearchDonorForm = ({ onSubmit, isLoading = false, initialFilters = {} }) => {
  const [formData, setFormData] = useState({
    bloodGroup: initialFilters.bloodGroup || '',
    district: initialFilters.district || '',
    upazila: initialFilters.upazila || '',
    availability: initialFilters.availability || 'all'
  });

  const [errors, setErrors] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const availabilityOptions = [
    { value: 'all', label: 'All Donors' },
    { value: 'available', label: 'Available Now' },
    { value: 'recent', label: 'Recently Donated' }
  ];

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

  const validateForm = () => {
    const newErrors = {};
    
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

  const handleReset = () => {
    setFormData({
      bloodGroup: '',
      district: '',
      upazila: '',
      availability: 'all'
    });
    setErrors({});
    setShowAdvanced(false);
    
    if (onSubmit) {
      onSubmit({
        bloodGroup: '',
        district: '',
        upazila: '',
        availability: 'all'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Find Blood Donors</h2>
        <p className="text-gray-600 mt-1">
          Search for compatible blood donors in your area
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group *
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
              Location *
            </label>
            <LocationSelect
              selectedDistrict={formData.district}
              selectedUpazila={formData.upazila}
              onChange={handleLocationChange}
              disabled={isLoading}
              error={errors.district || errors.upazila}
            />
            {(errors.district || errors.upazila) && (
              <p className="mt-1 text-sm text-red-600">{errors.district || errors.upazila}</p>
            )}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <FiFilter className="w-4 h-4 mr-2" />
            {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                Donor Availability
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availabilityOptions.map(option => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={option.value}
                      checked={formData.availability === option.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional filters can be added here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Donation
                </label>
                <select
                  name="lastDonation"
                  value={formData.lastDonation || ''}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Any Time</option>
                  <option value="1month">Within 1 Month</option>
                  <option value="3months">Within 3 Months</option>
                  <option value="6months">Within 6 Months</option>
                  <option value="1year">Within 1 Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  name="sortBy"
                  value={formData.sortBy || 'relevance'}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="distance">Nearest First</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <FiSearch className="w-5 h-5 mr-2" />
                Search Donors
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Filters
          </button>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-2">💡 Search Tips:</p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Select the exact blood group needed for best matches</li>
            <li>• Choose your location to find nearby donors</li>
            <li>• Use "Available Now" filter for urgent requests</li>
            <li>• Contact donors directly through their profiles</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default SearchDonorForm;