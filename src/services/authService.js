import { apiMethods } from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await apiMethods.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await apiMethods.post('/auth/login', credentials);
      
      if (response.success && response.data) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await apiMethods.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response;
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiMethods.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await apiMethods.post('/auth/change-password', passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiMethods.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiMethods.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await apiMethods.post('/auth/verify-email', { token });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await apiMethods.post('/auth/resend-verification', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Check if email exists
  checkEmailExists: async (email) => {
    try {
      const response = await apiMethods.post('/auth/check-email', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiMethods.post('/auth/refresh-token');
      
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user status (admin only)
  updateUserStatus: async (userId, status) => {
    try {
      const response = await apiMethods.patch(`/auth/users/${userId}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Check authentication status
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return { success: false, message: 'No token found' };
      }
      
      const response = await apiMethods.get('/auth/check');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get auth statistics
  getAuthStats: async () => {
    try {
      const response = await apiMethods.get('/auth/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate token
  validateToken: async (token) => {
    try {
      const response = await apiMethods.post('/auth/validate-token', { token });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;