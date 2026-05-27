import { HERO_STATS, VITALS, SITE } from "../../data/siteData";

export default function HeroSection({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-grid">
        {/* LEFT */}
        <div>
          <div className="hero-tag"><span className="hero-pulse"></span> AI-Powered Healthcare Platform</div>
          <h1 className="hero-h1">
            Smart Healthcare &amp;<br />
            <em>Remote Patient</em><br />
            <mark>Monitoring</mark> — Vizag
          </h1>
          <p className="hero-sub">
            Book appointments, order medicines, monitor vitals, and access diagnostic services from anywhere.
            Founded in {SITE.founded}, serving Visakhapatnam and beyond.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-xl" onClick={() => setPage("register")}>🚀 Get Started Free</button>
            <a
              className="btn btn-xl"
              style={{ background: "rgba(0,180,216,.12)", color: "#0369a1", border: "1.5px solid rgba(0,180,216,.3)" }}
              href="https://callmedex.com/consultation.php?service=tele-consultation"
              target="_blank" rel="noreferrer"
            >
              📹 Book Consultation
            </a>
            <a className="btn btn-ghost btn-xl" href="https://callmedex.com/health_packages.php" target="_blank" rel="noreferrer">
              📦 Health Packages
            </a>
          </div>
          <div className="hero-stats">
            {HERO_STATS.map(({ num, label }) => (
              <div key={label}>
                <div className="hs-num">{num}</div>
                <div className="hs-lbl">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated health card */}
        <div className="hero-visual">
          <div className="hv-main">
            <div className="hv-header">
              <div className="hv-avatar">🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: ".92rem" }}>AI Health Monitor</div>
                <div style={{ fontSize: ".72rem", color: "var(--c8)" }}>Real-time Analysis Active</div>
              </div>
              <div className="hv-live">LIVE</div>
            </div>
            <div className="ecg-wrap">
              <svg viewBox="0 0 400 56" preserveAspectRatio="none">
                <path
                  className="ecg-p"
                  d="M0,28 L55,28 L70,8 L82,48 L94,8 L108,28 L160,28 L175,8 L187,48 L199,8 L213,28 L265,28 L280,8 L292,48 L304,8 L318,28 L370,28 L385,8 L397,48 L400,28"
                  fill="none" stroke="#1B6CA8" strokeWidth="2.2" strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="vitals-grid">
              {VITALS.map(({ value, label, color }) => (
                <div className="vital" key={label}>
                  <div className="vital-val" style={{ color }}>{value}</div>
                  <div className="vital-lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}