var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;
var ch = MindFusion.Charting;
var d = MindFusion.Diagramming;


var scale = ['rgb(224, 233, 233)', 'rgb(97, 106, 127)', 'rgb(206, 0, 0)'];

// create the diagram control
var diagramView = d.DiagramView.create(document.getElementById("diagram"));
diagramView.behavior = d.Behavior.Pan;
diagramView.delKeyAction = d.DelKeyAction.None;
diagram = diagramView.diagram;
diagram.addEventListener(d.Events.nodeClicked, function (sender, args)
{
    if (args.node instanceof d.ShapeNode)
    {
        var id = args.node.id;
        var row = grid.getKeyRow(id);
        grid.scrollRow = row;
    }
})

// create a zoom control for the diagram
var zoomer = MindFusion.Controls.ZoomControl.create(document.getElementById("zoomer"));
zoomer.target = diagramView;
zoomer.backColor = "transparent";
zoomer.activeColor = scale[1];
zoomer.fill = scale[0];

// create the grid control
var columns = [];
var column0 = new dv.GridColumn("id");
column0.dataType = dv.IntegerType;
column0.caption = "#";
column0.editable = false;
columns.push(column0);

var column1 = new dv.GridColumn("text");
column1.dataType = dv.StringType;
column1.caption = "Name";
columns.push(column1);

var column3 = new dv.GridColumn("population");
column3.dataType = dv.RealNumberType;
column3.caption = "Population (mil.)";
columns.push(column3);

var column4 = new dv.GridColumn("continentId");
column4.dataType = dv.LookupType;
column4.caption = "Continent";
columns.push(column4);

var grid = new dv.Grid(document.getElementById("grid"));
grid.setWidth("50%");
grid.setLeft("50%");
grid.theme = "standard";

// create the bar chart control
var chart = new ch.Controls.BarChart(document.getElementById('barChart'));
chart.gridType = 1;
chart.xAxis.title = "";
chart.yAxis.title = "Population (mil.)";
chart.outerLabelRotation = -30;
chart.showXCoordinates = false;
chart.showXTicks = false;
chart.plot.seriesStyle = new ch.PerSeriesStyle(new MindFusion.Common.Collections.List([new MindFusion.Drawing.LinearGradientBrush(scale[0],scale[1])]));
chart.theme.dataLabelsFontSize = 14;
chart.showLegend = false;
chart.showZoomWidgets = true;
chart.dataItemClicked.addEventListener(onDataItemClicked);

var continentsData = [];
var countriesData = [];

getData()

function getData()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xhttp.responseText, "text/xml");
            var cnt = 0;

            var continents = xmlDoc.getElementsByTagName('continent');

            for (var i = 0; i < continents.length; i++)
            {
                var continent = continents[i];

                var continentItem = {
                    id: cnt++,
                    text: continent.attributes["name"].value
                }
                continentsData.push(continentItem);

                var countries = continent.getElementsByTagName('country');
                for (var k = 0; k < countries.length; k++)
                {
                    var country = countries[k];
                    var countryItem = {
                        id: cnt++,
                        population: parseFloat(country.attributes["population"].value) * 1000,
                        text: country.attributes["name"].value,
                        continentId: continentItem.id
                    }

                    countriesData.push(countryItem);
                }
            }

            // setup the grid
            var continentsLookup = new Map();
            continentsData.forEach((c) =>
                continentsLookup.set(c.id, c.text));
            column4.metaData.set("keyValues", continentsLookup);

            grid.model = new dv.ArrayModel(countriesData, columns, "id");
            grid.render();

            // setup the chart
            refreshChart();

            // setup the diagram
            continentsData.forEach((c) =>
            {
                var container = diagram.factory.createContainerNode(0, 0, 10, 10);
                container.text = c.text;
                container.id = c.id;
            });
            countriesData.forEach((c) =>
            {
                var shape = diagram.factory.createShapeNode(0, 0, 10, 10);
                shape.weight = c.population;
                shape.text = c.text;
                shape.id = c.id;
                var container = diagram.nodes.find((node) => node instanceof d.ContainerNode && node.id == c.continentId);
                container.add(shape);
            });
            arrangeDiagram();
        }
    };
    xhttp.open("GET", "../Diagramming/Data.xml", true);
    xhttp.send();
}

