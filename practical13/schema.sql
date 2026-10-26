CREATE DATABASE IF NOT EXISTS event_db;
USE event_db;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    venue VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testing માટે 2 sample records
INSERT INTO events (title, venue, event_date) VALUES
('Tech Symposium 2026', 'Auditorium A', '2026-11-15'),
('Code Sprint Hackathon', 'Lab 3', '2026-11-20');