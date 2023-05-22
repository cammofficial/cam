import * as Drawing from "@mindfusion/drawing";
import * as Diagramming from "@mindfusion/diagramming";
import * as Graphs from "@mindfusion/graphs";
import * as Charting from "@mindfusion/charting";
import * as Gauges from "@mindfusion/gauges";

var diagram = null;


import * as Collections from "@mindfusion/common-collections";

// create a Diagram component that wraps the "diagram" canvas
var diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
diagram = diagramView.diagram;
//set both base and head link shape size
diagram.linkHeadShapeSize = (2);
diagram.linkBaseShapeSize = (2);
diagram.linkBaseShape = (Diagramming.Shape.fromId("Arrow"));
//customize the link appearance
var linkStyle = new Diagramming.Style();
linkStyle.stroke = ("#c0c0c0");
linkStyle.textColor = ("#585A5C");
linkStyle.fontName = ("Verdana");
linkStyle.fontSize = (3);
diagram.style = (linkStyle);
//diagram items can only be selected
diagramView.behavior = (Diagramming.Behavior.SelectOnly);

// add listeners
diagram.addEventListener(Diagramming.Events.linkSelected, onLinkSelected);
diagram.addEventListener(Diagramming.Events.clicked, onClicked);

//generate the graph
onRandomGraph();

//handle the linkSelected event
function onLinkSelected(sender, args)
{

    //get the style of the series
    var seriesStyle = lineChart.plot.seriesStyle;
    seriesStyle.strokeThicknesses.clear();

    //thicken just the selected series, the others should be transparent
    for (var j = 0; j < lineChart.series.count(); j++)
	{
        seriesStyle.strokeThicknesses.add(0.15);
        diagram.links[j].strokeThickness = (1.0);
    }

    //bolden all selected links in the diagram as well
    for (var m = 0; m < diagram.selection.links.length; m++)
	{
        var clickedLinkId = diagram.selection.links[m].id;
        diagram.selection.links[m].strokeThickness = (3.0);

        //find the series that correspond to the selected links
        for (var i = 0; i < lineChart.series.count(); i++)
		{
            var _series = lineChart.series.item(i);


            //adjust the stroke thicknesses
            if (_series.title == clickedLinkId)
			{

                seriesStyle.strokeThicknesses.removeAt(i);
                seriesStyle.strokeThicknesses.insert(i, 3);
            }

        }
    }

    //repaint the chart
    lineChart.draw();
}

//reset the chart thicknesses
function onClicked(sender, args)
{
    resetThicknesses();

}

/* bolden the two major series, the others should be very thin.
bolden the two major diaglinks as well. */
function resetThicknesses()
{
    var seriesStyle = lineChart.plot.seriesStyle;
    seriesStyle.strokeThicknesses.clear();

    for (var j = 0; j < 5; j++)
	{
        seriesStyle.strokeThicknesses.add(0.1);
        diagram.links[j].strokeThickness = (1.0);
    }
    //the 6th series and link are bold
    seriesStyle.strokeThicknesses.add(2.0);
    diagram.links[5].strokeThickness = (2.0);

    for (var j = 0; j < 2; j++)
	{
        seriesStyle.strokeThicknesses.add(0.15);
        diagram.links[6 + j].strokeThickness = (1.0);
    }

    //the 9th as well
    seriesStyle.strokeThicknesses.add(2.0);
    diagram.links[8].strokeThickness = (2.0);
    seriesStyle.strokeThicknesses.add(0.1);
    diagram.links[9].strokeThickness = (1.0);

}


