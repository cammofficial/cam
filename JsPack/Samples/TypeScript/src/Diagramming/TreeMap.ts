import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Controls from '@mindfusion/controls';
import * as Drawing from '@mindfusion/drawing';

namespace TreeMap
{
	const Events = Diagramming.Events;
	const Behavior = Diagramming.Behavior;
	const ContainerNode = Diagramming.ContainerNode;
	const ShapeNode = Diagramming.ShapeNode;

	const Rect = Drawing.Rect;

	const TreeMapLayout = Graphs.TreeMapLayout;

	let diagramView: Diagramming.DiagramView = null;
	let diagram: Diagramming.Diagram = null;
	let scale = null;

	// create a DiagramView component that wraps the "diagram" canvas
	diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagramView.behavior = Behavior.Modify;

	diagram = diagramView.diagram;
	diagram.defaultShape = 'Rectangle';
	diagram.bounds = new Rect(0, 0, 250, 195);

	diagram.addEventListener(Events.nodeCreated, function (sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs)
	{
		if (Controls.ControlUtils.isInstanceOfType(Diagramming.ContainerNode, args.node)) {
			let node = <Diagramming.ContainerNode>args.node;
			if (node.foldable) {
				node.foldable = (false);
				node.captionHeight = (6);
			}
		}
	});

	diagram.addEventListener(Controls.Events.controlLoaded, function (sender: Diagramming.DiagramView) { sender.zoomToFit(); });

	scale = ['rgb(224, 233, 233)', 'rgb(97, 106, 127)', 'rgb(206, 0, 0)'];

	createTreeMap();

	document.getElementById("ddlWeight").addEventListener("change", createTreeMap);
	document.getElementById("ddlColor").addEventListener("change", createTreeMap);

	function createTreeMap()
	{
		diagram.clearAll();

		// pretend we are calling a web service
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function ()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let parser = new DOMParser();
				let xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
				let cnt = 0;

				let continents = xmlDoc.getElementsByTagName('continent');

				for (let i = 0; i < continents.length; i++)
				{
					let continent = continents[i];
					let container = diagram.factory.createContainerNode(0, 0, 10, 10);
					container.tag = ([parseFloat(continent.attributes["area"].value), parseFloat(continent.attributes["population"].value)]);
					container.text = (continent.attributes["name"].value);
					container.id = (cnt++);

					let countries = continent.getElementsByTagName('country');
					for (let k = 0; k < countries.length; k++)
					{
						let country = countries[k];
						let shape = diagram.factory.createShapeNode(new Rect(0, 0, 10, 10));
						let area = parseFloat(country.attributes["area"].value);
						let population = parseFloat(country.attributes["population"].value)
						shape.tag = ([area, population]);
						shape.text = (country.attributes["name"].value);
						shape.id = (cnt++);

						let areaQuantifier = "million sq. km.";
						if (area < 1)
						{
							area *= 1000;
							areaQuantifier = "thousand sq. km.";
						}
						let populationQuantifier = "billions";
						if (population < 1)
						{
							population *= 1000;
							populationQuantifier = "millions";
						}

						shape.tooltip = (shape.text + "<br />Area: ~" + area + " " + areaQuantifier + "<br />Population: ~" + population + " " + populationQuantifier);

						container.add(shape);
					}
				}

				assignWeights();
				assignColors();
				arrangeDiagram();
			}
		};
		xhttp.open("GET", "../data/Data.xml", true);
		xhttp.send();
	}

	function assignWeights()
	{
		for (let i = 0; i < diagram.nodes.length; i++)
		{
			let node = diagram.nodes[i];
			// Ignore containers and container captions
			if (node instanceof ContainerNode || node.locked)
				continue;

			if (node instanceof ShapeNode)
			{
				let values = node.tag;
				if (values == null)
					continue;

				let s = <HTMLSelectElement>document.getElementById('ddlWeight')
				let name = (<HTMLOptionElement>s.options[s.selectedIndex]).text;


				if (name == "Area")
					node.weight = values[0];
				else if (name == "Population")
					node.weight = values[1];
			}
		}
	}

	function assignColors()
	{
		let largestArea = new Map();
		let largestPopulation = new Map();
		for (let i = 0; i < diagram.nodes.length; i++)
		{
			let node = diagram.nodes[i];
			if (node instanceof ContainerNode)
			{
				let area = 0.0;
				let population = 0.0;
				for (let j = 0; j < node.children.length; j++)
				{
					let child = node.children[j];
					let values = child.tag;
					if (values == null)
						continue;

					area = Math.max(area, values[0]);
					population = Math.max(population, values[1]);
				}
				largestArea.set(node, area);
				largestPopulation.set(node, population);
			}
		}

		for (let i = 0; i < diagram.nodes.length; i++)
		{
			let node = diagram.nodes[i];
			// Ignore containers and container captions
			if (node instanceof ContainerNode || node.locked)
				continue;

			if (node instanceof ShapeNode)
			{
				let values = node.tag;
				if (values == null)
					continue;

				let value = 0;
				let total = 0;


				let s = <HTMLSelectElement>document.getElementById('ddlColor')
				let name = (<HTMLOptionElement>s.options[s.selectedIndex]).text;

				if (name == "Area")
				{
					value = values[0];
					total = largestArea.get(node.container);
				}
				else if (name == "Population")
				{
					value = values[1];
					total = largestPopulation.get(node.container);
				}
				node.brush = getScaleColor(value, total);
			}
		}
	}

	function getScaleColor(value, total)
	{
		let factor = value / total;
		if (factor < 0)
			factor = 0;
		if (factor > 1)
			factor = 1;

		let step = 1.0 / (scale.length - 1);
		let start = scale[Math.floor(factor / step)];
		let end = scale[Math.min(scale.length - 1, Math.floor(factor / step) + 1)];

		let factorBase = factor - factor % step;

		start = start.substring(4, start.length - 1)
			.replace(/ /g, '')
			.split(',');
		end = end.substring(4, end.length - 1)
			.replace(/ /g, '')
			.split(',');

		return 'rgb(' +
			(+start[0] + Math.floor(((factor - factorBase) * (end[0] - start[0]) / step))).toString() + "," +
			(+start[1] + Math.floor(((factor - factorBase) * (end[1] - start[1]) / step))).toString() + "," +
			(+start[2] + Math.floor(((factor - factorBase) * (end[2] - start[2]) / step))).toString() + ")";
	}

	function arrangeDiagram()
	{
		let layout = new TreeMapLayout();
		layout.padding = 0;
		layout.containerPadding = 1;
		layout.layoutArea = new Rect(0, 0, 250, 195);
		diagram.arrange(layout);
		diagram.resizeToFitItems(5);

		// Remove the text of smaller nodes
		for (let i = 0; i < diagram.nodes.length; i++)
		{
			let node = diagram.nodes[i];
			if (!(node instanceof ShapeNode) || node.locked)
				continue;

			if (node.bounds.width < 10 || node.bounds.height < 10)
				node.text = "";
		}


		// Resize caption nodes
		for (let i = 0; i < diagram.nodes.length; i++)
		{
			let node = diagram.nodes[i];
			if (node.locked && node.masterNode)
			{
				let bounds = node.bounds;
				bounds.width = node.masterNode.bounds.width;
				bounds.height = Math.min(30, node.masterNode.bounds.height);
				node.setBounds(bounds);
			}
		}

		zoom();
	}

	function zoom()
	{
		diagramView.zoomFactor = 100;
		let cb = diagram.getContentBounds();
		let tl = diagramView.docToClient(cb.topLeft());
		let rc = new Rect(tl.x, tl.y, cb.width, cb.height);

		let ctrlWidth = diagram.bounds.width;
		let ctrlHeight = diagram.bounds.height;
		let cntWidth = rc.width;
		let cntHeight = rc.height;

		if (ctrlWidth > 0 && ctrlHeight > 0 && cntWidth > 0 && cntHeight > 0)
		{
			let rx = cntWidth / ctrlWidth;
			let ry = cntHeight / ctrlHeight;
			let ratio = Math.max(rx, ry);

			diagramView.scrollX = rc.x;
			diagramView.scrollY = rc.y;

			let newZoom = 100.0 / ratio;
			if (newZoom > 10)
				newZoom -= 2;

			diagramView.zoomFactor = newZoom;
		}
	}
}