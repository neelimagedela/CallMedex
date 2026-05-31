import React, { useEffect, useMemo, useState } from "react";
import {
  fetchPharmacyPatientDetails,
  fetchPharmacyMedicines,
  createPharmacyOrder,
} from "./pharmacy.api";
import { useToast } from "../../shared/toast.js";

const S = {
  page: { padding: "110px 28px 48px", background: "#f4f8fb", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" },
  wrap: { maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 },
  card: { background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 18px rgba(0,0,0,.07)", marginBottom: 18 },
  title: { margin: 0, color: "#0A2540", fontSize: "1.8rem", fontWeight: 800 },
  sub: { color: "#64748b", marginTop: 6, fontSize: ".9rem" },
  sectionTitle: { margin: "0 0 14px", color: "#0A2540", fontSize: "1.05rem", fontWeight: 800 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  input: { width: "100%", padding: "11px 13px", border: "1.5px solid #e2e8f0", borderRadius: 12, outline: "none", fontSize: ".9rem", background: "#f8fafc", boxSizing: "border-box" },
  label: { display: "block", fontSize: ".75rem", fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".4px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: ".88rem" },
  th: { textAlign: "left", padding: "10px 8px", background: "#f8fafc", color: "#64748b", borderBottom: "1px solid #e2e8f0", fontSize: ".76rem", textTransform: "uppercase" },
  td: { padding: "11px 8px", borderBottom: "1px solid #f1f5f9", color: "#334155" },
  btn: { border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 800, cursor: "pointer" },
  primaryBtn: { background: "#e63946", color: "#fff" },
  greenBtn: { background: "#10b981", color: "#fff" },
  ghostBtn: { background: "#f1f5f9", color: "#0A2540" },
  dangerText: { color: "#e63946", fontWeight: 700 },
  row: { display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 0", borderBottom: "1px solid #f1f5f9", fontSize: ".9rem" },
  totalRow: { display: "flex", justifyContent: "space-between", gap: 10, paddingTop: 14, fontWeight: 900, fontSize: "1.05rem", color: "#0A2540" },
  badge: { display: "inline-block", background: "#ecfcfc", color: "#0A9C87", padding: "3px 8px", borderRadius: 999, fontSize: ".7rem", fontWeight: 800 },
};

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
}

function validateDelivery(form, selectedItems) {
  const errors = {};
  if (!form.deliveryName.trim()) errors.deliveryName = "Name is required";
  if (!/^[6-9]\d{9}$/.test(form.deliveryPhone)) errors.deliveryPhone = "Enter valid 10-digit mobile number";
  if (!form.deliveryAddress.trim()) errors.deliveryAddress = "Delivery address is required";
  if (form.pincode && !/^\d{6}$/.test(form.pincode)) errors.pincode = "Enter valid 6-digit pincode";
  if (selectedItems.length === 0) errors.items = "Select at least one medicine";
  return errors;
}

export default function PharmacyHomeDelivery({ setPage }) {
  const toast = useToast();

  const [patient, setPatient] = useState(null);
  const [deliveryForm, setDeliveryForm] = useState({
    deliveryName: "", deliveryPhone: "", deliveryAddress: "",
    city: "", state: "", pincode: "",
  });

  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [booking, setBooking] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = getStoredUser();

    if (!token || !storedUser) {
      toast.error("Please log in as a patient before booking medicines.");
      setPage?.("login");
      return;
    }

    if (storedUser.role !== "patient") {
      toast.error("Only patient accounts can book medicines. Please log in with a patient account.");
      setPage?.("home");
      return;
    }

    let mounted = true;

    const loadPatient = async () => {
      try {
        setLoadingPatient(true);
        const result = await fetchPharmacyPatientDetails();
        if (!result.success) throw new Error(result.message || "Unable to load patient details");
        if (!mounted) return;

        const data = result.data;
        setPatient(data);
        setDeliveryForm({
          deliveryName: data.name || "",
          deliveryPhone: data.phone || "",
          deliveryAddress: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
        });
      } catch (err) {
        const message = err.response?.data?.message || err.message || "Unable to load patient details";
        toast.error(message);
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setPage?.("login");
        }
      } finally {
        if (mounted) setLoadingPatient(false);
      }
    };

    loadPatient();
    return () => { mounted = false; };
  }, [setPage]);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(async () => {
      try {
        setLoadingMedicines(true);
        const result = await fetchPharmacyMedicines(search);
        if (!result.success) throw new Error(result.message || "Unable to load medicines");
        if (mounted) setMedicines(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        if (mounted) toast.error(err.response?.data?.message || err.message || "Unable to load medicines. Please try again.");
      } finally {
        if (mounted) setLoadingMedicines(false);
      }
    }, 350);
    return () => { mounted = false; clearTimeout(timer); };
  }, [search]);

  const subtotal = useMemo(() =>
    selectedItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [selectedItems]
  );
  const deliveryCharge = subtotal >= 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const addMedicine = (medicine) => {
    setSuccessOrder(null);
    setSelectedItems((prev) => {
      const existing = prev.find(item => item.medicineId === medicine.id);
      if (existing) {
        if (existing.quantity + 1 > medicine.stockQuantity) {
          toast.warning(`Only ${medicine.stockQuantity} units of "${medicine.medicineName}" are available in stock.`);
          return prev;
        }
        return prev.map(item =>
          item.medicineId === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        medicineId: medicine.id,
        medicineName: medicine.medicineName,
        price: Number(medicine.price),
        stockQuantity: Number(medicine.stockQuantity),
        quantity: 1,
      }];
    });
  };

  const updateQuantity = (medicineId, value) => {
    const quantity = Number(value);
    setSelectedItems((prev) =>
      prev.map(item => {
        if (item.medicineId !== medicineId) return item;
        if (!Number.isInteger(quantity) || quantity < 1) return { ...item, quantity: 1 };
        if (quantity > item.stockQuantity) {
          toast.warning(`Only ${item.stockQuantity} units available for "${item.medicineName}".`);
          return { ...item, quantity: item.stockQuantity };
        }
        return { ...item, quantity };
      })
    );
  };

  const removeMedicine = (medicineId) => {
    setSelectedItems(prev => prev.filter(item => item.medicineId !== medicineId));
  };

  const handleBook = async () => {
    setSuccessOrder(null);
    const errors = validateDelivery(deliveryForm, selectedItems);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.warning("Please fill in all required delivery details before placing your order.");
      return;
    }

    const payload = {
      deliveryName: deliveryForm.deliveryName.trim(),
      deliveryPhone: deliveryForm.deliveryPhone.trim(),
      deliveryAddress: deliveryForm.deliveryAddress.trim(),
      city: deliveryForm.city.trim() || null,
      state: deliveryForm.state.trim() || null,
      pincode: deliveryForm.pincode.trim() || null,
      items: selectedItems.map(item => ({ medicineId: item.medicineId, quantity: item.quantity })),
    };

    try {
      setBooking(true);
      const result = await createPharmacyOrder(payload);
      if (!result.success) throw new Error(result.message || "Medicine booking failed");

      setSuccessOrder(result.data);
      toast.success("Your medicine order has been placed successfully! We will deliver it to your address.");
      setSelectedItems([]);
      setSearch("");
      setFormErrors({});
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Medicine booking failed. Please try again.";
      toast.error(message);
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setPage?.("login");
      }
    } finally {
      setBooking(false);
    }
  };

  if (loadingPatient) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Pharmacy Home Delivery</h1>
          <p style={S.sub}>Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h1 style={S.title}>Pharmacy Home Delivery</h1>
          <p style={S.dangerText}>Unable to load patient details. Please log in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={{ maxWidth: 1180, margin: "0 auto 18px" }}>
        <h1 style={S.title}>Pharmacy Home Delivery</h1>
        <p style={S.sub}>Search medicines from database, select quantity, and book home delivery.</p>
      </div>

      <div style={S.wrap}>
        <main>
          <div style={S.card}>
            <h2 style={S.sectionTitle}>Patient &amp; Delivery Details</h2>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Name</label>
                <input style={S.input} value={deliveryForm.deliveryName}
                  onChange={e => setDeliveryForm({ ...deliveryForm, deliveryName: e.target.value })} />
                {formErrors.deliveryName && <p style={S.dangerText}>{formErrors.deliveryName}</p>}
              </div>
              <div>
                <label style={S.label}>Mobile</label>
                <input style={S.input} value={deliveryForm.deliveryPhone} maxLength={10}
                  onChange={e => setDeliveryForm({ ...deliveryForm, deliveryPhone: e.target.value.replace(/\D/g, "") })} />
                {formErrors.deliveryPhone && <p style={S.dangerText}>{formErrors.deliveryPhone}</p>}
              </div>
              <div>
                <label style={S.label}>Email</label>
                <input style={S.input} value={patient?.email || ""} readOnly />
              </div>
              <div>
                <label style={S.label}>Pincode</label>
                <input style={S.input} value={deliveryForm.pincode} maxLength={6}
                  onChange={e => setDeliveryForm({ ...deliveryForm, pincode: e.target.value.replace(/\D/g, "") })} />
                {formErrors.pincode && <p style={S.dangerText}>{formErrors.pincode}</p>}
              </div>
              <div>
                <label style={S.label}>City</label>
                <input style={S.input} value={deliveryForm.city}
                  onChange={e => setDeliveryForm({ ...deliveryForm, city: e.target.value })} />
              </div>
              <div>
                <label style={S.label}>State</label>
                <input style={S.input} value={deliveryForm.state}
                  onChange={e => setDeliveryForm({ ...deliveryForm, state: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={S.label}>Delivery Address</label>
              <textarea style={{ ...S.input, minHeight: 86, resize: "none" }}
                value={deliveryForm.deliveryAddress}
                onChange={e => setDeliveryForm({ ...deliveryForm, deliveryAddress: e.target.value })} />
              {formErrors.deliveryAddress && <p style={S.dangerText}>{formErrors.deliveryAddress}</p>}
            </div>
          </div>

          <div style={S.card}>
            <h2 style={S.sectionTitle}>Search Medicines</h2>
            <input style={{ ...S.input, marginBottom: 14 }}
              placeholder="Search tablet, medicine, brand, generic name..."
              value={search} onChange={e => setSearch(e.target.value)} />

            {loadingMedicines ? (
              <p style={S.sub}>Loading medicines...</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Medicine</th>
                      <th style={S.th}>Type</th>
                      <th style={S.th}>Strength</th>
                      <th style={S.th}>Price</th>
                      <th style={S.th}>Stock</th>
                      <th style={S.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map(medicine => (
                      <tr key={medicine.id}>
                        <td style={S.td}>
                          <strong>{medicine.medicineName}</strong>
                          <div style={{ color: "#94a3b8", fontSize: ".76rem" }}>
                            {medicine.genericName || "Generic"} · {medicine.brandName || "Brand"}
                          </div>
                          {medicine.requiresPrescription && <span style={S.badge}>Prescription required</span>}
                        </td>
                        <td style={S.td}>{medicine.medicineType}</td>
                        <td style={S.td}>{medicine.strength || "-"}</td>
                        <td style={S.td}>₹{medicine.price}</td>
                        <td style={S.td}>{medicine.stockQuantity}</td>
                        <td style={S.td}>
                          <button style={{ ...S.btn, ...S.greenBtn }} onClick={() => addMedicine(medicine)}>Add</button>
                        </td>
                      </tr>
                    ))}
                    {medicines.length === 0 && (
                      <tr><td style={S.td} colSpan={6}>No medicines found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        <aside>
          <div style={S.card}>
            <h2 style={S.sectionTitle}>Selected Medicines</h2>
            {formErrors.items && <p style={S.dangerText}>{formErrors.items}</p>}
            {selectedItems.length === 0 ? (
              <p style={S.sub}>No medicine selected yet.</p>
            ) : (
              selectedItems.map(item => (
                <div key={item.medicineId} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, color: "#0A2540" }}>{item.medicineName}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 8, marginTop: 8, alignItems: "center" }}>
                    <input type="number" min="1" max={item.stockQuantity} value={item.quantity} style={S.input}
                      onChange={e => updateQuantity(item.medicineId, e.target.value)} />
                    <span style={{ color: "#64748b", fontSize: ".85rem" }}>₹{item.price} × {item.quantity}</span>
                    <button style={{ ...S.btn, ...S.ghostBtn }} onClick={() => removeMedicine(item.medicineId)}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={S.card}>
            <h2 style={S.sectionTitle}>Price Summary</h2>
            <div style={S.row}><span>Medicine subtotal</span><strong>₹{subtotal}</strong></div>
            <div style={S.row}>
              <span>Delivery charge {subtotal >= 500 ? "(Free above ₹500)" : ""}</span>
              <strong style={{ color: deliveryCharge === 0 ? "#10b981" : "#0A2540" }}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </strong>
            </div>
            <div style={S.totalRow}><span>Total</span><span>₹{total}</span></div>

            <button
              style={{ ...S.btn, ...S.primaryBtn, width: "100%", marginTop: 18, opacity: booking ? 0.6 : 1 }}
              disabled={booking} onClick={handleBook}>
              {booking ? "Placing Order..." : "Book Medicine Delivery"}
            </button>

            {successOrder && (
              <div style={{ marginTop: 16, background: "#ecfcfc", border: "1.5px solid #22c1c3", borderRadius: 14, padding: 12 }}>
                <strong style={{ color: "#0A2540" }}>Order placed successfully! 🎉</strong>
                <p style={{ margin: "6px 0 0", color: "#64748b" }}>Order ID: {successOrder.publicOrderId}</p>
                <p style={{ margin: "4px 0 0", fontSize: ".82rem", color: "#64748b" }}>We will deliver to your address shortly.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}