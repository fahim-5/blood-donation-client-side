import { apiMethods } from './api';

const profileService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiMethods.get('/profile');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiMethods.put('/profile', profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Upload avatar
  uploadAvatar: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('avatar', imageFile);
      
      const response = await apiMethods.upload('/profile/avatar', formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete avatar
  deleteAvatar: async () => {
    try {
      const response = await apiMethods.delete('/profile/avatar');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation history
  getDonationHistory: async (params = {}) => {
    try {
      const response = await apiMethods.get('/profile/donation-history', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get activity log
  getActivityLog: async (params = {}) => {
    try {
      const response = await apiMethods.get('/profile/activity-log', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get profile statistics
  getStats: async () => {
    try {
      const response = await apiMethods.get('/profile/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update notification settings
  updateNotificationSettings: async (settings) => {
    try {
      const response = await apiMethods.put('/profile/notification-settings', settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification settings
  getNotificationSettings: async () => {
    try {
      const response = await apiMethods.get('/profile/notification-settings');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update privacy settings
  updatePrivacySettings: async (settings) => {
    try {
      const response = await apiMethods.put('/profile/privacy-settings', settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get privacy settings
  getPrivacySettings: async () => {
    try {
      const response = await apiMethods.get('/profile/privacy-settings');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update contact information
  updateContactInfo: async (contactInfo) => {
    try {
      const response = await apiMethods.patch('/profile/contact-info', contactInfo);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update medical information
  updateMedicalInfo: async (medicalInfo) => {
    try {
      const response = await apiMethods.patch('/profile/medical-info', medicalInfo);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get medical information
  getMedicalInfo: async () => {
    try {
      const response = await apiMethods.get('/profile/medical-info');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await apiMethods.put('/profile/preferences', preferences);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get preferences
  getPreferences: async () => {
    try {
      const response = await apiMethods.get('/profile/preferences');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Deactivate account
  deactivateAccount: async (reason) => {
    try {
      const response = await apiMethods.post('/profile/deactivate', { reason });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reactivate account
  reactivateAccount: async () => {
    try {
      const response = await apiMethods.post('/profile/reactivate');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete account
  deleteAccount: async (password, reason) => {
    try {
      const response = await apiMethods.delete('/profile', {
        data: { password, reason },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export profile data
  exportProfileData: async (format = 'json') => {
    try {
      const response = await apiMethods.get(`/profile/export/${format}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get connected accounts
  getConnectedAccounts: async () => {
    try {
      const response = await apiMethods.get('/profile/connected-accounts');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Connect social account
  connectSocialAccount: async (provider, token) => {
    try {
      const response = await apiMethods.post('/profile/connect-account', {
        provider,
        token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Disconnect social account
  disconnectSocialAccount: async (provider) => {
    try {
      const response = await apiMethods.delete(`/profile/connect-account/${provider}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get verification status
  getVerificationStatus: async () => {
    try {
      const response = await apiMethods.get('/profile/verification-status');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Request verification
  requestVerification: async (document) => {
    try {
      const formData = new FormData();
      formData.append('document', document);
      
      const response = await apiMethods.upload('/profile/request-verification', formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get profile completeness
  getProfileCompleteness: async () => {
    try {
      const response = await apiMethods.get('/profile/completeness');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update profile visibility
  updateProfileVisibility: async (visibility) => {
    try {
      const response = await apiMethods.patch('/profile/visibility', { visibility });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get profile views
  getProfileViews: async (params = {}) => {
    try {
      const response = await apiMethods.get('/profile/views', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get profile badges
  getProfileBadges: async () => {
    try {
      const response = await apiMethods.get('/profile/badges');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default profileService;