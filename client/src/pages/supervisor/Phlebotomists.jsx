// client/src/pages/supervisor/Phlebotomists.jsx
import React, { useEffect, useState, useCallback } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import {
  Wallet as WalletIcon,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  X,
  TrendingUp,
  Award,
  Calendar,
  RefreshCcw,
  MapPin,
  FileText
} from "lucide-react";
import "./SupervisorPages.css";

const formatAmount = (value) => `₹${Number(value || 0).toFixed(2)}`;

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const STAGES = [
  { id: "assigned", label: "Assigned" },
  { id: "equipment_collected", label: "Equipment Collected From Lab" },
  { id: "traveling", label: "Traveling To Patient" },
  { id: "in_progress", label: "Sample Collection In Progress" },
  { id: "sample_collected", label: "Sample Collected" },
  { id: "returning", label: "Returning To Lab" },
  { id: "submitted_to_lab", label: "Sample Submitted To Lab" },
  { id: "completed", label: "Work Completed" }
];

// Map booking status to STAGES index (0-7)
const getActiveStageIndex = (status) => {
  switch (status) {
    case "assigned":
    case "accepted":
      return 0; // Assigned (Default first step)
    case "sample_collected":
      return 4; // Sample Collected
    case "submitted_to_lab":
      return 6; // Submitted to Lab
    case "received_by_lab":
    case "report_ready":
    case "completed":
      return 7; // Work Completed
    default:
      return 0;
  }
};

