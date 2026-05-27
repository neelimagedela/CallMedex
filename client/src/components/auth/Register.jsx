import React, { useState } from "react";
import "./Auth.css";
import DoctorFields from "./roles/doctor/DoctorFields";
import PatientFields from "./roles/patient/PatientFields";
import AdminFields from "./roles/admin/AdminFields";
import PharmacyFields from "./roles/pharmacy/PharmacyFields";
import OrganizationFields from "./roles/organization/OrganizationFields";
import PhleboFields from "./roles/phlebo/PhleboFields";
import { api } from "../../shared/api";

const Register = ({ setPage }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: ""
  });

  const [roleData, setRoleData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // OTP state
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const processRoleData = async (data) => {
    const processed = { ...data };
    for (const key in processed) {
      if (processed[key] instanceof File) {
        try {
          processed[key] = await fileToBase64(processed[key]);
        } catch (err) {
          console.error(`Failed to convert file for ${key}:`, err);
        }
      }
    }
    return processed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a role to register");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: selectedRole === "phlebotomist" ? "phlebo" : selectedRole
      };
      
      const response = await api.post("/auth/register", payload);

      if (response.data.success) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      // 1. Verify OTP
      const otpResponse = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email"
      });

      if (otpResponse.data.success) {
        // 2. Process and submit role-specific detailed onboarding fields
        const cleanedRoleData = await processRoleData(roleData);
        
        await api.post("/profile/onboard", {
          userId,
          role: selectedRole === "phlebotomist" ? "phlebo" : selectedRole,
          ...cleanedRoleData
        });

        alert("Account created and onboarded successfully!");
        setPage("login");
      } else {
        setError(otpResponse.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP Verification/Onboarding error:", err);
      setError(err.response?.data?.message || "OTP Verification/Onboarding failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "500px", padding: "40px" }}>
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>Verify OTP</h1>
            <p className="register-subtitle">Enter the 6-digit verification code sent to your email.</p>
          </div>

          {error && <div className="error-message" style={{ color: "#ef4444", marginBottom: "15px", fontWeight: "600", textAlign: "center" }}>{error}</div>}

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>Enter OTP Code</label>
              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{ textAlign: "center", letterSpacing: "8px", fontSize: "24px", fontWeight: "700" }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Complete Onboarding"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="register-header">
          <h1 className="register-title">Create Your Account</h1>
          <p className="register-subtitle">Join CallMedex healthcare ecosystem</p>
        </div>

        <p className="auth-subtitle">Register for CallMedex</p>

        {error && <div className="error-message" style={{ color: "#ef4444", marginBottom: "15px", fontWeight: "600" }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Common Registration Fields */}
          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="section-card">
            <h3 className="section-title" style={{ fontSize: "24px" }}>Address Information</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>
          </div>

          {/* Dropdown */}
          <div className="form-group">
            <label>Select Role</label>
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setRoleData({});
              }}
              required
            >
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="phlebotomist">Phlebotomist</option>
              <option value="patient">Patient</option>
              <option value="organization">Organization</option>
              <option value="pharmacy">Pharmacy</option>
            </select>
          </div>

          {/* Dynamic Components */}
          {selectedRole === "doctor" && <DoctorFields onChange={setRoleData} />}
          {selectedRole === "patient" && <PatientFields onChange={setRoleData} />}
          {selectedRole === "admin" && <AdminFields onChange={setRoleData} />}
          {selectedRole === "pharmacy" && <PharmacyFields onChange={setRoleData} />}
          {selectedRole === "organization" && <OrganizationFields onChange={setRoleData} />}
          {selectedRole === "phlebotomist" && <PhleboFields onChange={setRoleData} />}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?
          <span onClick={() => setPage("login")}> Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;