import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';

//import {icon_calculator, icon_time, icon_print, icon_home, icon_delivery} from './samples';

namespace SpanningCells {
	const ColumnStyle = Diagramming.ColumnStyle;
	const Alignment = Diagramming.Alignment;
	const Font = Drawing.Font;
	const GlassEffect = Diagramming.GlassEffect;
	const Style = Diagramming.Style;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	let diagram = diagramView.diagram;
	diagram.linkHeadShapeSize = 2;

	let shapeNodeStyle = new Style();
	shapeNodeStyle.brush = { type: 'SolidBrush', color: '#e0e9e9' };
	shapeNodeStyle.stroke = "#7F7F7F";
	shapeNodeStyle.fontName = "Verdana";
	shapeNodeStyle.fontSize = 3;
	shapeNodeStyle.backBrush = "#e0e9e9";
	shapeNodeStyle.nodeEffects = [new GlassEffect()];

	diagram.style = shapeNodeStyle;

	// create first table
	let table1 = diagram.factory.createTableNode(20, 20, 62, 42);
	table1.redimTable(2, 6);
	table1.getColumn(1).columnStyle = ColumnStyle.AutoWidth;
	table1.text = "Preparation";
	table1.captionBackBrush = "#9caac6";
	table1.captionFont = new Font("sans-serif", 3, true /*bold*/, true /*italic*/);

	let cell = table1.getCell(0, 0);
	cell.columnSpan = 2;
	cell.text = "Calculate Price";
	cell.textAlignment = Alignment.Center;
	cell.textColor = "#2d3956";
	cell.brush = "#9caac6";

	cell = table1.getCell(0, 3);
	cell.columnSpan = 2;
	cell.text = "Print Papers";
	cell.textAlignment = Alignment.Center;
	cell.textColor = "#2d3956";
	cell.brush = "#9caac6";

	cell = table1.getCell(0, 1);
	cell.rowSpan = 2;
	cell.imageLocation = "../assets/icon_calculator.png";

	cell = table1.getCell(0, 4);
	cell.rowSpan = 2;
	cell.imageLocation = "../assets/icon_print.png";

	const preparation_tasks = ["Distance", "Cargo Weight", "Invoice", "Track Number"];

	for (let i = 1; i <= 4; i++) {
		let row = i <= 2 ? i : i + 1;
		let cell = table1.getCell(1, row);
		cell.text = preparation_tasks[i - 1];
		cell.textAlignment = Alignment.Far;
	}


	// create second table
	let table2 = diagram.factory.createTableNode(120, 36, 55, 30);
	table2.redimTable(3, 4);
	table2.getColumn(2).columnStyle = ColumnStyle.AutoWidth;
	table2.text = "Spedition";
	table2.captionBackBrush = "black";
	table2.captionFont = new Font("Verdana", 4, true, false);
	table2.textColor = "white";

	cell = table2.getCell(1, 0);
	cell.rowSpan = 3;
	cell.columnSpan = 2;
	cell.imageLocation = "../assets/icon_delivery.png";

	let delivery_tasks = ["route", "fuel", "driver_id", ""];
	for (let i = 0; i < 4; i++) {
		let cell = table2.getCell(0, i);
		cell.text = delivery_tasks[i];
		cell.textColor = "#003466";
	}
	const colors = ["#000063", "#ce0000", "#5a79a5"];
	for (let i = 1; i < 4; i++) {
		let cell = table2.getCell(i - 1, 3);
		cell.text = "District " + i;
		cell.textColor = "#e0e9e9";
		cell.brush = colors[i - 1];
	}


	// create third table
	let table3 = diagram.factory.createTableNode(25, 80, 75, 30);
	table3.redimTable(4, 4);
	table3.getColumn(4).columnStyle = ColumnStyle.AutoWidth;
	table3.text = "Delivery";
	table3.captionBackBrush = "#ce0000";
	table3.captionFont = new Font("Verdana", 4, false, true);
	table3.textColor = "#e0e9e9";

	cell = table3.getCell(0, 0);
	cell.columnSpan = 2;
	cell.text = "Destination";
	cell.font = new Font("Verdana", 3, true, false);
	cell.textAlignment = Alignment.Center;
	cell.textColor = "#000063";
	cell.brush = "#c0c0c0";

	cell = table3.getCell(0, 1);
	cell.rowSpan = 3;
	cell.imageLocation = "../assets/icon_home.png";;

	delivery_tasks = ["address", "to door", ""];
	for (var i = 1; i < 3; i++) {
		let cell = table3.getCell(1, i);
		cell.text = delivery_tasks[i - 1];
		cell.textColor = "#003466";

		if (i == 2)
			cell.rowSpan = 2;
	}

	cell = table3.getCell(2, 0);
	cell.columnSpan = 2;
	cell.text = "Arrival";
	cell.font = new Font("Verdana", 3, true, false);
	cell.textAlignment = Alignment.Center;
	cell.textColor = "#e0e9e9";
	cell.brush = "#003466";

	cell = table3.getCell(2, 1);
	cell.rowSpan = 3;
	cell.brush = "#9caac6";
	cell.imageLocation = "../assets/icon_time.png";;

	delivery_tasks = ["time", "receiver", "charges"];
	for (let i = 1; i < 4; i++) {
		let cell = table3.getCell(3, i);
		cell.text = delivery_tasks[i - 1];
		cell.textColor = "#003466";
		cell.brush = "#9caac6";
	}
	// draw link from "item 1" in first table to "row 0" in second table
	let link = diagram.factory.createDiagramLink(table1, table2);
	link.originIndex = 1;
	link.destinationIndex = 0;

	link = diagram.factory.createDiagramLink(table2, table3);
	link.originIndex = 2;
	link.dynamic = true;
	link.destinationIndex = 1;

}