import { apiMethods } from './api';

const searchService = {
  // Search donors
  searchDonors: async (filters) => {
    try {
      const response = await apiMethods.post('/search/donors', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search donation requests
  searchDonations: async (filters) => {
    try {
      const response = await apiMethods.post('/search/donations', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search funding campaigns
  searchFundings: async (filters) => {
    try {
      const response = await apiMethods.post('/search/funding', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search users (admin only)
  searchUsers: async (filters) => {
    try {
      const response = await apiMethods.post('/search/users', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Global search
  globalSearch: async (query, filters = {}) => {
    try {
      const response = await apiMethods.post('/search/global', {
        query,
        ...filters,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search suggestions
  getSuggestions: async (query, type = 'all') => {
    try {
      const response = await apiMethods.get('/search/suggestions', {
        query,
        type,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search filters
  getFilters: async (type = 'donors') => {
    try {
      const response = await apiMethods.get(`/search/filters/${type}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Save search
  saveSearch: async (searchData) => {
    try {
      const response = await apiMethods.post('/search/save', searchData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get saved searches
  getSavedSearches: async (params = {}) => {
    try {
      const response = await apiMethods.get('/search/saved', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete saved search
  deleteSavedSearch: async (id) => {
    try {
      const response = await apiMethods.delete(`/search/saved/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search history
  getSearchHistory: async (params = {}) => {
    try {
      const response = await apiMethods.get('/search/history', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Clear search history
  clearSearchHistory: async () => {
    try {
      const response = await apiMethods.delete('/search/history');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search statistics
  getSearchStats: async () => {
    try {
      const response = await apiMethods.get('/search/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get popular searches
  getPopularSearches: async (limit = 10) => {
    try {
      const response = await apiMethods.get('/search/popular', { limit });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get trending searches
  getTrendingSearches: async (period = 'daily') => {
    try {
      const response = await apiMethods.get(`/search/trending/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export search results
  exportResults: async (type, filters, format = 'csv') => {
    try {
      const response = await apiMethods.post(`/search/export/${type}/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search analytics
  getAnalytics: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/search/analytics/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate search filters
  validateFilters: async (type, filters) => {
    try {
      const response = await apiMethods.post(`/search/validate/${type}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search recommendations
  getRecommendations: async (userId, type = 'donors') => {
    try {
      const response = await apiMethods.get('/search/recommendations', {
        userId,
        type,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get nearby donors
  getNearbyDonors: async (latitude, longitude, radius = 10, filters = {}) => {
    try {
      const response = await apiMethods.post('/search/nearby/donors', {
        latitude,
        longitude,
        radius,
        ...filters,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get nearby donation requests
  getNearbyDonations: async (latitude, longitude, radius = 10, filters = {}) => {
    try {
      const response = await apiMethods.post('/search/nearby/donations', {
        latitude,
        longitude,
        radius,
        ...filters,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Advanced search
  advancedSearch: async (searchData) => {
    try {
      const response = await apiMethods.post('/search/advanced', searchData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search autocomplete
  getAutocomplete: async (query, type = 'all') => {
    try {
      const response = await apiMethods.get('/search/autocomplete', {
        query,
        type,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search facets
  getFacets: async (type, filters = {}) => {
    try {
      const response = await apiMethods.post(`/search/facets/${type}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get search map data
  getMapData: async (type, filters = {}) => {
    try {
      const response = await apiMethods.post(`/search/map/${type}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default searchService;