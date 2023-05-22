/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;
var Components = Charting.Components;

// create the dashboard
var dashboardEl = document.getElementById('dashboard');
dashboardEl.width = dashboardEl.offsetParent.clientWidth;
dashboardEl.height = dashboardEl.offsetParent.clientHeight;
var dashboard = new Controls.Dashboard(dashboardEl);

dashboard.allowZoom = false;
dashboard.theme.plotBackground = new Drawing.Brush("#e0e9e9");
dashboard.theme.commonSeriesFills = getFills();
dashboard.theme.commonSeriesStrokes = getFills();
dashboard.theme.dataLabelsFontSize = dashboard.theme.axisLabelsFontSize = 12;
dashboard.theme.axisTitleFontSize = dashboard.theme.legendTitleFontSize = 14;

var mainGrid = new Components.GridPanel();
mainGrid.horizontalAlignment = Components.LayoutAlignment.Stretch;
mainGrid.verticalAlignment = Components.LayoutAlignment.Stretch;
mainGrid.columns.add(new Components.GridColumn());
dashboard.rootPanel.children.add(mainGrid);

// create plots grid
var plotGrid = new Components.GridPanel();
plotGrid.gridColumn = 1;
plotGrid.gridRow = 0;
plotGrid.columns.add(new Components.GridColumn());
plotGrid.columns.add(new Components.GridColumn());
mainGrid.children.add(plotGrid);

// add plot1
var plot1 = new Charting.Plot2D();
plot1.gridColumn = 0;
plot1.verticalScroll = false;
plot1.allowPan = false;
plot1.highlightStroke = new Drawing.Brush("#000063");
plot1.highlightStrokeThickness = 1;
var lineRenderer = new Charting.StepAreaRenderer(getSeriesCollection());
plot1.seriesRenderers.add(lineRenderer);
plotGrid.children.add(plot1);

// add plot2
var plot2 = new Charting.Plot2D();
plot2.gridColumn = 1;
plot2.allowPan = false;
plot2.verticalScroll = false;
plot2.highlightStroke = new Drawing.Brush("#000063");
plot2.highlightStrokeThickness = 1;
var barRenderer = new Charting.BarRenderer(getSeriesCollection());
plot2.seriesRenderers.add(barRenderer);
plotGrid.children.add(plot2);

// add plot3
var plot3 = new Charting.Plot2D();
plot3.allowPan = false;
plot3.gridColumn = 2;
plot3.verticalScroll = false;
plot3.highlightStroke = new Drawing.Brush("#000063");
plot1.highlightStrokeThickness = 1;
plot3.seriesRenderers.add(new Charting.ScatterRenderer(getSeriesCollection()));
plotGrid.children.add(plot3);

// add axis
var xa = new Charting.Axis();
xa.title = "Months";
var ya = new Charting.Axis();
ya.minValue = 0;
ya.maxValue = 100000;
ya.interval = 5000;
ya.title = "Revenues";

ya.numberFormat = "C";
var yAxis = new Charting.YAxisRenderer(ya, xa);
yAxis.gridColumn = 0;
yAxis.plotLeftSide = true;
yAxis.labelsSource = plot1;
yAxis.axisStroke = new Drawing.Brush("#000063");
yAxis.axisStrokeThickness = 1;
yAxis.titleBrush = new Drawing.Brush("#000063");
yAxis.titleFontSize = 10;
yAxis.titleFontStyle = Drawing.FontStyle.Bold;
yAxis.labelBrush = new Drawing.Brush("#000063");
mainGrid.children.add(yAxis);

// attach plots to axis
plot1.xAxis = plot2.xAxis = plot3.xAxis = xa;
plot1.yAxis = plot2.yAxis = plot3.yAxis = ya;


function getSeriesCollection()
{
	var collection = new Collections.ObservableCollection();
	var s = null;

	for (var i = 0; i < 3; i++)
	{
		if (i == 0)
		{
			s = new Charting.Series2D(
				new Collections.List([0, 1, 2, 3]),
				new Collections.List([25000, 50000, 40000, 55000]),
				new Collections.List(["Jan", "Feb", "Mar", "Apr"]));
			s.title = "Series 1";
			collection.add(s);
		}
		if (i == 1)
		{
			s = new Charting.Series2D(
				new Collections.List([0, 1, 2, 3]),
				new Collections.List([30000, 70000, 65000, 15000]),
				new Collections.List(["May", "Jun", "Jul", "Aug"]));
			s.title = "Series 2";
			collection.add(s);
		}
		if (i == 2)
		{
			s = new Charting.Series2D(
				new Collections.List([0, 1, 2, 3]),
				new Collections.List([27000, 45000, 35000, 65000]),
				new Collections.List(["Sep", "Oct", "Nov", "Dec"]));
			s.title = "Series 3";
			collection.add(s);
		}
	}
	return collection;
}


function getFills()
{
	var fills = new Collections.List();

	fills.add(new Drawing.Brush(Drawing.Color.fromArgb(0.6, 102, 154, 204)));
	fills.add(new Drawing.Brush(Drawing.Color.fromArgb(0.6, 206, 0, 0)));
	fills.add(new Drawing.Brush(Drawing.Color.fromArgb(0.6, 0, 52, 102)));

	return fills;
}

