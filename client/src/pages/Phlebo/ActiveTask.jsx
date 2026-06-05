import React, { useEffect, useState } from "react";
import { usePhlebo } from "../../context/PhleboContext";
import {
  MapPin,
  Phone,
  CheckCircle,
  FlaskConical,
  Upload,
} from "lucide-react";
import { phleboApi } from "./phlebo.api";

const formatAmount = (value) => `₹${Number(value || 0).toFixed(2)}`;

const formatDate = (value) => {
  if (!value) return "Date not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getTestName = (test) => {
  return test.name || test.test_name || test.testName || "Test";
};

const getStatusLabel = (status) => {
  switch (status) {
    case "accepted":
      return "Accepted";
    case "sample_collected":
      return "Sample Collected";
    case "submitted_to_lab":
      return "Submitted to Lab";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Pending";
  }
};

const ActiveTask = () => {
  const { setPage, completedTasks, setCompletedTasks } = usePhlebo();

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
      console.error("Active collection error:", error);

      alert(
        error.response?.data?.message || "Unable to load active collection"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveBooking();
  }, []);

  useEffect(() => {
    if (!booking?.status) return;

    if (booking.status === "accepted") {
      setCurrentStep(1);
    } else if (booking.status === "sample_collected") {
      setCurrentStep(4);
    } else if (booking.status === "submitted_to_lab") {
      setCurrentStep(5);
    }
  }, [booking]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setSampleImage(URL.createObjectURL(file));
    }
  };

  const handleNextStep = async () => {
    if (!booking) return;

    try {
      if (currentStep === 1) {
        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        setCurrentStep(3);
        return;
      }

      if (currentStep === 3) {
        await phleboApi.updateStatus(booking.id, "sample_collected");

        setBooking((prev) => ({
          ...prev,
          status: "sample_collected",
        }));

        setCurrentStep(4);
        return;
      }

      if (currentStep === 4) {
        if (!sampleImage) {
          alert("Please upload sample proof before submitting to lab.");
          return;
        }

        await phleboApi.updateStatus(booking.id, "submitted_to_lab");

        setBooking((prev) => ({
          ...prev,
          status: "submitted_to_lab",
        }));

        setCurrentStep(5);
        return;
      }

      await phleboApi.updateStatus(booking.id, "completed");

      const completedJob = {
        id: booking.publicBookingId,
        patientName: booking.patientName,
        date: new Date().toLocaleDateString("en-IN"),
        amount: booking.totalAmount,
        status: "Completed",
        tests: booking.tests?.map(getTestName) || [],
      };

      if (setCompletedTasks) {
        setCompletedTasks([...(completedTasks || []), completedJob]);
      }

      alert("Collection completed successfully.");

      setPage("phlebo-completed");
    } catch (error) {
      console.error("Status update error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update collection status. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", color: "#64748b" }}>
        Loading active collection...
      </div>
    );
  }

  if (!booking) {
    return (
      <div
        style={{
          padding: "24px",
          background: "#f8fafc",
          borderRadius: "12px",
          color: "#64748b",
        }}
      >
        <h2 style={{ marginTop: 0 }}>No Active Collection</h2>

        <p>Accept a nearby home-service request to start collection.</p>

        <button
          type="button"
          onClick={() => setPage("phlebo-tasks")}
          style={{
            background: "#0f766e",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Go to Requests
        </button>
      </div>
    );
  }

  const steps = [
    "Reached Patient",
    "Verify Patient",
    "Collect Sample",
    "Upload Proof",
    "Submit to Lab",
  ];

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", fontFamily: "inherit" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ color: "#1e293b", margin: 0, fontWeight: "700" }}>
            Active Collection
          </h2>

          <p style={{ margin: "6px 0 0", color: "#64748b" }}>
            Current Status:{" "}
            <strong style={{ color: "#0f766e" }}>
              {getStatusLabel(booking.status)}
            </strong>
          </p>
        </div>

        <span
          style={{
            background: "#eff6ff",
            color: "#1d4ed8",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          ID: {booking.publicBookingId}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "24px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = currentStep === stepNumber;
          const done = currentStep > stepNumber;

          return (
            <div
              key={step}
              style={{
                flex: 1,
                minWidth: "120px",
                padding: "10px",
                borderRadius: "10px",
                background: active ? "#ecfcfc" : done ? "#f0fdf4" : "#f8fafc",
                color: active ? "#0f766e" : done ? "#15803d" : "#64748b",
                fontWeight: "700",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              {done ? "✓ " : ""}
              {step}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Patient Details</h3>

        <p>
          <strong>Name:</strong> {booking.patientName}
        </p>

        <p>
          <strong>Age/Gender:</strong> {booking.patientAge} /{" "}
          {booking.patientSex}
        </p>

        <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Phone size={15} /> {booking.patientMobile}
        </p>

        <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <MapPin size={15} /> {booking.patientAddress}
        </p>

        <p>
          <strong>Date:</strong> {formatDate(booking.collectionDate)}
        </p>

        <p>
          <strong>Slot:</strong> {booking.timeSlot}
        </p>

        <p>
          <strong>Total:</strong> {formatAmount(booking.totalAmount)}
        </p>
      </div>

      <div
        style={{
          background: "#ecfcfc",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #99f6e4",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: "#0f766e",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FlaskConical size={18} /> Tests to Collect
        </h3>

        {booking.tests?.length ? (
          booking.tests.map((test, index) => (
            <div
              key={`${booking.id}-${index}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom:
                  index < booking.tests.length - 1
                    ? "1px solid #ccfbf1"
                    : "none",
              }}
            >
              <span>{getTestName(test)}</span>
              <strong>{formatAmount(test.price)}</strong>
            </div>
          ))
        ) : (
          <p>No test details available.</p>
        )}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Sample Proof Upload</h3>

        <label
          style={{
            display: "block",
            border: "2px dashed #cbd5e1",
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input type="file" hidden onChange={handleImageChange} />

          {sampleImage ? (
            <img
              src={sampleImage}
              alt="Sample proof"
              style={{
                maxWidth: "100%",
                maxHeight: "220px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <>
              <Upload />
              <p>Upload sample image after collection</p>
            </>
          )}
        </label>
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        style={{
          background: "#0f766e",
          color: "#fff",
          border: "none",
          padding: "13px 24px",
          borderRadius: "12px",
          fontWeight: "800",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {currentStep < 5 ? "Continue Collection →" : "Complete Collection"}
      </button>

      {currentStep >= 5 && (
        <p
          style={{
            marginTop: "12px",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CheckCircle size={16} /> Ready to complete collection.
        </p>
      )}
    </div>
  );
};

export default ActiveTask;