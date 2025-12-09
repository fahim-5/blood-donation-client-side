import { apiMethods } from './api';

const donationService = {
  // Get all donation requests
  getDonations: async (params = {}) => {
    try {
      const response = await apiMethods.get('/donations', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation by ID
  getDonationById: async (id) => {
    try {
      const response = await apiMethods.get(`/donations/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create donation request
  createDonation: async (donationData) => {
    try {
      const response = await apiMethods.post('/donations', donationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update donation request
  updateDonation: async (id, donationData) => {
    try {
      const response = await apiMethods.put(`/donations/${id}`, donationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete donation request
  deleteDonation: async (id) => {
    try {
      const response = await apiMethods.delete(`/donations/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update donation status
  updateStatus: async (id, statusData) => {
    try {
      const response = await apiMethods.patch(`/donations/${id}/status`, statusData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get my donation requests
  getMyDonations: async (params = {}) => {
    try {
      const response = await apiMethods.get('/donations/my-donations', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get pending donations
  getPendingDonations: async (params = {}) => {
    try {
      const response = await apiMethods.get('/donations/pending', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get urgent donations
  getUrgentDonations: async (params = {}) => {
    try {
      const response = await apiMethods.get('/donations/urgent', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search donations
  searchDonations: async (filters) => {
    try {
      const response = await apiMethods.post('/donations/search', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Donate to a request
  donateToRequest: async (donationId, donorData) => {
    try {
      const response = await apiMethods.post(`/donations/${donationId}/donate`, donorData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donors for a donation request
  getDonorsForRequest: async (donationId) => {
    try {
      const response = await apiMethods.get(`/donations/${donationId}/donors`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Complete donation
  completeDonation: async (donationId) => {
    try {
      const response = await apiMethods.post(`/donations/${donationId}/complete`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cancel donation
  cancelDonation: async (donationId, reason) => {
    try {
      const response = await apiMethods.post(`/donations/${donationId}/cancel`, { reason });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation statistics
  getDonationStats: async () => {
    try {
      const response = await apiMethods.get('/donations/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation timeline
  getDonationTimeline: async (donationId) => {
    try {
      const response = await apiMethods.get(`/donations/${donationId}/timeline`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export donations
  exportDonations: async (format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/donations/export/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation calendar
  getDonationCalendar: async (year, month) => {
    try {
      const response = await apiMethods.get(`/donations/calendar/${year}/${month}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get recent donations
  getRecentDonations: async (limit = 10) => {
    try {
      const response = await apiMethods.get('/donations/recent', { limit });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donations by blood group
  getByBloodGroup: async (bloodGroup, params = {}) => {
    try {
      const response = await apiMethods.get(`/donations/blood-group/${bloodGroup}`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donations by location
  getByLocation: async (district, upazila, params = {}) => {
    try {
      const response = await apiMethods.get('/donations/location', {
        district,
        upazila,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate donation data
  validateDonation: async (donationData) => {
    try {
      const response = await apiMethods.post('/donations/validate', donationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation analytics
  getAnalytics: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/donations/analytics/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default donationService;