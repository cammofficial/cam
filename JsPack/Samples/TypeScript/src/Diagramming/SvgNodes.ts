import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';


namespace SvgNodes
{
	const Behavior = Diagramming.Behavior;
	const AutoResize = Diagramming.AutoResize;
	const SvgContent = Diagramming.SvgContent;
	const Rect = Drawing.Rect;

	let diagram: Diagramming.Diagram = null;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagramView.behavior = Behavior.Modify;

	diagram = diagramView.diagram;
	diagram.autoResize = AutoResize.None;
	diagram.bounds = new Rect(0, 0, 135, 135);
	diagram.backgroundImageUrl = require("../assets/parking.png");

	addNode(new Rect(55, 5, 25, 25), "sign.svg", true);
	addNode(new Rect(105, 85, 25, 25), "car1.svg");
	addNode(new Rect(10, 85, 25, 25), "car2.svg");
	addNode(new Rect(105, 45, 25, 25), "car3.svg");
	addNode(new Rect(10, 65, 25, 25), "car5.svg");
	addNode(new Rect(10, 20, 25, 25), "car6.svg");
	addNode(new Rect(105, 105, 25, 25), "car7.svg");

	function addNode(bounds, filename, locked = false)
	{
		let node = diagram.factory.createSvgNode(bounds);
		node.transparent = true;
		node.locked = locked;
		let content = new SvgContent();
		content.parse(require("../assets/"+filename));
		node.content = content;
	}

	document.getElementById("bAddNode").addEventListener("click", () =>
	{
		let index = Math.floor((Math.random() * 7) + 1);
		addNode(new Rect(55, 30, 25, 25), "car" + index + ".svg");
	});

	document.getElementById("bReset").addEventListener("click", () =>
	{
		diagram.clearAll();
		addNode(new Rect(55, 5, 25, 25), "sign.svg", true);
	});
}