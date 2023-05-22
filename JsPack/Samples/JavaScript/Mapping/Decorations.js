/// <reference path="../Scripts/jspack-vsdoc.js" />

var m = MindFusion.Mapping;
var d = MindFusion.Drawing;

// create a new instance of the mapView
var view = new m.MapView(document.getElementById("mapView"));
view.theme = "standard";

// add a map layer
var l = new m.MapLayer("Map");
l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';
view.layers.add(l);

// add a second map layer
var l = new m.MapLayer("Map2");
l.urlTemplate = "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg";
l.attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
view.layers.add(l);

// add a decoration layer for marker images
var markers = new m.DecorationLayer("Images");
markers.visible = false;
view.layers.add(markers);

// create some markers with images
var mark = new m.Marker(new m.LatLong(-22.951916, -43.210487));
mark.imageSrc = "./images/christ_redeemer.png";
mark.text = "Christ the Redeemer";
markers.decorations.add(mark);

mark = new m.Marker();
mark.location = new m.LatLong(41.89021, 12.492231);
mark.imageSrc = "./images/colosseum100.png";
mark.text = "Colloseum";
mark.offset = new d.Point(0, 50);
markers.decorations.add(mark);

mark = new m.Marker();
mark.location = new m.LatLong(29.979235, 31.134202);
mark.imageSrc = "./images/egypt100.png";
mark.text = "Great Pyramid of Giza";
mark.offset = new d.Point(0, 50);
markers.decorations.add(mark);

mark = new m.Marker();
mark.location = new m.LatLong(40.6892746, -74.04455589999998);
mark.imageSrc = "./images/liberty100.png";
mark.text = "Statue of liberty";
markers.decorations.add(mark);

mark = new m.Marker();
mark.location = new m.LatLong(-33.856536, 151.214996);
mark.imageSrc = "./images/sydney_opera.png";
mark.text = "Sydney opera";
markers.decorations.add(mark);

// add a decoration layer for marker pins
var pins = new m.DecorationLayer("Pins");
pins.visible = true;
view.layers.add(pins);

// create some markers with default css styling
markers.decorations.forEach(
		function (mark)
		{
			this.decorations.add(new m.Marker(mark.location));

		}, pins);


// add a decoration layer for info bubbles
var bubbles = new m.DecorationLayer("Info bubbles");
bubbles.visible = false;
view.layers.add(bubbles);

// create some bubbles showing an HTML string
var bubble = new m.Bubble(new m.LatLong(-22.951916, -43.210487));
bubble.text = "<p>Christ the Redeemer</p>The statue weighs 635 metric tons (625 long, 700 short tons), </br> and is located at the peak of the 700-metre (2,300 ft) Corcovado mountain </br> in the Tijuca Forest National Park overlooking the city of Rio de Janeiro. </br> A symbol of Christianity across the world, the statue has also become a cultural icon </br> of both Rio de Janeiro and Brazil, and is listed as one of the New 7 Wonders of the World.";
bubbles.decorations.add(bubble);

bubble = new m.Bubble(new m.LatLong(41.89021, 12.492231));
bubble.text = "<p>Colloseum</p>The Colosseum's original Latin name was Amphitheatrum Flavium, often anglicized </br> as Flavian Amphitheatre. The building was constructed by emperors of </br> the Flavian dynasty, following the reign of Nero.</br> This name is still used in modern English, but generally the structure </br> is better known as the Colosseum.";
bubbles.decorations.add(bubble);

bubble = new m.Bubble(new m.LatLong(29.979235, 31.134202));
bubble.text = "<p>Great Pyramid of Giza</p><p class='b-wrap'>The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex bordering what is now El Giza, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.</p>";
bubbles.decorations.add(bubble);

bubble = new m.Bubble(new m.LatLong(40.6892746, -74.04455589999998));
bubble.text = "<p>Statue of liberty</p><p class='b-wrap'>The Statue of Liberty is a figure of Libertas, a robed Roman liberty goddess. She holds a torch above her head with her right hand, and in her left hand carries a tabula ansata inscribed in Roman numerals with JULY IV MDCCLXXVI (July 4, 1776), the date of the U.S. Declaration of Independence.</p>";
bubbles.decorations.add(bubble);

bubble = new m.Bubble(new m.LatLong(-33.856536, 151.214996));
bubble.text = "<p>Sydney opera</p><p class='b-wrap'>The Sydney Opera House is a multi-venue performing arts centre in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings</p>";
bubbles.decorations.add(bubble);

// add a decoration layer for caption bubbles
var captions = new m.DecorationLayer("Captions");
captions.visible = false;
view.layers.add(captions);

// create some bubbles showing a one-line text
var caption;
markers.decorations.forEach(
		function (mark)
		{
			var caption = new m.Bubble(mark.location, mark.text);
			caption.cssClass = "caption";
			caption.multiline = false;
			caption.offset = new d.Point(0, 30);
			this.decorations.add(caption);

		}, captions);

// set the topmost map layer
view.activeLayer = view.mapLayers.items()[0];

// load all layers
view.load(new m.LatLong(0, 0), 2);

document.getElementById("theme").onchange = function ()
{
	view.theme = document.getElementById("theme").value;
}
