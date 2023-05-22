import * as Diagramming from '@mindfusion/diagramming';
import * as Controls from '@mindfusion/controls';

namespace ControlsSample {
	const GlassEffect = Diagramming.GlassEffect;
	const Style = Diagramming.Style;

	let diagram: Diagramming.Diagram = null;

	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;

	//styling
	let shapeNodeStyle = new Style();
	shapeNodeStyle.brush = { type: 'SolidBrush', color: '#e0e9e9' };
	shapeNodeStyle.stroke = "#7F7F7F";
	shapeNodeStyle.fontName = "Verdana";
	shapeNodeStyle.fontSize = 4;
	shapeNodeStyle.nodeEffects = [new GlassEffect()];
	diagram.style = shapeNodeStyle;

	// create a NodeListView component that wraps the "nodeList" canvas
	let nodeList = Diagramming.NodeListView.create(<HTMLCanvasElement>document.getElementById("nodeList"));
	initNodeList(nodeList, diagram);

	// create an Overview component that wraps the "overview" canvas
	let overview = Diagramming.Overview.create(<HTMLCanvasElement>document.getElementById("overview"));
	overview.diagramView = diagramView;

	// create an ZoomControl component that wraps the "zoomer" canvas
	let zoomer = Controls.ZoomControl.create(<HTMLCanvasElement>document.getElementById("zoomer"));
	zoomer.target = diagramView;

	// create an Ruler component that wraps the "ruler" div
	let ruler = Diagramming.Ruler.create(<HTMLDivElement>document.getElementById("ruler"));
	ruler.diagramView = diagramView;


	function initNodeList(nodeList: Diagramming.NodeListView, diagram: Diagramming.Diagram) {
		// add some nodes to the NodeListView
		let shapes = ["Actor", "RoundRect", "Triangle", "Decision"];
		for (let i = 0; i < shapes.length; ++i) {
			let node = new Diagramming.ShapeNode(diagram);
			node.text = shapes[i];
			node.shape = shapes[i];

			nodeList.addNode(node, shapes[i]);
		}
	}
}