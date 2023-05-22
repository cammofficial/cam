/// <reference path="../Scripts/jspack-vsdoc.js" />

var m = MindFusion.Mapping;

// create a new instance of the mapView 
view = new m.MapView(document.getElementById("mapView"));

var l = new m.MapLayer();
l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
view.layers.add(l);

var mark = new m.Marker();
mark.location = new m.LatLong(51.505, -0.09);
view.decorations.add(mark);

view.load(new m.LatLong(51.505, -0.09), 10);

document.getElementById("theme").onchange = function () {
	view.theme = document.getElementById("theme").value;
}

