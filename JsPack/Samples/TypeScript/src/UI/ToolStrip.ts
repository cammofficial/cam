import * as Drawing from "@mindfusion/drawing";
import * as common from "@mindfusion/common";
import * as ui from "@mindfusion/common-ui";

namespace ToolStrip {

	// Create a new ToolStrip control.
	var strip = new ui.ToolStrip();
	strip.theme = "business";
	strip.scrollable = false;

	// Create an item, displaying text.
	var item = new ui.ToolStripItem(ui.ToolStripItemType.Label, "Theme");
	strip.items.add(item);

	// Create an item, displaying an icon.
	item = new ui.ToolStripItem(ui.ToolStripItemType.Icon);
	item.imageSrc = "../assets/icon_home.png";
	item.size = common.Unit.pixel(36);
	strip.items.add(item);

	// create an item, displaying text and an icon.
	item = new ui.ToolStripItem(ui.ToolStripItemType.Label, "Armillaria Ponderosa");
	item.imageSrc = "../assets/h1.png";
	strip.items.add(item);

	// Create a separator item.
	item = new ui.ToolStripItem(ui.ToolStripItemType.Separator);
	strip.items.add(item);

	// Create an item with HTML template
	item = new ui.ToolStripItem(ui.ToolStripItemType.Default);
	item.template = "<input type='text' id='node_title'></input><input type='button' value='&#x1f50d;'/>";
	strip.items.add(item);

	// Draw the control and append it to the page DOM.
	document.getElementById("content").appendChild(strip.draw());
	// Prepare the control for user interaction.
	strip.attach();

	// Add event handlers.
	strip.itemDragStart.addEventListener(itemDragStart);
	strip.itemMouseEnter.addEventListener(itemMouseEnter);
	strip.itemMouseDown.addEventListener(itemMouseDown);

	// Create a tooltip for the search field.
	// When the search field is focused the tooltip will appear below it with the specified offset.
	var tooltip = new ui.Tooltip(document.getElementById("node_title"), "This is a search field.");
	tooltip.theme = "business";
	tooltip.offset = new Drawing.Point(0, 10);
	tooltip.position = ui.TooltipPosition.Bottom;
	tooltip.trigger = ui.TooltipTrigger.Focus;
	tooltip.render();

	// Create a new Menu control.
	// It will be used as a popup menu for the "Theme" toolstrip item.
	var menu = new ui.Menu();
	menu.cssClass = "popmenu";
	menu.items.add(new ui.MenuItem("earth"));
	menu.items.add(new ui.MenuItem("peach"));
	menu.items.add(new ui.MenuItem("business"));

	// Add event handler to menu's itemClick event.
	// When an item is clicked the toolstrip's theme will be changed 
	// and then the menu will removed from the page DOM.
	menu.itemClick.addEventListener(function (sender, args) {
		strip.theme = args.item.title;
		sender.dispose();
	})

	// This is the handler function of the toolstrip.itemDragStart event.
	// Drag operations will be cancelled if the item to be dragged is the templated item
	// or if the menu is currently visible.
	function itemDragStart(sender, args) {
		if (sender.type == ui.ToolStripItemType.Default)
			args.cancel = true;
		if (menu.loaded)
			args.cancel = true;
	}

	// This is the handler function of the toolstrip.itemMouseEnter event.
	// If the menu is currently visible it will be removed.
	// Otherwise, the menu will be created right below the hovered item.
	function itemMouseEnter(sender, args) {
		if (menu.loaded) {
			menu.dispose();
		}
		else if (args.item.title == "Theme") {
			menu.theme = sender.theme;
			menu.left = common.Unit.pixel(sender.bounds.x + args.item.bounds.x);
			menu.top = common.Unit.pixel(sender.bounds.y + args.item.bounds.height);

			document.body.appendChild(menu.draw());
			menu.attach();
		}
	}

	// This is the handler function of the toolstrip.itemMouseDown event.
	// Simulate a search.
	// An information dialog will be shown when the search button is pressed.
	function itemMouseDown(sender, args) {
		var input = args.item.element.querySelector("#node_title");

		if (args.rawEventArgs.target.type == "button") {
			ui.Dialogs.showInfoDialog("Search", "Searching for '" + input.value + "'.\n No results found.",
				null, <HTMLElement>document.getElementById("content"), sender.theme);
		}
		else {
			if (input) input.focus();
		}
	}


}