CREATE TABLE IF NOT EXISTS pharmacy_medicines (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  medicine_name VARCHAR(150) NOT NULL,
  generic_name VARCHAR(150) NULL,
  brand_name VARCHAR(150) NULL,

  medicine_type ENUM(
    'tablet',
    'capsule',
    'syrup',
    'injection',
    'ointment',
    'other'
  ) DEFAULT 'tablet',

  strength VARCHAR(50) NULL,

  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,

  requires_prescription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_pharmacy_medicine_name_strength_brand (
    medicine_name,
    strength,
    brand_name
  )
);

CREATE TABLE IF NOT EXISTS pharmacy_orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  public_order_id VARCHAR(40) UNIQUE NOT NULL,

  user_id BIGINT NOT NULL,

  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(100) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,

  delivery_address TEXT NOT NULL,
  city VARCHAR(100) NULL,
  state VARCHAR(100) NULL,
  pincode VARCHAR(10) NULL,

  subtotal_amount DECIMAL(10,2) NOT NULL,
  delivery_charge DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL,

  status ENUM(
    'pending',
    'confirmed',
    'packed',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'completed'
  ) DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_pharmacy_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pharmacy_order_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  order_id BIGINT NOT NULL,
  medicine_id BIGINT NOT NULL,

  medicine_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_pharmacy_order_items_order
    FOREIGN KEY (order_id) REFERENCES pharmacy_orders(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_pharmacy_order_items_medicine
    FOREIGN KEY (medicine_id) REFERENCES pharmacy_medicines(id)
    ON DELETE RESTRICT
);

INSERT IGNORE INTO pharmacy_medicines
(medicine_name, generic_name, brand_name, medicine_type, strength, price, stock_quantity, requires_prescription)
VALUES
('Paracetamol 500mg', 'Paracetamol', 'Generic', 'tablet', '500mg', 20.00, 100, FALSE),
('Dolo 650', 'Paracetamol', 'Dolo', 'tablet', '650mg', 35.00, 100, FALSE),
('Cetirizine 10mg', 'Cetirizine', 'Generic', 'tablet', '10mg', 18.00, 80, FALSE),
('Azithromycin 500mg', 'Azithromycin', 'Generic', 'tablet', '500mg', 90.00, 50, TRUE),
('Amoxicillin 500mg', 'Amoxicillin', 'Generic', 'capsule', '500mg', 75.00, 60, TRUE),
('Pantoprazole 40mg', 'Pantoprazole', 'Generic', 'tablet', '40mg', 45.00, 90, FALSE),
('Metformin 500mg', 'Metformin', 'Generic', 'tablet', '500mg', 30.00, 120, TRUE),
('Aspirin 75mg', 'Aspirin', 'Generic', 'tablet', '75mg', 25.00, 70, FALSE),
('ORS Sachet', 'Oral Rehydration Salts', 'Generic', 'other', '21g', 15.00, 150, FALSE),
('Vitamin C Tablet', 'Ascorbic Acid', 'Generic', 'tablet', '500mg', 40.00, 100, FALSE);

