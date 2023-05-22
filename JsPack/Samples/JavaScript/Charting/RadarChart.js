/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;


// create the chart
var radarChartEl = document.getElementById('radarChart');
radarChartEl.width = radarChartEl.offsetParent.clientWidth;
radarChartEl.height = radarChartEl.offsetParent.clientHeight;
var radarChart = new Controls.RadarChart(radarChartEl);

// create sample data
var data = new Collections.ObservableCollection();
var series1 = new Charting.SimpleSeries(
	new Collections.List([20, 30, 43, 40, 44, 37, 35, 51]),
	new Collections.List(["20", "30", "43", "40", "44", "37", "35", "51"]));
var series2 = new Charting.SimpleSeries(
	new Collections.List([12, 40, 23, 30, 34, 47, 45, 21]),
	new Collections.List(["12", "40", "23", "30", "34", "47", "45", "21"]));

data.add(series1);
data.add(series2);
radarChart.series = data;

// define axis appearance
radarChart.theme.axisLabelsBrush = new Drawing.Brush("black");
radarChart.theme.axisLabelsFontStyle = Drawing.FontStyle.Bold;
radarChart.theme.axisLabelsFontSize = 12;
radarChart.theme.axisStroke = new Drawing.Brush("#c0c0c0");

radarChart.gridDivisions = 5;
radarChart.defaultAxis.minValue = 0;
radarChart.defaultAxis.maxValue = 55;
radarChart.showLegend = false;

for (var i = 0; i < 8; i++)
{
	var axis = new Charting.Axis();
	axis.title = "Axis " + (i + 1).toString();
	radarChart.axes.add(axis);
}

// specify one color per series
radarChart.plot.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List(
		[
            new Drawing.Brush("#ce0000"),
            new Drawing.Brush("#2d3956")
		]),
	new Collections.List(
		[
            new Drawing.Brush("#ce0000"),
            new Drawing.Brush("#2d3956")
        ]),
    new Collections.List(
        [
            4
        ]));

radarChart.theme.highlightStroke = new Drawing.Brush("#9caac6");
radarChart.theme.dataLabelsFontSize = 12;
radarChart.theme.legendTitleFontSize = radarChart.theme.axisTitleFontSize = 14;

radarChart.draw();

// handlers
var gridDivisions = document.getElementById('gridDivisions');
gridDivisions.valueAsNumber = radarChart.gridDivisions;
gridDivisions.addEventListener("change", function ()
{
	radarChart.gridDivisions = gridDivisions.valueAsNumber;
	radarChart.draw();
});

var axisMinValue = document.getElementById('axisMinValue');
axisMinValue.valueAsNumber = radarChart.defaultAxis.minValue;
axisMinValue.addEventListener("change", function ()
{
	radarChart.defaultAxis.minValue = axisMinValue.valueAsNumber;
	radarChart.draw();
});

var axisMaxValue = document.getElementById('axisMaxValue');
axisMaxValue.valueAsNumber = radarChart.defaultAxis.maxValue;
axisMaxValue.addEventListener("change", function ()
{
	radarChart.defaultAxis.maxValue = axisMaxValue.valueAsNumber;
	radarChart.draw();
});

var areaOpacity = document.getElementById('areaOpacity');
areaOpacity.valueAsNumber = radarChart.areaOpacity * 10;
areaOpacity.addEventListener("change", function ()
{
	radarChart.areaOpacity = areaOpacity.valueAsNumber / 10;
	radarChart.draw();
});

var chartPadding = document.getElementById('chartPadding');
chartPadding.valueAsNumber = radarChart.chartPadding;
chartPadding.addEventListener("change", function ()
{
	radarChart.chartPadding = chartPadding.valueAsNumber;
	radarChart.draw();
});

var startAngle = document.getElementById('startAngle');
startAngle.valueAsNumber = radarChart.startAngle;
startAngle.addEventListener("change", function ()
{
	radarChart.startAngle = startAngle.valueAsNumber;
	radarChart.draw();
});

var alignAxis = document.getElementById('alignAxis');
alignAxis.checked = radarChart.alignToAxis;
alignAxis.addEventListener("change", function ()
{
	radarChart.alignToAxis = alignAxis.checked;
	radarChart.draw();
});

var allowRotate = document.getElementById('allowRotate');
allowRotate.checked = radarChart.allowRotate;
allowRotate.addEventListener("change", function ()
{
	radarChart.allowRotate = allowRotate.checked;
	radarChart.draw();
});

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = radarChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function ()
{
	if (showDataLabels.checked)
		radarChart.showDataLabels = Charting.LabelKinds.All;
	else
		radarChart.showDataLabels = Charting.LabelKinds.None;
	radarChart.draw();
});

var gridType = document.getElementById('gridType');
gridType.selectedIndex = radarChart.gridType;
gridType.addEventListener("change", function ()
{
	radarChart.gridType = gridType.selectedIndex;
	radarChart.draw();
});

var radarType = document.getElementById('radarType');
radarType.selectedIndex = radarChart.radarType;
radarType.addEventListener("change", function ()
{
	radarChart.radarType = radarType.selectedIndex;
	radarChart.draw();
});



