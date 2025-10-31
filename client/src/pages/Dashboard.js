import React from 'react';

function Dashboard() {
  return (
    <div style={{ marginLeft: '270px', padding: '20px' }}>
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Employees</h3>
            <p>25</p>
          </div>
          <div className="stat-card">
            <h3>Present Today</h3>
            <p>20</p>
          </div>
          <div className="stat-card">
            <h3>On Leave</h3>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
