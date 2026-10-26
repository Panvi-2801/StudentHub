<?php
// dashboard.php - Dynamic Metrics, RBAC Menus & Registrations
require_once 'auth_check.php';
require_once 'db.php';

// યુઝર લોગિન હોવો જરૂરી છે
require_login();

$user_id   = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];
$role      = $_SESSION['role'];

// જો એડમિન હોય તો Audit Log માં પેજ વ્યુ નોંધો
if ($role === 'admin') {
    log_audit_action($pdo, $user_id, "Admin viewed the main Dashboard.");
}

// ૧. Dynamic Statistics Queries
$total_users = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$total_students = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'student'")->fetchColumn();
$total_events = $pdo->query("SELECT COUNT(*) FROM events")->fetchColumn();
$total_regs = $pdo->query("SELECT COUNT(*) FROM registrations")->fetchColumn();

// ૨. Latest Registrations Query (JOIN)
$reg_query = "
    SELECT r.id, u.name AS student_name, u.email, e.title AS event_title, e.venue, r.registered_at
    FROM registrations r
    JOIN users u ON r.user_id = u.id
    JOIN events e ON r.event_id = e.id
    ORDER BY r.registered_at DESC
    LIMIT 5
";
$latest_registrations = $pdo->query($reg_query)->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        body { background-color: #f8fafc; }
        .sidebar { min-height: 100vh; background-color: #1e293b; color: #fff; }
        .sidebar a { color: #cbd5e1; text-decoration: none; padding: 10px 15px; display: block; border-radius: 6px; }
        .sidebar a:hover, .sidebar a.active { background-color: #334155; color: #fff; }
        .stat-card { border: none; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07); }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <!-- Dynamic Sidebar Menu Based on Role -->
        <nav class="col-md-3 col-lg-2 d-md-block sidebar p-3">
            <h4 class="text-white mb-4"><i class="bi bi-speedometer2"></i> Portal</h4>
            <div class="mb-3 text-secondary small">
                Logged in as: <strong class="text-light"><?= htmlspecialchars($user_name) ?></strong><br>
                Role: <span class="badge bg-<?= $role === 'admin' ? 'danger' : 'info' ?>"><?= strtoupper($role) ?></span>
            </div>
            
            <ul class="nav flex-column gap-1">
                <li class="nav-item">
                    <a href="dashboard.php" class="active"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                </li>

                <!-- Admin-Only Dynamic Menu Items -->
                <?php if ($role === 'admin'): ?>
                    <li class="nav-item">
                        <a href="admin_only.php"><i class="bi bi-shield-lock-fill me-2"></i> Admin Security Area</a>
                    </li>
                    <li class="nav-item">
                        <a href="#users"><i class="bi bi-people-fill me-2"></i> Manage Users</a>
                    </li>
                    <li class="nav-item">
                        <a href="#events"><i class="bi bi-calendar-event me-2"></i> Manage Events</a>
                    </li>
                    <li class="nav-item">
                        <a href="audit_view.php"><i class="bi bi-journal-text me-2"></i> Audit Logs</a>
                    </li>
                <!-- Student / User Dynamic Menu Items -->
                <?php else: ?>
                    <li class="nav-item">
                        <a href="#my-events"><i class="bi bi-calendar-check me-2"></i> My Registrations</a>
                    </li>
                    <li class="nav-item">
                        <a href="#browse"><i class="bi bi-compass me-2"></i> Browse Events</a>
                    </li>
                <?php endif; ?>

                <hr class="text-secondary">
                <li class="nav-item">
                    <a href="logout.php" class="text-danger"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
                </li>
            </ul>
        </nav>

        <!-- Main Content Area -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
                <h1 class="h2">System Overview</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <a href="admin_only.php" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-lock"></i> Test Restricted Page (403 Test)
                    </a>
                </div>
            </div>

            <!-- Dynamic Stats Cards -->
            <div class="row g-3 mb-4">
                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card stat-card bg-primary text-white p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-title text-uppercase mb-1 small">Total Users</h6>
                                <h2 class="mb-0 fw-bold"><?= $total_users ?></h2>
                            </div>
                            <i class="bi bi-people fs-1 opacity-50"></i>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card stat-card bg-success text-white p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-title text-uppercase mb-1 small">Total Students</h6>
                                <h2 class="mb-0 fw-bold"><?= $total_students ?></h2>
                            </div>
                            <i class="bi bi-mortarboard fs-1 opacity-50"></i>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card stat-card bg-warning text-dark p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-title text-uppercase mb-1 small">Active Events</h6>
                                <h2 class="mb-0 fw-bold"><?= $total_events ?></h2>
                            </div>
                            <i class="bi bi-calendar-week fs-1 opacity-50"></i>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl-3">
                    <div class="card stat-card bg-info text-white p-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-title text-uppercase mb-1 small">Registrations</h6>
                                <h2 class="mb-0 fw-bold"><?= $total_regs ?></h2>
                            </div>
                            <i class="bi bi-ticket-perforated fs-1 opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Latest Registrations Table -->
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-3">
                    <h5 class="mb-0 text-dark fw-bold"><i class="bi bi-clock-history me-2 text-primary"></i>Latest Registrations</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Event Title</th>
                                    <th>Venue</th>
                                    <th>Registration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (!empty($latest_registrations)): ?>
                                    <?php foreach ($latest_registrations as $reg): ?>
                                        <tr>
                                            <td><?= $reg['id'] ?></td>
                                            <td class="fw-semibold"><?= htmlspecialchars($reg['student_name']) ?></td>
                                            <td><?= htmlspecialchars($reg['email']) ?></td>
                                            <td><span class="badge bg-secondary"><?= htmlspecialchars($reg['event_title']) ?></span></td>
                                            <td><?= htmlspecialchars($reg['venue']) ?></td>
                                            <td class="text-muted small"><?= $reg['registered_at'] ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php else: ?>
                                    <tr>
                                        <td colspan="6" class="text-center py-3 text-muted">No registrations found.</td>
                                    </tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>

</body>
</html>