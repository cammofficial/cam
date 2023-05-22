/// <reference path="../Scripts/jspack-vsdoc.js" />
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var dp = new ui.DateTimePicker(document.querySelector("#datePicker1"));
dp.theme = "gray";
dp.stateChanged.addEventListener(handleStateChanged);
dp.valueChanged.addEventListener(handleValueChanged);
dp.render();

var tp = new ui.DateTimePicker(document.querySelector("#timePicker1"));
tp.theme = "gray";
tp.interval = 3600000 / 2;
tp.minTime = 3600000 * 7;
tp.maxTime = 3600000 * 18;
tp.mode = ui.DateTimePickerMode.Time;
tp.stateChanged.addEventListener(handleStateChanged);
tp.valueChanged.addEventListener(handleValueChanged);
tp.render();

var dtp = new ui.DateTimePicker(document.querySelector("#dateTimePicker1"));
dtp.theme = "gray";
dtp.minTime = 3600000 * 7;
dtp.maxTime = 3600000 * 18;
dtp.mode = ui.DateTimePickerMode.DateTime;
dtp.stateChanged.addEventListener(handleStateChanged);
dtp.valueChanged.addEventListener(handleValueChanged);
dtp.render();

var calendar = new ui.Calendar(document.querySelector("#cal"));
calendar.theme = "gray";

calendar.selectedDateChanged.addEventListener(handleValueChanged);
calendar.render();
calendar.span = ui.TimeUnit.Decade;

var tooltip1 = new ui.Tooltip(document.querySelector("#datePicker1").parentNode, "Please enter a valid date.");
tooltip1.position = ui.TooltipPosition.Right;
tooltip1.trigger = ui.TooltipTrigger.None;
tooltip1.theme = "pastel";
tooltip1.render();

function handleValueChanged(sender, args)
{
    if (sender == calendar)
    {
        dp.value = tp.value = dtp.value = args.newValue;
    }
    else
    {
        var infodiv = document.getElementById(sender.element.id + "-infotext");
        infodiv.innerHTML = args.newValue;
    }
}

function handleStateChanged(sender, args)
{
    if (args.newValue == ui.ValidationState.Invalid)
    {
        tooltip1.target = sender.element.parentNode;
        tooltip1.show();
    }
    else
        tooltip1.hide();
}

document.getElementById("buttonStyle").onchange = function ()
{
    ui.Picker.closePickers();
    dp.buttonStyle = tp.buttonStyle = dtp.buttonStyle = +document.getElementById("buttonStyle").value;
}

document.getElementById("clearButtonStyle").onchange = function ()
{
    ui.Picker.closePickers();
    dp.clearButtonStyle = tp.clearButtonStyle = dtp.clearButtonStyle = +document.getElementById("clearButtonStyle").value;
}

document.getElementById("autoComplete").onchange = function ()
{
    ui.Picker.closePickers();
    dp.autoComplete = tp.autoComplete = dtp.autoComplete = document.getElementById("autoComplete").checked;
}

document.getElementById("locale").onchange = function ()
{
    ui.Picker.closePickers();
    var locale = document.getElementById("locale").value;
    var url = 'https://unpkg.com/cldr-dates-full/main/' + locale + '/ca-gregorian.json';

    fetch(url)
        .then(response => response.json())
        .then((data) =>
        {
            var localeObj = new common.Locale(locale);
            localeObj.fromJson(JSON.stringify(data));
            localeObj.dateFormats.shortDate = localeObj.dateFormats.shortDate.replace("yy", "yyyy");

            dp.locale = tp.locale = dtp.locale = calendar.locale = localeObj;
        })
        .catch(err => { throw err });
}


document.getElementById("theme").onchange = function ()
{
    dp.theme = tp.theme = dtp.theme = calendar.theme = document.getElementById("theme").value;
}