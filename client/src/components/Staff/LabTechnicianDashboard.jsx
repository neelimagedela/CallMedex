import React, { useEffect, useMemo, useState } from "react";
import "../../styles/index.css";
import { getLabTechnicianDashboard, updateWalkinStatus } from "./staff.api";

const tabs = [
  { key: "samples",         label: "Samples",        icon: "🧪", desc: "Pending / Confirmed" },
  { key: "sample_received", label: "Sample Received", icon: "📥", desc: "Sample collected" },
  { key: "reports_ready",   label: "Reports Ready",   icon: "📋", desc: "Processing / Report ready" },
  { key: "completed",       label: "Completed",       icon: "✅", desc: "Fully completed" },
];

const SOURCE_COLORS = {
  "Home Service":       { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Diagnostic Walk-in": { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
};

const STATUS_COLORS = {
  pending:          { bg: "#fef3c7", color: "#92400e" },
  confirmed:        { bg: "#dbeafe", color: "#1e40af" },
  assigned:         { bg: "#dbeafe", color: "#1e40af" },
  accepted:         { bg: "#d1fae5", color: "#065f46" },
  sample_received:  { bg: "#cffafe", color: "#155e75" },
  submitted_to_lab: { bg: "#e0e7ff", color: "#3730a3" },
  processing:       { bg: "#fef9c3", color: "#854d0e" },
  report_ready:     { bg: "#dcfce7", color: "#14532d" },
  completed:        { bg: "#ede9fe", color: "#5b21b6" },
  cancelled:        { bg: "#fee2e2", color: "#991b1b" },
};

const ACTION_BUTTON = {
  pending:          { label: "✔ Mark Sample Received",  next: "sample_received" },
  confirmed:        { label: "✔ Mark Sample Received",  next: "sample_received" },
  sample_received:  { label: "⚙ Mark Processing Done",  next: "report_ready"    },
  report_ready:     { label: "✅ Mark Completed",        next: "completed"       },
};

const fmt = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt) ? "—" : dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const fmtDatetime = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt) ? "—" : dt.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
};

