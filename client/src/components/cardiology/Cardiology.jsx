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