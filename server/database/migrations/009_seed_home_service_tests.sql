INSERT IGNORE INTO home_service_categories
(category_name, category_code, icon)
VALUES
('Blood Tests', 'blood_tests', '🩸'),
('Diabetes Tests', 'diabetes_tests', '🍬'),
('Thyroid Tests', 'thyroid_tests', '🦋'),
('Liver Function Tests', 'liver_function_tests', '🫀'),
('Kidney Function Tests', 'kidney_function_tests', '🫘'),
('Lipid Profile', 'lipid_profile', '🥼'),
('Heart & Cardiac Tests', 'heart_cardiac_tests', '❤️'),
('Infection & Fever Tests', 'infection_fever_tests', '🌡️'),
('Hormone Tests', 'hormone_tests', '⚖️'),
('Vitamin & Deficiency Tests', 'vitamin_deficiency_tests', '💊'),
('Coagulation Tests', 'coagulation_tests', '🩹'),
('Pregnancy & Fertility', 'pregnancy_fertility', '🤰'),
('Cancer Marker Tests', 'cancer_marker_tests', '🎗️'),
('Allergy & Autoimmune', 'allergy_autoimmune', '🛡️');

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'CBC', 'CBC', 'Complete Blood Count', 'Blood', '🧪', 350, 500,
JSON_ARRAY('RBC', 'WBC', 'Hemoglobin', 'Platelets'),
JSON_ARRAY('Blood sample required', 'No fasting required unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'ESR', 'ESR', 'Erythrocyte Sedimentation Rate', 'Blood', '🧫', 180, 250,
JSON_ARRAY('Inflammation marker'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'PERIPHERAL_SMEAR', 'Peripheral Smear', 'Blood Cell Morphology Test', 'Blood', '🔬', 250, 400,
JSON_ARRAY('RBC morphology', 'WBC morphology', 'Platelet check'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'BLOOD_GROUP_RH', 'Blood Grouping & RH Typing', 'ABO and Rh Factor Test', 'Blood', '🅰️', 150, 250,
JSON_ARRAY('ABO group', 'Rh factor'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'HEMOGLOBIN', 'Hemoglobin', 'Hb Test', 'Blood', '🩸', 120, 200,
JSON_ARRAY('Anemia screening'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'PCV', 'PCV', 'Packed Cell Volume', 'Blood', '🧬', 120, 200,
JSON_ARRAY('RBC volume check'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'blood_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'FBS', 'FBS', 'Fasting Blood Sugar', 'Blood', '🌅', 120, 200,
JSON_ARRAY('Fasting glucose'),
JSON_ARRAY('Fasting required for 8 hours', 'Water is allowed'),
TRUE, 8
FROM home_service_categories WHERE category_code = 'diabetes_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'PPBS', 'PPBS', 'Post Prandial Blood Sugar', 'Blood', '🍽️', 120, 200,
JSON_ARRAY('After food glucose'),
JSON_ARRAY('Sample usually taken 2 hours after food'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'diabetes_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'RBS', 'RBS', 'Random Blood Sugar', 'Blood', '⏱️', 120, 200,
JSON_ARRAY('Random glucose'),
JSON_ARRAY('No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'diabetes_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'HBA1C', 'HbA1c', 'Average 3 Month Sugar Test', 'Blood', '📊', 450, 700,
JSON_ARRAY('Diabetes monitoring', 'Average glucose'),
JSON_ARRAY('No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'diabetes_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'GTT', 'GTT', 'Glucose Tolerance Test', 'Blood', '🥤', 500, 750,
JSON_ARRAY('Glucose response'),
JSON_ARRAY('Fasting may be required', 'Follow lab instructions'),
TRUE, 8
FROM home_service_categories WHERE category_code = 'diabetes_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'T3', 'T3', 'Triiodothyronine', 'Blood', '🧪', 250, 400,
JSON_ARRAY('Thyroid hormone'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'thyroid_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'T4', 'T4', 'Thyroxine', 'Blood', '🧪', 250, 400,
JSON_ARRAY('Thyroid hormone'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'thyroid_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TSH', 'TSH', 'Thyroid Stimulating Hormone', 'Blood', '🧬', 300, 500,
JSON_ARRAY('Thyroid screening'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'thyroid_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'THYROID_PROFILE', 'Thyroid Profile', 'T3, T4, TSH', 'Blood', '📋', 600, 900,
JSON_ARRAY('T3', 'T4', 'TSH'),
JSON_ARRAY('Blood sample required', 'No fasting required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'thyroid_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'LFT', 'LFT', 'Liver Function Test', 'Blood', '🧫', 750, 1000,
JSON_ARRAY('Bilirubin', 'SGOT / AST', 'SGPT / ALT', 'Alkaline Phosphatase', 'Albumin', 'Total Protein'),
JSON_ARRAY('Blood sample required', 'Fasting may be advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'liver_function_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'KFT_RFT', 'KFT / RFT', 'Kidney / Renal Function Test', 'Blood', '💧', 700, 950,
JSON_ARRAY('Creatinine', 'Blood Urea', 'Uric Acid', 'Electrolytes'),
JSON_ARRAY('Blood sample required', 'Drink enough water'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'kidney_function_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'LIPID_PROFILE', 'Lipid Profile', 'Cholesterol Profile', 'Blood', '🥼', 800, 1100,
JSON_ARRAY('Total Cholesterol', 'HDL', 'LDL', 'Triglycerides', 'VLDL'),
JSON_ARRAY('Fasting may be required for 9-12 hours'),
TRUE, 9
FROM home_service_categories WHERE category_code = 'lipid_profile';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TROPONIN', 'Troponin', 'Cardiac Marker Test', 'Blood', '❤️', 600, 900,
JSON_ARRAY('Troponin I / T'),
JSON_ARRAY('Blood sample required', 'Doctor prescription may be required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'heart_cardiac_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'DENGUE', 'Dengue', 'Dengue Fever Test', 'Blood', '🦟', 600, 900,
JSON_ARRAY('Dengue screening'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'infection_fever_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'MALARIA', 'Malaria', 'Malaria Parasite Test', 'Blood', '🧫', 350, 500,
JSON_ARRAY('Malaria screening'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'infection_fever_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TYPHOID_WIDAL', 'Typhoid / Widal', 'Typhoid Fever Test', 'Blood', '🤒', 300, 500,
JSON_ARRAY('Widal test'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'infection_fever_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'CRP', 'CRP', 'C-Reactive Protein', 'Blood', '🔥', 450, 700,
JSON_ARRAY('Inflammation marker'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'infection_fever_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'VITAMIN_D', 'Vitamin D', 'Vitamin D Deficiency Test', 'Blood', '☀️', 900, 1300,
JSON_ARRAY('Vitamin D level'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'vitamin_deficiency_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'VITAMIN_B12', 'Vitamin B12', 'B12 Deficiency Test', 'Blood', '💊', 800, 1200,
JSON_ARRAY('B12 level'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'vitamin_deficiency_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'PT_INR', 'PT / INR', 'Prothrombin Time', 'Blood', '⏱️', 400, 650,
JSON_ARRAY('PT', 'INR'),
JSON_ARRAY('Blood sample required', 'Inform blood thinner medicine'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'coagulation_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'BETA_HCG', 'Beta hCG', 'Pregnancy Blood Test', 'Blood', '🤰', 500, 800,
JSON_ARRAY('Pregnancy marker'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'pregnancy_fertility';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'PSA', 'PSA', 'Prostate Specific Antigen', 'Blood', '🎗️', 900, 1300,
JSON_ARRAY('Prostate marker'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'cancer_marker_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'IGE', 'IgE', 'Allergy Marker Test', 'Blood', '🤧', 700, 1000,
JSON_ARRAY('Allergy marker'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'allergy_autoimmune';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'ANA', 'ANA', 'Antinuclear Antibody Test', 'Blood', '🛡️', 850, 1200,
JSON_ARRAY('Autoimmune screening'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'allergy_autoimmune';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'RA_FACTOR', 'RA Factor', 'Rheumatoid Arthritis Marker', 'Blood', '🦴', 450, 700,
JSON_ARRAY('RA marker'),
JSON_ARRAY('Blood sample required'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'allergy_autoimmune';