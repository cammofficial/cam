import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';

var Controls = Charting.Controls;

// create the chart
let pieChartEl = <HTMLCanvasElement>document.getElementById('pieChart');
pieChartEl.width = pieChartEl.offsetParent.clientWidth * 0.9;
pieChartEl.height = pieChartEl.offsetParent.clientHeight * 0.9;
let pieChart = new Controls.PieChart(pieChartEl);
pieChart.startAngle = 45;
pieChart.showLegend = false; 

// create sample data
let values = new Collections.List<number>([20.00, 30.00, 10.00, 40.00]);
pieChart.series = new Charting.PieSeries(
				values,
				new Collections.List<string>(["20", "30", "10", "40"]),
				new Collections.List<string>(["2015", "2016", "2017", "2018"]));

let brushes = new Collections.List<Drawing.Brush>(
	[
        new Drawing.Brush("#9caac6"),
        new Drawing.Brush("#003466"),
        new Drawing.Brush("#ce0000"),
        new Drawing.Brush("#e0e9e9")
	]);

let seriesBrushes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesBrushes.add(brushes);

let strokes = new Collections.List<Drawing.Brush>(
    [
        new Drawing.Brush("#c0c0c0")
    ]);

let seriesStrokes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesStrokes.add(strokes);

pieChart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes, seriesStrokes);
pieChart.theme.highlightStroke = new Drawing.Brush("#000063");
pieChart.theme.dataLabelsFontSize = 16;




pieChart.draw();

// handlers
let chartPadding = document.getElementById('chartPadding') as HTMLInputElement;
chartPadding.valueAsNumber = pieChart.chartPadding;
chartPadding.onchange = () => {
	pieChart.chartPadding = chartPadding.valueAsNumber;
	pieChart.draw();
};

let slice0 = document.getElementById('slice0') as HTMLInputElement;
slice0.checked = pieChart.detachedSlices.contains(+slice0.value);
slice0.onchange = () => sliceChanged(slice0);

let slice1 = document.getElementById('slice1') as HTMLInputElement;
slice1.checked = pieChart.detachedSlices.contains(+slice1.value);
slice1.onchange = () =>  sliceChanged(slice1);

let slice2 = document.getElementById('slice2') as HTMLInputElement;
slice2.checked = pieChart.detachedSlices.contains(+slice2.value);
slice2.onchange = () => sliceChanged(slice2);

let slice3 = document.getElementById('slice3') as HTMLInputElement;
slice3.checked = pieChart.detachedSlices.contains(+slice3.value);
slice3.onchange = () => sliceChanged(slice3);

function sliceChanged(control: HTMLInputElement) {
	let slices = pieChart.detachedSlices;
	if (control.checked) {
		if (!slices.contains(+control.value))
			slices.add(+control.value);
	}
	if (!control.checked) {
		slices.remove(+control.value);
	}
	pieChart.detachedSlices = slices;
	pieChart.draw();
}

let startAngle = document.getElementById('startAngle') as HTMLInputElement;
startAngle.valueAsNumber = pieChart.startAngle;
startAngle.onchange = () => {
	pieChart.startAngle = startAngle.valueAsNumber;
	pieChart.draw();
};

let doughnut = document.getElementById('doughnut') as HTMLInputElement;
doughnut.checked = pieChart.doughnut;
doughnut.onchange = () => {
	pieChart.doughnut = doughnut.checked;
	pieChart.draw();
};

let allowRotate = document.getElementById('allowRotate') as HTMLInputElement;
allowRotate.checked = pieChart.allowRotate;
allowRotate.onchange = () => {
	pieChart.allowRotate = allowRotate.checked;
	pieChart.draw();
};

let showDataLabels = document.getElementById('showDataLabels') as HTMLInputElement;
showDataLabels.checked = pieChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.onchange = () => {
	if (showDataLabels.checked)
		pieChart.showDataLabels = Charting.LabelKinds.All;
	else
		pieChart.showDataLabels = Charting.LabelKinds.None;
	pieChart.draw();
};



