import { api } from "../../shared/api";

export const consultancyHomeApi = {
  getServices: () => api.get("/consultancy-home/services"),
  getMe: () => api.get("/consultancy-home/me"),
  getSlots: (date) => api.get(`/consultancy-home/slots?date=${date}`),
  createBooking: (payload) => api.post("/consultancy-home/bookings", payload)
};