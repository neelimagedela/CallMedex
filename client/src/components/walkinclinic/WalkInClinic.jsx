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