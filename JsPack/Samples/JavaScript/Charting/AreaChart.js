/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var areaChartEl = document.getElementById('areaChart');
areaChartEl.width = areaChartEl.offsetParent.clientWidth;
areaChartEl.height = areaChartEl.offsetParent.clientHeight;

// create the chart
var areaChart = new Controls.AreaChart(areaChartEl);
areaChart.areaOpacity = 0.5;

// create area brushes
var firstBrush = new Drawing.Brush("#ce0000");
var secondBrush = new Drawing.LinearGradientBrush("#003466", "#000063");
var thirdBrush = new Drawing.LinearGradientBrush("#e0e9e9", "#669acc");

var labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var angle = 1;

// create sample data series
var series = new Collections.ObservableCollection(
	[
        new Charting.BarSeries([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], labels),
        new Charting.BarSeries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], labels),
		new Charting.BarSeries([2, 8, 13, 15, 13, 8, 2, 8, 13, 15, 13, 8], labels)
	]);
series.item(0).title = "2018";
series.item(0).supportedLabels = Charting.LabelKinds.InnerLabel | Charting.LabelKinds.XAxisLabel;
series.item(1).title = "2019";
series.item(1).supportedLabels = Charting.LabelKinds.InnerLabel;
series.item(2).title = "2020";
series.item(2).supportedLabels = Charting.LabelKinds.InnerLabel;
areaChart.xAxis.title = "Profit (in mlns)";
areaChart.yAxis.title = "Turnover (in mlns)";
areaChart.series = series;

areaChart.xAxis.interval = 1;

// assign one brush per series
areaChart.plot.seriesStyle = new Charting.PerSeriesStyle(new Collections.List([firstBrush, secondBrush, thirdBrush]),
	new Collections.List([firstBrush, secondBrush, thirdBrush]), new Collections.List([3.0, 3.0, 3.0]));
areaChart.theme.legendBackground = new Drawing.Brush("#e0e9e9");
areaChart.theme.legendBorderStroke = new Drawing.Brush("#000000");
areaChart.theme.dataLabelsFontSize = areaChart.theme.axisLabelsFontSize = 12;
areaChart.theme.axisTitleFontSize = areaChart.theme.legendTitleFontSize = 14;
areaChart.theme.axisTitleFontName = "Verdana";
areaChart.theme.axisLabelsFontName = "Verdana";
areaChart.theme.dataLabelsFontName = "Verdana";
areaChart.legendTitle = "Year";
areaChart.draw();

// handlers

var lineType = document.getElementById('lineType');
lineType.selectedIndex = areaChart.gridType;
lineType.addEventListener("change", function ()
{
	areaChart.lineType = lineType.selectedIndex;
	areaChart.areaOpacity = areaOpacity.valueAsNumber / 100;
	areaChart.showDataLabels = showDataLabels.checked ? Charting.LabelKinds.All : Charting.LabelKinds.None;
	areaChart.draw();
});

var areaOpacity = document.getElementById('areaOpacity');
areaOpacity.valueAsNumber = areaChart.areaOpacity * 100;
areaOpacity.addEventListener("change", function ()
{
	areaChart.areaOpacity = areaOpacity.valueAsNumber / 100;
	areaChart.draw();
});

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = areaChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function ()
{
	if (showDataLabels.checked)
		areaChart.showDataLabels = Charting.LabelKinds.All;
	else
		areaChart.showDataLabels = Charting.LabelKinds.None;
	areaChart.draw();
});



