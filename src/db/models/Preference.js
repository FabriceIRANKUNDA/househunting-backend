import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
  name: String,
});

const Preference = mongoose.model("Preference", preferenceSchema);
export default Preference;
