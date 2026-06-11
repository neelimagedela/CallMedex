import { api } from "../../shared/api";

export const phleboApi = {
  getProfile: () => api.get("/home-service/phlebo/profile"),
  updateLocation: (payload) => api.post("/home-service/phlebo/location", payload),
  getBookings: () => api.get("/home-service/phlebo/bookings"),
  getCompletedBookings: () => api.get("/home-service/phlebo/bookings/completed"),
  getRejectedBookings: () => api.get("/home-service/phlebo/bookings/rejected"),
  resubmitBooking: (bookingId) => api.patch(`/home-service/phlebo/bookings/${bookingId}/resubmit`),
  acceptBooking: (bookingId) => api.patch(`/home-service/phlebo/bookings/${bookingId}/accept`),
  getActiveBooking: () => api.get("/home-service/phlebo/active"),
  updateStatus: (bookingId, status) =>
    api.patch(`/home-service/phlebo/bookings/${bookingId}/status`, { status }),
};