<?php

include '../partials/_dbconnect.php';

# Creamos usuario
$username = "Gagan";
$query = "INSERT INTO usuarios (nombre) VALUES ($username)";




$result = mysqli_query($conn, "SELECT * FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$nombre = $row['nombre'];

$sql = "SELECT id, nombre FROM usuarios";
$resultado = mysqli_query($conn, $sql);

$submit = true;

if ($submit) {

  // Get the email and phone number from the form
  $email = "mike@gmail";
  $telefono = '786787878';

  // Insert the data into the database
  $query = "INSERT INTO usuarios (nombre, email, telefono) VALUES ('$nombre', '$email', '$telefono')";
  mysqli_query($conn, $query);

  echo "Datos insertados correctamente";

} else {
    
  echo "Error al insertar los datos: " . $conn->error;
  
}
  
?>
