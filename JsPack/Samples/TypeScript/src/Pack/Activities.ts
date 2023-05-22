import * as Drawing from "@mindfusion/drawing";
import * as Collections from "@mindfusion/common-collections";
import * as Diagramming from "@mindfusion/diagramming";
import * as Charting from "@mindfusion/charting";
import * as Scheduling from "@mindfusion/scheduling";
import * as CustomForm from './CustomForm';
import * as Keyboard from "@mindfusion/keyboard";

//  create the timetable control
var calendar = new Scheduling.Calendar(<HTMLDivElement>document.getElementById("calendar"));
calendar.currentView = Scheduling.CalendarView.Timetable;
calendar.theme = "business";
calendar.useForms = false;
calendar.timetableSettings.startTime = 360;
calendar.timetableSettings.endTime = 1120;
calendar.timetableSettings.cellTime = Scheduling.TimeSpan.fromHours(1);
calendar.timetableSettings.cellSize = 120;
calendar.timetableSettings.headerStyle = Scheduling.MainHeaderStyle.Title;
calendar.timetableSettings.showDayHeader = false;
calendar.allowInplaceEdit = false;
calendar.selectionStart.addEventListener(function (sender, args) { args.cancel = true; });
calendar.element.addEventListener("mouseup", handleMouseUp);
calendar.itemModified.addEventListener(function () { drawCharts(); })
calendar.itemDoubleClick.addEventListener(handleItemClick);
calendar.render();

// create the nodeListView control
var nodeList = Diagramming.NodeListView.create(<HTMLCanvasElement>document.getElementById("nodeList"));
nodeList.iconSize = (new Drawing.Size(96, 96));

// create the pie chart
var pieChartEl = <HTMLCanvasElement>document.getElementById('pieChart');
var pieChart = new Charting.Controls.PieChart(pieChartEl);
pieChart.theme.loadFrom('../assets/DefaultExt.xml');
pieChart.startAngle = 45;
pieChart.showLegend = false;
pieChart.chartPadding = 15;
pieChart.title = "Time spent by activity";

var brushes = new Collections.List<Drawing.Brush>([
	new Drawing.Brush("#8eb848"),
	new Drawing.Brush("#193e4e"),
	new Drawing.Brush("#ffcc33")]);

var seriesBrushes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesBrushes.add(brushes);

var strokes = new Collections.List<Drawing.Brush>([
	new Drawing.Brush("#fff")
]);
var seriesStrokes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesStrokes.add(strokes);
pieChart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes, seriesStrokes);
pieChart.theme.highlightStroke = new Drawing.Brush("#d6e0f5");
pieChart.theme.dataLabelsBrush = new Drawing.Brush("#fff");
pieChart.theme.dataLabelsFontSize = 14;

// create the line chart
var chartEl = <HTMLCanvasElement>document.getElementById('lineChart');
var lineChart = new Charting.Controls.LineChart(chartEl);
lineChart.theme.loadFrom('../assets/DefaultExt.xml');
lineChart.legendHorizontalAlignment = Charting.Components.LayoutAlignment.Far;
lineChart.legendVerticalAlignment = Charting.Components.LayoutAlignment.Center;
lineChart.title = "Activity count by working hour";

lineChart.xAxis.interval = 1;
lineChart.xAxis.title = "Working hours";
lineChart.yAxis.interval = 1;
lineChart.yAxis.minValue = 0;
lineChart.yAxis.maxValue = 10;
lineChart.yAxis.title = "";

var style = new Charting.MixedSeriesStyle();
style.commonFills = brushes;
style.commonStrokes = brushes;
style.uniformStrokeThickness = 2;
lineChart.plot.seriesStyle = style;

lineChart.theme.gridColor1 = Drawing.Color.fromArgb(255, 255, 255);
lineChart.theme.gridColor2 = Drawing.Color.fromArgb(214, 224, 245);
lineChart.theme.gridLineColor = Drawing.Color.fromArgb(132, 163, 225);
lineChart.theme.dataLabelsFontSize = 14;

//  create the activities
var resource;
resource = new Scheduling.Resource();
resource.id = 0;
resource.name = "Purchase";
resource.tag = "../assets/icon_calculator.png";
calendar.schedule.resources.add(resource);

resource = new Scheduling.Resource();
resource.id = 1;
resource.name = "Delivery";
resource.tag = "../assets/icon_delivery.png";
calendar.schedule.resources.add(resource);

resource = new Scheduling.Resource();
resource.id = 2;
resource.name = "Print";
resource.tag = "../assets/icon_print.png";
calendar.schedule.resources.add(resource);

for (var i = 0; i < calendar.schedule.resources.count(); i++)
{
	resource = calendar.schedule.resources.items()[i];
	var node = new Diagramming.ShapeNode(null);
	node.transparent = (true);
	node.imageLocation = (resource.tag);
	node.tag = (i);
	nodeList.addNode(node, resource.name);
}

// create the events
var date = Scheduling.DateTime.today();

