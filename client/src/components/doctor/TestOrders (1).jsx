import { useState } from "react";

const initialOrders = [
  { id:"TO-2201", patient:"Kiran Reddy", pid:"P-3423", test:"HbA1c",        ordered:"2026-05-28", priority:"Normal", status:"Completed"  },
  { id:"TO-2202", patient:"Arun Das",    pid:"P-3425", test:"Urine R&M",    ordered:"2026-05-28", priority:"Normal", status:"Completed"  },
  { id:"TO-2203", patient:"Ravi Kumar",  pid:"P-3421", test:"CBC",           ordered:"2026-05-29", priority:"Urgent", status:"Pending QC" },
  { id:"TO-2204", patient:"Sita Devi",   pid:"P-3430", test:"Thyroid Panel", ordered:"2026-05-29", priority:"Normal", status:"In Progress"},
  { id:"TO-2205", patient:"Ramesh Rao",  pid:"P-3431", test:"Lipid Profile", ordered:"2026-05-29", priority:"Normal", status:"Pending"    },
];

const ALL_TESTS      = ["HbA1c","Urine R&M","CBC","Thyroid Panel","Lipid Profile","Blood Sugar","ECG","X-Ray","MRI","CT Scan","Urine Culture","Liver Function"];
const ALL_PRIORITIES = ["Normal","Urgent","STAT"];
const ALL_STATUSES   = ["Pending","In Progress","Pending QC","Completed","Cancelled"];

const PRIORITY_STYLE = {
  Normal: { bg:"#1e3a5f", color:"#60a5fa", border:"#2563eb" },
  Urgent: { bg:"#7f1d1d", color:"#f87171", border:"#dc2626" },
  STAT:   { bg:"#4c1d95", color:"#c4b5fd", border:"#7c3aed" },
};

const STATUS_STYLE = {
  Completed:    { bg:"#14532d", color:"#4ade80", border:"#16a34a" },
  "Pending QC": { bg:"#78350f", color:"#fbbf24", border:"#d97706" },
  "In Progress":{ bg:"#1e3a8a", color:"#93c5fd", border:"#2563eb" },
  Pending:      { bg:"#713f12", color:"#fdba74", border:"#ea580c" },
  Cancelled:    { bg:"#7f1d1d", color:"#f87171", border:"#dc2626" },
};

function Badge({ label, styleMap }) {
  const s = styleMap[label] || { bg:"#1e293b", color:"#94a3b8", border:"#334155" };
  return (
    <span style={{
      background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      borderRadius:20, padding:"4px 13px", fontSize:12, fontWeight:700, whiteSpace:"nowrap",
    }}>{label}</span>
  );
}

const inp = {
  width:"100%", background:"#0a0f1a", border:"1px solid #1e293b",
  borderRadius:8, padding:"10px 13px", color:"#f1f5f9", fontSize:14,
  outline:"none", boxSizing:"border-box",
};

function Overlay({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.78)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:999, backdropFilter:"blur(5px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background:"#111827", border:"1px solid #1f2937", borderRadius:16,
        padding:"30px 34px", minWidth:500, maxWidth:580, width:"92%",
        boxShadow:"0 28px 70px rgba(0,0,0,0.7)",
      }}>
        {children}
      </div>
    </div>
  );
}

