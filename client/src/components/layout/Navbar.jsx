import { useState } from "react";

import { NAV, SITE } from "../../data/siteData";
import { ChevDown } from "../shared/ui";
import logo from "../../assets/logo_medex.png";

export default function Navbar({
  scrolled,
  setPage,
  setStep,
  isLoggedIn,
  user,
  setIsLoggedIn,
  setUser,
}) {
  const [showProfile, setShowProfile] = useState(false);

  const loggedInUser =
    user ||
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return null;
      }
    })();

  const role = loggedInUser?.role;
  const isPharmacy = role === "pharmacy";
  const isPatient = role === "patient";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    if (setIsLoggedIn) setIsLoggedIn(false);
    if (setUser) setUser(null);

    setShowProfile(false);
    setPage("home");
  };

  const handleMenuClick = (item) => {
    if (item.page) {
      setPage(item.page);
      return;
    }

    if (item.step && setStep) {
      setStep(item.step);
      setPage("home");
      return;
    }

    if (item.scroll) {
      const section = document.getElementById(item.scroll);

      if (section) {
        const offset = 120;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }

      return;
    }

    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <nav className={`nav-outer${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* LOGO */}
        <a
          className="nav-logo"
          href={SITE.baseUrl}
          onClick={(e) => {
            e.preventDefault();
            setPage("home");
          }}
        >
          <img src={logo} alt="CallMedex Logo" />
        </a>

        {/* MENU */}
        <div className="nav-menu">
          {NAV.map((item, i) =>
            item.solo ? (
              <div className="nav-item" key={i}>
                <button className="nav-link" onClick={() => handleMenuClick(item)}>
                  {item.label}
                </button>
              </div>
            ) : (
              <div className="nav-item" key={i}>
                <button className="nav-link" type="button">
                  {item.label}
                  <ChevDown />
                </button>

                <div className="nav-drop">
                  {item.items?.map((d, j) => (
                    <button
                      className="drop-item"
                      key={j}
                      type="button"
                      onClick={() => handleMenuClick(d)}
                    >
                      {d.ico && <span className="drop-icon">{d.ico}</span>}

                      <span>{d.label || d.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* LOGIN / ROLE BUTTONS */}
          {!isLoggedIn && !loggedInUser ? (
            <button className="btn btn-login" onClick={() => setPage("login")}>
              🔐 Login
            </button>
          ) : isPharmacy ? (
            <>
              <button
                type="button"
                className="pharmacy-dashboard-nav-btn"
                onClick={() => setPage("pharmacy-dashboard")}
              >
                <span className="pharmacy-dashboard-nav-icon">🏥</span>
                Dashboard
              </button>

              <button className="btn btn-login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : isPatient ? (
            <div style={{ position: "relative" }}>
              <button
                className="btn btn-login"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                👤 Profile
              </button>

              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    top: "55px",
                    right: 0,
                    width: "280px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                    padding: "15px",
                    zIndex: 9999,
                  }}
                >
                  <h4>{loggedInUser?.name || "User"}</h4>

                  <hr />

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("profile");
                    }}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("bookings");
                    }}
                  >
                    Previous Bookings
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("reports");
                    }}
                  >
                    Test Reports
                  </button>

                  <button
                    className="drop-item"
                    onClick={() => {
                      setShowProfile(false);
                      setPage("help");
                    }}
                  >
                    Help & Support
                  </button>

                  <hr />

                  <button className="drop-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-login" onClick={handleLogout}>
              Logout
            </button>
          )}

          {/* BOOK APPOINTMENT - HIDE FOR PHARMACY */}
          {!isPharmacy && (
            <a
              className="btn btn-book"
              href={SITE.patientPortal}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: "12px" }}
            >
              Book
              <br />
              Appointment
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}