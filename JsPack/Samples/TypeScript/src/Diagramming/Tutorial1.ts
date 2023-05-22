import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';

namespace Tutorial1 {
	const LayeredLayout = Graphs.LayeredLayout;

	let diagram: Diagramming.Diagram;

	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;
	diagram.linkHeadShapeSize = (2);


	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let graph = JSON.parse(xhttp.responseText);
			buildDiagram(graph);
		}
	};
	xhttp.open("GET", "../data/Tutorial1.txt", true);
	xhttp.send();


	function buildDiagram(graph) {
		let nodeMap = [];

		// load node data
		let nodes = graph.nodes;
		nodes.forEach(function (node) {
			let diagramNode = diagram.factory.createShapeNode(0, 0, 18, 8);
			nodeMap[node.id] = diagramNode;
			diagramNode.text = (node.name);
			diagramNode.brush = ("#e0e9e9");
		});

		// load link data
		let links = graph.links;
		links.forEach(function (link) {
			diagram.factory.createDiagramLink(
				nodeMap[link.origin],
				nodeMap[link.target]);
		});

		// arrange the graph
		let layout = new LayeredLayout();
		layout.nodeDistance = 10;
		layout.layerDistance = 10;
		diagram.arrange(layout);
	}
}