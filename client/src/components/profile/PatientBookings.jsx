import React, { useEffect, useState } from "react";
import { api } from "../../shared/api";
import { useToast } from "../../shared/toast.js";

export default function PatientBookings({ setPage }) {
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookings = async () => {
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
  };

  if (loading) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <h2 style={S.title}>Loading bookings...</h2>
          <p style={S.sub}>Please wait while we fetch your previous bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <p style={S.eyebrow}>PATIENT BOOKINGS</p>
          <h1 style={S.mainTitle}>Previous Bookings</h1>
          <p style={S.sub}>
            View your scan and diagnostic appointment history.
          </p>
        </div>

        <button style={S.backBtn} onClick={() => setPage?.("profile")}>
          Back to Profile
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={S.emptyCard}>
          <div style={S.emptyIcon}>📋</div>
          <h2 style={S.title}>No bookings found</h2>
          <p style={S.sub}>Your previous appointments will appear here.</p>
          <button style={S.primaryBtn} onClick={() => setPage?.("bodydiagnostics")}>
            Book a Scan
          </button>
        </div>
      ) : (
        <div style={S.list}>
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking }) {

  const isConsultation =
  booking.bookingType === "consultation";
  const scans = booking.scans || [];

  return (
    <div style={S.bookingCard}>
      <div style={S.bookingTop}>
        <div>
          <h2 style={S.bookingTitle}>
            {booking.receiptId || `Booking #${booking.id}`}
          </h2>
          <p style={S.sub}>
            {booking.appointmentDate} • {booking.timeSlot}
          </p>
        </div>

        <span style={{ ...S.status, ...statusStyle(booking.status) }}>
          {booking.status || "pending"}
        </span>
      </div>

      <div style={S.infoGrid}>
        <Info label="Patient" value={booking.patientName} />
        <Info label="Branch" value={booking.branch} />
        <Info label="Mobile" value={booking.patientMobile} />
        <Info label="Amount" value={`₹${booking.totalAmount}`} />
      </div>

      <div style={S.scanBox}>
        <h3 style={S.scanTitle}>
  {isConsultation
    ? "Consultation Service"
    : "Selected Scans"}
</h3>

        {isConsultation ? (
  <div>
    <p>Consultation at Home</p>
    <p>Date: {booking.appointmentDate}</p>
    <p>Time Slot: {booking.timeSlot}</p>
  </div>
) : scans.length === 0 ? (
  <p style={S.sub}>No scan details available.</p>
) : (
          <div style={S.scanList}>
            {scans.map((scan, index) => (
              <div key={scan.id || index} style={S.scanItem}>
                <span>{scan.name || scan.test_name || "Scan"}</span>
                <strong>₹{scan.price || 0}</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={S.infoItem}>
      <span style={S.infoLabel}>{label}</span>
      <strong style={S.infoValue}>{value || "-"}</strong>
    </div>
  );
}

function statusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value === "confirmed") {
    return { background: "#dcfce7", color: "#166534" };
  }

  if (value === "completed") {
    return { background: "#dbeafe", color: "#1e40af" };
  }

  if (value === "cancelled") {
    return { background: "#fee2e2", color: "#991b1b" };
  }

  return { background: "#fef3c7", color: "#92400e" };
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#f4f8fb",
    padding: "100px 28px 48px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    maxWidth: 1100,
    margin: "0 auto 20px",
    background: "#fff",
    borderRadius: 20,
    padding: "24px 26px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  eyebrow: {
    margin: "0 0 6px",
    color: "#22c1c3",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 1,
  },
  mainTitle: {
    margin: 0,
    color: "#0A2540",
    fontSize: 28,
    fontWeight: 800,
  },
  title: {
    margin: 0,
    color: "#0A2540",
    fontSize: 22,
    fontWeight: 800,
  },
  sub: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.6,
  },
  card: {
    maxWidth: 900,
    margin: "80px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  emptyCard: {
    maxWidth: 680,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  emptyIcon: {
    fontSize: 46,
    marginBottom: 12,
  },
  list: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gap: 16,
  },
  bookingCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    border: "1px solid #edf2f7",
  },
  bookingTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 18,
  },
  bookingTitle: {
    margin: 0,
    color: "#0A2540",
    fontSize: 20,
    fontWeight: 800,
  },
  status: {
    padding: "7px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    textTransform: "capitalize",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 18,
  },
  infoItem: {
    background: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: 12,
    padding: "10px 12px",
  },
  infoLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    color: "#0A2540",
    fontSize: 13,
  },
  scanBox: {
    background: "#f8fafc",
    border: "1px solid #edf2f7",
    borderRadius: 14,
    padding: 14,
  },
  scanTitle: {
    margin: "0 0 10px",
    fontSize: 15,
    color: "#0A2540",
  },
  scanList: {
    display: "grid",
    gap: 8,
  },
  scanItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    borderRadius: 10,
    padding: "10px 12px",
    color: "#334155",
  },
  prescription: {
    margin: "14px 0 0",
    color: "#64748b",
    fontSize: 13,
  },
  backBtn: {
    border: "1.5px solid #dbe4ee",
    background: "#fff",
    color: "#334155",
    padding: "11px 18px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  primaryBtn: {
    marginTop: 16,
    border: "none",
    background: "#0f4676",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
};