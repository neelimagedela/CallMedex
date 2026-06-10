ALTER TABLE users 
ADD COLUMN gender VARCHAR(20) NULL,
ADD COLUMN dob DATE NULL,
ADD COLUMN address VARCHAR(255) NULL,
ADD COLUMN city VARCHAR(100) NULL,
ADD COLUMN district VARCHAR(100) NULL,
ADD COLUMN state VARCHAR(100) NULL,
ADD COLUMN pincode VARCHAR(20) NULL,
ADD COLUMN country VARCHAR(100) NULL,
MODIFY COLUMN role ENUM(
    'patient',
    'phlebo',
    'doctor',
    'admin',
    'diagnostic',
    'consultancy',
    'pharmacy',
    'organization',
    'staff'
) NOT NULL;
