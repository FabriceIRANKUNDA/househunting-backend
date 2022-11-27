import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    priceRange: Number,
    internet: {
      type: String,
      enum: ["CanaBox", "Liquid", "None"],
    },
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
