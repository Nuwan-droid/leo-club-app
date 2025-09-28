import React, { useEffect, useState } from 'react';
import { ShoppingCart, Package, CheckCircle, Loader } from 'lucide-react';

const OrderSuccess = () => {
  const [countdown, setCountdown] = useState(10);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completionStatus, setCompletionStatus] = useState('loading'); // loading, success, error

  // Get URL parameters (you'll need to implement this based on your routing)
  const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const orderId = getUrlParam('order_id');
  const name = getUrlParam('name');
  const amount = getUrlParam('amount');

  // Function to mark order as completed
  const completeOrder = async () => {
    if (!orderId) {
      console.error('No order ID found in URL');
      setCompletionStatus('error');
      return;
    }

    try {
      console.log(`Completing order: ${orderId}`);
      
      const response = await fetch('http://localhost:5001/api/orders/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_id: `SUCCESS_${Date.now()}`,
          transaction_id: `TXN_${orderId}_${Date.now()}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Order completed successfully:', data);
        setOrderCompleted(true);
        setCompletionStatus('success');
      } else {
        console.error('Failed to complete order:', data.message);
        setCompletionStatus('error');
      }
    } catch (error) {
      console.error('Error completing order:', error);
      setCompletionStatus('error');
    }
  };

  // Complete order when component mounts
  useEffect(() => {
    if (orderId && !orderCompleted) {
      completeOrder();
    }
  }, [orderId, orderCompleted]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Navigate to shop (implement based on your routing solution)
          window.location.href = '/shop';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goToShop = () => {
    window.location.href = '/shop';
  };

  const goToProfile = () => {
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Status-based Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {completionStatus === 'loading' && (
            <div className="bg-blue-500 w-full h-full rounded-full flex items-center justify-center">
              <Loader className="w-10 h-10 text-white animate-spin" />
            </div>
          )}
          {completionStatus === 'success' && (
            <div className="bg-green-500 w-full h-full rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          )}
          {completionStatus === 'error' && (
            <div className="bg-orange-500 w-full h-full rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-white" />
            </div>
          )}
        </div>
        
        {/* Status-based Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {completionStatus === 'loading' && 'Processing Order...'}
          {completionStatus === 'success' && 'Order Completed Successfully!'}
          {completionStatus === 'error' && 'Payment Received!'}
        </h1>
        
        {/* Status-based Message */}
        <p className="text-gray-600 mb-6">
          {completionStatus === 'loading' && (
            <>
              Please wait while we confirm your order details...
            </>
          )}
          {completionStatus === 'success' && (
            <>
              {name ? `Thank you ${name} for your purchase!` : 'Thank you for your purchase!'} 
              Your order has been confirmed and is being processed. 
              You will receive a confirmation email shortly.
            </>
          )}
          {completionStatus === 'error' && (
            <>
              {name ? `Thank you ${name} for your purchase!` : 'Thank you for your purchase!'} 
              Your payment was successful. We are processing your order and will send 
              you a confirmation email shortly with order details.
            </>
          )}
        </p>
        
        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          {orderId && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Order ID:</span>
              <span className="text-sm text-gray-600">{orderId}</span>
            </div>
          )}
          {amount && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Amount:</span>
              <span className="text-sm text-green-600 font-semibold">Rs {amount}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Status:</span>
            <span className={`text-sm font-semibold ${
              completionStatus === 'success' ? 'text-green-600' : 
              completionStatus === 'loading' ? 'text-blue-600' : 
              'text-orange-600'
            }`}>
              {completionStatus === 'success' && 'Confirmed'}
              {completionStatus === 'loading' && 'Processing...'}
              {completionStatus === 'error' && 'Payment Received'}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={goToShop}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Continue Shopping</span>
          </button>
          
          <button
            onClick={goToProfile}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Package size={18} />
            <span>View My Orders</span>
          </button>
          
          <p className="text-sm text-gray-500">
            Redirecting to shop in {countdown} seconds...
          </p>
        </div>
        
        {/* Footer Message */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Thank you for shopping with the Leo Club of Uva Wellassa University. 
            Your purchase supports our community initiatives.
          </p>
          
          {/* Additional status message */}
          {completionStatus === 'error' && (
            <p className="text-xs text-orange-600 mt-2">
              If you have any concerns about your order, please contact our support team 
              with your Order ID: {orderId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;