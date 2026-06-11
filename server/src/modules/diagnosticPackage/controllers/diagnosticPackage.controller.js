const asyncHandler = require("../../../shared/utils/asyncHandler");
const db = require("../../../config/db");

const bookDiagnosticPackage = asyncHandler(async (req, res) => {
   console.log("BODY:", req.body);
  console.log("USER:", req.user);

  const {
    packageName,
    packagePrice,

    patientName,
    patientAge,
    patientGender,
    patientMobile,
    patientEmail,
    patientAddress,

    appointmentDate,
    timeSlot,
  } = req.body;
  const receiptId = `DP${Date.now()}`;
  await db.execute(
    `
    INSERT INTO diagnostic_package_bookings
    (
      receipt_id,
      user_id,
      package_name,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      appointment_date,
      time_slot,
      total_amount
    )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      receiptId,
      req.user.id,

      packageName,

      patientName,
      patientAge,
      patientGender,
      patientMobile,
      patientEmail,
      patientAddress,

      appointmentDate,
      timeSlot,

      packagePrice,
    ]
  );

  res.status(201).json({
    success: true,
    message: "Package booked successfully",
  });
});
 
const getMyDiagnosticBookings =
asyncHandler(async (req, res) => {

  const [bookings] = await db.execute(
    `
    SELECT *
    FROM diagnostic_package_bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [req.user.id]
  );

  const formattedBookings = bookings.map((booking) => ({
    id: booking.id,

    bookingType: "Diagnostic Package",

    receiptId: booking.receipt_id,

    date: booking.appointment_date,
    timeSlot: booking.time_slot,

   status: booking.status || "confirmed",

    patientName: booking.patient_name,
    patientMobile: booking.patient_mobile,

    totalAmount: booking.total_amount,

    locationLabel: "Address",
    locationValue: booking.patient_address,

    detailTitle: "Package Details",

    items: [
      {
        name: booking.package_name,
        quantity: 1,
        price: booking.total_amount,
      },
    ],
  }));
   
console.log(formattedBookings);
  res.status(200).json({
    success: true,
    data: formattedBookings,
  });

});

module.exports = {
  bookDiagnosticPackage,
  getMyDiagnosticBookings,
};