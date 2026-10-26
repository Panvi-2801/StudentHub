<?php

require_once "db.php";

echo "<h1>StudentHub Database Connection</h1>";

echo "<p style='color: green; font-weight: bold;'>Database connected successfully!</p>";

echo "<h2>Students</h2>";

$stmt = $pdo->prepare("SELECT * FROM students");
$stmt->execute();

$students = $stmt->fetchAll();

echo "<table border='1' cellpadding='10' cellspacing='0'>";

echo "<tr>";
echo "<th>Student ID</th>";
echo "<th>Name</th>";
echo "<th>Email</th>";
echo "<th>Department</th>";
echo "<th>Semester</th>";
echo "</tr>";

foreach ($students as $student) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($student['student_id']) . "</td>";
    echo "<td>" . htmlspecialchars($student['name']) . "</td>";
    echo "<td>" . htmlspecialchars($student['email']) . "</td>";
    echo "<td>" . htmlspecialchars($student['department']) . "</td>";
    echo "<td>" . htmlspecialchars($student['semester']) . "</td>";
    echo "</tr>";
}

echo "</table>";

echo "<h2>Events</h2>";

$stmt = $pdo->prepare("SELECT * FROM events");
$stmt->execute();

$events = $stmt->fetchAll();

echo "<table border='1' cellpadding='10' cellspacing='0'>";

echo "<tr>";
echo "<th>Event ID</th>";
echo "<th>Event Name</th>";
echo "<th>Event Date</th>";
echo "<th>Venue</th>";
echo "</tr>";

foreach ($events as $event) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($event['event_id']) . "</td>";
    echo "<td>" . htmlspecialchars($event['event_name']) . "</td>";
    echo "<td>" . htmlspecialchars($event['event_date']) . "</td>";
    echo "<td>" . htmlspecialchars($event['venue']) . "</td>";
    echo "</tr>";
}

echo "</table>";

echo "<h2>Registrations</h2>";

$stmt = $pdo->prepare("
    SELECT 
        registrations.registration_id,
        students.name,
        events.event_name,
        registrations.registration_date
    FROM registrations
    INNER JOIN students
        ON registrations.student_id = students.student_id
    INNER JOIN events
        ON registrations.event_id = events.event_id
");

$stmt->execute();

$registrations = $stmt->fetchAll();

echo "<table border='1' cellpadding='10' cellspacing='0'>";

echo "<tr>";
echo "<th>Registration ID</th>";
echo "<th>Student Name</th>";
echo "<th>Event Name</th>";
echo "<th>Registration Date</th>";
echo "</tr>";

foreach ($registrations as $registration) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($registration['registration_id']) . "</td>";
    echo "<td>" . htmlspecialchars($registration['name']) . "</td>";
    echo "<td>" . htmlspecialchars($registration['event_name']) . "</td>";
    echo "<td>" . htmlspecialchars($registration['registration_date']) . "</td>";
    echo "</tr>";
}

echo "</table>";

?>