// src/models/Newsletter.js
import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Newsletter title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  url: {
    type: String,
    required: [true, 'Newsletter URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        // Basic URL validation
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  month: {
    type: String,
    required: [true, 'Newsletter month is required'],
    enum: {
      values: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      message: 'Please select a valid month'
    }
  },
  year: {
    type: Number,
    required: [true, 'Newsletter year is required'],
    min: [2000, 'Year must be 2000 or later'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: 'Year must be a valid integer'
    }
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v === 'application/pdf';
      },
      message: 'Only PDF files are allowed'
    }
  },
  size: {
    type: Number,
    required: true,
    max: [5 * 1024 * 1024, 'File size cannot exceed 5MB']
  },
  // Cover image fields
  coverImagePath: {
    type: String,
    default: null
  },
  coverImageOriginalName: {
    type: String,
    default: null
  },
  coverImageMimeType: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || v.startsWith('image/');
      },
      message: 'Cover image must be an image file'
    }
  },
  coverImageSize: {
    type: Number,
    max: [5 * 1024 * 1024, 'Cover image size cannot exceed 5MB']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
NewsletterSchema.index({ uploadedAt: -1 });
NewsletterSchema.index({ year: -1, month: 1 });
NewsletterSchema.index({ title: 'text' });

// Add virtual for file size in human readable format
NewsletterSchema.virtual('fileSizeFormatted').get(function() {
  const bytes = this.size;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Add virtual for formatted month/year
NewsletterSchema.virtual('periodFormatted').get(function() {
  return `${this.month} ${this.year}`;
});

// Ensure virtual fields are serialized
NewsletterSchema.set('toJSON', { virtuals: true });

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);
export default Newsletter;