
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $studentId = trim($_POST["studentId"] ?? "");
    $firstname = trim($_POST["firstname"] ?? "");
    $lastname = trim($_POST["lastname"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $password = trim($_POST["password"] ?? "");
    $confirmpassword = trim($_POST["confirmpassword"] ?? "");
    $course = trim($_POST["course"] ?? "");
    $year = trim($_POST["year"] ?? "");
    $gender = trim($_POST["gender"] ?? "");
    $terms = isset($_POST["terms"]);

    $studentId = htmlspecialchars($studentId);
    $firstname = htmlspecialchars($firstname);
    $lastname = htmlspecialchars($lastname);
    $email = htmlspecialchars($email);
    $phone = htmlspecialchars($phone);
    $course = htmlspecialchars($course);
    $year = htmlspecialchars($year);
    $gender = htmlspecialchars($gender);

    if (
        empty($studentId) ||
        empty($firstname) ||
        empty($lastname) ||
        empty($email) ||
        empty($phone) ||
        empty($password) ||
        empty($confirmpassword) ||
        empty($course) ||
        empty($year) ||
        empty($gender)
    ) {

        echo "Error: All fields are required.";

    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        echo "Error: Invalid email address.";

    } elseif (!preg_match("/^[0-9]{10}$/", $phone)) {

        echo "Error: Phone number must contain exactly 10 digits.";

    } elseif ($password !== $confirmpassword) {

        echo "Error: Passwords do not match.";

    } elseif (strlen($password) < 6) {

        echo "Error: Password must contain at least 6 characters.";

    } elseif (!$terms) {

        echo "Error: Please accept the Terms & Conditions.";

    } else {

        $file = fopen("data.csv", "a");

        fputcsv($file, [
            $studentId,
            $firstname,
            $lastname,
            $email,
            $phone,
            $password,
            $course,
            $year,
            $gender
        ]);

        fclose($file);

        echo "Registration successful! Your data has been saved successfully.";
    }
}

?>

