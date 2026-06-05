import React, { useEffect, useState } from "react";

import { consultancyHomeApi } from "./consultancyHome.api";

import { bookWalkInClinicAppointment } from "./walkInClinic.api";

import {
  BRANCHES,
  TIME_SLOTS,
  CONSULTATION_FEE,
} from "./walkInClinicConstants";

import { S } from "./shared/consultationStyles";

import LoggedInCard from "./shared/LoggedInCard";
import QuoteCard from "./shared/QuoteCard";
import SupportCard from "./shared/SupportCard";
import SectionHeader from "./shared/SectionHeader";
import SlotGrid from "./shared/SlotGrid";

import { openReceipt } from "./shared/receiptGenerator";

const WalkInClinic = () => {
  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);

  const [receiptId, setReceiptId] = useState("");

  const [patientProfile, setPatientProfile] =
    useState(null);

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

  const today =
    new Date().toISOString().split("T")[0];

  const useProfileDetails = () => {
  setPatient({
    name: patientProfile?.name || "",
    age: patientProfile?.age || "",
    gender: patientProfile?.gender || "",
    mobile: patientProfile?.phone || "",
    email: patientProfile?.email || "",
    address: patientProfile?.address || "",
  });
};

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res =
        await consultancyHomeApi.getMe();

      const p = res?.data?.data || null;

      setPatientProfile(p);
    } catch (err) {
      console.error(
        "Failed to load profile",
        err
      );
    }
  }

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
      patient_gender:
        patient.gender.toLowerCase(),
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

      const result =
        await bookWalkInClinicAppointment(
          payload
        );

      console.log(
        "Walk-In Response:",
        result
      );

      const generatedReceiptId =
        result?.data?.receiptId ||
        result?.receiptId ||
        "";

      setReceiptId(
        generatedReceiptId
      );

      openReceipt({
        receiptId:
          generatedReceiptId,

        serviceType:
          "Walk-In Clinic",

        title:
          "Walk-In Clinic Receipt",

        patientName:
          patient.name,

        patientEmail:
          patient.email,

        patientPhone:
          patient.mobile,

        patientAddress:
          patient.address,

        appointmentDate:
          date,

        timeSlot:
          slot,

        amount:
          consultationFee,

        extraFieldLabel:
          "Clinic Branch",

        extraFieldValue:
          branch,
      });

      setConfirmed(true);
    } catch (error) {
      console.error(
        "Walk-In booking error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
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
          ...S.page,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "40px 36px",
            maxWidth: 520,
            width: "100%",
            boxShadow:
              "0 4px 24px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: 12,
            }}
          >
            🏥
          </div>

          <h2
            style={{
              color: "#0A2540",
              marginBottom: 8,
            }}
          >
            Walk-In Appointment Confirmed
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: 20,
            }}
          >
            Your clinic appointment has been
            successfully booked.
          </p>

          {receiptId && (
            <div
              style={{
                background: "#f8fafc",
                padding: "12px",
                borderRadius: 12,
                marginBottom: 18,
                fontWeight: 700,
              }}
            >
              Receipt ID: {receiptId}
            </div>
          )}

          <button
            style={S.confirmBtn}
            onClick={() =>
              openReceipt({
                receiptId,
                serviceType:
                  "Walk-In Clinic",
                title:
                  "Walk-In Clinic Receipt",
                patientName:
                  patient.name,
                patientEmail:
                  patient.email,
                patientPhone:
                  patient.mobile,
                patientAddress:
                  patient.address,
                appointmentDate:
                  date,
                timeSlot:
                  slot,
                amount:
                  consultationFee,
                extraFieldLabel:
                  "Clinic Branch",
                extraFieldValue:
                  branch,
              })
            }
          >
            Download / Print Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* SIDEBAR */}

      <div style={S.sidebar}>
        <LoggedInCard
          patient={patientProfile}
        />

        <QuoteCard
          icon="🏥"
          quote="Professional healthcare at your nearest clinic."
          author="— CallMeDex Care Team"
        />

        <SupportCard />
      </div>

      {/* MAIN CONTENT */}

      <div style={S.main}>
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <h1 style={S.h1}>
            Walk-In Clinic
          </h1>

          <p style={S.sub}>
            Book an appointment at your
            preferred clinic branch.
          </p>
        </div>

        {/* SECTION 1 */}

        <div style={S.section}>
          <SectionHeader
            step={1}
            title="Patient Information"
            subtitle="Personal & contact details"
            color="#14b8a6"
          />
          <div style={{ marginBottom: 16 }}>
  <button
    type="button"
    onClick={useProfileDetails}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #dbe4ee",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Use My Profile Details
  </button>
