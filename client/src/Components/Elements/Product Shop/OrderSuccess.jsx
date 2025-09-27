import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/shop');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const name = searchParams.get('name');
  const amount = searchParams.get('amount');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          {name ? `Thank you ${name} for your purchase!` : 'Thank you for your purchase!'} Your order has been confirmed and is being processed. 
          You will receive a confirmation email shortly with tracking details.
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
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Continue Shopping</span>
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
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;