// hooks/useAdmin.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import adminService from '../services/adminService';

const useAdmin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  // Fetch all users
  const fetchAllUsers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminService.getAllUsers(params);
      setUsers(response.data.users || []);
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const response = await adminService.getStatistics();
      setStatistics(response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
      throw err;
    }
  }, []);

  // Fetch recent activities
  const fetchRecentActivities = useCallback(async (limit = 10) => {
    try {
      const response = await adminService.getRecentActivities(limit);
      setRecentActivities(response.data.activities || []);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch activities:', err);
      throw err;
    }
  }, []);

  // Block/Unblock user
  const toggleUserBlock = useCallback(async (userId, block = true) => {
    try {
      const response = block 
        ? await adminService.blockUser(userId)
        : await adminService.unblockUser(userId);
      
      // Update local state
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, status: block ? 'blocked' : 'active' }
            : user
        )
      );
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update user';
      throw new Error(errorMessage);
    }
  }, []);

  // Change user role
  const changeUserRole = useCallback(async (userId, newRole) => {
    try {
      const response = await adminService.changeUserRole(userId, { role: newRole });
      
      // Update local state
      setUsers(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, role: newRole }
            : user
        )
      );
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change role';
      throw new Error(errorMessage);
    }
  }, []);

  // Delete user
  const deleteUser = useCallback(async (userId) => {
    try {
      await adminService.deleteUser(userId);
      
      // Remove from local state
      setUsers(prev => prev.filter(user => user._id !== userId));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      throw new Error(errorMessage);
    }
  }, []);

  // Search users
  const searchUsers = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const response = await adminService.searchUsers(searchTerm);
      setUsers(response.data.users || []);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user details
  const getUserDetails = useCallback(async (userId) => {
    try {
      const response = await adminService.getUserDetails(userId);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to fetch user details';
    }
  }, []);

  // Export users data
  const exportUsers = useCallback(async (format = 'csv') => {
    try {
      const response = await adminService.exportUsers(format);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Export failed';
    }
  }, []);

  // Initialize on component mount if user is admin
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllUsers();
      fetchStatistics();
      fetchRecentActivities();
    }
  }, [user, fetchAllUsers, fetchStatistics, fetchRecentActivities]);

  return {
    // State
    users,
    loading,
    error,
    statistics,
    recentActivities,
    
    // Actions
    fetchAllUsers,
    fetchStatistics,
    fetchRecentActivities,
    toggleUserBlock,
    changeUserRole,
    deleteUser,
    searchUsers,
    getUserDetails,
    exportUsers,
    
    // Helper functions
    isAdmin: user?.role === 'admin',
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    blockedUsers: users.filter(u => u.status === 'blocked').length,
    donorCount: users.filter(u => u.role === 'donor').length,
    volunteerCount: users.filter(u => u.role === 'volunteer').length,
    adminCount: users.filter(u => u.role === 'admin').length,
    
    // Filtering functions
    getUsersByRole: (role) => users.filter(u => u.role === role),
    getUsersByStatus: (status) => users.filter(u => u.status === status),
    getUserById: (userId) => users.find(u => u._id === userId),
    
    // Reset error
    clearError: () => setError(null)
  };
};

export default useAdmin;