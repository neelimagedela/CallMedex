// client/src/pages/supervisor/PatientsAppointments.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import PatientTable from "../../components/supervisor/PatientTable";
import "./SupervisorPages.css";

export default function PatientsAppointments({ initialSearch }) {
  const [patients, setPatients] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState(initialSearch || "");

  // Update search state if parent initialSearch changes
  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);

  const loadPatients = (searchTerm) => {
    setLoading(true);
    setError(null);
    supervisorApi
      .getPatients(searchTerm)
      .then(setPatients)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Debounced load on search input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      loadPatients(search);
    }, 250);
    return () => clearTimeout(handler);
  }, [search]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await supervisorApi.updatePhleboBookingStatus(bookingId, newStatus);
      // Reload current search list to reflect DB changes
      loadPatients(search);
    } catch (err) {
      alert(err.message || "Failed to update booking status.");
    }
  };

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Patients & Appointments</h1>
        <p className="sv-page-sub">All bookings (scan appointments + home services + walkin centers) for your branch</p>
      </div>

      <div className="sv-search-bar">
        <input
          type="text"
          placeholder="Search by patient name, email, mobile, or booking ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sv-search-input"
        />
      </div>

      {error && <div className="sv-error">{error}</div>}

      <PatientTable patients={patients} loading={loading} onStatusChange={handleStatusChange} />
    </div>
  );
}
