import Attendance from "../models/attendance.js";

// Mark attendance (POST)
export const markAttendance = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // Prevent duplicate attendance for same date
    const existing = await Attendance.findOne({
      userId,
      date: { $gte: new Date().setHours(0,0,0,0), $lte: new Date().setHours(23,59,59,999) }
    });

    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    const attendance = new Attendance({ userId, status });
    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

// Get attendance by user (GET)
export const getAttendanceByUser = async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.params.userId });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};
