import { api } from "../../shared/api";

export const fetchPharmacyDashboardProfile = async () => {
  const response = await api.get("/pharmacy/dashboard/profile");
  return response.data;
};

export const fetchPharmacyDashboardInventory = async (search = "") => {
  const response = await api.get("/pharmacy/dashboard/inventory", {
    params: { search },
  });

  return response.data;
};

export const fetchPharmacyDashboardOrders = async () => {
  const response = await api.get("/pharmacy/dashboard/orders");
  return response.data;
};

export const updatePharmacyDashboardOrderStatus = async (orderId, status) => {
  const response = await api.patch(
    `/pharmacy/dashboard/orders/${orderId}/status`,
    { status }
  );

  return response.data;
};