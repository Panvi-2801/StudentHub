<?php
$host     = "localhost";
$username = "root";
$password = "";
$database = "studenthub"; 

// 1. MySQLi Connection
$conn = mysqli_connect($host, $username, $password, $database);
if (!$conn) {
    die("MySQLi Connection failed: " . mysqli_connect_error());
}

// 2. PDO Connection (Security & Prepared Statements mate)
try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    die("PDO Connection failed: " . $e->getMessage());
}
?>