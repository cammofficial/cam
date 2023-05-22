import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';

var Controls = Charting.Controls;

let chartEl = <HTMLCanvasElement>document.getElementById('chart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
let chart = new Controls.AreaChart(chartEl);

// create sample data
let data = new Collections.ObservableCollection<Charting.Series>();

let years = new Collections.List<Date>();
let dt = new Date(new Date().getFullYear() - 10, 11, 31);
for (; ;)
{
	if (dt.getFullYear() > new Date().getFullYear())
		break;
	years.add(new Date(dt.setFullYear(dt.getFullYear() + 1)));
}

let income = new Collections.List<number>([12, 13.2, 15.6, 17.8, 39, 20, 29, 79, 101, 120, 122]);

let series = new Charting.DateTimeSeries(
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

chart.draw();
