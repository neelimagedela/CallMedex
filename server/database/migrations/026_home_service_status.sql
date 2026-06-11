-- Add new statuses to home_service_bookings
ALTER TABLE home_service_bookings
MODIFY COLUMN status ENUM(
  'pending',
  'assigned',
  'accepted',
  'sample_collected',
  'submitted_to_lab',
  'sample_rejected',
  'processing',
  'report_ready',
  'completed',
  'cancelled'
) DEFAULT 'pending';

-- diagnostic_walkin_bookings already has sample_received, report_ready
-- no changes needed there

-- Create reports table
CREATE TABLE booking_reports (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_id   BIGINT NOT NULL,
  booking_type ENUM('home_service', 'walkin') NOT NULL,
  report_pdf   VARCHAR(500) NOT NULL,
  uploaded_by  BIGINT NOT NULL,
  uploaded_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);