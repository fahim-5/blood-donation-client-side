import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFilter, 
  FaSearch, 
  FaEye, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaExclamationTriangle,
  FaSync,
  FaListUl,
  FaDownload,
  FaCalendarAlt,
  FaHospital,
  FaUserInjured,
  FaMapMarkerAlt,
  FaTint,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { formatDate } from '../../../utils/dateUtils';

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
  },
  updateStatus: async (id, data) => {
    // Mock implementation - replace with actual API call
    return { success: true, data: { _id: id, ...data } };
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

  const updateDonationStatus = async (id, statusData) => {
    try {
      setLoading(true);
      const response = await donationService.updateStatus(id, statusData);
      
      if (response.success) {
        // Update local state
        setDonations(prev =>
          prev.map(donation =>
            donation._id === id
              ? { ...donation, ...response.data }
              : donation
          )
        );
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Failed to update donation status');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    fetchAllDonations();
  }, [fetchAllDonations]);

  return {
    donations,
    loading,
    error,
    fetchAllDonations,
    updateDonationStatus,
    filters,
    setFilters,
    pagination,
    handlePageChange
  };
};

// Mock auth hook (replace with actual auth context)
const useAuth = () => {
  return {
    user: { role: 'volunteer' }
  };
};

// Main Component
const AllDonationRequestsVolunteer = () => {
  const { user } = useAuth();
  const { 
    donations, 
    loading, 
    error, 
    fetchAllDonations, 
    updateDonationStatus,
    filters,
    setFilters,
    pagination,
    handlePageChange
  } = useDonations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  // Status options for volunteer
  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: <FaClock className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'inprogress', label: 'In Progress', icon: <FaSync className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' },
    { value: 'done', label: 'Completed', icon: <FaCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800' },
    { value: 'canceled', label: 'Canceled', icon: <FaTimesCircle className="text-red-500" />, color: 'bg-red-100 text-red-800' },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleStatusChange = (requestId, status) => {
    const request = donations.find(d => d._id === requestId);
    if (!request) return;
    
    setSelectedRequest(request);
    setNewStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!selectedRequest || !newStatus) return;

    setUpdating(true);
    try {
      await updateDonationStatus(selectedRequest._id, { status: newStatus });
      setShowStatusModal(false);
      setSelectedRequest(null);
      setNewStatus('');
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = searchTerm === '' || 
      (donation.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       donation.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       donation.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilters = !filters.status || donation.status === filters.status;
    
    return matchesSearch && matchesFilters;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="text-yellow-500" />;
      case 'inprogress': return <FaSync className="text-blue-500 animate-spin" />;
      case 'done': return <FaCheckCircle className="text-green-500" />;
      case 'canceled': return <FaTimesCircle className="text-red-500" />;
      default: return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inprogress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgentBadge = (donation) => {
    if (!donation.donationDate) return null;
    
    try {
      const donationDate = new Date(donation.donationDate);
      const today = new Date();
      const diffDays = Math.ceil((donationDate - today) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
            <FaExclamationTriangle className="w-3 h-3 mr-1" /> URGENT
          </span>
        );
      } else if (diffDays <= 3) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <FaClock className="w-3 h-3 mr-1" /> SOON
          </span>
        );
      }
    } catch (err) {
      console.error('Error calculating urgency:', err);
    }
    return null;
  };

  if (loading && donations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && donations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-5xl mb-4">
          <FaExclamationTriangle />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Donation Requests</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchAllDonations}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Donation Requests</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all blood donation requests as a volunteer
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{filteredDonations.length}</span> requests
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusOptions.map((status) => {
          const count = donations.filter(d => d.status === status.value).length;
          return (
            <motion.div
              key={status.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`dashboard-card cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 ${status.value === 'pending' ? 'border-l-yellow-500' : status.value === 'inprogress' ? 'border-l-blue-500' : status.value === 'done' ? 'border-l-green-500' : 'border-l-red-500'}`}
              onClick={() => handleFilterChange({ ...filters, status: status.value })}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total {status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-full ${status.color.split(' ')[0]} bg-opacity-20`}>
                  {status.icon}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by recipient name, hospital, or blood group..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-primary pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500" />
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange({ ...filters, status: e.target.value })}
                className="input-primary py-2"
              >
                <option value="">All Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Requests List */}
      <div className="space-y-4">
        {filteredDonations.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">
              <FaListUl />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Donation Requests Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filters.status 
                ? 'Try changing your search criteria' 
                : 'There are no donation requests at the moment'}
            </p>
            {(searchTerm || filters.status) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ ...filters, status: '' });
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDonations.map((donation, index) => (
                <motion.div
                  key={donation._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      {/* Request Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <FaUserInjured className="mr-2 text-red-500" />
                            {donation.recipientName || 'Unknown Recipient'}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Requested by: {donation.requesterName || 'Unknown'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getUrgentBadge(donation)}
                          <span className={`badge ${getStatusColor(donation.status)} flex items-center`}>
                            {getStatusIcon(donation.status)}
                            <span className="ml-1 capitalize">{donation.status || 'unknown'}</span>
                          </span>
                        </div>
                      </div>

                      {/* Request Details */}
                      <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center">
                            <FaTint className="text-red-500 mr-2" />
                            <span className="text-gray-700">
                              <span className="font-semibold">Blood:</span> {donation.bloodGroup || 'Unknown'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-blue-500 mr-2" />
                            <span className="text-gray-700">
                              <span className="font-semibold">Date:</span> {donation.donationDate ? formatDate(donation.donationDate) : 'Not set'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <FaHospital className="text-green-500 mr-2" />
                          <span className="text-gray-700">
                            <span className="font-semibold">Hospital:</span> {donation.hospitalName || 'Not specified'}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-purple-500 mr-2" />
                          <span className="text-gray-700">
                            <span className="font-semibold">Location:</span> {donation.recipientUpazila || 'Unknown'}, {donation.recipientDistrict || 'Unknown'}
                          </span>
                        </div>

                        {donation.requestMessage && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Request Message:</span> {donation.requestMessage}
                            </p>
                          </div>
                        )}

                        {donation.donor && donation.status === 'inprogress' && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <span className="font-semibold">Donor Assigned:</span> {donation.donor.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                        <Link
                          to={`/dashboard/donation-request/${donation._id}`}
                          className="btn-outline flex items-center"
                        >
                          <FaEye className="mr-2" />
                          View Details
                        </Link>
                        
                        <div className="flex-1" />
                        
                        {/* Status Change Dropdown */}
                        <div className="relative">
                          <select
                            value={donation.status || ''}
                            onChange={(e) => handleStatusChange(donation._id, e.target.value)}
                            className="input-primary py-2 pr-8 cursor-pointer"
                            disabled={updating}
                          >
                            {statusOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                Change to: {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-semibold">{filteredDonations.length}</span> of{' '}
                  <span className="font-semibold">{pagination.totalItems}</span> requests
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg border ${
                          pagination.currentPage === pageNum
                            ? 'bg-red-500 text-white border-red-500'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Update Donation Status</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to change the status of this donation request?
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Recipient:</span>
                  <span>{selectedRequest.recipientName || 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Blood Group:</span>
                  <span className="font-bold text-red-600">{selectedRequest.bloodGroup || 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Current Status:</span>
                  <span className={`badge ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="label">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input-primary"
                  disabled={updating}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedRequest(null);
                    setNewStatus('');
                  }}
                  className="btn-outline"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusUpdate}
                  className="btn-primary"
                  disabled={updating || newStatus === selectedRequest.status}
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Volunteer Information Box */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="p-6">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaExclamationTriangle className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer Guidelines</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>You can only update the status of donation requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Only update status when you have verified the information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>For urgent requests, contact the requester directly if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Report any suspicious requests to the admin team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequestsVolunteer;