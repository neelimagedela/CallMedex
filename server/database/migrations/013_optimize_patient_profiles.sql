UPDATE patient_profiles
SET height = NULL
WHERE height = '';

UPDATE patient_profiles
SET weight = NULL
WHERE weight = '';

UPDATE patient_profiles
SET blood_group = NULL
WHERE blood_group = '';

ALTER TABLE patient_profiles
MODIFY COLUMN blood_group ENUM(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-'
) NULL;

ALTER TABLE patient_profiles
MODIFY COLUMN height DECIMAL(5,2) NULL;

ALTER TABLE patient_profiles
MODIFY COLUMN weight DECIMAL(5,2) NULL;

ALTER TABLE patient_profiles
MODIFY COLUMN other_condition TEXT NULL;