document.addEventListener("DOMContentLoaded", function () {

	let e = document.createElement('div');
	e.innerHTML = 	'<hr />' +
	'<h1>About JsPack</h1>' +
	'<p>MindFusion Pack for JavaScript includes the following major libraries:' +
	'<ul>' +
	'<li>Diagramming</li>' +
	'<li>Charting</li>' +
	'<li>Gauges</li>' +
	'<li>Scheduling</li>' +
	'<li>Mapping</li>' +
	'<li>Keyboard</li>' +
	'<li>DataViews</li>' +
	'<li>UI</li>' +
	'</ul>' +
	'All JsPack libraries are written 100% in JavaScript and can easily be integrated into any web application.</p>';

	if (document.getElementById('infoTab'))
		document.getElementById('infoTab').appendChild(e);
});

