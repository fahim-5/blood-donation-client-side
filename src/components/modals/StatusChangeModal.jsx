// client/src/components/modals/StatusChangeModal.jsx
import { FiX, FiAlertCircle, FiInfo, FiClock, FiCheck, FiXCircle, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const StatusChangeModal = ({
  isOpen,
  onClose,
  donation,
  currentUser,
  onStatusChange,
  isLoading = false
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow', icon: FiClock, description: 'Request is waiting for a donor' },
    { value: 'inprogress', label: 'In Progress', color: 'blue', icon: FiClock, description: 'Donor has been assigned' },
    { value: 'done', label: 'Completed', color: 'green', icon: FiCheck, description: 'Donation has been successfully completed' },
    { value: 'canceled', label: 'Canceled', color: 'red', icon: FiXCircle, description: 'Request has been canceled' }
  ];

  useEffect(() => {
    if (donation) {
      setSelectedStatus(donation.status);
      setReason('');
      setNotes('');
      setErrors({});
    }
  }, [donation]);

  const getAvailableStatuses = () => {
    if (!currentUser || !donation) return [];

    const currentStatus = donation.status;
    const userRole = currentUser.role;

    // Define status transitions based on user role
    const statusTransitions = {
      admin: {
        pending: ['inprogress', 'canceled'],
        inprogress: ['done', 'canceled', 'pending'],
        done: ['inprogress'],
        canceled: ['pending', 'inprogress']
      },
      volunteer: {
        pending: ['inprogress'],
        inprogress: ['done', 'canceled'],
        done: [],
        canceled: []
      },
      donor: {
        pending: ['canceled'],
        inprogress: ['done', 'canceled'],
        done: [],
        canceled: []
      }
    };

    const availableStatuses = statusTransitions[userRole]?.[currentStatus] || [];
    return statusOptions.filter(option => 
      option.value === currentStatus || availableStatuses.includes(option.value)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedStatus) {
      newErrors.status = 'Please select a status';
    }

    if (selectedStatus === 'canceled' && !reason.trim()) {
      newErrors.reason = 'Please provide a reason for cancellation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onStatusChange(donation._id, selectedStatus, {
        reason: selectedStatus === 'canceled' ? reason : undefined,
        notes: notes.trim() || undefined,
        changedBy: currentUser._id,
        previousStatus: donation.status
      });
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const getStatusDetails = (status) => {
    return statusOptions.find(opt => opt.value === status);
  };

  const isStatusChangeAllowed = () => {
    if (!currentUser || !donation) return false;
    
    // Admin can change any status
    if (currentUser.role === 'admin') return true;
    
    // Volunteer can only update status (not specific values)
    if (currentUser.role === 'volunteer') return true;
    
    // Donor can only change their own requests
    if (currentUser.role === 'donor') {
      return donation.requester?._id === currentUser._id;
    }
    
    return false;
  };

  if (!isOpen || !donation || !currentUser) return null;

  const currentStatus = getStatusDetails(donation.status);
  const selectedStatusDetails = getStatusDetails(selectedStatus);
  const availableStatuses = getAvailableStatuses();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative bg-white rounded-xl shadow-xl w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                currentStatus?.color === 'yellow' ? 'bg-yellow-100' :
                currentStatus?.color === 'blue' ? 'bg-blue-100' :
                currentStatus?.color === 'green' ? 'bg-green-100' : 'bg-red-100'
              } mr-4`}>
                {currentStatus?.icon && (
                  <currentStatus.icon className={`w-6 h-6 ${
                    currentStatus?.color === 'yellow' ? 'text-yellow-600' :
                    currentStatus?.color === 'blue' ? 'text-blue-600' :
                    currentStatus?.color === 'green' ? 'text-green-600' : 'text-red-600'
                  }`} />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Update Donation Status
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Request: {donation.recipientName}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="p-6 space-y-6">
                {/* Current Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                  <div className="flex items-center">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentStatus?.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      currentStatus?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      currentStatus?.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {currentStatus?.label}
                    </div>
                    <p className="text-sm text-gray-600 ml-3">
                      {currentStatus?.description}
                    </p>
                  </div>
                </div>

                {/* Donation Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Recipient</p>
                    <p className="font-medium text-gray-900">{donation.recipientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-medium text-gray-900">{donation.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(donation.donationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">{donation.donationTime}</p>
                  </div>
                </div>

                {/* Donor Information (if assigned) */}
                {donation.donor && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-3">Assigned Donor</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="font-medium">{donation.donor.name}</span>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="w-4 h-4 text-blue-500 mr-2" />
                        <span>{donation.donor.email}</span>
                      </div>
                      {donation.donor.phone && (
                        <div className="flex items-center">
                          <FiPhone className="w-4 h-4 text-blue-500 mr-2" />
                          <span>{donation.donor.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Selection */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Select New Status</h4>
                  
                  {!isStatusChangeAllowed() ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <FiAlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-red-700">
                          You don't have permission to change the status of this request.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableStatuses.map((status) => {
                        const Icon = status.icon;
                        const isCurrent = status.value === donation.status;
                        
                        return (
                          <button
                            key={status.value}
                            type="button"
                            onClick={() => {
                              setSelectedStatus(status.value);
                              if (errors.status) setErrors({ ...errors, status: '' });
                            }}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              selectedStatus === status.value
                                ? 'ring-2 ring-blue-500 border-blue-500'
                                : 'border-gray-300 hover:border-blue-300'
                            } ${
                              isCurrent ? 'bg-gray-50 opacity-75' : 'bg-white'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                status.color === 'yellow' ? 'bg-yellow-100' :
                                status.color === 'blue' ? 'bg-blue-100' :
                                status.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                              } mr-3`}>
                                <Icon className={`w-5 h-5 ${
                                  status.color === 'yellow' ? 'text-yellow-600' :
                                  status.color === 'blue' ? 'text-blue-600' :
                                  status.color === 'green' ? 'text-green-600' : 'text-red-600'
                                }`} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{status.label}</p>
                                <p className="text-xs text-gray-500 mt-1">{status.description}</p>
                              </div>
                            </div>
                            {isCurrent && (
                              <div className="mt-2 text-xs text-gray-500 italic">
                                Current status
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status}</p>
                  )}
                </div>

                {/* Selected Status Details */}
                {selectedStatusDetails && selectedStatus !== donation.status && (
                  <div className={`rounded-lg p-4 ${
                    selectedStatusDetails.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
                    selectedStatusDetails.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
                    selectedStatusDetails.color === 'green' ? 'bg-green-50 border border-green-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <h4 className="font-medium text-gray-900 mb-2">New Status Details</h4>
                    <div className="flex items-start">
                      <FiInfo className={`w-5 h-5 ${
                        selectedStatusDetails.color === 'yellow' ? 'text-yellow-500' :
                        selectedStatusDetails.color === 'blue' ? 'text-blue-500' :
                        selectedStatusDetails.color === 'green' ? 'text-green-500' :
                        'text-red-500'
                      } mr-2 mt-0.5 flex-shrink-0`} />
                      <div>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Status:</span> {selectedStatusDetails.label}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedStatusDetails.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reason for Cancellation */}
                {selectedStatus === 'canceled' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Cancellation *
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => {
                          setReason(e.target.value);
                          if (errors.reason) setErrors({ ...errors, reason: '' });
                        }}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                          errors.reason ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please explain why this request is being canceled..."
                      />
                      {errors.reason && (
                        <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Add any additional information about this status change..."
                  />
                </div>

                {/* Status Change Impact */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900 mb-1">Important</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Status changes will be logged and visible to all authorized users</li>
                        <li>Email notifications may be sent to involved parties</li>
                        <li>Review the information carefully before confirming</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="mt-3 sm:mt-0 w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                
                {isStatusChangeAllowed() && selectedStatus !== donation.status && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      `Update to ${selectedStatusDetails?.label || 'Selected Status'}`
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeModal;