import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';


namespace LanesSample
{
	const Events = Diagramming.Events;
	const AnchorPattern = Diagramming.AnchorPattern;
	const AnchorPoint = Diagramming.AnchorPoint;
	const MarkStyle = Diagramming.MarkStyle;
	const Style = Diagramming.Style;
	const Theme = Diagramming.Theme;
	const LinkShape = Diagramming.LinkShape;
	const Shape = Diagramming.Shape;
	const Rect = Drawing.Rect;
	const Point = Drawing.Point;
	const GlassEffect = Diagramming.GlassEffect;

	let diagram: Diagramming.Diagram;
	let pattern: Diagramming.AnchorPattern;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagram.nodeEffects.push(new GlassEffect());

	// register event handlers
	diagram.addEventListener(Events.nodeCreated, onNodeCreated);
	diagram.addEventListener(Events.nodeModified, onNodeModified);
	diagram.addEventListener(Events.linkCreated, onLinkCreated);

	let header: Diagramming.Lanes.Header;
	let subheader: Diagramming.Lanes.Header;
	let grid = diagram.laneGrid;

	grid.minHeaderSize = (8);
	grid.hookHeaders = (false);
	grid.headersOnTop = (false);
	grid.columnHeadersHeights = ([8, 8]);

	for (let i = 1; i <= 8; i++)
	{
		header = new Diagramming.Lanes.Header();
		header.title = ("Week " + i.toString() + ", 2017");
		grid.addColumnHeader(header);

		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("S");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("M");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("T");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("W");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("T");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("F");
		grid.addColumnHeader(subheader, header);
		subheader = new Diagramming.Lanes.Header();
		subheader.title = ("S");
		grid.addColumnHeader(subheader, header);
	}

	for (let i = 1; i <= 6; i++)
	{
		header = new Diagramming.Lanes.Header();
		header.title = ("Task " + i.toString());
		grid.addRowHeader(header);
	}

	let count = 8 * 7;
	for (let i = 0; i < count; i++)
	{
		let column = grid.getColumn(i);

		if (i % 7 !== 0)
			grid.get(column, null).style.leftBorderPen = ('transparent');
		else
			grid.get(column, null).style.leftBorderPen = ('gray');

		if (i !== count - 1)
			grid.get(column, null).style.rightBorderPen = ('transparent');

		if (i % 7 === 0 || i % 7 === 6)
			grid.get(column, null).style.backgroundBrush = ('#9caac6');
	}

	count = 6;
	for (let i = 0; i < count; i++)
	{
		let row = grid.getRow(i);

		if (i === 0)
			grid.get(null, row).style.topBorderPen = ('transparent');
		else
			grid.get(null, row).style.topBorderPen = ('gray');

		if (i !== count - 1)
			grid.get(null, row).style.bottomBorderPen = ('transparent');
	}

	diagram.showLaneGrid = (true);

	// Ensure the document is big enough to contain the grid
	let margin = 5;
	let width = grid.columnHeaderBounds.right() + 2 * margin;
	let height = grid.rowHeaderBounds.bottom() + 2 * margin;

	diagram.bounds = (new Rect(0, 0, width, height));
	diagram.alignToGrid = (false);

	grid.leftMargin = (margin);
	grid.topMargin = (margin);

	pattern = new AnchorPattern(
		[
			new AnchorPoint(100, 50, false, true, MarkStyle.None),
			new AnchorPoint(0, 0, true, false, MarkStyle.None)
		]);

	let style = new Style();
	style.brush = 'black';
	let theme = new Theme();
	theme.styles["std:DiagramLink"] = style;
	diagram.theme = theme;

	diagram.linkShape = LinkShape.Cascading;
	diagram.linkHeadShape = Shape.fromId('Triangle');
	diagram.linkHeadShapeSize = 2;
	diagram.roundedLinks = true;
	diagram.roundedLinksRadius = 1;

	let defaultStyle = grid.style;
	defaultStyle.fontName = "Lucida Sans Unicode";
	defaultStyle.fontSize = 3.5;

	function onNodeCreated(sender: Diagramming.Diagram, e: Diagramming.NodeEventArgs)
	{
		e.node.anchorPattern = (pattern);

		// Place the box within the grid
		let bounds = e.node.bounds;
		let topLeft = new Point(bounds.x, bounds.y);

		let diagram = Diagramming.DiagramView.find("diagram").diagram;
		let grid = diagram.laneGrid;

		let cellBoundsReciever = {};
		if (!grid.getCellFromPoint(topLeft, cellBoundsReciever))
			return;
		let cellBounds = (<any>cellBoundsReciever).cellBounds;

		const pixel = 1;

		bounds.y = cellBounds.y + pixel;
		bounds.height = cellBounds.height - 2 * pixel;
		e.node.bounds = (bounds);
	}

	function onNodeModified(sender: Diagramming.Diagram, e: Diagramming.NodeEventArgs)
	{
		// Place the box within the grid
		let bounds = e.node.bounds;
		let topLeft = new Point(bounds.x, bounds.y + bounds.height / 2);

		let diagram = Diagramming.DiagramView.find("diagram").diagram;
		let grid = diagram.laneGrid;

		let cellBounds = Rect.empty;
		let cellBoundsReciever = {};
		if (!grid.getCellFromPoint(topLeft, cellBoundsReciever))
			return;
		cellBounds = (<any>cellBoundsReciever).cellBounds;

		const pixel = 1;

		bounds.y = cellBounds.y + pixel;
		bounds.height = cellBounds.height - 2 * pixel;
		e.node.bounds = (bounds);

		// Fix links
		for (let i = 0; i < e.node.incomingLinks.length; i++)
			fixArrow(e.node.incomingLinks[i]);
		for (let i = 0; i < e.node.outgoingLinks.length; i++)
			fixArrow(e.node.outgoingLinks[i]);
	}

	function onLinkCreated(sender: Diagramming.Diagram, e: Diagramming.LinkEventArgs)
	{
		fixArrow(e.link);
	}

	function fixArrow(a)
	{
		let originBounds = a.origin.bounds;
		let destBounds = a.destination.bounds;

		if (originBounds.right() < destBounds.left())
		{
			a.setPoints([
				new Point(originBounds.right(), originBounds.y + originBounds.height / 2),
				new Point(destBounds.x, originBounds.y + originBounds.height / 2),
				new Point(destBounds.x, destBounds.y)
			]);
		}
		else
		{
			a.setPoints([
				new Point(originBounds.right(), originBounds.y + originBounds.height / 2),
				new Point(originBounds.right() + 2, originBounds.y + originBounds.height / 2),
				new Point(originBounds.right() + 2, originBounds.y + originBounds.height / 2 + 4),
				new Point(destBounds.x, originBounds.y + originBounds.height / 2 + 4),
				new Point(destBounds.x, destBounds.y)
			]);
		}
	}
}