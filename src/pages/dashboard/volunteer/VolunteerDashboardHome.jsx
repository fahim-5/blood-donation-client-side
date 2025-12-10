import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FaTint,
  FaHospital,
  FaUserInjured,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBell,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTasks,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaAmbulance,
  FaUserCheck,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import DonationRequestCard from '../../../components/common/DonationRequestCard';

// Mock donation service
const donationService = {
  getDonations: async (params = {}) => {
    return {
      success: true,
      data: {
        donations: [],
        page: params.page || 1,
        limit: params.limit || 10,
        total: 0,
        totalPages: 0
      }
    };
  },
  getStats: async () => {
    return {
      success: true,
      data: {
        totalDonations: 0,
        pendingRequests: 0,
        completedDonations: 0,
        urgentRequests: 0
      }
    };
  }
};

// Custom hook for donations
const useDonations = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingRequests: 0,
    completedDonations: 0,
    urgentRequests: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllDonations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await donationService.getDonations({ limit: 5 });
      
      if (response.success) {
        setDonations(response.data.donations || []);
      } else {
        throw new Error(response.message || 'Failed to fetch donations');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching donations');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await donationService.getStats();
      
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchAllDonations();
    fetchStats();
  }, [fetchAllDonations, fetchStats]);

  return {
    donations,
    stats,
    loading,
    error,
    fetchAllDonations,
    fetchStats
  };
};

// Mock auth hook
const useAuth = () => {
  return {
    user: { 
      name: 'John Doe',
      role: 'volunteer',
      email: 'volunteer@example.com',
      phone: '+8801234567890',
      joinDate: '2024-01-15'
    }
  };
};

