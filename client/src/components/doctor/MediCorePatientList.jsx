import { useState } from "react";

const initialPatients = [
  { id: 1, patientId: "P-3423", name: "Kiran Reddy",  age: 45, test: "HbA1c",        doctor: "Dr. Kavitha Menon", date: "2026-05-28", status: "Verified"    },
  { id: 2, patientId: "P-3425", name: "Arun Das",     age: 32, test: "Urine R&M",    doctor: "Dr. Kavitha Menon", date: "2026-05-28", status: "Verified"    },
  { id: 3, patientId: "P-3421", name: "Ravi Kumar",   age: 58, test: "CBC",           doctor: "Dr. Priya Nair",    date: "2026-05-29", status: "In Progress" },
  { id: 4, patientId: "P-3430", name: "Sita Devi",    age: 39, test: "Thyroid Panel", doctor: "Dr. Kavitha Menon", date: "2026-05-29", status: "Waiting"     },
  { id: 5, patientId: "P-3431", name: "Ramesh Rao",   age: 52, test: "Lipid Profile", doctor: "Dr. Kavitha Menon", date: "2026-05-29", status: "Waiting"     },
  { id: 6, patientId: "P-3432", name: "Meena Joshi",  age: 63, test: "Blood Sugar",   doctor: "Dr. Priya Nair",    date: "2026-05-27", status: "Completed"   },
];

const STATUS_META = {
  "Verified":    { bg: "#0f766e", border: "#14b8a6", dot: "#2dd4bf" },
  "In Progress": { bg: "#1e3a8a", border: "#3b82f6", dot: "#60a5fa" },
  "Waiting":     { bg: "#92400e", border: "#f59e0b", dot: "#fbbf24" },
  "Completed":   { bg: "#14532d", border: "#22c55e", dot: "#4ade80" },
};

const ALL_STATUSES = ["All Status","Verified","In Progress","Waiting","Completed"];
const ALL_TESTS    = ["HbA1c","Urine R&M","CBC","Thyroid Panel","Lipid Profile","Blood Sugar","ECG","X-Ray","MRI","CT Scan"];
const ALL_DOCTORS  = ["Dr. Kavitha Menon","Dr. Priya Nair","Dr. Arjun Sharma","Dr. Sunita Rao"];

/* ── Badge ── */
function Badge({ status }) {
  const m = STATUS_META[status] || { bg:"#1e293b", border:"#475569", dot:"#94a3b8" };
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:m.bg, border:`1px solid ${m.border}`,
      borderRadius:20, padding:"4px 11px",
      fontSize:11, fontWeight:700, color:"#fff", whiteSpace:"nowrap",
    }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:m.dot }} />
      {status}
    </span>
  );
}

/* ── Reusable input style ── */
const inp = {
  width:"100%", background:"#0a0f1a", border:"1px solid #1e293b",
  borderRadius:8, padding:"10px 13px", color:"#f1f5f9", fontSize:14,
  outline:"none", boxSizing:"border-box",
};

/* ── Modal shell ── */
function Modal({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.75)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:999, backdropFilter:"blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#111827", border:"1px solid #1f2937",
        borderRadius:16, padding:"30px 34px",
        minWidth:460, maxWidth:560, width:"90%",
        boxShadow:"0 24px 60px rgba(0,0,0,0.7)",
      }}>
        {children}
      </div>
    </div>
  );
}

function ModalTitle({ icon, text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
      <span style={{ fontSize:22 }}>{icon}</span>
      <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f8fafc" }}>{text}</h2>
    </div>
  );
}

function ModalBtns({ children }) {
  return <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:24 }}>{children}</div>;
}

