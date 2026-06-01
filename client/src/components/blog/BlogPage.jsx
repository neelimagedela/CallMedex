const blogs = [
  {
    icon: "🩺",
    tag: "Preventive Health",
    title: "Why Regular Health Checkups Matter",
    desc:
      "Routine health checkups help identify silent problems like BP, sugar, thyroid and cholesterol early. They are useful for adults, elderly patients and anyone with a family health history.",
  },
  {
    icon: "🏡",
    tag: "Home Care",
    title: "When to Choose Consultation at Home",
    desc:
      "Home consultation is helpful for elderly care, post-hospital follow-up, physiotherapy support and patients with travel difficulty. It gives care in a safe and comfortable environment.",
  },
  {
    icon: "🔬",
    tag: "Diagnostics",
    title: "How to Prepare for Diagnostic Tests",
    desc:
      "Before diagnostic tests, carry your ID, prescription and previous reports. Reach before your selected slot and follow fasting or preparation instructions for better report accuracy.",
  },
  {
    icon: "💊",
    tag: "Pharmacy",
    title: "Safe Medicine Ordering Tips",
    desc:
      "Order medicines with the correct name, strength and quantity. Keep prescriptions ready where needed, check expiry dates after delivery and avoid changing dosage without advice.",
  },
];

export default function BlogPage({ setPage }) {
  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <button style={S.back} onClick={() => setPage("home")}>
          ← Back
        </button>

        <section style={S.hero}>
          <div>
            <span style={S.badge}>CALLMEDEX CARE JOURNAL</span>
            <h1 style={S.title}>Health guidance made simple</h1>
            <p style={S.sub}>
              Short and useful healthcare articles for patients about checkups,
              home care, diagnostics and safe medicine support.
            </p>
          </div>

          <div style={S.heroIcon}>🫀</div>
        </section>

        <section style={S.grid}>
          {blogs.map((blog) => (
            <article key={blog.title} style={S.card}>
              <div style={S.icon}>{blog.icon}</div>
              <span style={S.tag}>{blog.tag}</span>
              <h2 style={S.cardTitle}>{blog.title}</h2>
              <p style={S.desc}>{blog.desc}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    padding: "115px 28px 60px",
    background:
      "radial-gradient(circle at top left, #e8fbff 0, #f4f8fb 35%, #eef4f8 100%)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
  },
  back: {
    border: 0,
    background: "#e63946",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 14,
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: 20,
    boxShadow: "0 8px 18px rgba(230,57,70,.22)",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    background: "linear-gradient(135deg, #08243f, #0d4068)",
    color: "#fff",
    borderRadius: 30,
    padding: "42px 38px",
    marginBottom: 26,
    boxShadow: "0 20px 45px rgba(8,36,63,.22)",
    overflow: "hidden",
  },
  badge: {
    display: "inline-block",
    background: "rgba(34,193,195,.18)",
    color: "#8ff7ff",
    padding: "7px 14px",
    borderRadius: 999,
    fontSize: ".74rem",
    fontWeight: 900,
    letterSpacing: ".7px",
    marginBottom: 14,
  },
  title: {
    margin: 0,
    fontSize: "2.35rem",
    lineHeight: 1.1,
    fontWeight: 900,
  },
  sub: {
    margin: "12px 0 0",
    maxWidth: 640,
    color: "rgba(255,255,255,.78)",
    fontSize: ".98rem",
    lineHeight: 1.7,
  },
  heroIcon: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    background: "rgba(255,255,255,.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.2rem",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(245px, 1fr))",
    gap: 18,
    alignItems: "stretch",
  },
  card: {
    minHeight: 280,
    background: "rgba(255,255,255,.94)",
    borderRadius: 24,
    padding: 24,
    border: "1px solid #e8edf2",
    boxShadow: "0 12px 28px rgba(15,23,42,.08)",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background: "#ecfcfc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    marginBottom: 14,
  },
  tag: {
    color: "#0A9C87",
    fontSize: ".74rem",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  cardTitle: {
    minHeight: 62,
    margin: "8px 0 10px",
    color: "#0A2540",
    fontSize: "1.15rem",
    lineHeight: 1.35,
    fontWeight: 900,
  },
  desc: {
    color: "#526174",
    fontSize: ".9rem",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "left",
  },
};