<?php setcookie("nombre", "", time() - 3600);  ?>

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

<div class="card-footer ">
<div class="d-flex justify-content-center">
<div class="text-primary"  id="error"> <p>La contraseña no es correcta </p><a href="sesion.php">Inicia Sesion</a></div>
</div></div>


</body>

</html>