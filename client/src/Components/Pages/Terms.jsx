import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-6 lg:p-10 my-8 lg:my-12 rounded-xl shadow-md border border-gray-200">
          <h1 className="text-center text-2xl lg:text-3xl font-bold text-blue-900 mb-6">
            Terms and Conditions
          </h1>

          <p className="text-base text-gray-700 mb-6">
            Welcome to the official website of the Leo Club of Uva Wellassa University. These Terms and Conditions govern your use of our website and associated services. By accessing our site, you agree to these terms in full.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">1. Website Access and Use</h2>
          <p className="text-base text-gray-700 mb-6">
            You may use this website only for lawful and non-commercial purposes related to Leo Club activities. Any unauthorized use, including hacking or content duplication, is prohibited.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">2. Intellectual Property</h2>
          <p className="text-base text-gray-700 mb-6">
            All content, including text, logos, graphics, and images, is the intellectual property of the Leo Club of UWU or its licensors. Content may not be copied, redistributed, or reused without prior written permission.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">3. Member Conduct</h2>
          <ul className="list-disc ml-6 text-base text-gray-700 mb-6 space-y-2">
            <li>You must not use this website in any way that causes harm to others.</li>
            <li>You must not submit false or misleading information.</li>
            <li>Any abusive, discriminatory, or harmful behavior will result in access termination.</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">4. Event Registration</h2>
          <p className="text-base text-gray-700 mb-6">
            Users registering for events through our website agree to provide accurate personal information. We reserve the right to reject or cancel any registrations that violate our policies.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">5. External Links</h2>
          <p className="text-base text-gray-700 mb-6">
            Our website may contain links to external sites not managed by us. We are not responsible for their content or data practices.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">6. Disclaimers</h2>
          <p className="text-base text-gray-700 mb-6">
            We strive to ensure accuracy, but do not guarantee completeness of information. We are not liable for any losses arising from use of the site.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">7. Changes to Terms</h2>
          <p className="text-base text-gray-700 mb-6">
            We reserve the right to update these Terms at any time. Continued use of the site after changes indicates acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">8. Governing Law</h2>
          <p className="text-base text-gray-700 mb-6">
            These Terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes shall be subject to local jurisdiction.
          </p>

          <h2 className="text-xl font-semibold text-blue-800 mt-8 mb-4">9. Contact</h2>
          <p className="text-base text-gray-700 mb-6">
            For questions about these Terms, email us at:{' '}
            <a href="mailto:leoclub@uwu.ac.lk" className="text-blue-600 hover:underline">
              leoclub@uwu.ac.lk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
