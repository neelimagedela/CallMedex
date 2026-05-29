CREATE TABLE IF NOT EXISTS home_service_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    public_booking_id VARCHAR(50) UNIQUE NULL,

    user_id BIGINT NOT NULL,

    assigned_phlebo_id BIGINT NULL,

    patient_name VARCHAR(150) NOT NULL,
    patient_age INT NOT NULL,
    patient_sex VARCHAR(20) NOT NULL,
    patient_mobile VARCHAR(20) NOT NULL,
    patient_email VARCHAR(100) NOT NULL,
    patient_address TEXT NOT NULL,

    branch VARCHAR(100) NOT NULL,

    tests JSON NOT NULL,

    collection_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,

    prescription_path VARCHAR(255) NULL,

    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    status ENUM(
        'pending',
        'assigned',
        'accepted',
        'sample_collected',
        'submitted_to_lab',
        'completed',
        'cancelled'
    ) DEFAULT 'pending',

    phlebo_notes TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_home_service_bookings_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_home_service_bookings_phlebo
        FOREIGN KEY (assigned_phlebo_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);