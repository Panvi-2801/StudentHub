<?php
// login.php - Login Screen & Role Assignment
session_start();
require_once 'db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $role_choice = $_POST['role_choice'] ?? '';

    // ડેમો અને ટેસ્ટિંગ માટે યુઝર ઇમેઇલ પરથી સરળ સીધો લોગિન
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['role'] = $user['role'];

        // જો એડમિન લોગિન થાય તો Audit Log માં એન્ટ્રી કરો
        if ($user['role'] === 'admin') {
            log_audit_action($pdo, $user['id'], "Admin logged into the portal.");
        }

        header("Location: dashboard.php");
        exit;
    } else {
        $error = "User not found with this email.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Portal Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center vh-100">

<div class="card shadow-sm p-4" style="width: 400px;">
    <h3 class="text-center mb-3 text-primary">Portal Login</h3>
    
    <?php if ($error): ?>
        <div class="alert alert-danger py-2"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <div class="mb-3">
            <label class="form-label">Select User Account to Test:</label>
            <select name="email" class="form-select" required>
                <option value="admin@test.com">Admin (admin@test.com)</option>
                <option value="john@test.com">Student (john@test.com)</option>
                <option value="user@test.com">Regular User (user@test.com)</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </form>
</div>

</body>
</html>