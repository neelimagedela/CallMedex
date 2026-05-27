import React from "react";

const PharmacyDocumentsSection = ({
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Upload Documents
      </h2>

      <p className="section-subtitle">
        Upload pharmacy verification documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">
          <p>Drug License Document</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "drugLicenseDocument",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>GST Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "gstCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Pharmacist Certificate</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacistCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Pharmacy Images</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "pharmacyImages",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <p>Owner ID Proof</p>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "ownerIdProof",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PharmacyDocumentsSection;