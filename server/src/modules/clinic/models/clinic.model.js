const db = require("../../../config/db");

const createClinicAppointment = async (data) => {
  const {
    receipt_id,
    user_id,
    patient_name,
    patient_age,
    patient_gender,
    patient_mobile,
    patient_email,
    patient_address,
    clinic_branch,
    appointment_date,
    time_slot,
    consultation_fee,
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO clinic_appointments
    (
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      receipt_id,
      user_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee,
    ]
  );

  return result.insertId;
};

const getMyClinicAppointments = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      receipt_id,
      patient_name,
      patient_age,
      patient_gender,
      patient_mobile,
      patient_email,
      patient_address,
      clinic_branch,
      appointment_date,
      time_slot,
      consultation_fee,
      status,
      created_at
    FROM clinic_appointments
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

module.exports = {
  createClinicAppointment,
  getMyClinicAppointments,
};