// client/src/components/modals/PaymentModal.jsx
import { FiX, FiCreditCard, FiDollarSign, FiLock, FiCheck, FiInfo, FiGift } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentModal = ({
  isOpen,
  onClose,
  onSuccess,
  donationAmount = 0,
  requestTitle = '',
  requestId = '',
  isFunding = false,
  user,
  isLoading = false
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [amount, setAmount] = useState(donationAmount || 10);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleAmountSelect = (amt) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    
    if (value && !isNaN(value) && parseFloat(value) >= 1) {
      setAmount(parseFloat(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (amount < 1) {
      newErrors.amount = 'Minimum donation amount is $1';
    }
    
    if (paymentMethod === 'card' && !cardComplete) {
      newErrors.card = 'Please complete your card details';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!stripe || !elements) {
      setErrors({ form: 'Payment system not ready. Please try again.' });
      return;
    }
    
    setIsProcessing(true);
    setErrors({});

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentMethod: stripePaymentMethod } = 
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name,
            email
          }
        });

      if (stripeError) {
        setErrors({ card: stripeError.message });
        setIsProcessing(false);
        return;
      }

      // Here you would typically send the paymentMethod.id to your server
      // For this example, we'll simulate a successful payment
      setTimeout(() => {
        setIsProcessing(false);
        if (onSuccess) {
          onSuccess({
            amount,
            paymentMethodId: stripePaymentMethod.id,
            name,
            email,
            requestId,
            requestTitle,
            timestamp: new Date().toISOString()
          });
        }
        handleClose();
      }, 1500);

    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing && !isLoading) {
      onClose();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true
  };

  if (!isOpen) return null;

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
            disabled={isProcessing || isLoading}
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mr-4">
                <FiCreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isFunding ? 'Make a Donation' : 'Complete Payment'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isFunding 
                    ? 'Support our blood donation initiative'
                    : 'Support this blood donation request'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="p-6 space-y-6">
                {/* Donation Purpose */}
                {requestTitle && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <FiGift className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900 mb-1">
                          Donating for: {requestTitle}
                        </p>
                        <p className="text-sm text-blue-700">
                          Your contribution helps save lives through blood donation services
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amount Selection */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <FiDollarSign className="w-5 h-5 mr-2 text-gray-500" />
                    Select Donation Amount
                  </h4>
                  
                  {/* Preset Amounts */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        className={`px-3 py-3 rounded-lg border font-medium transition-colors ${
                          amount === amt && !customAmount
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter custom amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="0.00"
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                    )}
                  </div>

                  {/* Selected Amount Display */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-700">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Personal Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Payment Method</h4>
                  
                  <div className="space-y-3">
                    {/* Payment Method Selection */}
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                          paymentMethod === 'card'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <FiCreditCard className="w-4 h-4 mr-2" />
                        Credit/Debit Card
                      </button>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Details *
                          </label>
                          <div className={`p-3 border rounded-lg ${
                            errors.card ? 'border-red-500' : 'border-gray-300'
                          }`}>
                            <CardElement
                              options={cardElementOptions}
                              onChange={(e) => {
                                setCardComplete(e.complete);
                                if (errors.card) setErrors({ ...errors, card: '' });
                              }}
                            />
                          </div>
                          {errors.card && (
                            <p className="mt-1 text-sm text-red-600">{errors.card}</p>
                          )}
                        </div>

                        {/* Security Info */}
                        <div className="flex items-center text-sm text-gray-500">
                          <FiLock className="w-4 h-4 mr-2 flex-shrink-0" />
                          <p>Your payment is secure and encrypted</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security & Privacy */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiLock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
                      <p>All transactions are secure and encrypted. We never store your credit card details.</p>
                    </div>
                  </div>
                </div>

                {/* Form Errors */}
                {errors.form && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <FiInfo className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <p className="text-sm text-red-700">{errors.form}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center sm:space-x-4">
                <div className="text-sm text-gray-500 mt-3 sm:mt-0">
                  <div className="flex items-center">
                    <FiLock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>Secured by Stripe</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-0"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!stripe || isProcessing || isLoading || !cardComplete}
                    className="w-full sm:w-auto px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4 mr-2" />
                        Donate ${amount.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;