// client/src/pages/supervisor/Reports.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import StatsCard from "../../components/supervisor/StatsCard";
import "./SupervisorPages.css";

const REPORT_CARDS = [
  { key: "staffCount",       label: "Total Staff",         icon: "👥", color: "#0f766e" },
  { key: "patientCount",     label: "Unique Patients",     icon: "🧑‍⚕️", color: "#0ea5e9" },
  { key: "appointmentCount", label: "Scan Appointments",   icon: "🗓️", color: "#7c3aed" },
  { key: "homeServiceCount", label: "Home Service Bookings",icon: "🏠", color: "#d97706" },
];

export default function Reports() {
  const [counts,  setCounts]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    supervisorApi
      .getReports()
      .then(setCounts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Reports</h1>
        <p className="sv-page-sub">Summary counts for your branch</p>
      </div>

      {loading && <div className="sv-loading">Loading reports...</div>}
      {error   && <div className="sv-error">{error}</div>}

      {counts && (
        <div className="sv-reports-grid">
          {REPORT_CARDS.map((card) => (
            <StatsCard
              key={card.key}
              label={card.label}
              value={counts[card.key]}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
