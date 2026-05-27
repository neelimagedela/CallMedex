import { FOOTER_LINKS, SITE } from "../../data/siteData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,var(--c2),var(--c3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>🏥</div>
              <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
                call<span style={{ color: "var(--c4)" }}>medex</span>
              </span>
            </div>
            <p className="footer-desc">
              Transforming healthcare access for underserved communities. Founded in {SITE.founded}, CallMedex
              provides comprehensive diagnostic and pharmacy services in Visakhapatnam.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: ".5rem", textTransform: "uppercase", letterSpacing: 1 }}>Download App</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["🍎 App Store", "🤖 Google Play"].map((label) => (
                  <button key={label} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: ".76rem", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns — Services & Quick Links use plain strings */}
          {["Services", "Quick Links"].map((col) => (
            <div className="footer-col" key={col}>
              <h5>{col}</h5>
              {FOOTER_LINKS[col].map((l) => <a key={l} className="fl" href="#">{l}</a>)}
            </div>
          ))}

          {/* Company column has href objects */}
          <div className="footer-col">
            <h5>Company</h5>
            {FOOTER_LINKS.Company.map(({ label, href }) => (
              <a key={label} className="fl" href={href} target="_blank" rel="noreferrer">{label}</a>
            ))}
          </div>

          {/* Newsletter + Emergency */}
          <div className="footer-col">
            <h5>Newsletter</h5>
            <p style={{ fontSize: ".8rem", marginBottom: ".6rem" }}>Get health tips &amp; news in your inbox.</p>
            <div className="fnl">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: ".5rem" }}>🚨 Emergency Helpline</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--c4)" }}>{SITE.emergency.display}</div>
              <div style={{ fontSize: ".76rem", color: "rgba(255,255,255,.4)", marginTop: 3 }}>Available 24/7 · 365 days</div>
            </div>
          </div>
        </div>

        <div className="footer-bot">
          <div className="footer-copy">{SITE.copyright}</div>
          <div className="footer-soc">
            {SITE.social.map(({ icon, href, label }) => (
              <a key={label} className="fsoc" href={href} target="_blank" rel="noreferrer" aria-label={label}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}