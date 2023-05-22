/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var chartEl = document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;

var chart = new Controls.BarChart(chartEl, Charting.BarLayout.SideBySide);
chart.titleMargin = new Charting.Margins(0, 0, 0, 0);
chart.barSpacingRatio = 2;
chart.legendMargin = new Charting.Margins(80, 10, 10, 10);
chart.legendTitle = "Legend"
chart.showLegend = true;
chart.subtitleMargin = new Charting.Margins(0, 0, 0, 0);

// create bar brushes
var thirdBrush = new Drawing.Brush("#ce0000");
var secondBrush = new Drawing.LinearGradientBrush("#003466", "#000063");
var firstBrush = new Drawing.LinearGradientBrush("#c0c9c9", "#669acc");

var labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var angle = 1;

// create sample data series
var series = new Collections.ObservableCollection(
	[
		new Charting.BarSeries(new Collections.List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), labels),
		new Charting.BarSeries(new Collections.List([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]), labels),
		new Charting.BarSeries(new Collections.List([2, 8, 13, 15, 13, 8, 2, 8, 13, 15, 13, 8]), labels)
	]);
series.item(0).title = "2018";
series.item(0).supportedLabels = Charting.LabelKinds.InnerLabel | Charting.LabelKinds.XAxisLabel;
series.item(1).title = "2019";
series.item(1).supportedLabels = Charting.LabelKinds.InnerLabel;
series.item(2).title = "2020";
series.item(2).supportedLabels = Charting.LabelKinds.InnerLabel;
chart.xAxis.title = "Profit (in mlns)";
chart.yAxis.title = "Turnover (in mlns)";
chart.series = series;
chart.xAxis.interval = 1;

// assign one brush per series
chart.plot.seriesStyle = new Charting.PerSeriesStyle(new Collections.List([firstBrush, secondBrush, thirdBrush]), null, new Collections.List([1]));
chart.theme.legendBackground = new Drawing.Brush("#505959");
chart.theme.legendBorderStroke = new Drawing.Brush("#000000");
chart.theme.dataLabelsBrush = chart.theme.legendTitleBrush = new Drawing.Brush("#e0e9e9");
chart.theme.dataLabelsFontSize = chart.theme.axisLabelsFontSize = 12;
chart.theme.axisTitleFontSize = chart.theme.legendTitleFontSize = 14;
chart.theme.axisTitleFontName = "Verdana";
chart.theme.axisLabelsFontName = "Verdana";
chart.theme.dataLabelsFontName = "Verdana";
chart.legendTitle = "Year";
chart.theme.gridColor1 = chart.theme.gridColor2 = new Drawing.Color("#ffffff");
chart.draw();

// handlers

document.getElementById('chbHorizontalBars').addEventListener("change", function ()
{
	chart.horizontalBars = !chart.horizontalBars;
	firstBrush.angle += (angle * 90);
	secondBrush.angle += (angle * 90);
	angle *= -1;
});

var chbShowDataLabels = document.getElementById('chbShowDataLabels');
chbShowDataLabels.addEventListener("change", function ()
{
	chart.showDataLabels = chbShowDataLabels.checked ? Charting.LabelKinds.All : Charting.LabelKinds.None;
	chart.invalidate();
});

document.getElementById('chbShowXTicks').addEventListener("change", function ()
{
	chart.showXTicks = !chart.showXTicks;
});

document.getElementById('chbShowYTicks').addEventListener("change", function ()
{
	chart.showYTicks = !chart.showYTicks;
});

document.getElementById('chbShowXCoords').addEventListener("change", function ()
{
	chart.showXCoordinates = !chart.showXCoordinates;
});

document.getElementById('chbShowYCoords').addEventListener("change", function ()
{
	chart.showYCoordinates = !chart.showYCoordinates;
});

document.getElementById('chbShowZoomWidgets').addEventListener("change", function ()
{
	chart.showZoomWidgets = !chart.showZoomWidgets;
});

var cbxBarLayout = document.getElementById('cbxBarLayout');
cbxBarLayout.addEventListener("change", function ()
{
	chart.barLayout = cbxBarLayout.selectedIndex;
});

var tbRatio = document.getElementById('tbRatio');
tbRatio.addEventListener("change", function ()
{
	chart.barSpacingRatio = parseInt(tbRatio.value);
});

var cbxGridType = document.getElementById('cbxGridType');
cbxGridType.addEventListener("change", function ()
{
	chart.gridType = cbxGridType.selectedIndex;
});
var tbAxisOrigin = document.getElementById('tbAxisOrigin');
tbAxisOrigin.addEventListener("change", function ()
{
	chart.yAxis.origin = parseInt(tbAxisOrigin.value);
});	
var tbXAxisMax = document.getElementById('tbXAxisMax');
var tbXAxisMin = document.getElementById('tbXAxisMin');
tbXAxisMax.addEventListener("change", function ()
{
	chart.xAxis.maxValue = Math.max(parseInt(tbXAxisMin.value) + 1, parseInt(tbXAxisMax.value));
});
tbXAxisMin.addEventListener("change", function ()
{
	chart.xAxis.minValue = Math.min(parseInt(tbXAxisMin.value), parseInt(tbXAxisMax.value) - 1);
});

var tbYAxisMax = document.getElementById('tbYAxisMax');
var tbYAxisMin = document.getElementById('tbYAxisMin');
tbYAxisMax.addEventListener("change", function ()
{
	chart.yAxis.maxValue = Math.max(parseInt(tbYAxisMin.value) + 1, parseInt(tbYAxisMax.value));
});
tbYAxisMin.addEventListener("change", function ()
{
	chart.yAxis.minValue = Math.min(parseInt(tbYAxisMin.value), parseInt(tbYAxisMax.value) - 1);
});

document.getElementById('chbShowLegend').addEventListener("change", function ()
{
	chart.showLegend = !chart.showLegend;
});
