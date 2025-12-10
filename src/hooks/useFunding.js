// hooks/useFunding.js
import { useState, useEffect, useCallback } from 'react';
import fundingService from '../services/fundingService';
import { useAuth } from './useAuth';

const useFunding = () => {
  const { user } = useAuth();
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch all fundings
  const fetchFundings = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fundingService.getAllFundings(params);
      setFundings(response.data.fundings || []);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch fundings';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch funding statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await fundingService.getStats();
      setStats(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch funding stats:', err);
      throw err;
    }
  }, []);

  // Create new funding
  const createFunding = useCallback(async (fundingData) => {
    try {
      const response = await fundingService.createFunding(fundingData);
      
      // Add to local state
      setFundings(prev => [response.data.funding, ...prev]);
      
      // Update stats
      if (stats) {
        setStats(prev => ({
          ...prev,
          totalAmount: prev.totalAmount + response.data.funding.amount,
          totalDonations: prev.totalDonations + 1
        }));
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create funding';
      throw new Error(errorMessage);
    }
  }, [stats]);

  // Get funding by ID
  const getFundingById = useCallback(async (fundingId) => {
    try {
      const response = await fundingService.getFundingById(fundingId);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to fetch funding details';
    }
  }, []);

  // Update funding status
  const updateFundingStatus = useCallback(async (fundingId, statusData) => {
    try {
      const response = await fundingService.updateStatus(fundingId, statusData);
      
      // Update local state
      setFundings(prev =>
        prev.map(funding =>
          funding._id === fundingId
            ? { ...funding, ...response.data.funding }
            : funding
        )
      );
      
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to update funding status';
    }
  }, []);

  // Delete funding (admin only)
  const deleteFunding = useCallback(async (fundingId) => {
    try {
      await fundingService.deleteFunding(fundingId);
      
      // Remove from local state
      setFundings(prev => prev.filter(funding => funding._id !== fundingId));
      
      // Update stats
      if (stats) {
        const deletedFunding = fundings.find(f => f._id === fundingId);
        if (deletedFunding) {
          setStats(prev => ({
            ...prev,
            totalAmount: prev.totalAmount - deletedFunding.amount,
            totalDonations: prev.totalDonations - 1
          }));
        }
      }
      
      return { success: true };
    } catch (err) {
      throw err.response?.data?.message || 'Failed to delete funding';
    }
  }, [fundings, stats]);

  // Search fundings
  const searchFundings = useCallback(async (searchTerm, filters = {}) => {
    try {
      setLoading(true);
      const response = await fundingService.searchFundings(searchTerm, filters);
      setFundings(response.data.fundings || []);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export fundings
  const exportFundings = useCallback(async (format = 'csv', filters = {}) => {
    try {
      const response = await fundingService.exportFundings(format, filters);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Export failed';
    }
  }, []);

  // Get my fundings (for donors)
  const fetchMyFundings = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await fundingService.getMyFundings(params);
      setFundings(response.data.fundings || []);
      
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your fundings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get recent fundings
  const fetchRecentFundings = useCallback(async (limit = 10) => {
    try {
      const response = await fundingService.getRecentFundings(limit);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch recent fundings:', err);
      throw err;
    }
  }, []);

  // Get top donors
  const fetchTopDonors = useCallback(async (limit = 10) => {
    try {
      const response = await fundingService.getTopDonors(limit);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch top donors:', err);
      throw err;
    }
  }, []);

  // Process Stripe payment
  const processStripePayment = useCallback(async (paymentData) => {
    try {
      const response = await fundingService.processPayment(paymentData);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Payment processing failed';
    }
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((page) => {
    fetchFundings({ page });
  }, [fetchFundings]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        fetchFundings();
        fetchStats();
      } else {
        fetchMyFundings();
      }
    }
  }, [user, fetchFundings, fetchStats, fetchMyFundings]);

  return {
    // State
    fundings,
    loading,
    error,
    stats,
    pagination,
    
    // Actions
    fetchFundings,
    fetchStats,
    createFunding,
    getFundingById,
    updateFundingStatus,
    deleteFunding,
    searchFundings,
    exportFundings,
    fetchMyFundings,
    fetchRecentFundings,
    fetchTopDonors,
    processStripePayment,
    handlePageChange,
    clearError,
    
    // Computed values
    totalAmount: fundings.reduce((sum, funding) => sum + funding.amount, 0),
    totalFundings: fundings.length,
    averageDonation: fundings.length > 0 
      ? fundings.reduce((sum, funding) => sum + funding.amount, 0) / fundings.length 
      : 0,
    
    // Filter helpers
    getFundingsByUser: (userId) => fundings.filter(f => f.user?._id === userId),
    getFundingsByStatus: (status) => fundings.filter(f => f.status === status),
    getRecentFundings: (limit = 5) => [...fundings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit),
    
    // Statistics helpers
    getMonthlyStats: () => {
      const monthly = {};
      fundings.forEach(funding => {
        const date = new Date(funding.createdAt);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!monthly[monthYear]) {
          monthly[monthYear] = {
            amount: 0,
            count: 0
          };
        }
        
        monthly[monthYear].amount += funding.amount;
        monthly[monthYear].count += 1;
      });
      
      return Object.entries(monthly)
        .map(([month, data]) => ({
          month,
          ...data
        }))
        .sort((a, b) => b.month.localeCompare(a.month));
    }
  };
};

export default useFunding;