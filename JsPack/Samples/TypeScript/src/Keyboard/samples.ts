document.addEventListener("DOMContentLoaded", function () {
	var e = document.createElement('div');
	e.innerHTML = 	'<hr />' +
	'<h1>About JsVirtualKeyboard</h1>' +
	'<p>JsVirtualKeyboard is an on-screen keyboard component that enables text and shortcut input through touch, mouse or stylus events.' +
	'The control works similarly to the keyboards embedded in hand-held devices, letting users input text into the currently focused entry field. ' +
	'It is especially useful for applications running on touch screen terminals, such as POS or industrial systems.</p>' +
	'<p>JsVirtualKeyboard is written 100% in JavaScript and can easily be integrated into any web application.</p>';

	if (document.getElementById('infoTab')) {
		document.getElementById('infoTab').appendChild(e);
	}
});