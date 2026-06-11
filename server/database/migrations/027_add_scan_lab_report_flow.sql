ALTER TABLE appointments
MODIFY COLUMN status ENUM(
  'pending',
  'confirmed',
  'sample_received',
  'report_ready',
  'completed',
  'cancelled'
) DEFAULT 'pending';

CREATE TABLE IF NOT EXISTS booking_reports (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT NOT NULL,
  booking_type ENUM('home_service', 'walkin', 'scan') NOT NULL,
  report_pdf VARCHAR(500) NOT NULL,
  uploaded_by BIGINT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE booking_reports
MODIFY COLUMN booking_type ENUM(
  'home_service',
  'walkin',
  'scan'
) NOT NULL;