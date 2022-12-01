import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    priceRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
    },
    internet: [
      {
        type: String,
        enum: ["CanalBox", "Liquid", "MTN", "None"],
        default: ["None"],
      },
    ],
    location: String,
    numOfBedRooms: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Preference = mongoose.model("Preference", preferenceSchema);
export default Preference;
