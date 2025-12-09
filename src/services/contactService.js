import { apiMethods } from './api';

const contactService = {
  // Send contact message
  sendMessage: async (messageData) => {
    try {
      const response = await apiMethods.post('/contact', messageData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact messages (admin only)
  getMessages: async (params = {}) => {
    try {
      const response = await apiMethods.get('/contact', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get message by ID
  getMessageById: async (id) => {
    try {
      const response = await apiMethods.get(`/contact/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update message status
  updateMessageStatus: async (id, status) => {
    try {
      const response = await apiMethods.patch(`/contact/${id}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reply to message
  replyToMessage: async (id, replyData) => {
    try {
      const response = await apiMethods.post(`/contact/${id}/reply`, replyData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete message
  deleteMessage: async (id) => {
    try {
      const response = await apiMethods.delete(`/contact/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact statistics
  getContactStats: async () => {
    try {
      const response = await apiMethods.get('/contact/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get unread messages count
  getUnreadCount: async () => {
    try {
      const response = await apiMethods.get('/contact/unread-count');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (id) => {
    try {
      const response = await apiMethods.patch(`/contact/${id}/read`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const response = await apiMethods.patch('/contact/mark-all-read');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get message categories
  getCategories: async () => {
    try {
      const response = await apiMethods.get('/contact/categories');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Set message category
  setCategory: async (id, category) => {
    try {
      const response = await apiMethods.patch(`/contact/${id}/category`, { category });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add note to message
  addNote: async (id, note) => {
    try {
      const response = await apiMethods.post(`/contact/${id}/notes`, { note });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get message notes
  getNotes: async (id) => {
    try {
      const response = await apiMethods.get(`/contact/${id}/notes`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete note
  deleteNote: async (id, noteId) => {
    try {
      const response = await apiMethods.delete(`/contact/${id}/notes/${noteId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Export contact messages
  exportMessages: async (format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/contact/export/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact settings
  getContactSettings: async () => {
    try {
      const response = await apiMethods.get('/contact/settings');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update contact settings
  updateContactSettings: async (settings) => {
    try {
      const response = await apiMethods.put('/contact/settings', settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact form fields
  getFormFields: async () => {
    try {
      const response = await apiMethods.get('/contact/form-fields');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate contact form
  validateContactForm: async (formData) => {
    try {
      const response = await apiMethods.post('/contact/validate', formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Send auto-reply
  sendAutoReply: async (id) => {
    try {
      const response = await apiMethods.post(`/contact/${id}/auto-reply`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact templates
  getTemplates: async () => {
    try {
      const response = await apiMethods.get('/contact/templates');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create template
  createTemplate: async (templateData) => {
    try {
      const response = await apiMethods.post('/contact/templates', templateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update template
  updateTemplate: async (id, templateData) => {
    try {
      const response = await apiMethods.put(`/contact/templates/${id}`, templateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete template
  deleteTemplate: async (id) => {
    try {
      const response = await apiMethods.delete(`/contact/templates/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact analytics
  getAnalytics: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/contact/analytics/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update messages
  bulkUpdateMessages: async (messageIds, updates) => {
    try {
      const response = await apiMethods.post('/contact/bulk-update', {
        messageIds,
        updates,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bulk delete messages
  bulkDeleteMessages: async (messageIds) => {
    try {
      const response = await apiMethods.post('/contact/bulk-delete', { messageIds });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get message threads
  getThreads: async (params = {}) => {
    try {
      const response = await apiMethods.get('/contact/threads', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get thread by ID
  getThreadById: async (threadId) => {
    try {
      const response = await apiMethods.get(`/contact/threads/${threadId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Close thread
  closeThread: async (threadId) => {
    try {
      const response = await apiMethods.patch(`/contact/threads/${threadId}/close`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reopen thread
  reopenThread: async (threadId) => {
    try {
      const response = await apiMethods.patch(`/contact/threads/${threadId}/reopen`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Assign thread
  assignThread: async (threadId, assigneeId) => {
    try {
      const response = await apiMethods.patch(`/contact/threads/${threadId}/assign`, {
        assigneeId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact FAQs
  getFAQs: async (params = {}) => {
    try {
      const response = await apiMethods.get('/contact/faqs', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await apiMethods.post('/contact/feedback', feedbackData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get feedback
  getFeedback: async (params = {}) => {
    try {
      const response = await apiMethods.get('/contact/feedback', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Report spam
  reportSpam: async (id) => {
    try {
      const response = await apiMethods.post(`/contact/${id}/report-spam`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get spam messages
  getSpamMessages: async (params = {}) => {
    try {
      const response = await apiMethods.get('/contact/spam', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Restore from spam
  restoreFromSpam: async (id) => {
    try {
      const response = await apiMethods.patch(`/contact/${id}/restore`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact support agents
  getSupportAgents: async () => {
    try {
      const response = await apiMethods.get('/contact/support-agents');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update support agent status
  updateAgentStatus: async (agentId, status) => {
    try {
      const response = await apiMethods.patch(`/contact/agents/${agentId}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default contactService;