/// <reference path="./Scripts/jspack-vsdoc.js" />

var p = MindFusion.Scheduling;
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;
var maps = MindFusion.Mapping;
var ch = MindFusion.Charting;

var mapView;
var tree;
var calendar1;
var calendar2;
var chart;

document.addEventListener("DOMContentLoaded", function ()
{
	var theme = "business";

	// create a mapView control
	mapView = new maps.MapView(document.getElementById("mapView"));
	mapView.theme = theme;

	// add a map tile layer
	var l = new maps.MapLayer();
	l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
	l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
	mapView.layers.add(l);

	// create a new TreeView control
	tree = new ui.TreeView(document.getElementById("treeView"));
	tree.theme = theme;
	tree.width = common.Unit.percentage(100);
	tree.height = common.Unit.percentage(100);
	tree.allowDrag = false;
	tree.allowMultipleSelection = false;
	tree.selectionChanged.addEventListener(treeNodeSelect);
	tree.render();

	// create some data for the nodes
	var data = [
	{ id: 1, parentId: null, title: "Africa" },
	{ id: 2, parentId: 1, title: "South Africa" },
	{ id: new maps.LatLong(-33.938610, 18.460430), parentId: 2, title: "South African Astronomical Observatory" },
	{ id: new maps.LatLong(-28.409190, 21.582400), parentId: 2, title: "Southern African Large Telescope" },
	{ id: 11, parentId: null, title: "North America" },
	{ id: 12, parentId: 11, title: "USA" },
	{ id: new maps.LatLong(32.729690, -109.733710), parentId: 12, title: "Mount Graham International Observatory" },
	{ id: new maps.LatLong(38.431801, -79.818703), parentId: 12, title: "Green Bank Telescope" },
	{ id: 21, parentId: null, title: "Europe" },
	{ id: 22, parentId: 21, title: "Germany" },
	{ id: new maps.LatLong(48.260070, 11.671050), parentId: 22, title: "ESO European Southern Observatory" }
]

	// create the tree nodes
	var parent;
	for (var i in data)
	{
		var node = new ui.TreeNode(data[i].title.toString());
		node.tooltip = node.title;
		node.data = data[i].id;
		if (data[i].parentId)
		{
			parent = tree.flatItems.where(function (n) { return n.data == data[i].parentId }).first();
			parent.items.add(node);
		}
		else tree.items.add(node);
	}

	// select the first observatory node
	tree.flatItems.items()[0].expanded = true;
	tree.flatItems.items()[1].expanded = true;
	tree.selectNode(tree.flatItems.items()[2], false);

	// create an year view, showing a list of months
	var monthList = new ui.YearView(document.getElementById("monthList"));
	monthList.theme = theme;
	monthList.commandStrip.visible = false;
	monthList.render();
	monthList.cellClick.addEventListener(monthSelect);

	// create the bar chart
	chart = new ch.Controls.BarChart(document.getElementById('barChart'));
	chart.title = "Observance Report";
	chart.allowPan = false;

	// create sample data series
	var series = new MindFusion.Common.Collections.ObservableCollection(
	new Array(
		new ch.BarSeries([8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7], null),
		new ch.BarSeries([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], null),
		new ch.BarSeries([2, 8, 13, 15, 13, 8, 2, 8, 13, 15, 13, 8], null),
		new ch.BarSeries([1, 12, 1, 2, 8, 9, 10, 13, 4, 5, 6, 7], null),
		new ch.BarSeries([14, 16, 18, 2, 4, 6, 8, 10, 12, 20, 22, 24], null),
		new ch.BarSeries([22, 8, 2, 8, 13, 15, 2, 8, 13, 15, 13, 8], null)
	));
	series.item(0).title = "Black holes";
	series.item(1).title = "Quasars";
	series.item(2).title = "UFO-s";
	series.item(3).title = "Asteroids";
	series.item(4).title = "Nova";
	series.item(5).title = "Comets";
	chart.xAxis.title = "Month";
	chart.yAxis.title = "Objects observed";

	chart.series = series;

	chart.xAxis.interval = 1;
	chart.xAxis.minValue = p.DateTime.today().month - 0.5;
	chart.xAxis.maxValue = p.DateTime.today().month + 0.5;
	chart.showXCoordinates = false;
	chart.showXTicks = false;

	chart.yAxis.interval = 5;

	// create bar brushes
	var b1 = new MindFusion.Drawing.Brush("#e0e9e9");
	var b2 = new MindFusion.Drawing.Brush("#003466");
	var b3 = new MindFusion.Drawing.Brush("#ce0000");
	var b4 = new MindFusion.Drawing.Brush("#669acc");
	var b5 = new MindFusion.Drawing.Brush("#000063");
	var b6 = new MindFusion.Drawing.Brush("#fff");

	// assign one brush per series
	chart.plot.seriesStyle = new ch.PerSeriesStyle(new MindFusion.Common.Collections.List([b1, b2, b3, b4, b5, b6]));
	chart.theme.legendBackground = new MindFusion.Drawing.Brush("#e0e9e9");
	chart.theme.legendBorderStroke = new MindFusion.Drawing.Brush("#fff");
	chart.theme.dataLabelsFontSize = 14;
	chart.theme.axisLabelsFontSize = 14;
	chart.theme.axisTitleFontSize = 14;
	chart.legendTitle = "Objects";
	chart.draw();
});

// filter the chart when a month is selected
function monthSelect(sender, args)
{
	chart.xAxis.minValue = args.date.getMonth() - 0.5;
	chart.xAxis.maxValue = args.date.getMonth() + 0.5;
}

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
				var mark = new maps.Marker();
				mark.location = item.data;
				mark.text = item.title;
				mapView.decorations.add(mark);
			}
		}
	}
}