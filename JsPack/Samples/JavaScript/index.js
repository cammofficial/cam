var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var data1 = [
    {
        title: "Activities",
        href: "Activities.html",
        description: "Shows how to create an activity timetable",
        items: [
            { title: "LineChart", href: "https://mindfusion.eu/javascript-chart.html" },
            { title: "ListView", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "PieChart", href: "https://mindfusion.eu/javascript-chart.html" },
            { title: "Scheduler", href: "https://mindfusion.eu/javascript-scheduler.html" },
            { title: "Virtual Keyboard", href: "https://mindfusion.eu/javascript-keyboard.html" }
        ]
    },
    {
        title: "Chat",
        href: "Chat.html",
        description: "A chat-like application",
        items: [
            { title: "ListView", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "ToolStrip", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "Tooltip", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "WindowHost", href: "https://mindfusion.eu/javascript-pack.html" }
        ]
    },
    {
        title: "DomInspector",
        description: "Shows how to build a dynamic tree",
        href: "DomInspector.html",
        items: [
            { title: "Diagram", href: "https://mindfusion.eu/javascript-diagram.html" },
            { title: "ListView", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "TreeView", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "Tooltip", href: "https://mindfusion.eu/javascript-pack.html" }
        ]
    },
    {
        title: "FlipMatch",
        href: "FlipMatch.html",
        description: "The classic memory game",
        items: [
            { title: "Diagram", href: "https://mindfusion.eu/javascript-diagram.html" },
            { title: "Dialogs", href: "https://mindfusion.eu/javascript-pack.html" },
            { title: "Gauges", href: "https://mindfusion.eu/javascript-chart.html" }
        ]
    }];


var data2 = [{
    title: "Observatories",
    href: "Observatories.html",
    description: "Observatories around the world",
    items: [
        { title: "BarChart", href: "https://mindfusion.eu/javascript-chart.html" },
        { title: "MapView", href: "https://mindfusion.eu/javascript-pack.html" },
        { title: "TreeView", href: "https://mindfusion.eu/javascript-pack.html" }
    ]
},
{
    title: "ServerLoad",
    href: "ServerLoad.html",
    description: "A sample server load web application",
    items: [
        { title: "Diagram", href: "https://mindfusion.eu/javascript-diagram.html" },
        { title: "Gauges", href: "https://mindfusion.eu/javascript-chart.html" },
        { title: "LineChart", href: "https://mindfusion.eu/javascript-chart.html" }
    ]
},
{
    title: "TemperatureLog",
    href: "TemperatureLog.html",
    description: "A temperature data logger application",
    items: [
        { title: "AreaChart", href: "https://mindfusion.eu/javascript-chart.html" },
        { title: "Gauges", href: "https://mindfusion.eu/javascript-chart.html" },
        { title: "Scheduler", href: "https://mindfusion.eu/javascript-scheduler.html" },
        { title: "Window", href: "https://mindfusion.eu/javascript-pack.html" }
    ]
},
{
    title: "WorldPopulation",
    href: "WorldPopulation.html",
    description: "Population data by country",
    items: [
        { title: "Grid", href: "https://mindfusion.eu/javascript-pack.html" },
        { title: "Diagram", href: "https://mindfusion.eu/javascript-diagram.html" },
        { title: "BarChart", href: "https://mindfusion.eu/javascript-chart.html" }
    ]
}];

