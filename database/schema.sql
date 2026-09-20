
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE labs (
    lab_id INT PRIMARY KEY AUTO_INCREMENT,
    lab_name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(100),
    status VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE tests (
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    test_name VARCHAR(150) NOT NULL,
    description TEXT,
    preparation_instructions TEXT,
    price DECIMAL(10,2),
    fasting_required BOOLEAN DEFAULT FALSE,
    available BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    lab_id INT NOT NULL,
    test_id INT NOT NULL,
    booking_date DATE,
    booking_time TIME,
    collection_type VARCHAR(30),
    technician_name VARCHAR(100),
    booking_status VARCHAR(30),
    sample_status VARCHAR(30),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (lab_id) REFERENCES labs(lab_id),
    FOREIGN KEY (test_id) REFERENCES tests(test_id)
);
CREATE TABLE reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT UNIQUE NOT NULL,
    report_date DATETIME,
    report_file VARCHAR(255),
    report_status VARCHAR(30),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);
CREATE TABLE test_results (
    result_id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT NOT NULL,
    parameter_name VARCHAR(100),
    result_value DECIMAL(10,2),
    unit VARCHAR(30),
    reference_range VARCHAR(100),
    trend VARCHAR(20),
    critical_status VARCHAR(30),

    FOREIGN KEY (report_id) REFERENCES reports(report_id)
);
CREATE TABLE follow_ups (
    followup_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    report_id INT NOT NULL,
    recommended_test_id INT,
    followup_date DATE,
    reminder_date DATE,
    status VARCHAR(30),
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (report_id) REFERENCES reports(report_id),
    FOREIGN KEY (recommended_test_id) REFERENCES tests(test_id)
);
INSERT INTO patients (name, email, password, phone)
VALUES
('Arun Kumar', 'arun@gmail.com', 'Arun@123', '9876543210'),
('Priya', 'priya@gmail.com', 'Priya@123', '9876543211'),
('Karthik', 'karthik@gmail.com', 'Karthik@123', '9876543212');
INSERT INTO labs (lab_name, address, phone, email, status)
VALUES
('Apollo Diagnostics', 'Chennai', '04412345678', 'apollo@gmail.com', 'ACTIVE'),
('Dr Lal PathLabs', 'Coimbatore', '04221234567', 'lalpath@gmail.com', 'ACTIVE'),
('Sri Lab', 'Trichy', '04311234567', 'srilab@gmail.com', 'ACTIVE');

INSERT INTO tests
(test_name, description, preparation_instructions, price, fasting_required, available)
VALUES
('Complete Blood Count', 'Measures different blood cells', 'No special preparation required', 350.00, FALSE, TRUE),
('Blood Sugar', 'Measures blood glucose level', 'Fast for 8 hours before test', 150.00, TRUE, TRUE),
('Lipid Profile', 'Measures cholesterol levels', 'Fast for 9 to 12 hours before test', 600.00, TRUE, TRUE),
('Thyroid Profile', 'Measures thyroid hormones', 'No special preparation required', 500.00, FALSE, TRUE);

INSERT INTO bookings
(patient_id, lab_id, test_id, booking_date, booking_time,
 collection_type, technician_name, booking_status, sample_status)
VALUES
(1, 1, 1, '2026-08-10', '09:00:00',
 'LAB', 'Ravi', 'CONFIRMED', 'COLLECTED'),

(2, 2, 2, '2026-08-11', '10:30:00',
 'HOME', 'Suresh', 'CONFIRMED', 'PENDING'),

(3, 3, 3, '2026-08-12', '11:00:00',
 'LAB', 'Manoj', 'COMPLETED', 'PROCESSED');
 
 INSERT INTO reports
(booking_id, report_date, report_file, report_status)
VALUES
(1, '2026-08-10 15:30:00', 'report_001.pdf', 'AVAILABLE'),

(3, '2026-08-12 16:00:00', 'report_003.pdf', 'AVAILABLE');

INSERT INTO test_results
(report_id, parameter_name, result_value, unit, reference_range, trend, critical_status)
VALUES
(1, 'Hemoglobin', 14.20, 'g/dL', '13.0-17.0', 'NORMAL', 'NORMAL'),

(1, 'WBC', 7200.00, 'cells/mcL', '4000-11000', 'NORMAL', 'NORMAL'),

(2, 'Total Cholesterol', 185.00, 'mg/dL', 'Below 200', 'NORMAL', 'NORMAL');

INSERT INTO follow_ups
(patient_id, report_id, recommended_test_id,
 followup_date, reminder_date, status, notes)
VALUES
(1, 1, 3, '2026-09-10', '2026-09-05',
 'PENDING', 'Repeat lipid profile test after one month'),

(3, 2, 2, '2026-09-12', '2026-09-07',
 'PENDING', 'Follow-up blood sugar test recommended');
 
SELECT * FROM patients;
SELECT * FROM labs;
SELECT * FROM tests;
SELECT * FROM bookings;
SELECT * FROM reports;
SELECT * FROM test_results;
SELECT * FROM follow_ups;
