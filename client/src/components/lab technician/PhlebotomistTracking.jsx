import { useState } from "react";

const initialCollections = [
  { id: "COL-501", patient: "Sita Devi", pid: "P-3430", phlebotomist: "Suresh Rajan", sampleType: "Blood (5ml)", barcode: "BC-94501", time: "09:15 AM", status: "Collected", notes: "No complications. Sample stored at 4°C.", tube: "EDTA Purple", location: "Ward 3B" },
  { id: "COL-502", patient: "Ramesh Rao", pid: "P-3431", phlebotomist: "Divya Menon", sampleType: "Blood (3ml)", barcode: "BC-94502", time: "09:45 AM", status: "Collected", notes: "Patient was fasting for 10 hours.", tube: "SST Yellow", location: "OPD Room 2" },
  { id: "COL-503", patient: "Kiran Reddy", pid: "P-3423", phlebotomist: "Suresh Rajan", sampleType: "Blood (3ml)", barcode: "BC-94503", time: "08:30 AM", status: "Sent to Lab", notes: "Dispatched via porter at 09:00 AM.", tube: "Heparin Green", location: "ICU" },
  { id: "COL-504", patient: "Arun Das", pid: "P-3425", phlebotomist: "Rekha Pillai", sampleType: "Urine (50ml)", barcode: "BC-94504", time: "10:00 AM", status: "Sent to Lab", notes: "Mid-stream urine collected.", tube: "Sterile Container", location: "OPD Room 4" },
  { id: "COL-505", patient: "Meena Kumari", pid: "P-3440", phlebotomist: "Arjun Nair", sampleType: "Blood (5ml)", barcode: "BC-94505", time: "10:30 AM", status: "Pending", notes: "Patient unavailable. Rescheduled.", tube: "EDTA Purple", location: "Ward 2A" },
  { id: "COL-506", patient: "Pradeep Singh", pid: "P-3441", phlebotomist: "Divya Menon", sampleType: "Blood (3ml)", barcode: "BC-94506", time: "11:00 AM", status: "Pending", notes: "Waiting for patient consent form.", tube: "SST Yellow", location: "Ward 1C" },
  { id: "COL-507", patient: "Lakshmi Bai", pid: "P-3445", phlebotomist: "Rekha Pillai", sampleType: "Urine (30ml)", barcode: "BC-94507", time: "11:30 AM", status: "Collected", notes: "Sample collected successfully.", tube: "Sterile Container", location: "OPD Room 1" },
];

const phlebotomists = ["Suresh Rajan", "Divya Menon", "Rekha Pillai", "Arjun Nair"];
const statusColors = {
  "Collected":    { bg: "#1a3a2a", color: "#4ade80", border: "#166534" },
  "Sent to Lab":  { bg: "#0c2a3a", color: "#38bdf8", border: "#0369a1" },
  "Pending":      { bg: "#3a2a0a", color: "#fbbf24", border: "#92400e" },
};
const phlebotomistColors = { "Suresh Rajan": "#fb923c", "Divya Menon": "#fb923c", "Rekha Pillai": "#fb923c", "Arjun Nair": "#fb923c" };

