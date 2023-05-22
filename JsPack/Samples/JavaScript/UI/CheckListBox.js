/// <reference path="../Scripts/jspack-vsdoc.js" />
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;
var controls = MindFusion.Controls;
var myMap = new Map();
for (var i = 1; i <= 20; i++) {
    myMap.set(i-1, "option" + i.toString());
}
var checkbox1 = new ui.CheckListBox(document.querySelector("#checkbox1"));
checkbox1.theme = "gray";
checkbox1.values = myMap;
checkbox1.value = [5,10];
checkbox1.valueChanged.addEventListener(handleValueChanged);
checkbox1.render();

var MyFlagEnum = {
  None: 0,
  Top: 1 << 0,
  Left: 1 << 1,
  Bottom: 1 << 2,
  Right: 1 << 3,
  TopLeft: 1 << 4,
  TopRight: 1 << 5,
  BottomLeft: 1 << 6,
  BottomRight: 1 << 7,
  All: 255
};

var checkbox2 = new ui.CheckListBox(document.querySelector("#checkbox2"));
checkbox2.theme = "gray";
checkbox2.mode = ui.CheckListBoxType.Flags;
checkbox2.values = controls.DomUtils.reverseMap(new Map(Object.entries(MyFlagEnum)));
checkbox2.value = null;
checkbox2.valueChanged.addEventListener(handleValueChanged);
checkbox2.render();

var checkbox3 = new ui.CheckListPicker(document.querySelector("#checkbox3"));
checkbox3.theme = "gray";
checkbox3.values = controls.DomUtils.reverseMap(new Map(Object.entries(ui.TooltipPosition)));
checkbox3.value = ui.TooltipPosition.Right;
checkbox3.valueChanged.addEventListener(handleValueChanged);
checkbox3.render();


function handleValueChanged(sender, args)
{
    var infodiv = document.getElementById(sender.element.id + "-infotext");
    infodiv.innerHTML = args.newValue != null ? args.newValue.toString() : "";
}

document.getElementById("multiple").onchange = function ()
{
    ui.Picker.closePickers();
    checkbox1.multiple = checkbox2.multiple = checkbox3.multiple = document.getElementById("multiple").checked;
}

document.getElementById("theme").onchange = function ()
{
    checkbox1.theme = checkbox2.theme = checkbox3.theme = document.getElementById("theme").value;
}

