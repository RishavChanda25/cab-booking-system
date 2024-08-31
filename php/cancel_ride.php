<?php
// include_once("database.php");

// echo '<script> console.log("!!!!"); </script>';

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
    $booking_id = trim($request->booking_id);
    $cancel_cause = mysqli_real_escape_string($mysqli, trim($request->cancel_cause));

    // echo '<script> console.log("****"); </script>';
    
    $sql = "UPDATE bookings SET cancel_cause = '$cancel_cause', status = 'CANCELLED' WHERE booking_id = '$booking_id'";
    
    if ($mysqli->query($sql) === TRUE) {
        echo json_encode(['message' => 'Ride cancelled successfully']);
    } else {
        http_response_code(500); 
        echo json_encode(['error' => 'Error inserting data into the database']);
    }
} else {
    http_response_code(400); 
    echo json_encode(['error' => 'Invalid or empty POST data']);
}
?>