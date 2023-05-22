/// <reference path="./Scripts/jspack-vsdoc.js" />

var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var theme = "standard";

// create a new instance of the ToolStrip control
var toolstrip = new ui.ToolStrip(document.getElementById("toolstrip"));
toolstrip.width = new common.Unit(150, common.UnitType.Pixel);
toolstrip.height = new common.Unit(100, common.UnitType.Percent);
toolstrip.itemSize = new common.Unit(40);
toolstrip.orientation = ui.Orientation.Vertical;
toolstrip.collapsible = true;
toolstrip.scrollable = false;
toolstrip.allowDrag = false;
toolstrip.theme = theme;

var button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "New Tab");
button.imageSrc = "./images/icon15.png";
button.tooltip = "New Tab";
button.cssClass = "toolbutton-add";
toolstrip.items.add(button);

var separator = new ui.ToolStripItem(ui.ToolStripItemType.Separator);
toolstrip.items.add(separator);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "Remove Tab");
button.imageSrc = "./images/icon4.png";
button.tooltip = "Remove Tab";
button.cssClass = "toolbutton-remove";
toolstrip.items.add(button);

separator = new ui.ToolStripItem(ui.ToolStripItemType.Separator);
toolstrip.items.add(separator);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "Themes");
button.imageSrc = "./images/icon8.png";
button.tooltip = "Themes";
toolstrip.items.add(button);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "standard");
button.data = 1;
button.visible = false;
button.cssClass = "toolbutton-2";
toolstrip.items.add(button);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "peach");
button.data = 1;
button.visible = false;
button.cssClass = "toolbutton-2";
toolstrip.items.add(button);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "business");
button.data = 1;
button.visible = false;
button.cssClass = "toolbutton-2";
toolstrip.items.add(button);

button = new ui.ToolStripItem(ui.ToolStripItemType.Label, "green");
button.data = 1;
button.visible = false;
button.cssClass = "toolbutton-2";
toolstrip.items.add(button);

separator = new ui.ToolStripItem(ui.ToolStripItemType.Separator);
toolstrip.items.add(separator);

toolstrip.itemMouseEnter.addEventListener(handleToolbuttonEnter);
toolstrip.itemClick.addEventListener(handleToolbuttonClick);

toolstrip.render();
toolstrip.expand();

// create a new instance of the TabControl control
var tabControl = new ui.TabControl(document.getElementById("tabcontrol"));
tabControl.width = tabControl.height = new common.Unit(100, common.UnitType.Percent);
tabControl.theme = theme;
tabControl.tabHeaderClick.addEventListener(handleTabHeaderClick);

var tab = new ui.TabPage("&#xab;");
tab.header.size = new common.Unit(20);
tab.header.interactive = false;
tab.header.tooltip = "Previous Tab";
tab.data = -1;
tab.enabled = false;
tab.header.cssClass = "tab-back";
tabControl.tabs.add(tab);

tab = new ui.TabPage("&#xbb;");
tab.header.size = new common.Unit(20);
tab.header.interactive = false;
tab.header.tooltip = "Next Tab";
tab.data = 1;
tab.enabled = false;
tab.header.cssClass = "tab-forward";
tabControl.tabs.add(tab);

tab = new ui.TabPage("+");
tab.header.size = new common.Unit(20);
tab.header.cssClass = "add-tab";
tab.header.interactive = false;
tab.enabled = false;
tabControl.tabs.add(tab);

// render the host control 
tabControl.render();

addEmptyPage();

function handleToolbuttonEnter(sender, args)
{
	for (var i = 0; i < sender.items.count(); i++)
	{
		if (sender.items.items()[i].data == 1)
		{
			sender.items.items()[i].visible = (args.item.title == "Themes" || args.item.data == 1);
		}
	}
}

function handleToolbuttonClick(sender, args)
{
	if (args.item.data == "1")
		tabControl.theme = args.item.title;
	else if (args.item.title == "New Tab")
		addEmptyPage();
	else if (args.item.title == "Remove Tab")
	{
		if (tabControl.items.count() > 3)
			tabControl.tabs.remove(tabControl.selectedItem);
	}
}

function addEmptyPage()
{
	var tab = new ui.TabPage("New Tab");
	tab.allowClose = true;
	tab.contentLoad.addEventListener(loadBrowserPage);
	tab.templateUrl = "BrowserPage.html";
	tab.header.imageSrc = "./images/icon_time.png";
	tabControl.tabs.insert(tabControl.tabs.count() - 1, tab);
}

function loadBrowserPage(page)
{
	page.element.querySelector("#url").addEventListener("change", function (e)
	{
		page.element.querySelector("#frame").addEventListener("load", function (e)
		{
			page.header.title = page.header.tooltip = page.element.querySelector("#url").value;
		});

		page.element.querySelector("#frame").src = e.target.value;
	});
}

function handleTabHeaderClick(sender, args)
{
	if (sender.title == "+")
	{
		addEmptyPage();
	}
	else if (sender.data == -1)
	{
		if (tabControl.selectedIndex > 2)
			tabControl.selectedIndex -= 1;
	}
	else if (sender.data == 1)
	{
		if (tabControl.selectedIndex < tabControl.items.count() - 2)
			tabControl.selectedIndex += 1;
	}
}
