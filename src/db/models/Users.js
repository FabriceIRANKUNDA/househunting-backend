import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  names: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, " Phone number is required"],
  },
  role: {
    type: String,
    default: "student",
  },
  isVerified: Boolean,
  isActive: Boolean,
  otp: String,
  otpExpires: Date,
  preferences: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Preference",
    },
  ],
  password: {
    type: String,
    select: false,
  },
  isActive: Boolean,
  isVerified: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "preferences",
//   });
//   next();
// });

const User = mongoose.model("User", userSchema);
export default User;
