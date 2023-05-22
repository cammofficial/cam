import * as Drawing from "@mindfusion/drawing";
import * as Diagramming from "@mindfusion/diagramming";
import * as Graphs from "@mindfusion/graphs";
import * as Common from "@mindfusion/common";
import * as UI from "@mindfusion/common-ui";

var diagram;
var treeView;
var listView;
var tooltip;

var theme = "light";

// create a Diagram component that wraps the "diagram" canvas
var diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
diagramView.behavior = (Diagramming.Behavior.SelectOnly);
diagram = diagramView.diagram;
diagram.linkHeadShapeSize = (2);
diagram.nodeEffects.push(new Diagramming.GlassEffect());

// rearrange the tree when a branch is expanded ot collapsed
diagram.addEventListener(Diagramming.Events.treeCollapsed, rearrangeTree);
diagram.addEventListener(Diagramming.Events.treeExpanded, rearrangeTree);

diagram.addEventListener(Diagramming.Events.nodeClicked, selectNode);

var text = "Click a node to locate it in the tree view. Right-click a node to see its HTML.";
var tip = new UI.Tooltip(diagramView.element, text);
tip.position = UI.TooltipPosition.Top;
tip.theme = theme;
tip.render();

treeView = new UI.TreeView(document.getElementById("treeView"));
treeView.width = treeView.height = Common.Unit.percentage(100);
treeView.theme = theme;

treeView.loadOnDemand = false;
treeView.allowDrag = true;
treeView.allowDrop = true;
treeView.itemDrag.addEventListener(nodeDrag);

// build a tree whose nodes correspond to the page DOM elements
buildTree();

text = "Displays the DOM hierarchy of the HTML page. \n" +
	"Drag nodes to the list below to inspect them."
tip = new UI.Tooltip(treeView.element, text);
tip.position = UI.TooltipPosition.Left;
tip.theme = theme;
tip.render();

listView = new UI.ListView(document.getElementById("listView"));
listView.width = listView.height = Common.Unit.percentage(100);
listView.theme = theme;
listView.dragDrop.addEventListener(listDragDrop);
listView.selectionChanged.addEventListener(listSelectionChanged);
listView.render();

text = "Select items from the list to highlight the corresponding DOM element in the page";
tip = new UI.Tooltip(listView.element, text);
tip.position = UI.TooltipPosition.Left;
tip.theme = theme;
tip.render();

tooltip = new UI.Tooltip(diagramView.element);
tooltip.trigger = UI.TooltipTrigger.None;
tooltip.follow = false;
tooltip.theme = theme;


function buildTree()
{
	// create a box that will be a root in our hierarchy
	var root = new Diagramming.ShapeNode(diagram);
	root.setBounds(new Drawing.Rect(0, 0, 20, 12));
	root.text = ("body");
	root.brush = ("#bdf07c");
	diagram.addItem(root);

	// traverse the page DOM recursively and create corresponding diagram items
	buildBranches(root, document.body, 1);

	// arrange the tree
	var treeLayout = new Graphs.TreeLayout();
	treeLayout.linkType = Graphs.TreeLayoutLinkType.Cascading;
	diagram.arrange(treeLayout);

	diagram.resizeToFitItems(5);

	// create a tree node that will be a root in our hierarchy
	var rootItem = new UI.TreeNode("body");
	treeView.items.add(rootItem);
	// traverse the page DOM recursively and create corresponding tree nodes
	buildBranches(rootItem, document.body, 1);
	// render the treeView control
	treeView.render();
}

function buildBranches(treeNode, domElement, level)
{
	forEach(domElement.childNodes, function (child)
	{
		if (child.nodeName == "DIV")
		{
			if (treeNode instanceof Diagramming.ShapeNode)
			{
				// create a node for the child element
				var childNode = new Diagramming.ShapeNode(diagram);
				childNode.setBounds(new Drawing.Rect(0, 0, 20, 12));
				childNode.text = (child.nodeName);
				childNode.brush = ({ type: "LinearGradientBrush", color1: "#e0e9e9", color2: "#bdf07c", angle: 30 });
				childNode.tag = (child); // associate DOM element with node
				diagram.addItem(childNode);

				// link the subfolder with its parent
				diagram.factory.createDiagramLink(treeNode, childNode);

				// build subtrees recursively
				buildBranches(childNode, child, level + 1);
			}
			else
			{
				// create a node for the child element
				var childItem = new UI.TreeNode(child.outerHTML.split("\n")[0]);
				childItem.data = child; // associate DOM element with node
				treeNode.items.add(childItem);

				// build subtrees recursively
				buildBranches(childItem, child, level + 1);
			}

		}
	});

	if (treeNode instanceof Diagramming.ShapeNode)
	{
		// allow collapsing the tree branch
		if (treeNode.outgoingLinks.length > 0)
			treeNode.expandable = (true);
	}
}

function nodeDrag(sender, args)
{
	if (sender.data)
	{
		var item = new UI.ListItem(sender.title);
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
	var diagram = Diagramming.DiagramView.find("diagram").diagram;

	// arrange the tree
	var treeLayout = new Graphs.TreeLayout();
	treeLayout.linkType = Graphs.TreeLayoutLinkType.Cascading;
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
		tooltip.show(Diagramming.DiagramView.find("diagram").docToClient(args.mousePosition));
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

function forEach(array, func)
{
	for (var i = 0, l = array.length; i < l; i++)
	{
		var element = array[i];
		if (typeof (element) !== 'undefined') func.call(null, element, i, array);
	}
}