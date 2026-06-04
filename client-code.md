
===============================
FILE: client\src\components\about\AboutPage.css
===============================

.cm-about-page {
  min-height: 100vh;
  padding: 42px;
  background: linear-gradient(135deg, #f4fbfb, #eef8ff);
  color: #14343b;
}

.cm-about-hero {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 28px;
  align-items: center;
  margin-bottom: 30px;
}

.cm-about-left,
.cm-about-right,
.cm-about-intro,
.cm-about-card,
.cm-about-flow,
.cm-about-bottom {
  background: #ffffff;
  border: 1px solid #d9f0ef;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(15, 118, 110, 0.08);
}

.cm-about-left {
  padding: 46px;
}

.cm-about-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;
  background: #e6fffb;
  color: #0f766e;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 18px;
}

.cm-about-left h1 {
  font-size: 42px;
  line-height: 1.15;
  margin: 0 0 18px;
  color: #0f2f35;
}

.cm-about-left p,
.cm-about-intro p,
.cm-about-card p,
.cm-about-bottom p {
  color: #5a747b;
  line-height: 1.7;
  font-size: 15px;
  margin: 0;
}

.cm-about-actions {
  display: flex;
  gap: 14px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.cm-about-actions button {
  border: none;
  padding: 13px 22px;
  border-radius: 14px;
  background: #0f766e;
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.cm-about-actions .outline {
  background: #ffffff;
  color: #0f766e;
  border: 1px solid #0f766e;
}

.cm-about-right {
  min-height: 315px;
  padding: 28px;
  display: grid;
  place-items: center;
}

.cm-health-card {
  width: 100%;
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, #e6fffb, #f0fdf4);
  text-align: center;
}

.cm-plus {
  width: 72px;
  height: 72px;
  margin: 0 auto 18px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f766e, #22c55e);
  color: white;
  font-size: 42px;
  font-weight: 900;
}

.cm-health-card h3 {
  margin: 0 0 8px;
  font-size: 28px;
  color: #0f2f35;
}

.cm-health-card p {
  margin: 0;
  color: #55737a;
}

.cm-about-intro {
  padding: 30px;
  text-align: center;
  margin-bottom: 24px;
}

.cm-about-intro h2,
.cm-about-flow h2,
.cm-about-bottom h2 {
  margin: 0 0 12px;
  font-size: 30px;
  color: #102f35;
}

.cm-about-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.cm-about-card {
  padding: 24px;
  min-height: 235px;
  transition: 0.25s ease;
}

.cm-about-card:hover {
  transform: translateY(-5px);
}

.cm-about-icon {
  width: 50px;
  height: 50px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: #e6fffb;
  font-size: 24px;
  margin-bottom: 18px;
}

.cm-about-card h3 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #12343b;
}

.cm-about-flow {
  padding: 30px;
  margin-bottom: 24px;
}

.cm-flow-list {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.cm-flow-list div {
  padding: 15px 22px;
  border-radius: 16px;
  background: #e6fffb;
  color: #0f766e;
  font-weight: 900;
  text-align: center;
}

.cm-flow-list span {
  height: 2px;
  flex: 1;
  min-width: 30px;
  background: #5eead4;
}

.cm-about-bottom {
  padding: 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
  align-items: center;
}

.cm-about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.cm-about-stats div {
  background: #f0fdfa;
  border-radius: 20px;
  padding: 20px 10px;
  text-align: center;
}

.cm-about-stats h3 {
  margin: 0;
  font-size: 28px;
  color: #0f766e;
}

.cm-about-stats p {
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 1050px) {
  .cm-about-hero,
  .cm-about-bottom {
    grid-template-columns: 1fr;
  }

  .cm-about-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cm-about-left h1 {
    font-size: 34px;
  }
}

@media (max-width: 650px) {
  .cm-about-page {
    padding: 20px;
  }

  .cm-about-left {
    padding: 28px;
  }

  .cm-about-grid,
  .cm-about-stats {
    grid-template-columns: 1fr;
  }

  .cm-flow-list span {
    display: none;
  }

  .cm-flow-list div {
    width: 100%;
  }
}

===============================
FILE: client\src\components\about\AboutPage.jsx
===============================

import React from "react";
import "./AboutPage.css";

export default function AboutPage({ setPage }) {
  const cards = [
    {
      title: "Patient Portal",
      desc: "Patients can register, verify OTP, complete profiles, book scans, order medicines, and view previous bookings.",
      icon: "👤",
    },
    {
      title: "Diagnostics",
      desc: "CallMedex supports scan booking, branch selection, time slots, prescription upload, receipt ID, and booking status.",
      icon: "🧪",
    },
    {
      title: "Pharmacy",
      desc: "Patients can search medicines, place orders, and pharmacies can manage inventory, service mode, and order status.",
      icon: "💊",
    },
    {
      title: "Role Dashboards",
      desc: "Separate portals are planned for patient, doctor, phlebo, pharmacy, diagnostics, consultancy, and admin users.",
      icon: "📊",
    },
  ];

  return (
    <main className="cm-about-page">
      <section className="cm-about-hero">
        <div className="cm-about-left">
          <span className="cm-about-badge">About CallMedex</span>

          <h1>One Smart Platform for Complete Healthcare Services</h1>

          <p>
            CallMedex is a full-stack healthcare portal built to connect
            patients, pharmacies, diagnostics, doctors, phlebos, and admins in
            one organized system.
          </p>

          <div className="cm-about-actions">
            <button onClick={() => setPage("home")}>Back to Home</button>
            <button className="outline" onClick={() => setPage("blog")}>
              Read Blogs
            </button>
          </div>
        </div>

        <div className="cm-about-right">
          <div className="cm-health-card">
            <div className="cm-plus">+</div>
            <h3>CallMedex</h3>
            <p>Healthcare access made simple, secure, and role-based.</p>
          </div>
        </div>
      </section>

      <section className="cm-about-intro">
        <h2>What is CallMedex?</h2>
        <p>
          CallMedex is designed as a complete medical service platform where a
          patient can access diagnostics, pharmacy, consultation, and profile
          services without switching between different systems.
        </p>
      </section>

      <section className="cm-about-grid">
        {cards.map((card) => (
          <div className="cm-about-card" key={card.title}>
            <div className="cm-about-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </section>

      <section className="cm-about-flow">
        <h2>How the Platform Works</h2>

        <div className="cm-flow-list">
          <div>Register</div>
          <span></span>
          <div>Verify OTP</div>
          <span></span>
          <div>Complete Profile</div>
          <span></span>
          <div>Book Service</div>
        </div>
      </section>

      <section className="cm-about-bottom">
        <div>
          <h2>Project Vision</h2>
          <p>
            The main goal of CallMedex is to make healthcare booking and
            management faster, cleaner, and easier for both patients and service
            providers.
          </p>
        </div>

        <div className="cm-about-stats">
          <div>
            <h3>3</h3>
            <p>Main Services</p>
          </div>
          <div>
            <h3>7+</h3>
            <p>User Roles</p>
          </div>
          <div>
            <h3>24/7</h3>
            <p>Digital Access</p>
          </div>
        </div>
      </section>
    </main>
  );
}

===============================
FILE: client\src\components\appointments\AppointmentBooking.jsx
===============================

import React, { useState, useEffect, useRef } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

// ── constants ──────────────────────────────────────────────────────────────
const PRE_DEFAULT = [
  "Arrive 15 minutes early",
  "Carry a valid photo ID",
  "Bring any previous reports or prescriptions",
  "Avoid heavy meals 2 hours before"
];

const SLOTS = [
  { label: "9 – 10 AM",     endHour: 10 },
  { label: "10 – 11 AM",    endHour: 11 },
  { label: "11 AM – 12 PM", endHour: 12 },
  { label: "12 – 1 PM",     endHour: 13 },
  { label: "2 – 3 PM",      endHour: 15 },
  { label: "3 – 4 PM",      endHour: 16 },
];

// ── helpers ────────────────────────────────────────────────────────────────
function getPreTest(scans) {
  const tips = new Set();
  scans.forEach(s => {
    const instructions = s.instructions && s.instructions.length > 0
      ? s.instructions
      : PRE_DEFAULT;
    instructions.forEach(t => tips.add(t));
  });
  if (tips.size === 0) PRE_DEFAULT.forEach(t => tips.add(t));
  return [...tips];
}

function isSlotPast(slot, selectedDate) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  if (selectedDate && selectedDate !== today) return false;
  return now.getHours() >= slot.endHour;
}

function validate(patient, branch, selectedScans, date, slot, prescription) {
  const e = {};
  if (!patient.name.trim()) e.name = "Full name is required";
  const age = Number(patient.age);
  if (!patient.age || age < 1 || age > 120) e.age = "Enter a valid age (1–120)";
  if (!patient.sex) e.sex = "Please select gender";
  if (!/^[6-9]\d{9}$/.test(patient.mobile)) e.mobile = "Enter valid 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) e.email = "Enter a valid email address";
  if (!branch) e.branch = "Select a branch";
  if (!patient.address.trim()) e.address = "Address is required";
  if (selectedScans.length === 0) e.scans = "Select at least one scan";
  if (!date) e.date = "Select appointment date";
  if (!slot) e.slot = "Select a time slot";
  if (!prescription) e.prescription = "Prescription upload is mandatory";
  return e;
}

function downloadReceipt(patient, branch, selectedScans, date, slot, total) {
  const receiptId = "CMX" + Date.now().toString().slice(-8);
  const now = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const scanRows = selectedScans.map(s =>
    `<tr>
      <td style="padding:6px 8px;border-bottom:1px solid #f0f4f8">${s.name}</td>
      <td style="padding:6px 8px;border-bottom:1px solid #f0f4f8;text-align:right">&#8377;${s.price}</td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Appointment Receipt</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
  }
  body{font-family:'Segoe UI',sans-serif;color:#0A2540;margin:0;padding:32px;background:#f4f8fb}
  .card{background:white;border-radius:20px;padding:36px;max-width:560px;margin:0 auto;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .logo{display:flex;align-items:center;gap:10px;margin-bottom:28px}
  .logo-icon{width:42px;height:42px;background:#e63946;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.3rem;font-weight:700}
  .logo h2{margin:0;font-size:1.2rem;color:#0A2540}
  .logo p{margin:2px 0 0;font-size:.78rem;color:#64748b}
  .confirmed{display:inline-block;background:#ecfcfc;color:#0A9C87;padding:5px 14px;border-radius:20px;font-size:.78rem;font-weight:700;margin-bottom:20px}
  h1{font-size:1.4rem;margin:0 0 4px}
  .sub{color:#64748b;font-size:.85rem;margin:0 0 24px}
  .divider{border:none;border-top:1.5px solid #f0f4f8;margin:20px 0}
  .row{display:flex;justify-content:space-between;padding:7px 0;font-size:.88rem}
  .row span:first-child{color:#64748b}
  .row strong{color:#0A2540}
  table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.88rem}
  th{background:#f8fafc;padding:8px;text-align:left;font-size:.78rem;color:#64748b;text-transform:uppercase}
  .total{display:flex;justify-content:space-between;font-weight:700;font-size:1rem;padding:12px 0 0}
  .footer{margin-top:28px;background:#f8fafc;border-radius:12px;padding:14px 16px;font-size:.8rem;color:#64748b;line-height:1.6}
  .print-btn{display:block;margin:24px auto 0;padding:11px 32px;background:#10b981;color:white;border:none;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer}
</style></head><body>
<div class="card">
  <div class="logo">
    <div class="logo-icon">C</div>
    <div><h2>CallMeDex</h2><p>Diagnostic Centre</p></div>
  </div>
  <div class="confirmed">&#10003; APPOINTMENT CONFIRMED</div>
  <h1>Booking Receipt</h1>
  <p class="sub">Receipt #${receiptId} &nbsp;&middot;&nbsp; Issued: ${now}</p>
  <hr class="divider">
  <div class="row"><span>Patient Name</span><strong>${patient.name}</strong></div>
  <div class="row"><span>Age / Gender</span><strong>${patient.age} yrs / ${patient.sex}</strong></div>
  <div class="row"><span>Mobile</span><strong>${patient.mobile}</strong></div>
  <div class="row"><span>Email</span><strong>${patient.email}</strong></div>
  <div class="row"><span>Branch</span><strong>${branch}</strong></div>
  <div class="row"><span>Appointment Date</span><strong>${new Date(date).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}</strong></div>
  <div class="row"><span>Time Slot</span><strong>${slot}</strong></div>
  <hr class="divider">
  <table><thead><tr><th>Scan</th><th style="text-align:right">Price</th></tr></thead>
  <tbody>${scanRows}</tbody></table>
  <div class="total"><span>Total Amount</span><span>&#8377;${total}</span></div>
  <hr class="divider">
  <div class="footer">
    Please arrive 15 minutes before your scheduled slot. Carry this receipt and a valid photo ID.
    For queries, call: 1800-XXX-XXXX &nbsp;&middot;&nbsp; help@callmedex.in
  </div>
  <button class="print-btn no-print" onclick="window.print()">⬇ Save as PDF</button>
</div>
<script>window.onload = function() { window.print(); }<\/script>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const newWin = window.open(url, "_blank");
  if (!newWin) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${receiptId}.html`;
    a.click();
  }
}

// ── styles ─────────────────────────────────────────────────────────────────
const S = {
  page: {
    display: "flex", gap: 20, padding: "100px 28px 48px",
    background: "#f4f8fb", minHeight: "100vh", fontFamily: "'Segoe UI',sans-serif",
  },
  sidebar: { width: 260, flexShrink: 0 },
  card: {
    background: "white", borderRadius: 20, padding: "20px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)", marginBottom: 16,
  },
  main: { flex: 1, minWidth: 0 },
  header: { marginBottom: 18 },
  h1: { fontSize: "1.7rem", color: "#0A2540", margin: 0, fontWeight: 700 },
  sub: { color: "#64748b", fontSize: ".88rem", marginTop: 4 },
  section: {
    background: "white", borderRadius: 20, padding: "22px 24px",
    marginBottom: 18, boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  secHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  badge: {
    width: 34, height: 34, borderRadius: 10, background: "#22c1c3",
    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: ".9rem", flexShrink: 0,
  },
  secTitle: { color: "#0A2540", fontSize: "1rem", fontWeight: 700, margin: 0 },
  secSub: { color: "#94a3b8", fontSize: ".8rem", margin: "2px 0 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 },
  inp: {
    width: "100%", padding: "9px 12px", border: "1.5px solid #e8edf2",
    borderRadius: 10, fontSize: ".88rem", outline: "none",
    background: "#f8fafc", boxSizing: "border-box", transition: "border-color .2s",
  },
  inpErr: { borderColor: "#e63946" },
  errTxt: { color: "#e63946", fontSize: ".75rem", marginTop: 3 },
  scanGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 12,
  },
  scanCard: {
    border: "2px solid #edf2f7", borderRadius: 16, padding: "14px 16px",
    cursor: "pointer", transition: ".25s", background: "#f8fafc",
  },
  scanSel: { borderColor: "#22c1c3", background: "#ecfcfc" },
  scanDis: { opacity: .45, cursor: "not-allowed", background: "#f1f5f9" },
  scanIcon: {
    width: 44, height: 44, borderRadius: 12, background: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.4rem", marginBottom: 8,
  },
  slotGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8,
  },
  slotCard: {
    border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "9px 12px",
    textAlign: "center", cursor: "pointer", fontSize: ".83rem", fontWeight: 600,
    color: "#334155", transition: ".2s", background: "#f8fafc",
  },
  slotActive: { borderColor: "#22c1c3", background: "#ecfcfc", color: "#0A2540" },
  slotPast: {
    opacity: .4, cursor: "not-allowed", background: "#f1f5f9",
    textDecoration: "line-through", color: "#94a3b8",
  },
  uploadBox: {
    border: "2px dashed #dbe4ee", borderRadius: 14, padding: "22px",
    textAlign: "center", cursor: "pointer", transition: ".2s",
  },
  summaryRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0", borderBottom: "1px solid #f0f4f8", fontSize: ".88rem",
  },
  summaryTotal: {
    display: "flex", justifyContent: "space-between",
    padding: "12px 0 0", fontWeight: 700, fontSize: "1rem", color: "#0A2540",
  },
  confirmBtn: {
    width: "100%", padding: "13px", background: "#e63946", color: "white",
    border: "none", borderRadius: 14, fontWeight: 700, fontSize: "1rem",
    cursor: "pointer", marginTop: 4,
  },
  label: {
    display: "block", fontSize: ".75rem", fontWeight: 600, color: "#64748b",
    marginBottom: 5, textTransform: "uppercase", letterSpacing: ".5px"
  },
};

// ── F input ────────────────────────────────────────────────────────────────
const F = ({ name, type = "text", placeholder, value, onChange, colSpan, errors = {} }) => (
  <div style={colSpan ? { gridColumn: `span ${colSpan}` } : {}}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ ...S.inp, ...(errors[name] ? S.inpErr : {}) }}
      onFocus={e => { e.target.style.borderColor = errors[name] ? "#e63946" : "#22c1c3"; }}
      onBlur={e => { e.target.style.borderColor = errors[name] ? "#e63946" : "#e8edf2"; }}
    />
    {errors[name] && <p style={S.errTxt}>⚠ {errors[name]}</p>}
  </div>
);

// ── progress sidebar ───────────────────────────────────────────────────────
const STEPS = [
  { title: "Patient Info", sub: "Personal details" },
  { title: "Select Scans", sub: "Choose tests" },
  { title: "Date & Slot",  sub: "Pick time" },
  { title: "Prescription", sub: "Upload & confirm" },
];

function ProgressSidebar({ activeStep }) {
  return (
    <div style={S.card}>
      <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 16px", textTransform: "uppercase" }}>Your Progress</p>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 16, top: 8, width: 2, height: "84%", background: "#e8edf2" }} />
        {STEPS.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start", position: "relative" }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", flexShrink: 0, zIndex: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: ".8rem", fontWeight: 700,
                background: done ? "#21c087" : active ? "#22c1c3" : "#edf2f7",
                color: done || active ? "white" : "#94a3b8",
                boxShadow: active ? "0 4px 12px rgba(34,193,195,.35)" : "none",
                transition: ".3s",
              }}>
                {done ? "✓" : i + 1}
              </div>
              <div style={{ paddingTop: 6 }}>
                <p style={{ margin: 0, fontSize: ".85rem", fontWeight: active ? 700 : 500, color: active ? "#0A2540" : done ? "#21c087" : "#94a3b8" }}>{step.title}</p>
                <p style={{ margin: "1px 0 0", fontSize: ".75rem", color: "#b0bec5" }}>{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function AppointmentBooking({
  title,
  scans,
  mode = "scan",
  bookingType = "appointment",
  bookingEndpoint = "/appointment/book",
  categories = [],
  selectedCategory = "all",
  setSelectedCategory,
  search = "",
  setSearch,
}) {
  const toast = useToast();
  const branches = ["Akkayapalem", "Madhurwada", "KGH Branch"];
  const today = new Date().toISOString().split("T")[0];

  const [selectedScans, setSelectedScans] = useState([]);
  const [slot, setSlot]                   = useState("");
  const [branch, setBranch]               = useState("");
  const [date, setDate]                   = useState(today);
  const [prescription, setPrescription]   = useState(null);
  const [patient, setPatient]             = useState({ name: "", age: "", sex: "", mobile: "", email: "", address: "" });
  const [errors, setErrors]               = useState({});
  const [submitted, setSubmitted]         = useState(false);
  const [activeStep, setActiveStep]       = useState(0);

  const secRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const postRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = secRefs.findIndex(r => r.current === entry.target);
          if (idx !== -1) setActiveStep(idx);
        }
      }),
      { threshold: 0.4 }
    );
    secRefs.forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const total = selectedScans.reduce((acc, s) => acc + s.price, 0);

  const toggleScan = (scan) => {
    const exists = selectedScans.find(s => s.id === scan.id);
    if (exists) {
      setSelectedScans(selectedScans.filter(s => s.id !== scan.id));
    } else {
      if (selectedScans.length >= 2) {
        toast.warning("You can select a maximum of 2 scans per appointment.");
        return;
      }
      setSelectedScans([...selectedScans, scan]);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF, JPG, or PNG file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 5 MB.");
      return;
    }
    setPrescription(file);
    toast.success("Prescription uploaded successfully.");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
      toast.error("Please log in as a patient before booking a scan appointment.");
      return;
    }

    if (user.role !== "patient") {
      toast.error("Only patient accounts can book scan appointments. Please log in with a patient account.");
      return;
    }

    const e = validate(patient, branch, selectedScans, date, slot, prescription);
    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.warning("Please fill in all required fields before confirming your appointment.");
      const first = ["name","age","sex","mobile","email","branch","address","scans","date","slot","prescription"].find(k => e[k]);
      const secIdx = ["name","age","sex","mobile","email","branch","address"].includes(first) ? 0
        : first === "scans" ? 1
        : ["date","slot"].includes(first) ? 2
        : 3;
      secRefs[secIdx]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      let base64Prescription = null;
      if (prescription) {
        base64Prescription = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(prescription);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }

      const payload = {
        patientName: patient.name.trim(),
        patientAge: Number(patient.age),
        patientSex: patient.sex,
        patientMobile: patient.mobile.trim(),
        patientEmail: patient.email.trim().toLowerCase(),
        patientAddress: patient.address.trim(),
        branch,
        ...(bookingType === "home-service"
          ? { tests: selectedScans.map(t => ({ id: t.id })), collectionDate: date }
          : { scans: selectedScans.map(s => ({ id: s.id, name: s.name, subtitle: s.subtitle, price: Number(s.price), oldPrice: Number(s.oldPrice || 0) })), appointmentDate: date }),
        timeSlot: slot,
        prescription: base64Prescription,
        totalAmount: Number(total),
      };

      const response = await api.post(bookingEndpoint, payload);

      if (response.data.success) {
        setSubmitted(true);
        toast.success("Your appointment has been confirmed successfully! Please check the details below.");
        setTimeout(() => {
          postRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        toast.error(response.data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        return;
      }
      toast.error(err.response?.data?.message || "Failed to book appointment. Please try again.");
    }
  };

  const preTests = getPreTest(selectedScans);

  return (
    <div style={S.page}>

      {/* SIDEBAR */}
      <div style={S.sidebar}>
        <ProgressSidebar activeStep={activeStep} />
        <div style={{ ...S.card, borderLeft: "3px solid #e63946" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>❤️</div>
          <p style={{ fontSize: ".82rem", color: "#64748b", lineHeight: 1.65, margin: "0 0 8px", fontStyle: "italic" }}>
            "Early diagnosis is the first step to a longer, healthier life. Your heart works every second for you — take a moment to check on it."
          </p>
          <p style={{ fontSize: ".75rem", fontWeight: 700, color: "#e63946", margin: 0 }}>— CallMeDex Care Team</p>
        </div>
        <div style={S.card}>
          <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 12px", textTransform: "uppercase" }}>📍 Our Branches</p>
          {[
            { name: "Akkayapalem", addr: "Main Road, Akkayapalem, Visakhapatnam" },
            { name: "Madhurwada",  addr: "Madhurwada Junction, Visakhapatnam" },
            { name: "KGH Branch",  addr: "Near KGH Hospital, Maharani Peta" },
          ].map((b, i) => (
            <div key={i} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: i < 2 ? "1px solid #f0f4f8" : "none" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: ".83rem", color: "#0A2540" }}>{b.name}</p>
              <p style={{ margin: "2px 0 0", fontSize: ".75rem", color: "#94a3b8", lineHeight: 1.5 }}>{b.addr}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={S.main}>
        <div style={S.header}>
          <h1 style={S.h1}>{title}</h1>
          <p style={S.sub}>Complete all sections to confirm your diagnostic appointment</p>
        </div>

        {/* SECTION 1 — Patient Info */}
        <div ref={secRefs[0]} style={S.section}>
          <div style={S.secHead}>
            <div style={S.badge}>1</div>
            <div>
              <p style={S.secTitle}>Patient Information</p>
              <p style={S.secSub}>Personal &amp; contact details</p>
            </div>
          </div>
          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <F name="name" placeholder="Full Name" value={patient.name} errors={errors}
              onChange={e => setPatient({ ...patient, name: e.target.value })} colSpan={2} />
            <F name="age" type="number" placeholder="Age" value={patient.age} errors={errors}
              onChange={e => setPatient({ ...patient, age: e.target.value })} />
          </div>
          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div>
              <select value={patient.sex} onChange={e => setPatient({ ...patient, sex: e.target.value })}
                style={{ ...S.inp, ...(errors.sex ? S.inpErr : {}) }}>
                <option value="">Gender</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
              {errors.sex && <p style={S.errTxt}>⚠ {errors.sex}</p>}
            </div>
            <F name="mobile" placeholder="Mobile (10 digits)" value={patient.mobile} errors={errors}
              onChange={e => setPatient({ ...patient, mobile: e.target.value })} />
            <F name="email" placeholder="Email Address" value={patient.email} errors={errors}
              onChange={e => setPatient({ ...patient, email: e.target.value })} />
          </div>
          <div style={{ ...S.grid2, marginBottom: 10 }}>
            <div>
              <select value={branch} onChange={e => setBranch(e.target.value)}
                style={{ ...S.inp, ...(errors.branch ? S.inpErr : {}) }}>
                <option value="">Select Branch</option>
                {branches.map((b, i) => <option key={i}>{b}</option>)}
              </select>
              {errors.branch && <p style={S.errTxt}>⚠ {errors.branch}</p>}
            </div>
            <div />
          </div>
          <div>
            <textarea placeholder="Address" value={patient.address}
              onChange={e => setPatient({ ...patient, address: e.target.value })}
              style={{ ...S.inp, ...(errors.address ? S.inpErr : {}), minHeight: 72, resize: "none", display: "block" }} />
            {errors.address && <p style={S.errTxt}>⚠ {errors.address}</p>}
          </div>
        </div>

        {/* SECTION 2 — Select Scans */}
        <div ref={secRefs[1]} style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#7c3aed" }}>2</div>
            <div>
              <p style={S.secTitle}>{mode === "home-service" ? "Select Tests" : "Select Scans"}</p>
              <p style={S.secSub}>{mode === "home-service" ? "Choose up to 2 home service tests" : "Choose up to 2 diagnostic tests"}</p>
            </div>
            {errors.scans && <p style={{ ...S.errTxt, marginLeft: "auto" }}>⚠ {errors.scans}</p>}
          </div>
          {mode === "home-service" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 12, marginBottom: 16 }}>
              <input type="text" placeholder="Search tests or features" value={search}
                onChange={e => setSearch?.(e.target.value)} style={S.inp} />
              <select value={selectedCategory} onChange={e => setSelectedCategory?.(e.target.value)} style={S.inp}>
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.category_id} value={c.category_name}>{c.category_name}</option>)}
              </select>
            </div>
          )}
          <div style={S.scanGrid}>
            {scans.map(scan => {
              const isSel = !!selectedScans.find(s => s.id === scan.id);
              const isDisabled = !isSel && selectedScans.length >= 2;
              return (
                <div key={scan.id}
                  style={{ ...S.scanCard, ...(isSel ? S.scanSel : {}), ...(isDisabled ? S.scanDis : {}) }}
                  onClick={() => !isDisabled && toggleScan(scan)}>
                  <div style={S.scanIcon}>{scan.icon}</div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: ".9rem", color: "#0A2540" }}>{scan.name}</p>
                  <p style={{ margin: "0 0 8px", fontSize: ".75rem", color: "#94a3b8", lineHeight: 1.4 }}>{scan.subtitle}</p>
                  {mode === "home-service" && scan.features?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      {scan.features.slice(0, 4).map((feature, index) => (
                        <span key={`${scan.id}-feature-${index}`} style={{ fontSize: ".68rem", color: "#0A9C87", background: "#ecfcfc", padding: "3px 7px", borderRadius: 999, fontWeight: 700 }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: ".95rem", color: "#0A2540" }}>₹{scan.price}</span>
                    <span style={{ fontSize: ".78rem", color: "#b0bec5", textDecoration: "line-through" }}>₹{scan.oldPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3 — Date & Slot */}
        <div ref={secRefs[2]} style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#0ea5e9" }}>3</div>
            <div>
              <p style={S.secTitle}>Date &amp; Time Slot</p>
              <p style={S.secSub}>Pick your preferred appointment</p>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Appointment Date</label>
            <input type="date" min={today} value={date}
              onChange={e => { setDate(e.target.value); setSlot(""); }}
              style={{ ...S.inp, maxWidth: 200, ...(errors.date ? S.inpErr : {}) }} />
            {errors.date && <p style={S.errTxt}>⚠ {errors.date}</p>}
          </div>
          <div>
            <label style={S.label}>Time Slot</label>
            <div style={S.slotGrid}>
              {SLOTS.map((s, i) => {
                const past = isSlotPast(s, date);
                const active = slot === s.label;
                return (
                  <div key={i}
                    style={{ ...S.slotCard, ...(active ? S.slotActive : {}), ...(past ? S.slotPast : {}) }}
                    onClick={() => !past && setSlot(s.label)}>
                    {s.label}
                    {past && <div style={{ fontSize: ".65rem", color: "#94a3b8", marginTop: 2 }}>Unavailable</div>}
                  </div>
                );
              })}
            </div>
            {errors.slot && <p style={S.errTxt}>⚠ {errors.slot}</p>}
          </div>
        </div>

        {/* SECTION 4 — Prescription */}
        <div ref={secRefs[3]} style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#f59e0b" }}>4</div>
            <div>
              <p style={S.secTitle}>Prescription Upload</p>
              <p style={S.secSub}>Mandatory for verification</p>
            </div>
          </div>
          <label style={{ ...S.uploadBox, display: "block", ...(errors.prescription ? { borderColor: "#e63946" } : {}) }}>
            <input type="file" hidden onChange={handleFile} />
            <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📋</div>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: ".9rem", color: "#0A2540" }}>
              {prescription ? prescription.name : "Click to Upload Prescription"}
            </p>
            <p style={{ margin: 0, fontSize: ".75rem", color: "#94a3b8" }}>PDF, JPG, PNG · Max 5 MB</p>
          </label>
          {errors.prescription && <p style={S.errTxt}>⚠ {errors.prescription}</p>}
        </div>

        {/* PRICE SUMMARY */}
        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#10b981" }}>₹</div>
            <div>
              <p style={S.secTitle}>Price Summary</p>
              <p style={S.secSub}>Updates as you select scans</p>
            </div>
          </div>
          {selectedScans.length === 0
            ? <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>Select scans to see pricing</p>
            : <>
              {selectedScans.map((s, i) => (
                <div key={i} style={S.summaryRow}>
                  <span style={{ color: "#334155" }}>{s.name}</span>
                  <strong style={{ color: "#0A2540" }}>₹{s.price}</strong>
                </div>
              ))}
              <div style={S.summaryTotal}>
                <span>Total Amount</span>
                <span style={{ color: "#e63946" }}>₹{total}</span>
              </div>
            </>
          }
        </div>

        {/* SUBMIT */}
        <button style={S.confirmBtn} onClick={handleSubmit}>
          Confirm Appointment →
        </button>

        {/* POST-SUBMIT */}
        {submitted && (
          <div ref={postRef}>
            <div style={{ background: "#ecfcfc", border: "2px solid #22c1c3", borderRadius: 16, padding: "18px 22px", marginTop: 24, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#22c1c3", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.2rem", flexShrink: 0 }}>✓</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: "#0A2540" }}>Appointment Confirmed!</p>
                <p style={{ margin: "2px 0 0", fontSize: ".82rem", color: "#64748b" }}>{patient.name} · {date} · {slot} · {branch}</p>
              </div>
            </div>

            <div style={{ ...S.section, marginTop: 18 }}>
              <div style={S.secHead}>
                <div style={{ ...S.badge, background: "#f59e0b" }}>📋</div>
                <div>
                  <p style={S.secTitle}>Pre-Test Instructions</p>
                  <p style={S.secSub}>Please follow these before your appointment</p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {preTests.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a" }}>
                    <span style={{ color: "#f59e0b", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <p style={{ margin: 0, fontSize: ".86rem", color: "#78350f", lineHeight: 1.6 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={S.section}>
              <div style={S.secHead}>
                <div style={{ ...S.badge, background: "#8b5cf6" }}>🎒</div>
                <div>
                  <p style={S.secTitle}>What to Bring</p>
                  <p style={S.secSub}>Items to carry on appointment day</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Valid government-issued photo ID","Original prescription document","Previous test reports (if any)","Insurance card (if applicable)","List of current medications","Emergency contact number"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", background: "#f5f3ff", borderRadius: 10, border: "1px solid #ddd6fe" }}>
                    <span style={{ color: "#7c3aed", fontSize: ".85rem" }}>✦</span>
                    <p style={{ margin: 0, fontSize: ".82rem", color: "#3b0764", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...S.section, background: "#f0fdf4", border: "1.5px solid #6ee7b7" }}>
              <div style={S.secHead}>
                <div style={{ ...S.badge, background: "#10b981" }}>⬇</div>
                <div>
                  <p style={S.secTitle}>Download Receipt</p>
                  <p style={S.secSub}>Save a copy for your records</p>
                </div>
              </div>
              <p style={{ fontSize: ".84rem", color: "#064e3b", marginBottom: 14 }}>
                Your receipt contains all booking details. Open the downloaded file in any browser and use <strong>Print → Save as PDF</strong> to get a PDF copy.
              </p>
              <button
                style={{ ...S.confirmBtn, background: "#10b981", width: "auto", padding: "11px 28px" }}
                onClick={() => downloadReceipt(patient, branch, selectedScans, date, slot, total)}>
                ⬇ Download Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\admin\AdminDocumentsSection.jsx
===============================

export default function AdminDocumentsSection() {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Documents Upload
      </h3>

      <div className="form-grid-2">


        <div className="upload-box">
          <label>Aadhaar Upload</label>
          <input type="file" />
        </div>


        <div className="upload-box">
          <label>Government ID Proof</label>
          <input type="file" />
        </div>

      </div>
    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\admin\AdminFields.jsx
===============================

import { useReducer, useEffect } from "react";

import AdminProfessionalSection from "./AdminProfessionalSection";
import AdminSecuritySection from "./AdminSecuritySection";
import AdminPermissionsSection from "./AdminPermissionsSection";
import AdminDocumentsSection from "./AdminDocumentsSection";

import {
  adminReducer,
  initialState,
} from "./adminReducer";

export default function AdminFields({ onChange }) {

  const [state, dispatch] = useReducer(
    adminReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state, onChange]);

  return (
    <>

      <AdminProfessionalSection
        state={state}
        dispatch={dispatch}
      />

      <AdminSecuritySection
        state={state}
        dispatch={dispatch}
      />

      <AdminPermissionsSection
        state={state}
        dispatch={dispatch}
      />

      <AdminDocumentsSection
        state={state}
        dispatch={dispatch}
      />


    </>
  );
}

===============================
FILE: client\src\components\auth\roles\admin\AdminPermissionsSection.jsx
===============================

export default function AdminPermissionsSection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Permissions
      </h3>

      <div className="pill-group">

        {[
          "User Management",
          "Inventory",
          "Reports",
          "Appointments",
          "Settings",
          "Analytics",
        ].map((permission) => (
          <button
            key={permission}
            type="button"
          >
            {permission}
          </button>
        ))}

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\admin\AdminProfessionalSection.jsx
===============================

export default function AdminProfessionalSection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Professional Information
      </h3>

      <p className="section-subtitle">
        Admin professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Access Level</label>
          <input
            type="text"
            value={state.accessLevel}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "accessLevel",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Office Location</label>
          <input
            type="text"
            value={state.officeLocation}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "officeLocation",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            value={state.joiningDate}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "joiningDate",
                value: e.target.value,
              })
            }
          />
        </div>


      </div>
    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\admin\adminReducer.js
===============================

export const initialState = {
  accessLevel: "",
  officeLocation: "",
  joiningDate: "",


  officialEmail: "",
  alternatePhone: "",

  securityQuestion: "",
  securityAnswer: "",

  twoFAEnabled: false,

  permissions: [],

  aadhaarUpload: null,
  governmentIdProof: null,

};

export function adminReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    default:
      return state;
  }
}

===============================
FILE: client\src\components\auth\roles\admin\AdminSecuritySection.jsx
===============================

export default function AdminSecuritySection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Security Information
      </h3>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Official Email</label>
          <input
            type="email"
            value={state.officialEmail}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "officialEmail",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Alternate Phone</label>
          <input
            type="text"
            value={state.alternatePhone}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "alternatePhone",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Security Question</label>
          <input
            type="text"
            value={state.securityQuestion}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "securityQuestion",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Security Answer</label>
          <input
            type="text"
            value={state.securityAnswer}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "securityAnswer",
                value: e.target.value,
              })
            }
          />
        </div>

        

      </div>

      <div className="pill-group">
        <button
          type="button"
          className={
            state.twoFAEnabled ? "active" : ""
          }
          onClick={() =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "twoFAEnabled",
              value: !state.twoFAEnabled,
            })
          }
        >
          Two Factor Authentication
        </button>
      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\doctor\DoctorConsultationSection.jsx
