
<?php setcookie("nombre", "", time() - 3600);  ?>


<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
 include '../partials/_dbconnect.php';      


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
 header("Location: alumno.php");
 exit();
 }
else if ($verify && $rol == 2)
 {
 header("Location: profe.php");
 exit();
 }
 else {
  header("Location: error2.php");
}
 }
 else
 {
  header("Location: error3.php");
}
}
?>


<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CAM</title>
    <link rel="icon" href="../images/logo.png" type="image/png">


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/app1.css"/> 
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
</head>
  <body class="fondo">
  <nav class="navbar sticy-top navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <a class="navbar-brand" href="../index.php">
  <img src="../images/logo.png" id="logo">
  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
    </div>
  </div>
</nav>

<script src="../assets/dist/js/bootstrap.bundle.min.js"></script> 
<div id="template-bg-1">
<div
class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
<div class="card p-4 text-light bg-dark mb-5">
<div class="card-header text-center">
<h3>Iniciar Sesión </h3>
</div>
<div class="card-body w-100">
<form name="login" action="sesion.php " method="post">
<div class="input-group form-group mt-3">
<div class="bg-secondary rounded-start">
<span class="m-3"><i class="fas fa-user mt-2"></i></span>
</div>

<input type="text" class="form-control" placeholder="Nombre y Apellido"        
name="nombre" type="nombre" id="nombre" required>
</div>
<div class="input-group form-group mt-3">
<div class="bg-secondary rounded-start">
<span class="m-3"><i class="fas fa-key mt-2"></i></span>
</div>
<input type="password" class="form-control" placeholder="Contraseña"
name="password" type="password" id="password" required>

</div>



<div class="form-group mt-3">
<button type="submit" value="Iniciar" 
class="btn bg-secondary float-end text-white w-100"
name="login-btn" > Iniciar </button>

</div>

</form>

        
</div>
<div class="card-footer ">
<div class="d-flex justify-content-center">
<div class="text-primary"> No tienes cuenta? <a href="../php/registrate.php">Regístrate</a></div>
</div></div>


</body>

</html>