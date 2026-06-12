// client/src/components/supervisor/StaffTable.jsx
import React from "react";
import "./StaffTable.css";

const STATUS_STYLES = {
  approved: { bg: "#d1fae5", color: "#065f46" },
  pending:  { bg: "#fef9c3", color: "#854d0e" },
  rejected: { bg: "#fee2e2", color: "#991b1b" },
};

export default function StaffTable({ staff, onApprove, onReject, loading }) {
  if (loading) return <div className="sv-table-empty">Loading staff...</div>;
  if (!staff?.length) return <div className="sv-table-empty">No staff records found.</div>;

  return (
    <div className="sv-table-wrapper">
      <table className="sv-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member, idx) => {
            const style = STATUS_STYLES[member.approval_status] || STATUS_STYLES.pending;
            return (
              <tr key={member.id}>
                <td>{idx + 1}</td>
                <td className="sv-td-bold">{member.name || "—"}</td>
                <td>{member.email || "—"}</td>
                <td>{member.role || "—"}</td>
                <td>{member.department || "—"}</td>
                <td>
                  <span
                    className="sv-status-badge"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {member.approval_status || "pending"}
                  </span>
                </td>
                <td className="sv-td-actions">
                  {member.approval_status === "pending" && (
  <>
    <button
      className="sv-btn sv-btn-approve"
      onClick={() => onApprove(member.id)}
    >
      Approve
    </button>

    <button
      className="sv-btn sv-btn-reject"
      onClick={() => onReject(member.id)}
    >
      Reject
    </button>
  </>
)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
