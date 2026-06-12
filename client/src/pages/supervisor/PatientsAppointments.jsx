// client/src/pages/supervisor/PatientsAppointments.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import PatientTable from "../../components/supervisor/PatientTable";
import "./SupervisorPages.css";

export default function PatientsAppointments() {
  const [patients, setPatients] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    supervisorApi
      .getPatients()
      .then(setPatients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? patients.filter((p) =>
        p.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        p.receiptId?.toLowerCase().includes(search.toLowerCase())
      )
    : patients;

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Patients & Appointments</h1>
        <p className="sv-page-sub">All bookings (scan appointments + home services + walkin centers) for your branch</p>
      </div>

      <div className="sv-search-bar">
        <input
          type="text"
          placeholder="Search by patient name or receipt ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sv-search-input"
        />
      </div>

      {error && <div className="sv-error">{error}</div>}

      <PatientTable patients={filtered} loading={loading} />
    </div>
  );
}
