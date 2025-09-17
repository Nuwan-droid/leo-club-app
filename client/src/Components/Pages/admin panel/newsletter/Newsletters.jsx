import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriberTable from './child_components/SubscriberTable';
import AddSubscriberModal from './child_components/AddSubscriberModal';
import EditSubscriberModal from './child_components/EditSubscriberModal';
import AddScoreModal from './child_components/AddScoreModal';
import AddSubmissionModal from './child_components/AddSubmissionModal';
import NewsletterStats from './child_components/NewsletterStats';
import AddNewsletterModal from './child_components/AddNewsletterModal';
import EditNewsletterModal from './child_components/EditNewsletterModal';
import NewsletterList from './child_components/NewsletterList';

const Newsletters = () => {
  // Newsletter states
  const [newsletters, setNewsletters] = useState([]);
  const [newslettersLoading, setNewslettersLoading] = useState(false);
  const [isEditNewsletterModalOpen, setIsEditNewsletterModalOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);

  // Existing subscriber states
  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      username: 'jonny77',
      status: 'Active',
      role: 'Admin',
      score: 85,
      subscribeDate: '2024-01-15',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      username: 'olly659',
      status: 'Inactive',
      role: 'Member',
      score: 72,
      subscribeDate: '2024-01-14',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      username: 'dwarren3',
      status: 'Active',
      role: 'Member',
      score: 68,
      subscribeDate: '2024-01-13',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Chloe Hayes',
      email: 'chloelhye@gmail.com',
      username: 'chloehh',
      status: 'Active',
      role: 'Member',
      score: 91,
      subscribeDate: '2024-01-12',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      username: 'reeds7',
      status: 'Active',
      role: 'Member',
      score: 77,
      subscribeDate: '2024-01-11',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Isabelle Clark',
      email: 'belleclark@gmail.com',
      username: 'bellecl',
      status: 'Active',
      role: 'Member',
      score: 83,
      subscribeDate: '2024-01-10',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Lucas Mitchell',
      email: 'lucamich@gmail.com',
      username: 'lucamich',
      status: 'Active',
      role: 'Member',
      score: 65,
      subscribeDate: '2024-01-09',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Mark Wilburg',
      email: 'markwill32@gmail.com',
      username: 'markwill32',
      status: 'Active',
      role: 'Member',
      score: 79,
      subscribeDate: '2024-01-08',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
      id: 9,
      name: 'Nicholas Agenn',
      email: 'nicolass009@gmail.com',
      username: 'nicolass009',
      status: 'Active',
      role: 'Member',
      score: 88,
      subscribeDate: '2024-01-07',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
      id: 10,
      name: 'Mia Nadinn',
      email: 'mianadinn@gmail.com',
      username: 'mianadinn',
      status: 'Active',
      role: 'Member',
      score: 74,
      subscribeDate: '2024-01-06',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 11,
      name: 'Noemi Villan',
      email: 'noemivill99@gmail.com',
      username: 'noemi',
      status: 'Active',
      role: 'Admin',
      score: 92,
      subscribeDate: '2024-01-05',
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const [isAddSubmissionModalOpen, setIsAddSubmissionModalOpen] = useState(false);
  const [isAddNewsletterModalOpen, setIsAddNewsletterModalOpen] = useState(false);

  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [selectedMemberForScore, setSelectedMemberForScore] = useState(null);
  const [selectedMemberForSubmission, setSelectedMemberForSubmission] = useState(null);

  // Fetch newsletters on component mount
  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setNewslettersLoading(true);
      const response = await axios.get('http://localhost:5001/api/newsletters');
      setNewsletters(response.data.newsletters || []);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      setNewsletters([]);
    } finally {
      setNewslettersLoading(false);
    }
  };

  const totalRows = subscribers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSubscribers(subscribers.map(sub => sub.id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (subscriberId, checked) => {
    if (checked) {
      setSelectedSubscribers([...selectedSubscribers, subscriberId]);
    } else {
      setSelectedSubscribers(selectedSubscribers.filter(id => id !== subscriberId));
    }
  };

  const handleAddSubscriber = () => {
    setIsAddModalOpen(true);
  };

  const handleEditSubscriber = (subscriberId) => {
    const subscriber = subscribers.find(s => s.id === subscriberId);
    setEditingSubscriber(subscriber);
    setIsEditModalOpen(true);
  };

  const handleDeleteSubscriber = (subscriberId) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      setSubscribers(subscribers.filter(s => s.id !== subscriberId));
    }
  };

  const handleAddScore = (member) => {
    setSelectedMemberForScore(member);
    setIsAddScoreModalOpen(true);
  };

  const handleAddSubmission = (member) => {
    setSelectedMemberForSubmission(member);
    setIsAddSubmissionModalOpen(true);
  };

  const handleSaveNewSubscriber = (subscriberData) => {
    const newSubscriber = {
      id: subscribers.length + 1,
      ...subscriberData,
      score: 0,
      subscribeDate: new Date().toISOString().split('T')[0],
      submissions: [],
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    setSubscribers([...subscribers, newSubscriber]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedSubscriber = (subscriberData) => {
    setSubscribers(subscribers.map(s => 
      s.id === editingSubscriber.id ? { ...s, ...subscriberData } : s
    ));
    setIsEditModalOpen(false);
    setEditingSubscriber(null);
  };

  const handleSaveScore = (scoreData) => {
    setSubscribers(subscribers.map(s => 
      s.id === selectedMemberForScore.id 
        ? { ...s, score: (s.score || 0) + scoreData.score }
        : s
    ));
    setIsAddScoreModalOpen(false);
    setSelectedMemberForScore(null);
  };

  const handleSaveSubmission = (submissionData) => {
    const newSubmission = {
      id: Date.now(),
      ...submissionData,
      date: new Date().toISOString().split('T')[0],
      addedBy: 'Admin'
    };

    setSubscribers(subscribers.map(s => 
      s.id === selectedMemberForSubmission.id 
        ? { 
            ...s, 
            submissions: [...(s.submissions || []), newSubmission],
            score: (s.score || 0) + 10
          }
        : s
    ));
    setIsAddSubmissionModalOpen(false);
    setSelectedMemberForSubmission(null);
  };

  // Newsletter handlers
  const handleSaveNewsletter = (newsletterData) => {
    console.log("New Newsletter Added:", newsletterData);
    // Refresh the newsletters list
    fetchNewsletters();
    setIsAddNewsletterModalOpen(false);
  };

  const handleEditNewsletter = (newsletter) => {
    setEditingNewsletter(newsletter);
    setIsEditNewsletterModalOpen(true);
  };

  const handleSaveEditedNewsletter = (updatedNewsletter) => {
    // Update the newsletter in the list
    setNewsletters(newsletters.map(n => 
      n._id === updatedNewsletter._id ? updatedNewsletter : n
    ));
    setIsEditNewsletterModalOpen(false);
    setEditingNewsletter(null);
  };

  const handleDeleteNewsletter = async (newsletterId) => {
    if (!window.confirm('Are you sure you want to delete this newsletter?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/newsletters/${newsletterId}`);
      // Remove from local state
      setNewsletters(newsletters.filter(n => n._id !== newsletterId));
      console.log('Newsletter deleted successfully');
    } catch (error) {
      console.error('Error deleting newsletter:', error);
      alert('Failed to delete newsletter. Please try again.');
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingSubscriber(null);
  };

  const handleCancelScore = () => {
    setIsAddScoreModalOpen(false);
    setSelectedMemberForScore(null);
  };

  const handleCancelSubmission = () => {
    setIsAddSubmissionModalOpen(false);
    setSelectedMemberForSubmission(null);
  };

  const currentSubscribers = subscribers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'Active').length,
    inactiveSubscribers: subscribers.filter(s => s.status === 'Inactive').length,
    adminSubscribers: subscribers.filter(s => s.role === 'Admin').length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleAddSubscriber}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Subscriber</span>
            </button>
            <button
              onClick={() => setIsAddNewsletterModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Newsletter</span>
            </button>
          </div>
        </div>

        {/* Newsletter List Component */}
        <NewsletterList
          newsletters={newsletters}
          onEdit={handleEditNewsletter}
          onDelete={handleDeleteNewsletter}
          loading={newslettersLoading}
        />

        <NewsletterStats stats={stats} />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <SubscriberTable
            subscribers={currentSubscribers}
            selectedSubscribers={selectedSubscribers}
            onSelectAll={handleSelectAll}
            onSelectSubscriber={handleSelectSubscriber}
            onEdit={handleEditSubscriber}
            onDelete={handleDeleteSubscriber}
            onAddScore={handleAddScore}
            onAddSubmission={handleAddSubmission}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <AddSubscriberModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewSubscriber}
        onCancel={handleCancelAdd}
      />

      <EditSubscriberModal
        isOpen={isEditModalOpen}
        subscriber={editingSubscriber}
        onSave={handleSaveEditedSubscriber}
        onCancel={handleCancelEdit}
      />

      <AddScoreModal
        isOpen={isAddScoreModalOpen}
        member={selectedMemberForScore}
        onSave={handleSaveScore}
        onCancel={handleCancelScore}
      />

      <AddSubmissionModal
        isOpen={isAddSubmissionModalOpen}
        member={selectedMemberForSubmission}
        onSave={handleSaveSubmission}
        onCancel={handleCancelSubmission}
      />

      <AddNewsletterModal
        isOpen={isAddNewsletterModalOpen}
        onClose={() => setIsAddNewsletterModalOpen(false)}
        onSave={handleSaveNewsletter}
      />

      <EditNewsletterModal
        isOpen={isEditNewsletterModalOpen}
        onClose={() => setIsEditNewsletterModalOpen(false)}
        newsletter={editingNewsletter}
        onSave={handleSaveEditedNewsletter}
      />

    </div>
  );
};

export default Newsletters;