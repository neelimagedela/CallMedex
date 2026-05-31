ALTER TABLE pharmacy_orders
MODIFY COLUMN status ENUM(
  'pending',
  'confirmed',
  'packed',
  'out_for_delivery',
  'delivered',
  'completed',
  'cancelled'
) DEFAULT 'pending';