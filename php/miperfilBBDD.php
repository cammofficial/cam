<?php

include '../partials/_dbconnect.php';

$username = $_COOKIE["nombre"];
$result = mysqli_query($conn, "SELECT nombre FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$nombre = $row['nombre'];

if (isset($_POST['submit'])) {
  // Get the email and phone number from the form
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];
  setcookie("email", "telefono", time() - 3600);
 
  // Insert the data into the database
  $query = "UPDATE usuarios SET email = '$email', telefono = '$telefono' WHERE nombre = '$username'";
  mysqli_query($conn, $query);
}


?>


