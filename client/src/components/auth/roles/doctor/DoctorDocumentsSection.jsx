export default function DoctorDocumentsSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Documents Upload
      </h2>

      <p className="section-subtitle">
        Upload your verification documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">

          <p>Medical Certificate</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "medicalCertificate",
                value: e.target.files[0]
              })
            }
          />

        </div>

        <div className="upload-box">

          <p>Medical License</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "medicalLicense",
                value: e.target.files[0]
              })
            }
          />

        </div>

        <div className="upload-box">

          <p>ID Proof</p>

          <input
            type="file"

            onChange={(e) =>
              dispatch({
                name: "idProof",
                value: e.target.files[0]
              })
            }
          />

        </div>


      </div>

    </div>
  );
}