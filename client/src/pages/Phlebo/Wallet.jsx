import React, { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Award,
  Calendar,
  RefreshCcw,
} from "lucide-react";
import { api } from "../../shared/api";

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAmount = (value) => {
  return `₹${Number(value || 0).toFixed(2)}`;
};

const PhleboWallet = () => {
  const [wallet, setWallet] = useState({
    amountPerTask: 150,
    completedTasks: 0,
    walletBalance: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWallet = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/home-service/phlebo/wallet");

      if (response.data.success) {
        setWallet(response.data.data);
      } else {
        setError(response.data.message || "Could not load wallet.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not load wallet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <p style={S.label}>Phlebo Wallet</p>
          <h1 style={S.title}>Earnings Wallet</h1>
          <p style={S.sub}>
            Every completed home service collection adds ₹150 to your wallet.
          </p>
        </div>

        <button type="button" style={S.refreshBtn} onClick={loadWallet}>
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {loading && (
        <div style={S.empty}>
          <p style={{ margin: 0 }}>Loading wallet...</p>
        </div>
      )}

      {!loading && error && (
        <div
          style={{
            ...S.empty,
            borderColor: "#fecaca",
            background: "#fff5f5",
          }}
        >
          <p style={{ color: "#991b1b", fontWeight: 800, margin: 0 }}>
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div style={S.cards}>
            <div style={S.mainCard}>
              <div style={S.iconBox}>
                <Wallet size={30} />
              </div>

              <p style={S.mainCardLabel}>Available Balance</p>

              <h2 style={S.balance}>
                {formatAmount(wallet.walletBalance)}
              </h2>

              <p style={S.mainCardSub}>
                {wallet.completedTasks || 0} completed task
                {Number(wallet.completedTasks || 0) === 1 ? "" : "s"} ×{" "}
                {formatAmount(wallet.amountPerTask || 150)}
              </p>
            </div>

            <div style={S.smallCard}>
              <TrendingUp size={24} color="#0f766e" />

              <p style={S.cardLabel}>Completed Tasks</p>

              <h3 style={S.smallValue}>{wallet.completedTasks || 0}</h3>
            </div>

            <div style={S.smallCard}>
              <Award size={24} color="#0f766e" />

              <p style={S.cardLabel}>Amount Per Task</p>

              <h3 style={S.smallValue}>
                {formatAmount(wallet.amountPerTask || 150)}
              </h3>
            </div>

            <div style={S.smallCard}>
              <Calendar size={24} color="#0f766e" />

              <p style={S.cardLabel}>Credit Method</p>

              <h3 style={S.smallValue}>Auto</h3>
            </div>
          </div>

          <div style={S.section}>
            <div style={S.sectionHeader}>
              <div>
                <h2 style={S.sectionTitle}>Wallet Transactions</h2>
                <p style={S.sectionSub}>
                  Credits are calculated from completed home service tasks.
                </p>
              </div>
            </div>

            {!wallet.transactions || wallet.transactions.length === 0 ? (
              <div style={S.empty}>
                <p style={{ margin: 0 }}>
                  No completed tasks yet. Once lab marks a task completed,
                  ₹150 will appear here.
                </p>
              </div>
            ) : (
              <div style={S.table}>
                {wallet.transactions.map((txn) => (
                  <div style={S.row} key={txn.id}>
                    <div>
                      <p style={S.txnTitle}>
                        {txn.public_booking_id || `Booking #${txn.id}`}
                      </p>

                      <p style={S.txnSub}>
                        {txn.patient_name || "Patient"} ·{" "}
                        {txn.branch || "Branch"} ·{" "}
                        {formatDate(txn.collection_date)}
                      </p>

                      <p style={S.txnSub}>
                        Slot: {txn.time_slot || "—"} · Mobile:{" "}
                        {txn.patient_mobile || "—"}
                      </p>
                    </div>

                    <div style={S.credit}>
                      + {formatAmount(txn.amount || 150)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const S = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 22,
  },

  label: {
    margin: "0 0 6px",
    color: "#0f766e",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontSize: 32,
    color: "#0f172a",
  },

  sub: {
    margin: "8px 0 0",
    color: "#64748b",
  },

  refreshBtn: {
    border: "none",
    background: "#0f172a",
    color: "#fff",
    borderRadius: 12,
    padding: "10px 16px",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 16,
    marginBottom: 22,
  },

  mainCard: {
    background: "linear-gradient(135deg,#0f172a,#0f766e)",
    color: "#fff",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 14px 30px rgba(15,23,42,.16)",
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    background: "rgba(255,255,255,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  mainCardLabel: {
    margin: 0,
    color: "rgba(255,255,255,.8)",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  balance: {
    margin: "8px 0",
    fontSize: 42,
    lineHeight: 1,
  },

  mainCardSub: {
    margin: 0,
    color: "rgba(255,255,255,.82)",
    fontSize: 14,
  },

  smallCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 8px 22px rgba(15,23,42,.06)",
  },

  cardLabel: {
    margin: "12px 0 0",
    color: "#64748b",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  smallValue: {
    margin: "10px 0 0",
    fontSize: 28,
    color: "#0f172a",
  },

  section: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 8px 22px rgba(15,23,42,.06)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: 22,
  },

  sectionSub: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: 14,
  },

  table: {
    display: "grid",
    gap: 10,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "14px 16px",
  },

  txnTitle: {
    margin: 0,
    fontWeight: 900,
    color: "#0f172a",
  },

  txnSub: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: 13,
  },

  credit: {
    color: "#0f766e",
    fontWeight: 900,
    fontSize: 18,
    whiteSpace: "nowrap",
  },

  empty: {
    background: "#fff",
    border: "1px dashed #cbd5e1",
    borderRadius: 18,
    padding: 28,
    textAlign: "center",
    color: "#64748b",
  },
};

export default PhleboWallet;