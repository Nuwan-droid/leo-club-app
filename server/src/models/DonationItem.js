import mongoose from 'mongoose';

const donationItemSchema = new mongoose.Schema({
  // Donation ID
  donation_id: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return 'DON-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }
  },
  
  // Project reference
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonationProject',
    required: true
  },
  
  // Donor information
  donor_info: {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  },
  
  // Donated items with quantities
  donated_items: {
    books: {
      type: Number,
      default: 0,
      min: 0
    },
    pens: {
      type: Number,
      default: 0,
      min: 0
    },
    clothes: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  
  // Total estimated value (optional)
  estimated_value: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Donation status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'received', 'distributed'],
    default: 'pending'
  },
  
  // Collection details
  collection_details: {
    location: {
      type: String,
      trim: true
    },
    date: {
      type: Date
    },
    time: {
      type: String
    }
  },
  
  // User reference (if donor is a registered user)
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Additional notes
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
  
}, {
  timestamps: true
});

// Index for better query performance
donationItemSchema.index({ project_id: 1, createdAt: -1 });
donationItemSchema.index({ 'donor_info.email': 1 });
donationItemSchema.index({ status: 1 });

// Virtual for full donor name
donationItemSchema.virtual('donor_full_name').get(function() {
  return `${this.donor_info.first_name} ${this.donor_info.last_name}`;
});

// Method to calculate total donated items
donationItemSchema.methods.getTotalItemsCount = function() {
  return this.donated_items.books + this.donated_items.pens + this.donated_items.clothes;
};

// Static method to get donations by project
donationItemSchema.statics.getByProject = function(projectId) {
  return this.find({ project_id: projectId }).populate('project_id').populate('user_id', 'name email');
};

// Pre-save middleware to generate donation_id if not provided
donationItemSchema.pre('save', function(next) {
  if (!this.donation_id) {
    this.donation_id = 'DON-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

const DonationItem = mongoose.model('DonationItem', donationItemSchema);

export default DonationItem;
