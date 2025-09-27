import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DonateItems = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: ''
  });

  const [donatedItems, setDonatedItems] = useState({
    books: 0,
    pens: 0,
    clothes: 0
  });

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
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
        setError(err.message);
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // Check if user is logged in and auto-fill form data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check both storage methods to be compatible with different parts of the app
        const memberToken = sessionStorage.getItem("memberToken");
        const fallbackToken = localStorage.getItem('token');
        const token = memberToken || fallbackToken;
        
        console.log('🔍 Checking tokens:', { memberToken: !!memberToken, fallbackToken: !!fallbackToken });
        
        if (token) {
          // Fetch user profile from API (same as member portal and DonateMoney)
          const response = await fetch("http://localhost:5001/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('👤 User profile fetched from API:', userData);
            
            setUser(userData);
            setFormData(prev => ({
              ...prev,
              firstName: userData.firstName || userData.first_name || userData.name?.split(' ')[0] || '',
              lastName: userData.lastName || userData.last_name || userData.name?.split(' ')[1] || '',
              email: userData.email || '',
              phone: userData.mobile || userData.phone || userData.phoneNumber || '',
              address: userData.address || '',
              city: userData.city || ''
            }));
            console.log('✅ Form auto-filled with API data');
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
                firstName: userData.firstName || userData.first_name || userData.name?.split(' ')[0] || '',
                lastName: userData.lastName || userData.last_name || userData.name?.split(' ')[1] || '',
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (itemType, value) => {
    const numValue = parseInt(value) || 0;
    const maxAllowed = project?.donation_items?.[itemType]?.required - project?.donation_items?.[itemType]?.received || 0;
    
    // Ensure we don't exceed the required amount
    const finalValue = Math.min(Math.max(0, numValue), maxAllowed);
    
    setDonatedItems(prev => ({
      ...prev,
      [itemType]: finalValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.warning('⚠️ Please fill in all required fields (First Name, Last Name, Email, Phone)', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      // Check if at least one item is donated
      const totalItems = donatedItems.books + donatedItems.pens + donatedItems.clothes;
      if (totalItems === 0) {
        toast.warning('📦 Please select at least one item to donate', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      // Prepare donation data
      const donationData = {
        project_id: projectId,
        donor_info: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address
        },
        donated_items: donatedItems,
        notes: formData.notes,
        // Add user_id if logged in
        user_id: localStorage.getItem('userId') || null
      };

      // Submit donation
      const response = await fetch('http://localhost:5001/api/donation-projects/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('token') && {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        },
        body: JSON.stringify(donationData)
      });

      const result = await response.json();

      if (result.success) {
        // Show success toast with donation details
              toast.success(
        `🎉 Thank you for your donation!  
Donation ID: ${result.data.donation.donation_id}  
We’ll contact you within 24 hours for collection.`,
        {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: '#3063efff',
            color: 'white',
            fontSize: '14px',
            borderRadius: '8px'
          }
        }
      );
        
        // Navigate after a short delay to allow user to see the message
        setTimeout(() => {
          navigate('/donation');
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to submit donation');
      }

    } catch (err) {
      toast.error(`❌ ${err.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: '#EF4444',
          color: 'white',
          fontSize: '14px',
          borderRadius: '8px'
        }
      });
      console.error('Error submitting donation:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    navigate('/donation');
  };

  const cancelCancel = () => {
    setShowCancelDialog(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center">
        <div className="text-gray-600">Project not found</div>
      </div>
    );
  }

  const getAvailableItems = () => {
    const items = [];
    if (project.donation_items?.books && project.donation_items.books.required > project.donation_items.books.received) {
      items.push({
        name: 'books',
        label: 'Books',
        required: project.donation_items.books.required,
        received: project.donation_items.books.received,
        available: project.donation_items.books.required - project.donation_items.books.received
      });
    }
    if (project.donation_items?.pens && project.donation_items.pens.required > project.donation_items.pens.received) {
      items.push({
        name: 'pens',
        label: 'Pens',
        required: project.donation_items.pens.required,
        received: project.donation_items.pens.received,
        available: project.donation_items.pens.required - project.donation_items.pens.received
      });
    }
    if (project.donation_items?.clothes && project.donation_items.clothes.required > project.donation_items.clothes.received) {
      items.push({
        name: 'clothes',
        label: 'Clothes',
        required: project.donation_items.clothes.required,
        received: project.donation_items.clothes.received,
        available: project.donation_items.clothes.required - project.donation_items.clothes.received
      });
    }
    return items;
  };

  const availableItems = getAvailableItems();

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto p-6 lg:p-10">
        {/* Header */}
        <header className="header mb-5 lg:mb-8">
          <h1 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
            Donate Items - {project.title}
          </h1>
          <p className="description text-sm lg:text-base text-gray-600 text-justify mb-5">
            {project.description}
          </p>
        </header>

        {/* Form Container */}
        <div className="form-container bg-[#E6F0FA] rounded-xl w-full max-w-4xl p-6 lg:p-10 shadow-md mx-auto">
          {/* Login Status Banner */}
          {user && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Welcome back, {user.firstName || user.first_name || user.name || 'Member'}!
                  </h3>
                  <div className="mt-1 text-sm text-green-700">
                    Your details have been automatically filled in the form below (highlighted in green).
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Donor Information Section */}
            <div className="section mb-8">
              <h2 className="text-md lg:text-lg font-semibold text-gray-800 mb-4">Donor Information</h2>
              <div className="form-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    placeholder="John"
                    required
                    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500 ${
                      user && formData.firstName ? 'bg-green-50 border-green-300' : ''
                    }`}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    placeholder="Perera"
                    required
                    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500 ${
                      user && formData.lastName ? 'bg-green-50 border-green-300' : ''
                    }`}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    Phone no *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="07X XXXXXXX"
                    required
                    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500 ${
                      user && formData.phone ? 'bg-green-50 border-green-300' : ''
                    }`}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="john.doe@example.com"
                    required
                    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500 ${
                      user && formData.email ? 'bg-green-50 border-green-300' : ''
                    }`}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="your city"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="block text-sm lg:text-base text-gray-800 mb-2 font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="123 Main St"
                    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500 ${
                      user && formData.address ? 'bg-green-50 border-green-300' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Items to Donate Section */}
            <div className="section mb-8">
              <h2 className="text-md lg:text-lg font-semibold text-gray-800 mb-4">Items to Donate</h2>
              {availableItems.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  All items for this project have been collected. Thank you for your interest!
                </div>
              ) : (
                <div className="items-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                  {availableItems.map(item => (
                    <div key={item.name} className="item-card bg-white p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold text-gray-800 mb-2">{item.label}</h3>
                      <div className="text-sm text-gray-600 mb-3">
                        <div>Required: {item.required}</div>
                        <div>Received: {item.received}</div>
                        <div className="font-medium text-orange-600">Still needed: {item.available}</div>
                      </div>
                      <div className="quantity-input">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          How many will you donate?
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={item.available}
                          value={donatedItems[item.name]}
                          onChange={(e) => handleItemChange(item.name, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                          placeholder="0"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Max: {item.available}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Notes */}
            <div className="section mb-8">
              <h2 className="text-md lg:text-lg font-semibold text-gray-800 mb-4">Additional Notes (Optional)</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                placeholder="Any special instructions or notes about your donation..."
              />
            </div>

            {/* Buttons */}
            <div className="button-group flex gap-4 mb-6">
              <button
                type="submit"
                disabled={submitting || availableItems.length === 0}
                className="btn btn-donate px-6 py-3 rounded bg-yellow-400 text-gray-800 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Donate Items'}
              </button>
              <button
                type="button"
                className="btn btn-cancel px-6 py-3 rounded bg-gray-600 text-white hover:bg-gray-700"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

            {/* Location Section */}
            <div className="location-section">
              <div className="location-title text-sm lg:text-base text-gray-800 mb-2">
                <strong>Collection Details</strong>
              </div>
              <div className="location-details text-sm lg:text-base text-gray-600">
                <div>Project Duration: {new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}</div>
                <div>Location: {project.location}, {project.city}</div>
                <div>We will contact you within 24 hours to arrange collection.</div>
              </div>
            </div>
          </form>
        </div>

        {/* Cancel Confirmation Dialog */}
        {showCancelDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Cancel Donation</h3>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Are you sure you want to cancel? All the information you've entered will be lost and cannot be recovered.
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Continue Donating
                </button>
                <button
                  onClick={confirmCancel}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateItems;
