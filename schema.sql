CREATE DATABASE IF NOT EXISTS studenthub_pr8;

USE studenthub_pr8;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    semester INT NOT NULL
);

CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    venue VARCHAR(100) NOT NULL
);

CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

INSERT INTO students (name, email, department, semester)
VALUES
('Panvi Patel', 'panvi@gmail.com', 'CSE', 3),
('Rahul Patel', 'rahul@gmail.com', 'CSE', 3),
('Neha Shah', 'neha@gmail.com', 'IT', 3);

INSERT INTO events (event_name, event_date, venue)
VALUES
('Tech Fest', '2026-10-15', 'CHARUSAT Auditorium'),
('Coding Competition', '2026-10-20', 'Computer Lab'),
('AI Workshop', '2026-10-25', 'Seminar Hall');

INSERT INTO registrations (student_id, event_id, registration_date)
VALUES
(1, 1, '2026-10-03'),
(1, 2, '2026-10-03'),
(2, 1, '2026-10-03'),
(3, 3, '2026-10-03');