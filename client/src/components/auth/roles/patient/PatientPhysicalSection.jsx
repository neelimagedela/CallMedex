export default function PatientPhysicalSection({

  patientForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Physical Information
      </h2>

      <p className="section-subtitle">
        Enter your physical details
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Blood Group</label>

          <select

            value={patientForm.bloodGroup}

            onChange={(e) =>
              dispatch({
                name: "bloodGroup",
                value: e.target.value
              })
            }
          >

            <option value="">
              Select Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>

          </select>

        </div>

        <div className="form-group">

          <label>Height (cm)</label>

          <input
            type="number"

            value={patientForm.height}

            onChange={(e) =>
              dispatch({
                name: "height",
                value: e.target.value
              })
            }

            placeholder="Enter height"
          />
        </div>

        <div className="form-group">

          <label>Weight (kg)</label>

          <input
            type="number"

            value={patientForm.weight}

            onChange={(e) =>
              dispatch({
                name: "weight",
                value: e.target.value
              })
            }

            placeholder="Enter weight"
          />
        </div>

      </div>

    </div>
  );
}