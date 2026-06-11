CREATE TABLE IF NOT EXISTS mous (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    role ENUM(
        'doctor',
        'organization',
        'phlebo_fulltime',
        'phlebo_parttime',
        'staff',
        'pharmacy'
    ) NOT NULL,

    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,

    version VARCHAR(50) DEFAULT 'v1',

    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);