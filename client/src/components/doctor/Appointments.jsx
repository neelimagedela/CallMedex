import { useState } from "react";

const initialAppointments = [
  { id: "A-001", patient: "Kiran Reddy",  doctor: "Dr. Kavitha Menon", date: "2026-05-29", time: "10:00 AM", type: "Consultation", status: "Confirmed"  },
  { id: "A-002", patient: "Arun Das",     doctor: "Dr. Priya Nair",    date: "2026-05-29", time: "11:30 AM", type: "Follow-up",    status: "Confirmed"  },
  { id: "A-003", patient: "Sita Devi",    doctor: "Dr. Kavitha Menon", date: "2026-05-29", time: "02:00 PM", type: "Lab Review",   status: "Pending"    },
  { id: "A-004", patient: "Ramesh Rao",   doctor: "Dr. Kavitha Menon", date: "2026-05-30", time: "09:00 AM", type: "Consultation", status: "Cancelled"  },
];

const DOCTORS  = ["Dr. Kavitha Menon","Dr. Priya Nair","Dr. Arjun Sharma","Dr. Sunita Rao"];
const TYPES    = ["Consultation","Follow-up","Lab Review","Emergency","Routine Check"];
const STATUSES = ["Confirmed","Pending","Cancelled"];

const STATUS_STYLE = {
  Confirmed:  { bg:"#14532d", color:"#4ade80", border:"#16a34a" },
  Pending:    { bg:"#78350f", color:"#fbbf24", border:"#d97706" },
  Cancelled:  { bg:"#7f1d1d", color:"#f87171", border:"#dc2626" },
};

function Badge({ status }) {
  const s = STATUS_STYLE[status] || { bg:"#1e293b", color:"#94a3b8", border:"#334155" };
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: 20, padding: "4px 13px", fontSize: 12, fontWeight: 700,
      whiteSpace: "nowrap",
    }}>{status}</span>
  );
}

const inp = {
  width: "100%", background: "#0a0f1a", border: "1px solid #1e293b",
  borderRadius: 8, padding: "10px 13px", color: "#f1f5f9", fontSize: 14,
  outline: "none", boxSizing: "border-box",
};

function Modal({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.78)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:999, backdropFilter:"blur(5px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#111827", border:"1px solid #1f2937", borderRadius:16,
        padding:"30px 34px", minWidth:480, maxWidth:560, width:"92%",
        boxShadow:"0 28px 70px rgba(0,0,0,0.7)",
      }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:"#6b7280", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:700 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

