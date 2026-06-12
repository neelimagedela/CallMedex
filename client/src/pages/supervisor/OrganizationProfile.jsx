// client/src/pages/supervisor/OrganizationProfile.jsx
import React, { useEffect, useState } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import "./SupervisorPages.css";

const FIELD_MAP = [
  {
    key: "institution_name",
    label: "Institution Name",
    formKey: "institutionName",
  },
  {
    key: "license_number",
    label: "License Number",
    formKey: "licenseNumber",
  },
  {
    key: "head_of_institution",
    label: "Head of Institution",
    formKey: "headOfInstitution",
  },
  {
    key: "alt_phone",
    label: "Alternate Phone",
    formKey: null,
  },
  {
    key: "emergency_phone",
    label: "Emergency Phone",
    formKey: null,
  },
  {
    key: "branch",
    label: "Branch",
    formKey: null,
  },
];

export default function OrganizationProfile() {
  const [profile,  setProfile]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [editing,  setEditing]  = useState(false);
  const [form,     setForm]     = useState({});
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    supervisorApi
      .getProfile()
      .then((data) => {
  console.log("PROFILE DATA:", data);
  setProfile(data);
})
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await supervisorApi.updateProfile(form);
      showToast("Profile updated successfully");
      setEditing(false);
      // Refresh
      const updated = await supervisorApi.getProfile();
      setProfile(updated);
    } catch (err) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="sv-page"><div className="sv-loading">Loading profile...</div></div>;
  if (error)   return <div className="sv-page"><div className="sv-error">{error}</div></div>;
  if (!profile) return <div className="sv-page"><div className="sv-loading">No profile data found.</div></div>;

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Organization Profile</h1>
        <p className="sv-page-sub">Branch: <strong>{profile.branch}</strong></p>
      </div>

      {toast && (
        <div className={`sv-toast sv-toast-${toast.type}`}>{toast.msg}</div>
      )}

      <div className="sv-profile-card">
        {FIELD_MAP.map(({ key, label, formKey }) => (
          <div className="sv-profile-row" key={key}>
            <span className="sv-profile-label">{label}</span>
            {editing && formKey ? (
              <input
                className="sv-profile-input"
                value={form[formKey] || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [formKey]: e.target.value }))
                }
              />
            ) : (
              <span className="sv-profile-value">
  {profile[key] || (
    <em style={{ color: "#9ca3af" }}>
      Not set
    </em>
  )}
</span>
            )}
          </div>
        ))}

        <div className="sv-profile-actions">
          {!editing ? (
            <button className="sv-btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="sv-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button className="sv-btn-ghost" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
