import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-6 lg:p-10 my-8 lg:my-12 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-center text-2xl lg:text-3xl font-bold text-blue-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-base text-gray-700 mb-6">
            This Privacy Policy describes how the Leo Club of Uva Wellassa University collects, uses, discloses, and protects your personal information when you interact with our official website and digital services.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-base text-gray-700 mb-4">
            We may collect the following information:
          </p>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-6 space-y-2">
            <li>Full name, email address, phone number, and other contact details</li>
            <li>Device information such as IP address, browser type, and OS</li>
            <li>Interaction data including pages visited and forms submitted</li>
            <li>Cookies and tracking information for usage analysis</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">2. Purpose of Data Collection</h2>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-6 space-y-2">
            <li>To manage event registrations and communications</li>
            <li>To respond to inquiries and provide support</li>
            <li>To improve our website and digital services</li>
            <li>To maintain internal records and member engagement</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">3. Data Protection & Security</h2>
          <p className="text-base text-gray-700 mb-6">
            We use secure protocols, access control, and data encryption methods to protect personal information from unauthorized access or disclosure. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">4. Sharing of Information</h2>
          <p className="text-base text-gray-700 mb-6">
            We do not sell or rent personal data. Data may only be shared with authorized internal members or trusted partners (e.g., university IT team) for operational purposes under strict confidentiality agreements.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">5. Cookies and Analytics</h2>
          <p className="text-base text-gray-700 mb-6">
            We use cookies to enhance your browsing experience and collect usage data for analytical purposes. You may choose to disable cookies through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">6. Your Rights</h2>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-6 space-y-2">
            <li>Right to access and update your data</li>
            <li>Right to request data deletion</li>
            <li>Right to withdraw consent</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">7. Data Retention</h2>
          <p className="text-base text-gray-700 mb-6">
            Personal data is retained only as long as necessary to fulfill its intended purpose or as required by university or national policies.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">8. Changes to this Policy</h2>
          <p className="text-base text-gray-700 mb-6">
            We may update this Privacy Policy periodically. Updates will be posted on this page and are effective immediately upon posting.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">9. Contact Us</h2>
          <p className="text-base text-gray-700 mb-6">
            If you have questions about this policy, please contact us at:{' '}
            <a href="mailto:leoclub@uwu.ac.lk" className="text-blue-600 hover:underline">
              leoclub@uwu.ac.lk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
