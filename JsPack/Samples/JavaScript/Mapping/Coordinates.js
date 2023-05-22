/// <reference path="../Scripts/jspack-vsdoc.js" />

var m = MindFusion.Mapping;
var d = MindFusion.Drawing;

// try to obtain the user's position by using the HTML Geolocation API. If this fails, load the map with a default location.
function getLocation()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(loadMap);
	}
	else
		loadMap(null);
}

getLocation();

var menu;

function loadMap(position)
{
	// create a list with possible locations
	var dataList = [
		{ location: new m.LatLong(-22.951916, -43.210487), text: "Rio de Janeiro, Brazil" },
		{ location: new m.LatLong(41.89021, 12.492231), text: "Rome, Italy" },
		{ location: new m.LatLong(29.979235, 31.134202), text: "Giza, Egypt" },
		{ location: new m.LatLong(40.6892746, -74.04455589999998), text: "New York, USA" },
		{ location: new m.LatLong(-33.856536, 151.214996), text: "Sydney, Australia"}]

	// add the user location
	if (position)
		dataList.unshift({ location: new m.LatLong(position.coords.latitude, position.coords.longitude), text: "Your location" });

	var option;
	for (var i = 0; i < dataList.length; i++)
	{
		option = document.createElement("option");
		option.innerHTML = dataList[i].text;
		option.value = i;
		document.getElementById("center").appendChild(option);
	}

	document.getElementById("center").onchange = function (e)
	{
		var center = dataList[e.target.value].location;
		view.panTo(center);
	}

	// create a new instance of the mapView
	var view = new m.MapView(document.getElementById("mapView"));
	view.theme = "light";

	// create a map layer
	var l = new m.MapLayer("Map");
	l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
	l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
	view.layers.add(l);

	// load the map
	view.load(dataList[0].location, 8);

	view.hover.addEventListener(handleHover);
	view.click.addEventListener(handleClick);
}

function handleHover(sender, args)
{
	// monitor map data
	document.getElementById("centerLat").value = sender.mapCenter.latitude;
	document.getElementById("centerLong").value = sender.mapCenter.longitude;

	document.getElementById("currentLat").value = args.location.latitude;
	document.getElementById("currentLong").value = args.location.longitude;

	document.getElementById("currentX").value = args.position.x;
	document.getElementById("currentY").value = args.position.y;

	document.getElementById("scrollX").value = sender.scrollX;
	document.getElementById("scrollY").value = sender.scrollY;
}

function handleClick(sender, args)
{
	// scroll the map to the position of the mouse click
	var center = args.position;
	sender.scrollTo(center);
}