===============================

export default function DoctorConsultationSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Consultation Information
      </h2>

      <p className="section-subtitle">
        Consultation preferences and availability
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Available Timings</label>

          <input
            type="text"

            value={doctorForm.availableTimings}

            onChange={(e) =>
              dispatch({
                name: "availableTimings",
                value: e.target.value
              })
            }

            placeholder="Example: 10AM - 5PM"
          />
        </div>

        <div className="form-group">

          <label>Consultation Mode</label>

          <select

            value={doctorForm.consultationMode}

            onChange={(e) =>
              dispatch({
                name: "consultationMode",
                value: e.target.value
              })
            }
          >

            <option value="">
              Select Mode
            </option>

            <option value="online">
              Online
            </option>

            <option value="offline">
              Offline
            </option>

            <option value="both">
              Both
            </option>

          </select>
        </div>

      </div>

      <div style={{ marginTop: "20px" }}>

        <label>

          <input
            type="checkbox"

            checked={doctorForm.availableForOnlineConsultation}

            onChange={(e) =>
              dispatch({
                name: "availableForOnlineConsultation",
                value: e.target.checked
              })
            }
          />

          {" "}Available For Online Consultation

        </label>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\doctor\DoctorDocumentsSection.jsx
===============================

export default function DoctorDocumentsSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Documents Upload
      </h2>

      <p className="section-subtitle">
        Upload your verification documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">

          <p>Medical Certificate</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "medicalCertificate",
                value: e.target.files[0]
              })
            }
          />

        </div>

        <div className="upload-box">

          <p>Medical License</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "medicalLicense",
                value: e.target.files[0]
              })
            }
          />

        </div>

        <div className="upload-box">

          <p>ID Proof</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "idProof",
                value: e.target.files[0]
              })
            }
          />

        </div>


      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\doctor\DoctorFields.jsx
===============================

import { useReducer, useEffect } from "react";

import {
  initialState,
  doctorReducer
} from "./doctorReducer";

import DoctorProfessionalSection from "./DoctorProfessionalSection";

import DoctorConsultationSection from "./DoctorConsultationSection";

import DoctorDocumentsSection from "./DoctorDocumentsSection";

