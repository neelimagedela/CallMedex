import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const CONDITIONS = ["BP", "Sugar", "Thyroid", "Anemia", "Asthma", "Heart Disease", "None", "Other"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  age: "",
  address: "",
  city: "",
  district: "",
  state: "",
  pincode: "",
  country: "India",
  bloodGroup: "",
  height: "",
  weight: "",
  medicalHistory: [],
  hasOtherCondition: false,
  otherCondition: "",
};
function toDateInputValue(value) {
  if (!value) return "";

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
function ageFromDob(dob) {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();

  if (Number.isNaN(birth.getTime()) || birth >= today) return "";

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;

  return age >= 0 && age <= 120 ? String(age) : "";
}

function normalize(data = {}) {
  return {
    ...initialForm,
    ...data,
    dob: toDateInputValue(data.dob),
    age: data.dob ? ageFromDob(toDateInputValue(data.dob)) : data.age || "",
    medicalHistory: Array.isArray(data.medicalHistory) ? data.medicalHistory : [],
    hasOtherCondition: Boolean(data.hasOtherCondition),
  };
}

export default function PatientProfile({ setPage, setUser }) {
  const toast = useToast();

  const [form, setForm] = useState(initialForm);
  const [backup, setBackup] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const readOnly = !edit;

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.phone,
      form.gender,
      form.dob,
      form.address,
      form.city,
      form.state,
      form.pincode,
      form.bloodGroup,
      form.height,
      form.weight,
    ];

    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || user.role !== "patient") {
      toast.error("Only patient accounts can access this page.");
      setPage?.("home");
      return;
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile/patient");

      if (res.data.success) {
        const profile = normalize(res.data.data);
        setForm(profile);
        setBackup(profile);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load profile details.");
    } finally {
      setLoading(false);
    }
  };

  const setField = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "dob") next.age = ageFromDob(value);
      return next;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleCondition = (condition) => {
    if (readOnly) return;

    setForm((prev) => {
      let history = prev.medicalHistory || [];

      if (condition === "None") {
        history = history.includes("None") ? [] : ["None"];
      } else {
        history = history.filter((item) => item !== "None");
        history = history.includes(condition)
          ? history.filter((item) => item !== condition)
          : [...history, condition];
      }

      const hasOther = history.includes("Other");

      return {
        ...prev,
        medicalHistory: history,
        hasOtherCondition: hasOther,
        otherCondition: hasOther ? prev.otherCondition : "",
      };
    });
  };

  const validate = () => {
    const e = {};
    const age = Number(ageFromDob(form.dob));
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!form.name.trim()) e.name = "Full name is required";
    else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) e.name = "Only letters allowed";
    else if (form.name.trim().length < 3) e.name = "Minimum 3 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Enter valid email";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      e.phone = "Enter valid 10-digit mobile number";
    }

    if (!["male", "female", "other"].includes(form.gender)) {
      e.gender = "Select gender";
    }

    if (!form.dob || !Number.isInteger(age) || age < 0 || age > 120) {
      e.dob = "Enter valid DOB";
    }

    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim() || form.city === "Please Choose City") {
  e.city = "Please select a valid city";
}
    if (!form.state.trim()) e.state = "State is required";

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      e.pincode = "Enter valid 6-digit pincode";
    }

    if (form.bloodGroup && !BLOOD_GROUPS.includes(form.bloodGroup)) {
      e.bloodGroup = "Invalid blood group";
    }

    if (form.height && (!Number.isFinite(height) || height < 30 || height > 250)) {
      e.height = "Height must be 30–250 cm";
    }

    if (form.weight && (!Number.isFinite(weight) || weight < 1 || weight > 300)) {
      e.weight = "Weight must be 1–300 kg";
    }

    if (form.medicalHistory.includes("Other") && !form.otherCondition.trim()) {
      e.otherCondition = "Enter other condition";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveProfile = async () => {
    if (!validate()) {
      toast.warning("Please fix highlighted fields.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
  ...form,
  name: form.name.trim(),
  email: form.email.trim().toLowerCase(),
  phone: form.phone.trim(),
  dob: toDateInputValue(form.dob),
  city: form.city === "Please Choose City" ? "" : form.city.trim(),
  district: form.district.trim(),
  state: form.state.trim(),
  address: form.address.trim(),
  pincode: form.pincode.trim(),
};

      const res = await api.put("/profile/patient", payload);

      if (res.data.success) {
        const updated = normalize(res.data.data);

        setForm(updated);
        setBackup(updated);
        setEdit(false);

        const storedUser = JSON.parse(localStorage.getItem("user") || "null");

        if (storedUser) {
          const nextUser = {
            ...storedUser,
            name: updated.name,
            email: updated.email,
          };

          localStorage.setItem("user", JSON.stringify(nextUser));
          setUser?.(nextUser);
        }

        toast.success("Profile updated successfully.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setForm(backup);
    setErrors({});
    setEdit(false);
  };

  const personalFields = [
    { name: "name", label: "Full Name", span: 2 },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        ["", "Select Gender"],
        ["male", "Male"],
        ["female", "Female"],
        ["other", "Other"],
      ],
    },
    { name: "email", label: "Email", type: "email" },
    {
      name: "phone",
      label: "Mobile Number",
      maxLength: 10,
      clean: (v) => v.replace(/\D/g, "").slice(0, 10),
    },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "age", label: "Age", type: "number", disabled: true },
  ];

  const addressFields = [
    { name: "address", label: "Address", span: 2 },
    { name: "city", label: "City" },
    { name: "district", label: "District" },
    { name: "state", label: "State" },
    {
      name: "pincode",
      label: "Pincode",
      maxLength: 6,
      clean: (v) => v.replace(/\D/g, "").slice(0, 6),
    },
    { name: "country", label: "Country" },
  ];

  const physicalFields = [
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      options: [["", "Select Blood Group"], ...BLOOD_GROUPS.map((g) => [g, g])],
    },
    { name: "height", label: "Height (cm)", type: "number", min: 30, max: 250 },
    { name: "weight", label: "Weight (kg)", type: "number", min: 1, max: 300 },
  ];

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.loadingCard}>
          <div style={S.loaderIcon}>👤</div>
          <h2 style={S.h1}>Loading Patient Profile</h2>
          <p style={S.sub}>Please wait while we fetch your saved details.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <aside style={S.sidebar}>
        <div style={S.sideCard}>
          <div style={S.avatar}>{form.name ? form.name[0].toUpperCase() : "P"}</div>
          <h2 style={S.sideName}>{form.name || "Patient"}</h2>
          <p style={S.sideMuted}>{form.email || "patient@callmedex.com"}</p>

          <div style={S.progressShell}>
            <div style={{ ...S.progressFill, width: `${completion}%` }} />
          </div>

          <p style={S.progressText}>{completion}% profile completed</p>

          <Info label="Patient ID" value={form.id || "After verification"} />
          <Info label="Role" value="Patient" />
          <Info label="Status" value={form.registrationStatus || "Verified"} />
        </div>

        <div style={{ ...S.sideCard, borderLeft: "4px solid #e63946" }}>
          <div style={S.quoteIcon}>❤️</div>
          <p style={S.quote}>
            Keep your profile updated so bookings, medicine delivery, and home
            services use the right details.
          </p>
          <p style={S.quoteBy}>— CallMedex Care Team</p>
        </div>
      </aside>

      <main style={S.main}>
        <header style={S.header}>
          <div>
            <p style={S.eyebrow}>PATIENT INTERFACE</p>
            <h1 style={S.mainTitle}>My Health Profile</h1>
            <p style={S.sub}>
              Review your registration and health details. Click edit only when
              you want to make changes.
            </p>
          </div>

          <ActionButtons
            edit={edit}
            saving={saving}
            onEdit={() => setEdit(true)}
            onCancel={cancelEdit}
            onSave={saveProfile}
          />
        </header>

        <Section number="1" title="Personal Information" sub="Basic account and identity details">
          <FieldGrid fields={personalFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={3} />
        </Section>

        <Section number="2" title="Address Information" sub="Used for bookings and deliveries" color="#7c3aed">
          <FieldGrid fields={addressFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={2} />
        </Section>

        <Section number="3" title="Physical Information" sub="Health parameters used for better care" color="#0ea5e9">
          <FieldGrid fields={physicalFields} form={form} errors={errors} readOnly={readOnly} setField={setField} columns={3} />
        </Section>

        <Section number="4" title="Medical History" sub="Select known conditions for safer support" color="#f59e0b">
          <div style={S.pillWrap}>
            {CONDITIONS.map((condition) => {
              const active = form.medicalHistory.includes(condition);

              return (
                <button
                  key={condition}
                  type="button"
                  disabled={readOnly}
                  onClick={() => toggleCondition(condition)}
                  style={{
                    ...S.pill,
                    ...(active ? S.pillActive : {}),
                    ...(readOnly ? S.pillDisabled : {}),
                  }}
                >
                  {condition}
                </button>
              );
            })}
          </div>

          {form.medicalHistory.includes("Other") && (
            <TextArea
              label="Other Medical Condition"
              value={form.otherCondition}
              disabled={readOnly}
              error={errors.otherCondition}
              onChange={(v) => setField("otherCondition", v)}
            />
          )}
        </Section>

        <div style={S.bottomActions}>
          <ActionButtons
            edit={edit}
            saving={saving}
            large
            onEdit={() => setEdit(true)}
            onCancel={cancelEdit}
            onSave={saveProfile}
          />
        </div>
      </main>
    </div>
  );
}

