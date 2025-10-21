import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  department: String,
  designation: String,
  joinDate: Date,
  salary: {
    basic: Number,
    hra: Number,
    allowances: Number,
    deductions: Number,
    pf: Number,
    esi: Number,
    tds: Number,
  },
  documents: [String],
  bankInfo: { accountNumber: String, ifsc: String },
  compliance: { pan: String, aadhaar: String, pf: String, esi: String }
});

export default mongoose.model('Employee', employeeSchema);
