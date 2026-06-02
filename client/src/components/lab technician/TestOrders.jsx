import { useState } from "react";

const INITIAL_ORDERS = [
  { id: "TO-2201", patient: "Kiran Reddy", pid: "P-3423", test: "HbA1c", ordered: "2026-05-28", priority: "Normal", status: "Completed", notes: "Fasting sample collected. Results within normal range.", age: 45, gender: "Male", doctor: "Dr. Sharma" },
  { id: "TO-2202", patient: "Arun Das", pid: "P-3425", test: "Urine R&M", ordered: "2026-05-28", priority: "Normal", status: "Completed", notes: "Midstream urine sample.", age: 32, gender: "Male", doctor: "Dr. Priya" },
  { id: "TO-2203", patient: "Ravi Kumar", pid: "P-3421", test: "CBC", ordered: "2026-05-29", priority: "Urgent", status: "Pending QC", notes: "Urgent - possible infection.", age: 28, gender: "Male", doctor: "Dr. Reddy" },
  { id: "TO-2204", patient: "Sita Devi", pid: "P-3430", test: "Thyroid Panel", ordered: "2026-05-29", priority: "Normal", status: "In Progress", notes: "Routine thyroid check.", age: 52, gender: "Female", doctor: "Dr. Sharma" },
  { id: "TO-2205", patient: "Ramesh Rao", pid: "P-3431", test: "Lipid Profile", ordered: "2026-05-29", priority: "Normal", status: "Pending", notes: "Annual health checkup.", age: 60, gender: "Male", doctor: "Dr. Priya" },
  { id: "TO-2206", patient: "karishma", pid: "p-1234", test: "CBC", ordered: "2026-06-01", priority: "Urgent", status: "Pending", notes: "Emergency referral.", age: 24, gender: "Female", doctor: "Dr. Reddy" },
];

const TESTS = ["HbA1c", "Urine R&M", "CBC", "Thyroid Panel", "Lipid Profile", "Blood Glucose", "Liver Function", "Kidney Function", "Serum Electrolytes", "ESR", "CRP"];
const DOCTORS = ["Dr. Sharma", "Dr. Priya", "Dr. Reddy", "Dr. Mehta", "Dr. Iyer"];

