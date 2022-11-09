import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
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
  test: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tests",
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

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "test",
  });
  next();
});

const Users = mongoose.model("Users", userSchema);
export default Users;
