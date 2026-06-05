import React from "react";
import { S } from "./consultationStyles";

export default function SupportCard() {
  return (
    <div style={S.card}>
      <p
        style={{
          fontSize: ".7rem",
          fontWeight: 700,
          letterSpacing: 1,
          color: "#94a3b8",
          margin: "0 0 8px",
          textTransform: "uppercase",
        }}
      >
        🚨 Emergency
      </p>

      <p
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#e63946",
          margin: "0 0 2px",
        }}
      >
        +91 80746 77177
      </p>

      <p
        style={{
          fontSize: ".75rem",
          color: "#94a3b8",
          margin: 0,
        }}
      >
        Available 24/7 · 365 days
      </p>
    </div>
  );
}