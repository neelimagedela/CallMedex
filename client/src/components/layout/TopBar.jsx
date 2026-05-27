import { SITE } from "../../data/siteData";

export default function TopBar() {
  const { emergency, ambulance, bloodBank, tagline } = SITE;
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span>🚨 {emergency.label}: <a href={`tel:${emergency.tel}`}>{emergency.display}</a></span>
        <span>🚑 {ambulance.label}: <a href={`tel:${ambulance.tel}`}>{ambulance.display}</a></span>
        <span>🩸 {bloodBank.label}: <a href={`tel:${bloodBank.tel}`}>{bloodBank.display}</a></span>
      </div>
      <div className="topbar-right">
        <span className="topbar-pill">✦ {tagline}</span>
      </div>
    </div>
  );
}