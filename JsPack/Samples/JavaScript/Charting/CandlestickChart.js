/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;
var ToolTip = Charting.ToolTip;
var StockPriceSeries = Charting.StockPriceSeries;

var StockPriceWithTooltipSeries = function (values)
{
	StockPriceSeries.apply(this, [values]);
};
StockPriceWithTooltipSeries.prototype = Object.create(StockPriceSeries.prototype);

StockPriceWithTooltipSeries.prototype.getLabel = function (index, kind)
{
	if (kind == MindFusion.Charting.LabelKinds.ToolTip)
	{
		var item = this.values.items()[index];
		return MindFusion.Charting.Utilities.format("Open: {0}, Close: {1}, High: {2}, Low: {3}", item.open, item.close, item.high, item.low);
	}
	return StockPriceSeries.prototype.getLabel.apply(this, [index, kind]);
};

var chartEl = document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
var chart = new Controls.CandlestickChart(chartEl);

var stockData = [
    [15.99, 16.07, 15.80, 15.94],
    [15.93, 16.03, 15.89, 15.97],
    [15.97, 16.43, 15.94, 16.40],
    [16.36, 16.52, 16.34, 16.46],
    [16.44, 16.47, 16.23, 16.38],
    [16.38, 17.08, 16.37, 17.02],
    [17.01, 17.32, 16.93, 17.27],
    [17.24, 17.36, 17.14, 17.32],
    [17.28, 17.44, 17.08, 17.41],
    [17.40, 17.47, 17.21, 17.38],
    [17.34, 17.59, 17.32, 17.50],
    [17.51, 17.85, 17.14, 17.15],
    [17.16, 17.48, 17.16, 17.45],
    [17.41, 17.62, 17.27, 17.47],
    [17.46, 17.56, 17.16, 17.27],
    [17.22, 17.32, 17.10, 17.24],
    [17.15, 17.47, 17.14, 17.28],
    [17.03, 18.30, 17.02, 17.74],
    [17.72, 17.90, 17.61, 17.72],
    [17.71, 17.83, 17.51, 17.75],
    [17.74, 18.46, 17.74, 18.26],
    [18.21, 18.80, 18.17, 18.69],
    [18.70, 19.88, 18.65, 19.68],
    [19.72, 21.12, 19.66, 20.40],
    [20.29, 20.44, 19.52, 19.92],
    [19.87, 20.49, 19.84, 20.07],
    [20.06, 20.25, 19.45, 19.66],
    [19.65, 20.20, 19.17, 20.19],
    [20.30, 20.66, 20.09, 20.27],
    [20.26, 20.51, 19.95, 20.13],
    [20.10, 20.46, 19.88, 20.32],
    [20.31, 20.54, 19.99, 20.28],
    [20.28, 20.32, 19.98, 20.07],
    [20.11, 20.22, 19.69, 20.01],
    [19.98, 20.05, 19.79, 19.89],
    [19.87, 19.97, 19.31, 19.39],
    [19.36, 19.86, 19.20, 19.76],
    [19.76, 19.93, 19.55, 19.63],
    [19.63, 19.70, 19.29, 19.55],
    [19.48, 19.73, 19.42, 19.61],
    [19.57, 20.39, 19.51, 20.33],
    [20.32, 20.50, 20.09, 20.13],
    [20.13, 20.39, 19.95, 20.33],
    [20.30, 20.63, 20.28, 20.43],
    [20.44, 20.77, 20.32, 20.58],
    [20.59, 20.71, 20.36, 20.38],
    [20.37, 20.50, 20.04, 20.34],
    [20.33, 20.42, 19.68, 19.69],
    [19.49, 19.85, 19.48, 19.72],
    [19.70, 19.86, 19.57, 19.83],
    [19.83, 20.48, 19.83, 20.11],
    [20.08, 20.31, 19.87, 19.95],
    [19.95, 20.21, 19.64, 19.69],
    [19.74, 20.03, 19.69, 19.79],
    [19.80, 20.10, 19.70, 19.78],
    [19.72, 19.88, 19.35, 19.66],
    [19.63, 19.92, 19.60, 19.71],
    [19.72, 19.77, 19.22, 19.42]
];

