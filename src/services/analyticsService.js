import { apiMethods } from './api';

const analyticsService = {
  // Get overall statistics
  getStatistics: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/analytics/statistics/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user statistics
  getUserStatistics: async () => {
    try {
      const response = await apiMethods.get('/analytics/users');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation statistics
  getDonationStatistics: async () => {
    try {
      const response = await apiMethods.get('/analytics/donations');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding statistics
  getFundingStatistics: async () => {
    try {
      const response = await apiMethods.get('/analytics/funding');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get location statistics
  getLocationStatistics: async () => {
    try {
      const response = await apiMethods.get('/analytics/locations');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get blood group statistics
  getBloodGroupStatistics: async () => {
    try {
      const response = await apiMethods.get('/analytics/blood-groups');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get trend data
  getTrendData: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/analytics/trends/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiMethods.get('/analytics/dashboard');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get admin statistics
  getAdminStats: async () => {
    try {
      const response = await apiMethods.get('/analytics/admin');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donor statistics
  getDonorStats: async () => {
    try {
      const response = await apiMethods.get('/analytics/donor');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get volunteer statistics
  getVolunteerStats: async () => {
    try {
      const response = await apiMethods.get('/analytics/volunteer');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get conversion rates
  getConversionRates: async () => {
    try {
      const response = await apiMethods.get('/analytics/conversion-rates');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get retention rates
  getRetentionRates: async () => {
    try {
      const response = await apiMethods.get('/analytics/retention-rates');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get engagement metrics
  getEngagementMetrics: async () => {
    try {
      const response = await apiMethods.get('/analytics/engagement');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get performance metrics
  getPerformanceMetrics: async () => {
    try {
      const response = await apiMethods.get('/analytics/performance');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get revenue analytics
  getRevenueAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/revenue');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user growth
  getUserGrowth: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/analytics/user-growth/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get donation growth
  getDonationGrowth: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/analytics/donation-growth/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funding growth
  getFundingGrowth: async (period = 'monthly') => {
    try {
      const response = await apiMethods.get(`/analytics/funding-growth/${period}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get geographic distribution
  getGeographicDistribution: async () => {
    try {
      const response = await apiMethods.get('/analytics/geographic-distribution');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get demographic data
  getDemographicData: async () => {
    try {
      const response = await apiMethods.get('/analytics/demographics');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get time-based analytics
  getTimeBasedAnalytics: async (timeUnit = 'hour') => {
    try {
      const response = await apiMethods.get(`/analytics/time-based/${timeUnit}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get real-time analytics
  getRealTimeAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/real-time');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get predictive analytics
  getPredictiveAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/predictive');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get comparative analytics
  getComparativeAnalytics: async (period1, period2) => {
    try {
      const response = await apiMethods.get('/analytics/comparative', {
        period1,
        period2,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get funnel analytics
  getFunnelAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/funnel');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get cohort analysis
  getCohortAnalysis: async () => {
    try {
      const response = await apiMethods.get('/analytics/cohort');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get segmentation data
  getSegmentationData: async (segmentBy) => {
    try {
      const response = await apiMethods.get('/analytics/segmentation', { segmentBy });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get heatmap data
  getHeatmapData: async (type = 'donations') => {
    try {
      const response = await apiMethods.get(`/analytics/heatmap/${type}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get correlation analysis
  getCorrelationAnalysis: async () => {
    try {
      const response = await apiMethods.get('/analytics/correlation');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get A/B test results
  getABTestResults: async (testId) => {
    try {
      const response = await apiMethods.get(`/analytics/ab-test/${testId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user behavior analytics
  getUserBehaviorAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/user-behavior');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get session analytics
  getSessionAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/sessions');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get page view analytics
  getPageViewAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/page-views');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get event analytics
  getEventAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/events');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get error analytics
  getErrorAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/errors');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get performance analytics
  getPerformanceAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/performance-metrics');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get SEO analytics
  getSEOAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/seo');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get social media analytics
  getSocialMediaAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/social-media');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get marketing analytics
  getMarketingAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/marketing');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get campaign analytics
  getCampaignAnalytics: async (campaignId) => {
    try {
      const response = await apiMethods.get(`/analytics/campaigns/${campaignId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get ROI analytics
  getROIAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/roi');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get cost analytics
  getCostAnalytics: async () => {
    try {
      const response = await apiMethods.get('/analytics/costs');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get efficiency metrics
  getEfficiencyMetrics: async () => {
    try {
      const response = await apiMethods.get('/analytics/efficiency');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get quality metrics
  getQualityMetrics: async () => {
    try {
      const response = await apiMethods.get('/analytics/quality');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get satisfaction metrics
  getSatisfactionMetrics: async () => {
    try {
      const response = await apiMethods.get('/analytics/satisfaction');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get export analytics data
  exportAnalytics: async (type, format = 'csv', filters = {}) => {
    try {
      const response = await apiMethods.post(`/analytics/export/${type}/${format}`, filters);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics settings
  getAnalyticsSettings: async () => {
    try {
      const response = await apiMethods.get('/analytics/settings');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update analytics settings
  updateAnalyticsSettings: async (settings) => {
    try {
      const response = await apiMethods.put('/analytics/settings', settings);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Generate analytics report
  generateReport: async (reportType, params = {}) => {
    try {
      const response = await apiMethods.post('/analytics/generate-report', {
        reportType,
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get scheduled reports
  getScheduledReports: async () => {
    try {
      const response = await apiMethods.get('/analytics/scheduled-reports');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Schedule report
  scheduleReport: async (scheduleData) => {
    try {
      const response = await apiMethods.post('/analytics/schedule-report', scheduleData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete scheduled report
  deleteScheduledReport: async (scheduleId) => {
    try {
      const response = await apiMethods.delete(`/analytics/scheduled-reports/${scheduleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics alerts
  getAnalyticsAlerts: async () => {
    try {
      const response = await apiMethods.get('/analytics/alerts');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create analytics alert
  createAnalyticsAlert: async (alertData) => {
    try {
      const response = await apiMethods.post('/analytics/alerts', alertData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update analytics alert
  updateAnalyticsAlert: async (alertId, alertData) => {
    try {
      const response = await apiMethods.put(`/analytics/alerts/${alertId}`, alertData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete analytics alert
  deleteAnalyticsAlert: async (alertId) => {
    try {
      const response = await apiMethods.delete(`/analytics/alerts/${alertId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics dashboard
  getAnalyticsDashboard: async (dashboardId = 'default') => {
    try {
      const response = await apiMethods.get(`/analytics/dashboards/${dashboardId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create analytics dashboard
  createAnalyticsDashboard: async (dashboardData) => {
    try {
      const response = await apiMethods.post('/analytics/dashboards', dashboardData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update analytics dashboard
  updateAnalyticsDashboard: async (dashboardId, dashboardData) => {
    try {
      const response = await apiMethods.put(`/analytics/dashboards/${dashboardId}`, dashboardData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete analytics dashboard
  deleteAnalyticsDashboard: async (dashboardId) => {
    try {
      const response = await apiMethods.delete(`/analytics/dashboards/${dashboardId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics widgets
  getAnalyticsWidgets: async (dashboardId) => {
    try {
      const response = await apiMethods.get(`/analytics/dashboards/${dashboardId}/widgets`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add analytics widget
  addAnalyticsWidget: async (dashboardId, widgetData) => {
    try {
      const response = await apiMethods.post(`/analytics/dashboards/${dashboardId}/widgets`, widgetData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update analytics widget
  updateAnalyticsWidget: async (dashboardId, widgetId, widgetData) => {
    try {
      const response = await apiMethods.put(
        `/analytics/dashboards/${dashboardId}/widgets/${widgetId}`,
        widgetData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete analytics widget
  deleteAnalyticsWidget: async (dashboardId, widgetId) => {
    try {
      const response = await apiMethods.delete(
        `/analytics/dashboards/${dashboardId}/widgets/${widgetId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default analyticsService;