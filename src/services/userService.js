import { apiMethods } from './api';

const userService = {
  // Get all users (admin only)
  getUsers: async (params = {}) => {
    try {
      const response = await apiMethods.get('/users', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await apiMethods.get(`/users/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiMethods.put(`/users/${id}`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    try {
      const response = await apiMethods.delete(`/users/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Block user (admin only)
  blockUser: async (id) => {
    try {
      const response = await apiMethods.patch(`/users/${id}/block`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Unblock user (admin only)
  unblockUser: async (id) => {
    try {
      const response = await apiMethods.patch(`/users/${id}/unblock`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Change user role (admin only)
  changeRole: async (id, role) => {
    try {
      const response = await apiMethods.patch(`/users/${id}/role`, { role });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search donors
  searchDonors: async (filters) => {
    try {
      const response = await apiMethods.post('/users/search/donors', filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user statistics
  getStatistics: async () => {
    try {
      const response = await apiMethods.get('/users/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get active donors
  getActiveDonors: async (params = {}) => {
    try {
      const response = await apiMethods.get('/users/active-donors', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user activity
  getUserActivity: async (userId, params = {}) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/activity`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user donations
  getUserDonations: async (userId, params = {}) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/donations`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify user (admin only)
  verifyUser: async (userId) => {
    try {
      const response = await apiMethods.patch(`/users/${userId}/verify`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send verification reminder
  sendVerificationReminder: async (userId) => {
    try {
      const response = await apiMethods.post(`/users/${userId}/send-verification`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export users
  exportUsers: async (format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/users/export/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update users (admin only)
  bulkUpdateUsers: async (userIds, updates) => {
    try {
      const response = await apiMethods.post('/users/bulk-update', {
        userIds,
        updates,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user permissions
  getUserPermissions: async (userId) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/permissions`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user permissions (admin only)
  updateUserPermissions: async (userId, permissions) => {
    try {
      const response = await apiMethods.patch(`/users/${userId}/permissions`, {
        permissions,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user sessions
  getUserSessions: async (userId) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/sessions`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Revoke user session
  revokeUserSession: async (userId, sessionId) => {
    try {
      const response = await apiMethods.delete(`/users/${userId}/sessions/${sessionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user notifications
  getUserNotifications: async (userId, params = {}) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/notifications`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user audit logs
  getUserAuditLogs: async (userId, params = {}) => {
    try {
      const response = await apiMethods.get(`/users/${userId}/audit-logs`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Check username availability
  checkUsernameAvailability: async (username) => {
    try {
      const response = await apiMethods.post('/users/check-username', { username });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate user report
  generateUserReport: async (userId, reportType) => {
    try {
      const response = await apiMethods.post(`/users/${userId}/report`, { reportType });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;