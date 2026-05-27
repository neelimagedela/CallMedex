import React from "react";
import "./Auth.css";

const Login = ({ setPage }) => {

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Login</h2>

        <p className="auth-subtitle">
          Access your CallMedex account
        </p>

        <form className="auth-form">

          <div className="form-group">
            <label>Email or Phone Number</label>

            <input
              type="text"
              placeholder="Enter email or phone number"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign In
          </button>

        </form>

        <p className="switch-auth">
          New User?
          <span onClick={() => setPage("register")}>
            {" "}Create Account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;