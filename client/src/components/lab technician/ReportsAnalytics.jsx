import { useState } from "react";

const reportTypes = [
  "Revenue Report",
  "Test Volume Report",
  "Patient Report",
  "QC Summary Report",
  "Lab Performance Report",
  "Pending Orders Report",
];

const mockData = {
  "Revenue Report": {
    headers: ["Date", "Test Name", "Patient", "Amount (₹)", "Status"],
    rows: [
      ["2026-05-01", "CBC", "Arjun Mehta", "₹850", "Paid"],
      ["2026-05-03", "Lipid Panel", "Sneha Rao", "₹1,200", "Paid"],
      ["2026-05-07", "Thyroid Test", "Vikram Singh", "₹2,100", "Pending"],
      ["2026-05-10", "HbA1c", "Priya Das", "₹980", "Paid"],
      ["2026-05-15", "Liver Function", "Karan Patel", "₹1,500", "Paid"],
      ["2026-05-20", "Urine Culture", "Meera Joshi", "₹750", "Paid"],
    ],
    summary: "Total Revenue: ₹7,380 | Paid: ₹6,300 | Pending: ₹1,080",
  },
  "Test Volume Report": {
    headers: ["Week", "Hematology", "Biochemistry", "Urine", "Microbiology", "Total"],
    rows: [
      ["Week 1", "142", "98", "67", "34", "341"],
      ["Week 2", "158", "112", "74", "41", "385"],
      ["Week 3", "133", "105", "69", "38", "345"],
      ["Week 4", "176", "121", "81", "43", "421"],
    ],
    summary: "Total Tests: 1,492 | Most Active: Hematology (609) | Highest Week: Week 4",
  },
  "Patient Report": {
    headers: ["Patient ID", "Name", "Age", "Tests Done", "Last Visit", "Status"],
    rows: [
      ["P-1001", "Arjun Mehta", "34", "4", "2026-05-25", "Active"],
      ["P-1002", "Sneha Rao", "28", "2", "2026-05-22", "Active"],
      ["P-1003", "Vikram Singh", "52", "6", "2026-05-20", "Active"],
      ["P-1004", "Priya Das", "41", "3", "2026-05-18", "Inactive"],
      ["P-1005", "Karan Patel", "29", "1", "2026-05-15", "Active"],
    ],
    summary: "Total Patients: 183 | Active: 156 | Inactive: 27 | New This Month: 38",
  },
  "QC Summary Report": {
    headers: ["Batch ID", "Test Type", "Samples", "Pass", "Fail", "Pass Rate", "Status"],
    rows: [
      ["QC-501", "Hematology", "20", "18", "2", "90%", "Pending Review"],
      ["QC-500", "Biochemistry", "25", "25", "0", "100%", "Passed"],
      ["QC-499", "Urine", "15", "14", "1", "93%", "Passed"],
      ["QC-498", "Microbiology", "18", "16", "2", "89%", "Passed"],
    ],
    summary: "Total Batches: 4 | Overall Pass Rate: 93% | Pending: 1 | Passed: 3",
  },
  "Lab Performance Report": {
    headers: ["Technician", "Tests Processed", "Avg TAT (hrs)", "Accuracy %", "Rating"],
    rows: [
      ["Rajesh Kumar", "342", "2.4", "98.5%", "⭐⭐⭐⭐⭐"],
      ["Anita Sharma", "298", "2.8", "97.2%", "⭐⭐⭐⭐"],
      ["Mohan Rao", "315", "2.6", "98.1%", "⭐⭐⭐⭐⭐"],
      ["Deepa Nair", "277", "3.1", "96.8%", "⭐⭐⭐⭐"],
    ],
    summary: "Team Avg Accuracy: 97.7% | Avg TAT: 2.7 hrs | Total Processed: 1,232",
  },
  "Pending Orders Report": {
    headers: ["Order ID", "Patient", "Test", "Ordered On", "Priority", "Assigned To"],
    rows: [
      ["ORD-2041", "Ravi Teja", "CBC + LFT", "2026-05-28", "High", "Rajesh Kumar"],
      ["ORD-2038", "Lakshmi Devi", "Thyroid Panel", "2026-05-27", "Normal", "Anita Sharma"],
      ["ORD-2035", "Suresh Babu", "HbA1c", "2026-05-26", "Normal", "Mohan Rao"],
      ["ORD-2031", "Kavitha G", "Urine Culture", "2026-05-25", "Urgent", "Deepa Nair"],
    ],
    summary: "Total Pending: 4 | Urgent: 1 | High: 1 | Normal: 2",
  },
};