function StatusBadge({ status }) {
  const s = statusColors[status] || { bg: "#1e2128", color: "#9ca3af", border: "#374151" };
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "3px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "14px", padding: "32px", width: "540px", maxWidth: "95vw", boxShadow: "0 28px 72px rgba(0,0,0,0.6)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: "#e8eaf0", fontSize: "17px", fontWeight: 700, fontFamily: "'DM Mono', monospace", margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ViewDetailsModal({ col, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(col.status);
  const [saved, setSaved] = useState(false);

  const infoItems = [
    ["Collection ID", col.id],
    ["Patient Name", col.patient],
    ["Patient ID", col.pid],
    ["Phlebotomist", col.phlebotomist],
    ["Sample Type", col.sampleType],
    ["Tube Type", col.tube],
    ["Barcode", col.barcode],
    ["Collection Time", col.time],
    ["Location", col.location],
  ];

  const handleSave = () => {
    onUpdateStatus(col.id, status);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  return (
    <Modal title={`Collection Details — ${col.id}`} onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        {infoItems.map(([label, value]) => (
          <div key={label} style={{ background: "#13161c", borderRadius: "8px", padding: "10px 14px" }}>
            <div style={{ color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{label}</div>
            <div style={{ color: label === "Phlebotomist" ? "#fb923c" : label === "Collection ID" || label === "Barcode" ? "#60a5fa" : "#e8eaf0", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{value}</div>
          </div>
        ))}
        <div style={{ background: "#13161c", borderRadius: "8px", padding: "10px 14px" }}>
          <div style={{ color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Status</div>
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "6px", padding: "5px 10px", color: "#e8eaf0", fontFamily: "'DM Mono', monospace", fontSize: "13px", outline: "none", cursor: "pointer", width: "100%" }}>
            {Object.keys(statusColors).map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{ background: "#13161c", borderRadius: "8px", padding: "12px 14px", marginBottom: "20px" }}>
        <div style={{ color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Notes</div>
        <div style={{ color: "#d1d5db", fontSize: "13px", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>{col.notes}</div>
      </div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button onClick={handleSave} style={{ background: saved ? "#065f46" : "#2563eb", color: saved ? "#34d399" : "#fff", border: "none", padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "13px", transition: "background 0.2s" }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        <button onClick={onClose} style={{ background: "#2d3139", color: "#9ca3af", border: "none", padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>Close</button>
      </div>
    </Modal>
  );
}

function AddCollectionModal({ onClose, onAdd, nextId }) {
  const [form, setForm] = useState({ patient: "", pid: "", phlebotomist: phlebotomists[0], sampleType: "", barcode: "", tube: "", time: "", location: "", notes: "" });
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.patient || !form.pid || !form.sampleType || !form.barcode || !form.time) { setError("Patient, PID, Sample Type, Barcode and Time are required."); return; }
    onAdd({ ...form, id: nextId, status: "Pending", tube: form.tube || "EDTA Purple", location: form.location || "OPD" });
    onClose();
  };

  const inp = { background: "#13161c", border: "1px solid #2d3139", borderRadius: "8px", padding: "9px 13px", color: "#e8eaf0", fontFamily: "'DM Mono', monospace", fontSize: "13px", outline: "none", width: "100%", boxSizing: "border-box" };
  const lbl = { color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "5px" };

  return (
    <Modal title={`+ New Collection — ${nextId}`} onClose={onClose}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
        {[["patient","Patient Name"],["pid","Patient ID"],["sampleType","Sample Type"],["barcode","Barcode"],["tube","Tube Type"],["time","Time (e.g. 09:00 AM)"],["location","Location"]].map(([k, l]) => (
          <div key={k}>
            <label style={lbl}>{l}</label>
            <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={l} style={inp} />
          </div>
        ))}
        <div>
          <label style={lbl}>Phlebotomist</label>
          <select value={form.phlebotomist} onChange={e => set("phlebotomist", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
            {phlebotomists.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <label style={lbl}>Notes</label>
        <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={2} placeholder="Optional notes..." style={{ ...inp, resize: "vertical" }} />
      </div>
      {error && <div style={{ color: "#f87171", background: "#3a1010", borderRadius: "6px", padding: "8px 12px", fontSize: "12px", fontFamily: "'DM Mono', monospace", marginBottom: "12px" }}>{error}</div>}
      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <button onClick={submit} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>Add Collection</button>
        <button onClick={onClose} style={{ background: "#2d3139", color: "#9ca3af", border: "none", padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>Cancel</button>
      </div>
    </Modal>
  );
}

export default function PhlebotomistTracking() {
  const [collections, setCollections] = useState(initialCollections);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState(null);

  const updateStatus = (id, status) => setCollections(cs => cs.map(c => c.id === id ? { ...c, status } : c));
  const addCollection = (col) => setCollections(cs => [col, ...cs]);
  const getNextId = () => { const nums = collections.map(c => parseInt(c.id.replace("COL-", ""))); return `COL-${Math.max(...nums) + 1}`; };

  const filtered = collections.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.patient.toLowerCase().includes(q) || c.phlebotomist.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.pid.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = [
    { icon: "💉", label: "Total Phlebotomists", value: phlebotomists.length, color: "#fb923c" },
    { icon: "✅", label: "Active Now", value: [...new Set(collections.filter(c => c.status !== "Pending").map(c => c.phlebotomist))].length, color: "#4ade80" },
    { icon: "🩸", label: "Collections Today", value: collections.length, color: "#38bdf8" },
    { icon: "⏳", label: "Pending Samples", value: collections.filter(c => c.status === "Pending").length, color: "#fbbf24" },
  ];

  const gradients = ["linear-gradient(90deg,#ea580c,#fb923c)", "linear-gradient(90deg,#16a34a,#4ade80)", "linear-gradient(90deg,#0284c7,#38bdf8)", "linear-gradient(90deg,#b45309,#fbbf24)"];

  const colHead = { padding: "11px 14px", color: "#6b7280", fontSize: "10px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, textAlign: "left", borderBottom: "1px solid #2d3139" };
  const cell = { padding: "15px 14px", fontSize: "13px", fontFamily: "'DM Mono', monospace", verticalAlign: "middle" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #13161c; }
        ::-webkit-scrollbar-thumb { background: #2d3139; border-radius: 3px; }
        select option { background: #1a1d23; color: #e8eaf0; }
        input::placeholder, textarea::placeholder { color: #4b5563 !important; }
        .tr-row { transition: background 0.12s; }
        .tr-row:hover { background: #1e2128 !important; }
        .vd-btn:hover { background: #1f2937 !important; }
        .add-btn:hover { background: #1d4ed8 !important; }
        .filter-btn { transition: background 0.15s, color 0.15s; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease; }
      `}</style>

      <div style={{ background: "#0f1117", minHeight: "100vh", padding: "32px 28px", fontFamily: "'DM Mono', monospace" }}>

        {/* Title */}
        <h1 style={{ color: "#e8eaf0", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "24px" }}>
          Sample Collection Tracking
        </h1>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "12px", padding: "22px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: gradients[i] }} />
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>{s.icon}</div>
              <div style={{ color: "#6b7280", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: "30px", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search + Filters + Add */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by patient or phlebotomist..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: "220px", background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "8px", padding: "10px 16px", color: "#e8eaf0", fontFamily: "'DM Mono', monospace", fontSize: "13px", outline: "none" }}
          />
          {["All", "Collected", "Sent to Lab", "Pending"].map(s => (
            <button key={s} className="filter-btn" onClick={() => setFilterStatus(s)} style={{
              padding: "9px 16px", borderRadius: "8px", border: "1px solid",
              fontFamily: "'DM Mono', monospace", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              background: filterStatus === s ? (s === "All" ? "#2563eb" : statusColors[s]?.bg || "#2563eb") : "#1a1d23",
              color: filterStatus === s ? (s === "All" ? "#fff" : statusColors[s]?.color || "#fff") : "#6b7280",
              borderColor: filterStatus === s ? (s === "All" ? "#2563eb" : statusColors[s]?.border || "#2563eb") : "#2d3139",
            }}>{s}</button>
          ))}
          <button className="add-btn" onClick={() => setModal({ type: "add" })} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "13px", transition: "background 0.15s", whiteSpace: "nowrap" }}>
            + New Collection
          </button>
        </div>

        {/* Table */}
        <div style={{ background: "#1a1d23", border: "1px solid #2d3139", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #2d3139" }}>
            <h2 style={{ color: "#e8eaf0", fontSize: "15px", fontWeight: 700 }}>Sample Collections</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr style={{ background: "#13161c" }}>
                  {["Collection ID", "Patient", "PID", "Phlebotomist", "Sample Type", "Barcode", "Time", "Status", "Actions"].map(h => (
                    <th key={h} style={colHead}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} style={{ ...cell, textAlign: "center", color: "#4b5563", padding: "40px" }}>No collections found.</td></tr>
                ) : filtered.map((col, i) => (
                  <tr key={col.id} className="tr-row fade-in" style={{ borderBottom: i < filtered.length - 1 ? "1px solid #1e2128" : "none", background: "transparent" }}>
                    <td style={{ ...cell, color: "#9ca3af" }}>{col.id}</td>
                    <td style={{ ...cell, color: "#e8eaf0", fontWeight: 600 }}>{col.patient}</td>
                    <td style={{ ...cell, color: "#9ca3af" }}>{col.pid}</td>
                    <td style={{ ...cell, color: "#fb923c", fontWeight: 500 }}>{col.phlebotomist}</td>
                    <td style={{ ...cell, color: "#d1d5db" }}>{col.sampleType}</td>
                    <td style={{ ...cell, color: "#6b7280", fontSize: "12px" }}>{col.barcode}</td>
                    <td style={{ ...cell, color: "#9ca3af" }}>{col.time}</td>
                    <td style={cell}><StatusBadge status={col.status} /></td>
                    <td style={cell}>
                      <button className="vd-btn" onClick={() => setModal({ type: "view", col })} style={{ background: "#2d3139", color: "#d1d5db", border: "1px solid #374151", padding: "6px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "12px", transition: "background 0.12s", whiteSpace: "nowrap" }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer summary */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid #1e2128", display: "flex", gap: "20px" }}>
            {[["Total", collections.length, "#9ca3af"], ["Collected", collections.filter(c=>c.status==="Collected").length, "#4ade80"], ["Sent to Lab", collections.filter(c=>c.status==="Sent to Lab").length, "#38bdf8"], ["Pending", collections.filter(c=>c.status==="Pending").length, "#fbbf24"]].map(([l, v, color]) => (
              <div key={l} style={{ color: "#4b5563", fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>
                <span style={{ color }}>{v}</span> {l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal?.type === "view" && (
        <ViewDetailsModal col={modal.col} onClose={() => setModal(null)} onUpdateStatus={(id, s) => { updateStatus(id, s); setModal(null); }} />
      )}
      {modal?.type === "add" && (
        <AddCollectionModal onClose={() => setModal(null)} onAdd={addCollection} nextId={getNextId()} />
      )}
    </>
  );
}
