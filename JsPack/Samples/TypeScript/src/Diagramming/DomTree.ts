import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';

namespace DomTree
{
	const Events = Diagramming.Events;
	const ShapeNode = Diagramming.ShapeNode;
	const GlassEffect = Diagramming.GlassEffect;

	const Rect = Drawing.Rect;
	const TreeLayout = Graphs.TreeLayout;
	const TreeLayoutLinkType = Graphs.TreeLayoutLinkType;

	let diagram: Diagramming.Diagram;

	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;
	diagram.linkHeadShapeSize = (2);
	diagram.nodeEffects.push(new GlassEffect());

	// build a tree whose nodes correspond to the page DOM elements
	buildTree();

	// rearrange the tree when a branch is expanded ot collapsed
	diagram.addEventListener(Events.treeCollapsed, rearrangeTree);
	diagram.addEventListener(Events.treeExpanded, rearrangeTree);


	function buildTree()
	{
		// create a box that will be a root in our hierarchy
		let root = new ShapeNode(diagram);
		root.bounds = new Rect(0, 0, 20, 12);
		root.text = "document";
		root.brush = "#9caac6";
		diagram.addItem(root);

		// traverse the page DOM recursively and create corresponding diagram items
		buildBranches(root, document, 1);

		// arrange the tree
		let treeLayout = new TreeLayout();
		treeLayout.linkType = TreeLayoutLinkType.Cascading;
		diagram.arrange(treeLayout);

		diagram.resizeToFitItems(5);
	}

	function buildBranches(treeNode, domElement, level)
	{
		domElement.childNodes.forEach(function (child)
		{
			// create a node for the child element
			let childNode = new ShapeNode(diagram);
			childNode.bounds = new Rect(0, 0, 20, 12);
			childNode.text = child.nodeName;
			childNode.brush = { type: "LinearGradientBrush", color1: "#e0e9e9", color2: "#9caac6", angle: 30 };
			childNode.tag = child; // associate DOM element with node
			diagram.addItem(childNode);

			// link the subfolder with its parent
			diagram.factory.createDiagramLink(treeNode, childNode);

			// build subtrees recursively
			buildBranches(childNode, child, level + 1);
		});

		// allow collapsing the tree branch
		if (treeNode.outgoingLinks.length > 0)
			treeNode.expandable = (true);
	}

	function rearrangeTree(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs)
	{
		// arrange the tree
		let treeLayout = new TreeLayout();
		treeLayout.linkType = TreeLayoutLinkType.Cascading;
		treeLayout.keepRootPosition = true;
		sender.arrange(treeLayout);
	}
}