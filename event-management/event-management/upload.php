<?php
// Function: Checks a poster file and saves it. Returns [file_name, error_message].
function upload_poster($file) {
    // No file chosen -> fine, the poster is optional
    if (empty($file) || $file['error'] == UPLOAD_ERR_NO_FILE) return [null, null];

    // PHP itself rejected the file (too big for php.ini)
    if ($file['error'] == UPLOAD_ERR_INI_SIZE) return [null, "File must be 2 MB or less."];
    if ($file['error'] != UPLOAD_ERR_OK)       return [null, "Upload failed."];

    // 1. Check type (extension)
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
        return [null, "Only JPG, PNG and WEBP files are allowed."];
    }

    // 2. Check size (2 MB = 2 * 1024 * 1024 bytes)
    if ($file['size'] > 2 * 1024 * 1024) {
        return [null, "File must be 2 MB or less."];
    }

    // 3. Check it is really an image
    if (!@getimagesize($file['tmp_name'])) {
        return [null, "This file is not a real image."];
    }

    // Ensure uploads directory exists
    if (!is_dir('uploads')) {
        mkdir('uploads', 0777, true);
    }

    // 4. Give it a unique name and move it to the uploads folder
    $new_name = time() . '_' . uniqid() . '.' . $ext;
    if (!move_uploaded_file($file['tmp_name'], 'uploads/' . $new_name)) {
        return [null, "Could not save the file."];
    }
    return [$new_name, null];
}

// Handling submission and displaying output
$uploaded_file = null;
$error_message = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['poster'])) {
    list($uploaded_file, $error_message) = upload_poster($_FILES['poster']);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Poster Upload Test</title>
</head>
<body>

    <h2>Upload Poster</h2>

    <!-- Error Message -->
    <?php if (!empty($error_message)): ?>
        <p style="color: red; font-weight: bold;"><?php echo htmlspecialchars($error_message); ?></p>
    <?php endif; ?>

    <!-- Success Message -->
    <?php if (!empty($uploaded_file)): ?>
        <p style="color: green; font-weight: bold;">File uploaded successfully: <?php echo htmlspecialchars($uploaded_file); ?></p>
        <img src="uploads/<?php echo htmlspecialchars($uploaded_file); ?>" width="150" alt="Uploaded Poster">
    <?php endif; ?>

    <form method="POST" action="upload.php" enctype="multipart/form-data">
        <label>Select Poster (Max 2MB):</label><br><br>
        <input type="file" name="poster" required><br><br>
        <button type="submit">Upload</button>
    </form>

</body>
</html>