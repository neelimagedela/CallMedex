// client/src/components/supervisor/PatientTable.jsx
import React from "react";
import { STATUS_CONFIG } from "../../utils/statusConfig";
import "./PatientTable.css";

const formatService = (service) => {
  if (!service) return "—";
  try {
    const parsed = typeof service === "string" ? JSON.parse(service) : service;
    if (Array.isArray(parsed)) {
      return parsed
        .map((s) => (typeof s === "object" ? s.name || s.label || s.test_name || JSON.stringify(s) : s))
        .join(", ");
    }
    if (typeof parsed === "object") return parsed.name || parsed.label || parsed.test_name || JSON.stringify(parsed);
    return String(parsed);
  } catch {
    return String(service);
  }
};

const getBookingTypeLabel = (type) => {
  switch (type) {
    case "home_service":
      return "Home Service";
    case "scan_appointment":
      return "Scan Appointment";
    case "walkin_center":
    case "walkin_center":
      return "Walk-in Center";
    case "diagnostic_package":
      return "Diagnostic Package";
    case "clinic_appointment":
      return "Clinic Appointment";
    default:
      return type ? type.replace("_", " ").replace("-", " ") : "—";
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
            <th>Patient Details</th>
            <th>Booking Type</th>
            <th>Service / Test</th>
            <th>Receipt ID</th>
            <th>Status</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((row, idx) => {
            const statusKey = row.status?.toLowerCase() || "pending";
            const statusCfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;
            return (
              <tr key={`${row.bookingId || row.receiptId}-${idx}`}>
                <td>{idx + 1}</td>
                <td>
                  <div className="sv-td-bold">{row.patientName || "—"}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {row.patientEmail || "—"} · {row.patientMobile || "—"}
                  </div>
                </td>
                <td>
                  <span className="sv-type-pill">
                    {getBookingTypeLabel(row.bookingType)}
                  </span>
                </td>
                <td style={{ maxWidth: "300px" }}>{formatService(row.service)}</td>
                <td className="sv-receipt">{row.bookingId || row.receiptId || "—"}</td>
                <td>
                  <span
                    className="sv-status-badge"
                    style={{ background: statusCfg.bg, color: statusCfg.text }}
                  >
                    {statusCfg.label}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>
                    {row.date ? new Date(row.date).toLocaleDateString("en-IN") : "—"}
                  </div>
                  {row.timeSlot && (
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {row.timeSlot}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
