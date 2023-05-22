import * as k from '@mindfusion/keyboard';
import { numpadDef } from './numpad';

document.addEventListener("DOMContentLoaded", function (event) {
	var vk = k.VirtualKeyboard.create(document.getElementById("keyboard"));
	k.KeyboardState.NumLock = true;
	var layout = k.KeyboardLayout.create(numpadDef);
	vk.layout = layout;
	vk.render();
});