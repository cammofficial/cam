/// <reference path="./Scripts/jspack-vsdoc.js" />

var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var listView;
var host;
var theme = "gray";

document.addEventListener("DOMContentLoaded", function ()
{
	listView = new ui.ListView(document.getElementById("listView"));
	listView.width = listView.height = common.Unit.percentage(100);
	listView.theme = theme;
	listView.itemSize = common.Unit.pixel(100);
	listView.itemDoubleClick.addEventListener(handleItemDoubleClick);

	var item = new ui.ListItem();
	item.title = "Armillaria Ponderosa";
	item.template = generateTemplate("./images/h1.png", item.title, true);
	listView.items.add(item);

	item = new ui.ListItem();
	item.title = "Cantharellus Cibarius";
	item.template = generateTemplate("./images/h2.png", item.title, true);
	listView.items.add(item);

	item = new ui.ListItem();
	item.title = "Morchella Esculenta";
	item.template = generateTemplate("./images/h3.png", item.title, true);
	listView.items.add(item);

	item = new ui.ListItem();
	item.title = "Tuber Magnatum";
	item.data = 1;
	item.template = generateTemplate("./images/h4.png", item.title, false);
	listView.items.add(item);

	listView.render();

	// create a new instance of the WindowHost control
	host = new ui.WindowHost(document.getElementById("host"));
	host.width = host.height = new common.Unit(100, common.UnitType.Percent);
	host.theme = theme;
	host.render();
});

function generateTemplate(image, title, online)
{
	var t = document.createElement("div");
	t.style.color = "#000";
	t.style.height = "100%";
	t.style.display = "flex";
	t.style.alignItems = "center";

	var img = document.createElement("img");
	img.style.display = "block";
	img.style.width = "60px";
	img.style.borderRadius = "50%";
	img.style.border = online ? "4px solid #39CCCC" : "4px solid #85144b";
	img.src = image;
	t.appendChild(img);

	var a = document.createElement("a");
	a.style.fontSize = "larger";
	a.style.margin = "10px";
	a.style.color = "#fff";
	a.text = title;
	t.appendChild(a);

	return t.outerHTML;
}

function handleItemDoubleClick(sender, args)
{
	if (args.item.data)
	{
		var tip = new ui.Tooltip(args.item.element);

		var t = document.createElement("div");
		var img = document.createElement("img");
		img.width = img.height = 40;
		img.src = "./images/icon_fish.png";
		img.style.verticalAlign = "middle";
		t.appendChild(img);
		var span = document.createElement("span");
		span.innerText = "This user is not currently online";
		t.appendChild(span);
		tip.template = t.outerHTML;

		tip.theme = "peach";
		tip.position = ui.TooltipPosition.Center;
		tip.trigger = ui.TooltipTrigger.None;
		tip.render();
		tip.show();

		setTimeout(function () { tip.dispose() }, 2000);
		return;
	}

	var window = host.windows.where(function (window) { return window.data == args.item }).first();
	if (window)
	{
		if (!window.visible)
			window.open();
		if (window.windowState != ui.WindowState.Normal)
			window.restore();
		host.bringToFront(window);
	}
	else
	{
		window = new ui.Window();
		window.top = common.Unit.percentage(25);
		window.left = common.Unit.percentage(25);
		window.width = common.Unit.pixel(400);
		window.height = common.Unit.pixel(300);
		window.minWidth = common.Unit.pixel(250);
		window.minHeight = common.Unit.pixel(300);
		window.title = args.item.title;
		window.data = args.item;
		window.templateUrl = "ChatWindow.html";

		window.commandStrip.height = common.Unit.pixel(50);

		window.contentLoad.addEventListener(loadChatWindow);
		host.windows.add(window);
	}
}

function loadChatWindow(sender)
{
	var tools = new ui.ToolStrip();
	tools.theme = theme;
	tools.scrollable = false;
	tools.allowDrag = false;
	tools.itemClick.addEventListener(onToolClick);

	button = new ui.ToolStripItem(ui.ToolStripItemType.Icon);
	button.imageSrc = "./images/icon_home.png";
	button.tooltip = "home";
	tools.items.add(button);

	button = new ui.ToolStripItem(ui.ToolStripItemType.Icon);
	button.imageSrc = "./images/icon_time.png";
	button.tooltip = "clock";
	tools.items.add(button);

	tools.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Separator));

	var button = new ui.ToolStripItem(ui.ToolStripItemType.Label, sender.data.title);
	button.tooltip = sender.data.title;
	tools.items.add(button);

	tools.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Separator));

	sender.element.querySelector("#toolstrip").appendChild(tools.draw());
	tools.attach();

	sender.element.querySelector("#newMessage").addEventListener("change", function (e)
	{
		var pmDiv = e.target.parentNode.querySelector("#prevMessage");
		pmDiv.innerHTML += "You, " + new Date().toLocaleTimeString() + '<br/>';
		pmDiv.innerHTML += e.target.value + '<br/>';
		pmDiv.scrollTop = pmDiv.scrollHeight;
		e.target.value = "";
	})

	var tools2 = new ui.ToolStrip();
	tools2.height = tools2.itemSize = common.Unit.pixel(30);
	tools2.theme = theme;
	tools2.allowDrag = false;
	tools2.itemClick.addEventListener(onToolClick);

	for (var i = 1; i < 15; i++)
	{
		button = new ui.ToolStripItem(ui.ToolStripItemType.Icon);
		button.imageSrc = "./images/icon" + i.toString() + ".png";
		button.tooltip = "toolbutton#" + i.toString();
		tools2.items.add(button);
		tools2.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Separator));
	}

	sender.footer.appendChild(tools2.draw());
	tools2.attach();

	sender.updateBounds();
}

function onToolClick(sender, args)
{
	alert("tool button #" + args.item.tooltip + " clicked");
}