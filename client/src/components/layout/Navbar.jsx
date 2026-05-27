import { useState } from "react";

import { NAV, LOGINS, SITE } from "../../data/siteData";
import { ChevDown } from "../shared/ui";
import logo from "../../assets/logo_medex.png";


export default function Navbar({ scrolled, setPage, setStep }) {

  return (
    <nav className={`nav-outer${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        {/* LOGO */}
        <a className="nav-logo" href={SITE.baseUrl} onClick={(e) => { e.preventDefault(); setPage("home"); }}>
          <img src={logo} alt="CallMedex Logo" />
          <span className="nav-logo-text">call<span>medex</span></span>
        </a>

        {/* MENU */}
        <div className="nav-menu">
          {NAV.map((item, i) =>
            item.solo ? (
              <div className="nav-item" key={i}>
                <a className="nav-link" href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
              </div>
            ) : (
              <div className="nav-item" key={i}>
                <button className="nav-link">{item.label}<ChevDown /></button>
                <div className="nav-drop">
                  {item.items.map((d, j) => (
                    <button
                      className="drop-item"
                      key={j}
                      onClick={() => d.page ? setPage(d.page) : window.open(d.href, "_blank")}
                    >
                      <span className="drop-icon">{d.ico}</span>
                      {d.text}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* RIGHT */}
        <div className="nav-cta">
         {/* LOGIN BUTTON */}

         <button
           className="btn btn-login"
           onClick={() => setPage("login")}
         >
          🔐 Login
         </button>


          <a className="btn btn-book" href={SITE.patientPortal} target="_blank" rel="noreferrer">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book <br />Appointment
          </a>
        </div>
      </div>
    </nav>
  );
}
