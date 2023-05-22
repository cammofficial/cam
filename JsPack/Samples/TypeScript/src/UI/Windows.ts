

import * as ui from "@mindfusion/common-ui";
import * as common from "@mindfusion/common";

namespace Windows
{

	// Create some data for the list items.
	var data = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

	// Create a new WindowHost control.
	var host = new ui.WindowHost(document.getElementById("host"));
	host.theme = "gray";

	// Set some custom sizing for the built-in toolStrips.
	host.commandStrip.width = new common.Unit(100, common.UnitType.Pixel);
	host.commandStrip.itemSize = new common.Unit(100, common.UnitType.Pixel);
	host.maximizedStrip.height = new common.Unit(50, common.UnitType.Pixel);
	host.minimizedStrip.height = new common.Unit(50, common.UnitType.Pixel);

	// Create two templated Windows and add them to the host's windows collection.
	var window1 = new ui.Window();
	window1.left = new common.Unit(10, common.UnitType.Percent);
	window1.top = new common.Unit(10, common.UnitType.Percent);
	window1.title = "Vertical list";
	window1.template = "<div id='inner-content'></div>";
	window1.controlLoad.addEventListener(window1Load);

	// Handle interaction events.
	window1.stateChanged.addEventListener(windowStateChanged);
	window1.dragStart.addEventListener(windowInteractionStart);
	window1.resizeStart.addEventListener(windowInteractionStart);
	window1.dragEnd.addEventListener(windowInteractionEnd);
	window1.resizeEnd.addEventListener(windowInteractionEnd);
	host.windows.add(window1);

	var window2 = new ui.Window();
	window2.title = "Horizontal list";
	window2.template = "<div id='inner-content'></div>";
	window2.controlLoad.addEventListener(window2Load);
	window2.stateChanged.addEventListener(windowStateChanged);
	window2.dragStart.addEventListener(windowInteractionStart);
	window2.resizeStart.addEventListener(windowInteractionStart);
	window2.dragEnd.addEventListener(windowInteractionEnd);
	window2.resizeEnd.addEventListener(windowInteractionEnd);
	host.windows.add(window2);

	// Render the host control.
	host.render();

	// Create a tooltip for first window.
	// When the window header is hovered the tooltip will appear above it.
	var tooltip1 = new ui.Tooltip(window1.header, "This is a vertical list view.");
	tooltip1.position = ui.TooltipPosition.Top;
	tooltip1.render();

	// Create a tooltip for second window.
	// When the window header is hovered the tooltip will appear to the left.
	var tooltip2 = new ui.Tooltip(window2.header, "This is a horizontal list view.");
	tooltip2.position = ui.TooltipPosition.Left;
	tooltip2.render();

	// This is the handler function of the window1.controlLoad event.
	// We will create a List control and add it to the window template.
	function window1Load(sender, args)
	{
		// Create a new ListView control.
		var list = new ui.ListView();
		list.theme = "light";

		// Create the list items.
		for (var i = 0; i < 19; i++)
		{
			list.items.add(new ui.ListItem(data[i]));
		}

		// Create the HTML templates for the items.
		list.items.forEach(
			function (item)
			{
				generateTemplate(item);
			});

		// Draw the control and append it window template DOM.
		sender.element.querySelector("#inner-content").appendChild(list.draw());
		list.attach();

		// Let the window calculate its size depending of the size of the template content.
		sender.autoSize();

		// Setting the height to 100% will cause the list to fill the height of the window when it is resized.
		list.height = common.Unit.percentage(100);
	}

	function window2Load(sender, args)
	{
		var list = new ui.ListView();
		list.orientation = ui.Orientation.Horizontal;
		list.theme = "light";

		for (var i = 0; i < 19; i++)
		{
			list.items.add(new ui.ListItem(data[i]));
		}

		list.items.forEach(
			function (item)
			{
				generateTemplate(item);
			});

		sender.element.querySelector("#inner-content").appendChild(list.draw());
		list.attach();
		sender.autoSize();

		// Positions the window in the center of the host.
		sender.center();

		// Setting the width to 100% will cause the list to fill the width of the window when it is resized.
		list.width = common.Unit.percentage(100);
	}

	// Create the HTML template for the list item.
	function generateTemplate(item)
	{
		var t = document.createElement("div");
		t.className = "templateClass";

		var d = document.createElement("div");
		d.style.display = "block";
		d.style.width = "60px";
		d.style.height = "60px";
		d.style.borderRadius = "50%";
		d.style.margin = "auto";
		d.style.backgroundColor = item.title;
		t.appendChild(d);

		var a = document.createElement("a");
		a.style.fontSize = "larger";
		a.style.margin = "10px";
		a.text = item.title;
		t.appendChild(a);

		item.template = t.outerHTML;
	}

	// This is the handler function for the stateShanged events of both windows.
	// The stateChanged event is raised when a window is maximized, minimized, or restored.
	function windowStateChanged(sender, args)
	{
		if (args.changes.windowState.newValue == ui.WindowState.Normal)
			enableTooltip(sender);
		else
			disableTooltip(sender);
	}

	// This is the handler function for the dragStart and resizeStart events of both windows.
	// The sender parameter is the window, that started the interaction.
	function windowInteractionStart(sender, args)
	{
		disableTooltip(sender);
	}

	// This is the handler function for the dragEnd and resizeEnd events of both windows.
	function windowInteractionEnd(sender, args)
	{
		enableTooltip(sender);
	}

	// Enable the window's tooltip.
	function enableTooltip(window)
	{
		if (window == window1)
		{
			tooltip1.enabled = true;
		}
		else
		{
			tooltip2.enabled = true;
		}
	}

	// Hide and temporarily disable the window's tooltip during the interaction.
	function disableTooltip(window)
	{
		if (window == window1)
		{
			tooltip1.hide();
			tooltip1.enabled = false;
		}
		else
		{
			tooltip2.hide();
			tooltip2.enabled = false;
		}
	}

}