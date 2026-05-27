/* shared/ui.jsx — Reusable presentational atoms */

/** Section heading with eyebrow + title + sub-text */
export function SectionHeader({ eyebrow, title, sub, align = "center" }) {
  return (
    <div className="sec-head" style={align !== "center" ? { textAlign: align } : {}}>
      <div className="sec-eyebrow">{eyebrow}</div>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

/** Labelled form field wrapping an <input> or <select> */
export function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

/** Two-column field grid */
export function FieldRow({ children }) {
  return <div className="field-row">{children}</div>;
}

/** Chevron-down SVG icon */
export function ChevDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}