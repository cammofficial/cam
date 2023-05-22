import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';
import * as Controls from '@mindfusion/controls';

namespace DragDrop
{
	const Point = Drawing.Point;
	const Rect = Drawing.Rect;

	let diagram: Diagramming.Diagram;
	let container = null, ghost = null, count = 2;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagramView.behavior = Diagramming.Behavior.LinkContainers;
	diagram = diagramView.diagram;

	let node = diagram.factory.createContainerNode(20, 20, 60, 30);
	node.text = "Container #1";

	node = diagram.factory.createContainerNode(90, 30, 60, 30);
	node.text = "Container #2";

	diagram.addEventListener(Diagramming.Events.nodeCreated, (sender, args) => { args.node.text = "Container #" + ++count; })

	function getNodeUnderCursor(e)
	{
		// Get the relative coordinates
		let rect = document.getElementById('diagram').getBoundingClientRect();
		let offset =
		{
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		}

		let x = (e.pageX - offset.left) + document.body.scrollLeft;
		let y = (e.pageY - offset.top) + document.body.scrollTop;

		// Check for node under the cursor
		let localPoint = diagramView.clientToDoc(new Point(x, y));
		return diagram.getNodeAt(localPoint, true, true);
	}

	function createDragShape(node)
	{
		let bounds = new Rect(0, 0, node.bounds.width, node.bounds.height);

		let canvasElement = document.createElement('canvas');
		canvasElement.id = 'ghost';
		canvasElement.width = bounds.width;
		canvasElement.height = bounds.height;

		let canvasControl = new Controls.CanvasControl(canvasElement);
		canvasControl.canvas.bounds = bounds;

		let cnode = node.clone();
		cnode.shadowColor = 'transparent';
		cnode.parent = canvasControl.canvas;
		cnode.bounds = bounds;
		cnode.addCanvasElements();

		canvasControl.canvas.repaint(null);

		return canvasControl;
	}

	document.querySelectorAll("p[draggable]").forEach((p) =>
	{
		p.addEventListener("dragstart", (e) => (<DragEvent>e).dataTransfer.setData("text", (<HTMLParagraphElement>e.target).innerText));
	});

	document.getElementById("dropTarget").addEventListener("dragenter", (e) =>
	{
		e.preventDefault();
	});

	document.getElementById("dropTarget").addEventListener("dragover", (e) =>
	{
		e.preventDefault();
	});

	document.getElementById("dropTarget").addEventListener("drop", (e) =>
	{
		e.preventDefault();

		let data = e.dataTransfer.getData("text");
		if (data != null)
		{
			let p = document.createElement("p");
			p.className = "p";
			p.innerHTML = data;
			document.getElementById("dropTarget").appendChild(p);
		}
	});

	document.getElementById("diagram").addEventListener("dragstart", (e) =>
	{
		let node = getNodeUnderCursor(e);
		if (node != null)
		{
			if (e.dataTransfer.setDragImage)
			{
				ghost = createDragShape(node);
				if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
				{
					let img = new Image();
					img.src = ghost.element.toDataURL();
					e.dataTransfer.setDragImage(img, 0, 0);
				}
				else
					e.dataTransfer.setDragImage(ghost.element, 0, 0);
				ghost.dispose();
				ghost = null;
			}
			e.dataTransfer.setData("text", node.text);

		}
	});

	document.getElementById("diagram").addEventListener("dragover", (e) =>
	{
		container = getNodeUnderCursor(e);
		if (container != null)
		{
			e.preventDefault();
		}
	});

	document.getElementById("diagram").addEventListener("drop", (e) =>
	{
		e.preventDefault();

		// Create a shape node from the text and add it to the container collection.
		let data = e.dataTransfer.getData("text");
		if (data != null && container != null)
		{
			let node = diagram.factory.createShapeNode(0, 0, 30, 20);
			node.text = (data);
			node.locked = (true);

			container.add(node);
			container.arrange(new Graphs.LayeredLayout());
		}
	});


	document.getElementById("bDragMode").addEventListener("change", (e) =>
	{
		diagramView.enabled = (!(<HTMLInputElement>e.target).checked);
	});
}