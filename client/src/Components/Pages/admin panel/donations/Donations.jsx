import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DonationTable from './child_components/DonationTable';
import DonationStats from './child_components/DonationStats';
import DonationFilters from './child_components/DonationFilters';

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    donationType: 'all',
    status: 'all',
    dateRange: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    verified: 0,
    pending: 0,
    projectDonations: 0,
    clubFundDonations: 0
  });

  // Fetch donations on component mount
  useEffect(() => {
    fetchDonations();
    fetchProjects();
  }, []);

  // Apply filters when donations or filters change
  useEffect(() => {
    console.log('🔧 Applying filters with donations:', donations.length, 'filters:', filters);
    applyFilters();
  }, [donations, filters]);

  // Calculate stats when filtered donations change
  useEffect(() => {
    calculateStats();
  }, [filteredDonations]);

  const fetchDonations = async () => {
    console.log('🔍 Starting fetchDonations...');
    try {
      setLoading(true);
      console.log('📡 Making API call to fetch donations...');
      const response = await axios.get('http://localhost:5001/api/donation-projects/donations');
      console.log('✅ API Response received:', response.data);
      setDonations(response.data || []);
      console.log('📝 Donations state updated with:', response.data?.length || 0, 'items');
    } catch (error) {
      console.error('❌ Error fetching donations:', error);
      console.error('🔍 Error details:', error.response?.data || error.message);
      toast.error(`Failed to fetch donations: ${error.response?.data?.message || error.message}`);
      setDonations([]);
    } finally {
      setLoading(false);
      console.log('✅ Loading set to false');
    }
  };

  const fetchProjects = async () => {
    try {
      console.log('📡 Fetching donation projects...');
      const response = await axios.get('http://localhost:5001/api/donation-projects');
      console.log('✅ Donation projects response:', response.data);
      
      // Handle the response format from donation projects API
      if (response.data.success && response.data.data) {
        setProjects(response.data.data);
      } else if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('❌ Error fetching donation projects:', error);
      // Fallback to regular projects if donation projects fail
      try {
        console.log('📡 Trying regular projects as fallback...');
        const fallbackResponse = await axios.get('http://localhost:5001/api/projects/allprojects');
        console.log('✅ Regular projects fallback response:', fallbackResponse.data);
        setProjects(fallbackResponse.data || []);
      } catch (fallbackError) {
        console.error('❌ Error fetching regular projects too:', fallbackError);
        setProjects([]); // Set empty array on error
      }
    }
  };

  const applyFilters = () => {
    console.log('🎯 Applying filters to', donations.length, 'donations');
    let filtered = [...donations];

    // Filter by donation type
    if (filters.donationType !== 'all') {
      filtered = filtered.filter(donation => donation.donation_type === filters.donationType);
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(donation => donation.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(donation => 
          new Date(donation.createdAt) >= filterDate
        );
      }
    }

    console.log('🎯 Filtered donations:', filtered.length);
    setFilteredDonations(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const calculateStats = () => {
    console.log('📊 Calculating stats for', filteredDonations.length, 'donations');
    const newStats = {
      total: filteredDonations.length,
      totalAmount: filteredDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0),
      verified: filteredDonations.filter(d => d.status === 'verified').length,
      pending: filteredDonations.filter(d => d.status === 'pending').length,
      projectDonations: filteredDonations.filter(d => d.donation_type === 'project').length,
      clubFundDonations: filteredDonations.filter(d => d.donation_type === 'club_fund').length
    };
    console.log('📊 New stats:', newStats);
    setStats(newStats);
  };

  const handleVerifyDonation = async (donationId) => {
    try {
      await axios.patch(`http://localhost:5001/api/donation-projects/donations/${donationId}/verify`);
      
      toast.success('Donation verified successfully');
      fetchDonations(); // Refresh the list
    } catch (error) {
      console.error('Error verifying donation:', error);
      toast.error('Failed to verify donation');
    }
  };

  const handleDeleteDonation = async (donationId) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await axios.delete(`http://localhost:5001/api/donation-projects/donations/${donationId}`);
        
        toast.success('Donation deleted successfully');
        fetchDonations(); // Refresh the list
      } catch (error) {
        console.error('Error deleting donation:', error);
        toast.error('Failed to delete donation');
      }
    }
  };

  const getProjectName = (projectId) => {
    console.log('🔍 Looking for project name for ID:', projectId, 'in projects:', projects.length);
    
    // Try to find in donation projects first (more relevant)
    const donationProject = projects.find(p => 
      p.donation_project_id == projectId || 
      p._id === projectId || 
      p.id == projectId
    );
    if (donationProject) {
      console.log('✅ Found donation project:', donationProject.title);
      return donationProject.title;
    }
    
    console.log('❌ Project not found for ID:', projectId);
    console.log('📋 Available projects:', projects.map(p => ({ id: p.donation_project_id || p._id || p.id, title: p.title })));
    return `Project ${projectId}`;
  };

  // Pagination
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  console.log('📊 Render state:', {
    loading,
    donations: donations.length,
    filteredDonations: filteredDonations.length,
    currentDonations: currentDonations.length,
    totalPages,
    currentPage
  });

  if (loading) {
    console.log('⏳ Showing loading spinner');
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation Management</h1>
        <p className="text-gray-600">Manage and track all donations to projects and club funds</p>
      </div>

      {/* Stats Cards */}
      <DonationStats stats={stats} />

      {/* Filters */}
      <DonationFilters 
        filters={filters} 
        setFilters={setFilters} 
        onRefresh={fetchDonations}
      />

      {/* Donations Table */}
      <DonationTable
        donations={currentDonations}
        projects={projects}
        getProjectName={getProjectName}
        onVerify={handleVerifyDonation}
        onDelete={handleDeleteDonation}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Donations;