import { useState } from 'react';
import { FiEdit2, FiTrash2, FiEye, FiFilter, FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi';
import DonationRequestCard from '../common/DonationRequestCard';
import StatusButton from '../ui/StatusButton';
import ConfirmationModal from '../common/ConfirmationModal';
import BloodGroupBadge from '../ui/BloodGroupBadge';

const DonationRequestTable = ({
  requests = [],
  onEdit,
  onDelete,
  onView,
  onStatusChange,
  loading = false,
  pagination = null,
  onPageChange,
  filters = {},
  onFilterChange,
  showActions = true,
  compact = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const statusFilters = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' }
  ];

  const handleDeleteClick = (request) => {
    setSelectedRequest(request);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRequest && onDelete) {
      onDelete(selectedRequest._id);
    }
    setDeleteModalOpen(false);
    setSelectedRequest(null);
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(requestId, newStatus);
    }
  };

  const filteredRequests = selectedFilter === 'all' 
    ? requests 
    : requests.filter(req => req.status === selectedFilter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (compact) {
    return (
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <DonationRequestCard
            key={request._id}
            request={request}
            compact={true}
            onStatusUpdate={handleStatusUpdate}
            onDelete={() => handleDeleteClick(request)}
            onEdit={() => onEdit && onEdit(request._id)}
            showActions={showActions}
          />
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="flex space-x-4">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          {/* Status Filters */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {statusFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Export Button */}
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
          <FiDownload className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {showActions && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={showActions ? 6 : 5} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No donation requests found</p>
                      <p className="text-sm mt-1">Try changing your filters or create a new request</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{request.recipientName}</div>
                        <div className="text-sm text-gray-500">{request.hospitalName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BloodGroupBadge bloodGroup={request.bloodGroup} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.recipientDistrict}</div>
                      <div className="text-sm text-gray-500">{request.recipientUpazila}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(request.donationDate)}</div>
                      <div className="text-sm text-gray-500">{formatTime(request.donationTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusButton
                        status={request.status}
                        size="sm"
                        onClick={() => {}}
                      />
                    </td>
                    {showActions && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onView && onView(request._id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          
                          {onEdit && (
                            <button
                              onClick={() => onEdit(request._id)}
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="Edit"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                          )}
                          
                          {onDelete && (
                            <button
                              onClick={() => handleDeleteClick(request)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && onPageChange && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{pagination.start}</span> to{' '}
                <span className="font-medium">{pagination.end}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> results
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onPageChange(pagination.current - 1)}
                  disabled={!pagination.hasPrevious}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`px-3 py-1 rounded-lg ${
                        pagination.current === pageNum
                          ? 'bg-red-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => onPageChange(pagination.current + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Donation Request"
        message={`Are you sure you want to delete the donation request for ${selectedRequest?.recipientName}? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        icon="delete"
      />
    </>
  );
};

export default DonationRequestTable;