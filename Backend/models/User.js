import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["artist", "label"],
    default: null,
  },
});

export default mongoose.model("User", userSchema);