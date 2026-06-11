import React, { useEffect, useMemo, useState } from "react";
import "../../styles/index.css";

import {
  getLabTechnicianDashboard,
  updateWalkinStatus,
  updateHomeServiceStatus,
  uploadReport,
} from "./staff.api";

const tabs = [
  { key: "samples", label: "Samples" },
  { key: "sample_received", label: "Sample Received" },
  { key: "reports_ready", label: "Reports Ready" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

const SOURCE_COLORS = {
  "Home Service": {
    bg: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe",
  },
  "Diagnostic Walk-in": {
    bg: "#f0fdf4",
    color: "#166534",
    border: "#bbf7d0",
  },
};

const STATUS_COLORS = {
  pending: { bg: "#fef3c7", color: "#92400e" },
  confirmed: { bg: "#dbeafe", color: "#1e40af" },
  assigned: { bg: "#dbeafe", color: "#1e40af" },
  accepted: { bg: "#d1fae5", color: "#065f46" },
  sample_collected: { bg: "#cffafe", color: "#155e75" },
  submitted_to_lab: { bg: "#e0e7ff", color: "#3730a3" },
  sample_received: { bg: "#cffafe", color: "#155e75" },
  processing: { bg: "#fef9c3", color: "#854d0e" },
  report_ready: { bg: "#dcfce7", color: "#14532d" },
  completed: { bg: "#ede9fe", color: "#5b21b6" },
  sample_rejected: { bg: "#fee2e2", color: "#991b1b" },
  cancelled: { bg: "#f1f5f9", color: "#475569" },
};

const fmt = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fmtDatetime = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const mapLabStatus = (status = "") => {
  const value = String(status).toLowerCase();

  if (["pending", "confirmed", "assigned", "accepted"].includes(value)) {
    return "samples";
  }

  if (["sample_collected", "submitted_to_lab"].includes(value)) {
    return "sample_received";
  }

  if (["processing", "report_ready"].includes(value)) {
    return "reports_ready";
  }

  if (value === "completed") {
    return "completed";
  }

  if (value === "sample_rejected") {
    return "rejected";
  }

  return "samples";
};

const getStatusColor = (status) => {
  return STATUS_COLORS[String(status || "").toLowerCase()] || STATUS_COLORS.pending;
};

const getSourceColor = (source) => {
  return SOURCE_COLORS[source] || SOURCE_COLORS["Diagnostic Walk-in"];
};

const getActionLabel = (booking) => {
  const status = String(booking.status || "").toLowerCase();

  if (booking.source === "Home Service") {
    if (status === "submitted_to_lab") return "Accept Samples";
    if (status === "processing") return "Mark Reports Ready";
    if (status === "report_ready") return "Mark Completed";
    return null;
  }

  if (booking.source === "Diagnostic Walk-in") {
    if (status === "pending" || status === "confirmed") return "Accept Samples";
    if (status === "sample_received") return "Mark Reports Ready";
    if (status === "report_ready") return "Mark Completed";
    return null;
  }

  return null;
};

export default function LabTechnicianDashboard({ setPage }) {
  const [branch, setBranch] = useState("");
  const [staffProfile, setStaffProfile] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState("samples");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLabTechnicianDashboard();

      setBranch(data.branch || "");
      setStaffProfile(data.staffProfile || null);
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load lab technician dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const counts = useMemo(() => {
    const base = {
      samples: 0,
      sample_received: 0,
      reports_ready: 0,
      completed: 0,
      rejected: 0,
    };

    bookings.forEach((booking) => {
      const key = booking.labStatus || mapLabStatus(booking.status);
      base[key] = (base[key] || 0) + 1;
    });

    return base;
  }, [bookings]);

  const visibleBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const bookingTab = booking.labStatus || mapLabStatus(booking.status);

      if (bookingTab !== activeTab) return false;

      if (!query) return true;

      return [
        booking.bookingId,
        booking.patientName,
        booking.mobile,
        booking.email,
        booking.bookedAccountEmail,
        booking.bookedAccountName,
        booking.source,
        booking.branch,
        booking.status,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [activeTab, bookings, search]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    if (setPage) {
      setPage("login");
    } else {
      window.location.reload();
    }
  };

  const handleStatusUpdate = async (booking, action = "next") => {
    const key = `${booking.source}-${booking.rawId}-${action}`;

    try {
      setActionLoading(key);

      if (booking.source === "Home Service") {
        await updateHomeServiceStatus(booking.rawId, booking.status, action);
      } else {
        await updateWalkinStatus(booking.rawId, booking.status);
      }

      await loadDashboard();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to update status.");
    } finally {
      setActionLoading("");
    }
  };

  const handleUploadReport = async (booking, file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    setUploading(`${booking.source}-${booking.rawId}`);

    try {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const bookingType =
            booking.source === "Home Service" ? "home_service" : "walkin";

          await uploadReport(
            booking.rawId,
            bookingType,
            event.target.result,
            file.name
          );

          await loadDashboard();
          alert("Report uploaded successfully.");
        } catch (err) {
          alert(err.response?.data?.message || "Upload failed.");
        } finally {
          setUploading("");
        }
      };

      reader.onerror = () => {
        setUploading("");
        alert("Could not read selected file.");
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setUploading("");
      alert("Upload failed.");
    }
  };

  if (loading) {
    return (
      <main className="lab-tech-page">
        <div className="lab-empty-box">
          <h3>Loading dashboard...</h3>
          <p>Please wait while we load lab bookings.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="lab-tech-page">
        <div className="lab-empty-box">
          <h3>Unable to load dashboard</h3>
          <p>{error}</p>

          <button className="lab-action-btn" onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="lab-tech-page">
      <section className="lab-tech-hero">
        <div className="lab-tech-hero-top">
          <div>
            <p className="lab-tech-eyebrow">Lab Technician Dashboard</p>
            <h1>{branch || "Lab Branch"}</h1>
            <p>
              Manage home service samples and diagnostic walk-in reports for
              your assigned branch.
            </p>
          </div>

          <div className="lab-tech-header-actions">
            <button onClick={loadDashboard}>Refresh</button>
            <button className="lab-tech-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {staffProfile && (
          <div className="lab-profile-box">
            <div>
              <p className="lab-profile-label">Logged-in Staff</p>
              <h2>{staffProfile.name || "Lab Technician"}</h2>
              <p>{staffProfile.email || "—"}</p>
            </div>

            <div className="lab-profile-grid">
              <div>
                <span>Branch</span>
                <strong>{staffProfile.branch || branch || "—"}</strong>
              </div>

              <div>
                <span>Role</span>
                <strong>{staffProfile.role || "—"}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{staffProfile.department || "—"}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="lab-button-panel">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`lab-main-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span>{counts[tab.key] || 0}</span>
          </button>
        ))}
      </section>

      <div className="lab-search-box">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by patient name, mobile, booking ID, or email..."
        />

        {search && (
          <button onClick={() => setSearch("")}>
            Clear
          </button>
        )}
      </div>

      {visibleBookings.length === 0 ? (
        <div className="lab-empty-box">
          <h3>No bookings found</h3>
          <p>
            {search
              ? "No booking matched your search."
              : "There are no bookings in this tab right now."}
          </p>
        </div>
      ) : (
        <section className="lab-tech-list">
          {visibleBookings.map((booking) => {
            const sourceColor = getSourceColor(booking.source);
            const statusColor = getStatusColor(booking.status);
            const actionLabel = getActionLabel(booking);

            const actionKey = `${booking.source}-${booking.rawId}-next`;
            const rejectKey = `${booking.source}-${booking.rawId}-reject`;
            const uploadKey = `${booking.source}-${booking.rawId}`;

            const canReject =
              booking.source === "Home Service" &&
              String(booking.status).toLowerCase() === "submitted_to_lab";

            const canUpload =
              String(booking.status).toLowerCase() === "processing" ||
              String(booking.status).toLowerCase() === "report_ready";

            return (
              <article className="lab-tech-task-card" key={booking.id}>
                <div className="lab-tech-task-top">
                  <div>
                    <div className="lab-tech-badges">
                      <span
                        style={{
                          background: sourceColor.bg,
                          color: sourceColor.color,
                          border: `1px solid ${sourceColor.border}`,
                        }}
                      >
                        {booking.source}
                      </span>

                      <span
                        style={{
                          background: statusColor.bg,
                          color: statusColor.color,
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3>{booking.patientName || "Patient"}</h3>

                    <p>
                      Ref: <strong>{booking.bookingId || "—"}</strong>
                    </p>
                  </div>

                  <div className="lab-tech-amount">
                    ₹{Number(booking.totalAmount || 0).toFixed(2)}
                  </div>
                </div>

                <div className="lab-tech-details-grid">
                  <div>
                    <span>Mobile</span>
                    <strong>{booking.mobile || "—"}</strong>
                  </div>

                  <div>
                    <span>Branch</span>
                    <strong>{booking.branch || "—"}</strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>{fmt(booking.date)}</strong>
                  </div>

                  <div>
                    <span>Time Slot</span>
                    <strong>{booking.timeSlot || "—"}</strong>
                  </div>

                  <div>
                    <span>Created</span>
                    <strong>{fmtDatetime(booking.createdAt)}</strong>
                  </div>
                </div>

                <div className="lab-email-box">
                  <p>
                    <strong>Booked Account Email:</strong>{" "}
                    {booking.bookedAccountEmail || "—"}
                  </p>

                  <p>
                    <strong>Patient Form Email:</strong>{" "}
                    {booking.email || "—"}
                  </p>
                </div>

                <div className="lab-tech-tests">
                  <span>Tests</span>

                  <div>
                    {(booking.tests || []).length > 0 ? (
                      booking.tests.map((test, index) => (
                        <small key={`${test}-${index}`}>{test}</small>
                      ))
                    ) : (
                      <small>No test details</small>
                    )}
                  </div>
                </div>

                <div className="lab-tech-actions">
                  {actionLabel && (
                    <button
                      className="lab-action-btn"
                      disabled={actionLoading === actionKey}
                      onClick={() => handleStatusUpdate(booking)}
                    >
                      {actionLoading === actionKey ? "Updating..." : actionLabel}
                    </button>
                  )}

                  {canReject && (
                    <button
                      className="lab-action-btn danger"
                      disabled={actionLoading === rejectKey}
                      onClick={() => handleStatusUpdate(booking, "reject")}
                    >
                      {actionLoading === rejectKey
                        ? "Rejecting..."
                        : "Reject Samples"}
                    </button>
                  )}

                  {canUpload && (
                    <label className="lab-upload-btn">
                      {uploading === uploadKey ? "Uploading..." : "Upload PDF"}
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        disabled={uploading === uploadKey}
                        onChange={(event) =>
                          handleUploadReport(booking, event.target.files?.[0])
                        }
                      />
                    </label>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}