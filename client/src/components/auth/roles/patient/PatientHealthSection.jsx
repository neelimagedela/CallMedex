const conditions = [

  "BP",

  "Sugar",

  "Thyroid",

  "Anemia",

  "Asthma",

  "Heart Disease",

  "None",

  "Other"
];

export default function PatientHealthSection({

  patientForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Medical History
      </h2>

      <p className="section-subtitle">
        Select your medical conditions
      </p>

      <div className="pill-group">

        {conditions.map((condition) => (

          <button
            key={condition}

            type="button"

            className={`pill ${
              patientForm.medicalHistory.includes(condition)
                ? "active"
                : ""
            }`}

            onClick={() => {

              dispatch({
                type: "TOGGLE_CONDITION",
                value: condition
              });

              if (condition === "Other") {

                dispatch({
                  name: "hasOtherCondition",
                  value: !patientForm.hasOtherCondition
                });
              }
            }}
          >

            {condition}

          </button>

        ))}

      </div>

      {patientForm.hasOtherCondition && (

        <div
          className="form-group"
          style={{ marginTop: "25px" }}
        >

          <label>
            Other Medical Conditions
          </label>

          <textarea

            value={patientForm.otherCondition}

            onChange={(e) =>
              dispatch({
                name: "otherCondition",
                value: e.target.value
              })
            }

            placeholder="Enter your medical condition"
          />

        </div>
      )}

    </div>
  );
}