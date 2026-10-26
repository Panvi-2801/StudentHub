<?php
ob_start();
include 'db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    die("Invalid record ID.");
}

// Fetch existing record
$select_sql = "SELECT * FROM students WHERE id = $id";
$fetch_result = mysqli_query($conn, $select_sql);
if (!$fetch_result || mysqli_num_rows($fetch_result) === 0) {
    die("Student record not found.");
}
$student = mysqli_fetch_assoc($fetch_result);

// Handle Form Update (UPDATE)
if (isset($_POST['update_student'])) {
    $name   = mysqli_real_escape_string($conn, $_POST['name']);
    $email  = mysqli_real_escape_string($conn, $_POST['email']);
    $course = mysqli_real_escape_string($conn, $_POST['course']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);

    $update_sql = "UPDATE students 
                   SET name = '$name', email = '$email', course = '$course', gender = '$gender' 
                   WHERE id = $id";

    if (mysqli_query($conn, $update_sql)) {
        header("Location: index.php?msg=updated");
        exit();
    } else {
        die("Update Error: " . mysqli_error($conn));
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Student</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background-color: #f9f9f9; }
        .card { background: white; padding: 25px; border-radius: 8px; width: 400px; margin: auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        label { font-weight: bold; display: block; margin-bottom: 5px; }
        input, select { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { background-color: #27ae60; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-cancel { background-color: #95a5a6; color: white; padding: 9px 15px; text-decoration: none; border-radius: 4px; display: inline-block; }
    </style>
</head>
<body>

<div class="card">
    <h2>Edit Student Details</h2>
    <form method="POST" action="edit.php?id=<?php echo $id; ?>">
        <div class="form-group">
            <label>Name:</label>
            <input type="text" name="name" value="<?php echo htmlspecialchars($student['name']); ?>" required>
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="email" name="email" value="<?php echo htmlspecialchars($student['email']); ?>" required>
        </div>
        <div class="form-group">
            <label>Course:</label>
            <select name="course" required>
                <option value="Computer Science" <?php if ($student['course'] === 'Computer Science') echo 'selected'; ?>>Computer Science</option>
                <option value="Web Development" <?php if ($student['course'] === 'Web Development') echo 'selected'; ?>>Web Development</option>
                <option value="Data Science" <?php if ($student['course'] === 'Data Science') echo 'selected'; ?>>Data Science</option>
            </select>
        </div>
        <div class="form-group">
            <label>Gender:</label>
            <select name="gender" required>
                <option value="Male" <?php if ($student['gender'] === 'Male') echo 'selected'; ?>>Male</option>
                <option value="Female" <?php if ($student['gender'] === 'Female') echo 'selected'; ?>>Female</option>
            </select>
        </div>
        <button type="submit" name="update_student">Update Student</button>
        <a href="index.php" class="btn-cancel">Cancel</a>
    </form>
</div>

</body>
</html>