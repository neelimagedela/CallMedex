export const S = {
  page: {
    display: "flex",
    gap: 20,
    padding: "100px 28px 48px",
    background: "#f4f8fb",
    minHeight: "100vh",
    fontFamily: "'Segoe UI',sans-serif",
  },

  sidebar: {
    width: 260,
    flexShrink: 0,
  },

  card: {
    background: "white",
    borderRadius: 20,
    padding: "20px 22px",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
    marginBottom: 16,
  },

  main: {
    flex: 1,
    minWidth: 0,
  },

  h1: {
    fontSize: "1.7rem",
    color: "#0A2540",
    margin: 0,
    fontWeight: 700,
  },

  sub: {
    color: "#64748b",
    fontSize: ".88rem",
    marginTop: 4,
    marginBottom: 0,
  },

  section: {
    background: "white",
    borderRadius: 20,
    padding: "22px 24px",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  },

  secHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },

  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#22c1c3",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: ".9rem",
    flexShrink: 0,
  },

  secTitle: {
    color: "#0A2540",
    fontSize: "1rem",
    fontWeight: 700,
    margin: 0,
  },

  secSub: {
    color: "#94a3b8",
    fontSize: ".8rem",
    margin: "2px 0 0",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  label: {
    display: "block",
    fontSize: ".75rem",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },

  inp: {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #e8edf2",
    borderRadius: 10,
    fontSize: ".88rem",
    background: "#f8fafc",
    boxSizing: "border-box",
  },

  specializationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 12,
  },

  specializationCard: {
    border: "2px solid #edf2f7",
    borderRadius: 16,
    padding: "16px",
    cursor: "pointer",
    background: "#f8fafc",
    transition: ".2s",
  },

  specializationCardSel: {
    borderColor: "#22c1c3",
    background: "#ecfcfc",
  },

  slotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))",
    gap: 8,
  },

  slotCard: {
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    padding: "9px 12px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: ".83rem",
    fontWeight: 600,
    background: "#f8fafc",
  },

  slotActive: {
    borderColor: "#22c1c3",
    background: "#ecfcfc",
  },

  slotBooked: {
    opacity: 0.4,
    cursor: "not-allowed",
    background: "#f1f5f9",
    textDecoration: "line-through",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #f0f4f8",
  },

  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0 0",
    fontWeight: 700,
    fontSize: "1rem",
  },

  confirmBtn: {
    width: "100%",
    padding: "13px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 12,
  },

  confirmBtnDisabled: {
    width: "100%",
    padding: "13px",
    background: "#cbd5e1",
    color: "white",
    border: "none",
    borderRadius: 14,
    cursor: "not-allowed",
    marginTop: 12,
  },
};
