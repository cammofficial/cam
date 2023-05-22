import * as Drawing from "@mindfusion/drawing";
import * as Collections from "@mindfusion/common-collections";
import * as Charting from "@mindfusion/charting";
import * as Gauges from "@mindfusion/gauges";
import * as Scheduling from "@mindfusion/scheduling";
import * as UI from "@mindfusion/common-ui";


// create the chart
var chart = new Charting.Controls.AreaChart(<HTMLCanvasElement>document.getElementById('chart'));
chart.title = "Monthly Temperatures Report";
chart.lineType = Charting.LineType.Curve;

chart.showXCoordinates = false;
chart.showLegend = false;
chart.layoutPanel.margin = new Charting.Margins(20);
chart.xAxis.title = "";
chart.xAxis.minValue = 0;
chart.xAxis.maxValue = 1;
chart.xAxis.interval = 0.1;

chart.theme.plotBackground = new Drawing.Brush(Drawing.Color.fromArgb(242, 235, 207));
chart.theme.titleFontSize = 20;
chart.yAxis.title = "Temperature in Fahrenheit";
chart.theme.uniformSeriesFill = new Drawing.LinearGradientBrush("#ffcc33", "#46697d", 90);

// create the calendar
var calendar = new Scheduling.Calendar(<HTMLDivElement>document.getElementById("calendar"));
calendar.theme = "earth";
calendar.useForms = false;
calendar.itemSettings.showItems = false;
calendar.itemSettings.showCues = false;
calendar.selection.allowMultiple = false;
calendar.monthSettings.headerStyle = Scheduling.MainHeaderStyle.Title;
calendar.monthSettings.expandDayHeaders = true;
calendar.selectionEnd.addEventListener(handleSelectionEnd);
calendar.render();

// add some logs
var date = Scheduling.DateTime.today();

var item = new Scheduling.Item();
item.startTime = Scheduling.DateTime.fromDateParts(date.year, date.month, 1);
item.endTime = item.startTime.clone().addDays(1);
item.tag = 100;
calendar.schedule.items.add(item);

item = new Scheduling.Item();
item.startTime = Scheduling.DateTime.fromDateParts(date.year, date.month, 2);
item.endTime = item.startTime.clone().addDays(1);
item.tag = 50;
calendar.schedule.items.add(item);

item = new Scheduling.Item();
item.startTime = Scheduling.DateTime.fromDateParts(date.year, date.month, 3);
item.endTime = item.startTime.clone().addDays(1);
item.tag = 70;
calendar.schedule.items.add(item);

// repaint the chart and calendar controls to display the new data
repaintControls();

// create the input window 
var window1 = new UI.Window();
window1.theme = "earth";
window1.title = "Enter average daily temperature";
window1.allowResize = window1.allowMaximize = window1.allowMinimize = window1.allowPin = window1.allowClose = false;
window1.templateUrl = "thermometer.html";
window1.contentLoad.addEventListener(loadThermometer);
document.getElementById("content").appendChild(window1.draw());
window1.element.style.zIndex = "5";
window1.attach();
window1.close();


function handleSelectionEnd(sender, args)
{
	var items = calendar.schedule.getAllItems(args.startTime, args.endTime);

	if (items.count() > 0)
		UI.Dialogs.showInfoDialog("Information", "The temperature for this date is already recorded.",
			null, document.getElementById("calendar"), "earth");
	else
	{
		window1.open();
		window1.autoSize();
		window1.center();
		window1.data.size = ({ width: 120, height: 320 });
		window1.data.repaint();
	}
}


