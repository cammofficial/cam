import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';


namespace Containers
{
	let diagram: Diagramming.Diagram;

	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;

	let shapeNodeStyle = new Diagramming.Style();
	shapeNodeStyle.brush = { type: 'SolidBrush', color: '#e0e9e9' };
	shapeNodeStyle.stroke = "#7F7F7F";
	shapeNodeStyle.textColor = "#e0e9e9";
	shapeNodeStyle.fontName = "Verdana";
	shapeNodeStyle.fontSize = 3;
	shapeNodeStyle.backBrush = "#e0e9e9";
	shapeNodeStyle.nodeEffects = [new Diagramming.GlassEffect()];

	diagram.style = shapeNodeStyle;

	// create child nodes for containers
	for (let i = 0; i < 5; i++)
		diagram.factory.createShapeNode(0, 0, 10, 10);
	for (let i = 1; i < 5; i++)
		diagram.factory.createDiagramLink(diagram.nodes[Math.floor(i / 2)], diagram.nodes[i]);

	for (let i = 5; i < 10; i++)
		diagram.factory.createShapeNode(0, 0, 10, 10);
	for (let i = 1; i < 5; i++)
		diagram.factory.createDiagramLink(diagram.nodes[Math.floor(5 + i / 2)], diagram.nodes[5 + i]);

	// create containers
	let ctr = [];
	for (let c = 0; c < 2; c++)
	{
		let container = diagram.factory.createContainerNode(0, 0, 10, 10);
		for (let i = c * 5; i < c * 5 + 5; i++)
			container.add(diagram.nodes[i]);

		container.arrange(new Graphs.TreeLayout());
		container.foldable = (true);
		container.zIndex = (0);
		container.text = ("container " + (c + 1));
		container.brush = ("#003466");
		container.handlesStyle = Diagramming.HandlesStyle.HatchHandles3;

		ctr[c] = container;
	}

	ctr[0].move(20, 20, true, true);
	ctr[1].move(90, 20, true, true);
	diagram.factory.createDiagramLink(ctr[0], ctr[1]);
}