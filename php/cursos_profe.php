<!DOCTYPE HTML>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> CAM </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/app1.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet">
</head>

<body>


    <nav class="navbar sticy-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="../php/profe.php">
                <img src="../images/logo.png" id="logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link " aria-current="page" href="../php/profe.php">Inicio</a>
                    </li>

                    <li class="nav-item">
            <a class="nav-link " href="../php/listadealumnos.php">Lista de alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="../php/cursos_profe.php">Cursos</a>
          </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Ajustes</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Idioma</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="../php/miperfil.php">Mi Perfil</a></li>
                        </ul>

                    <li class="nav-item" id="logout">
                        <form action="sesion.php">
                            <input class="btn btn-secondary" type="submit" value="Cerrar Sesión" />
                        </form>
                    </li>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <?php


include '../partials/_dbconnect.php';

// Consulta los registros de la tabla
$sql = "SELECT * FROM horarios";
$result = $conn->query($sql);

// Genera el código HTML
if ($result->num_rows > 0) {
    echo '<table class="cal">';
    echo '<thead>';
    echo '<tr>';
    echo '<th></th>';
    echo '<th>Lun</th>';
    echo '<th>Mar</th>';
    echo '<th>Mié</th>';
    echo '<th>Jue</th>';
    echo '<th>Vie</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    while ($row = $result->fetch_assoc()) {
        echo '<tr>';
        echo '<td class="h">' . $row['hora'] . '</td>';
        echo '<td class="m12" id="1">' . $row['lun'] . '</td>';
        echo '<td class="nada" id="">' . $row['mar'] . '</td>';
        echo '<td class="nada" id=""> '. $row['mie'] . '</td>';
        echo '<td class="m07" id="2">' . $row['jue'] . '</td>';
        echo '<td class="m04" id="3">' . $row['vie'] . '</td>';
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
} else {
    echo "No se encontraron registros.";
}

// Cierra la conexión
$conn->close();
?>



   

    <div class="card-body p-3" id="cur">

        <h5 id="instance-16831-header" class="card-title d-inline">Els meus cursos</h5><br><br>


        <div class="card-text content mt-3">
            <ul class="unlist">

                <li class="r0">
                    <div class="column c1"><a title=" SMX2-C-M06"
                            href="https://campus.proven.cat/course/view.php?id=707"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i> SMX2-C-M06
                            Seguretat informàtica</a></div>
                </li><br>
                <li class="r1">
                    <div class="column c1"><a title=" SMX2-C-M07"
                            href="https://campus.proven.cat/course/view.php?id=708"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i> SMX2-C-M07
                            Serveis de xarxa</a></div>
                </li><br>
                <li class="r0">
                    <div class="column c1"><a title=" SMX2-C-M08"
                            href="https://campus.proven.cat/course/view.php?id=709"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i>SMX2-C-M08 -
                            Aplicacions web</a></div>
                </li><br>
                <li class="r1">
                    <div class="column c1"><a title="SMX2-C-M04"
                            href="https://campus.proven.cat/course/view.php?id=706"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i>SMX2-C-M04 -
                            Sistemes operatius en xarxa</a></div>
                </li><br>
                <li class="r0">
                    <div class="column c1"><a title="SMX2-C-M12"
                            href="https://campus.proven.cat/course/view.php?id=712"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i>SMX2-C-M12
                            Síntesi</a></div>
                </li><br>
                <li class="r1">
                    <div class="column c1"><a title="SMX2-C-M13"
                            href="https://campus.proven.cat/course/view.php?id=710"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs" aria-label="Curs"></i>SMX2-C-M13
                            FCT</a></div>
                </li><br>
                <li class="r0">
                    <div class="column c1"><a title="SMX2-C-Tutoria"
                            href="https://campus.proven.cat/course/view.php?id=711"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs"
                                aria-label="Curs"></i>SMX2-C-Tutoria</a></div>
                </li><br>
                <li class="r1">
                    <div class="column c1"><a title="SMX2C-M12-Projecte"
                            href="https://campus.proven.cat/course/view.php?id=878"><i
                                class="icon fa slicon-graduation fa-fw " title="Curs"
                                aria-label="Curs"></i>SMX2C-M12-Projecte informàtica</a></div>
                </li><br>
            </ul>

        </div>

    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N"
        crossorigin="anonymous"></script>
</body>