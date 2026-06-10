import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const packages = [
  {
    name: "Basic Screening (Non-Diabetic)",
    price: 599,
    tests:
      "CBC, FBS, Uric Acid, Creatinine, Total Cholesterol, Total Bilirubin, TSH, CUE",
  },
  {
    name: "Basic Screening (Diabetic)",
    price: 799,
    tests: "Basic Screening (Non-Diabetic) + HbA1c",
  },
  {
    name: "Full Body Screening (Non-Diabetic)",
    price: 1099,
    tests:
      "CBC, FBS, Uric Acid, Creatinine, Urea, Lipid Profile, LFT, TSH, ECG, CUE",
  },
  {
    name: "Full Body Screening (Diabetic)",
    price: 1299,
    tests: "Full Body Screening (Non-Diabetic) + HbA1c",
  },
  {
    name: "Anaemia Package",
    price: 1499,
    tests:
      "CBP, ESR, Iron, TIBC, Transferrin, % Iron Saturation",
  },
  {
    name: "Cardiac Screening Package",
    price: 1599,
    tests:
      "CBC, Creatinine, ECG, Lipoprotein(a), Apolipoprotein A1/B, CK-MB",
  },
  {
    name: "Vitamin Package",
    price: 1300,
    tests: "Calcium, Vitamin B12, Vitamin D",
  },
  {
    name: "Hormone Package (Female)",
    price: 2500,
    tests:
      "FSH, Estradiol, TFT, Lipid Profile, Uric Acid, Creatinine, FBS, CBP, Vitamin D & B12",
  },
  {
    name: "Hormone Package (Male)",
    price: 3425,
    tests:
      "FSH, LH, Testosterone, Lipid Profile, CBP, TFT, Creatinine, Uric Acid, FBS, PSA, Vitamin D & B12",
  },
  {
    name: "PCOD Panel",
    price: 3800,
    tests:
      "Testosterone, Prolactin, TFT, 17-OHP, DHEAS, FBS, Insulin, C-Peptide",
  },
  {
    name: "Senior Citizen Package (Male)",
    price: 1799,
    tests:
      "CBP, ESR, FBS, Creatinine, Uric Acid, Electrolytes, Lipid Profile, LFT, PSA, ECG, CUE",
  },
  {
    name: "Renal Function Tests (RFT/KFT)",
    price: 799,
    tests:
      "Complete Blood Count, Serum Creatinine, Blood Urea, BUN, Uric Acid, Calcium, Electrolytes, ECG",
  },
  {
    name: "Fever Profile — Basic",
    price: 899,
    tests:
      "Complete Blood Count, ESR, QBC, Widal, CRP, Urine Routine",
  },
  {
    name: "Fever Profile — Complete",
    price: 1299,
    tests:
      "Complete Blood Count, ESR, QBC, Widal, CRP, Dengue, Urine Routine",
  },
  {
    name: "Hepatitis Screening Package",
    price: 1600,
    tests:
      "HBsAg, Hepatitis A, HCV, Amylase, Lipase",
  },
];

const slots = [
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "2 PM - 3 PM",
  "3 PM - 4 PM",
];

  const DiagnosticPackage = ({ selectedPackageData }) => {

const storedPackage = localStorage.getItem("selectedPackage");

let selectedFromCard = packages[0];

if (storedPackage) {
  const saved = JSON.parse(storedPackage);

  console.log("Saved Package:", saved.name);
console.log("Available Packages:", packages);

  selectedFromCard =
    packages.find(
      (pkg) =>
        pkg.name.trim().toLowerCase() ===
        saved.name.trim().toLowerCase()
    ) || packages[0];
}
const [selectedPackage, setSelectedPackage] =
  useState(selectedFromCard);
const [bookingSuccess, setBookingSuccess] = useState(false);

const [bookingId, setBookingId] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientMobile: "",
    patientEmail: "",
    patientAddress: "",
  });

  const [appointmentDate, setAppointmentDate] = useState("");
const [timeSlot, setTimeSlot] = useState("");

const today = new Date().toISOString().split("T")[0];