// Date utility
const formatDate = (date) => {
  if (!date) return 'Not set';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const VolunteerDashboardHome = () => {
  const { user } = useAuth();
  const { donations, stats, loading, fetchAllDonations } = useDonations();
  const navigate = useNavigate();

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'donation_completed',
      title: 'Donation Request Completed',
      description: 'Successfully completed blood donation for Abdul Karim',
      time: '2 hours ago',
      icon: <FaCheckCircle className="text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: 2,
      type: 'new_request',
      title: 'New Urgent Request',
      description: 'Emergency blood required for Fatema Begum (AB-)',
      time: '4 hours ago',
      icon: <FaExclamationTriangle className="text-red-500" />,
      color: 'bg-red-100'
    },
    {
      id: 3,
      type: 'volunteer_task',
      title: 'Task Assigned',
      description: 'Assigned to verify hospital details for DN001',
      time: '1 day ago',
      icon: <FaTasks className="text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: 4,
      type: 'donor_found',
      title: 'Donor Found',
      description: 'Found matching donor for emergency request',
      time: '2 days ago',
      icon: <FaUsers className="text-purple-500" />,
      color: 'bg-purple-100'
    }
  ];

  // Quick stats
  const quickStats = [
    {
      id: 'total_tasks',
      title: 'Active Tasks',
      value: '8',
      icon: <FaTasks className="text-blue-500" />,
      color: 'bg-blue-100',
      change: '+2',
      changeType: 'increase',
      link: '/dashboard/volunteer/tasks'
    },
    {
      id: 'urgent_requests',
      title: 'Urgent Requests',
      value: '3',
      icon: <FaExclamationTriangle className="text-red-500" />,
      color: 'bg-red-100',
      change: '+1',
      changeType: 'increase',
      link: '/dashboard/donation-requests'
    },
    {
      id: 'completed_today',
      title: 'Completed Today',
      value: '2',
      icon: <FaCheckCircle className="text-green-500" />,
      color: 'bg-green-100',
      change: '100%',
      changeType: 'increase',
      link: '/dashboard/volunteer/tasks'
    },
    {
      id: 'pending_followup',
      title: 'Pending Follow-ups',
      value: '5',
      icon: <FaClock className="text-yellow-500" />,
      color: 'bg-yellow-100',
      change: '-1',
      changeType: 'decrease',
      link: '/dashboard/volunteer/tasks'
    }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Follow up with donor for DN001',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      status: 'pending',
      donationId: 'DN001'
    },
    {
      id: 2,
      title: 'Verify hospital details for DN002',
      priority: 'medium',
      dueDate: new Date(Date.now() + 172800000), // 2 days
      status: 'pending',
      donationId: 'DN002'
    },
    {
      id: 3,
      title: 'Update status for completed donation',
      priority: 'low',
      dueDate: new Date(Date.now() + 259200000), // 3 days
      status: 'in_progress',
      donationId: 'DN003'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      id: 'view_requests',
      title: 'View All Requests',
      description: 'Browse and manage all donation requests',
      icon: <FaTint className="text-red-500" />,
      color: 'bg-red-50 hover:bg-red-100',
      link: '/dashboard/donation-requests'
    },
    {
      id: 'manage_tasks',
      title: 'Manage Tasks',
      description: 'Check and update your assigned tasks',
      icon: <FaTasks className="text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100',
      link: '/dashboard/volunteer/tasks'
    },
    {
      id: 'urgent_cases',
      title: 'Urgent Cases',
      description: 'View and handle emergency requests',
      icon: <FaAmbulance className="text-orange-500" />,
      color: 'bg-orange-50 hover:bg-orange-100',
      link: '/dashboard/donation-requests?status=urgent'
    },
    {
      id: 'donor_search',
      title: 'Find Donors',
      description: 'Search for matching blood donors',
      icon: <FaSearch className="text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100',
      link: '/dashboard/donors'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="opacity-90">
              Thank you for your dedication to saving lives. Here's what's happening today.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <FaHeartbeat className="mr-2" />
                <span>Volunteer since {formatDate(user.joinDate)}</span>
              </div>
              <div className="flex items-center">
                <FaHandHoldingHeart className="mr-2" />
                <span>You've helped save {stats.completedDonations} lives</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm opacity-90">Today's Mission</p>
              <p className="text-xl font-bold mt-1">Help save lives through timely coordination</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="dashboard-card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(stat.link)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} {stat.changeType === 'increase' ? '↗' : '↘'}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">from yesterday</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <Link to="/dashboard/volunteer/tasks" className="text-red-500 hover:text-red-600 flex items-center text-sm">
                View All <FaArrowRight className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.id}
                  to={action.link}
                  className={`${action.color} rounded-xl p-4 border border-transparent hover:border-red-200 transition-all duration-300`}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-lg mr-3">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Donation Requests */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Donation Requests</h2>
                <p className="text-gray-600 text-sm mt-1">Requests that need your attention</p>
              </div>
              <Link to="/dashboard/donation-requests" className="btn-outline flex items-center text-sm">
                <FaFilter className="mr-2" />
                View All
              </Link>
            </div>
            
            {donations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-5xl mb-4">
                  <FaTint />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Requests</h3>
                <p className="text-gray-600 mb-4">There are no donation requests at the moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.slice(0, 3).map((donation, index) => (
                  <motion.div
                    key={donation._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="border border-gray-200 rounded-xl p-4 hover:border-red-200 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${
                            donation.status === 'urgent' ? 'bg-red-100' :
                            donation.status === 'pending' ? 'bg-yellow-100' :
                            'bg-blue-100'
                          }`}>
                            {donation.status === 'urgent' ? (
                              <FaExclamationTriangle className="text-red-500" />
                            ) : donation.status === 'pending' ? (
                              <FaClock className="text-yellow-500" />
                            ) : (
                              <FaTint className="text-blue-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{donation.recipientName || 'Unknown Recipient'}</h3>
                            <p className="text-sm text-gray-600">{donation.hospitalName || 'Unknown Hospital'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">{donation.bloodGroup || 'Unknown'}</div>
                          <div className="text-xs text-gray-500">{formatDate(donation.donationDate)}</div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-1" />
                            {donation.recipientDistrict || 'Unknown'}, {donation.recipientUpazila || 'Unknown'}
                          </div>
                          <Link
                            to={`/dashboard/donation-request/${donation._id}`}
                            className="text-red-500 hover:text-red-600 text-sm flex items-center"
                          >
                            View Details <FaArrowRight className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className={`p-2 rounded-lg mr-3 ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <span className="text-xs text-gray-500 mt-1">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
              <Link to="/dashboard/volunteer/tasks" className="text-red-500 hover:text-red-600 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 border border-gray-200 rounded-lg hover:border-red-200 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Due: {formatDate(task.dueDate)}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Volunteer Info */}
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Volunteer Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <FaUserCheck className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Volunteer ID</p>
                  <p className="font-medium text-gray-900">VOL-{user.name.slice(0, 3).toUpperCase()}001</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium text-gray-900">{formatDate(user.joinDate)}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <Link to="/dashboard/profile" className="text-red-500 hover:text-red-600 flex items-center text-sm">
                Update Profile Information <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      {stats.urgentRequests > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-gradient-to-r from-red-500 to-orange-500 text-white border-0"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-xl mr-4">
                <FaAmbulance className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Emergency Alert</h3>
                <p className="opacity-90 mt-1">
                  There are {stats.urgentRequests} urgent blood requests that need immediate attention.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard/donation-requests?status=urgent')}
              className="mt-4 md:mt-0 bg-white text-red-500 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Respond Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-4xl font-bold text-red-500 mb-2">{stats.totalDonations}</div>
          <p className="text-gray-600">Total Requests Handled</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-500 mb-2">{stats.completedDonations}</div>
          <p className="text-gray-600">Successful Donations</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.pendingRequests}</div>
          <p className="text-gray-600">Pending Actions</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
          <p className="text-gray-600">Response Rate</p>
        </div>
      </div>

      {/* Volunteer Motivation */}
      <div className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Impact Matters</h3>
            <p className="text-gray-700">
              Every action you take helps save lives. Thank you for your dedication and commitment 
              to helping those in need of blood donations. Your work as a volunteer makes a real difference.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaHeartbeat className="text-red-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Together we can</p>
                <p className="font-bold text-gray-900">Save More Lives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;