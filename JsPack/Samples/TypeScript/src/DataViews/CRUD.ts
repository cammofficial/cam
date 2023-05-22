import * as  dv from "@mindfusion/dataviews";
import * as  common from "@mindfusion/common";
import * as  ui from "@mindfusion/common-ui";

import  * as states from './states';
import  * as participants from './participants';

namespace CRUD
{

    // define a delete command, that shows a confirmation dialog before deleting the record
    class ConfirmDeleteCommand extends dv.Command
    {
        static get commandName() { return "Delete"; }

        static createControl(sender, args)
        {
            var control = document.createElement("button");
            control.innerHTML = "Delete";
            if (args.row === editRow)
                control.style.display = "none";
            return control;
        }
    }
    // define an edit command, that sets a record in edit mode
    class EditCommand extends dv.Command
    {
        static get commandName() { return "Edit"; }

        static createControl(sender, args)
        {
            var control = document.createElement("button");
            control.innerHTML = "Edit";
            if (args.row === editRow)
                control.style.display = "none";
            return control;
        }

    };
    // define a save command
    class SaveCommand extends dv.Command
    {
        static get commandName() { return "Save"; }

        static createControl(sender, args)
        {
            var control = document.createElement("button");
            control.innerHTML = "Save";
            if (args.row === editRow)
                control.style.display = "inline";
            else
                control.style.display = "none";
            return control;
        }
    };
    // define a cancel command
    class CancelCommand extends dv.Command
    {
        static get commandName() { return "Cancel"; }

        static createControl(sender, args)
        {
            var control = document.createElement("button");
            control.innerHTML = "Cancel";
            if (args.row === editRow)
                control.style.display = "inline";
            else
                control.style.display = "none";
            return control;
        }
    };

    // create the grid columns
    var columns = [];

    var column0 = new dv.GridColumn();
    column0.dataType = dv.CommandType;
    column0.metaData.set("commands", [ConfirmDeleteCommand, EditCommand, SaveCommand, CancelCommand]);
    columns.push(column0);

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
    grid.theme = "business";

    // set the model
    grid.model = new dv.ArrayModel(participants.default, columns, "index");

    // disable inplace editing
    grid.allowEdit = false;
    // do not show "New row" option in context menu
    grid.allowAppend = false;
    // do not show "Delete Row" option in context menu
    grid.allowDelete = false;
    // disable single cell selection
    grid.allowCellSelect = false;

    grid.customDrawHeader.addEventListener(function (sender, args)
    {
        if (args.column === 0)
        {
            var button = document.createElement("button");
            button.innerText = "Add row";
            button.addEventListener("click", onAddClick.bind(sender));
            args.content = button;
        }
    })

    // render the grid control
    grid.render();

    // set column widths
    grid.setColumnWidth(0, 150);
    grid.setColumnWidth(1, 100);

    var editRow = null;
    var initialData = null;

    grid.rowCommand.addEventListener(function (sender, args)
    {
        switch (args.commandName)
        {
            case "Delete": {
                ui.Dialogs.showConfirmDialog("Confirm", "Delete record?", function (result)
                {
                    if (result == ui.ModalResult.OK)
                    {
                        grid.removeRows(this.row);
                    }
                }.bind(args), sender.element, grid.theme);
                args.cancel = true;
                break;
            }
            case "Edit": {
                editRow = args.row;
                initialData = Object.assign({}, grid.model.getRowData(editRow));

                grid.refreshRows(editRow);

                grid.allowEdit = true;
                grid.allowCellSelect = true;

                grid.focusCell(editRow, 0);
                setEditMode();
                break;
            }
            case "Save": {
                grid.allowEdit = false;
                grid.allowCellSelect = false;

                grid.getRowElement(editRow).style.outline = "";
                grid.selectRows(editRow);
                grid.element.style.pointerEvents = "all";

                editRow = null;
                initialData = null;

                grid.refresh(true);
                break;
            }
            case "Cancel": {
                if (initialData)
                {
                    for (var c = 0; c < sender.model.columnCount; c++)
                    {
                        sender.model.setValue(editRow, c, initialData[sender.model.columnName(c)]);
                    }

                    grid.getRowElement(editRow).style.outline = "";
                    grid.selectRows(editRow);
                    editRow = null;
                    grid.refresh(true);
                }
                else
                {
                    grid.removeRows(editRow);
                    editRow = null;
                }

                initialData = null;
                grid.allowEdit = false;
                grid.allowCellSelect = false;
                grid.element.style.pointerEvents = "all";
                break;
            }
        }
    });

    function onAddClick(sender)
    {
        grid.allowEdit = true;
        grid.allowCellSelect = true;

        var data = grid.model.getRowData(grid.model.rowCount);
        var maxIndex = (<dv.ArrayModel>grid.model).getMaxKey();
        data.index = ++maxIndex;

        grid.addRow(data).then((newRow) =>
        {
            editRow = newRow;
            grid.refreshRows(newRow);
            setEditMode();
        });
    }

    function setEditMode()
    {
        grid.element.style.pointerEvents = "none";
        grid.getRowElement(editRow).style.pointerEvents = "all";
        grid.getRowElement(editRow).style.outline = "#4CAF50 solid 2px";
    }
}