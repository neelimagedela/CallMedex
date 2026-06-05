ALTER TABLE home_service_bookings
ADD COLUMN patient_lat DECIMAL(10,8) NULL AFTER patient_address,
ADD COLUMN patient_lng DECIMAL(11,8) NULL AFTER patient_lat;

ALTER TABLE home_service_bookings
ADD COLUMN assigned_phlebo_id BIGINT NULL AFTER user_id,
ADD COLUMN accepted_at DATETIME NULL AFTER assigned_phlebo_id;

CREATE TABLE IF NOT EXISTS phlebo_live_locations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  phlebo_user_id BIGINT NOT NULL UNIQUE,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_phlebo_live_locations_user
    FOREIGN KEY (phlebo_user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);