export default function DoctorFields({ onChange }) {

  const [doctorForm, dispatch] = useReducer(
    doctorReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(doctorForm);
    }
  }, [doctorForm, onChange]);

  return (

    <div>

      <DoctorProfessionalSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

      <DoctorConsultationSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

      <DoctorDocumentsSection
        doctorForm={doctorForm}
        dispatch={dispatch}
      />

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\doctor\DoctorProfessionalSection.jsx
===============================

export default function DoctorProfessionalSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Professional Information
      </h2>

      <p className="section-subtitle">
        Your medical and professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Medical License Number</label>

          <input
            type="text"

            value={doctorForm.medicalLicenseNumber}

            onChange={(e) =>
              dispatch({
                name: "medicalLicenseNumber",
                value: e.target.value
              })
            }

            placeholder="Enter medical license number"
          />
        </div>

        <div className="form-group">

          <label>Specialization</label>

          <input
            type="text"

            value={doctorForm.specialization}

            onChange={(e) =>
              dispatch({
                name: "specialization",
                value: e.target.value
              })
            }

            placeholder="Enter specialization"
          />
        </div>

        <div className="form-group">

          <label>Qualification</label>

          <input
            type="text"

            value={doctorForm.qualification}

            onChange={(e) =>
              dispatch({
                name: "qualification",
                value: e.target.value
              })
            }

            placeholder="Enter qualification"
          />
        </div>

        <div className="form-group">

          <label>Years Of Experience</label>

          <input
            type="number"

            value={doctorForm.yearsOfExperience}

            onChange={(e) =>
              dispatch({
                name: "yearsOfExperience",
                value: e.target.value
              })
            }

            placeholder="Enter years of experience"
          />
        </div>

        <div className="form-group">

          <label>Hospital / Clinic Name</label>

          <input
            type="text"

            value={doctorForm.hospitalOrClinicName}

            onChange={(e) =>
              dispatch({
                name: "hospitalOrClinicName",
                value: e.target.value
              })
            }

            placeholder="Enter hospital or clinic name"
          />
        </div>

        <div className="form-group">

          <label>Consultation Fee</label>

          <input
            type="number"

            value={doctorForm.consultationFee}

            onChange={(e) =>
              dispatch({
                name: "consultationFee",
                value: e.target.value
              })
            }

            placeholder="Enter consultation fee"
          />
        </div>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\doctor\doctorReducer.js
===============================

export const initialState = {

  medicalLicenseNumber: "",

  specialization: "",

  qualification: "",

  yearsOfExperience: "",

  hospitalOrClinicName: "",

  consultationFee: "",

  availableTimings: "",

  consultationMode: "",

  availableForOnlineConsultation: false,

  languagesKnown: [],

  medicalCertificate: null,

  medicalLicense: null,

  idProof: null,

  
};

export function doctorReducer(state, action) {

  return {

    ...state,

    [action.name]: action.value
  };
}

===============================
FILE: client\src\components\auth\roles\organization\OrganizationAdministrationSection.jsx
===============================

export default function OrganizationAdministrationSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Administration Information
      </h2>

      <p className="section-subtitle">
        Enter administration related details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Head of Institution</label>

          <input
            type="text"
            placeholder="Enter head name"
            value={organizationForm.headOfInstitution}
            onChange={(e) =>
              dispatch({
                name: "headOfInstitution",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Departments</label>

          <input
            type="number"
            placeholder="Enter departments count"
            value={organizationForm.totalDepartments}
            onChange={(e) =>
              dispatch({
                name: "totalDepartments",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Staff</label>

          <input
            type="number"
            placeholder="Enter staff count"
            value={organizationForm.totalStaff}
            onChange={(e) =>
              dispatch({
                name: "totalStaff",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Branches</label>

          <input
            type="number"
            placeholder="Enter branches count"
            value={organizationForm.totalBranches}
            onChange={(e) =>
              dispatch({
                name: "totalBranches",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Operating Hours</label>

          <input
            type="text"
            placeholder="Enter operating hours"
            value={organizationForm.operatingHours}
            onChange={(e) =>
              dispatch({
                name: "operatingHours",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={organizationForm.status}
            onChange={(e) =>
              dispatch({
                name: "status",
                value: e.target.value,
              })
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\organization\OrganizationContactSection.jsx
===============================

export default function OrganizationContactSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Contact Information
      </h2>

      <p className="section-subtitle">
        Emergency and alternate contact details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Alternate Phone</label>

          <input
            type="text"
            placeholder="Enter alternate phone"
            value={organizationForm.altPhone}
            onChange={(e) =>
              dispatch({
                name: "altPhone",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Emergency Phone</label>

          <input
            type="text"
            placeholder="Enter emergency phone"
            value={organizationForm.emergencyPhone}
            onChange={(e) =>
              dispatch({
                name: "emergencyPhone",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\organization\OrganizationDocumentsSection.jsx
===============================

export default function OrganizationDocumentsSection({
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Verification Documents
      </h2>

      <p className="section-subtitle">
        Upload organization verification documents
      </p>

      <div className="form-grid-2">


        <div className="upload-box">
          <p>Registration Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "registrationCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Municipal/Health License</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "governmentLicense",
                value: e.target.files[0],
              })
            }
          />
        </div>


        <div className="upload-box">
          <p>Authorized Person ID Proof</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "authorizedPersonIdProof",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\organization\OrganizationFields.jsx
===============================

import { useReducer, useEffect } from "react";

import {
  initialState,
  organizationReducer,
} from "./organizationReducer";

import OrganizationProfessionalSection from "./OrganizationProfessionalSection";
import OrganizationContactSection from "./OrganizationContactSection";
import OrganizationAdministrationSection from "./OrganizationAdministrationSection";
import OrganizationDocumentsSection from "./OrganizationDocumentsSection";

export default function OrganizationFields({ onChange }) {

  const [organizationForm, dispatch] = useReducer(
    organizationReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(organizationForm);
    }
  }, [organizationForm, onChange]);

  return (
    <>

      <OrganizationProfessionalSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

      <OrganizationContactSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />


      <OrganizationAdministrationSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

      <OrganizationDocumentsSection
        organizationForm={organizationForm}
        dispatch={dispatch}
      />

    </>
  );
}

===============================
FILE: client\src\components\auth\roles\organization\OrganizationProfessionalSection.jsx
===============================

export default function OrganizationProfessionalSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Professional Information
      </h2>

      <p className="section-subtitle">
        Enter organization professional details
      </p>

      <div className="form-grid-2">


        <div className="form-group">
          <label>Organization Name</label>

          <input
            type="text"
            placeholder="Enter institution name"
            value={organizationForm.institutionName}
            onChange={(e) =>
              dispatch({
                name: "institutionName",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Organization Type</label>

          <select
            value={organizationForm.institutionType}
            onChange={(e) =>
              dispatch({
                name: "institutionType",
                value: e.target.value,
              })
            }
          >
            <option value="">Select type</option>
            <option>Hospital</option>
            <option>PolyClinic</option>
            <option>Clinic</option>
            <option>Diagonistic center</option>
          </select>
        </div>


        <div className="form-group">
          <label>License Number</label>

          <input
            type="text"
            placeholder="Enter license number"
            value={organizationForm.licenseNumber}
            onChange={(e) =>
              dispatch({
                name: "licenseNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Establishment Year</label>

          <input
            type="number"
            placeholder="Enter establishment year"
            value={organizationForm.establishmentYear}
            onChange={(e) =>
              dispatch({
                name: "establishmentYear",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Ownership Type</label>

          <select
            value={organizationForm.ownershipType}
            onChange={(e) =>
              dispatch({
                name: "ownershipType",
                value: e.target.value,
              })
            }
          >
            <option value="">Select ownership</option>
            <option>Government</option>
            <option>Private</option>
            <option>Trust</option>
            <option>Corporate</option>
          </select>
        </div>


      </div>


    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\organization\organizationReducer.js
===============================

export const initialState = {
  institutionName: "",
  institutionType: "",
  registrationNumber: "",
  licenseNumber: "",
  establishmentYear: "",
  ownershipType: "",

  altPhone: "",
  emergencyPhone: "",

  headOfInstitution: "",
  totalDepartments: "",
  totalStaff: "",
  totalBranches: "",
  operatingHours: "",
  status: "Active",

  registrationCertificate: null,
  governmentLicense: null,
  authorizedPersonIdProof: null,
};

export function organizationReducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

===============================
FILE: client\src\components\auth\roles\patient\PatientFields.jsx
===============================

import { useReducer, useEffect } from "react";

import {
  initialState,
  patientReducer
} from "./patientReducer";

import PatientHealthSection from "./PatientHealthSection";

import PatientPhysicalSection from "./PatientPhysicalSection";

export default function PatientFields({ onChange }) {

  const [patientForm, dispatch] = useReducer(
    patientReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(patientForm);
    }
  }, [patientForm, onChange]);

  return (

    <div>

      <PatientHealthSection
        patientForm={patientForm}
        dispatch={dispatch}
      />

      <PatientPhysicalSection
        patientForm={patientForm}
        dispatch={dispatch}
      />

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\patient\PatientHealthSection.jsx
===============================

const conditions = [

  "BP",

  "Sugar",

  "Thyroid",

  "Anemia",

  "Asthma",

  "Heart Disease",

  "None",

  "Other"
];

export default function PatientHealthSection({

  patientForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Medical History
      </h2>

      <p className="section-subtitle">
        Select your medical conditions
      </p>

      <div className="pill-group">

        {conditions.map((condition) => (

          <button
            key={condition}

            type="button"

            className={`pill ${
              patientForm.medicalHistory.includes(condition)
                ? "active"
                : ""
            }`}

            onClick={() => {

              dispatch({
                type: "TOGGLE_CONDITION",
                value: condition
              });

              if (condition === "Other") {

                dispatch({
                  name: "hasOtherCondition",
                  value: !patientForm.hasOtherCondition
                });
              }
            }}
          >

            {condition}

          </button>

        ))}

      </div>

      {patientForm.hasOtherCondition && (

        <div
          className="form-group"
          style={{ marginTop: "25px" }}
        >

          <label>
            Other Medical Conditions
          </label>

          <textarea

            value={patientForm.otherCondition}

            onChange={(e) =>
              dispatch({
                name: "otherCondition",
                value: e.target.value
              })
            }

            placeholder="Enter your medical condition"
          />

        </div>
      )}

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\patient\PatientPhysicalSection.jsx
===============================

export default function PatientPhysicalSection({

  patientForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Physical Information
      </h2>

      <p className="section-subtitle">
        Enter your physical details
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Blood Group</label>

          <select

            value={patientForm.bloodGroup}

            onChange={(e) =>
              dispatch({
                name: "bloodGroup",
                value: e.target.value
              })
            }
          >

            <option value="">
              Select Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>

          </select>

        </div>

        <div className="form-group">

          <label>Height (cm)</label>

          <input
            type="number"

            value={patientForm.height}

            onChange={(e) =>
              dispatch({
                name: "height",
                value: e.target.value
              })
            }

            placeholder="Enter height"
          />
        </div>

        <div className="form-group">

          <label>Weight (kg)</label>

          <input
            type="number"

            value={patientForm.weight}

            onChange={(e) =>
              dispatch({
                name: "weight",
                value: e.target.value
              })
            }

            placeholder="Enter weight"
          />
        </div>

      </div>

    </div>
  );
}

===============================
FILE: client\src\components\auth\roles\patient\patientReducer.js
===============================

export const initialState = {

  bloodGroup: "",

  height: "",

  weight: "",

  medicalHistory: [],

  hasOtherCondition: false,

  otherCondition: ""
};

export function patientReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_CONDITION":

      const exists = state.medicalHistory.includes(
        action.value
      );

      return {

        ...state,

        medicalHistory: exists

          ? state.medicalHistory.filter(
              (item) => item !== action.value
            )

          : [...state.medicalHistory, action.value]
      };

    default:

      return {

        ...state,

        [action.name]: action.value
      };
  }
}

===============================
FILE: client\src\components\auth\roles\pharmacy\PharmacyDocumentsSection.jsx
===============================

import React from "react";

const PharmacyDocumentsSection = ({
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Upload Documents
      </h2>

      <p className="section-subtitle">
        Upload pharmacy verification documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">
          <p>Drug License Document</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "drugLicenseDocument",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>GST Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "gstCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Pharmacist Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacistCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Pharmacy Images</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyImages",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Owner ID Proof</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "ownerIdProof",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyDocumentsSection;

===============================
FILE: client\src\components\auth\roles\pharmacy\PharmacyFields.jsx
===============================

import React, { useReducer, useEffect } from "react";

import {
  pharmacyReducer,
  initialState,
} from "./pharmacyReducer";

import PharmacyProfessionalSection from "./PharmacyProfessionalSection";
import PharmacyLicenseSection from "./PharmacyLicenseSection";
import PharmacyServicesSection from "./PharmacyServicesSection";
import PharmacyDocumentsSection from "./PharmacyDocumentsSection";

const PharmacyFields = ({ onChange }) => {
  const [pharmacyForm, dispatch] = useReducer(
    pharmacyReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(pharmacyForm);
    }
  }, [pharmacyForm, onChange]);

  return (
    <>
      <PharmacyProfessionalSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyLicenseSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyServicesSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <PharmacyDocumentsSection
        pharmacyForm={pharmacyForm}
        dispatch={dispatch}
      />

      <button className="auth-btn">
        Register Pharmacy
      </button>
    </>
  );
};

export default PharmacyFields;

===============================
FILE: client\src\components\auth\roles\pharmacy\PharmacyLicenseSection.jsx
===============================

import React from "react";

const PharmacyLicenseSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        License Information
      </h2>

      <p className="section-subtitle">
        Enter pharmacy registration details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Registration Number</label>

          <input
            type="text"
            placeholder="Enter registration number"
            value={pharmacyForm.registrationNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "registrationNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Drug License Number</label>

          <input
            type="text"
            placeholder="Enter drug license number"
            value={pharmacyForm.drugLicenseNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "drugLicenseNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>GST Number</label>

          <input
            type="text"
            placeholder="Enter GST number"
            value={pharmacyForm.gstNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "gstNumber",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyLicenseSection;

===============================
FILE: client\src\components\auth\roles\pharmacy\PharmacyProfessionalSection.jsx
===============================

import React from "react";

const PharmacyProfessionalSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Pharmacy Information
      </h2>

      <p className="section-subtitle">
        Enter pharmacy professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Pharmacy Name</label>

          <input
            type="text"
            placeholder="Enter pharmacy name"
            value={pharmacyForm.pharmacyName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyName",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Pharmacy Type</label>

          <input
            type="text"
            placeholder="Retail / Hospital / Clinic"
            value={pharmacyForm.pharmacyType}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyType",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Owner Name</label>

          <input
            type="text"
            placeholder="Enter owner name"
            value={pharmacyForm.ownerName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "ownerName",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Pharmacist In Charge</label>

          <input
            type="text"
            placeholder="Enter pharmacist name"
            value={pharmacyForm.pharmacistInCharge}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacistInCharge",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Years Of Operation</label>

          <input
            type="number"
            placeholder="Enter years"
            value={pharmacyForm.yearsOfOperation}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "yearsOfOperation",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Operating Hours</label>

          <input
            type="text"
            placeholder="9AM - 10PM"
            value={pharmacyForm.operatingHours}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "operatingHours",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyProfessionalSection;

===============================
FILE: client\src\components\auth\roles\pharmacy\pharmacyReducer.js
===============================

export const initialState = {
  pharmacyName: "",
  pharmacyType: "",
  ownerName: "",
  pharmacistInCharge: "",
  yearsOfOperation: "",
  operatingHours: "",

  registrationNumber: "",
  drugLicenseNumber: "",
  gstNumber: "",

  homeDeliveryAvailable: false,
  emergencyServiceAvailable: false,
  onlineConsultationSupport: false,
  availability24x7: false,

  drugLicenseDocument: null,
  gstCertificate: null,
  pharmacistCertificate: null,
  pharmacyImages: null,
  ownerIdProof: null,
};

export const pharmacyReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

===============================
FILE: client\src\components\auth\roles\pharmacy\PharmacyServicesSection.jsx
===============================

import React from "react";

const PharmacyServicesSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Pharmacy Services
      </h2>

      <p className="section-subtitle">
        Select available services
      </p>

      <div className="form-grid-2">

        {/* Home Delivery */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={pharmacyForm.homeDeliveryAvailable}
            onChange={() =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "homeDeliveryAvailable",
                value:
                  !pharmacyForm.homeDeliveryAvailable,
              })
            }
          />
          <span>Home Delivery</span>
        </label>


        {/* 24x7 Availability */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={pharmacyForm.availability24x7}
            onChange={() =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "availability24x7",
                value:
                  !pharmacyForm.availability24x7,
              })
            }
          />
          <span>24x7 Availability</span>
        </label>

      </div>

    </div>
  );
};

export default PharmacyServicesSection;

===============================
FILE: client\src\components\auth\roles\phlebo\PhleboAvailabilitySection.jsx
===============================

import React from "react";

const PhleboAvailabilitySection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Availability Details
      </h2>

      <p className="section-subtitle">
        Configure working hours and service availability
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Available Time</label>

          <input
            type="text"
            placeholder="9 AM - 6 PM"
            value={phleboForm.availableTime}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "availableTime",
                value: e.target.value,
              })
            }
          />
        </div>


      </div>

      <div className="pill-group">

        <label>
          <input
            type="checkbox"
            checked={phleboForm.homeCollection}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "homeCollection",
                value: e.target.checked,
              })
            }
          />

          Home Collection
        </label>

        <label>
          <input
            type="checkbox"
            checked={phleboForm.emergencyAvailability}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "emergencyAvailability",
                value: e.target.checked,
              })
            }
          />

          Emergency Availability
        </label>

      </div>

    </div>
  );
};

export default PhleboAvailabilitySection;

===============================
FILE: client\src\components\auth\roles\phlebo\PhleboDocumentsSection.jsx
===============================

import React from "react";

const PhleboDocumentsSection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Document Uploads
      </h2>

      <p className="section-subtitle">
        Upload verification and professional documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">
          <label>Aadhaar card</label>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "aadhaarFront",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <label>MLT/DMLT Certificate</label>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "phlebotomyCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PhleboDocumentsSection;

===============================
FILE: client\src\components\auth\roles\phlebo\PhleboFields.jsx
===============================

import React, { useReducer, useEffect } from "react";

import {
  initialState,
  phleboReducer,
} from "./PhleboReducer";

import PhleboProfessionalSection from "./PhleboProfessionalSection";
import PhleboDocumentsSection from "./PhleboDocumentsSection";
import PhleboAvailabilitySection from "./PhleboAvailabilitySection";

const PhleboFields = ({ onChange }) => {

  const [phleboForm, dispatch] = useReducer(
    phleboReducer,
    initialState
  );

  useEffect(() => {
    if (onChange) {
      onChange(phleboForm);
    }
  }, [phleboForm, onChange]);

  return (

    <div className="role-form-container">

      {/* Phlebo Type Selection */}

      <div className="section-card">

        <h2 className="section-title">
          Phlebo Type
        </h2>

        <p className="section-subtitle">
          Select your working category
        </p>

        <div className="pill-group">

          <label className="pill-option">

            <input
              type="radio"
              name="phleboType"
              value="partTime"
              checked={phleboForm.phleboType === "partTime"}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  name: "phleboType",
                  value: e.target.value,
                })
              }
            />

            Part Time

          </label>

          <label className="pill-option">

            <input
              type="radio"
              name="phleboType"
              value="fullTime"
              checked={phleboForm.phleboType === "fullTime"}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  name: "phleboType",
                  value: e.target.value,
                })
              }
            />

            Full Time

          </label>

        </div>

      </div>

      {/* Common Sections */}

      <PhleboProfessionalSection
        phleboForm={phleboForm}
        dispatch={dispatch}
      />

      {/* Dynamic Workflow */}

      {phleboForm.phleboType === "partTime" && (

        <PhleboAvailabilitySection
          phleboForm={phleboForm}
          dispatch={dispatch}
        />

      )}


      {/* Common Documents */}

      <PhleboDocumentsSection
        phleboForm={phleboForm}
        dispatch={dispatch}
      />

    </div>
  );
};

export default PhleboFields;

===============================
FILE: client\src\components\auth\roles\phlebo\PhleboProfessionalSection.jsx
===============================

import React from "react";

const PhleboProfessionalSection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Professional Details
      </h2>

      <p className="section-subtitle">
        Add qualification and professional experience
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Qualification</label>

          <input
            type="text"
            value={phleboForm.qualification}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "qualification",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>

          <input
            type="text"
            value={phleboForm.specialization}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "specialization",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Years Of Experience</label>

          <input
            type="number"
            value={phleboForm.yearsOfExperience}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "yearsOfExperience",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Certification Number</label>

          <input
            type="text"
            value={phleboForm.certificationNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "certificationNumber",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PhleboProfessionalSection;

===============================
FILE: client\src\components\auth\roles\phlebo\PhleboReducer.js
===============================

export const initialState = {
  phleboType: "",

  qualification: "",
  specialization: "",
  yearsOfExperience: "",
  certificationNumber: "",

  availableDays: [],
  availableTime: "",
  homeCollection: false,
  emergencyAvailability: false,

  governmentIdType: "",
  aadhaarFront: null,
  phlebotomyCertificate: null,
  
};

export const phleboReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};

===============================
FILE: client\src\components\auth\Auth.css
===============================

.auth-container {

  width: 100%;

  min-height: 100vh;

  padding: 60px 40px;

  background: #f8fafc;

  display: flex;

  justify-content: center;

  align-items: flex-start;
}

/* ===== MAIN CARD ===== */

.auth-card {

  width: 1200px;

  max-width: 95%;

  background: #ffffff;

  border-radius: 24px;

  padding: 50px;

  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}

/* ===== REGISTER HEADER ===== */

.register-header {

  margin-bottom: 40px;
}

.register-title {

  font-size: 42px;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 10px;
}

.register-subtitle {

  font-size: 17px;

  color: #64748b;
}

/* ===== CLOSE BUTTON ===== */

.close-btn {

  position: absolute;

  top: 20px;

  right: 20px;

  border: none;

  background: transparent;

  font-size: 28px;

  cursor: pointer;

  color: #475569;
}

/* ===== AUTH SUBTITLE ===== */

.auth-subtitle {

  color: #64748b;

  margin-bottom: 25px;

  font-size: 15px;
}

/* ===== FORM ===== */

.auth-form {

  display: flex;

  flex-direction: column;

  gap: 28px;
}

/* ===== FORM GRID ===== */

.form-grid-2 {

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 24px;
}

.form-grid-1 {

  display: grid;

  grid-template-columns: 1fr;

  gap: 24px;
}

/* ===== FORM GROUP ===== */

.form-group {

  display: flex;

  flex-direction: column;

  gap: 10px;
}

.form-group label {

  font-size: 15px;

  font-weight: 600;

  color: #0f172a;
}

/* ===== INPUTS ===== */

.form-group input,
.form-group textarea,
.form-group select {

  width: 100%;

  padding: 15px 16px;

  border: 1px solid #d1d5db;

  border-radius: 14px;

  font-size: 15px;

  background: white;

  outline: none;

  transition: 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {

  border-color: #0f766e;

  box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.1);
}

.form-group textarea {

  resize: none;

  min-height: 120px;
}

/* ===== BUTTON ===== */

.auth-btn {

  width: 100%;

  background: #0f4676;

  color: white;

  border: none;

  padding: 16px;

  border-radius: 14px;

  font-size: 17px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;

  margin-top: 15px;
}

.auth-btn:hover {

  background: #0b3558;
}

/* ===== SWITCH AUTH ===== */

.switch-auth {

  text-align: center;

  margin-top: 25px;

  color: #64748b;

  font-size: 15px;
}

.switch-auth span {

  color: #0f4676;

  font-weight: 700;

  cursor: pointer;
}

/* ===== SECTION CARD ===== */

.section-card {

  background: #ffffff;

  border: 1px solid #e2e8f0;

  border-radius: 22px;

  padding: 35px;

  margin-top: 35px;
}

/* ===== SECTION TITLE ===== */

.section-title {

  font-size: 32px;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 10px;
}

.section-subtitle {

  font-size: 15px;

  color: #64748b;

  margin-bottom: 30px;
}

/* ===== DYNAMIC ROLE BOX ===== */

.dynamic-role-box {

  margin-top: 30px;
}

/* ===== PILL SELECTOR ===== */

.pill-group {

  display: flex;

  flex-wrap: wrap;

  gap: 12px;
}

.pill {

  padding: 12px 20px;

  border-radius: 999px;

  border: 1px solid #cbd5e1;

  background: #f8fafc;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.pill:hover {

  border-color: #0ea5e9;
}

.pill.active {

  background: #0ea5e9;

  color: white;

  border-color: #0ea5e9;
}

/* ===== UPLOAD BOX ===== */

.upload-box {

  border: 2px dashed #cbd5e1;

  border-radius: 18px;

  padding: 30px 20px;

  background: #f8fafc;

  transition: 0.2s;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 14px;

  min-height: 180px;

  text-align: center;
}

.upload-box:hover {

  border-color: #0ea5e9;

  background: #f0f9ff;
}

.upload-box p {

  font-size: 16px;

  font-weight: 600;

  color: #0f172a;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 992px) {

  .auth-card {

    padding: 35px;
  }

  .section-card {

    padding: 25px;
  }
}

@media (max-width: 768px) {

  .auth-container {

    padding: 25px 15px;
  }

  .auth-card {

    width: 100%;

    padding: 25px;
  }

  .form-grid-2 {

    grid-template-columns: 1fr;
  }

  .register-title {

    font-size: 32px;
  }

  .section-title {

    font-size: 24px;
  }
}
.pill-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
}

.checkbox-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

===============================
FILE: client\src\components\auth\Login.jsx
===============================

import React, { useState } from "react";
import "./Auth.css";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const Login = ({ setPage, setIsLoggedIn, setUser }) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP verification for users whose email is not yet verified
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  /* ─── Login ─────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { accessToken, user } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        if (setIsLoggedIn) setIsLoggedIn(true);
        if (setUser) setUser(user);

        toast.success(`Welcome back, ${user.name}! You are now logged in.`);

        setTimeout(() => {
  if (user.role === "patient") {
    setPage("profile");
  } else if (user.role === "pharmacy") {
    setPage("pharmacy-dashboard");
  } else {
    setPage("home");
  }
}, 800);
      } else if (response.data.requiresVerification) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);

        toast.info(
          "Your email is not verified yet. Please enter the OTP sent to your email."
        );
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 401) {
        toast.error(
          "Incorrect email or password. Please check your credentials and try again."
        );
      } else if (status === 429) {
        toast.warning(
          "Too many login attempts. Please wait a few minutes before trying again."
        );
      } else {
        toast.error(
          msg ||
            "Unable to connect to server. Please check your internet and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─── OTP Verify ─────────────────────────────────────── */
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email",
      });

      if (response.data.success) {
        toast.success("Email verified successfully! You can now sign in.");
        setShowOtpScreen(false);
        setOtp("");
      } else {
        toast.error(
          response.data.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 400) {
        toast.error(
          "The OTP you entered is incorrect or has expired. Please request a new one."
        );
      } else {
        toast.error(
          msg || "Something went wrong during verification. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─── Resend OTP ─────────────────────────────────────── */
  const handleResendOtp = async () => {
    if (!userId) return;

    try {
      await api.post("/auth/resend-otp", {
        userId,
        type: "email",
      });

      toast.info("A new OTP has been sent to your email address.");
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Could not resend OTP. Please try again.");
    }
  };

  /* ─── OTP Screen ─────────────────────────────────────── */
  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div
          className="auth-card"
          style={{ maxWidth: "500px", padding: "40px" }}
        >
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>
              Verify Email
            </h1>

            <p className="register-subtitle">
              Please enter the 6-digit code sent to your email address to verify
              your account.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>
                Enter OTP Code
              </label>

              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Didn&apos;t receive the code?{" "}
            <span
              onClick={handleResendOtp}
              style={{
                color: "#1B6CA8",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    );
  }

  /* ─── Login Screen ───────────────────────────────────── */
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <h2>Login</h2>

        <p className="auth-subtitle">Access your CallMedex account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="switch-auth">
          New User?{" "}
          <span onClick={() => setPage("register")}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

===============================
FILE: client\src\components\auth\Register.jsx
===============================

import React, { useState } from "react";
import "./Auth.css";

import DoctorFields from "./roles/doctor/DoctorFields";
import PatientFields from "./roles/patient/PatientFields";
import AdminFields from "./roles/admin/AdminFields";
import PharmacyFields from "./roles/pharmacy/PharmacyFields";
import OrganizationFields from "./roles/organization/OrganizationFields";
import PhleboFields from "./roles/phlebo/PhleboFields";

import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const Register = ({ setPage }) => {
  const toast = useToast();

  const [selectedRole, setSelectedRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [roleData, setRoleData] = useState({});
  const [loading, setLoading] = useState(false);

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  const normalizedRole =
    selectedRole === "phlebotomist" ? "phlebo" : selectedRole;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const processRoleData = async (data) => {
    const processed = { ...data };

    for (const key in processed) {
      if (processed[key] instanceof File) {
        try {
          processed[key] = await fileToBase64(processed[key]);
        } catch (err) {
          console.error(`Failed to convert file for ${key}:`, err);
        }
      }

      if (Array.isArray(processed[key])) {
        const convertedArray = [];

        for (const item of processed[key]) {
          if (item instanceof File) {
            try {
              convertedArray.push(await fileToBase64(item));
            } catch (err) {
              console.error(`Failed to convert file array item for ${key}:`, err);
            }
          } else {
            convertedArray.push(item);
          }
        }

        processed[key] = convertedArray;
      }
    }

    return processed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.warning("Please select a role to continue registration.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please re-enter them.");
      return;
    }

    if (formData.password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: normalizedRole,
      };

      const response = await api.post("/auth/register", payload);

      if (response.data.success) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);
        setOtp("");

        toast.info(
          "Registration started! Please check your email for the 6-digit OTP code."
        );
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 409) {
        toast.error(
          "An account already exists with this email or phone number. Please sign in instead."
        );
      } else if (status === 400) {
        toast.error(msg || "Some fields are invalid. Please review your details.");
      } else if (status === 429) {
        toast.warning("Too many requests. Please wait a few minutes before trying again.");
      } else {
        toast.error(
          msg || "Unable to register right now. Please check your internet and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Registration session missing. Please register again.");
      setShowOtpScreen(false);
      return;
    }

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      const otpResponse = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email",
      });

      if (!otpResponse.data.success) {
        toast.error(
          otpResponse.data.message || "OTP verification failed. Please try again."
        );
        return;
      }

      const cleanedRoleData = await processRoleData(roleData);

      await api.post("/profile/onboard", {
        userId,
        role: normalizedRole,
        ...cleanedRoleData,
      });

      toast.success(
        "Your account has been created and verified successfully! You can now sign in."
      );

      setTimeout(() => {
        setPage("login");
      }, 1200);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 400) {
        toast.error(
          msg || "The OTP you entered is incorrect or has expired. Please request a new one."
        );
      } else if (status === 401) {
        toast.error("Session expired. Please go back and start registration again.");
      } else {
        toast.error(msg || "Verification or onboarding failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userId) {
      toast.error("Registration session missing. Please register again.");
      return;
    }

    if (!formData.email) {
      toast.error("Email is missing. Please go back and enter your email.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/resend-otp", {
        userId,
        type: "email",
        target: formData.email,
        name: formData.name,
      });

      setOtp("");
      toast.info("A new OTP has been sent to your email address.");
    } catch (err) {
      console.log("RESEND OTP ERROR:", err.response?.data || err.message);

        const msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Could not resend OTP. Please try again.";

        toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "500px", padding: "40px" }}>
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>
              Verify OTP
            </h1>

            <p className="register-subtitle">
              Enter the 6-digit verification code sent to your email.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>
                Enter OTP Code
              </label>

              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Complete Onboarding"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Didn&apos;t receive the code?{" "}
            <span
              onClick={!loading ? handleResendOtp : undefined}
              style={{
                color: loading ? "#94a3b8" : "#1B6CA8",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>
          </p>

          <p
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            <span
              onClick={() => {
                if (!loading) {
                  setShowOtpScreen(false);
                }
              }}
              style={{
                color: "#64748b",
                cursor: loading ? "not-allowed" : "pointer",
                textDecoration: "underline",
              }}
            >
              ← Back to Registration
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="register-header">
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">Join CallMedex healthcare ecosystem</p>
        </div>

        <p className="auth-subtitle">Register for CallMedex</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  }))
                }
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create password (min 8 characters)"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="section-card">
            <h3 className="section-title" style={{ fontSize: "24px" }}>
              Address Information
            </h3>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                    }))
                  }
                  placeholder="Enter pincode"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Select Role</label>

            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setRoleData({});
              }}
              required
            >
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="phlebotomist">Phlebotomist</option>
              <option value="patient">Patient</option>
              <option value="organization">Organization</option>
              <option value="pharmacy">Pharmacy</option>
            </select>
          </div>

          {selectedRole === "doctor" && <DoctorFields onChange={setRoleData} />}
          {selectedRole === "patient" && <PatientFields onChange={setRoleData} />}
          {selectedRole === "admin" && <AdminFields onChange={setRoleData} />}
          {selectedRole === "pharmacy" && <PharmacyFields onChange={setRoleData} />}
          {selectedRole === "organization" && (
            <OrganizationFields onChange={setRoleData} />
          )}
          {selectedRole === "phlebotomist" && (
            <PhleboFields onChange={setRoleData} />
          )}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={() => setPage("login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;

===============================
FILE: client\src\components\blog\BlogPage.jsx
===============================

const blogs = [
  {
    icon: "🩺",
    tag: "Preventive Health",
    title: "Why Regular Health Checkups Matter",
    desc:
      "Routine health checkups help identify silent problems like BP, sugar, thyroid and cholesterol early. They are useful for adults, elderly patients and anyone with a family health history.",
  },
  {
    icon: "🏡",
    tag: "Home Care",
    title: "When to Choose Consultation at Home",
    desc:
      "Home consultation is helpful for elderly care, post-hospital follow-up, physiotherapy support and patients with travel difficulty. It gives care in a safe and comfortable environment.",
  },
  {
    icon: "🔬",
    tag: "Diagnostics",
    title: "How to Prepare for Diagnostic Tests",
    desc:
      "Before diagnostic tests, carry your ID, prescription and previous reports. Reach before your selected slot and follow fasting or preparation instructions for better report accuracy.",
  },
  {
    icon: "💊",
    tag: "Pharmacy",
    title: "Safe Medicine Ordering Tips",
    desc:
      "Order medicines with the correct name, strength and quantity. Keep prescriptions ready where needed, check expiry dates after delivery and avoid changing dosage without advice.",
  },
];

export default function BlogPage({ setPage }) {
  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <button style={S.back} onClick={() => setPage("home")}>
          ← Back
        </button>

        <section style={S.hero}>
          <div>
            <span style={S.badge}>CALLMEDEX CARE JOURNAL</span>
            <h1 style={S.title}>Health guidance made simple</h1>
            <p style={S.sub}>
              Short and useful healthcare articles for patients about checkups,
              home care, diagnostics and safe medicine support.
            </p>
          </div>

          <div style={S.heroIcon}>🫀</div>
        </section>

        <section style={S.grid}>
          {blogs.map((blog) => (
            <article key={blog.title} style={S.card}>
              <div style={S.icon}>{blog.icon}</div>
              <span style={S.tag}>{blog.tag}</span>
              <h2 style={S.cardTitle}>{blog.title}</h2>
              <p style={S.desc}>{blog.desc}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    padding: "115px 28px 60px",
    background:
      "radial-gradient(circle at top left, #e8fbff 0, #f4f8fb 35%, #eef4f8 100%)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
  },
  back: {
    border: 0,
    background: "#e63946",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 14,
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: 20,
    boxShadow: "0 8px 18px rgba(230,57,70,.22)",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    background: "linear-gradient(135deg, #08243f, #0d4068)",
    color: "#fff",
    borderRadius: 30,
    padding: "42px 38px",
    marginBottom: 26,
    boxShadow: "0 20px 45px rgba(8,36,63,.22)",
    overflow: "hidden",
  },
  badge: {
    display: "inline-block",
    background: "rgba(34,193,195,.18)",
    color: "#8ff7ff",
    padding: "7px 14px",
    borderRadius: 999,
    fontSize: ".74rem",
    fontWeight: 900,
    letterSpacing: ".7px",
    marginBottom: 14,
  },
  title: {
    margin: 0,
    fontSize: "2.35rem",
    lineHeight: 1.1,
    fontWeight: 900,
  },
  sub: {
    margin: "12px 0 0",
    maxWidth: 640,
    color: "rgba(255,255,255,.78)",
    fontSize: ".98rem",
    lineHeight: 1.7,
  },
  heroIcon: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    background: "rgba(255,255,255,.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.2rem",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(245px, 1fr))",
    gap: 18,
    alignItems: "stretch",
  },
  card: {
    minHeight: 280,
    background: "rgba(255,255,255,.94)",
    borderRadius: 24,
    padding: 24,
    border: "1px solid #e8edf2",
    boxShadow: "0 12px 28px rgba(15,23,42,.08)",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background: "#ecfcfc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    marginBottom: 14,
  },
  tag: {
    color: "#0A9C87",
    fontSize: ".74rem",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  cardTitle: {
    minHeight: 62,
    margin: "8px 0 10px",
    color: "#0A2540",
    fontSize: "1.15rem",
    lineHeight: 1.35,
    fontWeight: 900,
  },
  desc: {
    color: "#526174",
    fontSize: ".9rem",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "left",
  },
};

===============================
FILE: client\src\components\cardiology\Cardiology.jsx
===============================

import React, { useState } from "react";
import "../../styles/App.css";
import AppointmentBooking from "../appointments/AppointmentBooking";
import { scanDatabase } from "./scanData";

export default function Cardiology() {
  const [showBooking, setShowBooking] = useState(false);

  const services = [
    { icon: "❤️", title: "ECG Test",         desc: "Advanced electrocardiogram analysis for accurate heart rhythm monitoring." },
    { icon: "🫀", title: "2D Echo",           desc: "Modern cardiac ultrasound imaging with expert cardiologists." },
    { icon: "🏃", title: "TMT Test",          desc: "Stress testing for evaluating heart performance during exercise." },
    { icon: "📊", title: "Cardiac Screening", desc: "Complete preventive heart health packages and risk assessment." },
  ];

  if (showBooking) {
    return (
      <div className="cardiology-page">
        <button
          onClick={() => setShowBooking(false)}
          style={{
            position: "fixed", top: 80, right: 24, zIndex: 999,
            background: "#e63946", color: "white", border: "none",
            borderRadius: 10, padding: "8px 18px", fontWeight: 700,
            cursor: "pointer", fontSize: ".88rem",
          }}
        >
          ← Back
        </button>
        <AppointmentBooking
          title="Cardiology Diagnostic Booking"
          scans={scanDatabase.cardiology}
        />
      </div>
    );
  }

  return (
    <div className="cardiology-page">
      <section className="cardio-hero">
        <div className="cardio-left">
          <div className="cardio-tag">❤️ ADVANCED CARDIOLOGY CARE</div>
          <h1>Expert Heart Care &<span> Cardiac Diagnostics</span></h1>
          <p>
            Comprehensive cardiology services with AI-assisted diagnostics,
            preventive screenings, ECG, 2D Echo, TMT tests, and specialist consultations.
          </p>
          <div className="cardio-btns">
            <button className="cardio-primary" onClick={() => setShowBooking(true)}>
              Book Appointment
            </button>
            <button
              className="cardio-secondary"
              onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
            >
              Explore Services
            </button>
          </div>
        </div>

        <div className="cardio-right">
          <div className="heart-card">
            <div className="heart-top">
              <div className="heart-icon">❤️</div>
              <div>
                <h3>Heart Monitoring</h3>
                <p>AI Analysis Active</p>
              </div>
            </div>
            <div className="heart-line">
              <svg viewBox="0 0 600 120">
                <polyline
                  fill="none"
                  stroke="#e63946"
                  strokeWidth="4"
                  points="
                  0,60 50,60 80,20 110,100 140,20 170,60
                  220,60 250,20 280,100 310,20 340,60
                  390,60 420,20 450,100 480,20 510,60
                  560,60 590,20 600,60"
                />
              </svg>
            </div>
            <div className="heart-stats">
              <div className="heart-stat"><h2>72 BPM</h2><p>Heart Rate</p></div>
              <div className="heart-stat"><h2>98%</h2><p>Oxygen Level</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

===============================
FILE: client\src\components\cardiology\scanData.js
===============================

export const scanDatabase = {

  cardiology: [

    {
      id:"ecg",
      name:"ECG",
      subtitle:"Electrocardiogram",
      price:350,
      oldPrice:700,
      icon:"📈",

      instructions:[
        "No fasting required",
        "Avoid lotion on chest",
        "Wear comfortable clothes"
      ]
    },

    {
      id:"echo",
      name:"2D ECHO",
      subtitle:"Echocardiography",
      price:900,
      oldPrice:1800,
      icon:"🩺",

      instructions:[
        "No preparation needed",
        "Carry previous reports",
        "Wear loose clothing"
      ]
    },

    {
      id:"tmt",
      name:"TMT",
      subtitle:"Treadmill Stress Test",
      price:1200,
      oldPrice:2400,
      icon:"🏃",

      instructions:[
        "Avoid heavy meals",
        "Wear sports shoes",
        "Avoid smoking"
      ]
    },

    {
      id:"trop",
      name:"TROP I/T",
      subtitle:"Troponin I & T Test",
      price:600,
      oldPrice:1200,
      icon:"🧬",

      instructions:[
        "Blood sample required",
        "Hydrate properly",
        "Carry prescription"
      ]
    }

  ],

  radiology:[

    {
      id:"mri",
      name:"MRI",
      subtitle:"Magnetic Resonance Imaging",
      price:4500,
      oldPrice:6000,
      icon:"🧲",

      instructions:[
        "Remove metal items",
        "Inform implants",
        "Carry reports"
      ]
    }

  ]

};

===============================
FILE: client\src\components\consultancy\consultancyHome.api.js
===============================

import { api } from "../../shared/api";

export const consultancyHomeApi = {
  getServices: () => api.get("/consultancy-home/services"),
  getMe: () => api.get("/consultancy-home/me"),
  getSlots: (date) => api.get(`/consultancy-home/slots?date=${date}`),
  createBooking: (payload) => api.post("/consultancy-home/bookings", payload)
};

===============================
FILE: client\src\components\consultancy\consultancyHome.jsx
===============================

import { useEffect, useMemo, useState } from "react";
import { consultancyHomeApi } from "./consultancyHome.api";

// ── styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    display: "flex", gap: 20, padding: "100px 28px 48px",
    background: "#f4f8fb", minHeight: "100vh", fontFamily: "'Segoe UI',sans-serif",
  },
  sidebar: { width: 260, flexShrink: 0 },
  card: {
    background: "white", borderRadius: 20, padding: "20px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)", marginBottom: 16,
  },
  main: { flex: 1, minWidth: 0 },
  h1: { fontSize: "1.7rem", color: "#0A2540", margin: 0, fontWeight: 700 },
  sub: { color: "#64748b", fontSize: ".88rem", marginTop: 4, marginBottom: 0 },
  section: {
    background: "white", borderRadius: 20, padding: "22px 24px",
    marginBottom: 18, boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  secHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  badge: {
    width: 34, height: 34, borderRadius: 10, background: "#22c1c3",
    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: ".9rem", flexShrink: 0,
  },
  secTitle: { color: "#0A2540", fontSize: "1rem", fontWeight: 700, margin: 0 },
  secSub:   { color: "#94a3b8", fontSize: ".8rem", margin: "2px 0 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  label: {
    display: "block", fontSize: ".75rem", fontWeight: 600, color: "#64748b",
    marginBottom: 5, textTransform: "uppercase", letterSpacing: ".5px",
  },
  inp: {
    width: "100%", padding: "9px 12px", border: "1.5px solid #e8edf2",
    borderRadius: 10, fontSize: ".88rem", outline: "none",
    background: "#f8fafc", boxSizing: "border-box", transition: "border-color .2s",
  },
  inpReadonly: {
    width: "100%", padding: "9px 12px", border: "1.5px solid #f0f4f8",
    borderRadius: 10, fontSize: ".88rem", background: "#f1f5f9",
    boxSizing: "border-box", color: "#64748b",
  },
  inpErr: { borderColor: "#e63946" },
  errTxt: { color: "#e63946", fontSize: ".75rem", marginTop: 3, margin: "3px 0 0" },
  serviceGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12,
  },
  serviceCard: {
    border: "2px solid #edf2f7", borderRadius: 16, padding: "16px",
    cursor: "pointer", transition: "all .25s", background: "#f8fafc", textAlign: "left",
  },
  serviceCardSel: { borderColor: "#22c1c3", background: "#ecfcfc" },
  slotGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8,
  },
  slotCard: {
    border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "9px 12px",
    textAlign: "center", cursor: "pointer", fontSize: ".83rem", fontWeight: 600,
    color: "#334155", transition: ".2s", background: "#f8fafc",
  },
  slotActive: { borderColor: "#22c1c3", background: "#ecfcfc", color: "#0A2540" },
  slotBooked: {
    opacity: .4, cursor: "not-allowed", background: "#f1f5f9",
    color: "#94a3b8", textDecoration: "line-through",
  },
  summaryRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0", borderBottom: "1px solid #f0f4f8", fontSize: ".88rem",
  },
  summaryTotal: {
    display: "flex", justifyContent: "space-between",
    padding: "12px 0 0", fontWeight: 700, fontSize: "1rem", color: "#0A2540",
  },
  confirmBtn: {
    width: "100%", padding: "13px", background: "#e63946", color: "white",
    border: "none", borderRadius: 14, fontWeight: 700, fontSize: "1rem",
    cursor: "pointer", marginTop: 12,
  },
  confirmBtnDisabled: {
    width: "100%", padding: "13px", background: "#cbd5e1", color: "white",
    border: "none", borderRadius: 14, fontWeight: 700, fontSize: "1rem",
    cursor: "not-allowed", marginTop: 12,
  },
  msgSuccess: {
    padding: "12px 16px", borderRadius: 12, background: "#ecfdf5",
    color: "#059669", fontWeight: 600, fontSize: ".88rem", marginBottom: 16,
    border: "1px solid #a7f3d0",
  },
  msgError: {
    padding: "12px 16px", borderRadius: 12, background: "#fff1f2",
    color: "#e63946", fontWeight: 600, fontSize: ".88rem", marginBottom: 16,
    border: "1px solid #fecdd3",
  },
};

const GROUP_ICONS = {
  "Doctor": "🩺", "Nursing": "💉", "Mental Health": "🧠",
  "Emergency": "🚨", "Physiotherapy": "🏃",
};
const getIcon = (g) => GROUP_ICONS[g] || "🏥";

// ── Receipt (opens in new window, auto-prints) ────────────────────────────────
function openReceipt(booking) {
  const issued = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const apptDate = new Date(booking.appointment_date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const itemRows = (booking.items || []).map((item) =>
    `<tr>
      <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8">${item.service_name}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8;text-align:right;font-weight:600">
        &#8377;${Number(item.line_total).toFixed(2)}
      </td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Receipt - ${booking.receipt_id}</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    @page { margin: 18mm; size: A4; }
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', sans-serif; background: #f4f8fb; padding: 32px; color: #0A2540; }
  .card { background: white; border-radius: 20px; padding: 36px; max-width: 560px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
  .header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .logo-icon { width: 46px; height: 46px; border-radius: 12px; background: #e63946; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.3rem; font-weight: 700; flex-shrink: 0; }
  .brand { font-size: 1.1rem; font-weight: 700; color: #0A2540; }
  .brand-sub { font-size: .75rem; color: #94a3b8; margin-top: 2px; }
  .confirmed { display: inline-block; background: #ecfdf5; color: #059669; padding: 5px 14px; border-radius: 20px; font-size: .78rem; font-weight: 700; margin-bottom: 16px; }
  h1 { font-size: 1.4rem; font-weight: 700; margin: 0 0 4px; }
  .sub { color: #64748b; font-size: .83rem; margin: 0 0 20px; }
  hr { border: none; border-top: 1.5px solid #f0f4f8; margin: 16px 0; }
  .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: .88rem; }
  .row-label { color: #64748b; }
  .row-value { color: #0A2540; font-weight: 600; text-align: right; max-width: 300px; }
  .section-label { font-size: .72rem; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: #94a3b8; margin: 0 0 10px; }
  table { width: 100%; border-collapse: collapse; font-size: .88rem; }
  .total-row { display: flex; justify-content: space-between; padding: 12px 0 0; font-weight: 700; font-size: 1rem; }
  .footer-box { background: #f8fafc; border-radius: 12px; padding: 14px 16px; font-size: .8rem; color: #64748b; line-height: 1.7; margin-top: 20px; }
  .print-btn { display: block; width: 100%; margin-top: 20px; padding: 12px; background: #22c1c3; color: white; border: none; border-radius: 14px; font-size: 1rem; font-weight: 700; cursor: pointer; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="logo-icon">C</div>
    <div>
      <div class="brand">CallMeDex</div>
      <div class="brand-sub">Home Consultation</div>
    </div>
  </div>

  <div class="confirmed">&#10003; BOOKING CONFIRMED</div>
  <h1>Booking Receipt</h1>
  <p class="sub">Receipt #${booking.receipt_id} &nbsp;&middot;&nbsp; Issued: ${issued}</p>

  <hr>
  <p class="section-label">Patient Details</p>
  <div class="row"><span class="row-label">Patient ID</span><span class="row-value">${booking.patient_public_id}</span></div>
  <div class="row"><span class="row-label">Name</span><span class="row-value">${booking.patient_name}</span></div>
  <div class="row"><span class="row-label">Phone</span><span class="row-value">${booking.patient_phone}</span></div>
  <div class="row"><span class="row-label">Email</span><span class="row-value">${booking.patient_email}</span></div>
  <div class="row"><span class="row-label">Address</span><span class="row-value">${booking.patient_address}</span></div>

  <hr>
  <p class="section-label">Appointment</p>
  <div class="row"><span class="row-label">Date</span><span class="row-value">${apptDate}</span></div>
  <div class="row"><span class="row-label">Time Slot</span><span class="row-value">${booking.time_slot}</span></div>

  <hr>
  <p class="section-label">Services Booked</p>
  <table><tbody>${itemRows}</tbody></table>
  <div class="total-row"><span>Total Amount</span><span>&#8377;${Number(booking.total_amount).toFixed(2)}</span></div>

  <div class="footer-box">
    Our healthcare professional will visit you at your address at the scheduled time.
    Please ensure someone is available to receive the visit.<br>
    For queries, call: <strong style="color:#e63946">+91 80746 77177</strong>
  </div>

  <button class="print-btn no-print" onclick="window.print()">&#8595; Download / Print Receipt</button>
</div>
<script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (!win) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt_${booking.receipt_id}.html`;
    a.click();
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ConsultancyHome() {
  const [services,  setServices]  = useState([]);
  const [patient,   setPatient]   = useState(null);
  const [selected,  setSelected]  = useState([]);
  const [date,      setDate]      = useState("");
  const [slots,     setSlots]     = useState([]);
  const [timeSlot,  setTimeSlot]  = useState("");
  const [phone,     setPhone]     = useState("");
  const [address,   setAddress]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [msg,       setMsg]       = useState({ text: "", type: "" });
  const [errors,    setErrors]    = useState({});
  const [booking,   setBooking]   = useState(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => { loadInitialData(); }, []);
  useEffect(() => { if (date) loadSlots(date); }, [date]);

  async function loadInitialData() {
    try {
      const [serviceRes, meRes] = await Promise.all([
        consultancyHomeApi.getServices(),
        consultancyHomeApi.getMe(),
      ]);
      setServices(serviceRes.data.data || []);
      const p = meRes.data.data || null;
      setPatient(p);
      if (p) {
        setPhone(p.phone || "");
        setAddress(p.address || "");
      }
    } catch {
      setMsg({ text: "Unable to load details. Please refresh.", type: "error" });
    }
  }

  async function loadSlots(selectedDate) {
    try {
      setTimeSlot("");
      const res = await consultancyHomeApi.getSlots(selectedDate);
      setSlots(res.data.data || []);
    } catch {
      setMsg({ text: "Unable to load available slots.", type: "error" });
    }
  }

  function toggleService(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const selectedServices = useMemo(
    () => services.filter((s) => selected.includes(s.id)),
    [services, selected]
  );
  const total = selectedServices.reduce((sum, s) => sum + Number(s.price), 0);

  function validate() {
    const e = {};
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) e.phone = "Enter a valid 10-digit mobile number";
    if (!address.trim() || address.trim().length < 8)          e.address = "Enter a valid delivery address";
    if (selected.length === 0)                                  e.services = "Select at least one service";
    if (!date)                                                  e.date = "Select an appointment date";
    if (!timeSlot)                                              e.slot = "Select a time slot";
    return e;
  }

  async function submitBooking() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setMsg({ text: "Please fix the errors below before confirming.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMsg({ text: "", type: "" });
      const res = await consultancyHomeApi.createBooking({
        serviceIds:      selected,
        appointmentDate: date,
        timeSlot,
        phone:   phone.trim(),
        address: address.trim(),
      });
      const b = res.data.data;
      setBooking(b);
      openReceipt(b);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || "Booking failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (booking) {
    return (
      <div style={{ ...S.page, justifyContent: "center" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 500, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,.08)", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
          <h2 style={{ color: "#0A2540", fontWeight: 700, fontSize: "1.4rem", margin: "0 0 8px" }}>Booking Confirmed!</h2>
          <p style={{ color: "#64748b", fontSize: ".88rem", marginBottom: 20 }}>
            Receipt <strong>#{booking.receipt_id}</strong> has been generated. Your receipt was opened in a new tab.
          </p>
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px", textAlign: "left", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: ".88rem" }}>
              <span style={{ color: "#64748b" }}>Date</span>
              <span style={{ fontWeight: 600 }}>{new Date(booking.appointment_date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: ".88rem" }}>
              <span style={{ color: "#64748b" }}>Slot</span>
              <span style={{ fontWeight: 600 }}>{booking.time_slot}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: ".88rem" }}>
              <span style={{ color: "#64748b" }}>Address</span>
              <span style={{ fontWeight: 600, textAlign: "right", maxWidth: 250 }}>{booking.patient_address}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", fontSize: "1rem", fontWeight: 700, borderTop: "1px solid #f0f4f8", marginTop: 8 }}>
              <span>Total</span>
              <span>₹{Number(booking.total_amount).toFixed(2)}</span>
            </div>
          </div>
          <button
            style={{ ...S.confirmBtn, marginTop: 0 }}
            onClick={() => openReceipt(booking)}
          >
            ⬇ Re-open Receipt
          </button>
        </div>
      </div>
    );
  }

  // ── Booking form ────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>

      {/* SIDEBAR */}
      <div style={S.sidebar}>
        <div style={S.card}>
          <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 14px", textTransform: "uppercase" }}>👤 Logged In As</p>
          {patient ? (
            <>
              <p style={{ fontWeight: 700, fontSize: ".95rem", color: "#0A2540", margin: "0 0 4px" }}>{patient.name}</p>
              <p style={{ fontSize: ".8rem", color: "#64748b", margin: "0 0 2px" }}>{patient.email}</p>
              <p style={{ fontSize: ".75rem", color: "#94a3b8", margin: 0 }}>{patient.public_user_id}</p>
            </>
          ) : (
            <p style={{ color: "#94a3b8", fontSize: ".83rem" }}>Loading...</p>
          )}
        </div>

        <div style={{ ...S.card, borderLeft: "3px solid #22c1c3" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>🏡</div>
          <p style={{ fontSize: ".82rem", color: "#64748b", lineHeight: 1.65, margin: "0 0 8px", fontStyle: "italic" }}>
            "Quality healthcare, delivered right to your doorstep."
          </p>
          <p style={{ fontSize: ".75rem", fontWeight: 700, color: "#22c1c3", margin: 0 }}>— CallMeDex Care Team</p>
        </div>

        <div style={S.card}>
          <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: 1, color: "#94a3b8", margin: "0 0 8px", textTransform: "uppercase" }}>🚨 Emergency</p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e63946", margin: "0 0 2px" }}>+91 80746 77177</p>
          <p style={{ fontSize: ".75rem", color: "#94a3b8", margin: 0 }}>Available 24/7 · 365 days</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={S.main}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={S.h1}>Consultation at Home</h1>
          <p style={S.sub}>Select services, fill in your contact details, and pick a time slot.</p>
        </div>

        {msg.text && (
          <div style={msg.type === "error" ? S.msgError : S.msgSuccess}>
            {msg.type === "error" ? "⚠ " : "✓ "}{msg.text}
          </div>
        )}

        {/* SECTION 1 — Contact Details */}
        <div style={S.section}>
          <div style={S.secHead}>
            <div style={S.badge}>1</div>
            <div>
              <p style={S.secTitle}>Contact &amp; Delivery Details</p>
              <p style={S.secSub}>Confirm your phone and the address where you need the consultation</p>
            </div>
          </div>

          <div style={{ ...S.grid2, marginBottom: 12 }}>
            {/* Name — readonly */}
            <div>
              <label style={S.label}>Full Name</label>
              <input
                readOnly
                value={patient?.name || ""}
                style={S.inpReadonly}
              />
            </div>
            {/* Email — readonly */}
            <div>
              <label style={S.label}>Email</label>
              <input
                readOnly
                value={patient?.email || ""}
                style={S.inpReadonly}
              />
            </div>
          </div>

          {/* Phone — editable */}
          <div style={{ marginBottom: 12 }}>
            <label style={S.label}>Mobile Number <span style={{ color: "#e63946" }}>*</span></label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: "" })); }}
              style={{ ...S.inp, maxWidth: 280, ...(errors.phone ? S.inpErr : {}) }}
            />
            {errors.phone && <p style={S.errTxt}>⚠ {errors.phone}</p>}
          </div>

          {/* Address — editable */}
          <div>
            <label style={S.label}>Delivery Address <span style={{ color: "#e63946" }}>*</span></label>
            <textarea
              rows={3}
              placeholder="Enter the full address where the doctor should visit"
              value={address}
              onChange={(e) => { setAddress(e.target.value); setErrors((prev) => ({ ...prev, address: "" })); }}
              style={{ ...S.inp, resize: "vertical", minHeight: 72, ...(errors.address ? S.inpErr : {}) }}
            />
            {errors.address && <p style={S.errTxt}>⚠ {errors.address}</p>}
            <p style={{ fontSize: ".75rem", color: "#94a3b8", marginTop: 5 }}>
              💡 You can change this to book a consultation at a different address.
            </p>
          </div>
        </div>

        {/* SECTION 2 — Select Services */}
        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#7c3aed" }}>2</div>
            <div>
              <p style={S.secTitle}>Select Services</p>
              <p style={S.secSub}>Choose one or more home consultation services</p>
            </div>
            {errors.services && <p style={{ color: "#e63946", fontSize: ".75rem", marginLeft: "auto" }}>⚠ {errors.services}</p>}
          </div>
          <div style={S.serviceGrid}>
            {services.map((service) => {
              const isSel = selected.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => { toggleService(service.id); setErrors((prev) => ({ ...prev, services: "" })); }}
                  style={{ ...S.serviceCard, ...(isSel ? S.serviceCardSel : {}) }}
                >
                  <div style={{ fontSize: "1.6rem", marginBottom: 8 }}>{getIcon(service.service_group)}</div>
                  <p style={{ fontSize: ".7rem", fontWeight: 700, color: "#22c1c3", textTransform: "uppercase", letterSpacing: ".5px", margin: "0 0 4px" }}>{service.service_group}</p>
                  <p style={{ fontWeight: 700, fontSize: ".9rem", color: "#0A2540", margin: "0 0 4px" }}>{service.service_name}</p>
                  <p style={{ fontSize: ".78rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 10px" }}>{service.description}</p>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "#0A2540", margin: 0 }}>₹{Number(service.price).toFixed(2)}</p>
                  {isSel && (
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c1c3" }} />
                      <span style={{ fontSize: ".72rem", color: "#22c1c3", fontWeight: 700 }}>Selected</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3 — Date & Slot */}
        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#0ea5e9" }}>3</div>
            <div>
              <p style={S.secTitle}>Date &amp; Time Slot</p>
              <p style={S.secSub}>Pick your preferred appointment time</p>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>Appointment Date <span style={{ color: "#e63946" }}>*</span></label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => { setDate(e.target.value); setErrors((prev) => ({ ...prev, date: "" })); }}
              style={{ ...S.inp, maxWidth: 220, ...(errors.date ? S.inpErr : {}) }}
            />
            {errors.date && <p style={S.errTxt}>⚠ {errors.date}</p>}
          </div>

          {date && (
            <div>
              <label style={S.label}>Time Slot <span style={{ color: "#e63946" }}>*</span></label>
              {slots.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>No slots available for this date.</p>
              ) : (
                <div style={S.slotGrid}>
                  {slots.map((s) => {
                    const active = timeSlot === s.slot;
                    return (
                      <div
                        key={s.slot}
                        onClick={() => { if (!s.isBooked) { setTimeSlot(s.slot); setErrors((prev) => ({ ...prev, slot: "" })); } }}
                        style={{ ...S.slotCard, ...(active ? S.slotActive : {}), ...(s.isBooked ? S.slotBooked : {}) }}
                      >
                        {s.slot}
                        {s.isBooked && <div style={{ fontSize: ".65rem", color: "#94a3b8", marginTop: 2 }}>Booked</div>}
                      </div>
                    );
                  })}
                </div>
              )}
              {errors.slot && <p style={{ ...S.errTxt, marginTop: 8 }}>⚠ {errors.slot}</p>}
            </div>
          )}
        </div>

        {/* SECTION 4 — Summary & Confirm */}
        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#21c087" }}>4</div>
            <div>
              <p style={S.secTitle}>Price Summary</p>
              <p style={S.secSub}>Review your selection before confirming</p>
            </div>
          </div>

          {selectedServices.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>No services selected yet.</p>
          ) : (
            <>
              {selectedServices.map((s) => (
                <div key={s.id} style={S.summaryRow}>
                  <span style={{ color: "#334155" }}>{s.service_name}</span>
                  <span style={{ fontWeight: 600, color: "#0A2540" }}>₹{Number(s.price).toFixed(2)}</span>
                </div>
              ))}
              <div style={S.summaryTotal}>
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </>
          )}

          <button
            style={loading ? S.confirmBtnDisabled : S.confirmBtn}
            disabled={loading}
            onClick={submitBooking}
          >
            {loading ? "⏳ Booking..." : "✓ Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\consultation\teleConsultationData.js
===============================

export const SPECIALIZATIONS = [
  "General Physician",
  "Gynecology",
  "Orthopedics",
  "Dermatology",
  "Pediatrics",
  "Cardiology",
  "Neurology",
  "ENT",
  "Psychiatry",
];

export const TIME_SLOTS = [
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 1 PM",
  "2 PM - 3 PM",
  "3 PM - 4 PM",
];

export const CONSULTATION_FEE = 499;

===============================
FILE: client\src\components\consultation\TeleConsultationPage.jsx
===============================

import React, { useState } from "react";
import {
  cardStyle,
  inputStyle,
  pageStyle,
  buttonStyle,
} from "./teleConsultationStyles";

import {
  SPECIALIZATIONS,
  TIME_SLOTS,
  CONSULTATION_FEE,
} from "./teleConsultationData";

const sectionHeader = (
  number,
  title,
  subtitle,
  color
) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
      }}
    >
      {number}
    </div>

    <div>
      <div
        style={{
          fontWeight: "700",
          fontSize: "28px",
          color: "#0f2744",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#94a3b8",
        }}
      >
        {subtitle}
      </div>
    </div>
  </div>
);

