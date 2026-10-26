<?php
require_once __DIR__ . '/db.php';

$email    = 'admin01@gmail.com';
$password = 'admin123';
$hashed   = password_hash($password, PASSWORD_DEFAULT);

$stmt = mysqli_prepare($conn, "UPDATE users SET password = ? WHERE email = ?");
mysqli_stmt_bind_param($stmt, "ss", $hashed, $email);

if (mysqli_stmt_execute($stmt)) {
    echo "<h2 style='color: green;'>Password successfully updated!</h2>";
    echo "<p>Email: <b>admin01@gmail.com</b></p>";
    echo "<p>Password: <b>admin123</b></p>";
    echo "<a href='login.php'>Go to Login</a>";
} else {
    echo "Error updating password: " . mysqli_error($conn);
}
?>