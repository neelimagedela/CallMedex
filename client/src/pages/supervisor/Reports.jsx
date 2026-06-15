// client/src/pages/supervisor/Reports.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import "./SupervisorPages.css";

const TABS = [
  {
    key: "all",
    label: "All Reports",
  },
  {
    key: "home_service",
    label: "Home Service",
  },
  {
    key: "walkin",
    label: "Diagnostic Walkin",
  },
  {
    key: "scan",
    label: "Scan Appointments",
  },
];

const getBookingTypeLabel = (type) => {
  switch (type) {
    case "home_service":
      return "Home Service";
    case "walkin":
      return "Diagnostic Walkin";
    case "scan":
      return "Scan Appointment";
    default:
      return String(type || "Report").replaceAll("_", " ");
  }
};

const formatDate = (value) => {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openingId, setOpeningId] = useState(null);
  const [error, setError] = useState(null);

  const loadReports = async (type) => {
    try {
      setLoading(true);
      setError(null);

      const data = await supervisorApi.getPatientReports(type);
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load patient reports:", err);
      setError(err.message || "Failed to load patient reports");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports(activeTab);
  }, [activeTab]);

  const handleOpenPdf = async (report) => {
    try {
      setOpeningId(report.reportId);
      await supervisorApi.openReportPdf(report.reportPdf);
    } catch (err) {
      console.error("Failed to open PDF:", err);
      alert(err.message || "Failed to open report PDF.");
    } finally {
      setOpeningId(null);
    }
  };

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Reports</h1>
        <p className="sv-page-sub">Patient report PDFs for your branch</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "10px 18px",
              fontWeight: 800,
              cursor: "pointer",
              background: activeTab === tab.key ? "#0f766e" : "#e6fffb",
              color: activeTab === tab.key ? "#ffffff" : "#0f766e",
              boxShadow:
                activeTab === tab.key
                  ? "0 10px 24px rgba(15, 118, 110, 0.22)"
                  : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <div className="sv-loading">Loading reports...</div>}

      {error && <div className="sv-error">{error}</div>}

      {!loading && !error && reports.length === 0 && (
        <div className="sv-empty">No reports found for this tab.</div>
      )}

      {!loading && !error && reports.length > 0 && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.9fr 1.2fr 0.9fr 0.8fr",
              gap: "12px",
              padding: "14px 18px",
              background: "#f8fafc",
              color: "#64748b",
              fontSize: "12px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <div>Patient</div>
            <div>Booking Type</div>
            <div>Test / Service</div>
            <div>Receipt ID</div>
            <div>PDF</div>
          </div>

          {reports.map((report) => (
            <div
              key={report.reportId}
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.9fr 1.2fr 0.9fr 0.8fr",
                gap: "12px",
                alignItems: "center",
                padding: "16px 18px",
                borderTop: "1px solid #eef2f7",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#0f172a",
                    fontWeight: 900,
                    fontSize: "14px",
                  }}
                >
                  {report.patientName || "—"}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  {report.patientEmail || "—"}
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "11px",
                    marginTop: "3px",
                  }}
                >
                  Uploaded: {formatDate(report.uploadedAt)}
                </div>
              </div>

              <div>
                <span
                  style={{
                    display: "inline-flex",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "#e6fffb",
                    color: "#0f766e",
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {getBookingTypeLabel(report.bookingType)}
                </span>
              </div>

              <div
                style={{
                  color: "#334155",
                  fontSize: "13px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                }}
                title={report.service}
              >
                {report.service || "—"}
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {report.receiptId || "—"}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleOpenPdf(report)}
                  disabled={!report.reportPdf || openingId === report.reportId}
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "9px 12px",
                    background:
                      !report.reportPdf || openingId === report.reportId
                        ? "#cbd5e1"
                        : "#0f766e",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 900,
                    cursor:
                      !report.reportPdf || openingId === report.reportId
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {openingId === report.reportId ? "Opening..." : "View PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}