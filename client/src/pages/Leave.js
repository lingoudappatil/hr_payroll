import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leaves.css";

export default function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [newLeave, setNewLeave] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // ✅ Fetch existing leaves from backend
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaves(res.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  // ✅ Add new leave to DB
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newLeave.employeeId || !newLeave.leaveType || !newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/leaves/apply", newLeave);
      console.log('Leave application response:', response.data);
      alert("Leave applied successfully!");
      setNewLeave({ employeeId: "", leaveType: "", startDate: "", endDate: "", reason: "" });
      fetchLeaves(); // Refresh list
    } catch (error) {
      console.error("Error adding leave:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error applying leave. Please try again.");
    }
  };

  return (
    <div className="leave-container">
      <div className="header">
        <h2>Leave Management</h2>
      </div>

      <div className="card">
        <h3>Apply for Leave</h3>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Employee ID"
            name="employeeId"
            value={newLeave.employeeId}
            onChange={handleChange}
          />

          <select name="leaveType" value={newLeave.leaveType} onChange={handleChange}>
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Paid Leave">Paid Leave</option>
          </select>

          <label>Start Date</label>
          <input type="date" name="startDate" value={newLeave.startDate} onChange={handleChange} />

          <label>End Date</label>
          <input type="date" name="endDate" value={newLeave.endDate} onChange={handleChange} />

          <textarea
            placeholder="Reason"
            name="reason"
            value={newLeave.reason}
            onChange={handleChange}
          />

          <button type="submit">Apply Leave</button>
        </form>
      </div>

      <div className="card">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="6">No leave requests found</td>
              </tr>
            ) : (
              leaves.map((lv) => (
                <tr key={lv._id}>
                  <td>{lv.employeeId}</td>
                  <td>{lv.leaveType}</td>
                  <td>{new Date(lv.startDate).toLocaleDateString()}</td>
                  <td>{new Date(lv.endDate).toLocaleDateString()}</td>
                  <td>{lv.reason}</td>
                  <td>{lv.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
