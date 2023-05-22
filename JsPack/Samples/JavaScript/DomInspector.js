/// <reference path="./Scripts/jspack-vsdoc.js" />

var d = MindFusion.Diagramming;
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var diagram;
var treeView;
var listView;
var tooltip;

var theme = "light";

document.addEventListener("DOMContentLoaded", function ()
{
	// create a diagramView component that wraps the "diagram" canvas
	var diagramView = d.DiagramView.create(document.getElementById("diagram"));
	diagramView.behavior = d.Behavior.SelectOnly;
	diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;
	diagram.nodeEffects.push(new d.GlassEffect());

	// rearrange the tree when a branch is expanded ot collapsed
	diagram.addEventListener(d.Events.treeCollapsed, rearrangeTree);
	diagram.addEventListener(d.Events.treeExpanded, rearrangeTree);

	diagram.addEventListener(d.Events.nodeClicked, selectNode);

	var text = "Click a node to locate it in the tree view. Right-click a node to see its HTML.";
	var tip = new ui.Tooltip(diagramView.element, text);
	tip.position = ui.TooltipPosition.Top;
	tip.theme = theme;
	tip.render();

	treeView = new ui.TreeView(document.getElementById("treeView"));
	treeView.width = treeView.height = common.Unit.percentage(100);
	treeView.theme = theme;

	treeView.loadOnDemand = false;
	treeView.allowDrag = true;
	treeView.allowDrop = true;
	treeView.itemDrag.addEventListener(nodeDrag);

	// build a tree whose nodes correspond to the page DOM elements
	buildTree();

	text = "Displays the DOM hierarchy of the HTML page. \n" +
	"Drag nodes to the list below to inspect them."
	tip = new ui.Tooltip(treeView.element, text);
	tip.position = ui.TooltipPosition.Left;
	tip.theme = theme;
	tip.render();

	listView = new ui.ListView(document.getElementById("listView"));
	listView.width = listView.height = common.Unit.percentage(100);
	listView.theme = theme;
	listView.dragDrop.addEventListener(listDragDrop);
	listView.selectionChanged.addEventListener(listSelectionChanged);
	listView.render();

	text = "Select items from the list to highlight the corresponding DOM element in the page";
	tip = new ui.Tooltip(listView.element, text);
	tip.position = ui.TooltipPosition.Left;
	tip.theme = theme;
	tip.render();

	tooltip = new ui.Tooltip(diagramView.element);
	tooltip.trigger = ui.TooltipTrigger.None;
	tooltip.follow = false;
	tooltip.theme = theme;

});

function buildTree()
{
	// create a box that will be a root in our hierarchy
	var root = new d.ShapeNode(diagram);
	root.bounds = new MindFusion.Drawing.Rect(0, 0, 20, 12);
	root.text = "body";
	root.brush = "#bdf07c";
	diagram.addItem(root);

	// traverse the page DOM recursively and create corresponding diagram items
	buildBranches(root, document.body, 1);

	// arrange the tree
	var treeLayout = new MindFusion.Graphs.TreeLayout();
	treeLayout.linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;
	diagram.arrange(treeLayout);

	diagram.resizeToFitItems(5);

	// create a tree node that will be a root in our hierarchy
	var root = new ui.TreeNode("body");
	treeView.items.add(root);
	// traverse the page DOM recursively and create corresponding tree nodes
	buildBranches(root, document.body, 1);
	// render the treeView control
	treeView.render();
}

function buildBranches(treeNode, domElement, level)
{
	domElement.childNodes.forEach(function (child)
	{
		if (child.nodeName == "DIV")
		{
			if (treeNode instanceof d.ShapeNode)
			{
				// create a node for the child element
				var childNode = new d.ShapeNode(diagram);
				childNode.bounds = new MindFusion.Drawing.Rect(0, 0, 20, 12);
				childNode.text = child.nodeName;
				childNode.brush = { type: "LinearGradientBrush", color1: "#e0e9e9", color2: "#bdf07c", angle: 30 };
				childNode.tag = child; // associate DOM element with node
				diagram.addItem(childNode);

				// link the subfolder with its parent
				diagram.factory.createDiagramLink(treeNode, childNode);
			}
			else
			{
				// create a node for the child element
				var childNode = new ui.TreeNode(child.outerHTML.split("\n")[0]);
				childNode.data = child; // associate DOM element with node
				treeNode.items.add(childNode);
			}
			// build subtrees recursively
			buildBranches(childNode, child, level + 1);
		}
	});

	if (treeNode instanceof d.ShapeNode)
	{
		// allow collapsing the tree branch
		if (treeNode.outgoingLinks.length > 0)
			treeNode.expandable = true;
	}
}


function nodeDrag(sender, args)
{
	if (sender.data)
	{
		var item = new ui.ListItem(sender.title);
		item.data = sender.data;
		listView.acceptDrop = item;
	}
}

function listDragDrop(sender, args)
{
	if (listView.acceptDrop)
	{
		var div = listView.acceptDrop.data;
		args.dragItem.title = "#" + (div.id || "unnamed");
		args.dragItem.data = div;
	}
}

function listSelectionChanged(sender, args)
{
	if (args.oldItems)
	{
		args.oldItems.forEach(function (item)
		{
			item.data.style.backgroundColor = "";
		});
	}
	else
	{
		args.newItems.forEach(function (item)
		{
			item.data.style.backgroundColor = "#9caac6";
		});
	}
}

function rearrangeTree(sender, args)
{
	// arrange the tree
	var treeLayout = new MindFusion.Graphs.TreeLayout();
	treeLayout.linkType = MindFusion.Graphs.TreeLayoutLinkType.Cascading;
	treeLayout.keepRootPosition = true;
	diagram.arrange(treeLayout);
}

function selectNode(sender, args)
{
	var d = args.node.tag;

	if (!d) return;

	if (args.mouseButton == 2)
	{
		tooltip.text = d.outerHTML.split("\n")[0];

		if (!tooltip.loaded) tooltip.render();

		tooltip.show(MindFusion.Diagramming.DiagramView.find("diagram").docToClient(args.mousePosition));
	}
	else
	{
		var treeNode = treeView.flatItems.where(function (item) { if (item.data == d) return true; }).first();
		if (treeNode)
		{
			expandParent(treeNode);
			treeView.selection.clear();
			treeView.selection.add(treeNode);
		}
	}
}


function expandParent(treeNode)
{
	var p = treeNode.parentNode;
	if (p)
	{
		p.expanded = true;
		expandParent(p);
	}
}
