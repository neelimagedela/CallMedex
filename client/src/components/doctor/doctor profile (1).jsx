import { useState } from "react";

const initialProfile = {
  firstName: "Kavitha",
  lastName: "Menon",
  email: "kavitha.doc@medicore.in",
  phone: "9876543210",
};

export default function MyProfile() {
  const [form, setForm] = useState(initialProfile);
  const [saved, setSaved] = useState(initialProfile);
  const [saveStatus, setSaveStatus] = useState(null); // null | "success" | "error"
  const [errors, setErrors] = useState({});
  const [showBanner, setShowBanner] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required.";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Valid 10-digit phone number is required.";
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSaveStatus("error");
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3500);
      return;
    }
    setSaved({ ...form });
    setSaveStatus("success");
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3500);
  };

  const initials = `${saved.firstName[0] || ""}${saved.lastName[0] || ""}`.toUpperCase();
  const displayName = `${saved.firstName} ${saved.lastName}`.trim();

  const inputStyle = (field) => ({
    width: "100%",
    background: "#1a1f2e",
    border: `1.5px solid ${errors[field] ? "#f87171" : "#2d3348"}`,
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#e2e8f0",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0f1118;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
        }

        .profile-wrapper {
          background: #0f1118;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 16px 64px;
        }

        .profile-container {
          width: 100%;
          max-width: 640px;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .page-title svg {
          color: #7c6cfa;
        }

        .page-title h1 {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.5px;
        }

        .card {
          background: #161b27;
          border: 1px solid #232a3b;
          border-radius: 18px;
          overflow: hidden;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 28px 24px;
          border-bottom: 1px solid #232a3b;
        }

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: 1px;
        }

        .profile-info { display: flex; flex-direction: column; gap: 4px; }

        .profile-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.3px;
        }

        .profile-role {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .badge {
          display: inline-block;
          background: transparent;
          border: 1.5px solid #38bdf8;
          color: #38bdf8;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 6px;
          letter-spacing: 1.5px;
          width: fit-content;
        }

        .form-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }

        .form-group { display: flex; flex-direction: column; gap: 7px; }

        .form-label {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .form-input {
          background: #1a1f2e !important;
          border: 1.5px solid #2d3348;
          border-radius: 10px;
          padding: 13px 16px;
          color: #e2e8f0;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .form-input.error { border-color: #f87171 !important; }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-top: 2px;
        }

        .save-btn {
          width: 100%;
          padding: 15px;
          background: #2563eb;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(37,99,235,0.25);
          margin-top: 4px;
        }

        .save-btn:hover {
          background: #1d4ed8;
          box-shadow: 0 6px 24px rgba(37,99,235,0.38);
          transform: translateY(-1px);
        }

        .save-btn:active { transform: translateY(0); }

        .banner {
          position: fixed;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 26px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          z-index: 9999;
          animation: slideDown 0.35s cubic-bezier(.22,1,.36,1);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }

        .banner.success {
          background: #052e16;
          border: 1.5px solid #22c55e;
          color: #4ade80;
        }

        .banner.error {
          background: #1c0606;
          border: 1.5px solid #f87171;
          color: #fca5a5;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-18px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .saved-preview {
          background: #0d1520;
          border: 1px solid #1e3a5f;
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 4px;
        }

        .saved-preview-title {
          font-size: 11px;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .saved-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 20px;
        }

        .saved-field { display: flex; flex-direction: column; gap: 2px; }

        .saved-field-label {
          font-size: 10px;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .saved-field-value {
          font-size: 14px;
          color: #cbd5e1;
          font-weight: 500;
        }
      `}</style>

      {showBanner && (
        <div className={`banner ${saveStatus}`}>
          {saveStatus === "success" ? (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#22c55e" opacity=".2"/>
                <path d="M7 13l3 3 7-7" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Changes saved successfully!
            </>
          ) : (
            <>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#f87171" opacity=".2"/>
                <path d="M12 8v4m0 4h.01" stroke="#fca5a5" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Please fix the errors before saving.
            </>
          )}
        </div>
      )}

      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="page-title">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="#7c6cfa" strokeWidth="2"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#7c6cfa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1>My Profile</h1>
          </div>

          <div className="card">
            <div className="profile-header">
              <div className="avatar">{initials}</div>
              <div className="profile-info">
                <div className="profile-name">{displayName}</div>
                <div className="profile-role">Doctor</div>
                <div className="badge">DOC</div>
              </div>
            </div>

            <div className="form-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    className={`form-input${errors.firstName ? " error" : ""}`}
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="First name"
                  />
                  {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    className={`form-input${errors.lastName ? " error" : ""}`}
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Last name"
                  />
                  {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className={`form-input${errors.email ? " error" : ""}`}
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="Email address"
                  type="email"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className={`form-input${errors.phone ? " error" : ""}`}
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="10-digit phone number"
                  type="tel"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>

              {saveStatus === "success" && (
                <div className="saved-preview">
                  <div className="saved-preview-title">✓ Saved Profile</div>
                  <div className="saved-preview-grid">
                    <div className="saved-field">
                      <span className="saved-field-label">First Name</span>
                      <span className="saved-field-value">{saved.firstName}</span>
                    </div>
                    <div className="saved-field">
                      <span className="saved-field-label">Last Name</span>
                      <span className="saved-field-value">{saved.lastName}</span>
                    </div>
                    <div className="saved-field">
                      <span className="saved-field-label">Email</span>
                      <span className="saved-field-value">{saved.email}</span>
                    </div>
                    <div className="saved-field">
                      <span className="saved-field-label">Phone</span>
                      <span className="saved-field-value">{saved.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
