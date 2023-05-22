import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';
import { flowcharter_fc, flowcharter_sample } from '../data/FlowcharterJson';

namespace Flowcharter {
	const AnchorPattern = Diagramming.AnchorPattern;
	const AnchorPoint = Diagramming.AnchorPoint;
	const DiagramNode = Diagramming.DiagramNode;
	const ShapeNode = Diagramming.ShapeNode;
	const MarkStyle = Diagramming.MarkStyle;
	const Style = Diagramming.Style;
	const Theme = Diagramming.Theme;
	const FontStyle = Drawing.FontStyle;
	const Alignment = Diagramming.Alignment;
	const Behavior = Diagramming.Behavior;
	const HandlesStyle = Diagramming.HandlesStyle;
	const ChangeItemCommand = Diagramming.ChangeItemCommand;
	const Events = Diagramming.Events;
	const Overview = Diagramming.Overview;
	const NodeListView = Diagramming.NodeListView;
	const Rect = Drawing.Rect;
	const Shape = Diagramming.Shape;

	let diagram: Diagramming.Diagram;
	let overview: Diagramming.Overview;
	let nodeList: Diagramming.NodeListView;
	let anchorPattern = null, listFileNames = null;


	if (localStorage) {
		// load saved diagram ids from local storage
		if (!localStorage.getItem('fc'))
			localStorage.setItem('fc', JSON.stringify(flowcharter_fc));
		if (!localStorage.getItem('sample'))
			localStorage.setItem('sample', JSON.stringify(flowcharter_sample));
		listFileNames = document.getElementById('listFileNames');
		for (let i = 0; i < localStorage.length; i++) {
			let id = localStorage.key(i);
			let opt = document.createElement('option') as HTMLOptionElement;
			opt.value = i.toString();
			opt.innerHTML = id;
			listFileNames.appendChild(opt);
		}

	}
	else {
		(<HTMLInputElement>document.getElementById('tbFileName')).disabled = true;
		(<HTMLInputElement>document.getElementById('bSave')).disabled = true;
		(<HTMLInputElement>document.getElementById('listFileNames')).disabled = true;
		(<HTMLInputElement>document.getElementById('bLoad')).disabled = true;
		let span = document.createElement("span");
		span.innerHTML = '&nbsp;&nbsp;localStorage is not available under <b>file://</b> protocol.';
		(<HTMLInputElement>document.getElementById('bLoad')).parentNode.appendChild(span);
	}

	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;
	view.allowInplaceEdit = (true);
	diagram.routeLinks = (true);
	diagram.showGrid = (true);
	diagram.undoEnabled = (true);
	diagram.roundedLinks = (true);

	diagram.addEventListener(Events.nodeCreated, onNodeCreated);
	diagram.addEventListener(Events.linkCreating, onLinkCreated);
	diagram.addEventListener(Events.nodeSelected, onNodeSelected);
	diagram.addEventListener(Events.nodeDeselected, onNodeSelected);

	// create an Overview component that wraps the "overview" canvas
	overview = Overview.create(<HTMLCanvasElement>document.getElementById("overview"));
	overview.diagramView=(view);

	// create an NodeListView component that wraps the "nodeList" canvas
	nodeList = NodeListView.create(<HTMLCanvasElement>document.getElementById('nodeList'));

	for (let shapeId in Shape.shapes) {
		// skip some arrowhead shapes that aren't that useful as node shapes
		let shape = Shape.shapes[shapeId];
		if (!shape.params.outline) continue;
		if (shapeId == "RevWithCirc") continue;
		if (shapeId == "DoubleArrow") continue;
		if (shapeId == "CenteredCircle") continue;

		let node = new Diagramming.ShapeNode(diagram);
		node.shape = shapeId;
		nodeList.addNode(node, shapeId);
	}

	nodeList.addEventListener(Events.nodeSelected, onShapeSelected);

	onLoaded();

	function onShapeSelected(sender: Diagramming.NodeListView, e: Diagramming.NodeEventArgs) {
		let selectedNode = <Diagramming.ShapeNode>e.node;
		if (selectedNode)
			diagram.defaultShape = (selectedNode.shape);
	}

