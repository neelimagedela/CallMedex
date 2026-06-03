import React from "react";
import { usePhlebo } from "../../context/PhleboContext";
import { CheckCircle } from "lucide-react";

const CompletedTasks = () => {
  const { completedTasks } = usePhlebo();
  console.log("Completed Tasks:", completedTasks);

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b"
        }}
      >
        Completed Tasks
      </h2>
{completedTasks.length === 0 && (
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      textAlign: "center"
    }}
  >
    No completed tasks yet.
  </div>
)}

      {completedTasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            marginBottom: "15px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}
          >
            <strong>{task.id}</strong>
            <strong>₹{task.amount}</strong>
          </div>

          <p>{task.patientName}</p>
          <div style={{ marginTop: "10px" }}>
  <strong>Tests Done:</strong>
  <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
    {task.tests?.map((test, index) => (
      <li key={index}>{test}</li>
    ))}
  </ul>
</div>
          <p
            style={{
              color: "#64748b",
              fontSize: "14px"
            }}
          >
            Completed On: {task.date}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#16a34a",
              fontWeight: "600"
            }}
          >
            <CheckCircle size={16} />
            {task.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;