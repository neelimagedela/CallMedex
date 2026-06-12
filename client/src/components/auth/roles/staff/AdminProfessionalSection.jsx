export default function AdminProfessionalSection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Professional Information
      </h3>

      <p className="section-subtitle">
        Staff professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>
            Organization Name *
          </label>
<select
  value={state.organizationName || ""}
  onChange={(e) =>
    dispatch({
      type: "UPDATE_FIELD",
      field: "organizationName",
      value: e.target.value,
    })
  }
>
  <option value="">Select Organization</option>
  <option value="Akkayapalem">Akkayapalem</option>
  <option value="Madhurawada">Madhurawada</option>
  <option value="KGH">KGH</option>
</select>
        </div>

        <div className="form-group">
          <label>
            Staff Role *
          </label>

          <select
            required
            value={state.staffRole}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "staffRole",
                value: e.target.value,
              })
            }
          >
            <option value="">
              Select Staff Role
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="receptionist">
              Receptionist
            </option>

            <option value="lab_technician">
              Lab Technician
            </option>

            <option value="phlebotomist">
              Phlebotomist
            </option>

            <option value="nurse">
              Nurse
            </option>

            <option value="billing_executive">
              Billing Executive
            </option>

            <option value="manager">
              Manager
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Department *
          </label>

          <select
            required
            value={state.department}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "department",
                value: e.target.value,
              })
            }
          >
            <option value="">
              Select Department
            </option>

            <option value="cardiology">
              Cardiology
            </option>

            <option value="radiology">
              Radiology
            </option>

            <option value="laboratory">
              Laboratory
            </option>

            <option value="reception">
              Reception
            </option>

            <option value="billing">
              Billing
            </option>

            <option value="administration">
              Administration
            </option>

            <option value="general">
              General
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Experience (Years) *
          </label>

          <input
            type="number"
            min="0"
            required
            placeholder="Enter years of experience"
            value={state.experience}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "experience",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>
    </div>
  );
}