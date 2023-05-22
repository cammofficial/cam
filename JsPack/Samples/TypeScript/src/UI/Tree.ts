import * as Drawing from "@mindfusion/drawing";
import * as common from "@mindfusion/common";
import * as ui from "@mindfusion/common-ui";

namespace Tree
{

	// Create a new TreeView control.
	var tree = new ui.TreeView();
	tree.theme = "green";
	tree.width = common.Unit.pixel(300);
	tree.height = common.Unit.pixel(400);
	tree.allowDrag = false;
	tree.itemMouseEnter.addEventListener(nodeEnter);
	document.getElementById("content").appendChild(tree.draw());
	tree.attach();

	// Create a templated tooltip.
	var tooltip = new ui.Tooltip(tree.element);
	tooltip.theme = "earth";
	tooltip.cssClass = "mfc-tooltip-right";
	tooltip.template = generateTooltipTemplate();
	// The tooltip's visibility will be controlled programmatically.
	tooltip.trigger = ui.TooltipTrigger.None;
	tooltip.position = ui.TooltipPosition.Cursor;
	tooltip.render();

	var icons = ["../assets/icon_delivery.png", "../assets/icon_home.png", "../assets/icon_time.png"];
	var fileName = '../data/TreeData.json';

	loadJSON(fileName, function (response)
	{
		// Load tree data from the JSON object.
		var data = JSON.parse(response);
		tree.fromObject(data.project.items);

		// The flatItems property returns all tree nodes in the view as a flat list.
		// Set the image and size of the nodes, depending on their depth in the nodes hierarchy.
		tree.flatItems.forEach(
            function (item)
            {
				item.imageSrc = icons[item.level];
				item.size = common.Unit.pixel(50 - (item.level * 10));
            });
	});

	function loadJSON(name, callback)
	{
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', name, true);
		xobj.onreadystatechange = function ()
		{
			if (xobj.readyState == 4 && xobj.status == 200)
			{
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	}

	// Create the tooltip HTML template.
	function generateTooltipTemplate()
	{
		var t = document.createElement("div");
		t.className = "cardClass";

		var img = document.createElement("img");
		img.src = "../assets/icon_delivery.png";
		img.style.width = "100px";
		img.style.height = "100px";
		img.style.margin = "auto";
		t.appendChild(img);

		var span = document.createElement("span");
		span.id = "truckNo";
		span.style.fontSize = "larger";
		t.appendChild(span);

		var span = document.createElement("span");
		span.id = "dest";
		t.appendChild(span);

		var span = document.createElement("span");
		span.id = "del";
		t.appendChild(span);

		return t.outerHTML;
	}

	// This is the handler function of tree.itemMouseEnter event.
	// If the node, sending the event is a root node, set some node-dependent data and show the tooltip.
	function nodeEnter(sender, args)
	{
		var node = args.item;
		if (!node.parentNode)
		{
			(<HTMLSpanElement>tooltip.element.querySelector("#truckNo")).innerText = node.title;
			(<HTMLSpanElement>tooltip.element.querySelector("#dest")).innerText = node.flatItems.where(function (n) { return n.level == 1 }).count();
			(<HTMLSpanElement>tooltip.element.querySelector("#del")).innerText = node.flatItems.where(function (n) { return n.level == 2 }).count();

			tooltip.show(new Drawing.Point(tree.bounds.right() + 10, tree.bounds.y + node.bounds.y - tree.element.scrollTop));
		}
		else
			tooltip.hide();
	}

}