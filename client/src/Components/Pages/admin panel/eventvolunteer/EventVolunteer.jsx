import React, { useState, useEffect } from "react";
import axios from "axios";
import EventVolunteerTable from "./child-component/EventVolunteerTable";
import AddScoreModal from "./child-component/AddScoreModal";
import AddContributionModal from "./child-component/AddContributionModal";

const EventVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [volunteersLoading, setVolunteersLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const [isAddContributionModalOpen, setIsAddContributionModalOpen] =
    useState(false);
  const [selectedVolunteerForScore, setSelectedVolunteerForScore] =
    useState(null);
  const [selectedVolunteerForContribution, setSelectedVolunteerForContribution] =
    useState(null);

  // ✅ Fetch volunteers on component mount
  useEffect(() => {
    fetchAllVolunteers();
  }, []);

  const fetchAllVolunteers = async () => {
    try {
      setVolunteersLoading(true);
      setErrorMsg("");
      const response = await axios.get(
        "http://localhost:5001/api/user/getAllUsers"
      );

      const activeVolunteers = Array.isArray(response.data.users)
        ? response.data.users.map((user) => ({
            ...user,
            id: user._id,
            isActive: true,
            userType: "active",
            status: "Active",
            role: user.role,
            score: user.score || 0,
            projectId: user.projectId || "N/A",
            projectType: user.projectType || "N/A",
            participation: user.participation || "Participating",
            avatar: user.userImage,
          }))
        : [];

      console.log("✅ Volunteers loaded:", activeVolunteers.length);
      setVolunteers(activeVolunteers);
    } catch (err) {
      console.error("❌ Error fetching volunteers:", err);
      setErrorMsg("Failed to load volunteers.");
      setVolunteers([]);
    } finally {
      setVolunteersLoading(false);
    }
  };

  const totalRows = volunteers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    setSelectedVolunteers(checked ? volunteers.map((v) => v.id) : []);
  };

  const handleSelectVolunteer = (volunteerId, checked) => {
    setSelectedVolunteers(
      checked
        ? [...selectedVolunteers, volunteerId]
        : selectedVolunteers.filter((id) => id !== volunteerId)
    );
  };

  const handleAddScore = (volunteer) => {
    setSelectedVolunteerForScore(volunteer);
    setIsAddScoreModalOpen(true);
  };

  const handleAddContribution = (volunteer) => {
    setSelectedVolunteerForContribution(volunteer);
    setIsAddContributionModalOpen(true);
  };

  const handleSaveScore = async (scoreData) => {
    const newScore = (selectedVolunteerForScore.score || 0) + scoreData.score;
    try {
      await axios.patch(
        `http://localhost:5001/api/user/addScore/${selectedVolunteerForScore.id}`,
        { score: newScore }
      );
      fetchAllVolunteers(); // refresh list
    } catch (err) {
      console.error("Error updating score:", err);
      setErrorMsg("Failed to update score.");
    }
    setIsAddScoreModalOpen(false);
    setSelectedVolunteerForScore(null);
  };

  const handleSaveContribution = async (contributionData) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/user/updateContribution/${selectedVolunteerForContribution.id}`,
        {
          projectId: contributionData.projectId,
          projectType: contributionData.projectType,
          participation: contributionData.participation,
        }
      );
      fetchAllVolunteers();
    } catch (err) {
      console.error("Error updating contribution:", err);
      setErrorMsg("Failed to update contribution.");
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Event Volunteers
        </h1>

        {volunteersLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Loading volunteers...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 mx-4 mt-4">
                {errorMsg}
              </div>
            )}
            <EventVolunteerTable
              volunteers={currentVolunteers}
              selectedVolunteers={selectedVolunteers}
              onSelectAll={handleSelectAll}
              onSelectVolunteer={handleSelectVolunteer}
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
        )}
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