const TeleConsultationPage = () => {
  const [confirmed, setConfirmed] = useState(false);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [specialization, setSpecialization] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  
  const consultationFee = CONSULTATION_FEE;
const today = new Date().toISOString().split("T")[0];
  const handleSubmit = () => {
    if (
      !patient.name ||
      !patient.age ||
      !patient.gender ||
      !patient.mobile ||
      !patient.email ||
      !patient.address ||
      !specialization ||
      !date ||
      !slot 
    ) {
      alert("Please fill all fields");
      return;
    }

    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#16a34a" }}>
  ✅ Tele Consultation Booked Successfully
</h1>

        <hr />

        <p>
          <strong>Patient:</strong> {patient.name}
        </p>

        <p>
          <strong>Specialization:</strong> {specialization}
        </p>

        <p>
          <strong>Date:</strong> {date}
        </p>

        <p>
          <strong>Time:</strong> {slot}
        </p>

        <p>
  <strong>Consultation Fee:</strong> ₹{consultationFee}
</p>

<p>
  <strong>Status:</strong> Confirmed
</p>

        <button
          onClick={() => window.print()}
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Download Appointment Slip
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: 30 }}>
        <h1
  style={{
    fontSize: "42px",
    fontWeight: "800",
    color: "#0f2744",
    marginBottom: "8px",
  }}
>
  💻 Tele Consultation Appointment
