import React from "react";
import "./AboutPage.css";

export default function AboutPage({ setPage }) {
  const cards = [
    {
      title: "Patient Portal",
      desc: "Patients can register, verify OTP, complete profiles, book scans, order medicines, and view previous bookings.",
      icon: "👤",
    },
    {
      title: "Diagnostics",
      desc: "CallMedex supports scan booking, branch selection, time slots, prescription upload, receipt ID, and booking status.",
      icon: "🧪",
    },
    {
      title: "Pharmacy",
      desc: "Patients can search medicines, place orders, and pharmacies can manage inventory, service mode, and order status.",
      icon: "💊",
    },
    {
      title: "Role Dashboards",
      desc: "Separate portals are planned for patient, doctor, phlebo, pharmacy, diagnostics, consultancy, and admin users.",
      icon: "📊",
    },
  ];

  return (
    <main className="cm-about-page">
      <section className="cm-about-hero">
        <div className="cm-about-left">
          <span className="cm-about-badge">About CallMedex</span>

          <h1>One Smart Platform for Complete Healthcare Services</h1>

          <p>
            CallMedex is a full-stack healthcare portal built to connect
            patients, pharmacies, diagnostics, doctors, phlebos, and admins in
            one organized system.
          </p>

          <div className="cm-about-actions">
            <button onClick={() => setPage("home")}>Back to Home</button>
            <button className="outline" onClick={() => setPage("blog")}>
              Read Blogs
            </button>
          </div>
        </div>

        <div className="cm-about-right">
          <div className="cm-health-card">
            <div className="cm-plus">+</div>
            <h3>CallMedex</h3>
            <p>Healthcare access made simple, secure, and role-based.</p>
          </div>
        </div>
      </section>

      <section className="cm-about-intro">
        <h2>What is CallMedex?</h2>
        <p>
          CallMedex is designed as a complete medical service platform where a
          patient can access diagnostics, pharmacy, consultation, and profile
          services without switching between different systems.
        </p>
      </section>

      <section className="cm-about-grid">
        {cards.map((card) => (
          <div className="cm-about-card" key={card.title}>
            <div className="cm-about-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </section>

      <section className="cm-about-flow">
        <h2>How the Platform Works</h2>

        <div className="cm-flow-list">
          <div>Register</div>
          <span></span>
          <div>Verify OTP</div>
          <span></span>
          <div>Complete Profile</div>
          <span></span>
          <div>Book Service</div>
        </div>
      </section>

      <section className="cm-about-bottom">
        <div>
          <h2>Project Vision</h2>
          <p>
            The main goal of CallMedex is to make healthcare booking and
            management faster, cleaner, and easier for both patients and service
            providers.
          </p>
        </div>

        <div className="cm-about-stats">
          <div>
            <h3>3</h3>
            <p>Main Services</p>
          </div>
          <div>
            <h3>7+</h3>
            <p>User Roles</p>
          </div>
          <div>
            <h3>24/7</h3>
            <p>Digital Access</p>
          </div>
        </div>
      </section>
    </main>
  );
}