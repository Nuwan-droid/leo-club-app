import React, { useEffect } from 'react';

const LogoutPage = ({ onRedirectHome }) => {
  useEffect(() => {
    // Clear any stored authentication data
    localStorage.removeItem('leoToken');
    sessionStorage.clear();
    
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      onRedirectHome();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onRedirectHome]);

  const handleImmediateRedirect = () => {
    onRedirectHome();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Logged Out</h2>
          <p className="text-gray-600">Thank you for using LEO Club Admin Dashboard</p>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-700">
              You will be redirected to the home page in a few seconds...
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleImmediateRedirect}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Go to Home Page Now
          </button>
          
          <p className="text-xs text-gray-500">
            If you're not redirected automatically, click the button above
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Session ended at {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
