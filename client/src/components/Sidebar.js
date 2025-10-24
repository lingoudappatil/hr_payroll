// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">HR & Payroll</div>

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Dashboard
        </Link>

        <div>
          <button
            className="nav-link dropdown-btn"
            onClick={() => setEmployeeOpen((s) => !s)}
            aria-expanded={employeeOpen}
          >
            <span>Employee</span>
            <span className="caret">{employeeOpen ? "▲" : "▼"}</span>
          </button>

          {employeeOpen && (
            <div className="submenu">
              <Link
                to="/employee"
                className={`nav-link sub-link ${isActive("/employee") ? "active" : ""}`}
              >
                Add Employee
              </Link>
              <Link
                to="/view-employees"
                className={`nav-link sub-link ${isActive("/view-employees") ? "active" : ""}`}
              >
                View Employees
              </Link>
            </div>
          )}
        </div>

        <Link to="/leave" className={`nav-link ${isActive("/leave") ? "active" : ""}`}>
          Leave
        </Link>

        <Link to="/payroll" className={`nav-link ${isActive("/payroll") ? "active" : ""}`}>
          Payroll
        </Link>
      </nav>
    </aside>
  );
}
