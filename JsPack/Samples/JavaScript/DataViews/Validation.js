var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;

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


var column4 = new dv.GridColumn("registered");
column4.dataType = dv.DateType;
column4.caption = "Registered";
column4.metaData.set("customEditor", {});
columns.push(column4);

var column5 = new dv.GridColumn("tickets");
column5.dataType = dv.IntegerType;
column5.caption = "Tickets";
columns.push(column5);

var column6 = new dv.GridColumn("winnings");
column6.dataType = dv.CurrencyType;
column6.caption = "Winnings";
columns.push(column6);


// create the grid control
var grid = new dv.Grid(document.getElementById("grid"));
grid.theme = "business";
// set the model
grid.model = new dv.ArrayModel(participants.slice(0, 10000), columns, "index");

grid.rowCreating.addEventListener((sender, args) =>
{
    var maxIndex = sender.model.getMaxKey();
    args.rowData["index"] = ++maxIndex;
    args.rowData["registered"] = new Date();
    args.rowData["tickets"] = 0;
    args.rowData["winnings"] = 0;
});

grid.rowCreated.addEventListener((sender, args) =>
{
    validateData(args.newValues, args.row);
});

grid.rowUpdated.addEventListener((sender, args) =>
{
    validateData(args.newValues, args.row);
});

grid.rowRendered.addEventListener((sender, args) =>
{
    if (args.row < sender.model.rowCount)
        validateData(new Map(Object.entries(args.rowData)), args.row);
});


function validateData(values, row)
{
    if (values.has("name"))
    {
        var nameVal = values.get("name");
        validateCell(row, 1, (nameVal == undefined || nameVal.length < 3));
    }

    if (values.has("registered"))
    {
        var registeredVal = values.get("registered");
        var dateVal = registeredVal instanceof Date ? registeredVal : new Date(registeredVal);
        validateCell(row, 2, (registeredVal == undefined || isNaN(dateVal) || dateVal.valueOf() > new Date().valueOf()));
    }

    if (values.has("tickets"))
    {
        var ticketsVal = values.get("tickets");
        validateCell(row, 3, (ticketsVal == undefined || ticketsVal < 1 || ticketsVal > 99));
    }

    if (values.has("winnings"))
    {
        var winningsVal = values.get("winnings");
        validateCell(row, 4, (winningsVal == undefined || winningsVal < 1000 || winningsVal > 10000));
    }
}

var tooltipTexts = [
    "Name is required and should be at least 3 characters long.",
    "Register date is required and should not be in the future.",
    "Tickets field is required and should be between 1 and 99.",
    "Winnings field is required and should be between 1000 and 10000."
];

function validateCell(row, column, invalid)
{
    var cell = grid.getCellElement(row, column);
    if (cell)
    {
        if (invalid)
        {
            cell.dataset.invalid = true;
            if (!cell.dataset.tooltip)
            {
                var tooltip = new ui.Tooltip(cell, tooltipTexts[column - 1]);
                tooltip.theme = "peach";
                tooltip.position = ui.TooltipPosition.Bottom;
                tooltip.render();
                cell.dataset.tooltip = tooltip.element.id;
            }
        }
        else
        {
            delete cell.dataset.invalid;
            if (cell.dataset.tooltip)
            {
                var tooltip = ui.Tooltip.find(cell.dataset.tooltip);
                tooltip.dispose();
                delete cell.dataset.tooltip;
            }
        }
    }
}

// render the grid control
grid.render();
