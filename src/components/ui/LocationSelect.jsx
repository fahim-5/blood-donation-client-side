import { useState, useEffect } from 'react';
import { FiMapPin, FiChevronDown, FiX } from 'react-icons/fi';
import { getDistricts, getUpazilasByDistrict } from '../../utils/locationData'; // Import the helper functions

const LocationSelect = ({
  selectedDistrict = '',
  selectedUpazila = '',
  onChange,
  disabled = false,
  error = '',
  placeholderDistrict = 'Select District',
  placeholderUpazila = 'Select Upazila',
  required = true,
  label = 'Location',
  showLabel = true,
  size = 'md'
}) => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load districts using the helper function
    const districtsList = getDistricts();
    setDistricts(districtsList);
  }, []);

  useEffect(() => {
    // Load upazilas based on selected district
    if (selectedDistrict) {
      const districtUpazilas = getUpazilasByDistrict(selectedDistrict);
      setUpazilas(districtUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    onChange(district, '');
  };

  const handleUpazilaChange = (e) => {
    const upazila = e.target.value;
    onChange(selectedDistrict, upazila);
  };

  const handleClear = () => {
    onChange('', '');
  };

  const sizeClasses = {
    sm: 'py-2 text-sm',
    md: 'py-3',
    lg: 'py-4 text-lg'
  };

  const inputClasses = `
    block w-full pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${sizeClasses[size]}
  `;

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {(selectedDistrict || selectedUpazila) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-600 hover:text-red-700 flex items-center space-x-1"
            >
              <FiX className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* District Select */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={disabled || isLoading}
            className={inputClasses}
          >
            <option value="">{placeholderDistrict}</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Upazila Select */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedUpazila}
            onChange={handleUpazilaChange}
            disabled={disabled || isLoading || !selectedDistrict}
            className={inputClasses}
          >
            <option value="">{placeholderUpazila}</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Selected Location Preview */}
      {(selectedDistrict || selectedUpazila) && !error && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
          <FiMapPin className="w-4 h-4 text-red-500" />
          <span>
            {selectedDistrict && districts.find(d => d.id === selectedDistrict)?.name}
            {selectedUpazila && `, ${upazilas.find(u => u.id === selectedUpazila)?.name || selectedUpazila}`}
          </span>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-1">
        Select your district first, then choose the upazila
      </p>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      )}
    </div>
  );
};

export default LocationSelect;