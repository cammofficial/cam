/// <reference path="../Scripts/jspack-vsdoc.js" />

var DiagramView = MindFusion.Diagramming.DiagramView;
var Diagram = MindFusion.Diagramming.Diagram;
var GlassEffect = MindFusion.Diagramming.GlassEffect;
var Style = MindFusion.Diagramming.Style;
document.addEventListener("DOMContentLoaded", function () {

	// create a DiagramView component that wraps the "diagram" canvas
	var diagramView = DiagramView.create(document.getElementById("diagram"));
	diagram = diagramView.diagram;

	//styling
	var shapeNodeStyle = new Style();
	shapeNodeStyle.brush = { type: 'SolidBrush', color: '#e0e9e9' };
	shapeNodeStyle.stroke = "#7F7F7F";
	shapeNodeStyle.fontName = "Verdana";
	shapeNodeStyle.fontSize = 4;
	shapeNodeStyle.nodeEffects = [new GlassEffect()];
	diagram.style = shapeNodeStyle;

	// create a NodeListView component that wraps the "nodeList" canvas
	var nodeList = MindFusion.Diagramming.NodeListView.create(document.getElementById("nodeList"));
	nodeList.setTargetView(document.getElementById("diagram"));
	initNodeList(nodeList, diagram);

	// create an Overview component that wraps the "overview" canvas
	var overview = MindFusion.Diagramming.Overview.create(document.getElementById("overview"));
	overview.diagramView = diagramView;

	// create an ZoomControl component that wraps the "zoomer" canvas
	var zoomer = MindFusion.Controls.ZoomControl.create(document.getElementById("zoomer"));
	zoomer.target = diagramView;

	// create an Ruler component that wraps the "ruler" div
	var ruler = MindFusion.Diagramming.Ruler.create(document.getElementById("ruler"));
	ruler.diagramView = diagramView;

});

function initNodeList(nodeList, diagram) {
	// add some nodes to the NodeListView
	var shapes = ["Actor", "RoundRect", "Triangle", "Decision"];
	for (var i = 0; i < shapes.length; ++i) {
		var node = new MindFusion.Diagramming.ShapeNode(diagram);
		node.text = shapes[i];
		node.shape = shapes[i];

		nodeList.addNode(node, shapes[i]);
	}
}
