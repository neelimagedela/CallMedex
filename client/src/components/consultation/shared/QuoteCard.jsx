import React from "react";
import { S } from "./consultationStyles";

export default function QuoteCard({
  icon,
  quote,
  author,
}) {
  return (
    <div
      style={{
        ...S.card,
        borderLeft: "3px solid #22c1c3",
      }}
    >
      <div
        style={{
          fontSize: "1.4rem",
          marginBottom: 6,
        }}
      >
        {icon}
      </div>

      <p
        style={{
          fontSize: ".82rem",
          color: "#64748b",
          lineHeight: 1.65,
          margin: "0 0 8px",
          fontStyle: "italic",
        }}
      >
        "{quote}"
      </p>

      <p
        style={{
          fontSize: ".75rem",
          fontWeight: 700,
          color: "#22c1c3",
          margin: 0,
        }}
      >
        {author}
      </p>
    </div>
  );
}