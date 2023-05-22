document.addEventListener("DOMContentLoaded", function () {

	let e = document.createElement('div');
	e.className = "product_info";
	e.innerHTML = 	'<hr />' +
	'<h1>About JsUI</h1>' +
	'<p>JsUI is as set of JavaScript controls, including ' +
	'<ul>' +
	'<li>Window and WindowHost controls</li>' +
	'<li>TabControl</li>' +
	'<li>ListView</li>' +
	'<li>TreeView</li>' +
	'<li>Menu</li>' +
	'<li>ToolStrip</li>' +
	'<li>Calendar and DatePicker controls</li>' +
	'<li>CheckListBox and CheckListPicker</li>' +
	'<li>ImagePicker</li>' +
	'<li>Tooltips</li>' +
	'<li>Custom dialogs</li>' +
	'</ul>' +
	'JsUI controls are written 100% in JavaScript and can easily be integrated into any web application. </p>';

	if (document.getElementById('infoTab'))
		document.getElementById('infoTab').appendChild(e);
});

