const db = require("../../../config/db");

const createBooking = async (data) => {
  const [result] = await db.execute(
    `
    INSERT INTO tele_consultation_bookings
    (
      receipt_id,
      user_id,

      patient_name,
      patient_age,
      patient_gender,

      patient_mobile,
      patient_email,
      patient_address,

      specialization,

      appointment_date,
      time_slot,

      consultation_fee
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.receiptId,
      data.userId,

      data.patientName,
      data.patientAge,
      data.patientGender,

      data.patientMobile,
      data.patientEmail,
      data.patientAddress,

      data.specialization,

      data.appointmentDate,
      data.timeSlot,

      data.consultationFee
    ]
  );

  return result.insertId;
};

const getBookingsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM tele_consultation_bookings
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  createBooking,
  getBookingsByUserId
};