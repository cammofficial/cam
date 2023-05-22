/// <reference path="../Scripts/jspack-vsdoc.js" />

var m = MindFusion.Mapping;
var d = MindFusion.Drawing;

// create a new instance of the mapView
var view = new m.MapView(document.getElementById("mapView"));
view.theme = "business";
view.cssClass = "interactive";

// add a new map layer
var l = new m.MapLayer("Map");
l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
view.layers.add(l);
view.load(new m.LatLong(41.904755, 12.454628), 16);

view.click.addEventListener(handleClick);
view.decorationClick.addEventListener(handleDecorationClick);

var option = document.createElement("option");
option.innerHTML = "default";
option.value = "";
document.getElementById("markerType").appendChild(option);

option = document.createElement("option");
option.innerHTML = "house";
option.value = "marker-house";
document.getElementById("markerType").appendChild(option);

option = document.createElement("option");
option.innerHTML = "question";
option.value = "marker-question";
document.getElementById("markerType").appendChild(option);

option = document.createElement("option");
option.innerHTML = "triangle";
option.value = "marker-triangle";
document.getElementById("markerType").appendChild(option);

function handleClick(sender, args)
{
	if (args.rawEventArgs.button == 0)
	{
		// create a new marker decoration
		var mark = new m.Marker(args.location);

		var mtype = document.getElementById("markerType").value;
		if (mtype == "marker-question")
			mark.imageSrc = "images/question.png";
		if (mtype == "marker-house")
			mark.imageSrc = "images/icon_home.png";
		mark.cssClass = mtype;
		view.decorations.add(mark);

		var text = document.getElementById("bubbleText").value;
		// create a new bubble decoration
		if (text != "")
		{
			var bubble = new m.Bubble(args.location);
			bubble.text = document.getElementById("bubbleText").value;
			bubble.offset = new d.Point(0, -30);
			view.decorations.add(bubble);
		}
	}
}


function handleDecorationClick(sender, args)
{
	// remove the clicked decoration
	view.decorations.remove(args.decoration);
}