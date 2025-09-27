import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donate_id: {
    type: Number,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'LKR'
  },
  // Donor information
  donor: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // null for non-registered users
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  // Donation target
  donation_project_id: {
    type: Number,
    required: false // null for club fund donations
  },
  donation_type: {
    type: String,
    enum: ['project', 'club_fund'],
    required: true
  },
  // Payment information
  payment: {
    order_id: {
      type: String,
      required: false // will be set when payment is initiated
    },
    payment_id: {
      type: String,
      required: false // PayHere payment ID
    },
    transaction_id: {
      type: String,
      required: false // PayHere reference
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'receipt_uploaded'],
      default: 'pending'
    },
    payment_method: {
      type: String,
      enum: ['online', 'bank_transfer', 'other'],
      default: 'online'
    },
    paid_at: {
      type: Date,
      required: false
    }
  },
  // Receipt information (for bank transfers)
  receipt: {
    file_path: {
      type: String,
      required: false
    },
    file_name: {
      type: String,
      required: false
    },
    uploaded_at: {
      type: Date,
      required: false
    }
  },
  // Status and timestamps
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  verified_at: {
    type: Date,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update updated_at
donationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Index for better query performance
donationSchema.index({ 'donor.user_id': 1 });
donationSchema.index({ donation_project_id: 1 });
donationSchema.index({ donation_type: 1 });
donationSchema.index({ 'payment.status': 1 });
donationSchema.index({ status: 1 });

// Enable timestamps for createdAt and updatedAt
donationSchema.set('timestamps', true);

export default mongoose.model('Donation', donationSchema);
