/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var chartEl = document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
var chart = new Controls.BubbleChart(chartEl);

var collection = new Collections.ObservableCollection();
for (var i = 0; i < 3; i++)
{
	if (i == 0)
	{
		collection.add(new PatientSeries(
			[
				new Patient("Adams", 15, 45, 19),
				new Patient("Byrnes", 4, 20, 27.1),
				new Patient("Clyde", 25, 95, 28.3),
				new Patient("Davis", 32, 108, 29.1),
				new Patient("Evans", 51, 83, 25.7)
			]));
	}
	if (i == 1)
	{
		collection.add(new PatientSeries(
			[
				new Patient("Fox", 35, 180, 34),
				new Patient("Gene", 14, 77, 30.2),
				new Patient("Harold", 7, 65, 33),
				new Patient("Ian", 48, 125, 32.5),
				new Patient("James", 67, 98, 31)
			]));
	}
}

chart.series = collection;
chart.title = "Patient BM Index by Age";
chart.titleFontSize = 20;
chart.titlePanel.margin = new Charting.Margins(0, 8, 0, 0);
chart.titleFontStyle = Drawing.FontStyle.Underline;
chart.backColor = new Drawing.Color("#c0c0c0");

chart.xAxis.minValue = 0;
chart.xAxis.maxValue = 80;
chart.xAxis.title = "Age";
chart.yAxis.minValue = 0;
chart.yAxis.maxValue = 250;
chart.yAxis.title = "Weight";

chart.theme.commonSeriesFills = chart.theme.commonSeriesStrokes = new Collections.List([

	new Drawing.Brush(Drawing.Color.fromArgb(0.7, 45, 57, 86)),
    new Drawing.Brush(Drawing.Color.fromArgb(0.7, 206, 0, 0))
]);

chart.legendHorizontalAlignment = MindFusion.Charting.Components.LayoutAlignment.Far;
chart.theme.legendBackground = new Drawing.Brush("#9caac6");
chart.theme.highlightStroke = new Drawing.Brush("#c0c0c0");
chart.legendTitle = "BMI";
chart.allowMoveLegend = false;
chart.gridType = Charting.GridType.Horizontal;
chart.theme.gridColor1 = chart.theme.gridColor2 = Drawing.Color.fromArgb(224, 233, 233);
chart.theme.gridLineStyle = Drawing.DashStyle.Dash;

chart.theme.dataLabelsFontSize = chart.theme.axisLabelsFontSize = 12;

chart.theme.axisTitleFontSize = chart.theme.legendTitleFontSize = 14;
chart.chartPanel.margin = new Charting.Margins(5, 0, 0, 5);

chart.draw();