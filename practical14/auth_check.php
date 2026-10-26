<?php
// auth_check.php - Role-Based Access Control Helper
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ૧. જો યુઝર લોગિન ન હોય તો લોગિન પેજ પર રીડાયરેક્ટ કરો
function require_login() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: login.php");
        exit;
    }
}

// ૨. ફક્ત એડમિન માટે જ એક્સેસ માન્ય રાખો (Non-admin માટે 403 Forbidden પેજ)
function require_admin() {
    require_login();
    if ($_SESSION['role'] !== 'admin') {
        http_response_code(403);
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>403 Forbidden</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light d-flex align-items-center justify-content-center vh-100">
            <div class="card p-4 shadow-sm text-center" style="max-width: 450px;">
                <h1 class="display-3 text-danger fw-bold">403</h1>
                <h3 class="mb-3">Access Forbidden</h3>
                <p class="text-muted">You do not have administrative privileges to access this dashboard.</p>
                <div>
                    <a href="dashboard.php" class="btn btn-outline-primary btn-sm">Back</a>
                    <a href="logout.php" class="btn btn-danger btn-sm">Logout</a>
                </div>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}