	function onLoaded() {

		// Create a sample diagram
		let start = diagram.factory.createShapeNode(new Rect(60, 8, 32, 16));
		start.shape = ('Terminator');
		start.text = ("Start");

		let choice = diagram.factory.createShapeNode(new Rect(60, 36, 32, 16));
		choice.shape = ('Decision');
		choice.text = ("Choice");

		let input = diagram.factory.createShapeNode(new Rect(108, 36, 32, 16));
		input.shape = ('Save');
		input.text = ("Data input");

		let user = diagram.factory.createShapeNode(new Rect(136, 36, 16, 16));
		user.shape = ('Actor');

		let process = diagram.factory.createShapeNode(new Rect(60, 64, 32, 16));
		process.shape = ('Procedure');
		process.text = ("Predefined process/routing");

		let document1 = diagram.factory.createShapeNode(new Rect(8, 64, 16, 16));
		document1.shape = ('Document');
		document1.text = ("Document");

		let document2 = diagram.factory.createShapeNode(new Rect(32, 64, 16, 16));
		document2.shape = ('Document');
		document2.text = ("Document");

		let multiDocument = diagram.factory.createShapeNode(new Rect(8, 92, 16, 16));
		multiDocument.shape = ('MultiDocument');
		multiDocument.text = ("Multiple documents");

		let database = diagram.factory.createShapeNode(new Rect(32, 92, 16, 16));
		database.shape = ('Database');
		database.text = ("Database");

		let procedure = diagram.factory.createShapeNode(new Rect(60, 92, 32, 16));
		procedure.text = ("Alternative procedure");

		let delay = diagram.factory.createShapeNode(new Rect(108, 92, 32, 16));
		delay.shape = ('Delay');
		delay.text = ("Delay");

		let end = diagram.factory.createShapeNode(new Rect(60, 120, 32, 16));
		end.shape = ('Terminator');
		end.text = ("End");

		anchorPattern = new AnchorPattern([
			new AnchorPoint(50, 0, true, false, MarkStyle.Rectangle, "#ff0000", 1.5),
			new AnchorPoint(0, 50, false, true, MarkStyle.Rectangle, "#008000", 1.5),
			new AnchorPoint(100, 50, false, true, MarkStyle.Rectangle, "#008000", 1.5),
			new AnchorPoint(50, 100, false, true, MarkStyle.Rectangle, "#008000", 1.5)
		]);

		for (let i = 0; i < diagram.nodes.length; i++)
			diagram.nodes[i].anchorPattern = (anchorPattern);

		diagram.factory.createDiagramLink(start, choice);
		diagram.factory.createDiagramLink(choice, process);
		diagram.factory.createDiagramLink(choice, input);
		diagram.factory.createDiagramLink(choice, document1);
		diagram.factory.createDiagramLink(choice, document2);
		let link = diagram.factory.createDiagramLink(document1, multiDocument);
		link.originAnchor = (3);
		link.destinationAnchor = (0);
		link = diagram.factory.createDiagramLink(document2, database);
		link.originAnchor = (3);
		link.destinationAnchor = (0);
		diagram.factory.createDiagramLink(process, procedure);
		diagram.factory.createDiagramLink(procedure, delay);
		diagram.factory.createDiagramLink(procedure, end);

		for (let i = 0; i < diagram.links.length; i++) {
			let link = diagram.links[i];
			link.headShape = ("Triangle");
			link.headShapeSize = (3);
		}

		let theme = new Theme();
		let shapeNodeStyle = new Style();
		shapeNodeStyle.brush = { type: 'LinearGradientBrush', color1: '#e0e9e9', color2: '#9caac6', angle: 90 };
		shapeNodeStyle.stroke = "#7F7F7F";
		shapeNodeStyle.textColor = "#585A5C";
		shapeNodeStyle.fontName = "Verdana";
		shapeNodeStyle.fontSize = 3;
		theme.styles.set("std:ShapeNode", shapeNodeStyle);
		let linkStyle = new Style();
		linkStyle.stroke = "#7F7F7F";
		linkStyle.textColor = "#585A5C";
		linkStyle.fontName = "Verdana";
		linkStyle.fontSize = 3;
		theme.styles.set("std:DiagramLink", linkStyle);
		let tableStyle = new Style();
		tableStyle.brush = { type: 'LinearGradientBrush', color1: '#FCFCFC', color2: '#9DABB4', angle: 90 };
		tableStyle.stroke = "#7F7F7F";
		tableStyle.textColor = "#585A5C";
		tableStyle.fontName = "Verdana";
		tableStyle.fontSize = 3;
		theme.styles.set("std:TableNode", tableStyle);
		diagram.theme = theme;

		let original = DiagramNode.prototype.createAnchorPointVisual;
		ShapeNode.prototype.createAnchorPointVisual = function (point) {
			let result = original.apply(this, [point]);
			result.brush = point.color;
			result.pen = '#7F7F7F';
			return result;
		};

		diagram.routeAllLinks();

		for (let i = 0; i < nodeList.items.length; i++) {
			nodeList.items[i].style = (shapeNodeStyle);
		}
	}

	function onNodeCreated(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs) {
		let node = args.node;
		node.brush = null; // Reset brush
		node.anchorPattern = anchorPattern;
		node.handlesStyle = HandlesStyle.HatchHandles3;
	}

	function onLinkCreated(sender: Diagramming.Diagram, args: Diagramming.LinkEventArgs) {
		let link = args.link;
		link.headShape = "Triangle";
		link.headShapeSize = 3;
	}