</h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          Complete all sections to confirm your tele consultation appointment
        </p>
      </div>

      {/* Patient Information */}
      <div style={cardStyle}>
        {sectionHeader(
          1,
          "Patient Information",
          "Personal & contact details",
          "#14b8a6"
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Full Name"
            value={patient.name}
            onChange={(e) =>
              setPatient({
                ...patient,
                name: e.target.value,
              })
            }
          />

          <input
  type="number"
  min="1"
  max="120"
  style={inputStyle}
  placeholder="Age"
  value={patient.age}
  onChange={(e) =>
    setPatient({
      ...patient,
      age: e.target.value,
    })
  }
/>

          <select
            style={inputStyle}
            value={patient.gender}
            onChange={(e) =>
              setPatient({
                ...patient,
                gender: e.target.value,
              })
            }
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
  type="tel"
  style={inputStyle}
  placeholder="Mobile Number"
  value={patient.mobile}
  onChange={(e) =>
    setPatient({
      ...patient,
      mobile: e.target.value,
    })
  }
/>

          <input
            style={inputStyle}
            placeholder="Email"
            value={patient.email}
            onChange={(e) =>
              setPatient({
                ...patient,
                email: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            style={inputStyle}
            placeholder="Address"
            value={patient.address}
            onChange={(e) =>
              setPatient({
                ...patient,
                address: e.target.value,
              })
            }
          />
        </div>
      </div>

{/* Specialization Selection */}
<div style={cardStyle}>
  {sectionHeader(
    2,
    "Select Doctor Specialization",
    "Choose required specialist",
    "#7c3aed"
  )}

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "15px",
    }}
  >
    {SPECIALIZATIONS.map((spec) => (
      <div
        key={spec}
        onClick={() => setSpecialization(spec)}
        style={{
          padding: "25px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "18px",
          border:
            specialization === spec
              ? "2px solid #2563eb"
              : "1px solid #dbe4ee",
          background:
            specialization === spec
              ? "#eff6ff"
              : "#fff",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            marginBottom: "10px",
          }}
        >
          👨‍⚕️
        </div>

        <div
          style={{
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {spec}
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Date & Time */}
      <div style={cardStyle}>
        {sectionHeader(
          3,
          "Date & Time Slot",
          "Pick your preferred appointment",
          "#0ea5e9"
        )}

        <input
  type="date"
  min={today}
  value={date}
  onChange={(e) => setDate(e.target.value)}
  style={inputStyle}
/>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {TIME_SLOTS.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              style={{
                padding: "16px",
                borderRadius: "14px",
                cursor: "pointer",
                border:
                  slot === s
                    ? "2px solid #2563eb"
                    : "1px solid #dbe4ee",
                background:
                  slot === s
                    ? "#ecfeff"
                    : "#fff",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

     

      {/* Summary */}
      <div style={cardStyle}>
        {sectionHeader(
          4,
          "Appointment Summary",
          "Review your appointment",
          "#10b981"
        )}

        <p>
          <strong>Patient:</strong>{" "}
          {patient.name || "-"}
        </p>

        <p>
       <strong>Specialization:</strong>{" "}
      {specialization || "-"}
      </p>

        <p>
          <strong>Date:</strong>{" "}
          {date || "-"}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {slot || "-"}
        </p>

        <p>
          <strong>Consultation Fee:</strong> ₹
          {consultationFee}
        </p>
      </div>

      <button
  onClick={handleSubmit}
  style={buttonStyle}
>
  Book Tele Consultation
</button>
    </div>
  );
};

export default TeleConsultationPage;

===============================
FILE: client\src\components\consultation\teleConsultationStyles.js
===============================

export const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "20px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

export const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #dbe4ee",
  fontSize: "15px",
  boxSizing: "border-box",
};

export const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

export const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
};

===============================
FILE: client\src\components\consultation\TeleConsultationSuccess.jsx
===============================


===============================
FILE: client\src\components\diagnostics\BodyDiagnostics.jsx
===============================

import React, { useState } from "react";
import "../../styles/App.css";
import AppointmentBooking from "../../components/appointments/AppointmentBooking";

export default function BodyDiagnostics() {

  const [showCTBooking, setShowCTBooking] = useState(false);
  const [showFullBodyBooking, setShowFullBodyBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const ctScans = [

  {
    id:"ct1",
    name:"3D CT ANY REGION",
    subtitle:"Advanced CT Scan",
    price:5000,
    oldPrice:6500,
    icon:"🩻"
  },

  {
    id:"ct2",
    name:"3D CT SKULL",
    subtitle:"Skull CT Imaging",
    price:5000,
    oldPrice:6500,
    icon:"💀"
  },

  {
    id:"ct3",
    name:"CT ABDOMEN PLAIN",
    subtitle:"Abdomen CT Scan",
    price:4000,
    oldPrice:5500,
    icon:"🫃"
  },

  {
    id:"ct4",
    name:"CT ABDOMEN PLAIN WITH CONTRAST",
    subtitle:"Contrast CT Abdomen",
    price:6000,
    oldPrice:7500,
    icon:"🧬"
  },

  {
    id:"ct5",
    name:"CT AORTOGRAM",
    subtitle:"Aorta Imaging",
    price:8000,
    oldPrice:9500,
    icon:"❤️"
  },

  {
    id:"ct6",
    name:"CT BIOPSY",
    subtitle:"Guided CT Biopsy",
    price:8500,
    oldPrice:10000,
    icon:"🧫"
  },

  {
    id:"ct7",
    name:"CT BRAIN PLAIN",
    subtitle:"Brain CT Scan",
    price:2500,
    oldPrice:4000,
    icon:"🧠"
  },

  {
    id:"ct8",
    name:"CT CHEST PLAIN",
    subtitle:"Chest Imaging",
    price:4000,
    oldPrice:5500,
    icon:"🫁"
  },

  {
    id:"ct9",
    name:"CT CHEST PLAIN WITH CONTRAST",
    subtitle:"Contrast Chest CT",
    price:5500,
    oldPrice:7000,
    icon:"🫁"
  },

  {
    id:"ct10",
    name:"CT ENTROCLYSIS",
    subtitle:"Small Bowel Imaging",
    price:6500,
    oldPrice:8000,
    icon:"🧬"
  },

  {
    id:"ct11",
    name:"CT Facial Bones",
    subtitle:"Facial Bone Scan",
    price:5000,
    oldPrice:6500,
    icon:"😀"
  },

  {
    id:"ct12",
    name:"CT FNAC",
    subtitle:"Guided FNAC",
    price:7000,
    oldPrice:8500,
    icon:"💉"
  },

  {
    id:"ct13",
    name:"CT GUIDED PIGTAIL CATHETER",
    subtitle:"Guided Catheter Placement",
    price:7000,
    oldPrice:8500,
    icon:"🩺"
  },

  {
    id:"ct14",
    name:"CT KUB",
    subtitle:"Kidney & Bladder Scan",
    price:4000,
    oldPrice:5200,
    icon:"🧬"
  },

  {
    id:"ct15",
    name:"CT MASTOIDS",
    subtitle:"Mastoid Bone Imaging",
    price:3500,
    oldPrice:5000,
    icon:"👂"
  },

  {
    id:"ct16",
    name:"CT NECK",
    subtitle:"Neck CT Scan",
    price:4500,
    oldPrice:6000,
    icon:"🦴"
  },

  {
    id:"ct17",
    name:"CT NECK PLAIN WITH CONTRAST",
    subtitle:"Contrast Neck Scan",
    price:5500,
    oldPrice:7000,
    icon:"🦴"
  },

  {
    id:"ct18",
    name:"CT NECK VESSEL ANGIO",
    subtitle:"Neck Angiography",
    price:6500,
    oldPrice:8000,
    icon:"🫀"
  },

  {
    id:"ct19",
    name:"CT ORBITS",
    subtitle:"Eye Orbit Imaging",
    price:2700,
    oldPrice:4200,
    icon:"👁️"
  },

  {
    id:"ct20",
    name:"CT PCNL",
    subtitle:"Kidney Stone Procedure CT",
    price:8500,
    oldPrice:10000,
    icon:"🪨"
  },

  {
    id:"ct21",
    name:"CT PELVIS WITH HIP JOINTS",
    subtitle:"Pelvis CT Scan",
    price:4000,
    oldPrice:5500,
    icon:"🦴"
  },

  {
    id:"ct22",
    name:"CT PNS (Single film)",
    subtitle:"Sinus Scan",
    price:3000,
    oldPrice:4500,
    icon:"🤧"
  },

  {
    id:"ct23",
    name:"CT PNS (Two films)",
    subtitle:"Sinus CT Imaging",
    price:3500,
    oldPrice:5000,
    icon:"🤧"
  },

  {
    id:"ct24",
    name:"CT PNS (Three films)",
    subtitle:"Advanced Sinus Scan",
    price:3500,
    oldPrice:5000,
    icon:"🤧"
  },

  {
    id:"ct25",
    name:"CT TEMPORAL BONES",
    subtitle:"Temporal Bone Scan",
    price:4000,
    oldPrice:5500,
    icon:"🦴"
  },

  {
    id:"ct26",
    name:"CT PULMONARY ANGIO",
    subtitle:"Pulmonary Angiography",
    price:6500,
    oldPrice:8000,
    icon:"🫁"
  },

  {
    id:"ct27",
    name:"CT RENAL ANGIOGRAM",
    subtitle:"Kidney Vessel Imaging",
    price:8000,
    oldPrice:9500,
    icon:"🧬"
  },

  {
    id:"ct28",
    name:"CT SPINE ANY REGION",
    subtitle:"Spine CT Imaging",
    price:4500,
    oldPrice:6200,
    icon:"🦴"
  },

  {
    id:"ct29",
    name:"CT UPPER / LOWER LIMB ANGIOGRAM",
    subtitle:"Limb Angiography",
    price:8000,
    oldPrice:9500,
    icon:"🦵"
  },

  {
    id:"ct30",
    name:"CT UROGRAM",
    subtitle:"Urinary Tract Imaging",
    price:4500,
    oldPrice:6200,
    icon:"🚻"
  },

  {
    id:"ct31",
    name:"CT ENTEROGRAPHY",
    subtitle:"Intestinal Imaging",
    price:8000,
    oldPrice:9500,
    icon:"🧬"
  }

];
const fullBodyScans = [

  {
    id:"fb1",
    name:"Ultrasound Scans",
    subtitle:"Advanced Ultrasound Imaging",
    price:2500,
    oldPrice:4000,
    icon:"🩻"
  },

  {
    id:"fb2",
    name:"Dopplers",
    subtitle:"Blood Flow Doppler Study",
    price:3500,
    oldPrice:5000,
    icon:"🫀"
  },

  {
    id:"fb3",
    name:"TIFFA",
    subtitle:"Pregnancy Anomaly Scan",
    price:4500,
    oldPrice:6000,
    icon:"🤰"
  },

  {
    id:"fb4",
    name:"X-Ray",
    subtitle:"Digital X-Ray Imaging",
    price:1200,
    oldPrice:2500,
    icon:"🦴"
  },

  {
    id:"fb5",
    name:"Mammogram",
    subtitle:"Breast Screening Scan",
    price:5000,
    oldPrice:7000,
    icon:"🎗️"
  },

  {
    id:"fb6",
    name:"BMD",
    subtitle:"Bone Mineral Density Test",
    price:3000,
    oldPrice:4500,
    icon:"🦴"
  },

  {
    id:"fb7",
    name:"MRI Scans",
    subtitle:"Magnetic Resonance Imaging",
    price:8000,
    oldPrice:11000,
    icon:"🧲"
  }

];

  return (

    <div className="cardiology-page">

      <section className="cardio-hero">

        <div className="cardio-left">

          <div className="cardio-tag">
            🩻 ADVANCED BODY DIAGNOSTICS
          </div>

          <h1>
            Expert Healthcare &
            <span> Body Diagnostics</span>
          </h1>

          <p>
            Advanced MRI, CT Scan, X-Ray, and Full Body Diagnostic
            services with AI-assisted imaging and preventive
            health screenings.
          </p>

          <div className="cardio-btns">

            <button
  className={
    activeTab === "ct"
      ? "cardio-primary"
      : "cardio-secondary"
  }
  onClick={() => {
    setShowCTBooking(true);
    setShowFullBodyBooking(false);
    setActiveTab("ct");
  }}
>
  CT Scan
</button>

            <button
  className={
    activeTab === "fullbody"
      ? "cardio-primary"
      : "cardio-secondary"
  }
  onClick={() => {
    setShowFullBodyBooking(true);
    setShowCTBooking(false);
    setActiveTab("fullbody");
  }}
>
  Full Body Scan
</button>

            <button
  className="cardio-secondary"
  onClick={() => {
    window.scrollTo({
      top: 900,
      behavior: "smooth"
    });
  }}
>
  Explore Services
</button>

          </div>

        </div>

        <div className="cardio-right">

          <div className="heart-card">

            <div className="heart-top">

              <div className="heart-icon">
                🩻
              </div>

              <div>
                <h3>Body Diagnostics</h3>
                <p>AI Scan Analysis Active</p>
              </div>

            </div>

            <div className="heart-line">

              <svg viewBox="0 0 600 120">

                <polyline
                  fill="none"
                  stroke="#e63946"
                  strokeWidth="4"
                  points="
                  0,60
                  50,60
                  80,20
                  110,100
                  140,20
                  170,60
                  220,60
                  250,20
                  280,100
                  310,20
                  340,60
                  390,60
                  420,20
                  450,100
                  480,20
                  510,60
                  560,60
                  590,20
                  600,60"
                />

              </svg>

            </div>

            <div className="heart-stats">

              <div className="heart-stat">
                <h2>120+</h2>
                <p>Daily Scans</p>
              </div>

              <div className="heart-stat">
                <h2>99%</h2>
                <p>Accuracy Rate</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {
        showCTBooking && (

          <AppointmentBooking
            title="CT Scan Booking"
            scans={ctScans}
          />

        )
      }
      {
      showFullBodyBooking && (

        <AppointmentBooking
       title="Full Body Scan Booking"
       scans={fullBodyScans}
     />

  )
}

    </div>

  );

}

===============================
FILE: client\src\components\diagnostics\DiagnosticWalkInCenters.jsx
===============================

import React, { useEffect, useMemo, useState } from "react";
import { fetchHomeServiceTests } from "../homeServices/homeService.api";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";
import { downloadWalkInReceipt } from "./walkInReceipt";

const BRANCHES = ["Akkayapalem", "Madhurwada", "KGH Branch"];

const SLOTS = [
  { label: "9 AM - 10 AM", endHour: 10 },
  { label: "10 AM - 11 AM", endHour: 11 },
  { label: "11 AM - 12 PM", endHour: 12 },
  { label: "12 PM - 1 PM", endHour: 13 },
  { label: "2 PM - 3 PM", endHour: 15 },
  { label: "3 PM - 4 PM", endHour: 16 },
];

const S = {
  page: {
    display: "flex",
    gap: 20,
    padding: "100px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI',sans-serif",
  },
  sidebar: { width: 260, flexShrink: 0 },
  card: {
    background: "white",
    borderRadius: 20,
    padding: "20px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 16,
  },
  main: { flex: 1, minWidth: 0 },
  header: { marginBottom: 18 },
  h1: { fontSize: "1.7rem", color: "#0A2540", margin: 0, fontWeight: 700 },
  sub: { color: "#64748b", fontSize: ".88rem", marginTop: 4 },
  section: {
    background: "white",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  secHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#22c1c3",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: ".9rem",
    flexShrink: 0,
  },
  secTitle: { color: "#0A2540", fontSize: "1rem", fontWeight: 700, margin: 0 },
  secSub: { color: "#94a3b8", fontSize: ".8rem", margin: "2px 0 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 },
  inp: {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: ".88rem",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box",
  },
  inpErr: { borderColor: "#e63946" },
  errTxt: { color: "#e63946", fontSize: ".75rem", marginTop: 3 },
  label: {
    display: "block",
    fontSize: ".75rem",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  scanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))",
    gap: 12,
  },
  scanCard: {
    border: "2px solid #edf2f7",
    borderRadius: 16,
    padding: "14px 16px",
    cursor: "pointer",
    transition: ".25s",
    background: "#f8fafc",
  },
  scanSel: { borderColor: "#22c1c3", background: "#ecfcfc" },
  scanDis: {
    opacity: 0.45,
    cursor: "not-allowed",
    background: "#f1f5f9",
  },
  scanIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginBottom: 8,
  },
  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
    gap: 8,
  },
  slotCard: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "9px 12px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: ".83rem",
    fontWeight: 600,
    color: "#334155",
    transition: ".2s",
    background: "#f8fafc",
  },
  slotActive: {
    borderColor: "#22c1c3",
    background: "#ecfcfc",
    color: "#0A2540",
  },
  slotPast: {
    opacity: 0.4,
    cursor: "not-allowed",
    background: "#f1f5f9",
    textDecoration: "line-through",
    color: "#94a3b8",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0f4f8",
    fontSize: ".88rem",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0 0",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#0A2540",
  },
  confirmBtn: {
    width: "100%",
    padding: "13px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 4,
  },
};

function getTodayLocal() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isSlotPast(slotObj, selectedDate) {
  const today = getTodayLocal();
  const now = new Date();

  if (selectedDate !== today) return false;

  return now.getHours() >= slotObj.endHour;
}

function normalizeTest(test, category) {
  return {
    id: test.id,
    code: test.code || "",
    name: test.name || "Unnamed Test",
    subtitle: test.subtitle || "",
    price: Number(test.price || 0),
    oldPrice: Number(test.old_price || 0),
    icon: test.icon || "🧪",
    category: category.category_name,
    features: Array.isArray(test.features) ? test.features : [],
    instructions: Array.isArray(test.instructions) ? test.instructions : [],
  };
}

function validate(patient, branch, selectedTests, date, slot) {
  const e = {};

  if (!patient.name.trim()) e.name = "Full name is required";

  const age = Number(patient.age);
  if (!patient.age || age < 1 || age > 120) {
    e.age = "Enter a valid age";
  }

  if (!patient.sex) e.sex = "Please select gender";

  if (!/^[6-9]\d{9}$/.test(patient.mobile)) {
    e.mobile = "Enter valid 10-digit mobile number";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) {
    e.email = "Enter a valid email address";
  }

  if (!branch) e.branch = "Select a branch";
  if (!patient.address.trim()) e.address = "Address is required";
  if (selectedTests.length === 0) e.tests = "Select at least one test";
  if (!date) e.date = "Select walk-in date";
  if (!slot) e.slot = "Select time slot";

  return e;
}

export default function DiagnosticWalkInCenters() {
  const toast = useToast();
  const today = getTodayLocal();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [branch, setBranch] = useState("");
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function loadTests() {
      try {
        setLoading(true);

        const result = await fetchHomeServiceTests();

        if (!result.success) {
          throw new Error(result.message || "Unable to load tests");
        }

        setCategories(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Unable to load walk-in center tests"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTests();
  }, []);

  const allTests = useMemo(() => {
    return categories.flatMap((category) =>
      category.tests.map((test) => normalizeTest(test, category))
    );
  }, [categories]);

  const filteredTests = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allTests.filter((test) => {
      const categoryMatch =
        selectedCategory === "all" || test.category === selectedCategory;

      const searchMatch =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.subtitle.toLowerCase().includes(q) ||
        test.code.toLowerCase().includes(q) ||
        test.features.some((feature) =>
          String(feature).toLowerCase().includes(q)
        );

      return categoryMatch && searchMatch;
    });
  }, [allTests, selectedCategory, search]);

  const total = selectedTests.reduce(
    (sum, test) => sum + Number(test.price),
    0
  );

  const toggleTest = (test) => {
    const exists = selectedTests.find((item) => item.id === test.id);

    if (exists) {
      setSelectedTests(selectedTests.filter((item) => item.id !== test.id));
      return;
    }

    if (selectedTests.length >= 2) {
      toast.warning("You can select a maximum of 2 tests.");
      return;
    }

    setSelectedTests([...selectedTests, test]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
      toast.error("Please log in as a patient before booking.");
      return;
    }

    if (user.role !== "patient") {
      toast.error("Only patient accounts can book walk-in center tests.");
      return;
    }

    const e = validate(patient, branch, selectedTests, date, slot);
    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.warning("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        patientName: patient.name.trim(),
        patientAge: Number(patient.age),
        patientSex: patient.sex,
        patientMobile: patient.mobile.trim(),
        patientEmail: patient.email.trim().toLowerCase(),
        patientAddress: patient.address.trim(),
        branch,
        tests: selectedTests.map((test) => ({ id: test.id })),
        walkinDate: date,
        timeSlot: slot,
        totalAmount: Number(total),
      };

      const response = await api.post("/walk-in-centers/book", payload);

      if (response.data.success) {
        setBooking(response.data.data);
        toast.success("Walk-in center test booked successfully.");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to book walk-in center test. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.main}>
          <div style={S.section}>
            <h1 style={S.h1}>Walk-in Center Tests</h1>
            <p style={S.sub}>Loading tests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.sidebar}>
        <div style={S.card}>
          <p
            style={{
              fontSize: ".7rem",
              fontWeight: 700,
              letterSpacing: 1,
              color: "#94a3b8",
              margin: "0 0 16px",
              textTransform: "uppercase",
            }}
          >
            Walk-in Center
          </p>

          <p
            style={{
              fontSize: ".85rem",
              color: "#64748b",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Visit your selected branch directly for blood sample tests like CBC,
            Thyroid, Sugar, Lipid Profile and more.
          </p>
        </div>

        <div style={S.card}>
          <p
            style={{
              fontSize: ".7rem",
              fontWeight: 700,
              letterSpacing: 1,
              color: "#94a3b8",
              margin: "0 0 12px",
              textTransform: "uppercase",
            }}
          >
            📍 Branches
          </p>

          {BRANCHES.map((b, i) => (
            <div
              key={b}
              style={{
                paddingBottom: 10,
                marginBottom: 10,
                borderBottom:
                  i < BRANCHES.length - 1 ? "1px solid #f0f4f8" : "none",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: ".83rem",
                  color: "#0A2540",
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={S.main}>
        <div style={S.header}>
          <h1 style={S.h1}>Book Walk-in Center Test</h1>
          <p style={S.sub}>
            Fill patient details, select tests, choose branch and visit the
            center during your selected slot.
          </p>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={S.badge}>1</div>
            <div>
              <p style={S.secTitle}>Patient Information</p>
              <p style={S.secSub}>Personal and contact details</p>
            </div>
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div style={{ gridColumn: "span 2" }}>
              <input
                style={{ ...S.inp, ...(errors.name ? S.inpErr : {}) }}
                placeholder="Full Name"
                value={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
              />
              {errors.name && <p style={S.errTxt}>⚠ {errors.name}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.age ? S.inpErr : {}) }}
                type="number"
                placeholder="Age"
                value={patient.age}
                onChange={(e) =>
                  setPatient({ ...patient, age: e.target.value })
                }
              />
              {errors.age && <p style={S.errTxt}>⚠ {errors.age}</p>}
            </div>
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div>
              <select
                style={{ ...S.inp, ...(errors.sex ? S.inpErr : {}) }}
                value={patient.sex}
                onChange={(e) =>
                  setPatient({ ...patient, sex: e.target.value })
                }
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.sex && <p style={S.errTxt}>⚠ {errors.sex}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.mobile ? S.inpErr : {}) }}
                placeholder="Mobile"
                value={patient.mobile}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
              />
              {errors.mobile && <p style={S.errTxt}>⚠ {errors.mobile}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.email ? S.inpErr : {}) }}
                placeholder="Email"
                value={patient.email}
                onChange={(e) =>
                  setPatient({ ...patient, email: e.target.value })
                }
              />
              {errors.email && <p style={S.errTxt}>⚠ {errors.email}</p>}
            </div>
          </div>

          <div style={{ ...S.grid2, marginBottom: 10 }}>
            <div>
              <select
                style={{ ...S.inp, ...(errors.branch ? S.inpErr : {}) }}
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Select Branch</option>
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              {errors.branch && <p style={S.errTxt}>⚠ {errors.branch}</p>}
            </div>
          </div>

          <textarea
            style={{
              ...S.inp,
              ...(errors.address ? S.inpErr : {}),
              minHeight: 72,
              resize: "none",
            }}
            placeholder="Address"
            value={patient.address}
            onChange={(e) =>
              setPatient({ ...patient, address: e.target.value })
            }
          />

          {errors.address && <p style={S.errTxt}>⚠ {errors.address}</p>}
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#7c3aed" }}>2</div>
            <div>
              <p style={S.secTitle}>Select Tests</p>
              <p style={S.secSub}>Choose up to 2 walk-in center tests</p>
            </div>

            {errors.tests && (
              <p style={{ ...S.errTxt, marginLeft: "auto" }}>
                ⚠ {errors.tests}
              </p>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <input
              type="text"
              placeholder="Search tests"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={S.inp}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={S.inp}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_name}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          <div style={S.scanGrid}>
            {filteredTests.map((test) => {
              const isSel = selectedTests.some((item) => item.id === test.id);
              const disabled = !isSel && selectedTests.length >= 2;

              return (
                <div
                  key={test.id}
                  style={{
                    ...S.scanCard,
                    ...(isSel ? S.scanSel : {}),
                    ...(disabled ? S.scanDis : {}),
                  }}
                  onClick={() => !disabled && toggleTest(test)}
                >
                  <div style={S.scanIcon}>{test.icon}</div>

                  <p
                    style={{
                      margin: "0 0 2px",
                      fontWeight: 700,
                      fontSize: ".9rem",
                      color: "#0A2540",
                    }}
                  >
                    {test.name}
                  </p>

                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: ".75rem",
                      color: "#94a3b8",
                      lineHeight: 1.4,
                    }}
                  >
                    {test.subtitle}
                  </p>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: ".95rem",
                        color: "#0A2540",
                      }}
                    >
                      ₹{test.price}
                    </span>

                    {test.oldPrice > 0 && (
                      <span
                        style={{
                          fontSize: ".78rem",
                          color: "#b0bec5",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{test.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#0ea5e9" }}>3</div>
            <div>
              <p style={S.secTitle}>Date and Time Slot</p>
              <p style={S.secSub}>Choose when you will visit the center</p>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Walk-in Date</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSlot("");
              }}
              style={{
                ...S.inp,
                maxWidth: 220,
                ...(errors.date ? S.inpErr : {}),
              }}
            />
            {errors.date && <p style={S.errTxt}>⚠ {errors.date}</p>}
          </div>

          <div>
            <label style={S.label}>Time Slot</label>

            <div style={S.slotGrid}>
              {SLOTS.map((s) => {
                const past = isSlotPast(s, date);
                const active = slot === s.label;

                return (
                  <div
                    key={s.label}
                    style={{
                      ...S.slotCard,
                      ...(active ? S.slotActive : {}),
                      ...(past ? S.slotPast : {}),
                    }}
                    onClick={() => {
                      if (!past) setSlot(s.label);
                    }}
                  >
                    {s.label}

                    {past && (
                      <div
                        style={{
                          fontSize: ".65rem",
                          color: "#94a3b8",
                          marginTop: 2,
                        }}
                      >
                        Unavailable
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {errors.slot && <p style={S.errTxt}>⚠ {errors.slot}</p>}
          </div>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#10b981" }}>₹</div>
            <div>
              <p style={S.secTitle}>Price Summary</p>
              <p style={S.secSub}>Updates as you select tests</p>
            </div>
          </div>

          {selectedTests.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>
              Select tests to see pricing
            </p>
          ) : (
            <>
              {selectedTests.map((test) => (
                <div key={test.id} style={S.summaryRow}>
                  <span>{test.name}</span>
                  <strong>₹{test.price}</strong>
                </div>
              ))}

              <div style={S.summaryTotal}>
                <span>Total Amount</span>
                <span style={{ color: "#e63946" }}>₹{total}</span>
              </div>
            </>
          )}
        </div>

        <button style={S.confirmBtn} onClick={handleSubmit}>
          Confirm Walk-in Booking →
        </button>

        {booking && (
          <div
            style={{
              ...S.section,
              marginTop: 22,
              border: "2px solid #22c1c3",
              background: "#ecfcfc",
            }}
          >
            <div style={S.secHead}>
              <div style={S.badge}>✓</div>

              <div>
                <p style={S.secTitle}>Booking Confirmed</p>
                <p style={S.secSub}>
                  Receipt ID: <strong>{booking.receiptId}</strong>
                </p>
              </div>
            </div>

            <p style={{ color: "#334155", lineHeight: 1.7 }}>
              Please visit <strong>{branch}</strong> on <strong>{date}</strong>{" "}
              during <strong>{slot}</strong>. Carry your receipt ID for faster
              processing.
            </p>

            <button
              style={{
                ...S.confirmBtn,
                background: "#10b981",
                width: "auto",
                padding: "11px 26px",
                marginTop: 12,
              }}
              onClick={() =>
                downloadWalkInReceipt({
                  booking,
                  patient,
                  branch,
                  selectedTests,
                  date,
                  slot,
                  total,
                })
              }
            >
              ⬇ Download Receipt / Save as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\diagnostics\walkInReceipt.jsx
===============================

export function downloadWalkInReceipt({
  booking,
  patient,
  branch,
  selectedTests,
  date,
  slot,
  total,
}) {
  const issuedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const visitDate = new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const testRows = selectedTests
    .map(
      (test) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8">${test.name}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #f0f4f8;text-align:right;font-weight:700">
          &#8377;${Number(test.price || 0).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Walk-in Receipt - ${booking.receiptId}</title>
<style>
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    @page { margin: 18mm; size: A4; }
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 32px;
    font-family: 'Segoe UI', sans-serif;
    background: #f4f8fb;
    color: #0A2540;
  }

  .card {
    max-width: 620px;
    margin: 0 auto;
    background: white;
    border-radius: 22px;
    padding: 36px;
    box-shadow: 0 4px 24px rgba(0,0,0,.08);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .logo {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #e63946;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 900;
  }

  .brand h2 {
    margin: 0;
    font-size: 1.15rem;
  }

  .brand p {
    margin: 2px 0 0;
    color: #64748b;
    font-size: .8rem;
  }

  .tag {
    display: inline-block;
    background: #ecfdf5;
    color: #059669;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: .78rem;
    font-weight: 900;
    margin-bottom: 16px;
  }

  h1 {
    margin: 0 0 4px;
    font-size: 1.45rem;
  }

  .sub {
    margin: 0 0 20px;
    color: #64748b;
    font-size: .86rem;
  }

  hr {
    border: 0;
    border-top: 1.5px solid #f0f4f8;
    margin: 18px 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    padding: 7px 0;
    font-size: .9rem;
  }

  .row span:first-child {
    color: #64748b;
  }

  .row strong {
    text-align: right;
    color: #0A2540;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: .9rem;
  }

  th {
    text-align: left;
    background: #f8fafc;
    color: #64748b;
    padding: 9px 10px;
    font-size: .75rem;
    text-transform: uppercase;
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    font-size: 1.05rem;
    font-weight: 900;
  }

  .note {
    background: #f8fafc;
    color: #64748b;
    border-radius: 14px;
    padding: 14px 16px;
    line-height: 1.6;
    font-size: .82rem;
    margin-top: 22px;
  }

  .print-btn {
    width: 100%;
    margin-top: 22px;
    padding: 13px;
    border: 0;
    border-radius: 14px;
    background: #10b981;
    color: white;
    font-size: 1rem;
    font-weight: 900;
    cursor: pointer;
  }
</style>
</head>

<body>
  <div class="card">
    <div class="brand">
      <div class="logo">C</div>
      <div>
        <h2>CallMeDex</h2>
        <p>Diagnostic Walk-in Center</p>
      </div>
    </div>

    <div class="tag">&#10003; WALK-IN BOOKING CONFIRMED</div>

    <h1>Booking Receipt</h1>
    <p class="sub">Receipt #${booking.receiptId} &nbsp;&middot;&nbsp; Issued: ${issuedDate}</p>

    <hr />

    <div class="row"><span>Patient Name</span><strong>${patient.name}</strong></div>
    <div class="row"><span>Age / Gender</span><strong>${patient.age} yrs / ${patient.sex}</strong></div>
    <div class="row"><span>Mobile</span><strong>${patient.mobile}</strong></div>
    <div class="row"><span>Email</span><strong>${patient.email}</strong></div>
    <div class="row"><span>Address</span><strong>${patient.address}</strong></div>

    <hr />

    <div class="row"><span>Branch</span><strong>${branch}</strong></div>
    <div class="row"><span>Walk-in Date</span><strong>${visitDate}</strong></div>
    <div class="row"><span>Time Slot</span><strong>${slot}</strong></div>

    <hr />

    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th style="text-align:right">Price</th>
        </tr>
      </thead>
      <tbody>${testRows}</tbody>
    </table>

    <div class="total">
      <span>Total Amount</span>
      <span>&#8377;${Number(total || 0).toFixed(2)}</span>
    </div>

    <div class="note">
      Please visit the selected branch during your chosen slot. Carry this receipt ID
      and a valid photo ID for faster processing.
    </div>

    <button class="print-btn no-print" onclick="window.print()">
      Download / Save as PDF
    </button>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");

  if (!win) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `WalkIn_Receipt_${booking.receiptId}.html`;
    a.click();
  }
}

===============================
FILE: client\src\components\home\Herosection.jsx
===============================

import { HERO_STATS, VITALS, SITE } from "../../data/siteData";

export default function HeroSection({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* LEFT */}
        <div>
          <div className="hero-tag"><span className="hero-pulse"></span> AI-Powered Healthcare Platform</div>
          <h1 className="hero-h1">
            Smart Healthcare &amp;<br />
            <em>Remote Patient</em><br />
            <mark>Monitoring</mark> — Vizag
          </h1>
          <p className="hero-sub">
            Book appointments, order medicines, monitor vitals, and access diagnostic services from anywhere.
            Founded in {SITE.founded}, serving Visakhapatnam and beyond.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-xl" onClick={() => setPage("register")}>🚀 Get Started Free</button>
            <a
              className="btn btn-xl"
              style={{ background: "rgba(0,180,216,.12)", color: "#0369a1", border: "1.5px solid rgba(0,180,216,.3)" }}
              href="https://callmedex.com/consultation.php?service=tele-consultation"
              target="_blank" rel="noreferrer"
            >
              📹 Book Consultation
            </a>
            <a className="btn btn-ghost btn-xl" href="https://callmedex.com/health_packages.php" target="_blank" rel="noreferrer">
              📦 Health Packages
            </a>
          </div>
          <div className="hero-stats">
            {HERO_STATS.map(({ num, label }) => (
              <div key={label}>
                <div className="hs-num">{num}</div>
                <div className="hs-lbl">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated health card */}
        <div className="hero-visual">
          <div className="hv-main">
            <div className="hv-header">
              <div className="hv-avatar">🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: ".92rem" }}>AI Health Monitor</div>
                <div style={{ fontSize: ".72rem", color: "var(--c8)" }}>Real-time Analysis Active</div>
              </div>
              <div className="hv-live">LIVE</div>
            </div>
            <div className="ecg-wrap">
              <svg viewBox="0 0 400 56" preserveAspectRatio="none">
                <path
                  className="ecg-p"
                  d="M0,28 L55,28 L70,8 L82,48 L94,8 L108,28 L160,28 L175,8 L187,48 L199,8 L213,28 L265,28 L280,8 L292,48 L304,8 L318,28 L370,28 L385,8 L397,48 L400,28"
                  fill="none" stroke="#1B6CA8" strokeWidth="2.2" strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="vitals-grid">
              {VITALS.map(({ value, label, color }) => (
                <div className="vital" key={label}>
                  <div className="vital-val" style={{ color }}>{value}</div>
                  <div className="vital-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

===============================
FILE: client\src\components\home\Searchsection.jsx
===============================

import { useState } from "react";
import { SEARCH_TABS } from "../../data/siteData";

export default function SearchSection() {
  const [tab, setTab] = useState(0);
  return (
    <section className="search-sec">
      <div className="search-inner">
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.45rem", fontWeight: 700, marginBottom: "1.1rem", textAlign: "center", color: "var(--c1)" }}>
          Find Doctors, Tests, Medicines &amp; More
        </h3>
        <div className="search-tabs">
          {SEARCH_TABS.map((t, i) => (
            <button key={i} className={`stab${tab === i ? " on" : ""}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        <div className="sbar">
          <div className="sloc">📍 Visakhapatnam ▾</div>
          <input className="sinput" placeholder="Search doctors, hospitals, medicines, symptoms..." />
          <div className="sactions">
            <button className="siconbtn" title="Voice Search">🎙️</button>
            <button className="siconbtn" title="AI Checker">🤖</button>
            <button className="btn btn-red" style={{ borderRadius: 12, marginRight: 6 }}>🚨 Emergency</button>
          </div>
        </div>
      </div>
    </section>
  );
}

===============================
FILE: client\src\components\home\sections.jsx
===============================

/* sections.jsx — all mid-page sections as named exports */
import {
  ABOUT_CARDS, SPECIALISTS, PACKAGES, FEATURES,
  SERVICES, METRICS, APPT_STEPS, APPOINTMENT_SERVICES,
  BRANCHES, TESTIMONIALS, SITE,
} from "../../data/siteData";
import { SectionHeader, Field, FieldRow } from "../shared/ui";

/* ─── helpers ─────────────────────────────────────────── */
const parseCurrency = (s) => parseInt(s.replace(/[₹,]/g, ""), 10);
const discount = (curr, orig) => Math.round((orig - curr) / orig * 100);

/* ─── About ─────────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="sec-eyebrow">⚕️ About CallMedex</div>
            <h2 className="sec-title" style={{ textAlign: "left" }}>Founded to Transform Healthcare Access</h2>
            <p style={{ color: "var(--c8)", lineHeight: 1.85, marginBottom: "1.5rem", fontSize: ".94rem" }}>
              Founded in {SITE.founded} by a doctor with over 30 years of experience in healthcare, CallMedex is dedicated
              to transforming healthcare access for underserved communities in India. Our mission is to establish a
              comprehensive healthcare system that caters to both outpatient (OP) and inpatient (IP) needs.
            </p>
            <a className="btn btn-primary btn-lg" href={`${SITE.baseUrl}/about.php`} target="_blank" rel="noreferrer">
              Learn About Us →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {ABOUT_CARDS.map(({ ico, num, lbl }) => (
              <div key={lbl} style={{ background: "var(--c6)", borderRadius: 16, padding: "1.25rem", border: "1.5px solid var(--c7)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: ".4rem" }}>{ico}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--c1)" }}>{num}</div>
                <div style={{ fontSize: ".74rem", color: "var(--c8)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Specialists ───────────────────────────────────────── */
export function SpecialistsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="⚕️ Medical Specialists"
          title="Find the Right Specialist"
          sub="Connect with verified specialists across 14+ medical disciplines for quality care"
        />
        <div className="spec-grid">
          {SPECIALISTS.map((s, i) => (
            <div className="spec-card" key={i}>
              <div className="spec-ico">{s.ico}</div>
              <div className="spec-name">{s.name}</div>
              <div className="spec-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Health Packages ───────────────────────────────────── */
export function PackagesSection() {
  return (
    <section id="health-packages" className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="📦 Health Packages"
          title="Affordable Diagnostic Packages"
          sub="Comprehensive health checkup packages at unbeatable prices — home sample collection available"
        />
        <div className="pkg-grid">
          {PACKAGES.map((p, i) => {
            const curr = parseCurrency(p.price);
            const orig = parseCurrency(p.old);
            return (
              <div className="pkg-card" key={i}>
                <div className="pkg-name">{p.name}</div>
                <div className="pkg-price-row">
                  <span className="pkg-price">{p.price}</span>
                  <span className="pkg-price-old">{p.old}</span>
                  <span className="pkg-save">{discount(curr, orig)}% off</span>
                </div>
                <div className="pkg-tests"><strong>Includes: </strong>{p.tests}</div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 10 }}>
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a className="btn btn-outline btn-lg" href={`${SITE.baseUrl}/health_packages.php`} target="_blank" rel="noreferrer">
            View All Packages →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── AI Features ───────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="🤖 Artificial Intelligence"
          title="Smart AI Healthcare Features"
          sub="Cutting-edge AI tools designed to monitor, predict, and improve your health outcomes"
        />
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-ico" style={{ background: f.bg }}>{f.ico}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────── */
export function ServicesSection({setPage}) {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SectionHeader
          eyebrow="🏥 Our Services"
          title="Comprehensive Healthcare Services"
          sub="End-to-end healthcare solutions for patients, families, and healthcare professionals"
        />
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div className="svc-card" key={i}>
              <span className="svc-ico">{s.ico}</span>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
              <a className="svc-link" href="#">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics Strip ─────────────────────────────────────── */
export function MetricsSection() {
  return (
    <section className="metrics">
      <div className="metrics-inner">
        <div className="met-grid">
          {METRICS.map(({ ico, num, lbl }) => (
            <div className="met-card" key={lbl}>
              <span className="met-ico">{ico}</span>
              <div className="met-num">{num}</div>
              <div className="met-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Appointment ───────────────────────────────────────── */
export function AppointmentSection() {
  return (
    <section className="appt-sec">
      <div className="appt-grid">
        <div className="appt-left">
          <div className="sec-eyebrow" style={{ textAlign: "left", display: "inline-flex", marginBottom: ".75rem" }}>
            📅 Book Appointment
          </div>
          <h2>Request an Appointment <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--c2)" }}>Easily</em></h2>
          <p>
            For urgent matters, call us directly:{" "}
            <a href={`tel:${SITE.emergency.tel}`} style={{ color: "var(--c2)", fontWeight: 700 }}>{SITE.emergency.display}</a>
          </p>
          <div className="appt-steps">
            {APPT_STEPS.map((s, i) => (
              <div className="astep" key={i}>
                <div className="astep-num">{i + 1}</div>
                <div className="astep-text">{s}</div>
              </div>
            ))}
          </div>
          <a className="btn btn-primary btn-lg" href={SITE.patientPortal} target="_blank" rel="noreferrer">
            Patient Login / Signup →
          </a>
        </div>
        <div className="appt-right">
          <h3>Quick Appointment Request</h3>
          <FieldRow>
            <Field label="First Name"><input placeholder="Raju" /></Field>
            <Field label="Last Name"><input placeholder="Kumar" /></Field>
          </FieldRow>
          <Field label="Phone Number"><input placeholder="+91 98765 43210" /></Field>
          <Field label="Service">
            <select>
              {APPOINTMENT_SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Preferred Date"><input type="date" /></Field>
          <Field label="Message (optional)"><input placeholder="Any specific requirement..." /></Field>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", borderRadius: 12, padding: "13px", marginTop: 4 }}>
            📅 Request Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Branches ──────────────────────────────────────────── */
export function BranchesSection() {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SectionHeader
          eyebrow="📍 Our Locations"
          title="Visit Our Branches"
          sub="Three conveniently located centers in Visakhapatnam serving the community"
        />
        <div className="branch-grid">
          {BRANCHES.map((b, i) => (
            <div className="bc" key={i}>
              <div className="bc-map">
                <div className="bc-grid-bg"></div>
                <span className="bc-pin">📍</span>
              </div>
              <div className="bc-body">
                <div className="bc-name">{b.name}</div>
                <div className="bc-open"><span></span>Open Now</div>
                <div className="bc-row">🕐 {b.hours}</div>
                <div className="bc-row">📞 {b.phone}</div>
                <div className="bc-row">🏥 {b.services}</div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="💬 Patient Reviews"
          title="What Our Patients Say"
          sub="Real stories from real patients who chose CallMedex for their healthcare journey"
        />
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="tc" key={i}>
              <div className="tc-stars">{"★".repeat(t.stars)}</div>
              <p className="tc-text">{t.text}</p>
              <div className="tc-author">
                <div className="tc-av" style={{ background: t.bg, color: t.color }}>{t.initials}</div>
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────── */
export function CTASection({ setPage }) {
  return (
    <section className="cta-sec">
      <h2>Start Your Health Journey Today</h2>
      <p>Join 10,000+ patients who trust CallMedex for smarter, faster, and more accessible healthcare in Visakhapatnam.</p>
      <div className="cta-btns">
        <button className="btn btn-xl" style={{ background: "#fff", color: "var(--c2)" }} onClick={() => setPage("register")}>
          🚀 Create Free Account
        </button>
        <button className="btn btn-xl" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,.3)" }}>
          📱 Download App
        </button>
        <a className="btn btn-xl btn-red" href={SITE.patientPortal} target="_blank" rel="noreferrer">
          📅 Book Appointment
        </a>
      </div>
    </section>
  );
}

===============================
FILE: client\src\components\homeServices\homeService.api.js
===============================

import { api } from "../../shared/api";

export const fetchHomeServiceTests = async () => {
  const response = await api.get("/home-service/tests");
  return response.data;
};

===============================
FILE: client\src\components\homeServices\HomeServices.jsx
===============================

import React, { useEffect, useMemo, useState } from "react";
import AppointmentBooking from "../appointments/AppointmentBooking";
import { fetchHomeServiceTests } from "./homeService.api";

const S = {
  page: {
    padding: "110px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: "1.8rem",
    fontWeight: 800,
  },
  text: {
    color: "#64748b",
    marginTop: 8,
  },
  error: {
    color: "#e63946",
    fontWeight: 700,
  },
};

function normalizeTest(test, category) {
  return {
    id: String(test.id),
    code: test.code || "",
    name: test.name || "Unnamed Test",
    subtitle: test.subtitle || "",
    price: Number(test.price || 0),
    oldPrice: Number(test.old_price || 0),
    icon: test.icon || "🧪",
    category: category.category_name,
    features: Array.isArray(test.features) ? test.features : [],
    instructions: Array.isArray(test.instructions) ? test.instructions : [],
    isPrescriptionRequired: Boolean(test.is_prescription_required),
    fastingRequired: Boolean(test.fasting_required),
    fastingHours: Number(test.fasting_hours || 0),
  };
}

export default function HomeServices() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadTests = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchHomeServiceTests();

        if (!result.success) {
          throw new Error(result.message || "Unable to load tests");
        }

        if (mounted) {
          setCategories(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load home service tests"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTests();

    return () => {
      mounted = false;
    };
  }, []);

  const allTests = useMemo(() => {
    return categories.flatMap((category) =>
      category.tests.map((test) => normalizeTest(test, category))
    );
  }, [categories]);

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allTests.filter((test) => {
      const categoryMatch =
        selectedCategory === "all" || test.category === selectedCategory;

      const searchMatch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.subtitle.toLowerCase().includes(query) ||
        test.code.toLowerCase().includes(query) ||
        test.features.some((feature) =>
          String(feature).toLowerCase().includes(query)
        );

      return categoryMatch && searchMatch;
    });
  }, [allTests, selectedCategory, search]);

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Home Service Tests</h1>
          <p style={S.text}>Loading tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Home Service Tests</h1>
          <p style={S.error}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AppointmentBooking
      title="Book Home Service Test"
      scans={filteredTests}
      mode="home-service"
      bookingType="home-service"
      bookingEndpoint="/home-service/book"
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      search={search}
      setSearch={setSearch}
    />
  );
}

===============================
FILE: client\src\components\layout\Footer.jsx
===============================

import { FOOTER_LINKS, SITE } from "../../data/siteData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,var(--c2),var(--c3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏥</div>
              <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
                call<span style={{ color: "var(--c4)" }}>medex</span>
              </span>
            </div>
            <p className="footer-desc">
              Transforming healthcare access for underserved communities. Founded in {SITE.founded}, CallMedex
              provides comprehensive diagnostic and pharmacy services in Visakhapatnam.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: ".5rem", textTransform: "uppercase", letterSpacing: 1 }}>Download App</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["🍎 App Store", "🤖 Google Play"].map((label) => (
                  <button key={label} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: ".76rem", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns — Services & Quick Links use plain strings */}
          {["Services", "Quick Links"].map((col) => (
            <div className="footer-col" key={col}>
              <h5>{col}</h5>
              {FOOTER_LINKS[col].map((l) => <a key={l} className="fl" href="#">{l}</a>)}
            </div>
          ))}

          {/* Company column has href objects */}
          <div className="footer-col">
            <h5>Company</h5>
            {FOOTER_LINKS.Company.map(({ label, href }) => (
              <a key={label} className="fl" href={href} target="_blank" rel="noreferrer">{label}</a>
            ))}
          </div>

          {/* Newsletter + Emergency */}
          <div className="footer-col">
            <h5>Newsletter</h5>
            <p style={{ fontSize: ".8rem", marginBottom: ".6rem" }}>Get health tips &amp; news in your inbox.</p>
            <div className="fnl">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: ".5rem" }}>🚨 Emergency Helpline</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--c4)" }}>{SITE.emergency.display}</div>
              <div style={{ fontSize: ".76rem", color: "rgba(255,255,255,.4)", marginTop: 3 }}>Available 24/7 · 365 days</div>
            </div>
          </div>
        </div>

        <div className="footer-bot">
          <div className="footer-copy">{SITE.copyright}</div>
          <div className="footer-soc">
            {SITE.social.map(({ icon, href, label }) => (
              <a key={label} className="fsoc" href={href} target="_blank" rel="noreferrer" aria-label={label}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

===============================
FILE: client\src\components\layout\Navbar.jsx
===============================

import { useState } from "react";

import { NAV, SITE } from "../../data/siteData";
import { ChevDown } from "../shared/ui";
import logo from "../../assets/logo_medex.png";

export default function Navbar({
  scrolled,
  setPage,
  setStep,
  isLoggedIn,
  user,
  setIsLoggedIn,
  setUser,
}) {
  const [showProfile, setShowProfile] = useState(false);

  const loggedInUser =
    user ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return null;
      }
    })();

  const role = loggedInUser?.role;
  const isPharmacy = role === "pharmacy";
  const isPatient = role === "patient";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    if (setIsLoggedIn) setIsLoggedIn(false);
    if (setUser) setUser(null);

    setShowProfile(false);
    setPage("home");
  };

  const handleMenuClick = (item) => {
    if (item.page) {
      setPage(item.page);
      return;
    }

    if (item.step && setStep) {
      setStep(item.step);
      setPage("home");
      return;
    }

    if (item.scroll) {
      const section = document.getElementById(item.scroll);

      if (section) {
        const offset = 120;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }

      return;
    }

    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <nav className={`nav-outer${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* LOGO */}
        <a
          className="nav-logo"
          href={SITE.baseUrl}
          onClick={(e) => {
            e.preventDefault();
            setPage("home");
          }}
        >
          <img src={logo} alt="CallMedex Logo" />
        </a>

        {/* MENU */}
        <div className="nav-menu">
          {NAV.map((item, i) =>
            item.solo ? (
              <div className="nav-item" key={i}>
                <button className="nav-link" onClick={() => handleMenuClick(item)}>
                  {item.label}
                </button>
              </div>
            ) : (
              <div className="nav-item" key={i}>
                <button className="nav-link" type="button">
                  {item.label}
                  <ChevDown />
                </button>

                <div className="nav-drop">
                  {item.items?.map((d, j) => (
                    <button
                      className="drop-item"
                      key={j}
                      type="button"
                      onClick={() => handleMenuClick(d)}
                    >
                      {d.ico && <span className="drop-icon">{d.ico}</span>}

                      <span>{d.label || d.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* LOGIN / ROLE BUTTONS */}
          {!isLoggedIn && !loggedInUser ? (
            <button className="btn btn-login" onClick={() => setPage("login")}>
              🔐 Login
            </button>
          ) : isPharmacy ? (
            <>
              <button
                type="button"
                className="pharmacy-dashboard-nav-btn"
                onClick={() => setPage("pharmacy-dashboard")}
              >
                <span className="pharmacy-dashboard-nav-icon">🏥</span>
                Dashboard
              </button>

              <button className="btn btn-login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : isPatient ? (
            <div style={{ position: "relative" }}>
              <button
                className="btn btn-login"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                👤 Profile
              </button>

              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    top: "55px",
                    right: 0,
                    width: "280px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                    padding: "15px",
                    zIndex: 9999,
                  }}
                >
                  <h4>{loggedInUser?.name || "User"}</h4>

                  <hr />

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("profile");
                    }}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("bookings");
                    }}
                  >
                    Previous Bookings
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("reports");
                    }}
                  >
                    Test Reports
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("help");
                    }}
                  >
                    Help & Support
                  </button>

                  <hr />

                  <button className="drop-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-login" onClick={handleLogout}>
              Logout
            </button>
          )}

          {/* BOOK APPOINTMENT - HIDE FOR PHARMACY */}
          {!isPharmacy && (
            <a
              className="btn btn-book"
              href={SITE.patientPortal}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: "12px" }}
            >
              Book
              <br />
              Appointment
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

===============================
FILE: client\src\components\layout\TopBar.jsx
===============================

import { SITE } from "../../data/siteData";

export default function TopBar() {
  const { emergency, ambulance, bloodBank, tagline } = SITE;
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span>🚨 {emergency.label}: <a href={`tel:${emergency.tel}`}>{emergency.display}</a></span>
        <span>🚑 {ambulance.label}: <a href={`tel:${ambulance.tel}`}>{ambulance.display}</a></span>
        <span>🩸 {bloodBank.label}: <a href={`tel:${bloodBank.tel}`}>{bloodBank.display}</a></span>
      </div>
      <div className="topbar-right">
        <span className="topbar-pill">✦ {tagline}</span>
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\pharmacy\pharmacy.api.js
===============================

import { api } from "../../shared/api";

export const fetchPharmacyPatientDetails = async () => {
  const response = await api.get("/pharmacy/patient-details");
  return response.data;
};

export const fetchPharmacyMedicines = async (search = "") => {
  const response = await api.get("/pharmacy/medicines", {
    params: { search },
  });

  return response.data;
};

export const createPharmacyOrder = async (payload) => {
  const response = await api.post("/pharmacy/orders", payload);
  return response.data;
};

export const fetchMyPharmacyOrders = async () => {
  const response = await api.get("/pharmacy/orders/my");
  return response.data;
};

===============================
FILE: client\src\components\pharmacy\PharmacyHomeDelivery.jsx
===============================

import React, { useEffect, useMemo, useState } from "react";

import {
  fetchPharmacyPatientDetails,
  fetchPharmacyMedicines,
  createPharmacyOrder,
} from "./pharmacy.api";

import { useToast } from "../../shared/toast";

const S = {
  page: {
    padding: "110px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 18,
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: "1.8rem",
    fontWeight: 800,
  },
  sub: {
    color: "#64748b",
    marginTop: 6,
    fontSize: ".9rem",
  },
  sectionTitle: {
    margin: "0 0 14px",
    color: "#0A2540",
    fontSize: "1.05rem",
    fontWeight: 800,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: "11px 13px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 12,
    outline: "none",
    fontSize: ".9rem",
    background: "#f8fafc",
    boxSizing: "border-box",
  },
  label: {
    display: "block",
    fontSize: ".75rem",
    fontWeight: 700,
    color: "#64748b",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: ".4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: ".88rem",
  },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    background: "#f8fafc",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0",
    fontSize: ".76rem",
    textTransform: "uppercase",
  },
  td: {
    padding: "11px 8px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
  },
  btn: {
    border: "none",
    borderRadius: 12,
    padding: "10px 14px",
    fontWeight: 800,
    cursor: "pointer",
  },
  primaryBtn: {
    background: "#e63946",
    color: "#fff",
  },
  greenBtn: {
    background: "#10b981",
    color: "#fff",
  },
  ghostBtn: {
    background: "#f1f5f9",
    color: "#0A2540",
  },
  darkBtn: {
    background: "#0A2540",
    color: "#fff",
  },
  dangerText: {
    color: "#e63946",
    fontWeight: 700,
    fontSize: ".82rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: "9px 0",
    borderBottom: "1px solid #f1f5f9",
    fontSize: ".9rem",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 14,
    fontWeight: 900,
    fontSize: "1.05rem",
    color: "#0A2540",
  },
};

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function validateDelivery(form, selectedItems) {
  const errors = {};

  if (!form.deliveryName.trim()) {
    errors.deliveryName = "Name is required";
  }

  if (!/^[6-9]\d{9}$/.test(form.deliveryPhone)) {
    errors.deliveryPhone = "Enter valid 10-digit mobile number";
  }

  if (!form.deliveryAddress.trim()) {
    errors.deliveryAddress = "Address is required";
  }

  if (form.pincode && !/^\d{6}$/.test(form.pincode)) {
    errors.pincode = "Enter valid 6-digit pincode";
  }

  if (selectedItems.length === 0) {
    errors.items = "Select at least one medicine";
  }

  return errors;
}

export default function PharmacyHomeDelivery({ setPage }) {
  const toast = useToast();

  const [orderMode, setOrderMode] = useState("online");
  const [patient, setPatient] = useState(null);

  const [deliveryForm, setDeliveryForm] = useState({
    deliveryName: "",
    deliveryPhone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [booking, setBooking] = useState(false);

  const [error, setError] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      toast.error("Please login as patient before booking medicines.");
      setPage?.("login");
      return;
    }

    if (storedUser.role !== "patient") {
      toast.error("Only patient accounts can book medicines.");
      setPage?.("home");
      return;
    }

    let mounted = true;

    const loadPatient = async () => {
      try {
        setLoadingPatient(true);
        setError("");

        const result = await fetchPharmacyPatientDetails();

        if (!result.success) {
          throw new Error(result.message || "Unable to load patient details");
        }

        if (!mounted) return;

        const data = result.data;

        setPatient(data);

        setDeliveryForm({
          deliveryName: data.name || "",
          deliveryPhone: data.phone || "",
          deliveryAddress: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load patient details";

        setError(message);
        toast.error(message);

        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          toast.error("Session expired. Please login again.");
          setPage?.("login");
        }

        if (err.response?.status === 403) {
          setPage?.("home");
        }
      } finally {
        if (mounted) {
          setLoadingPatient(false);
        }
      }
    };

    loadPatient();

    return () => {
      mounted = false;
    };
  }, [setPage, toast]);

  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(async () => {
      try {
        setLoadingMedicines(true);

        const result = await fetchPharmacyMedicines(search);

        if (!result.success) {
          throw new Error(result.message || "Unable to load medicines");
        }

        if (mounted) {
          setMedicines(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load medicines";

        if (mounted) {
          setError(message);
          toast.error(message);

          if (err.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setPage?.("login");
          }

          if (err.response?.status === 403) {
            setPage?.("home");
          }
        }
      } finally {
        if (mounted) {
          setLoadingMedicines(false);
        }
      }
    }, 350);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [search, toast, setPage]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
  }, [selectedItems]);

  const deliveryCharge =
    orderMode === "online" && subtotal > 0 && subtotal < 500 ? 40 : 0;

  const total = subtotal + deliveryCharge;

  const addMedicine = (medicine) => {
    setSuccessOrder(null);

    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.medicineId === medicine.id);

      if (existing) {
        if (existing.quantity + 1 > medicine.stockQuantity) {
          toast.error("Selected quantity exceeds available stock.");
          return prev;
        }

        return prev.map((item) =>
          item.medicineId === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${medicine.medicineName} added`);

      return [
        ...prev,
        {
          medicineId: medicine.id,
          medicineName: medicine.medicineName,
          price: Number(medicine.price),
          stockQuantity: Number(medicine.stockQuantity),
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (medicineId, value) => {
    const quantity = Number(value);

    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.medicineId !== medicineId) return item;

        if (!Number.isInteger(quantity) || quantity < 1) {
          return { ...item, quantity: 1 };
        }

        if (quantity > item.stockQuantity) {
          toast.error("Selected quantity exceeds available stock.");
          return { ...item, quantity: item.stockQuantity };
        }

        return { ...item, quantity };
      })
    );
  };

  const removeMedicine = (medicineId) => {
    setSelectedItems((prev) =>
      prev.filter((item) => item.medicineId !== medicineId)
    );

    toast.info("Medicine removed");
  };

  const handleBook = async () => {
    setError("");
    setSuccessOrder(null);

    const storedUser = getStoredUser();

    if (!storedUser || storedUser.role !== "patient") {
      toast.error("Only patient accounts can book medicines.");
      setPage?.("home");
      return;
    }

    const errors = validateDelivery(deliveryForm, selectedItems);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }

    const payload = {
      orderMode,
      deliveryName: deliveryForm.deliveryName.trim(),
      deliveryPhone: deliveryForm.deliveryPhone.trim(),
      deliveryAddress: deliveryForm.deliveryAddress.trim(),
      city: deliveryForm.city.trim() || null,
      state: deliveryForm.state.trim() || null,
      pincode: deliveryForm.pincode.trim() || null,
      items: selectedItems.map((item) => ({
        medicineId: item.medicineId,
        quantity: item.quantity,
      })),
    };

    try {
      setBooking(true);

      const result = await createPharmacyOrder(payload);

      if (!result.success) {
        throw new Error(result.message || "Medicine booking failed");
      }

      setSuccessOrder(result.data);

      toast.success(
        orderMode === "online"
          ? "Medicine delivery booked successfully."
          : "Offline pickup confirmed successfully."
      );

      setSelectedItems([]);
      setSearch("");
      setFormErrors({});
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Medicine booking failed";

      setError(message);
      toast.error(message);

      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again.");
        setPage?.("login");
      }

      if (err.response?.status === 403) {
        setPage?.("home");
      }
    } finally {
      setBooking(false);
    }
  };

  if (loadingPatient) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Pharmacy Medicine Booking</h1>
          <p style={S.sub}>Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (error && !patient) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Pharmacy Medicine Booking</h1>
          <p style={S.dangerText}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={{ maxWidth: 1180, margin: "0 auto 18px" }}>
        <h1 style={S.title}>Pharmacy Medicine Booking</h1>

        <p style={S.sub}>
          Select online delivery or offline pickup, choose medicines, and confirm
          your order.
        </p>
      </div>

      <div style={S.wrap}>
        <main>
          <div style={S.card}>
            <h2 style={S.sectionTitle}>Patient & Booking Details</h2>

            <div style={{ marginBottom: 18 }}>
              <label style={S.label}>Select Booking Mode</label>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setOrderMode("online")}
                  style={{
                    ...S.btn,
                    background: orderMode === "online" ? "#10b981" : "#f1f5f9",
                    color: orderMode === "online" ? "#fff" : "#0A2540",
                  }}
                >
                  Online Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setOrderMode("offline")}
                  style={{
                    ...S.btn,
                    background: orderMode === "offline" ? "#0A2540" : "#f1f5f9",
                    color: orderMode === "offline" ? "#fff" : "#0A2540",
                  }}
                >
                  Offline Pickup
                </button>
              </div>
            </div>

            <div style={S.grid2}>
              <div>
                <label style={S.label}>Name</label>
                <input
                  style={S.input}
                  value={deliveryForm.deliveryName}
                  onChange={(e) =>
                    setDeliveryForm({
                      ...deliveryForm,
                      deliveryName: e.target.value,
                    })
                  }
                />
                {formErrors.deliveryName && (
                  <p style={S.dangerText}>{formErrors.deliveryName}</p>
                )}
              </div>

              <div>
                <label style={S.label}>Mobile</label>
                <input
                  style={S.input}
                  value={deliveryForm.deliveryPhone}
                  maxLength={10}
                  onChange={(e) =>
                    setDeliveryForm({
                      ...deliveryForm,
                      deliveryPhone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
                {formErrors.deliveryPhone && (
                  <p style={S.dangerText}>{formErrors.deliveryPhone}</p>
                )}
              </div>

              <div>
                <label style={S.label}>Email</label>
                <input style={S.input} value={patient?.email || ""} readOnly />
              </div>

              <div>
                <label style={S.label}>Pincode</label>
                <input
                  style={S.input}
                  value={deliveryForm.pincode}
                  maxLength={6}
                  onChange={(e) =>
                    setDeliveryForm({
                      ...deliveryForm,
                      pincode: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
                {formErrors.pincode && (
                  <p style={S.dangerText}>{formErrors.pincode}</p>
                )}
              </div>

              <div>
                <label style={S.label}>City</label>
                <input
                  style={S.input}
                  value={deliveryForm.city}
                  onChange={(e) =>
                    setDeliveryForm({
                      ...deliveryForm,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label style={S.label}>State</label>
                <input
                  style={S.input}
                  value={deliveryForm.state}
                  onChange={(e) =>
                    setDeliveryForm({
                      ...deliveryForm,
                      state: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={S.label}>
                {orderMode === "online"
                  ? "Delivery Address"
                  : "Patient Address"}
              </label>

              <textarea
                style={{ ...S.input, minHeight: 86, resize: "none" }}
                value={deliveryForm.deliveryAddress}
                onChange={(e) =>
                  setDeliveryForm({
                    ...deliveryForm,
                    deliveryAddress: e.target.value,
                  })
                }
              />

              {formErrors.deliveryAddress && (
                <p style={S.dangerText}>{formErrors.deliveryAddress}</p>
              )}
            </div>
          </div>

          <div style={S.card}>
            <h2 style={S.sectionTitle}>Search Medicines</h2>

            <input
              style={{ ...S.input, marginBottom: 14 }}
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loadingMedicines ? (
              <p style={S.sub}>Loading medicines...</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Medicine</th>
                      <th style={S.th}>Type</th>
                      <th style={S.th}>Price</th>
                      <th style={S.th}>Stock</th>
                      <th style={S.th}>Prescription</th>
                      <th style={S.th}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td style={S.td}>
                          <strong>{medicine.medicineName}</strong>
                        </td>

                        <td style={S.td}>{medicine.medicineType}</td>

                        <td style={S.td}>₹{medicine.price}</td>

                        <td style={S.td}>{medicine.stockQuantity}</td>

                        <td style={S.td}>
                          {medicine.requiresPrescription ? "Yes" : "No"}
                        </td>

                        <td style={S.td}>
                          <button
                            style={{ ...S.btn, ...S.greenBtn }}
                            onClick={() => addMedicine(medicine)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}

                    {medicines.length === 0 && (
                      <tr>
                        <td style={S.td} colSpan={6}>
                          No medicines found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        <aside>
          <div style={S.card}>
            <h2 style={S.sectionTitle}>Selected Medicines</h2>

            {formErrors.items && <p style={S.dangerText}>{formErrors.items}</p>}

            {selectedItems.length === 0 ? (
              <p style={S.sub}>No medicine selected yet.</p>
            ) : (
              selectedItems.map((item) => (
                <div key={item.medicineId} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, color: "#0A2540" }}>
                    {item.medicineName}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto",
                      gap: 8,
                      marginTop: 8,
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="number"
                      min="1"
                      max={item.stockQuantity}
                      value={item.quantity}
                      style={S.input}
                      onChange={(e) =>
                        updateQuantity(item.medicineId, e.target.value)
                      }
                    />

                    <span style={{ color: "#64748b", fontSize: ".85rem" }}>
                      ₹{item.price} × {item.quantity}
                    </span>

                    <button
                      style={{ ...S.btn, ...S.ghostBtn }}
                      onClick={() => removeMedicine(item.medicineId)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={S.card}>
            <h2 style={S.sectionTitle}>Price Summary</h2>

            <div style={S.row}>
              <span>Booking Mode</span>
              <strong>
                {orderMode === "online" ? "Online Delivery" : "Offline Pickup"}
              </strong>
            </div>

            <div style={S.row}>
              <span>Medicine subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div style={S.row}>
              <span>Delivery charge</span>
              <strong>₹{deliveryCharge}</strong>
            </div>

            <div style={S.totalRow}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              style={{
                ...S.btn,
                ...(orderMode === "online" ? S.primaryBtn : S.darkBtn),
                width: "100%",
                marginTop: 18,
                opacity: booking ? 0.6 : 1,
              }}
              disabled={booking}
              onClick={handleBook}
            >
              {booking
                ? "Booking..."
                : orderMode === "online"
                ? "Book Medicine Delivery"
                : "Confirm Offline Pickup"}
            </button>

            {error && <p style={S.dangerText}>{error}</p>}

            {successOrder && (
              <div
                style={{
                  marginTop: 16,
                  background: "#ecfcfc",
                  border: "1.5px solid #22c1c3",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <strong style={{ color: "#0A2540" }}>
                  {successOrder.orderMode === "online"
                    ? "Delivery booked successfully!"
                    : "Offline pickup confirmed!"}
                </strong>

                <p style={{ margin: "6px 0 0", color: "#64748b" }}>
                  Order ID: {successOrder.publicOrderId}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\pharmacyDashboard\pharmacyDashboard.api.js
===============================

import { api } from "../../shared/api";

export const fetchPharmacyDashboardProfile = async () => {
  const response = await api.get("/pharmacy/dashboard/profile");
  return response.data;
};

export const fetchPharmacyDashboardInventory = async (search = "") => {
  const response = await api.get("/pharmacy/dashboard/inventory", {
    params: { search },
  });

  return response.data;
};

export const fetchPharmacyDashboardOrders = async () => {
  const response = await api.get("/pharmacy/dashboard/orders");
  return response.data;
};

export const updatePharmacyDashboardOrderStatus = async (orderId, status) => {
  const response = await api.patch(
    `/pharmacy/dashboard/orders/${orderId}/status`,
    { status }
  );

  return response.data;
};

===============================
FILE: client\src\components\pharmacyDashboard\pharmacyDashboard.css
===============================

.pharmacy-dashboard-page {
  padding: 110px 28px 48px;
  background: #f4f8fb;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.pharmacy-dashboard-container {
  max-width: 1180px;
  margin: 0 auto;
}

.pharmacy-dashboard-header h1 {
  margin: 0;
  color: #0a2540;
  font-size: 1.9rem;
  font-weight: 900;
}

.pharmacy-dashboard-header p {
  color: #64748b;
  margin-top: 6px;
  font-size: 0.92rem;
}

.pharmacy-dashboard-tabs {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.pharmacy-dashboard-tabs button {
  border: none;
  border-radius: 14px;
  padding: 11px 18px;
  font-weight: 800;
  cursor: pointer;
  background: #ffffff;
  color: #0a2540;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

.pharmacy-dashboard-tabs button.active {
  background: #0a2540;
  color: #ffffff;
}

.pharmacy-dashboard-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
  margin-bottom: 18px;
}

.pharmacy-dashboard-card h2 {
  margin: 0 0 18px;
  color: #0a2540;
  font-size: 1.25rem;
  font-weight: 900;
}

.pharmacy-profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.pharmacy-info-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.pharmacy-info-value {
  font-size: 0.95rem;
  color: #0a2540;
  font-weight: 700;
}

.pharmacy-search-input {
  width: 100%;
  padding: 11px 13px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  font-size: 0.9rem;
  background: #f8fafc;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.pharmacy-table-wrap {
  overflow-x: auto;
}

.pharmacy-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.pharmacy-table th {
  text-align: left;
  padding: 10px 8px;
  background: #f8fafc;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.pharmacy-table td {
  padding: 11px 8px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  vertical-align: top;
}

.pharmacy-small-text {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 3px;
}

.pharmacy-muted {
  color: #94a3b8;
}

.pharmacy-status {
  display: inline-block;
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
}

.pharmacy-status.completed {
  background: #dcfce7;
  color: #15803d;
}

.pharmacy-status.cancelled {
  background: #fee2e2;
  color: #b91c1c;
}

.pharmacy-status.pending {
  background: #fffbeb;
  color: #92400e;
}

.pharmacy-action-buttons {
  display: flex;
  gap: 8px;
}

.pharmacy-complete-btn,
.pharmacy-cancel-btn {
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 800;
  cursor: pointer;
}

.pharmacy-complete-btn {
  background: #dcfce7;
  color: #15803d;
}

.pharmacy-cancel-btn {
  background: #fee2e2;
  color: #b91c1c;
}

@media (max-width: 768px) {
  .pharmacy-dashboard-page {
    padding: 96px 16px 36px;
  }

  .pharmacy-profile-grid {
    grid-template-columns: 1fr;
  }

  .pharmacy-dashboard-card {
    padding: 18px;
  }
}

===============================
FILE: client\src\components\pharmacyDashboard\PharmacyDashboard.jsx
===============================

import React, { useEffect, useState } from "react";

import { useToast } from "../../shared/toast";

import {
  fetchPharmacyDashboardProfile,
  fetchPharmacyDashboardInventory,
  fetchPharmacyDashboardOrders,
  updatePharmacyDashboardOrderStatus,
} from "./pharmacyDashboard.api";

import "./pharmacyDashboard.css";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function getStatusClass(status) {
  if (status === "completed") return "pharmacy-status completed";
  if (status === "cancelled") return "pharmacy-status cancelled";
  return "pharmacy-status pending";
}

function InfoItem({ label, value }) {
  return (
    <div className="pharmacy-info-item">
      <div className="pharmacy-info-label">{label}</div>
      <div className="pharmacy-info-value">{value || "-"}</div>
    </div>
  );
}

export default function PharmacyDashboard({ setPage }) {
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  const [inventorySearch, setInventorySearch] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = getStoredUser();

    if (!token || !user) {
      toast.error("Please login first.");
      setPage?.("login");
      return;
    }

    if (user.role !== "pharmacy") {
      toast.error("Only pharmacy users can access dashboard.");
      setPage?.("home");
    }
  }, [setPage, toast]);

  useEffect(() => {
    if (activeTab !== "profile") return;

    const loadProfile = async () => {
      try {
        setLoadingProfile(true);

        const result = await fetchPharmacyDashboardProfile();

        if (!result.success) {
          throw new Error(result.message || "Unable to load profile");
        }

        setProfile(result.data);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load profile";

        toast.error(message);

        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setPage?.("login");
        }

        if (err.response?.status === 403) {
          setPage?.("home");
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [activeTab, setPage, toast]);

  useEffect(() => {
    if (activeTab !== "inventory") return;

    let mounted = true;

    const timer = setTimeout(async () => {
      try {
        setLoadingInventory(true);

        const result = await fetchPharmacyDashboardInventory(inventorySearch);

        if (!result.success) {
          throw new Error(result.message || "Unable to load inventory");
        }

        if (mounted) {
          setInventory(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load inventory";

        toast.error(message);
      } finally {
        if (mounted) {
          setLoadingInventory(false);
        }
      }
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [activeTab, inventorySearch, toast]);

  useEffect(() => {
    if (activeTab !== "orders") return;

    const loadOrders = async () => {
      try {
        setLoadingOrders(true);

        const result = await fetchPharmacyDashboardOrders();

        if (!result.success) {
          throw new Error(result.message || "Unable to load orders");
        }

        setOrders(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load orders";

        toast.error(message);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [activeTab, toast]);

  const handleOrderStatus = async (orderId, status) => {
    try {
      const result = await updatePharmacyDashboardOrderStatus(orderId, status);

      if (!result.success) {
        throw new Error(result.message || "Unable to update order");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      toast.success(
        status === "completed"
          ? "Order marked as completed"
          : "Order cancelled successfully"
      );
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to update order";

      toast.error(message);
    }
  };

  return (
    <div className="pharmacy-dashboard-page">
      <div className="pharmacy-dashboard-container">
        <div className="pharmacy-dashboard-header">
          <h1>Pharmacy Dashboard</h1>
          <p>Manage pharmacy profile, medicine inventory, and patient orders.</p>
        </div>

        <div className="pharmacy-dashboard-tabs">
          <button
            type="button"
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            type="button"
            className={activeTab === "inventory" ? "active" : ""}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>

          <button
            type="button"
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
        </div>

        {activeTab === "profile" && (
          <section className="pharmacy-dashboard-card">
            <h2>Profile Details</h2>

            {loadingProfile ? (
              <p className="pharmacy-muted">Loading profile...</p>
            ) : profile ? (
              <div className="pharmacy-profile-grid">
                <InfoItem label="Name" value={profile.name} />
                <InfoItem label="Mobile" value={profile.phone} />
                <InfoItem label="Email" value={profile.email} />
                <InfoItem label="Public ID" value={profile.publicUserId} />
                <InfoItem label="Role" value={profile.role} />

                <InfoItem label="Pharmacy Name" value={profile.pharmacyName} />
                <InfoItem label="Pharmacy Type" value={profile.pharmacyType} />
                <InfoItem label="Owner Name" value={profile.ownerName} />
                <InfoItem
                  label="Pharmacist In Charge"
                  value={profile.pharmacistInCharge}
                />
                <InfoItem
                  label="Drug License Number"
                  value={profile.drugLicenseNumber}
                />
                <InfoItem label="GST Number" value={profile.gstNumber} />
                <InfoItem
                  label="Operating Hours"
                  value={profile.operatingHours}
                />
                <InfoItem
                  label="Home Delivery"
                  value={profile.homeDelivery ? "Yes" : "No"}
                />
                <InfoItem
                  label="24x7 Availability"
                  value={profile.availability24x7 ? "Yes" : "No"}
                />
              </div>
            ) : (
              <p className="pharmacy-muted">No profile details found.</p>
            )}
          </section>
        )}

        {activeTab === "inventory" && (
          <section className="pharmacy-dashboard-card">
            <h2>Medicine Inventory</h2>

            <input
              className="pharmacy-search-input"
              placeholder="Search medicine..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
            />

            {loadingInventory ? (
              <p className="pharmacy-muted">Loading inventory...</p>
            ) : (
              <div className="pharmacy-table-wrap">
                <table className="pharmacy-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Prescription</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inventory.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>
                          <strong>{medicine.medicineName}</strong>
                        </td>
                        <td>{medicine.medicineType}</td>
                        <td>₹{medicine.price}</td>
                        <td>{medicine.stockQuantity}</td>
                        <td>{medicine.requiresPrescription ? "Yes" : "No"}</td>
                      </tr>
                    ))}

                    {inventory.length === 0 && (
                      <tr>
                        <td colSpan={5}>No medicines found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "orders" && (
          <section className="pharmacy-dashboard-card">
            <h2>Patient Orders</h2>

            {loadingOrders ? (
              <p className="pharmacy-muted">Loading orders...</p>
            ) : (
              <div className="pharmacy-table-wrap">
                <table className="pharmacy-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Patient</th>
                      <th>Mode</th>
                      <th>Medicines</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.publicOrderId}</strong>
                          <div className="pharmacy-small-text">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </div>
                        </td>

                        <td>
                          <strong>{order.patientName}</strong>
                          <div>{order.patientPhone}</div>
                          <div className="pharmacy-small-text">
                            {order.deliveryAddress}
                          </div>
                        </td>

                        <td>
                          {order.orderMode === "online"
                            ? "Online Delivery"
                            : "Offline Pickup"}
                        </td>

                        <td>
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                              <div key={`${order.id}-${item.medicineId}`}>
                                {item.medicineName} × {item.quantity}
                              </div>
                            ))
                          ) : (
                            <span className="pharmacy-muted">No items</span>
                          )}
                        </td>

                        <td>
                          <strong>₹{order.totalAmount}</strong>
                        </td>

                        <td>
                          <span className={getStatusClass(order.status)}>
                            {order.status}
                          </span>
                        </td>

                        <td>
                          {order.status === "completed" ||
                          order.status === "cancelled" ? (
                            <span className="pharmacy-muted">Done</span>
                          ) : (
                            <div className="pharmacy-action-buttons">
                              <button
                                type="button"
                                className="pharmacy-complete-btn"
                                title="Mark completed"
                                onClick={() =>
                                  handleOrderStatus(order.id, "completed")
                                }
                              >
                                ✓
                              </button>

                              <button
                                type="button"
                                className="pharmacy-cancel-btn"
                                title="Cancel order"
                                onClick={() =>
                                  handleOrderStatus(order.id, "cancelled")
                                }
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7}>No orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

===============================
FILE: client\src\components\profile\PatientBookings.jsx
===============================

import React, { useEffect, useState } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

export default function PatientBookings({ setPage }) {
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
       
      const scanRes = await api.get("/profile/bookings");

      const teleRes = await api.get(
      "/api/tele-consultation/my-bookings"
      );

      if (res.data.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Could not load previous bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h2 style={S.title}>Loading bookings...</h2>
          <p style={S.sub}>Please wait while we fetch your previous bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <p style={S.eyebrow}>PATIENT BOOKINGS</p>
          <h1 style={S.mainTitle}>Previous Bookings</h1>
          <p style={S.sub}>
            View your scan and diagnostic appointment history.
          </p>
        </div>

        <button style={S.backBtn} onClick={() => setPage?.("profile")}>
          Back to Profile
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={S.emptyCard}>
          <div style={S.emptyIcon}>📋</div>
          <h2 style={S.title}>No bookings found</h2>
          <p style={S.sub}>Your previous appointments will appear here.</p>
          <button style={S.primaryBtn} onClick={() => setPage?.("bodydiagnostics")}>
            Book a Scan
          </button>
        </div>
      ) : (
        <div style={S.list}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking }) {

  const isConsultation =
  booking.bookingType === "consultation";
  const scans = booking.scans || [];

  return (
    <div style={S.bookingCard}>
      <div style={S.bookingTop}>
        <div>
          <h2 style={S.bookingTitle}>
            {booking.receiptId || `Booking #${booking.id}`}
          </h2>
          <p style={S.sub}>
            {booking.appointmentDate} • {booking.timeSlot}
          </p>
        </div>

        <span style={{ ...S.status, ...statusStyle(booking.status) }}>
          {booking.status || "pending"}
        </span>
      </div>

      <div style={S.infoGrid}>
        <Info label="Patient" value={booking.patientName} />
        <Info label="Branch" value={booking.branch} />
        <Info label="Mobile" value={booking.patientMobile} />
        <Info label="Amount" value={`₹${booking.totalAmount}`} />
      </div>

      <div style={S.scanBox}>
        <h3 style={S.scanTitle}>
  {isConsultation
    ? "Consultation Service"
    : "Selected Scans"}
</h3>

        {isConsultation ? (
  <div>
    <p>Consultation at Home</p>
    <p>Date: {booking.appointmentDate}</p>
    <p>Time Slot: {booking.timeSlot}</p>
  </div>
) : scans.length === 0 ? (
  <p style={S.sub}>No scan details available.</p>
) : (
          <div style={S.scanList}>
            {scans.map((scan, index) => (
              <div key={scan.id || index} style={S.scanItem}>
                <span>{scan.name || scan.test_name || "Scan"}</span>
                <strong>₹{scan.price || 0}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={S.infoItem}>
      <span style={S.infoLabel}>{label}</span>
      <strong style={S.infoValue}>{value || "-"}</strong>
    </div>
  );
}

function statusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value === "confirmed") {
    return { background: "#dcfce7", color: "#166534" };
  }

  if (value === "completed") {
    return { background: "#dbeafe", color: "#1e40af" };
  }

  if (value === "cancelled") {
    return { background: "#fee2e2", color: "#991b1b" };
  }

  return { background: "#fef3c7", color: "#92400e" };
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#f4f8fb",
    padding: "100px 28px 48px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    maxWidth: 1100,
    margin: "0 auto 20px",
    background: "#fff",
    borderRadius: 20,
    padding: "24px 26px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  eyebrow: {
    margin: "0 0 6px",
    color: "#22c1c3",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 1,
  },
  mainTitle: {
    margin: 0,
    color: "#0A2540",
    fontSize: 28,
    fontWeight: 800,
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: 22,
    fontWeight: 800,
  },
  sub: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6,
  },
  card: {
    maxWidth: 900,
    margin: "80px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  emptyCard: {
    maxWidth: 680,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  emptyIcon: {
    fontSize: 46,
    marginBottom: 12,
  },
  list: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gap: 16,
  },
  bookingCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  bookingTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
  },
  bookingTitle: {
    margin: 0,
    color: "#0A2540",
    fontSize: 20,
    fontWeight: 800,
  },
  status: {
    padding: "7px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    textTransform: "capitalize",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 18,
  },
  infoItem: {
    background: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: 12,
    padding: "10px 12px",
  },
  infoLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    color: "#0A2540",
    fontSize: 13,
  },
  scanBox: {
    background: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: 14,
    padding: 14,
  },
  scanTitle: {
    margin: "0 0 10px",
    fontSize: 15,
    color: "#0A2540",
  },
  scanList: {
    display: "grid",
    gap: 8,
  },
  scanItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    borderRadius: 10,
    padding: "10px 12px",
    color: "#334155",
  },
  prescription: {
    margin: "14px 0 0",
    color: "#64748b",
    fontSize: 13,
  },
  backBtn: {
    border: "1.5px solid #dbe4ee",
    background: "#fff",
    color: "#334155",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  primaryBtn: {
    marginTop: 16,
    border: "none",
    background: "#0f4676",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
};

===============================
FILE: client\src\components\profile\PatientProfile.jsx
===============================

import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const CONDITIONS = ["BP", "Sugar", "Thyroid", "Anemia", "Asthma", "Heart Disease", "None", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  age: "",
  address: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
  country: "India",
  bloodGroup: "",
  height: "",
  weight: "",
  medicalHistory: [],
  hasOtherCondition: false,
  otherCondition: "",
};
function toDateInputValue(value) {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function ageFromDob(dob) {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();

  if (Number.isNaN(birth.getTime()) || birth >= today) return "";

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;

  return age >= 0 && age <= 120 ? String(age) : "";
}

function normalize(data = {}) {
  return {
    ...initialForm,
    ...data,
    dob: toDateInputValue(data.dob),
    age: data.dob ? ageFromDob(toDateInputValue(data.dob)) : data.age || "",
    medicalHistory: Array.isArray(data.medicalHistory) ? data.medicalHistory : [],
    hasOtherCondition: Boolean(data.hasOtherCondition),
  };
}

export default function PatientProfile({ setPage, setUser }) {
  const toast = useToast();

  const [form, setForm] = useState(initialForm);
  const [backup, setBackup] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const readOnly = !edit;

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.phone,
      form.gender,
      form.dob,
      form.address,
      form.city,
      form.state,
      form.pincode,
      form.bloodGroup,
      form.height,
      form.weight,
    ];

    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "patient") {
      toast.error("Only patient accounts can access this page.");
      setPage?.("home");
      return;
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile/patient");

      if (res.data.success) {
        const profile = normalize(res.data.data);
        setForm(profile);
        setBackup(profile);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load profile details.");
    } finally {
      setLoading(false);
    }
  };

  const setField = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "dob") next.age = ageFromDob(value);
      return next;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleCondition = (condition) => {
    if (readOnly) return;

    setForm((prev) => {
      let history = prev.medicalHistory || [];

      if (condition === "None") {
        history = history.includes("None") ? [] : ["None"];
      } else {
        history = history.filter((item) => item !== "None");
        history = history.includes(condition)
          ? history.filter((item) => item !== condition)
          : [...history, condition];
      }

      const hasOther = history.includes("Other");

      return {
        ...prev,
        medicalHistory: history,
        hasOtherCondition: hasOther,
        otherCondition: hasOther ? prev.otherCondition : "",
      };
    });
  };

  const validate = () => {
    const e = {};
    const age = Number(ageFromDob(form.dob));
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!form.name.trim()) e.name = "Full name is required";
    else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) e.name = "Only letters allowed";
    else if (form.name.trim().length < 3) e.name = "Minimum 3 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Enter valid email";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      e.phone = "Enter valid 10-digit mobile number";
    }

    if (!["male", "female", "other"].includes(form.gender)) {
      e.gender = "Select gender";
    }

    if (!form.dob || !Number.isInteger(age) || age < 0 || age > 120) {
      e.dob = "Enter valid DOB";
    }

    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim() || form.city === "Please Choose City") {
  e.city = "Please select a valid city";
}
    if (!form.state.trim()) e.state = "State is required";

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      e.pincode = "Enter valid 6-digit pincode";
    }

    if (form.bloodGroup && !BLOOD_GROUPS.includes(form.bloodGroup)) {
      e.bloodGroup = "Invalid blood group";
    }

    if (form.height && (!Number.isFinite(height) || height < 30 || height > 250)) {
      e.height = "Height must be 30–250 cm";
    }

    if (form.weight && (!Number.isFinite(weight) || weight < 1 || weight > 300)) {
      e.weight = "Weight must be 1–300 kg";
    }

    if (form.medicalHistory.includes("Other") && !form.otherCondition.trim()) {
      e.otherCondition = "Enter other condition";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveProfile = async () => {
    if (!validate()) {
      toast.warning("Please fix highlighted fields.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
  ...form,
  name: form.name.trim(),
  email: form.email.trim().toLowerCase(),
  phone: form.phone.trim(),
  dob: toDateInputValue(form.dob),
  city: form.city === "Please Choose City" ? "" : form.city.trim(),
  district: form.district.trim(),
  state: form.state.trim(),
  address: form.address.trim(),
  pincode: form.pincode.trim(),
};

      const res = await api.put("/profile/patient", payload);

      if (res.data.success) {
        const updated = normalize(res.data.data);

        setForm(updated);
        setBackup(updated);
        setEdit(false);

        const storedUser = JSON.parse(localStorage.getItem("user") || "null");

        if (storedUser) {
          const nextUser = {
            ...storedUser,
            name: updated.name,
            email: updated.email,
          };

          localStorage.setItem("user", JSON.stringify(nextUser));
          setUser?.(nextUser);
        }

        toast.success("Profile updated successfully.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setForm(backup);
    setErrors({});
    setEdit(false);
  };

  const personalFields = [
    { name: "name", label: "Full Name", span: 2 },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        ["", "Select Gender"],
        ["male", "Male"],
        ["female", "Female"],
        ["other", "Other"],
      ],
    },
    { name: "email", label: "Email", type: "email" },
    {
      name: "phone",
      label: "Mobile Number",
      maxLength: 10,
      clean: (v) => v.replace(/\D/g, "").slice(0, 10),
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "age", label: "Age", type: "number", disabled: true },
  ];

  const addressFields = [
    { name: "address", label: "Address", span: 2 },
    { name: "city", label: "City" },
    { name: "district", label: "District" },
    { name: "state", label: "State" },
    {
      name: "pincode",
      label: "Pincode",
      maxLength: 6,
      clean: (v) => v.replace(/\D/g, "").slice(0, 6),
    },
    { name: "country", label: "Country" },
  ];

  const physicalFields = [
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      options: [["", "Select Blood Group"], ...BLOOD_GROUPS.map((g) => [g, g])],
    },
    { name: "height", label: "Height (cm)", type: "number", min: 30, max: 250 },
    { name: "weight", label: "Weight (kg)", type: "number", min: 1, max: 300 },
  ];

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.loadingCard}>
          <div style={S.loaderIcon}>👤</div>
          <h2 style={S.h1}>Loading Patient Profile</h2>
          <p style={S.sub}>Please wait while we fetch your saved details.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <aside style={S.sidebar}>
        <div style={S.sideCard}>
          <div style={S.avatar}>{form.name ? form.name[0].toUpperCase() : "P"}</div>
          <h2 style={S.sideName}>{form.name || "Patient"}</h2>
          <p style={S.sideMuted}>{form.email || "patient@callmedex.com"}</p>

          <div style={S.progressShell}>
            <div style={{ ...S.progressFill, width: `${completion}%` }} />
          </div>

          <p style={S.progressText}>{completion}% profile completed</p>

          <Info label="Patient ID" value={form.id || "After verification"} />
          <Info label="Role" value="Patient" />
          <Info label="Status" value={form.registrationStatus || "Verified"} />
        </div>

        <div style={{ ...S.sideCard, borderLeft: "4px solid #e63946" }}>
          <div style={S.quoteIcon}>❤️</div>
          <p style={S.quote}>
            Keep your profile updated so bookings, medicine delivery, and home
            services use the right details.
          </p>
          <p style={S.quoteBy}>— CallMedex Care Team</p>
        </div>
      </aside>

      <main style={S.main}>
        <header style={S.header}>
          <div>
            <p style={S.eyebrow}>PATIENT INTERFACE</p>
            <h1 style={S.mainTitle}>My Health Profile</h1>
            <p style={S.sub}>
              Review your registration and health details. Click edit only when
              you want to make changes.
            </p>
          </div>

          <ActionButtons
            edit={edit}
            saving={saving}
            onEdit={() => setEdit(true)}
            onCancel={cancelEdit}
            onSave={saveProfile}
          />
        </header>

        <Section number="1" title="Personal Information" sub="Basic account and identity details">
          <FieldGrid fields={personalFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={3} />
        </Section>

        <Section number="2" title="Address Information" sub="Used for bookings and deliveries" color="#7c3aed">
          <FieldGrid fields={addressFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={2} />
        </Section>

        <Section number="3" title="Physical Information" sub="Health parameters used for better care" color="#0ea5e9">
          <FieldGrid fields={physicalFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={3} />
        </Section>

        <Section number="4" title="Medical History" sub="Select known conditions for safer support" color="#f59e0b">
          <div style={S.pillWrap}>
            {CONDITIONS.map((condition) => {
              const active = form.medicalHistory.includes(condition);

              return (
                <button
                  key={condition}
                  type="button"
                  disabled={readOnly}
                  onClick={() => toggleCondition(condition)}
                  style={{
                    ...S.pill,
                    ...(active ? S.pillActive : {}),
                    ...(readOnly ? S.pillDisabled : {}),
                  }}
                >
                  {condition}
                </button>
              );
            })}
          </div>

          {form.medicalHistory.includes("Other") && (
            <TextArea
              label="Other Medical Condition"
              value={form.otherCondition}
              disabled={readOnly}
              error={errors.otherCondition}
              onChange={(v) => setField("otherCondition", v)}
            />
          )}
        </Section>

        <div style={S.bottomActions}>
          <ActionButtons
            edit={edit}
            saving={saving}
            large
            onEdit={() => setEdit(true)}
            onCancel={cancelEdit}
            onSave={saveProfile}
          />
        </div>
      </main>
    </div>
  );
}

function FieldGrid({ fields, form, errors, readOnly, setField, columns }) {
  return (
    <div style={columns === 3 ? S.grid3 : S.grid2}>
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={form[field.name]}
          error={errors[field.name]}
          readOnly={readOnly}
          setField={setField}
        />
      ))}
    </div>
  );
}

function Field({ field, value, error, readOnly, setField }) {
  const disabled = readOnly || field.disabled;

  const handleChange = (v) => {
    const cleaned = field.clean ? field.clean(v) : v;
    setField(field.name, cleaned);
  };

  return (
    <div style={field.span ? { gridColumn: `span ${field.span}` } : {}}>
      <label style={S.label}>{field.label}</label>

      {field.type === "select" ? (
        <select
          value={value || ""}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...S.input, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
        >
          {field.options.map(([val, label]) => (
            <option key={val || label} value={val}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type || "text"}
          value={value || ""}
          disabled={disabled}
          min={field.min}
          max={field.max}
          maxLength={field.maxLength}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...S.input, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
        />
      )}

      {error && <p style={S.error}>⚠ {error}</p>}
    </div>
  );
}

function Section({ number, title, sub, color = "#22c1c3", children }) {
  return (
    <section style={S.section}>
      <div style={S.sectionHead}>
        <div style={{ ...S.badge, background: color }}>{number}</div>
        <div>
          <h2 style={S.sectionTitle}>{title}</h2>
          <p style={S.sectionSub}>{sub}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div style={S.infoItem}>
      <span style={S.infoLabel}>{label}</span>
      <strong style={S.infoValue}>{value}</strong>
    </div>
  );
}

function TextArea({ label, value, onChange, disabled, error }) {
  return (
    <div style={{ marginTop: 18 }}>
      <label style={S.label}>{label}</label>
      <textarea
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ ...S.textarea, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
      />
      {error && <p style={S.error}>⚠ {error}</p>}
    </div>
  );
}

function ActionButtons({ edit, saving, large, onEdit, onCancel, onSave }) {
  if (!edit) {
    return (
      <button style={large ? S.confirmBtn : S.editBtnTop} onClick={onEdit}>
        ✏️ Edit Profile
      </button>
    );
  }

  return (
    <div style={S.topActions}>
      <button style={large ? S.cancelBtnLarge : S.cancelBtn} onClick={onCancel} disabled={saving}>
        Cancel
      </button>

      <button style={large ? S.confirmBtn : S.saveBtn} onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

const S = {
  page: {
    display: "flex",
    gap: 20,
    padding: "100px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  sidebar: { width: 280, flexShrink: 0 },
  main: { flex: 1, minWidth: 0 },
  sideCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 16,
    border: "1px solid #edf2f7",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#0f4676,#22c1c3)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 800,
    marginBottom: 14,
  },
  sideName: { margin: "0 0 4px", color: "#0A2540", fontSize: 20, fontWeight: 800 },
  sideMuted: { margin: 0, color: "#64748b", fontSize: 13, wordBreak: "break-word" },
  progressShell: {
    width: "100%",
    height: 8,
    background: "#e8edf2",
    borderRadius: 999,
    marginTop: 18,
    overflow: "hidden",
  },
  progressFill: { height: "100%", background: "#22c1c3", borderRadius: 999 },
  progressText: { margin: "8px 0 18px", fontSize: 12, color: "#64748b", fontWeight: 700 },
  infoItem: {
    padding: "10px 12px",
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #edf2f7",
    marginBottom: 10,
  },
  infoLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: { color: "#0A2540", fontSize: 13 },
  quoteIcon: { fontSize: 24, marginBottom: 8 },
  quote: { margin: "0 0 8px", color: "#64748b", lineHeight: 1.6, fontSize: 13, fontStyle: "italic" },
  quoteBy: { margin: 0, color: "#e63946", fontWeight: 800, fontSize: 12 },
  header: {
    background: "#fff",
    borderRadius: 20,
    padding: "24px 26px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 18,
    border: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  eyebrow: { margin: "0 0 6px", color: "#22c1c3", fontWeight: 800, fontSize: 12, letterSpacing: 1 },
  mainTitle: { margin: 0, color: "#0A2540", fontSize: 28, fontWeight: 800 },
  sub: { margin: "5px 0 0", color: "#64748b", fontSize: 14, lineHeight: 1.6 },
  section: {
    background: "#fff",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  sectionHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    flexShrink: 0,
  },
  sectionTitle: { margin: 0, color: "#0A2540", fontSize: 18, fontWeight: 800 },
  sectionSub: { margin: "2px 0 0", color: "#94a3b8", fontSize: 13 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
  label: {
    display: "block",
    marginBottom: 6,
    color: "#64748b",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    background: "#f8fafc",
    color: "#0A2540",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    border: "1.5px solid #e8edf2",
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    resize: "vertical",
    background: "#f8fafc",
    color: "#0A2540",
  },
  disabledInput: { cursor: "not-allowed", opacity: 0.9 },
  inputError: { borderColor: "#e63946", background: "#fff7f7" },
  error: { margin: "4px 0 0", color: "#e63946", fontSize: 11, fontWeight: 700 },
  pillWrap: { display: "flex", flexWrap: "wrap", gap: 10 },
  pill: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1.5px solid #dbe4ee",
    background: "#f8fafc",
    color: "#334155",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
  pillActive: { background: "#0f4676", color: "#fff", borderColor: "#0f4676" },
  pillDisabled: { cursor: "not-allowed" },
  topActions: { display: "flex", gap: 10 },
  editBtnTop: {
    border: "none",
    background: "#0f4676",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  saveBtn: {
    border: "none",
    background: "#10b981",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  cancelBtn: {
    border: "1.5px solid #dbe4ee",
    background: "#fff",
    color: "#334155",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  bottomActions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 4 },
  confirmBtn: {
    padding: "13px 28px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  cancelBtnLarge: {
    padding: "13px 28px",
    background: "#fff",
    color: "#334155",
    border: "1.5px solid #dbe4ee",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  loadingCard: {
    maxWidth: 520,
    margin: "120px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  loaderIcon: { fontSize: 42, marginBottom: 12 },
  h1: { margin: 0, color: "#0A2540", fontSize: 24 },
};

===============================
FILE: client\src\components\register\RegisterSection.jsx
===============================

import { STEP_LABELS, REGISTER_PERKS, BLOOD_GROUPS, STATES, SITE } from "../../data/siteData";
import { Field, FieldRow } from "../shared/ui";

function Stepper({ step }) {
  return (
    <div className="stepper">
      {STEP_LABELS.map((lbl, i) => (
        <div key={i} className={`sstep${step === i + 1 ? " active" : step > i + 1 ? " done" : ""}`}>
          <div className="scir">{step > i + 1 ? "✓" : i + 1}</div>
          <div className="slbl">{lbl}</div>
        </div>
      ))}
    </div>
  );
}

function Step1({ onBack, onNext }) {
  return (
    <>
      <FieldRow>
        <Field label="First Name"><input placeholder="Raju" /></Field>
        <Field label="Last Name"><input placeholder="Kumar" /></Field>
      </FieldRow>
      <Field label="Email Address"><input type="email" placeholder="raju@example.com" /></Field>
      <FieldRow>
        <Field label="Phone"><input placeholder="+91 98765 43210" /></Field>
        <Field label="Date of Birth"><input type="date" /></Field>
      </FieldRow>
      <FieldRow>
        <Field label="Gender">
          <select><option>Select</option><option>Male</option><option>Female</option><option>Other</option></select>
        </Field>
        <Field label="Password"><input type="password" placeholder="Min 8 characters" /></Field>
      </FieldRow>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step2({ onBack, onNext }) {
  return (
    <>
      <FieldRow>
        <Field label="Blood Group">
          <select><option>Select</option>{BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}</select>
        </Field>
        <Field label="Height (cm)"><input type="number" placeholder="170" /></Field>
      </FieldRow>
      <FieldRow>
        <Field label="Weight (kg)"><input type="number" placeholder="70" /></Field>
        <Field label="Medical Conditions"><input placeholder="Diabetes, BP..." /></Field>
      </FieldRow>
      <Field label="Current Medications"><input placeholder="Metformin 500mg..." /></Field>
      <Field label="Allergies"><input placeholder="Penicillin, peanuts..." /></Field>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step3({ onBack, onNext }) {
  return (
    <>
      <Field label="City"><input placeholder="Visakhapatnam" /></Field>
      <Field label="Full Address"><input placeholder="Flat no, Street, Area" /></Field>
      <FieldRow>
        <Field label="State">
          <select>{STATES.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
        <Field label="PIN Code"><input placeholder="530001" /></Field>
      </FieldRow>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue →</button>
      </div>
    </>
  );
}

function Step4({ onBack, onVerify }) {
  return (
    <>
      <p style={{ textAlign: "center", color: "var(--c8)", marginBottom: ".5rem", fontSize: ".88rem" }}>
        Enter the 4-digit OTP sent to your mobile
      </p>
      <div className="otp-row">
        {[0, 1, 2, 3].map((i) => <input key={i} className="otp-inp" maxLength={1} />)}
      </div>
      <p style={{ textAlign: "center", fontSize: ".78rem", color: "var(--c8)", marginBottom: "1rem" }}>
        Didn't receive?{" "}
        <span style={{ color: "var(--c2)", cursor: "pointer", fontWeight: 700 }}>Resend OTP</span>
      </p>
      <div className="form-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onVerify}>✅ Verify &amp; Create Account</button>
      </div>
    </>
  );
}

export default function RegisterSection({ step, setStep, setPage }) {
  const goHome = () => setPage("home");

  if (step === 0) {
    return (
      <section className="reg-sec">
        <div className="reg-box">
          <div className="success">
            <div className="success-ico">🎉</div>
            <div className="success-h">Welcome to CallMedex!</div>
            <p style={{ color: "var(--c8)", marginBottom: "1.75rem" }}>
              Your account has been created. A confirmation has been sent to your registered mobile number.
            </p>
            <button className="btn btn-primary btn-lg" onClick={goHome}>Go to Dashboard →</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reg-sec">
      <div className="reg-box">
        <div className="sec-head">
          <div className="sec-eyebrow">🔐 Join CallMedex</div>
          <h2 className="sec-title">Create Your Health Account</h2>
          <p className="sec-sub">Set up your complete health profile in under 3 minutes</p>
        </div>
        <div className="reg-grid">
          <div className="reg-left">
            <div style={{ fontSize: "2.8rem", marginBottom: ".75rem" }}>🏥</div>
            <h2>Your Health,<br /><span style={{ color: "var(--c2)" }}>Smarter.</span></h2>
            <p>Join CallMedex and experience the future of personalized, AI-powered healthcare management.</p>
            <div className="reg-perks">
              {REGISTER_PERKS.map(({ ico, text }) => (
                <div className="perk" key={text}><span className="perk-ico">{ico}</span>{text}</div>
              ))}
            </div>
          </div>
          <div className="form-card">
            <Stepper step={step} />
            {step === 1 && <Step1 onBack={goHome}           onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <Step3 onBack={() => setStep(2)} onNext={() => setStep(4)} />}
            {step === 4 && <Step4 onBack={() => setStep(3)} onVerify={() => setStep(0)} />}
          </div>
        </div>
      </div>
    </section>
  );
}

===============================
FILE: client\src\components\shared\ui.jsx
===============================

/* shared/ui.jsx — Reusable presentational atoms */

/** Section heading with eyebrow + title + sub-text */
export function SectionHeader({ eyebrow, title, sub, align = "center" }) {
  return (
    <div className="sec-head" style={align !== "center" ? { textAlign: align } : {}}>
      <div className="sec-eyebrow">{eyebrow}</div>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

/** Labelled form field wrapping an <input> or <select> */
export function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

/** Two-column field grid */
export function FieldRow({ children }) {
  return <div className="field-row">{children}</div>;
}

/** Chevron-down SVG icon */
export function ChevDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

===============================
FILE: client\src\components\walkinclinic\walkInClinic.api.js
===============================

import { api } from "../../shared/api";

export const bookWalkInClinicAppointment = async (payload) => {
  const response = await api.post("/clinic/book", payload);
  return response.data;
};

===============================
FILE: client\src\components\walkinclinic\WalkInClinic.jsx
===============================

import React, { useState } from "react";
import { bookWalkInClinicAppointment } from "./walkInClinic.api";

import {
  cardStyle,
  inputStyle,
  pageStyle,
  buttonStyle,
} from "./walkInClinicStyles";

import {
  BRANCHES,
  TIME_SLOTS,
  CONSULTATION_FEE,
} from "./walkInClinicConstants";

const sectionHeader = (number, title, subtitle, color) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
      }}
    >
      {number}
    </div>

    <div>
      <div
        style={{
          fontWeight: "700",
          fontSize: "28px",
          color: "#0f2744",
        }}
      >
        {title}
      </div>

      <div style={{ color: "#94a3b8" }}>{subtitle}</div>
    </div>
  </div>
);

const WalkInClinic = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const consultationFee = CONSULTATION_FEE;
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (
      !patient.name ||
      !patient.age ||
      !patient.gender ||
      !patient.mobile ||
      !patient.email ||
      !patient.address ||
      !branch ||
      !date ||
      !slot
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(patient.age) <= 0) {
      alert("Age must be greater than 0");
      return;
    }

    const payload = {
      patient_name: patient.name,
      patient_age: Number(patient.age),
      patient_gender: patient.gender.toLowerCase(),
      patient_mobile: patient.mobile,
      patient_email: patient.email,
      patient_address: patient.address,
      clinic_branch: branch,
      appointment_date: date,
      time_slot: slot,
      consultation_fee: consultationFee,
    };

    try {
      setLoading(true);

      const result = await bookWalkInClinicAppointment(payload);

      console.log("Walk-in clinic booking saved:", result);

      setReceiptId(result?.data?.receiptId || "");
      setConfirmed(true);
    } catch (error) {
      console.error("Walk-in clinic booking error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#16a34a" }}>✅ Appointment Confirmed</h1>

        <hr />

        {receiptId && (
          <p>
            <strong>Receipt ID:</strong> {receiptId}
          </p>
        )}

        <p>
          <strong>Patient:</strong> {patient.name}
        </p>

        <p>
          <strong>Branch:</strong> {branch}
        </p>

        <p>
          <strong>Date:</strong> {date}
        </p>

        <p>
          <strong>Time:</strong> {slot}
        </p>

        <p>
          <strong>Consultation Fee:</strong> ₹{consultationFee}
        </p>

        <button
          onClick={() => window.print()}
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Download Appointment Slip
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: 30 }}>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#0f2744",
            marginBottom: "8px",
          }}
        >
          🏥 Walk-In Clinic Appointment
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          Complete all sections to confirm your clinic appointment
        </p>
      </div>

      <div style={cardStyle}>
        {sectionHeader(
          1,
          "Patient Information",
          "Personal & contact details",
          "#14b8a6"
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Full Name"
            value={patient.name}
            onChange={(e) =>
              setPatient({
                ...patient,
                name: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="1"
            style={inputStyle}
            placeholder="Age"
            value={patient.age}
            onChange={(e) =>
              setPatient({
                ...patient,
                age: e.target.value,
              })
            }
          />

          <select
            style={inputStyle}
            value={patient.gender}
            onChange={(e) =>
              setPatient({
                ...patient,
                gender: e.target.value,
              })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            style={inputStyle}
            placeholder="Mobile Number"
            value={patient.mobile}
            onChange={(e) =>
              setPatient({
                ...patient,
                mobile: e.target.value,
              })
            }
          />

          <input
            style={inputStyle}
            placeholder="Email"
            value={patient.email}
            onChange={(e) =>
              setPatient({
                ...patient,
                email: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            style={inputStyle}
            placeholder="Address"
            value={patient.address}
            onChange={(e) =>
              setPatient({
                ...patient,
                address: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div style={cardStyle}>
        {sectionHeader(
          2,
          "Select Clinic Branch",
          "Choose your preferred clinic",
          "#7c3aed"
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "15px",
          }}
        >
          {BRANCHES.map((b) => (
            <div
              key={b}
              onClick={() => setBranch(b)}
              style={{
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "18px",
                border:
                  branch === b
                    ? "2px solid #2563eb"
                    : "1px solid #dbe4ee",
                background: branch === b ? "#eff6ff" : "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "10px",
                }}
              >
                🏥
              </div>

              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                {b}
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  marginTop: "6px",
                }}
              >
                Clinic Branch
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        {sectionHeader(
          3,
          "Date & Time Slot",
          "Pick your preferred appointment",
          "#0ea5e9"
        )}

        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {TIME_SLOTS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSlot(s)}
              style={{
                padding: "16px",
                borderRadius: "14px",
                cursor: "pointer",
                border:
                  slot === s
                    ? "2px solid #2563eb"
                    : "1px solid #dbe4ee",
                background: slot === s ? "#ecfeff" : "#fff",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        {sectionHeader(
          4,
          "Appointment Summary",
          "Review your appointment",
          "#10b981"
        )}

        <p>
          <strong>Patient:</strong> {patient.name || "-"}
        </p>

        <p>
          <strong>Branch:</strong> {branch || "-"}
        </p>

        <p>
          <strong>Date:</strong> {date || "-"}
        </p>

        <p>
          <strong>Time:</strong> {slot || "-"}
        </p>

        <p>
          <strong>Consultation Fee:</strong> ₹{consultationFee}
        </p>
      </div>

      <button onClick={handleSubmit} style={buttonStyle} disabled={loading}>
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </div>
  );
};

export default WalkInClinic;

===============================
FILE: client\src\components\walkinclinic\walkInClinicConstants.js
===============================

export const BRANCHES = [
  "Akkayapalem",
  "KGH",
  "Madhurawada",
];

export const TIME_SLOTS = [
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 1 PM",
  "2 PM - 3 PM",
  "3 PM - 4 PM",
];

export const CONSULTATION_FEE = 700;

===============================
FILE: client\src\components\walkinclinic\walkInClinicStyles.js
===============================

export const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "20px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

export const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #dbe4ee",
  fontSize: "15px",
  boxSizing: "border-box",
};

export const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

export const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
};

===============================
FILE: client\src\data\siteData.js
===============================

/* ─────────────────────────────────────────────────────────
   siteData.js  —  All content & config for CallMedex
   Update here; UI picks up changes automatically.
───────────────────────────────────────────────────────── */

export const SITE = {
  name: "callmedex",
  tagline: "Vizag's #1 Healthcare Platform",
  founded: 2022,
  logo: "https://callmedex.com/admin/upload/CM LOGO.jpeg",
  baseUrl: "https://callmedex.com",
  patientPortal: "https://app.myhospitalsoftware.com/patient_login/?org_id=202",
  emergency: { label: "Emergency", tel: "+918074677177", display: "+91 80746 77177" },
  ambulance: { label: "Ambulance", tel: "108", display: "108" },
  bloodBank: { label: "Blood Bank", tel: "+918912220000", display: "+91-891-2220000" },
  copyright: `© 2026 CallMedex. All rights reserved. Developed for healthier lives in Andhra Pradesh.`,
  social: [
    { icon: "📘", href: "https://www.facebook.com/share/17yB7c8Y8b/", label: "Facebook" },
    { icon: "📸", href: "https://www.instagram.com/callmedex229/", label: "Instagram" },
    { icon: "🐦", href: "https://x.com/callmedex229", label: "Twitter" },
    { icon: "💬", href: "https://wa.me/+918074677177", label: "WhatsApp" },
    { icon: "▶️", href: "https://www.youtube.com/channel/UC1XDnH_Pzrr-ArkwOIzaGmQ", label: "YouTube" },
  ],
};

export const NAV = [
  {
    label: "About",
    items: [
      { ico: "ℹ️", text: "About Us",  page: "about" },
      { ico: "🖼️", text: "Gallery", href: "https://callmedex.com/gallery.php" },
    ],
  },
  { label: "Health Packages", scroll: "health-packages", solo: true },
  {
    label: "Diagnostics",
    items: [
       {
  ico: "🏠",
  text: "Home Services",
  page: "homeservices"
},
      { ico: "🩻", text: "Scans / Radiology", page: "bodydiagnostics" },
      { ico: "❤️", text: "Cardiology", page: "cardiology" },
      { ico: "🚶", text: "Walk-in Centers",  page: "diagnostic-walkin-centers"},
    ],
  },
  {
    label: "Consultation",
    items: [
      { ico: "🖥️", text: "Tele Consultation", page: "tele-consultation"},
      {ico: "🚶‍♂️🏥", text: "Walk-in Clinics", page: "walkin-clinic"},
      { ico: "🌏", text: "NRI Tele Consultation", href: "https://callmedex.com/consultation.php?service=nri-teleconsultation" },
      { ico: "🏡", text: "Consultation at Home", page: "consultancy-home" },
    ],
  },
      {
      label: "Pharmacy",
      items: [
        { ico: "🚚", text: "Home Delivery", page: "pharmacy-home-delivery" },
      ],
    },
      { label: "Blog", page: "blog", solo: true },
];

export const LOGINS = [
  { ico: "🤒", bg: "#EEF6FF", label: "Patient Login" },
  { ico: "👨‍⚕️", bg: "#F0FAFB", label: "Doctor Login" },
  { ico: "⚙️", bg: "#EEF6FF", label: "Admin Login" },
  { ico: "🩺", bg: "#FFF8EE", label: "Phlebo Login" },
  { ico: "🔬", bg: "#F5F0FF", label: "Lab Technician" },
  { ico: "💊", bg: "#EEFBF4", label: "Pharmacy Login" },
];

export const HERO_STATS = [
  { num: "10K+", label: "Patients Served" },
  { num: "250+", label: "Doctors" },
  { num: "98%",  label: "Satisfaction" },
  { num: "24/7", label: "Emergency" },
];

export const VITALS = [
  { value: "72 BPM", label: "❤️ Heart Rate", color: "#E63946" },
  { value: "98% SpO₂", label: "🫁 Oxygen",    color: "#00B4D8" },
  { value: "120/80", label: "💉 BP",          color: "#1B6CA8" },
  { value: "36.8°C", label: "🌡️ Temp",       color: "#f59e0b" },
];

export const SEARCH_TABS = [
  "👨‍⚕️ Doctors", "🏥 Hospitals", "🔬 Tests", "💊 Medicines", "🦠 Diseases", "🩺 Specialists",
];

export const ABOUT_CARDS = [
  { ico: "🏥", num: "Est. 2022", lbl: "Serving Vizag since" },
  { ico: "👨‍⚕️", num: "30+ Yrs",  lbl: "Founder's experience" },
  { ico: "🌍", num: "Underserved", lbl: "Communities focus" },
  { ico: "📋", num: "OP + IP",   lbl: "Complete care system" },
];

export const SPECIALISTS = [
  { ico: "🩺", name: "General Physician", desc: "Primary care" },
  { ico: "❤️", name: "Cardiologist",      desc: "Heart & vascular" },
  { ico: "🧠", name: "Neurologist",       desc: "Brain & nerves" },
  { ico: "🫁", name: "Pulmonologist",     desc: "Lung & respiratory" },
  { ico: "🦴", name: "Orthopedist",       desc: "Bones & joints" },
  { ico: "👶", name: "Gynecologist",      desc: "Women's health" },
  { ico: "🍼", name: "Pediatrician",      desc: "Child healthcare" },
  { ico: "🫀", name: "Nephrologist",      desc: "Kidney specialist" },
  { ico: "👁️", name: "Eye Specialist",   desc: "Vision & eye care" },
  { ico: "🏠", name: "Home Visit",        desc: "Doctor at home" },
  { ico: "📹", name: "Online Consult",    desc: "Video consultation" },
  { ico: "🚑", name: "Emergency Care",    desc: "24/7 emergency" },
  { ico: "🔬", name: "Lab Test",          desc: "Home sample" },
  { ico: "💊", name: "Pharmacy",          desc: "Medicine delivery" },
];

export const PACKAGES = [
  { name: "Basic Screening (Non-Diabetic)",    price: "₹599",   old: "₹1,250", tests: "CBC, FBS, Uric Acid, Creatinine, Total Cholesterol, Total Bilirubin, TSH, CUE" },
  { name: "Basic Screening (Diabetic)",        price: "₹799",   old: "₹1,750", tests: "Basic Screening (Non-Diabetic) + HbA1c" },
  { name: "Full Body Screening (Non-Diabetic)",price: "₹1,099", old: "₹2,100", tests: "CBC, FBS, Uric Acid, Creatinine, Urea, Lipid Profile, LFT, TSH, ECG, CUE" },
  { name: "Full Body Screening (Diabetic)",    price: "₹1,299", old: "₹2,600", tests: "Full Body Screening (Non-Diabetic) + HbA1c" },
  { name: "Anaemia Package",                   price: "₹1,499", old: "₹2,720", tests: "CBP, ESR, Iron, TIBC, Transferrin, % Iron Saturation" },
  { name: "Cardiac Screening Package",         price: "₹1,599", old: "₹2,390", tests: "CBC, Creatinine, ECG, Lipoprotein(a), Apolipoprotein A1/B, CK-MB" },
  { name: "Vitamin Package",                   price: "₹1,300", old: "₹2,600", tests: "Calcium, Vitamin B12 & Vitamin D" },
  { name: "Hormone Package (Female)",          price: "₹2,500", old: "₹4,900", tests: "FSH, Estradiol, TFT, Lipid Profile, Uric Acid, Creatinine, FBS, CBP, Vitamin D & B12" },
  { name: "Hormone Package (Male)",            price: "₹3,425", old: "₹6,850", tests: "FSH, LH, Testosterone, Lipid Profile, CBP, TFT, Creatinine, Uric Acid, FBS, PSA, Vitamin D & B12" },
  { name: "PCOD Panel",                        price: "₹3,800", old: "₹6,890", tests: "Testosterone, Prolactin, TFT, 17-OHP, DHEAS, FBS, Insulin, C Peptide" },
  { name: "Senior Citizen Package (Male)",     price: "₹1,799", old: "₹3,000", tests: "CBP, ESR, FBS, Creatinine, Uric Acid, Electrolytes, Lipid Profile, LFT, PSA, ECG, CUE" },
  { name: "Renal Function Tests (RFT/KFT)",   price: "₹799",   old: "₹1,200", tests: "Complete Blood Count, Serum Creatinine, Blood Urea, BUN, Uric Acid, Calcium, Electrolytes, ECG" },
  { name: "Fever Profile — Basic",             price: "₹899",   old: "₹1,250", tests: "Complete Blood Count, ESR, QBC, Widal, CRP, Urine Routine" },
  { name: "Fever Profile — Complete",          price: "₹1,299", old: "₹2,050", tests: "Complete Blood Count, ESR, QBC, Widal, CRP, Dengue, Urine Routine" },
  { name: "Hepatitis Screening Package",       price: "₹1,600", old: "₹3,510", tests: "HBsAg, Hepatitis A, HCV, Amylase, Lipase" },
];

export const FEATURES = [
  { ico: "🤒", bg: "#EEF6FF", title: "AI Symptom Checker",      desc: "Describe symptoms and get AI-powered analysis with possible conditions and next steps." },
  { ico: "⏰", bg: "#F0FAFB", title: "Smart Medicine Reminder", desc: "Never miss a dose with intelligent reminders across app, SMS, and voice alerts." },
  { ico: "📊", bg: "#EEF6FF", title: "AI Health Risk Prediction",desc: "Predict potential health risks using your vitals history and lifestyle data patterns." },
  { ico: "🎙️", bg: "#F5F0FF", title: "Voice Health Assistant",  desc: "Hands-free health queries powered by natural language AI understanding." },
  { ico: "📡", bg: "#FFF8EE", title: "Remote Health Monitoring", desc: "Continuous tracking of vitals via connected wearables and IoT medical devices." },
  { ico: "📂", bg: "#EEFBF4", title: "Digital Health Records",   desc: "Secure, organized digital storage of all prescriptions, reports, and history." },
  { ico: "🥗", bg: "#EEF6FF", title: "AI Diet Recommendation",  desc: "Personalized meal plans based on health conditions, allergies, and nutritional goals." },
  { ico: "🔬", bg: "#F0FAFB", title: "Smart Lab Report Analyzer",desc: "AI reads your lab reports, explains results, and flags abnormal values instantly." },
  { ico: "🆘", bg: "#FFF0F0", title: "Emergency SOS Alert",     desc: "One-tap emergency alerts to family, doctors, and ambulance services instantly." },
  { ico: "👨‍👩‍👧‍👦", bg: "#FFF8EE", title: "Family Health Dashboard", desc: "Manage health records and appointments for every member of your family in one place." },
];

export const SERVICES = [
  { ico: "📹", title: "Online Consultation",  desc: "Connect with top doctors from home via video, audio, or chat." },
  { ico: "🔬", title: "Diagnostic Services",  desc: "Book home sample collection for 1500+ lab tests with fast digital reports." },
  { ico: "💊", title: "Pharmacy Management", desc: "Order medicines, track deliveries, and set automatic refill reminders." },
  { ico: "🏠", title: "Home Healthcare",      desc: "Nursing, physiotherapy, and medical equipment at your doorstep, 24/7." },
  { ico: "🚑", title: "Ambulance Booking",    desc: "Book BLS/ALS ambulances instantly with real-time GPS tracking." },
  { ico: "🧪", title: "Lab Management",       desc: "Comprehensive LIMS: sample tracking, results, billing, and reporting." },
  { ico: "🩸", title: "Blood Bank Services",  desc: "Find and request blood donors, manage units, and emergency supply chains." },
  { ico: "🤖", title: "AI Report Analysis",   desc: "Upload any medical report and get an AI-powered plain-language explanation." },
  { ico: "📦", title: "Health Packages",      desc: "Comprehensive preventive health checkup packages for individuals and families." },
  { ico: "🛡️", title: "Insurance Support",   desc: "Cashless claims assistance, policy comparison, and insurance benefit management." },
];

export const METRICS = [
  { ico: "🏥", num: "10,000+", lbl: "Patients Served" },
  { ico: "👨‍⚕️", num: "250+",    lbl: "Expert Doctors" },
  { ico: "🌟", num: "98%",     lbl: "Satisfaction Rate" },
  { ico: "🕐", num: "24/7",    lbl: "Emergency Support" },
  { ico: "📋", num: "15,000+", lbl: "Reports Managed" },
];

export const APPT_STEPS = [
  "Search for your required service",
  "Choose a convenient date & time",
  "Confirm your booking & receive reminder",
];

export const APPOINTMENT_SERVICES = [
  "Select a service",
  "Lab Test / Diagnostics",
  "Doctor Consultation",
  "Home Healthcare",
  "Pharmacy",
  "Health Package",
];

export const BRANCHES = [
  { name: "Akkayyapalem Branch", hours: "Mon–Sat: 8 AM – 9 PM",   phone: "+91-891-2225001", services: "Lab · Pharmacy · OPD · Radiology" },
  { name: "KGH Branch",          hours: "Mon–Sun: 24 Hours",       phone: "+91-891-2225002", services: "Emergency · ICU · Blood Bank · Lab" },
  { name: "Madurawada Branch",   hours: "Mon–Sat: 9 AM – 8 PM",   phone: "+91-891-2225003", services: "Diagnostics · Pharmacy · OPD" },
];

export const TESTIMONIALS = [
  {
    stars: 5,
    text: "The AI symptom checker accurately identified my condition before I even visited the doctor. Remote monitoring helped my family track my recovery in real-time. Absolutely brilliant platform!",
    name: "Srinivasa Rao", role: "Heart Patient, Visakhapatnam",
    initials: "SR", bg: "#EEF6FF", color: "#1B6CA8",
  },
  {
    stars: 5,
    text: "Booking lab tests at home was so convenient. The digital reports arrived within hours and the AI explained every value clearly. I no longer dread medical checkups!",
    name: "Padmavathi Lakshmi", role: "Diabetic Care Patient",
    initials: "PL", bg: "#F0FAFB", color: "#00B4D8",
  },
  {
    stars: 5,
    text: "As a working professional, I can consult top doctors during my lunch break via video call. Medicine delivery and reminders have kept me consistent. CallMedex changed my health habits!",
    name: "Kiran Reddy", role: "Software Engineer, Hyderabad",
    initials: "KR", bg: "#F5F0FF", color: "#7C3AED",
  },
];

export const FOOTER_LINKS = {
  Services: ["Online Consultation", "Lab Tests", "Pharmacy", "Home Care", "Ambulance", "AI Reports"],
  "Quick Links": ["Find Doctors", "Book Appointment", "Health Packages", "Insurance", "Blood Bank", "Emergency"],
  Company: [
    { label: "About Us",        href: "https://callmedex.com/about.php" },
    { label: "Gallery",         href: "https://callmedex.com/gallery.php" },
    { label: "Blog",            href: "https://callmedex.com/blog.php" },
    { label: "Privacy Policy",  href: "#" },
    { label: "Terms of Service",href: "#" },
    { label: "Contact Us",      href: "#" },
  ],
};

export const REGISTER_PERKS = [
  { ico: "🤖", text: "AI symptom checking & health prediction" },
  { ico: "📊", text: "Real-time monitoring & digital records" },
  { ico: "👨‍⚕️", text: "Connect with 250+ verified doctors" },
  { ico: "💊", text: "Smart medicine reminders & delivery" },
  { ico: "🔒", text: "256-bit encrypted health data storage" },
  { ico: "👨‍👩‍👧‍👦", text: "Manage records for your entire family" },
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const STATES = ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka"];

export const STEP_LABELS = ["Personal Info", "Health Profile", "Location", "Verify OTP"];

===============================
FILE: client\src\shared\api.js
===============================

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

// Interceptor to attach access token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  const publicRoutes = [
    "/auth/register",
    "/auth/login",
    "/auth/verify-otp",
    "/auth/resend-otp",
    "/profile/onboard",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


===============================
FILE: client\src\shared\toast.js
===============================

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext(null);

const COLORS = {
  success: { bg: "#f0fdf4", border: "#86efac", text: "#15803d" },
  error:   { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c" },
  info:    { bg: "#eff6ff", border: "#93c5fd", text: "#1d4ed8" },
  warning: { bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
};

function SuccessIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#22c55e" }),
    React.createElement("path", { d: "M6 10.5l2.5 2.5 5-5", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  );
}

function ErrorIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#ef4444" }),
    React.createElement("path", { d: "M7 7l6 6M13 7l-6 6", stroke: "#fff", strokeWidth: "1.8", strokeLinecap: "round" })
  );
}

function InfoIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("circle", { cx: 10, cy: 10, r: 10, fill: "#3b82f6" }),
    React.createElement("path", { d: "M10 9v5", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }),
    React.createElement("circle", { cx: 10, cy: 6.5, r: 1, fill: "#fff" })
  );
}

function WarningIcon() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("path", { d: "M10 2L19 18H1L10 2z", fill: "#f59e0b" }),
    React.createElement("path", { d: "M10 8v4", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }),
    React.createElement("circle", { cx: 10, cy: 14.5, r: 1, fill: "#fff" })
  );
}

const ICONS = {
  success: React.createElement(SuccessIcon),
  error:   React.createElement(ErrorIcon),
  info:    React.createElement(InfoIcon),
  warning: React.createElement(WarningIcon),
};

let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 350);
  }, []);

  const toast = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++_id;
      setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = {
    toast,
    success: (msg, dur) => toast(msg, "success", dur),
    error:   (msg, dur) => toast(msg, "error",   dur || 5000),
    info:    (msg, dur) => toast(msg, "info",     dur),
    warning: (msg, dur) => toast(msg, "warning",  dur),
    dismiss,
  };

  // ── Centered at top of page ──────────────────────────────────────
  const containerStyle = {
    position: "fixed",
    top: 24,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 99999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    width: "100%",
    maxWidth: 480,
    pointerEvents: "none",
    padding: "0 16px",
    boxSizing: "border-box",
  };

  const toastNodes = toasts.map((t) => {
    const c = COLORS[t.type] || COLORS.info;

    const toastStyle = {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      background: c.bg,
      border: "1.5px solid " + c.border,
      borderRadius: 16,
      padding: "14px 18px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
      pointerEvents: "all",
      cursor: "default",
      width: "100%",
      boxSizing: "border-box",
      animation: t.exiting
        ? "toast-out 0.32s ease forwards"
        : "toast-in 0.32s ease forwards",
    };

    const textStyle = {
      flex: 1,
      fontSize: 14,
      fontWeight: 600,
      color: c.text,
      lineHeight: 1.5,
      fontFamily: "'Segoe UI', 'Plus Jakarta Sans', sans-serif",
    };

    const btnStyle = {
      flexShrink: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: c.text,
      opacity: 0.5,
      fontSize: 20,
      lineHeight: 1,
      padding: "0 2px",
      marginTop: -2,
      fontWeight: 700,
    };

    return React.createElement(
      "div",
      { key: t.id, style: toastStyle },
      React.createElement("span", { style: { flexShrink: 0, marginTop: 1 } }, ICONS[t.type]),
      React.createElement("span", { style: textStyle }, t.message),
      React.createElement(
        "button",
        { onClick: () => dismiss(t.id), style: btnStyle, "aria-label": "Close" },
        "\u00d7"
      )
    );
  });

  const keyframes = `
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(-24px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)     scale(1);    }
    }
    @keyframes toast-out {
      from { opacity: 1; transform: translateY(0)     scale(1);    }
      to   { opacity: 0; transform: translateY(-24px) scale(0.96); }
    }
  `;

  return React.createElement(
    ToastContext.Provider,
    { value },
    children,
    React.createElement("div", { style: containerStyle }, ...toastNodes),
    React.createElement("style", null, keyframes)
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

===============================
FILE: client\src\styles\App.css
===============================

.cardiology-page{
  width:100%;
  min-height:100vh;
  background:#f4f8fb;
}

.cardio-hero{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:80px 7%;
  gap:60px;
}

.cardio-left{
  flex:1;
}

.cardio-tag{
  display:inline-block;
  background:#ffe5e8;
  color:#e63946;
  padding:10px 22px;
  border-radius:40px;
  font-weight:700;
  font-size:.85rem;
  margin-bottom:2rem;
}

.cardio-left h1{
  font-size:4.5rem;
  line-height:1.1;
  color:#0A2540;
  margin-bottom:1.5rem;
}

.cardio-left h1 span{
  color:#e63946;
  display:block;
}

.cardio-left p{
  font-size:1.15rem;
  line-height:1.9;
  color:#64748b;
  max-width:700px;
  margin-bottom:2.5rem;
}

.cardio-btns{
  display:flex;
  gap:18px;
}

.cardio-primary{
  background:#e63946;
  color:white;
  border:none;
  padding:16px 28px;
  border-radius:16px;
  font-weight:700;
  cursor:pointer;
}

.cardio-secondary{
  background:white;
  border:2px solid #dbe4ee;
  padding:16px 28px;
  border-radius:16px;
  font-weight:700;
  cursor:pointer;
}
.booking-page{
  display:flex;
  gap:30px;

  padding:140px 40px 60px;

  background:#f4f8fb;

  min-height:100vh;
}

/* SIDEBAR */

.booking-sidebar{
  width:320px;
  flex-shrink:0;
}

.progress-card,
.branch-card{
  background:white;

  border-radius:28px;

  padding:28px;

  box-shadow:0 10px 30px rgba(0,0,0,.05);

  margin-bottom:24px;
}

.progress-card h3,
.branch-card h3{
  font-size:1rem;

  color:#0A2540;

  margin-bottom:2rem;
}


.progress-wrapper{
  position:relative;
}

.progress-line{
  position:absolute;

  left:18px;
  top:10px;

  width:2px;
  height:82%;

  background:#dbe4ee;
}

.progress-step{
  position:relative;

  display:flex;
  gap:18px;

  margin-bottom:32px;

  align-items:flex-start;
}

.step-circle{
  width:38px;
  height:38px;

  border-radius:50%;

  background:#21c087;

  color:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-weight:700;

  z-index:2;

  box-shadow:
  0 6px 18px rgba(33,192,135,.3);
}

.step-content h4{
  color:#0A2540;

  margin-bottom:4px;

  font-size:1.05rem;
}

.step-content p{
  color:#94a3b8;

  font-size:.95rem;
}

 



/* MAIN */

.booking-main{
  flex:1;
}

.booking-header{
  margin-bottom:2rem;
}

.booking-header h1{
  font-size:3rem;
  color:#0A2540;

  margin-bottom:10px;
}

.booking-header p{
  color:#64748b;
}

/* SECTION */

.booking-section{
  background:white;

  border-radius:28px;

  padding:32px;

  margin-bottom:28px;

  box-shadow:0 10px 30px rgba(0,0,0,.05);
}

.section-header{
  display:flex;
  align-items:center;

  gap:18px;

  margin-bottom:2rem;
}

.section-header span{
  width:42px;
  height:42px;

  border-radius:12px;

  background:#22c1c3;

  color:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-weight:700;
}

.section-header h2{
  color:#0A2540;
  margin-bottom:4px;
}

.section-header p{
  color:#64748b;
}

/* FORMS */

.form-grid{
  display:grid;

  grid-template-columns:
  repeat(auto-fit,minmax(220px,1fr));

  gap:18px;
}

.form-grid input,
.form-grid select,
.address-box{
  width:100%;

  padding:16px;

  border:none;

  background:#f3f6f9;

  border-radius:16px;

  font-size:1rem;

  outline:none;
}

.address-box{
  min-height:120px;

  margin-top:18px;

  resize:none;
}

/* SCANS */

.scan-grid{
  display:grid;

  grid-template-columns:
  repeat(auto-fit,minmax(260px,1fr));

  gap:24px;
}

.scan-card{
  background:#f8fbfd;

  border:2px solid transparent;

  border-radius:24px;

  padding:24px;

  cursor:pointer;

  transition:.3s ease;
}

.scan-card:hover{
  transform:translateY(-4px);
}

.scan-card.selected{
  border-color:#22c1c3;

  background:#ecfcfc;
}

.scan-icon{
  width:64px;
  height:64px;

  border-radius:18px;

  background:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:2rem;

  margin-bottom:1rem;
}

.scan-card h3{
  font-size:1.5rem;

  color:#0A2540;

  margin-bottom:6px;
}

.scan-card p{
  color:#64748b;

  margin-bottom:1rem;
}

.price-row{
  display:flex;
  align-items:center;

  gap:12px;
}

.price{
  font-size:1.3rem;
  font-weight:700;

  color:#0A2540;
}

.old-price{
  color:#94a3b8;

  text-decoration:line-through;
}

/* BRANCHES */

.branch-item{
  padding:16px 0;

  border-bottom:1px solid #edf2f7;
}

.branch-item strong{
  color:#0A2540;

  display:block;

  margin-bottom:6px;
}

.branch-item p{
  color:#94a3b8;

  font-size:.92rem;

  line-height:1.5;
}

/* MOBILE */

@media(max-width:1100px){

  .booking-page{
    flex-direction:column;
  }

  .booking-sidebar{
    width:100%;
  }

}

@media(max-width:768px){

  .booking-page{
    padding:120px 16px 40px;
  }

  .booking-header h1{
    font-size:2rem;
  }

}
/* DATE */

.date-box label,
.slot-section label{
  display:block;

  margin-bottom:12px;

  font-weight:700;

  color:#0A2540;
}

.date-box input{
  width:100%;

  padding:18px;

  border:none;

  border-radius:18px;

  background:#f3f6f9;

  margin-bottom:2rem;
}

/* SLOT */

.slot-grid{
  display:grid;

  grid-template-columns:
  repeat(auto-fit,minmax(180px,1fr));

  gap:18px;
}

.slot-card{
  background:#f3f6f9;

  padding:18px;

  border-radius:18px;

  text-align:center;

  cursor:pointer;

  font-weight:700;

  transition:.3s;
}

.slot-card:hover{
  background:#e8fbfb;
}

.active-slot{
  background:#22c1c3;

  color:white;
}

/* UPLOAD */

.upload-box{
  display:block;

  border:2px dashed #cbd5e1;

  border-radius:24px;

  padding:60px 20px;

  cursor:pointer;

  text-align:center;

  background:#f8fafc;
}

.upload-content h3{
  margin:1rem 0 .5rem;

  color:#0A2540;
}

.upload-content p{
  color:#64748b;
}

.upload-icon{
  font-size:3rem;
}

.file-name{
  display:block;

  margin-top:1rem;

  color:#22c1c3;

  font-weight:700;
}

/* SUMMARY */

.summary-box{
  background:#f8fafc;

  border-radius:20px;

  padding:24px;
}

.summary-row,
.summary-total{
  display:flex;

  justify-content:space-between;

  padding:14px 0;
}

.summary-total{
  margin-top:1rem;

  border-top:2px solid #dbe4ee;

  font-size:1.2rem;
}

/* BUTTON */

.confirm-btn{
  width:100%;

  border:none;

  background:
  linear-gradient(
    90deg,
    #22c1c3,
    #11998e
  );

  color:white;

  padding:22px;

  border-radius:24px;

  font-size:1.2rem;

  font-weight:700;

  cursor:pointer;

  margin-top:1rem;

  transition:.3s;
}

.confirm-btn:hover{
  transform:translateY(-2px);
}

.quote-card{
  position:relative;

  overflow:hidden;

  background:
  linear-gradient(
    135deg,
    #17345f,
    #0f2947
  );

  color:white;

  border-radius:28px;

  padding:32px;

  margin-bottom:24px;
}

.quote-card::before{
  content:"";

  position:absolute;

  top:-50px;
  right:-50px;

  width:180px;
  height:180px;

  border-radius:50%;

  background:
  rgba(0,255,255,.06);
}

.quote-icon{
  width:70px;
  height:70px;

  border-radius:20px;

  background:
  rgba(0,255,255,.08);

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:2rem;

  margin-bottom:1.5rem;
}

.quote-mark{
  font-size:3rem;

  color:#22c1c3;

  line-height:1;

  margin-bottom:1rem;
}

.quote-card p{
  line-height:1.9;

  font-size:1.05rem;

  margin-bottom:1.5rem;

  color:#e2e8f0;
}

.quote-card h4{
  color:#dbeafe;

  font-size:1rem;
}

===============================
FILE: client\src\styles\globalStyles.js
===============================

/* globalStyles.js — inject once via <style>{GLOBAL_CSS}</style> in App root */

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

:root {
  --c1:#0A2540;--c2:#1B6CA8;--c3:#00B4D8;--c4:#E63946;--c5:#F8FAFC;
  --c6:#F1F5F9;--c7:#E2E8F0;--c8:#94A3B8;--c9:#334155;--white:#fff;
  --font:'Plus Jakarta Sans',sans-serif;--serif:'Fraunces',serif;
  --r:14px;--r2:20px;--r3:32px;
  --sh:0 4px 24px rgba(10,37,64,.08);--sh2:0 12px 48px rgba(10,37,64,.14);
  --sh3:0 2px 8px rgba(10,37,64,.06);
  --tr:.22s cubic-bezier(.4,0,.2,1);
}

*{box-sizing:border-box;margin:0;padding:0;}
html,body{width:100%;max-width:100%;overflow-x:hidden;scroll-behavior:smooth;font-size:16px;}
body{font-family:var(--font);background:var(--c5);color:var(--c1);-webkit-font-smoothing:antialiased;}
#root{width:100%;max-width:100%;margin:0;padding:0;}

::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--c3);border-radius:3px;}

/* ── TOPBAR ── */
.topbar{width:100%;background:var(--c1);color:rgba(255,255,255,.82);font-size:.78rem;padding:9px 4rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
.topbar a{color:var(--c3);text-decoration:none;font-weight:600;}
.topbar-left{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
.topbar-right{display:flex;align-items:center;gap:1rem;}
.topbar-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(0,180,216,.18);border:1px solid rgba(0,180,216,.3);color:var(--c3);padding:3px 10px;border-radius:100px;font-size:.72rem;font-weight:700;}

/* ── NAVBAR ── */
.nav-outer{width:100%;position:sticky;top:0;z-index:999;background:rgba(255,255,255,.97);backdrop-filter:blur(18px);border-bottom:1px solid #e8edf3;transition:.3s ease;}
.nav-outer.scrolled{box-shadow:0 8px 30px rgba(0,0,0,0.06);}
.nav-menu{display:flex;align-items:center;gap:2px;flex:1;justify-content:flex-start;margin-left:30px;}
.nav-inner{
  width:100%;
  max-width:1600px;
  margin:auto;
  height:110px;
  padding:0 28px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
}

.nav-logo{
  display:flex;
  align-items:center;
  text-decoration:none !important;
  flex-shrink:0;
}

.nav-logo img{
  height:100px;
  width:auto;
  max-width:320px;
  object-fit:contain;
  display:block;
}

/* keep for safety if some page still uses it */
.nav-logo-text{
  display:none;
}
.nav-item{position:relative;}
.nav-link{border:none;background:none;padding:11px 16px;border-radius:10px;display:flex;align-items:center;gap:6px;font-size:.95rem;font-weight:600;color:#243b53;cursor:pointer;transition:.25s ease;}
.nav-link:hover{background:#f1f5f9;color:#1b6ca8;}
.nav-drop{position:absolute;top:120%;left:50%;transform:translateX(-50%);min-width:240px;background:white;border-radius:18px;border:1px solid #e2e8f0;padding:10px;box-shadow:0 15px 40px rgba(0,0,0,0.08);opacity:0;pointer-events:none;transition:.25s ease;}
.nav-item:hover .nav-drop{opacity:1;pointer-events:auto;top:108%;}
.drop-item{width:100%;border:none;background:white;display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;text-decoration:none;color:#102542;font-weight:500;font-size:.92rem;transition:.2s ease;cursor:pointer;text-align:left;}
.drop-item:hover{background:#f8fafc;color:#1b6ca8;}
.drop-icon{width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#eef6ff;}
.nav-cta{display:flex;align-items:center;gap:14px;flex-shrink:0;}

/* ── BUTTONS ── */
.btn{border:none;cursor:pointer;transition:.25s ease;font-weight:700;display:inline-flex;align-items:center;gap:8px;text-decoration:none;}
.btn-primary{background:#1b6ca8;color:white;padding:13px 24px;border-radius:14px;}
.btn-primary:hover{background:#15598b;transform:translateY(-2px);}
.btn-outline{background:white;color:#1b6ca8;border:2px solid #1b6ca8;padding:13px 24px;border-radius:14px;}
.btn-outline:hover{background:#1b6ca8;color:white;}
.btn-ghost{background:#eef6ff;color:#1b6ca8;padding:13px 24px;border-radius:14px;}
.btn-ghost:hover{background:#dbeafe;}
.btn-red{background:#e63946;color:white;padding:12px 18px;border-radius:12px;}
.btn-red:hover{background:#c92f3c;}
.btn-xl{padding:15px 28px;font-size:.95rem;}
.btn-lg{padding:14px 26px;}
.btn-login{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#374151;font-size:.875rem;font-weight:600;cursor:pointer;transition:.2s;font-family:var(--font);white-space:nowrap;}
.btn-login:hover{border-color:#1b6ca8;color:#1b6ca8;background:#eef6ff;}
.btn-signup{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;border:none;background:#1b6ca8;color:#fff;font-size:.875rem;font-weight:700;cursor:pointer;transition:.2s;font-family:var(--font);}
.btn-signup:hover{background:#15598b;transform:translateY(-1px);}
.btn-book{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;background:#e63946;color:#fff;font-size:.875rem;font-weight:700;cursor:pointer;transition:.2s;font-family:var(--font);text-decoration:none;}
.btn-book:hover{background:#c92f3c;transform:translateY(-1px);}

/* ── LOGIN DROPDOWN ── */
.login-wrap{position:relative;}
.login-drop{position:absolute;top:calc(100% + 10px);right:0;min-width:230px;background:var(--white);border:1px solid var(--c7);border-radius:var(--r2);padding:.6rem;box-shadow:var(--sh2);opacity:0;pointer-events:none;transition:all .2s;z-index:100;transform:translateY(6px);}
.login-wrap:hover .login-drop{opacity:1;pointer-events:all;transform:translateY(0);}
.login-role{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:.84rem;font-weight:600;cursor:pointer;color:var(--c1);transition:all .15s;}
.login-role:hover{background:rgba(27,108,168,.07);color:var(--c2);}
.login-role-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}

/* ── HERO ── */
.hero{width:100%;min-height:90vh;display:flex;align-items:center;padding:5rem 4rem 4rem;position:relative;overflow:hidden;background:linear-gradient(135deg,#EEF6FF 0%,#F0FAFB 60%,#F8FAFC 100%);}
.hero::before{content:'';position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(0,180,216,.08) 0%,transparent 70%);top:-150px;right:-100px;pointer-events:none;}
.hero::after{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(27,108,168,.06) 0%,transparent 70%);bottom:-100px;left:100px;pointer-events:none;}
.hero-grid{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;width:100%;position:relative;z-index:1;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(0,180,216,.12);border:1px solid rgba(0,180,216,.28);color:#0369a1;padding:5px 14px;border-radius:100px;font-size:.76rem;font-weight:700;margin-bottom:1.25rem;letter-spacing:.04em;text-transform:uppercase;}
.hero-pulse{width:7px;height:7px;border-radius:50%;background:var(--c3);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}
.hero-h1{font-family:var(--serif);font-size:3.4rem;font-weight:700;line-height:1.12;margin-bottom:1.25rem;color:var(--c1);letter-spacing:-.02em;}
.hero-h1 em{font-style:italic;color:var(--c2);}
.hero-h1 mark{background:none;color:var(--c4);}
.hero-sub{font-size:1.05rem;color:var(--c8);line-height:1.8;max-width:500px;margin-bottom:2rem;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:2.5rem;}
.hero-stats{display:flex;gap:2.5rem;border-top:1px solid var(--c7);padding-top:1.75rem;}
.hs-num{font-family:var(--serif);font-size:1.7rem;font-weight:700;color:var(--c1);}
.hs-num span{color:var(--c4);}
.hs-lbl{font-size:.76rem;color:var(--c8);margin-top:2px;font-weight:500;}
.hero-visual{position:relative;}
.hv-main{background:var(--white);border-radius:28px;padding:1.75rem;box-shadow:var(--sh2);border:1px solid var(--c7);animation:float 7s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
.hv-header{display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;}
.hv-avatar{width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,var(--c2),var(--c3));display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.hv-live{margin-left:auto;background:#dcfce7;color:#15803d;font-size:.68rem;font-weight:700;padding:4px 10px;border-radius:100px;border:1px solid #86efac;}
.ecg-wrap{height:56px;overflow:hidden;margin:0 0 1.25rem;}
.ecg-wrap svg{width:100%;height:100%;}
.ecg-p{stroke-dasharray:900;stroke-dashoffset:900;animation:draw 2.8s linear infinite;}
@keyframes draw{to{stroke-dashoffset:-900;}}
.vitals-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.vital{background:var(--c6);border-radius:12px;padding:12px 14px;border:1px solid var(--c7);}
.vital-val{font-family:var(--serif);font-size:1.15rem;font-weight:700;margin-bottom:2px;}
.vital-lbl{font-size:.68rem;color:var(--c8);font-weight:500;}

/* ── SEARCH ── */
.search-sec{width:100%;background:var(--white);padding:2.5rem 4rem;border-bottom:1px solid var(--c7);}
.search-inner{max-width:1000px;margin:0 auto;}
.search-tabs{display:flex;gap:8px;margin-bottom:1.25rem;flex-wrap:wrap;}
.stab{padding:7px 16px;border-radius:100px;font-size:.8rem;font-weight:600;cursor:pointer;border:1.5px solid var(--c7);background:transparent;color:var(--c8);transition:all .18s;font-family:var(--font);}
.stab.on{border-color:var(--c2);background:var(--c2);color:#fff;}
.stab:hover:not(.on){border-color:var(--c2);color:var(--c2);}
.sbar{display:flex;border-radius:16px;overflow:hidden;box-shadow:var(--sh2);border:1.5px solid var(--c7);background:var(--white);}
.sloc{display:flex;align-items:center;gap:7px;padding:0 1.1rem;border-right:1.5px solid var(--c7);font-size:.83rem;color:var(--c9);cursor:pointer;white-space:nowrap;min-width:150px;font-weight:600;}
.sinput{flex:1;padding:14px 1rem;border:none;outline:none;font-size:.94rem;color:var(--c1);background:transparent;font-family:var(--font);}
.sinput::placeholder{color:var(--c8);}
.sactions{display:flex;align-items:center;gap:7px;padding-right:8px;}
.siconbtn{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--c6);border:1px solid var(--c7);cursor:pointer;font-size:1rem;transition:all .18s;}
.siconbtn:hover{background:rgba(27,108,168,.1);}

/* ── SECTIONS ── */
.sec{width:100%;padding:5rem 4rem;}
.sec-alt{background:var(--white);}
.wrap{max-width:1400px;margin:0 auto;width:100%;}
.sec-head{text-align:center;margin-bottom:3rem;}
.sec-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c2);margin-bottom:.7rem;background:rgba(27,108,168,.08);padding:5px 13px;border-radius:100px;}
.sec-title{font-family:var(--serif);font-size:2.3rem;font-weight:700;color:var(--c1);margin-bottom:.7rem;letter-spacing:-.02em;}
.sec-sub{color:var(--c8);max-width:580px;margin:0 auto;line-height:1.75;font-size:.95rem;}

/* ── SPECIALISTS ── */
.spec-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:14px;}
.spec-card{background:var(--white);border-radius:18px;padding:1.25rem 1rem;text-align:center;border:1.5px solid var(--c7);cursor:pointer;transition:all .28s;position:relative;overflow:hidden;}
.spec-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(27,108,168,.06),rgba(0,180,216,.06));opacity:0;transition:opacity .28s;}
.spec-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--c3);}
.spec-card:hover::after{opacity:1;}
.spec-ico{font-size:2rem;margin-bottom:.5rem;}
.spec-name{font-size:.78rem;font-weight:700;color:var(--c1);}
.spec-desc{font-size:.67rem;color:var(--c8);margin-top:3px;}

/* ── PACKAGES ── */
.pkg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px;}
.pkg-card{background:var(--white);border-radius:20px;padding:1.5rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;position:relative;overflow:hidden;}
.pkg-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--c2);}
.pkg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--c2),var(--c3));transform:scaleX(0);transform-origin:left;transition:transform .28s;}
.pkg-card:hover::before{transform:scaleX(1);}
.pkg-name{font-weight:700;font-size:.92rem;color:var(--c1);margin-bottom:.6rem;line-height:1.4;}
.pkg-price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:.75rem;}
.pkg-price{font-family:var(--serif);font-size:1.6rem;font-weight:700;color:var(--c2);}
.pkg-price-old{font-size:.88rem;color:var(--c8);text-decoration:line-through;}
.pkg-save{font-size:.7rem;font-weight:700;background:rgba(0,180,216,.12);color:#0369a1;padding:3px 8px;border-radius:100px;border:1px solid rgba(0,180,216,.25);}
.pkg-tests{font-size:.74rem;color:var(--c8);line-height:1.6;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.pkg-tests strong{font-weight:600;color:var(--c9);}

/* ── FEATURES ── */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;}
.feat-card{background:var(--c6);border-radius:20px;padding:1.6rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;}
.feat-card:hover{transform:translateY(-6px);box-shadow:var(--sh2);background:var(--white);}
.feat-ico{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:1rem;}
.feat-title{font-weight:700;font-size:.94rem;margin-bottom:.45rem;color:var(--c1);}
.feat-desc{font-size:.82rem;color:var(--c8);line-height:1.65;}

/* ── SERVICES ── */
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;}
.svc-card{background:var(--white);border-radius:18px;padding:1.6rem;border:1.5px solid var(--c7);transition:all .28s;cursor:pointer;}
.svc-card:hover{transform:translateY(-4px);box-shadow:var(--sh2);border-color:var(--c3);}
.svc-ico{font-size:2.4rem;display:block;margin-bottom:.85rem;}
.svc-title{font-weight:700;font-size:.94rem;margin-bottom:.4rem;color:var(--c1);}
.svc-desc{font-size:.82rem;color:var(--c8);line-height:1.65;margin-bottom:.85rem;}
.svc-link{font-size:.8rem;font-weight:700;color:var(--c3);text-decoration:none;display:inline-flex;align-items:center;gap:4px;}

/* ── METRICS STRIP ── */
.metrics{width:100%;padding:4rem;background:var(--c1);}
.metrics-inner{max-width:1400px;margin:0 auto;}
.met-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:20px;text-align:center;}
.met-card{padding:1.5rem;background:rgba(255,255,255,.06);border-radius:18px;border:1px solid rgba(255,255,255,.1);}
.met-ico{font-size:1.8rem;display:block;margin-bottom:.5rem;}
.met-num{font-family:var(--serif);font-size:2rem;font-weight:700;color:#fff;}
.met-lbl{font-size:.8rem;color:rgba(255,255,255,.65);margin-top:4px;}

/* ── APPOINTMENT ── */
.appt-sec{width:100%;padding:5rem 4rem;background:linear-gradient(135deg,#EEF6FF,#F0FAFB);}
.appt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.appt-left h2{font-family:var(--serif);font-size:2.2rem;font-weight:700;color:var(--c1);margin-bottom:1rem;letter-spacing:-.02em;}
.appt-left p{color:var(--c8);line-height:1.8;margin-bottom:1.5rem;}
.appt-steps{display:flex;flex-direction:column;gap:14px;margin-bottom:2rem;}
.astep{display:flex;align-items:center;gap:14px;background:var(--white);padding:14px 16px;border-radius:14px;border:1px solid var(--c7);box-shadow:var(--sh3);}
.astep-num{width:34px;height:34px;border-radius:50%;background:var(--c2);color:#fff;font-weight:700;font-size:.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.astep-text{font-size:.85rem;font-weight:600;color:var(--c1);}
.appt-right{background:var(--white);border-radius:24px;padding:2rem;box-shadow:var(--sh2);border:1px solid var(--c7);}
.appt-right h3{font-family:var(--serif);font-size:1.3rem;font-weight:700;margin-bottom:1.25rem;color:var(--c1);}
.field{margin-bottom:14px;}
.field label{display:block;font-size:.75rem;font-weight:700;color:var(--c9);margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase;}
.field input,.field select{width:100%;padding:11px 14px;border-radius:10px;border:1.5px solid var(--c7);background:var(--c6);color:var(--c1);font-size:.88rem;outline:none;font-family:var(--font);transition:border-color .18s;}
.field input:focus,.field select:focus{border-color:var(--c2);background:#fff;}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* ── BRANCHES ── */
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.bc{background:var(--white);border-radius:20px;overflow:hidden;border:1px solid var(--c7);transition:all .28s;}
.bc:hover{box-shadow:var(--sh2);transform:translateY(-4px);}
.bc-map{height:150px;background:linear-gradient(135deg,rgba(27,108,168,.1),rgba(0,180,216,.1));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.bc-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,180,216,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,216,.12) 1px,transparent 1px);background-size:22px 22px;}
.bc-pin{position:relative;z-index:1;font-size:2.8rem;animation:bounce 2.2s ease-in-out infinite;}
@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
.bc-body{padding:1.4rem;}
.bc-name{font-family:var(--serif);font-size:1.1rem;font-weight:700;margin-bottom:.3rem;color:var(--c1);}
.bc-open{display:inline-flex;align-items:center;gap:5px;font-size:.72rem;font-weight:700;color:#16a34a;background:#dcfce7;padding:3px 9px;border-radius:100px;margin-bottom:.85rem;}
.bc-open span{width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite;}
.bc-row{font-size:.8rem;color:var(--c8);margin-bottom:.35rem;display:flex;align-items:center;gap:6px;}

/* ── TESTIMONIALS ── */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.tc{background:var(--white);border-radius:24px;padding:1.75rem;border:1px solid var(--c7);transition:all .28s;position:relative;}
.tc::before{content:'"';position:absolute;top:.8rem;right:1.2rem;font-size:5rem;color:rgba(27,108,168,.08);font-family:Georgia;line-height:1;}
.tc:hover{box-shadow:var(--sh2);transform:translateY(-4px);}
.tc-stars{color:#FBBF24;font-size:.95rem;margin-bottom:.7rem;}
.tc-text{font-size:.86rem;color:var(--c8);line-height:1.75;margin-bottom:1.1rem;font-style:italic;}
.tc-author{display:flex;align-items:center;gap:11px;}
.tc-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.88rem;flex-shrink:0;}
.tc-name{font-weight:700;font-size:.88rem;color:var(--c1);}
.tc-role{font-size:.73rem;color:var(--c8);}

/* ── CTA SECTION ── */
.cta-sec{width:100%;padding:5rem 4rem;background:linear-gradient(135deg,var(--c1) 0%,#0d3a5c 100%);text-align:center;}
.cta-sec h2{font-family:var(--serif);font-size:2.6rem;font-weight:700;color:#fff;margin-bottom:1rem;letter-spacing:-.02em;}
.cta-sec p{color:rgba(255,255,255,.72);font-size:1.02rem;max-width:560px;margin:0 auto 2rem;line-height:1.75;}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

/* ── FOOTER ── */
.footer{width:100%;background:#060f1c;color:rgba(255,255,255,.65);padding:4rem 4rem 1.5rem;}
.footer-inner{max-width:1400px;margin:0 auto;}
.footer-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr 1.4fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:1.75rem;}
.footer-col h5{font-weight:700;font-size:.85rem;color:#fff;margin-bottom:1rem;letter-spacing:.04em;}
.fl{display:block;color:rgba(255,255,255,.55);text-decoration:none;font-size:.8rem;margin-bottom:.5rem;transition:color .18s;}
.fl:hover{color:var(--c3);}
.footer-desc{font-size:.82rem;margin-top:.75rem;line-height:1.75;max-width:280px;}
.fnl{display:flex;border-radius:9px;overflow:hidden;margin-top:.6rem;}
.fnl input{flex:1;padding:10px 13px;border:none;outline:none;background:rgba(255,255,255,.08);color:#fff;font-size:.8rem;font-family:var(--font);}
.fnl input::placeholder{color:rgba(255,255,255,.35);}
.fnl button{background:var(--c2);color:#fff;border:none;padding:10px 15px;cursor:pointer;font-size:.8rem;font-weight:700;}
.footer-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;}
.footer-copy{font-size:.78rem;}
.footer-soc{display:flex;gap:9px;}
.fsoc{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:.95rem;cursor:pointer;transition:all .18s;text-decoration:none;color:#fff;}
.fsoc:hover{background:var(--c3);border-color:var(--c3);}

/* ── FLOATING BUTTONS ── */
.fab-wrap{position:fixed;bottom:1.75rem;right:1.75rem;display:flex;flex-direction:column;gap:10px;z-index:999;}
.fab{width:50px;height:50px;border-radius:50%;border:none;cursor:pointer;font-size:1.3rem;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh2);transition:all .2s;}
.fab:hover{transform:scale(1.12);}
.fab-chat{background:var(--c3);}
.fab-appt{background:var(--c2);}

/* ── REGISTER ── */
.reg-sec{width:100%;padding:5rem 4rem;background:var(--c6);}
.reg-box{max-width:1300px;margin:0 auto;}
.reg-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:start;}
.reg-left{position:sticky;top:90px;}
.reg-left h2{font-family:var(--serif);font-size:2rem;font-weight:700;margin-bottom:.7rem;color:var(--c1);letter-spacing:-.02em;}
.reg-left p{color:var(--c8);margin-bottom:1.75rem;line-height:1.8;}
.reg-perks{display:flex;flex-direction:column;gap:11px;}
.perk{display:flex;align-items:center;gap:12px;background:var(--white);padding:12px 15px;border-radius:12px;border:1px solid var(--c7);font-size:.83rem;font-weight:600;color:var(--c1);}
.perk-ico{font-size:1.1rem;}
.stepper{display:flex;margin-bottom:2rem;}
.sstep{flex:1;display:flex;flex-direction:column;align-items:center;position:relative;}
.sstep::after{content:'';position:absolute;top:15px;left:50%;width:100%;height:2px;background:var(--c7);}
.sstep:last-child::after{display:none;}
.sstep.done::after{background:var(--c3);}
.scir{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;z-index:1;background:var(--c7);color:var(--c8);transition:all .25s;}
.sstep.done .scir{background:var(--c3);color:#fff;}
.sstep.active .scir{background:var(--c2);color:#fff;box-shadow:0 0 0 4px rgba(27,108,168,.18);}
.slbl{font-size:.62rem;font-weight:700;color:var(--c8);margin-top:5px;text-align:center;white-space:nowrap;}
.sstep.active .slbl{color:var(--c2);}
.sstep.done .slbl{color:var(--c3);}
.form-card{background:var(--white);border-radius:22px;padding:2rem;border:1px solid var(--c7);box-shadow:var(--sh);}
.form-nav{display:flex;gap:11px;margin-top:1.5rem;}
.form-nav .btn{flex:1;justify-content:center;}
.otp-row{display:flex;gap:12px;justify-content:center;margin:1.5rem 0;}
.otp-inp{width:58px;height:58px;text-align:center;font-size:1.4rem;font-weight:700;border-radius:12px;border:2px solid var(--c7);background:var(--c6);color:var(--c1);outline:none;font-family:var(--serif);}
.otp-inp:focus{border-color:var(--c2);}
.success{text-align:center;padding:2.5rem;}
.success-ico{font-size:4.5rem;animation:pop .5s cubic-bezier(.175,.885,.32,1.275);}
@keyframes pop{0%{transform:scale(0);}100%{transform:scale(1);}}
.success-h{font-family:var(--serif);font-size:1.9rem;font-weight:700;margin:1rem 0 .5rem;color:var(--c1);}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .hero-grid,.reg-grid{grid-template-columns:1fr;}
  .hero-visual{display:none;}
  .branch-grid,.testi-grid{grid-template-columns:1fr;}
  .footer-grid{grid-template-columns:1fr 1fr;}
  .appt-grid{grid-template-columns:1fr;}
}
@media(max-width:768px){
  .nav-menu{display:none;}
  .nav-inner{padding:0 1.5rem;}
  .topbar{padding:9px 1.5rem;}
  .hero{padding:4rem 1.5rem;}
  .hero-h1{font-size:2.1rem;}
  .sec{padding:3.5rem 1.5rem;}
  .search-sec{padding:2rem 1.5rem;}
  .metrics{padding:3rem 1.5rem;}
  .appt-sec{padding:3.5rem 1.5rem;}
  .cta-sec{padding:3.5rem 1.5rem;}
  .reg-sec{padding:3.5rem 1.5rem;}
  .footer{padding:3rem 1.5rem 1.5rem;}
  .spec-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));}
  .footer-grid{grid-template-columns:1fr;}
  .field-row{grid-template-columns:1fr;}
}
`;

export default GLOBAL_CSS;

===============================
FILE: client\src\styles\index.css
===============================

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { width: 100%; max-width: 100%; margin: 0; padding: 0; }
.pharmacy-dashboard-nav-btn {
  border: none;
  outline: none;
  padding: 10px 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0a2540, #1b6ca8);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(10, 37, 64, 0.22);
  transition: all 0.22s ease;
  white-space: nowrap;
  font-family: "Segoe UI", sans-serif;
}

.pharmacy-dashboard-nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(10, 37, 64, 0.3);
  background: linear-gradient(135deg, #123d66, #0a9c87);
}

.pharmacy-dashboard-nav-btn:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(10, 37, 64, 0.2);
}

.pharmacy-dashboard-nav-icon {
  font-size: 17px;
  line-height: 1;
}
.nav-menu {
  gap: 20px;
}

.nav-drop {
  z-index: 9999;
}

.btn-book {
  margin-left: 12px;
  text-align: center;
  justify-content: center;
  min-width: 138px;
}

.btn-login {
  margin-right: 2px;
}

===============================
FILE: client\src\App.jsx
===============================

import AboutPage from "./components/about/AboutPage";
import PatientBookings from "./components/profile/PatientBookings";
import PatientProfile from "./components/profile/PatientProfile";
import { useState, useEffect } from "react";

import GLOBAL_CSS from "./styles/globalStyles";
import "./styles/index.css";

import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/Herosection";
import SearchSection from "./components/home/Searchsection";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import HomeServices from "./components/homeServices/HomeServices";
import Cardiology from "./components/cardiology/Cardiology";
import BodyDiagnostics from "./components/diagnostics/BodyDiagnostics";
import BlogPage from "./components/blog/BlogPage";
import PharmacyHomeDelivery from "./components/pharmacy/PharmacyHomeDelivery";
import PharmacyDashboard from "./components/pharmacyDashboard/PharmacyDashboard";

import ConsultancyHome from "./components/consultancy/consultancyHome";
import DiagnosticWalkInCenters from "./components/diagnostics/DiagnosticWalkInCenters";
import { ToastProvider } from "./shared/toast.js";
import WalkInClinic from "./components/walkinclinic/WalkInClinic";
import TeleConsultationPage from "./components/consultation/TeleConsultationPage";

import {
  AboutSection,
  SpecialistsSection,
  PackagesSection,
  FeaturesSection,
  ServicesSection,
  MetricsSection,
  AppointmentSection,
  BranchesSection,
  TestimonialsSection,
  CTASection,
} from "./components/home/sections";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(1);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ToastProvider>
      <style>{GLOBAL_CSS}</style>

      <TopBar />

      <Navbar
        scrolled={scrolled}
        setPage={setPage}
        setStep={setStep}
        isLoggedIn={isLoggedIn}
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />

      {page === "home" && (
        <>
          <HeroSection setPage={setPage} />
          <SearchSection />
          <AboutSection />
          <SpecialistsSection />
          <PackagesSection />
          <FeaturesSection />
          <ServicesSection setPage={setPage} />
          <MetricsSection />
          <AppointmentSection />
          <BranchesSection />
          <TestimonialsSection />
          <CTASection setPage={setPage} />
        </>
      )}

      {page === "homeservices" && <HomeServices />}

      {page === "cardiology" && <Cardiology />}

      {page === "bodydiagnostics" && <BodyDiagnostics />}
      {page === "diagnostic-walkin-centers" && <DiagnosticWalkInCenters />}
      {page === "blog" && <BlogPage setPage={setPage} />}

      {page === "about" && <AboutPage setPage={setPage} />}

      {page === "walkin-clinic" && <WalkInClinic setPage={setPage} />}

      {page === "tele-consultation" && <TeleConsultationPage />}

      {page === "consultancy-home" && <ConsultancyHome setPage={setPage} />}

      {page === "pharmacy-home-delivery" && (
        <PharmacyHomeDelivery setPage={setPage} />
      )}

      {page === "pharmacy-dashboard" && (
        <PharmacyDashboard setPage={setPage} />
      )}

      {page === "login" && (
        <Login
          setPage={setPage}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      )}

      {page === "register" && <Register setPage={setPage} />}

      {page === "profile" && user?.role === "patient" && (
        <PatientProfile setPage={setPage} setUser={setUser} />
      )}

      {page === "profile" && user?.role !== "patient" && (
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1>Access Denied</h1>
          <p>Only patient accounts can access the patient profile page.</p>

          <button
            className="btn btn-login"
            onClick={() => setPage("home")}
            style={{ marginTop: 20 }}
          >
            Go Home
          </button>
        </div>
      )}

      {page === "bookings" && user?.role === "patient" && (
        <PatientBookings setPage={setPage} />
      )}

      {page === "bookings" && user?.role !== "patient" && (
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1>Access Denied</h1>
          <p>Only patient accounts can view previous bookings.</p>

          <button
            className="btn btn-login"
            onClick={() => setPage("home")}
            style={{ marginTop: 20 }}
          >
            Go Home
          </button>
        </div>
      )}

      {page === "reports" && (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
          <h1>Test Reports</h1>
          <p>Uploaded PDFs and medical reports will appear here.</p>
        </div>
      )}

      {page === "help" && (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
          <h1>Help & Support</h1>
          <p>Support information and contact details.</p>
        </div>
      )}

      <Footer />

      <div className="fab-wrap">
        <button
          className="fab fab-chat"
          title="AI Chat"
          onClick={() => alert("AI Assistant Coming Soon")}
        >
          💬
        </button>
      </div>
    </ToastProvider>
  );
}

===============================
FILE: client\src\main.jsx
===============================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