function assignColors()
{
    var largestPopulation = new Map();
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (node instanceof d.ContainerNode)
        {
            var population = 0.0;
            for (var j = 0; j < node.children.length; j++)
            {
                var child = node.children[j];
                var values = child.weight;
                if (values == null)
                    continue;

                population = Math.max(population, values);
            }

            largestPopulation.set(node, population);
        }
    }

    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        // Ignore containers and container captions
        if ((node instanceof d.ContainerNode) || node.locked)
            continue;

        if (node instanceof d.ShapeNode)
        {
            var value = node.weight;
            if (value == null)
                continue;

            total = largestPopulation.get(node.container);

            node.brush = getScaleColor(value, total);
        }
    }
}

function getScaleColor(value, total)
{
    var factor = value / total;
    if (factor < 0)
        factor = 0;
    if (factor > 1)
        factor = 1;

    var step = 1.0 / (scale.length - 1);
    var start = scale[Math.floor(factor / step)];
    var end = scale[Math.min(scale.length - 1, Math.floor(factor / step) + 1)];

    var factorBase = factor - factor % step;

    start = start.substring(4, start.length - 1)
        .replace(/ /g, '')
        .split(',');
    end = end.substring(4, end.length - 1)
        .replace(/ /g, '')
        .split(',');

    return 'rgb(' +
        (+start[0] + Math.floor(((factor - factorBase) * (end[0] - start[0]) / step))).toString() + "," +
        (+start[1] + Math.floor(((factor - factorBase) * (end[1] - start[1]) / step))).toString() + "," +
        (+start[2] + Math.floor(((factor - factorBase) * (end[2] - start[2]) / step))).toString() + ")";
}

function arrangeDiagram()
{
    //  assignWeights();
    assignColors();

    var layout = new MindFusion.Graphs.TreeMapLayout();
    layout.padding = 0;
    layout.containerPadding = 1;
    layout.layoutArea = new MindFusion.Drawing.Rect(0, 0, 400, 300);
    diagram.arrange(layout);
    diagram.resizeToFitItems();

    // Remove the text of smaller nodes
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (!(node instanceof d.ShapeNode) || node.locked)
            continue;

        if (node.bounds.width < 10 || node.bounds.height < 10)
            node.text = "";

        node.visible = true;
    }

    // Resize caption nodes
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (node.locked && node.masterNode)
        {
            var bounds = node.getBounds();
            bounds.width = node.masterNode.bounds.width;
            bounds.height = Math.min(30, node.masterNode.bounds.height);
            node.bounds = bounds;
        }
    }

    var diagramView = d.DiagramView.find("diagram");
    diagramView.zoomToFit();
}

grid.rowCreating.addEventListener(function (sender, args)
{
    args.rowData.id = diagram.nodes.length;
});

grid.rowUpdated.addEventListener(function (sender, args)
{
    args.rowData.population = args.rowData.population || 1;

    var node = diagram.nodes.find((node) => node.id == args.rowData.id);
    if (!node)
    {
        node = diagram.factory.createShapeNode(new Rect(0, 0, 0, 0));
        node.id = args.rowData.id;
        node.visible = false;
    }
    node.text = args.rowData.text;
    node.weight = args.rowData.population;

    var container = diagram.nodes.find((node) => node.id == args.rowData.continentId);
    if (node.container != container)
        container.add(node);

    if (node.container)
    {
        arrangeDiagram();
        refreshChart();
    }
});

grid.rowDeleted.addEventListener(function (sender, args)
{
    var node = diagram.nodes.find((node) => node.id == args.oldValues.get("id"));
    node.parent.deleteItem(node);
    arrangeDiagram();
    refreshChart();
});

var continentView = true;

function onDataItemClicked(sender, args)
{
    refreshChart(args.index);
}

function refreshChart(dataIndex)
{
    if (continentView && dataIndex != undefined)
    {
        var continentId = continentsData[dataIndex].id;
        var series = new MindFusion.Common.Collections.ObservableCollection(new Array(new ch.BarSeries(
            countriesData.filter((c) => c.continentId == continentId).map((i) => { return i.population }),
            countriesData.filter((c) => c.continentId == continentId).map((i) => { return i.text }),
        )));
		series.item(0).supportedLabels = ch.LabelKinds.InnerLabel;
        chart.series = series;
        chart.draw();
        continentView = false;
    }
    else
    {
        var seriesArr = [];
        continentsData.forEach((c) =>
        {
            seriesArr.push(countriesData.filter((ctr) => ctr.continentId == c.id).map((ctr) => ctr.population).reduce((acc, ctr) => { return acc + ctr }));
        });
        var series = new MindFusion.Common.Collections.ObservableCollection(new Array(new ch.BarSeries(
            seriesArr,

            continentsData.map((i) => { return i.text }))));
        series.item(0).supportedLabels = ch.LabelKinds.InnerLabel;
        chart.series = series;
		chart.draw();
        continentView = true;
    }
}