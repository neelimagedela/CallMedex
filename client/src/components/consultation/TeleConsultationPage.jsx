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
import { api } from "../../shared/api";
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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
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
      alert("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/api/tele-consultation/book", {
        patientName: patient.name,
        patientAge: Number(patient.age),
        patientGender: patient.gender,
        patientMobile: patient.mobile,
        patientEmail: patient.email,
        patientAddress: patient.address,
        specialization,
        appointmentDate: date,
        timeSlot: slot,
        consultationFee: consultationFee,
      });
      setConfirmed(true);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Booking failed. Please make sure you are logged in and try again."
      );
    } finally {
      setSubmitting(false);
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
  disabled={submitting}
  style={{ ...buttonStyle, opacity: submitting ? 0.7 : 1 }}
>
  {submitting ? "Booking..." : "Book Tele Consultation"}
</button>
    </div>
  );
};

export default TeleConsultationPage;