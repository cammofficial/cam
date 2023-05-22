import * as  dv from "@mindfusion/dataviews";
import * as  common from "@mindfusion/common";
import * as  ui from "@mindfusion/common-ui";
import * as  p from "@mindfusion/scheduling";

import  * as states from './states';
import  * as participants from './participants';

namespace CustomModel
{
    // create the grid columns
    var columns = [];

    var column0 = new dv.GridColumn("startTime");
    column0.dataType = dv.DateType;

    column0.caption = "Start";
    column0.metaData.set("customEditor", {
        "autoComplete": true,
        "allowEmptyInput": false
    });
    columns.push(column0);

    var column2 = new dv.GridColumn("subject");
    column2.dataType = dv.StringType;
    column2.caption = "Title";
    columns.push(column2);

    var column3 = new dv.GridColumn("location");
    column3.dataType = dv.LookupType;
    column3.caption = "Rank";
    column3.editable = false;
    columns.push(column3);

    // create the grid control
    var grid = new dv.Grid(<HTMLDivElement>document.getElementById("grid"));
    grid.theme = "peach";
    grid.setLeft("50%");
    grid.setWidth("50%");

    var calendar = new p.Calendar(<HTMLDivElement>document.getElementById("calendar"));
    calendar.theme = "peach";
    calendar.setWidth("50%");
    calendar.useForms = false;
    calendar.selection.allowMultiple = false;
    calendar.selectionEnd.addEventListener(handleSelectionEnd);

    getLocation("personal celebration");
    // fetch holiday data from public api
    getData();


    function handleSelectionEnd(sender, args)
    {
        ui.Dialogs.showInputDialog("New holiday on " + args.startTime.toString(sender.formatInfo.dateFormats.longDate, sender.formatInfo), 
        "Holiday title", (result, value) => { onHoliday(result, value, args); }, calendar.element, null, null, null, calendar.theme);
    }

    function onHoliday(result, value, args)
    {
        if (result === ui.ModalResult.OK)
        {
            var id = createEvent(args.startTime, args.endTime, value);
            bindGrid();
            grid.bringIntoView(grid.getKeyRow(id));
        }
    }

    function createEvent(start, end, title)
    {
        // create a new item with the start and end time of the selection
        var item = new p.Item();
        item.startTime = start;
        item.endTime = end;
        item.allDayEvent = true;
        item.subject = title || "";
        item.location = getLocation("personal celebration");
        calendar.schedule.items.add(item);
        return item.id;
    }

    function getData()
    {
        var url = 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/' + calendar.date.year + '/' + (+calendar.date.month + 1);

        fetch(url)
            .then(response => response.json())
            .then((data) =>
            {
                loadCalendar(data)
            })
            .catch(err => { throw err });
    }

    function loadCalendar(data)
    {
        // clear existing items from the calendar schedule
        calendar.schedule.items.clear();

        // traverse the json object returned by the api and create corresponding items in the calendar schedule
        for (var i = 0; i < data.length - 20; i++)
        {
            var date = p.DateTime.fromDateString(data[i].date);
            date = p.DateTime.fromDateParts(date.year, date.month, date.day, 0, 0, 0);

            var celebrations = data[i].celebrations;

            for (var k = 0; k < celebrations.length; k++)
            {
                var item = new p.Item();

                item.subject = celebrations[k].title;

                item.startTime = date;
                item.endTime = p.DateTime.addDays(date.clone(), 1);
                item.allDayEvent = true;

                // lock the item to disable interactive drag and resize
                item.locked = true;
                item.location = getLocation(celebrations[k].rank);
                item.cssClass = celebrations[k].colour;

                // add the item to the schedule items collection
                calendar.schedule.items.add(item);
            }
        }

        // render the calendar
        calendar.render();

        calendar.itemModified.addEventListener(bindGrid);

        columns[2].metaData.set("values", calendar.schedule.locations.toArray());
        bindGrid();
        grid.sortedColumn = 0;
        grid.rowRendered.addEventListener(onRowRendered);
        grid.render();
        grid.rowCreating.addEventListener(onRowCreating);
        grid.rowCreated.addEventListener(onRowCreated);
        grid.rowUpdating.addEventListener(onRowUpdating);
        grid.rowUpdated.addEventListener(onRowUpdated);
        grid.rowDeleting.addEventListener(onRowUpdating);
        grid.rowDeleted.addEventListener(onRowDeleted);
    }


    function onRowRendered(sender, args)
    {
        var item = args.rowData;//sender.model.getRowData(args.row);

        if (item.locked)
        {
            sender.getRowElement(args.row).style.backgroundColor = "#f5f5f5";
            sender.getRowElement(args.row).style.color = "#bbb";
        }
        else
            sender.getRowElement(args.row).style.backgroundColor = "#fff";
    }

    function onRowCreating(sender, args)
    {
        var date = new p.DateTime(args.rowData.startTime);
        date = p.DateTime.fromDateParts(date.year, date.month, date.day, 0, 0, 0);
        args.rowData.startTime = date;

        var id = createEvent(date, p.DateTime.addDays(date.clone(), 1), "");
        args.rowData["id"] = id;
    }
    function onRowCreated(sender, args)
    {
        bindGrid();
    }
    function onRowUpdating(sender, args)
    {
        args.cancel = args.rowData.locked;
    }
    function onRowUpdated(sender, args)
    {
        args.rowData.endTime = p.DateTime.addDays(args.rowData.startTime.clone(), 1);
        calendar.repaint(true);
    }
    function onRowDeleted(sender, args)
    {
        var itemId = args.oldValues.get("_id");
        var item = calendar.schedule.items.find((i) => i.id == itemId);
        calendar.schedule.items.remove(item);
    }

    function bindGrid()
    {
        grid.model = new CustomModel(calendar.schedule.items.toArray().slice(0), columns, "id");
    }

    function getLocation(name)
    {
        var location = calendar.schedule.locations.where(function (item) { return (item.name === name) }).items()[0];

        // create a new location object and add it to the schedule's location collection
        if (!location)
        {
            location = new p.Location();
            location.name = name;
            calendar.schedule.locations.add(location);
        }
        return location;
    }

    class CustomModel extends dv.ArrayModel
    {
        /**
        * Gets the value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {Object} The value.
        */
        value(row, column)
        {
            var value = super.value(row, column);

            if (this.columnType(column) === dv.DateType)
            {
                if (value != undefined && value instanceof p.DateTime)
                    return value.getDate();
            }
            return value;
        }

        /**
        * Sets a value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @param {Object} value The value.
        */
        setValue(row, column, value)
        {
            if (this.columnType(column) === dv.DateType)
            {
                if (value != undefined && value instanceof Date)
                    value = new p.DateTime(value);
            }
            super.setValue(row, column, value);
        }
    }
}