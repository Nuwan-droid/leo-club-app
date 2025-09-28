// Updated User Model (user model)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    leo_Id: {
      type: String,
      trim: true,
      required: function () {
        // Require LEO ID only for approved members (assigned by admin at approval time)
        return this.role === "member" && this.status === "approved";
      },
      unique: true,
      sparse: true,
    },
    admin_id: {
      type: String,
      sparse: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      required: true,
      default: "member",
    },
    position: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "admin";
      },
    },
    address: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userImage: {
      type: String,
      trim: true,
      default: function () {
        const gender = Math.random() < 0.5 ? "men" : "women";
        const number = Math.floor(Math.random() * 50) + 1;
        return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
      },
    },
    image_path: {
      type: String,
      trim: true,
    },
    permissions: {
      type: [String],
      enum: [
        "manage_about",
        "dashboard",
        "learning_hub",
        "super_admin",
        "users_management",
        "requests_management",
        "event_volunteers",
        "projects_management",
        "newsletters_management",
        "products_management",
        "orders_management",
        "donations_management",
        "membership_admin",
        "event_coordinator",
        "chief_editor",
        "treasurer",
      ],
      default: function () {
        if (this.role === "admin") {
          return ["manage_about", "dashboard", "learning_hub"];
        }
        return [];
      },
      validate: {
        validator: function (permissions) {
          if (this.role === "admin") {
            const commonPermissions = [
              "manage_about",
              "dashboard",
              "learning_hub",
            ];
            const hasAllCommon = commonPermissions.every((perm) =>
              permissions.includes(perm)
            );
            return permissions && permissions.length > 0 && hasAllCommon;
          }
          return true;
        },
        message:
          "Admin users must have at least the common permissions (manage_about, dashboard, learning_hub).",
      },
    },
    adminRole: {
      type: String,
      enum: [
        "it_director",
        "membership_admin",
        "event_coordinator",
        "chief_editor",
        "treasurer",
      ],
      required: function () {
        return this.role === "admin";
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        return this.role === "admin" ? "approved" : "pending";
      },
    },
    is_active: {
      type: Boolean,
      default: function () {
        return this.status === "approved";
      },
    },
    score: {
      type: Number,
      default: function () {
        return this.role === "member" ? 0 : undefined;
      },
      validate: {
        validator: function (value) {
          if (this.role === "admin") {
            return value === undefined || value === null;
          }
          return true;
        },
        message: "Score field is only applicable to members.",
      },
    },
    eventsParticipated: {
      type: Number,
      default: function () {
        return this.role === "member" ? 0 : undefined;
      },
      validate: {
        validator: function (value) {
          if (this.role === "admin") {
            return value === undefined || value === null;
          }
          return true;
        },
        message: "Events participated field is only applicable to members.",
      },
    },
    newsletterParticipated: {
      type: Number,
      default: function () {
        return this.role === "member" ? 0 : undefined;
      },
      validate: {
        validator: function (value) {
          if (this.role === "admin") {
            return value === undefined || value === null;
          }
          return Number.isInteger(value) && value >= 0;
        },
        message:
          "Newsletter participated count must be a non-negative number (and only applicable to members).",
      },
    },
    enrollmentNo: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  }
);

// Methods
userSchema.methods.hasPermission = function (permission) {
  return this.role === "admin" && this.permissions.includes(permission);
};

userSchema.methods.getRolePermissions = function () {
  if (this.role !== "admin") return [];

  const commonPermissions = ["manage_about", "dashboard", "learning_hub"];

  switch (this.adminRole) {
    case "it_director":
      return [
        ...commonPermissions,
        "super_admin",
        "users_management",
        "requests_management",
        "event_volunteers",
        "projects_management",
        "newsletters_management",
        "products_management",
        "orders_management",
        "donations_management",
      ];
    case "membership_admin":
      return [
        ...commonPermissions,
        "membership_admin",
        "users_management",
        "requests_management",
      ];
    case "event_coordinator":
      return [
        ...commonPermissions,
        "event_coordinator",
        "event_volunteers",
        "projects_management",
      ];
    case "chief_editor":
      return [...commonPermissions, "chief_editor", "newsletters_management"];
    case "treasurer":
      return [
        ...commonPermissions,
        "treasurer",
        "products_management",
        "orders_management",
        "donations_management",
      ];
    default:
      return commonPermissions;
  }
};

userSchema.pre("save", function (next) {
  if (!this.name && this.firstName && this.lastName) {
    this.name = `${this.firstName} ${this.lastName}`;
  }

  if (this.role === "admin" && this.adminRole) {
    this.permissions = this.getRolePermissions();
  }

  // Ensure is_active syncs with status
  this.is_active = this.status === "approved";

  next();
});

// Virtuals
userSchema.virtual("fullName").get(function () {
  return this.name || `${this.firstName || ""} ${this.lastName || ""}`.trim();
});

// Statics
userSchema.statics.findAdminsByRole = function (adminRole) {
  return this.find({ role: "admin", adminRole: adminRole, is_active: true });
};

userSchema.statics.findActiveAdmins = function () {
  return this.find({ role: "admin", is_active: true });
};

userSchema.statics.findPendingUsers = function () {
  return this.find({ status: "pending", role: "member" });
};

const User = mongoose.model("User", userSchema);
export default User;
