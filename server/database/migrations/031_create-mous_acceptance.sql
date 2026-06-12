CREATE TABLE mou_acceptances (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,

    ip_address VARCHAR(50),

    accepted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);