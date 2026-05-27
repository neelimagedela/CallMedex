import React, { useState } from "react";
import "./Auth.css";
import { api } from "../../shared/api";

const Login = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP Verification for users whose email is not verified
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { accessToken, user } = response.data.data;
        
        // Save auth details
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Welcome back, ${user.name}!`);
        setPage("home");
      } else if (response.data.requiresVerification) {
        setUserId(response.data.data.userId);
        setShowOtpScreen(true);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", {
        userId,
        otp,
        type: "email"
      });

      if (response.data.success) {
        alert("Email verified successfully! You can now log in.");
        setShowOtpScreen(false);
        setOtp("");
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.message || "OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "500px", padding: "40px" }}>
          <div className="register-header" style={{ textAlign: "center" }}>
            <h1 className="register-title" style={{ fontSize: "32px" }}>Verify Email</h1>
            <p className="register-subtitle">Please enter the 6-digit code sent to your email to verify your account.</p>
          </div>

          {error && <div className="error-message" style={{ color: "#ef4444", marginBottom: "15px", fontWeight: "600", textAlign: "center" }}>{error}</div>}

          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label style={{ textAlign: "center", display: "block" }}>Enter OTP Code</label>
              <input
                type="text"
                placeholder="------"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                style={{ textAlign: "center", letterSpacing: "8px", fontSize: "24px", fontWeight: "700" }}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <h2>Login</h2>
        <p className="auth-subtitle">Access your CallMedex account</p>

        {error && <div className="error-message" style={{ color: "#ef4444", marginBottom: "15px", fontWeight: "600" }}>{error}</div>}

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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="switch-auth">
          New User?
          <span onClick={() => setPage("register")}> Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;