<?php include '../html/navbar.html';?>
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


</head>
<style>

.calendar {
 width: 1000px;
 height: 1000px;
 margin: auto;
 text-align: center;
 position: relative;
 font-size:xx-large;
 margin-top: 9%;
 margin-left: -350px;
}


.header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 10px;
}


button {
 background-color: transparent;
 border: none;
 font-size: 20px;
 cursor: pointer;
}

#prevBtn 
{
  margin-left:1040px
}

#nextBtn
{
  margin-left:200px
}

table {
 border-collapse: collapse;
 width: 100%;

 background-color: white;
 
}
#monthYear {
	font-family: 'Anton', sans-serif;
  margin-left: 170px
  
}

th,
td {
 border: 1px solid #ccc;
 padding: 5px;
 text-align: center;
}


th {
 background-color: gray;
}

.today {
background-color: skyblue;
}
</style>
<div class="calendar">
 <div class="header">
 <button id="prevBtn">&lt;</button>
 <h2 id="monthYear"></h2>
 <button id="nextBtn">&gt;</button>
 </div>
 <table>
 <thead>
 <tr>
 <th>Dom</th>
 <th>Lun</th>
<th>Mar</th>
 <th>Mié</th>
 <th>Jue</th>
 <th>Vie</th>
 <th>Sáb</th>
 </tr>
 </thead>
<tbody id="calendarBody"></tbody>
 </table>
</div>


<script>
const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  // Clear previous month's dates
  calendarBody.innerHTML = "";

  // Set month and year in header
  monthYear.innerText = `${getMonthName(currentMonth)} ${currentYear}`;

  // Get number of days in current month
  const numDays = getNumDays(currentMonth, currentYear);

  // Get first day of current month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Render dates in calendar
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // Create row
    const row = document.createElement("tr");

    // Create cells for each day of the week
    for (let j = 0; j < 7; j++) {
      // If before first day or after last day, render empty cell
      if ((i === 0 && j < firstDay) || date > numDays) {
        const cell = document.createElement("td");
        row.appendChild(cell);
      } else {
        // Create cell and add date
        const cell = document.createElement("td");
        cell.innerText = date;
        if (isToday(date)) {
          cell.classList.add("today");
        }
        cell.addEventListener("click", () => {
         
 const text = prompt("Ingrese el texto para este día:");
 if (text) {
 cell.innerText = `${date}\n${text}`;
 const formattedDate = `${currentYear}-${currentMonth + 1}-${date}`;
 const data = new FormData();
 data.append("fecha", formattedDate);
 data.append("evento", text);
fetch("calendario.php", {
 method: "POST",
 body: data
 })
 .then(response => {
 if (response.ok) {
 console.log("Evento guardado");
} else {
 console.error("Error al guardar evento");
 }
 })
.catch(error => {
 console.error(error);
 });
 }
});


    
        row.appendChild(cell);
        date++;
      }
    }

    // Add row to calendar
    calendarBody.appendChild(row);
  }
}

function getMonthName(month) {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  return monthNames[month];
}

function getNumDays(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function isToday(date) {
  const today = new Date();
  return currentMonth === today.getMonth() && currentYear === today.getFullYear() && date === today.getDate();
}

// Render initial calendar
renderCalendar();

// Add event listeners to prev and next buttons
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});




</script>






<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js" integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N" crossorigin="anonymous"></script>
</body>




    <script src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="9e6ce10e419db5d3484125c6-|49" defer></script></body>
</html>
