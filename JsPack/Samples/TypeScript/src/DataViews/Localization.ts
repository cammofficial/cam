import * as  dv from "@mindfusion/dataviews";
import * as  common from "@mindfusion/common";
import * as  ui from "@mindfusion/common-ui";

import  * as states from './states';
import  * as participants from './participants';


namespace Localization
{
    document.getElementById("locale").onchange = function ()
    {
        localize((<HTMLInputElement>document.getElementById("locale")).value, (<HTMLInputElement>document.getElementById("customEditor")).checked);
    }

    document.getElementById("customEditor").onchange = function ()
    {
        localize((<HTMLInputElement>document.getElementById("locale")).value, (<HTMLInputElement>document.getElementById("customEditor")).checked);
    }

    function localize(locale, customEditor)
    {
        var currency = "USD";
        if (locale == "de") currency = "EUR";
        if (locale == "ru") currency = "RUB";

        var useGrouping = locale != "en";

        grid.model.columnMetaData(2).set("format", {
            locales: locale,
            options: { useGrouping: useGrouping }
        });

        grid.model.columnMetaData(3).set("format", {
            locales: locale,
            options: { currency: currency }
        });

        if (customEditor)
        {
            var url = 'https://unpkg.com/cldr-dates-full/main/' + locale + '/ca-gregorian.json';

            fetch(url)
                .then(response => response.json())
                .then((data) =>
                {
                    var localeObj = new common.Locale(locale);
                    localeObj.fromJson(JSON.stringify(data));
                    localeObj.dateFormats.shortDate = localeObj.dateFormats.shortDate.replace("yy", "yyyy");

                    grid.model.columnMetaData(1).set("customEditor", {
                        "autoComplete": true,
                        "allowEmptyInput": true,
                        "locale": localeObj
                    });

                    grid.refresh();
                })
                .catch(err => { throw err });
        }
        else
        {
            grid.model.columnMetaData(1).delete("customEditor");
            grid.model.columnMetaData(1).set("format", {
                locales: locale
            });
            grid.refresh();
        }
    }


    var columns = [];

    var column2 = new dv.GridColumn("name");
    column2.dataType = dv.StringType;
    column2.caption = "String";
    columns.push(column2);

    var column4 = new dv.GridColumn("registered");
    column4.dataType = dv.DateType;
    column4.caption = "Date";
    columns.push(column4);

    var column5 = new dv.GridColumn("tickets");
    column5.dataType = dv.IntegerType;
    column5.caption = "Integer";
    columns.push(column5);

    var column6 = new dv.GridColumn("winnings");
    column6.dataType = dv.CurrencyType;
    column6.caption = "Currency";
    columns.push(column6);

    for (var i = 0; i < participants.default.length; i++)
    {
        participants.default[i]["tickets"] = participants.default[i]["tickets"] * 1000;
    }

    // create the grid control
    var grid = new dv.Grid(<HTMLDivElement>document.getElementById("grid"));
    grid.theme = "earth";
    // set the model
    grid.model = new dv.ArrayModel(participants.default, columns);

    // increment index when a new row is added
    grid.rowCreating.addEventListener((sender, args) =>
    {
        var maxIndex = sender.model.getMaxKey();
        args.rowData["index"] = ++maxIndex;
    });

    localize("en", false);

    // render the grid control
    grid.render();


}