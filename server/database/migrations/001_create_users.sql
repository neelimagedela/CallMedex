CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) UNIQUE NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'patient',
        'phlebo',
        'doctor',
        'admin',
        'diagnostic',
        'consultancy'
    ) NOT NULL,

    is_email_verified BOOLEAN DEFAULT FALSE,

    is_phone_verified BOOLEAN DEFAULT FALSE,
    public_user_id VARCHAR(50) UNIQUE NULL,
    registration_status ENUM(
        'PENDING_VERIFICATION',
        'VERIFIED',
        'PROFILE_COMPLETED'
        ) DEFAULT 'PENDING_VERIFICATION',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);