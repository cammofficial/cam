import * as Drawing from "@mindfusion/drawing";
import * as Controls from "@mindfusion/controls";
import * as Collections from "@mindfusion/common-collections";
import * as Diagramming from "@mindfusion/diagramming";
import * as Graphs from "@mindfusion/graphs";
import * as Charting from "@mindfusion/charting";
import * as DataViews from "@mindfusion/dataviews";

var scale: any[] = ['rgb(224, 233, 233)', 'rgb(97, 106, 127)', 'rgb(206, 0, 0)'];

// create the diagram control
let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));

diagramView.behavior = (Diagramming.Behavior.Pan);
diagramView.delKeyAction = (Diagramming.DelKeyAction.None);

let diagram = diagramView.diagram;
diagram.addEventListener(Diagramming.Events.nodeClicked, function (sender, args)
{
    if (args.node instanceof Diagramming.ShapeNode)
    {
        var id = args.node.id;
        var row = grid.getKeyRow(id);
        grid.scrollRow = row;
    }
})

// create a zoom control for the diagram
var zoomer = Controls.ZoomControl.create(<HTMLCanvasElement>document.getElementById("zoomer"));
zoomer.target = diagramView;
zoomer.backColor = ("transparent");
zoomer.activeColor = (scale[1]);
zoomer.fill = (scale[0]);

// create the grid control
var columns = [];
var column0 = new DataViews.GridColumn("id");
column0.dataType = DataViews.IntegerType;
column0.caption = "#";
column0.editable = false;
columns.push(column0);

var column1 = new DataViews.GridColumn("text");
column1.dataType = DataViews.StringType;
column1.caption = "Name";
columns.push(column1);

var column3 = new DataViews.GridColumn("population");
column3.dataType = DataViews.RealNumberType;
column3.caption = "Population (mil.)";
columns.push(column3);

var column4 = new DataViews.GridColumn("continentId");
column4.dataType = DataViews.LookupType;
column4.caption = "Continent";
columns.push(column4);

var grid = new DataViews.Grid(<HTMLDivElement>document.getElementById("grid"));
grid.setWidth("50%");
grid.setLeft("50%");
grid.theme = "standard";

// create the bar chart control
var chart = new Charting.Controls.BarChart(<HTMLCanvasElement>document.getElementById('barChart'));
chart.gridType = 1;
chart.xAxis.title = "";
chart.yAxis.title = "Population (mil.)";
chart.outerLabelRotation = -30;							   
chart.showXCoordinates = false;
chart.showXTicks = false;
chart.plot.seriesStyle = new Charting.PerSeriesStyle(new Collections.List([new Drawing.LinearGradientBrush(scale[0], scale[1])]));
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

            grid.model = <any>(new DataViews.ArrayModel(countriesData, columns, "id"));
            grid.render();

            // setup the chart
            refreshChart(null);

            // setup the diagram
            continentsData.forEach((c) =>
            {
                var container = diagram.factory.createContainerNode(0, 0, 10, 10);
                container.text = (c.text);
                container.id = (c.id);
            });
            countriesData.forEach((c) =>
            {
                var shape = diagram.factory.createShapeNode(0, 0, 10, 10);
                shape.weight = (c.population);
                shape.text = (c.text);
                shape.id = (c.id);
                var container = diagram.nodes.find((node) => node instanceof Diagramming.ContainerNode && node.id == c.continentId);
                (<Diagramming.ContainerNode>container).add(shape);
            });
            arrangeDiagram();
        }
    };
    xhttp.open("GET", "../data/Data.xml", true);
    xhttp.send();
}

function assignColors()
{
    var largestPopulation = new Map();
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (node instanceof Diagramming.ContainerNode)
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
        if (node instanceof Diagramming.ContainerNode|| node.locked)
            continue;

        var total = 0;

        if (node instanceof Diagramming.ShapeNode)
        {
            var value = node.weight;
            if (value == null)
                continue;

            total = largestPopulation.get(node.container);

            node.brush = (getScaleColor(value, total));
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
        (+start[0] + Math.floor(((factor - factorBase) * (+end[0] - +start[0]) / step))).toString() + "," +
        (+start[1] + Math.floor(((factor - factorBase) * (+end[1] - +start[1]) / step))).toString() + "," +
        (+start[2] + Math.floor(((factor - factorBase) * (+end[2] - +start[2]) / step))).toString() + ")";
}

function arrangeDiagram()
{
    //  assignWeights();
    assignColors();

    var layout = new Graphs.TreeMapLayout();
    layout.padding = 0;
    layout.containerPadding = 1;
    layout.layoutArea = new Drawing.Rect(0, 0, 400, 300);
    diagram.arrange(layout);
    diagram.resizeToFitItems();

    // Remove the text of smaller nodes
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (!(node instanceof Diagramming.ShapeNode) || node.locked)
            continue;

        if (node.bounds.width < 10 || node.bounds.height < 10)
            node.text = ("");

        node.visible = (true);
    }

    // Resize caption nodes
    for (var i = 0; i < diagram.nodes.length; i++)
    {
        var node = diagram.nodes[i];
        if (node.locked && node.masterNode)
        {
            var bounds = node.getBounds();
            bounds.width = node.masterNode.getBounds().width;
            bounds.height = Math.min(30, node.masterNode.getBounds().height);
            node.setBounds(bounds);
        }
    }

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
        node = diagram.factory.createShapeNode(new Drawing.Rect(0, 0, 0, 0));
        node.setId(args.rowData.id);
        node.setVisible(false);
    }
    node.text = (args.rowData.text);
    node.weight = (args.rowData.population);

    var container = diagram.nodes.find((node) => node.id == args.rowData.continentId);
    if (node.container != container)
        (<Diagramming.ContainerNode>container).add(node);

    if (node.container)
    {
        arrangeDiagram();
        refreshChart(null);
    }
});

grid.rowDeleted.addEventListener(function (sender, args)
{
    var node = diagram.nodes.find((node) => node.id == args.oldValues.get("id"));
    node.parent.deleteItem(node);
    arrangeDiagram();
    refreshChart(null);
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
        var series = new Collections.ObservableCollection(new Array(new Charting.BarSeries(
            countriesData.filter((c) => c.continentId == continentId).map((i) => { return i.population }),
            countriesData.filter((c) => c.continentId == continentId).map((i) => { return i.text }),
        )));
		series.item(0).supportedLabels = Charting.LabelKinds.InnerLabel;														  
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
        var series = new Collections.ObservableCollection(new Array(new Charting.BarSeries(seriesArr, continentsData.map((i) => { return i.text }))));
		series.item(0).supportedLabels = Charting.LabelKinds.InnerLabel;														  
        chart.series = series;
        chart.draw();
        continentView = true;
    }
}
