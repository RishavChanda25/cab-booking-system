<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'cab_booking_system';

// Create a connection with the database
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $password = mysqli_real_escape_string($mysqli, trim($request->password));

    $sql = "SELECT * FROM customers WHERE email='$email' AND password='$password'";
    
    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }

        if (!empty($rows)) {
            $cust_id = $rows[0]['cust_id'];
            $response = array('customers' => $rows, 'cust_id' => $cust_id);
            echo json_encode($response);
        } else {
            http_response_code(404);
        }
    } else {
        http_response_code(500);
    }
}
?>
