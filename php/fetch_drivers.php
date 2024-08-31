<?php
// include_once("database.php");

error_log("Hi");

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Content-Length: 0');
    header('HTTP/1.1 204 No Content');
    exit;
}

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cab_booking_system';

// create a connection with the database
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

// check connection
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}

// echo '<script> console.log("!**!"); </script>';

$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    // error_log(print_r($request, true));
    $available = trim($request->available);

    $sql = "SELECT * FROM drivers WHERE available = '$available'";
    
    $result = $mysqli->query($sql);

    if ($result) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
    } 
    else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Error fetching records: ' . $mysqli->error]);
    }
}
?>