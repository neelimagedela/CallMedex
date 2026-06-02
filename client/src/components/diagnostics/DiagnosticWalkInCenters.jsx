import React, { useEffect, useMemo, useState } from "react";
import { fetchHomeServiceTests } from "../homeServices/homeService.api";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";
import { downloadWalkInReceipt } from "./walkInReceipt";

const BRANCHES = ["Akkayapalem", "Madhurwada", "KGH Branch"];

const SLOTS = [
  { label: "9 AM - 10 AM", endHour: 10 },
  { label: "10 AM - 11 AM", endHour: 11 },
  { label: "11 AM - 12 PM", endHour: 12 },
  { label: "12 PM - 1 PM", endHour: 13 },
  { label: "2 PM - 3 PM", endHour: 15 },
  { label: "3 PM - 4 PM", endHour: 16 },
];

const S = {
  page: {
    display: "flex",
    gap: 20,
    padding: "100px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI',sans-serif",
  },
  sidebar: { width: 260, flexShrink: 0 },
  card: {
    background: "white",
    borderRadius: 20,
    padding: "20px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 16,
  },
  main: { flex: 1, minWidth: 0 },
  header: { marginBottom: 18 },
  h1: { fontSize: "1.7rem", color: "#0A2540", margin: 0, fontWeight: 700 },
  sub: { color: "#64748b", fontSize: ".88rem", marginTop: 4 },
  section: {
    background: "white",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },
  secHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#22c1c3",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: ".9rem",
    flexShrink: 0,
  },
  secTitle: { color: "#0A2540", fontSize: "1rem", fontWeight: 700, margin: 0 },
  secSub: { color: "#94a3b8", fontSize: ".8rem", margin: "2px 0 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 },
  inp: {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: ".88rem",
    outline: "none",
    background: "#f8fafc",
    boxSizing: "border-box",
  },
  inpErr: { borderColor: "#e63946" },
  errTxt: { color: "#e63946", fontSize: ".75rem", marginTop: 3 },
  label: {
    display: "block",
    fontSize: ".75rem",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  scanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))",
    gap: 12,
  },
  scanCard: {
    border: "2px solid #edf2f7",
    borderRadius: 16,
    padding: "14px 16px",
    cursor: "pointer",
    transition: ".25s",
    background: "#f8fafc",
  },
  scanSel: { borderColor: "#22c1c3", background: "#ecfcfc" },
  scanDis: {
    opacity: 0.45,
    cursor: "not-allowed",
    background: "#f1f5f9",
  },
  scanIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginBottom: 8,
  },
  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
    gap: 8,
  },
  slotCard: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "9px 12px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: ".83rem",
    fontWeight: 600,
    color: "#334155",
    transition: ".2s",
    background: "#f8fafc",
  },
  slotActive: {
    borderColor: "#22c1c3",
    background: "#ecfcfc",
    color: "#0A2540",
  },
  slotPast: {
    opacity: 0.4,
    cursor: "not-allowed",
    background: "#f1f5f9",
    textDecoration: "line-through",
    color: "#94a3b8",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0f4f8",
    fontSize: ".88rem",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0 0",
    fontWeight: 700,
    fontSize: "1rem",
    color: "#0A2540",
  },
  confirmBtn: {
    width: "100%",
    padding: "13px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: 4,
  },
};

function getTodayLocal() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isSlotPast(slotObj, selectedDate) {
  const today = getTodayLocal();
  const now = new Date();

  if (selectedDate !== today) return false;

  return now.getHours() >= slotObj.endHour;
}

function normalizeTest(test, category) {
  return {
    id: test.id,
    code: test.code || "",
    name: test.name || "Unnamed Test",
    subtitle: test.subtitle || "",
    price: Number(test.price || 0),
    oldPrice: Number(test.old_price || 0),
    icon: test.icon || "🧪",
    category: category.category_name,
    features: Array.isArray(test.features) ? test.features : [],
    instructions: Array.isArray(test.instructions) ? test.instructions : [],
  };
}

