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
$d_name = trim($request->d_name);
$phone = mysqli_real_escape_string($mysqli, trim($request->phone));
$license_no = mysqli_real_escape_string($mysqli, trim($request->license_no));
$available = mysqli_real_escape_string($mysqli, trim($request->available));
$password = mysqli_real_escape_string($mysqli, trim($request->password));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$sql = "INSERT INTO drivers(d_name, phone, license_no, available, password, email) VALUES ('$d_name', '$phone', '$license_no', '$available', '$password', '$email')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'd_name' => $d_name,
'phone' => $phone,
'license_no' => $license_no,
'available' => $available,
'password' => $password,
'email' => $email,
'driver_id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}



?>