import express from "express";
import 
{
  applyLeave,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/apply", applyLeave);
router.get("/", getAllLeaves);
router.put("/update/:id", updateLeaveStatus);

export default router;