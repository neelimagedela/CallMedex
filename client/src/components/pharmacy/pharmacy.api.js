import { api } from "../../shared/api";

export const fetchPharmacyPatientDetails = async () => {
  const response = await api.get("/pharmacy/patient-details");
  return response.data;
};

export const fetchPharmacyMedicines = async (search = "") => {
  const response = await api.get("/pharmacy/medicines", {
    params: {
      search,
    },
  });

  return response.data;
};

export const createPharmacyOrder = async (payload) => {
  const response = await api.post("/pharmacy/orders", payload);
  return response.data;
};

export const fetchMyPharmacyOrders = async () => {
  const response = await api.get("/pharmacy/orders/my");
  return response.data;
};