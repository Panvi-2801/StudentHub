<?php
// logout.php - End Session
session_start();
session_unset();
session_destroy();
header("Location: login.php");
exit;