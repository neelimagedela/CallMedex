CREATE TABLE IF NOT EXISTS home_service_tests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    category_id BIGINT NOT NULL,

    test_code VARCHAR(100) NOT NULL UNIQUE,
    test_name VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255) NULL,

    sample_type VARCHAR(100) DEFAULT 'Blood',
    icon VARCHAR(20) NULL,

    price DECIMAL(10,2) DEFAULT 0.00,
    old_price DECIMAL(10,2) DEFAULT 0.00,

    features JSON NULL,
    instructions JSON NULL,

    is_home_collection_available BOOLEAN DEFAULT TRUE,
    is_prescription_required BOOLEAN DEFAULT FALSE,
    fasting_required BOOLEAN DEFAULT FALSE,
    fasting_hours INT DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_home_service_tests_category
        FOREIGN KEY (category_id)
        REFERENCES home_service_categories(id)
        ON DELETE CASCADE
);