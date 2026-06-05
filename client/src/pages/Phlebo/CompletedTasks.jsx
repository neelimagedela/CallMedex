import React, { useEffect, useState } from "react";
import { CheckCircle, FlaskConical, Phone, MapPin } from "lucide-react";
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
  if (!test) return "Test";

  if (typeof test === "string") return test;

  return test.name || test.test_name || test.testName || "Test";
};

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);

      const response = await phleboApi.getCompletedBookings();

      setCompletedTasks(response.data?.data || []);
    } catch (error) {
      console.error("Completed tasks error:", error);
      alert(
        error.response?.data?.message ||
          "Unable to load completed collections"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p style={{ color: "#64748b" }}>Loading completed collections...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        Completed Collections
      </h2>

      {completedTasks.length === 0 && (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          No completed collections yet.
        </div>
      )}

      {completedTasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ color: "#0f172a", fontSize: "18px" }}>
                {task.publicBookingId || task.public_booking_id || `HS-${task.id}`}
              </strong>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Completed On:{" "}
                {formatDate(task.updatedAt || task.updated_at || task.collectionDate)}
              </p>
            </div>

            <strong style={{ color: "#0f766e", fontSize: "18px" }}>
              {formatAmount(task.totalAmount || task.total_amount)}
            </strong>
          </div>

          <p style={{ margin: "8px 0", color: "#1e293b", fontWeight: 700 }}>
            {task.patientName || task.patient_name}
          </p>

          <p
            style={{
              margin: "6px 0",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Phone size={15} />
            {task.patientMobile || task.patient_mobile || "No mobile"}
          </p>

          <p
            style={{
              margin: "6px 0 12px",
              color: "#64748b",
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
            }}
          >
            <MapPin size={15} />
            {task.patientAddress || task.patient_address || "No address"}
          </p>

          <div
            style={{
              marginTop: "12px",
              background: "#f8fafc",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
            }}
          >
            <strong
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#0f172a",
              }}
            >
              <FlaskConical size={16} />
              Tests Done
            </strong>

            {task.tests?.length ? (
              <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                {task.tests.map((test, index) => (
                  <li key={index}>{getTestName(test)}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#64748b" }}>No test details available.</p>
            )}
          </div>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#16a34a",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            <CheckCircle size={16} />
            {(task.status || "completed").replaceAll("_", " ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;