/* ── VIEW MODAL ── */
function ViewModal({ patient, onClose }) {
  const rows = [
    ["Patient ID", patient.patientId],
    ["Name",       patient.name],
    ["Age",        `${patient.age} yrs`],
    ["Test",       patient.test],
    ["Doctor",     patient.doctor],
    ["Date",       patient.date],
    ["Status",     <Badge status={patient.status} />],
  ];
  return (
    <Modal onClose={onClose}>
      <ModalTitle icon="🔍" text="Patient Details" />
      <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid #1f2937", marginBottom:20 }}>
        {rows.map(([k,v], i) => (
          <div key={k} style={{
            display:"flex", alignItems:"center", padding:"12px 16px",
            borderBottom: i < rows.length-1 ? "1px solid #1a2235" : "none",
            background: i%2 ? "#0d1117" : "transparent",
          }}>
            <span style={{ width:110, fontSize:12, color:"#6b7280", fontWeight:600 }}>{k}</span>
            <span style={{ color:"#e5e7eb", fontSize:14 }}>{v}</span>
          </div>
        ))}
      </div>
      <ModalBtns>
        <button onClick={onClose} style={{ padding:"9px 22px", borderRadius:8, border:"none", background:"#3b82f6", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>
          Close
        </button>
      </ModalBtns>
    </Modal>
  );
}

/* ── EDIT MODAL ── */
function EditModal({ patient, onClose, onSave }) {
  const [form, setForm] = useState({ ...patient });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const F = ({ label, children }) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:"#6b7280", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:700 }}>{label}</div>
      {children}
    </div>
  );
  return (
    <Modal onClose={onClose}>
      <ModalTitle icon="✏️" text="Edit Patient Record" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
        <F label="Full Name">
          <input style={inp} value={form.name} onChange={set("name")} />
        </F>
        <F label="Age">
          <input style={inp} type="number" value={form.age} onChange={set("age")} />
        </F>
        <F label="Patient ID">
          <input style={inp} value={form.patientId} onChange={set("patientId")} />
        </F>
        <F label="Date">
          <input style={inp} type="date" value={form.date} onChange={set("date")} />
        </F>
      </div>
      <F label="Test Type">
        <select style={{ ...inp, cursor:"pointer" }} value={form.test} onChange={set("test")}>
          {ALL_TESTS.map(t => <option key={t}>{t}</option>)}
        </select>
      </F>
      <F label="Doctor">
        <select style={{ ...inp, cursor:"pointer" }} value={form.doctor} onChange={set("doctor")}>
          {ALL_DOCTORS.map(d => <option key={d}>{d}</option>)}
        </select>
      </F>
      <F label="Status">
        <select style={{ ...inp, cursor:"pointer" }} value={form.status} onChange={set("status")}>
          {ALL_STATUSES.slice(1).map(s => <option key={s}>{s}</option>)}
        </select>
      </F>
      <ModalBtns>
        <button onClick={onClose} style={{ padding:"9px 22px", borderRadius:8, border:"1px solid #374151", background:"transparent", color:"#9ca3af", fontWeight:700, cursor:"pointer", fontSize:14 }}>
          Cancel
        </button>
        <button onClick={() => { onSave(form); onClose(); }} style={{ padding:"9px 22px", borderRadius:8, border:"none", background:"#3b82f6", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>
          💾 Save Changes
        </button>
      </ModalBtns>
    </Modal>
  );
}

/* ── SIGN MODAL ── */
function SignModal({ patient, onClose, onSign }) {
  return (
    <Modal onClose={onClose}>
      <ModalTitle icon="✍️" text="Sign & Verify Report" />
      <p style={{ color:"#9ca3af", fontSize:14, lineHeight:1.7, marginBottom:20 }}>
        Signing the report for <strong style={{ color:"#f9fafb" }}>{patient.name}</strong> ({patient.test}).
        This marks it as <strong style={{ color:"#4ade80" }}>Verified</strong>.
      </p>
      <div style={{ background:"#0a0f1a", border:"1px solid #1f2937", borderRadius:10, padding:"16px 18px", marginBottom:20 }}>
        <div style={{ fontSize:11, color:"#6b7280", marginBottom:4, textTransform:"uppercase" }}>Digital Signature</div>
        <div style={{ fontSize:17, fontWeight:800, color:"#60a5fa", fontStyle:"italic" }}>Dr. Kavitha Menon</div>
      </div>
      <ModalBtns>
        <button onClick={onClose} style={{ padding:"9px 22px", borderRadius:8, border:"1px solid #374151", background:"transparent", color:"#9ca3af", fontWeight:700, cursor:"pointer", fontSize:14 }}>
          Cancel
        </button>
        <button onClick={() => { onSign(patient.id); onClose(); }} style={{ padding:"9px 22px", borderRadius:8, border:"none", background:"#16a34a", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>
          ✔ Confirm Sign
        </button>
      </ModalBtns>
    </Modal>
  );
}

/* ── TOAST ── */
function Toast({ msg, color }) {
  return (
    <div style={{
      position:"fixed", top:22, right:22, background:color, color:"#fff",
      padding:"11px 20px", borderRadius:10, fontWeight:700, fontSize:14,
      zIndex:1999, boxShadow:"0 8px 28px rgba(0,0,0,0.5)",
    }}>{msg}</div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function PatientList() {
  const [patients, setPatients] = useState(initialPatients);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("All Status");
  const [modal,    setModal]    = useState(null);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, color = "#22c55e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSave = updated => {
    setPatients(ps => ps.map(p => p.id === updated.id ? updated : p));
    showToast("✓ Record updated successfully");
  };
  const handleSign = id => {
    setPatients(ps => ps.map(p => p.id === id ? { ...p, status:"Verified" } : p));
    showToast("✓ Report signed & verified", "#3b82f6");
  };

  const displayed = patients.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q) ||
       p.test.toLowerCase().includes(q)  || p.doctor.toLowerCase().includes(q)) &&
      (filter === "All Status" || p.status === filter)
    );
  });

  /* button styles — solid, always visible */
  const viewBtn  = { padding:"6px 14px", borderRadius:7, border:"1px solid #4b5563", background:"#1f2937", color:"#e5e7eb", fontSize:13, fontWeight:700, cursor:"pointer" };
  const editBtn  = { padding:"6px 14px", borderRadius:7, border:"none",              background:"#2563eb", color:"#fff",    fontSize:13, fontWeight:700, cursor:"pointer" };
  const signBtn  = { padding:"6px 14px", borderRadius:7, border:"none",              background:"#16a34a", color:"#fff",    fontSize:13, fontWeight:700, cursor:"pointer" };

  return (
    <div style={{ background:"#0d1117", minHeight:"100vh", padding:"32px 24px", fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#e5e7eb" }}>
      <style>{`* { box-sizing:border-box; } option { background:#1f2937; } ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:#1f2937;border-radius:4px}`}</style>

      {toast && <Toast msg={toast.msg} color={toast.color} />}

      {/* ── Header ── */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <span style={{ fontSize:26 }}>👥</span>
        <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#f9fafb" }}>Patient List</h1>
        <span style={{ marginLeft:"auto", fontSize:13, color:"#6b7280" }}>
          {displayed.length} of {patients.length} patients
        </span>
      </div>

      {/* ── Search + Filter ── */}
      <div style={{ display:"flex", gap:12, marginBottom:20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search patients..."
          style={{
            flex:1, background:"#161d2b", border:"1px solid #1f2937",
            borderRadius:10, padding:"11px 16px", color:"#f9fafb",
            fontSize:14, outline:"none",
          }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            background:"#161d2b", border:"1px solid #2563eb",
            borderRadius:10, padding:"11px 16px", color:"#60a5fa",
            fontSize:14, fontWeight:700, cursor:"pointer", outline:"none", minWidth:148,
          }}
        >
          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* ── Table ── */}
      <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, overflow:"auto" }}>

        {/* Header */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"44px 90px 150px 60px 130px 170px 108px 120px 200px",
          padding:"12px 18px", background:"#0d1117",
          borderBottom:"1px solid #1f2937",
        }}>
          {["#","PATIENT ID","NAME","AGE","TEST","DOCTOR","DATE","STATUS","ACTIONS"].map(h => (
            <div key={h} style={{ fontSize:11, fontWeight:800, color:"#4b5563", letterSpacing:"0.07em" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {displayed.length === 0 ? (
          <div style={{ padding:"50px", textAlign:"center", color:"#374151" }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🔎</div>
            <div style={{ fontWeight:600 }}>No patients found</div>
          </div>
        ) : displayed.map((p, i) => (
          <div
            key={p.id}
            style={{
              display:"grid",
              gridTemplateColumns:"44px 90px 150px 60px 130px 170px 108px 120px 200px",
              padding:"14px 18px", alignItems:"center",
              borderBottom: i < displayed.length-1 ? "1px solid #1a2235" : "none",
              transition:"background 0.12s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#161d2b"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {/* # */}
            <div style={{ color:"#4b5563", fontWeight:700 }}>{i + 1}</div>

            {/* Patient ID */}
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"monospace" }}>{p.patientId}</div>

            {/* Name */}
            <div style={{ fontWeight:700, color:"#f9fafb", fontSize:14 }}>{p.name}</div>

            {/* Age */}
            <div style={{ color:"#9ca3af", fontSize:14 }}>{p.age}</div>

            {/* Test */}
            <div style={{ color:"#d1d5db", fontSize:13 }}>{p.test}</div>

            {/* Doctor */}
            <div style={{ color:"#9ca3af", fontSize:13 }}>{p.doctor}</div>

            {/* Date */}
            <div style={{ color:"#6b7280", fontSize:13 }}>{p.date}</div>

            {/* Status */}
            <div><Badge status={p.status} /></div>

            {/* Actions — solid visible buttons */}
            <div style={{ display:"flex", gap:7, alignItems:"center" }}>
              <button style={viewBtn} onClick={() => setModal({ type:"view", patient:p })}>
                View
              </button>
              <button style={editBtn} onClick={() => setModal({ type:"edit", patient:p })}>
                Edit
              </button>
              {p.status === "In Progress" && (
                <button style={signBtn} onClick={() => setModal({ type:"sign", patient:p })}>
                  Sign
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Modals ── */}
      {modal?.type === "view" && <ViewModal patient={modal.patient} onClose={() => setModal(null)} />}
      {modal?.type === "edit" && <EditModal patient={modal.patient} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "sign" && <SignModal patient={modal.patient} onClose={() => setModal(null)} onSign={handleSign} />}
    </div>
  );
}
