// client/src/components/supervisor/PatientTable.jsx
import React from "react";
import "./PatientTable.css";

const STATUS_STYLES = {
  pending:   { bg: "#fef9c3", color: "#854d0e" },
  confirmed: { bg: "#d1fae5", color: "#065f46" },
  completed: { bg: "#dbeafe", color: "#1e40af" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

const formatService = (service) => {
  if (!service) return "—";
  try {
    const parsed = typeof service === "string" ? JSON.parse(service) : service;
    if (Array.isArray(parsed)) {
      return parsed
        .map((s) => (typeof s === "object" ? s.name || s.label || JSON.stringify(s) : s))
        .join(", ");
    }
    if (typeof parsed === "object") return parsed.name || JSON.stringify(parsed);
    return String(parsed);
  } catch {
    return String(service);
  }
};

export default function PatientTable({ patients, loading }) {
  if (loading) return <div className="sv-table-empty">Loading appointments...</div>;
  if (!patients?.length) return <div className="sv-table-empty">No appointments found.</div>;

  return (
    <div className="sv-table-wrapper">
      <table className="sv-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Service / Test</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Receipt ID</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((row, idx) => {
            const statusKey = row.status?.toLowerCase() || "pending";
            const style = STATUS_STYLES[statusKey] || STATUS_STYLES.pending;
            return (
              <tr key={`${row.receiptId}-${idx}`}>
                <td>{idx + 1}</td>
                <td className="sv-td-bold">{row.patientName || "—"}</td>
                <td>{formatService(row.service)}</td>
                <td>{row.date ? new Date(row.date).toLocaleDateString("en-IN") : "—"}</td>
                <td>
                  <span className="sv-type-pill">
  {row.type === "home_service"
    ? "Home Service"
    : row.type === "walkin_center"
    ? "Walk-in Center"
    : "Scan Appointment"}
</span>
                </td>
                <td>
                  <span
                    className="sv-status-badge"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {row.status || "pending"}
                  </span>
                </td>
                <td className="sv-receipt">{row.receiptId || "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
