<?php
session_start();

$timeout_duration = 30;

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php?error=denied");
    exit();
}

if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout_duration) {
    session_unset();
    session_destroy();
    header("Location: login.php?error=timeout");
    exit();
}

$_SESSION['last_activity'] = time();
?>