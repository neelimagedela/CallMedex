export default function DoctorConsultationSection({

  doctorForm,
  dispatch

}) {

  return (

    <div className="section-card">

      <h2 className="section-title">
        Consultation Information
      </h2>

      <p className="section-subtitle">
        Consultation preferences and availability
      </p>

      <div className="form-grid-2">

        <div className="form-group">

          <label>Available Timings</label>

          <input
            type="text"

            value={doctorForm.availableTimings}

            onChange={(e) =>
              dispatch({
                name: "availableTimings",
                value: e.target.value
              })
            }

            placeholder="Example: 10AM - 5PM"
          />
        </div>

        <div className="form-group">

          <label>Consultation Mode</label>

          <select

            value={doctorForm.consultationMode}

            onChange={(e) =>
              dispatch({
                name: "consultationMode",
                value: e.target.value
              })
            }
          >

            <option value="">
              Select Mode
            </option>

            <option value="online">
              Online
            </option>

            <option value="offline">
              Offline
            </option>

            <option value="both">
              Both
            </option>

          </select>
        </div>

      </div>

      <div style={{ marginTop: "20px" }}>

        <label>

          <input
            type="checkbox"

            checked={doctorForm.availableForOnlineConsultation}

            onChange={(e) =>
              dispatch({
                name: "availableForOnlineConsultation",
                value: e.target.checked
              })
            }
          />

          {" "}Available For Online Consultation

        </label>

      </div>

    </div>
  );
}