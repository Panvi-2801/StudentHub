<?php
// db.php - Database Connection & Audit Log Logger

$host = 'localhost';
$db   = 'admin_portal';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Function to log admin actions into audit_logs table
function log_audit_action($pdo, $user_id, $action) {
    try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $stmt = $pdo->prepare("INSERT INTO audit_logs (user_id, action, ip_address) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $action, $ip]);
    } catch (Exception $e) {
        // Fail silently or handle error so main operation is not blocked
        error_log("Audit log failed: " . $e->getMessage());
    }
}