/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var DateTimeSeries = Charting.DateTimeSeries;
var Drawing = MindFusion.Drawing;
var ToolTip = Charting.ToolTip;

var DateTimeSeriesWithTooltips = function (dates, values, minDate, maxDate)
{
	DateTimeSeries.apply(this, [dates, values, minDate, maxDate]);
};
DateTimeSeriesWithTooltips.prototype = Object.create(DateTimeSeries.prototype);

DateTimeSeriesWithTooltips.prototype.getLabel = function (index, kind)
{
	if (kind == MindFusion.Charting.LabelKinds.ToolTip)
	{
		var date = this.dates.item(index);
		var value = this.getValue(index, 1);
		return MindFusion.Charting.Utilities.format("Income for {0} is ${1} mln", date.getFullYear(), value);
	}
	return DateTimeSeries.prototype.getLabel.apply(this, [index, kind]);

};

var chartEl = document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
var chart = new Controls.AreaChart(chartEl);
chart.showToolTips = true;

// create sample data
var data = new Collections.ObservableCollection();

var years = new Collections.List();
var dt = new Date(new Date().getFullYear() - 10, 11, 31);
for (; ;)
{
	if (dt.getFullYear() > new Date().getFullYear())
		break;
	years.add(new Date(dt.setFullYear(dt.getFullYear() + 1)));
}

var income = new Collections.List([12, 13.2, 15.6, 17.8, 39, 20, 29, 79, 101, 120, 122]);

var series = new DateTimeSeriesWithTooltips(
	years, income, years.item(0), years.item(years.count() - 1));
series.minValue = 0;
series.maxValue = 1;
series.dateTimeFormat = Charting.DateTimeFormat.CustomDateTime;
series.customDateTimeFormat = '{"year":"numeric"}';

data.add(series);

// setup chart
chart.series = data;
chart.title = "Acme Inc. financial report";
chart.showXCoordinates = false;
chart.showLegend = false;
chart.layoutPanel.margin = new Charting.Margins(0, 0, 20, 0);

chart.xAxis.title = "";
chart.xAxis.minValue = 0;
chart.xAxis.maxValue = 1;
chart.xAxis.interval = 0.1;
chart.gridType = Charting.GridType.Horizontal;
chart.theme.gridLineColor = Drawing.Color.fromArgb(192, 192, 192);
chart.theme.gridLineStyle = Drawing.DashStyle.Dash;
chart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
chart.theme.gridColor2 = Drawing.Color.fromArgb(255, 255, 255);
chart.theme.axisTitleFontSize = 14;
chart.theme.dataLabelsFontSize = chart.theme.axisLabelsFontSize = 12;
chart.theme.titleFontSize = 20;
chart.chartPanel.margin = new Charting.Margins(5, 0, 0, 5);

chart.yAxis.title = "Income ($ in millions)";

chart.theme.uniformSeriesFill = new Drawing.LinearGradientBrush("#e0e9e9", "#616a7f");

ToolTip.brush = new Drawing.Brush("#fafafa");
ToolTip.pen = new Drawing.Pen("#9caac6");
ToolTip.textBrush = new Drawing.Brush("#5050c0");
ToolTip.horizontalPadding = 6;
ToolTip.verticalPadding = 4;
ToolTip.horizontalOffset = -6;
ToolTip.verticalOffset = -4;
ToolTip.font = new Drawing.Font("Verdana", 12, Drawing.FontStyle.Italic);

chart.draw();
