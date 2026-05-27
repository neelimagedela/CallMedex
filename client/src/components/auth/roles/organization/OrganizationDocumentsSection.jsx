export default function OrganizationDocumentsSection({
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Verification Documents
      </h2>

      <p className="section-subtitle">
        Upload organization verification documents
      </p>

      <div className="form-grid-2">


        <div className="upload-box">
          <p>Registration Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "registrationCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Municipal/Health License</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "governmentLicense",
                value: e.target.files[0],
              })
            }
          />
        </div>


        <div className="upload-box">
          <p>Authorized Person ID Proof</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                name: "authorizedPersonIdProof",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
}