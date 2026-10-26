CREATE DATABASE IF NOT EXISTS admin_portal;
USE admin_portal;

-- 1. Users Table (Role-based: admin, student, user)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 4. Audit Logs Table (Checklist requirement)
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testing Data
-- Default passwords for testing: 'admin123' and 'user123'
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@test.com', '$2y$10$w0uN2z3T1Lg2J5YqXG3MzeZ1J4T.kE1J3L7XJ9M5L1A1D2C3E4F5G', 'admin'),
('John Student', 'john@test.com', '$2y$10$w0uN2z3T1Lg2J5YqXG3MzeZ1J4T.kE1J3L7XJ9M5L1A1D2C3E4F5G', 'student'),
('Alice Student', 'alice@test.com', '$2y$10$w0uN2z3T1Lg2J5YqXG3MzeZ1J4T.kE1J3L7XJ9M5L1A1D2C3E4F5G', 'student'),
('Regular User', 'user@test.com', '$2y$10$w0uN2z3T1Lg2J5YqXG3MzeZ1J4T.kE1J3L7XJ9M5L1A1D2C3E4F5G', 'user');

INSERT INTO events (title, venue, event_date) VALUES
('AI & Robotics Summit', 'Auditorium A', '2026-11-10'),
('Annual Hackathon 2026', 'Lab 4', '2026-11-18'),
('Web Dev Workshop', 'Seminar Hall', '2026-12-05');

INSERT INTO registrations (user_id, event_id) VALUES
(2, 1),
(3, 1),
(2, 2);