import { api } from "../../shared/api";

export const bookWalkInClinicAppointment = async (payload) => {
  const response = await api.post("/clinic/book", payload);
  return response.data;
};