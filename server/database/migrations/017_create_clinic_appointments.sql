CREATE TABLE IF NOT EXISTS clinic_appointments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  receipt_id VARCHAR(30) UNIQUE NULL,

  user_id BIGINT NULL,

  patient_name VARCHAR(150) NOT NULL,
  patient_age INT NOT NULL,
  patient_gender ENUM('male', 'female', 'other') NOT NULL,
  patient_mobile VARCHAR(20) NOT NULL,
  patient_email VARCHAR(100) NOT NULL,
  patient_address TEXT NOT NULL,

  clinic_branch ENUM('Akkayapalem', 'KGH', 'Madhurawada') NOT NULL,

  appointment_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,

  consultation_fee DECIMAL(10,2) NOT NULL DEFAULT 700.00,

  status ENUM('pending', 'confirmed', 'completed', 'cancelled')
  NOT NULL DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_clinic_appointments_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);