//build the nodes and arrange the diagram
function onRandomGraph()
{
    buildDiagram();
    applyLayeredLayout();

    //add the separators for the tyres
    //first get the size of the diagram
    var width = diagram.bounds.width;
    var height = diagram.bounds.height;

    //separator for the Clients tyre
    //the link starts from the left edge and eds to the right edge of the digram
    var link = new Diagramming.DiagramLink(
		diagram, new Drawing.Point(2, (height / 3.5)),
        new Drawing.Point(width, (height / 3.5)));
    link.shadowOffsetX = (0);
    link.shadowOffsetY = (0);
    link.strokeDashStyle = (Drawing.DashStyle.Dash);
    link.stroke = ("#DCDCDC");
    //remove the shapes at both ends
    link.headShape = (null);
    link.baseShape = (null);
    //do not allow this link to be selected
    link.locked = (true);
    //move the link label to the right
    var linkLabel = link.addLabel("Clients");
    linkLabel.setControlPointPosition(1, -5, 0);
    diagram.addItem(link);

    //separator for the network servers tyre
    link = new Diagramming.DiagramLink(
		diagram, new Drawing.Point(2, 2 * (height / 3.7)),
        new Drawing.Point(width, 2 * (height / 3.7)));
    link.shadowOffsetX = (0);
    link.shadowOffsetY = (0);
    link.strokeDashStyle = (Drawing.DashStyle.Dash);
    link.stroke = ("#DCDCDC");
    link.headShape = (null);
    link.baseShape = (null);	
    link.locked = (true);
    linkLabel = link.addLabel("Network Servers");
    linkLabel.setControlPointPosition(1, -5, 0);

    diagram.addItem(link);

    //separator for the data servers tyre
    link = new Diagramming.DiagramLink(
		diagram, new Drawing.Point(2, 3 * (height / 3.8)),
        new Drawing.Point(width, 3 * (height / 3.8)));
    link.shadowOffsetX = (0);
    link.shadowOffsetY = (0);
    link.strokeDashStyle = (Drawing.DashStyle.Dash);
    link.stroke = ("#DCDCDC");
    link.headShape = (null);
    link.baseShape = (null);
    link.locked = (true);
    linkLabel = link.addLabel("Data Servers");
    linkLabel.setControlPointPosition(1, -5, 0);

    diagram.addItem(link);
}

//generate diagram nodes
function buildDiagram()
{
    diagram.clearAll();

    //the default node size
    var rect = new Drawing.Rect(0, 0, 15, 15);

    var node = new Diagramming.ShapeNode(diagram);
    node.setBounds(rect);
    //the web server
    node.imageLocation = ("../assets/web_server.png");
    node.transparent = (true);
    diagram.addItem(node);

    //the clients
    for (var i = 0; i < 4; ++i)
	{
        node = new Diagramming.ShapeNode(diagram);
        node.setBounds(rect);
        node.transparent = (true);
        node.imageLocation = ("../assets/client.png");
        diagram.addItem(node);
        //add a link between the client and the server
        var link = new Diagramming.DiagramLink(
			diagram, node, diagram.nodes[0]);
        link.id = ("Client" + i);
        link.addLabel("Client" + i);
        diagram.addItem(link);
    }

    //create the network servers
    for (var i = 0; i < 3; ++i)
	{
        node = new Diagramming.ShapeNode(diagram);
        node.setBounds(rect);
        node.transparent = (true);
        node.imageLocation = ("../assets/network_server.png");
        diagram.addItem(node);
        //add a link between the client and the server
        var link = new Diagramming.DiagramLink(
			diagram, diagram.nodes[0], node);
        link.id = ("Network" + i);
        link.addLabel("Network" + i);
        diagram.addItem(link);
    }

    //the db node
    node = new Diagramming.ShapeNode(diagram);
    node.setBounds(rect);
    node.imageLocation = ("../assets/data_server.png");
    node.transparent = (true);
    diagram.addItem(node);

    //create the link between network servers and data
    for (var i = 0; i < 3; ++i)
	{

		//add a link between the network servers and the DB server
        var link = new Diagramming.DiagramLink(diagram, diagram.nodes[5 + i], node);
        link.id = ("Data" + i);
        link.addLabel("Data" + i);
        diagram.addItem(link);
    }

    //bolden the two major links
    diagram.links[5].strokeThickness = (2.0);
    diagram.links[8].strokeThickness = (2.0);
}

//the layeredLayout arranges the diagram properly - into layers
function applyLayeredLayout()
{
    var layout = new Graphs.LayeredLayout();
    layout.direction = Graphs.LayoutDirection.TopToBottom;
    layout.siftingRounds = 0;
    layout.nodeDistance = 20;
    layout.layerDistance = 20;
    diagram.arrange(layout);
    diagram.resizeToFitItems();
}

function randomInt(max)
{
    return Math.floor(max * Math.random());
}

