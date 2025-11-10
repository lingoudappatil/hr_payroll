// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isActiveParent = (paths) => paths.some(path => location.pathname.startsWith(path));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebarMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">🏢</div>
            <div className="brand-text">
              <h3>HR & Payroll</h3>
              <span>Management System</span>
            </div>
          </div>
          <button 
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="section-label">MAIN MENU</span>
            
            <Link 
              to="/" 
              className={`nav-item ${isActive("/") ? "active" : ""}`}
              onClick={closeSidebarMobile}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </Link>

            <div className={`nav-item dropdown-parent ${isActiveParent(['/employee', '/view-employees']) ? "active" : ""}`}>
              <button
                className="nav-link dropdown-btn"
                onClick={() => setEmployeeOpen(!employeeOpen)}
                aria-expanded={employeeOpen}
              >
                <span className="nav-icon">👥</span>
                <span className="nav-text">Employee Management</span>
                <span className={`dropdown-arrow ${employeeOpen ? "open" : ""}`}>
                  ▼
                </span>
              </button>

              <div className={`submenu ${employeeOpen ? "open" : ""}`}>
                <Link
                  to="/employee"
                  className={`submenu-item ${isActive("/employee") ? "active" : ""}`}
                  onClick={closeSidebarMobile}
                >
                  <span className="submenu-icon">➕</span>
                  Add Employee
                </Link>
                <Link
                  to="/view-employees"
                  className={`submenu-item ${isActive("/view-employees") ? "active" : ""}`}
                  onClick={closeSidebarMobile}
                >
                  <span className="submenu-icon">👀</span>
                  View Employees
                </Link>
                <Link
                  to="/employee-reports"
                  className={`submenu-item ${isActive("/employee-reports") ? "active" : ""}`}
                  onClick={closeSidebarMobile}
                >
                  <span className="submenu-icon">📈</span>
                  Employee Reports
                </Link>
              </div>
            </div>

            <Link 
              to="/leave" 
              className={`nav-item ${isActive("/leave") ? "active" : ""}`}
              onClick={closeSidebarMobile}
            >
              <span className="nav-icon">🏖️</span>
              <span className="nav-text">Leave Management</span>
            </Link>

            <Link 
              to="/payroll" 
              className={`nav-item ${isActive("/payroll") ? "active" : ""}`}
              onClick={closeSidebarMobile}
            >
              <span className="nav-icon">💰</span>
              <span className="nav-text">Payroll System</span>
            </Link>
          </div>

          <div className="nav-section">
            <span className="section-label">ADMINISTRATION</span>
            
            <Link 
              to="/reports" 
              className={`nav-item ${isActive("/reports") ? "active" : ""}`}
              onClick={closeSidebarMobile}
            >
              <span className="nav-icon">📋</span>
              <span className="nav-text">Reports & Analytics</span>
            </Link>

            <Link 
              to="/settings" 
              className={`nav-item ${isActive("/settings") ? "active" : ""}`}
              onClick={closeSidebarMobile}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">System Settings</span>
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}