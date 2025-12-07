import { FiX, FiUser, FiMapPin, FiCalendar, FiClock, FiDroplet, FiHome, FiMessageSquare, FiPhone, FiMail, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';
import BloodGroupBadge from '../ui/BloodGroupBadge';
import StatusButton from '../ui/StatusButton';

const DonationDetailsModal = ({
  isOpen,
  onClose,
  donation,
  currentUser,
  onStatusChange,
  onContactDonor,
  onContactRequester,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !donation) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getUrgencyBadge = () => {
    const donationDate = new Date(donation.donationDate);
    const today = new Date();
    const diffHours = Math.floor((donationDate - today) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
          <FiAlertCircle className="w-4 h-4 mr-1" />
          Urgent - Needs blood today
        </span>
      );
    }
    
    if (diffHours < 48) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <FiAlertCircle className="w-4 h-4 mr-1" />
          Soon - Within 48 hours
        </span>
      );
    }
    
    return null;
  };

  const canDonate = () => {
    if (!currentUser) return false;
    if (donation.status !== 'pending') return false;
    if (currentUser.bloodGroup !== donation.bloodGroup) return false;
    if (currentUser._id === donation.requester?._id) return false;
    return true;
  };

  const isRequester = () => {
    return currentUser && donation.requester && currentUser._id === donation.requester._id;
  };

  const isDonor = () => {
    return currentUser && donation.donor && currentUser._id === donation.donor._id;
  };

  const canManage = () => {
    return currentUser && (
      currentUser.role === 'admin' || 
      currentUser.role === 'volunteer' ||
      isRequester()
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-500 transition-colors"
            disabled={loading}
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <BloodGroupBadge bloodGroup={donation.bloodGroup} size="lg" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Donation Request for {donation.recipientName}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <StatusButton status={donation.status} size="sm" />
                      {getUrgencyBadge()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-1 border-b-2 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Request Details
                </button>
                <button
                  onClick={() => setActiveTab('location')}
                  className={`py-2 px-1 border-b-2 text-sm font-medium ${
                    activeTab === 'location'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Location & Hospital
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`py-2 px-1 border-b-2 text-sm font-medium ${
                    activeTab === 'contact'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Contact Information
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Recipient Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FiUser className="w-5 h-5 mr-2 text-gray-500" />
                      Recipient Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Recipient Name</p>
                        <p className="font-medium text-gray-900">{donation.recipientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Required Blood Group</p>
                        <div className="mt-1">
                          <BloodGroupBadge bloodGroup={donation.bloodGroup} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Donation Date</p>
                        <div className="flex items-center mt-1">
                          <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">{formatDate(donation.donationDate)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Donation Time</p>
                        <div className="flex items-center mt-1">
                          <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">{formatTime(donation.donationTime)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Request Message */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FiMessageSquare className="w-5 h-5 mr-2 text-gray-500" />
                      Request Message
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-line">{donation.requestMessage}</p>
                    </div>
                  </div>

                  {/* Status Information */}
                  {donation.status !== 'pending' && (
                    <div className={`rounded-lg p-4 ${
                      donation.status === 'done' ? 'bg-green-50 border border-green-200' :
                      donation.status === 'inprogress' ? 'bg-blue-50 border border-blue-200' :
                      donation.status === 'canceled' ? 'bg-red-50 border border-red-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <h4 className="font-medium text-gray-900 mb-2">Status Information</h4>
                      {donation.status === 'inprogress' && donation.donor && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Donor Assigned:</span> {donation.donor.name}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Contact:</span> {donation.donor.email}
                          </p>
                        </div>
                      )}
                      {donation.status === 'done' && (
                        <p className="text-sm text-green-700">
                          ✓ This donation request has been successfully completed.
                        </p>
                      )}
                      {donation.status === 'canceled' && (
                        <p className="text-sm text-red-700">
                          ✗ This donation request has been canceled.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  {/* Hospital Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FiHome className="w-5 h-5 mr-2 text-gray-500" />
                      Hospital Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Hospital Name</p>
                        <p className="font-medium text-gray-900">{donation.hospitalName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Full Address</p>
                        <p className="font-medium text-gray-900">{donation.fullAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Map */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FiMapPin className="w-5 h-5 mr-2 text-gray-500" />
                      Location Details
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">District</p>
                          <p className="font-medium text-gray-900">{donation.recipientDistrict}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Upazila</p>
                          <p className="font-medium text-gray-900">{donation.recipientUpazila}</p>
                        </div>
                      </div>
                      
                      {/* Map Placeholder */}
                      <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Map view would be displayed here</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Directions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">📍 Getting There</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• The hospital is located at the provided address</li>
                      <li>• Bring valid identification and donor card if available</li>
                      <li>• Arrive 15 minutes before the scheduled time</li>
                      <li>• Contact the requester if you need directions</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  {/* Requester Contact */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Requester Contact</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiUser className="w-5 h-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{donation.requester?.name}</p>
                          <p className="text-sm text-gray-600">Requester</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="w-5 h-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{donation.requester?.email}</p>
                          <p className="text-sm text-gray-600">Email</p>
                        </div>
                      </div>
                      {donation.requester?.phone && (
                        <div className="flex items-center">
                          <FiPhone className="w-5 h-5 mr-3 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{donation.requester.phone}</p>
                            <p className="text-sm text-gray-600">Phone</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Donor Contact (if assigned) */}
                  {donation.donor && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Donor Contact</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <FiUser className="w-5 h-5 mr-3 text-green-500" />
                          <div>
                            <p className="font-medium text-gray-900">{donation.donor.name}</p>
                            <p className="text-sm text-gray-600">Assigned Donor</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiMail className="w-5 h-5 mr-3 text-green-500" />
                          <div>
                            <p className="font-medium text-gray-900">{donation.donor.email}</p>
                            <p className="text-sm text-gray-600">Email</p>
                          </div>
                        </div>
                        {donation.donor.phone && (
                          <div className="flex items-center">
                            <FiPhone className="w-5 h-5 mr-3 text-green-500" />
                            <div>
                              <p className="font-medium text-gray-900">{donation.donor.phone}</p>
                              <p className="text-sm text-gray-600">Phone</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Guidelines */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                      <FiAlertCircle className="w-5 h-5 mr-2" />
                      Contact Guidelines
                    </h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Contact during reasonable hours (9 AM - 9 PM)</li>
                      <li>• Be respectful and clear about your needs</li>
                      <li>• Confirm appointment details in writing if possible</li>
                      <li>• Report any issues to platform administrators</li>
                      <li>• Never share sensitive personal information unnecessarily</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                Request ID: <span className="font-mono">{donation._id?.slice(-8) || 'N/A'}</span>
                <span className="mx-2">•</span>
                Created: {new Date(donation.createdAt).toLocaleDateString()}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {canDonate() && (
                  <button
                    onClick={() => onStatusChange && onStatusChange(donation._id, 'inprogress')}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                  >
                    Donate Blood
                  </button>
                )}

                {canManage() && donation.status === 'inprogress' && (
                  <>
                    <button
                      onClick={() => onStatusChange && onStatusChange(donation._id, 'done')}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => onStatusChange && onStatusChange(donation._id, 'canceled')}
                      disabled={loading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                    >
                      Cancel Request
                    </button>
                  </>
                )}

                {onContactRequester && !isRequester() && (
                  <button
                    onClick={() => onContactRequester(donation.requester)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Contact Requester
                  </button>
                )}

                {onContactDonor && donation.donor && !isDonor() && (
                  <button
                    onClick={() => onContactDonor(donation.donor)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Contact Donor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal;