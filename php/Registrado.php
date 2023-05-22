<html>

<head>
  <title>CAM</title>
  <link rel="stylesheet" href="../css/app1.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>


  <?php

  // Establecer la conexión con la base de datos
  $showAlert = false;
$showError = false;
if($_SERVER["REQUEST_METHOD"] == "POST"){
    include '../partials/_dbconnect.php';

  $id = $_POST["id"];
  $password = $_POST["password"];
  $rol = $_POST["rol"];
  $nombre = $_POST["nombre"];
  $cpassword = $_POST['confirm-password'];


  setcookie("nombre", $nombre); 
  $validar = mysqli_query($conn,"SELECT * FROM usuarios WHERE id = '$id'");

  if ($validar->num_rows > 0) {
    // Display an error message
    header( "Location: error.php");
    } 
    else { if(($password == $cpassword)){
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO usuarios (id, password, rol, nombre, dt) VALUES ('$id', '$hash', '$rol', '$nombre', current_timestamp())";
    $validando = $conn->query($sql);
    header( "Location: Sesion.php");
    
  }
  else {

   
  echo "<script>alert('La contraseña no es correcta');</script>";    
  } 

}

}


  $conn->close();



  ?>

</body>

</html>