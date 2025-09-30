// InboxContent.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "./button";

const InboxContent = () => {
  const [messages, setMessages] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true); 
  const [approvingId, setApprovingId] = useState(null); 
  const [fakeAdded, setFakeAdded] = useState(false);

  const fetchPendingRequests = async () => {
    setFetching(true);
    try {
      const res = await fetch(
        "http://localhost:5001/api/admin-requests/pending-requests",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch pending requests");
      const data = await res.json();

      // Format to show only full name and request type
      const formattedMessages = data.map((user) => ({
        id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        requestType: "Registration Request",
      }));
      setMessages(formattedMessages);
      if (!fakeAdded) {
        setMessages(prev => [...prev, {
          id: 'L3457',
          fullName: 'Thilina adikari',
          requestType: "Event Volunteer Request - Limitless Pulse’25",
        }]);
        setFakeAdded(true);
      }
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      toast.error("Failed to fetch pending requests.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleReject = async (id) => {
    if (id === 'fake-volunteer-1') {
      toast.success("Request rejected successfully.");
      setMessages(prev => prev.filter(msg => msg.id !== id));
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin-requests/reject/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to reject request");
      toast.success("Request rejected successfully.");
      fetchPendingRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
      toast.error("Failed to reject request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenApproveModal = (id) => {
    setApprovingId(id);
    setShowApproveModal(true);
  };

  const handleApproveConfirm = async () => {
    if (approvingId === 'fake-volunteer-1') {
      toast.success("Request approved successfully.");
      setMessages(prev => prev.filter(msg => msg.id !== approvingId));
      setShowApproveModal(false);
      setApprovingId(null);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin-requests/approve/${approvingId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Request approved successfully.");
        fetchPendingRequests();
      } else {
        toast.error(data.message || "Failed to approve request.");
      }
    } catch (err) {
      console.error("Error approving request:", err);
      toast.error("Failed to approve request.");
    } finally {
      setIsLoading(false);
      setShowApproveModal(false);
      setApprovingId(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 min-h-screen overflow-auto">
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Pending Requests
        </h2>

        {fetching ? (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No pending requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-900">
                    {message.fullName}
                  </span>
                  <span className="text-sm text-gray-500">
                    {message.requestType}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    label="Approve"
                    onClick={() => handleOpenApproveModal(message.id)}
                    variant="success"
                    disabled={isLoading}
                    className="px-3 py-1"
                  />
                  <Button
                    label="Decline"
                    onClick={() => handleReject(message.id)}
                    variant="danger"
                    disabled={isLoading}
                    className="px-3 py-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approve Modal */}
        {showApproveModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Approve Request
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to approve this request?
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  label="Cancel"
                  onClick={() => setShowApproveModal(false)}
                  variant="secondary"
                  disabled={isLoading}
                />
                <Button
                  label={isLoading ? "Approving..." : "Confirm"}
                  onClick={handleApproveConfirm}
                  variant="success"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxContent;