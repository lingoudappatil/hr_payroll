import express from "express";
import { markAttendance, getAttendanceByUser } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/:userId", getAttendanceByUser);

export default router;