function F({ label, children }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:11, color:"#6b7280", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:700 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

/* ── VIEW MODAL ── */
function ViewModal({ order, onClose }) {
  const rows = [
    ["Order ID",  order.id],
    ["Patient",   order.patient],
    ["Patient ID",order.pid],
    ["Test",      order.test],
    ["Ordered",   order.ordered],
    ["Priority",  <Badge label={order.priority} styleMap={PRIORITY_STYLE} />],
    ["Status",    <Badge label={order.status}   styleMap={STATUS_STYLE}   />],
  ];
  return (
    <Overlay onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
        <span style={{ fontSize:22 }}>🔬</span>
        <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f9fafb" }}>Test Order Details</h2>
        <span style={{ marginLeft:"auto", background:"#1e293b", borderRadius:6, padding:"3px 10px", fontSize:12, color:"#6b7280", fontFamily:"monospace" }}>
          {order.id}
        </span>
      </div>

      <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid #1f2937", marginBottom:20 }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{
            display:"flex", alignItems:"center", padding:"12px 16px",
            borderBottom: i < rows.length-1 ? "1px solid #1a2235":"none",
            background: i%2 ? "#0d1117":"transparent",
          }}>
            <span style={{ width:110, fontSize:12, color:"#6b7280", fontWeight:600 }}>{k}</span>
            <span style={{ color:"#e5e7eb", fontSize:14 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <button onClick={onClose} style={{
          padding:"9px 24px", borderRadius:8, border:"none",
          background:"#2563eb", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>Close</button>
      </div>
    </Overlay>
  );
}

/* ── EDIT / NEW MODAL ── */
function OrderModal({ order, onClose, onSave, isNew }) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState(order ? { ...order } : {
    patient:"", pid:"", test: ALL_TESTS[0],
    ordered: today, priority:"Normal", status:"Pending",
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.patient.trim()) { alert("Patient name is required"); return; }
    if (!form.pid.trim())     { alert("Patient ID is required"); return; }
    onSave(form);
    onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
        <span style={{ fontSize:22 }}>{isNew ? "➕":"✏️"}</span>
        <h2 style={{ margin:0, fontSize:19, fontWeight:800, color:"#f9fafb" }}>
          {isNew ? "New Test Order" : `Edit Order — ${order.id}`}
        </h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>
        <F label="Patient Name">
          <input style={inp} value={form.patient} onChange={set("patient")} placeholder="Full name"
            onFocus={e=>e.target.style.borderColor="#3b82f6"}
            onBlur={e=>e.target.style.borderColor="#1e293b"} />
        </F>
        <F label="Patient ID (PID)">
          <input style={inp} value={form.pid} onChange={set("pid")} placeholder="e.g. P-3423"
            onFocus={e=>e.target.style.borderColor="#3b82f6"}
            onBlur={e=>e.target.style.borderColor="#1e293b"} />
        </F>
        <F label="Order Date">
          <input style={inp} type="date" value={form.ordered} onChange={set("ordered")}
            onFocus={e=>e.target.style.borderColor="#3b82f6"}
            onBlur={e=>e.target.style.borderColor="#1e293b"} />
        </F>
        <F label="Priority">
          <select style={{ ...inp, cursor:"pointer" }} value={form.priority} onChange={set("priority")}>
            {ALL_PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
        </F>
      </div>

      <F label="Test Type">
        <select style={{ ...inp, cursor:"pointer" }} value={form.test} onChange={set("test")}>
          {ALL_TESTS.map(t => <option key={t}>{t}</option>)}
        </select>
      </F>

      <F label="Status">
        <select style={{ ...inp, cursor:"pointer" }} value={form.status} onChange={set("status")}>
          {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </F>

      {!isNew && (
        <F label="Order ID">
          <input style={{ ...inp, opacity:0.45 }} value={form.id} readOnly />
        </F>
      )}

      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:18 }}>
        <button onClick={onClose} style={{
          padding:"9px 22px", borderRadius:8, border:"1px solid #374151",
          background:"transparent", color:"#9ca3af", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>Cancel</button>
        <button onClick={handleSave} style={{
          padding:"9px 22px", borderRadius:8, border:"none",
          background:"#2563eb", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14,
        }}>{isNew ? "✔ Place Order" : "💾 Save Changes"}</button>
      </div>
    </Overlay>
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
export default function TestOrders() {
  const [orders,  setOrders]  = useState(initialOrders);
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(null);
  const [toast,   setToast]   = useState(null);

  const showToast = (msg, color="#22c55e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSave = form => {
    if (form.id && orders.find(o => o.id === form.id)) {
      setOrders(ps => ps.map(o => o.id === form.id ? form : o));
      showToast("✓ Order updated successfully");
    } else {
      const num = 2201 + orders.length;
      const newOrder = { ...form, id:`TO-${num}` };
      setOrders(ps => [...ps, newOrder]);
      showToast("✓ New order placed", "#3b82f6");
    }
  };

  const displayed = orders.filter(o => {
    const q = search.toLowerCase();
    return (
      o.patient.toLowerCase().includes(q) ||
      o.pid.toLowerCase().includes(q)     ||
      o.id.toLowerCase().includes(q)      ||
      o.test.toLowerCase().includes(q)    ||
      o.status.toLowerCase().includes(q)
    );
  });

  const editBtn = {
    padding:"6px 16px", borderRadius:7, border:"1px solid #2563eb",
    background:"transparent", color:"#60a5fa", fontSize:13, fontWeight:700, cursor:"pointer",
  };
  const viewBtn = {
    padding:"6px 16px", borderRadius:7, border:"1px solid #374151",
    background:"transparent", color:"#d1d5db", fontSize:13, fontWeight:700, cursor:"pointer",
  };

  const cols = ["ORDER ID","PATIENT","PID","TEST","ORDERED","PRIORITY","STATUS","ACTIONS"];
  const grid = "110px 140px 90px 140px 110px 100px 120px 160px";

  return (
    <div style={{
      background:"#0d1117", minHeight:"100vh", padding:"32px 24px",
      fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#e5e7eb",
    }}>
      <style>{`* { box-sizing:border-box; } option { background:#1f2937; }`}</style>

      {toast && <Toast msg={toast.msg} color={toast.color} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <span style={{ fontSize:26 }}>🧪</span>
        <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#f9fafb" }}>Test Orders</h1>
      </div>

      {/* Search + New */}
      <div style={{ display:"flex", gap:12, marginBottom:22 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search test orders..."
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
        >+ New Order</button>
      </div>

      {/* Table */}
      <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, overflowX:"auto" }}>

        {/* Head */}
        <div style={{
          display:"grid", gridTemplateColumns:grid,
          padding:"12px 20px", background:"#0d1117",
          borderBottom:"1px solid #1f2937", minWidth:1000,
        }}>
          {cols.map(h => (
            <div key={h} style={{ fontSize:11, fontWeight:800, color:"#4b5563", letterSpacing:"0.07em" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {displayed.length === 0 ? (
          <div style={{ padding:"50px", textAlign:"center", color:"#374151" }}>
            <div style={{ fontSize:34, marginBottom:10 }}>🔬</div>
            <div style={{ fontWeight:600, fontSize:15 }}>No test orders found</div>
          </div>
        ) : displayed.map((o, i) => (
          <div
            key={o.id}
            style={{
              display:"grid", gridTemplateColumns:grid, minWidth:1000,
              padding:"15px 20px", alignItems:"center",
              borderBottom: i < displayed.length-1 ? "1px solid #1a2235":"none",
              transition:"background 0.12s",
            }}
            onMouseEnter={e => e.currentTarget.style.background="#161d2b"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}
          >
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"monospace", fontWeight:600 }}>{o.id}</div>
            <div style={{ fontWeight:700, color:"#f9fafb", fontSize:14 }}>{o.patient}</div>
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"monospace" }}>{o.pid}</div>
            <div style={{ color:"#d1d5db", fontSize:13 }}>{o.test}</div>
            <div style={{ color:"#6b7280", fontSize:13 }}>{o.ordered}</div>
            <div><Badge label={o.priority} styleMap={PRIORITY_STYLE} /></div>
            <div><Badge label={o.status}   styleMap={STATUS_STYLE}   /></div>
            <div style={{ display:"flex", gap:8 }}>
              <button
                style={editBtn}
                onClick={() => setModal({ type:"edit", order:o })}
                onMouseEnter={e => { e.target.style.background="#2563eb"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#60a5fa"; }}
              >Edit</button>
              <button
                style={viewBtn}
                onClick={() => setModal({ type:"view", order:o })}
                onMouseEnter={e => { e.target.style.background="#1f2937"; e.target.style.color="#fff"; }}
                onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#d1d5db"; }}
              >View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer count */}
      <div style={{ marginTop:14, fontSize:13, color:"#374151" }}>
        {displayed.length} order{displayed.length !== 1 ? "s" : ""}
        {search && <span style={{ color:"#f59e0b" }}> · search: "{search}"</span>}
      </div>

      {/* Modals */}
      {modal?.type === "view" && <ViewModal  order={modal.order} onClose={() => setModal(null)} />}
      {modal?.type === "edit" && <OrderModal order={modal.order} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === "new"  && <OrderModal isNew               onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
}
