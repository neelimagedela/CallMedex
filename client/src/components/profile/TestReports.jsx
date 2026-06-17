import React, { useEffect, useState } from "react";
import { api } from "../../shared/api";
  const BASE_URL = import.meta.env.VITE_API_URL;
export default function TestReports({ setPage }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/staff/reports/my")
      .then((res) => {
        if (res.data.success) {
          setReports(res.data.data || []);
        } else {
          setError(res.data.message || "Could not load reports.");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load reports.");
      })
      .finally(() => setLoading(false));
  }, []);

  const getReportUrl = (path) => {
  if (!path) return "#";
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

  return (
    <div style={S.page}>
      <div style={{ marginBottom: 32 }}>
        <p style={S.label}>Patient Portal</p>

        <h1 style={S.title}>Test Reports</h1>

        <p style={S.subtitle}>
          Your uploaded lab and diagnostic report PDFs appear here.
        </p>
      </div>

      {loading && (
        <div style={S.empty}>
          <p style={{ color: "#64748b", margin: 0 }}>Loading your reports...</p>
        </div>
      )}

      {!loading && error && (
        <div style={{ ...S.empty, borderColor: "#fca5a5", background: "#fff5f5" }}>
          <p style={{ color: "#991b1b", fontWeight: 700, margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      {!loading && !error && reports.length === 0 && (
        <div style={S.empty}>
          <p style={{ fontSize: 40, margin: "0 0 12px" }}>🔬</p>

          <h2 style={{ margin: "0 0 8px", color: "#0A2540" }}>
            No reports yet
          </h2>

          <p style={{ color: "#64748b", margin: 0 }}>
            Once your lab tests are processed, your reports will appear here.
          </p>
        </div>
      )}

      {!loading && !error && reports.length > 0 && (
        <div style={S.grid}>
          {reports.map((r) => (
            <div key={r.id} style={S.card}>
              <div>
                <p style={S.patientName}>{r.patient_name}</p>

                <p style={S.meta}>
                  Ref: <strong>{r.booking_ref}</strong>
                  {" · "}
                  {r.booking_type === "home_service" ? "Home Service" : "Walk-in"}
                  {" · Uploaded "}
                  {r.uploaded_at
                    ? new Date(r.uploaded_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <a
                href={getReportUrl(r.report_pdf)}
                target="_blank"
                rel="noreferrer"
                style={S.btn}
              >
                📄 View Report
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const S = {
  page: {
    padding: "120px 5% 60px",
    maxWidth: 1000,
    margin: "auto",
    fontFamily: "'Segoe UI', sans-serif",
  },

  label: {
    margin: "0 0 6px",
    color: "#0f766e",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontSize: 32,
    color: "#0A2540",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#64748b",
  },

  grid: {
    display: "grid",
    gap: 16,
  },

  empty: {
    background: "#fff",
    border: "1px dashed #cbd5e1",
    borderRadius: 20,
    padding: "48px 32px",
    textAlign: "center",
  },

  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 4px 16px rgba(15,23,42,.06)",
  },

  patientName: {
    margin: "0 0 4px",
    fontWeight: 900,
    color: "#0A2540",
    fontSize: 16,
  },

  meta: {
    margin: 0,
    color: "#64748b",
    fontSize: 13,
  },

  btn: {
    background: "#0f4676",
    color: "#fff",
    borderRadius: 12,
    padding: "10px 20px",
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};