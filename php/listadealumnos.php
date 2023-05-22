<?php include '../html/navbar2.html';?>
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>CAM</title>
  <link rel="icon" href="../images/logo.png" type="image/png">


	<link rel="stylesheet" href="../css/app1.css" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css' />
<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.js'></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sigmar&display=swap" rel="stylesheet">






</head>
<body class="fondo">



<div class="centrado1 tabla-responsive " id="tabla" > <h1 class="font1" >Lista de alumnos</h1>

<?php
include '../partials/_dbconnect.php';
$result = mysqli_query($conn, 'SELECT * FROM historial_registro R, usuarios U WHERE R.id_registro = U.id ORDER BY R.fecha ASC');
echo '<table class="table table-bordered">';
echo '<thead>';
echo '<tr>';
echo '<th>Nombre</th>';
echo '<th>Estado</th>';
echo '<th>Hora Llegada</th>';
echo '<th>Hora Limite</th>';
echo '<th>Fecha</th>';
echo '</tr>';
echo '</thead>';
echo '<tbody>';

while ($row = mysqli_fetch_assoc($result)) {
    echo '<tr>';
    echo '<td>' . $row['nombre'] . '</td>';

    $estado = $row['estado'];
    $color = '';

    if ($estado === 'Asistencia') {
        $color = 'green';
    } elseif ($estado === 'Retraso') {
        $color = 'yellow';
    } elseif ($estado === 'Falta') {
        $color = 'red';
    }

    echo '<td style="color: ' . $color . ';">' . $row['estado'] . '</td>';
    echo '<td>' . $row['horallegada'] . '</td>';
    echo '<td>' . $row['horalimite'] . '</td>';
    echo '<td>' . $row['fecha'] . '</td>';
    echo '</tr>';
}

echo '</tbody>';
echo '</table>';
?>




</div>










<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
</body>




    <script src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="9e6ce10e419db5d3484125c6-|49" defer></script></body>
</html>

