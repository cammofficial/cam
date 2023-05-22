
import * as Common from "@mindfusion/common";
import * as UI from "@mindfusion/common-ui";


var listView;
var host;
var theme = "gray";

listView = new UI.ListView(document.getElementById("listView"));
listView.width = listView.height = Common.Unit.percentage(100);
listView.theme = theme;
listView.itemSize = Common.Unit.pixel(70);
listView.itemDoubleClick.addEventListener(handleItemDoubleClick);

var item = new UI.ListItem();
item.title = "Armillaria Ponderosa";
item.template = generateTemplate("../assets/h1.png", item.title, true);
listView.items.add(item);

item = new UI.ListItem();
item.title = "Cantharellus Cibarius";
item.template = generateTemplate("../assets/h2.png", item.title, true);
listView.items.add(item);

item = new UI.ListItem();
item.title = "Morchella Esculenta";
item.template = generateTemplate("../assets/h3.png", item.title, true);
listView.items.add(item);

item = new UI.ListItem();
item.title = "Tuber Magnatum";
item.data = 1;
item.template = generateTemplate("../assets/h4.png", item.title, false);
listView.items.add(item);

listView.render();

// create a new instance of the WindowHost control
host = new UI.WindowHost(document.getElementById("host"));
host.width = host.height = new Common.Unit(100, Common.UnitType.Percent);
host.theme = theme;
host.render();

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
		var tip = new UI.Tooltip(args.item.element);

		var t = document.createElement("div");
		var img = document.createElement("img");
		img.width = img.height = 40;
		img.src = "../assets/icon_fish.png";
		img.style.verticalAlign = "middle";
		t.appendChild(img);
		var span = document.createElement("span");
		span.innerText = "This user is not currently online";
		t.appendChild(span);
		tip.template = t.outerHTML;

		tip.theme = "peach";
		tip.position = UI.TooltipPosition.Center;
		tip.trigger = UI.TooltipTrigger.None;
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
		if (window.windowState != UI.WindowState.Normal)
			window.restore();
		host.bringToFront(window);
	}
	else
	{
		window = new UI.Window();
		window.top = Common.Unit.percentage(25);
		window.left = Common.Unit.percentage(25);
		window.width = Common.Unit.pixel(400);
		window.height = Common.Unit.pixel(300);
		window.title = args.item.title;
		window.data = args.item;
		window.templateUrl = "chatWindow.html";

		window.commandStrip.height = Common.Unit.pixel(50);

		window.contentLoad.addEventListener(loadChatWindow);
		host.windows.add(window);
	}
}

function loadChatWindow(sender)
{
	var tools = new UI.ToolStrip();
	tools.theme = theme;
	tools.scrollable = false;
	tools.allowDrag = false;
	tools.itemClick.addEventListener(onToolClick);

	button = new UI.ToolStripItem(UI.ToolStripItemType.Icon);
	button.imageSrc = "../assets/icon_home.png";
	button.tooltip = "home";
	tools.items.add(button);

	button = new UI.ToolStripItem(UI.ToolStripItemType.Icon);
	button.imageSrc = "../assets/icon_time.png";
	button.tooltip = "clock";
	tools.items.add(button);

	tools.items.add(new UI.ToolStripItem(UI.ToolStripItemType.Separator));

	var button = new UI.ToolStripItem(UI.ToolStripItemType.Label, sender.data.title);
	button.tooltip = sender.data.title;
	tools.items.add(button);

	tools.items.add(new UI.ToolStripItem(UI.ToolStripItemType.Separator));

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

	var tools2 = new UI.ToolStrip();
	tools2.height = tools2.itemSize = Common.Unit.pixel(30);
	tools2.theme = theme;
	tools2.allowDrag = false;
	tools2.itemClick.addEventListener(onToolClick);

	for (var i = 1; i < 15; i++)
	{
		button = new UI.ToolStripItem(UI.ToolStripItemType.Icon);
		button.imageSrc = "../assets/icon" + i.toString() + ".png";
		button.tooltip = "toolbutton#" + i.toString();
		tools2.items.add(button);
		tools2.items.add(new UI.ToolStripItem(UI.ToolStripItemType.Separator));
	}

	sender.footer.appendChild(tools2.draw());
	tools2.attach();

	sender.updateBounds();
}

function onToolClick(sender, args)
{
	alert("tool button #" + args.item.tooltip + " clicked");
}