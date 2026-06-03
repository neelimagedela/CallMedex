import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // Retrieve the logged-in user profile payload from storage
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });
 const [profile, setProfile] = useState({});

useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    fetchProfile();
  }
}, []);

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(
      "http://localhost:5000/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    setProfile(res.data.data);
  } catch (err) {
    console.error(err);
  }
};
  // Mock secondary registration records matching employee credentials

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", fontFamily: "inherit" }}>
      {/* HEADER SUMMARY CRADLE */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "#fff",
        padding: "30px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        marginBottom: "30px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "bold",
          boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.2)"
        }}>
          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "P"}
        </div>
        
        <div>
          <h1 style={{ margin: "0 0 6px 0", fontSize: "24px", fontWeight: "700" }}>
            {currentUser.name || "Phlebotomist Specialist"}
          </h1>
          <div
        style={{
    fontSize: "14px",
    color: "#94a3b8",
     }}
      >
  Phlebotomist Profile
</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* LEFT COMPARTMENT: ACCOUNT GENERAL INFORMATION */}
        <div style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px" }}>
            Personal Credentials
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Registered Email</label>
              <span style={{ fontSize: "15px", color: "#334155", fontWeight: "500" }}>{currentUser.email || "N/A"}</span>
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Contact Number</label>
              <span style={{ fontSize: "15px", color: "#334155", fontWeight: "500" }}>{currentUser.phone || "+91 XXXXX XXXXX"}</span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Primary System Role</label>
              <span style={{ 
                display: "inline-block", 
                marginTop: "4px",
                padding: "4px 10px", 
                background: "#f1f5f9", 
                color: "#475569", 
                borderRadius: "4px", 
                fontSize: "12px", 
                fontWeight: "bold",
                textTransform: "uppercase"
              }}>
                {currentUser.role || "Phlebotomist"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COMPARTMENT: LOGISTICS & METRICS ACCOUNT */}
      
          <div
  style={{
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)"
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
  {profile?.available_days?.length
    ? profile.available_days.join(", ")
    : "Not Available"}
</p>

  <p>
    <strong>Morning Slot:</strong>{" "}
    {profile.morning_start || "--"} - {profile.morning_end || "--"}
  </p>

  <p>
    <strong>Evening Slot:</strong>{" "}
    {profile.evening_start || "--"} - {profile.evening_end || "--"}
  </p>

        </div>
      </div>
    </div>
  );
};

export default Profile;