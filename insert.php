<?php
require_once "db.php";

$name = "Neha";
$email = "neha123@gmail.com";
$department = "CSE";
$semester = 3;

// Tamara studenthub_pr8 table ma department ane semester columns che etle ema insert kariye
$sql = "INSERT INTO students (name, email, department, semester) VALUES (?, ?, ?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$name, $email, $department, $semester]);

echo "Student Added Successfully";
?>