function StatCard({ icon, label, value, gradient }) {
  return (
    <div style={{
      flex: 1,
      background: "#1a1d23",
      border: "1px solid #2d3139",
      borderRadius: "12px",
      padding: "24px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: gradient,
      }} />
      <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
      <div style={{ color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ color: value.color || "#60a5fa", fontSize: "28px", fontWeight: 700, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>
        {value.text}
      </div>
    </div>
  );
}

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState("Revenue Report");
  const [fromDate, setFromDate] = useState("2026-05-01");
  const [toDate, setToDate] = useState("2026-05-29");
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setError("");
    if (!fromDate || !toDate) { setError("Please select both From and To dates."); return; }
    if (new Date(fromDate) > new Date(toDate)) { setError("From Date cannot be after To Date."); return; }
    setLoading(true);
    setGenerated(null);
    setTimeout(() => {
      setGenerated({ type: reportType, from: fromDate, to: toDate, ...mockData[reportType] });
      setLoading(false);
    }, 900);
  };

  const handleExport = () => {
    if (!generated) return;
    const lines = [
      `${generated.type}`,
      `Period: ${generated.from} to ${generated.to}`,
      "",
      generated.headers.join(","),
      ...generated.rows.map(r => r.join(",")),
      "",
      generated.summary,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generated.type.replace(/ /g, "_")}_${generated.from}_${generated.to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle = {
    background: "#13161c", border: "1px solid #2d3139", borderRadius: "8px",
    padding: "11px 16px", color: "#e8eaf0", fontFamily: "'DM Mono', monospace",
    fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box",
  };
  const labelStyle = {
    color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: "8px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #13161c; }
        ::-webkit-scrollbar-thumb { background: #2d3139; border-radius: 3px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
        select option { background: #1a1d23; color: #e8eaf0; }
        .gen-btn:hover { background: #1d4ed8 !important; }
        .export-btn:hover { background: #065f46 !important; }
        .report-row:hover { background: #1e2128 !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.35s ease forwards; }
        .spinner { width: 20px; height: 20px; border: 2px solid #2d3139; border-top-color: #60a5fa; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
      `}</style>

      <div style={{ background: "#13161c", minHeight: "100vh", padding: "32px", fontFamily: "'DM Mono', monospace" }}>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <span style={{ fontSize: "26px" }}>📊</span>
          <h1 style={{ color: "#e8eaf0", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Reports &amp; Analytics
          </h1>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <StatCard icon="💰" label="Monthly Revenue" value={{ text: "₹18,42,500", color: "#60a5fa" }} gradient="linear-gradient(90deg,#2563eb,#06b6d4)" />
          <StatCard icon="✏️" label="Tests This Month" value={{ text: "1,247", color: "#4ade80" }} gradient="linear-gradient(90deg,#16a34a,#4ade80)" />
          <StatCard icon="👤" label="New Patients" value={{ text: "183", color: "#a78bfa" }} gradient="linear-gradient(90deg,#7c3aed,#a78bfa)" />
        </div>

        {/* Generate Report Panel */}
        <div style={{ background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "12px", padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <span style={{ fontSize: "18px" }}>📋</span>
            <h2 style={{ color: "#e8eaf0", fontSize: "16px", fontWeight: 700, letterSpacing: "0.02em" }}>Generate Report</h2>
          </div>

          {/* Form Row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: "16px", alignItems: "end", marginBottom: error ? "10px" : "0" }}>
            <div>
              <label style={labelStyle}>Report Type</label>
              <select value={reportType} onChange={e => { setReportType(e.target.value); setGenerated(null); }} style={{ ...inputStyle, cursor: "pointer" }}>
                {reportTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>From Date</label>
              <input type="date" value={fromDate} onChange={e => { setFromDate(e.target.value); setGenerated(null); }} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>To Date</label>
              <input type="date" value={toDate} onChange={e => { setToDate(e.target.value); setGenerated(null); }} style={inputStyle} />
            </div>
            <button
              className="gen-btn"
              onClick={handleGenerate}
              disabled={loading}
              style={{
                background: "#2563eb", color: "#fff", border: "none",
                padding: "11px 28px", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "14px",
                transition: "background 0.15s", display: "flex", alignItems: "center", gap: "8px",
                opacity: loading ? 0.8 : 1, whiteSpace: "nowrap",
              }}
            >
              {loading ? <><span className="spinner" /> Generating...</> : "Generate"}
            </button>
          </div>

          {error && (
            <div style={{ color: "#f87171", fontSize: "13px", background: "#3a1010", borderRadius: "6px", padding: "8px 14px", marginTop: "10px" }}>
              ⚠ {error}
            </div>
          )}

          {/* Generated Report Output */}
          {generated && !loading && (
            <div className="fade-in" style={{ marginTop: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div>
                  <div style={{ color: "#e8eaf0", fontSize: "15px", fontWeight: 700 }}>{generated.type}</div>
                  <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "3px" }}>
                    {generated.from} → {generated.to}
                  </div>
                </div>
                <button
                  className="export-btn"
                  onClick={handleExport}
                  style={{
                    background: "#064e3b", color: "#34d399", border: "1px solid #065f46",
                    padding: "7px 18px", borderRadius: "6px", cursor: "pointer",
                    fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "12px",
                    transition: "background 0.15s",
                  }}
                >⬇ Export CSV</button>
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid #2d3139" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr style={{ background: "#13161c" }}>
                      {generated.headers.map(h => (
                        <th key={h} style={{
                          padding: "11px 16px", color: "#9ca3af", fontSize: "10px",
                          fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
                          letterSpacing: "0.1em", fontWeight: 600, textAlign: "left",
                          borderBottom: "1px solid #2d3139",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {generated.rows.map((row, i) => (
                      <tr key={i} className="report-row" style={{ borderBottom: i < generated.rows.length - 1 ? "1px solid #1e2128" : "none", background: "transparent", transition: "background 0.12s" }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{
                            padding: "13px 16px", color: j === 0 ? "#60a5fa" : "#d1d5db",
                            fontSize: "13px", fontFamily: "'DM Mono', monospace",
                          }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div style={{
                marginTop: "14px", background: "#13161c", borderRadius: "8px",
                padding: "12px 18px", color: "#9ca3af", fontSize: "12px",
                fontFamily: "'DM Mono', monospace", borderLeft: "3px solid #2563eb",
              }}>
                📌 {generated.summary}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
