/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var data =
{
	"2015": [10, 12, 9, 9, 8, 10, 13, 13, 14, 15, 14, 16],
	"2016": [14, 12, 10, 9, 11, 10, 12, 14, 14, 14, 16, 17],
	"2017": [16, 13, 11, 10, 12, 12, 10, 11, 12, 13, 16, 16],
	"2018": [12, 12, 13, 9, 7, 6, 6, 7, 7, 9, 10, 12]
};

var totals = {};
for (var i in data)
{ 
	totals[i] = data[i].reduce((partial_sum, a) => partial_sum + a);
}


// create the chart
var pieChartEl = document.getElementById('pieChart');
pieChartEl.width = pieChartEl.offsetParent.clientWidth * 0.9;
pieChartEl.height = pieChartEl.offsetParent.clientHeight * 0.9;
var pieChart = new Controls.PieChart(pieChartEl);
pieChart.startAngle = 45;
pieChart.showLegend = false;

// create sample data
var values = new Collections.List([20.00, 30.00, 10.00, 40.00]);
pieChart.series = new Charting.PieSeries(
				values,
				new Collections.List(["20", "30", "10", "40"]),
				new Collections.List(["2015", "2016", "2017", "2018"]));

var brushes = new Collections.List(
	[
        new Drawing.Brush("#9caac6"),
        new Drawing.Brush("#003466"),
        new Drawing.Brush("#ce0000"),
        new Drawing.Brush("#e0e9e9")
	]);

var seriesBrushes = new Collections.List();
seriesBrushes.add(brushes);

var strokes = new Collections.List(
    [
        new Drawing.Brush("#c0c0c0")
    ]);

var seriesStrokes = new Collections.List();
seriesStrokes.add(strokes);

pieChart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes, seriesStrokes);
pieChart.theme.highlightStroke = new Drawing.Brush("#000063");
pieChart.theme.dataLabelsFontSize = 16;

pieChart.draw();

// handlers
var chartPadding = document.getElementById('chartPadding');
chartPadding.valueAsNumber = pieChart.chartPadding;
chartPadding.addEventListener("change", function ()
{
	pieChart.chartPadding = chartPadding.valueAsNumber;
	pieChart.draw();
});

var slice0 = document.getElementById('slice0');
slice0.checked = pieChart.detachedSlices.contains(+slice0.value);
slice0.addEventListener("change", function () { sliceChanged(slice0); });

var slice1 = document.getElementById('slice1');
slice1.checked = pieChart.detachedSlices.contains(+slice1.value);
slice1.addEventListener("change", function () { sliceChanged(slice1); });

var slice2 = document.getElementById('slice2');
slice2.checked = pieChart.detachedSlices.contains(+slice2.value);
slice2.addEventListener("change", function () { sliceChanged(slice2); });

var slice3 = document.getElementById('slice3');
slice3.checked = pieChart.detachedSlices.contains(+slice3.value);
slice3.addEventListener("change", function () { sliceChanged(slice3); });

function sliceChanged(control)
{
	var slices = pieChart.detachedSlices;
	if (control.checked)
	{
		if (!slices.contains(+control.value))
			slices.add(+control.value);
	}
	if (!control.checked)
	{
		slices.remove(+control.value);
	}
	pieChart.detachedSlices = slices;
	pieChart.draw();
}

var startAngle = document.getElementById('startAngle');
startAngle.valueAsNumber = pieChart.startAngle;
startAngle.addEventListener("change", function ()
{
	pieChart.startAngle = startAngle.valueAsNumber;
	pieChart.draw();
});

var doughnut = document.getElementById('doughnut');
doughnut.checked = pieChart.doughnut;
doughnut.addEventListener("change", function ()
{
	pieChart.doughnut = doughnut.checked;
	pieChart.draw();
});

var allowRotate = document.getElementById('allowRotate');
allowRotate.checked = pieChart.allowRotate;
allowRotate.addEventListener("change", function ()
{
	pieChart.allowRotate = allowRotate.checked;
	pieChart.draw();
});

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = pieChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function ()
{
	if (showDataLabels.checked)
		pieChart.showDataLabels = Charting.LabelKinds.All;
	else
		pieChart.showDataLabels = Charting.LabelKinds.None;
	pieChart.draw();
});



