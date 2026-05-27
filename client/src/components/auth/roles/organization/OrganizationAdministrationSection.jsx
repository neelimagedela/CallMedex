export default function OrganizationAdministrationSection({
  organizationForm,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h2 className="section-title">
        Administration Information
      </h2>

      <p className="section-subtitle">
        Enter administration related details
      </p>

      <div className="form-grid-2">

        <div className="form-group">
          <label>Head of Institution</label>

          <input
            type="text"
            placeholder="Enter head name"
            value={organizationForm.headOfInstitution}
            onChange={(e) =>
              dispatch({
                name: "headOfInstitution",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Departments</label>

          <input
            type="number"
            placeholder="Enter departments count"
            value={organizationForm.totalDepartments}
            onChange={(e) =>
              dispatch({
                name: "totalDepartments",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Staff</label>

          <input
            type="number"
            placeholder="Enter staff count"
            value={organizationForm.totalStaff}
            onChange={(e) =>
              dispatch({
                name: "totalStaff",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Total Branches</label>

          <input
            type="number"
            placeholder="Enter branches count"
            value={organizationForm.totalBranches}
            onChange={(e) =>
              dispatch({
                name: "totalBranches",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Operating Hours</label>

          <input
            type="text"
            placeholder="Enter operating hours"
            value={organizationForm.operatingHours}
            onChange={(e) =>
              dispatch({
                name: "operatingHours",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            value={organizationForm.status}
            onChange={(e) =>
              dispatch({
                name: "status",
                value: e.target.value,
              })
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

      </div>

    </div>
  );
}