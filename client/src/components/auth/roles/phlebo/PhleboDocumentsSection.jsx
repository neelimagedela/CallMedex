import React from "react";

const PhleboDocumentsSection = ({
  phleboForm,
  dispatch,
}) => {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Document Uploads
      </h2>

      <p className="section-subtitle">
        Upload verification and professional documents
      </p>

      <div className="form-grid-2">

        <div className="upload-box">
          <label>Aadhaar card</label>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "aadhaarFront",
                value: e.target.files[0],
              })
            }
          />
        </div>

        <div className="upload-box">
          <label>MLT/DMLT Certificate</label>

          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                name: "phlebotomyCertificate",
                value: e.target.files[0],
              })
            }
          />
        </div>

      </div>

    </div>
  );
};

export default PhleboDocumentsSection;