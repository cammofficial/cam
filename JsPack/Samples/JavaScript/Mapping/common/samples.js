
var jsMapViewerInfo =
	'<hr />' +
	'<h1>About JsMapping</h1>' +
	'<p>JsMapping MapView is an interactive map viewer control, that can be used to display tiled web maps hosted on a public server.' +
	'<h2>Features</h2>' +
	'<ul>' +
		'<li>Map tile layers</li>' +
		'<li>Decoration overlays</li>' +
		'<li>Image and CSS-styled markers</li>' +
		'<li>Circle and polyline decoration drawings</li>' +
		'<li>Text bubbles</li>' +
		'<li>Drag panning</li>' +
		'<li>Mouse wheel zoom</li>' +
		'<li>Built-in zoom and layers controllers</li>' +
		'<li>Themes</li>' +
	'</ul>' +
	'JsMapping is written 100% in JavaScript and can easily be integrated into any web application.</p>';

document.addEventListener("DOMContentLoaded", function ()
{
	if (document.getElementById('copyright'))
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";

	var e = document.createElement('div');
	e.innerHTML = jsMapViewerInfo;

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
