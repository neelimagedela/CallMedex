import { api } from "../../shared/api";

export const getLabTechnicianDashboard = async () => {
  const response = await api.get("/api/staff/lab-technician/dashboard");
  return response.data.data;
};

export const updateWalkinStatus = async (id, currentStatus) => {
  const response = await api.patch("/api/staff/lab-technician/walkin-status", {
    id,
    currentStatus,
  });
  return response.data;
};