import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const dashboardService = {
  // Admin Dashboard Statistics
  getAdminStats: async () => {
    try {
      const response = await api.get('/dashboard/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch admin statistics' };
    }
  },

  // Volunteer Dashboard Statistics
  getVolunteerStats: async (volunteerId) => {
    try {
      const response = await api.get(`/dashboard/volunteer/stats/${volunteerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch volunteer statistics' };
    }
  },

  // Donor Dashboard Statistics
  getDonorStats: async (donorId) => {
    try {
      const response = await api.get(`/dashboard/donor/stats/${donorId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donor statistics' };
    }
  },

  // Recent Donations
  getRecentDonations: async (limit = 10) => {
    try {
      const response = await api.get(`/dashboard/donations/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch recent donations' };
    }
  },

  // Upcoming Appointments
  getUpcomingAppointments: async (userId, userType) => {
    try {
      const response = await api.get(`/dashboard/appointments/upcoming/${userType}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch upcoming appointments' };
    }
  },

  // Blood Inventory Summary
  getBloodInventory: async () => {
    try {
      const response = await api.get('/dashboard/inventory');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch blood inventory' };
    }
  },

  // Top Donors
  getTopDonors: async (limit = 5) => {
    try {
      const response = await api.get(`/dashboard/donors/top?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch top donors' };
    }
  },

  // Activity Timeline
  getActivityTimeline: async (userId, userType, days = 30) => {
    try {
      const response = await api.get(`/dashboard/activity/${userType}/${userId}?days=${days}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch activity timeline' };
    }
  },

  // Emergency Requests
  getEmergencyRequests: async (status = 'pending', limit = 10) => {
    try {
      const response = await api.get(`/dashboard/emergency-requests?status=${status}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch emergency requests' };
    }
  },

  // Campaign Statistics
  getCampaignStats: async (campaignId = null) => {
    try {
      const url = campaignId 
        ? `/dashboard/campaigns/${campaignId}/stats`
        : '/dashboard/campaigns/stats';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaign statistics' };
    }
  },

  // User Registration Trends
  getRegistrationTrends: async (period = 'monthly') => {
    try {
      const response = await api.get(`/dashboard/trends/registrations?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch registration trends' };
    }
  },

  // Donation Trends
  getDonationTrends: async (period = 'monthly') => {
    try {
      const response = await api.get(`/dashboard/trends/donations?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donation trends' };
    }
  },

  // Location-based Statistics
  getLocationStats: async () => {
    try {
      const response = await api.get('/dashboard/stats/locations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch location statistics' };
    }
  },

  // Blood Type Distribution
  getBloodTypeDistribution: async () => {
    try {
      const response = await api.get('/dashboard/stats/blood-types');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch blood type distribution' };
    }
  },

  // User Profile Summary
  getUserProfileSummary: async (userId, userType) => {
    try {
      const response = await api.get(`/dashboard/profile/${userType}/${userId}/summary`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile summary' };
    }
  },

  // Quick Actions (for dashboard widgets)
  getQuickActions: async (userType) => {
    try {
      const response = await api.get(`/dashboard/quick-actions/${userType}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch quick actions' };
    }
  },

  // Notifications and Alerts
  getNotifications: async (userId, limit = 10) => {
    try {
      const response = await api.get(`/dashboard/notifications/${userId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch notifications' };
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await api.patch(`/dashboard/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark notification as read' };
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async (userId) => {
    try {
      const response = await api.patch(`/dashboard/notifications/${userId}/read-all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark all notifications as read' };
    }
  },

  // Dashboard Widgets Configuration
  getWidgetsConfig: async (userId) => {
    try {
      const response = await api.get(`/dashboard/widgets/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch widgets configuration' };
    }
  },

  // Update Widgets Configuration
  updateWidgetsConfig: async (userId, widgets) => {
    try {
      const response = await api.put(`/dashboard/widgets/${userId}`, { widgets });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update widgets configuration' };
    }
  },

  // Export Dashboard Data
  exportDashboardData: async (userId, userType, format = 'csv') => {
    try {
      const response = await api.get(`/dashboard/export/${userType}/${userId}?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export dashboard data' };
    }
  },

  // Search across dashboard
  searchDashboard: async (userId, userType, query) => {
    try {
      const response = await api.get(`/dashboard/search/${userType}/${userId}?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search dashboard' };
    }
  }
};

export default dashboardService;