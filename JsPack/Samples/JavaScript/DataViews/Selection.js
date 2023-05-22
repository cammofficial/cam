var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;


var selectedParticipants = [];

class SelectCommand
{
    get name() { return "Select"; }

    get eventName() { return "change"; }

    createControl(sender, args)
    {
        var control = document.createElement("input");
        control.type = "checkbox";
        control.checked = selectedParticipants.map(p => { return p.index }).includes(args.rowData.index);
        return control;
    }
}


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

var column7 = new dv.GridColumn();
column7.dataType = dv.CommandType;
column7.metaData.set("commands", [new SelectCommand()]);
columns.push(column7);

var columns2 = [column2, column3, column6];

// create the grid control
var grid = new dv.Grid(document.getElementById("grid"));
grid.width = common.Unit.percentage(50);
grid.theme = "standard";
// set the model
grid.model = new dv.ArrayModel(participants, columns);

// increment index when a new row is added
grid.rowCreating.addEventListener((sender, args) =>
{
    var maxIndex = sender.model.getMaxKey();
    args.rowData["index"] = ++maxIndex;
});

grid.customDrawHeader.addEventListener(function (sender, args)
{
    if (args.column === 6)
    {
        var div = document.createElement("div");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.float = "left";
        checkbox.checked = participants.length === selectedParticipants.length;
        checkbox.addEventListener("change", (e) => { toggleSelection(e) });
        div.appendChild(checkbox);
        div.appendChild(args.defaultContent);
        args.content = div;
        return;
    }
});

grid.rowCommand.addEventListener(function (sender, args)
{
    if (args.control.checked)
        selectedParticipants.push(args.rowData);
    else
        selectedParticipants.splice(selectedParticipants.indexOf(args.rowData), 1);
    grid2.rebind();
}
);

grid.rowUpdated.addEventListener(function (sender, args)
{
    grid2.rebind();
}
);

// render the grid control
grid.render();

// create the grid control
var grid2 = new dv.Grid(document.getElementById("grid2"));
grid2.theme = "pastel";
grid2.width = common.Unit.percentage(50);
grid2.allowAppend = false;
grid2.allowDelete = false;
grid2.allowEdit = false;
grid2.allowCellSelect = false;
// set the model
grid2.model = new dv.ArrayModel(selectedParticipants, columns2);
grid2.render();

grid2.element.addEventListener("keydown", (e) =>
{
    if (e.keyCode == 46)
    {
        var i = grid2.selectedRowIndices.length;
        while (i--) {
            grid2.removeRows(grid2.selectedRowIndices[i]);
        }
        grid.refresh();
    }
})


function toggleSelection(e)
{
    selectedParticipants.splice(0, selectedParticipants.length);
    if (e.target.checked)
        selectedParticipants.push(...participants);
    grid.refresh();
    grid2.rebind();
}