function loadThermometer(window)
{
	var btnOK = window.element.querySelector("#btnOK");
	btnOK.addEventListener("click", postData);

	var btnCancel = window.element.querySelector("#btnCancel");
	btnCancel.addEventListener("click", function () { window1.close(); });

	var gaugeEl = window.element.querySelector("#gauge");

	var d = Drawing;
	var LinearScale = Gauges.LinearScale;
	var Orientation = Gauges.Orientation;
	var Length = Gauges.Length;
	var LengthType = Gauges.LengthType;
	var TickShape = Gauges.TickShape;
	var Alignment = Gauges.Alignment;
	var LabelRotation = Gauges.LabelRotation;
	var Pointer = Gauges.Pointer;
	var Range = Gauges.Range;

	var gauge = Gauges.LinearGauge.create(gaugeEl, false);
	gauge.orientation = (Orientation.Vertical);
	gauge.addEventListener(Gauges.Events.prepaintBackground, onPrepaintBackground.bind(this));
	gauge.addEventListener(Gauges.Events.prepaintForeground, onPrepaintForeground.bind(this));

	var scale = new LinearScale(gauge);
	scale.orientation = (Orientation.Vertical);
	scale.fill = ("Transparent");
	scale.stroke = ("Black");
	scale.minValue = (-50);
	scale.maxValue = (60);
	scale.left = (new Length(50, LengthType.Relative));
	scale.top = (new Length(5, LengthType.Relative));
	scale.scaleLength = (new Length(80, LengthType.Relative));
	scale.startWidth = (new Length(8));
	scale.endWidth = (new Length(8));

	var majorSettings = scale.majorTickSettings;
	majorSettings.tickShape = (TickShape.Rectangle);
	majorSettings.tickWidth = (new Length(10));
	majorSettings.tickHeight = (new Length(1));
	majorSettings.tickAlignment = (Alignment.InnerInside);
	majorSettings.labelAlignment= (Alignment.InnerInside);
	majorSettings.tickOffset =(new Length(0));
	majorSettings.labelOffset= (new Length(12));
	majorSettings.labelRotation= (LabelRotation.Sideways);
	majorSettings.fontSize = (new Length(12, LengthType.Relative));
	majorSettings.numberPrecision = (0);
	majorSettings.fill = ("Transparent");
	majorSettings.stroke = ("Black");
	majorSettings.labelForeground = ("Black");
	majorSettings.count = (10);

	var middleSettings = scale.middleTickSettings;
	middleSettings.showLabels= (false);
	middleSettings.tickShape = (TickShape.Rectangle);
	middleSettings.tickWidth = (new Length(4));
	middleSettings.tickHeight = (new Length(1));
	middleSettings.tickOffset =(new Length(0));
	middleSettings.tickAlignment = (Alignment.InnerInside);
	middleSettings.fill = ("Transparent");
	middleSettings.stroke = ("Black");
	middleSettings.count = (5);

	var minorSettings = scale.minorTickSettings;
	minorSettings.showTicks = (false);

	var scale2 = new LinearScale(gauge);
	scale2.orientation = (Orientation.Vertical);
	scale2.fill = ("Transparent");
	scale2.stroke = ("Black");
	scale2.minValue = (-58);
	scale2.maxValue = (140);
	scale2.left = (new Length(50, LengthType.Relative));
	scale2.top = (new Length(5, LengthType.Relative));
	scale2.scaleLength = (new Length(80, LengthType.Relative));
	scale2.startWidth = (new Length(8));
	scale2.endWidth = (new Length(8));

	majorSettings = scale2.majorTickSettings;
	majorSettings.tickShape = (TickShape.Rectangle);
	majorSettings.tickWidth = (new Length(10));
	majorSettings.tickHeight = (new Length(1));
	majorSettings.tickAlignment = (Alignment.OuterOutside);
	majorSettings.labelAlignment= (Alignment.OuterOutside);
	majorSettings.tickOffset =(new Length(0));
	majorSettings.labelOffset= (new Length(-12));
	majorSettings.labelRotation= (LabelRotation.Sideways);
	majorSettings.fontSize = (new Length(12, LengthType.Relative));
	majorSettings.numberPrecision = (0);
	majorSettings.fill = ("Transparent");
	majorSettings.stroke = ("Black");
	majorSettings.labelForeground = ("Black");
	majorSettings.count = (10);

	middleSettings = scale2.middleTickSettings;
	middleSettings.showLabels= (false);
	middleSettings.tickShape = (TickShape.Rectangle);
	middleSettings.tickWidth = (new Length(4));
	middleSettings.tickHeight = (new Length(1));
	middleSettings.tickAlignment = (Alignment.OuterOutside);
	middleSettings.fill = ("Transparent");
	middleSettings.stroke = ("Transparent");
	middleSettings.count = (5);

	minorSettings = scale2.minorTickSettings;
	minorSettings.showTicks = (false);

	var pointer = new Pointer();
	pointer.isInteractive = (true);
	pointer.fill = ("#ce0000");
	pointer.value = (32);
	scale2.addPointer(pointer);
	gauge.addEventListener(Gauges.Events.valueChanging, onPointerChanged, pointer);
	gauge.addEventListener(Gauges.Events.valueChanged, onPointerChanged, pointer);

	var range = new Range();
	range.alignment = (Alignment.TrueCenter);
	range.minValue = (scale2.minValue - 12);
	range.maxValue = (32);
	range.autoSize = (true);
	range.fill = ("#46697d");
	range.stroke = ("Transparent");
	scale2.addRange(range);

	range = new Range();
	range.alignment = (Alignment.OuterOutside);
	range.minValue = (150);
	range.maxValue = (212);
	range.startWidth = (new Length(0));
	range.endWidth = (new Length(10));
	range.fill = (Gauges.Utils.createLinearGradient(90, [
		0.25, "Yellow",
		0.90, "#ce0000"]));
	range.stroke = ("Black");
	scale2.addRange(range);

	window.data = gauge;
}

