/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;
var Gauges = MindFusion.Gauges;

var Controls = MindFusion.Charting.Controls;
var Components = MindFusion.Charting.Components;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

// create the chart
var element = document.getElementById('dashboard');
element.width = element.offsetParent.clientWidth;
element.height = element.offsetParent.clientHeight;
var dashboard = new Controls.Dashboard(element);

var builder = new Controls.LayoutBuilder(dashboard);

var label = new Components.TextComponent();
label.horizontalAlignment = Components.LayoutAlignment.Center;
label.text = "What devices and web apps are people using?";
dashboard.layoutPanel.children.add(label);

// build title as a stack of text components
var nameStack = new Components.StackPanel();
nameStack.orientation = Components.Orientation.Horizontal;
nameStack.horizontalAlignment = Components.LayoutAlignment.Center;

dashboard.layoutPanel.children.add(nameStack);
var yahoo = addToStack(nameStack, "Yahoo", new Drawing.Brush("purple"));
yahoo.horizontalAlignment = Components.LayoutAlignment.Center;

addToStack(nameStack, " vs ", null);

addToStack(nameStack, "G", new Drawing.Brush(Drawing.Color.fromArgb(66, 133, 244)));
addToStack(nameStack, "o", new Drawing.Brush(Drawing.Color.fromArgb(219, 68, 55)));
addToStack(nameStack, "o", new Drawing.Brush(Drawing.Color.fromArgb(244, 180, 0)));
addToStack(nameStack, "g", new Drawing.Brush(Drawing.Color.fromArgb(66, 133, 244)));
addToStack(nameStack, "l", new Drawing.Brush(Drawing.Color.fromArgb(15, 157, 88)));
addToStack(nameStack, "e", new Drawing.Brush(Drawing.Color.fromArgb(219, 68, 55)));

addToStack(nameStack, " vs ", null);

addToStack(nameStack, "Facebook", new Drawing.Brush(Drawing.Color.fromArgb(59, 89, 152)));

// create bar-chart axis renderers
var barPlotYAxis = new Charting.Axis();
barPlotYAxis.minValue = 0;
barPlotYAxis.maxValue = 1010;
barPlotYAxis.interval = 100;
barPlotYAxis.title = "Millions of Users";

var barPlotXAxis = new Charting.Axis();
barPlotXAxis.maxValue = 10;
barPlotXAxis.minValue = 1;
barPlotXAxis.interval = 1;
barPlotXAxis.title = "Time of Day";

var barPlotYAxisRenderer = new Charting.YAxisRenderer(barPlotYAxis);
var barPlotXAxisRenderer = new Charting.XAxisRenderer(barPlotXAxis);

// create bar-chart plot
var barPlot = new Charting.Plot2D();
barPlot.gridType = Charting.GridType.Horizontal;
barPlot.gridColor1 = new Drawing.Color("#dadada");
barPlotXAxisRenderer.labelsSource = barPlot;
barPlotXAxisRenderer.showCoordinates = false;

// create sample data
var smartphones = generateSeries(1, 24, 1);
smartphones.labels = new Collections.List();
for (var i = 0; i < 24; i++)
{
	smartphones.labels.add(Charting.Utilities.format("{0}:{1}\n{2}",
	(i / 13 == 0) ? i.toString() : (i % 12).toString(), "00", (i / 13 == 0) ? "AM" : "PM"));
}
smartphones.supportedLabels = Charting.LabelKinds.XAxisLabel;
smartphones.title = "Smartphones";

var tablets = generateSeries(1, 24, 1);
tablets.title = "Tablets";

var computers = generateSeries(1, 24, 1);
computers.title = "Computers";

// render the data series as bars
var col1 = new Collections.ObservableCollection([smartphones, tablets, computers]);
var barRenderer = new Charting.BarRenderer(col1);

var barStyle = new Charting.PerSeriesStyle();

barStyle.fills = barStyle.strokes = new Collections.List([
    new Drawing.Brush("#9caac6"),
    new Drawing.Brush("#ce0000"),
    new Drawing.Brush("#2d3956")]);
barRenderer.seriesStyle = barStyle;

barPlot.yAxis = barPlotYAxis;
barPlot.xAxis = barPlotXAxis;

barRenderer.yAxis = barPlotYAxis;

// create line plot
var linePlot = new Charting.Plot2D();
linePlot.background = new Drawing.Brush("#efefef");
linePlot.gridType = Charting.GridType.Horizontal;
linePlot.gridColor1 = new Drawing.Color("#dadada");


