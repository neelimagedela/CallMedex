-- Always include ALL existing values + new ones. Never drop existing values.
ALTER TABLE home_service_bookings
MODIFY COLUMN status ENUM(
  'pending', 'assigned', 'accepted', 'sample_collected', 'submitted_to_lab',
  'sample_rejected', 'processing', 'received_by_lab', 'report_ready', 'completed', 'cancelled'
) NOT NULL DEFAULT 'pending';
