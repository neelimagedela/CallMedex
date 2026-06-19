/* sections.jsx — all mid-page sections as named exports */
import {
  ABOUT_CARDS, SPECIALISTS, PACKAGES, FEATURES,
  SERVICES, METRICS, APPT_STEPS, APPOINTMENT_SERVICES,
  BRANCHES, TESTIMONIALS, SITE,
} from "../../data/siteData";
import { SectionHeader, Field, FieldRow } from "../shared/ui";

/* ─── helpers ─────────────────────────────────────────── */
const parseCurrency = (s) => parseInt(s.replace(/[₹,]/g, ""), 10);
const discount = (curr, orig) => Math.round((orig - curr) / orig * 100);

/* ─── About ─────────────────────────────────────────────── */
export function AboutSection({ setPage }) {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="sec-eyebrow">⚕️ About CallMedex</div>
            <h2 className="sec-title" style={{ textAlign: "left" }}>Founded to Transform Healthcare Access</h2>
            <p style={{ color: "var(--c8)", lineHeight: 1.85, marginBottom: "1.5rem", fontSize: ".94rem" }}>
              Founded in {SITE.founded} by a doctor with over 30 years of experience in healthcare, CallMedex is dedicated
              to transforming healthcare access for underserved communities in India. Our mission is to establish a
              comprehensive healthcare system that caters to both outpatient (OP) and inpatient (IP) needs.
            </p>
            <button
  className="btn btn-primary btn-lg"
  onClick={() => setPage("about")}
>
  Learn About Us →
</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {ABOUT_CARDS.map(({ ico, num, lbl }) => (
              <div key={lbl} style={{ background: "var(--c6)", borderRadius: 16, padding: "1.25rem", border: "1.5px solid var(--c7)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: ".4rem" }}>{ico}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--c1)" }}>{num}</div>
                <div style={{ fontSize: ".74rem", color: "var(--c8)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Specialists ───────────────────────────────────────── */
export function SpecialistsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="⚕️ Medical Specialists"
          title="Find the Right Specialist"
          sub="Connect with verified specialists across 14+ medical disciplines for quality care"
        />
        <div className="spec-grid">
          {SPECIALISTS.map((s, i) => (
            <div className="spec-card" key={i}>
              <div className="spec-ico">{s.ico}</div>
              <div className="spec-name">{s.name}</div>
              <div className="spec-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Health Packages ───────────────────────────────────── */
export function PackagesSection({ setPage }) {
  return (
    <section id="health-packages" className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="📦 Health Packages"
          title="Affordable Diagnostic Packages"
          sub="Comprehensive health checkup packages at unbeatable prices — home sample collection available"
        />
        <div className="pkg-grid">
          {PACKAGES.map((p, i) => {
            const curr = parseCurrency(p.price);
            const orig = parseCurrency(p.old);
            return (
              <div className="pkg-card" key={i}>
                <div className="pkg-name">{p.name}</div>
                <div className="pkg-price-row">
                  <span className="pkg-price">{p.price}</span>
                  <span className="pkg-price-old">{p.old}</span>
                  <span className="pkg-save">{discount(curr, orig)}% off</span>
                </div>
                <div className="pkg-tests"><strong>Includes: </strong>{p.tests}</div>
          <button
  className="btn btn-primary"
  style={{
    width: "100%",
    justifyContent: "center",
    borderRadius: 10
  }}
  onClick={() => {

  localStorage.setItem(
    "selectedPackage",
    JSON.stringify(p)
  );

  const token =
    localStorage.getItem("accessToken");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (!token) {

    localStorage.setItem(
      "redirectAfterLogin",
      "diagnostic-package"
    );

    setPage("login");
    return;
  }

  setPage("diagnostic-package");
}}
>
  Book Now
</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── AI Features ───────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="🤖 Artificial Intelligence"
          title="Smart AI Healthcare Features"
          sub="Cutting-edge AI tools designed to monitor, predict, and improve your health outcomes"
        />
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-ico" style={{ background: f.bg }}>{f.ico}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────── */
export function ServicesSection({setPage}) {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SectionHeader
          eyebrow="🏥 Our Services"
          title="Comprehensive Healthcare Services"
          sub="End-to-end healthcare solutions for patients, families, and healthcare professionals"
        />
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div className="svc-card" key={i}>
              <span className="svc-ico">{s.ico}</span>
              <div className="svc-title">{s.title}</div>
              <p className="svc-desc">{s.desc}</p>
              <a className="svc-link" href="#">Learn More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics Strip ─────────────────────────────────────── */
export function MetricsSection() {
  return (
    <section className="metrics">
      <div className="metrics-inner">
        <div className="met-grid">
          {METRICS.map(({ ico, num, lbl }) => (
            <div className="met-card" key={lbl}>
              <span className="met-ico">{ico}</span>
              <div className="met-num">{num}</div>
              <div className="met-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Appointment ───────────────────────────────────────── */
export function AppointmentSection({ setPage }) {
  return (
    <section className="appt-sec">
      <div
  className="appt-grid"
  style={{
    justifyContent: "center",
    display: "flex",
  }}
>
      <div
  className="appt-left"
  style={{
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
  }}
>
          <div className="sec-eyebrow" style={{ textAlign: "left", display: "inline-flex", marginBottom: ".75rem" }}>
            📅 Book Appointment
          </div>
          <h2>Request an Appointment <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--c2)" }}>Easily</em></h2>
          <p>
            For urgent matters, call us directly:{" "}
            <a href={`tel:${SITE.emergency.tel}`} style={{ color: "var(--c2)", fontWeight: 700 }}>{SITE.emergency.display}</a>
          </p>
          <div className="appt-steps">
            {APPT_STEPS.map((s, i) => (
              <div className="astep" key={i}>
                <div className="astep-num">{i + 1}</div>
                <div className="astep-text">{s}</div>
              </div>
            ))}
          </div>
         <button
  className="btn btn-primary btn-lg"
  onClick={() => setPage("login")}
>
  Patient Login / Signup →
</button>
        </div>
      </div>
    </section>
  );
}

/* ─── Branches ──────────────────────────────────────────── */
export function BranchesSection() {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SectionHeader
          eyebrow="📍 Our Locations"
          title="Visit Our Partners"
          sub="Three conveniently located centers in Visakhapatnam serving the community"
        />
        <div className="branch-grid">
          {BRANCHES.map((b, i) => (
            <div className="bc" key={i}>
              <div className="bc-map">
                <div className="bc-grid-bg"></div>
                <span className="bc-pin">📍</span>
              </div>
              <div className="bc-body">
                <div className="bc-name">{b.name}</div>
                <div className="bc-open"><span></span>Open Now</div>
                <div className="bc-row">🕐 {b.hours}</div>
                <div className="bc-row">📞 {b.phone}</div>
                <div className="bc-row">🏥 {b.services}</div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}>
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ──────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHeader
          eyebrow="💬 Patient Reviews"
          title="What Our Patients Say"
          sub="Real stories from real patients who chose CallMedex for their healthcare journey"
        />
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="tc" key={i}>
              <div className="tc-stars">{"★".repeat(t.stars)}</div>
              <p className="tc-text">{t.text}</p>
              <div className="tc-author">
                <div className="tc-av" style={{ background: t.bg, color: t.color }}>{t.initials}</div>
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────── */
export function CTASection({ setPage }) {
  return (
    <section className="cta-sec">
      <h2>Start Your Health Journey Today</h2>
      <p>Join 10,000+ patients who trust CallMedex for smarter, faster, and more accessible healthcare in Visakhapatnam.</p>
      <div className="cta-btns">
        <button className="btn btn-xl" style={{ background: "#fff", color: "var(--c2)" }} onClick={() => setPage("register")}>
          🚀 Create Free Account
        </button>
        <button className="btn btn-xl" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,.3)" }}>
          📱 Download App
        </button>
        <button
  className="btn btn-xl btn-red"
  onClick={() => setPage("consultation-choice")}
>
  📅 Book Appointment
</button>
      </div>
    </section>
  );
}