export default function LabTechnicianDashboard({ setPage }) {
  const [activeTab, setActiveTab] = useState("samples");
  const [branch, setBranch]       = useState("");
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [updating, setUpdating]   = useState(null); // rawId being updated

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getLabTechnicianDashboard();
      setBranch(data.branch || "");
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load lab technician dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  const visibleBookings = useMemo(
    () => bookings.filter((b) => b.labStatus === activeTab),
    [activeTab, bookings]
  );

  const countOf = (key) => bookings.filter((b) => b.labStatus === key).length;

  const handleStatusUpdate = async (booking) => {
    const action = ACTION_BUTTON[booking.status?.toLowerCase()];
    if (!action) return;

    setUpdating(booking.rawId);
    try {
      await updateWalkinStatus(booking.rawId, booking.status);
      // update locally so UI reflects immediately without full reload
      setBookings((prev) =>
        prev.map((b) =>
          b.rawId === booking.rawId
            ? { ...b, status: action.next, labStatus: mapLabStatus(action.next) }
            : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const mapLabStatus = (status = "") => {
    const v = status.toLowerCase();
    if (["pending", "confirmed", "assigned", "accepted"].includes(v)) return "samples";
    if (["sample_received", "submitted_to_lab"].includes(v)) return "sample_received";
    if (["processing", "report_ready"].includes(v)) return "reports_ready";
    if (v === "completed") return "completed";
    return "samples";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setPage("login");
  };

  return (
    <main className="lab-tech-page">

      {/* Header */}
      <section className="lab-tech-hero">
        <div className="lab-tech-hero-top">
          <div>
            <p className="lab-tech-label">Staff Module · Lab Technician</p>
            <h1 style={{ fontSize: 36, marginBottom: 8 }}>Lab Technician Dashboard</h1>
            <p style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{
                background: "#0891b2", color: "#fff",
                borderRadius: 999, padding: "4px 14px",
                fontSize: 13, fontWeight: 800,
              }}>
                📍 {branch || "—"}
              </span>
              Showing walk-in and home service bookings for your branch only.
            </p>
          </div>
          <div className="lab-tech-header-actions">
            <button type="button" onClick={() => setPage("home")}>🏠 Go Home</button>
            <button type="button" className="lab-tech-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="lab-button-panel">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`lab-main-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>{tab.icon}</span>
            {tab.label}
            <span>{countOf(tab.key)}</span>
            <small style={{ display: "block", marginTop: 6, fontSize: 11, fontWeight: 600, opacity: 0.7 }}>
              {tab.desc}
            </small>
          </button>
        ))}
      </section>

      {/* Panel */}
      <section className="lab-tech-panel">
        <div className="lab-tech-panel-header" style={{ marginBottom: 20 }}>
          <h2>{tabs.find((t) => t.key === activeTab)?.label}</h2>
          <p>{branch} branch · {visibleBookings.length} booking{visibleBookings.length !== 1 ? "s" : ""}</p>
        </div>

        {loading && (
          <div className="lab-empty-box">
            <h3>Loading bookings…</h3>
            <p>Fetching branch data from server.</p>
          </div>
        )}

        {!loading && error && (
          <div className="lab-empty-box" style={{ borderColor: "#fca5a5", background: "#fff5f5" }}>
            <h3 style={{ color: "#991b1b" }}>Could not load dashboard</h3>
            <p style={{ color: "#b91c1c" }}>{error}</p>
            <button
              type="button"
              onClick={loadDashboard}
              style={{
                marginTop: 16, border: "none", borderRadius: 12,
                padding: "10px 20px", background: "#06142e",
                color: "#fff", fontWeight: 800, cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && visibleBookings.length === 0 && (
          <div className="lab-empty-box">
            <h3>No bookings found</h3>
            <p>No patient bookings in this section for {branch}.</p>
          </div>
        )}

        {!loading && !error && visibleBookings.length > 0 && (
          <div className="lab-tech-task-list">
            {visibleBookings.map((booking) => {
              const srcStyle = SOURCE_COLORS[booking.source] || SOURCE_COLORS["Home Service"];
              const stStyle  = STATUS_COLORS[booking.status?.toLowerCase()] || { bg: "#f1f5f9", color: "#475569" };
              const action   = booking.source === "Diagnostic Walk-in"
                ? ACTION_BUTTON[booking.status?.toLowerCase()]
                : null;
              const isBusy   = updating === booking.rawId;

              return (
                <article className="lab-tech-task-card" key={booking.id}>

                  {/* top row */}
                  <div className="lab-tech-task-top">
                    <div>
                      <h3 style={{ marginBottom: 4 }}>{booking.patientName}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", fontWeight: 700 }}>#{booking.bookingId}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{
                        padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800,
                        background: srcStyle.bg, color: srcStyle.color, border: `1px solid ${srcStyle.border}`,
                      }}>
                        {booking.source}
                      </span>
                      <span style={{
                        padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800,
                        background: stStyle.bg, color: stStyle.color,
                      }}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* details */}
                  <div className="lab-tech-details-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                    <div><span>Branch</span><strong>{booking.branch}</strong></div>
                    <div><span>Collection Date</span><strong>{fmt(booking.date)}</strong></div>
                    <div><span>Time Slot</span><strong>{booking.timeSlot || "—"}</strong></div>
                    <div><span>Booked At</span><strong style={{ fontSize: 13 }}>{fmtDatetime(booking.createdAt)}</strong></div>
                    <div><span>Mobile</span><strong>{booking.mobile || "—"}</strong></div>
                    <div><span>Email</span><strong style={{ fontSize: 13 }}>{booking.email || "—"}</strong></div>
                    <div><span>Amount</span><strong>₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}</strong></div>
                  </div>

                  {/* tests */}
                  <div className="lab-tech-tests">
                    <span>Selected Tests</span>
                    <div>
                      {booking.tests?.length > 0 ? (
                        booking.tests.map((test, i) => (
                          <small key={`${booking.id}-${i}`}>{test}</small>
                        ))
                      ) : (
                        <small>No tests listed</small>
                      )}
                    </div>
                  </div>

                  {/* action button — only for walk-in, only if there's a next status */}
                  {action && (
                    <div style={{ marginTop: 16 }}>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleStatusUpdate(booking)}
                        style={{
                          border: "none", borderRadius: 14,
                          padding: "12px 24px", fontWeight: 800,
                          fontSize: 14, cursor: isBusy ? "not-allowed" : "pointer",
                          background: isBusy ? "#94a3b8" : "#06142e",
                          color: "#ffffff", transition: "0.2s",
                        }}
                      >
                        {isBusy ? "Updating…" : action.label}
                      </button>
                    </div>
                  )}

                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}