const priorityStyle = {
  Normal: { background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" },
  Urgent: { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
};
const statusStyle = {
  Completed:     { background: "rgba(34,197,94,0.15)",  color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" },
  "Pending QC":  { background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)" },
  "In Progress": { background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" },
  Pending:       { background: "rgba(234,179,8,0.15)",  color: "#facc15", border: "1px solid rgba(234,179,8,0.3)" },
};

const emptyForm = { patient: "", pid: "", test: TESTS[0], ordered: new Date().toISOString().split("T")[0], priority: "Normal", status: "Pending", notes: "", age: "", gender: "Male", doctor: DOCTORS[0] };

function Badge({ label, styleMap }) {
  const s = styleMap[label] || { background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" };
  return <span style={{ ...s, display: "inline-block", padding: "3px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>{title}</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function TestOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#4ade80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const openNew = () => { setForm(emptyForm); setModal({ type: "new" }); };
  const openEdit = (order) => { setForm({ ...order }); setModal({ type: "edit", order }); };
  const openView = (order) => setModal({ type: "view", order });
  const closeModal = () => setModal(null);

  const nextId = () => {
    const nums = orders.map(o => parseInt(o.id.replace("TO-", ""), 10));
    return "TO-" + (Math.max(...nums) + 1);
  };

  const handleSave = () => {
    if (!form.patient.trim() || !form.pid.trim()) { showToast("Patient name and PID are required.", "#f87171"); return; }
    if (modal.type === "new") {
      setOrders(prev => [{ ...form, id: nextId() }, ...prev]);
      showToast("New order created successfully!");
    } else {
      setOrders(prev => prev.map(o => o.id === form.id ? { ...form } : o));
      showToast("Order updated successfully!", "#60a5fa");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    closeModal();
    showToast("Order deleted.", "#f87171");
  };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = o.patient.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.test.toLowerCase().includes(q) || o.pid.toLowerCase().includes(q);
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    const matchPriority = filterPriority === "All" || o.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const inp = (key) => ({
    value: form[key],
    onChange: e => setForm(f => ({ ...f, [key]: e.target.value })),
    style: styles.input,
  });

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        .row-anim { animation: fadeIn 0.3s ease both; }
        .modal-anim { animation: slideIn 0.25s cubic-bezier(.34,1.3,.7,1) both; }
        .toast-anim { animation: toastIn 0.3s ease both; }
        button:active { transform: scale(0.96) !important; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.18); }
        tr:hover td { background: rgba(255,255,255,0.025); }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      {toast && (
        <div className="toast-anim" style={{ position: "fixed", top: 24, right: 24, background: "#1e293b", border: "1px solid " + toast.color, color: toast.color, borderRadius: 10, padding: "12px 20px", fontWeight: 600, fontSize: 14, zIndex: 9999, boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          {toast.msg}
        </div>
      )}

      <div style={styles.header}>
        <h1 style={styles.title}><span style={{ marginRight: 8 }}>🧪</span>Test Orders</h1>
        <button style={styles.newBtn} onClick={openNew}>+ New Order</button>
      </div>

      <div style={styles.filterRow}>
        <input style={styles.search} placeholder="Search by patient, ID, test, PID…" value={search} onChange={e => setSearch(e.target.value)} />
        <select style={styles.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          {["Completed","Pending QC","In Progress","Pending"].map(s => <option key={s}>{s}</option>)}
        </select>
        <select style={styles.select} value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option>Normal</option>
          <option>Urgent</option>
        </select>
      </div>

      <div style={styles.statsRow}>
        {[["Total", orders.length, "#60a5fa"], ["Completed", orders.filter(o=>o.status==="Completed").length, "#4ade80"], ["Pending", orders.filter(o=>o.status==="Pending").length, "#facc15"], ["Urgent", orders.filter(o=>o.priority==="Urgent").length, "#f87171"]].map(([label, count, color]) => (
          <div key={label} style={{ ...styles.statCard, borderColor: color }}>
            <span style={{ color, fontSize: 22, fontWeight: 700 }}>{count}</span>
            <span style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["ORDER ID","PATIENT","PID","TEST","ORDERED","PRIORITY","STATUS","ACTIONS"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "#475569", fontSize: 14 }}>No orders found</td></tr>
            )}
            {filtered.map((order, i) => (
              <tr key={order.id} className="row-anim" style={{ animationDelay: i * 45 + "ms", borderBottom: "1px solid #1e293b" }}>
                <td style={{ ...styles.td, color: "#64748b", fontFamily: "monospace", fontSize: 13 }}>{order.id}</td>
                <td style={{ ...styles.td, color: "#e2e8f0", fontWeight: 600 }}>{order.patient}</td>
                <td style={{ ...styles.td, color: "#475569", fontFamily: "monospace", fontSize: 13 }}>{order.pid}</td>
                <td style={{ ...styles.td, color: "#cbd5e1" }}>{order.test}</td>
                <td style={{ ...styles.td, color: "#64748b", fontSize: 13 }}>{order.ordered}</td>
                <td style={styles.td}><Badge label={order.priority} styleMap={priorityStyle} /></td>
                <td style={styles.td}><Badge label={order.status} styleMap={statusStyle} /></td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={styles.editBtn} onClick={() => openEdit(order)}>Edit</button>
                    <button style={styles.viewBtn} onClick={() => openView(order)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (modal.type === "new" || modal.type === "edit") && (
        <Modal title={modal.type === "new" ? "➕ Create New Order" : "✏️ Edit Order — " + form.id} onClose={closeModal}>
          <div className="modal-anim" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Field label="Patient Name *"><input {...inp("patient")} placeholder="Full name" /></Field>
            <Field label="Patient ID (PID) *"><input {...inp("pid")} placeholder="P-XXXX" /></Field>
            <Field label="Age"><input {...inp("age")} placeholder="Years" type="number" /></Field>
            <Field label="Gender">
              <select {...inp("gender")} style={styles.input}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </Field>
            <Field label="Test">
              <select {...inp("test")} style={styles.input}>
                {TESTS.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Referring Doctor">
              <select {...inp("doctor")} style={styles.input}>
                {DOCTORS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Ordered Date"><input {...inp("ordered")} type="date" /></Field>
            <Field label="Priority">
              <select {...inp("priority")} style={styles.input}>
                <option>Normal</option><option>Urgent</option>
              </select>
            </Field>
            <Field label="Status">
              <select {...inp("status")} style={styles.input}>
                {["Pending","In Progress","Pending QC","Completed"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea {...inp("notes")} rows={3} placeholder="Clinical notes or remarks…" style={{ ...styles.input, resize: "vertical", height: 72 }} />
          </Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            {modal.type === "edit" && (
              <button style={styles.deleteBtn} onClick={() => handleDelete(form.id)}>🗑 Delete</button>
            )}
            <button style={styles.cancelBtn} onClick={closeModal}>Cancel</button>
            <button style={styles.saveBtn} onClick={handleSave}>{modal.type === "new" ? "Create Order" : "Save Changes"}</button>
          </div>
        </Modal>
      )}

      {modal && modal.type === "view" && (
        <Modal title={"🔍 Order Details — " + modal.order.id} onClose={closeModal}>
          <div className="modal-anim">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: 20 }}>
              {[
                ["Order ID", modal.order.id],
                ["Patient", modal.order.patient],
                ["PID", modal.order.pid],
                ["Age / Gender", (modal.order.age || "—") + " / " + (modal.order.gender || "—")],
                ["Test", modal.order.test],
                ["Doctor", modal.order.doctor || "—"],
                ["Ordered", modal.order.ordered],
                ["Priority", "__priority__"],
                ["Status", "__status__"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#0f172a", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e293b" }}>
                  <div style={{ fontSize: 11, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>{k}</div>
                  {v === "__priority__" ? <Badge label={modal.order.priority} styleMap={priorityStyle} /> :
                   v === "__status__"   ? <Badge label={modal.order.status}   styleMap={statusStyle}   /> :
                   <div style={{ color: "#e2e8f0", fontWeight: 500, fontSize: 14 }}>{v}</div>}
                </div>
              ))}
            </div>
            {modal.order.notes && (
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Notes</div>
                <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{modal.order.notes}</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button style={styles.cancelBtn} onClick={closeModal}>Close</button>
              <button style={styles.saveBtn} onClick={() => { closeModal(); setTimeout(() => openEdit(modal.order), 50); }}>✏️ Edit This Order</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const styles = {
  wrapper: { background: "#0f172a", minHeight: "100vh", padding: "28px 28px", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#e2e8f0", boxSizing: "border-box" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 700, margin: 0, color: "#f1f5f9", letterSpacing: "-0.5px" },
  newBtn: { background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 12px rgba(59,130,246,0.3)", transition: "all 0.15s ease" },
  filterRow: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
  search: { flex: "1 1 280px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, transition: "border-color 0.2s" },
  select: { background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px", color: "#94a3b8", fontSize: 13, cursor: "pointer", minWidth: 140 },
  statsRow: { display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  statCard: { background: "#1e293b", border: "1px solid", borderRadius: 10, padding: "12px 20px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 90 },
  tableWrapper: { background: "#1e293b", borderRadius: 12, border: "1px solid #334155", overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 720 },
  th: { padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.08em", borderBottom: "1px solid #334155", background: "#1e293b", whiteSpace: "nowrap" },
  td: { padding: "13px 16px", fontSize: 14, verticalAlign: "middle", transition: "background 0.12s" },
  editBtn: { background: "transparent", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" },
  viewBtn: { background: "transparent", border: "1px solid #334155", color: "#94a3b8", borderRadius: 6, padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(2px)" },
  modal: { background: "#1e293b", border: "1px solid #334155", borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #334155" },
  modalTitle: { fontWeight: 700, fontSize: 17, color: "#f1f5f9" },
  closeBtn: { background: "transparent", border: "none", color: "#64748b", fontSize: 18, cursor: "pointer", padding: "0 4px", lineHeight: 1 },
  modalBody: { padding: "22px 24px", overflowY: "auto" },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 },
  input: { width: "100%", boxSizing: "border-box", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "9px 12px", color: "#e2e8f0", fontSize: 14, transition: "border-color 0.2s, box-shadow 0.2s" },
  saveBtn: { background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.15s" },
  cancelBtn: { background: "transparent", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "10px 18px", fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "all 0.15s" },
  deleteBtn: { background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", borderRadius: 8, padding: "10px 18px", fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "all 0.15s" },
};