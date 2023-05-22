

import * as ui from "@mindfusion/common-ui";
import * as common from "@mindfusion/common";

namespace DragDrop3
{

	// Create some data to use for list items and tree nodes.
	var data = [];
	for (var i = 1; i < 6; i++)
	{
		data.push({ title: "Item" + i.toString() });
	}
	data.push({ title: "Static 1" });
	data.push({ title: "Static 2" });

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

	// Create a new ListView control.
	// This list view will serve as a drag source.
	var list1 = new ui.ListView();
	list1.theme = "business";
	// Load the items data
	list1.fromObject(data);

	// Add event handlers
	list1.itemDragStart.addEventListener(listDragStart);
	list1.itemDragEnd.addEventListener(listDragEnd);

	// Draw the control and append it to the page DOM.
	document.body.appendChild(list1.draw());
	// Prepare the control for user interaction.
	list1.attach();

	// Create a new TreeView control.
	// This tree view will serve as a drop target.
	var tree = new ui.TreeView();
	tree.left = common.Unit.pixel(40);
	tree.theme = "business";
	tree.fromObject(treeData);

	tree.dragDrop.addEventListener(treeDragDrop);

	document.body.appendChild(tree.draw());
	tree.attach();

	// This is the handler function of the list1.itemDragStart event.
	// The sender argument is a reference to the dragged ListItem.
	// Check the item's title and eventually cancel the event - no drag will occur if the title is "Static 1".
	// Otherwise, notify the tree control that a drop event should be accepted.
	// Since controls only accept items of their corresponding type create a new TreeNode instance to pass to the acceptDrop property.
	function listDragStart(sender, args)
	{
		if (sender.title == "Static 1")
			args.cancel = true;
		else
			tree.acceptDrop = new ui.TreeNode(sender.title);
	}

	// this is the handler function of the list1.listDragEnd event.
	// notify the tree control that no drop event is currently expected.
	function listDragEnd(sender, args)
	{
		tree.acceptDrop = null;
	}

	// This is the handler function of the tree.dragDrop event.
	// The args.dragItem is a reference to the dragged TreeNode.
	// The dragDrop event is raised before the actual drop occurs and can be cancelled - no drop will occur if the title is "Static 2".
	function treeDragDrop(sender, args)
	{
		if (args.dragItem.title == "Static 2")
			args.cancel = true;
	}

}