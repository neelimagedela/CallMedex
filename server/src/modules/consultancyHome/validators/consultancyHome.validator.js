const { z } = require("zod");

const createConsultancyHomeBookingSchema = z.object({
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(5).max(50),
  serviceIds: z.array(z.number().int().positive()).min(1),
  // ✅ Added: allow frontend to override phone & address
  phone:   z.string().min(10).max(15).optional(),
  address: z.string().min(8).max(500).optional(),
});

function validateCreateBooking(req, res, next) {
  const parsed = createConsultancyHomeBookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid booking details",
      errors: parsed.error.flatten()
    });
  }

  req.body = parsed.data;
  next();
}

module.exports = { validateCreateBooking };