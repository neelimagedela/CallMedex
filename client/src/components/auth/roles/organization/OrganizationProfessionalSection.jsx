export default function OrganizationProfessionalSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Professional Information
      </h2>

      <p className="section-subtitle">
        Enter organization professional details
      </p>

      <div className="form-grid-2">


        <div className="form-group">
          <label>Organization Name</label>

          <select
  name="organizationName"
  value={organizationForm.organizationName }
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
          <label>Organization Type</label>

          <select
            value={organizationForm.institutionType}
            onChange={(e) =>
              dispatch({
                name: "institutionType",
                value: e.target.value,
              })
            }
          >
            <option value="">Select type</option>
            <option>Hospital</option>
            <option>PolyClinic</option>
            <option>Clinic</option>
            <option>Diagonistic center</option>
          </select>
        </div>


        <div className="form-group">
          <label>License Number</label>

          <input
            type="text"
            placeholder="Enter license number"
            value={organizationForm.licenseNumber}
            onChange={(e) =>
              dispatch({
                name: "licenseNumber",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Establishment Year</label>

          <input
            type="number"
            placeholder="Enter establishment year"
            value={organizationForm.establishmentYear}
            onChange={(e) =>
              dispatch({
                name: "establishmentYear",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Ownership Type</label>

          <select
            value={organizationForm.ownershipType}
            onChange={(e) =>
              dispatch({
                name: "ownershipType",
                value: e.target.value,
              })
            }
          >
            <option value="">Select ownership</option>
            <option>Government</option>
            <option>Private</option>
            <option>Trust</option>
            <option>Corporate</option>
          </select>
        </div>


      </div>


    </div>
  );
}