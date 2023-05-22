<?php
$server = "localhost";
$username = "nfc";
$password = "Campamento2023@";
$database = "nfc";

$conn =  new mysqli($server, $username, $password, $database);
if ($conn->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $conn->connect_error;
}

?>