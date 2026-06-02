import { useState } from "react";

const initialBatches = [
  { id: "QC-501", testType: "Hematology", samples: 20, pass: 18, fail: 2, date: "2026-05-29", status: "Pending Review" },
  { id: "QC-500", testType: "Biochemistry", samples: 25, pass: 25, fail: 0, date: "2026-05-28", status: "Passed" },
  { id: "QC-499", testType: "Urine", samples: 15, pass: 14, fail: 1, date: "2026-05-27", status: "Passed" },
];

const testTypes = ["Hematology", "Biochemistry", "Urine", "Microbiology", "Serology", "Cytology"];

function StatusBadge({ status }) {
  const styles = {
    "Passed": { background: "#1a3a2a", color: "#4ade80", border: "1px solid #166534" },
    "Pending Review": { background: "#3a2a0a", color: "#fbbf24", border: "1px solid #92400e" },
    "Failed": { background: "#3a1010", color: "#f87171", border: "1px solid #991b1b" },
  };
  return (
    <span style={{
      ...styles[status],
      padding: "3px 12px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: 600,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.03em",
    }}>
      {status}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "12px",
        padding: "32px", minWidth: "480px", maxWidth: "600px", width: "90%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#e8eaf0", fontSize: "18px", fontWeight: 700, fontFamily: "'DM Mono', monospace", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#6b7280", cursor: "pointer",
            fontSize: "20px", lineHeight: 1,
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ViewModal({ batch, onClose, onUpdateStatus }) {
  return (
    <Modal title={`Batch Details — ${batch.id}`} onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {[
          ["Batch ID", batch.id],
          ["Test Type", batch.testType],
          ["Total Samples", batch.samples],
          ["Pass", batch.pass],
          ["Fail", batch.fail],
          ["Date", batch.date],
          ["Status", null],
        ].map(([label, value]) => (
          <div key={label} style={{ background: "#13161c", borderRadius: "8px", padding: "12px 16px" }}>
            <div style={{ color: "#6b7280", fontSize: "11px", fontFamily: "'DM Mono', monospace", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            {label === "Status"
              ? <StatusBadge status={batch.status} />
              : <div style={{ color: "#e8eaf0", fontSize: "15px", fontWeight: 600 }}>{value}</div>
            }
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        {batch.status !== "Passed" && (
          <button onClick={() => { onUpdateStatus(batch.id, "Passed"); onClose(); }} style={{
            background: "#166534", color: "#4ade80", border: "1px solid #166534",
            padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: 600,
            fontFamily: "'DM Mono', monospace", fontSize: "13px",
          }}>Mark as Passed</button>
        )}
        {batch.status !== "Failed" && (
          <button onClick={() => { onUpdateStatus(batch.id, "Failed"); onClose(); }} style={{
            background: "#7f1d1d", color: "#f87171", border: "1px solid #991b1b",
            padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: 600,
            fontFamily: "'DM Mono', monospace", fontSize: "13px",
          }}>Mark as Failed</button>
        )}
        <button onClick={onClose} style={{
          background: "#2d3139", color: "#9ca3af", border: "none",
          padding: "8px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: 600,
          fontFamily: "'DM Mono', monospace", fontSize: "13px",
        }}>Close</button>
      </div>
    </Modal>
  );
}

function ReviewModal({ batch, onClose, onUpdateStatus }) {
  const [notes, setNotes] = useState("");
  const [decision, setDecision] = useState(null);

  const submit = (status) => {
    setDecision(status);
    onUpdateStatus(batch.id, status);
    onClose();
  };

  return (
    <Modal title={`Review Batch — ${batch.id}`} onClose={onClose}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {[["Test Type", batch.testType], ["Pass", batch.pass], ["Fail", batch.fail]].map(([l, v]) => (
            <div key={l} style={{ background: "#13161c", borderRadius: "8px", padding: "10px 14px" }}>
              <div style={{ color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
              <div style={{ color: "#e8eaf0", fontSize: "15px", fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ color: "#9ca3af", fontSize: "12px", fontFamily: "'DM Mono', monospace", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Review Notes
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add observations, anomalies, or remarks..."
            rows={4}
            style={{
              width: "100%", background: "#13161c", border: "1px solid #2d3139",
              borderRadius: "8px", padding: "12px", color: "#e8eaf0",
              fontFamily: "'DM Mono', monospace", fontSize: "13px", resize: "vertical",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button onClick={() => submit("Passed")} style={{
          background: "#166534", color: "#4ade80", border: "1px solid #166534",
          padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 700,
          fontFamily: "'DM Mono', monospace", fontSize: "13px",
        }}>✓ Approve</button>
        <button onClick={() => submit("Failed")} style={{
          background: "#7f1d1d", color: "#f87171", border: "1px solid #991b1b",
          padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 700,
          fontFamily: "'DM Mono', monospace", fontSize: "13px",
        }}>✗ Reject</button>
        <button onClick={onClose} style={{
          background: "#2d3139", color: "#9ca3af", border: "none",
          padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600,
          fontFamily: "'DM Mono', monospace", fontSize: "13px",
        }}>Cancel</button>
      </div>
    </Modal>
  );
}

function NewBatchModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ testType: testTypes[0], samples: "", pass: "", fail: "" });
  const [error, setError] = useState("");

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const { testType, samples, pass, fail } = form;
    if (!samples || !pass || fail === "") { setError("All fields are required."); return; }
    const s = parseInt(samples), p = parseInt(pass), f = parseInt(fail);
    if (isNaN(s) || isNaN(p) || isNaN(f)) { setError("Samples, Pass and Fail must be numbers."); return; }
    if (p + f !== s) { setError(`Pass (${p}) + Fail (${f}) must equal Samples (${s}).`); return; }
    const today = new Date().toISOString().split("T")[0];
    onAdd({ id: nextId, testType, samples: s, pass: p, fail: f, date: today, status: f > 0 ? "Pending Review" : "Passed" });
    onClose();
  };

  const inputStyle = {
    width: "100%", background: "#13161c", border: "1px solid #2d3139",
    borderRadius: "8px", padding: "10px 14px", color: "#e8eaf0",
    fontFamily: "'DM Mono', monospace", fontSize: "14px", outline: "none", boxSizing: "border-box",
  };
  const labelStyle = { color: "#9ca3af", fontSize: "11px", fontFamily: "'DM Mono', monospace", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" };

  return (
    <Modal title="+ New QC Batch" onClose={onClose}>
      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Test Type</label>
          <select value={form.testType} onChange={e => handle("testType", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            {testTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {[["samples", "Total Samples"], ["pass", "Pass"], ["fail", "Fail"]].map(([k, l]) => (
            <div key={k}>
              <label style={labelStyle}>{l}</label>
              <input type="number" min="0" value={form[k]} onChange={e => handle(k, e.target.value)} placeholder="0" style={inputStyle} />
            </div>
          ))}
        </div>
        {error && <div style={{ color: "#f87171", fontSize: "13px", fontFamily: "'DM Mono', monospace", background: "#3a1010", borderRadius: "6px", padding: "8px 12px" }}>{error}</div>}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "4px" }}>
          <button onClick={submit} style={{
            background: "#2563eb", color: "#fff", border: "none",
            padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 700,
            fontFamily: "'DM Mono', monospace", fontSize: "13px",
          }}>Create Batch</button>
          <button onClick={onClose} style={{
            background: "#2d3139", color: "#9ca3af", border: "none",
            padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 600,
            fontFamily: "'DM Mono', monospace", fontSize: "13px",
          }}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default function QCBatches() {
  const [batches, setBatches] = useState(initialBatches);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // { type: "view"|"review"|"new", batch? }

  const filtered = batches.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.testType.toLowerCase().includes(search.toLowerCase()) ||
    b.status.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setBatches(bs => bs.map(b => b.id === id ? { ...b, status } : b));
  };

  const addBatch = (batch) => {
    setBatches(bs => [batch, ...bs]);
  };

  const getNextId = () => {
    const nums = batches.map(b => parseInt(b.id.replace("QC-", "")));
    return `QC-${Math.max(...nums) + 1}`;
  };

  const colStyle = (w) => ({
    padding: "12px 16px", color: "#9ca3af", fontSize: "11px",
    fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
    letterSpacing: "0.1em", fontWeight: 600, width: w,
  });

  const cellStyle = {
    padding: "16px 16px", color: "#e8eaf0", fontSize: "14px",
    fontFamily: "'DM Mono', monospace", verticalAlign: "middle",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #13161c; }
        ::-webkit-scrollbar-thumb { background: #2d3139; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #4b5563 !important; }
        select option { background: #1a1d23; }
        .qc-row { transition: background 0.15s; }
        .qc-row:hover { background: #1e2128 !important; }
        .btn-review:hover { background: #1e40af !important; }
        .btn-view:hover { background: #374151 !important; }
        .btn-new:hover { background: #1d4ed8 !important; }
      `}</style>

      <div style={{
        background: "#13161c", minHeight: "100vh", padding: "32px",
        fontFamily: "'DM Mono', monospace",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <span style={{ fontSize: "28px" }}>🔬</span>
          <h1 style={{ color: "#e8eaf0", fontSize: "24px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            QC Batches
          </h1>
        </div>

        {/* Search + New Batch */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search QC batches..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, background: "#1a1d23", border: "1px solid #2d3139",
              borderRadius: "8px", padding: "10px 16px", color: "#e8eaf0",
              fontFamily: "'DM Mono', monospace", fontSize: "14px", outline: "none",
            }}
          />
          <button
            className="btn-new"
            onClick={() => setModal({ type: "new" })}
            style={{
              background: "#2563eb", color: "#fff", border: "none",
              padding: "10px 20px", borderRadius: "8px", cursor: "pointer",
              fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "14px",
              whiteSpace: "nowrap", transition: "background 0.15s",
            }}
          >+ New Batch</button>
        </div>

        {/* Table */}
        <div style={{ background: "#1a1d23", borderRadius: "12px", border: "1px solid #2d3139", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2d3139" }}>
                <th style={colStyle("15%")} align="left">Batch ID</th>
                <th style={colStyle("20%")} align="left">Test Type</th>
                <th style={colStyle("10%")} align="left">Samples</th>
                <th style={colStyle("8%")} align="left">Pass</th>
                <th style={colStyle("8%")} align="left">Fail</th>
                <th style={colStyle("14%")} align="left">Date</th>
                <th style={colStyle("14%")} align="left">Status</th>
                <th style={colStyle("11%")} align="left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ ...cellStyle, textAlign: "center", color: "#4b5563", padding: "40px" }}>
                    No QC batches found.
                  </td>
                </tr>
              ) : filtered.map((batch, i) => (
                <tr
                  key={batch.id}
                  className="qc-row"
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid #1e2128" : "none", background: "transparent" }}
                >
                  <td style={{ ...cellStyle, color: "#60a5fa", fontWeight: 600 }}>{batch.id}</td>
                  <td style={cellStyle}>{batch.testType}</td>
                  <td style={cellStyle}>{batch.samples}</td>
                  <td style={{ ...cellStyle, color: "#4ade80" }}>{batch.pass}</td>
                  <td style={{ ...cellStyle, color: batch.fail > 0 ? "#f87171" : "#6b7280" }}>{batch.fail}</td>
                  <td style={{ ...cellStyle, color: "#9ca3af" }}>{batch.date}</td>
                  <td style={cellStyle}><StatusBadge status={batch.status} /></td>
                  <td style={cellStyle}>
                    {batch.status === "Pending Review" ? (
                      <button
                        className="btn-review"
                        onClick={() => setModal({ type: "review", batch })}
                        style={{
                          background: "#1e3a8a", color: "#93c5fd", border: "1px solid #1e40af",
                          padding: "6px 16px", borderRadius: "6px", cursor: "pointer",
                          fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "12px",
                          transition: "background 0.15s",
                        }}
                      >Review</button>
                    ) : (
                      <button
                        className="btn-view"
                        onClick={() => setModal({ type: "view", batch })}
                        style={{
                          background: "#2d3139", color: "#d1d5db", border: "1px solid #374151",
                          padding: "6px 16px", borderRadius: "6px", cursor: "pointer",
                          fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "12px",
                          transition: "background 0.15s",
                        }}
                      >View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary bar */}
        <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
          {[
            ["Total Batches", batches.length, "#9ca3af"],
            ["Passed", batches.filter(b => b.status === "Passed").length, "#4ade80"],
            ["Pending Review", batches.filter(b => b.status === "Pending Review").length, "#fbbf24"],
            ["Failed", batches.filter(b => b.status === "Failed").length, "#f87171"],
          ].map(([label, val, color]) => (
            <div key={label} style={{ color: "#4b5563", fontSize: "12px", fontFamily: "'DM Mono', monospace" }}>
              <span style={{ color }}>{val}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {modal?.type === "view" && (
        <ViewModal
          batch={modal.batch}
          onClose={() => setModal(null)}
          onUpdateStatus={updateStatus}
        />
      )}
      {modal?.type === "review" && (
        <ReviewModal
          batch={modal.batch}
          onClose={() => setModal(null)}
          onUpdateStatus={updateStatus}
        />
      )}
      {modal?.type === "new" && (
        <NewBatchModal
          onClose={() => setModal(null)}
          onAdd={addBatch}
          nextId={getNextId()}
        />
      )}
    </>
  );
}
