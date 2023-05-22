/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Components = Charting.Components;
var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var dashboardEl = document.getElementById('dashboard');
dashboardEl.width = dashboardEl.offsetParent.clientWidth;
dashboardEl.height = dashboardEl.offsetParent.clientHeight;

var dashboard = new Controls.Dashboard(dashboardEl);
var builder = new Controls.LayoutBuilder(dashboard);

var tc = new Components.TextComponent();
tc.text = "TITLE TEXT";
tc.fontName = "Times New Roman";
tc.fontStyle = Drawing.FontStyle.Underline;
tc.fontSize = 20.4;
tc.horizontalAlignment = Components.LayoutAlignment.Center;
dashboard.layoutPanel.children.add(tc);

var grid = new Components.GridPanel();

var linePlot = new Charting.Plot2D();
linePlot.background = new Drawing.LinearGradientBrush(new Drawing.Color("White"), Drawing.Color.fromArgb(1, 224, 224, 224), 90);

var barPlot = new Charting.Plot2D();
var radarPlot = new Charting.RadarPlot();
var polarPlot = new Charting.PolarPlot();
var plot3d1 = new Charting.Plot3D();
var plot3d2 = new Charting.Plot3D();
var plot3d3 = new Charting.Plot3D();
var plot4 = new Charting.Plot2D();

linePlot.xAxis = new Charting.Axis();
linePlot.xAxis.minValue = 0;
linePlot.xAxis.maxValue = 15;
linePlot.xAxis.interval = 1;
linePlot.xAxis.title = "When?";

linePlot.yAxis = new Charting.Axis();
linePlot.yAxis.minValue = 0;
linePlot.yAxis.maxValue = 35;
linePlot.yAxis.interval = 5;
linePlot.yAxis.title = "How many thousands?";

barPlot.xAxis = new Charting.Axis();
barPlot.xAxis.minValue = -1;
barPlot.xAxis.maxValue = 15;
barPlot.xAxis.interval = 3;
barPlot.xAxis.title = "When?";

barPlot.yAxis = new Charting.Axis();
barPlot.yAxis.minValue = 0;
barPlot.yAxis.maxValue = 35;
barPlot.yAxis.interval = 5;
barPlot.yAxis.title = "How many thousands?";

var data1 = new Charting.BarSeries(
	new Collections.List([10, 15, 17, 16, 20, 15, 14, 13, 10, 17, 22, 25, 25, 25, 21, 21]),
	null, null, new Collections.List(["nov\n2014", "dec\n2014", "jan\n2015", "feb\n2015", "mar\n2015", "apr\n2015", "may\n2015",
		"jun\n2015", "jul\n2015", "aug\n2015", "sep\n2015", "oct\n2015", "nov\n2015", "dec\n2015", "jan\n2016",
		"feb\n2016"]));
data1.title = "LP Vinyl";
var data2 = new Charting.BarSeries(
	new Collections.List([13, 13, 14, 16, 23, 25, 20, 19, 16, 17, 15, 13, 13, 17, 18, 21]), null);
data2.title = "CD";
var data3 = new Charting.BarSeries(
	new Collections.List([29, 28, 29, 31, 33, 35, 33, 27, 28, 28, 27, 29, 29, 31, 33, 29]), null);
data3.title = "MP3";

var lineRenderer = new Charting.LineRenderer(new Collections.ObservableCollection([data1, data2, data3]));
var barDataRenderer = new Charting.BarRenderer(new Collections.ObservableCollection([data1, data2, data3]));
var radarDataRenderer = new Charting.RadarRenderer(new Collections.ObservableCollection([data1, data2, data3]));
var pieDataRenderer = new Charting.PieRenderer(data1, 1);
var bar3DDataRenderer = new Charting.BarRenderer3D(new Collections.ObservableCollection([data1, data2, data3]));
var horizontalBar3DDataRenderer = new Charting.BarRenderer(new Collections.ObservableCollection([data1, data2, data3]));
var barStack3DRenderer = new Charting.BarStackRenderer3D(new Collections.ObservableCollection([data1, data2, data3]));
var barOverlay3DRenderer = new Charting.BarOverlayRenderer3D(new Collections.ObservableCollection([data1, data2, data3]));

lineRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 0, 0)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 0, 0, 255)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 0, 255, 0))]),
	new Collections.List([
		new Drawing.Brush(new Drawing.Color("Red")),
		new Drawing.Brush(new Drawing.Color("Blue")),
		new Drawing.Brush(new Drawing.Color("Green"))]));


barDataRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 128, 0, 128)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 240, 230, 140)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 165, 0))]));

bar3DDataRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 128, 0, 128)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 240, 230, 140)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 165, 0))]),
	null, new Collections.List([1]));

horizontalBar3DDataRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 128, 0, 128)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 240, 230, 140)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 165, 0))]),
	null, new Collections.List([1]));

horizontalBar3DDataRenderer.horizontalBars = true;

barOverlay3DRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 128, 0, 128)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 240, 230, 140)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 165, 0))]),
	null, new Collections.List([1]));

barStack3DRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 128, 0, 128)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 240, 230, 140)),
		new Drawing.Brush(Drawing.Color.fromArgb(0.6, 255, 165, 0))]),
	null, new Collections.List([1]));

radarDataRenderer.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List([
		new Drawing.Brush(new Drawing.Color("PaleGreen")),
		new Drawing.Brush(new Drawing.Color("PaleTurquoise")),
		new Drawing.Brush(new Drawing.Color("PaleVioletRed"))]),
	new Collections.List([
		new Drawing.Brush(new Drawing.Color("PaleGreen")),
		new Drawing.Brush(new Drawing.Color("PaleTurquoise")),
		new Drawing.Brush(new Drawing.Color("PaleVioletRed"))]), new Collections.List([5]));

radarDataRenderer.areaOpacity = 0.2;
radarPlot.defaultAxis.minValue = 0;
radarPlot.defaultAxis.maxValue = 35;
radarPlot.defaultAxis.interval = 5;
radarPlot.axisOptions = new Charting.RadarAxisOptions(radarPlot.defaultAxis);
radarPlot.axisOptions.showSeriesLabels = true;
radarPlot.axisOptions.axisStroke = new Drawing.Brush(new Drawing.Color("LightGray"));
radarPlot.defaultAxis.title = "";

linePlot.seriesRenderers.add(lineRenderer);
barPlot.seriesRenderers.add(barDataRenderer);
radarPlot.seriesRenderers.add(radarDataRenderer);
polarPlot.seriesRenderers.add(pieDataRenderer);
plot3d1.seriesRenderers.add(bar3DDataRenderer);
plot3d2.seriesRenderers.add(barStack3DRenderer);
plot3d3.seriesRenderers.add(barOverlay3DRenderer);
plot4.seriesRenderers.add(horizontalBar3DDataRenderer);

plot3d1.xAxis = new Charting.Axis();
plot3d1.xAxis.minValue = 0;
plot3d1.xAxis.maxValue = 5;
plot3d1.xAxis.interval = 1;
plot3d1.xAxis.title = "Months";

plot3d1.yAxis = new Charting.Axis();
plot3d1.yAxis.minValue = 0;
plot3d1.yAxis.maxValue = 40;
plot3d1.yAxis.interval = 5;
plot3d1.yAxis.title = "Thousands";

plot3d2.xAxis = plot3d3.xAxis = plot3d1.xAxis;
plot3d2.yAxis = plot3d3.yAxis = plot3d1.yAxis;
plot3d2.yAxis = new Charting.Axis();
plot3d2.yAxis.minValue = 0;
plot3d2.yAxis.maxValue = 100;
plot3d2.yAxis.interval = 10;
plot3d2.yAxis.title = "Thousands";

plot4.yAxis = new Charting.Axis();
plot4.yAxis.minValue = 0;
plot4.yAxis.maxValue = 4;
plot4.yAxis.interval = 1;
plot4.yAxis.title = "Months";

plot4.xAxis = new Charting.Axis();
plot4.xAxis.minValue = 0;
plot4.xAxis.maxValue = 40;
plot4.xAxis.interval = 5;
plot4.xAxis.title = "Thousands";

plot4.verticalScroll = true;

var xAxisRenderer = new Charting.XAxisRenderer(plot4.xAxis);
xAxisRenderer.axisStroke = new Drawing.Brush(new Drawing.Color("Red"));
xAxisRenderer.axisStrokeThickness = 3;
xAxisRenderer.titleBrush = new Drawing.Brush(new Drawing.Color("Orange"));
xAxisRenderer.titleFontName = "Courier New";
xAxisRenderer.titleFontSize = 15;

