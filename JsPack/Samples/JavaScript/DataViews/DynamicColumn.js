var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;

// create the grid columns
var columns = [];

var column1 = new dv.GridColumn("ID");
column1.dataType = dv.IntegerType;
column1.editable = false;
column1.caption = "#";
columns.push(column1);

var column2 = new dv.GridColumn("Name");
column2.dataType = dv.StringType;
column2.caption = "Name";
columns.push(column2);

var column3 = new dv.GridColumn("Tag");
column3.dataType = dv.DynamicType;
column3.caption = "Tag (DynamicType)";
columns.push(column3);

// create the grid control
var grid = new dv.Grid(document.getElementById("grid"));
grid.theme = "light";
// set the model
grid.model = new dv.ArrayModel(states.slice(0,15), columns, "ID");

var lookupList = ["One","Two","Three","Four", "Five"];

grid.resolveCellDataType.addEventListener((sender, args) =>
{
    if (typeof args.value == "string")
    {
        if (args.value.indexOf("png") > -1)
            args.result = dv.ImageType;

        if (lookupList.indexOf(args.value) > -1)
            args.result = dv.LookupType;

        if (!isNaN(Date.parse(args.value)))
        {
            args.result = dv.DateType;
        }
    }
});

grid.resolveCellMetaData.addEventListener((sender, args) =>
{
    if (typeof args.value == "string")
    {
        if (lookupList.indexOf(args.value) > -1)
        {
            args.result = new Map();
            args.result.set("values", lookupList);
        }
    }
});

grid.getCellValue.addEventListener((sender, args) =>
{
    if (typeof args.value == "string")
    {
        if (!isNaN(Date.parse(args.value)))
        {
            args.result = new Date(Date.parse(args.value));
        }
    }
});

grid.formatCellValue.addEventListener((sender, args) =>
{
    if (typeof args.value == "string")
    {
        if (args.value.indexOf("data:image") > -1)
        {
            var image = document.createElement("div");
            image.style.backgroundImage = "url(" + args.value + ")";
            image.className = "mfdv-inline-image";
            args.result = image.outerHTML;
        }
    }
});

// increment index when a new row is added
grid.rowCreating.addEventListener((sender, args) =>
{
    var maxIndex = sender.model.getMaxKey();
    args.rowData["ID"] = ++maxIndex;
});


// render the grid control
grid.render();
grid.setColumnWidth(0, 150);