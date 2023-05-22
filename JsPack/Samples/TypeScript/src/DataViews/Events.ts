import * as  dv from "@mindfusion/dataviews";
import * as  common from "@mindfusion/common";
import * as  ui from "@mindfusion/common-ui";

import  * as states from './states';
import  * as participants from './participants';

namespace Events
{

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
    column3.metaData.set("values", states.default.map(s => [s["Name"]]));
    columns.push(column3);

    var locale = common.Locale.default();
    locale.dateSettings.dateFormats.shortTime = "h:mm:ss tt";
    locale.dateSettings.dateFormats.shortDateTime = "MM/d/yyyy h:mm:ss tt";
    var column4 = new dv.GridColumn("registered");
    column4.dataType = dv.DateTimeType;
    column4.caption = "Registered";
    column4.metaData.set("customEditor", {
        autoComplete: false,
        allowEmptyInput: false,
        locale: locale
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
    var imgSrcs = ["../assets/client.png", "../assets/data_server.png", "../assets/network_server.png", "../assets/web_server.png"];
    var imageList;
    ui.ImagePicker.loadImageList(imgSrcs).then(response =>
    {
        imageList = response;
        column7.metaData.set("customEditor", { "imageList": imageList, "width": common.Unit.pixel(100), "itemSize": common.Unit.pixel(50) });
    });
    columns.push(column7);

    // create the grid control
    var grid = new dv.Grid(<HTMLDivElement>document.getElementById("grid"));
    grid.height = common.Unit.percentage(60);
    grid.theme = "green";
    // set the model
    grid.model = new dv.ArrayModel(participants.default, columns, "index");

    grid.cellFocusing.addEventListener((sender, args) =>
    {
        if ((<HTMLInputElement>document.getElementById("cancelFocusing")).checked)
        {
            args.cancel = true;
            return;
        }
        var value = sender.effectiveModel.value(args.row, args.column);
        showData("cellFocusing", args.row, { cellValue: value });
    });
    grid.cellFocused.addEventListener((sender, args) =>
    {
        var value = sender.effectiveModel.value(args.row, args.column);
        showData("cellFocused", args.row, { cellValue: value })
    });

    grid.rowSelecting.addEventListener((sender, args) =>
    {
        if ((<HTMLInputElement>document.getElementById("cancelSelecting")).checked)
        {
            args.cancel = true;
            return;
        }

        showData("rowSelecting", args.row, args.rowData);
    });
    grid.rowSelected.addEventListener((sender, args) =>
    {
        showData("rowSelected", args.row, args.rowData)
    });

    grid.rowCreating.addEventListener((sender, args) =>
    {
        if ((<HTMLInputElement>document.getElementById("cancelCreating")).checked)
        {
            args.cancel = true;
            return;
        }

        showData("rowCreating", args.row, args.rowData);

        var maxIndex = sender.model.getMaxKey();
        args.rowData["index"] = ++maxIndex;
        args.rowData["registered"] = new Date();
    });

    grid.rowCreated.addEventListener((sender, args) =>
    {
        showData("rowCreated", args.row, args.rowData)
    });
    grid.rowUpdating.addEventListener((sender, args) =>
    {
        if ((<HTMLInputElement>document.getElementById("cancelUpdating")).checked)
        {
            args.cancel = true;
            return;
        }
        showData("rowUpdating", args.row, args.rowData)
    });
    grid.rowUpdated.addEventListener((sender, args) =>
    {
        showData("rowUpdated", args.row, args.rowData)
    });
    grid.rowDeleting.addEventListener((sender, args) =>
    {
        if ((<HTMLInputElement>document.getElementById("cancelDeleting")).checked)
        {
            args.cancel = true;
            return;
        }
        showData("rowDeleting", args.row, args.rowData)
    });
    grid.rowDeleted.addEventListener((sender, args) =>
    {
        showData("rowDeleted", args.row, args.rowData)
    });

    // render the grid control
    grid.render();

    function showData(message, row, rowData)
    {
        var data = "";
        Object.keys(rowData).forEach(function (key)
        {
            var val = rowData[key];
            if (val !== undefined)
                data += key + "=" + val + "|";
        });
        document.getElementById("data").innerHTML += ">>> " + message + " [" + data + "]" + "</br>";
    }

    document.getElementById("clearData").onclick = () =>
    {
        document.getElementById("data").innerHTML = "";
    };
}