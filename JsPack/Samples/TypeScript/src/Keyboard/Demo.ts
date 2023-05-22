import * as k from '@mindfusion/keyboard';

document.addEventListener("DOMContentLoaded", function (event) {
	var vk = k.VirtualKeyboard.create(document.getElementById("keyboard"));
	vk.scaleToFitParent = false;

	vk.render();
	document.getElementById("mode").onchange = function (event) {
		vk.layoutMode = Number((<HTMLSelectElement>event.target).value);
	}
	document.getElementById("lang").onchange = function (event) {
		vk.inputLocale = (<HTMLSelectElement>event.target).value;
	}
	document.getElementById("theme").onchange = function (event) {
		vk.theme = (<HTMLSelectElement>event.target).value;
	}
});