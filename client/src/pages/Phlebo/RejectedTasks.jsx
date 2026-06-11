import React, { useEffect, useState } from "react";
import { XCircle, FlaskConical, Phone, MapPin } from "lucide-react";
import { phleboApi } from "./phlebo.api";

const formatDate = (value) => {
  if (!value) return "Date not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getTestName = (test) => {
  if (!test) return "Test";
  if (typeof test === "string") return test;
  return test.name || test.test_name || test.testName || "Test";
};

const RejectedTasks = () => {
  const [tasks, setTasks]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [resubmitting, setResubmitting] = useState(null);

  const fetchRejected = async () => {
    try {
      setLoading(true);
      const res = await phleboApi.getRejectedBookings();
      setTasks(res.data?.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to load rejected collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRejected(); }, []);

  const handleResubmit = async (taskId) => {
    if (!window.confirm("Resubmit this booking to the lab?")) return;
    setResubmitting(taskId);
    try {
      await phleboApi.resubmitBooking(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      alert("Resubmitted successfully. Lab technician will review again.");
    } catch (err) {
      alert(err.response?.data?.message || "Resubmit failed.");
    } finally {
      setResubmitting(null);
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}><p style={{ color: "#64748b" }}>Loading rejected collections...</p></div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>Rejected Samples</h2>

      {tasks.length === 0 && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>
          No rejected collections.
        </div>
      )}

      {tasks.map((task) => (
        <div key={task.id} style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #fecaca", marginBottom: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "14px", marginBottom: "12px", flexWrap: "wrap" }}>
            <div>
              <strong style={{ color: "#0f172a", fontSize: "18px" }}>
                {task.publicBookingId || task.public_booking_id || `HS-${task.id}`}
              </strong>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                Rejected On: {formatDate(task.updatedAt || task.updated_at)}
              </p>
            </div>
            <span style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 999, padding: "6px 14px", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <XCircle size={14} /> Sample Rejected
            </span>
          </div>

          <p style={{ margin: "8px 0", color: "#1e293b", fontWeight: 700 }}>
            {task.patientName || task.patient_name}
          </p>

          <p style={{ margin: "6px 0", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
            <Phone size={15} />
            {task.patientMobile || task.patient_mobile || "No mobile"}
          </p>

          <p style={{ margin: "6px 0 12px", color: "#64748b", display: "flex", alignItems: "flex-start", gap: "6px" }}>
            <MapPin size={15} />
            {task.patientAddress || task.patient_address || "No address"}
          </p>

          <div style={{ marginTop: "12px", background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <strong style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0f172a" }}>
              <FlaskConical size={16} /> Tests
            </strong>
            {task.tests?.length ? (
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                {task.tests.map((test, i) => <li key={i}>{getTestName(test)}</li>)}
              </ul>
            ) : (
              <p style={{ color: "#64748b" }}>No test details.</p>
            )}
          </div>

          <button
            type="button"
            disabled={resubmitting === task.id}
            onClick={() => handleResubmit(task.id)}
            style={{ marginTop: 16, border: "none", borderRadius: 10, padding: "12px 20px", fontWeight: 800, fontSize: 14, cursor: resubmitting === task.id ? "not-allowed" : "pointer", background: resubmitting === task.id ? "#94a3b8" : "#0f172a", color: "#fff" }}
          >
            {resubmitting === task.id ? "Resubmitting..." : "🔄 Resubmit to Lab"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RejectedTasks;