// create sample data
var yahooSeries = new Charting.Series2D(
				new Collections.List([
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
	]),
				new Collections.List([
		40000, 38000, 39000,
		39000, 41000, 37500, 35300, 37500, 34500, 37800, 39000,
		37800, 37800, 34500, 41500, 44000, 48000, 43000, 44000,
		49000, 37500, 42500, 43500, 43500, 42000, 42200, 43500,
		43200, 40500, 40500, 39000, 40500, 38000, 42000, 39000,
		38000, 37000
	]),
				new Collections.List([
		"jun 07", " ", " ", " ", "oct 07", " ", " ", " ",
		"feb 08", " ", " ", " ", "jun 08", " ", " ", " ",
		"oct 08", " ", " ", " ", "feb 09", " ", " ", " ",
		"jun 09", " ", " ", " ", "oct 09", " ", " ", " ",
		"feb 10", " ", " ", " ", "jun 10"
	])
);
yahooSeries.title = "Yahoo";
yahooSeries.supportedLabels = Charting.LabelKinds.XAxisLabel;

var googleSeries = new Charting.Series2D(
				new Collections.List
		([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
		]),
				new Collections.List
		([
			11500, 12500, 12600, 13500, 13400,
			14500, 14500, 16500, 16500, 16500, 16600, 16600,
			17000, 17000, 17100, 19000, 19000, 18500, 18500,
			21200, 20700, 26500, 28500, 34500, 33500, 36500,
			36500, 34500, 37000, 38500, 41000, 39000, 40500,
			40000, 40500, 41000, 41000
		]),
				null
);
googleSeries.title = "Google";

var facebookSeries = new Charting.Series2D(
				new Collections.List
		([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
		]),
				new Collections.List
		([
			5000, 6150, 6100, 5000,
			6050, 6100, 6100, 6150, 6100, 5150,
			6200, 6200, 8000, 8000, 9500, 10500,
			10500, 11500, 12000, 10500, 12000, 16000, 16500,
			17000, 17500, 20000, 26000, 27500, 31500, 30000,
			31500, 32500, 36000, 37500, 39000, 41000, 42000
		]),
				null
);
facebookSeries.title = "Facebook";

// define axis ranges
var yAxis = new Charting.Axis();
yAxis.minValue = 0;
yAxis.maxValue = 55000;
yAxis.interval = 5000;
yAxis.title = "Millions of Minutes";

var xAxis = new Charting.Axis();
xAxis.minValue = 0;
xAxis.maxValue = 36;
xAxis.interval = 1;
xAxis.title = " ";

linePlot.xAxis = xAxis;
linePlot.yAxis = yAxis;

// render sample data as line-chart
var lineRenderer = new Charting.LineRenderer(new Collections.ObservableCollection(
	[googleSeries, yahooSeries, facebookSeries]));

lineRenderer.yAxis = yAxis;

var googleBrush = new Drawing.LinearGradientBrush(
				Drawing.Color.fromArgb(66, 133, 244),
				Drawing.Color.fromArgb(244, 180, 0));

var lineStyle = new Charting.MixedSeriesStyle();
{
	lineStyle.strokes = new Collections.List([
		new Collections.List([
			new Drawing.Brush(Drawing.Color.fromArgb(66, 133, 244)),
			new Drawing.Brush(Drawing.Color.fromArgb(219, 68, 55)),
			new Drawing.Brush(Drawing.Color.fromArgb(244, 180, 0)),
			new Drawing.Brush(Drawing.Color.fromArgb(66, 133, 244)),
			new Drawing.Brush(Drawing.Color.fromArgb(15, 157, 88)),
			new Drawing.Brush(Drawing.Color.fromArgb(219, 68, 55))
		]),
		new Collections.List([

			new Drawing.Brush(Drawing.Color.knownColors.Purple)
		]),
		new Collections.List([

			new Drawing.Brush(Drawing.Color.fromArgb(1, 59, 89, 152)),
			new Drawing.Brush(Drawing.Color.fromArgb(1, 242, 242, 242))
		])
	]);
}

lineStyle.uniformStrokeThickness = 5;
lineStyle.commonFills = new Collections.List([
	googleBrush,
	new Drawing.Brush(Drawing.Color.knownColors.Purple),
	new Drawing.LinearGradientBrush(Drawing.Color.fromArgb(59, 89, 152), Drawing.Color.fromArgb(242, 242, 242))
]);


lineRenderer.seriesStyle = lineStyle;

// show Y axis
var linePlotYRenderer = new Charting.YAxisRenderer(yAxis);
linePlotYRenderer.labelsSource = linePlot;

// show X axis
var linePlotXRenderer = new Charting.XAxisRenderer(xAxis);
linePlotXRenderer.labelsSource = linePlot;
linePlotXRenderer.showCoordinates = false;
linePlotXRenderer.showTicks = false;
linePlotXRenderer.showSeriesLabels = true;

