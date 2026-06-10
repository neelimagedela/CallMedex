export default function AdminSecuritySection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Additional Contact Information
      </h3>

      <div className="form-grid-2">

        <div className="form-group">
          <label>
            Alternate Phone *
          </label>

          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            placeholder="Enter alternate phone number"
            value={state.alternatePhone}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "alternatePhone",
                value: e.target.value,
              })
            }
          />
        </div>

      </div>

    </div>
  );
}