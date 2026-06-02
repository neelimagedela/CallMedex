import { useState } from "react";

const INITIAL_ORDERS = [
  { id: "SC-301", patient: "Mohan Das", pid: "P-3410", scanType: "X-Ray Chest", ordered: "2026-05-29", technician: "Unassigned", status: "Pending", notes: "Patient complains of chest pain.", age: 48, gender: "Male", doctor: "Dr. Sharma", urgency: "Normal" },
  { id: "SC-302", patient: "Lata Iyer", pid: "P-3411", scanType: "USG Abdomen", ordered: "2026-05-28", technician: "R. Pillai", status: "Completed", notes: "Routine abdominal scan.", age: 36, gender: "Female", doctor: "Dr. Priya", urgency: "Normal" },
];

const SCAN_TYPES = ["X-Ray Chest", "USG Abdomen", "MRI Brain", "CT Scan Head", "X-Ray Spine", "USG Pelvis", "CT Chest", "MRI Knee", "Mammography", "Echo Cardiogram", "Bone Density Scan"];
const TECHNICIANS = ["Unassigned", "R. Pillai", "S. Kumar", "M. Nair", "A. Reddy", "P. Singh"];
const DOCTORS = ["Dr. Sharma", "Dr. Priya", "Dr. Reddy", "Dr. Mehta", "Dr. Iyer"];

