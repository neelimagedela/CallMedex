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
        Admin professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Access Level</label>
          <input
            type="text"
            value={state.accessLevel}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "accessLevel",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Office Location</label>
          <input
            type="text"
            value={state.officeLocation}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "officeLocation",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            value={state.joiningDate}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "joiningDate",
                value: e.target.value,
              })
            }
          />
        </div>


      </div>
    </div>
  );
}