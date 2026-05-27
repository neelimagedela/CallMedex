export default function AdminPermissionsSection({
  state,
  dispatch,
}) {
  return (
    <div className="section-card">

      <h3 className="section-title">
        Permissions
      </h3>

      <div className="pill-group">

        {[
          "User Management",
          "Inventory",
          "Reports",
          "Appointments",
          "Settings",
          "Analytics",
        ].map((permission) => (
          <button
            key={permission}
            type="button"
          >
            {permission}
          </button>
        ))}

      </div>

    </div>
  );
}