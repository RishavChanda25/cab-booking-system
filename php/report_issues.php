<?php

// include_once("database.php");

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
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
$cust_id = trim($request->cust_id);
$issue_type = mysqli_real_escape_string($mysqli, trim($request->issue_type));
$booking_id = trim($request->booking_id);
$description = mysqli_real_escape_string($mysqli, trim($request->description));
$i_status = mysqli_real_escape_string($mysqli, trim($request->i_status));
$sql = "INSERT INTO issues(cust_id, issue_type, booking_id, description, i_status) VALUES ('$cust_id', '$issue_type', '$booking_id', '$description', '$i_status')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'cust_id' => $cust_id,
'issue_type' => $issue_type,
'booking_id' => $booking_id,
'description' => $description,
'i_status' => $i_status,
'report_id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}



?>