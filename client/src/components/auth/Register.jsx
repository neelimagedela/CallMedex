import React, { useState } from "react";
import "./Auth.css";

import DoctorFields from "./roles/doctor/DoctorFields";
import PatientFields from "./roles/patient/PatientFields";
import AdminFields from "./roles/staff/StaffFields.jsx";
import PharmacyFields from "./roles/pharmacy/PharmacyFields";
import OrganizationFields from "./roles/organization/OrganizationFields";
import PhleboFields from "./roles/phlebo/PhleboFields";

import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const Register = ({ setPage }) => {
  const toast = useToast();

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
    country: "",
  });

  const [roleData, setRoleData] = useState({});
  const [loading, setLoading] = useState(false);

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [mouViewed, setMouViewed] = useState(false);

    const getMouFile = () => {
  if (selectedRole === "doctor") {
    return "/doctor-mou.pdf";
  }

  if (selectedRole === "organization") {
    return "/organization_mou.pdf";
  }

   if (selectedRole === "phlebotomist") {
  if (roleData.phleboType === "fullTime") {
    return "/phlebo-fulltime.pdf";
  }

  if (roleData.phleboType === "partTime") {
    return "/phlebo-parttime.pdf";
  }
}

  return null;
};
  const normalizedRole =
    selectedRole === "phlebotomist"
      ? "phlebo"
      : selectedRole === "staff"
      ? "staff"
      : selectedRole;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const processRoleData = async (data) => {
  const processed = { ...data };

  for (const key in processed) {
    if (
      processed[key] instanceof File &&
      key !== "medicalDegreeUpload" &&
      key !== "aadhaarUpload"
    ) {
      processed[key] = await fileToBase64(processed[key]);
    }

    if (Array.isArray(processed[key])) {
      const convertedArray = [];

      for (const item of processed[key]) {
        if (item instanceof File) {
          try {
            convertedArray.push(await fileToBase64(item));
          } catch (err) {
            console.error(
              `Failed to convert file array item for ${key}:`,
              err
            );
          }
        } else {
          convertedArray.push(item);
        }
      }

      processed[key] = convertedArray;
    }
  }

  return processed;
};

  const getMouId = (role) => {
  if (role === "doctor") return 1;
  if (role === "organization") return 2;
  if (role === "phlebotomist") return 3; 
  if (role === "staff") return 4;
  if (role === "pharmacy") return 5;
  return null;
};
   
   const acceptMou = async (userId, role) => {
  try {
    await api.post("/mou/accept", {
      user_id: userId,
      user_name: formData.name,
      role: normalizedRole,
    });
  } catch (err) {
    console.log(
      "❌ FRONTEND ERROR:",
      err.response?.data || err.message
    );
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.warning("Please select a role to continue registration.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please re-enter them.");
      return;
    }

    if (formData.password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }
    if ( selectedRole !== "patient" && !acceptedTerms) {
  toast.warning("Please read and accept the MOU before registration.");
  return;
}

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    if (selectedRole === "staff") {
      if (!roleData.organizationName?.trim()) {
        toast.warning("Organization Name is required.");
        return;
      }

      if (!roleData.staffRole) {
        toast.warning("Staff Role is required.");
        return;
      }

      if (!roleData.department) {
        toast.warning("Department is required.");
        return;
      }

      if (roleData.experience === "" || roleData.experience === null) {
        toast.warning("Experience is required.");
        return;
      }

      if (!roleData.alternatePhone) {
        toast.warning("Alternate Phone is required.");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(roleData.alternatePhone)) {
        toast.warning("Alternate Phone must be a valid 10-digit mobile number.");
        return;
      }

      if (!roleData.aadhaarUpload) {
        toast.warning("Please upload Aadhaar.");
        return;
      }

      if (!roleData.medicalDegreeUpload) {
        toast.warning("Please upload Medical Degree.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: normalizedRole,
        ...roleData,
      };

      const response = await api.post("/auth/register", payload);

      if (response.data.success) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);
        setOtp("");

        toast.info(
          "Registration started! Please check your email for the 6-digit OTP code."
        );
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 409) {
        toast.error(
          "An account already exists with this email or phone number. Please sign in instead."
        );
      } else if (status === 400) {
        toast.error(msg || "Some fields are invalid. Please review your details.");
      } else if (status === 429) {
        toast.warning(
          "Too many requests. Please wait a few minutes before trying again."
        );
      } else {
        toast.error(
          msg ||
            "Unable to register right now. Please check your internet and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Registration session missing. Please register again.");
      setShowOtpScreen(false);
      return;
    }

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      const otpResponse = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email",
      });

      if (!otpResponse.data.success) {
        toast.error(
          otpResponse.data.message || "OTP verification failed. Please try again."
        );
        return;
      }

      const cleanedRoleData = await processRoleData(roleData);

      await api.post("/profile/onboard", {
        userId,
        role: normalizedRole,
        ...cleanedRoleData,
      });
      await acceptMou(userId, normalizedRole);

      const isLabTechnicianStaff =
        normalizedRole === "staff" &&
        roleData.staffRole === "Lab Technician" &&
        roleData.organizationName?.trim();

      if (isLabTechnicianStaff) {
        toast.success("Lab Technician account created successfully!");

        setTimeout(() => {
          setPage("lab-technician-dashboard");
        }, 800);

        return;
      }

      toast.success(
        "Your account has been created and verified successfully! You can now sign in."
      );

      setTimeout(() => {
        setPage("login");
      }, 1200);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 400) {
        toast.error(
          msg ||
            "The OTP you entered is incorrect or has expired. Please request a new one."
        );
      } else if (status === 401) {
        toast.error("Session expired. Please go back and start registration again.");
      } else {
        toast.error(msg || "Verification or onboarding failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userId) {
      toast.error("Registration session missing. Please register again.");
      return;
    }

    if (!formData.email) {
      toast.error("Email is missing. Please go back and enter your email.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/resend-otp", {
        userId,
        type: "email",
        target: formData.email,
        name: formData.name,
      });

      setOtp("");
      toast.info("A new OTP has been sent to your email address.");
    } catch (err) {
      console.log("RESEND OTP ERROR:", err.response?.data || err.message);

      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Could not resend OTP. Please try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "500px", padding: "40px" }}>
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>
              Verify OTP
            </h1>

            <p className="register-subtitle">
              Enter the 6-digit verification code sent to your email.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>
                Enter OTP Code
              </label>

              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Complete Onboarding"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Didn&apos;t receive the code?{" "}
            <span
              onClick={!loading ? handleResendOtp : undefined}
              style={{
                color: loading ? "#94a3b8" : "#1B6CA8",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>
          </p>

          <p
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            <span
              onClick={() => {
                if (!loading) {
                  setShowOtpScreen(false);
                }
              }}
              style={{
                color: "#64748b",
                cursor: loading ? "not-allowed" : "pointer",
                textDecoration: "underline",
              }}
            >
              ← Back to Registration
            </span>
          </p>
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

        <form className="auth-form" onSubmit={handleSubmit}>
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
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  }))
                }
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
                placeholder="Create password (min 8 characters)"
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

          <div className="section-card">
            <h3 className="section-title" style={{ fontSize: "24px" }}>
              Address Information
            </h3>

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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                    }))
                  }
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
           <div className="form-group">
            <select
              value={selectedRole}
             onChange={(e) => {
            setSelectedRole(e.target.value);
            setRoleData({});
            setAcceptedTerms(false);
            setMouViewed(false);
            }}
              required
            >
              <option value="">Choose Role</option>
              <option value="doctor">Doctor</option>
              <option value="phlebotomist">Phlebotomist</option>
              <option value="patient">Patient</option>
              <option value="organization">Organization</option>
              <option value="staff">Staff</option>
              <option value="pharmacy">Pharmacy</option>
            </select>
          </div>

          {selectedRole === "doctor" && <DoctorFields onChange={setRoleData} />}

          {selectedRole === "patient" && (
            <PatientFields onChange={setRoleData} />
          )}

          {selectedRole === "staff" && <AdminFields onChange={setRoleData} />}

          {selectedRole === "pharmacy" && (
            <PharmacyFields onChange={setRoleData} />
          )}

          {selectedRole === "organization" && (
            <OrganizationFields onChange={setRoleData} />
          )}

          {selectedRole === "phlebotomist" && (
            <PhleboFields onChange={setRoleData} />
          )}
          {selectedRole &&
          selectedRole !== "patient"  && (
  <div className="mou-section">

   <button
  type="button"
  className="mou-btn"
  onClick={() => {
    const mouFile = getMouFile();

    if (!mouFile) {
      toast.warning("Please complete role details first.");
      return;
    }

    window.open(mouFile, "_blank");
    setMouViewed(true);
  }}
>
  View {selectedRole} MOU
</button>
    
<div style={{ marginTop: "10px" }}>
  <label>
    <input
      type="checkbox"
      checked={acceptedTerms}
      disabled={!mouViewed}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
    />
    {" "}I have read and accepted the MOU
  </label>
  {selectedRole &&
  selectedRole !== "patient" &&
  !mouViewed && (
    <p style={{ color: "red", fontSize: "12px" }}>
      Please view the MOU before accepting.
    </p>
)}
</div>

  </div>
)}

         <button
  type="submit"
  className="auth-btn"
  disabled={loading ||  (selectedRole !== "patient" && !acceptedTerms)}
>
  {loading ? "Registering..." : "Create Account"}
</button>
        </form>
           

     
        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={() => setPage("login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;