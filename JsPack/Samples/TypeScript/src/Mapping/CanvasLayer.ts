
import * as m from '@mindfusion/mapping';
import * as d from '@mindfusion/drawing';

var points = [
    new m.LatLong(3.5308084104036523, -75.68240577939847),
    new m.LatLong(3.203158862432781, -75.64670021299222),
    new m.LatLong(2.89597766664142, -75.43246681455472),
    new m.LatLong(2.6669084038224167, -75.51898414853909),
    new m.LatLong(2.6600493665912777, -75.99002296689847),
    new m.LatLong(2.614778768676133, -76.38141090635159),
    new m.LatLong(2.957695146864182, -76.69314796689847),
    new m.LatLong(3.5815223369729385, -77.00076515439847),
    new m.LatLong(3.6582731933984074, -76.69177467588284),
    new m.LatLong(3.5856341543654695, -76.49814064267972),
    new m.LatLong(3.541773819774964, -76.30176002744534),
    new m.LatLong(3.421147260805686, -76.24133522275784),
    new m.LatLong(3.326554425394611, -76.23584205869534),
    new m.LatLong(3.2552610585351833, -76.23034889463284),
    new m.LatLong(3.1784779466600512, -76.26330787900784),
    new m.LatLong(3.0180378069989238, -76.48852760557034),
    new m.LatLong(3.234694721693024, -76.41986305478909),
    new m.LatLong(3.264858538867254, -76.54345924619534),
    new m.LatLong(3.4156638705949076, -76.34982521299222),
    new m.LatLong(3.436226421974122, -76.52285988096097)];


// create a new instance of the mapView
var view = new m.MapView(document.getElementById("mapView"));
view.theme = "standard";

var l = new m.MapLayer("Map");
l.urlTemplate = "http://d.tile.stamen.com/terrain/{z}/{x}/{y}.png";
l.attribution = "Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright'>ODbL</a>.";
view.layers.add(l);

var drawings = new m.CanvasLayer("Drawings");
view.layers.add(drawings);

var markers = new m.DecorationLayer("Markers");
markers.visible = false;
view.layers.add(markers);

// create a smooth polyline connecting the points
var poly = new m.Poly(points);
poly.stroke = "#0066ff";
// stroke thickness in meters
poly.strokeThickness = 1000;
poly.strokeDashStyle = d.DashStyle.Dash;
poly.smooth = true;
drawings.decorations.add(poly);

// create markers and circles at the specified points
points.forEach(
    function (point) {
        markers.decorations.add(new m.Marker(point));
        var circle = new m.Circle(point, 1000);
        circle.fill = "red";
        drawings.decorations.add(circle);
    });


// set the topmost map layer
view.activeLayer = view.mapLayers.items()[0];

// load all layers
view.load(new m.LatLong(3.124314985139497, -76.24751503232815), 10);

document.getElementById("theme").onchange = function () {
    view.theme = (<HTMLSelectElement>document.getElementById("theme")).value;
}