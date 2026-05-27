import React from "react";

const PhleboProfessionalSection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Professional Details
      </h2>

      <p className="section-subtitle">
        Add qualification and professional experience
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Qualification</label>

          <input
            type="text"
            value={phleboForm.qualification}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "qualification",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>

          <input
            type="text"
            value={phleboForm.specialization}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "specialization",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Years Of Experience</label>

          <input
            type="number"
            value={phleboForm.yearsOfExperience}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "yearsOfExperience",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Certification Number</label>

          <input
            type="text"
            value={phleboForm.certificationNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "certificationNumber",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PhleboProfessionalSection;