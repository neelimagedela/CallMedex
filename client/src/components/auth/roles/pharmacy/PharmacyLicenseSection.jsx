import React from "react";

const PharmacyLicenseSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        License Information
      </h2>

      <p className="section-subtitle">
        Enter pharmacy registration details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Registration Number</label>

          <input
            type="text"
            placeholder="Enter registration number"
            value={pharmacyForm.registrationNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "registrationNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Drug License Number</label>

          <input
            type="text"
            placeholder="Enter drug license number"
            value={pharmacyForm.drugLicenseNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "drugLicenseNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>GST Number</label>

          <input
            type="text"
            placeholder="Enter GST number"
            value={pharmacyForm.gstNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "gstNumber",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyLicenseSection;