import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';


namespace Inheritance {
	Diagramming.TableNode.prototype.useScrollBars = true;
	(<any>Diagramming.ScrollBar.prototype).background = "#e0e9e9";
	(<any>Diagramming.ScrollBar.prototype).foreground = "DarkGray";

	const Font = Drawing.Font;
	const TreeLayout = Graphs.TreeLayout;

	// create a DiagramView component that wraps the "diagram" canvas
	let diagram = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram")).diagram;

	createClassDiagram(diagram,
		[
			Diagramming.DiagramItem,
			Diagramming.DiagramLink,
			Diagramming.DiagramNode,
			Diagramming.ShapeNode,
			Diagramming.TableNode,
			Diagramming.ContainerNode,
			Diagramming.FreeFormNode,
			Diagramming.SvgNode
		]);

	function createClassDiagram(diagram, classes) {
		// create a table node for each class
		for (let i = 0; i < classes.length; i++) {
			let theClass = classes[i];
			let node = diagram.factory.createTableNode(20, 20, 42, 42);
			node.redimTable(1, 0);
			node.text = (theClass.name);
			node.brush = ("white");
			node.captionBackBrush = ("#c0c0c0");
			node.captionFont = (
				new Font("sans-serif", 3, true /*bold*/, true /*italic*/));
			node.scrollable = (true);

			Object.getOwnPropertyNames(theClass.prototype).forEach(function (property) {
				node.addRow();
				let cell = node.getCell(0, node.rows.length - 1);
				cell.text = property.toString();
			});

			theClass.classNode = node;

			// add links
			let baseNode = Object.getPrototypeOf(theClass).classNode;
			if (baseNode) {
				let link = diagram.factory.createDiagramLink(
					baseNode,
					theClass.classNode);
				link.headShape = null;
				link.baseShape = "Triangle";
				link.baseShapeSize = 3;
			}
		}

		// arrange as a tree
		let treeLayout = new TreeLayout();
		treeLayout.linkType = Graphs.TreeLayoutLinkType.Cascading;
		diagram.arrange(treeLayout);
	}
}