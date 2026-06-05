import React from "react";
import { S } from "./consultationStyles";

export default function LoggedInCard({ patient }) {
  return (
    <div style={S.card}>
      <p
        style={{
          fontSize: ".7rem",
          fontWeight: 700,
          letterSpacing: 1,
          color: "#94a3b8",
          margin: "0 0 14px",
          textTransform: "uppercase",
        }}
      >
        👤 Logged In As
      </p>

      {patient ? (
        <>
          <p
            style={{
              fontWeight: 700,
              fontSize: ".95rem",
              color: "#0A2540",
              margin: "0 0 4px",
            }}
          >
            {patient.name}
          </p>

          <p
            style={{
              fontSize: ".8rem",
              color: "#64748b",
              margin: "0 0 2px",
            }}
          >
            {patient.email}
          </p>

          <p
            style={{
              fontSize: ".75rem",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            {patient.public_user_id}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}