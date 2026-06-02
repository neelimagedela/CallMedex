const crypto = require("crypto");

const {
  createBooking,
  getBookingsByUserId
} = require("../models/teleConsultation.model");

const bookTeleConsultation = async (req, res) => {

  const receiptId =
    "TC" +
    Date.now() +
    crypto.randomBytes(3).toString("hex").toUpperCase();

  const bookingId = await createBooking({
    receiptId,
    userId: req.user.id,
    ...req.body
  });

  return res.status(201).json({
    success: true,
    message: "Tele consultation booked successfully",
    data: {
      bookingId,
      receiptId
    }
  });
};

const getMyBookings = async (req, res) => {

  const bookings = await getBookingsByUserId(
    req.user.id
  );

  return res.status(200).json({
    success: true,
    data: bookings
  });
};

module.exports = {
  bookTeleConsultation,
  getMyBookings
};