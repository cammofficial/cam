import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;

let chartEl = <HTMLCanvasElement>document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
let chart = new Controls.BubbleChart(chartEl);

// bubble chart requires three dimensional data;
// two dimensions for position and one for size
let series3D1 = new Charting.PointSeries3D(
	new Collections.List<Charting.Point3D>
		([
			new Charting.Point3D(0.32, 81, 9.5 * 10),
			new Charting.Point3D(0.39, 66, 7.8 * 10),
			new Charting.Point3D(0.75, 65, 7.6 * 10),
			new Charting.Point3D(0.49, 60, 7.1 * 10)
		]),
	new Collections.List<string>(["Germany", "France", "UK", "Italy"]));
series3D1.title = ">50 000 000";

let series3D2 = new Charting.PointSeries3D(
	new Collections.List<Charting.Point3D>
		([
			new Charting.Point3D(-0.28, 46, 5.4 * 10),
			new Charting.Point3D(-0.32, 42, 5 * 10),
			new Charting.Point3D(0.05, 38, 4.5 * 10),
			new Charting.Point3D(-0.4, 19, 2.3 * 10)
		]),
	new Collections.List<string>(["Spain", "Ukraine", "Poland", "Romania"]));
series3D2.title = "<50 000 000";

let data = new Collections.ObservableCollection<Charting.Series>();
data.add(series3D1);
data.add(series3D2);

chart.series = data;

// axis titles and ranges
chart.xAxis.title = "Average relative annual growth (%)";
chart.xAxis.minValue = -1;
chart.xAxis.maxValue = 1;
chart.yAxis.title = "July 1, 2015 projection";
chart.yAxis.minValue = 0;
chart.yAxis.maxValue = 100;

// background appearance
chart.showZoomWidgets = true;
chart.gridType = Charting.GridType.Vertical;
chart.backColor = new Drawing.Color("#2d3956");
chart.theme.gridColor1 = Drawing.Color.fromArgb(0.4, 45, 57, 86);
chart.theme.gridColor2 = Drawing.Color.fromArgb(1, 97, 106, 127);
chart.theme.legendBackground = new Drawing.Brush("#2d3956");
chart.theme.dataLabelsFontSize = chart.theme.axisLabelsFontSize = 12;
chart.theme.axisTitleFontSize = chart.theme.legendTitleFontSize = 14;
chart.chartPanel.margin = new Charting.Margins(5, 0, 0, 5);


// series colors
chart.theme.commonSeriesFills = new Collections.List<Drawing.Brush>
	([
    new Drawing.LinearGradientBrush("Transparent", "#ce0000"),
    new Drawing.LinearGradientBrush("Transparent", "#e0e9e9")
	]);
let light = new Drawing.Brush("#e0e9e9");
chart.theme.uniformSeriesStroke = chart.theme.highlightStroke =
	chart.theme.dataLabelsBrush = chart.theme.legendTitleBrush =
	chart.theme.legendBorderStroke = chart.theme.axisLabelsBrush =
	chart.theme.axisTitleBrush = chart.theme.axisStroke = light;

chart.theme.highlightStrokeDashStyle = Drawing.DashStyle.Dot;
chart.draw();

(document.getElementById('chbShowScatter') as HTMLInputElement).onchange = () =>
{
	chart.showScatter = !chart.showScatter;
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

let cbGridType = document.getElementById('cbGridType') as HTMLSelectElement;
cbGridType.onchange = () =>
{
	chart.gridType = cbGridType.selectedIndex;
};

(document.getElementById('chbPinGrid') as HTMLInputElement).onchange = () =>
{
	chart.pinGrid = !chart.pinGrid;
}

(document.getElementById('chbAllowPan') as HTMLInputElement).onchange = () =>
{
	chart.allowPan = !chart.allowPan;
}

(document.getElementById('chbAllowMoveLegend') as HTMLInputElement).onchange = () =>
{
	chart.allowMoveLegend = !chart.allowMoveLegend;
}

let cbLegendHorAlign = document.getElementById('cbLegendHorAlign') as HTMLSelectElement;
cbLegendHorAlign.onchange = () =>
{
	chart.legendHorizontalAlignment = cbLegendHorAlign.selectedIndex;
};

let cbLegendVerAlign = document.getElementById('cbLegendVerAlign') as HTMLSelectElement;
cbLegendVerAlign.onchange = () =>
{
	chart.legendVerticalAlignment = cbLegendVerAlign.selectedIndex;
};

let tbLegendMarginLeft = document.getElementById('tbLegendMarginLeft') as HTMLInputElement;
tbLegendMarginLeft.onchange = () =>
{
	let margin = chart.legendMargin;
	margin.left = parseInt(tbLegendMarginLeft.value);
	chart.legendMargin = margin;
	chart.invalidateLayout(chart.rootPanel);
	chart.draw();
}
let tbLegendMarginTop = document.getElementById('tbLegendMarginTop') as HTMLInputElement;
tbLegendMarginTop.onchange = () =>
{
	let margin = chart.legendMargin;
	margin.top = parseInt(tbLegendMarginTop.value);
	chart.legendMargin = margin;
	chart.invalidateLayout(chart.rootPanel);
	chart.draw();
}

(document.getElementById('chbShowLegend') as HTMLInputElement).onchange = () =>
{
	chart.showLegend = !chart.showLegend;
}
