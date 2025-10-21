const attendanceSchema = new mongoose.Schema({
  employeeId: String,
  date: Date,
  clockIn: Date,
  clockOut: Date,
  hoursWorked: Number,
  overtime: Number,
});
