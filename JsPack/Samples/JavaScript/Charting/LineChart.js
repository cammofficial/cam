/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var chartEl = document.getElementById('lineChart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
// create the chart
var lineChart = new Controls.LineChart(chartEl);

// create line brushes
var firstBrush = new Drawing.Brush("#669acc");
var secondBrush = new Drawing.Brush("#ce0000");
var thirdBrush = new Drawing.Brush("#003466");

lineChart.legendRenderer.background = new Drawing.Brush("#e0e9e9");
lineChart.legendRenderer.borderStroke = new Drawing.Brush("#c0c0c0");

lineChart.showZoomWidgets = true;
// create sample data series
var labels = new Collections.List([
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]);

var series1 = new Charting.Series2D(
    new Collections.List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    new Collections.List([0, 17, 22, 13, 4, 15, 26, 7, 28, 29, 10, 19]),
	labels
);
series1.title = "Series 1";
lineChart.series.add(series1);

var series2 = new Charting.Series2D(
	new Collections.List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
new Collections.List([2, 3, 7, 6, 9, 11, 13, 10, 14, 18, 21, 24]),
	labels
);
series2.title = "Series 2";
lineChart.series.add(series2);

lineChart.xAxis.interval = 1;

lineChart.showXRangeSelector = true;
lineChart.xScrollRangeMin = -50;
lineChart.xScrollRangeMax = 50;

lineChart.showYRangeSelector = true;
lineChart.yScrollRangeMin = -50;
lineChart.yScrollRangeMax = 50;


// assign one brush per series
var style = new Charting.MixedSeriesStyle();
style.commonFills = new Collections.List([firstBrush, secondBrush, thirdBrush]);
style.commonStrokes = new Collections.List([firstBrush, secondBrush, thirdBrush]);
style.uniformStrokeThickness = 5;
lineChart.plot.seriesStyle = style;

lineChart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
lineChart.theme.gridColor2 = Drawing.Color.fromArgb(224, 233, 233);
lineChart.theme.dataLabelsFontSize = lineChart.theme.axisLabelsFontSize = 12;
lineChart.theme.axisTitleFontSize = lineChart.theme.legendTitleFontSize = 14;
lineChart.theme.gridLineThickness = 0;

lineChart.draw();

// handlers
var gridType = document.getElementById('gridType');
gridType.selectedIndex = lineChart.gridType;
gridType.addEventListener("change", function ()
{
	lineChart.gridType = gridType.selectedIndex;
	lineChart.draw();
});

var lineType = document.getElementById('lineType');
lineType.selectedIndex = lineChart.lineType;
lineType.addEventListener("change", function ()
{
	lineChart.lineType = lineType.selectedIndex;
	lineChart.draw();
});

var xAxisMin = document.getElementById('xAxisMin');
xAxisMin.valueAsNumber = lineChart.xAxis.effectiveMinValue;
xAxisMin.addEventListener("change", function ()
{
	lineChart.xAxis.minValue = xAxisMin.valueAsNumber;
	lineChart.draw();
});

var xAxisMax = document.getElementById('xAxisMax');
xAxisMax.valueAsNumber = lineChart.xAxis.effectiveMaxValue;
xAxisMax.addEventListener("change", function ()
{
	lineChart.xAxis.maxValue = xAxisMax.valueAsNumber;
	lineChart.draw();
});

var yAxisMin = document.getElementById('yAxisMin');
yAxisMin.valueAsNumber = lineChart.yAxis.effectiveMinValue;
yAxisMin.addEventListener("change", function ()
{
	lineChart.yAxis.minValue = yAxisMin.valueAsNumber;
	lineChart.draw();
});

var yAxisMax = document.getElementById('yAxisMax');
yAxisMax.valueAsNumber = lineChart.yAxis.effectiveMaxValue;
yAxisMax.addEventListener("change", function ()
{
	lineChart.yAxis.maxValue = yAxisMax.valueAsNumber;
	lineChart.draw();
});

var xRangeMin = document.getElementById('xRangeMin');
xRangeMin.valueAsNumber = lineChart.xScrollRangeMin;
xRangeMin.addEventListener("change", function ()
{
	lineChart.xScrollRangeMin = xRangeMin.valueAsNumber;
	lineChart.draw();
});

var xRangeMax = document.getElementById('xRangeMax');
xRangeMax.valueAsNumber = lineChart.xScrollRangeMax;
xRangeMax.addEventListener("change", function ()
{
	lineChart.xScrollRangeMax = xRangeMax.valueAsNumber;
	lineChart.draw();
});

var yRangeMin = document.getElementById('yRangeMin');
yRangeMin.valueAsNumber = lineChart.yScrollRangeMin;
yRangeMin.addEventListener("change", function ()
{
	lineChart.yScrollRangeMin = yRangeMin.valueAsNumber;
	lineChart.draw();
});

var yRangeMax = document.getElementById('yRangeMax');
yRangeMax.valueAsNumber = lineChart.yScrollRangeMax;
yRangeMax.addEventListener("change", function ()
{
	lineChart.yScrollRangeMax = yRangeMax.valueAsNumber;
	lineChart.draw();
});

var showXticks = document.getElementById('showXticks');
showXticks.checked = lineChart.showXTicks;
showXticks.addEventListener("change", function ()
{
	lineChart.showXTicks = showXticks.checked;
	lineChart.draw();
});

var showYticks = document.getElementById('showYticks');
showYticks.checked = lineChart.showYTicks;
showYticks.addEventListener("change", function ()
{
	lineChart.showYTicks = showYticks.checked;
	lineChart.draw();
});

var showXCoords = document.getElementById('showXCoords');
showXCoords.checked = lineChart.showXCoordinates;
showXCoords.addEventListener("change", function ()
{
	lineChart.showXCoordinates = showXCoords.checked;
	lineChart.draw();
});

var showYCoords = document.getElementById('showYCoords');
showYCoords.checked = lineChart.showYCoordinates;
showYCoords.addEventListener("change", function ()
{
	lineChart.showYCoordinates = showYCoords.checked;
	lineChart.draw();
});

var showXRange = document.getElementById('showXRange');
showXRange.checked = lineChart.showXRangeSelector;
showXRange.addEventListener("change", function ()
{
	lineChart.showXRangeSelector = showXRange.checked;
	lineChart.draw();
});

var showYRange = document.getElementById('showYRange');
showYRange.checked = lineChart.showYRangeSelector;
showYRange.addEventListener("change", function ()
{
	lineChart.showYRangeSelector = showYRange.checked;
	lineChart.draw();
});

var showLegend = document.getElementById('showLegend');
showLegend.checked = lineChart.showLegend;
showLegend.addEventListener("change", function ()
{
	lineChart.showLegend = showLegend.checked;
	lineChart.draw();
});

var scrollGrid = document.getElementById('scrollGrid');
scrollGrid.checked = lineChart.pinGrid;
scrollGrid.addEventListener("change", function ()
{
	lineChart.pinGrid = scrollGrid.checked;
	lineChart.draw();
});

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = lineChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function ()
{
	if (showDataLabels.checked)
		lineChart.showDataLabels = Charting.LabelKinds.All;
	else
		lineChart.showDataLabels = Charting.LabelKinds.None;
	lineChart.draw();
});



