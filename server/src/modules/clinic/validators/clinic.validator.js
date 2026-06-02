const validateClinicAppointment = (req, res, next) => {
  const {
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
  } = req.body;

  if (
    !patient_name ||
    !patient_age ||
    !patient_gender ||
    !patient_mobile ||
    !patient_email ||
    !patient_address ||
    !clinic_branch ||
    !appointment_date ||
    !time_slot ||
    !consultation_fee
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  next();
};

module.exports = {
  validateClinicAppointment,
};