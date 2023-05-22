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

var column3 = new dv.GridColumn("state");
column3.dataType = dv.LookupType;
column3.caption = "State";
column3.metaData.set("values", states.map(s => [s["Name"]]));
columns.push(column3);

var column4 = new dv.GridColumn("registered");
column4.dataType = dv.DateType;
column4.caption = "Registered";
column4.editable = false;
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

// create the grid control
var grid = new dv.Grid(document.getElementById("grid"));

// set the model
grid.model = new dv.ArrayModel(participants, columns);


grid.customDrawHeader.addEventListener(function (sender, args)
{
    var div = document.createElement("div");
    div.style.backgroundColor = "darkcyan";
    div.style.color = "#fff";
    div.style.textAlign = "center";
    div.style.fontSize = "larger";
    div.style.padding = "10px 5px";
    div.style.borderRadius = "5px";

    if (args.column === 4 || args.column === 5)
    {
        var button = document.createElement("button");
        button.innerHTML = "&Sigma;";
        button.style.float = "left";
        button.addEventListener("click", (e) => { e.stopPropagation(); showSum(args.column) });
        div.appendChild(button);
    }

    div.appendChild(args.defaultContent);
    args.content = div;
});

grid.customDrawCell.addEventListener(function (sender, args)
{
    if (args.row === grid.model.rowCount) return;

    if (args.column === 1)
    {
        var div = document.createElement("div");
        div.style.backgroundColor = args.row % 2 === 0 ? "#fcf3c1" : "#f2fafe";
        div.style.textAlign = "center";
        div.style.fontSize = "larger";
        div.style.borderRadius = "5px";
        div.appendChild(args.defaultContent);
        args.content = div;
    }
    else if (args.column === 2)
    {
        var div = document.createElement("div");
        var a = document.createElement("a");
        a.href = "https://en.wikipedia.org/wiki/" + args.defaultContent.nodeValue;
        a.appendChild(args.defaultContent);
        div.appendChild(a);
        args.content = div;
    }
    else if (args.column === 3)
    {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = "../images/calendar.png";
        img.className = "circle-image";
        img.addEventListener("click", (e) =>
        {
            grid.selectCell(args.row, args.column);
            toggleCalendar(e, args.row, args.column)
        });
        div.appendChild(img);
        div.appendChild(args.defaultContent);
        args.content = div;
    }
    else if (args.column === 4)
    {
        var value = sender.model.value(args.row, 4);

        var div = document.createElement("div");
        for (var i = 0; i < Math.min(value, 26); i++)
        {
            var img = document.createElement("img");
            img.src = "../images/icon15.png";
            img.className = "circle-image-2";
            div.appendChild(img);
        }
        if (value > 26)
            div.appendChild(document.createTextNode("..."));
        div.title = value;
        args.content = div;
    }
})

grid.rowRendered.addEventListener(function (sender, args)
{
    var value = args.rowData["winnings"];

    if (value > 2000)
    {
        sender.getCellElement(args.row, 5).style.backgroundColor = "#FFDD75";
    }
})

function showSum(column)
{
    if (column === 4)
    {
        var tickets = participants.map(function (p) { return p.tickets });
        var total = tickets.reduce(function (acc, val) { return acc + val; });
        ui.Dialogs.showInfoDialog("Total tickets", "A whopping amount of total " + total + " tickets has been registered so far!", null, grid.element, grid.theme);
    }
    else 
    {
        var winnings = participants.map(function (p) { return p.winnings });
        var total = winnings.reduce(function (acc, val) { return acc + val; });
        ui.Dialogs.showInfoDialog("Total winnings", "A whopping amount of " +
            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total) + " has been won!", null, grid.element, grid.theme);
    }
}

function toggleCalendar(e, row, column)
{
    e.stopPropagation();

    if (calendar)
    {
        calendar.dispose();
        calendar = null;
        grid.element.removeEventListener("click", toggleCalendar);
    }
    else if (row != undefined)
    {
        grid.element.addEventListener("click", toggleCalendar);

        calendar = new ui.Calendar();
        calendar.setWidth("50%");
        calendar.setHeight("50%");
        calendar.setLeft("25%");
        calendar.setTop("25%");
        calendar.selectedDateChanged.addEventListener((sender, args) =>
        {
            grid.model.setValue(row, column, args.newValue);
            grid.refreshRows(row);
            calendar.dispose();
            calendar = null;
        })
        document.getElementById("content").appendChild(calendar.draw());
        calendar.attach();
    }
}

// render the grid control
grid.render();
grid.setColumnWidth(0, 100);

var calendar = null;