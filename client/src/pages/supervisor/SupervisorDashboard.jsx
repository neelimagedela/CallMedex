// client/src/pages/supervisor/SupervisorDashboard.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import DashboardCards from "../../components/supervisor/DashboardCards";
import "./SupervisorPages.css";

export default function SupervisorDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    supervisorApi
      .getDashboard()
      .then(setSummary)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Dashboard</h1>
        <p className="sv-page-sub">Overview of your branch's activity</p>
      </div>

      {loading && <div className="sv-loading">Loading dashboard...</div>}
      {error   && <div className="sv-error">{error}</div>}
      {summary  && <DashboardCards summary={summary} />}
    </div>
  );
}
