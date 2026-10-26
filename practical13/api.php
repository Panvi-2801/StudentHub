<?php
// api.php - REST-style JSON API Endpoints
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS preflight request માટે
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    // 1. LIST ALL (READ)
    case 'GET':
        try {
            $stmt = $pdo->query('SELECT * FROM events ORDER BY id DESC');
            $events = $stmt->fetchAll();
            echo json_encode([
                'success' => true,
                'data' => $events
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to fetch events.']);
        }
        break;

    // 2. ADD (CREATE)
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['title']) || empty($input['venue']) || empty($input['event_date'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'All fields (title, venue, event_date) are required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare('INSERT INTO events (title, venue, event_date) VALUES (?, ?, ?)');
            $stmt->execute([
                trim($input['title']),
                trim($input['venue']),
                $input['event_date']
            ]);

            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Event added successfully.',
                'id' => $pdo->lastInsertId()
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to insert event.']);
        }
        break;

    // 3. UPDATE
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['id']) || empty($input['title']) || empty($input['venue']) || empty($input['event_date'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'All fields including ID are required.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare('UPDATE events SET title = ?, venue = ?, event_date = ? WHERE id = ?');
            $stmt->execute([
                trim($input['title']),
                trim($input['venue']),
                $input['event_date'],
                $input['id']
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Event updated successfully.'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to update event.']);
        }
        break;

    // 4. DELETE
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);

        if (empty($input['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Event ID is required for deletion.']);
            exit;
        }

        try {
            $stmt = $pdo->prepare('DELETE FROM events WHERE id = ?');
            $stmt->execute([$input['id']]);

            echo json_encode([
                'success' => true,
                'message' => 'Event deleted successfully.'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete event.']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
        break;
}