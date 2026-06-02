const db = require("../../../config/db");

const createAppointment = async (appointmentData) => {
  const scansJson = Array.isArray(appointmentData.scans)
    ? JSON.stringify(appointmentData.scans)
    : JSON.stringify(appointmentData.scans || []);
const receiptId =
  `AP${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const [result] = await db.execute(
    `
    INSERT INTO appointments (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_sex,
      patient_mobile,
      patient_email,
      patient_address,
      branch,
      scans,
      appointment_date,
      time_slot,
      prescription_path,
      total_amount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `,
    [
      receiptId,
      appointmentData.userId || null,
      appointmentData.patientName,
      appointmentData.patientAge,
      appointmentData.patientSex,
      appointmentData.patientMobile,
      appointmentData.patientEmail,
      appointmentData.patientAddress,
      appointmentData.branch,
      scansJson,
      appointmentData.appointmentDate,
      appointmentData.timeSlot,
      appointmentData.prescriptionPath || null,
      appointmentData.totalAmount || 0.00,
      appointmentData.status || "pending"
    ]
  );

  return {
    id: result.insertId,
    ...appointmentData
  };
};

const getAppointmentsByUserId = async (userId) => {
  const [rows] = await db.execute(
    `SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC, created_at DESC`,
    [userId]
  );

  return rows;
};

const getAppointmentById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM appointments WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0];
};

module.exports = {
  createAppointment,
  getAppointmentsByUserId,
  getAppointmentById
};