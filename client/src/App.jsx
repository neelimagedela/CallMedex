import PatientBookings from "./components/profile/PatientBookings";
import PatientProfile from "./components/profile/PatientProfile";
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

import ConsultancyHome from "./components/consultancy/consultancyHome";

import { ToastProvider } from "./shared/toast.js";
import WalkInClinic from "./components/walkinclinic/WalkInClinic";
import TeleConsultationPage from "./components/consultation/TeleConsultationPage";

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
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(1);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

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

{page === "home" && (
  <>
    <HeroSection setPage={setPage} />
    <SearchSection />
    <AboutSection />
    <SpecialistsSection />
    <PackagesSection />
    <FeaturesSection />
    <ServicesSection setPage={setPage} />
    <MetricsSection />
    <AppointmentSection />
    <BranchesSection />
    <TestimonialsSection />
    <CTASection setPage={setPage} />
  </>
)}

{page === "homeservices" && <HomeServices />}

{page === "cardiology" && <Cardiology />}

{page === "bodydiagnostics" && <BodyDiagnostics />}

{page === "walkin-clinic" && (
  <WalkInClinic setPage={setPage} />
)}

{page === "tele-consultation" && (
  <TeleConsultationPage />
)}

{page === "consultancy-home" && (
  <ConsultancyHome setPage={setPage} />
)}

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
{page === "register" && <Register setPage={setPage} />}
      

      {page === "profile" && user?.role === "patient" && (
        <PatientProfile setPage={setPage} setUser={setUser} />
      )}

      {page === "profile" && user?.role !== "patient" && (
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1>Access Denied</h1>
          <p>Only patient accounts can access the patient profile page.</p>

          <button
            className="btn btn-login"
            onClick={() => setPage("home")}
            style={{ marginTop: 20 }}
          >
            Go Home
          </button>
        </div>
      )}

      {page === "bookings" && user?.role === "patient" && (
        <PatientBookings setPage={setPage} />
      )}

      {page === "bookings" && user?.role !== "patient" && (
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1>Access Denied</h1>
          <p>Only patient accounts can view previous bookings.</p>

          <button
            className="btn btn-login"
            onClick={() => setPage("home")}
            style={{ marginTop: 20 }}
          >
            Go Home
          </button>
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