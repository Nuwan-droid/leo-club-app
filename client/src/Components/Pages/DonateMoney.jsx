import React, { useState } from 'react';

const DonateMoney = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    amount: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const proceedToPayment = () => {
    alert('Proceeding to payment...');
    // Add payment processing logic here
  };

  const submitForm = () => {
    alert('Form submitted successfully!');
    // Add form submission logic here
  };

  const showSecondForm = () => {
    setActiveStep(2);
  };

  const showFirstForm = () => {
    setActiveStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-24 lg:pt-10">
        <div className="page-container">
          {/* Header Section */}
          <div className="header-section bg-white p-10 lg:p-14 mb-0">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
              Make a Donation
            </h1>
            <p className="text-sm lg:text-base text-gray-600 text-justify">
The Leo Club of Uva Wellassa University is committed to creating
            lasting, positive change in our communities. From empowering youth
            and supporting education to helping families in need, protecting the
            environment, and bringing smiles to those who are often forgotten,
            our journey of service continues with passion and purpose. Your kind
            donation helps us extend our reach and deepen our impact. Whether
            it's providing school supplies to underprivileged children,
            organizing blood donation campaigns, or responding to urgent
            community needs, your support plays a vital role in making these
            initiatives a reality.            </p>
          </div>

          {/* Main Form Container */}
          <div className="form-main-container bg-white p-0 lg:px-10 pb-10 lg:pb-14 flex justify-center items-start">
            <div className="form-wrapper w-full max-w-3xl bg-[#E6F0FA] p-10 lg:p-14 rounded-xl shadow-md">
              {/* First Form */}
              <div
                id="form-step-1"
                className={`form-step ${activeStep === 1 ? 'block' : 'hidden'}`}
              >
                <form id="donation-form-1">
                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="firstName"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John (e.g., John, Jane)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Perera (e.g., Perera, Smith)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="phone"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Phone no
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07X XXXXXXX (e.g., 071 1234567)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="email"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com (e.g., jane.doe@example.com)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="city"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="your city (e.g., Colombo, Kandy)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="address"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St (e.g., 456 Oak Ave)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row mb-6">
                    <div className="form-group full-width">
                      <label
                        htmlFor="amount"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount (e.g., 50, 100)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="button-group flex gap-4 mb-6">
                    <button
                      type="button"
                      className="btn btn-primary p-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                      onClick={proceedToPayment}
                    >
                      Proceed to Payment
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary p-3 rounded bg-gray-600 text-white hover:bg-gray-700"
                      onClick={() =>
                        setFormData({
                          firstName: '',
                          lastName: '',
                          phone: '',
                          email: '',
                          city: '',
                          address: '',
                          amount: '',
                          file: null,
                        })
                      }
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="footer-text text-sm lg:text-base text-gray-600 text-center">
                    If you paid through a bank or another app{' '}
                    <a
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={showSecondForm}
                    >
                      Click here...
                    </a>
                  </div>
                </form>
              </div>

              {/* Second Form */}
              <div
                id="form-step-2"
                className={`form-step ${activeStep === 2 ? 'block' : 'hidden'}`}
              >
                <form id="donation-form-2">
                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="firstName2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName2"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John (e.g., John, Jane)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="lastName2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName2"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Perera (e.g., Perera, Smith)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="phone2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Phone no
                      </label>
                      <input
                        type="tel"
                        id="phone2"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07X XXXXXXX (e.g., 071 1234567)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="email2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email2"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com (e.g., jane.doe@example.com)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row flex flex-col lg:flex-row gap-6 mb-6">
                    <div className="form-group flex-1">
                      <label
                        htmlFor="city2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city2"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="your city (e.g., Colombo, Kandy)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label
                        htmlFor="address2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address2"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St (e.g., 456 Oak Ave)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="form-row mb-6">
                    <div className="form-group full-width">
                      <label
                        htmlFor="amount2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount2"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount (e.g., 50, 100)"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }} // Sample examples in black
                      />
                    </div>
                  </div>

                  <div className="upload-section mb-6">
                    <label className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                      Upload Receipt
                    </label>
                    <div
                      className="upload-button inline-flex items-center gap-2 p-2 border border-gray-300 rounded text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      <span>{formData.file ? formData.file.name : 'Add file'}</span>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="button-group flex gap-4">
                    <button
                      type="button"
                      className="btn btn-primary p-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                      onClick={submitForm}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary p-3 rounded bg-gray-600 text-white hover:bg-gray-700"
                      onClick={showFirstForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;