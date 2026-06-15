import React, { useState } from "react";
import "./Auth.css";
import { api } from "../../shared/api";
import PasswordInput from "../common/PasswordInput";
import { useToast } from "../../shared/toast.js";

const Login = ({ setPage, setIsLoggedIn, setUser }) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP verification for users whose email is not yet verified
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  /* ─── Login ─────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { accessToken, user } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        if (setIsLoggedIn) setIsLoggedIn(true);
        if (setUser) setUser(user);

        toast.success(`Welcome back, ${user.name}! You are now logged in.`);

        setTimeout(() => {
          if (user.role === "patient") {
            setPage("profile");
          } else if (user.role === "pharmacy") {
            setPage("pharmacy-dashboard");
          } else if (user.role === "phlebo") {
            setPage("phlebo-profile");
          } else if (user.role === "staff") {
            setPage("lab-technician-dashboard");
          } else {
            setPage("home");
          }
        }, 800);
      } else if (response.data.requiresVerification) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);

        toast.info(
          "Your email is not verified yet. Please enter the OTP sent to your email."
        );
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 401) {
        toast.error(
          "Incorrect email or password. Please check your credentials and try again."
        );
      } else if (status === 429) {
        toast.warning(
          "Too many login attempts. Please wait a few minutes before trying again."
        );
      } else {
        toast.error(
          msg ||
            "Unable to connect to server. Please check your internet and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─── OTP Verify ─────────────────────────────────────── */
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email",
      });

      if (response.data.success) {
        toast.success("Email verified successfully! You can now sign in.");
        setShowOtpScreen(false);
        setOtp("");
      } else {
        toast.error(
          response.data.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 400) {
        toast.error(
          "The OTP you entered is incorrect or has expired. Please request a new one."
        );
      } else {
        toast.error(
          msg || "Something went wrong during verification. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─── Resend OTP ─────────────────────────────────────── */
  const handleResendOtp = async () => {
    if (!userId) return;

    try {
      await api.post("/auth/resend-otp", {
        userId,
        type: "email",
      });

      toast.info("A new OTP has been sent to your email address.");
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Could not resend OTP. Please try again.");
    }
  };

  /* ─── OTP Screen ─────────────────────────────────────── */
  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div
          className="auth-card"
          style={{ maxWidth: "500px", padding: "40px" }}
        >
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>
              Verify Email
            </h1>

            <p className="register-subtitle">
              Please enter the 6-digit code sent to your email address to verify
              your account.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>
                Enter OTP Code
              </label>

              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{
                  textAlign: "center",
                  letterSpacing: "8px",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Didn&apos;t receive the code?{" "}
            <span
              onClick={handleResendOtp}
              style={{
                color: "#1B6CA8",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    );
  }

  /* ─── Login Screen ───────────────────────────────────── */
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <h2>Login</h2>

        <p className="auth-subtitle">Access your CallMedex account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <PasswordInput
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div
            style={{
              textAlign: "right",
              marginTop: "-8px",
              marginBottom: "12px",
            }}
          >
            <span
              onClick={() => setPage("forgot-password")}
              style={{
                color: "#1B6CA8",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Forgot Password?
            </span>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="switch-auth">
          New User?{" "}
          <span onClick={() => setPage("register")}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;