import { useState } from "react";

const TEST_ORDERS = [
  { id: "TO-2201", patient: "Kiran Reddy", test: "HbA1c",        status: "Completed"   },
  { id: "TO-2202", patient: "Arun Das",    test: "Urine R&M",    status: "Completed"   },
  { id: "TO-2203", patient: "Ravi Kumar",  test: "CBC",          status: "Pending QC"  },
  { id: "TO-2204", patient: "Sita Devi",   test: "Thyroid Panel",status: "In Progress" },
  { id: "TO-2205", patient: "Ramesh Rao",  test: "Lipid Profile",status: "Pending"     },
  { id: "TO-2206", patient: "karishma",    test: "CBC",          status: "Pending"     },
];

const REFERENCE_RANGES = {
  "HbA1c":         "4.0 – 5.6 %",
  "Urine R&M":     "pH 4.5–8.0, Protein: Negative",
  "CBC":           "WBC: 4–11 K/uL, RBC: 4.2–5.9 M/uL, Hgb: 11.5–16.5 g/dL",
  "Thyroid Panel": "TSH: 0.4–4.0 mIU/L, T3: 80–200 ng/dL, T4: 5.0–12.0 µg/dL",
  "Lipid Profile": "Total Chol: <200 mg/dL, LDL: <100 mg/dL, HDL: >40 mg/dL",
};

const SAVED_RESULTS = [
  { orderId: "TO-2201", patient: "Kiran Reddy", test: "HbA1c",     value: "5.4 %",        range: "4.0 – 5.6 %",              remarks: "Within normal range.",     flag: "Normal",   savedAt: "2026-05-28 10:15" },
  { orderId: "TO-2202", patient: "Arun Das",    test: "Urine R&M", value: "pH 6.0, Neg",  range: "pH 4.5–8.0, Protein: Neg", remarks: "No abnormalities found.",  flag: "Normal",   savedAt: "2026-05-28 11:40" },
];

function flag(value, range) {
  const nums = value.match(/\d+(\.\d+)?/g);
  if (!nums) return "Normal";
  const v = parseFloat(nums[0]);
  const rangeNums = range.match(/\d+(\.\d+)?/g);
  if (!rangeNums || rangeNums.length < 2) return "Normal";
  const lo = parseFloat(rangeNums[0]), hi = parseFloat(rangeNums[1]);
  if (v < lo) return "Low";
  if (v > hi) return "High";
  return "Normal";
}

const flagStyle = {
  Normal: { background: "rgba(34,197,94,0.15)",  color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)"  },
  Low:    { background: "rgba(234,179,8,0.15)",  color: "#facc15", border: "1px solid rgba(234,179,8,0.3)"  },
  High:   { background: "rgba(239,68,68,0.15)",  color: "#f87171", border: "1px solid rgba(239,68,68,0.3)"  },
};

function Badge({ label }) {
  const s = flagStyle[label] || flagStyle.Normal;
  return <span style={{ ...s, display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:12, fontWeight:600 }}>{label}</span>;
}