var lineChart = null;
var brushes = null;
var colors = null;

//gauge
var userCounter = Gauges.OvalGauge.create(document.getElementById('userCounter'), false);
//use custom painting of the background and of the pointer
userCounter.addEventListener(Gauges.Events.prepaintBackground, onGaugerepaintBackground.bind(this));
userCounter.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

// userCounter
// the scale
var scale = new Gauges.OvalScale(userCounter);
scale.minValue = (0);
scale.maxValue = (40);
scale.startAngle = (120);
scale.endAngle = (420);
scale.fill = ('Transparent');
scale.stroke = ('Transparent');

//initialize the major settings
var majorSettings = scale.majorTickSettings;
majorSettings.tickShape = (Gauges.TickShape.Ellipse);
majorSettings.tickWidth = (new Gauges.Length(10, Gauges.LengthType.Relative));
majorSettings.tickHeight = (new Gauges.Length(2, Gauges.LengthType.Relative));
majorSettings.fontSize = (new Gauges.Length(9, Gauges.LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('Transparent');
majorSettings.labelForeground = ('White');
majorSettings.labelAlignment= (Gauges.Alignment.InnerCenter);
majorSettings.labelRotation= (Gauges.LabelRotation.Auto);
majorSettings.tickAlignment = (Gauges.Alignment.TrueCenter);
majorSettings.labelOffset= (new Gauges.Length(12, Gauges.LengthType.Relative));
majorSettings.step = (5);
var interval = new Gauges.CustomInterval();
interval.minValue = (35);
interval.fill = ('Red');
majorSettings.addCustomInterval(interval);

//initialize the middle settings
var middleSettings = scale.middleTickSettings;
middleSettings.showLabels= (false);
middleSettings.tickShape = (Gauges.TickShape.Ellipse);
middleSettings.tickWidth = (new Gauges.Length(6, Gauges.LengthType.Relative));
middleSettings.tickHeight = (new Gauges.Length(3, Gauges.LengthType.Relative));
middleSettings.fontSize = (new Gauges.Length(12, Gauges.LengthType.Relative));
middleSettings.fill = ('White');
middleSettings.stroke = ('Transparent');
middleSettings.labelForeground = ('rgb(50, 50, 50)');
middleSettings.tickAlignment = (Gauges.Alignment.TrueCenter);
middleSettings.count = (5);
middleSettings.addCustomInterval(interval);

//initalize the minor settings
var minorSettings = scale.minorTickSettings;
minorSettings.showLabels= (false);
minorSettings.showTicks = (false);

//add a range in gradient colors
var range = new Gauges.Range();
range.minValue = (0);
range.maxValue = (40);
range.fill = (Gauges.Utils.createLinearGradient(320, [1, '#ce0000', 0.8, '#ce0000', 0.7, '#FFA500', 0.6, '#FFD700', 0.5, '#008000', 0, '#008000']));
range.stroke = ('Transparent');
range.startWidth = (new Gauges.Length(0, Gauges.LengthType.Relative));
range.endWidth = (new Gauges.Length(8, Gauges.LengthType.Relative));
range.alignment = (Gauges.Alignment.TrueCenter);
scale.addRange(range);

//customize the gauge pointer
var pointer = new Gauges.Pointer();
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ("#333333");
pointer.pointerHeight = (new Gauges.Length(20, Gauges.LengthType.Relative));
pointer.pointerWidth= (new Gauges.Length(100, Gauges.LengthType.Relative));
pointer.shape = (Gauges.PointerShape.Needle);
scale.addPointer(pointer);
//add some initial value
pointer.value = (26);

//paint the background in gradient
function onGaugerepaintBackground(sender, args)
{
	args.cancelDefaultPainting = true;
	var context = args.context;
	var element = args.element;
	var size = sender.size;
	var ellipse = new Gauges.Ellipse();
	ellipse.fill = ('gray');
	ellipse.stroke = ('transparent');
	args.paintVisualElement(ellipse, size);
	var ellipse = new Gauges.Ellipse();
	ellipse.fill = (Gauges.Utils.createLinearGradient(300, [0, '#808080', 0.2, '#808080', 0.8, '#909090', 1, '#909090']));
	ellipse.stroke = ('transparent');
	ellipse.margin = (new Drawing.Thickness(0.015));
	args.paintVisualElement(ellipse, size);
}
;
//draw the pointer
function onPrepaintPointer(sender, args)
{
	args.cancelDefaultPainting = true;
	var context = args.context;
	var element = args.element;
	var size = element.renderSize;
	var psize = new Drawing.Size(0.2 * size.width, size.height);
	context.save();
	context.transform.apply(context, element.transform.matrix());
	context.beginPath();
	context.arc(psize.width / 2, psize.height / 2, psize.height / 2, 0, 2 * Math.PI, false);
	var fill = element.fill;
	context.fillStyle = Gauges.Utils.getBrush(context, fill, new Drawing.Rect(0, 0, size.width, size.height), false);
	context.fill();
	context.strokeStyle = '#333333';
	context.stroke();
	context.beginPath();
	context.moveTo(0, 0.425 * size.height);
	context.lineTo(0, 0.575 * size.height);
	context.lineTo(0.95 * size.width, 0.575 * size.height);
	context.lineTo(size.width, 0.5 * size.height);
	context.lineTo(0.95 * size.width, 0.425 * size.height);
	context.fillStyle = 'white';
	context.fill();
	context.stroke();
	context.restore();
}
;
//end of gauge

//create the line chart
var lineChartEl = document.getElementById('lineChart');
lineChart = new Charting.Controls.LineChart(lineChartEl as HTMLCanvasElement);
lineChart.showHighlight = false;
lineChart.areaOpacity = 0.5;
lineChart.showLegend = true;
lineChart.theme.legendBackground = new Drawing.Brush("#f0f0f0");
lineChart.legendTitle = "";
lineChart.theme.legendBorderStroke = new Drawing.Brush("#cecece");

var dt = new Date(); // for now
//offset by 30 secs for the first 30 data values
dt.setSeconds(dt.getSeconds() - 30);

// create sample data series
var values1 = new Collections.List<number>();
var values2 = new Collections.List<number>();
var values3 = new Collections.List<number>();
var values4 = new Collections.List<number>();
var values5 = new Collections.List<number>();
var values6 = new Collections.List<number>();
var values7 = new Collections.List<number>();
var values8 = new Collections.List<number>();
var values9 = new Collections.List<number>();
var values10 = new Collections.List<number>();

var xValues = new Collections.List<number>();
var xLabels = new Collections.List<string>();

//the colors for the brushes
brushes = new Collections.List();

var rgbColors = new Collections.List();
rgbColors.add(new Array(102, 154, 204));
rgbColors.add(new Array(0, 52, 102));
rgbColors.add(new Array(156, 170, 198));
rgbColors.add(new Array(102, 102, 102));
rgbColors.add(new Array(163, 198, 134));
rgbColors.add(new Array(90, 116, 68));
rgbColors.add(new Array(233, 202, 145));
rgbColors.add(new Array(234, 104, 79));
rgbColors.add(new Array(206, 0, 0));
rgbColors.add(new Array(245, 222, 208));

//initialize x-values and labels, generate sample data for the series
for (var i = 0; i < 30; i++)
{
	xValues.add(i);
	setXLabels(false);
	generateData();
}

//create brushes for 
var thicknesses = new Collections.List<number>();
for (var i = 0; i < 10; i++)
{
	var a = rgbColors.item(i);
	brushes.add(new Drawing.Brush(Drawing.Color.fromArgb(a[0], a[1], a[2])));
	if (i == 5 || i == 8)
		thicknesses.add(3.0);
	else
		thicknesses.add(0.15);
	//start the timer
	setTime();
}


lineChart.xAxis.labels = xLabels;
lineChart.showXCoordinates = false;

var angle = 1;

//the series for the chart
var series = new Collections.ObservableCollection(new Array(
	new Charting.Series2D(xValues, values1, xLabels),
	new Charting.Series2D(xValues, values2, null),
	new Charting.Series2D(xValues, values3, null),
	new Charting.Series2D(xValues, values4, null),
	new Charting.Series2D(xValues, values5, null),
	new Charting.Series2D(xValues, values6, null),
	new Charting.Series2D(xValues, values7, null),
	new Charting.Series2D(xValues, values8, null),
	new Charting.Series2D(xValues, values9, null),
	new Charting.Series2D(xValues, values10, null)));

//series titles are important - we identify the series with them
for (var i = 0; i < 4; i++)
	series.item(i).title = "Client" + i;

for (var i = 0; i < 3; i++)
	series.item(i + 4).title = "Network" + i;

for (var i = 0; i < 3; i++)
	series.item(i + 7).title = "Data" + i;

//tell the chart that the labels for the X-axis come from the first series.
series.item(0).supportedLabels = Charting.LabelKinds.XAxisLabel;

lineChart.series = series;

//customize the axis
lineChart.xAxis.interval = 1;
lineChart.xAxis.title = "Time";
lineChart.yAxis.interval = 10;
lineChart.yAxis.title = "Users";

//add a new column to the chart grid - for the Y2-axis
lineChart.chartPanel.columns.add(new Charting.Components.GridColumn());

//create a vertical stack panel for the second Y-axis
var y2Stack = new Charting.Components.StackPanel();
y2Stack.orientation = Charting.Components.Orientation.Vertical;
y2Stack.gridRow = 0;
//add the stack panel to the last grid column
y2Stack.gridColumn = lineChart.chartPanel.columns.count() - 1;

lineChart.chartPanel.children.add(y2Stack);
//create the second Y-axis
var secondYAxis = new Charting.YAxisRenderer(lineChart.yAxis);
secondYAxis.plotLeftSide = false;
lineChart.yAxisRenderers.add(secondYAxis);
y2Stack.children.add(secondYAxis);

//customize the grid
lineChart.gridType = Charting.GridType.Crossed;
lineChart.backColor = Drawing.Color.fromArgb(230, 230, 230);
lineChart.theme.gridColor1 = Drawing.Color.fromArgb(1, 255, 255, 255);
lineChart.theme.gridColor2 = Drawing.Color.fromArgb(1, 255, 255, 255);
lineChart.theme.gridLineColor = Drawing.Color.fromArgb(0.5, 240, 240, 240);

// assign one brush per series
lineChart.plot.seriesStyle = new Charting.PerSeriesStyle(brushes, brushes, thicknesses);
lineChart.plot.pinGrid = false;
lineChart.draw();

//start the timer
setInterval(setTime, 1000);

//generate sample data - remove the first values and add more values
function setTime()
{

	values1.removeAt(0);
	values2.removeAt(0);
	values3.removeAt(0);
	values4.removeAt(0);
	values5.removeAt(0);
	values6.removeAt(0);
	values7.removeAt(0);
	values8.removeAt(0);
	values9.removeAt(0);
	values10.removeAt(0);
	setXLabels(true);


	generateData();

	//sum all new values, find the average and update the guge pointer value
	var sum = 0;

	for (var i = 0; i < lineChart.series.count(); i++)
	{
		sum += series.item(i).yData.item(29);
	}

	var pointer = userCounter.scales[0].pointers[0];
	pointer.value = (sum / 10);

	//repaint the chart
	lineChart.draw();
}

//generate sample data
function generateData()
{
	values1.add(Math.floor(Math.random() * 90));
	values2.add(Math.floor(Math.random() * 100));
	values3.add(Math.floor(Math.random() * 50));
	values4.add(Math.floor(Math.random() * 15));
	values5.add(Math.floor(Math.random() * 55));
	values6.add(Math.floor(Math.random() * 60));
	values7.add(Math.floor(Math.random() * 13));
	values8.add(Math.floor(Math.random() * 85));
	values9.add(Math.floor(Math.random() * 20));
	values10.add(Math.floor(Math.random() * 10));
}

/* add and update the xLabels. Each 3rd labels is the current time, 
the others are empty strings */
function setXLabels(removeFirst)
{
	if (dt.getSeconds() % 3 == 0)
	{
		//clear the first three values
		if (removeFirst)
		{
			xLabels.removeAt(0);
			xLabels.removeAt(0);
			xLabels.removeAt(0);
		}

		//add a label and two empty strings
		xLabels.add(dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds());
		xLabels.add("");
		xLabels.add("");
	}

	dt.setSeconds(dt.getSeconds() + 1);

}