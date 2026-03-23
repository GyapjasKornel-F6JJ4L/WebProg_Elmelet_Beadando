<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Összes szoftver lekérdezése
        $stmt = $pdo->query("SELECT * FROM szoftver");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
        break;

    case 'POST':
        // Új szoftver hozzáadása
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['nev']) && isset($input['kategoria'])) {
            $stmt = $pdo->prepare("INSERT INTO szoftver (nev, kategoria) VALUES (:nev, :kategoria)"); //prepare sql injection ellen
            $stmt->execute([
                ':nev' => $input['nev'],
                ':kategoria' => $input['kategoria']
            ]);
            $input['id'] = $pdo->lastInsertId(); //AI sql-ben az utolsó beszúrt elem id-je
            http_response_code(201);
            echo json_encode($input);
        }
        else {
            http_response_code(400);
            echo json_encode(["error" => "Érvénytelen adatok."]);
        }
        break;

    case 'PUT':
        // Meglévő szoftver frissítése
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? $input['id'] : null;

        if ($id && isset($input['nev']) && isset($input['kategoria'])) {
            $stmt = $pdo->prepare("UPDATE szoftver SET nev = :nev, kategoria = :kategoria WHERE id = :id"); //AI sql-ben az utolsó beszúrt elem id-je
            $stmt->execute([
                ':nev' => $input['nev'],
                ':kategoria' => $input['kategoria'],
                ':id' => $id
            ]);

            echo json_encode($input);
        }
        else {
            http_response_code(400);
            echo json_encode(["error" => "Érvénytelen adatok vagy hiányzó ID."]);
        }
        break;

    case 'DELETE':
        // Szoftver törlése
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM szoftver WHERE id = :id"); //AI sql-ben az utolsó beszúrt elem id-je
            $stmt->execute([':id' => $id]);
            echo json_encode(["success" => true, "id" => $id]);
        }
        else {
            http_response_code(400);
            echo json_encode(["error" => "Hiányzó ID."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Nem támogatott metódus."]);
        break;
}
?>
