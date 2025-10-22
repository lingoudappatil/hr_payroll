import Payroll from "../models/Payroll.js";

// Generate salary
export const generateSalary = async (req, res) => {
  try {
    const { employeeId, month, basic, hra, allowances, deductions, pf, esi, tds } = req.body;

    // Net Pay calculation
    const totalDeductions = (deductions || 0) + (pf || 0) + (esi || 0) + (tds || 0);
    const netPay = basic + hra + (allowances || 0) - totalDeductions;

    const payroll = new Payroll({
      employeeId,
      month,
      basic,
      hra,
      allowances,
      deductions,
      pf,
      esi,
      tds,
      netPay,
    });

    await payroll.save();
    res.status(201).json({ message: "Salary generated successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Error generating salary", error });
  }
};

// Get salary details of employee
export const getSalaryByEmployee = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employeeId: req.params.id });
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary", error });
  }
};

// Get all payrolls (Admin)
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employeeId", "name email role");
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all payrolls", error });
  }
};
