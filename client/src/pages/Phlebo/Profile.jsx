import React, { useEffect, useState } from "react";
import { phleboApi } from "./phlebo.api";

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

const fieldCard = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
};

const labelStyle = {
  color: "#64748b",
  fontSize: "14px",
  marginBottom: "4px",
};

const valueStyle = {
  color: "#0f172a",
  fontSize: "16px",
  fontWeight: "700",
  wordBreak: "break-word",
};

function InfoItem({ label, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
      }}
    >
      <p style={labelStyle}>{label}</p>
      <p style={valueStyle}>{value}</p>
    </div>
  );
}

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await phleboApi.getProfile();

      setProfile(res.data?.data || {});
    } catch (err) {
      console.error("Failed to fetch phlebo profile:", err);
      alert(err.response?.data?.message || "Failed to load phlebo profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
          padding: "30px",
        }}
      >
        <p style={{ color: "#64748b" }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0f766e, #0891b2)",
          color: "#fff",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "30px" }}>
          {getValue(profile.name, "Phlebo Profile")}
        </h2>

        <p style={{ marginTop: "8px", opacity: 0.95 }}>
          Manage your registered details, availability, and home collection
          profile.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        <div style={fieldCard}>
          <h3
            style={{
              margin: "0 0 18px",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Basic Details
          </h3>

          <div style={{ display: "grid", gap: "12px" }}>
            <InfoItem
              label="Public ID"
              value={getValue(profile.public_user_id, profile.publicUserId)}
            />

            <InfoItem label="Name" value={getValue(profile.name)} />

            <InfoItem label="Email" value={getValue(profile.email)} />

            <InfoItem
              label="Phone Number"
              value={getValue(profile.phone)}
            />

            <InfoItem label="Role" value={getValue(profile.role)} />
          </div>
        </div>

        <div style={fieldCard}>
          <h3
            style={{
              margin: "0 0 18px",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Professional Details
          </h3>

          <div style={{ display: "grid", gap: "12px" }}>
            <InfoItem
              label="Phlebo Type"
              value={getValue(profile.phlebo_type, profile.phleboType)}
            />

            <InfoItem
              label="Qualification"
              value={getValue(profile.qualification)}
            />

            <InfoItem
              label="Specialization"
              value={getValue(profile.specialization)}
            />

            <InfoItem
              label="Years of Experience"
              value={getValue(
                profile.years_of_experience,
                profile.yearsOfExperience
              )}
            />

            <InfoItem
              label="Certification Number"
              value={getValue(
                profile.certification_number,
                profile.certificationNumber
              )}
            />
          </div>
        </div>

        <div style={{ ...fieldCard, gridColumn: "1 / -1" }}>
          <h3
            style={{
              margin: "0 0 18px",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            Availability Details
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "12px",
            }}
          >
            <InfoItem
              label="Available Days"
              value={
                availableDays.length
                  ? availableDays.join(", ")
                  : "Not Available"
              }
            />

            <InfoItem
              label="Morning Slot"
              value={`${morningStart} - ${morningEnd}`}
            />

            <InfoItem
              label="Evening Slot"
              value={`${eveningStart} - ${eveningEnd}`}
            />

            <InfoItem
              label="Home Collection"
              value={
                profile.home_collection || profile.homeCollection
                  ? "Yes"
                  : "No"
              }
            />

            <InfoItem
              label="Emergency Availability"
              value={
                profile.emergency_availability || profile.emergencyAvailability
                  ? "Yes"
                  : "No"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;