import { useState, useEffect } from "react";

import GLOBAL_CSS from "./styles/globalStyles";
import "./styles/index.css";

import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/Herosection";
import SearchSection from "./components/home/Searchsection";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import HomeServices from "./components/homeServices/HomeServices";
import Cardiology from "./components/cardiology/Cardiology";
import BodyDiagnostics from "./components/diagnostics/BodyDiagnostics";

import PharmacyHomeDelivery from "./components/pharmacy/PharmacyHomeDelivery";
import PharmacyDashboard from "./components/pharmacyDashboard/PharmacyDashboard";

import { ToastProvider } from "./shared/toast.js";

import {
  AboutSection,
  SpecialistsSection,
  PackagesSection,
  FeaturesSection,
  ServicesSection,
  MetricsSection,
  AppointmentSection,
  BranchesSection,
  TestimonialsSection,
  CTASection,
} from "./components/home/sections";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page,     setPage]     = useState("home");
  const [step,     setStep]     = useState(1);
const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("accessToken")
);

const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ToastProvider>
    <style>{GLOBAL_CSS}</style>

    <TopBar />

    <Navbar
      scrolled={scrolled}
      setPage={setPage}
      setStep={setStep}
      isLoggedIn={isLoggedIn}
      user={user}
      setIsLoggedIn={setIsLoggedIn}
      setUser={setUser}
    />

    {page === "cardiology" && <Cardiology />}
    {page === "bodydiagnostics" && <BodyDiagnostics />}

    {page === "home" && (
      <>
        <HeroSection setPage={setPage} />
        <SearchSection />
        <AboutSection />
        <SpecialistsSection />
        <PackagesSection />
        <FeaturesSection />
        <ServicesSection />
        <MetricsSection />
        <AppointmentSection />
        <BranchesSection />
        <TestimonialsSection />
        <CTASection setPage={setPage} />
      </>
    )}

    {page === "homeservices" && <HomeServices />}

    {page === "pharmacy-home-delivery" && (
      <PharmacyHomeDelivery setPage={setPage} />
    )}

    {page === "pharmacy-dashboard" && (
      <PharmacyDashboard setPage={setPage} />
    )}

    {page === "login" && (
      <Login
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    )}

    {page === "register" && (
      <Register setPage={setPage} />
    )}

    {page === "profile" && (
  <div
    style={{
      maxWidth: "900px",
      margin: "40px auto",
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h1>Edit Profile</h1>

    <div style={{ display: "grid", gap: "15px" }}>

      <input
        type="text"
        placeholder="Full Name"
        defaultValue={user?.name || ""}
      />

      <input
        type="number"
        placeholder="Age"
      />

      <input
        type="text"
        placeholder="Gender"
      />

      <input
        type="text"
        placeholder="Phone Number"
      />

      <input
        type="email"
        placeholder="Email"
        defaultValue={user?.email || ""}
      />

      <input
        type="text"
        placeholder="Height (cm)"
      />

      <input
        type="text"
        placeholder="Weight (kg)"
      />

      <input
        type="text"
        placeholder="Blood Group"
      />

      <textarea
        rows="4"
        placeholder="Medical History"
      />

      <textarea
        rows="3"
        placeholder="Allergies"
      />

      <button
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>

    </div>
  </div>
)}

    {page === "bookings" && (
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
        <h1>Previous Bookings</h1>
        <p>Patient appointment history will appear here.</p>
      </div>
    )}

    {page === "reports" && (
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
        <h1>Test Reports</h1>
        <p>Uploaded PDFs and medical reports will appear here.</p>
      </div>
    )}

    {page === "help" && (
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
        <h1>Help & Support</h1>
        <p>Support information and contact details.</p>
      </div>
    )}

    <Footer />

    <div className="fab-wrap">
      <button
        className="fab fab-chat"
        title="AI Chat"
        onClick={() => alert("AI Assistant Coming Soon")}
      >
        💬
      </button>
    </div>
    </ToastProvider>
);
}