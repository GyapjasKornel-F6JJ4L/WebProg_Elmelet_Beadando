<?php
// Adatbázis connection string megadása
$host = "mysql.omega";
$dbname = "szoftverleltar";
$username = "szoftverleltar";
$password = "XNJdTn2PaXnz";
$port = "3306";

try {
    // MYSQL-hez való csatlakozás
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //sql hiba nem akassza meg a php-t
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //oszlop nevek a kulcsok(asszociativ tömb)
        PDO::ATTR_EMULATE_PREPARES => false, //sql injection védelem, int valós int-ként tér vissza nem string
    ];
    $pdo = new PDO($dsn, $username, $password, $options);
}
catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Adatbázis kapcsolat hiba.", "details" => $e->getMessage()]);
    exit();
}
?>
