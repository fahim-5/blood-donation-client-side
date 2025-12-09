import { apiMethods } from './api';

const notificationService = {
  // Get notifications
  getNotifications: async (params = {}) => {
    try {
      const response = await apiMethods.get('/notifications', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification by ID
  getNotificationById: async (id) => {
    try {
      const response = await apiMethods.get(`/notifications/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (id) => {
    try {
      const response = await apiMethods.patch(`/notifications/${id}/read`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const response = await apiMethods.patch('/notifications/mark-all-read');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (id) => {
    try {
      const response = await apiMethods.delete(`/notifications/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Clear all notifications
  clearAll: async () => {
    try {
      const response = await apiMethods.delete('/notifications');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification settings
  getSettings: async () => {
    try {
      const response = await apiMethods.get('/notifications/settings');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update notification settings
  updateSettings: async (settings) => {
    try {
      const response = await apiMethods.put('/notifications/settings', settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create notification
  create: async (notificationData) => {
    try {
      const response = await apiMethods.post('/notifications', notificationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const response = await apiMethods.get('/notifications/unread-count');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification types
  getTypes: async () => {
    try {
      const response = await apiMethods.get('/notifications/types');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification preferences
  getPreferences: async () => {
    try {
      const response = await apiMethods.get('/notifications/preferences');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await apiMethods.put('/notifications/preferences', preferences);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Subscribe to push notifications
  subscribeToPush: async (subscription) => {
    try {
      const response = await apiMethods.post('/notifications/push/subscribe', subscription);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Unsubscribe from push notifications
  unsubscribeFromPush: async (subscriptionId) => {
    try {
      const response = await apiMethods.delete(`/notifications/push/subscribe/${subscriptionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get push subscription
  getPushSubscription: async () => {
    try {
      const response = await apiMethods.get('/notifications/push/subscription');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send test notification
  sendTestNotification: async (type, data = {}) => {
    try {
      const response = await apiMethods.post('/notifications/test', { type, data });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification templates
  getTemplates: async () => {
    try {
      const response = await apiMethods.get('/notifications/templates');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create notification template
  createTemplate: async (templateData) => {
    try {
      const response = await apiMethods.post('/notifications/templates', templateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update notification template
  updateTemplate: async (id, templateData) => {
    try {
      const response = await apiMethods.put(`/notifications/templates/${id}`, templateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete notification template
  deleteTemplate: async (id) => {
    try {
      const response = await apiMethods.delete(`/notifications/templates/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification statistics
  getStatistics: async () => {
    try {
      const response = await apiMethods.get('/notifications/statistics');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification logs
  getLogs: async (params = {}) => {
    try {
      const response = await apiMethods.get('/notifications/logs', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Clear notification logs
  clearLogs: async () => {
    try {
      const response = await apiMethods.delete('/notifications/logs');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification delivery status
  getDeliveryStatus: async (notificationId) => {
    try {
      const response = await apiMethods.get(`/notifications/${notificationId}/delivery-status`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Retry failed notification
  retryNotification: async (notificationId) => {
    try {
      const response = await apiMethods.post(`/notifications/${notificationId}/retry`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update notifications
  bulkUpdate: async (notificationIds, updates) => {
    try {
      const response = await apiMethods.post('/notifications/bulk-update', {
        notificationIds,
        updates,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bulk delete notifications
  bulkDelete: async (notificationIds) => {
    try {
      const response = await apiMethods.post('/notifications/bulk-delete', { notificationIds });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification channels
  getChannels: async () => {
    try {
      const response = await apiMethods.get('/notifications/channels');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update channel settings
  updateChannelSettings: async (channel, settings) => {
    try {
      const response = await apiMethods.put(`/notifications/channels/${channel}`, settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Test notification channel
  testChannel: async (channel, data = {}) => {
    try {
      const response = await apiMethods.post(`/notifications/channels/${channel}/test`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification queue
  getQueue: async (params = {}) => {
    try {
      const response = await apiMethods.get('/notifications/queue', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Clear notification queue
  clearQueue: async () => {
    try {
      const response = await apiMethods.delete('/notifications/queue');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification analytics
  getAnalytics: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/notifications/analytics/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export notifications
  exportNotifications: async (format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/notifications/export/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification webhook
  getWebhook: async () => {
    try {
      const response = await apiMethods.get('/notifications/webhook');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update notification webhook
  updateWebhook: async (webhookData) => {
    try {
      const response = await apiMethods.put('/notifications/webhook', webhookData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Test webhook
  testWebhook: async (data = {}) => {
    try {
      const response = await apiMethods.post('/notifications/webhook/test', data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification integrations
  getIntegrations: async () => {
    try {
      const response = await apiMethods.get('/notifications/integrations');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Connect integration
  connectIntegration: async (integration, credentials) => {
    try {
      const response = await apiMethods.post(`/notifications/integrations/${integration}/connect`, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Disconnect integration
  disconnectIntegration: async (integration) => {
    try {
      const response = await apiMethods.delete(`/notifications/integrations/${integration}/connect`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get integration status
  getIntegrationStatus: async (integration) => {
    try {
      const response = await apiMethods.get(`/notifications/integrations/${integration}/status`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send SMS notification
  sendSMS: async (phoneNumber, message, options = {}) => {
    try {
      const response = await apiMethods.post('/notifications/sms/send', {
        phoneNumber,
        message,
        ...options,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send email notification
  sendEmail: async (email, subject, message, options = {}) => {
    try {
      const response = await apiMethods.post('/notifications/email/send', {
        email,
        subject,
        message,
        ...options,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification limits
  getLimits: async () => {
    try {
      const response = await apiMethods.get('/notifications/limits');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get notification usage
  getUsage: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/notifications/usage/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate notification data
  validateNotification: async (notificationData) => {
    try {
      const response = await apiMethods.post('/notifications/validate', notificationData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationService;