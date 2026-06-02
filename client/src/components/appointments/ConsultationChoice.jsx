export default function ConsultationChoice({ setPage }) {
  return (
    <div style={{ padding: "120px 20px", textAlign: "center" }}>
      <h1>Select Consultation Type</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <button
          className="btn btn-book"
          onClick={() => setPage("walkin-clinic")}
        >
          Offline Consultation
        </button>

        <button
          className="btn btn-login"
          onClick={() => setPage("tele-consultation")}
        >
          Online Consultation
        </button>
      </div>
    </div>
  );
}