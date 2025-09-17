import React, { useState } from 'react';
import { Trash2, Edit, ExternalLink, FileText, Calendar, Image } from 'lucide-react';

const NewsletterList = ({ newsletters, onEdit, onDelete, loading }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (newsletter) => {
    setDeleteConfirm(newsletter._id);
  };

  const handleConfirmDelete = (newsletter) => {
    onDelete(newsletter._id);
    setDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Newsletters</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="ml-2 text-gray-600">Loading newsletters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-green-500" />
          Uploaded Newsletters ({newsletters.length})
        </h2>
      </div>

      {newsletters.length === 0 ? (
        <div className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No newsletters uploaded yet</p>
          <p className="text-gray-400 text-sm">Click "Add Newsletter" to upload your first newsletter</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {newsletters.map((newsletter) => (
            <div key={newsletter._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                {/* Cover Image and Main Content */}
                <div className="flex space-x-4 flex-1 min-w-0">
                  {/* Cover Image */}
                  <div className="flex-shrink-0">
                    {newsletter.coverImagePath ? (
                      <div className="relative">
                        <img
                          src={`http://localhost:5001${newsletter.coverImagePath}`}
                          alt={`Cover for ${newsletter.title}`}
                          className="w-16 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-16 h-20 bg-gray-100 rounded-md border border-gray-200 items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Newsletter Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {newsletter.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {newsletter.month} {newsletter.year}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Uploaded: {formatDate(newsletter.uploadedAt)}
                      </div>
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        {formatFileSize(newsletter.size)}
                      </div>
                      {newsletter.coverImagePath && (
                        <div className="flex items-center">
                          <Image className="h-4 w-4 mr-1 text-purple-500" />
                          <span className="text-purple-600">Has Cover</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <a
                        href={newsletter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Original
                      </a>
                      <a
                        href={`http://localhost:5001${newsletter.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Download PDF
                      </a>
                      {newsletter.coverImagePath && (
                        <a
                          href={`http://localhost:5001${newsletter.coverImagePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          <Image className="h-4 w-4 mr-1" />
                          View Cover
                        </a>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-2 text-xs text-gray-500">
                      <div>PDF: {newsletter.originalName}</div>
                      {newsletter.coverImageName && (
                        <div>Cover: {newsletter.coverImageName}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => onEdit(newsletter)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  
                  {deleteConfirm === newsletter._id ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleConfirmDelete(newsletter)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={handleCancelDelete}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteClick(newsletter)}
                      className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsletterList;