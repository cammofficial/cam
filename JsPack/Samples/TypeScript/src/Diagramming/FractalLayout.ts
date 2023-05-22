import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';


namespace FractalLayout
{
	const DiagramLink = Diagramming.DiagramLink;
	const ShapeNode = Diagramming.ShapeNode;
	const Rect = Drawing.Rect;
	const FractalLayout = Graphs.FractalLayout;

	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	let diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;

	// create an Overview component that wraps the "overview" canvas
	let overview = Diagramming.Overview.create(<HTMLCanvasElement>document.getElementById("overview"));
	overview.diagramView=(diagramView);

	document.getElementById("bRandomTree").addEventListener("click", () =>
	{
		let diagramView = Diagramming.DiagramView.find("diagram");
		diagramView.diagram.clearAll();

		// create the root node
		let rect = new Rect(0, 0, 15, 10);
		let node = new ShapeNode(diagram);
		let brush = brushes[0];
		node.bounds = rect;
		node.brush = brush;
		node.stroke = brushes[1];
		diagramView.diagram.addItem(node);

		// add random children
		randomTree(node, 5, 4);

		applyLayout();
		diagramView.zoomFactor = 8;
	});

	function randomTree(node, depth, minChildren)
	{
		if (depth <= 0)
			return;

		let diagram = node.parent;
		let children = randomInt(depth) - 1 + minChildren;
		let brush = brushes[0];
		while (brush == node.brush)
			brush = brushes[1];

		if (diagram.nodes.length < 3 && children < 2)
			children = 2;

		for (let i = 0; i < children; ++i)
		{
			// create child node
			let rect = new Rect(0, 0, 15, 10);
			let child = new ShapeNode(diagram);
			child.bounds = rect;
			child.brush = brush;
			diagram.addItem(child);

			// create a link
			let link = new DiagramLink(diagram, node, child);
			diagram.addItem(link);

			// build child branch
			randomTree(child, depth - 1, minChildren);
		}
	}

	function applyLayout()
	{
		let diagram = Diagramming.DiagramView.find("diagram").diagram;
		let layout = new FractalLayout();
		layout.root = diagram.nodes[0];
		diagram.arrange(layout);
		fitItems(diagram);
	}

	function randomInt(max)
	{
		return Math.floor(max * Math.random());
	}

	function fitItems(diagram)
	{
		let rect = Rect.empty;
		diagram.nodes.forEach(function (node)
		{
			if (rect == Rect.empty)
				rect = node.bounds;
			else
				rect = rect.union(node.bounds);
		});

		if (rect)
			diagram.bounds = (new Rect(0, 0, rect.right() + 10, rect.bottom() + 10));
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

	const brushes = ["#9caac6", "#ce0000", "#c0c0c0"];
}