</div>

          <div style={S.grid2}>
            <div>
              <label style={S.label}>
                Full Name
              </label>

              <input
                placeholder="Enter your full name"
                style={S.inp}
                value={patient.name}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    name:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={S.label}>
                Age
              </label>

              <input
                placeholder="Enter age"
                type="number"
                min="1"
                style={S.inp}
                value={patient.age}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    age:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={S.label}>
                Gender
              </label>

              <select
                style={S.inp}
                value={
                  patient.gender
                }
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    gender:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Select Gender
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Other
                </option>
              </select>
            </div>

            <div>
              <label style={S.label}>
                Mobile Number
              </label>

              <input
                placeholder="10-digit mobile number"
                style={S.inp}
                value={
                  patient.mobile
                }
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    mobile:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={S.label}>
                Email
              </label>

              <input
                placeholder="user@example.com"
                style={S.inp}
                value={
                  patient.email
                }
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    email:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={S.label}>
                Address
              </label>

              <textarea
              placeholder="Enter you address here"
                rows={3}
                style={S.inp}
                value={
                  patient.address
                }
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    address:
                      e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* SECTION 2 */}

        <div style={S.section}>
          <SectionHeader
            step={2}
            title="Select Clinic Branch"
            subtitle="Choose your preferred clinic"
            color="#7c3aed"
          />

          <div
            style={
              S.specializationGrid
            }
          >
            {BRANCHES.map((b) => (
              <div
                key={b}
                onClick={() =>
                  setBranch(b)
                }
                style={{
                  ...S.specializationCard,

                  ...(branch === b
                    ? S.specializationCardSel
                    : {}),
                }}
              >
                <div
                  style={{
                    fontSize:
                      "1.5rem",
                    marginBottom: 8,
                  }}
                >
                  🏥
                </div>

                <div
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
                {/* SECTION 3 */}

        <div style={S.section}>
          <SectionHeader
            step={3}
            title="Date & Time Slot"
            subtitle="Pick your preferred appointment"
            color="#0ea5e9"
          />

          <div
            style={{
              marginBottom: 20,
            }}
          >
            <label style={S.label}>
              Appointment Date
            </label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              style={{
                ...S.inp,
                maxWidth: 220,
              }}
            />
          </div>

          {date && (
            <SlotGrid
              slots={TIME_SLOTS}
              selectedSlot={slot}
              selectedDate={date}
              onSelect={setSlot}
            />
          )}
        </div>

        {/* SECTION 4 */}

        <div style={S.section}>
          <SectionHeader
            step={4}
            title="Appointment Summary"
            subtitle="Review your appointment"
            color="#10b981"
          />

          <div style={S.summaryRow}>
            <span>Patient</span>

            <strong>
              {patient.name || "-"}
            </strong>
          </div>

          <div style={S.summaryRow}>
            <span>Clinic Branch</span>

            <strong>
              {branch || "-"}
            </strong>
          </div>

          <div style={S.summaryRow}>
            <span>Date</span>

            <strong>
              {date || "-"}
            </strong>
          </div>

          <div style={S.summaryRow}>
            <span>Time Slot</span>

            <strong>
              {slot || "-"}
            </strong>
          </div>

          <div style={S.summaryTotal}>
            <span>
              Consultation Fee
            </span>

            <span>
              ₹{consultationFee}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={
              loading
                ? S.confirmBtnDisabled
                : S.confirmBtn
            }
          >
            {loading
              ? "Booking..."
              : "✓ Confirm Appointment"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default WalkInClinic;