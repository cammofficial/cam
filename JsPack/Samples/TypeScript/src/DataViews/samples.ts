document.addEventListener("DOMContentLoaded", function () {
	var e = document.createElement('div');
	e.innerHTML = 	'<hr />' +
	'<h1>About JsDataViews</h1>' +
	'<p>JsDataViews Grid is a lightweight grid control, that binds to an array of objects and displays the data in tabular format.</p>' +
	'<h2>Features</h2>' +
	'<ul>' +
	'<li>Row virtualization</li>' +
	'<li>Inplace editing</li>' +
	'<li>Select, add and delete grid rows interactively</li>' +
	'<li>Interactive column sorting and resizing</li>' +
	'<li>Custom draw cells and column headers</li>' +
	'<li>Localization support</li>' +
	'<li>Themes</li>' +
	'</ul>' +
	'JsGrid is written 100% in JavaScript and can easily be integrated into any web application. ' +
	'It uses Flexible Box for layout.</p>';

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

// import blue2 from '../UI/themes/blue.css';
// import gray2 from '../UI/themes/gray.css';
// import green2 from '../UI/themes/gray.css';
// import peach2 from '../UI/themes/peach.css';
// export { blue2, gray2, green2, peach2 }