// create sample data
var dataList = new Collections.List();
for (var i = 0; i < 30; i++)
{
	var date = new Date(new Date().getFullYear(), new Date().getMonth());
    var dataItem = new Charting.StockPrice(stockData[i][0], stockData[i][3], stockData[i][2], stockData[i][1], new Date(date.setDate(1 + i)));
	dataList.add(dataItem);
}

var series = new StockPriceWithTooltipSeries(dataList);
series.customDateTimeFormat = '{"day":"2-digit"}';

var data = new Collections.ObservableCollection();
data.add(series)

chart.series = data;

chart.title = "X*Y*Z Corp.";
chart.showToolTips = true;
chart.titleBrush = new Drawing.Brush("#e0e9e9");
chart.titleFontStyle = Drawing.FontStyle.Italic | Drawing.FontStyle.Bold; 
chart.showLegend = false;
chart.showXCoordinates = false;
chart.showXTicks = false;
chart.xAxis.title = "Day of Month";
chart.yAxis.title = "Price";

// customize tooltips
ToolTip.brush = new Drawing.Brush("#fafafa");
ToolTip.pen = new Drawing.Pen("#9caac6");
ToolTip.textBrush = new Drawing.Brush("#5050c0");
ToolTip.horizontalPadding = 6;
ToolTip.verticalPadding = 4;
ToolTip.font = new Drawing.Font("Verdana", 12, Drawing.FontStyle.Italic);

// background appearance
chart.gridType = Charting.GridType.Vertical;
chart.backColor = new Drawing.Color("#616a7f");
chart.theme.gridColor1 = new Drawing.Color("#616a7f");
chart.theme.gridColor2 = new Drawing.Color("#9caac6");
chart.theme.axisLabelsFontSize = 12;
chart.theme.axisTitleFontSize = 14;

// series style
chart.plot.seriesStyle = new Charting.CandlestickSeriesStyle(
    new Drawing.Brush("#ce0000"),
    new Drawing.Brush("#669acc"),
    new Drawing.Brush("#2d3956"),
	2, Drawing.DashStyle.Solid, chart.plot.seriesRenderers.item(0));

chart.theme.uniformSeriesStroke = chart.theme.highlightStroke =
	chart.theme.dataLabelsBrush = chart.theme.axisLabelsBrush =
chart.theme.axisTitleBrush = chart.theme.axisStroke = new Drawing.Brush("#e0e9e9");

chart.draw();

var tbCandlestickWidth = document.getElementById('tbCandlestickWidth');
tbCandlestickWidth.addEventListener("change", function() 
{
	chart.candlestickWidth = parseInt(tbCandlestickWidth.value);
});

var cbDateFormat = document.getElementById('cbDateFormat');
cbDateFormat.addEventListener("change", function() 
{
	(chart.series.item(0)).dateTimeFormat = cbDateFormat.selectedIndex;
	chart.draw();
});


var tbxCustomDateFormat = document.getElementById('tbxCustomDateFormat');
tbxCustomDateFormat.addEventListener("change", function() 
{
	(chart.series.item(0)).customDateTimeFormat = tbxCustomDateFormat.value;
});

(document.getElementById('chbShowZoomWidgets')).addEventListener("change", function() 
{
	chart.showZoomWidgets = !chart.showZoomWidgets;
});

var cbGridType = document.getElementById('cbGridType');
cbGridType.addEventListener("change", function() 
{
	chart.gridType = cbGridType.selectedIndex;
});

(document.getElementById('chbPinGrid')).addEventListener("change", function() 
{
	chart.pinGrid = !chart.pinGrid;
});