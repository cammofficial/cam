/// <reference path="../Scripts/jspack-vsdoc.js" />
var ui = MindFusion.Common.UI;

function showForm()
{
	// Create a new Window.
	// If the element parameter of the Window constructor is not provided, the DOM element of the control will be created internally.
	var window1 = new ui.Window();

	// Set the window title
	window1.title = "Data form";

	// Set the window theme
	window1.theme = "standard";

	// Set the window visibility to false to avoid flickering during content loading.
	window1.visible = false;

	// Disable interactions.
	window1.allowResize = false;
	window1.allowPin = false;
	window1.allowMaximize = false;
	window1.allowMinimize = false;
	window1.allowClose = false;
	// Set the window templateUrl.
	// The HTML of the specified page will be set as the innerHTML of a scrollable div inside the Window's content element.
	window1.templateUrl = "form.html";

	// Add event handlers.
	window1.contentLoad.addEventListener(contentLoad);

	// Draw the window and append it to the page DOM.
	document.getElementById("content").appendChild(window1.draw());

	// Prepare the window for user interaction.
	window1.attach();
}

// This is the handler function of the window1.contentLoad event.
// The event is raised when the internal content of the window has finished loading.
// The sender argument is the Window control.
// Set the window visibility to true and let it calculate its size based on the size of its content.
function contentLoad(sender, args)
{
	sender.visible = true;
	sender.autoSize();
	sender.center();

	// Attach a handler to the form submit event.
	sender.element.querySelector("#form").addEventListener("submit", postData.bind(sender));
}

function postData(e)
{
	// Prevent form submission.
	e.preventDefault();

	// Get a reference to the form element and collect the data.
	var form = this.element.querySelector("form");
	var data = "";
	for (var i = 0; i < form.elements.length - 1; i++)
	{
		data += form.elements[i].name + " = " + form.elements[i].value + "\n";
	}

	// Show an information box with the submitted data and dispose the window.
	ui.Dialogs.showInfoDialog("Submitted data", data, function () { this.dispose(); }.bind(this), document.getElementById("content"), "standard");
}