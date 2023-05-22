import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;


// create the chart
let radarChartEl = <HTMLCanvasElement>document.getElementById('radarChart');
radarChartEl.width = radarChartEl.offsetParent.clientWidth;
radarChartEl.height = radarChartEl.offsetParent.clientHeight;
let radarChart = new Controls.RadarChart(radarChartEl);

// create sample data
let data = new Collections.ObservableCollection<Charting.Series>();
let series1 = new Charting.SimpleSeries(
	new Collections.List<number>([20, 30, 43, 40, 44, 37, 35, 51]),
	new Collections.List<string>(["20", "30", "43", "40", "44", "37", "35", "51"]));
let series2 = new Charting.SimpleSeries(
	new Collections.List<number>([12, 40, 23, 30, 34, 47, 45, 21]),
	new Collections.List<string>(["12", "40", "23", "30", "34", "47", "45", "21"]));

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

for (let i = 0; i < 8; i++) {
	let axis = new Charting.Axis();
	axis.title = "Axis " + (i + 1).toString();
	radarChart.axes.add(axis);
}

// specify one color per series
radarChart.plot.seriesStyle = new Charting.PerSeriesStyle(
	new Collections.List<Drawing.Brush>(
		[
            new Drawing.Brush("#ce0000"),
            new Drawing.Brush("#2d3956")
		]),
	new Collections.List<Drawing.Brush>(
		[
            new Drawing.Brush("#ce0000"),
            new Drawing.Brush("#2d3956")
        ]),
    new Collections.List<number>(
        [
            4
        ]));

radarChart.theme.highlightStroke = new Drawing.Brush("#9caac6");
radarChart.theme.dataLabelsFontSize = 12;
radarChart.theme.legendTitleFontSize = radarChart.theme.axisTitleFontSize = 14;

radarChart.draw();

// handlers
let gridDivisions = document.getElementById('gridDivisions') as HTMLInputElement;
gridDivisions.valueAsNumber = radarChart.gridDivisions;
gridDivisions.onchange = () => {
	radarChart.gridDivisions = gridDivisions.valueAsNumber;
	radarChart.draw();
};

let axisMinValue = document.getElementById('axisMinValue') as HTMLInputElement;
axisMinValue.valueAsNumber = radarChart.defaultAxis.minValue;
axisMinValue.onchange = () => {
	radarChart.defaultAxis.minValue = axisMinValue.valueAsNumber;
	radarChart.draw();
};

let axisMaxValue = document.getElementById('axisMaxValue') as HTMLInputElement;
axisMaxValue.valueAsNumber = radarChart.defaultAxis.maxValue;
axisMaxValue.onchange = () => {
	radarChart.defaultAxis.maxValue = axisMaxValue.valueAsNumber;
	radarChart.draw();
};

let areaOpacity = document.getElementById('areaOpacity') as HTMLInputElement;
areaOpacity.valueAsNumber = radarChart.areaOpacity * 10;
areaOpacity.onchange = () => {
	radarChart.areaOpacity = areaOpacity.valueAsNumber / 10;
	radarChart.draw();
};

let chartPadding = document.getElementById('chartPadding') as HTMLInputElement;
chartPadding.valueAsNumber = radarChart.chartPadding;
chartPadding.onchange = () => {
	radarChart.chartPadding = chartPadding.valueAsNumber;
	radarChart.draw();
};

let startAngle = document.getElementById('startAngle') as HTMLInputElement;
startAngle.valueAsNumber = radarChart.startAngle;
startAngle.onchange = () => {
	radarChart.startAngle = startAngle.valueAsNumber;
	radarChart.draw();
};

let alignAxis = document.getElementById('alignAxis') as HTMLInputElement;
alignAxis.checked = radarChart.alignToAxis;
alignAxis.onchange = () => {
	radarChart.alignToAxis = alignAxis.checked;
	radarChart.draw();
};

let allowRotate = document.getElementById('allowRotate') as HTMLInputElement;
allowRotate.checked = radarChart.allowRotate;
allowRotate.onchange = () => {
	radarChart.allowRotate = allowRotate.checked;
	radarChart.draw();
};

let showDataLabels = document.getElementById('showDataLabels') as HTMLInputElement;
showDataLabels.checked = radarChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.onchange = () => {
	if (showDataLabels.checked)
		radarChart.showDataLabels = Charting.LabelKinds.All;
	else
		radarChart.showDataLabels = Charting.LabelKinds.None;
	radarChart.draw();
};

let gridType = document.getElementById('gridType') as HTMLSelectElement;
gridType.selectedIndex = radarChart.gridType;
gridType.onchange = () => {
	radarChart.gridType = gridType.selectedIndex;
	radarChart.draw();
};

let radarType = document.getElementById('radarType') as HTMLSelectElement;
radarType.selectedIndex = radarChart.radarType;
radarType.onchange = () => {
	radarChart.radarType = radarType.selectedIndex;
	radarChart.draw();
};



