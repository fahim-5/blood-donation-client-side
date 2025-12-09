import { apiMethods } from './api';

const fundingService = {
  // Get all funding campaigns
  getFundings: async (params = {}) => {
    try {
      const response = await apiMethods.get('/funding', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding by ID
  getFundingById: async (id) => {
    try {
      const response = await apiMethods.get(`/funding/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create funding campaign
  createFunding: async (fundingData) => {
    try {
      const response = await apiMethods.post('/funding', fundingData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update funding campaign
  updateFunding: async (id, fundingData) => {
    try {
      const response = await apiMethods.put(`/funding/${id}`, fundingData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete funding campaign
  deleteFunding: async (id) => {
    try {
      const response = await apiMethods.delete(`/funding/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Donate to funding campaign
  donate: async (id, donationData) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/donate`, donationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding donations
  getDonations: async (id, params = {}) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/donations`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get my donations
  getMyDonations: async (params = {}) => {
    try {
      const response = await apiMethods.get('/funding/my-donations', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding statistics
  getFundingStats: async () => {
    try {
      const response = await apiMethods.get('/funding/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get active campaigns
  getActiveCampaigns: async (params = {}) => {
    try {
      const response = await apiMethods.get('/funding/active', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get completed campaigns
  getCompletedCampaigns: async (params = {}) => {
    try {
      const response = await apiMethods.get('/funding/completed', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search funding campaigns
  searchFundings: async (filters) => {
    try {
      const response = await apiMethods.post('/funding/search', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update funding status
  updateStatus: async (id, status) => {
    try {
      const response = await apiMethods.patch(`/funding/${id}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding analytics
  getAnalytics: async (id) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/analytics`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export funding data
  exportFundings: async (format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/funding/export/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding timeline
  getTimeline: async (id) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/timeline`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add funding update
  addUpdate: async (id, updateData) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/updates`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding updates
  getUpdates: async (id, params = {}) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/updates`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete funding update
  deleteUpdate: async (id, updateId) => {
    try {
      const response = await apiMethods.delete(`/funding/${id}/updates/${updateId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding comments
  getComments: async (id, params = {}) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/comments`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add comment
  addComment: async (id, commentData) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/comments`, commentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete comment
  deleteComment: async (id, commentId) => {
    try {
      const response = await apiMethods.delete(`/funding/${id}/comments/${commentId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Like funding campaign
  likeFunding: async (id) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/like`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Unlike funding campaign
  unlikeFunding: async (id) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/unlike`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Share funding campaign
  shareFunding: async (id, platform) => {
    try {
      const response = await apiMethods.post(`/funding/${id}/share`, { platform });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding supporters
  getSupporters: async (id, params = {}) => {
    try {
      const response = await apiMethods.get(`/funding/${id}/supporters`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create payment intent (Stripe)
  createPaymentIntent: async (amount, currency = 'bdt') => {
    try {
      const response = await apiMethods.post('/funding/create-payment-intent', {
        amount,
        currency,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, fundingId, amount) => {
    try {
      const response = await apiMethods.post('/funding/confirm-payment', {
        paymentIntentId,
        fundingId,
        amount,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get payment history
  getPaymentHistory: async (params = {}) => {
    try {
      const response = await apiMethods.get('/funding/payment-history', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate donation receipt
  generateReceipt: async (donationId) => {
    try {
      const response = await apiMethods.get(`/funding/receipt/${donationId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding categories
  getCategories: async () => {
    try {
      const response = await apiMethods.get('/funding/categories');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate funding data
  validateFunding: async (fundingData) => {
    try {
      const response = await apiMethods.post('/funding/validate', fundingData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default fundingService;