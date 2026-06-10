ALTER TABLE diagnostic_walkin_bookings
MODIFY COLUMN status ENUM(
  'pending',
  'confirmed',
  'sample_received',
  'report_ready',
  'completed',
  'cancelled'
) DEFAULT 'pending';