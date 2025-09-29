import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DonationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/donation');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="h-[100px]"></div>
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Your Donation!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your generous donation has been successfully processed. 
          You will receive a confirmation email shortly.
        </p>
        
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Order ID:</span> {orderId}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/donation')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Donations
          </button>
          
          <p className="text-sm text-gray-500">
            Redirecting automatically in {countdown} seconds...
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Your support helps the Leo Club of Uva Wellassa University 
            continue making a positive impact in our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;