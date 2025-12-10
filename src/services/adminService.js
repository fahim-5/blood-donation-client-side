// services/adminService.js
import api from './api';

const adminService = {
  // ========== USER MANAGEMENT ==========
  
  /**
   * Get all users with pagination and filters
   */
  getAllUsers: (params = {}) => {
    return api.get('/admin/users', { 
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        role: params.role || '',
        status: params.status || '',
        search: params.search || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc'
      }
    });
  },

  /**
   * Get single user details
   */
  getUserDetails: (userId) => {
    return api.get(`/admin/users/${userId}`);
  },

  /**
   * Block a user
   */
  blockUser: (userId) => {
    return api.patch(`/admin/users/${userId}/block`);
  },

  /**
   * Unblock a user
   */
  unblockUser: (userId) => {
    return api.patch(`/admin/users/${userId}/unblock`);
  },

  /**
   * Change user role
   */
  changeUserRole: (userId, roleData) => {
    return api.patch(`/admin/users/${userId}/role`, roleData);
  },

  /**
   * Update user profile (admin can update any user)
   */
  updateUser: (userId, userData) => {
    return api.put(`/admin/users/${userId}`, userData);
  },

  /**
   * Delete a user
   */
  deleteUser: (userId) => {
    return api.delete(`/admin/users/${userId}`);
  },

  /**
   * Search users
   */
  searchUsers: (searchTerm, filters = {}) => {
    return api.get('/admin/users/search', { 
      params: { 
        q: searchTerm,
        ...filters
      }
    });
  },

  /**
   * Get user activity logs
   */
  getUserActivity: (userId, params = {}) => {
    return api.get(`/admin/users/${userId}/activity`, { params });
  },

  /**
   * Export users data
   */
  exportUsers: (format = 'csv', filters = {}) => {
    return api.get(`/admin/users/export.${format}`, {
      params: filters,
      responseType: 'blob'
    });
  },

  // ========== DONATION MANAGEMENT ==========

  /**
   * Get all donation requests
   */
  getAllDonations: (params = {}) => {
    return api.get('/admin/donations', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status || '',
        bloodGroup: params.bloodGroup || '',
        district: params.district || '',
        startDate: params.startDate || '',
        endDate: params.endDate || '',
        sortBy: params.sortBy || 'createdAt',
        sortOrder: params.sortOrder || 'desc'
      }
    });
  },

  /**
   * Get donation details
   */
  getDonationDetails: (donationId) => {
    return api.get(`/admin/donations/${donationId}`);
  },

  /**
   * Update donation status
   */
  updateDonationStatus: (donationId, statusData) => {
    return api.patch(`/admin/donations/${donationId}/status`, statusData);
  },

  /**
   * Delete donation request
   */
  deleteDonation: (donationId) => {
    return api.delete(`/admin/donations/${donationId}`);
  },

  /**
   * Get donors list for a donation
   */
  getDonationDonors: (donationId) => {
    return api.get(`/admin/donations/${donationId}/donors`);
  },

  /**
   * Export donations data
   */
  exportDonations: (format = 'csv', filters = {}) => {
    return api.get(`/admin/donations/export.${format}`, {
      params: filters,
      responseType: 'blob'
    });
  },

  // ========== STATISTICS & ANALYTICS ==========

  /**
   * Get admin dashboard statistics
   */
  getDashboardStats: () => {
    return api.get('/admin/stats/dashboard');
  },

  /**
   * Get detailed statistics
   */
  getStatistics: (params = {}) => {
    return api.get('/admin/stats', { params });
  },

  /**
   * Get blood group statistics
   */
  getBloodGroupStats: () => {
    return api.get('/admin/stats/blood-groups');
  },

  /**
   * Get location-based statistics
   */
  getLocationStats: () => {
    return api.get('/admin/stats/locations');
  },

  /**
   * Get monthly donation statistics
   */
  getMonthlyStats: (year = new Date().getFullYear()) => {
    return api.get(`/admin/stats/monthly/${year}`);
  },

  /**
   * Get user registration trends
   */
  getUserRegistrationStats: (period = 'monthly') => {
    return api.get(`/admin/stats/registrations/${period}`);
  },

  /**
   * Get donation completion rate
   */
  getDonationCompletionRate: () => {
    return api.get('/admin/stats/completion-rate');
  },

  // ========== FUNDING MANAGEMENT ==========

  /**
   * Get all funding transactions
   */
  getAllFundings: (params = {}) => {
    return api.get('/admin/fundings', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status || '',
        startDate: params.startDate || '',
        endDate: params.endDate || ''
      }
    });
  },

  /**
   * Get funding statistics
   */
  getFundingStats: () => {
    return api.get('/admin/fundings/stats');
  },

  /**
   * Get funding details
   */
  getFundingDetails: (fundingId) => {
    return api.get(`/admin/fundings/${fundingId}`);
  },

  /**
   * Update funding status
   */
  updateFundingStatus: (fundingId, statusData) => {
    return api.patch(`/admin/fundings/${fundingId}/status`, statusData);
  },

  /**
   * Export funding data
   */
  exportFundings: (format = 'csv') => {
    return api.get(`/admin/fundings/export.${format}`, {
      responseType: 'blob'
    });
  },

  // ========== ACTIVITY LOGS ==========

  /**
   * Get all activity logs
   */
  getActivityLogs: (params = {}) => {
    return api.get('/admin/activities', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        userId: params.userId || '',
        action: params.action || '',
        startDate: params.startDate || '',
        endDate: params.endDate || ''
      }
    });
  },

  /**
   * Clear old activity logs
   */
  clearActivityLogs: (olderThanDays = 30) => {
    return api.delete(`/admin/activities/clear?olderThan=${olderThanDays}`);
  },

  // ========== SYSTEM MANAGEMENT ==========

  /**
   * Get system health status
   */
  getSystemHealth: () => {
    return api.get('/admin/system/health');
  },

  /**
   * Get server metrics
   */
  getServerMetrics: () => {
    return api.get('/admin/system/metrics');
  },

  /**
   * Clear application cache
   */
  clearCache: () => {
    return api.post('/admin/system/clear-cache');
  },

  /**
   * Get database statistics
   */
  getDatabaseStats: () => {
    return api.get('/admin/system/database-stats');
  },

  // ========== NOTIFICATION MANAGEMENT ==========

  /**
   * Send broadcast notification to all users
   */
  sendBroadcastNotification: (notificationData) => {
    return api.post('/admin/notifications/broadcast', notificationData);
  },

  /**
   * Get all notifications
   */
  getAllNotifications: (params = {}) => {
    return api.get('/admin/notifications', { params });
  },

  /**
   * Get notification statistics
   */
  getNotificationStats: () => {
    return api.get('/admin/notifications/stats');
  },

  /**
   * Delete notification
   */
  deleteNotification: (notificationId) => {
    return api.delete(`/admin/notifications/${notificationId}`);
  },

  // ========== SETTINGS ==========

  /**
   * Get application settings
   */
  getSettings: () => {
    return api.get('/admin/settings');
  },

  /**
   * Update application settings
   */
  updateSettings: (settings) => {
    return api.put('/admin/settings', settings);
  },

  /**
   * Get email templates
   */
  getEmailTemplates: () => {
    return api.get('/admin/settings/email-templates');
  },

  /**
   * Update email template
   */
  updateEmailTemplate: (templateId, templateData) => {
    return api.put(`/admin/settings/email-templates/${templateId}`, templateData);
  },

  // ========== BACKUP & RESTORE ==========

  /**
   * Create database backup
   */
  createBackup: () => {
    return api.post('/admin/system/backup');
  },

  /**
   * Get backup list
   */
  getBackups: () => {
    return api.get('/admin/system/backups');
  },

  /**
   * Restore from backup
   */
  restoreBackup: (backupId) => {
    return api.post(`/admin/system/backups/${backupId}/restore`);
  },

  /**
   * Delete backup
   */
  deleteBackup: (backupId) => {
    return api.delete(`/admin/system/backups/${backupId}`);
  },

  // ========== REPORTS ==========

  /**
   * Generate report
   */
  generateReport: (reportData) => {
    return api.post('/admin/reports/generate', reportData, {
      responseType: 'blob'
    });
  },

  /**
   * Get report templates
   */
  getReportTemplates: () => {
    return api.get('/admin/reports/templates');
  },

  /**
   * Save report template
   */
  saveReportTemplate: (templateData) => {
    return api.post('/admin/reports/templates', templateData);
  },

  // ========== VOLUNTEER MANAGEMENT ==========

  /**
   * Get all volunteers
   */
  getAllVolunteers: (params = {}) => {
    return api.get('/admin/volunteers', { params });
  },

  /**
   * Assign task to volunteer
   */
  assignTaskToVolunteer: (volunteerId, taskData) => {
    return api.post(`/admin/volunteers/${volunteerId}/tasks`, taskData);
  },

  /**
   * Get volunteer performance
   */
  getVolunteerPerformance: (volunteerId) => {
    return api.get(`/admin/volunteers/${volunteerId}/performance`);
  },

  // ========== HOSPITAL MANAGEMENT ==========

  /**
   * Get all hospitals
   */
  getAllHospitals: (params = {}) => {
    return api.get('/admin/hospitals', { params });
  },

  /**
   * Add new hospital
   */
  addHospital: (hospitalData) => {
    return api.post('/admin/hospitals', hospitalData);
  },

  /**
   * Update hospital
   */
  updateHospital: (hospitalId, hospitalData) => {
    return api.put(`/admin/hospitals/${hospitalId}`, hospitalData);
  },

  /**
   * Delete hospital
   */
  deleteHospital: (hospitalId) => {
    return api.delete(`/admin/hospitals/${hospitalId}`);
  },

  /**
   * Verify hospital
   */
  verifyHospital: (hospitalId) => {
    return api.patch(`/admin/hospitals/${hospitalId}/verify`);
  },

  // ========== EMERGENCY MANAGEMENT ==========

  /**
   * Create emergency alert
   */
  createEmergencyAlert: (alertData) => {
    return api.post('/admin/emergency/alerts', alertData);
  },

  /**
   * Get emergency alerts
   */
  getEmergencyAlerts: (params = {}) => {
    return api.get('/admin/emergency/alerts', { params });
  },

  /**
   * Update emergency alert status
   */
  updateEmergencyAlertStatus: (alertId, statusData) => {
    return api.patch(`/admin/emergency/alerts/${alertId}/status`, statusData);
  },

  /**
   * Get emergency statistics
   */
  getEmergencyStats: () => {
    return api.get('/admin/emergency/stats');
  }
};

export default adminService;