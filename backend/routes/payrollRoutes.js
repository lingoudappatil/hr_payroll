import express from "express";
import { generateSalary, getSalaryByEmployee, getAllPayrolls } from "../controllers/payrollController.js";

const router = express.Router();

// Helpful GET response for browsers (endpoint expects POST)
router.get('/generate', (req, res) => {
	res.status(400).json({
		error: 'Invalid request method',
		message: 'Use POST /api/payroll/generate with payroll data in JSON body',
		example: {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: {
				employeeId: 'employeeId',
				month: '2025-10',
				basic: 50000,
				hra: 10000,
				allowances: 2000,
				deductions: 500,
				pf: 1800,
				esi: 200,
				tds: 1000
			}
		}
	});
});

router.post("/generate", generateSalary);
router.get("/employee/:id", getSalaryByEmployee);
router.get("/", getAllPayrolls);

export default router;
