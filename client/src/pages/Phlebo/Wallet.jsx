import React, { useState } from "react";
import { usePhlebo } from "../../context/PhleboContext";
import { Wallet, ArrowUpRight, TrendingUp, Award, Calendar } from "lucide-react";

const PhleboWallet = () => {
  // Pulling the shared wallet state from our centralized context engine
  const { walletBalance } = usePhlebo();

  // Mock secondary financial analytics for dashboard metrics display
  const [metrics] = useState({
    incentivesEarned: 120,
    pendingClearance: 75,
    totalWithdrawals: 1450,
  });

  // Historical collection transaction records ledger entries
  const [transactions] = useState([
    { id: "TXN-88219", type: "Payout", date: "June 01, 2026", taskRef: "JOB-9921", amount: 50, status: "Credited" },
    { id: "TXN-87110", type: "Incentive", date: "May 31, 2026", taskRef: "Bonus Peak Hours", amount: 20, status: "Credited" },
    { id: "TXN-86541", type: "Payout", date: "May 30, 2026", taskRef: "JOB-9812", amount: 50, status: "Credited" },
    { id: "TXN-85400", type: "Withdrawal", date: "May 28, 2026", taskRef: "Bank Transfer", amount: 500, status: "Processed" },
  ]);

  const handleWithdrawalRequest = () => {
    if (walletBalance <= 0) {
      alert("Insufficient balance available for settlement extraction.");
      return;
    }
    alert(`Withdrawal request for ₹${walletBalance} submitted successfully to account ledger administration.`);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", fontFamily: "inherit" }}>
      <h2 style={{ marginBottom: "24px", color: "#1e293b", fontWeight: "700" }}>Earnings Wallet</h2>

      {/* TOP SECTION: BALANCE DISPLAY & QUICK ANALYTICS */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: "24px", marginBottom: "30px" }}>
        
        {/* MAIN CASH CARD BALANCE CONTAINER */}
        <div style={{
          background: "linear-gradient(135deg, #059669 0%, #065f46 100%)",
          color: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 15px -3px rgba(4, 120, 87, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", right: "-20px", bottom: "-20px", opacity: 0.1, color: "#fff" }}>
            <Wallet size={160} />
          </div>
          <div>
            <span style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8 }}>Available Balance</span>
            <h1 style={{ fontSize: "42px", margin: "8px 0 20px 0", fontWeight: "800" }}>₹{walletBalance}.00</h1>
          </div>
          <button 
            onClick={handleWithdrawalRequest}
            style={{
              background: "#fff",
              color: "#065f46",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <ArrowUpRight size={16} />
            Withdraw to Bank
          </button>
        </div>

        {/* METRICS METERS BREAKDOWN PANELS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ background: "#dcfce7", color: "#16a34a", padding: "12px", borderRadius: "10px" }}><Award size={24} /></div>
            <div>
              <span style={{ display: "block", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Incentives Paid</span>
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>₹{metrics.incentivesEarned}</span>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ background: "#fef3c7", color: "#d97706", padding: "12px", borderRadius: "10px" }}><TrendingUp size={24} /></div>
            <div>
              <span style={{ display: "block", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>In Review Balance</span>
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>₹{metrics.pendingClearance}</span>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px", gridColumn: "span 2" }}>
            <div style={{ background: "#f1f5f9", color: "#475569", padding: "12px", borderRadius: "10px" }}><Calendar size={24} /></div>
            <div>
              <span style={{ display: "block", fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Lifetime Extracted Settlements</span>
              <span style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>₹{metrics.totalWithdrawals}.00</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: TRANSACTION LEDGER REGISTRY */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)" }}>
        <h3 style={{ margin: "0 0 16px 0", color: "#1e293b", fontWeight: "600" }}>Statement History</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontSize: "13px" }}>
                <th style={{ padding: "12px" }}>Transaction Reference</th>
                <th style={{ padding: "12px" }}>Type</th>
                <th style={{ padding: "12px" }}>Date</th>
                <th style={{ padding: "12px" }}>Description Source</th>
                <th style={{ padding: "12px" }}>Amount</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" }}>
                  <td style={{ padding: "14px 12px", fontFamily: "monospace", color: "#475569" }}>{txn.id}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      background: txn.type === "Withdrawal" ? "#fee2e2" : "#dcfce7",
                      color: txn.type === "Withdrawal" ? "#b91c1c" : "#16803d"
                    }}>
                      {txn.type}
                    </span>
                  </td>
                  <td style={{ padding: "14px 12px", color: "#64748b" }}>{txn.date}</td>
                  <td style={{ padding: "14px 12px", fontWeight: "500" }}>{txn.taskRef}</td>
                  <td style={{ padding: "14px 12px", fontWeight: "700", color: txn.type === "Withdrawal" ? "#b91c1c" : "#059669" }}>
                    {txn.type === "Withdrawal" ? "-" : "+"}₹{txn.amount}
                  </td>
                  <td style={{ padding: "14px 12px", textAlign: "right", color: "#2563eb", fontWeight: "600" }}>
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhleboWallet;