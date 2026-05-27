export default function AdminSecuritySection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Security Information
      </h3>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Official Email</label>
          <input
            type="email"
            value={state.officialEmail}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "officialEmail",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Alternate Phone</label>
          <input
            type="text"
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

        <div className="form-group">
          <label>Security Question</label>
          <input
            type="text"
            value={state.securityQuestion}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "securityQuestion",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Security Answer</label>
          <input
            type="text"
            value={state.securityAnswer}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "securityAnswer",
                value: e.target.value,
              })
            }
          />
        </div>

        

      </div>

      <div className="pill-group">
        <button
          type="button"
          className={
            state.twoFAEnabled ? "active" : ""
          }
          onClick={() =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "twoFAEnabled",
              value: !state.twoFAEnabled,
            })
          }
        >
          Two Factor Authentication
        </button>
      </div>

    </div>
  );
}