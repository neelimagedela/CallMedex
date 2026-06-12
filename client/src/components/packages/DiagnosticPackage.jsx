import React, { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import "./DiagnosticPackage.css";

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
    tests: "CBP, ESR, Iron, TIBC, Transferrin, % Iron Saturation",
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
    tests: "Complete Blood Count, ESR, QBC, Widal, CRP, Urine Routine",
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
    tests: "HBsAg, Hepatitis A, HCV, Amylase, Lipase",
  },
];

const slots = [
  "9 AM - 10 AM",
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "2 PM - 3 PM",
  "3 PM - 4 PM",
];

const getInitialPackage = () => {
  const storedPackage = localStorage.getItem("selectedPackage");

  if (!storedPackage) return packages[0];

  try {
    const saved = JSON.parse(storedPackage);

    return (
      packages.find(
        (pkg) =>
          pkg.name.trim().toLowerCase() === saved.name.trim().toLowerCase()
      ) || packages[0]
    );
  } catch {
    return packages[0];
  }
};

const DiagnosticPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(getInitialPackage);
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

  const todayDate = new Date().toISOString().split("T")[0];

  const convertSlotStartTo24Hour = (slot) => {
  const start = slot.split("-")[0].trim();
  const [hourText, meridian] = start.split(" ");

  let hour = Number(hourText);

  if (meridian === "PM" && hour !== 12) {
    hour += 12;
  }

  if (meridian === "AM" && hour === 12) {
    hour = 0;
  }

  return hour;
};

const isSlotExpired = (slot) => {
  if (!appointmentDate) return false;

  const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(appointmentDate);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) return true;

  if (selectedDate > today) return false;

  const currentHour = now.getHours();
  const slotStartHour = convertSlotStartTo24Hour(slot);

  return currentHour >= slotStartHour;
};

   

  const handlePackageChange = (e) => {
    const pkg = packages.find((item) => item.name === e.target.value);
    setSelectedPackage(pkg || packages[0]);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("CALLMEDEX", 20, 17);

    doc.setFontSize(10);
    doc.text("Diagnostic Package Receipt", 140, 17);

    doc.setTextColor(0, 0, 0);
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

    doc.text(`Amount : Rs. ${selectedPackage.price}`, 20, y);
    y += 12;

    doc.text(`Appointment Date : ${appointmentDate}`, 20, y);
    y += 12;

    doc.text(`Time Slot : ${timeSlot}`, 20, y);
    y += 18;

    doc.setFontSize(14);
    doc.text("Tests Included", 20, y);
    y += 10;

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(selectedPackage.tests, 160);
    doc.text(lines, 20, y);

    y += lines.length * 7 + 20;

    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 15;

    doc.setTextColor(0, 128, 0);
    doc.text("Thank you for choosing CALLMEDEX.", 20, y);
    y += 10;

    doc.text("Please arrive 15 minutes before your appointment.", 20, y);

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
    selectedDate.setHours(0, 0, 0, 0);

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

      const generatedId =
        response?.data?.data?.receiptId ||
        response?.data?.receiptId ||
        response?.data?.bookingId ||
        `CMDX${Math.floor(Math.random() * 1000000)}`;

      setBookingId(generatedId);
      setBookingSuccess(true);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to book package");
    }
  };

  if (bookingSuccess) {
    return (
      <div className="diagnostic-page">
        <div className="booking-success-card">
          <div className="success-top">
            <h1>Booking Confirmed</h1>
            <h2>CALLMEDEX DIAGNOSTIC CENTER</h2>
            <hr />
          </div>

          <p className="success-row">
            <strong>Booking ID:</strong> {bookingId}
          </p>

          <p className="success-row">
            <strong>Patient Name:</strong> {formData.patientName}
          </p>

          <p className="success-row">
            <strong>Package:</strong> {selectedPackage.name}
          </p>

          <p className="success-row">
            <strong>Amount:</strong> ₹{selectedPackage.price}
          </p>

          <p className="success-row">
            <strong>Appointment Date:</strong> {appointmentDate}
          </p>

          <p className="success-row">
            <strong>Time Slot:</strong> {timeSlot}
          </p>

          <div className="success-actions">
            <button onClick={handleDownload} className="download-receipt-btn">
              Download PDF Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnostic-page">
      <div className="diagnostic-header">
        <h1>Diagnostic Package Booking</h1>
        <p>Complete all sections to confirm your diagnostic package booking</p>
      </div>

      <div className="booking-form">
        <div className="form-section">
          <div className="section-header">
            <div className="step-badge">1</div>

            <div>
              <h2>Patient Information</h2>
              <p>Personal and contact details</p>
            </div>
          </div>

          <div className="form-grid">
            <input
              type="text"
              name="patientName"
              placeholder="Full Name"
              value={formData.patientName}
              onChange={handleInputChange}
            />

            <input
              type="number"
              name="patientAge"
              placeholder="Age"
              value={formData.patientAge}
              onChange={handleInputChange}
            />

            <select
              name="patientGender"
              value={formData.patientGender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="patientMobile"
              placeholder="Mobile Number"
              value={formData.patientMobile}
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="patientEmail"
              placeholder="Email"
              value={formData.patientEmail}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="patientAddress"
              placeholder="Address"
              value={formData.patientAddress}
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
            {packages.map((pkg) => (
              <option key={pkg.name} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>

          <div className="selected-package">
            <h2>{selectedPackage.name}</h2>
            <h1>₹{selectedPackage.price}</h1>

            <p>
              <strong>Tests Included:</strong>
            </p>

            <p>{selectedPackage.tests}</p>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <div className="step-badge blue">3</div>

            <div>
              <h2>Date and Time Slot</h2>
              <p>Pick your preferred appointment</p>
            </div>
          </div>

          <input
            type="date"
            className="date-input"
            min={todayDate}
            value={appointmentDate}
            onChange={(e) => {
              setAppointmentDate(e.target.value);
              setTimeSlot("");
            }}
          />

          <div className="slots">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={isSlotExpired(slot)}
                onClick={() => setTimeSlot(slot)}
                className={`slot-btn ${timeSlot === slot ? "active" : ""}`}
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
              <strong>Patient:</strong> {formData.patientName || "-"}
            </p>

            <p>
              <strong>Package:</strong> {selectedPackage.name}
            </p>

            <p>
              <strong>Tests:</strong> {selectedPackage.tests}
            </p>

            <p>
              <strong>Date:</strong> {appointmentDate || "-"}
            </p>

            <p>
              <strong>Time Slot:</strong> {timeSlot || "-"}
            </p>

            <p>
              <strong>Amount:</strong> ₹{selectedPackage.price}
            </p>
          </div>
        </div>

        <button className="main-book-btn" onClick={handleBooking}>
          Book Diagnostic Package
        </button>
      </div>
    </div>
  );
};

export default DiagnosticPackage;