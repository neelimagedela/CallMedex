import React, { useState } from "react";
import "./Auth.css";
import { api } from "../../shared/api";
import PasswordInput from "../common/PasswordInput";
import { useToast } from "../../shared/toast.js";

const ForgotPassword = ({ setPage }) => {
  const toast = useToast();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password/request-otp", {
        email,
      });

      if (response.data.success) {
        toast.success(response.data.message || "OTP sent to your email.");
        setStep("reset");
      } else {
        toast.error(response.data.message || "Could not send OTP.");
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP.");
      return;
    }

    if (newPassword.length < 8) {
      toast.warning("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password/reset", {
        email,
        otp,
        newPassword,
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Password changed successfully."
        );

        setTimeout(() => {
          setPage("login");
        }, 1000);
      } else {
        toast.error(response.data.message || "Could not reset password.");
      }
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <h2>Forgot Password</h2>

        <p className="auth-subtitle">
          Reset your CallMedex password using OTP verification
        </p>

        {step === "email" && (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Registered Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter registered email address"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "reset" && (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>Enter OTP</label>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>

              <PasswordInput
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <PasswordInput
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Changing Password..." : "Change Password"}
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: 16,
                fontSize: 14,
                color: "#64748b",
              }}
            >
              Didn&apos;t receive OTP?{" "}
              <span
                onClick={handleSendOtp}
                style={{
                  color: "#1B6CA8",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Resend OTP
              </span>
            </p>
          </form>
        )}

        <p className="switch-auth">
          Remember password?{" "}
          <span onClick={() => setPage("login")}>Back to Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;