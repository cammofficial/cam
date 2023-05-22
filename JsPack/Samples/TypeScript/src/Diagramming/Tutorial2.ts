import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';

namespace Tutorial2
{
	const Shape = Diagramming.Shape;
	const Rect = Drawing.Rect;
	const BorderedTreeLayout = Graphs.BorderedTreeLayout;

	let diagram: Diagramming.Diagram = null;
	const bounds = new Rect(0, 0, 30, 6);
	const brush = "#e0e9e9";

	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;
	diagram.linkHeadShapeSize = 2;
	diagram.defaultShape = Shape.fromId("Rectangle");

	// pretend we are calling a web service
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			let graph = JSON.parse(xhttp.responseText);
			buildDiagram(graph);
		}
	};
	xhttp.open("GET", "../data/Tutorial2.txt", true);
	xhttp.send();


	function buildDiagram(graph)
	{
		// load activity data and create 
		let project = graph.project;
		let diagramNode = diagram.factory.createShapeNode(bounds);
		diagramNode.text = project.name;
		diagramNode.brush = brush;
		if (project.activities)
			addActivities(diagramNode, project);

		let layout = new BorderedTreeLayout();
		layout.direction = Graphs.LayoutDirection.LeftToRight;
		layout.linkType = Graphs.TreeLayoutLinkType.Cascading;
		layout.nodeDistance = 1;
		layout.levelDistance = -8;	// let horizontal positions overlap
		diagram.arrange(layout);
		diagram.resizeToFitItems(30);
	}

	function addActivities(parentNode, parent)
	{
		parent.activities.forEach(function (activity)
		{
			let diagramNode = diagram.factory.createShapeNode(bounds);
			diagramNode.text = (activity.name);
			diagramNode.brush = (brush);
			diagram.factory.createDiagramLink(parentNode, diagramNode);

			if (activity.activities)
				addActivities(diagramNode, activity);
		});
	}
}