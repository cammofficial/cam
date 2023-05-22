/// <reference path="../Scripts/jspack-vsdoc.js" />
var ui = MindFusion.Common.UI;

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

// Create a new ListView control.
// This list view will serve as the drop target.
var list2 = new ui.ListView();
list2.setLeft(20);
list2.theme = "pastel";

// Disable drag and drop within this list view.
// The view can still act as a drop target for drag operations started from other controls.
list2.allowDrag = false;

list2.dragDrop.addEventListener(listDragDrop);
list2.itemDrop.addEventListener(listItemDrop);

document.body.appendChild(list2.draw());
list2.attach();

// Create a new TreeView control.
// This tree view will serve as a drag source.
var tree = new ui.TreeView();
tree.setLeft(40);
tree.theme = "business";
tree.fromObject(treeData);

tree.itemDragStart.addEventListener(treeDragStart);
tree.itemDragEnd.addEventListener(treeDragEnd);

document.body.appendChild(tree.draw());
tree.attach();

// This is the handler function of the list1.itemDragStart event.
// The sender argument is a reference to the dragged ListItem.
// Check the item's title and eventually cancel the event - no drag will occur if the title is "Static 1".
// Otherwise, notify the list2 control that a drop event, associated with this ListItem instance should be accepted.
// Note that setting the actual ListItem instance as acceptDrop will remove it from the source control (list1)
// once if is succesfully dropped to the target control (list2).
function listDragStart(sender, args)
{
	if (sender.title == "Static 1")
		args.cancel = true;
	else
		list2.acceptDrop = sender;
}

// this is the handler function of the list1.listDragEnd event.
// notify the list2 control that no drop event is currently expected.
function listDragEnd(sender, args)
{
	list2.acceptDrop = null;
}

// This is the handler function of the tree.itemDragStart event.
// The sender argument is a reference to the dragged TreeNode.
// Since controls only accept items of their corresponding type create a new ListItem instance to pass to the acceptDrop property.
// The TreeNode associated with the event will not be removed from its parent control.
function treeDragStart(sender, args)
{
	list2.acceptDrop = new ui.ListItem(sender.title);
}

function treeDragEnd(sender, args)
{
	list2.acceptDrop = null;
}

// This is the handler function of the list2.dragDrop event.
// The args.dragItem is a reference to the dragged ListItem.
// The dragDrop event is raised before the actual drop occurs and can be cancelled - no drop will occur if the title is "Static 2".
function listDragDrop(sender, args)
{
	if (args.dragItem.title == "Static 2")
		args.cancel = true;
}

// This is the handler function of the list2.itemDrop event.
// The itemDrop event is raised after the drop operatin is finished.
function listItemDrop(sender, args)
{
	args.item.title += "(new)";
}