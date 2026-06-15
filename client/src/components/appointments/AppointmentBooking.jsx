import React, { useState, useEffect, useRef } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const PRE_DEFAULT = [
  "Arrive 15 minutes early",
  "Carry a valid photo ID",
  "Bring any previous reports or prescriptions",
  "Avoid heavy meals 2 hours before",
];

const SLOTS = [
  { label: "9 – 10 AM", endHour: 10 },
  { label: "10 – 11 AM", endHour: 11 },
  { label: "11 AM – 12 PM", endHour: 12 },
  { label: "12 – 1 PM", endHour: 13 },
  { label: "2 – 3 PM", endHour: 15 },
  { label: "3 – 4 PM", endHour: 16 },
];

function getPreTest(scans) {
  const tips = new Set();

  scans.forEach((s) => {
    const instructions =
      s.instructions && s.instructions.length > 0
        ? s.instructions
        : PRE_DEFAULT;

    instructions.forEach((t) => tips.add(t));
  });

  if (tips.size === 0) {
    PRE_DEFAULT.forEach((t) => tips.add(t));
  }

  return [...tips];
}

function isSlotPast(slot, selectedDate) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  if (selectedDate && selectedDate !== today) {
    return false;
  }

  return now.getHours() >= slot.endHour;
}

function validate(patient, branch, selectedScans, date, slot, prescription) {
  const e = {};

  if (!patient.name.trim()) e.name = "Full name is required";

  const age = Number(patient.age);
  if (!patient.age || age < 1 || age > 120) {
    e.age = "Enter a valid age (1–120)";
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
  if (selectedScans.length === 0) e.scans = "Select at least one scan/test";
  if (!date) e.date = "Select appointment date";
  if (!slot) e.slot = "Select a time slot";
  if (!prescription) e.prescription = "Prescription upload is mandatory";

  return e;
}

function downloadReceipt(patient, branch, selectedScans, date, slot, total) {
  const receiptId = "CMX" + Date.now().toString().slice(-8);

  const now = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const scanRows = selectedScans
    .map(
      (s) =>
        `<tr>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f4f8">${s.name}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f4f8;text-align:right">&#8377;${s.price}</td>
        </tr>`
    )
    .join("");

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
  <div class="row"><span>Appointment Date</span><strong>${new Date(
    date
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}</strong></div>
  <div class="row"><span>Time Slot</span><strong>${slot}</strong></div>
  <hr class="divider">
  <table><thead><tr><th>Scan/Test</th><th style="text-align:right">Price</th></tr></thead>
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
  h1: {
    fontSize: "1.7rem",
    color: "#0A2540",
    margin: 0,
    fontWeight: 700,
  },
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
  secTitle: {
    color: "#0A2540",
    fontSize: "1rem",
    fontWeight: 700,
    margin: 0,
  },
  secSub: {
    color: "#94a3b8",
    fontSize: ".8rem",
    margin: "2px 0 0",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
  },
  inp: {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: ".88rem",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box",
    transition: "border-color .2s",
  },
  inpErr: { borderColor: "#e63946" },
  errTxt: { color: "#e63946", fontSize: ".75rem", marginTop: 3 },
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
  uploadBox: {
    border: "2px dashed #dbe4ee",
    borderRadius: 14,
    padding: "22px",
    textAlign: "center",
    cursor: "pointer",
    transition: ".2s",
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
  label: {
    display: "block",
    fontSize: ".75rem",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  descriptionBox: {
    background: "#f8fbff",
    border: "1px solid #e5eaf3",
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 16,
    color: "#334155",
    fontSize: ".86rem",
    lineHeight: 1.6,
  },
  dropdownShell: {
    background: "#f8fafc",
    border: "1.5px solid #e8edf2",
    borderRadius: 16,
    padding: 16,
  },
  dropdownList: {
    maxHeight: 360,
    overflowY: "auto",
    background: "#fff",
    border: "1px solid #e5eaf3",
    borderRadius: 14,
    boxShadow: "0 12px 30px rgba(15,23,42,.12)",
  },
  dropdownOption: {
    width: "100%",
    border: "none",
    padding: "13px 15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid #edf2f7",
    textAlign: "left",
  },
  selectedRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    border: "1px solid #edf2f7",
    borderRadius: 12,
    background: "#fff",
    marginBottom: 8,
  },
};

const F = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  colSpan,
  errors = {},
}) => (
  <div style={colSpan ? { gridColumn: `span ${colSpan}` } : {}}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        ...S.inp,
        ...(errors[name] ? S.inpErr : {}),
      }}
      onFocus={(e) => {
        e.target.style.borderColor = errors[name] ? "#e63946" : "#22c1c3";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = errors[name] ? "#e63946" : "#e8edf2";
      }}
    />

    {errors[name] && <p style={S.errTxt}>⚠ {errors[name]}</p>}
  </div>
);

