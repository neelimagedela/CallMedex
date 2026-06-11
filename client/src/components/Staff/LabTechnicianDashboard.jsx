import React, { useEffect, useMemo, useState } from "react";
import "../../styles/index.css";
import {
  getLabTechnicianDashboard,
  updateWalkinStatus,
  updateHomeServiceStatus,
  uploadReport,
} from "./staff.api";

const tabs = [
  { key: "samples",         label: "Samples",        icon: "🧪", desc: "Pending / Assigned / Accepted" },
  { key: "sample_received", label: "Sample Received", icon: "📥", desc: "Collected / Submitted to lab" },
  { key: "reports_ready",   label: "Reports Ready",   icon: "📋", desc: "Processing / Report ready" },
  { key: "completed",       label: "Completed",       icon: "✅", desc: "Fully completed" },
  { key: "rejected",        label: "Rejected",        icon: "❌", desc: "Sample rejected by lab" },
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
  sample_collected: { bg: "#cffafe", color: "#155e75" },
  submitted_to_lab: { bg: "#e0e7ff", color: "#3730a3" },
  sample_received:  { bg: "#cffafe", color: "#155e75" },
  processing:       { bg: "#fef9c3", color: "#854d0e" },
  report_ready:     { bg: "#dcfce7", color: "#14532d" },
  completed:        { bg: "#ede9fe", color: "#5b21b6" },
  sample_rejected:  { bg: "#fee2e2", color: "#991b1b" },
  cancelled:        { bg: "#f1f5f9", color: "#475569" },
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

const mapLabStatus = (status = "") => {
  const v = status.toLowerCase();
  if (["pending", "confirmed", "assigned", "accepted"].includes(v)) return "samples";
  if (["sample_collected", "submitted_to_lab"].includes(v))         return "sample_received";
  if (["processing", "report_ready"].includes(v))                   return "reports_ready";
  if (v === "completed")                                            return "completed";
  if (v === "sample_rejected")                                      return "rejected";
  return "samples";
};

export default function LabTechnicianDashboard({ setPage }) {
  const [activeTab, setActiveTab] = useState("samples");
  const [branch, setBranch]       = useState("");
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [updating, setUpdating]   = useState(null);
  const [uploading, setUploading] = useState(null);

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

  const updateBookingLocally = (rawId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.rawId === rawId
          ? { ...b, status: newStatus, labStatus: mapLabStatus(newStatus) }
          : b
      )
    );
  };

  const handleWalkinAction = async (booking) => {
    const NEXT = {
      pending: "sample_received", confirmed: "sample_received",
      sample_received: "report_ready", report_ready: "completed",
    };
    const next = NEXT[booking.status?.toLowerCase()];
    if (!next) return;
    setUpdating(booking.rawId);
    try {
      await updateWalkinStatus(booking.rawId, booking.status);
      updateBookingLocally(booking.rawId, next);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };

  const handleHomeAccept = async (booking) => {
    setUpdating(`accept-${booking.rawId}`);
    try {
      await updateHomeServiceStatus(booking.rawId, booking.status, "accept");
      updateBookingLocally(booking.rawId, "processing");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept.");
    } finally {
      setUpdating(null);
    }
  };

  const handleHomeReject = async (booking) => {
    if (!window.confirm(`Reject samples for ${booking.patientName}? The phlebo will need to recollect.`)) return;
    setUpdating(`reject-${booking.rawId}`);
    try {
      await updateHomeServiceStatus(booking.rawId, booking.status, "reject");
      updateBookingLocally(booking.rawId, "sample_rejected");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject.");
    } finally {
      setUpdating(null);
    }
  };

  const handleHomeProgress = async (booking) => {
    const NEXT = { processing: "report_ready", report_ready: "completed" };
    const next = NEXT[booking.status?.toLowerCase()];
    if (!next) return;
    setUpdating(booking.rawId);
    try {
      await updateHomeServiceStatus(booking.rawId, booking.status, "accept");
      updateBookingLocally(booking.rawId, next);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update.");
    } finally {
      setUpdating(null);
    }
  };

  const handleUploadReport = async (booking, file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    setUploading(booking.rawId);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const bookingType = booking.source === "Home Service" ? "home_service" : "walkin";
          await uploadReport(booking.rawId, bookingType, e.target.result, file.name);
          alert("Report uploaded successfully. Patient can now view it in Previous Bookings.");
        } catch (err) {
          alert(err.response?.data?.message || "Upload failed.");
        } finally {
          setUploading(null);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(null);
    }
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
      <section className="lab-button-panel" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`lab-main-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span style={{ fontSize: 22, display: "block", marginBottom: 6 }}>{tab.icon}</span>
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
            <button type="button" onClick={loadDashboard} style={{
              marginTop: 16, border: "none", borderRadius: 12,
              padding: "10px 20px", background: "#06142e",
              color: "#fff", fontWeight: 800, cursor: "pointer",
            }}>Retry</button>
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
              const isWalkin = booking.source === "Diagnostic Walk-in";
              const isHome   = booking.source === "Home Service";
              const busy     = updating === booking.rawId;

              return (
                <article className="lab-tech-task-card" key={booking.id}>

                  {/* top */}
                  <div className="lab-tech-task-top">
                    <div>
                      <h3 style={{ marginBottom: 4 }}>{booking.patientName}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", fontWeight: 700 }}>#{booking.bookingId}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{
                        padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800,
                        background: srcStyle.bg, color: srcStyle.color, border: `1px solid ${srcStyle.border}`,
                      }}>{booking.source}</span>
                      <span style={{
                        padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 800,
                        background: stStyle.bg, color: stStyle.color,
                      }}>{booking.status}</span>
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
                      {booking.tests?.length > 0
                        ? booking.tests.map((t, i) => <small key={i}>{t}</small>)
                        : <small>No tests listed</small>}
                    </div>
                  </div>

                  {/* actions */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>

                    {/* walkin progression */}
                    {isWalkin && ["pending","confirmed","sample_received","report_ready"].includes(booking.status?.toLowerCase()) && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleWalkinAction(booking)}
                        style={{
                          border: "none", borderRadius: 12, padding: "10px 20px",
                          fontWeight: 800, fontSize: 13, cursor: busy ? "not-allowed" : "pointer",
                          background: busy ? "#94a3b8" : "#06142e", color: "#fff",
                        }}
                      >
                        {busy ? "Updating…" : {
                          pending: "✔ Mark Sample Received",
                          confirmed: "✔ Mark Sample Received",
                          sample_received: "⚙ Mark Processing Done",
                          report_ready: "✅ Mark Completed",
                        }[booking.status?.toLowerCase()]}
                      </button>
                    )}

                    {/* home service — accept/reject at submitted_to_lab */}
                    {isHome && booking.status?.toLowerCase() === "submitted_to_lab" && (
                      <>
                        <button
                          type="button"
                          disabled={updating === `accept-${booking.rawId}`}
                          onClick={() => handleHomeAccept(booking)}
                          style={{
                            border: "none", borderRadius: 12, padding: "10px 20px",
                            fontWeight: 800, fontSize: 13, cursor: "pointer",
                            background: "#166534", color: "#fff",
                          }}
                        >
                          {updating === `accept-${booking.rawId}` ? "Accepting…" : "✔ Accept Samples"}
                        </button>
                        <button
                          type="button"
                          disabled={updating === `reject-${booking.rawId}`}
                          onClick={() => handleHomeReject(booking)}
                          style={{
                            border: "none", borderRadius: 12, padding: "10px 20px",
                            fontWeight: 800, fontSize: 13, cursor: "pointer",
                            background: "#991b1b", color: "#fff",
                          }}
                        >
                          {updating === `reject-${booking.rawId}` ? "Rejecting…" : "✖ Reject Samples"}
                        </button>
                      </>
                    )}

                    {/* home service — progression after accept */}
                    {isHome && ["processing", "report_ready"].includes(booking.status?.toLowerCase()) && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => handleHomeProgress(booking)}
                        style={{
                          border: "none", borderRadius: 12, padding: "10px 20px",
                          fontWeight: 800, fontSize: 13, cursor: busy ? "not-allowed" : "pointer",
                          background: busy ? "#94a3b8" : "#06142e", color: "#fff",
                        }}
                      >
                        {busy ? "Updating…" : booking.status?.toLowerCase() === "processing"
                          ? "📋 Mark Reports Ready"
                          : "✅ Mark Completed"}
                      </button>
                    )}

                    {/* PDF upload — show on reports_ready tab for both types */}
                    {activeTab === "reports_ready" && (
                      <label style={{
                        display: "inline-block", borderRadius: 12, padding: "10px 20px",
                        fontWeight: 800, fontSize: 13, cursor: "pointer",
                        background: uploading === booking.rawId ? "#94a3b8" : "#0891b2",
                        color: "#fff",
                      }}>
                        {uploading === booking.rawId ? "Uploading…" : "📎 Upload Report PDF"}
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: "none" }}
                          disabled={uploading === booking.rawId}
                          onChange={(e) => handleUploadReport(booking, e.target.files[0])}
                        />
                      </label>
                    )}

                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}