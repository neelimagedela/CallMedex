export default function OrganizationContactSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Contact Information
      </h2>

      <p className="section-subtitle">
        Emergency and alternate contact details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Alternate Phone</label>

          <input
            type="text"
            placeholder="Enter alternate phone"
            value={organizationForm.altPhone}
            onChange={(e) =>
              dispatch({
                name: "altPhone",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Emergency Phone</label>

          <input
            type="text"
            placeholder="Enter emergency phone"
            value={organizationForm.emergencyPhone}
            onChange={(e) =>
              dispatch({
                name: "emergencyPhone",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
}