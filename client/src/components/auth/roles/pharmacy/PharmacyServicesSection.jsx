import React from "react";

const PharmacyServicesSection = ({
  pharmacyForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Pharmacy Services
      </h2>

      <p className="section-subtitle">
        Select available services
      </p>

      <div className="form-grid-2">

        {/* Home Delivery */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={pharmacyForm.homeDeliveryAvailable}
            onChange={() =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "homeDeliveryAvailable",
                value:
                  !pharmacyForm.homeDeliveryAvailable,
              })
            }
          />
          <span>Home Delivery</span>
        </label>


        {/* 24x7 Availability */}
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={pharmacyForm.availability24x7}
            onChange={() =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "availability24x7",
                value:
                  !pharmacyForm.availability24x7,
              })
            }
          />
          <span>24x7 Availability</span>
        </label>

      </div>

    </div>
  );
};

export default PharmacyServicesSection;