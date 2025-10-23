import React, { useState } from "react";
import "../styles/Payroll.css";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([
    { id: 1, name: "Ravi Kumar", month: "September", amount: 45000 },
  ]);

  const [newPayroll, setNewPayroll] = useState({
    name: "",
    month: "",
    amount: "",
  });

  const handleChange = (e) => {
    setNewPayroll({ ...newPayroll, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!newPayroll.name || !newPayroll.month || !newPayroll.amount) {
      alert("Please fill all fields");
      return;
    }
    setPayrolls([...payrolls, { ...newPayroll, id: payrolls.length + 1 }]);
    setNewPayroll({ name: "", month: "", amount: "" });
  };

  return (
    <div className="payroll-container">
      <div className="header">
        <h2>Payroll Management</h2>
      </div>

      <div className="generate-section">
        <h3>Generate Payroll</h3>
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Employee Name"
              name="name"
              value={newPayroll.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Month"
              name="month"
              value={newPayroll.month}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={newPayroll.amount}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="generate-btn">
            Generate
          </button>
        </form>
      </div>

      <div className="history-section">
        <h3>Payroll History</h3>
        <div className="table-responsive">
          <table className="payroll-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Month</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.month}</td>
                  <td>{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