var linePanel = builder.createAndAddPlotWithBottomAndLeftAxes
	(linePlot, linePlotXRenderer, linePlotYRenderer);

var stc = new Charting.Series2D(
	new Collections.List([37, 8, 55]),
	null,
	new Collections.List(["Smartphones", "Tablets", "Computers"]));


// create a gauge
var ovalGauge = new MindFusion.Charting.Gauges.OvalGaugeRenderer(element);
ovalGauge.background = new Drawing.LinearGradientBrush(Drawing.Color.knownColors.White, Drawing.Color.knownColors.Gray);
ovalGauge.pointerStroke = new Drawing.Brush(Drawing.Color.knownColors.Black);
ovalGauge.pointerBackground = new Drawing.Brush("transparent");
ovalGauge.tickBackground = new Drawing.LinearGradientBrush("#5a79a5", "#003466");

var scale = ovalGauge.gauge.scales[0];
scale.endAngle = (270);
scale.startAngle = (90);
scale.minValue = (0);
scale.maxValue = (10);

// gauge definition
var pointer1 = new Gauges.Pointer();
pointer1.value = (1.8);
pointer1.shape = (Gauges.PointerShape.Needle);
pointer1.fill = ("#5a79a5");
scale.addPointer(pointer1);

var pointer2 = new Gauges.Pointer();
pointer2.value = (4.63);
pointer2.shape = (Gauges.PointerShape.Needle);
pointer2.fill = ("#ce0000");
scale.addPointer(pointer2);

var ptr = scale.pointers[0];
ptr.IsInteractive =(false);
ptr.shape = (Gauges.PointerShape.Needle);
ptr.value = (7.3);
ptr.fill = ("#9caac6");

scale.middleTickSettings.showLabels= (false);


var pnlGrid = new Components.GridPanel();
for (var i = 0; i < 1; i++) {
	pnlGrid.columns.add(new Components.GridColumn());
}
pnlGrid.rows.add(new Components.GridRow());

for (var i = 0; i < pnlGrid.columns.count(); i++) {
	pnlGrid.columns.items()[i].lengthType = Components.LengthType.Relative;
}
barPlot.seriesRenderers.add(barRenderer);
linePlot.seriesRenderers.add(lineRenderer);

var barPlotWithAxes = builder.createPlotWithBottomAndLeftAxes(barPlot, barPlotXAxisRenderer, barPlotYAxisRenderer);

var barText = new Components.TextComponent();
barText.gridRow = 0;
barText.gridColumn = 0;
barText.text = "Device usage during the day";
barText.horizontalAlignment = Components.LayoutAlignment.Stretch;

var gaugeTitle = new Components.TextComponent();
gaugeTitle.gridRow = 0;
gaugeTitle.gridColumn = 1;
gaugeTitle.text = "Data per hour";
gaugeTitle.horizontalAlignment = Components.LayoutAlignment.Stretch;

barPlotWithAxes.gridRow = 1;
barPlotWithAxes.gridColumn = 0;
ovalGauge.gridColumn = 1;
ovalGauge.gridRow = 1;

pnlGrid.children.add(barText);
pnlGrid.children.add(gaugeTitle);
pnlGrid.children.add(barPlotWithAxes);
pnlGrid.children.add(ovalGauge);

// create a legend
var legendLine = new Charting.LegendRenderer();

legendLine.content = new Collections.ObservableCollection([lineRenderer]);
legendLine.background = new Drawing.Brush("#e0e9e9");
legendLine.horizontalAlignment = Components.LayoutAlignment.Far;

var legendBar = new Charting.LegendRenderer();

legendBar.content = new Collections.ObservableCollection([barRenderer]);
legendBar.background = new Drawing.Brush("#e0e9e9");
legendBar.horizontalAlignment = Components.LayoutAlignment.Near;
legendBar.verticalAlignment = Components.LayoutAlignment.Center;

dashboard.rootPanel.children.add(legendLine);
dashboard.rootPanel.children.add(legendBar);
dashboard.layoutPanel.children.add(pnlGrid);


function generateSeries(startX, endX, intervalX) {
	var x = new Collections.List();
	var y = new Collections.List();
	var innerLabels = new Collections.List();
	for (var i = startX; i <= endX; i += intervalX) {
		x.add(i);
		y.add(Math.random() * 1000);
	}
	var result = new Charting.Series2D(x, y, null);
	return result;
}

function addToStack(stack, text, brush) {
	var component = new Components.TextComponent();

	component.text = text;
	component.textBrush = brush;

	stack.children.add(component);
	return component;
}






