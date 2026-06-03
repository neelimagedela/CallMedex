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
    <label>Morning Start</label>
    <input
      type="time"
      value={phleboForm.morningStart}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          name: "morningStart",
          value: e.target.value,
        })
      }
    />
  </div>

  <div className="form-group">
    <label>Morning End</label>
    <input
      type="time"
      value={phleboForm.morningEnd}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          name: "morningEnd",
          value: e.target.value,
        })
      }
    />
  </div>

  <div className="form-group">
    <label>Evening Start</label>
    <input
      type="time"
      value={phleboForm.eveningStart}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          name: "eveningStart",
          value: e.target.value,
        })
      }
    />
  </div>

  <div className="form-group">
    <label>Evening End</label>
    <input
      type="time"
      value={phleboForm.eveningEnd}
      onChange={(e) =>
        dispatch({
          type: "UPDATE_FIELD",
          name: "eveningEnd",
          value: e.target.value,
        })
      }
    />
  </div>

</div>
<div className="form-group">
  <label>Available Days</label>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginTop: "10px",
    }}
  >
    {[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((day) => (
      <label key={day}>
        <input
          type="checkbox"
          checked={phleboForm.availableDays.includes(day)}
          onChange={(e) => {
            const updatedDays = e.target.checked
              ? [...phleboForm.availableDays, day]
              : phleboForm.availableDays.filter((d) => d !== day);

            dispatch({
              type: "UPDATE_FIELD",
              name: "availableDays",
              value: updatedDays,
            });
          }}
        />
        {" "}{day}
      </label>
    ))}
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