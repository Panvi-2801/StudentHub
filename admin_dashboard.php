<?php
session_start();
require_once __DIR__ . '/db.php';

// 403 Access Forbidden Security Check
$current_role = $_SESSION['role'] ?? $_SESSION['user_role'] ?? null;

if (!$current_role || strtolower($current_role) !== 'admin') {
    http_response_code(403);
    echo '<!DOCTYPE html>
    <html lang="en">
    <head><title>403 Forbidden</title></head>
    <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 50px;">
        <div style="max-width: 550px; margin: auto; background: white; border-left: 6px solid #dc2626; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-top: 0;">403 Forbidden - Access Denied</h2>
            <p style="color: #475569;">You do not have administrative privileges to view this page.</p>
            <a href="login.php" style="display: inline-block; padding: 8px 16px; background: #dc2626; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Return to Login</a>
        </div>
    </body>
    </html>';
    exit();
}

// Fallback metrics (બિના ક્રેશ થયા કાઉન્ટ્સ ફેચ કરશે)
$user_count = 0;
$student_count = 0;
$event_count = 3; 

$u_res = @mysqli_query($conn, "SELECT COUNT(*) AS total FROM users");
if ($u_res) { $user_count = mysqli_fetch_assoc($u_res)['total'] ?? 0; }

$s_res = @mysqli_query($conn, "SELECT COUNT(*) AS total FROM studenthub_pr8.students");
if (!$s_res) {
    $s_res = @mysqli_query($conn, "SELECT COUNT(*) AS total FROM students");
}
if ($s_res) { $student_count = mysqli_fetch_assoc($s_res)['total'] ?? 0; }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - StudentHub</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 30px; }
        .header { display: flex; justify-content: space-between; align-items: center; background: white; padding: 20px 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .grid { display: flex; gap: 20px; margin-top: 25px; }
        .card { flex: 1; background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border-top: 4px solid #2563eb; }
        .card h3 { margin: 0; color: #64748b; font-size: 14px; text-transform: uppercase; }
        .card p { font-size: 32px; font-weight: bold; margin: 10px 0 0 0; color: #0f172a; }
        .btn-logout { background: #ef4444; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-weight: bold; }
    </style>
</head>
<body>

<div class="header">
    <h2>Admin Dashboard (StudentHub Portal)</h2>
    <div>
        <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['user_name'] ?? 'Admin'); ?></strong> | </span>
        <a href="logout.php" class="btn-logout">Logout</a>
    </div>
</div>

<div class="grid">
    <div class="card">
        <h3>Total Users</h3>
        <p><?php echo $user_count; ?></p>
    </div>
    <div class="card" style="border-top-color: #10b981;">
        <h3>Registered Students</h3>
        <p><?php echo $student_count; ?></p>
    </div>
    <div class="card" style="border-top-color: #f59e0b;">
        <h3>Active Events</h3>
        <p><?php echo $event_count; ?></p>
    </div>
</div>

</body>
</html>