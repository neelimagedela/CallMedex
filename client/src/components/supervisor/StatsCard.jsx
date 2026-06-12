// client/src/components/supervisor/StatsCard.jsx
import React from "react";
import "./StatsCard.css";

export default function StatsCard({ label, value, icon, color = "#1B6CA8" }) {
  return (
    <div className="sv-stats-card" style={{ "--card-color": color }}>
      <div className="sv-stats-icon">{icon}</div>
      <div className="sv-stats-body">
        <div className="sv-stats-value">{value ?? "—"}</div>
        <div className="sv-stats-label">{label}</div>
      </div>
    </div>
  );
}
