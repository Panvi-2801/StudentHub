<?php
include 'db.php';

mysqli_query($conn, "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
)");

$admin_pass   = password_hash("admin123", PASSWORD_BCRYPT);
$student_pass = password_hash("student123", PASSWORD_BCRYPT);

mysqli_query($conn, "INSERT IGNORE INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$admin_pass', 'admin'),
('Panvi Patel', 'panvi.patel@example.com', '$student_pass', 'student')");

echo "Users setup complete. Admin: admin@example.com / admin123 | Student: panvi.patel@example.com / student123";
?>