import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  leo_Id: {
    type: String,
    trim: true,
  },
  // Admin-specific ID (only for admins)
  admin_id: {
    type: Number,
    sparse: true, // Allows null/undefined values but maintains uniqueness when present
    unique: true,
  },
  firstName: { 
    type: String, 
    trim: true 
  },
  lastName: { 
    type: String, 
    trim: true 
  },
  // Combined name field (can be computed from firstName + lastName or stored separately)
  name: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    required: true,
    default: 'member',
  },
  // Admin-specific position
  position: {
    type: String,
    trim: true,
    required: function() {
      return this.role === 'admin';
    }
  },
  address: { 
    type: String, 
    trim: true 
  },
  birthday: { 
    type: Date 
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: { 
    type: String, 
    trim: true 
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  userImage: {
    type: String,
    trim: true,
    default: 'https://randomuser.me/api/portraits',
  },
  // Admin image path (different from userImage)
  image_path: {
    type: String,
    trim: true,
  },
  // Admin permissions
  permissions: {
    type: [String], // Array of permission strings
    enum: [
      // Common permissions (all admins have these)
      'manage_about',
      'dashboard',
      'learning_hub',
      
      // IT Director (Super Admin) - has all permissions
      'super_admin',
      'users_management',
      'requests_management',
      'event_volunteers',
      'projects_management',
      'newsletters_management',
      'products_management',
      'orders_management',
      'donations_management',
      
      // Membership Admin specific
      'membership_admin',
      
      // Event Coordinator Admin specific
      'event_coordinator',
      
      // Chief Editor Admin specific
      'chief_editor',
      
      // Treasurer Admin specific
      'treasurer'
    ],
    default: function() {
      if (this.role === 'admin') {
        return ['manage_about', 'dashboard', 'learning_hub']; // Common permissions
      }
      return [];
    },
    validate: {
      validator: function(permissions) {
        if (this.role === 'admin') {
          // All admins must have at least the common permissions
          const commonPermissions = ['manage_about', 'dashboard', 'learning_hub'];
          const hasAllCommon = commonPermissions.every(perm => permissions.includes(perm));
          return permissions && permissions.length > 0 && hasAllCommon;
        }
        return true;
      },
      message: 'Admin users must have at least the common permissions (manage_about, dashboard, learning_hub).'
    }
  },
  
  // Admin role type for easier querying and role management
  adminRole: {
    type: String,
    enum: ['it_director', 'membership_admin', 'event_coordinator', 'chief_editor', 'treasurer'],
    required: function() {
      return this.role === 'admin';
    }
  },
  // Admin active status
  is_active: {
    type: Boolean,
    default: true,
  },
  // Member-specific fields (only for members)
  score: {
    type: Number,
    default: function() {
      return this.role === 'member' ? 0 : undefined;
    },
    validate: {
      validator: function(value) {
        // Only allow score for members
        if (this.role === 'admin') {
          return value === undefined || value === null;
        }
        return true;
      },
      message: 'Score field is only applicable to members.'
    }
  },
  eventsParticipated: {
    type: Number,
    default: function() {
      return this.role === 'member' ? 0 : undefined;
    },
    validate: {
      validator: function(value) {
        // Only allow eventsParticipated for members
        if (this.role === 'admin') {
          return value === undefined || value === null;
        }
        return true;
      },
      message: 'Events participated field is only applicable to members.'
    }
  },
  newsletterParticipated: {
    type: Boolean,
    default: function() {
      return this.role === 'member' ? false : undefined;
    },
    validate: {
      validator: function(value) {
        // Only allow newsletterParticipated for members
        if (this.role === 'admin') {
          return value === undefined || value === null;
        }
        return true;
      },
      message: 'Newsletter participated field is only applicable to members.'
    }
  },
}, { 
  timestamps: true,
  // Add discriminator key for potential future separation
  discriminatorKey: 'userType'
});

// Method to check if user has specific permission
userSchema.methods.hasPermission = function(permission) {
  return this.role === 'admin' && this.permissions.includes(permission);
};

// Method to get admin role-specific permissions
userSchema.methods.getRolePermissions = function() {
  if (this.role !== 'admin') return [];
  
  const commonPermissions = ['manage_about', 'dashboard', 'learning_hub'];
  
  switch (this.adminRole) {
    case 'it_director':
      return [
        ...commonPermissions,
        'super_admin',
        'users_management',
        'requests_management', 
        'event_volunteers',
        'projects_management',
        'newsletters_management',
        'products_management',
        'orders_management',
        'donations_management'
      ];
    case 'membership_admin':
      return [
        ...commonPermissions,
        'membership_admin',
        'users_management',
        'requests_management'
      ];
    case 'event_coordinator':
      return [
        ...commonPermissions,
        'event_coordinator',
        'event_volunteers',
        'projects_management'
      ];
    case 'chief_editor':
      return [
        ...commonPermissions,
        'chief_editor',
        'newsletters_management'
      ];
    case 'treasurer':
      return [
        ...commonPermissions,
        'treasurer',
        'products_management',
        'orders_management',
        'donations_management'
      ];
    default:
      return commonPermissions;
  }
};

// Pre-save middleware to auto-assign permissions based on admin role
userSchema.pre('save', function(next) {
  if (!this.name && this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`;
  }
  
  // Auto-assign permissions based on admin role
  if (this.role === 'admin' && this.adminRole) {
    this.permissions = this.getRolePermissions();
  }
  
  next();
});

// Virtual to get full name
userSchema.virtual('fullName').get(function() {
  return this.name || `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

// Static method to find admins by role
userSchema.statics.findAdminsByRole = function(adminRole) {
  return this.find({ role: 'admin', adminRole: adminRole, is_active: true });
};

// Static method to find active admins
userSchema.statics.findActiveAdmins = function() {
  return this.find({ role: 'admin', is_active: true });
};

const User = mongoose.model('User', userSchema);
export default User;