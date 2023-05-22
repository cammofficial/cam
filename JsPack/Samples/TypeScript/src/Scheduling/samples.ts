
const jsPlannerInfo =
	'<hr />' +
	'<h1>About JsPlanner</h1>' +
	'<p>JsPlanner is fully interactive scheduling control for the web, that can be used to present calendars and timetables to users and ' +
	'let them edit the schedule information interactively. JsPlanner can display a schedule in several view types, such as: ' +
	'<ul>' +
	'<li>Single and multiple month views</li>' +
	'<li>Single and multiple week views</li>' +
	'<li>Horizontal and vertical lists of time intervals</li>' +
	'<li>Horizontal and vertical timetables</li>' +
	'<li>Resource view, displaying the distribution of resources over a period of time</li>' +
	'</ul>' +
	'<h2>Features</h2>' +
	'<ul>' +
	'<li>Several different view types</li>' +
	'<li>Interactive item creation and modification</li>' +
	'<li>Filtering and grouping</li>' +
	'<li>Recurring events</li>' +
	'<li>Localization support</li>' +
	'<li>Themes</li>' +
	'<li>XML and JSON schedule serialization</li>' +
	'</ul>' +
	'JsPlanner is written 100% in JavaScript and can easily be integrated into any web application. ' +
	'It uses Flexible Box for layout.</p>';

document.addEventListener("DOMContentLoaded", function () {

	let e = document.createElement('div');
	e.className = "product_info";
	e.innerHTML = jsPlannerInfo;

	if (document.getElementById('infoTab'))
	{
		document.getElementById('infoTab').querySelectorAll("div.product_info").forEach(el => el.remove());
		document.getElementById('infoTab').appendChild(e);
	}
});

