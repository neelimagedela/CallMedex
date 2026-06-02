CREATE TABLE IF NOT EXISTS consultancy_home_services (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  service_code VARCHAR(80) UNIQUE NOT NULL,
  service_name VARCHAR(150) NOT NULL,
  service_group VARCHAR(80) NOT NULL,
  description VARCHAR(255) NULL,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultancy_home_bookings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  receipt_id VARCHAR(40) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  patient_public_id VARCHAR(50) NOT NULL,
  patient_name VARCHAR(150) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  patient_email VARCHAR(120) NOT NULL,
  patient_address TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_status ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_consultancy_home_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consultancy_home_booking_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT NOT NULL,
  service_id BIGINT NOT NULL,
  service_name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT DEFAULT 1,
  line_total DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_ch_booking
    FOREIGN KEY (booking_id) REFERENCES consultancy_home_bookings(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ch_service
    FOREIGN KEY (service_id) REFERENCES consultancy_home_services(id)
    ON DELETE RESTRICT
);

INSERT INTO consultancy_home_services
(service_code, service_name, service_group, description, price, sort_order)
VALUES
('general_consultation_home','General Consultation at Home','Doctor','Doctor home visit and basic health consultation',800,1),
('specialist_doctor_home','Specialist Doctor at Home','Doctor','Specialist consultation at patient home',800,2),
('elderly_care_home','Elderly Care','Doctor','Elderly home checkup and vitals monitoring',800,3),
('post_hospital_followup','Post-Hospital Follow-up','Doctor','Post-discharge recovery and mobility check',800,4),
('mother_child_care','Mother & Child Care','Doctor','Mother, child and newborn basic consultation',800,5),
('nursing_support','Nursing Support','Nursing','Basic nursing service at home',800,6),
('mental_health_home','Mental Health Consultation','Mental Health','Counselling and mental health consultation',800,7),
('emergency_initial_assessment','Emergency Initial Assessment','Emergency','First-level urgent home assessment',800,8),
('physio_consultation','Physiotherapy Consultation','Physiotherapy','Physiotherapy home visit consultation',800,9),
('home_advice_only','Home Advice Only','Physiotherapy','Home advice and recovery guidance',750,10),
('general_exercise_training','Teaching & Training Exercises','Physiotherapy','Teaching and training exercises for general cases',900,11),
('sports_fitness','Sports Fitness & Game-Specific Exercises','Physiotherapy','Sports fitness and game-specific exercises',1000,12),
('ortho_rehab','Orthopedic Rehabilitation','Physiotherapy','Ligament, fracture, dislocation, TKR and THR rehabilitation',1000,13),
('neuro_rehab_900','Neuro Rehabilitation Basic','Physiotherapy','Cerebral palsy, autistic and partial paralysis post-stroke rehab',900,14),
('neuro_rehab_1000','Neuro Rehabilitation Advanced','Physiotherapy','Total paralysis, nerve injuries, GBS, MG, Parkinsons, ALS cases',1000,15),
('pain_radiculopathy','Pain & Radiculopathy Care','Physiotherapy','Osteoarthritis, RA, back ache, neck pain and radiculopathy care',1000,16)
ON DUPLICATE KEY UPDATE
service_name = VALUES(service_name),
service_group = VALUES(service_group),
description = VALUES(description),
price = VALUES(price),
is_active = TRUE,
sort_order = VALUES(sort_order);