/// <reference path="../Scripts/jspack-vsdoc.js" />

var Diagram = MindFusion.Diagramming.Diagram;
var Shape = MindFusion.Diagramming.Shape;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var GlassEffect = MindFusion.Diagramming.GlassEffect;

var Rect = MindFusion.Drawing.Rect;
var TreeLayout = MindFusion.Graphs.TreeLayout;

document.addEventListener("DOMContentLoaded", function ()
{

	// create a DiagramView component that wraps the "diagram" canvas
	var diagramView = MindFusion.Diagramming.DiagramView.create(document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;

	diagram.shapeBrush = "#c0c0c0";
	diagram.nodeEffects.push(new GlassEffect());

	var i = 0;
	var size = 20;
	var perLine = 8;

	// enum all predefined shapes
	var shapes = Shape.shapes;
	for (var shapeId in shapes)
	{
		// skip some arrowhead shapes that aren't that useful as node shapes
		var shape = shapes[shapeId];
		if (!shape.params.outline) continue;
		if (shapeId == "RevWithCirc") continue;
		if (shapeId == "DoubleArrow") continue;
		if (shapeId == "CenteredCircle") continue;

		// create a node with this shape
		var node = new ShapeNode(diagram);
		node.text = shapeId;
		node.shape = Shape.fromId(shapeId);
		node.pen = "Black";
		node.bounds = new Rect(
			(i % perLine) * (size + 10) + 8,
			Math.floor(i / perLine) * (size + 20) + 8,
			size, size);
		node.onUpdateVisuals = textBelowNode;
		node.lineAlignment = MindFusion.Diagramming.Alignment.Near;

		var text = node.text;
		if (text.match("^Bpmn") ||
			text.match("^External") ||
			text.match("^Message") ||
			text.match("^Microform") ||
			text.match("^Offpage"))
		{
			text = text.replace(/([A-Z])/g, "\n$1");
			text = text.substring(1);
			node.text = text;
		}

		diagram.addItem(node);

		i = i + 1;
	}

	diagram.resizeToFitItems(10);
});

function textBelowNode(node)
{
	var bounds = node.bounds.clone();
	bounds.y = bounds.bottom();
	node._text.setBounds(bounds);
}