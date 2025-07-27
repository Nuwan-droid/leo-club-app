import React, { useState } from 'react';
import EventVolunteerTable from './child-component/EventVolunteerTable';
import AddScoreModal from './child-component/AddScoreModal';
import AddContributionModal from './child-component/AddContributionModal';

const EventVolunteer = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      username: 'jonny77',
      role: 'Admin',
      projectId: 'P001225',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 85,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      email: 'ollyben@gmail.com',
      username: 'olly659',
      role: 'Member',
      projectId: 'P001226',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 72,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      username: 'dwarren3',
      role: 'Member',
      projectId: 'P001227',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 68,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Chloe Hayes',
      email: 'chloelhye@gmail.com',
      username: 'chloehh',
      role: 'Member',
      projectId: 'P001228',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 91,
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      username: 'reeds7',
      role: 'Member',
      projectId: 'P001229',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 77,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Isabelle Clark',
      email: 'belleclark@gmail.com',
      username: 'bellecl',
      role: 'Member',
      projectId: 'P001230',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 83,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 7,
      name: 'Lucas Mitchell',
      email: 'lucamich@gmail.com',
      username: 'lucamich',
      role: 'Member',
      projectId: 'P001231',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 65,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 8,
      name: 'Mark Wilburg',
      email: 'markwill32@gmail.com',
      username: 'markwill32',
      role: 'Member',
      projectId: 'P001232',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 79,
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
      id: 9,
      name: 'Nicholas Agenn',
      email: 'nicolass009@gmail.com',
      username: 'nicolass009',
      role: 'Member',
      projectId: 'P001233',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 88,
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
      id: 10,
      name: 'Mia Nadinn',
      email: 'mianadinn@gmail.com',
      username: 'mianadinn',
      role: 'Member',
      projectId: 'P001234',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 74,
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 11,
      name: 'Noemi Villan',
      email: 'noemivill99@gmail.com',
      username: 'noemi',
      role: 'Admin',
      projectId: 'P001235',
      projectType: 'Organizing committee',
      participation: 'Participating',
      score: 92,
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const [isAddContributionModalOpen, setIsAddContributionModalOpen] = useState(false);
  const [selectedVolunteerForScore, setSelectedVolunteerForScore] = useState(null);
  const [selectedVolunteerForContribution, setSelectedVolunteerForContribution] = useState(null);

  const totalRows = volunteers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedVolunteers(volunteers.map(v => v.id));
    } else {
      setSelectedVolunteers([]);
    }
  };

  const handleSelectVolunteer = (volunteerId, checked) => {
    if (checked) {
      setSelectedVolunteers([...selectedVolunteers, volunteerId]);
    } else {
      setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteerId));
    }
  };

  const handleDeleteVolunteer = (volunteerId) => {
    if (window.confirm('Are you sure you want to remove this volunteer?')) {
      setVolunteers(volunteers.filter(v => v.id !== volunteerId));
    }
  };

  const handleAddScore = (volunteer) => {
    setSelectedVolunteerForScore(volunteer);
    setIsAddScoreModalOpen(true);
  };

  const handleAddContribution = (volunteer) => {
    setSelectedVolunteerForContribution(volunteer);
    setIsAddContributionModalOpen(true);
  };

  const handleSaveScore = (scoreData) => {
    setVolunteers(volunteers.map(v => 
      v.id === selectedVolunteerForScore.id 
        ? { ...v, score: (v.score || 0) + scoreData.score }
        : v
    ));
    setIsAddScoreModalOpen(false);
    setSelectedVolunteerForScore(null);
  };

  const handleSaveContribution = (contributionData) => {
    setVolunteers(volunteers.map(v => 
      v.id === selectedVolunteerForContribution.id 
        ? { 
            ...v, 
            projectId: contributionData.projectId,
            projectType: contributionData.projectType,
            participation: contributionData.participation
          }
        : v
    ));
    setIsAddContributionModalOpen(false);
    setSelectedVolunteerForContribution(null);
  };

  const handleCancelScore = () => {
    setIsAddScoreModalOpen(false);
    setSelectedVolunteerForScore(null);
  };

  const handleCancelContribution = () => {
    setIsAddContributionModalOpen(false);
    setSelectedVolunteerForContribution(null);
  };

  const currentVolunteers = volunteers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Volunteer</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <EventVolunteerTable
            volunteers={currentVolunteers}
            selectedVolunteers={selectedVolunteers}
            onSelectAll={handleSelectAll}
            onSelectVolunteer={handleSelectVolunteer}
            onDelete={handleDeleteVolunteer}
            onAddScore={handleAddScore}
            onAddContribution={handleAddContribution}
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

      <AddScoreModal
        isOpen={isAddScoreModalOpen}
        volunteer={selectedVolunteerForScore}
        onSave={handleSaveScore}
        onCancel={handleCancelScore}
      />

      <AddContributionModal
        isOpen={isAddContributionModalOpen}
        volunteer={selectedVolunteerForContribution}
        onSave={handleSaveContribution}
        onCancel={handleCancelContribution}
      />
    </div>
  );
};

export default EventVolunteer;
