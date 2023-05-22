import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';

//import { snowman, fishing, camping, seaside, mountain } from './samples';

namespace Tutorial4 {
	const Diagram = Diagramming.Diagram;
	const CompositeNode = Diagramming.CompositeNode;
	const NodeListView = Diagramming.NodeListView;
	const Behavior = Diagramming.Behavior;
	const Size = Drawing.Size;

	const TemplatedBase = CompositeNode.classFromTemplate("TemplatedBase",
		{
			component: "GridPanel",
			rowDefinitions: ["*"],
			columnDefinitions: ["22", "*"],
			children:
				[
					{
						component: "Rect",
						name: "Background",
						pen: "black",
						brush: "white",
						columnSpan: 2
					},
					{
						component: "Image",
						name: "Image",
						autoProperty: true,
						location: "../assets/snowman.png",
						margin: "1",
						imageAlign: "Fit"
					},
					{
						component: "StackPanel",
						orientation: "Vertical",
						gridColumn: 1,
						margin: "1",
						verticalAlignment: "Near",
						children:
							[
								{
									component: "Text",
									name: "Title",
									autoProperty: true,
									text: "title",
									font: "Arial 5",
									pen: "#343434"
								},
								{
									component: "Text",
									name: "FullName",
									autoProperty: true,
									text: "full name",
									font: "Arial 4 bold",
									pen: "#003466",
									padding: "1,0,1,0"
								},
								{
									component: "Text",
									name: "Details",
									autoProperty: true,
									text: "details",
									font: "Arial 3",
									pen: "#003466"
								}
							]
					}
				]
		});

	class OrgChartNode extends TemplatedBase {

		private _cost: string;

		constructor(parent) {
			super(parent);
		};

		get cost() {
			return this._cost;
		}

		set cost(value) {
			this._cost = value;
		}

		// support for the NodeListView drag'n'drop
		clone() {
			let copy = super.clone();
			copy.cost = this._cost;
			return copy;
		}

		// clipboard and serialization support
		toJson() {
			let json = super.toJson();
			json.cost = this._cost;
			return json;
		}

		fromJson(json) {
			super.fromJson(json);
			this._cost = json.cost;
		}

		// undo/redo
		saveState() {
			let state = super.saveState();
			state.cost = this._cost;
			return state;
		}

		restoreState(state) {
			super.restoreState(state);
			this._cost = state._cost;
		}
	}

	// Create a type definition and declare the dynamic 
	// auto properties from the template above.
	// This step is optional, and the intent is to use intersecting types to avoid casting to 'any'
	// when setting the dynamically created properties.
	type AutoProps =
	{
		image: string;
		title: string;
		fullName: string;
		details: string;
	}

	let diagram: Diagramming.Diagram = null;
	let nodeListView: Diagramming.NodeListView = null;

	Diagram.registerClass(OrgChartNode, "OrgChartNode");

	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;

	// enable undo/redo support
	diagram.undoEnabled = (true);

	// enable drawing of custom nodes interactively
	diagram.customNodeType = (OrgChartNode);
	view.behavior = (Behavior.Custom);

	// create a NodeListView component that wraps the "nodeListView" canvas
	nodeListView = NodeListView.create(<HTMLCanvasElement>document.getElementById("nodeListView"));
	nodeListView.measureUnit = (6);
	nodeListView.padding = (1);
	nodeListView.iconSize = (new Size(65, 25));
	nodeListView.defaultNodeSize = (new Size(65, 25));

	// create and add some nodes to the node list
	// merge with AutoProps to have compile-time support for the templated dynamic auto properties (optional).
	let node1 = new OrgChartNode(nodeListView) as OrgChartNode & AutoProps;
	node1.title = "Skiing";
	node1.fullName = "Winter";
	node1.details = 
		"Vacation in the snow. \r\n" +
		"Ski lessons, ski equipment and winter sports.";
	node1.image = "../assets/snowman.png";;
	node1.cost = "high";
	nodeListView.addNode(node1, "");

	let node2 = new OrgChartNode(nodeListView) as OrgChartNode & AutoProps;
	node2.title = "Seaside";
	node2.fullName = "Summer";
	node2.details = "Sun bathing, swimming, catching tan.";
	node2.image = "../assets/seaside.png";;
	node2.cost = "high";
	nodeListView.addNode(node2, "");

	let node3 = new OrgChartNode(nodeListView) as OrgChartNode & AutoProps;
	node3.title = "Hiking";
	node3.fullName = "Spring";
	node3.details = "Mountain walking, guided tours.";
	node3.image = "../assets/mountain.png";;
	node3.cost = "low";
	nodeListView.addNode(node3, "");

	let node4 = new OrgChartNode(nodeListView) as OrgChartNode & AutoProps;
	node4.title = "Fishing";
	node4.fullName = "All Year";
	node4.details = "fishing equipment, instructors \nand camping.";
	node4.image = "../assets/fishing.png";;
	node4.cost = "medium";
	nodeListView.addNode(node4, "");

	let node5 = new OrgChartNode(nodeListView) as OrgChartNode & AutoProps;
	node5.title = "Camping";
	node5.fullName = "Summer";
	node5.details = "tent sleeping, open fire cooking.";
	node5.image = "../assets/camping.png";
	node5.cost = "low";
	nodeListView.addNode(node5, "");

	document.getElementById("bCopy").addEventListener("click", () => {
		view.copyToClipboard();
	});

	document.getElementById("bCut").addEventListener("click", () => {
		view.cutToClipboard();
	});

	document.getElementById("bPaste").addEventListener("click", () => {
		view.pasteFromClipboard(5, 5);
	});

	document.getElementById("bUndo").addEventListener("click", () => {
		diagram.undo();
	});

	document.getElementById("bRedo").addEventListener("click", () => {
		diagram.redo();
	});
}