// client/src/components/supervisor/SupervisorSidebar.jsx
import React from "react";
import "./SupervisorSidebar.css";
import logo from "../../assets/logo_medex.png";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "staff", label: "Staff Management", icon: "👥" },
  { key: "phlebos", label: "Phlebotomists", icon: "🩸" },
  { key: "patients", label: "Patients & Appointments", icon: "🗓️" },
  { key: "profile", label: "Organization Profile", icon: "🏥" },
  { key: "reports", label: "Reports", icon: "📈" },
];

export default function SupervisorSidebar({ activePage, onNavigate, onLogout, orgName }) {
  return (
    <aside className="sv-sidebar">
      <div className="sv-sidebar-brand">
  <div className="sv-brand-title">
    CallMedex
  </div>

  <div className="sv-brand-sub">
    Supervisor Portal
  </div>
</div>


      {orgName && (
        <div className="sv-org-badge">{orgName}</div>
      )}

      <nav className="sv-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sv-nav-item ${activePage === item.key ? "sv-nav-active" : ""}`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="sv-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="sv-logout-btn" onClick={onLogout}>
        <span>🚪</span> Logout
      </button>
    </aside>
  );
}
