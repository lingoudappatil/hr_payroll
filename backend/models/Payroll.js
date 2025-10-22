import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: String, required: true }, // e.g., "October 2025"
  basic: { type: Number, required: true },
  hra: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  pf: { type: Number, default: 0 },
  esi: { type: Number, default: 0 },
  tds: { type: Number, default: 0 },
  netPay: { type: Number },
  generatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payroll", payrollSchema);
