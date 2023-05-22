
var chartInfo =
	'<hr />' +
	'<h1>About MindFusion.Charting</h1>' +
	'<p>MindFusion.Charting is a multi-functional dashboard library that draws various types of charts. It is implemented in TypeScript/JavaScript and renders graphics objects using the HTML 5 Canvas element. For Canvas support and heavy-duty geometric and layout calculations done in JavaScript, MindFusion.Charting requires a latest-generation browser. By providing your software with ready to use capabilities for laying out, rendering and feeding data into dashboards, MindFusion.Charting saves you hundreds of hours coding and debugging.</p>' +
	'<h2>Features</h2>' +
	'<ul>' +
		'<li>Draw bar, line, area, scatter, bubble, pie, doughnut, radar and polar charts;</li>' +
		'<li>Draw multiple plots;</li>' +
		'<li>Draw more than one graphics per plot;</li>' +
		'<li>Draw multiple X and Y axes;</li>' +
		'<li>Draw a customizable background grid;</li>' +
		'<li>Add multiple chart legends and choose their settings;</li>' +
		'<li>Show multiple image or text components;</li>' +
		'<li>Add label prefixes and suffixes to chart numbers;</li>' +
		'<li>Abbreviate numerical labels when too long;</li>' +
		'<li>Set the minimum and maximum value for any of the chart\'s axes;</li>' +
		'<li>Set up dynamic layout of dashboard components;</li>' +
	'</ul>';

document.addEventListener("DOMContentLoaded", function ()
{
	if (document.getElementById('copyright'))
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";

	var e = document.createElement('div');
	e.innerHTML = chartInfo;

	if (document.getElementById('infoTab'))
		document.getElementById('infoTab').appendChild(e);

	MindFusion.Controls.Control.licenseLocation = "../pack_lic.txt";
});

var collapsed = false;
function onExpandCollapse()
{
	if (collapsed)
	{
		document.getElementById('info').style.width = '400px';
		document.getElementById('content').style.right = '401px';
		document.getElementById('expandButton').innerHTML = "&rsaquo;";
		collapsed = false;
	}
	else
	{
		document.getElementById('info').style.width = '0px';
		document.getElementById('content').style.right = '0px';
		document.getElementById('expandButton').innerHTML = "&lsaquo;";
		collapsed = true;
	}
}