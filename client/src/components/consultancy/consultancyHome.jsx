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