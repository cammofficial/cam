import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;

let chartEl = <HTMLCanvasElement>document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;

let chart = new Controls.BarChart(chartEl, Charting.BarLayout.SideBySide);
chart.titleMargin = new Charting.Margins(0, 0, 0, 0);
chart.barSpacingRatio = 2;
chart.legendMargin = new Charting.Margins(80, 10, 10, 10);
chart.legendTitle = "Legend"
chart.showLegend = true;
chart.subtitleMargin = new Charting.Margins(0, 0, 0, 0);

// create bar brushes
let thirdBrush = new Drawing.Brush("#ce0000");
let secondBrush = new Drawing.LinearGradientBrush("#003466", "#000063");
let firstBrush = new Drawing.LinearGradientBrush("#c0c9c9", "#669acc");

const labels = new Collections.List<string>([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]);

var angle: number = 1;

// create sample data series
let series = new Collections.ObservableCollection<Charting.Series>(
	new Array<Charting.BarSeries>(
		new Charting.BarSeries(new Collections.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), labels),
		new Charting.BarSeries(new Collections.List<number>([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]), labels),
		new Charting.BarSeries(new Collections.List<number>([2, 8, 13, 15, 13, 8, 2, 8, 13, 15, 13, 8]), labels)
	));
series.item(0).title = "2018";
series.item(0).supportedLabels = Charting.LabelKinds.InnerLabel | Charting.LabelKinds.XAxisLabel;
series.item(1).title = "2019";
series.item(1).supportedLabels = Charting.LabelKinds.InnerLabel;
series.item(2).title = "2020";
series.item(2).supportedLabels = Charting.LabelKinds.InnerLabel;
chart.xAxis.title = "Profit (in mlns)";
chart.yAxis.title = "Turnover (in mlns)";

chart.series = series;

chart.xAxis.interval = 1;
chart.innerLabelRotation = -90;

// assign one brush per series
chart.plot.seriesStyle = new Charting.PerSeriesStyle(new Collections.List<Drawing.Brush>([firstBrush, secondBrush, thirdBrush]), null, new Collections.List<number>([1]));
chart.theme.legendBackground = new Drawing.Brush("#505959");
chart.theme.legendBorderStroke = new Drawing.Brush("#000000");
chart.theme.dataLabelsBrush = chart.theme.legendTitleBrush = new Drawing.Brush("#e0e9e9");
chart.theme.dataLabelsFontSize = chart.theme.axisLabelsFontSize = 12;
chart.theme.axisTitleFontSize = chart.theme.legendTitleFontSize = 14;
chart.theme.axisTitleFontName = "Verdana";
chart.theme.axisLabelsFontName = "Verdana";
chart.theme.dataLabelsFontName = "Verdana";
chart.legendTitle = "Year";
chart.theme.gridColor1 = chart.theme.gridColor2 = new Drawing.Color("#ffffff");
chart.draw();

// handlers

(document.getElementById('chbHorizontalBars') as HTMLInputElement).onchange = () =>
{
	chart.horizontalBars = !chart.horizontalBars;
	firstBrush.angle += (angle * 90);
	secondBrush.angle += (angle * 90);
	chart.innerLabelRotation += (angle * 90);
	angle *= -1;

}

let chbShowDataLabels = document.getElementById('chbShowDataLabels') as HTMLInputElement;
chbShowDataLabels.onchange = () =>
{
	chart.showDataLabels = chbShowDataLabels.checked ? Charting.LabelKinds.All : Charting.LabelKinds.None;
	chart.invalidate();
}

(document.getElementById('chbShowXTicks') as HTMLInputElement).onchange = () =>
{
	chart.showXTicks = !chart.showXTicks;
}

(document.getElementById('chbShowYTicks') as HTMLInputElement).onchange = () =>
{
	chart.showYTicks = !chart.showYTicks;
}

(document.getElementById('chbShowXCoords') as HTMLInputElement).onchange = () =>
{
	chart.showXCoordinates = !chart.showXCoordinates;
}

(document.getElementById('chbShowYCoords') as HTMLInputElement).onchange = () =>
{
	chart.showYCoordinates = !chart.showYCoordinates;
}

(document.getElementById('chbShowZoomWidgets') as HTMLInputElement).onchange = () =>
{
	chart.showZoomWidgets = !chart.showZoomWidgets;
}

let cbxBarLayout = document.getElementById('cbxBarLayout') as HTMLSelectElement;
cbxBarLayout.onchange = () =>
{
	chart.barLayout = cbxBarLayout.selectedIndex;
}

let tbRatio = document.getElementById('tbRatio') as HTMLInputElement;
tbRatio.onchange = () =>
{
	chart.barSpacingRatio = parseInt(tbRatio.value);
}

let cbxGridType = document.getElementById('cbxGridType') as HTMLSelectElement;
cbxGridType.onchange = () =>
{
	chart.gridType = cbxGridType.selectedIndex;
}

let tbAxisOrigin = document.getElementById('tbAxisOrigin') as HTMLInputElement;
tbAxisOrigin.onchange = () =>
{
	chart.yAxis.origin = parseInt(tbAxisOrigin.value);
}	

let tbXAxisMax = document.getElementById('tbXAxisMax') as HTMLInputElement;
let tbXAxisMin = document.getElementById('tbXAxisMin') as HTMLInputElement;
tbXAxisMax.onchange = () =>
{
	chart.xAxis.maxValue = Math.max(parseInt(tbXAxisMin.value) + 1, parseInt(tbXAxisMax.value));
}
tbXAxisMin.onchange = () =>
{
	chart.xAxis.minValue = Math.min(parseInt(tbXAxisMin.value), parseInt(tbXAxisMax.value) - 1);
}

let tbYAxisMax = document.getElementById('tbYAxisMax') as HTMLInputElement;
let tbYAxisMin = document.getElementById('tbYAxisMin') as HTMLInputElement;
tbYAxisMax.onchange = () =>
{
	chart.yAxis.maxValue = Math.max(parseInt(tbYAxisMin.value) + 1, parseInt(tbYAxisMax.value));
}
tbYAxisMin.onchange = () =>
{
	chart.yAxis.minValue = Math.min(parseInt(tbYAxisMin.value), parseInt(tbYAxisMax.value) - 1);
}

(document.getElementById('chbShowLegend') as HTMLInputElement).onchange = () =>
{
	chart.showLegend = !chart.showLegend;
}
