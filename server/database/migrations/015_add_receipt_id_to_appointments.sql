ALTER TABLE appointments
ADD COLUMN receipt_id VARCHAR(30) UNIQUE NULL AFTER id;

UPDATE appointments
SET receipt_id = CONCAT('CMX', LPAD(id, 8, '0'))
WHERE receipt_id IS NULL;

ALTER TABLE appointments
MODIFY COLUMN receipt_id VARCHAR(30) UNIQUE NOT NULL;