import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';

namespace StockShapes
{
	const Shape = Diagramming.Shape;
	const ShapeNode = Diagramming.ShapeNode;
	const GlassEffect = Diagramming.GlassEffect;
	const Rect = Drawing.Rect;

	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	let diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;

	diagram.shapeBrush = "#c0c0c0";
	diagram.nodeEffects.push(new GlassEffect());

	let i = 0;
	let size = 20;
	let perLine = 8;


	// enum all predefined shapes
	let shapes = Shape.shapes;
	for (let shapeId in shapes)
	{
		// skip some arrowhead shapes that aren't that useful as node shapes
		let shape = shapes[shapeId];
		if (!shape.params.outline) continue;
		if (shapeId == "RevWithCirc") continue;
		if (shapeId == "DoubleArrow") continue;
		if (shapeId == "CenteredCircle") continue;

		// create a node with this shape
		let node = new ShapeNode(diagram);
		node.text = shapeId;
		node.shape = Shape.fromId(shapeId);
		node.pen = "Black";
		node.bounds = new Rect(
			(i % perLine) * (size + 10) + 8,
			Math.floor(i / perLine) * (size + 20) + 8,
			size, size);
		(<any>node).onUpdateVisuals = textBelowNode;
		node.lineAlignment = Diagramming.Alignment.Near;

		let text = node.text;
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

	function textBelowNode(node)
	{
		let bounds = node.bounds.clone();
		bounds.y = bounds.bottom();
		node._text.setBounds(bounds);
	}
}