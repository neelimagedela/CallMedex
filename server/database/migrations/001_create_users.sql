CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    phone VARCHAR(20) UNIQUE NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    role ENUM(
        'patient',
        'phlebo',
        'doctor',
        'admin',
        'diagnostic',
        'consultency'
    ) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);