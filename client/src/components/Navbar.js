// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h3 className="page-title">Dashboard</h3>
      </div>

      <div className="header-right">
        <span className="user-name">Admin</span>
        <img src="https://via.placeholder.com/36" alt="profile" className="avatar" />
      </div>
    </header>
  );
}
