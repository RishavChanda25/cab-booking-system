<?php

// include_once("database.php");

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

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$booking_id = trim($request->booking_id);
$amount = trim($request->amount);
$mode = mysqli_real_escape_string($mysqli, trim($request->mode));
$p_status = mysqli_real_escape_string($mysqli, trim($request->p_status));
$sql = "INSERT INTO payments(booking_id, amount, mode, p_status) VALUES ('$booking_id', '$amount', '$mode', '$p_status')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'booking_id' => $booking_id,
'amount' => $amount,
'mode' => $mode,
'p_status' => $p_status,
'payment_id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}



?>