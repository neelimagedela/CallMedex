ALTER TABLE users
ADD COLUMN branch VARCHAR(100);

ALTER TABLE users
ADD COLUMN approval_status ENUM(
'pending',
'approved',
'rejected'
) DEFAULT 'pending';

ALTER TABLE phlebo_profiles
ADD COLUMN organization_name VARCHAR(255);

ALTER TABLE staff_profiles
MODIFY medical_degree_upload TEXT;