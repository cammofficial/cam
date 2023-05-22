

import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';

namespace TreeLayout
{
	const ShapeNode = Diagramming.ShapeNode;
	const GlassEffect = Diagramming.GlassEffect;

	const Rect = Drawing.Rect;
	const Size = Drawing.Size;
	const TreeLayout = Graphs.TreeLayout;
	const TreeLayoutLinkType = Graphs.TreeLayoutLinkType;

	let diagram: Diagramming.Diagram = null;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagram.nodeEffects.push(new GlassEffect());
	diagram.addEventListener("nodeCreated", onNodeCreated);
	diagram.linkHeadShapeSize = 3;
	diagram.linkHeadShape = "Alternative";

	// create the root of the tree
	let rootNode = new ShapeNode(diagram);
	rootNode.bounds = new Rect(50, 15, 24, 24);
	rootNode.text = "root";
	rootNode.anchorPattern = Diagramming.AnchorPattern.fromId("TopInBottomOut");
	diagram.addItem(rootNode);
	diagram.backBrush = { type: 'LinearGradientBrush', color1: '#e0e9e9', color2: '#616a7f', angle: 90 };

	// create a NodeListView component that wraps the "nodeList" canvas
	let nodeList = Diagramming.NodeListView.create(<HTMLCanvasElement>document.getElementById("nodeList"));
	nodeList.iconSize = new Size(96, 96);
	nodeList.defaultNodeSize = new Size(24, 24);

	// add some nodes to the NodeListView
	for (let i = 1; i <= 15; ++i)
	{
		let node = new Diagramming.ShapeNode();
		// hide node's geometry, show bitmap image
		node.transparent = true;
		node.shape = "Rectangle";
		node.imageLocation = require("../assets/icon" + i + ".png");
		nodeList.addNode(node, "");
	}

	function onNodeCreated(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs)
	{
		let node = args.node;
		node.setZIndex(diagram.nodes.length);
		node.anchorPattern = Diagramming.AnchorPattern.fromId("TopInBottomOut");

		let nodesHere = diagram.getNodesAt(node.bounds.center());
		if (nodesHere.length < 2)
		{
			diagram.removeItem(node);
		}
		else
		{
			let parent = nodesHere[0];
			diagram.factory.createDiagramLink(parent, node);
			node.attachTo(parent);
			rearrange();
		}
	}

	function rearrange()
	{
		let treeLayout = new TreeLayout();
		treeLayout.linkType = TreeLayoutLinkType.Straight;
		treeLayout.levelDistance = treeLayout.nodeDistance = 16;
		diagram.arrangeAnimated(treeLayout);
	}

}