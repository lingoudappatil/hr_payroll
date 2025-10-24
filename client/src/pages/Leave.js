import React, { useState } from "react";
import "../styles/leaves.css";

export default function Leave() {
  const [leaves, setLeaves] = useState([
    { id: 1, name: "Ravi Kumar", type: "Sick Leave", days: 2, status: "Approved" },
  ]);

  const [newLeave, setNewLeave] = useState({
    name: "",
    type: "",
    days: "",
  });

  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newLeave.name || !newLeave.type || !newLeave.days) {
      alert("Please fill all fields");
      return;
    }
    setLeaves([
      ...leaves,
      { ...newLeave, id: leaves.length + 1, status: "Pending" },
    ]);
    setNewLeave({ name: "", type: "", days: "" });
  };

  return (
    <div className="leave-container">
      <div className="header">
        <h2>Leave Management</h2>
      </div>

      <div className="card">
        <h3>Apply for Leave</h3>
        <input
          type="text"
          placeholder="Employee Name"
          name="name"
          value={newLeave.name}
          onChange={handleChange}
        />
        <select name="type" value={newLeave.type} onChange={handleChange}>
          <option value="">Select Leave Type</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Paid Leave">Paid Leave</option>
        </select>
        <input
          type="number"
          placeholder="No. of Days"
          name="days"
          value={newLeave.days}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Apply Leave</button>
      </div>

      <div className="card">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((lv) => (
              <tr key={lv.id}>
                <td>{lv.id}</td>
                <td>{lv.name}</td>
                <td>{lv.type}</td>
                <td>{lv.days}</td>
                <td>{lv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
