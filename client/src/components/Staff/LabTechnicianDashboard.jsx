import React, { useEffect, useMemo, useState } from "react";
import "../../styles/index.css";

import {
  getLabTechnicianDashboard,
  updateWalkinStatus,
  updateScanStatus,
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
  "Scan Appointment": {
    bg: "#fefce8",
    color: "#854d0e",
    border: "#fde68a",
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

  if (
    ["sample_collected", "submitted_to_lab", "sample_received"].includes(value)
  ) {
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

const getActionLabel = (booking) => {
  const status = String(booking.status || "").toLowerCase();

  if (booking.source === "Home Service") {
    if (status === "submitted_to_lab") return "Accept Samples";
    if (status === "processing") return "Mark Reports Ready";
    if (status === "report_ready") return "Mark Completed";
    return null;
  }

  if (
    booking.source === "Diagnostic Walk-in" ||
    booking.source === "Scan Appointment"
  ) {
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
      } else if (booking.source === "Scan Appointment") {
        await updateScanStatus(booking.rawId, booking.status);
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

    const uploadKey = `${booking.source}-${booking.rawId}`;

    setUploading(uploadKey);

    try {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const bookingType =
            booking.source === "Home Service"
              ? "home_service"
              : booking.source === "Scan Appointment"
              ? "scan"
              : "walkin";

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
        <section className="lab-tech-hero">
          <h1>Loading Lab Technician Dashboard...</h1>
          <p>Please wait while we fetch your branch samples.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="lab-tech-page">
        <section className="lab-tech-hero">
          <h1>Lab Technician Dashboard</h1>
          <p>{error}</p>

          <button className="lab-action-btn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="lab-tech-page">
      <section className="lab-tech-hero">
        <div>
          <span className="lab-tech-badge">Lab Technician Portal</span>
          <h1>{branch || "Branch"} Lab Dashboard</h1>
          <p>
            Manage home service samples, diagnostic walk-in samples and scan
            appointments from one dashboard.
          </p>
        </div>

        <div className="lab-tech-profile-card">
          <strong>{staffProfile?.name || "Lab Technician"}</strong>
          <span>{staffProfile?.email || "—"}</span>
          <span>{staffProfile?.phone || "—"}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </section>

      <section className="lab-tech-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span>{counts[tab.key] || 0}</span>
          </button>
        ))}
      </section>

      <section className="lab-tech-search">
        <input
          type="text"
          placeholder="Search by receipt, patient, mobile, email, branch or status"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      {visibleBookings.length === 0 ? (
        <section className="lab-empty-card">
          <h2>No bookings found</h2>
          <p>There are no records in this tab right now.</p>
        </section>
      ) : (
        <section className="lab-booking-grid">
          {visibleBookings.map((booking) => {
            const sourceStyle =
              SOURCE_COLORS[booking.source] || SOURCE_COLORS["Home Service"];

            const statusKey = String(booking.status || "pending").toLowerCase();

            const statusStyle =
              STATUS_COLORS[statusKey] || STATUS_COLORS.pending;

            const actionLabel = getActionLabel(booking);

            const actionKey = `${booking.source}-${booking.rawId}-next`;
            const rejectKey = `${booking.source}-${booking.rawId}-reject`;
            const uploadKey = `${booking.source}-${booking.rawId}`;

            const canReject =
              booking.source === "Home Service" &&
              statusKey === "submitted_to_lab";

            const canUpload = statusKey === "report_ready";

            return (
              <article className="lab-booking-card" key={booking.id}>
                <div className="lab-booking-top">
                  <span
                    style={{
                      background: sourceStyle.bg,
                      color: sourceStyle.color,
                      border: `1px solid ${sourceStyle.border}`,
                    }}
                  >
                    {booking.source}
                  </span>

                  <small
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    {statusKey.replaceAll("_", " ")}
                  </small>
                </div>

                <div className="lab-booking-title">
                  <h2>{booking.patientName || "Patient"}</h2>
                  <p>{booking.bookingId || "—"}</p>
                </div>

                <div className="lab-booking-info">
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

                  <div>
                    <span>Total</span>
                    <strong>₹{booking.totalAmount || 0}</strong>
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
                  <span>Tests / Scans</span>

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