const statusStyle = {
  Completed:     { background: "rgba(34,197,94,0.15)",  color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" },
  "In Progress": { background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" },
  Pending:       { background: "rgba(234,179,8,0.15)",  color: "#facc15", border: "1px solid rgba(234,179,8,0.3)" },
  Cancelled:     { background: "rgba(239,68,68,0.15)",  color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};
const urgencyStyle = {
  Normal: { background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" },
  Urgent: { background: "rgba(239,68,68,0.15)",  color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};

const emptyForm = { patient: "", pid: "", scanType: SCAN_TYPES[0], ordered: new Date().toISOString().split("T")[0], technician: "Unassigned", status: "Pending", notes: "", age: "", gender: "Male", doctor: DOCTORS[0], urgency: "Normal" };

function Badge({ label, styleMap }) {
  const s = styleMap[label] || { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" };
  return <span style={{ ...s, display: "inline-block", padding: "3px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={S.modalHeader}>
          <span style={S.modalTitle}>{title}</span>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={S.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

export default function ScanOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterUrgency, setFilterUrgency] = useState("All");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#4ade80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const openNew  = () => { setForm(emptyForm); setModal({ type: "new" }); };
  const openEdit = (o) => { setForm({ ...o }); setModal({ type: "edit", order: o }); };
  const openView = (o) => setModal({ type: "view", order: o });
  const closeModal = () => setModal(null);

  const nextId = () => {
    const nums = orders.map(o => parseInt(o.id.replace("SC-", ""), 10));
    return "SC-" + (Math.max(...nums) + 1);
  };

  const handleSave = () => {
    if (!form.patient.trim() || !form.pid.trim()) { showToast("Patient name and PID are required.", "#f87171"); return; }
    if (modal.type === "new") {
      setOrders(prev => [{ ...form, id: nextId() }, ...prev]);
      showToast("New scan order created!");
    } else {
      setOrders(prev => prev.map(o => o.id === form.id ? { ...form } : o));
      showToast("Scan order updated!", "#60a5fa");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    closeModal();
    showToast("Scan order deleted.", "#f87171");
  };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const ms = o.patient.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.scanType.toLowerCase().includes(q) || o.pid.toLowerCase().includes(q) || o.technician.toLowerCase().includes(q);
    const mStatus  = filterStatus  === "All" || o.status  === filterStatus;
    const mUrgency = filterUrgency === "All" || o.urgency === filterUrgency;
    return ms && mStatus && mUrgency;
  });

  const inp = key => ({ value: form[key], onChange: e => setForm(f => ({ ...f, [key]: e.target.value })), style: S.input });

  return (
    <div style={S.wrapper}>
      <style>{`
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-14px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        .ra { animation: fadeIn 0.3s ease both; }
        .ma { animation: slideIn 0.25s cubic-bezier(.34,1.3,.7,1) both; }
        .ta { animation: toastIn 0.3s ease both; }
        button:active { transform: scale(0.96) !important; }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#3b82f6!important; box-shadow:0 0 0 3px rgba(59,130,246,0.18); }
        tr:hover td { background: rgba(255,255,255,0.025); }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0f172a} ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="ta" style={{ position:"fixed", top:24, right:24, background:"#1e293b", border:"1px solid "+toast.color, color:toast.color, borderRadius:10, padding:"12px 20px", fontWeight:600, fontSize:14, zIndex:9999, boxShadow:"0 4px 24px rgba(0,0,0,0.4)" }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={S.header}>
        <h1 style={S.title}><span style={{marginRight:8}}>🖥️</span>Scan Orders</h1>
        <button style={S.newBtn} onClick={openNew}>+ New Scan</button>
      </div>

      {/* Filters */}
      <div style={S.filterRow}>
        <input style={S.search} placeholder="Search scan orders…" value={search} onChange={e => setSearch(e.target.value)} />
        <select style={S.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {["Pending","In Progress","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={S.select} value={filterUrgency} onChange={e => setFilterUrgency(e.target.value)}>
          <option value="All">All Urgency</option>
          <option>Normal</option><option>Urgent</option>
        </select>
      </div>

      {/* Stats */}
      <div style={S.statsRow}>
        {[
          ["Total",     orders.length,                                          "#60a5fa"],
          ["Completed", orders.filter(o=>o.status==="Completed").length,        "#4ade80"],
          ["Pending",   orders.filter(o=>o.status==="Pending").length,          "#facc15"],
          ["Urgent",    orders.filter(o=>o.urgency==="Urgent").length,          "#f87171"],
          ["Unassigned",orders.filter(o=>o.technician==="Unassigned").length,   "#fb923c"],
        ].map(([label, count, color]) => (
          <div key={label} style={{ ...S.statCard, borderColor: color }}>
            <span style={{ color, fontSize:22, fontWeight:700 }}>{count}</span>
            <span style={{ color:"#64748b", fontSize:12, marginTop:2 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={S.tableWrapper}>
        <table style={S.table}>
          <thead>
            <tr>
              {["ORDER ID","PATIENT","PID","SCAN TYPE","ORDERED","TECHNICIAN","STATUS","ACTIONS"].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign:"center", padding:40, color:"#475569", fontSize:14 }}>No scan orders found</td></tr>
            )}
            {filtered.map((order, i) => (
              <tr key={order.id} className="ra" style={{ animationDelay: i*45+"ms", borderBottom:"1px solid #1e293b" }}>
                <td style={{ ...S.td, color:"#64748b", fontFamily:"monospace", fontSize:13 }}>{order.id}</td>
                <td style={{ ...S.td, color:"#e2e8f0", fontWeight:600 }}>{order.patient}</td>
                <td style={{ ...S.td, color:"#475569", fontFamily:"monospace", fontSize:13 }}>{order.pid}</td>
                <td style={{ ...S.td, color:"#cbd5e1" }}>{order.scanType}</td>
                <td style={{ ...S.td, color:"#64748b", fontSize:13 }}>{order.ordered}</td>
                <td style={{ ...S.td, color: order.technician==="Unassigned" ? "#64748b" : "#94a3b8", fontStyle: order.technician==="Unassigned" ? "italic" : "normal" }}>{order.technician}</td>
                <td style={S.td}><Badge label={order.status} styleMap={statusStyle} /></td>
                <td style={S.td}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={S.editBtn} onClick={() => openEdit(order)}>Edit</button>
                    <button style={S.viewBtn} onClick={() => openView(order)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NEW / EDIT Modal */}
      {modal && (modal.type==="new" || modal.type==="edit") && (
        <Modal title={modal.type==="new" ? "➕ New Scan Order" : "✏️ Edit Scan — "+form.id} onClose={closeModal}>
          <div className="ma" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 20px" }}>
            <Field label="Patient Name *"><input {...inp("patient")} placeholder="Full name" /></Field>
            <Field label="Patient ID (PID) *"><input {...inp("pid")} placeholder="P-XXXX" /></Field>
            <Field label="Age"><input {...inp("age")} placeholder="Years" type="number" /></Field>
            <Field label="Gender">
              <select {...inp("gender")} style={S.input}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </Field>
            <Field label="Scan Type">
              <select {...inp("scanType")} style={S.input}>
                {SCAN_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Referring Doctor">
              <select {...inp("doctor")} style={S.input}>
                {DOCTORS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Ordered Date"><input {...inp("ordered")} type="date" /></Field>
            <Field label="Urgency">
              <select {...inp("urgency")} style={S.input}>
                <option>Normal</option><option>Urgent</option>
              </select>
            </Field>
            <Field label="Technician">
              <select {...inp("technician")} style={S.input}>
                {TECHNICIANS.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select {...inp("status")} style={S.input}>
                {["Pending","In Progress","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea {...inp("notes")} rows={3} placeholder="Clinical notes or scan instructions…" style={{ ...S.input, resize:"vertical", height:72 }} />
          </Field>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
            {modal.type==="edit" && (
              <button style={S.deleteBtn} onClick={() => handleDelete(form.id)}>🗑 Delete</button>
            )}
            <button style={S.cancelBtn} onClick={closeModal}>Cancel</button>
            <button style={S.saveBtn} onClick={handleSave}>{modal.type==="new" ? "Create Scan" : "Save Changes"}</button>
          </div>
        </Modal>
      )}

      {/* VIEW Modal */}
      {modal && modal.type==="view" && (
        <Modal title={"🔍 Scan Details — "+modal.order.id} onClose={closeModal}>
          <div className="ma">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 24px", marginBottom:20 }}>
              {[
                ["Order ID",      modal.order.id],
                ["Patient",       modal.order.patient],
                ["PID",           modal.order.pid],
                ["Age / Gender",  (modal.order.age||"—")+" / "+(modal.order.gender||"—")],
                ["Scan Type",     modal.order.scanType],
                ["Doctor",        modal.order.doctor||"—"],
                ["Ordered",       modal.order.ordered],
                ["Technician",    modal.order.technician],
                ["Urgency",       "__urgency__"],
                ["Status",        "__status__"],
              ].map(([k,v]) => (
                <div key={k} style={{ background:"#0f172a", borderRadius:8, padding:"10px 14px", border:"1px solid #1e293b" }}>
                  <div style={{ fontSize:11, color:"#475569", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>{k}</div>
                  {v==="__urgency__" ? <Badge label={modal.order.urgency} styleMap={urgencyStyle} /> :
                   v==="__status__"  ? <Badge label={modal.order.status}  styleMap={statusStyle}  /> :
                   <div style={{ color:"#e2e8f0", fontWeight:500, fontSize:14 }}>{v}</div>}
                </div>
              ))}
            </div>
            {modal.order.notes && (
              <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:8, padding:"12px 14px" }}>
                <div style={{ fontSize:11, color:"#475569", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 }}>Notes</div>
                <div style={{ color:"#94a3b8", fontSize:14, lineHeight:1.6 }}>{modal.order.notes}</div>
              </div>
            )}
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
              <button style={S.cancelBtn} onClick={closeModal}>Close</button>
              <button style={S.saveBtn} onClick={() => { closeModal(); setTimeout(() => openEdit(modal.order), 50); }}>✏️ Edit This Scan</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const S = {
  wrapper: { background:"#0f172a", minHeight:"100vh", padding:"28px 28px", fontFamily:"'Segoe UI', system-ui, sans-serif", color:"#e2e8f0", boxSizing:"border-box" },
  header:  { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  title:   { fontSize:26, fontWeight:700, margin:0, color:"#f1f5f9", letterSpacing:"-0.5px" },
  newBtn:  { background:"linear-gradient(135deg,#3b82f6,#2563eb)", color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontWeight:600, fontSize:14, cursor:"pointer", boxShadow:"0 2px 12px rgba(59,130,246,0.3)", transition:"all 0.15s" },
  filterRow: { display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" },
  search:  { flex:"1 1 280px", background:"#1e293b", border:"1px solid #334155", borderRadius:8, padding:"10px 14px", color:"#e2e8f0", fontSize:14, transition:"border-color 0.2s" },
  select:  { background:"#1e293b", border:"1px solid #334155", borderRadius:8, padding:"10px 14px", color:"#94a3b8", fontSize:13, cursor:"pointer", minWidth:140 },
  statsRow:{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" },
  statCard:{ background:"#1e293b", border:"1px solid", borderRadius:10, padding:"12px 20px", display:"flex", flexDirection:"column", alignItems:"center", minWidth:90 },
  tableWrapper: { background:"#1e293b", borderRadius:12, border:"1px solid #334155", overflow:"auto" },
  table:   { width:"100%", borderCollapse:"collapse", minWidth:780 },
  th:      { padding:"13px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.08em", borderBottom:"1px solid #334155", background:"#1e293b", whiteSpace:"nowrap" },
  td:      { padding:"13px 16px", fontSize:14, verticalAlign:"middle", transition:"background 0.12s" },
  editBtn: { background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:6, padding:"5px 14px", fontSize:12, fontWeight:500, cursor:"pointer", transition:"all 0.15s" },
  viewBtn: { background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:6, padding:"5px 14px", fontSize:12, fontWeight:500, cursor:"pointer", transition:"all 0.15s" },
  overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(2px)" },
  modal:   { background:"#1e293b", border:"1px solid #334155", borderRadius:16, width:"100%", maxWidth:680, maxHeight:"90vh", display:"flex", flexDirection:"column", boxShadow:"0 24px 60px rgba(0,0,0,0.5)" },
  modalHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid #334155" },
  modalTitle:  { fontWeight:700, fontSize:17, color:"#f1f5f9" },
  closeBtn:    { background:"transparent", border:"none", color:"#64748b", fontSize:18, cursor:"pointer", padding:"0 4px", lineHeight:1 },
  modalBody:   { padding:"22px 24px", overflowY:"auto" },
  label:   { display:"block", fontSize:12, fontWeight:600, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:6 },
  input:   { width:"100%", boxSizing:"border-box", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"9px 12px", color:"#e2e8f0", fontSize:14, transition:"border-color 0.2s, box-shadow 0.2s" },
  saveBtn: { background:"linear-gradient(135deg,#3b82f6,#2563eb)", color:"#fff", border:"none", borderRadius:8, padding:"10px 22px", fontWeight:600, fontSize:14, cursor:"pointer", transition:"all 0.15s" },
  cancelBtn:{ background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:8, padding:"10px 18px", fontWeight:500, fontSize:14, cursor:"pointer", transition:"all 0.15s" },
  deleteBtn:{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", borderRadius:8, padding:"10px 18px", fontWeight:500, fontSize:14, cursor:"pointer", transition:"all 0.15s" },
};
