import React, { useState } from "react";
import "./Auth.css";
import DoctorFields from "./roles/doctor/DoctorFields";
import PatientFields from "./roles/patient/PatientFields";
import AdminFields from "./roles/admin/AdminFields";
import PharmacyFields from "./roles/pharmacy/PharmacyFields";
import OrganizationFields from "./roles/organization/OrganizationFields";
import PhleboFields from "./roles/phlebo/PhleboFields";

const Register = ({ setPage }) => {

  const [selectedRole, setSelectedRole] = useState("");


  return (
    <div className="auth-container">

      <div className="auth-card register-card">

        <div className="register-header">

        <h1 className="register-title">
           Create Your Account
        </h1>

        <p className="register-subtitle">
          Join CallMedex healthcare ecosystem
        </p>

      </div>

        <p className="auth-subtitle">
          Register for CallMedex
        </p>

        <form className="auth-form">

          {/* Common Registration Fields */}

<div className="form-group">
  <label>Full Name</label>

  <input
    type="text"
    placeholder="Enter full name"
  />
</div>

<div className="form-group">
  <label>Gender</label>

  <select>
    <option value="">
      Select Gender
    </option>

    <option value="male">
      Male
    </option>

    <option value="female">
      Female
    </option>

    <option value="other">
      Other
    </option>
  </select>
</div>

<div className="form-group">
  <label>Date of Birth</label>

  <input
    type="date"
  />
</div>

<div className="form-group">
  <label>Email</label>

  <input
    type="email"
    placeholder="Enter email"
  />
</div>

<div className="form-group">
  <label>Mobile Number</label>

  <input
    type="text"
    placeholder="Enter mobile number"
  />
</div>

<div className="form-group">
  <label>Password</label>

  <input
    type="password"
    placeholder="Create password"
  />
</div>

<div className="form-group">
  <label>Confirm Password</label>

  <input
    type="password"
    placeholder="Confirm password"
  />
</div>

{/* Address Information */}

<div className="section-card">

  <h3 className="section-title">
    Address Information
  </h3>

  <div className="form-grid-2">

    <div className="form-group">
      <label>Address</label>

      <input
        type="text"
        placeholder="Enter address"
      />
    </div>

    <div className="form-group">
      <label>City</label>

      <input
        type="text"
        placeholder="Enter city"
      />
    </div>

    <div className="form-group">
      <label>District</label>

      <input
        type="text"
        placeholder="Enter district"
      />
    </div>

    <div className="form-group">
      <label>State</label>

      <input
        type="text"
        placeholder="Enter state"
      />
    </div>

    <div className="form-group">
      <label>Pincode</label>

      <input
        type="text"
        placeholder="Enter pincode"
      />
    </div>

    <div className="form-group">
      <label>Country</label>

      <input
        type="text"
        placeholder="Enter country"
      />
    </div>

  </div>

</div>

          {/* Dropdown */}

          <div className="form-group">

            <label>Select Role</label>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >

              <option value="">
                Choose Role
              </option>

              <option value="admin">
                Admin
              </option>

              <option value="doctor">
                Doctor
              </option>

              <option value="phlebotomist">
                Phlebotomist
              </option>

              <option value="patient">
                Patient
              </option>

              <option value="organization">
                Organization
              </option>

              <option value="pharmacy">
                Pharmacy
              </option>

            </select>

          </div>

          {/* Dynamic Components */}

          {selectedRole === "doctor" && <DoctorFields />}

          {selectedRole === "patient" && <PatientFields />}

          {selectedRole === "admin" && <AdminFields />}

          {selectedRole === "pharmacy" && <PharmacyFields />}

          {selectedRole === "organization" && <OrganizationFields />}

          {selectedRole === "phlebotomist" && <PhleboFields />}

          <button type="submit" className="auth-btn">
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;