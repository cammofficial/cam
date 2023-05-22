<?php

include '../partials/_dbconnect.php';



$username = $_COOKIE["nombre"];
$result = mysqli_query($conn, "SELECT * FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$nombre = $row['nombre'];


$result = mysqli_query($conn, "SELECT email FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$email = $row['email'];

$result = mysqli_query($conn, "SELECT telefono FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$telefono = $row['telefono'];


$result = mysqli_query($conn, "SELECT id FROM usuarios WHERE nombre = '$username'");
$row = mysqli_fetch_assoc($result);
$id = $row['id'];



$query = "SELECT ppicture FROM usuarios WHERE nombre='$username'";
$resultado = mysqli_query($conn, $query);

if (mysqli_num_rows($resultado) == 1) {
  $row = mysqli_fetch_assoc($resultado);
  $ppicture = 'data:image/png;base64,' . $row['ppicture'];
}


else{



if (isset($_POST['submit'])) {
  // Get the email and phone number from the form
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];
  
  if (count($_FILES) > 0) {
    if (is_uploaded_file($_FILES['ppicture']['tmp_name'])) {
        $imgData = file_get_contents($_FILES['ppicture']['tmp_name']);
        $base64Image = base64_encode($imgData);
        $query = "UPDATE usuarios SET ppicture='$base64Image', email='$email', telefono='$telefono' WHERE nombre='$nombre'";
        $result = mysqli_query($conn, $query);
        echo "Datos actualizados correctamente: " . $result;
    }
  }

  // Handle the profile picture upload
  if (!empty($_FILES['ppicture']['tmp_name'])) {
    // Read the file contents into a variable
    $imageData = file_get_contents($_FILES['ppicture']['tmp_name']);
    

    // Encode the binary data as base64 for storage in the database
     $base64Image = base64_encode($imageData);
    
    // Update the data in the database for the specific user
     $query = "UPDATE usuarios SET imagen='$base64Image', email='$email', telefono='$telefono' WHERE nombre='$nombre'";
     mysqli_query($conn, $query);
   } else {
    // If no profile picture was uploaded, just update the email and phone number
    $query = "UPDATE usuarios SET email='$email', telefono='$telefono' WHERE nombre='$nombre'";
     mysqli_query($conn, $query);
   }


  
  
} else {
  echo "Error al actualizar los datos: " . $conn->error;
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
  <body class="fondo1">
  <nav class="navbar sticy-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="../php/alumno.php">
        <img src="../images/logo.png" id="logo">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../php/alumno.php">Inicio</a>
          </li>

          <li class="nav-item">
            <a class="nav-link " href="../php/calendario.php">Calendarios</a>     
          </li>
          <li class="nav-item">
            <a class="nav-link " href="../html/cursos.html">Cursos</a>
          </li>


          
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ajustes</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="https://translate.google.es/?hl=es&sl=auto&tl=es&op=websites">Idioma</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="../php/miperfilalumno.php">Mi Perfil</a></li>
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

<main >



   <!-- Change button -->
   <div id="fondo3">
   <form action="miperfil.php" enctype="multipart/form-data" method="post" id="formulario">
    <label for="ppicture"></label>
    <img src="<?php echo $ppicture; ?>" alt="Profile Picture" class="profile-picture">
    <input id="ppicture" name="ppicture" size="30" type="file" value= "<?php echo $ppicture; ?> " />

    <!-- Save button -->
    <input name="submit" type="submit" value="Guardar" />

    <br><br>

  <!-- 2 column grid layout with text inputs for the first and last names -->
  <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form6Example1">Nombre</label>
        <input type="text" id="nombre" name="nombre" disabled class="form-control" value="<?php echo $nombre; ?>" >
      </div>
    </div>

    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form6Example1">ID</label>
        <input type="text" id="id" name="nombre" disabled class="form-control" value="<?php echo $id; ?>" >
      </div>
    </div>
   
    <br><br>
  <!-- Email input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="form6Example5">Email</label>
    <input type="email" id="email" name="email" class="form-control" value="<?php echo $email;?>"  />
  </div>
  <br><br>
  <!-- Number input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="form6Example6">Telefono</label>
    <input type="number" id="telefono" name="telefono" class="form-control" value="<?php echo $telefono; ?>" />
  </div>
  <br><br>
  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block mb-4">Guardar</button>
</form>
</div>
</main>
<br><br>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
  </body>
</html>