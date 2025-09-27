import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DonateMoney = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // Get donation context from navigation state (fallback) or URL params (primary)
  const donationContext = location.state || {};
  const { donationType: stateDonationType, projectTitle: stateProjectTitle } = donationContext;
  
  // Determine donation type and project info
  const donationType = projectId ? 'project' : 'club_fund';
  const projectTitle = project?.title || stateProjectTitle;

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

  // Fetch project details if projectId exists
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/donation-projects/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const result = await response.json();
        if (result.success) {
          setProject(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch project');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Check if user is logged in and pre-fill form
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check both storage methods to be compatible with different parts of the app
        const memberToken = sessionStorage.getItem("memberToken");
        const fallbackToken = localStorage.getItem('token');
        const token = memberToken || fallbackToken;
        
        console.log('🔍 Checking tokens:', { memberToken: !!memberToken, fallbackToken: !!fallbackToken });
        
        if (token) {
          // Fetch user profile from API (same as member portal)
          const response = await fetch("http://localhost:5001/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('👤 User profile fetched from API:', userData);
            
            // Parse name into first and last names
            const fullName = userData.name || '';
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            setUser(userData);
            setFormData(prev => ({
              ...prev,
              firstName: userData.firstName || firstName,
              lastName: userData.lastName || lastName,
              email: userData.email || '',
              phone: userData.mobile || userData.phone || '',
              address: userData.address || '',
              city: userData.city || ''
            }));
            console.log('✅ Form auto-filled with API data - Name parsed:', { firstName, lastName });
            console.log('📋 Available user fields:', Object.keys(userData));
          } else {
            console.log('❌ Failed to fetch user profile from API, trying localStorage...');
            // Fallback to localStorage user data
            const storedUserData = localStorage.getItem('user');
            if (storedUserData) {
              const userData = JSON.parse(storedUserData);
              console.log('👤 User data found in localStorage:', userData);
              setUser(userData);
              setFormData(prev => ({
                ...prev,
                firstName: userData.firstName || userData.first_name || '',
                lastName: userData.lastName || userData.last_name || '',
                email: userData.email || '',
                phone: userData.mobile || userData.phone || userData.phoneNumber || '',
                address: userData.address || '',
                city: userData.city || ''
              }));
              console.log('✅ Form auto-filled with localStorage data');
            }
          }
        } else {
          console.log('🔒 No token found - user not logged in');
        }
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Helper function to get the current auth token
  const getAuthToken = () => {
    return sessionStorage.getItem('memberToken') || localStorage.getItem('token');
  };

  // Helper function to get input class with auto-fill indicator
  const getInputClass = (fieldName) => {
    const baseClass = "w-full p-3 border rounded focus:outline-none focus:border-blue-500";
    const isPreFilled = user && formData[fieldName] && formData[fieldName].trim() !== '';
    
    if (isPreFilled) {
      return `${baseClass} border-green-300 bg-green-50`;
    }
    return `${baseClass} border-gray-300`;
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('City is required');
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return false;
    }
    return true;
  };

  // Handle online payment
  const proceedToPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Create donation record
      const donationResponse = await fetch('http://localhost:5001/api/donation-projects/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${getAuthToken()}` })
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          donation_type: donationType || 'club_fund',
          donation_project_id: projectId || null,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          payment_method: 'online'
        })
      });

      const donationData = await donationResponse.json();
      
      if (!donationData.success) {
        throw new Error(donationData.message || 'Failed to create donation record');
      }

      // Initiate payment
      const paymentResponse = await fetch('http://localhost:5001/api/donation-projects/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donation_id: donationData.data.donation_id
        })
      });

      const paymentData = await paymentResponse.json();
      
      if (!paymentData.success) {
        throw new Error(paymentData.message || 'Failed to initiate payment');
      }

      // Redirect to PayHere
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payhere.lk/pay/checkout';

      Object.keys(paymentData.payhere_payload).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData.payhere_payload[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  // Handle receipt upload for bank transfers
  const submitForm = async () => {
    if (!validateForm()) return;

    if (!formData.file) {
      toast.error('Please upload a receipt file');
      return;
    }

    // Check file size (5MB limit)
    if (formData.file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(formData.file.type)) {
      toast.error('Only JPG, PNG, and PDF files are allowed');
      return;
    }

    setLoading(true);
    try {
      // Create donation record
      const donationResponse = await fetch('http://localhost:5001/api/donation-projects/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${getAuthToken()}` })
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          donation_type: donationType || 'club_fund',
          donation_project_id: projectId || null,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          payment_method: 'bank_transfer'
        })
      });

      const donationData = await donationResponse.json();
      
      if (!donationData.success) {
        throw new Error(donationData.message || 'Failed to create donation record');
      }

      console.log('Donation created successfully:', donationData.data);

      // Upload receipt
      const formDataToSend = new FormData();
      formDataToSend.append('donation_id', donationData.data.donation_id);
      formDataToSend.append('files', formData.file);

      console.log('Uploading receipt for donation:', donationData.data.donation_id);
      console.log('File details:', {
        name: formData.file.name,
        size: formData.file.size,
        type: formData.file.type
      });

      const receiptResponse = await fetch('http://localhost:5001/api/donation-projects/receipt/upload', {
        method: 'POST',
        body: formDataToSend
      });

      const receiptData = await receiptResponse.json();
      
      if (!receiptData.success) {
        throw new Error(receiptData.message || 'Failed to upload receipt');
      }

      console.log('Receipt uploaded successfully:', receiptData);

      toast.success('Donation submitted successfully! Your donation is pending verification.');
      
      // Reset form
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.mobile || '',
        email: user?.email || '',
        city: '',
        address: user?.address || '',
        amount: '',
        file: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
      
      // Navigate back to donation page
      setTimeout(() => {
        navigate('/donation');
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  const showSecondForm = () => {
    setActiveStep(2);
  };

  const showFirstForm = () => {
    setActiveStep(1);
  };

  const handleCancel = () => {
    navigate('/donation');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-24 lg:pt-10">
        <div className="page-container">
          {/* Header Section */}
          <div className="header-section bg-white p-10 lg:p-14 mb-0">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4">
              Make a Donation
              {donationType === 'project' && projectTitle && (
                <span className="text-blue-600"> - {projectTitle}</span>
              )}
              {donationType === 'club_fund' && (
                <span className="text-blue-600"> - Club Fund</span>
              )}
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
              initiatives a reality.
            </p>
          </div>

          {/* Main Form Container */}
          <div className="form-main-container bg-white p-0 lg:px-10 pb-10 lg:pb-14 flex justify-center items-start">
            <div className="form-wrapper w-full max-w-3xl bg-[#E6F0FA] p-10 lg:p-14 rounded-xl shadow-md">
              {/* First Form - Online Payment */}
              <div
                id="form-step-1"
                className={`form-step ${activeStep === 1 ? 'block' : 'hidden'}`}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Online Payment
                </h2>
                
                {/* User Status Indicator */}
                {user ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Logged in as {user.firstName} {user.lastName}</span>
                    </div>
                    <p className="text-sm mt-1">Your details have been automatically filled. You can edit them if needed.</p>
                  </div>
                ) : (
                  <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Not logged in</span>
                    </div>
                    <p className="text-sm mt-1">Please fill in your details manually or <a href="/memberportal" className="underline hover:text-blue-900">login</a> for faster donation.</p>
                  </div>
                )}
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
                        className={getInputClass('firstName')}
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        className={getInputClass('lastName')}
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        className={getInputClass('phone')}
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        className={getInputClass('email')}
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        className={getInputClass('city')}
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        className={getInputClass('address')}
                        style={{ color: 'black' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row mb-6">
                    <div className="form-group full-width">
                      <label
                        htmlFor="amount"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Amount (LKR)
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount (e.g., 50, 100)"
                        min="1"
                        step="0.01"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="button-group flex gap-4 mb-6">
                    <button
                      type="button"
                      className="btn btn-primary p-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={proceedToPayment}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary p-3 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
                      onClick={handleCancel}
                      disabled={loading}
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

              {/* Second Form - Bank Transfer Receipt Upload */}
              <div
                id="form-step-2"
                className={`form-step ${activeStep === 2 ? 'block' : 'hidden'}`}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Bank Transfer Receipt Upload
                </h2>
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
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        style={{ color: 'black' }}
                        disabled={loading}
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
                        style={{ color: 'black' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row mb-6">
                    <div className="form-group full-width">
                      <label
                        htmlFor="amount2"
                        className="block text-sm lg:text-base text-gray-800 mb-2 font-medium"
                      >
                        Amount (LKR)
                      </label>
                      <input
                        type="number"
                        id="amount2"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount (e.g., 50, 100)"
                        min="1"
                        step="0.01"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        style={{ color: 'black' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="upload-section mb-6">
                    <label className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                      Upload Receipt *
                    </label>
                    <div
                      className="upload-button inline-flex items-center gap-2 p-2 border border-gray-300 rounded text-sm text-gray-600 cursor-pointer hover:bg-gray-50"
                      onClick={() => !loading && document.getElementById('fileInput').click()}
                    >
                      <span>{formData.file ? formData.file.name : 'Add file'}</span>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>

                  <div className="button-group flex gap-4">
                    <button
                      type="button"
                      className="btn btn-primary p-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={submitForm}
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary p-3 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
                      onClick={showFirstForm}
                      disabled={loading}
                    >
                      Back to Online Payment
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