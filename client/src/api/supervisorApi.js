// client/src/api/supervisorApi.js
// Centralised API layer for the Supervisor module.
// BASE_URL reads from Vite env variable — set VITE_API_URL in your .env file.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `HTTP error ${res.status}`);
  }
  return data.data ?? data;
};

export const supervisorApi = {
  getDashboard: () =>
    fetch(`${BASE_URL}/api/supervisor/dashboard`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  getStaff: () =>
    fetch(`${BASE_URL}/api/supervisor/staff`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  approveStaff: (id) =>
    fetch(`${BASE_URL}/api/supervisor/staff/${id}/approve`, {
      method: "PUT",
      headers: getAuthHeaders(),
    }).then(handleResponse),

  rejectStaff: (id) =>
    fetch(`${BASE_URL}/api/supervisor/staff/${id}/reject`, {
      method: "PUT",
      headers: getAuthHeaders(),
    }).then(handleResponse),

  getPatients: () =>
    fetch(`${BASE_URL}/api/supervisor/patients`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  getProfile: () =>
    fetch(`${BASE_URL}/api/supervisor/profile`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),

  updateProfile: (fields) =>
    fetch(`${BASE_URL}/api/supervisor/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(fields),
    }).then(handleResponse),

  getReports: () =>
    fetch(`${BASE_URL}/api/supervisor/reports`, {
      headers: getAuthHeaders(),
    }).then(handleResponse),
};