function FieldGrid({ fields, form, errors, readOnly, setField, columns }) {
  return (
    <div style={columns === 3 ? S.grid3 : S.grid2}>
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={form[field.name]}
          error={errors[field.name]}
          readOnly={readOnly}
          setField={setField}
        />
      ))}
    </div>
  );
}

function Field({ field, value, error, readOnly, setField }) {
  const disabled = readOnly || field.disabled;

  const handleChange = (v) => {
    const cleaned = field.clean ? field.clean(v) : v;
    setField(field.name, cleaned);
  };

  return (
    <div style={field.span ? { gridColumn: `span ${field.span}` } : {}}>
      <label style={S.label}>{field.label}</label>

      {field.type === "select" ? (
        <select
          value={value || ""}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...S.input, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
        >
          {field.options.map(([val, label]) => (
            <option key={val || label} value={val}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type || "text"}
          value={value || ""}
          disabled={disabled}
          min={field.min}
          max={field.max}
          maxLength={field.maxLength}
          onChange={(e) => handleChange(e.target.value)}
          style={{ ...S.input, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
        />
      )}

      {error && <p style={S.error}>⚠ {error}</p>}
    </div>
  );
}

function Section({ number, title, sub, color = "#22c1c3", children }) {
  return (
    <section style={S.section}>
      <div style={S.sectionHead}>
        <div style={{ ...S.badge, background: color }}>{number}</div>
        <div>
          <h2 style={S.sectionTitle}>{title}</h2>
          <p style={S.sectionSub}>{sub}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div style={S.infoItem}>
      <span style={S.infoLabel}>{label}</span>
      <strong style={S.infoValue}>{value}</strong>
    </div>
  );
}

function TextArea({ label, value, onChange, disabled, error }) {
  return (
    <div style={{ marginTop: 18 }}>
      <label style={S.label}>{label}</label>
      <textarea
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ ...S.textarea, ...(disabled ? S.disabledInput : {}), ...(error ? S.inputError : {}) }}
      />
      {error && <p style={S.error}>⚠ {error}</p>}
    </div>
  );
}

function ActionButtons({ edit, saving, large, onEdit, onCancel, onSave }) {
  if (!edit) {
    return (
      <button style={large ? S.confirmBtn : S.editBtnTop} onClick={onEdit}>
        ✏️ Edit Profile
      </button>
    );
  }

  return (
    <div style={S.topActions}>
      <button style={large ? S.cancelBtnLarge : S.cancelBtn} onClick={onCancel} disabled={saving}>
        Cancel
      </button>

      <button style={large ? S.confirmBtn : S.saveBtn} onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

const S = {
  page: {
    display: "flex",
    gap: 20,
    padding: "100px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  sidebar: { width: 280, flexShrink: 0 },
  main: { flex: 1, minWidth: 0 },
  sideCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 16,
    border: "1px solid #edf2f7",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#0f4676,#22c1c3)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 800,
    marginBottom: 14,
  },
  sideName: { margin: "0 0 4px", color: "#0A2540", fontSize: 20, fontWeight: 800 },
  sideMuted: { margin: 0, color: "#64748b", fontSize: 13, wordBreak: "break-word" },
  progressShell: {
    width: "100%",
    height: 8,
    background: "#e8edf2",
    borderRadius: 999,
    marginTop: 18,
    overflow: "hidden",
  },
  progressFill: { height: "100%", background: "#22c1c3", borderRadius: 999 },
  progressText: { margin: "8px 0 18px", fontSize: 12, color: "#64748b", fontWeight: 700 },
  infoItem: {
    padding: "10px 12px",
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid #edf2f7",
    marginBottom: 10,
  },
  infoLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: { color: "#0A2540", fontSize: 13 },
  quoteIcon: { fontSize: 24, marginBottom: 8 },
  quote: { margin: "0 0 8px", color: "#64748b", lineHeight: 1.6, fontSize: 13, fontStyle: "italic" },
  quoteBy: { margin: 0, color: "#e63946", fontWeight: 800, fontSize: 12 },
  header: {
    background: "#fff",
    borderRadius: 20,
    padding: "24px 26px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 18,
    border: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  eyebrow: { margin: "0 0 6px", color: "#22c1c3", fontWeight: 800, fontSize: 12, letterSpacing: 1 },
  mainTitle: { margin: 0, color: "#0A2540", fontSize: 28, fontWeight: 800 },
  sub: { margin: "5px 0 0", color: "#64748b", fontSize: 14, lineHeight: 1.6 },
  section: {
    background: "#fff",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  sectionHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    flexShrink: 0,
  },
  sectionTitle: { margin: 0, color: "#0A2540", fontSize: 18, fontWeight: 800 },
  sectionSub: { margin: "2px 0 0", color: "#94a3b8", fontSize: 13 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
  label: {
    display: "block",
    marginBottom: 6,
    color: "#64748b",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    background: "#f8fafc",
    color: "#0A2540",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    border: "1.5px solid #e8edf2",
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    resize: "vertical",
    background: "#f8fafc",
    color: "#0A2540",
  },
  disabledInput: { cursor: "not-allowed", opacity: 0.9 },
  inputError: { borderColor: "#e63946", background: "#fff7f7" },
  error: { margin: "4px 0 0", color: "#e63946", fontSize: 11, fontWeight: 700 },
  pillWrap: { display: "flex", flexWrap: "wrap", gap: 10 },
  pill: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1.5px solid #dbe4ee",
    background: "#f8fafc",
    color: "#334155",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },
  pillActive: { background: "#0f4676", color: "#fff", borderColor: "#0f4676" },
  pillDisabled: { cursor: "not-allowed" },
  topActions: { display: "flex", gap: 10 },
  editBtnTop: {
    border: "none",
    background: "#0f4676",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  saveBtn: {
    border: "none",
    background: "#10b981",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  cancelBtn: {
    border: "1.5px solid #dbe4ee",
    background: "#fff",
    color: "#334155",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  bottomActions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 4 },
  confirmBtn: {
    padding: "13px 28px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  cancelBtnLarge: {
    padding: "13px 28px",
    background: "#fff",
    color: "#334155",
    border: "1.5px solid #dbe4ee",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
  loadingCard: {
    maxWidth: 520,
    margin: "120px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  loaderIcon: { fontSize: 42, marginBottom: 12 },
  h1: { margin: 0, color: "#0A2540", fontSize: 24 },
};