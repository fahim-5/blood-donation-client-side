import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Custom hook for searching blood donors
 * @returns {Object} Search functions and state
 */
const useSearchDonors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Search for donors based on filters
   * @param {Object} filters - Search filters
   * @param {string} filters.bloodGroup - Blood group to search
   * @param {string} filters.district - District to search in
   * @param {string} filters.upazila - Upazila to search in
   * @returns {Promise<Array>} Array of donor objects
   */
  const searchDonors = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
      if (filters.district) params.append('district', filters.district);
      if (filters.upazila) params.append('upazila', filters.upazila);
      
      // Make API call
      const response = await axios.get(`${API_BASE_URL}/donors/search?${params.toString()}`);
      
      return response.data.data || response.data || [];
      
    } catch (err) {
      console.error('Error searching donors:', err);
      
      // Handle different types of errors
      let errorMessage = 'Failed to search donors';
      
      if (err.response) {
        // Server responded with error status
        switch (err.response.status) {
          case 400:
            errorMessage = 'Invalid search parameters';
            break;
          case 404:
            errorMessage = 'No donors found matching your criteria';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = err.response.data?.message || 'Failed to search donors';
        }
      } else if (err.request) {
        // Request made but no response
        errorMessage = 'Network error. Please check your connection';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  /**
   * Search for donors near a location
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @param {number} radius - Search radius in kilometers
   * @returns {Promise<Array>} Array of donor objects
   */
  const searchDonorsNearby = async (latitude, longitude, radius = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/donors/nearby`, {
        params: { latitude, longitude, radius }
      });
      
      return response.data.data || response.data || [];
      
    } catch (err) {
      console.error('Error searching nearby donors:', err);
      setError('Failed to search nearby donors');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get urgent donors (available immediately)
   * @returns {Promise<Array>} Array of urgent donor objects
   */
  const getUrgentDonors = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/donors/urgent`);
      
      return response.data.data || response.data || [];
      
    } catch (err) {
      console.error('Error getting urgent donors:', err);
      setError('Failed to get urgent donors');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get donor by ID
   * @param {string} donorId - Donor ID
   * @returns {Promise<Object>} Donor object
   */
  const getDonorById = async (donorId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/donors/${donorId}`);
      
      return response.data.data || response.data;
      
    } catch (err) {
      console.error('Error fetching donor:', err);
      setError('Failed to fetch donor details');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear any error state
   */
  const clearError = () => {
    setError(null);
  };

  return {
    // State
    loading,
    error,
    
    // Actions
    searchDonors,
    searchDonorsNearby,
    getUrgentDonors,
    getDonorById,
    clearError,
    
    // Alias for backward compatibility
    search: searchDonors,
  };
};

export default useSearchDonors;