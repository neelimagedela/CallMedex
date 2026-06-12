// client/src/pages/supervisor/SupervisorShell.jsx
//
// This is the top-level shell for the Supervisor Dashboard.
// It owns the sidebar + page-area layout and handles navigation between sub-pages.
// Import and render this in App.jsx when user.role === "supervisor".
//
import React, { useState } from "react";
import SupervisorSidebar from "../../components/supervisor/SupervisorSidebar";
import SupervisorDashboard from "./SupervisorDashboard";
import StaffManagement from "./StaffManagement";
import Phlebotomists from "./Phlebotomists";
import PatientsAppointments from "./PatientsAppointments";
import OrganizationProfile from "./OrganizationProfile";
import Reports from "./Reports";
import "./SupervisorShell.css";

const PAGE_COMPONENTS = {
  dashboard: SupervisorDashboard,
  staff: StaffManagement,
  phlebos: Phlebotomists,
  patients: PatientsAppointments,
  profile: OrganizationProfile,
  reports: Reports,
};

export default function SupervisorShell({ user, setPage, setIsLoggedIn, setUser }) {
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setPage("home");
  };

  const ActivePage = PAGE_COMPONENTS[activePage] || SupervisorDashboard;

  return (
    <div className="sv-shell">
      <SupervisorSidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        orgName={user?.branch || user?.name}
      />
      <main className="sv-shell-main">
        <ActivePage />
      </main>
    </div>
  );
}
