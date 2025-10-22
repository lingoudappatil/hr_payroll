import Leave from "../models/Leave.js";

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;

    const leave = new Leave({
      userId,
      startDate,
      endDate,
      reason,
    });

    await leave.save();
    res.status(201).json({ message: "Leave request submitted successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Error applying for leave", error });
  }
};

// Get all leaves (for Admin/HR)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("userId", "name email role");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaves", error });
  }
};

// Approve/Reject leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: `Leave ${status} successfully`, leave });
  } catch (error) {
    res.status(500).json({ message: "Error updating leave", error });
  }
};
