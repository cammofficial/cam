import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';

//import { icon2, ceo, cto, hr, pr, ad } from './samples';

namespace Tutorial3 {
	const CompositeNode = Diagramming.CompositeNode;
	const Behavior = Diagramming.Behavior;
	const Rect = Drawing.Rect;

	var OrgChartNode = CompositeNode.classFromTemplate("OrgChartNode",
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
						location: "../assets/icon2.png",
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
									font: "Arial bold"
								},
								{
									component: "Text",
									name: "FullName",
									autoProperty: true,
									text: "full name",
									pen: "blue",
									padding: "1,0,1,0"
								},
								{
									component: "Text",
									name: "Details",
									autoProperty: true,
									text: "details",
									font: "Arial 3"
								}
							]
					}
				]
		});

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


	// create a DiagramView component that wraps the "diagram" canvas
	let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = view.diagram;

	// enable drawing of custom nodes interactively
	diagram.customNodeType = OrgChartNode;
	view.behavior = Behavior.Custom;

	// merge with AutoProps to have compile-time support for the templated dynamic auto properties (optional).
	let node1 = new OrgChartNode(diagram) as Diagramming.CompositeNode & AutoProps;
	node1.bounds = new Rect(25, 15, 60, 25);
	node1.title = "CEO";
	node1.fullName = "John Smith";
	node1.details =
		"Our beloved leader. \r\n" +
		"The CEO of this great corporation.";
	node1.image = "../assets/ceo.png";
	diagram.addItem(node1);

	let node2 = new OrgChartNode(diagram) as Diagramming.CompositeNode & AutoProps;
	node2.bounds = new Rect(25, 55, 60, 25);
	node2.title = "CTO";
	node2.fullName = "Bob Smith";
	node2.details = "The technology chief of this great corporation.";
	node2.image = "../assets/cto.png";;
	diagram.addItem(node2);

	let node3 = new OrgChartNode(diagram) as Diagramming.CompositeNode & AutoProps;
	node3.bounds = new Rect(95, 55, 60, 25);
	node3.title = "HR";
	node3.fullName = "Mary Johnson";
	node3.details = "Human resources and staff development.";
	node3.image = "../assets/hr.png";;
	diagram.addItem(node3);

	let node4 = new OrgChartNode(diagram) as Diagramming.CompositeNode & AutoProps;
	node4.bounds = new Rect(175, 55, 60, 25);
	node4.title = "PR";
	node4.fullName = "Diana Brandson";
	node4.details = "Public relations and media.";
	node4.image = "../assets/pr.png";;
	diagram.addItem(node4);

	let node5 = new OrgChartNode(diagram) as Diagramming.CompositeNode & AutoProps;
	node5.bounds = new Rect(175, 95, 60, 25);
	node5.title = "Media";
	node5.fullName = "Dave Lu";
	node5.details = "Adertising and creative content.";
	node5.image = "../assets/ad.png";;
	diagram.addItem(node5);

	diagram.factory.createDiagramLink(node1, node2);
	diagram.factory.createDiagramLink(node1, node3);
	diagram.factory.createDiagramLink(node1, node4);
	diagram.factory.createDiagramLink(node4, node5);
}