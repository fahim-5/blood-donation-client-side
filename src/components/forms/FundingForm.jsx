import { useState } from 'react';
import { FiDollarSign, FiCreditCard, FiInfo, FiCheck } from 'react-icons/fi';

const FundingForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    isAnonymous: false,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePresetAmount = (amount) => {
    setFormData(prev => ({
      ...prev,
      amount: amount.toString()
    }));
    
    if (errors.amount) {
      setErrors(prev => ({
        ...prev,
        amount: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(formData.amount) < 10) {
      newErrors.amount = 'Minimum donation amount is ৳10';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else {
        const [month, year] = formData.cardExpiry.split('/');
        if (!month || !year || month.length !== 2 || year.length !== 2) {
          newErrors.cardExpiry = 'Please use MM/YY format';
        }
      }
      
      if (!formData.cardCvc) {
        newErrors.cardCvc = 'CVC is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = 'Please enter a valid CVC';
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }
    
    return newErrors;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const step2Errors = validateStep2();
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardExpiry: formatted
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Support Our Mission</h2>
          <p className="text-gray-600 mt-1">
            Your donation helps us save lives and maintain our services
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Amount</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          // Step 1: Donation Amount
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Donation Amount (৳)
              </label>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetAmount(amount)}
                    className={`px-4 py-3 border rounded-lg text-center transition-colors ${
                      formData.amount === amount.toString()
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <span className="font-bold">৳{amount.toLocaleString()}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="amount"
                    name="amount"
                    type="text"
                    value={formData.amount}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.amount ? 'border-red-300' : 'border-gray-300'
                    } ${isLoading ? 'bg-gray-50' : ''}`}
                    placeholder="Enter amount in BDT"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">৳</span>
                  </div>
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>
            </div>

            {/* Donation Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Optional Message (Will be displayed publicly)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                placeholder="Add an encouraging message with your donation..."
              />
            </div>

            {/* Anonymous Donation */}
            <div className="flex items-center">
              <input
                id="isAnonymous"
                name="isAnonymous"
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
                Donate anonymously (Your name won't be shown publicly)
              </label>
            </div>

            {/* Impact Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FiInfo className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Your Impact:</p>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ৳100 can provide blood screening for 1 donor</li>
                <li>• ৳500 can support emergency transportation</li>
                <li>• ৳1000 can maintain our platform for 1 week</li>
                <li>• ৳5000 can help 5 patients get urgent blood</li>
              </ul>
            </div>
          </div>
        ) : (
          // Step 2: Payment Details
          <div className="space-y-6">
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`cursor-pointer border rounded-lg p-4 text-center ${
                  formData.paymentMethod === 'card'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <FiCreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm font-medium">Credit/Debit Card</span>
                </label>
                
                <div className="border border-gray-300 rounded-lg p-4 text-center opacity-50 cursor-not-allowed">
                  <div className="w-6 h-6 mx-auto mb-2 bg-gray-200 rounded"></div>
                  <span className="text-sm font-medium text-gray-500">Bank Transfer</span>
                  <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
                </div>
              </div>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    disabled={isLoading}
                    maxLength={19}
                    className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                    } ${isLoading ? 'bg-gray-50' : ''}`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      type="text"
                      value={formData.cardExpiry}
                      onChange={handleExpiryChange}
                      disabled={isLoading}
                      maxLength={5}
                      className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cardExpiry ? 'border-red-300' : 'border-gray-300'
                      } ${isLoading ? 'bg-gray-50' : ''}`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                    )}
                  </div>

                  {/* CVC */}
                  <div>
                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      id="cardCvc"
                      name="cardCvc"
                      type="text"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={4}
                      className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cardCvc ? 'border-red-300' : 'border-gray-300'
                      } ${isLoading ? 'bg-gray-50' : ''}`}
                      placeholder="123"
                    />
                    {errors.cardCvc && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div className="md:col-span-1">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      value={formData.cardName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.cardName ? 'border-red-300' : 'border-gray-300'
                      } ${isLoading ? 'bg-gray-50' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <FiCheck className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">Secure Payment</p>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your payment is processed securely. We do not store your card details.
              </p>
            </div>

            {/* Donation Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Donation Summary:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">৳{parseFloat(formData.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">
                    {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : formData.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility:</span>
                  <span className="font-medium">
                    {formData.isAnonymous ? 'Anonymous' : 'Public'}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-300">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>৳{parseFloat(formData.amount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
          )}
          
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isLoading}
            className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              step === 1 ? 'ml-auto bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : step === 1 ? (
              'Continue to Payment'
            ) : (
              <>
                <FiCheck className="w-5 h-5 mr-2" />
                Complete Donation
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundingForm;