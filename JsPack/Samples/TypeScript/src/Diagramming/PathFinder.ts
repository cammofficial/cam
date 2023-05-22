import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Animations from '@mindfusion/animations';
import * as Drawing from '@mindfusion/drawing';

namespace Tracing
{
	const Events = Diagramming.Events;

	const DiagramNode = Diagramming.DiagramNode;
	const DiagramLink = Diagramming.DiagramLink;
	const ShapeNode = Diagramming.ShapeNode;
	const LinkShape = Diagramming.LinkShape;

	const GlassEffect = Diagramming.GlassEffect;

	const Rect = Drawing.Rect;

	const LayeredLayout = Graphs.LayeredLayout;
	const LayoutDirection = Graphs.LayoutDirection;

	const PathFinder = Diagramming.PathFinder;
	const Animation = Animations.Animation;

	let diagram: Diagramming.Diagram = null;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;

	diagram.selection.allowMultipleSelection = false;

	diagram.linkShape = LinkShape.Bezier;
	diagram.linkHeadShapeSize = 2;
	diagram.nodeEffects.push(new GlassEffect());

	// register event handlers
	diagram.addEventListener(Events.nodeClicked, onNodeClicked);


	let clickedNode = null;

	function onNodeClicked(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs)
	{
		diagram.selection.clear();

		if (clickedNode)
		{
			let finder = new PathFinder(diagram);

			let from = clickedNode;
			let to = args.node;

			let path = null;

			if ((<HTMLInputElement>document.getElementById("shortest")).checked)
				path = finder.findShortestPath(from, to, true, false);
			else
				path = finder.findLongestPath(from, to);

			if (path)
				runAnimation(0, path);
			else alert("No path found!")

			clickedNode.shadowColor = "gray";
			clickedNode = null;
		}
		else
		{
			clickedNode = args.node;
			clickedNode.shadowColor = "maroon";
		}
	}

	function runAnimation(index, path)
	{
		if (index >= path.items.length) return;

		let item = path.items[index];

		// animate nodes
		if (item instanceof DiagramNode)
		{
			let callback = function (animation, progress)
			{
				animation.item.brush = animation.fromValue;
			}

			let options =
			{
				duration: 200,
				fromValue: "maroon",
				toValue: "gray"
			}

			let animation = new Animation(item, options, callback);
			animation.start();

			animation.addEventListener(Animations.Events.animationComplete, function (sender, args)
			{
				animation.item.brush = animation.toValue;
				runAnimation(++index, path);
			});
		}
		else
		{
			// animate links
			let link = item;
			let sp = link.startPoint;
			let length = link.getLength();

			let callback = function (animation, animationProgress)
			{
				let node = animation.item;
				let bounds = node.bounds;

				let p = link.pointAlongLength(animationProgress);
				node.setBounds(new Rect(p.x - bounds.width / 2, p.y - bounds.height / 2, bounds.width, bounds.height));
			}

			let dummy = diagram.factory.createShapeNode(sp.x - 2, sp.y - 2, 4, 4);
			dummy.shape = "Circle";
			dummy.brush = "maroon";

			let animation = new Animation(dummy, { duration: length * 10 }, callback);
			animation.addEventListener(Animations.Events.animationComplete, function (sender, args)
			{
				diagram.removeItem(dummy);
				runAnimation(++index, path);
			});
			animation.start();
		}
	}

	document.getElementById("bRandomGraph").addEventListener("click", () =>
	{
		randomGraph(3);
		applyLayeredLayout();
	});

	function randomGraph(n)
	{
		diagram.clearAll();

		for (let i = 0; i < n; ++i)
		{
			let c = diagram.nodes.length;
			let g = 2 + randomInt(2);
			for (let j = 0; j < g; ++j)
			{
				let rect = new Rect(0, 0, 20, 20);
				let node = new ShapeNode(diagram);
				node.setBounds(rect);
				node.brush = "gray";
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
				for (let j = 0; j < 1 + randomInt(2); ++j)
				{
					let link = new DiagramLink(
						diagram, diagram.nodes[randomInt(c)], diagram.nodes[c + randomInt(g)]);
					diagram.addItem(link);
				}
			}
		}
	}

	function randomInt(max)
	{
		return Math.floor(max * Math.random());
	}

	function applyLayeredLayout()
	{
		let layout = new LayeredLayout();
		layout.direction = LayoutDirection.LeftToRight;
		layout.siftingRounds = 0;
		layout.nodeDistance = 18;
		layout.layerDistance = 18;
		diagram.arrange(layout);
		diagram.resizeToFitItems(10);
	}
}