<html>

<head>
  <title>CAM</title>
  <link rel="stylesheet" href="../css/app1.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>

<?php



if ($_SERVER["REQUEST_METHOD"] == "POST")
{
 include 'partials/_dbconnect.php';


 $nombre = $_POST['nombre'];
 $password = $_POST['password'];
 $hash = hash("sha256", $password);


 setcookie("nombre", $nombre);

 $resultado = mysqli_query($conn, "SELECT * FROM usuarios WHERE nombre = '$nombre' ");


 if (mysqli_num_rows($resultado) == 1)
 {
 $row = mysqli_fetch_assoc($resultado);
 $db_user_hashed_password = $row['password'];
$rol = $row['rol'];
$verify = $hash == $db_user_hashed_password;

if ($verify && $rol == 1)
 {
 header("Location: Alumno.php");
 exit();
 }
else if ($verify && $rol == 2)
 {
 header("Location: profe.php");
 exit();
 }
 else {
 echo "<script>alert('La contraseña no es correcta');</script>";
 }
 }
 else
 {
 echo "<script>alert('El usuario no existe');</script>";
}
}
?>



</body>

</html>