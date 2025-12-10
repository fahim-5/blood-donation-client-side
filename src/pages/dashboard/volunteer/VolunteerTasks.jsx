import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaCalendarCheck,
  FaUserCheck,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHospital,
  FaTint,
  FaUserInjured,
  FaBell,
  FaCheckDouble,
  FaTrash,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaEye
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

// Mock donation service (replace with actual service import)
const donationService = {
  getDonations: async (params = {}) => {
    // Mock implementation - replace with actual API call
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
  }
};

// Custom hook for donations
const useDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  const fetchAllDonations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await donationService.getDonations({
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filters
      });
      
      if (response.success) {
        setDonations(response.data.donations || []);
        setPagination(prev => ({
          ...prev,
          totalItems: response.data.total || 0,
          totalPages: response.data.totalPages || 1
        }));
      } else {
        throw new Error(response.message || 'Failed to fetch donations');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching donations');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.currentPage, pagination.limit]);

  useEffect(() => {
    fetchAllDonations();
  }, [fetchAllDonations]);

  return {
    donations,
    loading,
    error,
    fetchAllDonations,
    filters,
    setFilters,
    pagination
  };
};

// Mock auth hook (replace with actual auth context)
const useAuth = () => {
  return {
    user: { role: 'volunteer' }
  };
};

