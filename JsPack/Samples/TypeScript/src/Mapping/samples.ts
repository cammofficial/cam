document.addEventListener("DOMContentLoaded", function () {

	let e = document.createElement('div');
	e.innerHTML = 	'<hr />' +
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

	if (document.getElementById('infoTab'))
		document.getElementById('infoTab').appendChild(e);

});

// import blue from './themes/blue.css';
// import business from './themes/business.css';
// import earth from './themes/earth.css';
// import gray from './themes/gray.css';
// import green from './themes/green.css';
// import light from './themes/light.css';
// import pastel from './themes/pastel.css';
// import peach from './themes/peach.css';
// import standard from './themes/standard.css';
// export { blue, business, earth, gray, green, light, pastel, peach, standard };
