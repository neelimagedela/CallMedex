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