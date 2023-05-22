/// <reference path="../Scripts/jspack-vsdoc.js" />
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

var picker0 = new ui.ImagePicker(document.getElementById("picker0"));
picker0.setLeft("30px");
picker0.theme = "blue";
picker0.render();

var picker1 = new ui.ImagePicker(document.getElementById("picker1"));
picker1.theme = "blue";
picker1.setLeft("30px");
picker1.itemSize = common.Unit.pixel(100);
picker1.dropdownHeight = common.Unit.pixel(360);
var imgSrcs = ["../images/screenshots/Activities.png",
    "../images/screenshots/Chat.png",
    "../images/screenshots/DomInspector.png",
    "../images/screenshots/FlipMatch.png",
    "../images/screenshots/Observatories.png",
    "../images/screenshots/ServerLoad.png",
    "../images/screenshots/TemperatureLog.png",
    "../images/screenshots/WorldPopulation.png"];
var imageList;
ui.ImagePicker.loadImageList(imgSrcs).then(response =>
{
    picker1.imageList = response;
    picker1.imageIndex = 1;
    picker2.value = response[0];
});
picker1.render();

var picker2 = new ui.ImagePicker(document.getElementById("picker2"));
picker2.setLeft("30px");
picker2.setWidth("200px");
picker2.setHeight("200px");
picker2.buttonStyle = ui.PickerButtonStyle.Inline;
picker2.render();