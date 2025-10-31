import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Employee from "./pages/Employee";
import Sidebar from "./components/Sidebar";
import "./global.css";
import EmployeeView from "./pages/components/ViewEmployees";

function App() {
  // Don't show sidebar on login and register pages
  const showSidebar = window.location.pathname !== "/" && window.location.pathname !== "/register";

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />}
      <div className={`main-content ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/view-employees" element={<EmployeeView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