function validate(patient, branch, selectedTests, date, slot) {
  const e = {};

  if (!patient.name.trim()) e.name = "Full name is required";

  const age = Number(patient.age);
  if (!patient.age || age < 1 || age > 120) {
    e.age = "Enter a valid age";
  }

  if (!patient.sex) e.sex = "Please select gender";

  if (!/^[6-9]\d{9}$/.test(patient.mobile)) {
    e.mobile = "Enter valid 10-digit mobile number";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) {
    e.email = "Enter a valid email address";
  }

  if (!branch) e.branch = "Select a branch";
  if (!patient.address.trim()) e.address = "Address is required";
  if (selectedTests.length === 0) e.tests = "Select at least one test";
  if (!date) e.date = "Select walk-in date";
  if (!slot) e.slot = "Select time slot";

  return e;
}

export default function DiagnosticWalkInCenters() {
  const toast = useToast();
  const today = getTodayLocal();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [branch, setBranch] = useState("");
  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function loadTests() {
      try {
        setLoading(true);

        const result = await fetchHomeServiceTests();

        if (!result.success) {
          throw new Error(result.message || "Unable to load tests");
        }

        setCategories(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Unable to load walk-in center tests"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTests();
  }, []);

  const allTests = useMemo(() => {
    return categories.flatMap((category) =>
      category.tests.map((test) => normalizeTest(test, category))
    );
  }, [categories]);

  const filteredTests = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allTests.filter((test) => {
      const categoryMatch =
        selectedCategory === "all" || test.category === selectedCategory;

      const searchMatch =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.subtitle.toLowerCase().includes(q) ||
        test.code.toLowerCase().includes(q) ||
        test.features.some((feature) =>
          String(feature).toLowerCase().includes(q)
        );

      return categoryMatch && searchMatch;
    });
  }, [allTests, selectedCategory, search]);

  const total = selectedTests.reduce(
    (sum, test) => sum + Number(test.price),
    0
  );

  const toggleTest = (test) => {
    const exists = selectedTests.find((item) => item.id === test.id);

    if (exists) {
      setSelectedTests(selectedTests.filter((item) => item.id !== test.id));
      return;
    }

    if (selectedTests.length >= 2) {
      toast.warning("You can select a maximum of 2 tests.");
      return;
    }

    setSelectedTests([...selectedTests, test]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token || !user) {
      toast.error("Please log in as a patient before booking.");
      return;
    }

    if (user.role !== "patient") {
      toast.error("Only patient accounts can book walk-in center tests.");
      return;
    }

    const e = validate(patient, branch, selectedTests, date, slot);
    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.warning("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        patientName: patient.name.trim(),
        patientAge: Number(patient.age),
        patientSex: patient.sex,
        patientMobile: patient.mobile.trim(),
        patientEmail: patient.email.trim().toLowerCase(),
        patientAddress: patient.address.trim(),
        branch,
        tests: selectedTests.map((test) => ({ id: test.id })),
        walkinDate: date,
        timeSlot: slot,
        totalAmount: Number(total),
      };

      const response = await api.post("/walk-in-centers/book", payload);

      if (response.data.success) {
        setBooking(response.data.data);
        toast.success("Walk-in center test booked successfully.");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to book walk-in center test. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.main}>
          <div style={S.section}>
            <h1 style={S.h1}>Walk-in Center Tests</h1>
            <p style={S.sub}>Loading tests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.sidebar}>
        <div style={S.card}>
          <p
            style={{
              fontSize: ".7rem",
              fontWeight: 700,
              letterSpacing: 1,
              color: "#94a3b8",
              margin: "0 0 16px",
              textTransform: "uppercase",
            }}
          >
            Walk-in Center
          </p>

          <p
            style={{
              fontSize: ".85rem",
              color: "#64748b",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Visit your selected branch directly for blood sample tests like CBC,
            Thyroid, Sugar, Lipid Profile and more.
          </p>
        </div>

        <div style={S.card}>
          <p
            style={{
              fontSize: ".7rem",
              fontWeight: 700,
              letterSpacing: 1,
              color: "#94a3b8",
              margin: "0 0 12px",
              textTransform: "uppercase",
            }}
          >
            📍 Branches
          </p>

          {BRANCHES.map((b, i) => (
            <div
              key={b}
              style={{
                paddingBottom: 10,
                marginBottom: 10,
                borderBottom:
                  i < BRANCHES.length - 1 ? "1px solid #f0f4f8" : "none",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: ".83rem",
                  color: "#0A2540",
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={S.main}>
        <div style={S.header}>
          <h1 style={S.h1}>Book Walk-in Center Test</h1>
          <p style={S.sub}>
            Fill patient details, select tests, choose branch and visit the
            center during your selected slot.
          </p>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={S.badge}>1</div>
            <div>
              <p style={S.secTitle}>Patient Information</p>
              <p style={S.secSub}>Personal and contact details</p>
            </div>
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div style={{ gridColumn: "span 2" }}>
              <input
                style={{ ...S.inp, ...(errors.name ? S.inpErr : {}) }}
                placeholder="Full Name"
                value={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
              />
              {errors.name && <p style={S.errTxt}>⚠ {errors.name}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.age ? S.inpErr : {}) }}
                type="number"
                placeholder="Age"
                value={patient.age}
                onChange={(e) =>
                  setPatient({ ...patient, age: e.target.value })
                }
              />
              {errors.age && <p style={S.errTxt}>⚠ {errors.age}</p>}
            </div>
          </div>

          <div style={{ ...S.grid3, marginBottom: 10 }}>
            <div>
              <select
                style={{ ...S.inp, ...(errors.sex ? S.inpErr : {}) }}
                value={patient.sex}
                onChange={(e) =>
                  setPatient({ ...patient, sex: e.target.value })
                }
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.sex && <p style={S.errTxt}>⚠ {errors.sex}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.mobile ? S.inpErr : {}) }}
                placeholder="Mobile"
                value={patient.mobile}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
              />
              {errors.mobile && <p style={S.errTxt}>⚠ {errors.mobile}</p>}
            </div>

            <div>
              <input
                style={{ ...S.inp, ...(errors.email ? S.inpErr : {}) }}
                placeholder="Email"
                value={patient.email}
                onChange={(e) =>
                  setPatient({ ...patient, email: e.target.value })
                }
              />
              {errors.email && <p style={S.errTxt}>⚠ {errors.email}</p>}
            </div>
          </div>

          <div style={{ ...S.grid2, marginBottom: 10 }}>
            <div>
              <select
                style={{ ...S.inp, ...(errors.branch ? S.inpErr : {}) }}
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Select Branch</option>
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              {errors.branch && <p style={S.errTxt}>⚠ {errors.branch}</p>}
            </div>
          </div>

          <textarea
            style={{
              ...S.inp,
              ...(errors.address ? S.inpErr : {}),
              minHeight: 72,
              resize: "none",
            }}
            placeholder="Address"
            value={patient.address}
            onChange={(e) =>
              setPatient({ ...patient, address: e.target.value })
            }
          />

          {errors.address && <p style={S.errTxt}>⚠ {errors.address}</p>}
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#7c3aed" }}>2</div>
            <div>
              <p style={S.secTitle}>Select Tests</p>
              <p style={S.secSub}>Choose up to 2 walk-in center tests</p>
            </div>

            {errors.tests && (
              <p style={{ ...S.errTxt, marginLeft: "auto" }}>
                ⚠ {errors.tests}
              </p>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <input
              type="text"
              placeholder="Search tests"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={S.inp}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={S.inp}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_name}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          <div style={S.scanGrid}>
            {filteredTests.map((test) => {
              const isSel = selectedTests.some((item) => item.id === test.id);
              const disabled = !isSel && selectedTests.length >= 2;

              return (
                <div
                  key={test.id}
                  style={{
                    ...S.scanCard,
                    ...(isSel ? S.scanSel : {}),
                    ...(disabled ? S.scanDis : {}),
                  }}
                  onClick={() => !disabled && toggleTest(test)}
                >
                  <div style={S.scanIcon}>{test.icon}</div>

                  <p
                    style={{
                      margin: "0 0 2px",
                      fontWeight: 700,
                      fontSize: ".9rem",
                      color: "#0A2540",
                    }}
                  >
                    {test.name}
                  </p>

                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: ".75rem",
                      color: "#94a3b8",
                      lineHeight: 1.4,
                    }}
                  >
                    {test.subtitle}
                  </p>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: ".95rem",
                        color: "#0A2540",
                      }}
                    >
                      ₹{test.price}
                    </span>

                    {test.oldPrice > 0 && (
                      <span
                        style={{
                          fontSize: ".78rem",
                          color: "#b0bec5",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{test.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#0ea5e9" }}>3</div>
            <div>
              <p style={S.secTitle}>Date and Time Slot</p>
              <p style={S.secSub}>Choose when you will visit the center</p>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={S.label}>Walk-in Date</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSlot("");
              }}
              style={{
                ...S.inp,
                maxWidth: 220,
                ...(errors.date ? S.inpErr : {}),
              }}
            />
            {errors.date && <p style={S.errTxt}>⚠ {errors.date}</p>}
          </div>

          <div>
            <label style={S.label}>Time Slot</label>

            <div style={S.slotGrid}>
              {SLOTS.map((s) => {
                const past = isSlotPast(s, date);
                const active = slot === s.label;

                return (
                  <div
                    key={s.label}
                    style={{
                      ...S.slotCard,
                      ...(active ? S.slotActive : {}),
                      ...(past ? S.slotPast : {}),
                    }}
                    onClick={() => {
                      if (!past) setSlot(s.label);
                    }}
                  >
                    {s.label}

                    {past && (
                      <div
                        style={{
                          fontSize: ".65rem",
                          color: "#94a3b8",
                          marginTop: 2,
                        }}
                      >
                        Unavailable
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {errors.slot && <p style={S.errTxt}>⚠ {errors.slot}</p>}
          </div>
        </div>

        <div style={S.section}>
          <div style={S.secHead}>
            <div style={{ ...S.badge, background: "#10b981" }}>₹</div>
            <div>
              <p style={S.secTitle}>Price Summary</p>
              <p style={S.secSub}>Updates as you select tests</p>
            </div>
          </div>

          {selectedTests.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: ".85rem" }}>
              Select tests to see pricing
            </p>
          ) : (
            <>
              {selectedTests.map((test) => (
                <div key={test.id} style={S.summaryRow}>
                  <span>{test.name}</span>
                  <strong>₹{test.price}</strong>
                </div>
              ))}

              <div style={S.summaryTotal}>
                <span>Total Amount</span>
                <span style={{ color: "#e63946" }}>₹{total}</span>
              </div>
            </>
          )}
        </div>

        <button style={S.confirmBtn} onClick={handleSubmit}>
          Confirm Walk-in Booking →
        </button>

        {booking && (
          <div
            style={{
              ...S.section,
              marginTop: 22,
              border: "2px solid #22c1c3",
              background: "#ecfcfc",
            }}
          >
            <div style={S.secHead}>
              <div style={S.badge}>✓</div>

              <div>
                <p style={S.secTitle}>Booking Confirmed</p>
                <p style={S.secSub}>
                  Receipt ID: <strong>{booking.receiptId}</strong>
                </p>
              </div>
            </div>

            <p style={{ color: "#334155", lineHeight: 1.7 }}>
              Please visit <strong>{branch}</strong> on <strong>{date}</strong>{" "}
              during <strong>{slot}</strong>. Carry your receipt ID for faster
              processing.
            </p>

            <button
              style={{
                ...S.confirmBtn,
                background: "#10b981",
                width: "auto",
                padding: "11px 26px",
                marginTop: 12,
              }}
              onClick={() =>
                downloadWalkInReceipt({
                  booking,
                  patient,
                  branch,
                  selectedTests,
                  date,
                  slot,
                  total,
                })
              }
            >
              ⬇ Download Receipt / Save as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}