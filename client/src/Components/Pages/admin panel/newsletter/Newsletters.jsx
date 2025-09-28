import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriberTable from "./child_components/SubscriberTable";
import AddScoreModal from "./child_components/AddScoreModal";
import AddSubmissionModal from "./child_components/AddSubmissionModal";
import AddNewsletterModal from "./child_components/AddNewsletterModal";
import EditNewsletterModal from "./child_components/EditNewsletterModal";
import NewsletterList from "./child_components/NewsletterList";

const Newsletters = () => {
  // Newsletter states
  const [newsletters, setNewsletters] = useState([]);
  const [newslettersLoading, setNewslettersLoading] = useState(false);
  const [isEditNewsletterModalOpen, setIsEditNewsletterModalOpen] =
    useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);

  // Subscriber states
  const [subscribers, setSubscribers] = useState([]);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const [isAddSubmissionModalOpen, setIsAddSubmissionModalOpen] =
    useState(false);
  const [isAddNewsletterModalOpen, setIsAddNewsletterModalOpen] =
    useState(false);
  const [selectedMemberForScore, setSelectedMemberForScore] = useState(null);
  const [selectedMemberForSubmission, setSelectedMemberForSubmission] =
    useState(null);

  // Fetch newsletters and subscribers on component mount
  useEffect(() => {
    fetchNewsletters();
    fetchAllSubscribers();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setNewslettersLoading(true);
      const response = await axios.get("http://localhost:5001/api/newsletters");
      setNewsletters(response.data.newsletters || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      setNewsletters([]);
    } finally {
      setNewslettersLoading(false);
    }
  };

  // Fetch active subscribers
  const fetchAllSubscribers = async () => {
    try {
      setSubscribersLoading(true);
      setErrorMsg("");
      const response = await axios.get(
        "http://localhost:5001/api/user/getAllUsers"
      );
      const activeSubscribers = Array.isArray(response.data.users)
        ? response.data.users.map((user) => ({
            ...user,
            id: user._id,
            isActive: true,
            userType: "active",
            status: "Active",
            role: "member",
            score: user.score || 0,
            submissions: user.submissions || [],
            subscribeDate:
              user.subscribeDate || new Date().toISOString().split("T")[0],
            avatar: user.userImage,
          }))
        : [];
      console.log("✅ Active subscribers loaded:", activeSubscribers.length);
      setSubscribers(activeSubscribers);
    } catch (err) {
      console.error("❌ Error fetching subscribers:", err);
      setErrorMsg("Failed to load subscribers.");
      setSubscribers([]);
    } finally {
      setSubscribersLoading(false);
    }
  };

  const totalRows = subscribers.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleSelectAll = (checked) => {
    setSelectedSubscribers(checked ? subscribers.map((sub) => sub.id) : []);
  };

  const handleSelectSubscriber = (subscriberId, checked) => {
    setSelectedSubscribers(
      checked
        ? [...selectedSubscribers, subscriberId]
        : selectedSubscribers.filter((id) => id !== subscriberId)
    );
  };

  const handleAddScore = (member) => {
    setSelectedMemberForScore(member);
    setIsAddScoreModalOpen(true);
  };

  const handleAddSubmission = (member) => {
    setSelectedMemberForSubmission(member);
    setIsAddSubmissionModalOpen(true);
  };

  const handleSaveScore = async (scoreData) => {
    const newScore = (selectedMemberForScore.score || 0) + scoreData.score;
    try {
      await axios.patch(
        `http://localhost:5001/api/user/addScore/${selectedMemberForScore.id}`,
        {
          score: newScore,
        }
      );
      fetchAllSubscribers();
    } catch (err) {
      console.error("Error updating score:", err);
      setErrorMsg("Failed to update score.");
    }
    setIsAddScoreModalOpen(false);
    setSelectedMemberForScore(null);
  };

  const handleSaveSubmission = async (submissionData) => {
    const formData = new FormData();
    formData.append("title", submissionData.title);
    formData.append("description", submissionData.description);
    submissionData.images.forEach((file, index) => {
      formData.append("images", file);
    });

    try {
      await axios.post(
        `http://localhost:5001/api/newsletter/uploadnewslettersubmission/${selectedMemberForSubmission.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Assuming fetchAllSubscribers refreshes the user list with updated score and count
      fetchAllSubscribers();
    } catch (err) {
      console.error("Error adding submission:", err);
      setErrorMsg("Failed to add submission.");
    }
    setIsAddSubmissionModalOpen(false);
    setSelectedMemberForSubmission(null);
  };

  const handleSaveNewsletter = (newsletterData) => {
    console.log("New Newsletter Added:", newsletterData);
    fetchNewsletters();
    setIsAddNewsletterModalOpen(false);
  };

  const handleEditNewsletter = (newsletter) => {
    setEditingNewsletter(newsletter);
    setIsEditNewsletterModalOpen(true);
  };

  const handleSaveEditedNewsletter = (updatedNewsletter) => {
    setNewsletters(
      newsletters.map((n) =>
        n._id === updatedNewsletter._id ? updatedNewsletter : n
      )
    );
    setIsEditNewsletterModalOpen(false);
    setEditingNewsletter(null);
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Newsletter Management
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsAddNewsletterModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Newsletter</span>
            </button>
          </div>
        </div>

        {subscribersLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-600">Loading subscribers...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 mx-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{errorMsg}</p>
                  </div>
                </div>
              </div>
            )}
            <SubscriberTable
              subscribers={currentSubscribers}
              selectedSubscribers={selectedSubscribers}
              onSelectAll={handleSelectAll}
              onSelectSubscriber={handleSelectSubscriber}
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
        )}

        <NewsletterList
          newsletters={newsletters}
          onEdit={handleEditNewsletter}
          loading={newslettersLoading}
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
    </div>
  );
};

export default Newsletters;
