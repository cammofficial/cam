import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


let Controls = Charting.Controls;
let Components = Charting.Components;

// create the dashboard
let dashboardEl = <HTMLCanvasElement>document.getElementById('dashboard');
dashboardEl.width = dashboardEl.offsetParent.clientWidth;
dashboardEl.height = dashboardEl.offsetParent.clientHeight;
let dashboard = new Controls.Dashboard(dashboardEl);
dashboard.theme.dataLabelsFontSize = dashboard.theme.axisLabelsFontSize = 12;
dashboard.theme.axisTitleFontSize = dashboard.theme.legendTitleFontSize = 14;

var plot = new Charting.Plot2D();
plot.gridType = Charting.GridType.Horizontal;

// sample temperature data for bar graphics
var barSeries = new Charting.Series2D(
				new Collections.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),//x
				new Collections.List<number>([-3, -7, 10, 12, 20, 29, 33, 30, 24, 15, 2, -8]),//y
				new Collections.List<string>(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]));

barSeries.title = "Temperature";
barSeries.supportedLabels = Charting.LabelKinds.XAxisLabel;

// sample pressure data for line graphics
var lineSeries = new Charting.Series2D(
				new Collections.List<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),//x
				new Collections.List<number>([100120, 101044, 101503, 103499, 102122, 100593, 95542, 102223, 103002, 102994, 102843, 101332]),//right-y
				null);
lineSeries.title = "Pressure";

// draw bars
var barRenderer = new Charting.BarRenderer(new Collections.ObservableCollection<Charting.Series>([barSeries]));
barRenderer.seriesStyle = new Charting.UniformSeriesStyle(new Drawing.Brush("#9caac6"), new Drawing.Brush("#616a7f"),2);

// draw lines
var lineRenderer = new Charting.LineRenderer(
				new Collections.ObservableCollection<Charting.Series>([lineSeries]));
lineRenderer.seriesStyle = new Charting.UniformSeriesStyle(new Drawing.Brush("#ce0000"), new Drawing.Brush("#ce0000"), 4);

// add graphics to plot
plot.seriesRenderers.add(barRenderer);
plot.seriesRenderers.add(lineRenderer);

// draw annotations
var annotations = new Charting.Series2D(
				new Collections.List < number > ([ 7 ]), //x
				new Collections.List < number > ([ 95542 ]),//right-y
				new Collections.List < string > ([ "TORNADO" ]));
var annotationRenderer = new Charting.AnnotationRenderer(new Collections.ObservableCollection<Charting.Series>([annotations]));
plot.seriesRenderers.add(annotationRenderer);

// create axes
var celsiusAxis = new Charting.Axis();
celsiusAxis.interval = 5;
celsiusAxis.minValue = -20;
celsiusAxis.maxValue = 50;
celsiusAxis.title = "Celsius";

var fahrenheitAxis = new Charting.Axis();
fahrenheitAxis.minValue = -20 * 1.8 + 32;
fahrenheitAxis.maxValue = 50 * 1.8 + 32;
fahrenheitAxis.interval = 10;
fahrenheitAxis.title = "Fahrenheit";

var kelvinAxis = new Charting.Axis();
kelvinAxis.minValue = -20 + 273.15;
kelvinAxis.maxValue = 50 + 273.15;
kelvinAxis.interval = 5;
kelvinAxis.title = "Kelvin";

var monthAxis = new Charting.Axis();
monthAxis.interval = 1;
monthAxis.minValue = 0;
monthAxis.maxValue = 12;
monthAxis.title = "Months";

var pascals = new Charting.Axis();
pascals.minValue = 90000;
pascals.maxValue = 106000;
pascals.interval = 1000;
pascals.title = "Pressure";

plot.yAxis = celsiusAxis;
plot.xAxis = monthAxis;
lineRenderer.yAxis = annotationRenderer.yAxis = pascals;

// add legend
let legendRenderer = new Charting.LegendRenderer();
legendRenderer.content = new Collections.ObservableCollection<Charting.SeriesRenderer>([barRenderer, lineRenderer]);
legendRenderer.background = new Drawing.Brush("#e0e9e9");
dashboard.rootPanel.children.add(legendRenderer);

// create dashboard layout
var xAxisRenderer = new Charting.XAxisRenderer(monthAxis);
xAxisRenderer.labelsSource = plot;

dashboard.layoutBuilder.createAndAddPlotAndAxes(
				plot, null,
				[new Charting.YAxisRenderer(celsiusAxis),
					new Charting.YAxisRenderer(fahrenheitAxis),
					new Charting.YAxisRenderer(kelvinAxis)],
				[ xAxisRenderer ],
				[new Charting.YAxisRenderer(pascals)]);

dashboard.draw();


