import React, { useState } from 'react';

function Attendance() {
  const [attendance, setAttendance] = useState([
    { id: 1, name: "John Doe", date: "2025-10-31", status: "Present" },
    { id: 2, name: "Jane Smith", date: "2025-10-31", status: "Absent" },
  ]);

  return (
    <div style={{ marginLeft: '270px', padding: '20px' }}>
      <h2>Attendance Management</h2>
      <div className="card">
        <h3>Today's Attendance</h3>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(record => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
