/// <reference path="../Scripts/jspack-vsdoc.js" />
var ui = MindFusion.Common.UI;

// Create some data to use for list items.
// Drag and drop operations are disallowed for the first and last items by setting their interactive property to false.
// They can neither be dragged or used as drop targets.
// A css class is also applied to visually mark them.
var data = [];
data.push({ title: "Static Top", interactive: false, cssClass: "static" });
for (var i = 1; i < 5; i++)
{
	data.push({ title: "Item" + i.toString() });
}
data.push({ title: "Static Bottom", interactive: false, cssClass: "static" });

// Create a new ListView control.
var list1 = new ui.ListView();
list1.theme = "business";
// Load the items data.
list1.fromObject(data);

// Draw the control and append it to the page DOM.
document.body.appendChild(list1.draw());
// Prepare the control for user interaction.
list1.attach();

// Create new data for the second list view.
var data = [];
data.push({ title: "Group 1", interactive: false, cssClass: "static" });
for (var i = 1; i < 5; i++)
{
	data.push({ title: "Item" + i.toString() });
}
data.push({ title: "Group 2", interactive: false, cssClass: "static" });
for (var i = 1; i < 5; i++)
{
	data.push({ title: "Item" + i.toString() });
}

// Create a new ListView control.
var list2 = new ui.ListView();
list2.setLeft(20);
list2.theme = "business";
list2.fromObject(data);

// Add event handlers
list2.dragDrop.addEventListener(listDragDrop);

document.body.appendChild(list2.draw());
list2.attach();

// This is the handler function of the list2.dragDrop event.
// The sender argument is the ListView control.
// args is an instance of the DragDropEventArgs class.
// args.dragItem is a reference to the dragged ListItem.
// args.dropTarget is an object, containing information about where the drop happens, like the item, below or above which the dragged item is dropped.
// We can check the dragItem's index and the reference item's index to determine if they belong to the same "group".
// The dragDrop event is raised before the actual drop occurs and can be cancelled - no drop will occur if the item is dragged to the other group.
function listDragDrop(sender, args)
{
	var refItem = args.dropTarget.item;
	var refIndex = sender.items.indexOfItem(refItem);
	if (args.dropTarget.position == 1) refIndex += 1;

	var itemIndex = sender.items.indexOfItem(args.dragItem);

	if ((itemIndex < 5) && (refIndex > 5)) args.cancel = true;
	if ((itemIndex > 5) && (refIndex <= 5)) args.cancel = true;
}