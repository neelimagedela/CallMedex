import React from "react";
import { S } from "./consultationStyles";

export default function SectionHeader({
  step,
  title,
  subtitle,
  color = "#22c1c3",
}) {
  return (
    <div style={S.secHead}>
      <div
        style={{
          ...S.badge,
          background: color,
        }}
      >
        {step}
      </div>

      <div>
        <p style={S.secTitle}>{title}</p>
        <p style={S.secSub}>{subtitle}</p>
      </div>
    </div>
  );
}