export default function Phlebotomists({ initialSearch }) {
  const [phlebos, setPhlebos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(initialSearch || "");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'active', 'inactive'

  // Modal states
  const [selectedPhlebo, setSelectedPhlebo] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Update search state if parent initialSearch changes
  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);

  const loadPhlebos = useCallback(() => {
    setLoading(true);
    setError(null);
    supervisorApi
      .getPhlebos(statusFilter === "all" ? "" : statusFilter, search)
      .then(setPhlebos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [statusFilter, search]);

  // Debounced load on search input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      loadPhlebos();
    }, 250);
    return () => clearTimeout(handler);
  }, [loadPhlebos]);

  const handleOpenWallet = async (phlebo) => {
    setSelectedPhlebo(phlebo);
    setLoadingWallet(true);
    setWalletData(null);
    setShowWalletModal(true);

    try {
      const data = await supervisorApi.getPhleboWallet(phlebo.userId);
      setWalletData(data);
    } catch (err) {
      setError("Failed to load phlebotomist wallet details: " + err.message);
    } finally {
      setLoadingWallet(false);
    }
  };

  const handleOpenStatus = (phlebo) => {
    setSelectedPhlebo(phlebo);
    setShowStatusModal(true);
  };

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Centralized Phlebotomists</h1>
        <p className="sv-page-sub">
          Monitor and track shift schedules, availability, task progress, and wallets for all phlebotomists globally.
        </p>
      </div>

      <div style={styles.filterBar}>
        <div className="sv-search-bar" style={{ marginBottom: 0, flex: 1 }}>
          <input
            type="text"
            placeholder="Search by phlebotomist name, email, or mobile…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sv-search-input"
            style={{ maxWidth: "480px" }}
          />
        </div>

        <div style={styles.pillContainer}>
          <button
            onClick={() => setStatusFilter("all")}
            style={statusFilter === "all" ? styles.activePill : styles.pill}
          >
            All Shifts
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            style={statusFilter === "active" ? styles.activePill : styles.pill}
          >
            On Shift
          </button>
          <button
            onClick={() => setStatusFilter("inactive")}
            style={statusFilter === "inactive" ? styles.activePill : styles.pill}
          >
            Off Shift
          </button>
        </div>
      </div>

      {error && <div className="sv-error">{error}</div>}

      {loading ? (
        <div className="sv-loading">Loading phlebotomists pool...</div>
      ) : phlebos.length === 0 ? (
        <div className="sv-table-empty">No phlebotomists found.</div>
      ) : (
        <div className="sv-table-wrapper">
          <table className="sv-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Phlebotomist</th>
                <th>Mobile</th>
                <th>Shift Schedule</th>
                <th>Shift Status</th>
                <th>Task State</th>
                <th>Bookings (Completed)</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {phlebos.map((p, idx) => {
                const isShiftOn = p.isActive === "Active";
                return (
                  <tr key={p.userId}>
                    <td>{idx + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={styles.avatar}>
                          {p.name ? p.name.charAt(0).toUpperCase() : <User size={16} />}
                        </div>
                        <div>
                          <div className="sv-td-bold">{p.name || "—"}</div>
                          <div style={{ fontSize: "12px", color: "#64748b" }}>
                            {p.email || "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{p.phone || "—"}</td>
                    <td>
                      <div>{p.phleboType === "fullTime" ? "Full Time" : "Part Time"}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {p.shiftTiming}
                      </div>
                    </td>
                    <td>
                      <span
                        className="sv-status-badge"
                        style={{
                          background: isShiftOn ? "#d1fae5" : "#f1f5f9",
                          color: isShiftOn ? "#065f46" : "#64748b"
                        }}
                      >
                        {isShiftOn ? "On Shift" : "Off Shift"}
                      </span>
                    </td>
                    <td>
                      {!isShiftOn ? (
                        <span style={{ color: "#64748b", fontSize: "14px" }}>Unavailable</span>
                      ) : p.isEngaged ? (
                        <span
                          className="sv-status-badge"
                          style={{ background: "#ffedd5", color: "#ea580c" }}
                        >
                          Engaged
                        </span>
                      ) : (
                        <span
                          className="sv-status-badge"
                          style={{ background: "#ccfbf1", color: "#0d9488" }}
                        >
                          Available / Free
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: "#0a2540" }}>
                        {p.assignedCount || 0}
                      </span>{" "}
                      <span style={{ color: "#64748b", fontSize: "12px" }}>
                        ({p.completedCount || 0} completed)
                      </span>
                    </td>
                    <td>{p.lastUpdated ? new Date(p.lastUpdated).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }) : "—"}</td>
                    <td className="sv-td-actions">
                      <button
                        className="sv-btn"
                        style={{
                          background: "#f1f5f9",
                          color: "#1e293b",
                          border: "1px solid #cbd5e1"
                        }}
                        onClick={() => handleOpenWallet(p)}
                      >
                        <WalletIcon size={14} style={{ marginRight: "4px" }} />
                        Wallet
                      </button>

                      {isShiftOn && p.isEngaged && (
                        <button
  className="sv-btn sv-btn-approve"
  style={{
    background: "#0f766e",
    color: "#ffffff"   // text color
  }}
  onClick={() => handleOpenStatus(p)}
>
  <Eye size={14} style={{ marginRight: "4px" }} />
  Track Status
</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW STATUS MODAL */}
      {showStatusModal && selectedPhlebo && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Workflow Status Tracking</h2>
                <p style={styles.modalSubtitle}>
                  Phlebotomist: <strong>{selectedPhlebo.name}</strong>
                </p>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowStatusModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {selectedPhlebo.activeBooking ? (
                <>
                  {/* Progress Line */}
                  <div style={styles.trackingContainer}>
                    <h3 style={styles.sectionTitle}>Workflow Stages</h3>
                    <div style={styles.stepsVertical}>
                      {STAGES.map((stage, idx) => {
                        const currentStageIdx = getActiveStageIndex(selectedPhlebo.activeBooking.status);
                        const isCompleted = idx < currentStageIdx;
                        const isActive = idx === currentStageIdx;

                        return (
                          <div key={stage.id} style={styles.stepRow}>
                            <div style={styles.stepIndicator}>
                              <div
                                style={{
                                  ...styles.stepNode,
                                  background: isActive
                                    ? "#ea580c"
                                    : isCompleted
                                    ? "#16a34a"
                                    : "#e2e8f0",
                                  color: isActive || isCompleted ? "white" : "#94a3b8"
                                }}
                              >
                                {isCompleted ? "✓" : idx + 1}
                              </div>
                              {idx < STAGES.length - 1 && (
                                <div
                                  style={{
                                    ...styles.stepConnector,
                                    background: isCompleted ? "#16a34a" : "#e2e8f0"
                                  }}
                                />
                              )}
                            </div>
                            <div
                              style={{
                                ...styles.stepLabelText,
                                color: isActive
                                  ? "#ea580c"
                                  : isCompleted
                                  ? "#1e293b"
                                  : "#94a3b8",
                                fontWeight: isActive ? "800" : "500"
                              }}
                            >
                              {stage.label}
                              {isActive && (
                                <span style={styles.activeTag}>Current Stage</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Booking Details card */}
                  <div style={styles.detailCard}>
                    <h3 style={styles.detailTitle}>Active Booking Details</h3>
                    <div style={styles.detailGrid}>
                      <div>
                        <span style={styles.detailLabel}>Patient Name</span>
                        <span style={styles.detailVal}>{selectedPhlebo.activeBooking.patientName || "—"}</span>
                      </div>
                      <div>
                        <span style={styles.detailLabel}>Patient Mobile</span>
                        <span style={styles.detailVal}>{selectedPhlebo.activeBooking.patientMobile || "—"}</span>
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <span style={styles.detailLabel}>Collection Address</span>
                        <span style={styles.detailVal}>
                          <MapPin size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                          {selectedPhlebo.activeBooking.patientAddress || "—"}
                        </span>
                      </div>
                      <div>
                        <span style={styles.detailLabel}>Receipt / Booking ID</span>
                        <span style={styles.detailVal}>{selectedPhlebo.activeBooking.publicBookingId || "—"}</span>
                      </div>
                      <div>
                        <span style={styles.detailLabel}>Booking Date & Time</span>
                        <span style={styles.detailVal}>
                          {formatDate(selectedPhlebo.activeBooking.collectionDate)} (
                          {selectedPhlebo.activeBooking.timeSlot || "—"})
                        </span>
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <span style={styles.detailLabel}>Last Status Update</span>
                        <span style={styles.detailVal}>
                          {selectedPhlebo.activeBooking.updatedAt ? new Date(selectedPhlebo.activeBooking.updatedAt).toLocaleString("en-IN") : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.noActiveBooking}>
                  <Clock size={40} color="#94a3b8" />
                  <p>Phlebotomist is currently marked Available but no active booking details could be loaded.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WALLET DETAILS MODAL */}
      {showWalletModal && selectedPhlebo && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: "880px" }}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Earnings Wallet Summary</h2>
                <p style={styles.modalSubtitle}>
                  Phlebotomist: <strong>{selectedPhlebo.name}</strong>
                </p>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowWalletModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {loadingWallet ? (
                <div style={styles.loadingText}>Fetching wallet details...</div>
              ) : walletData ? (
                <>
                  {/* Stats Cards grid */}
                  <div style={styles.walletCards}>
                    <div style={styles.mainWalletCard}>
                      <div style={styles.walletIconBox}>
                        <WalletIcon size={26} color="#0f766e" />
                      </div>
                      <p style={styles.walletCardLabel}>Available Balance</p>
                      <h2 style={styles.walletBalanceText}>
                        {formatAmount(walletData.walletBalance)}
                      </h2>
                      <p style={styles.walletCardSub}>
                        {walletData.completedTasks || 0} completed task
                        {Number(walletData.completedTasks) === 1 ? "" : "s"} ×{" "}
                        {formatAmount(walletData.amountPerTask)}
                      </p>
                    </div>

                    <div style={styles.smallWalletCard}>
                      <TrendingUp size={22} color="#0f766e" />
                      <p style={styles.walletCardLabel}>Completed Tasks</p>
                      <h3 style={styles.walletCardValue}>{walletData.completedTasks || 0}</h3>
                    </div>

                    <div style={styles.smallWalletCard}>
                      <Award size={22} color="#0f766e" />
                      <p style={styles.walletCardLabel}>Amount Per Task</p>
                      <h3 style={styles.walletCardValue}>
                        {formatAmount(walletData.amountPerTask || 150)}
                      </h3>
                    </div>

                    <div style={styles.smallWalletCard}>
                      <Calendar size={22} color="#0f766e" />
                      <p style={styles.walletCardLabel}>Payout Method</p>
                      <h3 style={styles.walletCardValue}>Auto-Credit</h3>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div style={{ marginTop: "24px" }}>
                    <h3 style={styles.sectionTitle}>Wallet Transactions</h3>
                    <p style={styles.walletCardSub} style={{ marginBottom: "12px", color: "#64748b" }}>
                      Earnings are calculated dynamically from completed home service tasks.
                    </p>

                    <div style={styles.txnTableWrapper}>
                      <table style={styles.txnTable}>
                        <thead>
                          <tr style={styles.txnHeadRow}>
                            <th style={styles.txnTh}>Receipt ID</th>
                            <th style={styles.txnTh}>Patient Name</th>
                            <th style={styles.txnTh}>Branch</th>
                            <th style={styles.txnTh}>Collection Date</th>
                            <th style={styles.txnTh}>Status</th>
                            <th style={styles.txnTh}>Amount Credited</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walletData.transactions && walletData.transactions.length > 0 ? (
                            walletData.transactions.map((txn) => (
                              <tr key={txn.id} style={styles.txnRow}>
                                <td style={styles.txnTd}>{txn.public_booking_id || "—"}</td>
                                <td style={styles.txnTd}>{txn.patient_name || "—"}</td>
                                <td style={styles.txnTd}>{txn.branch || "—"}</td>
                                <td style={styles.txnTd}>{formatDate(txn.collection_date)}</td>
                                <td style={styles.txnTd}>
                                  <span
                                    style={{
                                      background: "#dcfce7",
                                      color: "#16a34a",
                                      padding: "4px 8px",
                                      borderRadius: "999px",
                                      fontSize: "12px",
                                      fontWeight: "700"
                                    }}
                                  >
                                    Credited
                                  </span>
                                </td>
                                <td style={{ ...styles.txnTd, fontWeight: 800, color: "#16a34a" }}>
                                  +{formatAmount(txn.amount)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" style={styles.txnEmpty}>
                                No recent completed transactions found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.noActiveBooking}>
                  <p>Unable to retrieve wallet data.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },
  pillContainer: {
    display: "flex",
    gap: "10px",
    background: "#f1f5f9",
    padding: "6px",
    borderRadius: "12px"
  },
  pill: {
    border: "none",
    background: "none",
    color: "#64748b",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  activePill: {
    border: "none",
    background: "white",
    color: "#0a2540",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s"
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#eef6ff",
    color: "#1b6ca8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: "14px"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(10, 37, 64, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
  },
  modalContent: {
    background: "white",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "540px",
    maxHeight: "90vh",
    boxShadow: "0 20px 40px rgba(10, 37, 64, 0.15)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },
  modalHeader: {
    padding: "24px 28px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  modalTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 800,
    color: "#0a2540"
  },
  modalSubtitle: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#64748b"
  },
  closeBtn: {
    border: "none",
    background: "none",
    color: "#94a3b8",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px"
  },
  modalBody: {
    padding: "24px 28px",
    overflowY: "auto"
  },
  trackingContainer: {
    marginBottom: "24px"
  },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: "16px",
    fontWeight: 800,
    color: "#0a2540"
  },
  stepsVertical: {
    display: "flex",
    flexDirection: "column",
    gap: "0"
  },
  stepRow: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    position: "relative"
  },
  stepIndicator: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "28px"
  },
  stepNode: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#e2e8f0",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "800",
    zIndex: 2
  },
  stepConnector: {
    width: "2px",
    height: "32px",
    background: "#e2e8f0",
    margin: "2px 0",
    zIndex: 1
  },
  stepLabelText: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "28px",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  activeTag: {
    background: "#fff7ed",
    color: "#ea580c",
    fontSize: "11px",
    fontWeight: "800",
    padding: "2px 8px",
    borderRadius: "6px",
    border: "1px solid #ffedd5"
  },
  detailCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "20px"
  },
  detailTitle: {
    margin: "0 0 14px",
    fontSize: "14px",
    fontWeight: 800,
    color: "#0a2540",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px"
  },
  detailLabel: {
    display: "block",
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: 700,
    letterSpacing: "0.03em",
    marginBottom: "2px"
  },
  detailVal: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#0a2540",
    wordBreak: "break-all"
  },
  noActiveBooking: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#64748b"
  },
  loadingText: {
    textAlign: "center",
    padding: "30px",
    color: "#64748b"
  },
  walletCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    flexWrap: "wrap"
  },
  mainWalletCard: {
    gridColumn: "span 4",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    border: "1px solid #bbf7d0",
    borderRadius: "20px",
    padding: "24px",
    position: "relative",
    overflow: "hidden"
  },
  walletIconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(22, 163, 74, 0.08)",
    marginBottom: "16px"
  },
  walletCardLabel: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 700,
    color: "#166534",
    textTransform: "uppercase",
    letterSpacing: "0.03em"
  },
  walletBalanceText: {
    margin: "6px 0",
    fontSize: "36px",
    fontWeight: 900,
    color: "#14532d",
    letterSpacing: "-0.03em"
  },
  walletCardSub: {
    margin: 0,
    fontSize: "13px",
    color: "#15803d",
    fontWeight: "600"
  },
  smallWalletCard: {
    gridColumn: "span 2",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  walletCardValue: {
    margin: "8px 0 0",
    fontSize: "20px",
    fontWeight: 800,
    color: "#0a2540"
  },
  txnTableWrapper: {
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    overflow: "hidden"
  },
  txnTable: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left"
  },
  txnHeadRow: {
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0"
  },
  txnTh: {
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase"
  },
  txnRow: {
    borderBottom: "1px solid #f1f5f9"
  },
  txnTd: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#0a2540",
    fontWeight: 500
  },
  txnEmpty: {
    padding: "32px",
    textAlign: "center",
    color: "#64748b"
  }
};