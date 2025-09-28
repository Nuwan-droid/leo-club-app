import React, { useState } from "react";
import axios from "axios";

const AddNewsletterModal = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  if (!isOpen) return null;

  const resetForm = () => {
    setUrl("");
    setMonth("");
    setYear("");
    setFile(null);
    setCoverImage(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) { setError("Please enter a newsletter URL"); return; }
    if (!month) { setError("Please select a month"); return; }
    if (!year) { setError("Please select a year"); return; }
    if (!file) { setError("Please upload a PDF file"); return; }
    if (file.type !== 'application/pdf') { setError("Please upload only PDF files"); return; }
    if (file.size > 5 * 1024 * 1024) { setError("File size must be less than 5MB"); return; }

    try {
      setLoading(true);

        const formData = new FormData();
        formData.append("url", url.trim());
        formData.append("month", month);
        formData.append("year", year);
        formData.append("pdf", file); // This field name must match multer config
        if (coverImage) formData.append("coverImage", coverImage);

      console.log("Submitting newsletter data:", {
        url: url.trim(),
        month,
        year,
        filename: file.name,
        size: file.size,
        type: file.type,
        coverImage: coverImage ? coverImage.name : null
      });

      const response = await axios.post(
        "http://localhost:5001/api/newsletters",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
        }
      );

      console.log("Newsletter upload response:", response.data);

      if (response.status === 201) {
        if (onSave && typeof onSave === 'function') onSave(response.data.newsletter);
        resetForm();
        onClose();
        alert("Newsletter uploaded successfully!");
      }
    } catch (err) {
      console.error("Newsletter upload failed:", err);

      if (err.response) {
        setError(err.response.data?.message || err.response.data?.error || "Failed to save newsletter");
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else if (err.code === 'ECONNABORTED') {
        setError("Upload timeout. Please try again with a smaller file.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) { resetForm(); onClose(); }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') { setError("Please select only PDF files"); e.target.value = ''; return; }
      if (selectedFile.size > 5 * 1024 * 1024) { setError("File size must be less than 5MB"); e.target.value = ''; return; }
      setFile(selectedFile);
      setError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-400 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Newsletter</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Newsletter URL *
            </label>
            <input
              type="url"
              placeholder="https://example.com/newsletter"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month *
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              >
                <option value="">Select Month</option>
                {months.map((monthName) => (
                  <option key={monthName} value={monthName}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              >
                <option value="">Select Year</option>
                {years.map((yearNum) => (
                  <option key={yearNum} value={yearNum}>
                    {yearNum}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) setCoverImage(selectedFile);
              }}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {coverImage && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {coverImage.name} ({(coverImage.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF File *
            </label>
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
            {file && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Save Newsletter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewsletterModal;
