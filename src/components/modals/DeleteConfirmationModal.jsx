import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName = "",
  itemType = "item",
  loading = false,
  dangerLevel = "high" // high, medium, low
}) => {
  if (!isOpen) return null;

  const getDangerColor = () => {
    switch (dangerLevel) {
      case 'high':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'medium':
        return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500';
      case 'low':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      default:
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    }
  };

  const getIconColor = () => {
    switch (dangerLevel) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  const getBgColor = () => {
    switch (dangerLevel) {
      case 'high':
        return 'bg-red-50 border-red-100';
      case 'medium':
        return 'bg-orange-50 border-orange-100';
      case 'low':
        return 'bg-yellow-50 border-yellow-100';
      default:
        return 'bg-red-50 border-red-100';
    }
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
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
            disabled={loading}
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className={`px-6 pt-6 pb-4 border-b ${getBgColor()}`}>
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${getIconColor()} bg-opacity-10`}>
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  This action is irreversible
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="mb-4">
              <p className="text-gray-700">
                {message}
              </p>
              
              {itemName && (
                <div className={`mt-3 p-3 rounded-lg ${getBgColor()}`}>
                  <div className="flex items-center">
                    <FiTrash2 className={`w-4 h-4 mr-2 ${getIconColor()}`} />
                    <span className="font-medium">{itemType}:</span>
                    <span className="ml-2 font-semibold">{itemName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Warning List */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${getIconColor()}`}></div>
                </div>
                <span className="ml-2">This action cannot be undone</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${getIconColor()}`}></div>
                </div>
                <span className="ml-2">All related data will be permanently removed</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${getIconColor()}`}></div>
                </div>
                <span className="ml-2">This may affect other parts of the system</span>
              </div>
            </div>

            {/* Type to Confirm (for high danger) */}
            {dangerLevel === 'high' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  placeholder="DELETE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  onChange={(e) => {
                    // You can add validation here
                  }}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`w-full sm:w-auto inline-flex justify-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${getDangerColor()} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="w-4 h-4 mr-2" />
                    Delete {itemType}
                  </>
                )}
              </button>
            </div>

            {/* Additional Warning */}
            <div className={`mt-4 p-2 rounded text-xs text-center ${getIconColor()} ${getBgColor()}`}>
              ⚠️ Please review carefully before confirming
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;