for (var i = 0; i < 5; i++)
{
	var item = new Scheduling.Item();
	item.startTime = date.clone().addHours(Math.floor(Math.random() * 10) + 6);
	item.endTime = item.startTime.clone().addHours(1);
	var activity = calendar.schedule.resources.items()[0];
	item.subject = activity.name;
	item.resources.add(activity);
	item.cssClass = "itemClass" + activity.id;
	calendar.schedule.items.add(item);
}

for (var i = 0; i < 4; i++)
{
	var item = new Scheduling.Item();
	item.startTime = date.clone().addHours(Math.floor(Math.random() * 10) + 6);
	item.endTime = item.startTime.clone().addHours(1);
	var activity = calendar.schedule.resources.items()[1];
	item.subject = activity.name;
	item.resources.add(activity);
	item.cssClass = "itemClass" + activity.id;
	calendar.schedule.items.add(item);
}

for (var i = 0; i < 3; i++)
{
	var item = new Scheduling.Item();
	item.startTime = date.clone().addHours(Math.floor(Math.random() * 10) + 6);
	item.endTime = item.startTime.clone().addHours(1);
	var activity = calendar.schedule.resources.items()[2];
	item.subject = activity.name;
	item.resources.add(activity);
	item.cssClass = "itemClass" + activity.id;
	calendar.schedule.items.add(item);
}

//// draw the charts
drawCharts();

function handleItemClick(sender, args)
{
	// create and show the custom form
	var form = new CustomForm.default(sender, args.item);
	form.showForm();
	Keyboard.VirtualKeyboard.find("keyboard").render();
}

function handleMouseUp(e)
{
	if (nodeList.draggedNode)
	{
		var activityId = nodeList.draggedNode.tag;
		var activity = calendar.schedule.resources.items()[activityId];
		var cell = calendar.getCellAt(e.clientX, e.clientY);
		if (cell)
		{
			// create a new item with the start and end time of the cell and the selected activity
			var item = new Scheduling.Item();
			item.startTime = cell.startTime;
			item.endTime = cell.endTime;
			item.subject = activity.name;
			item.resources.add(activity);
			item.cssClass = "itemClass" + activityId;
			calendar.schedule.items.add(item);

			drawCharts();
		}
	}
}

function drawCharts()
{
	// get the pie chart data
	var pTotal = 0;
	var pItems = calendar.schedule.getAllItems(calendar.startTime, calendar.endTime, calendar.schedule.resources.items()[0]).items();
	if (pItems.length > 0)
	{
		var pTimes = pItems.map(item => item.endTime.valueOf() - item.startTime.valueOf());
		pTotal = pTimes.reduce(function (acc, val) { return acc + val; });
		pTotal /= 3600000;
	}

	var dTotal = 0;
	var dItems = calendar.schedule.getAllItems(calendar.startTime, calendar.endTime, calendar.schedule.resources.items()[1]).items();
	if (dItems.length > 0)
	{
		var dTimes = dItems.map(item => item.endTime.valueOf() - item.startTime.valueOf());
		dTotal = dTimes.reduce(function (acc, val) { return acc + val; });
		dTotal /= 3600000;
	}

	var rTotal = 0;
	var rItems = calendar.schedule.getAllItems(calendar.startTime, calendar.endTime, calendar.schedule.resources.items()[2]).items();
	if (rItems.length > 0)
	{
		var rTimes = rItems.map(item => item.endTime.valueOf() - item.startTime.valueOf());
		rTotal = rTimes.reduce(function (acc, val) { return acc + val; });
		rTotal /= 3600000;
	}

	var values = new Collections.List([pTotal, dTotal, rTotal]);
	pieChart.series = new Charting.PieSeries(values, new Collections.List(["Purchases", "Deliveries", "Prints"]), null);

	pieChart.draw();


	// get the line chart data
	lineChart.series.clear();

	if (pItems.length > 0)
	{
		var xData = new Collections.List<number>();
		var yData = new Collections.List<number>();

		for (var i = 6; i < 18; i++)
		{
			var hourItems = pItems.filter(item => item.startTime.hour == i);
			xData.add(i);
			yData.add(hourItems.length);
		}

		var series1 = new Charting.Series2D(xData, yData, null);
		series1.title = "Purchases";
		lineChart.series.add(series1);
	}

	if (dItems.length > 0)
	{
		var xData = new Collections.List<number>();
		var yData = new Collections.List<number>();

		for (var i = 6; i < 18; i++)
		{
			var hourItems = dItems.filter(item => item.startTime.hour == i);
			xData.add(i);
			yData.add(hourItems.length);
		}

		var series2 = new Charting.Series2D(xData, yData, null);
		series2.title = "Deliveries";
		lineChart.series.add(series2);
	}

	if (rItems.length > 0)
	{
		var xData = new Collections.List<number>();
		var yData = new Collections.List<number>();

		for (var i = 6; i < 18; i++)
		{
			var hourItems = rItems.filter(item => item.startTime.hour == i);
			xData.add(i);
			yData.add(hourItems.length);
		}

		var series3 = new Charting.Series2D(xData, yData, null);
		series3.title = "Prints";
		lineChart.series.add(series3);
	}

	lineChart.draw();
}

