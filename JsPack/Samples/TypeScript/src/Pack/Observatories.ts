import * as Drawing from "@mindfusion/drawing";
import * as Common from "@mindfusion/common";
import * as Collections from "@mindfusion/common-collections";
import * as Charting from "@mindfusion/charting";
import * as Mapping from "@mindfusion/mapping";
import * as Scheduling from "@mindfusion/scheduling";
import * as UI from "@mindfusion/common-ui";

var theme = "business";

// create a mapView control
var mapView = new Mapping.MapView(document.getElementById("mapView"));
mapView.theme = theme;
mapView.width = Common.Unit.percentage(100);
mapView.height = Common.Unit.percentage(100);

// add a map tile layer
var l = new Mapping.MapLayer();
l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
mapView.layers.add(l);

// create a new TreeView control
var tree = new UI.TreeView(document.getElementById("treeView"));
tree.theme = theme;
tree.width = Common.Unit.percentage(100);
tree.height = Common.Unit.percentage(100);
tree.allowDrag = false;
tree.allowMultipleSelection = false;
tree.selectionChanged.addEventListener(treeNodeSelect);
tree.render();

// create some data for the nodes
var data = [
	{ id: 1, parentId: null, title: "Africa" },
	{ id: 2, parentId: 1, title: "South Africa" },
	{ id: new Mapping.LatLong(-33.938610, 18.460430), parentId: 2, title: "South African Astronomical Observatory" },
	{ id: new Mapping.LatLong(-28.409190, 21.582400), parentId: 2, title: "Southern African Large Telescope" },
	{ id: 11, parentId: null, title: "North America" },
	{ id: 12, parentId: 11, title: "USA" },
	{ id: new Mapping.LatLong(32.729690, -109.733710), parentId: 12, title: "Mount Graham International Observatory" },
	{ id: new Mapping.LatLong(38.431801, -79.818703), parentId: 12, title: "Green Bank Telescope" },
	{ id: 21, parentId: null, title: "Europe" },
	{ id: 22, parentId: 21, title: "Germany" },
	{ id: new Mapping.LatLong(48.260070, 11.671050), parentId: 22, title: "ESO European Southern Observatory" }
]

// create the tree nodes
var parent;
for (var i in data)
{
	var node = new UI.TreeNode(data[i].title.toString());
	node.tooltip = node.title;
	node.data = data[i].id;
	if (data[i].parentId)
	{
		parent = tree.flatItems.where(n => n.data == data[i].parentId).first();
		parent.items.add(node);
	}
	else tree.items.add(node);
}

// select the first observatory node
tree.items.items()[0].expanded = true;
tree.items.items()[1].expanded = true;
tree.selectNode(tree.items.items()[2], false);

// create an year view, showing a list of months
var monthList = new UI.YearView(document.getElementById("monthList"));
monthList.theme = theme;
monthList.render();
monthList.cellClick.addEventListener(monthSelect);

// filter the chart when a month is selected
function monthSelect(sender, args)
{
	chart.xAxis.minValue = args.date.getMonth() - 0.5;
	chart.xAxis.maxValue = args.date.getMonth() + 0.5;
}

// create the bar chart
var chart = new Charting.Controls.BarChart(<HTMLCanvasElement>document.getElementById('barChart'));
chart.title = "Observance Report";
chart.allowPan = false;

// create sample data series
let series = new Collections.ObservableCollection<Charting.Series>(
	new Array<Charting.BarSeries>(
		new Charting.BarSeries([8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7], null),
		new Charting.BarSeries([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], null),
		new Charting.BarSeries([2, 8, 13, 15, 13, 8, 2, 8, 13, 15, 13, 8], null),
		new Charting.BarSeries([1, 12, 1, 2, 8, 9, 10, 13, 4, 5, 6, 7], null),
		new Charting.BarSeries([14, 16, 18, 2, 4, 6, 8, 10, 12, 20, 22, 24], null),
		new Charting.BarSeries([22, 8, 2, 8, 13, 15, 2, 8, 13, 15, 13, 8], null)
	));
series.item(0).title = "Black holes";
series.item(1).title = "Quasars";
series.item(2).title = "UFO-s";
series.item(3).title = "Asteroids";
series.item(4).title = "Novae";
series.item(5).title = "Comets";
chart.xAxis.title = "Month";
chart.yAxis.title = "Objects observed";

chart.series = series;

chart.xAxis.interval = 1;
chart.xAxis.minValue = Scheduling.DateTime.today().month - 0.5;
chart.xAxis.maxValue = Scheduling.DateTime.today().month + 0.5;
chart.showXCoordinates = false;
chart.showXTicks = false;

chart.yAxis.interval = 5;

// create bar brushes
let b1 = new Drawing.Brush("#e0e9e9");
let b2 = new Drawing.Brush("#003466");
let b3 = new Drawing.Brush("#ce0000");
let b4 = new Drawing.Brush("#669acc");
let b5 = new Drawing.Brush("#000063"); 
let b6 = new Drawing.Brush("#fff");

// assign one brush per series
chart.plot.seriesStyle = new Charting.PerSeriesStyle(new Collections.List<Drawing.Brush>([b1, b2, b3, b4, b5, b6]));
chart.theme.legendBackground = new Drawing.Brush("#e0e9e9");
chart.theme.legendBorderStroke = new Drawing.Brush("#fff");
chart.theme.dataLabelsFontSize = 14;
chart.theme.axisLabelsFontSize = 14;
chart.theme.axisTitleFontSize = 14;
chart.legendTitle = "Objects";
chart.draw();

function treeNodeSelect(sender, args)
{
	if (args.newItems)
	{
		var item = args.newItems[0];

		// if a node is selected load the corresponding location in the mapView
		mapView.load(item.flatItems.last().data, Math.pow(3, item.level) + 1);

		// if a observatory node is selected create a marker in its location
		if (item.level == 2)
		{
			var marks = mapView.getDecorationsAt(mapView.latLongToClient(item.data));
			if (marks.length == 0)
			{
				var mark = new Mapping.Marker();
				mark.location = item.data;
				mark.text = item.title;
				mapView.decorations.add(mark);
			}
		}
	}
}