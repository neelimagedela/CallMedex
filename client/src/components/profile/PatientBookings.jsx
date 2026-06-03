import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "scan", label: "Scans" },
  { key: "home-service", label: "Home Tests" },
  { key: "walkin-center", label: "Walk-in Tests" },
  { key: "walkin-clinic", label: "Walk-in Clinics" },
  { key: "consultation-home", label: "Home Consultation" },
  { key: "tele-consultation", label: "Tele Consultation" },
  { key: "pharmacy", label: "Pharmacy" },
];

export default function PatientBookings({ setPage }) {
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);

      const res = await api.get("/profile/bookings");

      if (res.data.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Could not load previous bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (active === "all") return bookings;
    return bookings.filter((b) => b.bookingType === active);
  }, [active, bookings]);

  if (loading) {
    return (
      <main style={S.page}>
        <section style={S.header}>
          <h1 style={S.title}>Previous Bookings</h1>
          <p style={S.sub}>Loading your bookings. Please wait.</p>
        </section>
      </main>
    );
  }

  return (
    <main style={S.page}>
      <section style={S.header}>
        <div>
          <p style={S.eyebrow}>PATIENT BOOKINGS</p>
          <h1 style={S.title}>Previous Bookings</h1>
          <p style={S.sub}>
            View all your scan, test, consultation, clinic and pharmacy bookings.
          </p>
        </div>

        <button style={S.backBtn} onClick={() => setPage?.("profile")}>
          Back to Profile
        </button>
      </section>

      <section style={S.tabs}>
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            style={{
              ...S.tab,
              ...(active === filter.key ? S.tabActive : {}),
            }}
            onClick={() => setActive(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {filtered.length === 0 ? (
        <section style={S.empty}>
          <h2 style={S.emptyTitle}>No bookings found</h2>
          <p style={S.sub}>Your bookings will appear here after confirmation.</p>
          <button style={S.primaryBtn} onClick={() => setPage?.("home")}>
            Explore Services
          </button>
        </section>
      ) : (
        <section style={S.list}>
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </section>
      )}
    </main>
  );
}

function BookingCard({ booking }) {
  const items = Array.isArray(booking.items) ? booking.items : [];

  return (
    <article style={S.card}>
      <div style={S.cardTop}>
        <div>
          <p style={S.type}>{booking.typeLabel || "Booking"}</p>
          <h2 style={S.receipt}>{booking.receiptId || "Receipt pending"}</h2>
          <p style={S.dateLine}>
            {formatDate(booking.date)} {booking.timeSlot ? `• ${booking.timeSlot}` : ""}
          </p>
        </div>

        <span style={{ ...S.status, ...statusStyle(booking.status) }}>
          {toTitle(booking.status || "pending")}
        </span>
      </div>

      <div style={S.infoGrid}>
        <Info label="Patient" value={booking.patientName} />
        <Info label={booking.locationLabel || "Location"} value={booking.locationValue} />
        <Info label="Mobile" value={booking.patientMobile} />
        <Info label="Amount" value={`₹${Number(booking.totalAmount || 0).toFixed(2)}`} />
      </div>

      <div style={S.details}>
        <h3 style={S.detailsTitle}>{booking.detailTitle || "Details"}</h3>

        {items.length === 0 ? (
          <p style={S.muted}>No item details available.</p>
        ) : (
          <div style={S.itemList}>
            {items.map((item, index) => (
              <div key={index} style={S.item}>
                <span>
                  {item.name || "Item"}
                  {item.quantity ? ` x ${item.quantity}` : ""}
                </span>
                <strong>₹{Number(item.price || 0).toFixed(2)}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={S.actions}>
        <button type="button" style={S.outlineBtn} onClick={() => downloadReceipt(booking)}>
          Download Receipt
        </button>
      </div>
    </article>
  );
}

function Info({ label, value }) {
  return (
    <div style={S.info}>
      <span style={S.infoLabel}>{label}</span>
      <strong style={S.infoValue}>{value || "-"}</strong>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Date not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toTitle(value) {
  return String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function statusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value === "confirmed") {
    return { background: "#e0f2fe", color: "#075985" };
  }

  if (value === "completed") {
    return { background: "#dcfce7", color: "#166534" };
  }

  if (value === "cancelled") {
    return { background: "#fee2e2", color: "#991b1b" };
  }

  return { background: "#fef3c7", color: "#92400e" };
}

function downloadReceipt(booking) {
  const items = Array.isArray(booking.items) ? booking.items : [];

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td>${item.name || "Item"}${item.quantity ? ` x ${item.quantity}` : ""}</td>
          <td style="text-align:right">₹${Number(item.price || 0).toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Receipt ${booking.receiptId || ""}</title>
<style>
body{font-family:Arial,sans-serif;background:#f8fafc;color:#0f172a;padding:32px}
.card{max-width:680px;margin:auto;background:#fff;border-radius:18px;padding:32px;border:1px solid #e2e8f0}
h1{margin:0 0 6px;font-size:24px}
.sub{color:#64748b;margin:0 0 22px}
.row{display:flex;justify-content:space-between;border-bottom:1px solid #e2e8f0;padding:10px 0}
.row span{color:#64748b}
table{width:100%;border-collapse:collapse;margin-top:18px}
th,td{padding:10px;border-bottom:1px solid #e2e8f0;text-align:left}
.total{display:flex;justify-content:space-between;font-size:18px;font-weight:700;margin-top:18px}
button{margin-top:24px;width:100%;padding:12px;border:0;border-radius:10px;background:#0f4676;color:white;font-weight:700}
@media print{button{display:none}}
</style>
</head>
<body>
<div class="card">
<h1>CallMedex Booking Receipt</h1>
<p class="sub">${booking.typeLabel || "Booking"} • ${booking.receiptId || "-"}</p>

<div class="row"><span>Status</span><strong>${toTitle(booking.status || "pending")}</strong></div>
<div class="row"><span>Date</span><strong>${formatDate(booking.date)}</strong></div>
<div class="row"><span>Time Slot</span><strong>${booking.timeSlot || "-"}</strong></div>
<div class="row"><span>Patient</span><strong>${booking.patientName || "-"}</strong></div>
<div class="row"><span>Mobile</span><strong>${booking.patientMobile || "-"}</strong></div>
<div class="row"><span>${booking.locationLabel || "Location"}</span><strong>${booking.locationValue || "-"}</strong></div>

<table>
<thead>
<tr>
<th>${booking.detailTitle || "Details"}</th>
<th style="text-align:right">Amount</th>
</tr>
</thead>
<tbody>
${itemRows || `<tr><td>No item details available</td><td style="text-align:right">-</td></tr>`}
</tbody>
</table>

<div class="total">
<span>Total Amount</span>
<span>₹${Number(booking.totalAmount || 0).toFixed(2)}</span>
</div>

<button onclick="window.print()">Download / Save as PDF</button>
</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");

  if (!win) {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt_${booking.receiptId || "booking"}.html`;
    link.click();
  }
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#f4f8fb",
    padding: "115px 28px 60px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    maxWidth: 1180,
    margin: "0 auto 22px",
    background: "#fff",
    borderRadius: 22,
    padding: "30px 32px",
    boxShadow: "0 10px 28px rgba(15,23,42,.07)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
  },
  eyebrow: {
    margin: "0 0 8px",
    color: "#0f766e",
    fontSize: ".75rem",
    fontWeight: 900,
    letterSpacing: 1.5,
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: "2rem",
    fontWeight: 900,
  },
  sub: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: ".95rem",
  },
  backBtn: {
    border: "1px solid #dbe4ee",
    background: "#fff",
    color: "#0A2540",
    padding: "12px 20px",
    borderRadius: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
  tabs: {
    maxWidth: 1180,
    margin: "0 auto 22px",
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  tab: {
    border: "1px solid #dbe4ee",
    background: "#fff",
    color: "#334155",
    padding: "10px 16px",
    borderRadius: 999,
    fontWeight: 800,
    cursor: "pointer",
  },
  tabActive: {
    background: "#0f4676",
    color: "#fff",
    borderColor: "#0f4676",
  },
  list: {
    maxWidth: 1180,
    margin: "0 auto",
    display: "grid",
    gap: 18,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 10px 28px rgba(15,23,42,.07)",
    border: "1px solid #e8edf2",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    marginBottom: 20,
  },
  type: {
    margin: "0 0 6px",
    color: "#64748b",
    fontSize: ".78rem",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  receipt: {
    margin: 0,
    color: "#0A2540",
    fontSize: "1.35rem",
    fontWeight: 900,
  },
  dateLine: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: ".92rem",
  },
  status: {
    padding: "7px 14px",
    borderRadius: 999,
    fontWeight: 900,
    fontSize: ".78rem",
    whiteSpace: "nowrap",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    marginBottom: 18,
  },
  info: {
    background: "#f8fafc",
    border: "1px solid #e8edf2",
    borderRadius: 14,
    padding: "13px 14px",
  },
  infoLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: ".72rem",
    fontWeight: 800,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  infoValue: {
    color: "#0A2540",
    fontSize: ".9rem",
    overflowWrap: "anywhere",
  },
  details: {
    background: "#f8fafc",
    border: "1px solid #e8edf2",
    borderRadius: 16,
    padding: 18,
  },
  detailsTitle: {
    margin: "0 0 12px",
    color: "#0A2540",
    fontSize: "1rem",
    fontWeight: 900,
  },
  itemList: {
    display: "grid",
    gap: 8,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    background: "#fff",
    borderRadius: 12,
    padding: "10px 12px",
    color: "#334155",
  },
  muted: {
    color: "#64748b",
    margin: 0,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  outlineBtn: {
    border: "1px solid #0f4676",
    background: "#fff",
    color: "#0f4676",
    padding: "10px 16px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  empty: {
    maxWidth: 1180,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 22,
    padding: 34,
    textAlign: "center",
    boxShadow: "0 10px 28px rgba(15,23,42,.07)",
  },
  emptyTitle: {
    margin: 0,
    color: "#0A2540",
    fontSize: "1.4rem",
  },
  primaryBtn: {
    marginTop: 18,
    border: 0,
    background: "#0f4676",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
};