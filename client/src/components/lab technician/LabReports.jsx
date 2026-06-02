import { useState } from "react";

const STEPS = ["Sample Collected", "Result Entered", "Report Generated", "Doctor Signature", "Report Verified"];

const STATUS_PROGRESS = { Verified: 100, "In Progress": 60, Waiting: 40, Completed: 100, Pending: 20 };
const STEP_COMPLETE = {
  Verified:     [true, true, true, true, true],
  Completed:    [true, true, true, true, true],
  "In Progress":[true, true, true, false, false],
  Waiting:      [true, true, false, false, false],
  Pending:      [true, false, false, false, false],
};

const INITIAL_REPORTS = [
  { id:"LAB-3423", patient:"Kiran Reddy",  pid:"P-3423", test:"HbA1c",        doctor:"Dr. Kavitha Menon", generated:"2026-05-28", status:"Verified",     notes:"All values within normal range." },
  { id:"LAB-3425", patient:"Arun Das",     pid:"P-3425", test:"Urine R&M",    doctor:"Dr. Kavitha Menon", generated:"2026-05-28", status:"Verified",     notes:"No abnormalities." },
  { id:"LAB-3421", patient:"Ravi Kumar",   pid:"P-3421", test:"CBC",          doctor:"Dr. Priya Nair",    generated:"2026-05-29", status:"In Progress",  notes:"Awaiting doctor signature." },
  { id:"LAB-3430", patient:"Sita Devi",    pid:"P-3430", test:"Thyroid Panel",doctor:"Dr. Kavitha Menon", generated:"2026-05-29", status:"Waiting",      notes:"Pending result entry." },
  { id:"LAB-3431", patient:"Ramesh Rao",   pid:"P-3431", test:"Lipid Profile",doctor:"Dr. Kavitha Menon", generated:"2026-05-29", status:"Waiting",      notes:"Sample processing." },
  { id:"LAB-3432", patient:"Meena Joshi",  pid:"P-3432", test:"Blood Sugar",  doctor:"Dr. Priya Nair",    generated:"2026-05-27", status:"Completed",    notes:"Report dispatched." },
];

const TESTS   = ["HbA1c","Urine R&M","CBC","Thyroid Panel","Lipid Profile","Blood Sugar","Liver Function","Kidney Function","ESR","CRP","Serum Electrolytes"];
const DOCTORS = ["Dr. Kavitha Menon","Dr. Priya Nair","Dr. Sharma","Dr. Mehta","Dr. Iyer"];
const STATUSES= ["Pending","Waiting","In Progress","Completed","Verified"];

const statusStyle = {
  Verified:     { bg:"rgba(34,197,94,0.15)",  color:"#4ade80", border:"1px solid rgba(34,197,94,0.3)"  },
  Completed:    { bg:"rgba(99,102,241,0.15)", color:"#818cf8", border:"1px solid rgba(99,102,241,0.3)" },
  "In Progress":{ bg:"rgba(59,130,246,0.15)", color:"#60a5fa", border:"1px solid rgba(59,130,246,0.3)" },
  Waiting:      { bg:"rgba(234,179,8,0.15)",  color:"#facc15", border:"1px solid rgba(234,179,8,0.3)"  },
  Pending:      { bg:"rgba(148,163,184,0.1)", color:"#94a3b8", border:"1px solid rgba(148,163,184,0.2)"},
};

const progressColor = {
  Verified:"#4ade80", Completed:"#818cf8", "In Progress":"#60a5fa", Waiting:"#facc15", Pending:"#94a3b8"
};

