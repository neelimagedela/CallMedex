CREATE TABLE IF NOT EXISTS password_reset_otps (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  email VARCHAR(150) NOT NULL,
  otp_hash VARCHAR(255) NOT NULL,

  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_password_reset_email (email),
  INDEX idx_password_reset_expires (expires_at)
);