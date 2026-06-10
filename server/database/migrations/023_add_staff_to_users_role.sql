ALTER TABLE users
MODIFY COLUMN role ENUM(
  'patient',
  'doctor',
  'admin',
  'diagnostic',
  'consultancy',
  'pharmacy',
  'phlebo',
  'organization',
  'staff'
) NOT NULL DEFAULT 'patient';