function Badge({ label }) {
  const s = statusStyle[label] || statusStyle.Pending;
  return (
    <span style={{ background:s.bg, color:s.color, border:s.border, display:"inline-block", padding:"3px 11px", borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

function ProgressBar({ report }) {
  const pct   = STATUS_PROGRESS[report.status] || 0;
  const steps = STEP_COMPLETE[report.status]   || [false,false,false,false,false];
  const color = progressColor[report.status]   || "#64748b";
  return (
    <div style={{ background:"#0f172a", borderRadius:12, border:"1px solid #1e293b", padding:"18px 22px", marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div>
          <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:15 }}>{report.patient}</span>
          <span style={{ color:"#475569", fontSize:13, marginLeft:8 }}>— {report.test} ({report.pid})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontWeight:700, color, fontSize:14 }}>{pct}%</span>
          <Badge label={report.status} />
        </div>
      </div>
      {/* Track */}
      <div style={{ position:"relative", height:4, background:"#1e293b", borderRadius:2, marginBottom:22 }}>
        <div style={{ position:"absolute", left:0, top:0, height:"100%", width:pct+"%", background:color, borderRadius:2, transition:"width 0.6s ease" }} />
      </div>
      {/* Steps */}
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        {STEPS.map((step, i) => (
          <div key={step} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
            <div style={{
              width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
              background: steps[i] ? color+"22" : "#1e293b",
              border: steps[i] ? "2px solid "+color : "2px solid #334155",
              marginBottom:8, transition:"all 0.3s"
            }}>
              {steps[i]
                ? <span style={{ color, fontSize:16, fontWeight:700 }}>✓</span>
                : <span style={{ color:"#334155", fontSize:14 }}>○</span>}
            </div>
            <span style={{ fontSize:11, color: steps[i] ? "#94a3b8" : "#475569", textAlign:"center", lineHeight:1.3 }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
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
    <div style={{ marginBottom:16 }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

const emptyForm = { patient:"", pid:"", test:TESTS[0], doctor:DOCTORS[0], generated:new Date().toISOString().split("T")[0], status:"Pending", notes:"" };

export default function LabReports() {
  const [reports,  setReports]  = useState(INITIAL_REPORTS);
  const [search,   setSearch]   = useState("");
  const [modal,    setModal]    = useState(null);
  const [form,     setForm]     = useState(emptyForm);
  const [toast,    setToast]    = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);

  const showToast = (msg, color="#4ade80") => { setToast({msg,color}); setTimeout(()=>setToast(null),2800); };

  const openGenerate = () => { setForm(emptyForm); setModal({type:"new"}); };
  const openEdit = (r) => { setForm({...r}); setModal({type:"edit",report:r}); };
  const openView = (r) => setModal({type:"view",report:r});
  const closeModal = () => setModal(null);

  const nextId = () => {
    const nums = reports.map(r=>parseInt(r.id.replace("LAB-",""),10));
    return "LAB-"+(Math.max(...nums)+1);
  };

  const handleSave = () => {
    if (!form.patient.trim()||!form.pid.trim()) { showToast("Patient and PID are required.","#f87171"); return; }
    if (modal.type==="new") {
      setReports(prev=>[{...form, id:nextId()},...prev]);
      showToast("Report generated successfully!");
    } else {
      setReports(prev=>prev.map(r=>r.id===form.id?{...form}:r));
      showToast("Report updated!","#60a5fa");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setReports(prev=>prev.filter(r=>r.id!==id));
    setDelConfirm(null); closeModal();
    showToast("Report deleted.","#f87171");
  };

  const inp = key => ({ value:form[key], onChange:e=>setForm(f=>({...f,[key]:e.target.value})), style:S.input });

  const filtered = reports.filter(r => {
    const q = search.toLowerCase();
    return r.patient.toLowerCase().includes(q)||r.id.toLowerCase().includes(q)||r.test.toLowerCase().includes(q)||r.doctor.toLowerCase().includes(q);
  });

  return (
    <div style={S.wrapper}>
      <style>{`
        @keyframes fadeIn  { from{opacity:0;transform:translateY(8px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-14px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes toastIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        .fa{animation:fadeIn 0.3s ease both} .ma{animation:slideIn 0.25s cubic-bezier(.34,1.3,.7,1) both} .ta{animation:toastIn 0.3s ease both}
        button:active{transform:scale(0.96)!important}
        input:focus,select:focus,textarea:focus{outline:none;border-color:#3b82f6!important;box-shadow:0 0 0 3px rgba(59,130,246,0.18)}
        tr:hover td{background:rgba(255,255,255,0.025)}
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#0f172a} ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}
      `}</style>

      {/* Toast */}
      {toast && <div className="ta" style={{position:"fixed",top:24,right:24,background:"#1e293b",border:"1px solid "+toast.color,color:toast.color,borderRadius:10,padding:"12px 20px",fontWeight:600,fontSize:14,zIndex:9999,boxShadow:"0 4px 24px rgba(0,0,0,0.4)"}}>{toast.msg}</div>}

      {/* Delete Confirm */}
      {delConfirm && (
        <div style={S.overlay} onClick={()=>setDelConfirm(null)}>
          <div style={S.confirmBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:16,fontWeight:600,color:"#f1f5f9",marginBottom:8}}>Delete Report?</div>
            <div style={{fontSize:14,color:"#94a3b8",marginBottom:20}}>This cannot be undone.</div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
              <button style={S.cancelBtn} onClick={()=>setDelConfirm(null)}>Cancel</button>
              <button style={S.deleteBtn} onClick={()=>handleDelete(delConfirm)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={S.header}>
        <h1 style={S.title}><span style={{marginRight:8}}>📋</span>Lab Reports</h1>
        <button style={S.genBtn} onClick={openGenerate}>+ Generate Report</button>
      </div>

      {/* Search */}
      <input style={S.search} placeholder="Search reports..." value={search} onChange={e=>setSearch(e.target.value)} />

      {/* Stats */}
      <div style={S.statsRow}>
        {[["Total",reports.length,"#60a5fa"],["Verified",reports.filter(r=>r.status==="Verified").length,"#4ade80"],["In Progress",reports.filter(r=>r.status==="In Progress").length,"#60a5fa"],["Waiting",reports.filter(r=>r.status==="Waiting").length,"#facc15"],["Completed",reports.filter(r=>r.status==="Completed").length,"#818cf8"]].map(([l,c,col])=>(
          <div key={l} style={{...S.statCard,borderColor:col}}>
            <span style={{color:col,fontSize:22,fontWeight:700}}>{c}</span>
            <span style={{color:"#64748b",fontSize:12,marginTop:2}}>{l}</span>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div style={S.section}>
        <div style={S.sectionTitle}>📊 Report Progress Tracking</div>
        <div className="fa">
          {filtered.map(r => <ProgressBar key={r.id} report={r} />)}
          {filtered.length===0 && <div style={{textAlign:"center",padding:32,color:"#475569",fontSize:14}}>No reports found.</div>}
        </div>
      </div>

      {/* Table */}
      <div style={S.tableWrapper}>
        <table style={S.table}>
          <thead>
            <tr>
              {["REPORT ID","PATIENT","TEST","DOCTOR","GENERATED","STATUS","ACTIONS"].map(h=>(
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length===0 && <tr><td colSpan={7} style={{textAlign:"center",padding:40,color:"#475569",fontSize:14}}>No reports found.</td></tr>}
            {filtered.map((r,i)=>(
              <tr key={r.id} className="fa" style={{animationDelay:i*40+"ms",borderBottom:"1px solid #1e293b"}}>
                <td style={{...S.td,color:"#64748b",fontFamily:"monospace",fontSize:13}}>{r.id}</td>
                <td style={{...S.td,color:"#e2e8f0",fontWeight:600}}>{r.patient}</td>
                <td style={{...S.td,color:"#cbd5e1"}}>{r.test}</td>
                <td style={{...S.td,color:"#94a3b8",fontSize:13}}>{r.doctor}</td>
                <td style={{...S.td,color:"#64748b",fontSize:13}}>{r.generated}</td>
                <td style={S.td}><Badge label={r.status} /></td>
                <td style={S.td}>
                  <div style={{display:"flex",gap:6}}>
                    <button style={S.viewBtn} onClick={()=>openView(r)}>View</button>
                    <button style={S.editBtn} onClick={()=>openEdit(r)}>Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GENERATE / EDIT Modal */}
      {modal && (modal.type==="new"||modal.type==="edit") && (
        <Modal title={modal.type==="new" ? "➕ Generate New Report" : "✏️ Edit Report — "+form.id} onClose={closeModal}>
          <div className="ma" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
            <Field label="Patient Name *"><input {...inp("patient")} placeholder="Full name" /></Field>
            <Field label="Patient ID (PID) *"><input {...inp("pid")} placeholder="P-XXXX" /></Field>
            <Field label="Test">
              <select {...inp("test")} style={S.input}>
                {TESTS.map(t=><option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Doctor">
              <select {...inp("doctor")} style={S.input}>
                {DOCTORS.map(d=><option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Generated Date"><input {...inp("generated")} type="date" /></Field>
            <Field label="Status">
              <select {...inp("status")} style={S.input}>
                {STATUSES.map(s=><option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Notes">
            <textarea {...inp("notes")} rows={3} placeholder="Report notes or observations…" style={{...S.input,resize:"vertical",height:72}} />
          </Field>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
            {modal.type==="edit" && <button style={S.deleteBtn} onClick={()=>setDelConfirm(form.id)}>🗑 Delete</button>}
            <button style={S.cancelBtn} onClick={closeModal}>Cancel</button>
            <button style={S.saveBtn} onClick={handleSave}>{modal.type==="new"?"Generate Report":"Save Changes"}</button>
          </div>
        </Modal>
      )}

      {/* VIEW Modal */}
      {modal && modal.type==="view" && (
        <Modal title={"🔍 Report Details — "+modal.report.id} onClose={closeModal}>
          <div className="ma">
            <ProgressBar report={modal.report} />
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 24px",marginBottom:20,marginTop:16}}>
              {[["Report ID",modal.report.id],["Patient",modal.report.patient],["PID",modal.report.pid],["Test",modal.report.test],["Doctor",modal.report.doctor],["Generated",modal.report.generated],["Status","__status__"]].map(([k,v])=>(
                <div key={k} style={{background:"#0f172a",borderRadius:8,padding:"10px 14px",border:"1px solid #1e293b"}}>
                  <div style={{fontSize:11,color:"#475569",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{k}</div>
                  {v==="__status__" ? <Badge label={modal.report.status} /> : <div style={{color:"#e2e8f0",fontWeight:500,fontSize:14}}>{v}</div>}
                </div>
              ))}
            </div>
            {modal.report.notes && (
              <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:11,color:"#475569",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Notes</div>
                <div style={{color:"#94a3b8",fontSize:14,lineHeight:1.6}}>{modal.report.notes}</div>
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
              <button style={S.cancelBtn} onClick={closeModal}>Close</button>
              <button style={S.saveBtn} onClick={()=>{closeModal();setTimeout(()=>openEdit(modal.report),50);}}>✏️ Edit Report</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const S = {
  wrapper:   {background:"#0f172a",minHeight:"100vh",padding:"28px 28px",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#e2e8f0",boxSizing:"border-box"},
  header:    {display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20},
  title:     {fontSize:26,fontWeight:700,margin:0,color:"#f1f5f9",letterSpacing:"-0.5px"},
  genBtn:    {background:"linear-gradient(135deg,#3b82f6,#2563eb)",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",fontWeight:600,fontSize:14,cursor:"pointer",boxShadow:"0 2px 12px rgba(59,130,246,0.3)",transition:"all 0.15s"},
  search:    {width:"100%",boxSizing:"border-box",background:"#1e293b",border:"1px solid #334155",borderRadius:8,padding:"11px 16px",color:"#e2e8f0",fontSize:14,marginBottom:16,transition:"border-color 0.2s"},
  statsRow:  {display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"},
  statCard:  {background:"#1e293b",border:"1px solid",borderRadius:10,padding:"12px 20px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:90},
  section:   {background:"#1e293b",borderRadius:14,border:"1px solid #334155",padding:"22px 22px",marginBottom:20},
  sectionTitle:{fontSize:15,fontWeight:700,color:"#f1f5f9",marginBottom:16},
  tableWrapper:{background:"#1e293b",borderRadius:12,border:"1px solid #334155",overflow:"auto"},
  table:     {width:"100%",borderCollapse:"collapse",minWidth:720},
  th:        {padding:"13px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"#475569",letterSpacing:"0.08em",borderBottom:"1px solid #334155",background:"#1e293b",whiteSpace:"nowrap"},
  td:        {padding:"13px 16px",fontSize:14,verticalAlign:"middle",transition:"background 0.12s"},
  editBtn:   {background:"transparent",border:"1px solid #334155",color:"#94a3b8",borderRadius:6,padding:"5px 14px",fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.15s"},
  viewBtn:   {background:"transparent",border:"1px solid #334155",color:"#94a3b8",borderRadius:6,padding:"5px 14px",fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.15s"},
  overlay:   {position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(2px)"},
  modal:     {background:"#1e293b",border:"1px solid #334155",borderRadius:16,width:"100%",maxWidth:700,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.5)"},
  modalHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #334155"},
  modalTitle:{fontWeight:700,fontSize:17,color:"#f1f5f9"},
  closeBtn:  {background:"transparent",border:"none",color:"#64748b",fontSize:18,cursor:"pointer",padding:"0 4px",lineHeight:1},
  modalBody: {padding:"22px 24px",overflowY:"auto"},
  label:     {display:"block",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6},
  input:     {width:"100%",boxSizing:"border-box",background:"#0f172a",border:"1px solid #334155",borderRadius:8,padding:"9px 12px",color:"#e2e8f0",fontSize:14,transition:"border-color 0.2s,box-shadow 0.2s"},
  saveBtn:   {background:"linear-gradient(135deg,#3b82f6,#2563eb)",color:"#fff",border:"none",borderRadius:8,padding:"10px 22px",fontWeight:600,fontSize:14,cursor:"pointer",transition:"all 0.15s"},
  cancelBtn: {background:"transparent",border:"1px solid #334155",color:"#94a3b8",borderRadius:8,padding:"10px 18px",fontWeight:500,fontSize:14,cursor:"pointer",transition:"all 0.15s"},
  deleteBtn: {background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",color:"#f87171",borderRadius:8,padding:"10px 18px",fontWeight:500,fontSize:14,cursor:"pointer",transition:"all 0.15s"},
  confirmBox:{background:"#1e293b",border:"1px solid #334155",borderRadius:14,padding:"24px 28px",maxWidth:360,width:"90%",boxShadow:"0 20px 50px rgba(0,0,0,0.5)"},
};
