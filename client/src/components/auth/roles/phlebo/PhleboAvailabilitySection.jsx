import React from "react";

const PhleboAvailabilitySection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Availability Details
      </h2>

      <p className="section-subtitle">
        Configure working hours and service availability
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Available Time</label>

          <input
            type="text"
            placeholder="9 AM - 6 PM"
            value={phleboForm.availableTime}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "availableTime",
                value: e.target.value,
              })
            }
          />
        </div>


      </div>

      <div className="pill-group">

        <label>
          <input
            type="checkbox"
            checked={phleboForm.homeCollection}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "homeCollection",
                value: e.target.checked,
              })
            }
          />

          Home Collection
        </label>

        <label>
          <input
            type="checkbox"
            checked={phleboForm.emergencyAvailability}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "emergencyAvailability",
                value: e.target.checked,
              })
            }
          />

          Emergency Availability
        </label>

      </div>

    </div>
  );
};

export default PhleboAvailabilitySection;