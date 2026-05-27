import React from "react";

const PharmacyProfessionalSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Pharmacy Information
      </h2>

      <p className="section-subtitle">
        Enter pharmacy professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Pharmacy Name</label>

          <input
            type="text"
            placeholder="Enter pharmacy name"
            value={pharmacyForm.pharmacyName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyName",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Pharmacy Type</label>

          <input
            type="text"
            placeholder="Retail / Hospital / Clinic"
            value={pharmacyForm.pharmacyType}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyType",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Owner Name</label>

          <input
            type="text"
            placeholder="Enter owner name"
            value={pharmacyForm.ownerName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "ownerName",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Pharmacist In Charge</label>

          <input
            type="text"
            placeholder="Enter pharmacist name"
            value={pharmacyForm.pharmacistInCharge}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacistInCharge",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Years Of Operation</label>

          <input
            type="number"
            placeholder="Enter years"
            value={pharmacyForm.yearsOfOperation}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "yearsOfOperation",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Operating Hours</label>

          <input
            type="text"
            placeholder="9AM - 10PM"
            value={pharmacyForm.operatingHours}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "operatingHours",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyProfessionalSection;