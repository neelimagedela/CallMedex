CREATE TABLE tele_consultation_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    receipt_id VARCHAR(50) UNIQUE NOT NULL,

    user_id BIGINT NOT NULL,

    patient_name VARCHAR(255) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(20) NOT NULL,

    patient_mobile VARCHAR(20) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,

    patient_address TEXT NOT NULL,

    specialization VARCHAR(100) NOT NULL,

    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,

    consultation_fee DECIMAL(10,2) DEFAULT 499.00,

    booking_status ENUM(
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);