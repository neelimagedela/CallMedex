import { api } from "../../shared/api";

export const getLabTechnicianDashboard = async () => {
  const response = await api.get("/api/staff/lab-technician/dashboard");
  return response.data.data;
};

export const updateWalkinStatus = async (id, currentStatus) => {
  const response = await api.patch("/api/staff/lab-technician/walkin-status", { id, currentStatus });
  return response.data;
};

export const updateHomeServiceStatus = async (id, currentStatus, action = "accept") => {
  const response = await api.patch("/api/staff/lab-technician/home-service-status", { id, currentStatus, action });
  return response.data;
};

export const uploadReport = async (bookingId, bookingType, fileBase64, fileName) => {
  const response = await api.post("/api/staff/lab-technician/upload-report", {
    bookingId, bookingType, fileBase64, fileName,
  });
  return response.data;
};

export const getMyReports = async () => {
  const response = await api.get("/api/staff/reports/my");
  return response.data.data;
};