const isSlotExpired = (slot) => {
  if (!appointmentDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(appointmentDate);
  selectedDate.setHours(0, 0, 0, 0);

  // Past date 
  if (selectedDate < today) {
    return true;
  }

  // Future date -
  if (selectedDate > today) {
    return false;
  }
  const currentHour = new Date().getHours();
  const slotHour = parseInt(slot.split(" ")[0]);

  return currentHour >= slotHour;
};
  const handlePackageChange = (e) => {
    const pkg = packages.find(
      (item) => item.name === e.target.value
    );

    setSelectedPackage(pkg);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleDownload = () => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(0, 102, 204);
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("CALLMEDEX", 20, 17);

  doc.setFontSize(10);
  doc.text("Diagnostic Package Receipt", 140, 17);

  // Reset Text Color
  doc.setTextColor(0, 0, 0);

  // Divider
  doc.setDrawColor(0, 102, 204);
  doc.line(20, 32, 190, 32);

  let y = 45;

  doc.setFontSize(12);

  doc.text(`Booking ID : ${bookingId}`, 20, y);
  y += 12;

  doc.text(`Patient Name : ${formData.patientName}`, 20, y);
  y += 12;

  doc.text(`Age : ${formData.patientAge}`, 20, y);
  y += 12;

  doc.text(`Gender : ${formData.patientGender}`, 20, y);
  y += 12;

  doc.text(`Mobile : ${formData.patientMobile}`, 20, y);
  y += 12;

  doc.text(`Email : ${formData.patientEmail}`, 20, y);
  y += 12;

  doc.text(`Package : ${selectedPackage.name}`, 20, y);
  y += 12;

  doc.text(`Amount : ₹${selectedPackage.price}`, 20, y);
  y += 12;

  doc.text(`Appointment Date : ${appointmentDate}`, 20, y);
  y += 12;

  doc.text(`Time Slot : ${timeSlot}`, 20, y);
  y += 18;

  doc.setFontSize(14);
  doc.text("Tests Included", 20, y);

  y += 10;

  doc.setFontSize(11);

  const lines = doc.splitTextToSize(
    selectedPackage.tests,
    160
  );

  doc.text(lines, 20, y);

  y += lines.length * 7 + 20;

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);

  y += 15;

  doc.setTextColor(0, 128, 0);

  doc.text(
    "Thank you for choosing CALLMEDEX.",
    20,
    y
  );

  y += 10;

  doc.text(
    "Please arrive 15 minutes before your appointment.",
    20,
    y
  );

  doc.save(`${bookingId}.pdf`);
};
  const handleBooking = async () => {

  if (
    !formData.patientName ||
    !formData.patientAge ||
    !formData.patientGender ||
    !formData.patientMobile ||
    !appointmentDate ||
    !timeSlot
  ) {
    alert("Please fill all required fields");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(appointmentDate);

  if (selectedDate < today) {
    alert("Past dates are not allowed");
    return;
  }

  const bookingData = {
    packageName: selectedPackage.name,
    packagePrice: selectedPackage.price,

    patientName: formData.patientName,
    patientAge: formData.patientAge,
    patientGender: formData.patientGender,
    patientMobile: formData.patientMobile,
    patientEmail: formData.patientEmail,
    patientAddress: formData.patientAddress,

    appointmentDate,
    timeSlot,
  };

  console.log("Booking Data:", bookingData);

  try {

   const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      "http://localhost:5000/api/diagnostic-package/book",
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Booking Success:", response.data);

    const generatedId =
      "CMDX" + Math.floor(Math.random() * 1000000);

    setBookingId(generatedId);
    setBookingSuccess(true);

  } catch (error) {

    console.error("Booking Error:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to book package"
    );
  }
};
      
  if (bookingSuccess) {
  return (
    <div className="diagnostic-page">
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <div
  style={{
    borderTop: "6px solid #16a34a",
    padding: "30px"
  }}
>
  <h1
    style={{
      color: "#16a34a",
      marginBottom: "20px"
    }}
  >
    Booking Confirmed ✓
  </h1>

  <h2>  CALLMEDEX DIAGNOSTIC CENTER </h2>

  <hr />
</div>

       <p style={{ marginBottom: "12px" }}>
  <strong>Booking ID:</strong> {bookingId}
</p>

<p style={{ marginBottom: "12px" }}>
  <strong>Patient Name:</strong> {formData.patientName}
</p>

<p style={{ marginBottom: "12px" }}>
  <strong>Package:</strong> {selectedPackage.name}
</p>
    <p style={{ marginBottom: "12px" }}>
  <strong>Amount:</strong> ₹{selectedPackage.price}
</p>

<p style={{ marginBottom: "12px" }}>
  <strong>Appointment Date:</strong> {appointmentDate}
</p>

<p style={{ marginBottom: "12px" }}>
  <strong>Time Slot:</strong> {timeSlot}
</p>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
  <button
    onClick={handleDownload}
    style={{
      background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
      color: "#fff",
      border: "none",
      padding: "14px 32px",
      borderRadius: "12px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
      transition: "0.3s"
    }}
  >
    📄 Download PDF Receipt
  </button>
</div>
      </div>
    </div>
  );
}
  return (
  <div className="diagnostic-page">

    <div className="diagnostic-header">
      <h1>🧪 Diagnostic Package Booking</h1>

      <p>
             Complete all sections to confirm your diagnostic package booking
      </p>
    </div>

    <div className="booking-form">

      <div className="form-section">

  <div className="section-header">
    <div className="step-badge">1</div>

    <div>
      <h2>Patient Information</h2>
      <p>Personal & contact details</p>
    </div>
  </div>

  <div className="form-grid">
          <input
            type="text"
            name="patientName"
            placeholder="Full Name"
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="patientAge"
            placeholder="Age"
            onChange={handleInputChange}
          />

          <select
            name="patientGender"
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="patientMobile"
            placeholder="Mobile Number"
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="patientEmail"
            placeholder="Email"
            onChange={handleInputChange}
          />

         <input
            type="text"
            name="patientAddress"
            placeholder="Address"
            onChange={handleInputChange}
          />
        </div>
</div>
<div className="form-section"> 
        <div className="section-header">
  <div className="step-badge purple">2</div>

  <div>
    <h2>Select Package</h2>
    <p>Choose your preferred diagnostic package</p>
  </div>
</div>

        <select
          className="package-dropdown"
          value={selectedPackage.name}
          onChange={handlePackageChange}
        >
          {packages.map((pkg, index) => (
            <option key={index} value={pkg.name}>
              {pkg.name}
            </option>
          ))}
        </select>

        <div className="selected-package">
          <h2>{selectedPackage.name}</h2>

          <h1>₹{selectedPackage.price}</h1>

          <p style={{ marginTop: "10px" }}>
            <strong>Tests Included:</strong>
          </p>

          <p>{selectedPackage.tests}</p>
        </div>
</div>
<div className="form-section">
        <div className="section-header">
  <div className="step-badge blue">3</div>

  <div>
    <h2>Date & Time Slot</h2>
    <p>Pick your preferred appointment</p>
  </div>
</div>

     <input
       type="date"
       className="date-input"
       min={new Date().toISOString().split("T")[0]}
       value={appointmentDate}
       onChange={(e) => setAppointmentDate(e.target.value)}
    />

        <div className="slots">
         {slots.map((slot) => (
  <button
    key={slot}
    type="button"
    disabled={isSlotExpired(slot)}
    onClick={() => setTimeSlot(slot)}
              style={{
                background:
                  timeSlot === slot
                    ? "#0066ff"
                    : "#e8eefc",
                color:
                  timeSlot === slot
                    ? "#fff"
                    : "#000",
                    opacity: isSlotExpired(slot) ? 0.4 : 1,
                    cursor: isSlotExpired(slot) ? "not-allowed" : "pointer",
              }}
            >
              {slot}
            </button>
          ))}
        </div>
</div>
         <div className="form-section">
        <div className="section-header">
  <div className="step-badge green">4</div>

  <div>
    <h2>Appointment Summary</h2>
    <p>Review your appointment</p>
  </div>
</div>

        <div className="summary">
          <p>
            <strong>Patient:</strong>{" "}
            {formData.patientName || "-"}
          </p>

          <p>
            <strong>Package:</strong>{" "}
            {selectedPackage.name}
          </p>

          <p>
            <strong>Tests:</strong>{" "}
            {selectedPackage.tests}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {appointmentDate || "-"}
          </p>

          <p>
            <strong>Time Slot:</strong>{" "}
            {timeSlot || "-"}
          </p>

          <p>
            <strong>Amount:</strong> ₹
            {selectedPackage.price}
          </p>
        </div>
</div>
        <button
          className="main-book-btn"
          onClick={handleBooking}
        >
          Book Diagnostic Package
        </button>
       

      </div>
    </div>
  );
};

export default DiagnosticPackage;