var yAxisRenderer = new Charting.YAxisRenderer(plot4.yAxis);
yAxisRenderer.axisStroke = new Drawing.Brush(new Drawing.Color("Red"));
yAxisRenderer.axisStrokeThickness = 3;
yAxisRenderer.titleBrush = new Drawing.Brush(new Drawing.Color("Orange"));
yAxisRenderer.titleFontName = "Courier New";
yAxisRenderer.titleFontSize = 15;

var xar = new Charting.XAxisRenderer(linePlot.xAxis);
xar.labelsSource = linePlot;
xar.showCoordinates = false;
xar.labelFontSize = 9;
xar.labelRotationAngle = 15;

var panel1 = builder.createPlotWithBottomAndLeftAxes(linePlot, xar, new Charting.YAxisRenderer(linePlot.yAxis));

xar = new Charting.XAxisRenderer(barPlot.xAxis);
xar.labelsSource = linePlot;
xar.showCoordinates = false;
xar.labelFontSize = 9;
xar.labelRotationAngle = 15;

var panel2 = builder.createPlotWithBottomAndRightAxes(barPlot, xar, new Charting.YAxisRenderer(barPlot.yAxis));

xar = new Charting.XAxisRenderer(plot3d1.xAxis);
xar.showCoordinates = false;
xar.titleBrush = new Drawing.Brush(new Drawing.Color("Green"));
xar.titleFontName = "Verdana";
xar.titleFontSize = 10;

var yar = new Charting.YAxisRenderer(plot3d1.yAxis);
yar.titleBrush = new Drawing.Brush(new Drawing.Color("Green"));
yar.titleFontName = "Verdana";
yar.titleFontSize = 10;

var panel3 = builder.createPlotWithTopAndRightAxes(plot3d1, xar, yar);

xar = new Charting.XAxisRenderer(plot3d2.xAxis);
xar.titleBrush = new Drawing.Brush(new Drawing.Color("Blue"));
xar.titleFontName = "Times New Roman";
xar.titleFontSize = 15;

yar = new Charting.YAxisRenderer(plot3d2.yAxis);
yar.titleBrush = new Drawing.Brush(new Drawing.Color("Blue"));
yar.titleFontName = "Times New Roman";
yar.titleFontSize = 15;
yar.titleFontStyle = Drawing.FontStyle.Bold;

var panel4 = builder.createPlotWithTopAndLeftAxes(plot3d2, xar, yar);

xar = new Charting.XAxisRenderer(plot3d3.xAxis);
xar.titleBrush = new Drawing.Brush(new Drawing.Color("Purple"));
xar.titleFontName = "Courier New";
xar.titleFontSize = 12;

yar = new Charting.YAxisRenderer(plot3d3.yAxis);
yar.titleBrush = new Drawing.Brush(new Drawing.Color("Purple"));
yar.titleFontName = "Courier New";
yar.titleFontSize = 12;

var panel5 = builder.createPlotWithTopAndRightAxes(plot3d3, xar, yar);

var panel6 = builder.createPlotWithTopAndLeftAxes(plot4, xAxisRenderer, yAxisRenderer);

panel1.margin = panel2.margin = panel3.margin = panel4.margin =
				panel5.margin = panel6.margin = new Charting.Margins(5, 5, 5, 5);

grid.columns.add(new Components.GridColumn());
grid.rows.add(new Components.GridRow());

var miniGrid = new Components.GridPanel();
miniGrid.columns.add(new Components.GridColumn());
miniGrid.rows.add(new Components.GridRow());

panel1.gridColumn = 0;
panel1.gridRow = 0;
panel2.gridColumn = 1;
panel2.gridRow = 0;
radarPlot.gridColumn = 0;
radarPlot.gridRow = 1;

polarPlot.gridColumn = 0;
polarPlot.gridRow = 0;
panel3.gridColumn = 1;
panel3.gridRow = 0;
panel4.gridColumn = 0;
panel4.gridRow = 1;
panel5.gridColumn = 1;
panel5.gridRow = 1;
panel6.gridColumn = 0;
panel6.gridRow = 0;

var legend = new Charting.LegendRenderer();
legend.content.add(lineRenderer);

grid.children.add(panel1);
grid.children.add(panel2);
grid.children.add(radarPlot);
grid.children.add(miniGrid);

miniGrid.children.add(panel3);
miniGrid.children.add(panel4);
miniGrid.children.add(panel5);
miniGrid.children.add(panel6);
miniGrid.gridColumn = 1;
miniGrid.gridRow = 1;

dashboard.layoutPanel.children.add(grid);
dashboard.rootPanel.children.add(legend);

dashboard.draw();