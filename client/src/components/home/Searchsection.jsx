import { useState } from "react";
import { SEARCH_TABS } from "../../data/siteData";

export default function SearchSection() {
  const [tab, setTab] = useState(0);
  return (
    <section className="search-sec">
      <div className="search-inner">
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.45rem", fontWeight: 700, marginBottom: "1.1rem", textAlign: "center", color: "var(--c1)" }}>
          Find Doctors, Tests, Medicines &amp; More
        </h3>
        <div className="search-tabs">
          {SEARCH_TABS.map((t, i) => (
            <button key={i} className={`stab${tab === i ? " on" : ""}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        <div className="sbar">
          <div className="sloc">📍 Visakhapatnam ▾</div>
          <input className="sinput" placeholder="Search doctors, hospitals, medicines, symptoms..." />
          <div className="sactions">
            <button className="siconbtn" title="Voice Search">🎙️</button>
            <button className="siconbtn" title="AI Checker">🤖</button>
            <button className="btn btn-red" style={{ borderRadius: 12, marginRight: 6 }}>🚨 Emergency</button>
          </div>
        </div>
      </div>
    </section>
  );
}