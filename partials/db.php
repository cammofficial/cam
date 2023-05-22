<?php

// mysql --host=localhost --user=nfc --password=Campamento2023@ nfc

$server = "localhost";
$username = "nfc";
$password = "Campamento2023@";
$database = "nfc";

$mysqli = new mysqli($server, $username, $password, $database);
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
//echo $mysqli->host_info . "\n";

?>