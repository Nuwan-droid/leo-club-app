import React, { useState } from 'react';

const DonateBooks = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    qty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your book donation!');
    // Add form submission logic here if needed
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel?')) {
      document.getElementById('donation-form').reset();
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        qty: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto p-6 lg:p-10">
        {/* Header */}
        <header className="header mb-5 lg:mb-8">
          <h1 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
            Make a Donation
          </h1>
          <p className="description text-sm lg:text-base text-gray-600 text-justify mb-5">
            The Leo Club of Uva Wellassa University is committed to creating
            lasting, positive change in our communities. From empowering youth
            and supporting education to helping families in need, protecting the
            environment, and bringing smiles to those who are often forgotten,
            our journey of service continues with passion and purpose. Your kind
            donation helps us extend our reach and deepen our impact. Whether
            it's providing school supplies to underprivileged children,
            organizing blood donation campaigns, or responding to urgent
            community needs, your support plays a vital role in making these
            initiatives a reality.
          </p>
        </header>

        {/* Form Container */}
        <div className="form-container bg-[#E6F0FA] rounded-xl w-full max-w-3xl p-6 lg:p-10 shadow-md mx-auto">
          <form id="donation-form" onSubmit={handleSubmit}>
            <div className="form-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="form-group">
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
                  placeholder="John"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group">
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
                  placeholder="Perera"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group">
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
                  placeholder="07X XXXXXXX"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group">
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
                  placeholder="john.doe@example.com"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group">
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
                  placeholder="your city"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group">
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
                  placeholder="123 Main St"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>

              <div className="form-group full-width col-span-full">
                <label
                  htmlFor="qty"
                  className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                >
                  Qty
                </label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  style={{ width: '200px' }}
                  placeholder="Enter amount"
                  className="w-[200px] p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="button-group flex gap-4 mb-6">
              <button
                type="submit"
                className="btn btn-donate p-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                onClick={handleSubmit}
              >
                Donate items
              </button>
              <button
                type="button"
                className="btn btn-cancel p-3 rounded bg-gray-600 text-white hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

            {/* Location Section */}
            <div className="location-section">
              <div className="location-title text-sm lg:text-base text-gray-800 mb-2">
                <strong>Location Details</strong>
              </div>
              <div className="location-details text-sm lg:text-base text-gray-600">
                <div>20-25 June</div>
                <div>Main Canteen</div>
                <div>10:00 a.m. - 2:00 p.m.</div>
                <div>At Uva Wellassa University</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateBooks;