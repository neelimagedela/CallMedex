const crypto = require("crypto");
const db = require("../../../config/db");

function generateReceiptId() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `WC${year}${month}${day}${random}`;
}

const createWalkInCenterBooking = async (bookingData) => {
  const receiptId = generateReceiptId();

  const testsJson = Array.isArray(bookingData.tests)
    ? JSON.stringify(bookingData.tests)
    : JSON.stringify([]);

  const [result] = await db.execute(
    `
    INSERT INTO diagnostic_walkin_bookings (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      tests,
      walkin_date,
      time_slot,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      receiptId,
      bookingData.userId,
      bookingData.patientName,
      bookingData.patientAge,
      bookingData.patientSex,
      bookingData.patientMobile,
      bookingData.patientEmail,
      bookingData.patientAddress,
      bookingData.branch,
      testsJson,
      bookingData.walkinDate,
      bookingData.timeSlot,
      bookingData.totalAmount,
      bookingData.status || "pending",
    ]
  );

  return {
    id: result.insertId,
    receiptId,
    ...bookingData,
  };
};

module.exports = {
  createWalkInCenterBooking,
};