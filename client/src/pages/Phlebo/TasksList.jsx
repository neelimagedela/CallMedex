import React, { useEffect, useState } from "react";
import { usePhlebo } from "../../context/PhleboContext";
import {
  Phone,
  MapPin,
  Navigation,
  FlaskConical,
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

const updateCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await phleboApi.updateLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            isAvailable: true,
          });

          resolve(true);
        } catch (error) {
          reject(error);
        }
      },
      () => {
        reject(
          new Error(
            "Please allow location access to receive nearby collections."
          )
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

const TasksList = () => {
  const { setPage } = usePhlebo();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationReady, setLocationReady] = useState(false);
  const [accepting, setAccepting] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      await updateCurrentLocation();
      setLocationReady(true);

      const response = await phleboApi.getBookings();
      const data = response.data?.data || [];

      // Only show unassigned pending bookings in the job requests list.
      const pending = data.filter(
        (booking) => booking.status === "pending" && !booking.assignedPhleboId
      );

      setRequests(pending);
    } catch (error) {
      console.error("Phlebo request loading error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to load nearby home service requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (job) => {
    // Use the numeric DB id, not publicBookingId.
    const bookingId = job.id;

    if (accepting === bookingId) return;
    setAccepting(bookingId);

    try {
      const res = await phleboApi.acceptBooking(bookingId);
      const message = res.data?.message || "Collection accepted successfully.";

      // Both a fresh accept and "already in your active collection" go to active page.
      alert(message);
      setPage("phlebo-active");
    } catch (error) {
      const serverMessage = error.response?.data?.message;

      if (error.response?.status === 409) {
        // Could be accepted_by_another, not_pending, or race_condition.
        alert(serverMessage || "This booking is no longer available.");
      } else {
        alert(serverMessage || "Unable to accept this booking. Please try again.");
      }

      // Refresh the list so the stale booking disappears.
      fetchRequests();
    } finally {
      setAccepting(null);
    }
  };

  const handleHide = (jobId) => {
    setRequests((prev) => prev.filter((item) => item.id !== jobId));
  };

  return (
    <div style={{ fontFamily: "inherit", padding: "12px 0" }}>
      <h2
        style={{
          marginBottom: "10px",
          fontSize: "22px",
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
        Nearby Home Service Requests
      </h2>

      <p style={{ color: "#64748b", marginTop: 0, marginBottom: "20px" }}>
        Only pending home-service test collections near your live location will
        appear here.
      </p>

      <button
        type="button"
        onClick={fetchRequests}
        style={{
          background: "#0f766e",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          fontWeight: "700",
          cursor: "pointer",
          marginBottom: "18px",
        }}
      >
        <Navigation size={15} /> Refresh Nearby Requests
      </button>

      {loading && (
        <div
          style={{
            padding: "20px",
            background: "#f1f5f9",
            borderRadius: "8px",
            color: "#64748b",
          }}
        >
          Updating your location and loading nearby requests...
        </div>
      )}

      {!loading && !locationReady && (
        <div
          style={{
            padding: "20px",
            background: "#fef2f2",
            borderRadius: "8px",
            color: "#b91c1c",
          }}
        >
          Location permission is required to receive nearby collections.
        </div>
      )}

      {!loading && locationReady && requests.length === 0 && (
        <div
          style={{
            padding: "20px",
            background: "#f1f5f9",
            borderRadius: "8px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          No nearby home service requests right now.
        </div>
      )}

      {!loading &&
        locationReady &&
        requests.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
              maxWidth: "760px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dashed #e2e8f0",
                paddingBottom: "12px",
                marginBottom: "15px",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#334155" }}>
                ID: {job.publicBookingId}
              </span>

              <span
                style={{
                  color: "#0f766e",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {job.distanceKm ? `${job.distanceKm} km away` : "Nearby"}
              </span>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid #e2e8f0",
                marginBottom: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
                  Patient Details
                </p>

                <p style={{ margin: "0 0 6px" }}>
                  <strong>Name:</strong> {job.patientName}
                </p>

                <p style={{ margin: "0 0 6px" }}>
                  <strong>Age/Gender:</strong> {job.patientAge} /{" "}
                  {job.patientSex}
                </p>

                <p
                  style={{
                    margin: "0 0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Phone size={14} />
                  {job.patientMobile}
                </p>

                <p
                  style={{
                    margin: 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "6px",
                    color: "#475569",
                    fontSize: "14px",
                  }}
                >
                  <MapPin size={14} style={{ marginTop: "2px", flexShrink: 0 }} />
                  {job.patientAddress}
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
                  Collection Details
                </p>

                <p style={{ margin: "0 0 6px" }}>
                  <strong>Date:</strong> {formatDate(job.collectionDate)}
                </p>

                <p style={{ margin: "0 0 6px" }}>
                  <strong>Slot:</strong> {job.timeSlot}
                </p>

                <p style={{ margin: "0 0 6px" }}>
                  <strong>Branch:</strong> {job.branch}
                </p>

                <p style={{ margin: 0 }}>
                  <strong>Amount:</strong> {formatAmount(job.totalAmount)}
                </p>
              </div>
            </div>

            {/* Tests */}
            <div
              style={{
                background: "#f0fdf4",
                borderRadius: "10px",
                padding: "14px",
                border: "1px solid #bbf7d0",
                marginBottom: "18px",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#15803d",
                }}
              >
                <FlaskConical size={16} /> Home Service Tests
              </p>

              {job.tests?.length ? (
                job.tests.map((test, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom:
                        i < job.tests.length - 1 ? "1px solid #d1fae5" : "none",
                      fontSize: "15px",
                    }}
                  >
                    <span>{getTestName(test)}</span>
                    <strong>{formatAmount(test.price)}</strong>
                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b", margin: 0 }}>No test details.</p>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                disabled={accepting === job.id}
                onClick={() => handleAccept(job)}
                style={{
                  background: accepting === job.id ? "#94a3b8" : "#0f766e",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: accepting === job.id ? "not-allowed" : "pointer",
                  fontSize: "14px",
                }}
              >
                {accepting === job.id ? "Accepting..." : "Accept Collection"}
              </button>

              <button
                type="button"
                onClick={() => handleHide(job.id)}
                style={{
                  background: "#fff",
                  color: "#ef4444",
                  border: "1px solid #fca5a5",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Hide
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TasksList;