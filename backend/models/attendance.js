import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent", "On Leave"], default: "Present" }
});

export default mongoose.model("Attendance", attendanceSchema);