function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = true;
	var context = args.context;
	var element = args.element;
	var size = element.renderSize;
	var rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new Drawing.Thickness(3, 3, 3, 3, false));
	rect.fill = ("White");
	rect.stroke = ("Black");
	args.paintVisualElement(rect, size);
}

function onPrepaintForeground(sender, args)
{
	args.cancelDefaultPainting = true;
}

function onPointerChanged(sender, args)
{
	var range = sender.parent.ranges[0];
	range.maxValue = (args.newValue);
}

function postData()
{
	var value = window1.data.scales[1].ranges[0].maxValue;

	// create a new item with the start and end time of the selection
	// and the value of the thermometer
	var item = new Scheduling.Item();
	item.startTime = calendar.selection.getRange().start;
	item.endTime = calendar.selection.getRange().end;
	item.tag = value;
	calendar.schedule.items.add(item);

	window1.close();

	repaintControls();
}

function repaintControls()
{
	var items = calendar.schedule.items.items();

	for (var i = 0; i < items.length; i++)
	{
		var start = items[i].startTime;
		var end = items[i].endTime;
		var cells = calendar.getTimeCells(start, end, true);

		// style the calendar cells which contain items
		for (var k = 0; k < cells.length; k++)
		{
			cells[k].bgCell.style.backgroundColor = '#a3c686';
		}
	}

	// create chart data and repaint chart
	var dataItems = items.slice().sort(function (a, b)
	{
		return a.startTime.valueOf() - b.startTime.valueOf();
	});
	var data = new Collections.ObservableCollection<Charting.DateTimeSeries>();

	var dates = new Collections.List(dataItems.map(item => item.startTime));
	var temps = new Collections.List(dataItems.map(item => item.tag));

	var series = new Charting.DateTimeSeries(dates, temps, dates.item(0), dates.item(dates.count() - 1));
	series.dateTimeFormat = Charting.DateTimeFormat.CustomDateTime;
	series.customDateTimeFormat = '{"day":"numeric", "month":"long"}';

	data.add(series);
	chart.series = data;

	chart.draw();
}


