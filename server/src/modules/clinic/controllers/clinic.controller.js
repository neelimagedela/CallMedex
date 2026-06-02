const {
  createClinicAppointment,
  getMyClinicAppointments,
} = require("../models/clinic.model");

const generateReceiptId = () => {
  return `WIC-${Date.now()}`;
};

const bookClinicAppointmentController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const appointmentData = {
      ...req.body,
      user_id: userId,
      receipt_id: generateReceiptId(),
    };

    const appointmentId = await createClinicAppointment(appointmentData);

    return res.status(201).json({
      success: true,
      message: "Walk-in centre appointment booked successfully",
      data: {
        appointmentId,
        receiptId: appointmentData.receipt_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyClinicAppointmentsController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const appointments = await getMyClinicAppointments(userId);

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookClinicAppointmentController,
  getMyClinicAppointmentsController,
};