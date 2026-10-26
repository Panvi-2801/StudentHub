<?php
// admin_only.php - Restricted to Admins only
require_once 'auth_check.php';
require_once 'db.php';

// માત્ર એડમિન જ ખોલી શકશે; નહિતર 403 Forbidden આવશે
require_admin();

log_audit_action($pdo, $_SESSION['user_id'], "Admin accessed Restricted Security Settings.");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Security Area</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container py-5">
    <div class="alert alert-success">
        <h4><i class="bi bi-shield-check"></i> Welcome, Admin!</h4>
        <p>This is a protected administrative configuration area. Non-admins cannot see this.</p>
        <a href="dashboard.php" class="btn btn-primary btn-sm">Back to Dashboard</a>
    </div>
</body>
</html>