/// <reference path="JsChart-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var EventSeries = Charting.EventSeries;
var ChartEvent = Charting.ChartEvent;

var chartEl = document.getElementById('towerChart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
// create the chart
var towerChart = new Controls.TowerChart(chartEl);

var leftSeries = new EventSeries(
	new Collections.List([
		new ChartEvent(0, 1, 3),
		new ChartEvent(2, 1, 2)
	]));
leftSeries.values.item(0).innerLabel = "22'45\"";
leftSeries.values.item(0).outerLabel = "Fernandes"
leftSeries.values.item(1).innerLabel = "59'27\"";
leftSeries.values.item(1).outerLabel = OuterLabel = "Sanchez";
leftSeries.title = "Spain";
towerChart.leftSeries = leftSeries;

var rightSeries = new EventSeries(new Collections.List([new ChartEvent(1, 1, 2)]));
rightSeries.values.item(0).innerLabel = "38'27\"";
rightSeries.values.item(0).outerLabel = "Chiesa";
rightSeries.title = "Italy";
towerChart.rightSeries = rightSeries;

var brushes = new Collections.List([
	new Drawing.Brush("#669acc"),
	new Drawing.Brush("#616a7f")
]);

var strokes = new Collections.List([new Drawing.Brush("#FFFFFF")]);

towerChart.plot.seriesStyle = new Charting.PerSeriesStyle(
	brushes, strokes, null, null);

towerChart.theme.dataLabelsFontSize = 12;
towerChart.theme.highlightStroke = new Drawing.Brush("#ce0000");

towerChart.legendRenderer.background = new Drawing.Brush("#e0e9e9");
towerChart.legendRenderer.borderStroke = new Drawing.Brush("#c0c0c0");
towerChart.legendRenderer.showSeriesElements = false;
towerChart.legendRenderer.titleFontSize = 14.0;

towerChart.margins = new Charting.Margins(100, 8, 100, 8);

towerChart.draw();

// handlers
var towerLayout = document.getElementById('towerLayout');
towerLayout.selectedIndex = towerChart.towerLayout;
towerLayout.addEventListener("change", function () {
	towerChart.towerLayout = towerLayout.selectedIndex;
	towerChart.draw();
});

var towerShape = document.getElementById('towerShape');
towerShape.selectedIndex = towerChart.segmentShape;
towerShape.addEventListener("change", function () {
	towerChart.segmentShape = towerShape.selectedIndex;
	towerChart.draw();
});

var towerMargins = document.getElementById('towerMargins');
towerMargins.valueAsNumber = towerChart.margins.left;
towerMargins.addEventListener("change", function () {
	towerChart.margins = new Charting.Margins(towerMargins.valueAsNumber, 8, towerMargins.valueAsNumber, 8);
	towerChart.draw();
});

var towerPadding = document.getElementById('towerPadding');
towerPadding.valueAsNumber = towerChart.seriesPadding;
towerPadding.addEventListener("change", function () {
	towerChart.seriesPadding = towerPadding.valueAsNumber;
	towerChart.draw();
});

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = towerChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function () {
	if (showDataLabels.checked)
		towerChart.showDataLabels = Charting.LabelKinds.All;
	else
		towerChart.showDataLabels = Charting.LabelKinds.None;
	towerChart.draw();
});

var showLegend = document.getElementById('showLegend');
showLegend.checked = towerChart.showLegend;
showLegend.addEventListener("change", function () {
	towerChart.showLegend = showLegend.checked;
	towerChart.draw();
});

var addLeftSeries = document.getElementById('addLeftSeries');
addLeftSeries.addEventListener("click", function () {
	var chartEvent = new ChartEvent(counter++, 1, new Date().getTime() % 2 + 2);
	chartEvent.innerLabel = new Date().getSeconds();
	chartEvent.outerLabel = "Player " + (new Date().getTime() % 12)
	towerChart.leftSeries.values.add(chartEvent);

	if (towerChart.range < counter)
		towerChart.range = counter;

	towerChart.draw();
});

var addRightSeries = document.getElementById('addRightSeries');
addRightSeries.addEventListener("click", function () {
	var chartEvent = new ChartEvent(counter++, 1, new Date().getTime() % 2 + 2);
	chartEvent.innerLabel = new Date().getSeconds();
	chartEvent.outerLabel = "Player " + (new Date().getTime() % 12)
	towerChart.rightSeries.values.add(chartEvent);

	if (towerChart.range < counter)
		towerChart.range = counter;

	towerChart.draw();
});

var counter = 3;