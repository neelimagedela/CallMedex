import React, { useEffect, useState } from "react";
import axios from "axios";

const safeJsonArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getValue = (...values) => {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return "--";
};

const Profile = () => {
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      const res = await axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data?.data || {});
    } catch (err) {
      console.error("Failed to fetch phlebo profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const availableDays = safeJsonArray(
    profile.available_days || profile.availableDays
  );

  const morningStart = getValue(profile.morning_start, profile.morningStart);
  const morningEnd = getValue(profile.morning_end, profile.morningEnd);
  const eveningStart = getValue(profile.evening_start, profile.eveningStart);
  const eveningEnd = getValue(profile.evening_end, profile.eveningEnd);

  if (loading) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "inherit",
          padding: "30px",
        }}
      >
        <p style={{ color: "#64748b" }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", fontFamily: "inherit" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "#fff",
          padding: "30px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "30px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#38bdf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "700",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {(currentUser.name || profile.name || "P").charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "28px" }}>
            {currentUser.name || profile.name || "Phlebotomist"}
          </h2>

          <p style={{ margin: 0, color: "#cbd5e1", fontSize: "15px" }}>
            {currentUser.email || profile.email || "No email available"}
          </p>

          <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: "14px" }}>
            {currentUser.role || "phlebo"}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Account Details
          </h3>

          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Registered Email
              </label>

              <span
                style={{
                  fontSize: "15px",
                  color: "#334155",
                  fontWeight: "500",
                }}
              >
                {currentUser.email || profile.email || "N/A"}
              </span>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Contact Number
              </label>

              <span
                style={{
                  fontSize: "15px",
                  color: "#334155",
                  fontWeight: "500",
                }}
              >
                {currentUser.phone || profile.phone || "+91 XXXXX XXXXX"}
              </span>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Primary System Role
              </label>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  padding: "4px 10px",
                  background: "#f1f5f9",
                  color: "#475569",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {currentUser.role || "Phlebotomist"}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Professional Details
          </h3>

          <p>
            <strong>Phlebo Type:</strong>{" "}
            {getValue(profile.phlebo_type, profile.phleboType)}
          </p>

          <p>
            <strong>Qualification:</strong>{" "}
            {getValue(profile.qualification)}
          </p>

          <p>
            <strong>Specialization:</strong>{" "}
            {getValue(profile.specialization)}
          </p>

          <p>
            <strong>Certification Number:</strong>{" "}
            {getValue(profile.certification_number, profile.certificationNumber)}
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
            gridColumn: "1 / -1",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Availability Details
          </h3>

          <p>
            <strong>Available Days:</strong>{" "}
            {availableDays.length ? availableDays.join(", ") : "Not Available"}
          </p>

          <p>
            <strong>Morning Slot:</strong> {morningStart} - {morningEnd}
          </p>

          <p>
            <strong>Evening Slot:</strong> {eveningStart} - {eveningEnd}
          </p>

          <p>
            <strong>Home Collection:</strong>{" "}
            {profile.home_collection || profile.homeCollection ? "Yes" : "No"}
          </p>

          <p>
            <strong>Emergency Availability:</strong>{" "}
            {profile.emergency_availability || profile.emergencyAvailability
              ? "Yes"
              : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;