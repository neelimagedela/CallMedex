import AboutPage from "./components/about/AboutPage";
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

import LabTechnicianDashboard from "./components/Staff/LabTechnicianDashboard";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import HomeServices from "./components/homeServices/HomeServices";
import Cardiology from "./components/cardiology/Cardiology";
import BodyDiagnostics from "./components/diagnostics/BodyDiagnostics";
import BlogPage from "./components/blog/BlogPage";

import PharmacyHomeDelivery from "./components/pharmacy/PharmacyHomeDelivery";
import PharmacyDashboard from "./components/pharmacyDashboard/PharmacyDashboard";

import ConsultancyHome from "./components/consultation/consultancyHome";
import DiagnosticWalkInCenters from "./components/diagnostics/DiagnosticWalkInCenters";

import WalkInClinic from "./components/consultation/WalkInClinic";
import TeleConsultationPage from "./components/consultation/TeleConsultationPage";

import ConsultationChoice from "./components/appointments/ConsultationChoice";
import DiagnosticPackage from "./components/packages/DiagnosticPackage";

import { PhleboProvider } from "./context/PhleboContext";
import PhleboSidebar from "./components/Phlebo/Sidebar";
import PhleboTopBar from "./components/Phlebo/TopBar";
import PhleboProfile from "./pages/Phlebo/Profile";
import PhleboWallet from "./pages/Phlebo/Wallet";
import PhleboTasksList from "./pages/Phlebo/TasksList";
import PhleboActiveTask from "./pages/Phlebo/ActiveTask";
import PhleboCompletedTasks from "./pages/Phlebo/CompletedTasks";

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
  const [step, setStep] = useState(1);
  const [page, setPage] = useState("home");
  const [selectedPackageData, setSelectedPackageData] = useState(null);

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

  const phleboPages = [
    "phlebo-profile",
    "phlebo-wallet",
    "phlebo-tasks",
    "phlebo-active",
    "phlebo-completed",
  ];

  const staffPages = ["lab-technician-dashboard"];

  const isPhleboPortal = phleboPages.includes(page);
  const isStaffPortal = staffPages.includes(page);
  const isInternalPortal = isPhleboPortal || isStaffPortal;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ToastProvider>
      <style>{GLOBAL_CSS}</style>

      {!isInternalPortal && (
        <>
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
        </>
      )}

      {isPhleboPortal && user?.role === "phlebo" && (
        <PhleboProvider>
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
              background: "#f8fafc",
            }}
          >
            <PhleboSidebar currentTab={page} setPage={setPage} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <PhleboTopBar setPage={setPage} />

              <main style={{ padding: "28px" }}>
                {page === "phlebo-profile" && <PhleboProfile />}

                {page === "phlebo-wallet" && <PhleboWallet />}

                {page === "phlebo-tasks" && (
                  <PhleboTasksList setPage={setPage} />
                )}

                {page === "phlebo-active" && (
                  <PhleboActiveTask setPage={setPage} />
                )}

                {page === "phlebo-completed" && <PhleboCompletedTasks />}
              </main>
            </div>
          </div>
        </PhleboProvider>
      )}

      {isPhleboPortal && user?.role !== "phlebo" && (
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1>Access Denied</h1>

          <p>Only phlebo accounts can access this dashboard.</p>

          <button
            className="btn btn-login"
            onClick={() => setPage("home")}
            style={{ marginTop: 20 }}
          >
            Go Home
          </button>
        </div>
      )}

      {isStaffPortal && page === "lab-technician-dashboard" && (
        <LabTechnicianDashboard setPage={setPage} />
      )}

      {!isInternalPortal && page === "home" && (
        <>
          <HeroSection setPage={setPage} />
          <SearchSection />
          <AboutSection />
          <SpecialistsSection />

          <PackagesSection
            setPage={setPage}
            setSelectedPackageData={setSelectedPackageData}
          />

          <FeaturesSection />
          <ServicesSection setPage={setPage} />
          <MetricsSection />
          <AppointmentSection />
          <BranchesSection />
          <TestimonialsSection />
          <CTASection setPage={setPage} />
        </>
      )}

      {!isInternalPortal && page === "homeservices" && <HomeServices />}

      {!isInternalPortal && page === "cardiology" && <Cardiology />}

      {!isInternalPortal && page === "bodydiagnostics" && <BodyDiagnostics />}

      {!isInternalPortal && page === "diagnostic-walkin-centers" && (
        <DiagnosticWalkInCenters />
      )}

      {!isInternalPortal && page === "blog" && <BlogPage setPage={setPage} />}

      {!isInternalPortal && page === "about" && (
        <AboutPage setPage={setPage} />
      )}

      {!isInternalPortal && page === "consultation-choice" && (
        <ConsultationChoice setPage={setPage} />
      )}

      {!isInternalPortal && page === "walkin-clinic" && (
        <WalkInClinic setPage={setPage} />
      )}

      {!isInternalPortal && page === "tele-consultation" && (
        <TeleConsultationPage />
      )}

      {!isInternalPortal && page === "diagnostic-package" && (
        <DiagnosticPackage selectedPackageData={selectedPackageData} />
      )}

      {!isInternalPortal && page === "consultancy-home" && (
        <ConsultancyHome setPage={setPage} />
      )}

      {!isInternalPortal && page === "pharmacy-home-delivery" && (
        <PharmacyHomeDelivery setPage={setPage} />
      )}

      {!isInternalPortal && page === "pharmacy-dashboard" && (
        <PharmacyDashboard setPage={setPage} />
      )}

      {!isInternalPortal && page === "login" && (
        <Login
          setPage={setPage}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      )}

      {!isInternalPortal && page === "register" && (
        <Register setPage={setPage} />
      )}

      {!isInternalPortal && page === "profile" && user?.role === "patient" && (
        <PatientProfile setPage={setPage} setUser={setUser} />
      )}

      {!isInternalPortal && page === "profile" && user?.role !== "patient" && (
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

      {!isInternalPortal && page === "bookings" && user?.role === "patient" && (
        <PatientBookings setPage={setPage} />
      )}

      {!isInternalPortal && page === "bookings" && user?.role !== "patient" && (
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

      {!isInternalPortal && page === "reports" && (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
          <h1>Test Reports</h1>

          <p>Uploaded PDFs and medical reports will appear here.</p>
        </div>
      )}

      {!isInternalPortal && page === "help" && (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
          <h1>Help & Support</h1>

          <p>Support information and contact details.</p>
        </div>
      )}

      {!isInternalPortal && <Footer />}

      {!isInternalPortal && (
        <div className="fab-wrap">
          <button
            className="fab fab-chat"
            title="AI Chat"
            onClick={() => alert("AI Assistant Coming Soon")}
          >
            💬
          </button>
        </div>
      )}
    </ToastProvider>
  );
}