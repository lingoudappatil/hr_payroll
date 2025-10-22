import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "HR", "Employee"],
    default: "Employee",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
