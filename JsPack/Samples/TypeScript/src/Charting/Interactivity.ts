import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;
var Components = Charting.Components;

let barChartEl = <HTMLCanvasElement>document.getElementById('barChart');
barChartEl.width = barChartEl.offsetParent.clientWidth;
barChartEl.height = barChartEl.offsetParent.clientHeight;

// create the BarChart
let barChart = new Controls.BarChart(barChartEl);
barChart.series = getSeriesCollection();

barChart.allowZoom = true;
barChart.allowPan = true;
barChart.allowMoveLegend = true;

barChart.xAxis.title = "";
barChart.xAxis.minValue = 0;
barChart.xAxis.maxValue = 3;
barChart.yAxis.title = "";
barChart.yAxis.minValue = 0;
barChart.yAxis.maxValue = 100;

barChart.innerLabelRotation = -90;

barChart.showLegend = true;
barChart.legendHorizontalAlignment = Components.LayoutAlignment.Near;
barChart.legendVerticalAlignment = Components.LayoutAlignment.Near;

barChart.theme = new Charting.Theme();
barChart.theme.commonSeriesFills = getBarFills();
barChart.theme.commonSeriesStrokes = getBarFills();
barChart.theme.legendBackground = new Drawing.Brush("#e0e9e9");
barChart.theme.legendBorderStroke = new Drawing.Brush("#c0c0c0");
barChart.theme.highlightStroke = new Drawing.Brush("#c0c0c0");
barChart.theme.dataLabelsFontSize = barChart.theme.axisLabelsFontSize = 12;
barChart.theme.axisTitleFontSize = barChart.theme.legendTitleFontSize = 14;
barChart.gridType = Charting.GridType.Horizontal;
barChart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
barChart.theme.gridColor2 = Drawing.Color.fromArgb(192, 192, 192);
barChart.theme.gridLineColor = Drawing.Color.fromArgb(192, 192, 192);

// create the PieChart
let pieChartEl = <HTMLCanvasElement>document.getElementById('pieChart');
pieChartEl.width = pieChartEl.offsetParent.clientWidth * 0.8;
pieChartEl.height = pieChartEl.offsetParent.clientHeight * 0.8;
let pieChart = new Controls.PieChart(pieChartEl);

pieChart.series = new Charting.PieSeries(
				new Collections.List<number>([20, 60, 40, 55]),
				new Collections.List<string>(["January", "February", "March", "April"]),
				new Collections.List<string>(["January", "February", "March", "April"]));
pieChart.series.title = "Pie Series";

pieChart.allowZoom = true;
pieChart.allowRotate = true;

pieChart.showLegend = false;
pieChart.showDataLabels = Charting.LabelKinds.OuterLabel;

pieChart.theme = new Charting.Theme();
pieChart.theme.seriesFills = getPieFills();
pieChart.theme.uniformSeriesStroke = new Drawing.Brush("#c0c0c0");
pieChart.theme.seriesStrokeThicknesses = new Collections.List<Collections.List<number>>([new Collections.List<number>([15])]);
pieChart.theme.highlightStroke = new Drawing.Brush("white");
pieChart.theme.highlightStrokeThickness = 10;
pieChart.theme.dataLabelsFontSize = 14;


function getSeriesCollection(): Collections.ObservableCollection<Charting.Series> 
{
	let collection = new Collections.ObservableCollection<Charting.Series>();
	for (let i = 0; i < 3; i++)
	{
		if (i == 0) {
			let series1 = new Charting.Series2D(new Collections.List<number>([0, 1, 2, 3]),
				new Collections.List<number>([20, 60, 40, 55]),
				new Collections.List<string>(["January", "February", "March", "April"]));
			series1.title = "Series 1";
			collection.add(series1);
		}
		if (i == 1) {
			let series2 = new Charting.Series2D(new Collections.List<number>([0, 1, 2, 3]),
				new Collections.List<number>([30, 70, 65, 19]),
				new Collections.List<string>([ "May", "June", "July", "August" ]));
			series2.title = "Series 2";
			collection.add(series2);
		}
		if (i == 2) {
			let series3 = new Charting.Series2D(new Collections.List<number>([0, 1, 2, 3]),
				new Collections.List<number>([22, 44, 33, 66]),
				new Collections.List<string>(["September", "October", "November", "December"]));
			series3.title = "Series 3";
			collection.add(series3);
		}
		collection.item(i).supportedLabels = Charting.LabelKinds.InnerLabel;
	}
	return collection;
}

function getBarFills(): Collections.List<Drawing.Brush>
{
	var fills = new Collections.List<Drawing.Brush>();

    fills.add(new Drawing.Brush("#669acc"));
    fills.add(new Drawing.Brush("#616a7f"));
    fills.add(new Drawing.Brush("#5a79a5"));

	return fills;
}

function getPieFills(): Collections.List<Collections.List<Drawing.Brush>>
{
	var fills = new Collections.List<Collections.List<Drawing.Brush>>();

	fills.add(new Collections.List<Drawing.Brush>([
        new Drawing.Brush("#2d3956"),
        new Drawing.Brush("#669acc"),
        new Drawing.Brush("#ce0000"),
        new Drawing.Brush("#9caac6"),
	]));

	return fills;
}

// handlers
let chart = document.getElementById('chart') as HTMLSelectElement;
chart.onchange = () => {
	let bardiv = document.getElementById('bar') as HTMLDivElement;
	let piediv = document.getElementById('pie') as HTMLDivElement;

	piediv.style.visibility = "visible";
	if (chart.selectedIndex == 0)
	{
		bardiv.style.display = "block";
		piediv.style.display = "none";
	}
	else if (chart.selectedIndex == 1) {
		bardiv.style.display = "none";
		piediv.style.display = "block";
	}
};

window.onload = () => {
	let chart = document.getElementById('chart') as HTMLSelectElement;
	chart.onchange(null);
}