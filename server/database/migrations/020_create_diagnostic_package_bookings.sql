CREATE TABLE diagnostic_package_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    receipt_id VARCHAR(50) UNIQUE,

    user_id BIGINT NOT NULL,
    
    package_name VARCHAR(255) NOT NULL,

    tests JSON NOT NULL,

    patient_name VARCHAR(255) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(20) NOT NULL,

    patient_mobile VARCHAR(20) NOT NULL,
    patient_email VARCHAR(255) NOT NULL,
    patient_address TEXT NOT NULL,

    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,

    fasting_required TINYINT(1) DEFAULT 0,

    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    discount_price DECIMAL(10,2) DEFAULT 0.00,

    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    booking_status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);