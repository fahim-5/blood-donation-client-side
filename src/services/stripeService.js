import { loadStripe } from '@stripe/stripe-js';
import { apiMethods } from './api';

// Load Stripe
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const stripeService = {
  // Initialize Stripe
  initialize: async () => {
    try {
      const stripe = await getStripe();
      return stripe;
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      throw error;
    }
  },

  // Create payment intent
  createPaymentIntent: async (amount, currency = 'bdt', metadata = {}) => {
    try {
      const response = await apiMethods.post('/stripe/create-payment-intent', {
        amount,
        currency,
        metadata,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, returnUrl) => {
    try {
      const stripe = await getStripe();
      
      const { error } = await stripe.confirmCardPayment(paymentIntentId, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Process payment
  processPayment: async (paymentMethodId, amount, currency = 'bdt', metadata = {}) => {
    try {
      const response = await apiMethods.post('/stripe/process-payment', {
        paymentMethodId,
        amount,
        currency,
        metadata,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create customer
  createCustomer: async (customerData) => {
    try {
      const response = await apiMethods.post('/stripe/create-customer', customerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get customer
  getCustomer: async (customerId) => {
    try {
      const response = await apiMethods.get(`/stripe/customer/${customerId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await apiMethods.put(`/stripe/customer/${customerId}`, customerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get payment methods
  getPaymentMethods: async (customerId) => {
    try {
      const response = await apiMethods.get(`/stripe/customer/${customerId}/payment-methods`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Add payment method
  addPaymentMethod: async (customerId, paymentMethodId) => {
    try {
      const response = await apiMethods.post(`/stripe/customer/${customerId}/payment-methods`, {
        paymentMethodId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Remove payment method
  removePaymentMethod: async (customerId, paymentMethodId) => {
    try {
      const response = await apiMethods.delete(
        `/stripe/customer/${customerId}/payment-methods/${paymentMethodId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Set default payment method
  setDefaultPaymentMethod: async (customerId, paymentMethodId) => {
    try {
      const response = await apiMethods.patch(
        `/stripe/customer/${customerId}/default-payment-method`,
        { paymentMethodId }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create subscription
  createSubscription: async (customerId, priceId, metadata = {}) => {
    try {
      const response = await apiMethods.post('/stripe/create-subscription', {
        customerId,
        priceId,
        metadata,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await apiMethods.post('/stripe/cancel-subscription', { subscriptionId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get subscription
  getSubscription: async (subscriptionId) => {
    try {
      const response = await apiMethods.get(`/stripe/subscription/${subscriptionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update subscription
  updateSubscription: async (subscriptionId, updates) => {
    try {
      const response = await apiMethods.put(`/stripe/subscription/${subscriptionId}`, updates);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get invoices
  getInvoices: async (customerId, params = {}) => {
    try {
      const response = await apiMethods.get(`/stripe/customer/${customerId}/invoices`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get invoice by ID
  getInvoiceById: async (invoiceId) => {
    try {
      const response = await apiMethods.get(`/stripe/invoice/${invoiceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Download invoice
  downloadInvoice: async (invoiceId) => {
    try {
      const response = await apiMethods.get(`/stripe/invoice/${invoiceId}/download`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create refund
  createRefund: async (paymentIntentId, amount, reason) => {
    try {
      const response = await apiMethods.post('/stripe/create-refund', {
        paymentIntentId,
        amount,
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get refund
  getRefund: async (refundId) => {
    try {
      const response = await apiMethods.get(`/stripe/refund/${refundId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get payment history
  getPaymentHistory: async (customerId, params = {}) => {
    try {
      const response = await apiMethods.get(`/stripe/customer/${customerId}/payments`, params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get payment by ID
  getPaymentById: async (paymentIntentId) => {
    try {
      const response = await apiMethods.get(`/stripe/payment/${paymentIntentId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify webhook signature
  verifyWebhook: async (payload, signature) => {
    try {
      const response = await apiMethods.post('/stripe/webhook', {
        payload,
        signature,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get Stripe products
  getProducts: async (params = {}) => {
    try {
      const response = await apiMethods.get('/stripe/products', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await apiMethods.get(`/stripe/products/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get prices
  getPrices: async (params = {}) => {
    try {
      const response = await apiMethods.get('/stripe/prices', params);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get price by ID
  getPriceById: async (priceId) => {
    try {
      const response = await apiMethods.get(`/stripe/prices/${priceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create checkout session
  createCheckoutSession: async (priceId, successUrl, cancelUrl, metadata = {}) => {
    try {
      const response = await apiMethods.post('/stripe/create-checkout-session', {
        priceId,
        successUrl,
        cancelUrl,
        metadata,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get checkout session
  getCheckoutSession: async (sessionId) => {
    try {
      const response = await apiMethods.get(`/stripe/checkout-session/${sessionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get Stripe balance
  getBalance: async () => {
    try {
      const response = await apiMethods.get('/stripe/balance');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get Stripe statistics
  getStripeStats: async () => {
    try {
      const response = await apiMethods.get('/stripe/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Test Stripe connection
  testConnection: async () => {
    try {
      const response = await apiMethods.get('/stripe/test');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Format amount for display
  formatAmount: (amount, currency = 'bdt') => {
    const formatter = new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    });
    
    return formatter.format(amount / 100); // Stripe amounts are in cents
  },

  // Validate card details
  validateCard: (cardNumber, expMonth, expYear, cvc) => {
    const errors = {};
    
    // Validate card number
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate expiration month
    if (!expMonth || expMonth < 1 || expMonth > 12) {
      errors.expMonth = 'Please enter a valid month (1-12)';
    }
    
    // Validate expiration year
    const currentYear = new Date().getFullYear();
    if (!expYear || expYear < currentYear) {
      errors.expYear = 'Please enter a valid year';
    }
    
    // Validate CVC
    if (!cvc || cvc.length < 3 || cvc.length > 4) {
      errors.cvc = 'Please enter a valid CVC';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default stripeService;