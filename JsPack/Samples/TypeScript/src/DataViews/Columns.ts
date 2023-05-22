import * as  dv from "@mindfusion/dataviews";
import * as  common from "@mindfusion/common";
import * as  ui from "@mindfusion/common-ui";

import  * as states from './states';
import  * as participants from './participants';

namespace Columns
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
    grid.theme = "blue";
    // set the model
    grid.model = new dv.ArrayModel(participants.default, columns, "index");

    // increment index when a new row is added
    grid.rowCreating.addEventListener((sender, args) =>
    {
        var maxIndex = sender.model.getMaxKey();
        args.rowData["index"] = ++maxIndex;
    });

    // render the grid control
    grid.render();
}