-- 035_seed_home_service_accumax_tests_only.sql
-- ACCUMAX HOME: only home service tests with code, test name, and OP price.
-- No table structure / backend change. No health packages, treatments, profiles, or consultation charges are inserted.

START TRANSACTION;

DELETE FROM home_service_tests
WHERE category_id IN (
    SELECT id FROM home_service_categories
    WHERE category_code IN ('blood_tests', 'diabetes_tests', 'thyroid_tests', 'liver_function_tests', 'kidney_function_tests', 'lipid_profile', 'heart_cardiac_tests', 'infection_fever_tests', 'hormone_tests', 'vitamin_deficiency_tests', 'coagulation_tests', 'pregnancy_fertility', 'cancer_marker_tests', 'allergy_autoimmune', 'accumax_treatments', 'accumax_investigations', 'accumax_profiles', 'accumax_consultation_charges', 'accumax_health_packages', 'accumax_home_service_tests')
);

DELETE FROM home_service_categories
WHERE category_code IN ('blood_tests', 'diabetes_tests', 'thyroid_tests', 'liver_function_tests', 'kidney_function_tests', 'lipid_profile', 'heart_cardiac_tests', 'infection_fever_tests', 'hormone_tests', 'vitamin_deficiency_tests', 'coagulation_tests', 'pregnancy_fertility', 'cancer_marker_tests', 'allergy_autoimmune', 'accumax_treatments', 'accumax_investigations', 'accumax_profiles', 'accumax_consultation_charges', 'accumax_health_packages', 'accumax_home_service_tests');