var data3 = [{
    title: "Diagramming",
    lib: true,
    items: [
        { title: "Anchors", href: "./Diagramming/Anchors.html" },
        { title: "Animations", href: "./Diagramming/Animations.html" },
        { title: "Containers", href: "./Diagramming/Containers.html" },
        { title: "ControlNodes", href: "./Diagramming/ControlNodes.html" },
        { title: "Controls", href: "./Diagramming/Controls.html" },
        { title: "DB Design", href: "./Diagramming/DBDesign.html" },
        { title: "Dom Tree", href: "./Diagramming/DomTree.html" },
        { title: "Drag Drop", href: "./Diagramming/DragDrop.html" },
        { title: "Flowcharter", href: "./Diagramming/Flowcharter.html" },
        { title: "Flowchart Layout", href: "./Diagramming/FlowchartLayout.html" },
        { title: "Fractal Layout", href: "./Diagramming/FractalLayout.html" },
        { title: "Inheritance", href: "./Diagramming/Inheritance.html" },
        { title: "Lanes", href: "./Diagramming/Lanes.html" },
        { title: "Layered Layout", href: "./Diagramming/LayeredLayout.html" },
        { title: "Multiple Views", href: "./Diagramming/MultipleViews.html" },
        { title: "OrgChart Editor", href: "./Diagramming/OrgChartEditor.html" },
        { title: "Path Finder", href: "./Diagramming/PathFinder.html" },
        { title: "Scripting", href: "./Diagramming/Scripting.html" },
        { title: "Spanning Cells", href: "./Diagramming/SpanningCells.html" },
        { title: "Stock Shapes", href: "./Diagramming/StockShapes.html" },
        { title: "SVG Nodes", href: "./Diagramming/SVGNodes.html" },
        { title: "Themes", href: "./Diagramming/Themes.html" },
        { title: "Tree Layout", href: "./Diagramming/TreeLayout.html" },
        { title: "Tree Map", href: "./Diagramming/TreeMap.html" },
        { title: "TreeView Nodes", href: "./Diagramming/TreeViewNodes.html" },
        { title: "Tutorial 1", href: "./Diagramming/Tutorial1.html" },
        { title: "Tutorial 2", href: "./Diagramming/Tutorial2.html" },
        { title: "Tutorial 3", href: "./Diagramming/Tutorial3.html" },
        { title: "Tutorial 4", href: "./Diagramming/Tutorial4.html" }
    ]
},
{
    title: "Charting",
    lib: true,
    items: [
        { title: "AreaChart", href: "./Charting/AreaChart.html" },
        { title: "BarChart", href: "./Charting/BarChart.html" },
        { title: "BarChart3D", href: "./Charting/BarChart3D.html" },
        { title: "BubbleChart", href: "./Charting/BubbleChart.html" },
        { title: "CandlestickChart", href: "./Charting/CandlestickChart.html" },
        { title: "CarGauges", href: "./Charting/CarGauges.html" },
        { title: "Clock", href: "./Charting/Clock.html" },
        { title: "Compass", href: "./Charting/Compass.html" },
        { title: "CustomData", href: "./Charting/CustomData.html" },
        { title: "Dashboard", href: "./Charting/Dashboard.html" },
        { title: "DateTimeSeries", href: "./Charting/DateTimeSeries.html" },
        { title: "DateTimeSeriesTooltips", href: "./Charting/DateTimeSeriesTooltips.html" },
        { title: "Equalizer", href: "./Charting/Equalizer.html" },
        { title: "Functions", href: "./Charting/Functions.html" },
        { title: "FunnelChart", href: "./Charting/FunnelChart.html" },
        { title: "GroupLabels", href: "./Charting/GroupLabels.html" },
        { title: "Interactivity", href: "./Charting/Interactivity.html" },
        { title: "LineChart", href: "./Charting/LineChart.html" },
        { title: "ListBinding", href: "./Charting/ListBinding.html" },
        { title: "MultipleAxes", href: "./Charting/MultipleAxes.html" },
        { title: "MultiplePlots", href: "./Charting/MultiplePlots.html" },
        { title: "PieChart", href: "./Charting/PieChart.html" },
        { title: "RadarChart", href: "./Charting/RadarChart.html" },
        { title: "SynchronizedScroll", href: "./Charting/SynchronizedScroll.html" },
        { title: "Thermometer", href: "./Charting/Thermometer.html" },
		{ title: "TowerChart", href: "./Charting/TowerChart.html" },
        { title: "Tutorial1", href: "./Charting/Tutorial1.html" }
    ]
},
{
    title: "Scheduling",
    lib: true,
    items: [
        { title: "MinApp", href: "./Scheduling/MinApp.html" },
        { title: "Items", href: "./Scheduling/Items.html" },
        { title: "Resources", href: "./Scheduling/Resources.html" },
        { title: "MonthView", href: "./Scheduling/MonthView.html" },
        { title: "WeekView", href: "./Scheduling/WeekView.html" },
        { title: "ListView", href: "./Scheduling/ListView.html" },
        { title: "Timetable", href: "./Scheduling/Timetable.html" },
        { title: "ResourceView", href: "./Scheduling/ResourceView.html" },
        { title: "Views", href: "./Scheduling/Views.html" },
        { title: "DualView", href: "./Scheduling/DualView.html" },
        { title: "Booking", href: "./Scheduling/Booking.html" },
        { title: "GardenCalendar", href: "./Scheduling/GardenCalendar.html" },
        { title: "Interactions", href: "./Scheduling/Interactions.html" }
    ]
},
{
    title: "Virtual Keyboard",
    lib: true,
    items: [
        { title: "Custom", href: "./Keyboard/Custom.html" },
        { title: "Demo", href: "./Keyboard/Demo.html" },
        { title: "HiddenKeyboard", href: "./Keyboard/HiddenKeyboard.html" }
    ]
}];

