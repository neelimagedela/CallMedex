// client/src/pages/supervisor/StaffManagement.jsx
import React, { useEffect, useState, useCallback } from "react";
import { supervisorApi } from "../../api/supervisorApi";
import StaffTable from "../../components/supervisor/StaffTable";
import "./SupervisorPages.css";

export default function StaffManagement() {
  const [staff,   setStaff]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [toast,   setToast]   = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadStaff = useCallback(() => {
    setLoading(true);
    setError(null);
    supervisorApi
      .getStaff()
      .then(setStaff)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadStaff(); }, [loadStaff]);

  const handleApprove = async (id) => {
    try {
      await supervisorApi.approveStaff(id);
      showToast("Staff approved successfully");
      loadStaff();
    } catch (err) {
      showToast(err.message || "Failed to approve staff", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await supervisorApi.rejectStaff(id);
      showToast("Staff rejected");
      loadStaff();
    } catch (err) {
      showToast(err.message || "Failed to reject staff", "error");
    }
  };

  return (
    <div className="sv-page">
      <div className="sv-page-header">
        <h1 className="sv-page-title">Staff Management</h1>
        <p className="sv-page-sub">Review and manage staff approval status for your branch</p>
      </div>

      {toast && (
        <div className={`sv-toast sv-toast-${toast.type}`}>{toast.msg}</div>
      )}

      {error && <div className="sv-error">{error}</div>}

      <StaffTable
        staff={staff}
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