INSERT IGNORE INTO home_service_categories
(category_name, category_code, icon)
VALUES
('ACCUMAX Home Service Tests', 'accumax_home_service_tests', '🧪');

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1352', 'synovial fluid analysis', 'ACCUMAX home service test', 'Sample', '🧪', 250.00, 250.00,
JSON_ARRAY('Code: TST_1352', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1336', 'SPUTUM FOR FUNGAL STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 780.00, 780.00,
JSON_ARRAY('Code: TST_1336', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1335', 'BLOOD CULTURE AND SENSITIVITY-LEFT(Anaerobic)', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1335', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1334', 'BLOOD CULTURE AND SENSITIVITY-RIGHT(Anaerobic)', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1334', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1333', '6 Drug Panel (Urine)', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1333', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1332', 'nasopharynx x ray lateral', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_1332', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1331', 'X-RAY FOOT AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_1331', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1330', 'X ray pelvic frog ap/lat', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1330', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1329', 'cortisol  (7 to 9 AM)', 'ACCUMAX home service test', 'Sample', '🧪', 800.00, 800.00,
JSON_ARRAY('Code: TST_1329', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1328', 'bacterial culture and sensitivity', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_1328', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1327', 'genexpert tb', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_1327', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1326', 'doppler arterial lower limb both', 'ACCUMAX home service test', 'Sample', '🧪', 3500.00, 3500.00,
JSON_ARRAY('Code: TST_1326', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1325', 'tracheostomy tube secretions AFB', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1325', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1324', 'Ascitic Fluid Analysis', 'ACCUMAX home service test', 'Sample', '🧪', 1800.00, 1800.00,
JSON_ARRAY('Code: TST_1324', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1323', 'anti musk antibody myasthenia gravis', 'ACCUMAX home service test', 'Sample', '🧪', 6260.00, 6260.00,
JSON_ARRAY('Code: TST_1323', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1322', 'achr acetylcholine receptor antibodies', 'ACCUMAX home service test', 'Sample', '🧪', 6000.00, 6000.00,
JSON_ARRAY('Code: TST_1322', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1321', 'URINE KETONE BODIES', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_1321', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1320', 'RA FACTOR immunoturbidimetry', 'ACCUMAX home service test', 'Sample', '🧪', 600.00, 600.00,
JSON_ARRAY('Code: TST_1320', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1319', 'Helicobacter Pylori Antigen - Qualitative', 'ACCUMAX home service test', 'Sample', '🧪', 1900.00, 1900.00,
JSON_ARRAY('Code: TST_1319', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1318', 'BOTH UPPER AND LOWER LIMBS ARTERIAL AND VENOUS DOPPLER', 'ACCUMAX home service test', 'Sample', '🧪', 16000.00, 16000.00,
JSON_ARRAY('Code: TST_1318', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1317', 'BOTH UPPER LIMBS VENOUS DOPPLER', 'ACCUMAX home service test', 'Sample', '🧪', 4000.00, 4000.00,
JSON_ARRAY('Code: TST_1317', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1316', 'BOTH UPPER LIMBS ARTERIAL DOPPLER', 'ACCUMAX home service test', 'Sample', '🧪', 4000.00, 4000.00,
JSON_ARRAY('Code: TST_1316', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1315', 'X RAY SHOULDER AP LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1315', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1314', 'X RAY ANKEL AP LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1314', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1313', 'TRACHEOSTOMY TUBE SECRETIONS CULTURE AND SENSITIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 600.00, 600.00,
JSON_ARRAY('Code: TST_1313', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1312', 'sputum for fat globules', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1312', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1311', 'urine  for fat globules', 'ACCUMAX home service test', 'Sample', '🧪', 350.00, 350.00,
JSON_ARRAY('Code: TST_1311', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1310', 'X-RAY THIGH / FEMUR AP/LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1310', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1309', 'bilirubin urine', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_1309', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1308', 'X-RAY FOREARM AP/LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1308', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1294', 'ULTRASOUND - ABDOMEN (FEMALE)', 'ACCUMAX home service test', 'Sample', '🧪', 1400.00, 1400.00,
JSON_ARRAY('Code: TST_1294', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1293', 'ET SECTION GRAM STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 500.00, 500.00,
JSON_ARRAY('Code: TST_1293', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1292', 'GRBS', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_1292', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1291', 'CB NAT SPUTUM', 'ACCUMAX home service test', 'Sample', '🧪', 3500.00, 3500.00,
JSON_ARRAY('Code: TST_1291', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1290', 'BLOOD CULTURE AND SENSITIVITY-RIGHT(Aerobic)', 'ACCUMAX home service test', 'Sample', '🧪', 1944.00, 1944.00,
JSON_ARRAY('Code: TST_1290', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1288', 'MRI PNS WITH ORBIT', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_1288', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1284', 'PRICE ADJUSTMENT', 'ACCUMAX home service test', 'Sample', '🧪', 1000.00, 1000.00,
JSON_ARRAY('Code: TST_1284', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1283', 'FUNGAL STAIN CSF', 'ACCUMAX home service test', 'Sample', '🧪', 500.00, 500.00,
JSON_ARRAY('Code: TST_1283', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1282', 'AFB STAIN CSF', 'ACCUMAX home service test', 'Sample', '🧪', 500.00, 500.00,
JSON_ARRAY('Code: TST_1282', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1281', 'ANTI NUCLEAR ANTIBODY PROFILE (ANA PROFILE)', 'ACCUMAX home service test', 'Sample', '🧪', 3500.00, 3500.00,
JSON_ARRAY('Code: TST_1281', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1280', 'Hepatitis C Virus(HCV Antibody) (CLIA)', 'ACCUMAX home service test', 'Sample', '🧪', 1200.00, 1200.00,
JSON_ARRAY('Code: TST_1280', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1279', 'HIV 1 and 2 Ag/Ab (4th generation) (CMIA)', 'ACCUMAX home service test', 'Sample', '🧪', 1000.00, 1000.00,
JSON_ARRAY('Code: TST_1279', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1278', 'Hepatiti B Surface Antigen (CMIA)', 'ACCUMAX home service test', 'Sample', '🧪', 1000.00, 1000.00,
JSON_ARRAY('Code: TST_1278', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1277', 'MEDICAL EXAMINATION REPORT', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_1277', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1112', 'COMPLETE URINE EXAMINATION', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_1112', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1', 'URINE SUGAR', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_1', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_2', 'TGL / HDL RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_2', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_3', 'X-RAY - FOOT AP OBLIQUE VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_3', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_4', 'X-RAY - HAND AP OBLIQUE', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_4', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_5', 'X-RAY - BOTH HIP AP', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_5', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_6', 'ULTRASOUND - ABDOMEN (MALE)', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_6', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_7', 'URINE CREATININE -  SPOT', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_7', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_8', 'ULTRASOUND - CHEST', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_8', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_9', 'VDRL', 'ACCUMAX home service test', 'Sample', '🧪', 240.00, 240.00,
JSON_ARRAY('Code: TST_9', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_10', 'WESTERN BLOT FOR HIV-I & II', 'ACCUMAX home service test', 'Sample', '🧪', 4070.00, 4070.00,
JSON_ARRAY('Code: TST_10', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_11', 'STOOL EXAMINATION, OCCULT BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_11', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_12', 'X-RAY - TM JOINT LAT VIEW(OPEN', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_12', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_13', 'STOOL EXAMINATION, pH REDUCING SUBSTANCES', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_13', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_14', 'TOXOPLASMA - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_14', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_15', 'SMEAR FOR MP', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_15', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_16', 'UROPORPHYRIN', 'ACCUMAX home service test', 'Sample', '🧪', 273.90, 273.90,
JSON_ARRAY('Code: TST_16', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_17', 'TRIGLYCERIDES', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_17', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_18', 'URINE PROTEIN CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 440.00, 440.00,
JSON_ARRAY('Code: TST_18', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_19', 'LIPASE - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 605.00, 605.00,
JSON_ARRAY('Code: TST_19', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_20', 'ZINC, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2827.00, 2827.00,
JSON_ARRAY('Code: TST_20', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_21', 'TOTAL WBC COUNT - TC', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_21', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_22', 'SICKLING, SCREENING TEST', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_22', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_23', 'TB - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_23', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_24', 'TACROLIMUS', 'ACCUMAX home service test', 'Sample', '🧪', 4398.90, 4398.90,
JSON_ARRAY('Code: TST_24', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_25', 'URINE SUGAR - PP', 'ACCUMAX home service test', 'Sample', '🧪', 1000.00, 1000.00,
JSON_ARRAY('Code: TST_25', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_26', 'X-RAY - LUMBOSACRAL SPINE AP/LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_26', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_27', 'PROTEIN C ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_27', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_28', 'X-RAY - PELVIS WITH BOTH HIPS AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_28', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_29', 'VITAMIN B1  (THIAMINE PYROPHOSPHATE)', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_29', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_30', 'SEROTONIN (5-HT), SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 6732.00, 6732.00,
JSON_ARRAY('Code: TST_30', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_31', 'X-RAY - ANKLE OBLIQUE', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_31', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_32', 'SEPSIS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 4838.90, 4838.90,
JSON_ARRAY('Code: TST_32', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_33', 'TOTAL ACID PHOSPHATASE', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_33', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_34', 'URINE COTININE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_34', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_35', 'PROTEIN S', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_35', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_36', 'RHEUMATOID FACTOR (RA), SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 528.00, 528.00,
JSON_ARRAY('Code: TST_36', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_37', 'TESTOSTERONE TOTAL,', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_37', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_38', 'X-RAY - CEPHELOGRAM', 'ACCUMAX home service test', 'Sample', '🧪', 2500.00, 2500.00,
JSON_ARRAY('Code: TST_38', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_39', 'PROTEINS CSF TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_39', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_40', 'OSMOLAL GAP, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 902.00, 902.00,
JSON_ARRAY('Code: TST_40', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_41', 'SUGAR - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 200.00, 200.00,
JSON_ARRAY('Code: TST_41', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_42', 'UREA', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_42', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_43', 'STEROID PANEL FOR PCOS / CAH DIFFERENTIATION', 'ACCUMAX home service test', 'Sample', '🧪', 3518.90, 3518.90,
JSON_ARRAY('Code: TST_43', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_44', 'RUBELLA - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_44', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_45', 'OSTEOCALCIN', 'ACCUMAX home service test', 'Sample', '🧪', 3190.00, 3190.00,
JSON_ARRAY('Code: TST_45', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_46', 'UREA, FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 440.00, 440.00,
JSON_ARRAY('Code: TST_46', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_47', 'SEX HORMONE BINDING GLOBULIN - SHBG', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_47', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_48', 'MRI - SHOULDER WITH CERVICAL SPINE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_48', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_49', 'STEROID PANEL 3,15 STEROIDS', 'ACCUMAX home service test', 'Sample', '🧪', 4730.00, 4730.00,
JSON_ARRAY('Code: TST_49', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_50', 'PRE-ECLAMPSIA SCREENING PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_50', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_51', 'SARS-COV-2 (COVID-19) IGG ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_51', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_52', 'SJOGRENS SYNDROME ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 22550.00, 22550.00,
JSON_ARRAY('Code: TST_52', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_53', 'VITAMIN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_53', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_54', 'VON WILLEBRAND DISEASE PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 22550.00, 22550.00,
JSON_ARRAY('Code: TST_54', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_55', 'NATURAL KILLER CELLS', 'ACCUMAX home service test', 'Sample', '🧪', 4620.00, 4620.00,
JSON_ARRAY('Code: TST_55', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_56', 'OSMOTIC FRAGILITY OF ERYTHROCYTES', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_56', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_57', 'HOMOCYSTEINE, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_57', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_58', 'NICOTINE SCREEN, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_58', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_59', 'VITAMIN B12', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_59', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_60', 'HHH SYNDROME HYPERORNITHINEMIA - HYPERAMMONEMIA - HOMOCITRULLINURIA SYNDROME (LC-MS/MS, GC-MS', 'ACCUMAX home service test', 'Sample', '🧪', 8360.00, 8360.00,
JSON_ARRAY('Code: TST_60', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_61', 'RED CELL DISTRIBUTION WITH SD', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_61', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_62', 'PROTEIN S FUNCTIONAL,ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 4070.00, 4070.00,
JSON_ARRAY('Code: TST_62', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_63', 'OSTEOPOROSIS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 2308.90, 2308.90,
JSON_ARRAY('Code: TST_63', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_64', 'TOXIC ELEMENTS', 'ACCUMAX home service test', 'Sample', '🧪', 2418.90, 2418.90,
JSON_ARRAY('Code: TST_64', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_65', 'X-RAY - SHOULDER LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_65', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_66', 'SGOT - AST', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_66', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_67', 'RENIN ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 5830.00, 5830.00,
JSON_ARRAY('Code: TST_67', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_68', 'METANEPHRINES, FRACTIONATED - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6820.00, 6820.00,
JSON_ARRAY('Code: TST_68', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_69', 'PARTIAL THROMBOPLASTIN TIME, ACTIVATED,PTT,APTT', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_69', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_70', 'SALMONELLA TYPHI AND PARATYPHI A ANTIGEN DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_70', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_71', 'PAP SMEAR', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_71', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_72', 'TYPHI DOT/ SALMONELLA TYPHI IgM', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_72', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_73', 'HAEMOGLOBIN A1C', 'ACCUMAX home service test', 'Sample', '🧪', 600.00, 600.00,
JSON_ARRAY('Code: TST_73', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_74', 'IRON SATURATION INDEX', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_74', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_75', 'URINE ACETONE', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_75', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_76', 'X-RAY - KUB', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_76', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_77', 'FIBRINOGEN DEGRADATION PRODUCT - FDP', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_77', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_78', 'HEPATITIS A ANTIBODY (ANTI HAV),IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_78', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_79', 'SEROTONIN, 24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6754.00, 6754.00,
JSON_ARRAY('Code: TST_79', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_80', 'UROBILINOGEN, QUALITATIVE, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 420.00, 420.00,
JSON_ARRAY('Code: TST_80', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_81', 'MTB PCR', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_81', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_82', 'X-RAY - WRIST AP', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_82', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_83', 'HELICOBACTER PYLORI, ANTIBODIES PANEL, IgG and IgA', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_83', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_84', 'URINE FOR EOSINOPHILS', 'ACCUMAX home service test', 'Sample', '🧪', 479.50, 479.50,
JSON_ARRAY('Code: TST_84', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_85', 'GANGLIOSIDE ANTIBODY PROFILE IgG SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 8250.00, 8250.00,
JSON_ARRAY('Code: TST_85', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_86', 'PHENYTOIN - EPTOIN', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_86', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_87', 'NEUROBLASTOMA PROFILE, 24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_87', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_88', 'VITAMIN E', 'ACCUMAX home service test', 'Sample', '🧪', 5049.00, 5049.00,
JSON_ARRAY('Code: TST_88', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_89', 'IRON', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_89', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_90', 'GAMMA GT', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_90', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_91', 'URINE CALCIUM - SPOT', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_91', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_92', 'WIEL FELIX TEST', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_92', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_93', 'PACKED CELL VOLUME - PCV', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_93', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_94', 'PHOSPHOLIPASE A2 RECEPTOR ANTIBODY (PLA2R) QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_94', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_95', 'MRI - FINGER / TOES / EXTRIMITIES', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_95', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_96', 'MRI - HIP WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_96', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_97', 'X-RAY - CERVICAL SPINE AP / LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2500.00, 2500.00,
JSON_ARRAY('Code: TST_97', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_98', 'GLUCOSE-KETONE INDEX - GKI', 'ACCUMAX home service test', 'Sample', '🧪', 13145.00, 13145.00,
JSON_ARRAY('Code: TST_98', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_99', 'LIPASE - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_99', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_100', 'VISCOSITY', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_100', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_101', 'X-RAY - ELBOW LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_101', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_102', 'WIDAL - SLIDE AGGLUTINATION', 'ACCUMAX home service test', 'Sample', '🧪', 250.00, 250.00,
JSON_ARRAY('Code: TST_102', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_103', 'ULTRASOUND - ABDOMEN WITH PELVIS', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_103', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_104', 'PYRUVIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_104', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_105', 'TMT', 'ACCUMAX home service test', 'Sample', '🧪', 1750.00, 1750.00,
JSON_ARRAY('Code: TST_105', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_106', 'MRI - LEFT FOOT', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_106', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_107', 'HERPES SIMPLEX VIRUS (HSV) 2 IgG', 'ACCUMAX home service test', 'Sample', '🧪', 5049.00, 5049.00,
JSON_ARRAY('Code: TST_107', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_108', 'MRI -  BRAIN WITH EPILEPSY PROTOCOL', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_108', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_109', 'TOTAL RBC COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_109', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_110', 'X-RAY - LS SPINE AP/lAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_110', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_111', 'DOPAMINE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_111', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_112', 'PROTEIN - CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 480.00, 480.00,
JSON_ARRAY('Code: TST_112', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_113', 'X-RAY - DORSAL SPINE AP / LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2500.00, 2500.00,
JSON_ARRAY('Code: TST_113', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_114', 'ALBUMIN - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_114', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_115', 'MRI - BRAIN WITH ORBIT', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_115', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_116', 'VANCOMYCIN RESISTANT ENTEROCOCCI (VRE) , SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 7854.00, 7854.00,
JSON_ARRAY('Code: TST_116', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_117', 'MRI - ABDOMEN WITH PELVIS', 'ACCUMAX home service test', 'Sample', '🧪', 15400.00, 15400.00,
JSON_ARRAY('Code: TST_117', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_118', 'SMEAR FOR MF', 'ACCUMAX home service test', 'Sample', '🧪', 279.00, 279.00,
JSON_ARRAY('Code: TST_118', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_119', 'PIIINP (PROCOLLAGEN TYPE III AMINO TERMINAL PROPEPTIDE', 'ACCUMAX home service test', 'Sample', '🧪', 4730.00, 4730.00,
JSON_ARRAY('Code: TST_119', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_120', 'NON HDL CHOLESTEROL', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_120', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_121', 'GRAM STAIN - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_121', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_122', 'X-RAY - RIGHT HEEL', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_122', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_123', 'FOLIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_123', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_124', 'MRI - STERNOCLAVICULAR JOINT / STERNUM', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_124', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_125', 'PHOSPHOLIPID ANTIBODIES PANEL, IgG ANDIgM', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_125', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_126', 'QUANTIFERON - TB GOLD', 'ACCUMAX home service test', 'Sample', '🧪', 3190.00, 3190.00,
JSON_ARRAY('Code: TST_126', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_127', 'ULTRASONOUND - BREAST', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_127', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_128', 'Truenat COVID-19 RNA Semi Quantitative real time PCR', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_128', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_129', 'THYROID STIMULATING HORMONE - TSH', 'ACCUMAX home service test', 'Sample', '🧪', 295.00, 295.00,
JSON_ARRAY('Code: TST_129', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_130', 'MRI - BRAIN WITH PNS SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8250.00, 8250.00,
JSON_ARRAY('Code: TST_130', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_131', 'SARS-COV-2 (COVID-19) NEUTRALIZING ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_131', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_132', 'PLATELET FUNCTION ANALYSIS (PFA-100)', 'ACCUMAX home service test', 'Sample', '🧪', 195.00, 195.00,
JSON_ARRAY('Code: TST_132', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_133', 'VITAMIN D3 1,25-DIHYDROXYVITAMIN', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_133', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_134', 'MRI - SHOULDER WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_134', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_135', 'PREALBUMIN - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 4510.00, 4510.00,
JSON_ARRAY('Code: TST_135', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_136', 'MRI - WHOLE SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_136', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_137', 'SPECIFIC GRAVITY', 'ACCUMAX home service test', 'Sample', '🧪', 190.00, 190.00,
JSON_ARRAY('Code: TST_137', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_138', 'X-RAY - C SPINE LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1800.00, 1800.00,
JSON_ARRAY('Code: TST_138', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_139', 'SLE (SYSTEMIC LUPUS ERYTHEMATOSUS) PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 485.00, 485.00,
JSON_ARRAY('Code: TST_139', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_140', 'ULTRASONOGRAM - NECK', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_140', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_141', 'MRI - KNEE SINGLE JOINT WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_141', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_142', 'IMMATURE PLATELET FRACTION', 'ACCUMAX home service test', 'Sample', '🧪', 792.00, 792.00,
JSON_ARRAY('Code: TST_142', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_143', 'NICKEL, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_143', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_144', 'TYPHIDOT IgG  IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_144', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_145', 'SODIUM OSMOLALITY RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_145', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_146', 'CULTURE AND SENSITIVITY- VAGINAL SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_146', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_147', 'SEMEN ANALYSIS', 'ACCUMAX home service test', 'Sample', '🧪', 1200.00, 1200.00,
JSON_ARRAY('Code: TST_147', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_148', 'THROMBOTIC RISK SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_148', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_149', 'UROBILONOGEN', 'ACCUMAX home service test', 'Sample', '🧪', 365.00, 365.00,
JSON_ARRAY('Code: TST_149', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_150', 'X-RAY - CHEST PA VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_150', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_151', 'ULTRASONOUND - OBSTETRICS / ANTENATAL', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_151', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_152', 'GLUCOSE-6 PHOSPHATE DEHYDROGENASE', 'ACCUMAX home service test', 'Sample', '🧪', 935.00, 935.00,
JSON_ARRAY('Code: TST_152', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_153', 'SERUM FOLATE', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_153', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_154', 'GROWTH HORMONE', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_154', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_155', 'APOLIPOPROTEIN - A1', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_155', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_156', 'CYFRA 21-1 LUNG CANCER MARKER', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_156', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_157', 'METANEPHRINES, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_157', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_158', 'ULTRASOUND - GUIDED FNAC', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_158', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_159', 'HEPATITIS B CORE ANTIBODY (Anti-HBc), IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_159', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_160', 'MRI - BOTH SHOULDER', 'ACCUMAX home service test', 'Sample', '🧪', 7700.00, 7700.00,
JSON_ARRAY('Code: TST_160', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_161', 'BILIRUBIN DIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_161', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_162', 'MRI - ANGIOGRAPHY', 'ACCUMAX home service test', 'Sample', '🧪', 8882.50, 8882.50,
JSON_ARRAY('Code: TST_162', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_163', 'MRI - BOTH LEG', 'ACCUMAX home service test', 'Sample', '🧪', 9900.00, 9900.00,
JSON_ARRAY('Code: TST_163', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_164', 'PROSTATE SPECIFIC ANTIGEN - PSA', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_164', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_165', 'SGPT - ALT', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_165', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_166', 'URIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_166', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_167', 'PULMONARY FUNCTION TEST - PFT', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_167', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_168', 'CD4 T-LYMPHOCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 1417.90, 1417.90,
JSON_ARRAY('Code: TST_168', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_169', 'MRI - RIGHT HIP JOINT', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_169', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_170', 'MUMPS - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_170', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_171', 'CULTURE AND SENSITIVITY - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_171', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_172', 'PROTEIN - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 430.00, 430.00,
JSON_ARRAY('Code: TST_172', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_173', 'SELENIUM, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_173', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_174', 'MRI - ELBOW (RIGHT / LEFT)', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_174', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_175', 'MRI - EXTREMITIES WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_175', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_176', 'NRAS MUTATION, CODON 12, 13 , 6', 'ACCUMAX home service test', 'Sample', '🧪', 7370.00, 7370.00,
JSON_ARRAY('Code: TST_176', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_177', 'METANEPHRINE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3630.00, 3630.00,
JSON_ARRAY('Code: TST_177', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_178', 'UREA - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 440.00, 440.00,
JSON_ARRAY('Code: TST_178', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_179', 'ROTAVIRUS ANTIGEN, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_179', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_180', 'PROCALCITONIN', 'ACCUMAX home service test', 'Sample', '🧪', 3806.00, 3806.00,
JSON_ARRAY('Code: TST_180', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_181', 'PHOSPHOROUS', 'ACCUMAX home service test', 'Sample', '🧪', 465.00, 465.00,
JSON_ARRAY('Code: TST_181', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_182', 'DENGUE - IgG - RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_182', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_183', 'AMINO ACIDS - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_183', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_184', 'SMEAR FOR GONOCOCCI', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_184', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_185', 'NMDA RECEPTOR / ANTI-GLUTAMATE ANTIBODY, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 8360.00, 8360.00,
JSON_ARRAY('Code: TST_185', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_186', 'MRI - LEFT SHOULDER WIHTOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_186', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_187', 'STEROID PANEL L 2,9 STEROIDS', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_187', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_188', 'MRI - LUMBAR SPINE WITH KNEE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_188', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_189', 'URINE PROTEIN - SPOT', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_189', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_190', 'MRI - LEFT KNEE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_190', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_191', 'RED CELL MASS - RCM', 'ACCUMAX home service test', 'Sample', '🧪', 907.50, 907.50,
JSON_ARRAY('Code: TST_191', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_192', 'TISSUE TRANSGLUTAMINASE ANTIBODY IgG', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_192', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_193', 'X-RAY - ABDOMEN', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_193', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_194', 'RED CELL DISTRIBUTION WITH CV', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_194', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_195', 'X-RAY - FOOT AP / LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_195', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_196', 'TB - IgA', 'ACCUMAX home service test', 'Sample', '🧪', 893.00, 893.00,
JSON_ARRAY('Code: TST_196', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_197', 'ADENOSINE DEAMINASE - CSF (ADA)', 'ACCUMAX home service test', 'Sample', '🧪', 1061.50, 1061.50,
JSON_ARRAY('Code: TST_197', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_198', 'SICKLE CELL ANEMIA MUTATION DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 375.00, 375.00,
JSON_ARRAY('Code: TST_198', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_199', 'PLATELET DISTRIBUTION WIDTH - SD', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_199', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_200', 'MRI - PNS', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_200', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_201', 'OLIGOCLONAL BANDS IgG, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_201', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_202', 'ONCOPRO EGFR ARMS PCR', 'ACCUMAX home service test', 'Sample', '🧪', 8360.00, 8360.00,
JSON_ARRAY('Code: TST_202', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_203', 'HEPATITIS B IMMUNITY SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_203', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_204', 'TESTOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 860.00, 860.00,
JSON_ARRAY('Code: TST_204', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_205', 'ULTRASOUND - KUB', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_205', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_206', 'ANTI CARDIOLIPIN ANTIBODY - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1375.00, 1375.00,
JSON_ARRAY('Code: TST_206', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_207', 'AMYLASE - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_207', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_208', 'MRI - THIGH / FEMUR (RIGHT / LEFT )', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_208', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_209', 'X-RAY - LEG AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_209', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_210', 'PREGNANETRIOL', 'ACCUMAX home service test', 'Sample', '🧪', 737.00, 737.00,
JSON_ARRAY('Code: TST_210', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_211', 'X-RAY - NECK AP LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_211', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_212', 'X-RAY - OPG', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_212', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_213', 'STEROID PANEL 2, 8 STEROIDS', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_213', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_214', 'X-RAY - CHEST AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_214', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_215', 'PORPHOBILINOGEN (PBG), QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_215', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_216', 'PARTIAL THROMBOPLASTIN TIME-LUPUS ANTICOAGULANT SPECIFIC (PTT-LA)', 'ACCUMAX home service test', 'Sample', '🧪', 3421.00, 3421.00,
JSON_ARRAY('Code: TST_216', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_217', 'ASCA (ANTI SACCHAROMYCES CEREVISIAE) ANTIBODY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_217', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_218', 'PARATHYROID HORMONE - PTH', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_218', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_219', 'SSB/La ANTIBODY SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2079.00, 2079.00,
JSON_ARRAY('Code: TST_219', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_220', 'ARSENIC 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_220', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_221', 'PARVOVIRUS B19, QUALITATIVE PCR', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_221', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_222', 'BETA CELL FUNCTION', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_222', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_223', 'STRIATED / SKELETAL MUSCLE ANTIBODY, IFA IN DILUTIONS', 'ACCUMAX home service test', 'Sample', '🧪', 4180.00, 4180.00,
JSON_ARRAY('Code: TST_223', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_224', 'X-RAY - BOTH KNEE AP', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_224', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_225', 'SODIUM RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_225', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_226', 'Anti Microsomal Antibody(Anti Thyroperoxidase antibody)AMA', 'ACCUMAX home service test', 'Sample', '🧪', 2475.00, 2475.00,
JSON_ARRAY('Code: TST_226', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_227', 'TISSUE TRANSGLUTAMINASE ANTIBODY IgA', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_227', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_228', 'WIDAL - TUBE AGGLUTINATION', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_228', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_229', 'REVERSE T3 - rRT3', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_229', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_230', 'HOMA IR Insulin Resistance Index', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_230', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_231', 'PROSTATIC ACID PHOSPHATASE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_231', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_232', 'STOOL ROUTINE', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_232', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_233', 'X-RAY - BOTH KNEE AP/LAT', 'ACCUMAX home service test', 'Sample', '🧪', 3200.00, 3200.00,
JSON_ARRAY('Code: TST_233', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_234', 'TROPONIN T LEVEL', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_234', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_235', 'CHIMERISM SPLIT CELL ANALYSIS - MYELOID CELL (CD15)', 'ACCUMAX home service test', 'Sample', '🧪', 12540.00, 12540.00,
JSON_ARRAY('Code: TST_235', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_236', 'TRIPLE MARKER - SECOND TRIMESTER TEST', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_236', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_237', 'THYROID STIMULATING IMMUNOGLOBULIN - TSI', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_237', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_238', 'INHIBIN A', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_238', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_239', 'X-RAY - DORSAL SPINE LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_239', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_240', 'TOTAL CHOLESTEROL', 'ACCUMAX home service test', 'Sample', '🧪', 195.00, 195.00,
JSON_ARRAY('Code: TST_240', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_241', 'MALARIAL  PARASITE - MP BY CARD', 'ACCUMAX home service test', 'Sample', '🧪', 280.00, 280.00,
JSON_ARRAY('Code: TST_241', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_242', 'X-RAY - PELVIS LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_242', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_243', 'X-RAY - SHOULDER AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_243', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_244', 'ECHINOCOCCUS DETECTION FOR SCOLICES IN HYDATID CYST FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 715.00, 715.00,
JSON_ARRAY('Code: TST_244', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_245', 'CHOLINESTERASE', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_245', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_246', '2D ECHOCARDIOGRAM', 'ACCUMAX home service test', 'Sample', '🧪', 1750.00, 1750.00,
JSON_ARRAY('Code: TST_246', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_247', 'CRYSTALS - SYNOVIAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_247', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_248', 'FECAL pH', 'ACCUMAX home service test', 'Sample', '🧪', 350.00, 350.00,
JSON_ARRAY('Code: TST_248', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_249', 'CT - PULMONARY ANGIO WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_249', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_250', 'ZINC', 'ACCUMAX home service test', 'Sample', '🧪', 3630.00, 3630.00,
JSON_ARRAY('Code: TST_250', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_251', 'FEBRILE AGGLUTININS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_251', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_252', 'HEPATITIS E ANTIBODY ( Anti-HEV), IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_252', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_253', 'CULTURE,AEROBIC,BRONCHOALVEOLAR LAVAGE(BAL)', 'ACCUMAX home service test', 'Sample', '🧪', 1188.00, 1188.00,
JSON_ARRAY('Code: TST_253', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_254', 'CT - TEMPORAL BONE', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_254', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_255', 'CT - PARA NASAL SINUSES WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_255', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_256', 'CYTOMEGALOVIRUS (CMV) AVIDITY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_256', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_257', 'GRAMSTAIN - SPUTUM', 'ACCUMAX home service test', 'Sample', '🧪', 375.00, 375.00,
JSON_ARRAY('Code: TST_257', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_258', 'HEPATITIS E ANTIBODY (Anti-HEV), IGM', 'ACCUMAX home service test', 'Sample', '🧪', 1870.00, 1870.00,
JSON_ARRAY('Code: TST_258', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_259', 'FREE THYROXINE INDEX - FTI', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_259', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_260', 'D-DIMER', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_260', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_261', 'BIOPSY, EXTERA LARGE SPECIMEN', 'ACCUMAX home service test', 'Sample', '🧪', 1870.00, 1870.00,
JSON_ARRAY('Code: TST_261', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_262', 'IMMUNOHISTOCHEMISTRY - IHC', 'ACCUMAX home service test', 'Sample', '🧪', 8976.00, 8976.00,
JSON_ARRAY('Code: TST_262', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_263', 'HB ELECTROPHORESIS', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_263', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_264', 'HCV GENOTYPING', 'ACCUMAX home service test', 'Sample', '🧪', 8976.00, 8976.00,
JSON_ARRAY('Code: TST_264', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_265', 'FERRITIN', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_265', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_266', 'CULTURE, AEROBIC, MISCELLANEOUS WITH GRAM STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_266', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_267', 'HEMOGLOBIN, FREE', 'ACCUMAX home service test', 'Sample', '🧪', 286.00, 286.00,
JSON_ARRAY('Code: TST_267', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_268', 'MRI - MR ANGIOGRAPHY', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_268', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_269', 'IODINE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_269', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_270', 'HCV RNA QUANTIFICATION', 'ACCUMAX home service test', 'Sample', '🧪', 6160.00, 6160.00,
JSON_ARRAY('Code: TST_270', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_271', 'LUPUS ANTICOAGULANT', 'ACCUMAX home service test', 'Sample', '🧪', 3597.00, 3597.00,
JSON_ARRAY('Code: TST_271', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_272', 'DIFFERENTIAL COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_272', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_273', 'NEUTROPHIL GELATINASE ASSOCIATED LIPOCALIN - NGAL', 'ACCUMAX home service test', 'Sample', '🧪', 2585.00, 2585.00,
JSON_ARRAY('Code: TST_273', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_274', 'LEPTIN', 'ACCUMAX home service test', 'Sample', '🧪', 6732.00, 6732.00,
JSON_ARRAY('Code: TST_274', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_275', 'HLA MIXED ANTIBODY SCREEN - PRA CLASS I, II AND MICA', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_275', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_276', 'NOCARDIA STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 286.00, 286.00,
JSON_ARRAY('Code: TST_276', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_277', 'HSV  I - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_277', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_278', 'MICRO ALBUMIN CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 682.00, 682.00,
JSON_ARRAY('Code: TST_278', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_279', 'HCG BETA TOTAL QUANTITATIVE, RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_279', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_280', 'HERPES SIMPLEX VIRUS 1&2 - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_280', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_281', 'X-RAY - CHEST LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_281', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_282', 'PROLACTIN', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_282', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_283', 'ULTRASONOGRAM - THYROID', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_283', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_284', 'LDL / HDL RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_284', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_285', 'MRI - BRAIN', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_285', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_286', 'p-ANCA ANTI MYELOPEROXIDASE (MPO) ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 2585.00, 2585.00,
JSON_ARRAY('Code: TST_286', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_287', 'MALARIAL  PARASITE - MP BY QBC', 'ACCUMAX home service test', 'Sample', '🧪', 280.00, 280.00,
JSON_ARRAY('Code: TST_287', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_288', 'EPINEPHRINE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_288', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_289', 'LACTATE, ARTERIAL', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_289', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_290', 'MRI - RIGHT WRIST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_290', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_291', 'HERPES SIMPLEX VIRUS (HSV) 1 2 IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_291', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_292', 'MRI - DORSAL/DORSO LUMBAR SPINE WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_292', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_293', 'PROTEIN C', 'ACCUMAX home service test', 'Sample', '🧪', 3549.00, 3549.00,
JSON_ARRAY('Code: TST_293', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_294', 'LDH - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_294', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_295', 'MEAN CORPUSCULAR HAEMOGLOBIN CONCENTRATION - MCHC', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_295', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_296', 'T AND B CELL FLOW CYTOMETRY CROSS MATCH (FCXM)', 'ACCUMAX home service test', 'Sample', '🧪', 4510.00, 4510.00,
JSON_ARRAY('Code: TST_296', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_297', 'MRI - TM JOINT ( TEMPOROMANDIBULAR JOINT)', 'ACCUMAX home service test', 'Sample', '🧪', 8250.00, 8250.00,
JSON_ARRAY('Code: TST_297', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_298', 'GALACTOSEMIA SCREENING, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 15400.00, 15400.00,
JSON_ARRAY('Code: TST_298', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_299', 'ELECTROLYTES, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_299', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_300', 'PROTEIN CATABOLIC RATE', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_300', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_301', 'MAGNESIUM', 'ACCUMAX home service test', 'Sample', '🧪', 671.00, 671.00,
JSON_ARRAY('Code: TST_301', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_302', 'HERPES SIMPLEX VIRUS (HSV) 1 IgG', 'ACCUMAX home service test', 'Sample', '🧪', 671.00, 671.00,
JSON_ARRAY('Code: TST_302', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_303', 'HEPATIC COPPER', 'ACCUMAX home service test', 'Sample', '🧪', 2024.00, 2024.00,
JSON_ARRAY('Code: TST_303', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_304', 'PLACENTAL GROWTH FACTOR (PlGF)', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_304', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_305', 'QUINIDINE', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_305', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_306', 'MRI - FORE ARM (RIGHT / LEFT)', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_306', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_307', 'STREPTOCOCCUS GROUP B ANTIGEN DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_307', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_308', 'MRI - SHOULDER WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_308', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_309', 'EPINEPHRINE - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 5049.00, 5049.00,
JSON_ARRAY('Code: TST_309', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_310', 'LACTOSE TOLERANCE TEST', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_310', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_311', 'MRI - BRACHIAL PLEXUS', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_311', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_312', 'MYOGLOBIN  - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_312', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_313', 'VITAMIN D TOTAL (25-OH) - LCMS', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_313', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_314', 'X-RAY - KNEE AP/LATERAL/SKILINE', 'ACCUMAX home service test', 'Sample', '🧪', 2500.00, 2500.00,
JSON_ARRAY('Code: TST_314', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_315', 'X-RAY - LEFT HEEL', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_315', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_316', 'X-RAY - LUMBOSACRAL SPINE FLEXIN VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_316', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_317', 'HEPATITIS B SURFACE ANTIGEN HBsAg, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_317', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_318', 'THROMBIN TIME', 'ACCUMAX home service test', 'Sample', '🧪', 496.00, 496.00,
JSON_ARRAY('Code: TST_318', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_319', 'U1-SnRNP', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_319', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_320', 'PROINSULIN', 'ACCUMAX home service test', 'Sample', '🧪', 1137.40, 1137.40,
JSON_ARRAY('Code: TST_320', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_321', 'OXYGEN SATURATION', 'ACCUMAX home service test', 'Sample', '🧪', 200.00, 200.00,
JSON_ARRAY('Code: TST_321', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_322', 'SUCCINYLACETONE, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6325.00, 6325.00,
JSON_ARRAY('Code: TST_322', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_323', 'FREE CORTISOL', 'ACCUMAX home service test', 'Sample', '🧪', 980.00, 980.00,
JSON_ARRAY('Code: TST_323', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_324', 'STEROID PANEL FOR POLYCYSTIC OVARY SYNDROME (PCOS)', 'ACCUMAX home service test', 'Sample', '🧪', 3518.90, 3518.90,
JSON_ARRAY('Code: TST_324', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_325', 'MUMPS - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_325', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_326', 'MAGNESIUM, RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_326', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_327', 'GLUCOSE - PLEURAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_327', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_328', 'TRYPTASE', 'ACCUMAX home service test', 'Sample', '🧪', 2288.00, 2288.00,
JSON_ARRAY('Code: TST_328', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_329', 'ULTRASONOGRAM - SMALL PARTS', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_329', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_330', 'PHOSPHOLIPIDS TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_330', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_331', 'GM2 GANGLIOSIDOSIS, QUANTITATIVE/BLOOD/TAY SACHS AND SANDHOFF DISEASE', 'ACCUMAX home service test', 'Sample', '🧪', 22550.00, 22550.00,
JSON_ARRAY('Code: TST_331', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_332', 'HAEMOGLOBIN - HB%', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_332', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_333', 'ANTI GLIADIN ANTIBODY - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_333', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_334', '5 AMINO LEVULINIC ACID (5-ALA) RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_334', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_335', 'AUTOIMMUNE ENCEPHALITIS PANEL, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 23870.00, 23870.00,
JSON_ARRAY('Code: TST_335', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_336', 'CYTOMEGALOVIRUS (CMV), DNA, QUANTITATIVE, PCR', 'ACCUMAX home service test', 'Sample', '🧪', 10230.00, 10230.00,
JSON_ARRAY('Code: TST_336', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_337', 'CULTURE AND SENSITIVITY - SYNOVIAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_337', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_338', 'COAGULATION FACTORS', 'ACCUMAX home service test', 'Sample', '🧪', 935.00, 935.00,
JSON_ARRAY('Code: TST_338', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_339', 'ANTI PHOSPHOLIPID ANTIBODY - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_339', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_340', 'ADENOSINE DEAMINASE - ASCITIC FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_340', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_341', '5 FLUOROURACIL TOXICITY (DPD GENE MUTATION)', 'ACCUMAX home service test', 'Sample', '🧪', 8360.00, 8360.00,
JSON_ARRAY('Code: TST_341', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_342', 'DOPPLER STUDY - RENAL ARTERY', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_342', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_343', 'BICARBONATE', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_343', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_344', 'ANTI NMO (NEUROMYELITIS OPTICA) PANEL, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 8690.00, 8690.00,
JSON_ARRAY('Code: TST_344', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_345', 'APO B - APO A1 RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_345', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_346', 'EUGLOBULIN CLOT LYSIS TIME', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_346', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_347', 'HEPARIN-PF4 ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 14190.00, 14190.00,
JSON_ARRAY('Code: TST_347', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_348', 'AFB - PUS', 'ACCUMAX home service test', 'Sample', '🧪', 475.00, 475.00,
JSON_ARRAY('Code: TST_348', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_349', 'ANTI B TITRE, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_349', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_350', 'ADAMTS13 ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 23760.00, 23760.00,
JSON_ARRAY('Code: TST_350', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_351', 'LEAD, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3960.00, 3960.00,
JSON_ARRAY('Code: TST_351', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_352', 'BIOFIRE PNEUMOINIA PLUS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 7150.00, 7150.00,
JSON_ARRAY('Code: TST_352', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_353', 'URINE CULTURE (VITEK)', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_353', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_354', 'CULTURE, AEROBIC, EAR SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_354', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_355', 'FASTING BLOOD SUGAR-FBS', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_355', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_356', 'HEPATITIS B', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_356', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_357', 'FECAL WEIGHT', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_357', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_358', 'ANTI HBe', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_358', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_359', 'ALBUMIN - FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_359', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_360', 'ASPERGILLUS ANTIBODY IgG, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 3036.00, 3036.00,
JSON_ARRAY('Code: TST_360', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_361', 'BENCE JONES PROTEIN - BJP', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_361', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_362', 'ALDOSTERONE / PLASMA RENIN (DIRECT) RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 8030.00, 8030.00,
JSON_ARRAY('Code: TST_362', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_363', 'BILIRUBIN INDIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_363', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_364', 'DENGUE  - RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_364', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_365', 'GRAM STAIN - ASPIRATION FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 475.00, 475.00,
JSON_ARRAY('Code: TST_365', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_366', 'COOMBS TEST, DIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 490.00, 490.00,
JSON_ARRAY('Code: TST_366', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_367', 'ANTI MULLERIAN HORMONE - AMH', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_367', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_368', 'ISLET CELL ANTIBODY, IN DILUTIONS', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_368', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_369', 'COMPLEMENT  C3', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_369', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_370', 'DOPPLER STUDY - SINGLE UPPER LIMB ARTERIES', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_370', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_371', 'ECHINOCOCCUS (HYDATID SEROLOGY) IgG, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_371', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_372', 'ESTIMATED GLOMERULAR FILTRATION RATE - eGFR', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_372', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_373', 'MANTOUX TEST', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_373', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_374', 'MRI - ABDOMEN', 'ACCUMAX home service test', 'Sample', '🧪', 7700.00, 7700.00,
JSON_ARRAY('Code: TST_374', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_375', 'CT - ABDOMEN WITH PELVIS', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_375', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_376', 'GENEXPERT ULTRA (NEXT GENERATION) MTB WITH RIFAMPICIN RESISTANCE, SEMI QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 3960.00, 3960.00,
JSON_ARRAY('Code: TST_376', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_377', 'ANTI NUCLEAR ANTIBODY (ANA SCREENING)', 'ACCUMAX home service test', 'Sample', '🧪', 2850.00, 2850.00,
JSON_ARRAY('Code: TST_377', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_378', 'BIOPSY LARGE - 1', 'ACCUMAX home service test', 'Sample', '🧪', 1870.00, 1870.00,
JSON_ARRAY('Code: TST_378', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_379', 'CHROMIUM, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_379', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_380', 'ANTI A TITRE, IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_380', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_381', 'CPK ISOENZYME ELECTROPHORESIS', 'ACCUMAX home service test', 'Sample', '🧪', 9460.00, 9460.00,
JSON_ARRAY('Code: TST_381', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_382', 'C1 ESTERASE INHIBITOR, PROTEIN QUANTITATION,C1 INHIBITOR, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_382', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_383', 'KIDNEY STONE FORMATION, THERAPEUTIC MONITORING PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_383', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_384', 'ENHANCED LIVER FIBROSIS (ELF) PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 22000.00, 22000.00,
JSON_ARRAY('Code: TST_384', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_385', 'ARTERIAL BLOOD GAS STUDIES-ABGS', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_385', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_386', 'GLUCOMETER BLOOD GLUCOSE', 'ACCUMAX home service test', 'Sample', '🧪', 200.00, 200.00,
JSON_ARRAY('Code: TST_386', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_387', 'MRI - KNEE BOTH JOINT WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_387', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_388', 'MRI - DORSAL SPINE / THORACIC SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_388', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_389', 'CHLAMYDIA ANTIGEN,RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_389', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_390', 'CT - TRIPLE PHASE ABDOMEN', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_390', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_391', 'ESTRADIOL - 3rd GENERATION', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_391', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_392', 'HEPATITIS B SURFACE ANTIBODY (Anti-HBs)', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_392', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_393', 'FECAL UROBILINOGEN', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_393', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_394', 'JAK 2, GENE MUTATION, PCR QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 7854.00, 7854.00,
JSON_ARRAY('Code: TST_394', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_395', 'CATECHOLAMINES - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 5049.00, 5049.00,
JSON_ARRAY('Code: TST_395', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_396', 'CHLORIDE, FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_396', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_397', 'P-ANCA', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_397', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_398', 'HERPES SIMPLEX VIRUS (HSV) TYPE 2, PCR, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_398', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_399', 'MRI - LUMBAR SPINE  WITH  WHOLE SPINE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_399', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_400', 'HEMOSIDERIN', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_400', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_401', 'CORTISONE CORTISOL RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 3245.00, 3245.00,
JSON_ARRAY('Code: TST_401', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_402', 'CRYPTOCOCCUS ANTIGEN RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_402', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_403', 'MRI - ANKLE SINGLE JOINT WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_403', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_404', 'JAK 2 EXON 12, MUTATION DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 7854.00, 7854.00,
JSON_ARRAY('Code: TST_404', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_405', 'GRAMSTAIN - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_405', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_406', 'CHLAMYDIA TRACHOMATIS - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_406', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_407', '24 Hrs URINE OXALATE', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_407', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_408', 'HE4 (HUMAN EPIDIDYMIS PROTEIN 4)', 'ACCUMAX home service test', 'Sample', '🧪', 1859.00, 1859.00,
JSON_ARRAY('Code: TST_408', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_409', 'BLEEDING TIME - BT', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_409', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_410', 'BILIRUBIN TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_410', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_411', 'ASPERGILLUS ANTIBODIES PANEL IgG and IgM, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 36190.00, 36190.00,
JSON_ARRAY('Code: TST_411', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_412', '25-HYDROXY VITAMIN D', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_412', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_413', 'ESTRIOL - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_413', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_414', 'CULTURE AND SENSITIVITY - ASCITIC FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_414', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_415', 'LEPTOSPIRA - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_415', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_416', 'BLOOD CULTURE AND SENSITIVITY - LEFT(Aerobic)', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_416', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_417', 'ANTI THYROID ANTIBODIES PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_417', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_418', 'ANTIBODY TO SS-A/Ro', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_418', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_419', 'NEUTROPHIL TO LYMPHOCYTE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_419', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_420', 'FACTOR V LEIDEN MUTATION ANALYSIS', 'ACCUMAX home service test', 'Sample', '🧪', 7293.00, 7293.00,
JSON_ARRAY('Code: TST_420', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_421', 'INSULIN-LIKE GROWTH FACTOR 1 - (IGF-1)', 'ACCUMAX home service test', 'Sample', '🧪', 4840.00, 4840.00,
JSON_ARRAY('Code: TST_421', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_422', 'COOMBS TEST, INDIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 490.00, 490.00,
JSON_ARRAY('Code: TST_422', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_423', 'ALKAPTONURIA, URINE, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 1006.50, 1006.50,
JSON_ARRAY('Code: TST_423', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_424', 'HEPATITIS C VIRAL (HCV RNA), GENOTYPE', 'ACCUMAX home service test', 'Sample', '🧪', 8976.00, 8976.00,
JSON_ARRAY('Code: TST_424', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_425', 'PHOSPHATIDYLSERINE ANTIBODY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1155.00, 1155.00,
JSON_ARRAY('Code: TST_425', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_426', 'BNP B-TYPE NATRIURETIC PEPTIDE, PLASMA', 'ACCUMAX home service test', 'Sample', '🧪', 3597.00, 3597.00,
JSON_ARRAY('Code: TST_426', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_427', 'INSULIN RESISTANCE - HOMA-IR', 'ACCUMAX home service test', 'Sample', '🧪', 1705.00, 1705.00,
JSON_ARRAY('Code: TST_427', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_428', 'MRI - ORBIT WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_428', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_429', 'CIRCULATING IMMUNE COMPLEXES (CIC)', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_429', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_430', 'CPK - MB', 'ACCUMAX home service test', 'Sample', '🧪', 661.00, 661.00,
JSON_ARRAY('Code: TST_430', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_431', 'MRI - ANKLE ( RIGHT / LEFT )', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_431', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_432', 'LEIGH SYNDROME MITOCHONDRIAL MUTATION DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 8250.00, 8250.00,
JSON_ARRAY('Code: TST_432', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_433', 'ANTI CCP', 'ACCUMAX home service test', 'Sample', '🧪', 2090.00, 2090.00,
JSON_ARRAY('Code: TST_433', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_434', '17-HYDROXYPROGESTERONE (17-OHP), NEWBORN SCREEN CAH SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_434', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_435', 'COPPER - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_435', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_436', 'LACTATE, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_436', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_437', 'CORTISOL, SERUM (MORNING SAMPLE)', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_437', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_438', 'IMMUNOGLOBULIN PROFILE', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_438', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_439', 'PLATELET COUNT, FLUORESCENT', 'ACCUMAX home service test', 'Sample', '🧪', 250.00, 250.00,
JSON_ARRAY('Code: TST_439', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_440', 'FACTOR V', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_440', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_441', '5-HYDROXY INDOLE ACETIC ACID (5-HIAA), RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_441', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_442', 'DIRECT COOMBS TEST - DCT', 'ACCUMAX home service test', 'Sample', '🧪', 490.00, 490.00,
JSON_ARRAY('Code: TST_442', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_443', 'C. DIFFICILE TOXIN A AND B, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_443', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_444', 'PLATELET COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 190.00, 190.00,
JSON_ARRAY('Code: TST_444', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_445', 'FECAL SODIUM', 'ACCUMAX home service test', 'Sample', '🧪', 605.00, 605.00,
JSON_ARRAY('Code: TST_445', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_446', 'ALDOSTERONE - 24 HRS URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_446', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_447', 'BETA 2 GLYCOPROTEIN I - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_447', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_448', 'MRI - CERVICAL/CERVICO DORSAL SPINE WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_448', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_449', 'ANTI-D NASE', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_449', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_450', 'CERULOPLASMIN - COPPER OXIDE', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_450', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_451', 'MEAN PLATELET VOLUME - MPV', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_451', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_452', 'PARVOVIRUS B19 ANTIBODIES PANEL, IgG - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2860.00, 2860.00,
JSON_ARRAY('Code: TST_452', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_453', 'LIPOPROTEIN - a', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_453', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_454', 'ANTICARDIOLIPIN ANTIBODIES IgG and IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_454', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_455', 'MRI - RIGHT FOOT', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_455', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_456', 'ERYTHROCYTE SEDIMENTATION RATE - ESR', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_456', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_457', 'FAECAL CALPROTECTIN - STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_457', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_458', 'CHIMERISM, PRE-ENGRAFTMENT', 'ACCUMAX home service test', 'Sample', '🧪', 6820.00, 6820.00,
JSON_ARRAY('Code: TST_458', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_459', 'BETA 2 GLYCOPROTEIN 1 PANEL, IgG, IgM, IgA', 'ACCUMAX home service test', 'Sample', '🧪', 6930.00, 6930.00,
JSON_ARRAY('Code: TST_459', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_460', 'CT - ANGIOGRAPHY CHEST', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_460', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_461', 'AMMONIA', 'ACCUMAX home service test', 'Sample', '🧪', 1122.00, 1122.00,
JSON_ARRAY('Code: TST_461', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_462', 'ANTIBODIES TO DOUBLE-STRANDED DNA', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_462', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_463', 'CHIMERISM SPLIT CELL ANALYSIS', 'ACCUMAX home service test', 'Sample', '🧪', 6820.00, 6820.00,
JSON_ARRAY('Code: TST_463', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_464', 'PLATELETCRIT', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_464', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_465', 'NAFLD FIBROSIS SCORE', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_465', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_466', 'FIBRINOGEN', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_466', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_467', 'ANTI-MAG', 'ACCUMAX home service test', 'Sample', '🧪', 5016.00, 5016.00,
JSON_ARRAY('Code: TST_467', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_468', 'CITRATE, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_468', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_469', 'FECAL FAT', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_469', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_470', 'ANTI DIURETIC HORMONE - VASOPRESSIN', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_470', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_471', 'ALBUMIN/CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_471', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_472', 'HAND WITH WRIST LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_472', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_473', 'CT - LIMBS WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_473', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_474', 'INDIRECT COOMBS TEST - ICT', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_474', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_475', 'MRI - DORSAL SPINE WITH WHOLE SPINE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_475', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_476', 'ANTIMITOCHONDRIAL ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 2475.00, 2475.00,
JSON_ARRAY('Code: TST_476', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_477', 'CT - WHOLE ABDOMEN WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_477', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_478', 'MYOGLOBIN - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 1197.90, 1197.90,
JSON_ARRAY('Code: TST_478', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_479', 'BILIRUBIN, FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 386.00, 386.00,
JSON_ARRAY('Code: TST_479', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_480', 'CD34 enumeration', 'ACCUMAX home service test', 'Sample', '🧪', 2090.00, 2090.00,
JSON_ARRAY('Code: TST_480', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_481', 'MRI - SPINE SCREENING WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_481', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_482', 'CHROMIUM, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_482', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_483', 'CRYOGLOBULINS QUALITATIVE TEST', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_483', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_484', 'GRAMSTAIN - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_484', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_485', 'AMPHETAMINE SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_485', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_486', 'APOLIPOPROTEIN - B', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_486', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_487', 'CT - LIMBS WITH CONTRAST INCLUDING  CT ANGIOGRAPHY', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_487', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_488', 'ANTI PARIETAL CELLS ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 1934.90, 1934.90,
JSON_ARRAY('Code: TST_488', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_489', 'DENGUE - IgM - ELISA', 'ACCUMAX home service test', 'Sample', '🧪', 1870.00, 1870.00,
JSON_ARRAY('Code: TST_489', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_490', 'CULTURED FUNGUS IDENTIFICATION', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_490', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_491', 'FNAC', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_491', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_492', 'MRI - BRAIN WITH MRV', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_492', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_493', 'KARYOTYPING', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_493', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_494', 'CALR MUTATION DETECTION', 'ACCUMAX home service test', 'Sample', '🧪', 5390.00, 5390.00,
JSON_ARRAY('Code: TST_494', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_495', 'Anti-MOG (MYELIN OLIGODENDROCYTE GLYCOPROTEIN) ANTIBODY, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 6083.00, 6083.00,
JSON_ARRAY('Code: TST_495', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_496', 'POTASSIUM', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_496', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_497', 'CULTURE ESBL (EXTENDED SPECTRUM BETA-LACTAMASE), SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_497', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_498', 'CULTURE AND SENSITIVITY - TISSUE FUNGAL', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_498', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_499', 'MRI - BRAIN WITH MRA', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_499', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_500', 'HEPATITIS Be PANEL,', 'ACCUMAX home service test', 'Sample', '🧪', 4180.00, 4180.00,
JSON_ARRAY('Code: TST_500', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_501', 'CT - CHEST / THORAX', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_501', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_502', 'BIOFIRE GI (GASTROINTESTINAL PANEL),STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 23870.00, 23870.00,
JSON_ARRAY('Code: TST_502', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_503', 'EGFR, MUTATIONAL ANALYSIS', 'ACCUMAX home service test', 'Sample', '🧪', 13750.00, 13750.00,
JSON_ARRAY('Code: TST_503', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_504', 'BIOPSY SMALL - 1', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_504', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_505', 'AST/ALT RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_505', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_506', 'pH - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_506', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_507', 'CULTURED AFB ANTITUBERCULAR DST, ETHIONAMIDE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_507', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_508', 'ULTRASONOGRAM - SCROTUM', 'ACCUMAX home service test', 'Sample', '🧪', 2400.00, 2400.00,
JSON_ARRAY('Code: TST_508', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_509', 'HAPTOGLOBIN', 'ACCUMAX home service test', 'Sample', '🧪', 3597.00, 3597.00,
JSON_ARRAY('Code: TST_509', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_510', 'CARDIO C-REACTIVE PROTEIN (hsCRP)', 'ACCUMAX home service test', 'Sample', '🧪', 1078.00, 1078.00,
JSON_ARRAY('Code: TST_510', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_511', 'GLUCOSE CHALLENGE TEST (GCT) After  75g GLUCOSE', 'ACCUMAX home service test', 'Sample', '🧪', 400.00, 400.00,
JSON_ARRAY('Code: TST_511', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_512', 'AMYLASE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_512', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_513', 'REPTILASE TIME', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_513', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_514', 'MRI - CERVICAL SPINE  WITH WHOLE SPINE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_514', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_515', 'SODIUM', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_515', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_516', 'C-ANCA', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_516', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_517', 'MRI - FISTULOGRAM  / PERINEUM', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_517', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_518', 'BETA 2 GLYCOPROTEIN I - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_518', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_519', 'DOPPLER STUDY - SINGLE LOWER LIMB ARTERIES', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_519', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_520', 'SMOOTH MUSCLE ANTIBODY (ASMA), IFA IN DILUTIONS', 'ACCUMAX home service test', 'Sample', '🧪', 1804.00, 1804.00,
JSON_ARRAY('Code: TST_520', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_521', 'CYTOMEGALOVIRUS (CMV) ANTIBODY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 10230.00, 10230.00,
JSON_ARRAY('Code: TST_521', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_522', 'H3N2 And INFLUENZA B QUALITATIVE, PCR', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_522', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_523', 'FILARIA ANTIBODY IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_523', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_524', 'AFB IDENTIFICATION, RAPID PNB TEST', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_524', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_525', 'CHIMERISM, POST-ENGRAFTMENT', 'ACCUMAX home service test', 'Sample', '🧪', 6820.00, 6820.00,
JSON_ARRAY('Code: TST_525', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_526', 'URINE PREGNANCY', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_526', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_527', 'ANTI-F-ACTIN ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 3520.00, 3520.00,
JSON_ARRAY('Code: TST_527', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_528', 'BETA hCG', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_528', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_529', 'CD3/CD4/CD8 COUNT PROFILE', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_529', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_530', 'CHRONIC LYMPHOCYTIC LEUKEMIA (CLL) MUTATIONS DETECTION PANEL 2', 'ACCUMAX home service test', 'Sample', '🧪', 21340.00, 21340.00,
JSON_ARRAY('Code: TST_530', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_531', 'GLYCOPROTEIN A-SUBUNIT', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_531', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_532', 'STONE ANALYSIS', 'ACCUMAX home service test', 'Sample', '🧪', 1804.00, 1804.00,
JSON_ARRAY('Code: TST_532', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_533', 'HELICOBACTER PYLORI, IgA', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_533', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_534', 'CARDIOLIPIN ANTIBODY, IgA ,SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_534', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_535', 'CULTURE AND SENSITIVITY - SPUTUM', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_535', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_536', 'N-TELOPEPTIDE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_536', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_537', 'NPM1 GENE MUTATION', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_537', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_538', 'ANTI HCV RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_538', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_539', 'MUCOPOLYSACCHARIDOSIS (MPS) SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 1375.00, 1375.00,
JSON_ARRAY('Code: TST_539', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_540', 'HELICOBACTER PYLORI ANTIGEN, RAPID STOO', 'ACCUMAX home service test', 'Sample', '🧪', 4397.80, 4397.80,
JSON_ARRAY('Code: TST_540', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_541', 'PROTHROMBIN TIME - PT INR', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_541', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_542', 'HCG,BETA,TOTAL, PREGNANCY, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_542', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_543', 'DOPPLER STUDY - CAROTID', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_543', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_544', 'MRI - RIGHT KNEE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_544', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_545', 'ADIPONECTIN', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_545', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_546', 'BLOOD GROUP ABO AND Rh TYPING', 'ACCUMAX home service test', 'Sample', '🧪', 286.00, 286.00,
JSON_ARRAY('Code: TST_546', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_547', 'CALCITONIN STIMULATION BY CALCIUM - PENTAGASTRIN', 'ACCUMAX home service test', 'Sample', '🧪', 15950.00, 15950.00,
JSON_ARRAY('Code: TST_547', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_548', 'HEPATITIS B SURFACE ANTIGEN (HBsAg) CONFIRMATION', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_548', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_549', 'BIOPSY SMALL - 2', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_549', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_550', 'ALKALINE PHOSPHATASE', 'ACCUMAX home service test', 'Sample', '🧪', 187.00, 187.00,
JSON_ARRAY('Code: TST_550', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_551', 'GRAM STAIN - PUS', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_551', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_552', 'HEMOPHILIA A CARRIER DETECTIO', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_552', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_553', 'PARVOVIRUS B19 ANTIBODY, IgG,', 'ACCUMAX home service test', 'Sample', '🧪', 5940.00, 5940.00,
JSON_ARRAY('Code: TST_553', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_554', '17-HYDROXYCORTICOSTEROIDS  24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 7920.00, 7920.00,
JSON_ARRAY('Code: TST_554', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_555', 'URINE, DYSMORPHIC RBCURINE, DYSMORPHIC RBC', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_555', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_556', 'ABSOLUTE LYMPHOCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_556', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_557', 'HEPARIN ANTI FACTOR Xa ASSAY', 'ACCUMAX home service test', 'Sample', '🧪', 11385.00, 11385.00,
JSON_ARRAY('Code: TST_557', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_558', 'Anti Thyroglobulin Antibody (ATG)', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_558', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_559', 'ULTRASOUND - ABDOMEN WITH TVS', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_559', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_560', 'BUN/CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_560', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_561', 'PERNICIOUS ANEMIA PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_561', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_562', 'COPPER, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_562', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_563', 'QUALITATIVE RT - PCR - COVID 19 (SARS - COV 2)', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_563', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_564', 'GASTRIN', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_564', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_565', 'HAEMATOCRIT - HCT', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_565', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_567', 'MEASLES ANTIBODY - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_567', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_568', 'BETA2 MICROGLOBULIN - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_568', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_569', 'THALLIUM, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 4785.00, 4785.00,
JSON_ARRAY('Code: TST_569', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_570', 'CPK', 'ACCUMAX home service test', 'Sample', '🧪', 860.00, 860.00,
JSON_ARRAY('Code: TST_570', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_571', 'PLATELET TO LARGE CELL RATIO - PLCR', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_571', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_572', 'ATYPICAL ANCA', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_572', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_573', 'BMD - SPINE AND HIP', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_573', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_574', 'ALKAPTONURIA, URINE, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 4675.00, 4675.00,
JSON_ARRAY('Code: TST_574', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_575', 'ANTI-MYELOPEROXIDASE ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_575', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_576', 'BIOPSY MEDIUM - 2', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_576', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_577', 'POST PRANDIAL BLOOD SUGAR-PPBS', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_577', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_578', 'TOTAL IRON BINDING CAPACITY - TIBC', 'ACCUMAX home service test', 'Sample', '🧪', 792.00, 792.00,
JSON_ARRAY('Code: TST_578', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_579', 'CMV - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_579', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_580', 'MRI - CERVICAL SPINE WITH SHOULDER SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_580', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_581', 'VLDL', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_581', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_582', 'UREA NITROGEN', 'ACCUMAX home service test', 'Sample', '🧪', 132.00, 132.00,
JSON_ARRAY('Code: TST_582', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_583', 'CULTURE AND SENSITIVITY - WATER', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_583', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_584', 'C-PEPTIDE - FASTING', 'ACCUMAX home service test', 'Sample', '🧪', 1804.00, 1804.00,
JSON_ARRAY('Code: TST_584', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_585', 'C3 AND C4 COMPLEMENT PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1705.00, 1705.00,
JSON_ARRAY('Code: TST_585', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_586', 'BLOOD GROUP, ABO AND RH TYPING AUTOMATED', 'ACCUMAX home service test', 'Sample', '🧪', 286.00, 286.00,
JSON_ARRAY('Code: TST_586', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_587', 'TOXOPLASMA - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_587', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_588', 'VON WILLEBRAND FACTOR RISTOCETIN COFACTOR ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 11770.00, 11770.00,
JSON_ARRAY('Code: TST_588', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_589', 'SEMEN FRUCTOSE, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 825.00, 825.00,
JSON_ARRAY('Code: TST_589', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_590', 'HEPATITIS C VIRAL (HCV RNA), QUANTITATIVE, ULTRA', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_590', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_591', 'RETICULOCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 350.00, 350.00,
JSON_ARRAY('Code: TST_591', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_592', 'HYDROXYPROLINE', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_592', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_593', 'FREE TESTOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_593', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_594', 'PRE-ECLAMPSIA PREDICTION PANEL (PLGF, SFLT, SFLT-1/PLGF RATIO)', 'ACCUMAX home service test', 'Sample', '🧪', 3520.00, 3520.00,
JSON_ARRAY('Code: TST_594', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_595', 'ANTI HAV TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_595', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_597', 'ULTRASONOGRAM - ANOMALY SCAN', 'ACCUMAX home service test', 'Sample', '🧪', 3245.00, 3245.00,
JSON_ARRAY('Code: TST_597', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_598', 'CULTURED AFB ANTITUBERCULAR DST, RIFAMPICIN', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_598', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_599', 'CHRONIC LYMPHOCYTIC LEUKEMIA (CLL), MUTATIONS DETECTION PANEL 1', 'ACCUMAX home service test', 'Sample', '🧪', 21340.00, 21340.00,
JSON_ARRAY('Code: TST_599', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_600', 'TOTAL URINE VOLUME', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_600', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_601', 'ABSOLUTE MONOCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_601', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_602', 'UNBOUND IRON BINDING CAPACITY - UIBC', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_602', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_603', 'STEROID PANEL FOR PREMATURE ADRENARCHE', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_603', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_604', 'CANNABINOIDS SCREEN, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 935.00, 935.00,
JSON_ARRAY('Code: TST_604', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_605', '24 Hrs URINE VANILLYLMANDELIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 4290.00, 4290.00,
JSON_ARRAY('Code: TST_605', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_606', 'FREE LIGHT CHAIN KAPPA / LAMDA - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_606', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_607', 'HBsAg - ELISA', 'ACCUMAX home service test', 'Sample', '🧪', 980.00, 980.00,
JSON_ARRAY('Code: TST_607', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_608', 'COAGULATION SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 1056.00, 1056.00,
JSON_ARRAY('Code: TST_608', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_609', 'ABSOLUTE NEUTROPHIL COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 341.00, 341.00,
JSON_ARRAY('Code: TST_609', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_611', 'COBALT, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_611', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_612', 'VITAMIN A', 'ACCUMAX home service test', 'Sample', '🧪', 5049.00, 5049.00,
JSON_ARRAY('Code: TST_612', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_613', 'ASCA (ANTI SACCHAROMYCES CEREVISIAE) ANTIBODY, IgA', 'ACCUMAX home service test', 'Sample', '🧪', 5445.00, 5445.00,
JSON_ARRAY('Code: TST_613', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_614', 'CARBOXYHEMOGLOBIN', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_614', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_615', 'URINE MICROALBUMIN', 'ACCUMAX home service test', 'Sample', '🧪', 682.00, 682.00,
JSON_ARRAY('Code: TST_615', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_616', 'CT - BRAIN WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_616', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_617', 'HEPATITIS E ANTIBODY (Anti-HEV), IGG', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_617', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_618', 'C-PEPTIDE STIMULATION BY GLUCAGON, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_618', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_619', 'ADENOSINE DEAMINASE - ADA PLEURAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 1067.00, 1067.00,
JSON_ARRAY('Code: TST_619', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_620', 'DENGUE NS1 ANTIGEN - ELISA', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_620', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_621', 'TOTAL TRIIODOTHYRONINE - T3', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_621', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_622', '17-KETOSTEROIDS 24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_622', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_623', 'UREA NITROGEN, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_623', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_624', 'G6 PDH', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_624', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_625', 'URINE SUGAR - FASTING', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_625', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_626', 'COMPLEMENT COMPONENTS', 'ACCUMAX home service test', 'Sample', '🧪', 4180.00, 4180.00,
JSON_ARRAY('Code: TST_626', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_627', 'X-RAY - CERVICAL SPINE LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_627', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_628', 'CULTURE AND SENSITIVITY - AIR CULTURE', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_628', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_629', 'ASCORBIC  ACID (VITAMIN C)', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_629', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_630', 'ACETYL CHOLINE RECEPTOR ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_630', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_631', 'IMMUNOGLOBULIN A - IgA', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_631', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_632', 'CYSTATIN C LEVEL', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_632', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_633', 'CLOT RETRACTION TEST', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_633', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_634', 'C-REACTIVE PROTEIN (High Sensitivity)', 'ACCUMAX home service test', 'Sample', '🧪', 1178.00, 1178.00,
JSON_ARRAY('Code: TST_634', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_635', 'SELENIUM, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_635', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_636', 'VARICELLA ZOSTER ANTIBODY - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_636', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_637', 'CHIKUNGUNYA VIRUS ANTIBODY, IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1375.00, 1375.00,
JSON_ARRAY('Code: TST_637', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_638', 'C-PEPTIDE, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 1155.00, 1155.00,
JSON_ARRAY('Code: TST_638', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_639', 'VGKC (VOLTAGE GATED POTASSIUM CHANNEL) ANTIBODY, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_639', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_640', 'AMINO ACID NON KETOTIC HYPERGLYCINEMIA PANEL QUANTITATIVE, CSF - PLASMA', 'ACCUMAX home service test', 'Sample', '🧪', 9900.00, 9900.00,
JSON_ARRAY('Code: TST_640', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_641', '24 Hrs URINE CHLORIDE', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_641', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_642', 'HEAVY METAL SCREE', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_642', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_643', 'STOOL EXAMINATION, HANGING DROP PREPARATION', 'ACCUMAX home service test', 'Sample', '🧪', 485.00, 485.00,
JSON_ARRAY('Code: TST_643', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_644', 'CRYPTOSPORIDIUM ANITGEN, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_644', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_645', 'H1N1 (SWINE FLU) QUALITATIVE, REAL TIME PCR', 'ACCUMAX home service test', 'Sample', '🧪', 0.00, 0.00,
JSON_ARRAY('Code: TST_645', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_646', 'CT - BRAIN WITH FACIAL BONES', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_646', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_647', 'BLOOD GLUCOSE - PP 2 Hrs', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_647', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_648', 'ANTIHISTONE ANTBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 2475.00, 2475.00,
JSON_ARRAY('Code: TST_648', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_649', 'CHROMOGRANIN A,CGA', 'ACCUMAX home service test', 'Sample', '🧪', 10450.00, 10450.00,
JSON_ARRAY('Code: TST_649', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_650', 'X-RAY - ELBOW AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_650', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_651', 'CALCITONIN', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_651', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_652', 'ALBERT STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_652', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_653', 'IMMUNOGLOBULIN IgG SYNTHESIS INDEX AND RATE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_653', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_654', 'DOPPLER STUDY - SINGLE UPPER LIMB VENOUS', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_654', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_655', 'FREE T4', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_655', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_656', 'X-RAY - BOTH KNEE ( SKYLINE )', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_656', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_657', 'BETA2 MICROGLOBULIN - FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_657', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_658', 'CT - PERIPHERAL ANGIO WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_658', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_659', 'HOMOCYSTEINE', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_659', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_660', 'LEUKOCYTE COUNT - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 231.00, 231.00,
JSON_ARRAY('Code: TST_660', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_661', 'ANGIOTENSIN CONVERTING ENZYME', 'ACCUMAX home service test', 'Sample', '🧪', 3025.00, 3025.00,
JSON_ARRAY('Code: TST_661', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_662', 'CT - UROGRAM  ( CONTRAST)', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_662', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_663', 'CT - WHOLE ABDOMEN WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_663', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_664', 'CREATININE FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 0.00, 0.00,
JSON_ARRAY('Code: TST_664', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_665', 'CHROMOGRANIN A', 'ACCUMAX home service test', 'Sample', '🧪', 16720.00, 16720.00,
JSON_ARRAY('Code: TST_665', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_666', 'HCG BETA, TOTAL, TUMOR MARKER', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_666', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_667', 'D-XYLOSE ABSORPTION', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_667', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_668', 'BACTERIAL VAGINOSIS (BV) TEST ,RAPID, VAGINAL SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 594.00, 594.00,
JSON_ARRAY('Code: TST_668', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_669', 'HISTONE ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_669', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_670', 'CT HEAD WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_670', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_671', 'ENDOMYSIAL ANTIBODY, IgA, IFA IN DILUTIONS', 'ACCUMAX home service test', 'Sample', '🧪', 4796.00, 4796.00,
JSON_ARRAY('Code: TST_671', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_672', 'X-RAY - LEG LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_672', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_673', 'ADENOVIRUS ANTIGEN FOR RESPIRATORY INFECTIONS', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_673', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_674', 'CT - NECK WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_674', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_675', 'CULTURE AND SENSITIVITY - EAR SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_675', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_676', 'LDH', 'ACCUMAX home service test', 'Sample', '🧪', 661.00, 661.00,
JSON_ARRAY('Code: TST_676', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_677', 'FACTOR XIII, B SUBUNIT', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_677', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_678', 'GALACTOMANNAN (ASPERGILLUS ANTIGEN) SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_678', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_679', 'CT - BRAIN WITH PNS', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_679', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_680', 'CLOSTRIDIUM DIFFICILE DETECTION, PCR', 'ACCUMAX home service test', 'Sample', '🧪', 7975.00, 7975.00,
JSON_ARRAY('Code: TST_680', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_681', 'BIOPSY LARGE - 2', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_681', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_682', 'COPPER, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_682', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_683', 'MENOPAUSE SCREENING PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_683', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_684', 'CT - JOINTS', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_684', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_685', 'HAEMATOLOGY II', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_685', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_686', 'HbA1c', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_686', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_687', 'BORDETELLA PERTUSSIS ANTIBODY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 3146.00, 3146.00,
JSON_ARRAY('Code: TST_687', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_688', 'CT - BRAIN WITH DWI', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_688', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_689', 'MRI - PITUITARY GLAND WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_689', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_690', 'CULTURED AFB ANTITUBERCULAR DST, LEVOFLOXACIN', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_690', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_691', 'GROWTH DISORDER PANEL, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 19800.00, 19800.00,
JSON_ARRAY('Code: TST_691', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_692', 'CULTURE HELICOBACTER PYLORI', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_692', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_693', 'CREATININE, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 682.00, 682.00,
JSON_ARRAY('Code: TST_693', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_694', 'HEPATITIS B VIRUS (HBV DNA) GENOTYPE AND DRUG RESISTANCE', 'ACCUMAX home service test', 'Sample', '🧪', 4488.00, 4488.00,
JSON_ARRAY('Code: TST_694', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_695', 'HEPATITIS A ANTIBODY (ANTI HAV), IgM, SER', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_695', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_696', 'ADENOVIRUS, QUALITATIVE PCR', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_696', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_697', 'CORTISOL, FREE, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_697', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_698', 'ADRENO CORTICOTROPHIC HORMONE - ACTH', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_698', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_699', 'AMINO ACIDS QUALITATIVE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_699', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_700', 'CORTISOL SUPPRESSION BY DEXAMETHASONE, OVERNIGHT LOW DOSE', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_700', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_701', 'CA 27.29', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_701', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_702', 'CATECHOLAMINES, PLASMA', 'ACCUMAX home service test', 'Sample', '🧪', 11440.00, 11440.00,
JSON_ARRAY('Code: TST_702', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_703', 'DOPPLER STUDY - PENILE', 'ACCUMAX home service test', 'Sample', '🧪', 2400.00, 2400.00,
JSON_ARRAY('Code: TST_703', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_704', 'ANTI SPERM ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_704', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_705', 'ALUMINUM, DIALYSIS FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 2574.00, 2574.00,
JSON_ARRAY('Code: TST_705', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_706', 'ESTRIOL UNCONJUGATED ,FREE (E3)', 'ACCUMAX home service test', 'Sample', '🧪', 1672.00, 1672.00,
JSON_ARRAY('Code: TST_706', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_707', 'CHLAMYDIA ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 1914.00, 1914.00,
JSON_ARRAY('Code: TST_707', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_708', 'BETA 2 GLYCOPROTEIN I, IgA', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_708', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_709', 'ANTI HAV - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_709', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_710', 'FILARIA ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 1408.00, 1408.00,
JSON_ARRAY('Code: TST_710', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_711', 'CHLORIDE,SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_711', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_712', 'ANTI SOLUBLE LIVER ANTIGEN (SLA), SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_712', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_713', 'BILE PIGMENT', 'ACCUMAX home service test', 'Sample', '🧪', 210.00, 210.00,
JSON_ARRAY('Code: TST_713', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_714', 'NEISSERIA GONORRHOEAE PCR, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 4290.00, 4290.00,
JSON_ARRAY('Code: TST_714', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_715', 'ANTITHROMIN III', 'ACCUMAX home service test', 'Sample', '🧪', 5170.00, 5170.00,
JSON_ARRAY('Code: TST_715', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_716', 'BIOTINIDASE, NEWBORN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_716', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_717', 'CHOLESTEROL, FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_717', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_718', 'BILE SALT', 'ACCUMAX home service test', 'Sample', '🧪', 210.00, 210.00,
JSON_ARRAY('Code: TST_718', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_719', 'ARSENIC, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_719', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_720', 'RBS (RANDOM BLOOD SUGAR)', 'ACCUMAX home service test', 'Sample', '🧪', 120.00, 120.00,
JSON_ARRAY('Code: TST_720', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_721', 'CORTISOL, SALIVA', 'ACCUMAX home service test', 'Sample', '🧪', 2574.00, 2574.00,
JSON_ARRAY('Code: TST_721', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_722', 'PORPHYRINS TOTAL, QUALITATIVE, RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 5390.00, 5390.00,
JSON_ARRAY('Code: TST_722', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_723', 'CT - NECK', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_723', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_724', 'ASPERGILLUS ANTIBODY IgM, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_724', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_725', 'GAMMA GLOBUIN - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 19800.00, 19800.00,
JSON_ARRAY('Code: TST_725', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_726', 'CT - ANKLE ( RIGHT / LEFT )', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_726', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_727', 'STOMACH HEALTH TEST / GASTRO PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 4730.00, 4730.00,
JSON_ARRAY('Code: TST_727', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_728', 'CARBAMAZEPINE', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_728', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_729', 'DENGUE - IgG - ELISA', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_729', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_730', 'BRUCELLA IgG ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_730', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_731', 'HSV I - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_731', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_732', 'CT - LOWER LIMB ANGIO WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 7150.00, 7150.00,
JSON_ARRAY('Code: TST_732', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_733', 'ETHANOL', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_733', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_734', 'FUNGAL GROWTH - TISSUE', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_734', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_735', 'INSULIN SENSITIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_735', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_736', 'SERUM CALCIUM', 'ACCUMAX home service test', 'Sample', '🧪', 290.00, 290.00,
JSON_ARRAY('Code: TST_736', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_737', 'CT - RIGHT HIP', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_737', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_738', 'X-RAY - NASOPHYRANX FOR ADENOIDS', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_738', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_739', 'DOPPLER STUDY - SINGLE LOWER LIMB VENOUS', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_739', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_740', 'MRI -  CREVICAL SPINE WITH BRACHIAL PLEXUS', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_740', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_741', 'X-RAY - PNS', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_741', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_742', 'BIOPSY MEDIUM - 1', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_742', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_743', 'X-RAY - FOOT LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_743', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_744', 'VANCOMYCIN', 'ACCUMAX home service test', 'Sample', '🧪', 8415.00, 8415.00,
JSON_ARRAY('Code: TST_744', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_745', 'CULTURE AND SENSITIVITY - PUS', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_745', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_746', 'TUMOUR NECROSIS FACTOR (TNF) ALPHA, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 5280.00, 5280.00,
JSON_ARRAY('Code: TST_746', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_747', 'CAMPYLOBACTER ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_747', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_748', 'HLA B 51', 'ACCUMAX home service test', 'Sample', '🧪', 5841.00, 5841.00,
JSON_ARRAY('Code: TST_748', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_749', 'ANTI HBs', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_749', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_750', 'LE CELL PHENOMENON', 'ACCUMAX home service test', 'Sample', '🧪', 484.00, 484.00,
JSON_ARRAY('Code: TST_750', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_751', 'CT - BRAIN WITH ORBIT', 'ACCUMAX home service test', 'Sample', '🧪', 5720.00, 5720.00,
JSON_ARRAY('Code: TST_751', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_752', 'AUTOIMMUNE LIVER DISEASES PROFILE IgG', 'ACCUMAX home service test', 'Sample', '🧪', 9570.00, 9570.00,
JSON_ARRAY('Code: TST_752', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_753', 'LYMPHOCYTE SUBSETS', 'ACCUMAX home service test', 'Sample', '🧪', 9130.00, 9130.00,
JSON_ARRAY('Code: TST_753', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_754', 'LEUKOCYTE COUNT - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 198.00, 198.00,
JSON_ARRAY('Code: TST_754', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_755', 'CYTOMEGALOVIRUS, INTERFERON GAMMA RELEASE ASSAY (IGRA)', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_755', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_756', 'COPROPORPHYRIN', 'ACCUMAX home service test', 'Sample', '🧪', 7150.00, 7150.00,
JSON_ARRAY('Code: TST_756', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_757', 'CT - RIGHT KNEE', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_757', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_758', 'DENGUE - IgM - RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 950.00, 950.00,
JSON_ARRAY('Code: TST_758', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_759', 'CRYPTOSPORIDIUM / ISOSPORA IDENTIFICATION, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 638.00, 638.00,
JSON_ARRAY('Code: TST_759', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_760', 'CULTURE KPC (CARBAPENEMASE), SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_760', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_761', 'CT - CHEST WITH ABDOMEN', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_761', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_762', 'ALBUMIN - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_762', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_763', 'ELECTROLYTES, 24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 693.00, 693.00,
JSON_ARRAY('Code: TST_763', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_764', 'G-6-PD, NEWBORN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_764', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_765', 'CULTURE', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_765', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_766', 'ESTRIOL - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_766', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_767', 'ALLERGIC PROFILE - NON VEGETARIAN FOOD', 'ACCUMAX home service test', 'Sample', '🧪', 13970.00, 13970.00,
JSON_ARRAY('Code: TST_767', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_768', 'GM1 GANGLIOSIDOSIS QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_768', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_769', 'ESTRADIOL (E2)', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_769', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_770', 'CULTURE AND SUSCEPTIBILITY - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_770', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_771', 'VMA (VANILMANDELIC ACID),24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4290.00, 4290.00,
JSON_ARRAY('Code: TST_771', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_772', 'FECAL NITROGEN', 'ACCUMAX home service test', 'Sample', '🧪', 4180.00, 4180.00,
JSON_ARRAY('Code: TST_772', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_773', 'URINE PROTEIN', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_773', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_774', 'ANTISTREPTOLYSIN O TITER - ASO', 'ACCUMAX home service test', 'Sample', '🧪', 295.00, 295.00,
JSON_ARRAY('Code: TST_774', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_775', 'FRACTIONAL EXCRETION OF SODIUM - FeNa', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_775', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_776', 'HEMATOCRIT', 'ACCUMAX home service test', 'Sample', '🧪', 485.00, 485.00,
JSON_ARRAY('Code: TST_776', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_777', 'LITHIUM', 'ACCUMAX home service test', 'Sample', '🧪', 902.00, 902.00,
JSON_ARRAY('Code: TST_777', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_778', 'X-RAY - ANKLE AP VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_778', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_779', 'C-PEPTIDE, FASTING, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_779', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_780', 'MAMMOGRAPHY - BOTH BREAST', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_780', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_781', 'X-RAY - BOTH HIP AP / LAT', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_781', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_782', 'MERCURY, 24-HOUR', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_782', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_783', 'MRI - FOOT WITH ANKLE', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_783', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_784', 'ANTI GLIADIN ANTIBODY - IgA', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_784', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_785', 'MRI - PELVIS WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 7700.00, 7700.00,
JSON_ARRAY('Code: TST_785', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_786', 'ANTI IA-2 (INSULINOMA ASSOCIATED ANTIGEN)', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_786', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_787', 'X-RAY - KNEE LAT', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_787', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_788', 'ZINC, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 2827.00, 2827.00,
JSON_ARRAY('Code: TST_788', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_789', 'LDL CHOLESTEROL - DIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_789', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_790', 'MEAN CORPUSCULAR VOLUME - MCV', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_790', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_791', '24 Hrs URINE SODIUM', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_791', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_792', 'MTB - GENEXPERT CSF', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_792', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_793', 'CELL COUNT and CELL TYPE CSF', 'ACCUMAX home service test', 'Sample', '🧪', 605.00, 605.00,
JSON_ARRAY('Code: TST_793', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_794', 'MRI - BRAIN WITH WHOLE SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 8250.00, 8250.00,
JSON_ARRAY('Code: TST_794', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_795', 'BETA2 MICROGLOBULIN - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_795', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_796', 'ANTI DNase B', 'ACCUMAX home service test', 'Sample', '🧪', 5335.00, 5335.00,
JSON_ARRAY('Code: TST_796', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_797', 'CADMIUM, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 5720.00, 5720.00,
JSON_ARRAY('Code: TST_797', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_798', 'TOTAL PROTEIN', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_798', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_799', '24 Hrs URINE URIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 331.00, 331.00,
JSON_ARRAY('Code: TST_799', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_800', 'CANAVAN DISEASE', 'ACCUMAX home service test', 'Sample', '🧪', 22000.00, 22000.00,
JSON_ARRAY('Code: TST_800', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_801', 'ANTI Ds DNA', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_801', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_802', 'HEPATITIS C ANTIBODY (Anti-HCV)', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_802', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_803', 'AFB - STAINING', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_803', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_804', 'FREE LIGHT CHAIN KAPPA / LAMDA - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 7645.00, 7645.00,
JSON_ARRAY('Code: TST_804', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_805', 'CULTURED AFB ANTITUBERCULAR DST, ISONIAZID', 'ACCUMAX home service test', 'Sample', '🧪', 3465.00, 3465.00,
JSON_ARRAY('Code: TST_805', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_806', 'CLOTTING TIME (CT)', 'ACCUMAX home service test', 'Sample', '🧪', 200.00, 200.00,
JSON_ARRAY('Code: TST_806', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_807', 'VITAMIN D, ULTRASENSITIVE', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_807', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_808', 'DEHYDROEPIANDROSTERONE SULPHATE - DHEA SO4', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_808', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_809', 'MEAN PLASMA GLUCOSE - MPG', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_809', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_810', 'CULTURED AFB ANTITUBERCULAR DST, 12 DRUGS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 18590.00, 18590.00,
JSON_ARRAY('Code: TST_810', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_811', 'MRI - HEAD WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_811', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_812', 'OSTEOCALCIN BONE Gla PROTEIN (BGP), SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 3410.00, 3410.00,
JSON_ARRAY('Code: TST_812', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_813', 'C-REACTIVE PROTEIN - CRP', 'ACCUMAX home service test', 'Sample', '🧪', 540.00, 540.00,
JSON_ARRAY('Code: TST_813', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_814', 'MRI - CERVICAL SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_814', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_815', 'CATECHOLAMINES, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_815', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_816', 'NICKEL, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_816', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_817', 'CALCIUM, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 594.00, 594.00,
JSON_ARRAY('Code: TST_817', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_818', 'PAP SMEAR - LIQUID BASED CYTOLOGY', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_818', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_819', 'CT - HRCT LUNG / CHEST / THORAX', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_819', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_820', 'HIRSUTISM PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_820', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_821', 'COBALT, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 3960.00, 3960.00,
JSON_ARRAY('Code: TST_821', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_822', 'ALPHA-1-ANTITRYPSIN QUANTITATION', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_822', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_823', 'CYTOLOGY  SPUTUM', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_823', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_824', 'FREE T3', 'ACCUMAX home service test', 'Sample', '🧪', 395.00, 395.00,
JSON_ARRAY('Code: TST_824', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_825', 'MRI - PELVIS WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_825', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_826', 'IRON STUDIES', 'ACCUMAX home service test', 'Sample', '🧪', 1510.00, 1510.00,
JSON_ARRAY('Code: TST_826', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_827', 'ESTIMATED AVERAGE GLUCOSE', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_827', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_828', 'NIEMANN PICK DISEASE, QUANTITATIVE, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 27500.00, 27500.00,
JSON_ARRAY('Code: TST_828', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_829', 'PHENYLALANINE, NEWBORN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 7227.00, 7227.00,
JSON_ARRAY('Code: TST_829', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_830', 'HEMOPHILIA PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 36300.00, 36300.00,
JSON_ARRAY('Code: TST_830', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_831', 'X-RAY - LUMBOSACRAL SPINE EXTENSION', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_831', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_832', 'CHIMERISM SPLIT CELL ANALYSIS - B CELL (CD19)', 'ACCUMAX home service test', 'Sample', '🧪', 12100.00, 12100.00,
JSON_ARRAY('Code: TST_832', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_833', 'GALACTOSEMIA CLASSICAL (TRANSFERASE) QUANTITATIVE BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_833', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_834', 'DIHYDROTESTOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_834', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_835', 'NITROSONAPHTHOL', 'ACCUMAX home service test', 'Sample', '🧪', 23100.00, 23100.00,
JSON_ARRAY('Code: TST_835', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_836', 'PHENOBARBITONE', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_836', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_837', 'CARCINO EMBRYONIC ANTIGEN - CEA', 'ACCUMAX home service test', 'Sample', '🧪', 841.50, 841.50,
JSON_ARRAY('Code: TST_837', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_838', 'BRUCELLA  ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_838', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_839', 'BACTERIAL MENINGITIS SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 7920.00, 7920.00,
JSON_ARRAY('Code: TST_839', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_840', 'CALCIUM, TOTAL and IONIZED', 'ACCUMAX home service test', 'Sample', '🧪', 803.00, 803.00,
JSON_ARRAY('Code: TST_840', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_841', 'CHLAMYDIA TRACHOMATIS - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_841', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_842', 'HERPES SIMPLEX VIRUS (HSV) 2 IgM', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_842', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_843', 'CT - LIMBS WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_843', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_844', 'CYTOMEGALOVIRUS (CMV) ANTIBODIES PANEL, IgG AND IgM, SERUM (CLIA)', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_844', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_845', 'ANTI A TITRE, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1815.00, 1815.00,
JSON_ARRAY('Code: TST_845', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_846', 'HBeAg', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_846', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_847', 'C-PEPTIDE - PP', 'ACCUMAX home service test', 'Sample', '🧪', 1355.00, 1355.00,
JSON_ARRAY('Code: TST_847', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_848', 'BETA HYDROXY BUTYRATE KETONE', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_848', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_849', 'CERULOPLASMIN', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_849', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_850', 'TOTAL ANTIOXIDANT STATUS', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_850', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_851', 'CULTURE AND SENSITIVITY - SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_851', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_852', 'MRI - HIP JOINT', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_852', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_853', 'PLATELET DISTRIBUTION WIDTH - CV', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_853', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_854', 'FOLLICLE STIMULATING HORMONE - FSH', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_854', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_855', 'ECG', 'ACCUMAX home service test', 'Sample', '🧪', 250.00, 250.00,
JSON_ARRAY('Code: TST_855', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_856', 'HIV ELISA', 'ACCUMAX home service test', 'Sample', '🧪', 2244.00, 2244.00,
JSON_ARRAY('Code: TST_856', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_857', 'CULTURE, ACTINOMYCES', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_857', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_858', 'IMMUNOGLOBULIN E - IgE', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_858', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_859', 'DUAL MARKER TEST', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_859', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_860', 'CT - PELVIS WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_860', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_861', 'MEAN CORPUSCULAR HAEMOGLOBIN - MCH', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_861', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_862', 'HEPATITIS B PROFILE', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_862', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_863', 'MRI - TEMPORAL BONE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_863', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_864', 'CORTISOL, MIDNIGHT, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 792.00, 792.00,
JSON_ARRAY('Code: TST_864', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_865', 'POMPE DISEASE, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 27500.00, 27500.00,
JSON_ARRAY('Code: TST_865', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_866', 'CALCIUM ,CREATININE RATIO, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 594.00, 594.00,
JSON_ARRAY('Code: TST_866', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_867', 'CULTURE AND SENSITIVITY - SEMEN', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_867', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_868', 'PLEURAL FLUID - WBC COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_868', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_869', 'CHOL / HDL RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_869', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_870', 'MRI - BOTH KNEE', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_870', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_871', 'HEPATITIS B VIRUS (HBV DNA) PCR, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 6325.00, 6325.00,
JSON_ARRAY('Code: TST_871', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_872', 'TROPONIN I - QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 2255.00, 2255.00,
JSON_ARRAY('Code: TST_872', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_873', 'COPPER - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2024.00, 2024.00,
JSON_ARRAY('Code: TST_873', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_874', 'HPE ER/PR & Her-2/ Neu', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_874', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_875', 'IMMUNOGLOBULIN G - IgG 4 SUBCLASS', 'ACCUMAX home service test', 'Sample', '🧪', 11220.00, 11220.00,
JSON_ARRAY('Code: TST_875', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_876', 'OBESITY PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_876', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_877', 'ELECTROPHORESIS OF SERUM PROTEINS', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_877', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_878', 'CULTURE,AEROBIC,ENDOTRACHEAL (ET) SECRETIONS', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_878', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_879', 'CT - SCREENING CBD', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_879', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_880', 'CULTURE AND SENSITIVITY - STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_880', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_881', 'DOPPLER STUDY - BOTH LOWER LIMB VENOUS', 'ACCUMAX home service test', 'Sample', '🧪', 4290.00, 4290.00,
JSON_ARRAY('Code: TST_881', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_882', 'CULTURE, AEROBIC, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_882', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_883', 'COLD AGGLUTININ TITER', 'ACCUMAX home service test', 'Sample', '🧪', 902.00, 902.00,
JSON_ARRAY('Code: TST_883', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_884', 'PROTEIN ELECTROPHORESIS-24 HOURS URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4620.00, 4620.00,
JSON_ARRAY('Code: TST_884', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_885', 'HBsAg - RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 375.00, 375.00,
JSON_ARRAY('Code: TST_885', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_886', 'LACTATE, VENOUS', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_886', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_887', 'MICROFILARIA - MF', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_887', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_888', 'IRON STUDIES MONITORING PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1400.00, 1400.00,
JSON_ARRAY('Code: TST_888', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_889', 'MRI - DORSAL/DORSO LUMBAR SPINE WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_889', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_890', 'MRI - MRCP', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_890', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_891', 'MRI - ABDOMEN WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_891', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_892', 'H.PYLORI - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2400.00, 2400.00,
JSON_ARRAY('Code: TST_892', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_893', 'MRI - ANKLE SINGLE JOINT WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_893', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_894', 'HERPES SIMPLEX VIRUS (HSV) 1 and 2 ANTIBODIES PANEL, IgG And IgM,', 'ACCUMAX home service test', 'Sample', '🧪', 2915.00, 2915.00,
JSON_ARRAY('Code: TST_894', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_895', 'COCAINE AND METABOLITE CONFIRMATION, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 980.00, 980.00,
JSON_ARRAY('Code: TST_895', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_896', 'MIXING STUDIES - APTT', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_896', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_897', 'MRI - NECK', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_897', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_898', 'COMPLEMENT C4', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_898', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_899', 'MRI - ORBIT WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_899', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_900', 'CT - FACIAL BONES', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_900', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_901', 'CULTURE - BIOLOGICAL INDICATOR', 'ACCUMAX home service test', 'Sample', '🧪', 595.00, 595.00,
JSON_ARRAY('Code: TST_901', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_902', 'OSMOLALITY - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 902.00, 902.00,
JSON_ARRAY('Code: TST_902', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_903', 'OPIATES CONFIRMATION, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6710.00, 6710.00,
JSON_ARRAY('Code: TST_903', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_904', 'FUNGAL STAIN - KOH & LPCB', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_904', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_905', 'MRI - RIGHT SHOULDER WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_905', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_906', 'CULTURED AFB ANTITUBERCULAR DST, ETHAMBUTOL', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_906', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_907', 'FACTOR II', 'ACCUMAX home service test', 'Sample', '🧪', 6435.00, 6435.00,
JSON_ARRAY('Code: TST_907', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_908', 'ABSOLUTE RETICULOCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_908', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_910', 'FIBROBLAST GROWTH FACTOR-23', 'ACCUMAX home service test', 'Sample', '🧪', 12100.00, 12100.00,
JSON_ARRAY('Code: TST_910', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_911', 'URINE SUGAR - RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 150.00, 150.00,
JSON_ARRAY('Code: TST_911', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_912', 'CULTURE AND SENSITIVITY - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 750.00, 750.00,
JSON_ARRAY('Code: TST_912', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_913', 'CULTURED AFB ANTITUBERCULAR DST, CYCLOSERINE', 'ACCUMAX home service test', 'Sample', '🧪', 3740.00, 3740.00,
JSON_ARRAY('Code: TST_913', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_914', 'PARVOVIRUS B19 ANTIBODY, IgM', 'ACCUMAX home service test', 'Sample', '🧪', 3740.00, 3740.00,
JSON_ARRAY('Code: TST_914', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_915', 'ENTEROHEMORRHAGIC E.COLI, VEROTOXIN 1 AND 2 ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_915', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_916', 'PAPP-A (PREGNANCY ASSOCIATED PLASMA PROTEIN-A)', 'ACCUMAX home service test', 'Sample', '🧪', 2035.00, 2035.00,
JSON_ARRAY('Code: TST_916', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_917', 'MRI - CHEST / THORAX', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_917', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_918', 'GLUCOSE - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 490.00, 490.00,
JSON_ARRAY('Code: TST_918', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_919', 'NOREPINEPHRINE - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 4895.00, 4895.00,
JSON_ARRAY('Code: TST_919', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_920', 'CULTURE, AEROBIC, BODY FLUIDS, RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 1485.00, 1485.00,
JSON_ARRAY('Code: TST_920', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_921', 'DIGOXIN - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_921', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_922', 'PROTEIN S ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_922', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_923', 'SALICYLATE', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_923', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_924', 'PROSTATE - SPECIFIC ANTIGEN, TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_924', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_925', 'HCG, BETA, TOTAL, QUANTITATIVE, 24 HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_925', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_926', 'HSV  II -  IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_926', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_927', 'ABSOLUTE EOSINOPHIL COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_927', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_928', 'ERYTHROCYTE COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_928', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_929', 'HBV DNA QUANTIFICATION', 'ACCUMAX home service test', 'Sample', '🧪', 6160.00, 6160.00,
JSON_ARRAY('Code: TST_929', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_930', '(1,3)-BETA-D-GLUCAN', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_930', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_931', 'RUBELLA - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1200.00, 1200.00,
JSON_ARRAY('Code: TST_931', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_932', 'CULTURE MALASSAZIA', 'ACCUMAX home service test', 'Sample', '🧪', 1705.00, 1705.00,
JSON_ARRAY('Code: TST_932', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_933', 'CYCLOSPORINE', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_933', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_934', 'MRI - HIP WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_934', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_935', 'ALBUMIN AND IgG CSF', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_935', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_936', 'FATTY LIVER INDEX', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_936', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_937', 'CT - RIGHT FOOT', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_937', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_938', 'MEASLES ANTIBODY - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_938', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_939', 'HEPATITS E VIRUS DETECTION, PCR', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_939', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_940', 'NOREPINEPHRINE - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 11000.00, 11000.00,
JSON_ARRAY('Code: TST_940', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_941', 'EBV - IGM', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_941', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_942', 'LISTERIA ANTIGEN STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_942', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_943', 'PROTEIN, TOTAL, CSF', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_943', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_944', 'ALPHA FETO PROTEIN - AFP', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_944', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_945', 'SCRUB TYPHUS - Igg  IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_945', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_946', 'IMMUNOGLOBULIN M - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_946', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_947', 'ENTEROVIRUS ANTIGEN, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 5225.00, 5225.00,
JSON_ARRAY('Code: TST_947', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_948', 'HEPARIN INDUCED THROMBOCYTOPENIA (HIT) IgG ANTI PLATELET FACTOR 4 -HEPARIN (PF4-H), IgG QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 12100.00, 12100.00,
JSON_ARRAY('Code: TST_948', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_949', 'SERUM ASCITES ALBUMIN GRADIENT (SAAG)', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_949', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_950', 'HCV RNA QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_950', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_951', 'LEAD, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 2475.00, 2475.00,
JSON_ARRAY('Code: TST_951', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_952', 'T3 RESIN UPTAKE', 'ACCUMAX home service test', 'Sample', '🧪', 605.00, 605.00,
JSON_ARRAY('Code: TST_952', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_953', 'PROTEIN - PLEURAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 3301.10, 3301.10,
JSON_ARRAY('Code: TST_953', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_954', 'c-ANCA SERIN PROTEINASE 3 (PR-3) ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_954', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_955', 'CT - AORTOGRAM', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_955', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_956', 'SILVER, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 7700.00, 7700.00,
JSON_ARRAY('Code: TST_956', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_957', 'HUMAN PAPILLOMA VIRUS, REAL TIME PCR', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_957', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_958', 'EVEROLIMUS', 'ACCUMAX home service test', 'Sample', '🧪', 26675.00, 26675.00,
JSON_ARRAY('Code: TST_958', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_959', 'METANEPHRINE - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_959', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_960', 'CA-125', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_960', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_961', 'SKIN SCRAPING FOR FUNGUS', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_961', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_962', 'CT - BRAIN', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_962', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_963', 'PROTEIN C ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 6105.00, 6105.00,
JSON_ARRAY('Code: TST_963', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_964', 'FILARIA ANTIBODY IGM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_964', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_965', 'CT - KUB', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_965', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_966', 'FLECAINIDE', 'ACCUMAX home service test', 'Sample', '🧪', 0.00, 0.00,
JSON_ARRAY('Code: TST_966', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_967', 'ANTI SMOOTH MUSCLE ANTIBODIES - ASMA', 'ACCUMAX home service test', 'Sample', '🧪', 3575.00, 3575.00,
JSON_ARRAY('Code: TST_967', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_968', 'HEPATIC IRON INDEX', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_968', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_969', 'THEOPHYLLINE', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_969', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_970', 'Sm (SMITH) ANTIBODY IgG SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1925.00, 1925.00,
JSON_ARRAY('Code: TST_970', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_971', 'IMMUNOGLOBULIN G - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 935.00, 935.00,
JSON_ARRAY('Code: TST_971', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_972', 'HEPATITIS DELTA ANTIBODY (HDV), IgM', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_972', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_973', 'CERULOPLASMIN - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_973', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_974', 'CHIKUNGUNYA  - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_974', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_975', 'NEURON SPECIFIC ENOLASE', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_975', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_976', 'BMD - WHOLE BODY STUDY', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_976', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_977', 'ERYTHROPOIETIN, EPO', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_977', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_978', 'CHLORIDE, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_978', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_979', 'OCCULT  BLOOD - STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_979', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_980', 'GLUTAMIC ACID DECARBOXYLASE- 65 IgG', 'ACCUMAX home service test', 'Sample', '🧪', 8305.00, 8305.00,
JSON_ARRAY('Code: TST_980', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_981', 'GRAM STAIN - SMEAR', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_981', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_982', 'SPHINGOLIPIDOSIS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_982', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_983', 'H.PYLORI ANTIGEN DETECTION - STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_983', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_984', 'CHIKUNGUNYA - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_984', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_985', 'LDH ASCITIC FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_985', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_986', 'URINE, REDUCING SUBSTANCES', 'ACCUMAX home service test', 'Sample', '🧪', 220.00, 220.00,
JSON_ARRAY('Code: TST_986', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_987', 'PHENYTOIN', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_987', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_988', 'CT - NECK WITH CHEST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_988', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_989', 'MRI - LEFT HIP JOINT', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_989', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_990', 'RAPID TB ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 3025.00, 3025.00,
JSON_ARRAY('Code: TST_990', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_991', 'TREPONEMA PALLIDUM HEMAGGLUTINATION-TPHA', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_991', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_992', 'LUTEINIZING HORMONE - LH', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_992', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_993', 'CREATININE RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 365.00, 365.00,
JSON_ARRAY('Code: TST_993', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_994', 'STOOL EXAMINATION, ROUTINE, STOOL, R/E', 'ACCUMAX home service test', 'Sample', '🧪', 320.00, 320.00,
JSON_ARRAY('Code: TST_994', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_995', 'HEPATITIS B SURFACE ANTIGEN HBsAg', 'ACCUMAX home service test', 'Sample', '🧪', 605.00, 605.00,
JSON_ARRAY('Code: TST_995', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_996', 'DELTA-AMINOLEVULINIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_996', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_997', 'SUGAR - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 485.00, 485.00,
JSON_ARRAY('Code: TST_997', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_998', 'GERM CELL TUMOR PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 27500.00, 27500.00,
JSON_ARRAY('Code: TST_998', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_999', 'SEROTONIN, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 9900.00, 9900.00,
JSON_ARRAY('Code: TST_999', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1000', 'CHLAMYDIA TRACHOMATIS, PCR', 'ACCUMAX home service test', 'Sample', '🧪', 7810.00, 7810.00,
JSON_ARRAY('Code: TST_1000', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1001', 'sdLDL - CHOLESTEROL', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_1001', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1002', 'BRUCELLA AGGLUTINATION TEST', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_1002', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1003', 'CT - LEFT FOOT', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1003', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1004', 'MRI - LEG ( RIGHT / LEFT)', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1004', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1005', 'IONISED CALCIUM', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_1005', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1006', 'Jo-1 ANTIBODY SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2585.00, 2585.00,
JSON_ARRAY('Code: TST_1006', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1007', 'GALACTOSE QUANTITATIVE PLASMA', 'ACCUMAX home service test', 'Sample', '🧪', 2090.00, 2090.00,
JSON_ARRAY('Code: TST_1007', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1008', 'CULTURE, FUNGUS, BLOOD ,BODY FLUIDS RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 3927.00, 3927.00,
JSON_ARRAY('Code: TST_1008', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1009', 'CORTISOL 4PM', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_1009', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1010', 'PERIPHERAL SMEAR STUDY', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_1010', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1011', 'TROPONIN - I QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_1011', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1012', 'VALPROIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_1012', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1013', 'HCV COMBO (RT PCR) TEST HCV QNT RT PCR  HCV GENOTYPE', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1013', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1014', 'ULTRASONOGRAM - FOLLICULAR STUDY', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1014', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1015', 'THYROGLOBULIN', 'ACCUMAX home service test', 'Sample', '🧪', 2255.00, 2255.00,
JSON_ARRAY('Code: TST_1015', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1016', 'HEINZ BODIES, PERIPHERAL BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_1016', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1017', 'SPERM DENSITY', 'ACCUMAX home service test', 'Sample', '🧪', 2860.00, 2860.00,
JSON_ARRAY('Code: TST_1017', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1018', 'VENOUS BLOOD GAS STUDIES-VBGS', 'ACCUMAX home service test', 'Sample', '🧪', 2090.00, 2090.00,
JSON_ARRAY('Code: TST_1018', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1019', 'PROTEIN TOTAL, BODY', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_1019', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1020', 'CULTURE, NOCARDIA', 'ACCUMAX home service test', 'Sample', '🧪', 1595.00, 1595.00,
JSON_ARRAY('Code: TST_1020', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1021', 'FECAL POTASSIUM', 'ACCUMAX home service test', 'Sample', '🧪', 3630.00, 3630.00,
JSON_ARRAY('Code: TST_1021', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1022', 'LEISHMANIA ( KALA AZAR) ANTIBODY, IgG,SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_1022', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1023', 'STEROID PANEL FOR CONGENITAL ADRENAL HYPERPLASIA (CAH)', 'ACCUMAX home service test', 'Sample', '🧪', 22550.00, 22550.00,
JSON_ARRAY('Code: TST_1023', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1024', 'CULTURED AFB ANTITUBERCULAR DST, 15 DRUGS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 24200.00, 24200.00,
JSON_ARRAY('Code: TST_1024', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1025', 'HLA - B27', 'ACCUMAX home service test', 'Sample', '🧪', 3630.00, 3630.00,
JSON_ARRAY('Code: TST_1025', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1026', 'VARICELLA ZOSTER ANTIBODY - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1026', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1027', 'MRI - ARM / HUMERUS', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1027', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1028', 'X-RAY - BOTH HEEL LAT', 'ACCUMAX home service test', 'Sample', '🧪', 3000.00, 3000.00,
JSON_ARRAY('Code: TST_1028', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1029', 'HERPES SIMPLEX VIRUS (HSV) 1 IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1029', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1030', 'SIROLIMUS, WHOLE BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 7260.00, 7260.00,
JSON_ARRAY('Code: TST_1030', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1031', 'METANEPHRINES, FRACTIONATED - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 9020.00, 9020.00,
JSON_ARRAY('Code: TST_1031', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1032', 'LIVER KIDNEY MICROSOMAL (LKM) ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_1032', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1033', 'CT - HEAD WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1033', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1034', 'X-RAY - LUMBOSACREL SPINE LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1800.00, 1800.00,
JSON_ARRAY('Code: TST_1034', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1035', 'CULTURE, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_1035', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1036', 'TOTAL PROTEIN S ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 7810.00, 7810.00,
JSON_ARRAY('Code: TST_1036', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1037', 'Scl-70 (SCLERODERMA ) ANTIBODY SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_1037', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1038', 'CT - CHEST WITH CONTRAST (FOR LUNGS)', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_1038', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1039', 'HELICOBACTER PYLORI, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_1039', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1040', 'TB - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_1040', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1041', 'TRANSFERRIN', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_1041', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1042', 'HEPATITIS B VIRAL (HBV DNA), QUANTITATIVE REAL TIME PCR, ULTRA', 'ACCUMAX home service test', 'Sample', '🧪', 6380.00, 6380.00,
JSON_ARRAY('Code: TST_1042', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1043', 'HISTAMINE EXCRETION', 'ACCUMAX home service test', 'Sample', '🧪', 6710.00, 6710.00,
JSON_ARRAY('Code: TST_1043', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1044', 'HEMOGLOBIN FRACTIONATION', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_1044', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1045', 'CHIKUNGUNYA VIRUS, PCR QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 5280.00, 5280.00,
JSON_ARRAY('Code: TST_1045', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1046', 'MRI - KNEE SINGLE JOINT WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1046', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1047', 'ENTAMOEBA ANTIGEN TEST , RAPID, STOOL', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_1047', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1048', 'NT-proBNP', 'ACCUMAX home service test', 'Sample', '🧪', 3960.00, 3960.00,
JSON_ARRAY('Code: TST_1048', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1049', 'CT - LEFT KNEE', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1049', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1050', 'AFB - SPUTUM', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_1050', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1051', 'RHEUMATOID FACTOR (RA), SYNOVIAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_1051', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1052', 'CT - SPINE WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_1052', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1053', 'TOTAL THYROXINE - T4', 'ACCUMAX home service test', 'Sample', '🧪', 300.00, 300.00,
JSON_ARRAY('Code: TST_1053', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1054', 'ENDOMYSIAL ANTIBODY, IgA, IFA', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_1054', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1055', 'UREA CLEARANCE', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_1055', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1056', 'HEPATITIS Be ANTIBODY (Anti-HBe)', 'ACCUMAX home service test', 'Sample', '🧪', 1375.00, 1375.00,
JSON_ARRAY('Code: TST_1056', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1057', 'HEMOGLOBINOPATHY NEWBORN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1057', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1058', 'TRANSFERRIN SATURATION', 'ACCUMAX home service test', 'Sample', '🧪', 792.00, 792.00,
JSON_ARRAY('Code: TST_1058', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1059', 'AFB - SPUTUM (3 DAYS)', 'ACCUMAX home service test', 'Sample', '🧪', 495.00, 495.00,
JSON_ARRAY('Code: TST_1059', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1060', 'GLOBULIN', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_1060', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1061', 'MRI - LUMBAR SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1061', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1062', 'U1RNP ANTIBODIES SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1062', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1063', 'MRI - CERVICAL SPINE WITH BRAIN SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1063', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1064', 'SYPHILIS SEROLOGY', 'ACCUMAX home service test', 'Sample', '🧪', 1705.00, 1705.00,
JSON_ARRAY('Code: TST_1064', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1065', 'OSMOLALITY - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 902.00, 902.00,
JSON_ARRAY('Code: TST_1065', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1066', 'SSA/Ro ANTIBODY SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_1066', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1067', 'URINE SODIUM - SPOT', 'ACCUMAX home service test', 'Sample', '🧪', 440.00, 440.00,
JSON_ARRAY('Code: TST_1067', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1068', 'HSV  II - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_1068', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1069', 'HERPES SIMPLEX VIRUS (HSV) TYPE 1, PCR, QUALITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 6380.00, 6380.00,
JSON_ARRAY('Code: TST_1069', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1070', 'CULTURE GROUP B STREPTOCOCCUS - GBS', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_1070', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1071', 'HDL CHOLESTEROL - DIRECT', 'ACCUMAX home service test', 'Sample', '🧪', 165.00, 165.00,
JSON_ARRAY('Code: TST_1071', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1072', 'MRI - BRAIN  WITH INNER EAR', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1072', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1073', 'MRI - HIP SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1073', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1074', 'HEPATITIS B VIRAL (HBV DNA) QUANTITATIVE, REAL TIME PCR', 'ACCUMAX home service test', 'Sample', '🧪', 6380.00, 6380.00,
JSON_ARRAY('Code: TST_1074', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1075', 'POTASSIUM, RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_1075', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1076', 'ISLET CELL ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_1076', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1077', 'VASCULITIS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 7150.00, 7150.00,
JSON_ARRAY('Code: TST_1077', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1078', 'UREA NITROGEN, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_1078', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1079', 'CHYLE EXAMINATION', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_1079', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1080', 'CULTURE AND SENSITIVITY - TISSUE', 'ACCUMAX home service test', 'Sample', '🧪', 950.00, 950.00,
JSON_ARRAY('Code: TST_1080', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1081', 'HERPES SIMPLEX VIRUS 1&2 - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_1081', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1082', 'BONE MARROW, IRON STAIN', 'ACCUMAX home service test', 'Sample', '🧪', 1980.00, 1980.00,
JSON_ARRAY('Code: TST_1082', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1083', 'INSULIN FASTING', 'ACCUMAX home service test', 'Sample', '🧪', 1155.00, 1155.00,
JSON_ARRAY('Code: TST_1083', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1085', 'MRI - HEAD WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1085', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1086', 'PROGESTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_1086', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1087', 'CT - PELVIS WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_1087', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1088', 'LEPTOSPIRA - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_1088', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1089', 'ULTRA SENSITIVE INSULIN - FASTING', 'ACCUMAX home service test', 'Sample', '🧪', 1310.00, 1310.00,
JSON_ARRAY('Code: TST_1089', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1090', 'X-RAY - HEEL LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_1090', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1091', 'INHIBIN B', 'ACCUMAX home service test', 'Sample', '🧪', 15400.00, 15400.00,
JSON_ARRAY('Code: TST_1091', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1092', 'X-RAY - ANKLE LATERAL VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_1092', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1093', 'RED BLOOD CELL FOLATE - RCF', 'ACCUMAX home service test', 'Sample', '🧪', 310.00, 310.00,
JSON_ARRAY('Code: TST_1093', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1094', 'GALACTOSEMIA NEWBORN SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1094', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1095', 'MRI - JOINT SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1095', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1096', 'LEBERS HEREDITARY OPTIC NEUROPATHY - LHON', 'ACCUMAX home service test', 'Sample', '🧪', 27500.00, 27500.00,
JSON_ARRAY('Code: TST_1096', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1097', 'THYROXINE BINDING GLOBULIN - TBG', 'ACCUMAX home service test', 'Sample', '🧪', 7854.00, 7854.00,
JSON_ARRAY('Code: TST_1097', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1098', 'VGKC (VOLTAGE GATED POTASSIUM CHANNEL) ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 9350.00, 9350.00,
JSON_ARRAY('Code: TST_1098', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1099', 'X-RAY - MASTOID', 'ACCUMAX home service test', 'Sample', '🧪', 1500.00, 1500.00,
JSON_ARRAY('Code: TST_1099', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1100', 'MRI - BRAIN  IC', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1100', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1101', 'THALLIUM, RANDOM URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6325.00, 6325.00,
JSON_ARRAY('Code: TST_1101', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1102', 'CT - LEFT HIP', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1102', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1103', 'CA 15.3', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1103', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1104', 'DOPAMINE - BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 4510.00, 4510.00,
JSON_ARRAY('Code: TST_1104', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1105', 'CT - THIGH', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1105', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1106', 'LUPUS ANTICOAGULANT BY DRVVT', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_1106', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1107', 'GENTAMICIN', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_1107', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1108', 'CULTURE, GONOCOCCUS', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_1108', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1109', 'LEAD, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3366.00, 3366.00,
JSON_ARRAY('Code: TST_1109', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1110', 'THALLIUM, 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_1110', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1111', 'GROUP A STREPTOCOCCAL ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_1111', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1276', 'URINE ROUTINE', 'ACCUMAX home service test', 'Sample', '🧪', 110.00, 110.00,
JSON_ARRAY('Code: TST_1276', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1113', 'EEG', 'ACCUMAX home service test', 'Sample', '🧪', 1900.00, 1900.00,
JSON_ARRAY('Code: TST_1113', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1114', 'X-RAY - KNEE A.P AND LATERAL', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1114', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1115', 'OXYGEN CONSUMPTION', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_1115', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1116', 'EPISODIC ATAXIA TYPE 2', 'ACCUMAX home service test', 'Sample', '🧪', 22000.00, 22000.00,
JSON_ARRAY('Code: TST_1116', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1117', 'HEPATITIS Be ANTIGEN (HBeAg)', 'ACCUMAX home service test', 'Sample', '🧪', 1210.00, 1210.00,
JSON_ARRAY('Code: TST_1117', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1118', 'MRI - BRAIN WITH CERVICAL SPINE SCREENING', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1118', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1119', 'HIV I RNA QUANTITATIVE PCR', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_1119', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1120', 'FRUCTOSAMINE', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_1120', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1121', 'MRI SCAN - LEFT  WRIST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1121', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1122', 'CORTISONE, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 936.00, 936.00,
JSON_ARRAY('Code: TST_1122', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1123', 'HEPATITIS B CORE ANTIBODY (Anti- HBc), TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1123', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1124', 'X-RAY - WRIST JOINT AP / LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1124', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1125', 'GRIN2A', 'ACCUMAX home service test', 'Sample', '🧪', 22000.00, 22000.00,
JSON_ARRAY('Code: TST_1125', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1126', 'ENDOMETRIOSIS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1126', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1127', 'HLA- PANEL REACTIVE IgG ANTIBODIES - SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 6490.00, 6490.00,
JSON_ARRAY('Code: TST_1127', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1128', 'MRI - HIP JOINT / BONY PELVIS', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1128', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1129', 'GALACTOMANNAN (ASPERGILLUS ANTIGEN), BRONCHOALVEOLAR LAVAGE', 'ACCUMAX home service test', 'Sample', '🧪', 0.00, 0.00,
JSON_ARRAY('Code: TST_1129', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1130', 'IMMUNE DEFICIENCY PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 2530.00, 2530.00,
JSON_ARRAY('Code: TST_1130', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1131', 'INSULIN ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1131', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1132', '5-ALPHA-DIHYDROTESTOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1132', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1133', 'INSULIN - PP', 'ACCUMAX home service test', 'Sample', '🧪', 880.00, 880.00,
JSON_ARRAY('Code: TST_1133', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1134', 'ERYTHROPOIETIN', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1134', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1135', 'IMMUNOGLOBULIN FREE LIGHT CHAINS', 'ACCUMAX home service test', 'Sample', '🧪', 330.00, 330.00,
JSON_ARRAY('Code: TST_1135', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1136', 'MALARIAL PARASITE', 'ACCUMAX home service test', 'Sample', '🧪', 385.00, 385.00,
JSON_ARRAY('Code: TST_1136', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1137', 'HEPATITIS C VIRAL (HCV RNA) QUANTITATIVE, REAL TIME PCR', 'ACCUMAX home service test', 'Sample', '🧪', 6171.00, 6171.00,
JSON_ARRAY('Code: TST_1137', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1138', 'PROTEIN S, (FREE) ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 6820.00, 6820.00,
JSON_ARRAY('Code: TST_1138', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1139', 'LACTIC ACID', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1139', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1140', 'MENORRHAGIA SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 7700.00, 7700.00,
JSON_ARRAY('Code: TST_1140', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1141', 'NMDA RECEPTOR / ANTI-GLUTAMATE ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 11770.00, 11770.00,
JSON_ARRAY('Code: TST_1141', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1142', '24 Hrs URINE MICROALBUMINURIA', 'ACCUMAX home service test', 'Sample', '🧪', 1815.00, 1815.00,
JSON_ARRAY('Code: TST_1142', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1143', 'METACHROMATIC LEUCODYSTROPHY, QUANTITATIVE', 'ACCUMAX home service test', 'Sample', '🧪', 5390.00, 5390.00,
JSON_ARRAY('Code: TST_1143', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1144', 'MRI -  LUMBO SACRAL SPINE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1144', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1145', 'MRI - HAND (RIGHT / LEFT)', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1145', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1146', 'H.PYLORI - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2400.00, 2400.00,
JSON_ARRAY('Code: TST_1146', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1147', 'LEUCOCYTE ADHESION DEFICIENCY (LAD I and II)', 'ACCUMAX home service test', 'Sample', '🧪', 4730.00, 4730.00,
JSON_ARRAY('Code: TST_1147', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1148', 'ALCOHOL, ETHYL GLUCURONIDE (ETG) QUANTITATIVE ASSAY', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1148', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1149', 'ACTIVATED PARTIAL THROMPOPLASTIN TIME - APTT', 'ACCUMAX home service test', 'Sample', '🧪', 530.00, 530.00,
JSON_ARRAY('Code: TST_1149', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1150', '24 Hrs URINE PROTEIN', 'ACCUMAX home service test', 'Sample', '🧪', 451.00, 451.00,
JSON_ARRAY('Code: TST_1150', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1151', 'OPIATES SCREEN, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3740.00, 3740.00,
JSON_ARRAY('Code: TST_1151', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1152', 'MUCOPOLYSACCHARIDOSIS (MPS) TYPE 1 (HURLER)', 'ACCUMAX home service test', 'Sample', '🧪', 750.00, 750.00,
JSON_ARRAY('Code: TST_1152', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1153', 'MRI -  EXTREMITIES WITHOUT CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1153', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1154', 'MANGANESE, RANDOM', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_1154', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1155', 'LEGIONELLA ANTIGEN, URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1155', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1156', 'AMYLASE - BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 651.00, 651.00,
JSON_ARRAY('Code: TST_1156', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1157', 'PHENOLSULFONPHTHALEIN', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_1157', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1158', '17-HYDROXYPROGESTRONE', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1158', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1159', '24 Hrs URINE PHOSPHORUS', 'ACCUMAX home service test', 'Sample', '🧪', 365.00, 365.00,
JSON_ARRAY('Code: TST_1159', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1160', '5-HYDROXY INDOLEACETIC ACID (5-HIAA), 24-HOUR URINE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1160', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1161', 'ACTIVATED PROTEIN C RESISTANCE-APC-R', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1161', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1162', '24 Hrs URINE CALCIUM', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_1162', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1163', 'ANTI CARDIOLIPIN ANTIBODY - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1353.00, 1353.00,
JSON_ARRAY('Code: TST_1163', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1164', 'ACETYL CHOLINE RECEPTOR BINDING ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 5390.00, 5390.00,
JSON_ARRAY('Code: TST_1164', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1165', 'ALDEHYDE CHOPRA TEST FOR KALA AZAR', 'ACCUMAX home service test', 'Sample', '🧪', 528.00, 528.00,
JSON_ARRAY('Code: TST_1165', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1166', 'ACETOACETATE', 'ACCUMAX home service test', 'Sample', '🧪', 980.00, 980.00,
JSON_ARRAY('Code: TST_1166', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1167', 'ARSENIC BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_1167', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1168', 'ALPHA AMINO NITROGEN - AAN', 'ACCUMAX home service test', 'Sample', '🧪', 2530.00, 2530.00,
JSON_ARRAY('Code: TST_1168', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1169', 'ANTI NMO (NEUROMYELITIS OPTICA) PANEL, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1169', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1170', 'BIOAVAILABLE TESTOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 2420.00, 2420.00,
JSON_ARRAY('Code: TST_1170', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1171', 'AMPHETAMINES CONFIRMATION', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_1171', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1172', 'ANTI HEV - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1172', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1173', 'ALUMINIUM, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1173', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1174', 'CORTICOSTERONE', 'ACCUMAX home service test', 'Sample', '🧪', 836.00, 836.00,
JSON_ARRAY('Code: TST_1174', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1175', 'ANTI HBc TOTAL', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_1175', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1176', 'ANTIBODY TO SSB/La', 'ACCUMAX home service test', 'Sample', '🧪', 5060.00, 5060.00,
JSON_ARRAY('Code: TST_1176', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1177', 'CULTURE AND SENSITIVITY - WOUND SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_1177', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1178', 'ANTI PHOSPHOLIPID ANTIBODY - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 6710.00, 6710.00,
JSON_ARRAY('Code: TST_1178', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1179', 'Anti-MOG (MYELIN OLIGODENDROCYTE GLYCOPROTEIN) ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1179', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1180', 'ANTI THROMBIN III ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 5610.00, 5610.00,
JSON_ARRAY('Code: TST_1180', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1181', 'CHROMIUM, BLOOD', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1181', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1182', '24 Hrs URINE MAGNESIUM', 'ACCUMAX home service test', 'Sample', '🧪', 1683.00, 1683.00,
JSON_ARRAY('Code: TST_1182', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1183', 'BLOOD UREA NITROGEN - BUN', 'ACCUMAX home service test', 'Sample', '🧪', 265.00, 265.00,
JSON_ARRAY('Code: TST_1183', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1184', 'ASPIRATION FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1184', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1185', 'CALCIUM EXCRETION 2 HOUR FASTING URINE', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_1185', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1186', 'CK-MB', 'ACCUMAX home service test', 'Sample', '🧪', 980.00, 980.00,
JSON_ARRAY('Code: TST_1186', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1187', 'CT - ORBIT', 'ACCUMAX home service test', 'Sample', '🧪', 3300.00, 3300.00,
JSON_ARRAY('Code: TST_1187', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1188', 'Anti-NMO (NEUROMYELITIS OPTICA) ANTIBODY / AQUAPORIN 4', 'ACCUMAX home service test', 'Sample', '🧪', 7150.00, 7150.00,
JSON_ARRAY('Code: TST_1188', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1189', 'ANGIOTENSIN CONVERTING ENZYME - ACE', 'ACCUMAX home service test', 'Sample', '🧪', 3850.00, 3850.00,
JSON_ARRAY('Code: TST_1189', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1190', 'CA 19 .9', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1190', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1191', 'ANTI INTRINSIC FACTOR', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1191', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1192', 'ALCOHOL  ETHYL SULPHATE (ETS) QUANTITATIVE ASSAY', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1192', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1193', 'CULTURE, DIPHTHERIA', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1193', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1194', 'CT - LEG', 'ACCUMAX home service test', 'Sample', '🧪', 4950.00, 4950.00,
JSON_ARRAY('Code: TST_1194', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1195', 'BETA hCG - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_1195', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1196', 'CHIMERISM, PRE-ENGRAFTMENT, DONOR AND RECIPIENT', 'ACCUMAX home service test', 'Sample', '🧪', 14300.00, 14300.00,
JSON_ARRAY('Code: TST_1196', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1197', 'AMOEBIC SEROLOGY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_1197', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1198', 'ANTI TISSUE TRANSGLUTAMINASE ANTIBODIES', 'ACCUMAX home service test', 'Sample', '🧪', 1540.00, 1540.00,
JSON_ARRAY('Code: TST_1198', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1199', 'FACTOR VIII ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 3597.00, 3597.00,
JSON_ARRAY('Code: TST_1199', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1200', 'CARDIOMETABOLIC SYNDROME PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 3630.00, 3630.00,
JSON_ARRAY('Code: TST_1200', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1201', '24 Hrs URINE PROTEIN CREATININE RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 440.00, 440.00,
JSON_ARRAY('Code: TST_1201', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1202', 'ALDOLASE - SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1573.00, 1573.00,
JSON_ARRAY('Code: TST_1202', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1203', '6-THIOGUANINE', 'ACCUMAX home service test', 'Sample', '🧪', 22000.00, 22000.00,
JSON_ARRAY('Code: TST_1203', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1204', 'CULTURE AND SENSITIVITY - THROAT SWAB', 'ACCUMAX home service test', 'Sample', '🧪', 770.00, 770.00,
JSON_ARRAY('Code: TST_1204', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1205', 'CALCIUM, IONIZED', 'ACCUMAX home service test', 'Sample', '🧪', 625.00, 625.00,
JSON_ARRAY('Code: TST_1205', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1206', 'BORRELIA IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_1206', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1207', 'CMV - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_1207', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1208', 'ANTI LIVER KIDNEY MICROSOMAL ANTIBODIES - ANTI LKM', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_1208', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1209', 'CULTURE, HAEMOPHILUS', 'ACCUMAX home service test', 'Sample', '🧪', 1507.00, 1507.00,
JSON_ARRAY('Code: TST_1209', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1210', 'ANTI GLIADIN ANTIBODY - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2640.00, 2640.00,
JSON_ARRAY('Code: TST_1210', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1211', 'GLUCOSE TOLERANCE TEST - GTT', 'ACCUMAX home service test', 'Sample', '🧪', 480.00, 480.00,
JSON_ARRAY('Code: TST_1211', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1212', 'CYSTIC FIBROSIS, NEWBORN, SCREEN', 'ACCUMAX home service test', 'Sample', '🧪', 5390.00, 5390.00,
JSON_ARRAY('Code: TST_1212', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1213', 'CA 27.29 AND CA 15.3 BREAST CANCER MARKERS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 16500.00, 16500.00,
JSON_ARRAY('Code: TST_1213', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1214', '5-AMINO LEVULINIC ACID (5-ALA), 24 HOURS URINE', 'ACCUMAX home service test', 'Sample', '🧪', 5720.00, 5720.00,
JSON_ARRAY('Code: TST_1214', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1215', 'CATECHOLAMINES - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 6050.00, 6050.00,
JSON_ARRAY('Code: TST_1215', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1216', 'CANDIDA MANNAN ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1216', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1217', 'ALBUMIN - CSF', 'ACCUMAX home service test', 'Sample', '🧪', 465.00, 465.00,
JSON_ARRAY('Code: TST_1217', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1218', 'ANTI HEV - IgM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1218', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1219', 'CT - RENAL ANGIO WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 8800.00, 8800.00,
JSON_ARRAY('Code: TST_1219', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1220', 'ANTITHROMBIN ACTIVITY, FUNCTIONAL', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1220', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1221', 'CULTURE AND SENSITIVITY - OTHERS', 'ACCUMAX home service test', 'Sample', '🧪', 970.00, 970.00,
JSON_ARRAY('Code: TST_1221', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1222', 'CARCINOID TUMOR PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 7260.00, 7260.00,
JSON_ARRAY('Code: TST_1222', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1223', 'ALPHA2-ANTIPLASMIN ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 1155.00, 1155.00,
JSON_ARRAY('Code: TST_1223', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1224', 'CULTURED AFB ANTITUBERCULAR DST, PYRAZINAMIDE', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1224', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1225', 'ENDOTOXIN', 'ACCUMAX home service test', 'Sample', '🧪', 4620.00, 4620.00,
JSON_ARRAY('Code: TST_1225', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1226', 'SERUM CREATININE', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_1226', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1227', 'ANTI HIV I -II - RAPID', 'ACCUMAX home service test', 'Sample', '🧪', 550.00, 550.00,
JSON_ARRAY('Code: TST_1227', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1228', '24 Hrs URINE  CREATININE', 'ACCUMAX home service test', 'Sample', '🧪', 198.00, 198.00,
JSON_ARRAY('Code: TST_1228', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1229', 'CYSTICERCOSIS (TAENIA SOLIUM) ANTIBODY, IgG', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_1229', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1230', 'FREE BETA - hCG', 'ACCUMAX home service test', 'Sample', '🧪', 1430.00, 1430.00,
JSON_ARRAY('Code: TST_1230', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1231', 'CAROTENE', 'ACCUMAX home service test', 'Sample', '🧪', 13200.00, 13200.00,
JSON_ARRAY('Code: TST_1231', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1232', 'CARBONDIOXIDE CONTENT', 'ACCUMAX home service test', 'Sample', '🧪', 1034.00, 1034.00,
JSON_ARRAY('Code: TST_1232', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1233', 'DILUTE RUSSELL VIPER VENOM TIME - DRVVT', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1233', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1234', 'ANDROSTENEDIONE', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_1234', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1235', 'CT - SHOULDER', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1235', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1236', 'ANTI THYROID PEROXIDASE ANTIBODIES-ANTI TPO', 'ACCUMAX home service test', 'Sample', '🧪', 3080.00, 3080.00,
JSON_ARRAY('Code: TST_1236', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1237', 'CT - BRAIN WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 5500.00, 5500.00,
JSON_ARRAY('Code: TST_1237', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1238', 'FACTOR IX ACTIVITY', 'ACCUMAX home service test', 'Sample', '🧪', 2750.00, 2750.00,
JSON_ARRAY('Code: TST_1238', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1239', 'FUNGAL SMEAR - KOH', 'ACCUMAX home service test', 'Sample', '🧪', 1012.00, 1012.00,
JSON_ARRAY('Code: TST_1239', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1240', 'LDH - PLEURAL FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 561.00, 561.00,
JSON_ARRAY('Code: TST_1240', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1241', 'CITRATE', 'ACCUMAX home service test', 'Sample', '🧪', 990.00, 990.00,
JSON_ARRAY('Code: TST_1241', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1242', 'CENTROMERE ANTIBODY SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1242', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1243', 'CYTOLOGY BODY FLUID', 'ACCUMAX home service test', 'Sample', '🧪', 970.00, 970.00,
JSON_ARRAY('Code: TST_1243', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1244', 'ALLERGIC PROFILE - VEGETARIAN FOOD', 'ACCUMAX home service test', 'Sample', '🧪', 8140.00, 8140.00,
JSON_ARRAY('Code: TST_1244', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1245', 'BETA 2 MICROGLOBULIN', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1245', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1246', '17-HYDROXYPROGESTERONE ( 17-OHP) STIMULATION BY ACTH', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1246', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1247', 'ADENOSINE DEAMINASE - ADA SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_1247', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1248', 'CA 72.4 GASTRIC CANCER MARKER', 'ACCUMAX home service test', 'Sample', '🧪', 3410.00, 3410.00,
JSON_ARRAY('Code: TST_1248', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1249', 'COVID-19 QUALITATIVE  PCR', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1249', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1250', 'ANDROSTENEDIONE STIMULATION BY ACTH, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 2805.00, 2805.00,
JSON_ARRAY('Code: TST_1250', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1251', 'ALKALINE PHOSPHATASE ( ALP) ISOENZYMES', 'ACCUMAX home service test', 'Sample', '🧪', 140.00, 140.00,
JSON_ARRAY('Code: TST_1251', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1252', 'ANTI B TITRE, IgM', 'ACCUMAX home service test', 'Sample', '🧪', 1045.00, 1045.00,
JSON_ARRAY('Code: TST_1252', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1253', 'AMIKACIN LEVEL', 'ACCUMAX home service test', 'Sample', '🧪', 17600.00, 17600.00,
JSON_ARRAY('Code: TST_1253', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1254', 'CT - BOTH HEEL', 'ACCUMAX home service test', 'Sample', '🧪', 6600.00, 6600.00,
JSON_ARRAY('Code: TST_1254', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1255', 'BETA CROSSLAPS (BETA CTx),', 'ACCUMAX home service test', 'Sample', '🧪', 2310.00, 2310.00,
JSON_ARRAY('Code: TST_1255', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1256', 'CULTURED AFB ANTITUBERCULAR DST, 4 DRUGS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 26400.00, 26400.00,
JSON_ARRAY('Code: TST_1256', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1257', 'ANION GAP', 'ACCUMAX home service test', 'Sample', '🧪', 660.00, 660.00,
JSON_ARRAY('Code: TST_1257', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1258', 'CADMIUM', 'ACCUMAX home service test', 'Sample', '🧪', 6732.00, 6732.00,
JSON_ARRAY('Code: TST_1258', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1259', 'CULTURED ANAEROBIC BACTERIA IDENTIFICATION', 'ACCUMAX home service test', 'Sample', '🧪', 1650.00, 1650.00,
JSON_ARRAY('Code: TST_1259', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1260', 'ANTI SMITH ANTIBODY', 'ACCUMAX home service test', 'Sample', '🧪', 2970.00, 2970.00,
JSON_ARRAY('Code: TST_1260', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1261', 'DOPPLER STUDY - BOTH LOWER LIMB ARTERIES', 'ACCUMAX home service test', 'Sample', '🧪', 4290.00, 4290.00,
JSON_ARRAY('Code: TST_1261', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1262', 'EBV - IgG', 'ACCUMAX home service test', 'Sample', '🧪', 3190.00, 3190.00,
JSON_ARRAY('Code: TST_1262', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1263', 'FREE PSA', 'ACCUMAX home service test', 'Sample', '🧪', 1100.00, 1100.00,
JSON_ARRAY('Code: TST_1263', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1264', 'FREE PROTEIN S ANTIGEN', 'ACCUMAX home service test', 'Sample', '🧪', 5940.00, 5940.00,
JSON_ARRAY('Code: TST_1264', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1265', 'AFB - URINE', 'ACCUMAX home service test', 'Sample', '🧪', 350.00, 350.00,
JSON_ARRAY('Code: TST_1265', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1266', 'A/G RATIO', 'ACCUMAX home service test', 'Sample', '🧪', 275.00, 275.00,
JSON_ARRAY('Code: TST_1266', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1267', 'BORRELIA IgG', 'ACCUMAX home service test', 'Sample', '🧪', 1760.00, 1760.00,
JSON_ARRAY('Code: TST_1267', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1268', 'CORTISOL SUPPRESSION BY DEXAMETHASONE, OVERNIGHT HIGH DOSE, SERUM', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1268', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1269', 'CRYOGLOBULINS PANEL', 'ACCUMAX home service test', 'Sample', '🧪', 1320.00, 1320.00,
JSON_ARRAY('Code: TST_1269', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1270', 'CT - PARA NASAL SINUSES WITH CONTRAST', 'ACCUMAX home service test', 'Sample', '🧪', 4400.00, 4400.00,
JSON_ARRAY('Code: TST_1270', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1271', 'DNPH', 'ACCUMAX home service test', 'Sample', '🧪', 760.00, 760.00,
JSON_ARRAY('Code: TST_1271', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1272', 'ESTRONE', 'ACCUMAX home service test', 'Sample', '🧪', 8030.00, 8030.00,
JSON_ARRAY('Code: TST_1272', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1273', 'ADENOVIRUS ANTIGEN FOR GASTROENTERITIS', 'ACCUMAX home service test', 'Sample', '🧪', 9900.00, 9900.00,
JSON_ARRAY('Code: TST_1273', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1274', '24 Hrs URINE POTASSIUM', 'ACCUMAX home service test', 'Sample', '🧪', 650.00, 650.00,
JSON_ARRAY('Code: TST_1274', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1275', 'ABSOLUTE BASOPHIL COUNT', 'ACCUMAX home service test', 'Sample', '🧪', 180.00, 180.00,
JSON_ARRAY('Code: TST_1275', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1285', 'URINE POTASSIUM', 'ACCUMAX home service test', 'Sample', '🧪', 300.00, 300.00,
JSON_ARRAY('Code: TST_1285', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1286', 'AUDIOMETRY', 'ACCUMAX home service test', 'Sample', '🧪', 700.00, 700.00,
JSON_ARRAY('Code: TST_1286', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1287', 'EYE EXAMINATION', 'ACCUMAX home service test', 'Sample', '🧪', 400.00, 400.00,
JSON_ARRAY('Code: TST_1287', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1337', 'x ray pelvis and both hips AP/LAT view', 'ACCUMAX home service test', 'Sample', '🧪', 2200.00, 2200.00,
JSON_ARRAY('Code: TST_1337', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1338', 'hand AP/LAT view', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1338', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1339', 'STOOL CULOSTRIDIUM DIFFICILE TOXIN', 'ACCUMAX home service test', 'Sample', '🧪', 4500.00, 4500.00,
JSON_ARRAY('Code: TST_1339', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1340', 'LEG AP/LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1340', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1341', 'LEG WITH ANKEL AP/LAT VIEW', 'ACCUMAX home service test', 'Sample', '🧪', 2000.00, 2000.00,
JSON_ARRAY('Code: TST_1341', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1342', 'SERUM LACTATE', 'ACCUMAX home service test', 'Sample', '🧪', 970.00, 970.00,
JSON_ARRAY('Code: TST_1342', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1343', 'Urine CBNAAT', 'ACCUMAX home service test', 'Sample', '🧪', 2300.00, 2300.00,
JSON_ARRAY('Code: TST_1343', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1344', 'Ziehl-Neelsen staining', 'ACCUMAX home service test', 'Sample', '🧪', 950.00, 950.00,
JSON_ARRAY('Code: TST_1344', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1345', 'An anaerobic culture', 'ACCUMAX home service test', 'Sample', '🧪', 1400.00, 1400.00,
JSON_ARRAY('Code: TST_1345', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1346', 'Aerobic culture', 'ACCUMAX home service test', 'Sample', '🧪', 1400.00, 1400.00,
JSON_ARRAY('Code: TST_1346', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1347', 'HIV viral load', 'ACCUMAX home service test', 'Sample', '🧪', 7260.00, 7260.00,
JSON_ARRAY('Code: TST_1347', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1348', 'CD4', 'ACCUMAX home service test', 'Sample', '🧪', 2180.00, 2180.00,
JSON_ARRAY('Code: TST_1348', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1349', 'serum phosphate', 'ACCUMAX home service test', 'Sample', '🧪', 450.00, 450.00,
JSON_ARRAY('Code: TST_1349', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1350', 'culture and sensitivity aerobic ( wound swab)', 'ACCUMAX home service test', 'Sample', '🧪', 1400.00, 1400.00,
JSON_ARRAY('Code: TST_1350', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

INSERT IGNORE INTO home_service_tests
(category_id, test_code, test_name, subtitle, sample_type, icon, price, old_price, features, instructions, fasting_required, fasting_hours)
SELECT id, 'TST_1351', 'QUANTU 4B PACK BREAKFAST/LUNCH', 'ACCUMAX home service test', 'Sample', '🧪', 100.00, 100.00,
JSON_ARRAY('Code: TST_1351', 'ACCUMAX test'),
JSON_ARRAY('Home collection available', 'No fasting unless advised'),
FALSE, 0
FROM home_service_categories WHERE category_code = 'accumax_home_service_tests';

COMMIT;

-- Inserted 1333 ACCUMAX investigation/home-service test rows only.