/* ── EDIT / NEW MODAL ── */
function AppointmentModal({ appt, onClose, onSave, isNew }) {
  const [form, setForm] = useState(appt ? { ...appt } : {
    patient:"", doctor: DOCTORS[0], date:"", time:"", type: TYPES[0], status:"Pending",
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <Modal onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
        <span style={{ fontSize:22 }}>{isNew ? "➕" : "✏️"}</span>
        <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f9fafb" }}>
          {isNew ? "New Appointment" : "Edit Appointment"}
        </h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
        <Field label="Patient Name">
          <input style={inp} value={form.patient} onChange={set("patient")} placeholder="Full name" />
        </Field>
        <Field label="Appointment ID">
          <input style={{ ...inp, opacity: isNew ? 0.4 : 1 }} value={form.id || "Auto"} readOnly />
        </Field>
        <Field label="Date">
          <input style={inp} type="date" value={form.date} onChange={set("date")} />
        </Field>
        <Field label="Time">
          <input style={inp} type="time" value={
            form.time
              ? (form.time.includes("AM")||form.time.includes("PM")
                  ? (() => {
                      const [t, meridiem] = form.time.split(" ");
                      let [h, m] = t.split(":");
                      h = parseInt(h);
                      if (meridiem==="PM" && h!==12) h += 12;
                      if (meridiem==="AM" && h===12) h = 0;
                      return `${String(h).padStart(2,"0")}:${m}`;
                    })()
                  : form.time)
              : ""
          } onChange={e => {
            const val = e.target.value;
            if (!val) return set("time")({ target:{ value:"" } });
            const [hStr, mStr] = val.split(":");
            let h = parseInt(hStr), m = mStr;
            const meridiem = h >= 12 ? "PM" : "AM";
            if (h > 12) h -= 12;
            if (h === 0) h = 12;
            set("time")({ target:{ value:`${h}:${m} ${meridiem}` } });
          }} />
        </Field>
      </div>

      <Field label="Doctor">
        <select style={{ ...inp, cursor:"pointer" }} value={form.doctor} onChange={set("doctor")}>
          {DOCTORS.map(d => <option key={d}>{d}</option>)}
        </select>
      </Field>
      <Field label="Appointment Type">
        <select style={{ ...inp, cursor:"pointer" }} value={form.type} onChange={set("type")}>
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Status">
        <select style={{ ...inp, cursor:"pointer" }} value={form.status} onChange={set("status")}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </Field>

      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
        <button onClick={onClose} style={{
          padding:"9px 22px", borderRadius:8, border:"1px solid #374151",
          background:"transparent", color:"#9ca3af", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>Cancel</button>
        <button
          onClick={() => {
            if (!form.patient.trim()) { alert("Patient name is required"); return; }
            if (!form.date)           { alert("Date is required"); return; }
            if (!form.time)           { alert("Time is required"); return; }
            onSave(form); onClose();
          }}
          style={{ padding:"9px 22px", borderRadius:8, border:"none", background:"#2563eb", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}
        >
          {isNew ? "✔ Book Appointment" : "💾 Save Changes"}
        </button>
      </div>
    </Modal>
  );
}

/* ── CANCEL CONFIRM MODAL ── */
function CancelModal({ appt, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
        <span style={{ fontSize:22 }}>⚠️</span>
        <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f9fafb" }}>Cancel Appointment</h2>
      </div>
      <p style={{ color:"#9ca3af", fontSize:14, lineHeight:1.7, marginBottom:22 }}>
        Are you sure you want to cancel the appointment for{" "}
        <strong style={{ color:"#f9fafb" }}>{appt.patient}</strong> with{" "}
        <strong style={{ color:"#f9fafb" }}>{appt.doctor}</strong> on {appt.date} at {appt.time}?
      </p>
      <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
        <button onClick={onClose} style={{
          padding:"9px 22px", borderRadius:8, border:"1px solid #374151",
          background:"transparent", color:"#9ca3af", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>Keep It</button>
        <button onClick={() => { onConfirm(appt.id); onClose(); }} style={{
          padding:"9px 22px", borderRadius:8, border:"none",
          background:"#dc2626", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>Yes, Cancel</button>
      </div>
    </Modal>
  );
}

/* ── TOAST ── */
function Toast({ msg, color }) {
  return (
    <div style={{
      position:"fixed", top:22, right:22, background:color, color:"#fff",
      padding:"12px 22px", borderRadius:10, fontWeight:700, fontSize:14,
      zIndex:1999, boxShadow:"0 8px 28px rgba(0,0,0,0.5)",
    }}>{msg}</div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Appointments() {
  const [appts,  setAppts]  = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [modal,  setModal]  = useState(null);
  const [toast,  setToast]  = useState(null);

  let counter = appts.length + 1;
  const nextId = () => {
    const id = `A-${String(counter).padStart(3,"0")}`;
    counter++;
    return id;
  };

  const showToast = (msg, color="#22c55e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSave = form => {
    if (form.id && appts.find(a => a.id === form.id)) {
      setAppts(ps => ps.map(a => a.id === form.id ? form : a));
      showToast("✓ Appointment updated");
    } else {
      const newAppt = { ...form, id: `A-${String(appts.length+1).padStart(3,"0")}` };
      setAppts(ps => [...ps, newAppt]);
      showToast("✓ Appointment booked", "#3b82f6");
    }
  };

  const handleCancel = id => {
    setAppts(ps => ps.map(a => a.id === id ? { ...a, status:"Cancelled" } : a));
    showToast("Appointment cancelled", "#ef4444");
  };

  const displayed = appts.filter(a => {
    const q = search.toLowerCase();
    return (
      a.patient.toLowerCase().includes(q) ||
      a.doctor.toLowerCase().includes(q)  ||
      a.id.toLowerCase().includes(q)      ||
      a.type.toLowerCase().includes(q)
    );
  });

  const editBtn   = { padding:"6px 15px", borderRadius:7, border:"1px solid #2563eb", background:"transparent", color:"#60a5fa", fontSize:13, fontWeight:700, cursor:"pointer" };
  const cancelBtn = { padding:"6px 15px", borderRadius:7, border:"1px solid #dc2626", background:"transparent", color:"#f87171", fontSize:13, fontWeight:700, cursor:"pointer" };

  return (
    <div style={{ background:"#0d1117", minHeight:"100vh", padding:"32px 24px", fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#e5e7eb" }}>
      <style>{`* { box-sizing:border-box; } option { background:#1f2937; }`}</style>

      {toast && <Toast msg={toast.msg} color={toast.color} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <span style={{ fontSize:26 }}>📅</span>
        <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#f9fafb" }}>Appointments</h1>
      </div>

      {/* Search + New */}
      <div style={{ display:"flex", gap:12, marginBottom:22 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search appointments..."
          style={{
            flex:1, background:"#161d2b", border:"1px solid #1f2937",
            borderRadius:10, padding:"11px 16px", color:"#f9fafb", fontSize:14, outline:"none",
          }}
        />
        <button
          onClick={() => setModal({ type:"new" })}
          style={{
            padding:"11px 22px", borderRadius:10, border:"none",
            background:"#2563eb", color:"#fff", fontSize:14, fontWeight:700,
            cursor:"pointer", whiteSpace:"nowrap",
          }}
        >
          + New Appointment
        </button>
      </div>

      {/* Table */}
      <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, overflow:"auto" }}>

        {/* Table Head */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"90px 160px 180px 120px 100px 130px 120px 160px",
          padding:"13px 20px", background:"#0d1117",
          borderBottom:"1px solid #1f2937",
        }}>
          {["ID","PATIENT","DOCTOR","DATE","TIME","TYPE","STATUS","ACTIONS"].map(h => (
            <div key={h} style={{ fontSize:11, fontWeight:800, color:"#4b5563", letterSpacing:"0.07em" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {displayed.length === 0 ? (
          <div style={{ padding:"50px", textAlign:"center", color:"#374151" }}>
            <div style={{ fontSize:34, marginBottom:10 }}>📭</div>
            <div style={{ fontWeight:600, fontSize:15 }}>No appointments found</div>
          </div>
        ) : displayed.map((a, i) => (
          <div
            key={a.id}
            style={{
              display:"grid",
              gridTemplateColumns:"90px 160px 180px 120px 100px 130px 120px 160px",
              padding:"15px 20px", alignItems:"center",
              borderBottom: i < displayed.length-1 ? "1px solid #1a2235" : "none",
              transition:"background 0.12s",
            }}
            onMouseEnter={e => e.currentTarget.style.background="#161d2b"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}
          >
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"monospace", fontWeight:600 }}>{a.id}</div>
            <div style={{ fontWeight:700, color:"#f9fafb", fontSize:14 }}>{a.patient}</div>
            <div style={{ color:"#9ca3af", fontSize:13 }}>{a.doctor}</div>
            <div style={{ color:"#d1d5db", fontSize:13 }}>{a.date}</div>
            <div style={{ color:"#d1d5db", fontSize:13 }}>{a.time}</div>
            <div style={{ color:"#d1d5db", fontSize:13 }}>{a.type}</div>
            <div><Badge status={a.status} /></div>
            <div style={{ display:"flex", gap:8 }}>
              <button
                style={editBtn}
                onClick={() => setModal({ type:"edit", appt: a })}
                onMouseEnter={e => { e.target.style.background="#2563eb"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#60a5fa"; }}
              >Edit</button>
              <button
                style={cancelBtn}
                onClick={() => setModal({ type:"cancel", appt: a })}
                onMouseEnter={e => { e.target.style.background="#dc2626"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#f87171"; }}
              >Cancel</button>
            </div>
          </div>
        ))}
      </div>

      {/* Count */}
      <div style={{ marginTop:14, fontSize:13, color:"#374151" }}>
        {displayed.length} appointment{displayed.length !== 1 ? "s" : ""}
        {search && <span style={{ color:"#f59e0b" }}> · search: "{search}"</span>}
      </div>

      {/* Modals */}
      {modal?.type === "new"    && <AppointmentModal isNew  onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "edit"   && <AppointmentModal appt={modal.appt} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "cancel" && <CancelModal appt={modal.appt} onClose={() => setModal(null)} onConfirm={handleCancel} />}
    </div>
  );
}
