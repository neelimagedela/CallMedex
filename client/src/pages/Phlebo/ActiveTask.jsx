import React, { useEffect, useState } from "react";
import { usePhlebo } from "../../context/PhleboContext";
import { MapPin, Phone, CheckCircle, FlaskConical, Upload } from "lucide-react";
import { phleboApi } from "./phlebo.api";

const formatAmount = (value) => `₹${Number(value || 0).toFixed(2)}`;

const formatDate = (value) => {
  if (!value) return "Date not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getTestName = (test) => test.name || test.test_name || test.testName || "Test";

const getStatusLabel = (status) => {
  switch (status) {
    case "accepted":       return "Accepted";
    case "sample_collected": return "Sample Collected";
    case "submitted_to_lab": return "Submitted to Lab";
    case "completed":      return "Completed";
    case "cancelled":      return "Cancelled";
    default:               return "Pending";
  }
};

const getBranchName = (booking) =>
  booking?.branch || booking?.clinicBranch || booking?.clinic_branch ||
  booking?.deliveryBranch || booking?.delivery_branch || "";

const openPatientMap = (booking) => {
  const lat = booking?.patientLat || booking?.patient_lat;
  const lng = booking?.patientLng || booking?.patient_lng;
  const address = booking?.patientAddress || booking?.patient_address;

  if (lat && lng) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      "_blank", "noopener,noreferrer"
    );
    return true;
  }

  if (address) {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving`,
      "_blank", "noopener,noreferrer"
    );
    return true;
  }

  alert("Patient location is not available.");
  return false;
};

const stepLabels = [
  "Start Navigation",
  "Verify Patient",
  "Collect Sample",
  "Upload Proof",
  "Submit to Lab",
];

const ActiveTask = () => {
  const { setPage } = usePhlebo();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [sampleImage, setSampleImage] = useState(null);

  const fetchActiveBooking = async () => {
    try {
      setLoading(true);
      const response = await phleboApi.getActiveBooking();
      setBooking(response.data?.data || null);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to load active collection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchActiveBooking(); }, []);

  useEffect(() => {
    if (!booking?.status) return;
    if (booking.status === "accepted") setCurrentStep(1);
    else if (booking.status === "sample_collected") setCurrentStep(4);
  }, [booking]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSampleImage(URL.createObjectURL(file));
  };

  const handleNextStep = async () => {
    if (!booking) return;
    try {
      if (currentStep === 1) {
        const opened = openPatientMap(booking);
        if (!opened) return;
        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        setCurrentStep(3);
        return;
      }

      if (currentStep === 3) {
        await phleboApi.updateStatus(booking.id, "sample_collected");
        setBooking((prev) => ({ ...prev, status: "sample_collected" }));
        setCurrentStep(4);
        return;
      }

      if (currentStep === 4) {
        if (!sampleImage) {
          alert("Please upload sample proof before submitting to lab.");
          return;
        }
        setCurrentStep(5);
        return;
      }

      if (currentStep === 5) {
        // phlebo's final step — submit to lab, lab tech takes over from here
        await phleboApi.updateStatus(booking.id, "submitted_to_lab");
        alert("Samples submitted to lab successfully. The lab technician will now review and process them.");
        setPage("phlebo-tasks");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update collection status. Please try again.");
    }
  };

  if (loading) {
    return <div style={{ padding: "32px" }}><h2>Loading active collection...</h2></div>;
  }

  if (!booking) {
    return (
      <div style={{ background: "#fff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ marginTop: 0 }}>No Active Collection</h2>
        <p style={{ color: "#64748b" }}>You do not have any accepted collection right now.</p>
        <button
          type="button"
          onClick={() => setPage("phlebo-tasks")}
          style={{ marginTop: "12px", border: "none", padding: "12px 18px", borderRadius: "10px", background: "#0f766e", color: "#fff", fontWeight: "800", cursor: "pointer" }}
        >
          View Job Requests
        </button>
      </div>
    );
  }

  const branchName = getBranchName(booking);

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: "0 0 6px", color: "#0f172a", fontSize: "28px" }}>Active Collection</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "18px" }}>
            Current Status:{" "}
            <strong style={{ color: "#0f766e" }}>{getStatusLabel(booking.status)}</strong>
          </p>
        </div>
        <span style={{ background: "#eff6ff", color: "#2563eb", padding: "8px 16px", borderRadius: "999px", fontWeight: "800", fontSize: "14px" }}>
          ID: {booking.publicBookingId || booking.public_booking_id || booking.id}
        </span>
      </div>

      {/* Steps */}
      <div style={{ background: "#fff", padding: "22px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {stepLabels.map((label, index) => {
            const step = index + 1;
            const active = step === currentStep;
            const completed = step < currentStep;
            return (
              <div key={label} style={{ textAlign: "center", padding: "14px 10px", borderRadius: "12px", background: active ? "#e0f7f4" : completed ? "#ecfdf5" : "#f8fafc", color: active || completed ? "#0f766e" : "#64748b", fontWeight: "800", fontSize: "14px" }}>
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Details */}
      <div style={{ background: "#fff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0, marginBottom: "12px", color: "#0f172a" }}>Patient Details</h2>
        <div style={{ fontSize: "18px", lineHeight: 1.55, color: "#0f172a" }}>
          <p style={{ margin: 0 }}><strong>Name:</strong> {booking.patientName || "--"}</p>
          <p style={{ margin: 0 }}><strong>Age/Gender:</strong> {booking.patientAge || "--"} / {booking.patientSex || "--"}</p>
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><Phone size={18} />{booking.patientMobile || "--"}</p>
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><MapPin size={18} />{booking.patientAddress || "--"}</p>
          <p style={{ margin: "8px 0 0" }}><strong>Deliver Sample To Branch:</strong> {branchName || "Branch not assigned"}</p>
          <p style={{ margin: "14px 0 0" }}><strong>Date:</strong> {formatDate(booking.collectionDate)}</p>
          <p style={{ margin: 0 }}><strong>Slot:</strong> {booking.timeSlot || "--"}</p>
          <p style={{ margin: 0 }}><strong>Total:</strong> {formatAmount(booking.totalAmount)}</p>
        </div>
      </div>

      {/* Tests */}
      <div style={{ background: "#ecfeff", padding: "22px", borderRadius: "14px", border: "1px solid #99f6e4", marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0, color: "#0f766e", display: "flex", alignItems: "center", gap: "10px" }}>
          <FlaskConical size={22} /> Tests to Collect
        </h2>
        {booking.tests?.length ? (
          booking.tests.map((test, index) => (
            <div key={`${booking.id}-${index}`} style={{ display: "flex", justifyContent: "space-between", gap: "18px", padding: "10px 0", borderBottom: index < booking.tests.length - 1 ? "1px solid #ccfbf1" : "none", fontSize: "18px" }}>
              <span>{getTestName(test)}</span>
              <strong>{formatAmount(test.price)}</strong>
            </div>
          ))
        ) : (
          <p>No test details available.</p>
        )}
      </div>

      {/* Sample Proof */}
      <div style={{ background: "#fff", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0 }}>Sample Proof Upload</h2>
        <label style={{ display: "block", border: "2px dashed #cbd5e1", borderRadius: "14px", padding: "26px", textAlign: "center", cursor: "pointer" }}>
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          {sampleImage ? (
            <img src={sampleImage} alt="Sample proof" style={{ maxWidth: "100%", maxHeight: "220px", borderRadius: "10px" }} />
          ) : (
            <><Upload /><p>Upload sample image after collection</p></>
          )}
        </label>
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        style={{ background: "#0f766e", color: "#fff", border: "none", padding: "14px 24px", borderRadius: "14px", fontWeight: "900", cursor: "pointer", width: "100%", fontSize: "16px" }}
      >
        {currentStep === 1
          ? "Start & Open Patient Directions"
          : currentStep < 5
          ? "Continue Collection →"
          : "Submit to Lab ✓"}
      </button>

      {currentStep >= 5 && (
        <p style={{ marginTop: "14px", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
          <CheckCircle size={16} />
          This is your final step. After submitting, the lab technician will take over.
        </p>
      )}
    </div>
  );
};

export default ActiveTask;