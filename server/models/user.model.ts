import mongoose, { Document } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  contact: number;
  agreeToTerms: boolean;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  isRememberMeEnabled?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  deletionDate?: Date | null;
  isEmailSubscribed?: boolean;
  lastUpdated?: Date;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    agreeToTerms: {
      type: Boolean,
      required: true
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    postalCode: {
      type: String,
      default: "Update your city pin code",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },

    // role: {
    //   type: String,
    //   enum: ["user", "admin", "manager", "chef"],
    //   default: "customer",
    // },

    // advanced authentication
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isRememberMeEnabled: {
      type: Boolean,
      default: false,
    },    
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    deletionDate: {
      type: Date,
      default: null, // Default to null (not scheduled for deletion)
    },
    isEmailSubscribed: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: null },
  },
  { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   if (this.admin) {
//     this.role = "admin"; // ✅ Auto-update role when isAdmin is true
//   }
//   next();
// });

// userSchema.pre("save", function (next) {
//   if (!this.admin) {
//     this.role = "user"; // ✅ Auto-update role when isAdmin is false
//   }
//   next();
// });

export const User = mongoose.model("User", userSchema);
