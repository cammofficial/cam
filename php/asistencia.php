<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAM</title>
  <link rel="icon" href="../images/logo.png" type="image/png">


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/app.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">




</head>

<body class="fondo">
  <nav class="navbar sticy-top navbar-expand-lg navbar-dark bg-dark"> 
    <div class="container-fluid">
      <a class="navbar-brand" href="../asistencia.php">
        <img src="../images/logo.png" id="logo">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  </div>
  <main>
    <div id="clock">

      <script>
        // Obtén el elemento HTML del reloj
        var clock = document.getElementById("clock");

        // Función para actualizar el reloj
        function updateClock() {
          var now = new Date();
          var hours = now.getHours();
          var minutes = now.getMinutes();
          var seconds = now.getSeconds();

          // Formatea las horas, minutos y segundos como cadenas de dos dígitos
          if (hours < 10) hours = "0" + hours;
          if (minutes < 10) minutes = "0" + minutes;
          if (seconds < 10) seconds = "0" + seconds;

          // Actualiza el contenido del elemento HTML del reloj
          clock.innerHTML = hours + ":" + minutes + ":" + seconds;
        }

        // Actualiza el reloj cada segundo
        setInterval(updateClock, 1000);
      </script>


    </div>
    <div id="day"> <?php
$fecha_actual = date('d/m/Y');
echo $fecha_actual;
?>
    </div>

    <div>
      <div class="row g-3 align-items-center">

        <div id="boton" class="col-auto">
          <form action="asistencia.php"  method="post">    <input type="number" id="id" name="id" class="form-control" >
          <button type="submit" id="b"></button>


</form>

         </div>
      </div>
    </div>
  </main>





  <?php
include '../partials/_dbconnect.php';

// Obtener la ID de usuario desde el formulario
$id_usuario = $_POST["id"];
$result = mysqli_query($conn, "SELECT * FROM registro WHERE id = $id_usuario");

// Si ya existe un registro de ese usuario en la BBDD, refresca el registro
if ($result->num_rows > 0) {

    // $hora_llegada = date("H:i:s");
    $row = $result->fetch_assoc();
    $horallegada = $row['horallegada'];

    $hora_limite = strtotime("4:15PM");  // TODO: Cambiar a dinámico
    $fecha_limite = date("H:i:s", $hora_limite);

    if (strtotime($horallegada) <= $hora_limite) {
        $estado = 'Asistencia';
    } else if (strtotime($horallegada) <= $hora_limite + 600) { // 600 segundos = 10 minutos
        $estado = 'Retraso';
    } else {
        $estado = 'Falta';
    }
    $save = mysqli_query($conn, "UPDATE registro SET horallegada = CURRENT_TIMESTAMP, horalimite = '$fecha_limite', estado = '$estado' WHERE id = $id_usuario");
    

}
// Si no existe un registro de ese usuario en la BBDD, verifica que existe el usuario e inserta el registro de asistencia
else {
    // Verificamos que exista el usuario
    $result1 = mysqli_query($conn, "SELECT * FROM usuarios WHERE id = $id_usuario");

    // Si existe el usuario 
    if ($result1->num_rows > 0) {
        $row = $result->fetch_assoc();
        $horallegada = $row['horallegada'];
        $hora_limite = strtotime("4:15PM"); // TODO: Cambiar a dinámico
        $fecha_limite = date("H:i:s", $hora_limite);

        // Compruebas el estado del registro de asistencia
        if (strtotime($horallegada) <= $hora_limite) {
          $estado = 'Asistencia';
        } else if (strtotime($horallegada) <= $hora_limite + 600) { // 600 segundos = 10 minutos
          $estado = 'Retraso';
        } else {
          $estado = 'Falta';
        }
        
        // Insertas el registro de asistencia del usuario
        $save1 = mysqli_query($conn, "INSERT INTO registro (id, horallegada, horalimite, estado) VALUES ($id_usuario, CURRENT_TIMESTAMP, '$fecha_limite', '$estado')");

    }
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);

?>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
</body>

</html>

