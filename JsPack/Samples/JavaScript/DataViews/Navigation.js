var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;


var strip = new ui.ToolStrip(document.getElementById("toolstrip"));
strip.theme = "gray";
strip.scrollable = false;
strip.allowDrag = false;

strip.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Label, "&#9198;"));
strip.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Label, "&#9204;"));

item = new ui.ToolStripItem(ui.ToolStripItemType.Default);
item.template = "<input type='number' id='row_index' min='0' value='0'></input> of <span id='row_count'><span>";
strip.items.add(item);

strip.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Label, "&#9205;"));
strip.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Label, "&#9197;"));

strip.items.add(new ui.ToolStripItem(ui.ToolStripItemType.Separator));

item = new ui.ToolStripItem(ui.ToolStripItemType.Default);
item.template = "<input type='checkbox' id='edit_mode'>Edit mode</input>";
strip.items.add(item);

strip.itemClick.addEventListener(function (sender, args)
{
    var index = sender.items.indexOfItem(args.item);

    if (grid.allowCellSelect)
    {
        var selectedRow = grid.focusedCell.row;
        var selectedColumn = grid.focusedCell.column;

        switch (index)
        {
            case 0: selectedRow = 0;
                selectedColumn = 0;
                break;
            case 1:
                selectedColumn--;
                break;
            case 3:
                selectedColumn++;
                break;
            case 4: selectedRow = grid.model.rowCount - 1;
                selectedColumn = grid.model.columnCount - 1;
                break;
            default: return;
        }

        grid.bringIntoView(selectedRow).then(grid.focusCell(selectedRow, selectedColumn, index == 1));
    }
    else
    {
        var selectedRow = null;

        switch (index)
        {
            case 0: selectedRow = 0;
                break;
            case 1:
                if (grid.selectedRowIndices.length)
                    selectedRow = Math.max(grid.selectedRowIndices[0] - 1, 0);
                else
                    selectedRow = grid.scrollRow;
                break;
            case 3:
                if (grid.selectedRowIndices.length)
                    selectedRow = Math.min(grid.selectedRowIndices[grid.selectedRowIndices.length - 1] + 1, grid.model.rowCount - 1);
                else
                    selectedRow = grid.scrollRow;
                break;
            case 4: selectedRow = grid.model.rowCount - 1;
                break;
            default: return;
        }
        grid.bringIntoView(selectedRow).then(() => grid.selectRows(selectedRow));
    }

    document.getElementById("row_index").value = selectedRow;
});

strip.render();

// create the grid columns
var columns = [];

var column1 = new dv.GridColumn("index");
column1.dataType = dv.IntegerType;
column1.editable = false;
column1.caption = "#";
columns.push(column1);

var column2 = new dv.GridColumn("name");
column2.dataType = dv.StringType;
column2.caption = "Name";
columns.push(column2);

var column3 = new dv.GridColumn("state");
column3.dataType = dv.LookupType;
column3.caption = "State";
column3.metaData.set("values", states.map(s => [s["Name"]]));
columns.push(column3);

var column4 = new dv.GridColumn("registered");
column4.dataType = dv.DateType;
column4.caption = "Registered";
column4.metaData.set("customEditor", {
    "autoComplete": true,
    "allowEmptyInput": true
});
columns.push(column4);

var column5 = new dv.GridColumn("tickets");
column5.dataType = dv.IntegerType;
column5.caption = "Tickets";
columns.push(column5);

var column6 = new dv.GridColumn("winnings");
column6.dataType = dv.CurrencyType;
column6.caption = "Winnings";
columns.push(column6);

var column7 = new dv.GridColumn("bonus");
column7.dataType = dv.ImageType;
column7.caption = "Bonus";
var imgSrcs = ["../images/client.png", "../images/data_server.png", "../images/network_server.png", "../images/web_server.png"];
var imageList;
ui.ImagePicker.loadImageList(imgSrcs).then(response =>
{
    imageList = response;
    column7.metaData.set("customEditor", { "imageList": imageList, "width": common.Unit.pixel(100), "itemSize": common.Unit.pixel(50) });
});
columns.push(column7);

// create the grid control
var grid = new dv.Grid(document.getElementById("grid"));
grid.theme = "gray";
// set the model
grid.model = new dv.ArrayModel(participants, columns, "index");

grid.allowAppend = false;
grid.allowCellSelect = false;

// render the grid control
grid.render();

grid.selectRows(0);

grid.rowRendered.addEventListener(function (sender, args)
{
    var kk = 0;
});

grid.rowSelected.addEventListener(function (sender, args)
{
    document.getElementById("row_index").value = args.row;
});

grid.rowDeleted.addEventListener(function (sender, args)
{
    document.getElementById("row_count").innerHTML = document.getElementById("row_index").max = sender.model.rowCount - 1;
});

grid.cellSelected.addEventListener(function (sender, args)
{
    document.getElementById("row_index").value = args.row;
});

document.getElementById("row_count").innerHTML = document.getElementById("row_index").max = participants.length - 1;
document.getElementById("row_index").addEventListener("change", function (e)
{
    grid.bringIntoView(+e.target.value).then(grid.selectRows(+e.target.value));
});

document.getElementById("edit_mode").addEventListener("change", function (e)
{
    grid.allowCellSelect = e.target.checked;

    if (e.target.checked && grid.selectedRowIndices.length)
    {
        grid.focusCell(grid.selectedRowIndices[0], 0);
    }
    else if (grid.selectedCells.length)
    {
        grid.selectRows(grid.selectedCells[0].row);
    }
});
