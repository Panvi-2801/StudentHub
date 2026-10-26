<?php
session_start();
require_once __DIR__ . '/db.php';

$error = "";

if (isset($_GET['error'])) {
    if ($_GET['error'] === 'invalid') $error = "Invalid email or password.";
    if ($_GET['error'] === 'timeout') $error = "Session timed out. Please login again.";
    if ($_GET['error'] === 'unauthorized') $error = "Unauthorized Access: Access Denied.";
    if ($_GET['error'] === 'denied') $error = "Dashboard access denied. Please login.";
}

if (isset($_POST['login'])) {
    $email    = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = mysqli_prepare($conn, "SELECT id, username, email, password, role FROM users WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $res  = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($res);

    if ($user && password_verify($password, $user['password'])) {
        session_regenerate_id(true);

        $_SESSION['user_id']       = $user['id'];
        $_SESSION['user_name']     = $user['username'];
        $_SESSION['user_role']     = $user['role'];
        $_SESSION['role']          = $user['role'];
        $_SESSION['last_activity'] = time();

        if (strtolower($user['role']) === 'admin') {
            header("Location: admin_dashboard.php");
            exit();
        } else {
            header("Location: student_dashboard.php");
            exit();
        }
    } else {
        header("Location: login.php?error=invalid");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>StudentHub - Secure Login</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .box { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 340px; }
        h2 { text-align: center; margin-top: 0; color: #1e293b; }
        label { font-size: 14px; font-weight: bold; color: #475569; }
        input { width: 100%; padding: 10px; margin: 8px 0 16px 0; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
        button:hover { background: #1d4ed8; }
        .err { color: #dc2626; margin-bottom: 12px; font-size: 14px; text-align: center; background: #fee2e2; padding: 8px; border-radius: 4px; }
        .msg { color: #16a34a; margin-bottom: 12px; font-size: 14px; text-align: center; background: #dcfce7; padding: 8px; border-radius: 4px; }
    </style>
</head>
<body>

<div class="box">
    <h2>Secure Login</h2>
    <?php if ($error) echo "<div class='err'>" . htmlspecialchars($error) . "</div>"; ?>
    <?php if (isset($_GET['msg']) && $_GET['msg'] === 'logged_out') echo "<div class='msg'>Successfully logged out.</div>"; ?>

    <form method="POST">
        <label>Email Address:</label>
        <input type="email" name="email" placeholder="admin01@gmail.com" required>

        <label>Password:</label>
        <input type="password" name="password" placeholder="admin123" required>

        <button type="submit" name="login">Login</button>
    </form>
</div>

</body>
</html>