import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle network errors
    if (!response) {
      console.error('Network Error:', error.message);
      return Promise.reject({
        success: false,
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    }

    // Handle specific status codes
    const { status, data } = response;
    
    switch (status) {
      case 401:
        // Unauthorized - token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        break;
      
      case 403:
        // Forbidden - insufficient permissions
        console.error('Forbidden:', data.message);
        break;
      
      case 404:
        // Not found
        console.error('Not Found:', data.message);
        break;
      
      case 422:
        // Validation error
        console.error('Validation Error:', data.errors);
        break;
      
      case 500:
        // Server error
        console.error('Server Error:', data.message);
        break;
      
      default:
        console.error('API Error:', data.message);
    }

    return Promise.reject({
      success: false,
      message: data?.message || 'An error occurred',
      errors: data?.errors,
      status,
    });
  }
);

// Generic API methods
export const apiMethods = {
  // GET request
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}) => {
    try {
      const response = await api.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload file
  upload: async (url, formData, onUploadProgress) => {
    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Custom hook-like function for API calls with loading state
export const createApiService = (serviceName) => {
  return {
    // Helper to handle API calls with loading state
    call: async (apiCall, ...args) => {
      try {
        return await apiCall(...args);
      } catch (error) {
        console.error(`${serviceName} Error:`, error);
        throw error;
      }
    },

    // Create CRUD operations for a resource
    createResource: (resourceName) => ({
      getAll: (params) => apiMethods.get(`/${resourceName}`, params),
      getById: (id) => apiMethods.get(`/${resourceName}/${id}`),
      create: (data) => apiMethods.post(`/${resourceName}`, data),
      update: (id, data) => apiMethods.put(`/${resourceName}/${id}`, data),
      delete: (id) => apiMethods.delete(`/${resourceName}/${id}`),
      search: (params) => apiMethods.get(`/${resourceName}/search`, params),
    }),
  };
};

export default api;