var data4 = [{
    title: "Mapping",
    lib: true,
    items: [
        { title: "MinApp", href: "./Mapping/MinApp.html" },
        { title: "Coordinates", href: "./Mapping/Coordinates.html" },
        { title: "Decorations", href: "./Mapping/Decorations.html" },
        { title: "Interactions", href: "./Mapping/Interactions.html" },
        { title: "CanvasLayer", href: "./Mapping/CanvasLayer.html" }
    ]
},
{
    title: "DataViews",
    lib: true,
    items: [
        { title: "Columns", href: "./DataViews/Columns.html" },
        { title: "Events", href: "./DataViews/Events.html" },
        { title: "CRUD", href: "./DataViews/CRUD.html" },
        { title: "Validation", href: "./DataViews/Validation.html" },
        { title: "Navigation", href: "./DataViews/Navigation.html" },
        { title: "CustomModel", href: "./DataViews/CustomModel.html" },
        { title: "CustomDraw", href: "./DataViews/CustomDraw.html" },
        { title: "Selection", href: "./DataViews/Selection.html" },
        { title: "Localization", href: "./DataViews/Localization.html" },
        { title: "DynamicColumn", href: "./DataViews/DynamicColumn.html" },
        { title: "PropertyGrid", href: "./DataViews/PropertyGrid.html" },
    ]
},
{
    title: "UI",
    lib: true,
    items: [
        { title: "CheckListBox", href: "./UI/CheckListBox.html" },
        { title: "CustomDialog", href: "./UI/CustomDialog.html" },
        { title: "DataForm", href: "./UI/DataForm.html" },
        { title: "DateTimePicker", href: "./UI/DateTimePicker.html" },
        { title: "DragDrop", href: "./UI/DragDrop.html" },
        { title: "DragDrop2", href: "./UI/DragDrop2.html" },
        { title: "DragDrop3", href: "./UI/DragDrop3.html" },
        { title: "ImagePicker", href: "./UI/ImagePicker.html" },
        { title: "InteractiveTree", href: "./UI/InteractiveTree.html" },
        { title: "Menu", href: "./UI/Menu.html" },
        { title: "Tabs", href: "./UI/Tabs.html" },
        { title: "ThemedDialogs", href: "./UI/ThemedDialogs.html" },
        { title: "ToolStrip", href: "./UI/ToolStrip.html" },
        { title: "Tree", href: "./UI/Tree.html" },
        { title: "Windows", href: "./UI/Windows.html" }
    ]
}
];

createList(data1, "apps1");
createList(data2, "apps2");
createList(data3, "samples1");
createList(data4, "samples2");

function createList(data, id)
{
    var list = new ui.ListView(document.getElementById(id));
    list.orientation = ui.Orientation.Horizontal;
    list.width = common.Unit.percentage(100);
    list.itemSize = common.Unit.percentage(100);
    list.allowDrag = false;
    list.render();
    for (var i = 0; i < data.length; i++)
    {
        var item = new ui.ListItem();
        item.template = generateTemplate(data[i]);
        list.items.add(item);
    }
}

function generateTemplate(data)
{
    var t = document.createElement("div");
    t.className = "cardClass";

    if (data.lib)
    {
        var a = document.createElement("a");
        a.className = "title";
        a.innerText = data.title;
        t.appendChild(a);

        var span = document.createElement("span");
        span.className = "samples";
        t.appendChild(span);

        var controls = getControls(data.items);
        span.appendChild(controls.draw());

    }
    else
    {
        var a = document.createElement("a");
        a.style.position = "relative";
        a.style.paddingRight = "50%";
        var img = document.createElement("img");
        img.src = "./images/screenshots/" + data.title + ".png";
        img.style.width = "100%";
        a.href = data.href;
        a.appendChild(img);
        t.appendChild(a);

        a = document.createElement("a");
        a.className = "title";
        a.innerText = data.title;
        a.href = data.href;
        t.appendChild(a);

        var span = document.createElement("span");
        span.className = "description";
        span.innerText = data.description;
        t.appendChild(span);

        var span = document.createElement("span");
        span.className = "controls";
        t.appendChild(span);

        var controls = getControls(data.items);
        span.appendChild(controls.draw());
    }

    return t.outerHTML;
}

function getControls(items)
{
    var list = new ui.Menu();
    list.fromObject(items);
    return list;
}
