import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      validate: [validator.isEmail, "Please provide valid email"],
    },
    phone: {
      type: String,
      unique: [true, "Phone must be unique"],
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
    password: {
      type: String,
      select: false,
    },
    isActive: Boolean,
    isVerified: Boolean,
    lookingForHouse: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
