ALTER TABLE pharmacy_orders
ADD COLUMN order_mode ENUM('online', 'offline')
DEFAULT 'online'
AFTER user_id;