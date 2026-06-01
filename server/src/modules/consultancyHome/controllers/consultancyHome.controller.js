const model = require("../models/consultancyHome.model");

async function getServices(req, res, next) {
  try {
    const services = await model.getActiveServices();
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const patient = await model.getPatientDetails(req.user.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient details not found"
      });
    }

    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

async function getSlots(req, res, next) {
  try {
    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Valid date is required"
      });
    }

    const bookedSlots = await model.getBookedSlots(date);

    res.json({
      success: true,
      data: model.ALLOWED_SLOTS.map((slot) => ({
        slot,
        isBooked: bookedSlots.includes(slot)
      }))
    });
  } catch (error) {
    next(error);
  }
}

async function createBooking(req, res, next) {
  try {
    const booking = await model.createBooking({
      userId:          req.user.id,
      appointmentDate: req.body.appointmentDate,
      timeSlot:        req.body.timeSlot,
      serviceIds:      req.body.serviceIds,
      // ✅ Pass through overrides from frontend
      overridePhone:   req.body.phone,
      overrideAddress: req.body.address,
    });

    res.status(201).json({
      success: true,
      message: "Consultancy at home booking created successfully",
      data: booking
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getServices,
  getMe,
  getSlots,
  createBooking
};