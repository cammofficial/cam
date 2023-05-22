import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';

var Controls = Charting.Controls;

let chartEl = <HTMLCanvasElement>document.getElementById('lineChart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
// create the chart
let lineChart = new Controls.LineChart(chartEl);

// create line brushes
let firstBrush = new Drawing.Brush("#669acc");
let secondBrush = new Drawing.Brush("#ce0000");
let thirdBrush = new Drawing.Brush("#003466");

lineChart.legendRenderer.background = new Drawing.Brush("#e0e9e9");
lineChart.legendRenderer.borderStroke = new Drawing.Brush("#c0c0c0");

lineChart.showZoomWidgets = true;
// create sample data series
let labels = new Collections.List<string>([
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]);

let series1 = new Charting.Series2D(
    new Collections.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    new Collections.List<number>([0, 17, 22, 13, 4, 15, 26, 7, 28, 29, 10, 19]),
	labels
);
series1.title = "Series 1";
lineChart.series.add(series1);
				
let series2 = new Charting.Series2D(
	new Collections.List < number > ([ 0,1,2,3,4,5,6,7,8,9,10,11 ]),
new Collections.List<number>([ 2,3,7,6,9,11,13,10,14,18,21,24 ]),
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
let style = new Charting.MixedSeriesStyle();
style.commonFills = new Collections.List<Drawing.Brush>([firstBrush, secondBrush, thirdBrush]);
style.commonStrokes = new Collections.List<Drawing.Brush>([firstBrush, secondBrush, thirdBrush]);
style.uniformStrokeThickness = 5;
lineChart.plot.seriesStyle = style;

lineChart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
lineChart.theme.gridColor2 = Drawing.Color.fromArgb(224, 233, 233);
lineChart.theme.dataLabelsFontSize = lineChart.theme.axisLabelsFontSize = 12;
lineChart.theme.axisTitleFontSize = lineChart.theme.legendTitleFontSize = 14;
lineChart.theme.gridLineThickness = 0;

lineChart.draw();

// handlers
let gridType = document.getElementById('gridType') as HTMLSelectElement;
gridType.selectedIndex = lineChart.gridType;
gridType.onchange = () => {
	lineChart.gridType = gridType.selectedIndex;
	lineChart.draw();
};

let lineType = document.getElementById('lineType') as HTMLSelectElement;
lineType.selectedIndex = lineChart.lineType;
lineType.onchange = () => {
	lineChart.lineType = lineType.selectedIndex;
	lineChart.draw();
};

let xAxisMin = document.getElementById('xAxisMin') as HTMLInputElement;
xAxisMin.valueAsNumber = lineChart.xAxis.effectiveMinValue;
xAxisMin.onchange = () => {
	lineChart.xAxis.minValue = xAxisMin.valueAsNumber;
	lineChart.draw();
};

let xAxisMax = document.getElementById('xAxisMax') as HTMLInputElement;
xAxisMax.valueAsNumber = lineChart.xAxis.effectiveMaxValue;
xAxisMax.onchange = () => {
	lineChart.xAxis.maxValue = xAxisMax.valueAsNumber;
	lineChart.draw();
};

let yAxisMin = document.getElementById('yAxisMin') as HTMLInputElement;
yAxisMin.valueAsNumber = lineChart.yAxis.effectiveMinValue;
yAxisMin.onchange = () => {
	lineChart.yAxis.minValue = yAxisMin.valueAsNumber;
	lineChart.draw();
};

let yAxisMax = document.getElementById('yAxisMax') as HTMLInputElement;
yAxisMax.valueAsNumber = lineChart.yAxis.effectiveMaxValue;
yAxisMax.onchange = () => {
	lineChart.yAxis.maxValue = yAxisMax.valueAsNumber;
	lineChart.draw();
};

let xRangeMin = document.getElementById('xRangeMin') as HTMLInputElement;
xRangeMin.valueAsNumber = lineChart.xScrollRangeMin;
xRangeMin.onchange = () =>
{
	lineChart.xScrollRangeMin = xRangeMin.valueAsNumber;
	lineChart.draw();
};

let xRangeMax = document.getElementById('xRangeMax') as HTMLInputElement;
xRangeMax.valueAsNumber = lineChart.xScrollRangeMax;
xRangeMax.onchange = () =>
{
	lineChart.xScrollRangeMax = xRangeMax.valueAsNumber;
	lineChart.draw();
};

let yRangeMin = document.getElementById('yRangeMin') as HTMLInputElement;
yRangeMin.valueAsNumber = lineChart.yScrollRangeMin;
yRangeMin.onchange = () =>
{
	lineChart.yScrollRangeMin = yRangeMin.valueAsNumber;
	lineChart.draw();
};

let yRangeMax = document.getElementById('yRangeMax') as HTMLInputElement;
yRangeMax.valueAsNumber = lineChart.yScrollRangeMax;
yRangeMax.onchange = () =>
{
	lineChart.yScrollRangeMax = yRangeMax.valueAsNumber;
	lineChart.draw();
};

let showXticks = document.getElementById('showXticks') as HTMLInputElement;
showXticks.checked = lineChart.showXTicks;
showXticks.onchange = () => {
	lineChart.showXTicks = showXticks.checked;
	lineChart.draw();
};

let showYticks = document.getElementById('showYticks') as HTMLInputElement;
showYticks.checked = lineChart.showYTicks;
showYticks.onchange = () => {
	lineChart.showYTicks = showYticks.checked;
	lineChart.draw();
};

let showXCoords = document.getElementById('showXCoords') as HTMLInputElement;
showXCoords.checked = lineChart.showXCoordinates;
showXCoords.onchange = () => {
	lineChart.showXCoordinates = showXCoords.checked;
	lineChart.draw();
};

let showYCoords = document.getElementById('showYCoords') as HTMLInputElement;
showYCoords.checked = lineChart.showYCoordinates;
showYCoords.onchange = () => {
	lineChart.showYCoordinates = showYCoords.checked;
	lineChart.draw();
};

let showXRange = document.getElementById('showXRange') as HTMLInputElement;
showXRange.checked = lineChart.showXRangeSelector;
showXRange.onchange = () =>
{
	lineChart.showXRangeSelector = showXRange.checked;
	lineChart.draw();
};

let showYRange = document.getElementById('showYRange') as HTMLInputElement;
showYRange.checked = lineChart.showYRangeSelector;
showYRange.onchange = () =>
{
	lineChart.showYRangeSelector = showYRange.checked;
	lineChart.draw();
};

let showLegend = document.getElementById('showLegend') as HTMLInputElement;
showLegend.checked = lineChart.showLegend;
showLegend.onchange = () => {
	lineChart.showLegend = showLegend.checked;
	lineChart.draw();
};

let scrollGrid = document.getElementById('scrollGrid') as HTMLInputElement;
scrollGrid.checked = lineChart.pinGrid;
scrollGrid.onchange = () => {
	lineChart.pinGrid = scrollGrid.checked;
	lineChart.draw();
};

let showDataLabels = document.getElementById('showDataLabels') as HTMLInputElement;
showDataLabels.checked = lineChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.onchange = () => {
	if (showDataLabels.checked)
		lineChart.showDataLabels = Charting.LabelKinds.All;
	else
		lineChart.showDataLabels = Charting.LabelKinds.None;
	lineChart.draw();
};



