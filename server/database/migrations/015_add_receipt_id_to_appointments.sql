ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS receipt_id VARCHAR(30) UNIQUE NULL AFTER id;

UPDATE appointments
SET receipt_id = CONCAT('CMX', LPAD(id, 8, '0'))
WHERE receipt_id IS NULL;