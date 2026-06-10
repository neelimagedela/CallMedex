export default function AdminDocumentsSection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Documents Upload
      </h3>

      <div className="form-grid-2">

        <div className="upload-box">

          <label>
            Aadhaar Upload *
          </label>

          <input
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "aadhaarUpload",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">

          <label>
            Medical Degree Upload *
          </label>

          <input
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "medicalDegreeUpload",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>
    </div>
  );
}