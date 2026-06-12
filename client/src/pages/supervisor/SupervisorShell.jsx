// client/src/pages/supervisor/SupervisorShell.jsx
//
// This is the top-level shell for the Supervisor Dashboard.
// It owns the sidebar + page-area layout and handles navigation between sub-pages.
//
import React, { useState, useEffect, useRef } from "react";
import SupervisorSidebar from "../../components/supervisor/SupervisorSidebar";
import SupervisorDashboard from "./SupervisorDashboard";
import StaffManagement from "./StaffManagement";
import Phlebotomists from "./Phlebotomists";
import PatientsAppointments from "./PatientsAppointments";
import OrganizationProfile from "./OrganizationProfile";
import Reports from "./Reports";
import { supervisorApi } from "../../api/supervisorApi";
import "./SupervisorShell.css";

const PAGE_COMPONENTS = {
  dashboard: SupervisorDashboard,
  staff: StaffManagement,
  phlebos: Phlebotomists,
  patients: PatientsAppointments,
  profile: OrganizationProfile,
  reports: Reports,
};

export default function SupervisorShell({ user, setPage, setIsLoggedIn, setUser }) {
  const [activePage, setActivePage] = useState("dashboard");

  // Global Search states
  const [globalSearch, setGlobalSearch] = useState("");
  const [results, setResults] = useState({ patients: [], staff: [], phlebos: [] });
  const [loadingResults, setLoadingResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Initial search text to pass to each tab component when navigated
  const [pageSearchQueries, setPageSearchQueries] = useState({
    patients: "",
    staff: "",
    phlebos: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setPage("home");
  };

  // Close results overlay if user clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parallel fetch and debounce for global search query
  useEffect(() => {
    if (!globalSearch.trim()) {
      setResults({ patients: [], staff: [], phlebos: [] });
      setLoadingResults(false);
      return;
    }

    setLoadingResults(true);
    const delayDebounceFn = setTimeout(() => {
      Promise.all([
        supervisorApi.getPatients(globalSearch),
        supervisorApi.getStaff(globalSearch),
        supervisorApi.getPhlebos("", globalSearch),
      ])
        .then(([patients, staff, phlebos]) => {
          setResults({
            patients: (patients || []).slice(0, 5),
            staff: (staff || []).slice(0, 5),
            phlebos: (phlebos || []).slice(0, 5),
          });
        })
        .catch((err) => {
          console.error("Global search error:", err);
        })
        .finally(() => {
          setLoadingResults(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [globalSearch]);

  const clearSearch = () => {
    setGlobalSearch("");
    setResults({ patients: [], staff: [], phlebos: [] });
    setShowResults(false);
  };

  const handleResultClick = (category, value) => {
    setActivePage(category);
    setPageSearchQueries((prev) => ({
      ...prev,
      [category]: value,
    }));
    setShowResults(false);
    setGlobalSearch("");
  };

  const ActivePageComponent = PAGE_COMPONENTS[activePage] || SupervisorDashboard;

  // We clear initial search queries when the user manually switches tabs
  const handleTabNavigate = (newPage) => {
    setPageSearchQueries({ patients: "", staff: "", phlebos: "" });
    setActivePage(newPage);
  };

  return (
    <div className="sv-shell">
      <SupervisorSidebar
        activePage={activePage}
        onNavigate={handleTabNavigate}
        onLogout={handleLogout}
        orgName={user?.branch || user?.name}
      />
      <main className="sv-shell-main">
        {/* Global Search Bar above the active page component */}
        <div className="sv-global-header">
          <div className="sv-global-search-container" ref={searchRef}>
            <div className="sv-global-search-input-wrapper">
              <span className="sv-global-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Global Search (patients, staff, phlebotomists, booking IDs...)"
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="sv-global-search-input"
              />
              {globalSearch && (
                <button className="sv-global-search-clear" onClick={clearSearch}>
                  ✕
                </button>
              )}
              {loadingResults && <span className="sv-global-search-spinner">⏳</span>}
            </div>

            {showResults && globalSearch.trim().length > 0 && (
              <div className="sv-global-results-overlay">
                {results.patients.length === 0 &&
                results.staff.length === 0 &&
                results.phlebos.length === 0 ? (
                  <div className="sv-global-result-empty">No results found</div>
                ) : (
                  <>
                    {results.patients.length > 0 && (
                      <div className="sv-global-result-section">
                        <h3>Patients & Bookings ({results.patients.length})</h3>
                        <ul>
                          {results.patients.map((p, idx) => (
                            <li
                              key={`p-${idx}`}
                              onClick={() =>
                                handleResultClick("patients", p.patientName || p.bookingId)
                              }
                            >
                              <div className="sv-result-title">{p.patientName || "—"}</div>
                              <div className="sv-result-subtitle">
                                {p.bookingType.replaceAll("_", " ")} · ID: {p.bookingId || "—"} · Status: {p.status}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {results.staff.length > 0 && (
                      <div className="sv-global-result-section">
                        <h3>Staff Members ({results.staff.length})</h3>
                        <ul>
                          {results.staff.map((s, idx) => (
                            <li
                              key={`s-${idx}`}
                              onClick={() => handleResultClick("staff", s.name)}
                            >
                              <div className="sv-result-title">{s.name || "—"}</div>
                              <div className="sv-result-subtitle">
                                {s.role} · {s.department} · {s.email} · Status: {s.status}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {results.phlebos.length > 0 && (
                      <div className="sv-global-result-section">
                        <h3>Phlebotomists ({results.phlebos.length})</h3>
                        <ul>
                          {results.phlebos.map((ph, idx) => (
                            <li
                              key={`ph-${idx}`}
                              onClick={() => handleResultClick("phlebos", ph.name)}
                            >
                              <div className="sv-result-title">{ph.name || "—"}</div>
                              <div className="sv-result-subtitle">
                                {ph.email} · Status: {ph.isActive} · Bookings: {ph.assignedCount}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="sv-shell-content-area">
          <ActivePageComponent
            initialSearch={
              activePage === "patients"
                ? pageSearchQueries.patients
                : activePage === "staff"
                ? pageSearchQueries.staff
                : activePage === "phlebos"
                ? pageSearchQueries.phlebos
                : ""
            }
          />
        </div>
      </main>
    </div>
  );
}