export default function ResultsEntry() {
  const [selectedOrder, setSelectedOrder] = useState(TEST_ORDERS[2].id);
  const [resultValue, setResultValue]     = useState("");
  const [refRange, setRefRange]           = useState("");
  const [remarks, setRemarks]             = useState("");
  const [results, setResults]             = useState(SAVED_RESULTS);
  const [toast, setToast]                 = useState(null);
  const [tab, setTab]                     = useState("entry"); // "entry" | "history"
  const [editIdx, setEditIdx]             = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const order = TEST_ORDERS.find(o => o.id === selectedOrder);

  const showToast = (msg, color = "#4ade80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2800);
  };

  const handleOrderChange = (id) => {
    setSelectedOrder(id);
    setResultValue("");
    setRefRange(REFERENCE_RANGES[TEST_ORDERS.find(o=>o.id===id)?.test] || "");
    setRemarks("");
    setEditIdx(null);
  };

  const handleSave = () => {
    if (!resultValue.trim()) { showToast("Result value is required.", "#f87171"); return; }
    const now = new Date();
    const ts  = now.toISOString().slice(0,10) + " " + now.toTimeString().slice(0,5);
    const f   = flag(resultValue, refRange);

    if (editIdx !== null) {
      setResults(prev => prev.map((r,i) => i===editIdx ? { ...r, value:resultValue, range:refRange, remarks, flag:f, savedAt:ts } : r));
      showToast("Result updated!", "#60a5fa");
      setEditIdx(null);
    } else {
      const existing = results.findIndex(r => r.orderId === selectedOrder);
      if (existing >= 0) {
        setResults(prev => prev.map((r,i) => i===existing ? { ...r, value:resultValue, range:refRange, remarks, flag:f, savedAt:ts } : r));
        showToast("Result overwritten!", "#fb923c");
      } else {
        setResults(prev => [...prev, { orderId:order.id, patient:order.patient, test:order.test, value:resultValue, range:refRange, remarks, flag:f, savedAt:ts }]);
        showToast("Result saved successfully!");
      }
    }
    setResultValue(""); setRefRange(""); setRemarks("");
  };

  const handleEdit = (idx) => {
    const r = results[idx];
    const o = TEST_ORDERS.find(t => t.id === r.orderId);
    if (o) setSelectedOrder(o.id);
    setResultValue(r.value);
    setRefRange(r.range);
    setRemarks(r.remarks);
    setEditIdx(idx);
    setTab("entry");
  };

  const handleDelete = (idx) => {
    setResults(prev => prev.filter((_,i) => i !== idx));
    setDeleteConfirm(null);
    showToast("Result deleted.", "#f87171");
  };

  const handleClear = () => {
    setResultValue(""); setRefRange(""); setRemarks(""); setEditIdx(null);
  };

  // auto-fill reference range on order change
  const onOrderSelect = (e) => {
    const id = e.target.value;
    handleOrderChange(id);
    const o = TEST_ORDERS.find(t=>t.id===id);
    setRefRange(REFERENCE_RANGES[o?.test] || "");
  };

  return (
    <div style={S.wrapper}>
      <style>{`
        @keyframes fadeIn  { from{opacity:0;transform:translateY(6px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        .fa { animation: fadeIn 0.3s ease both; }
        .ta { animation: toastIn 0.3s ease both; }
        button:active { transform: scale(0.96) !important; }
        input:focus, select:focus, textarea:focus { outline:none; border-color:#3b82f6!important; box-shadow:0 0 0 3px rgba(59,130,246,0.18); }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0f172a} ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
        tr:hover td { background: rgba(255,255,255,0.025); }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="ta" style={{ position:"fixed", top:24, right:24, background:"#1e293b", border:"1px solid "+toast.color, color:toast.color, borderRadius:10, padding:"12px 20px", fontWeight:600, fontSize:14, zIndex:9999, boxShadow:"0 4px 24px rgba(0,0,0,0.4)" }}>
          {toast.msg}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div style={S.overlay} onClick={() => setDeleteConfirm(null)}>
          <div style={{ ...S.confirmBox }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:16, fontWeight:600, color:"#f1f5f9", marginBottom:8 }}>Delete Result?</div>
            <div style={{ fontSize:14, color:"#94a3b8", marginBottom:20 }}>This action cannot be undone.</div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={S.cancelBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button style={S.deleteBtn} onClick={() => handleDelete(deleteConfirm)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={S.pageHeader}>
        <h1 style={S.title}><span style={{marginRight:8}}>📋</span>Results Entry</h1>
        <div style={S.tabBar}>
          <button style={{ ...S.tab, ...(tab==="entry"   ? S.tabActive : {}) }} onClick={()=>setTab("entry")}>Enter Result</button>
          <button style={{ ...S.tab, ...(tab==="history" ? S.tabActive : {}) }} onClick={()=>setTab("history")}>
            Saved Results
            {results.length > 0 && <span style={S.badge2}>{results.length}</span>}
          </button>
        </div>
      </div>

      {/* ENTRY FORM */}
      {tab === "entry" && (
        <div className="fa" style={S.card}>
          <div style={S.cardTitle}>
            {editIdx !== null ? "✏️ Edit Test Result" : "Enter Test Results"}
          </div>

          {/* Select Test Order */}
          <div style={S.fieldGroup}>
            <label style={S.label}>SELECT TEST ORDER</label>
            <select style={S.select} value={selectedOrder} onChange={onOrderSelect}>
              {TEST_ORDERS.map(o => (
                <option key={o.id} value={o.id}>
                  {o.id} — {o.patient} ({o.test})
                </option>
              ))}
            </select>
          </div>

          {/* Order info strip */}
          {order && (
            <div style={S.infoStrip}>
              <div style={S.infoItem}><span style={S.infoLabel}>Patient</span><span style={S.infoVal}>{order.patient}</span></div>
              <div style={S.infoItem}><span style={S.infoLabel}>Test</span><span style={S.infoVal}>{order.test}</span></div>
              <div style={S.infoItem}>
                <span style={S.infoLabel}>Status</span>
                <span style={{ fontSize:12, fontWeight:600, padding:"2px 10px", borderRadius:20,
                  background: order.status==="Completed" ? "rgba(34,197,94,0.15)" : order.status==="Pending QC" ? "rgba(249,115,22,0.15)" : "rgba(234,179,8,0.15)",
                  color:       order.status==="Completed" ? "#4ade80"              : order.status==="Pending QC" ? "#fb923c"               : "#facc15",
                  border:      order.status==="Completed" ? "1px solid rgba(34,197,94,0.3)" : order.status==="Pending QC" ? "1px solid rgba(249,115,22,0.3)" : "1px solid rgba(234,179,8,0.3)",
                }}>{order.status}</span>
              </div>
            </div>
          )}

          {/* Result Value */}
          <div style={S.fieldGroup}>
            <label style={S.label}>RESULT VALUE</label>
            <input
              style={S.input}
              placeholder="e.g. 12.5 g/dL"
              value={resultValue}
              onChange={e => setResultValue(e.target.value)}
            />
          </div>

          {/* Reference Range */}
          <div style={S.fieldGroup}>
            <label style={S.label}>REFERENCE RANGE</label>
            <input
              style={S.input}
              placeholder="e.g. 11.5 – 16.5 g/dL"
              value={refRange}
              onChange={e => setRefRange(e.target.value)}
            />
          </div>

          {/* Live Flag Preview */}
          {resultValue && refRange && (
            <div style={{ marginBottom:18, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:13, color:"#64748b" }}>Auto-detected flag:</span>
              <Badge label={flag(resultValue, refRange)} />
            </div>
          )}

          {/* Remarks */}
          <div style={S.fieldGroup}>
            <label style={S.label}>REMARKS</label>
            <textarea
              style={{ ...S.input, height:110, resize:"vertical" }}
              placeholder="Optional remarks…"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            <button style={S.saveBtn} onClick={handleSave}>
              {editIdx !== null ? "Update Result" : "Save Result"}
            </button>
            {(resultValue || refRange || remarks || editIdx !== null) && (
              <button style={S.clearBtn} onClick={handleClear}>Clear</button>
            )}
          </div>
        </div>
      )}

      {/* HISTORY TABLE */}
      {tab === "history" && (
        <div className="fa" style={S.card}>
          <div style={S.cardTitle}>Saved Results ({results.length})</div>
          {results.length === 0 ? (
            <div style={{ textAlign:"center", padding:"40px 0", color:"#475569", fontSize:14 }}>No results saved yet.</div>
          ) : (
            <div style={{ overflowX:"auto" }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    {["ORDER","PATIENT","TEST","VALUE","REFERENCE RANGE","FLAG","REMARKS","SAVED AT","ACTIONS"].map(h => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} style={{ borderBottom:"1px solid #1e293b" }}>
                      <td style={{ ...S.td, fontFamily:"monospace", fontSize:13, color:"#64748b" }}>{r.orderId}</td>
                      <td style={{ ...S.td, color:"#e2e8f0", fontWeight:600 }}>{r.patient}</td>
                      <td style={{ ...S.td, color:"#cbd5e1" }}>{r.test}</td>
                      <td style={{ ...S.td, color:"#f1f5f9", fontWeight:600 }}>{r.value}</td>
                      <td style={{ ...S.td, color:"#64748b", fontSize:13 }}>{r.range}</td>
                      <td style={S.td}><Badge label={r.flag} /></td>
                      <td style={{ ...S.td, color:"#94a3b8", fontSize:13, maxWidth:160 }}>{r.remarks || "—"}</td>
                      <td style={{ ...S.td, color:"#475569", fontSize:12, whiteSpace:"nowrap" }}>{r.savedAt}</td>
                      <td style={S.td}>
                        <div style={{ display:"flex", gap:6 }}>
                          <button style={S.editBtn}   onClick={() => handleEdit(i)}>Edit</button>
                          <button style={S.delBtn}    onClick={() => setDeleteConfirm(i)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const S = {
  wrapper:   { background:"#0f172a", minHeight:"100vh", padding:"28px 28px", fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#e2e8f0", boxSizing:"border-box" },
  pageHeader:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 },
  title:     { fontSize:26, fontWeight:700, margin:0, color:"#f1f5f9", letterSpacing:"-0.5px" },
  tabBar:    { display:"flex", gap:4, background:"#1e293b", borderRadius:10, padding:4, border:"1px solid #334155" },
  tab:       { background:"transparent", border:"none", color:"#64748b", borderRadius:7, padding:"7px 18px", fontWeight:500, fontSize:14, cursor:"pointer", transition:"all 0.15s", position:"relative" },
  tabActive: { background:"#334155", color:"#f1f5f9", fontWeight:600 },
  badge2:    { background:"#3b82f6", color:"#fff", borderRadius:20, fontSize:11, fontWeight:700, padding:"1px 7px", marginLeft:6 },
  card:      { background:"#1e293b", borderRadius:14, border:"1px solid #334155", padding:"28px 28px", maxWidth:740 },
  cardTitle: { fontSize:18, fontWeight:700, color:"#f1f5f9", marginBottom:24 },
  fieldGroup:{ marginBottom:20 },
  label:     { display:"block", fontSize:11, fontWeight:700, color:"#64748b", letterSpacing:"0.08em", marginBottom:8 },
  select:    { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"11px 14px", color:"#e2e8f0", fontSize:14, cursor:"pointer", transition:"border-color 0.2s" },
  input:     { width:"100%", boxSizing:"border-box", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"11px 14px", color:"#e2e8f0", fontSize:14, transition:"border-color 0.2s, box-shadow 0.2s" },
  infoStrip: { display:"flex", gap:24, background:"#0f172a", borderRadius:10, padding:"12px 16px", marginBottom:20, border:"1px solid #1e293b", flexWrap:"wrap" },
  infoItem:  { display:"flex", flexDirection:"column", gap:4 },
  infoLabel: { fontSize:11, color:"#475569", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" },
  infoVal:   { fontSize:14, color:"#e2e8f0", fontWeight:500 },
  saveBtn:   { flex:1, background:"linear-gradient(135deg,#3b82f6,#2563eb)", color:"#fff", border:"none", borderRadius:8, padding:"12px 0", fontWeight:700, fontSize:15, cursor:"pointer", transition:"all 0.15s", boxShadow:"0 2px 12px rgba(59,130,246,0.3)", letterSpacing:"0.3px" },
  clearBtn:  { background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:8, padding:"12px 22px", fontWeight:500, fontSize:14, cursor:"pointer", transition:"all 0.15s" },
  table:     { width:"100%", borderCollapse:"collapse", minWidth:900 },
  th:        { padding:"12px 14px", textAlign:"left", fontSize:11, fontWeight:700, color:"#475569", letterSpacing:"0.08em", borderBottom:"1px solid #334155", whiteSpace:"nowrap" },
  td:        { padding:"12px 14px", fontSize:14, verticalAlign:"middle", transition:"background 0.12s" },
  editBtn:   { background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:500, cursor:"pointer", transition:"all 0.15s" },
  delBtn:    { background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#f87171", borderRadius:6, padding:"4px 12px", fontSize:12, fontWeight:500, cursor:"pointer", transition:"all 0.15s" },
  overlay:   { position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(2px)" },
  confirmBox:{ background:"#1e293b", border:"1px solid #334155", borderRadius:14, padding:"24px 28px", maxWidth:360, width:"90%", boxShadow:"0 20px 50px rgba(0,0,0,0.5)" },
  cancelBtn: { background:"transparent", border:"1px solid #334155", color:"#94a3b8", borderRadius:8, padding:"9px 18px", fontWeight:500, fontSize:14, cursor:"pointer" },
  deleteBtn: { background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", borderRadius:8, padding:"9px 18px", fontWeight:600, fontSize:14, cursor:"pointer" },
};
