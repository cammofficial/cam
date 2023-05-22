

import * as ui from "@mindfusion/common-ui";
import * as common from "@mindfusion/common";

namespace InteractiveTree
{

	// Create some data to use for tree nodes.
	var treeData = [
		{
			title: "Parent 1",
			items: [{ title: "Child 1.1" }, { title: "Child 1.2" }]

		},
		{
			title: "Parent 2",
			items: [{ title: "Child 2.1" }, { title: "Child 2.2" }]

		},
		{
			title: "Parent 3",
			items: [{ title: "Child 3.1" }, { title: "Child 3.2" }, { title: "Child 3.3" }]

		}];

	// Create a new TreeView control.
	var tree = new ui.TreeView();
	tree.theme = "gray";
	tree.allowDrag = false;
	tree.fromObject(treeData);

	tree.itemMouseDown.addEventListener(nodeMouseDown);

	document.body.appendChild(tree.draw());
	tree.attach();

	// Handle the contextmenu JS event to prevent the default context menu from showing.
	tree.element.addEventListener('contextmenu', function (e) { e.preventDefault() });
	// Handle the mousedown JS event to show the menu.
	tree.element.addEventListener('mousedown', treeMouseDown);

	// Create a new Menu control.
	var menu = new ui.Menu();
	menu.theme = "gray";
	menu.cssClass = "popmenu";
	menu.visible = false;

	var item1 = new ui.MenuItem();
	item1.template = "<input type='text' id='node_title'></input>&#x2795;";
	item1.tooltip = "Add child node";
	item1.data = "child";
	menu.items.add(item1);

	var item2 = new ui.MenuItem("Remove selected node");
	item2.data = "remove";
	menu.items.add(item2);

	menu.itemClick.addEventListener(menuItemClick);

	document.body.appendChild(menu.draw());
	menu.attach();

	// This is the handler function for tree mousedown JS event.
	// Modify the menu accordingly and show it on right mouse button click.
	function treeMouseDown(e)
	{
		if (e.button == 2)
		{
			if (!menu.visible)
			{
				menu.left = common.Unit.pixel(e.clientX + 20);
				menu.top = common.Unit.pixel(e.clientY);
				menu.items.first().tooltip = "Add root item";
				menu.items.first().data = "root";
				menu.items.last().enabled = false;
				menu.visible = true;
			}
		}
		else
			menu.visible = false;
	}

	// This is the handler function for tree itemMouseDown event.
	// Modify the menu accordingly and show it on right mouse button click.
	function nodeMouseDown(sender, args)
	{
		if (args.rawEventArgs.button == 2)
		{
			menu.left = common.Unit.pixel(args.rawEventArgs.clientX + 20);
			menu.top = common.Unit.pixel(args.rawEventArgs.clientY);
			menu.items.first().tooltip = "Add child item";
			menu.items.first().data = "child";
			menu.items.last().enabled = true;
			menu.visible = true;
		}
		else
			menu.visible = false;
	}

	// This is the handler function for menu itemClick event.
	// If the "remove" item was clicked, remove the selected node.
	// If the "add" item was clicked, add a new child node (if there is a selected node),
	// or a new root node.
	function menuItemClick(sender, args)
	{
		var node;

		if (args.item.data == "remove")
		{
			node = tree.selection.first();
			if (node.parentNode)
				node.parentNode.items.remove(node);
			else
				tree.items.remove(node);
		}
		else
		{
			var input = args.item.element.querySelector("#node_title");
			if (args.rawEventArgs.target == input) return;

			var title = input.value || "<untitled>";
			node = new ui.TreeNode(title);

			if (args.item.data == "root")
				tree.items.add(node);
			else
				tree.selection.first().items.add(node);

			input.value = "";
		}

		menu.visible = false;
	}


}