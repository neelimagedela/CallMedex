export default function AdminDocumentsSection() {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Documents Upload
      </h3>

      <div className="form-grid-2">


        <div className="upload-box">
          <label>Aadhaar Upload</label>
          <input type="file" />
        </div>


        <div className="upload-box">
          <label>Government ID Proof</label>
          <input type="file" />
        </div>

      </div>
    </div>
  );
}