	function onNodeSelected(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs) {
		let node;
		if (diagram.selection.nodes.length > 0)
			node = diagram.selection.nodes[0];
		if (node && node.style !== undefined) {
			let style = node.style;
			if (style.fontName)
				(<HTMLSelectElement>document.getElementById('fontName')).value = (style.fontName);
			else
				(<HTMLSelectElement>document.getElementById('fontName')).value = ('Verdana');
			if (style.fontSize)
				(<HTMLSelectElement>document.getElementById('fontSize')).value = (style.fontSize);
			else
				(<HTMLSelectElement>document.getElementById('fontSize')).value = ('3');
		}
		else {
			(<HTMLSelectElement>document.getElementById('fontName')).value = ('Verdana');
			(<HTMLSelectElement>document.getElementById('fontSize')).value = ('3');
		}
	}

	document.getElementById("bUndo").addEventListener("click", () => {
		diagram.undo();
	});

	document.getElementById("bRedo").addEventListener("click", () => {
		diagram.redo();
	});

	document.getElementById("bDelete").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = diagram.selection.items.length - 1; i >= 0; i--) {
			diagram.removeItem(diagram.selection.items[i]);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bZoomIn").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.zoomFactor = Math.min(800, view.zoomFactor + 10);
	});

	document.getElementById("bZoomOut").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.zoomFactor = Math.max(10, view.zoomFactor - 10);
	});

	document.getElementById("bResetZoom").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.zoomFactor = 100;
	});

	document.getElementById('fontName').addEventListener("change", function () {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);

			let style = item.style;
			if (!style) {
				style = new Style();
				item.style = style;
			}

			style.fontName = ((<HTMLInputElement>this).value);
			item.invalidate();

			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById('fontSize').addEventListener("change", function () {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);

			let style = item.style;
			if (!style) {
				style = new Style();
				item.style = style;
			}

			style.fontSize = +((<HTMLInputElement>this).value);
			item.invalidate();

			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bBold").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);

			let style = item.style;
			if (!style) {
				style = new Style();
				item.style = style;
			}

			if (style.fontStyle === undefined) {
				style.fontStyle = FontStyle.Bold;
			}
			else if ((style.fontStyle & FontStyle.Bold) != FontStyle.Bold) {
				style.fontStyle = style.fontStyle | FontStyle.Bold;
			}
			else {
				style.fontStyle = style.fontStyle & ~FontStyle.Bold;
			}

			item.invalidate();

			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bItalic").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);

			let style = item.style;
			if (!style) {
				style = new Style();
				item.style = style;
			}

			if (style.fontStyle === undefined) {
				style.fontStyle = FontStyle.Italic;
			}
			else if ((style.fontStyle & FontStyle.Italic) != FontStyle.Italic) {
				style.fontStyle = style.fontStyle | FontStyle.Italic;
			}
			else {
				style.fontStyle = style.fontStyle & ~FontStyle.Italic;
			}

			item.invalidate();

			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bUnderlined").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);

			let style = item.style;
			if (!style) {
				style = new Style();
				item.style = style;
			}

			if (style.fontStyle === undefined) {
				style.fontStyle = FontStyle.Underline;
			}
			else if ((style.fontStyle & FontStyle.Underline) != FontStyle.Underline) {
				style.fontStyle = style.fontStyle | FontStyle.Underline;
			}
			else {
				style.fontStyle = style.fontStyle & ~FontStyle.Underline;
			}

			item.invalidate();

			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bLeft").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.textAlignment = (Alignment.Near);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bCenter").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.textAlignment = (Alignment.Center);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bRight").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.textAlignment = (Alignment.Far);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bTop").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.lineAlignment = (Alignment.Near);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bMiddle").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.lineAlignment = (Alignment.Center);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bBottom").addEventListener("click", () => {
		diagram.startCompositeOperation();
		for (let i = 0; i < diagram.selection.items.length; i++) {
			let item = diagram.selection.items[i];
			let change = new ChangeItemCommand(diagram, item);
			item.lineAlignment = (Alignment.Far);
			diagram.executeCommand(change);
		}
		diagram.commitCompositeOperation();
	});

	document.getElementById("bLinkShapes").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.behavior = (Behavior.LinkShapes);
	});

	document.getElementById("bLinkTables").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.behavior = (Behavior.LinkTables);
	});

	document.getElementById("bModify").addEventListener("click", () => {
		let view = Diagramming.DiagramView.find("diagram");
		view.behavior = (Behavior.Modify);
	});

	document.getElementById("bSave").addEventListener("click", () => {
		if (!localStorage)
			return;
		let name = (document.getElementById('tbFileName') as HTMLInputElement).value;
		if (localStorage.getItem(name))
			localStorage.removeItem(name);

		localStorage.setItem(name, diagram.toJson());

		if (listFileNames.find("option:contains('" + name + "')").length == 0) {
			let opt = document.createElement('option');
			opt.value = listFileNames.options.length;
			opt.innerHTML = name;
			listFileNames.appendChild(opt);
		}
	});

	document.getElementById("bLoad").addEventListener("click", () => {
		if (!localStorage)
			return;
		let s = <HTMLSelectElement>document.getElementById('listFileNames')
		let name = (<HTMLOptionElement>s.options[s.selectedIndex]).text;
		let json = localStorage.getItem(name);
		if (json) {
			diagram.fromJson(json);
		}
	});
}