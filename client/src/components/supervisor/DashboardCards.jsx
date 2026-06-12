// client/src/components/supervisor/DashboardCards.jsx
import React from "react";
import StatsCard from "./StatsCard";
import "./DashboardCards.css";

const CARD_CONFIG = [
  { key: "totalStaff",        label: "Total Staff",        icon: "👥", color: "#0f766e" },
  { key: "pendingStaff",      label: "Pending Approval",   icon: "⏳", color: "#d97706" },
  { key: "approvedStaff",     label: "Approved Staff",     icon: "✅", color: "#16a34a" },
  { key: "totalPatients",     label: "Total Patients",     icon: "🧑‍⚕️", color: "#0ea5e9" },
  { key: "totalAppointments", label: "Appointments",       icon: "🗓️", color: "#7c3aed" },
  { key: "totalPhlebos",      label: "Phlebotomists",      icon: "🩸", color: "#db2777" },
  { key: "activePhlebos",     label: "Active Phlebos",     icon: "🟢", color: "#16a34a" },
];

export default function DashboardCards({ summary }) {
  return (
    <div className="sv-dashboard-cards">
      {CARD_CONFIG.map((card) => (
        <StatsCard
          key={card.key}
          label={card.label}
          value={summary?.[card.key]}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
}
