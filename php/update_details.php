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
$name = trim($request->name);
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$phone = mysqli_real_escape_string($mysqli, trim($request->phone));
$password = mysqli_real_escape_string($mysqli, trim($request->password));
$address = mysqli_real_escape_string($mysqli, trim($request->address));
$acc_no = mysqli_real_escape_string($mysqli, trim($request->acc_no));
$sql = "UPDATE customers SET name = '$name', email = '$email', phone = '$phone', password = '$password', address = '$address', acc_no = '$acc_no' WHERE cust_id = '$cust_id'";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'cust_id' => $cust_id,
'name' => $name,
'email' => $email,
'phone' => $phone,
'password' => $password,
'address' => $address,
'acc_no' => $acc_no,
];
echo json_encode($authdata);
}
}



?>