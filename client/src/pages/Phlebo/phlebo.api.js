import { api } from "../../shared/api";

export const phleboApi = {
  updateLocation: (payload) =>
    api.post("/home-service/phlebo/location", payload),

  getBookings: () =>
    api.get("/home-service/phlebo/bookings"),

  acceptBooking: (bookingId) =>
    api.patch(`/home-service/phlebo/bookings/${bookingId}/accept`),

  getActiveBooking: () =>
    api.get("/home-service/phlebo/active"),

  updateStatus: (bookingId, status) =>
    api.patch(`/home-service/phlebo/bookings/${bookingId}/status`, { status }),
};