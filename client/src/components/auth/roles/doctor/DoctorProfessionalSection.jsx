export default function DoctorProfessionalSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Professional Information
      </h2>

      <p className="section-subtitle">
        Your medical and professional details
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Medical License Number</label>

          <input
            type="text"

            value={doctorForm.medicalLicenseNumber}

            onChange={(e) =>
              dispatch({
                name: "medicalLicenseNumber",
                value: e.target.value
              })
            }

            placeholder="Enter medical license number"
          />
        </div>

        <div className="form-group">

          <label>Specialization</label>

          <input
            type="text"

            value={doctorForm.specialization}

            onChange={(e) =>
              dispatch({
                name: "specialization",
                value: e.target.value
              })
            }

            placeholder="Enter specialization"
          />
        </div>

        <div className="form-group">

          <label>Qualification</label>

          <input
            type="text"

            value={doctorForm.qualification}

            onChange={(e) =>
              dispatch({
                name: "qualification",
                value: e.target.value
              })
            }

            placeholder="Enter qualification"
          />
        </div>

        <div className="form-group">

          <label>Years Of Experience</label>

          <input
            type="number"

            value={doctorForm.yearsOfExperience}

            onChange={(e) =>
              dispatch({
                name: "yearsOfExperience",
                value: e.target.value
              })
            }

            placeholder="Enter years of experience"
          />
        </div>

        <div className="form-group">

          <label>Hospital / Clinic Name</label>

          <input
            type="text"

            value={doctorForm.hospitalOrClinicName}

            onChange={(e) =>
              dispatch({
                name: "hospitalOrClinicName",
                value: e.target.value
              })
            }

            placeholder="Enter hospital or clinic name"
          />
        </div>

        <div className="form-group">

          <label>Consultation Fee</label>

          <input
            type="number"

            value={doctorForm.consultationFee}

            onChange={(e) =>
              dispatch({
                name: "consultationFee",
                value: e.target.value
              })
            }

            placeholder="Enter consultation fee"
          />
        </div>

      </div>

    </div>
  );
}