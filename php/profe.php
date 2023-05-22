
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAM</title>
  <link rel="icon" href="../images/logo.png" type="image/png">


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/app1.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
</head>

<body class="fondo">
  <nav class="navbar sticy-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="../php/profe.php">
        <img src="../images/logo.png" id="logo">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../php/profe.php">Inicio</a>
          </li>

          <li class="nav-item">
            <a class="nav-link " href="../php/listadealumnos.php">Lista de alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="../php/cursos_profe.php">Cursos</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ajustes</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Idioma</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="../php/miperfil.php">Mi Perfil</a></li>
            </ul>

          <li class="nav-item" id="logout">
            <form action="../php/sesion.php">
              <input class="btn btn-secondary" type="submit" value="Cerrar Sesión" />
            </form>
          </li>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="m">

    <?php



    $cookie =  $_COOKIE["nombre"];


    $hora = date('H');

    if ($hora < 12) {
      echo "<h1 style='font-size: 30px;'>Bienvenido " . $cookie . "</br> <h1 style='font-size: 20px;'>BUENOS DIAS </h1>  ";
    } else if ($hora < 18) {
      echo " <h1 style='font-size: 30px;'>Bienvenido " . $cookie . "</br> <h1 style='font-size: 20px;'>BUENAS TARDES </h1>";
    } else {
      echo "<h1 style='font-size: 30px;'>Bienvenido " . $cookie . "</br> </h1> <h1 style='font-size: 20px;'>BUENAS NOCHES  </h1> ";
    }

    ?>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
</body>

</html>