const STEPS = [
  { title: "Patient Info", sub: "Personal details" },
  { title: "Select Scans", sub: "Choose tests" },
  { title: "Date & Slot", sub: "Pick time" },
  { title: "Prescription", sub: "Upload & confirm" },
];

function ProgressSidebar({ activeStep }) {
  return (
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
        Your Progress
      </p>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 8,
            width: 2,
            height: "84%",
            background: "#e8edf2",
          }}
        />

        {STEPS.map((step, i) => {
          const done = i < activeStep;
          const active = i === activeStep;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                marginBottom: 20,
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  flexShrink: 0,
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".8rem",
                  fontWeight: 700,
                  background: done ? "#21c087" : active ? "#22c1c3" : "#edf2f7",
                  color: done || active ? "white" : "#94a3b8",
                  boxShadow: active
                    ? "0 4px 12px rgba(34,193,195,.35)"
                    : "none",
                  transition: ".3s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>

              <div style={{ paddingTop: 6 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: ".85rem",
                    fontWeight: active ? 700 : 500,
                    color: active ? "#0A2540" : done ? "#21c087" : "#94a3b8",
                  }}
                >
                  {step.title}
                </p>

                <p
                  style={{
                    margin: "1px 0 0",
                    fontSize: ".75rem",
                    color: "#b0bec5",
                  }}
                >
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  useDropdownTestSelector = false,
}) {
  const toast = useToast();

  const branches = ["Akkayapalem", "Madhurawada", "KGH"];
  const today = new Date().toISOString().split("T")[0];

  const isHomeServiceBooking =
    mode === "home-service" ||
    bookingType === "home-service" ||
    bookingEndpoint.includes("home-service");

  const isLargeTestListBooking =
    useDropdownTestSelector ||
    isHomeServiceBooking ||
    mode === "diagnostic-walkin" ||
    mode === "walkin-center" ||
    mode === "walkin-clinic" ||
    bookingType === "diagnostic-walkin" ||
    bookingType === "walkin-center" ||
    bookingType === "walkin-clinic" ||
    bookingEndpoint.includes("diagnostic-walkin") ||
    bookingEndpoint.includes("walkin");

  const [selectedScans, setSelectedScans] = useState([]);
  const [patientLocation, setPatientLocation] = useState({
    lat: null,
    lng: null,
  });

  const [slot, setSlot] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState(today);
  const [prescription, setPrescription] = useState(null);
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const secRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const postRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = secRefs.findIndex((r) => r.current === entry.target);
            if (idx !== -1) setActiveStep(idx);
          }
        }),
      { threshold: 0.4 }
    );

    secRefs.forEach((r) => r.current && observer.observe(r.current));

    return () => observer.disconnect();
  }, []);

  const total = selectedScans.reduce((acc, s) => acc + Number(s.price || 0), 0);

  const toggleScan = (scan) => {
    const exists = selectedScans.find((s) => s.id === scan.id);

    if (exists) {
      setSelectedScans(selectedScans.filter((s) => s.id !== scan.id));
      return;
    }

    if (!isLargeTestListBooking && selectedScans.length >= 2) {
      toast.warning("You can select a maximum of 2 scans/tests per appointment.");
      return;
    }

    setSelectedScans([...selectedScans, scan]);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        toast.success("Current location captured successfully.");
      },
      () => {
        toast.error("Unable to get location. Please allow location permission.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
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
      toast.error("Please log in as a patient before booking.");
      return;
    }

    if (user.role !== "patient") {
      toast.error("Only patient accounts can book appointments.");
      return;
    }

    const e = validate(patient, branch, selectedScans, date, slot, prescription);
    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.warning("Please fill in all required fields before confirming.");

      const first = [
        "name",
        "age",
        "sex",
        "mobile",
        "email",
        "branch",
        "address",
        "scans",
        "date",
        "slot",
        "prescription",
      ].find((k) => e[k]);

      const secIdx = [
        "name",
        "age",
        "sex",
        "mobile",
        "email",
        "branch",
        "address",
      ].includes(first)
        ? 0
        : first === "scans"
        ? 1
        : ["date", "slot"].includes(first)
        ? 2
        : 3;

      secRefs[secIdx]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    if (isHomeServiceBooking) {
      if (!patientLocation.lat || !patientLocation.lng) {
        toast.warning(
          "Please click Use Current Location before booking home service."
        );
        return;
      }
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

        ...(isHomeServiceBooking
          ? {
              tests: selectedScans.map((t) => ({ id: Number(t.id) })),
              collectionDate: date,
              patientLat: patientLocation.lat,
              patientLng: patientLocation.lng,
            }
          : {
              scans: selectedScans.map((s) => ({
                id: s.id,
                name: s.name,
                subtitle: s.subtitle,
                price: Number(s.price),
                oldPrice: Number(s.oldPrice || 0),
              })),
              appointmentDate: date,
            }),

        timeSlot: slot,
        prescription: base64Prescription,
        totalAmount: Number(total),
      };

      const response = await api.post(bookingEndpoint, payload);

      if (response.data.success) {
        setSubmitted(true);

        toast.success(
          isHomeServiceBooking
            ? "Your home service booking has been created successfully."
            : "Your appointment has been confirmed successfully."
        );

        setTimeout(() => {
          postRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
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

      toast.error(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    }
  };

  const preTests = getPreTest(selectedScans);

  return (
    <div style={S.page}>
      <div style={S.sidebar}>
        <ProgressSidebar activeStep={activeStep} />

        <div style={{ ...S.card, borderLeft: "3px solid #e63946" }}>
          <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>❤️</div>

          <p
            style={{
              fontSize: ".82rem",
              color: "#64748b",
              lineHeight: 1.65,
              margin: "0 0 8px",
              fontStyle: "italic",
            }}
          >
            "Early diagnosis is the first step to a longer, healthier life. Your
            health matters every day — take a moment to check on it."
          </p>

          <p
            style={{
              fontSize: ".75rem",
              fontWeight: 700,
              color: "#e63946",
              margin: 0,
            }}
          >
            — CallMeDex Care Team
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
            📍 Our Branches
          </p>

          {[
            {
              name: "Akkayapalem",
              addr: "Main Road, Akkayapalem, Visakhapatnam",
            },
            {
              name: "Madhurawada",
              addr: "Madhurawada Junction, Visakhapatnam",
            },
            {
              name: "KGH",
              addr: "Near KGH Hospital, Maharani Peta",
            },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                paddingBottom: 10,
                marginBottom: 10,
                borderBottom: i < 2 ? "1px solid #f0f4f8" : "none",
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
                {b.name}
              </p>

              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: ".75rem",
                  color: "#94a3b8",
                  lineHeight: 1.5,
                }}
              >
                {b.addr}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={S.main}>
        <div style={S.header}>
          <h1 style={S.h1}>{title}</h1>
          <p style={S.sub}>
            Complete all sections to confirm your diagnostic appointment
          </p>
        </div>

        <div ref={secRefs[0]} style={S.section}>
          <div style={S.secHead}>
            <div style={S.badge}>1</div>

            <div>
              <p style={S.secTitle}>Patient Information</p>
              <p style={S.secSub}>Personal &amp; contact details</p>
            </div>
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <F
              name="name"
              placeholder="Full Name"
              value={patient.name}
              errors={errors}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              colSpan={2}
            />

            <F
              name="age"
              type="number"
              placeholder="Age"
              value={patient.age}
              errors={errors}
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            />
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div>
              <select
                value={patient.sex}
                onChange={(e) =>
                  setPatient({ ...patient, sex: e.target.value })
                }
                style={{
                  ...S.inp,
                  ...(errors.sex ? S.inpErr : {}),
                }}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              {errors.sex && <p style={S.errTxt}>⚠ {errors.sex}</p>}
            </div>

            <F
              name="mobile"
              placeholder="Mobile (10 digits)"
              value={patient.mobile}
              errors={errors}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
            />

            <F
              name="email"
              placeholder="Email Address"
              value={patient.email}
              errors={errors}
              onChange={(e) =>
                setPatient({ ...patient, email: e.target.value })
              }
            />
          </div>

          <div style={{ ...S.grid2, marginBottom: 10 }}>
            <div>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{
                  ...S.inp,
                  ...(errors.branch ? S.inpErr : {}),
                }}
              >
                <option value="">Select Branch</option>

                {branches.map((b, i) => (
                  <option key={i}>{b}</option>
                ))}
              </select>

              {errors.branch && <p style={S.errTxt}>⚠ {errors.branch}</p>}
            </div>

            <div />
          </div>

          <div>
            <textarea
              placeholder="Address"
              value={patient.address}
              onChange={(e) =>
                setPatient({ ...patient, address: e.target.value })
              }
              style={{
                ...S.inp,
                ...(errors.address ? S.inpErr : {}),
                minHeight: 72,
                resize: "none",
                display: "block",
              }}
            />

            {errors.address && <p style={S.errTxt}>⚠ {errors.address}</p>}

            {isHomeServiceBooking && (
              <div style={{ marginTop: 10 }}>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  style={{
                    padding: "9px 14px",
                    border: "none",
                    borderRadius: 10,
                    background: "#0f766e",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  📍 Use Current Location
                </button>

                {patientLocation.lat && patientLocation.lng && (
                  <p
                    style={{
                      color: "#0f766e",
                      fontSize: ".8rem",
                      marginTop: 6,
                    }}
                  >
                    Location captured successfully.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div ref={secRefs[1]} style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#7c3aed" }}>2</div>

            <div>
              <p style={S.secTitle}>
                {isHomeServiceBooking ? "Select Tests" : "Select Scans"}
              </p>

              <p style={S.secSub}>
                {isLargeTestListBooking
                  ? "Search by test name or code and add tests"
                  : "Choose up to 2 diagnostic tests"}
              </p>
            </div>

            {errors.scans && (
              <p style={{ ...S.errTxt, marginLeft: "auto" }}>
                ⚠ {errors.scans}
              </p>
            )}
          </div>

          {isLargeTestListBooking ? (
            <>
              <div style={S.descriptionBox}>
                <strong style={{ color: "#0A2540" }}>
                  Available test types:
                </strong>{" "}
                Blood tests, urine tests, diabetes tests, thyroid tests, liver
                function tests, kidney function tests, lipid profile, vitamin
                tests, hormone tests, infection markers and other ACCUMAX
                diagnostic tests. Search by test name or code to add the
                required test.
              </div>

              <div style={S.dropdownShell}>
                <label style={S.label}>Search Test</label>

                <input
                  type="text"
                  placeholder="Search test name or code..."
                  value={search}
                  onChange={(e) => setSearch?.(e.target.value)}
                  style={{
                    ...S.inp,
                    background: "#fff",
                    marginBottom: search.trim() ? 12 : 0,
                  }}
                />

                {search.trim() && (
                  <div style={S.dropdownList}>
                    {scans.slice(0, 50).map((scan) => {
                      const isSel = selectedScans.some(
                        (s) => s.id === scan.id
                      );

                      return (
                        <button
                          type="button"
                          key={scan.id}
                          onClick={() => toggleScan(scan)}
                          style={{
                            ...S.dropdownOption,
                            background: isSel ? "#ecfcfc" : "#fff",
                          }}
                        >
                          <div>
                            <strong
                              style={{
                                display: "block",
                                color: "#0A2540",
                                fontSize: ".88rem",
                                marginBottom: 4,
                              }}
                            >
                              {scan.name}
                            </strong>

                            <span
                              style={{
                                color: "#64748b",
                                fontSize: ".75rem",
                              }}
                            >
                              {scan.code || "ACCUMAX"}
                            </span>
                          </div>

                          <b style={{ color: "#047857" }}>
                            ₹{Number(scan.price || 0).toFixed(0)}
                          </b>
                        </button>
                      );
                    })}

                    {scans.length === 0 && (
                      <div
                        style={{
                          padding: 18,
                          textAlign: "center",
                          color: "#64748b",
                          fontSize: ".85rem",
                        }}
                      >
                        No tests found
                      </div>
                    )}
                  </div>
                )}

                {selectedScans.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <h4 style={{ margin: 0, color: "#0A2540" }}>
                        Selected Tests
                      </h4>

                      <strong style={{ color: "#047857" }}>₹{total}</strong>
                    </div>

                    {selectedScans.map((scan) => (
                      <div key={scan.id} style={S.selectedRow}>
                        <div>
                          <strong style={{ color: "#0A2540", fontSize: ".86rem" }}>
                            {scan.name}
                          </strong>

                          <div style={{ color: "#64748b", fontSize: ".74rem" }}>
                            {scan.code || "ACCUMAX"}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <b style={{ color: "#047857" }}>₹{scan.price}</b>

                          <button
                            type="button"
                            onClick={() => toggleScan(scan)}
                            style={{
                              border: "none",
                              background: "#fee2e2",
                              color: "#b91c1c",
                              padding: "7px 10px",
                              borderRadius: 8,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontSize: ".75rem",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
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
                  placeholder="Search tests or features"
                  value={search}
                  onChange={(e) => setSearch?.(e.target.value)}
                  style={S.inp}
                />

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory?.(e.target.value)}
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
                {scans.map((scan) => {
                  const isSel = !!selectedScans.find((s) => s.id === scan.id);
                  const isDisabled = !isSel && selectedScans.length >= 2;

                  return (
                    <div
                      key={scan.id}
                      style={{
                        ...S.scanCard,
                        ...(isSel ? S.scanSel : {}),
                        ...(isDisabled ? S.scanDis : {}),
                      }}
                      onClick={() => !isDisabled && toggleScan(scan)}
                    >
                      <div style={S.scanIcon}>{scan.icon}</div>

                      <p
                        style={{
                          margin: "0 0 2px",
                          fontWeight: 700,
                          fontSize: ".9rem",
                          color: "#0A2540",
                        }}
                      >
                        {scan.name}
                      </p>

                      <p
                        style={{
                          margin: "0 0 8px",
                          fontSize: ".75rem",
                          color: "#94a3b8",
                          lineHeight: 1.4,
                        }}
                      >
                        {scan.subtitle}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: ".95rem",
                            color: "#0A2540",
                          }}
                        >
                          ₹{scan.price}
                        </span>

                        <span
                          style={{
                            fontSize: ".78rem",
                            color: "#b0bec5",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{scan.oldPrice}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

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
                maxWidth: 200,
                ...(errors.date ? S.inpErr : {}),
              }}
            />

            {errors.date && <p style={S.errTxt}>⚠ {errors.date}</p>}
          </div>

          <div>
            <label style={S.label}>Time Slot</label>

            <div style={S.slotGrid}>
              {SLOTS.map((s, i) => {
                const past = isSlotPast(s, date);
                const active = slot === s.label;

                return (
                  <div
                    key={i}
                    style={{
                      ...S.slotCard,
                      ...(active ? S.slotActive : {}),
                      ...(past ? S.slotPast : {}),
                    }}
                    onClick={() => !past && setSlot(s.label)}
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

        <div ref={secRefs[3]} style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#f59e0b" }}>4</div>

            <div>
              <p style={S.secTitle}>Prescription Upload</p>
              <p style={S.secSub}>Mandatory for verification</p>
            </div>
          </div>

          <label
            style={{
              ...S.uploadBox,
              display: "block",
              ...(errors.prescription ? { borderColor: "#e63946" } : {}),
            }}
          >
            <input type="file" hidden onChange={handleFile} />

            <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>📋</div>

            <p
              style={{
                margin: "0 0 4px",
                fontWeight: 600,
                fontSize: ".9rem",
                color: "#0A2540",
              }}
            >
              {prescription ? prescription.name : "Click to Upload Prescription"}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: ".75rem",
                color: "#94a3b8",
              }}
            >
              PDF, JPG, PNG · Max 5 MB
            </p>
          </label>

          {errors.prescription && (
            <p style={S.errTxt}>⚠ {errors.prescription}</p>
          )}
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#10b981" }}>₹</div>

            <div>
              <p style={S.secTitle}>Price Summary</p>
              <p style={S.secSub}>Updates as you select scans/tests</p>
            </div>
          </div>

          {selectedScans.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>
              Select scans/tests to see pricing
            </p>
          ) : (
            <>
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
          )}
        </div>

        <button style={S.confirmBtn} onClick={handleSubmit}>
          Confirm Appointment →
        </button>

        {submitted && (
          <div ref={postRef}>
            <div
              style={{
                background: "#ecfcfc",
                border: "2px solid #22c1c3",
                borderRadius: 16,
                padding: "18px 22px",
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#22c1c3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                ✓
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#0A2540",
                  }}
                >
                  {isHomeServiceBooking
                    ? "Home Service Booking Created!"
                    : "Appointment Confirmed!"}
                </p>

                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: ".82rem",
                    color: "#64748b",
                  }}
                >
                  {patient.name} · {date} · {slot} · {branch}
                </p>
              </div>
            </div>

            <div style={{ ...S.section, marginTop: 18 }}>
              <div style={S.secHead}>
                <div style={{ ...S.badge, background: "#f59e0b" }}>📋</div>

                <div>
                  <p style={S.secTitle}>Pre-Test Instructions</p>
                  <p style={S.secSub}>
                    Please follow these before your appointment
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                {preTests.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      padding: "10px 14px",
                      background: "#fffbeb",
                      borderRadius: 10,
                      border: "1px solid #fde68a",
                    }}
                  >
                    <span
                      style={{
                        color: "#f59e0b",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}.
                    </span>

                    <p
                      style={{
                        margin: 0,
                        fontSize: ".86rem",
                        color: "#78350f",
                        lineHeight: 1.6,
                      }}
                    >
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                ...S.section,
                background: "#f0fdf4",
                border: "1.5px solid #6ee7b7",
              }}
            >
              <div style={S.secHead}>
                <div style={{ ...S.badge, background: "#10b981" }}>⬇</div>

                <div>
                  <p style={S.secTitle}>Download Receipt</p>
                  <p style={S.secSub}>Save a copy for your records</p>
                </div>
              </div>

              <p
                style={{
                  fontSize: ".84rem",
                  color: "#064e3b",
                  marginBottom: 14,
                }}
              >
                Your receipt contains all booking details. Open the downloaded
                file in any browser and use <strong>Print → Save as PDF</strong>{" "}
                to get a PDF copy.
              </p>

              <button
                style={{
                  ...S.confirmBtn,
                  background: "#10b981",
                  width: "auto",
                  padding: "11px 28px",
                }}
                onClick={() =>
                  downloadReceipt(patient, branch, selectedScans, date, slot, total)
                }
              >
                ⬇ Download Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}