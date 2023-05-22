var mk = MindFusion.Keyboard;
var KeyboardState = MindFusion.Keyboard.KeyboardState;
var KeyboardLayout = MindFusion.Keyboard.KeyboardLayout;

document.addEventListener("DOMContentLoaded", function (event)
{
	var vk = mk.VirtualKeyboard.create(document.getElementById("keyboard"));
	KeyboardState.NumLock = true;
	var layout = KeyboardLayout.create(numpadDef);
	vk.layout = layout;
	vk.render();
});