import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';


namespace LayeredLayout
{
	const DiagramLink = Diagramming.DiagramLink;
	const ShapeNode = Diagramming.ShapeNode;
	const Style = Diagramming.Style;

	const Rect = Drawing.Rect;
	const LayeredLayout = Graphs.LayeredLayout;
	const LayoutDirection = Graphs.LayoutDirection;

	let diagram: Diagramming.Diagram = null;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;
	let linkStyle = new Style();
	linkStyle.stroke = "#c0c0c0";
	linkStyle.textColor = "#585A5C";
	linkStyle.fontName = "Verdana";
	linkStyle.fontSize = 3;
	diagram.style = linkStyle;

	// create an Overview component that wraps the "overview" canvas
	let overview = Diagramming.Overview.create(<HTMLCanvasElement>document.getElementById("overview"));
	overview.diagramView=(diagramView);


	document.getElementById("bRandomGraph").addEventListener("click", () =>
	{
		randomGraph(20);
		applyLayeredLayout();
	});

	function randomGraph(n)
	{
		diagram.clearAll();
		for (let i = 0; i < n; ++i)
		{
			let c = diagram.nodes.length;
			let g = 2 + randomInt(15);
			for (let j = 0; j < g; ++j)
			{
				let rect = new Rect(0, 0, 10, 10);
				let node = new ShapeNode(diagram);
				node.bounds = rect;
				node.brush = { type: "LinearGradientBrush", color1: "#e0e9e9", color2: "#669acc", angle: 60 };
				diagram.addItem(node);
				if (j > 0)
				{
					let link = new DiagramLink(
						diagram, diagram.nodes[diagram.nodes.length - 2], node);

					diagram.addItem(link);
				}
			}
			if (i > 0)
			{
				for (let j = 0; j < 1 + randomInt(3); ++j)
				{
					let link = new DiagramLink(
						diagram, diagram.nodes[randomInt(c)], diagram.nodes[c + randomInt(g)]);
					diagram.addItem(link);
				}
			}
		}
	}

	function applyLayeredLayout()
	{
		let layout = new LayeredLayout();
		layout.direction = LayoutDirection.TopToBottom;
		layout.siftingRounds = 0;
		layout.nodeDistance = 8;
		layout.layerDistance = 8;
		diagram.arrange(layout);
		diagram.resizeToFitItems(5);
	}

	function randomInt(max)
	{
		return Math.floor(max * Math.random());
	}

	document.getElementById("bZoomIn").addEventListener("click", () =>
	{
		let diagramView = Diagramming.DiagramView.find("diagram");
		if (diagramView.zoomFactor > 200) return;
		diagramView.zoomFactor = diagramView.zoomFactor + 10;
	});

	document.getElementById("bZoomOut").addEventListener("click", () =>
	{
		let diagramView = Diagramming.DiagramView.find("diagram");
		if (diagramView.zoomFactor < 19) return;
		diagramView.zoomFactor = diagramView.zoomFactor - 10;
	});
}