// Date utilities (mock implementations)
const formatDate = (date) => {
  if (!date) return 'Not set';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getRelativeTime = (date) => {
  if (!date) return 'Recently';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(date);
};

// Main Component
const VolunteerTasks = () => {
  const { user } = useAuth();
  const { donations, loading, fetchAllDonations } = useDonations();
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('urgency');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showTaskDetails, setShowTaskDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Task categories
  const taskCategories = [
    { id: 'pending', name: 'Pending Actions', icon: <FaClock className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'followup', name: 'Follow-ups', icon: <FaPhoneAlt className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'verification', name: 'Verifications', icon: <FaUserCheck className="text-purple-500" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'completed', name: 'Completed', icon: <FaCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' }
  ];

  // Sample tasks data (in real app, this would come from API)
  const sampleTasks = [
    {
      id: 1,
      donationId: 'DN001',
      type: 'followup',
      title: 'Follow up with donor for DN001',
      description: 'Call the assigned donor to confirm their availability for tomorrow\'s donation',
      recipientName: 'Abdul Karim',
      bloodGroup: 'A+',
      hospital: 'Dhaka Medical College Hospital',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      priority: 'high',
      status: 'pending',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      actions: ['call', 'email', 'update_status']
    },
    {
      id: 2,
      donationId: 'DN002',
      type: 'verification',
      title: 'Verify hospital details for DN002',
      description: 'Confirm hospital bed availability and contact information',
      recipientName: 'Fatema Begum',
      bloodGroup: 'B-',
      hospital: 'Square Hospital',
      dueDate: new Date(Date.now() + 172800000), // 2 days
      priority: 'medium',
      status: 'pending',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      actions: ['call_hospital', 'verify_documents']
    },
    {
      id: 3,
      donationId: 'DN003',
      type: 'pending',
      title: 'Update status for completed donation',
      description: 'Donation was completed yesterday, update the status in system',
      recipientName: 'Rahim Ahmed',
      bloodGroup: 'O+',
      hospital: 'Apollo Hospital',
      dueDate: new Date(Date.now() + 86400000), // Tomorrow
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 14400000), // 4 hours ago
      actions: ['update_status', 'notify_requester']
    },
    {
      id: 4,
      donationId: 'DN004',
      type: 'followup',
      title: 'Emergency blood required - urgent followup',
      description: 'Patient needs immediate blood transfusion, contact all available donors',
      recipientName: 'Sadia Rahman',
      bloodGroup: 'AB-',
      hospital: 'Bangabandhu Sheikh Mujib Medical University',
      dueDate: new Date(Date.now() + 43200000), // 12 hours
      priority: 'critical',
      status: 'pending',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
      actions: ['urgent_call', 'find_donors', 'coordinate']
    },
    {
      id: 5,
      donationId: 'DN005',
      type: 'completed',
      title: 'Task completed: Donor coordination',
      description: 'Successfully coordinated 3 donors for emergency request',
      recipientName: 'Kamal Hossain',
      bloodGroup: 'B+',
      hospital: 'Ibn Sina Hospital',
      dueDate: new Date(Date.now() - 86400000), // Yesterday
      priority: 'high',
      status: 'completed',
      assignedTo: 'You',
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      completedAt: new Date(Date.now() - 172800000), // 2 days ago
      actions: []
    }
  ];

  useEffect(() => {
    // Initialize with sample tasks (replace with API call)
    setTasks(sampleTasks);
    setFilteredTasks(sampleTasks);
  }, []);

  useEffect(() => {
    if (donations.length > 0) {
      // Generate tasks from donation data
      generateTasksFromDonations();
    }
  }, [donations]);

  const generateTasksFromDonations = () => {
    const generatedTasks = donations
      .filter(donation => donation.status === 'pending' || donation.status === 'inprogress')
      .map(donation => ({
        id: donation._id || `task-${Date.now()}`,
        donationId: donation._id || `DN${Date.now().toString().slice(-6)}`,
        type: donation.status === 'pending' ? 'verification' : 'followup',
        title: `${donation.status === 'pending' ? 'Verify' : 'Follow up'} donation request ${donation.recipientName || 'Unknown'}`,
        description: `Blood required: ${donation.bloodGroup || 'Unknown'} at ${donation.hospitalName || 'Unknown hospital'}`,
        recipientName: donation.recipientName || 'Unknown Recipient',
        bloodGroup: donation.bloodGroup || 'Unknown',
        hospital: donation.hospitalName || 'Unknown Hospital',
        dueDate: donation.donationDate ? new Date(donation.donationDate) : new Date(Date.now() + 86400000),
        priority: getPriority(donation.donationDate),
        status: 'pending',
        assignedTo: 'You',
        createdAt: donation.createdAt ? new Date(donation.createdAt) : new Date(),
        donationData: donation
      }));
    
    setTasks(prev => [...prev, ...generatedTasks]);
    setFilteredTasks(prev => [...prev, ...generatedTasks]);
  };

  const getPriority = (donationDate) => {
    if (!donationDate) return 'medium';
    
    try {
      const date = new Date(donationDate);
      const today = new Date();
      const diffHours = (date - today) / (1000 * 60 * 60);
      
      if (diffHours <= 24) return 'critical';
      if (diffHours <= 48) return 'high';
      if (diffHours <= 72) return 'medium';
      return 'low';
    } catch (error) {
      return 'medium';
    }
  };

  useEffect(() => {
    let result = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.recipientName?.toLowerCase().includes(term) ||
        task.bloodGroup?.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(task => task.type === filterStatus);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'urgency':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          comparison = (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
          break;
        case 'dueDate':
          comparison = (new Date(a.dueDate) || new Date()) - (new Date(b.dueDate) || new Date());
          break;
        case 'createdAt':
          comparison = (new Date(a.createdAt) || new Date()) - (new Date(b.createdAt) || new Date());
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    setFilteredTasks(result);
  }, [tasks, searchTerm, filterStatus, sortBy, sortOrder]);

  const handleCompleteTask = (taskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: 'completed',
              completedAt: new Date(),
              type: 'completed'
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'followup': return <FaPhoneAlt className="text-blue-500" />;
      case 'verification': return <FaUserCheck className="text-purple-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'completed': return <FaCheckCircle className="text-green-500" />;
      default: return <FaTasks className="text-gray-500" />;
    }
  };

  const handleViewDonation = (task) => {
    if (task.donationId && task.donationId !== 'DN001' && task.donationId !== 'DN002' && 
        task.donationId !== 'DN003' && task.donationId !== 'DN004' && task.donationId !== 'DN005') {
      // Only open for real donation IDs, not sample ones
      window.open(`/dashboard/donation-request/${task.donationId}`, '_blank');
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaTasks className="mr-3 text-red-500" />
            Volunteer Tasks
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your assigned tasks and track your volunteer activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filteredTasks.length}</span> tasks
          </span>
          <button
            onClick={() => fetchAllDonations()}
            className="btn-outline flex items-center text-sm"
          >
            <FaBell className="mr-2" />
            Refresh Tasks
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taskCategories.map((category) => {
          const count = tasks.filter(task => task.type === category.id).length;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => setFilterStatus(category.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{category.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-full ${category.color.split(' ')[0]} bg-opacity-20`}>
                  {category.icon}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks by title, recipient, or blood group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-primary py-2"
              >
                <option value="all">All Tasks</option>
                {taskCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              {sortOrder === 'desc' ? (
                <FaSortAmountDown className="text-gray-500 cursor-pointer" onClick={() => setSortOrder('asc')} />
              ) : (
                <FaSortAmountUp className="text-gray-500 cursor-pointer" onClick={() => setSortOrder('desc')} />
              )}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-primary py-2"
              >
                <option value="urgency">Sort by Urgency</option>
                <option value="dueDate">Sort by Due Date</option>
                <option value="createdAt">Sort by Created</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">
              <FaCheckDouble />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tasks Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== 'all'
                ? 'Try changing your search criteria'
                : 'Great job! You have completed all your tasks.'}
            </p>
            {(searchTerm || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Task Cards */}
            <div className="space-y-4">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`card hover:shadow-lg transition-all duration-300 ${
                    task.type === 'completed' ? 'opacity-80' : ''
                  }`}
                >
                  <div className="p-6">
                    {/* Task Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTaskIcon(task.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{task.title || 'Untitled Task'}</h3>
                            <p className="text-gray-600 mt-1">{task.description || 'No description available'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className={`badge ${getPriorityColor(task.priority)}`}>
                          {(task.priority || 'medium').toUpperCase()}
                        </span>
                        <span className={`badge ${getStatusColor(task.status)}`}>
                          {(task.status || 'pending').replace('_', ' ').toUpperCase()}
                        </span>
                        {task.type !== 'completed' && task.dueDate && (
                          <span className="badge bg-blue-100 text-blue-800">
                            Due: {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center">
                        <FaUserInjured className="text-red-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Recipient</p>
                          <p className="font-medium text-gray-900">{task.recipientName || 'Unknown'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FaTint className="text-red-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Blood Group</p>
                          <p className="font-bold text-red-600">{task.bloodGroup || 'Unknown'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FaHospital className="text-green-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Hospital</p>
                          <p className="font-medium text-gray-900">{task.hospital || 'Unknown'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <FaCalendarCheck className="text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="font-medium text-gray-900">{getRelativeTime(task.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Task Actions */}
                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Assigned to: <span className="font-semibold text-gray-900">{task.assignedTo || 'You'}</span>
                        {task.type === 'completed' && task.completedAt && (
                          <span className="ml-4">
                            Completed: {formatDate(task.completedAt)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2 lg:mt-0">
                        {task.donationId && (
                          <button
                            onClick={() => handleViewDonation(task)}
                            className="btn-outline flex items-center text-sm"
                          >
                            <FaEye className="mr-2" />
                            View Donation
                          </button>
                        )}
                        
                        {task.type !== 'completed' && (
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className="btn-primary flex items-center text-sm"
                            disabled={isUpdating}
                          >
                            <FaCheckCircle className="mr-2" />
                            Mark Complete
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="btn-danger flex items-center text-sm"
                          disabled={isUpdating}
                        >
                          <FaTrash className="mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons for specific tasks */}
                    {task.actions && task.actions.length > 0 && task.type !== 'completed' && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {task.actions.includes('call') && (
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                              <FaPhoneAlt className="inline mr-1" /> Call
                            </button>
                          )}
                          {task.actions.includes('email') && (
                            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                              <FaEnvelope className="inline mr-1" /> Email
                            </button>
                          )}
                          {task.actions.includes('update_status') && (
                            <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200">
                              Update Status
                            </button>
                          )}
                          {task.actions.includes('urgent_call') && (
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                              <FaPhoneAlt className="inline mr-1" /> Urgent Call
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Task Summary */}
            <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Summary</h3>
                  <p className="text-gray-600">
                    You have <span className="font-bold">{tasks.filter(t => t.type !== 'completed').length}</span> pending tasks
                    and <span className="font-bold text-green-600">{tasks.filter(t => t.type === 'completed').length}</span> completed tasks.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {tasks.filter(t => t.priority === 'critical' && t.type !== 'completed').length}
                      </div>
                      <div className="text-sm text-gray-600">Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {tasks.filter(t => t.priority === 'high' && t.type !== 'completed').length}
                      </div>
                      <div className="text-sm text-gray-600">High</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {tasks.filter(t => t.priority === 'medium' && t.type !== 'completed').length}
                      </div>
                      <div className="text-sm text-gray-600">Medium</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Volunteer Guidelines */}
      <div className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <div className="p-6">
          <div className="flex items-start">
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <FaExclamationCircle className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer Task Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Always prioritize critical and high-priority tasks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Update task status immediately after completion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Contact donors and recipients professionally</span>
                  </li>
                </ul>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Document all communication for reference</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Report any issues to admin immediately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Keep sensitive information confidential</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerTasks;