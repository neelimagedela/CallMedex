import { useState, useEffect } from "react";
import GLOBAL_CSS from "./styles/globalStyles";
import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/Herosection";
import SearchSection from "./components/home/Searchsection";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./styles/index.css";
import {
  AboutSection, SpecialistsSection, PackagesSection,
  FeaturesSection, ServicesSection, MetricsSection,
  AppointmentSection, BranchesSection, TestimonialsSection,
  CTASection,
} from "./components/home/sections";

import Cardiology      from "./components/cardiology/Cardiology";
import BodyDiagnostics from "./components/diagnostics/BodyDiagnostics";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [page,     setPage]     = useState("home");
  const [step,     setStep]     = useState(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <TopBar />
      <Navbar scrolled={scrolled} setPage={setPage} setStep={setStep} />

      {page === "cardiology"      && <Cardiology />}
      {page === "bodydiagnostics" && <BodyDiagnostics />}

      {page === "home" && (
        <>
          <HeroSection      setPage={setPage} />
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

      {page === "login" && (
       <Login setPage={setPage} />
      )}

      {page === "register" && (
       <Register setPage={setPage} />
      )}

      <Footer />

      <div className="fab-wrap">
        <button className="fab fab-chat" title="AI Chat" onClick={() => alert("AI Assistant Coming Soon")}>
          💬
        </button>
        
      </div>
    </>
  );
}