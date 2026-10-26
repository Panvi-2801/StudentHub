<?php
session_start();
$current_role = $_SESSION['role'] ?? $_SESSION['user_role'] ?? null;

if (!$current_role) {
    header("Location: login.php?error=unauthorized");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Dashboard - StudentHub</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f8fafc; padding: 30px; }
        .box { background: white; padding: 25px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .btn { display: inline-block; padding: 8px 14px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="box">
        <h2>Welcome Student, <?php echo htmlspecialchars($_SESSION['user_name'] ?? 'Student'); ?>!</h2>
        <p>You have student level permissions. You cannot access Admin routes.</p>
        <a href="admin_dashboard.php" class="btn" style="background: #dc2626;">Test Admin Route (403 Security Check)</a>
        <a href="logout.php" class="btn" style="background: #64748b;">Logout</a>
    </div>
</body>
</html>