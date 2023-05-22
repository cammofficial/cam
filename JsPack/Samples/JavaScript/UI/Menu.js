/// <reference path="../Scripts/jspack-vsdoc.js" />
var common = MindFusion.Common;
var ui = MindFusion.Common.UI;

// Create a new Menu control.
var menu = new ui.Menu();
// Apply the custom css theme.
menu.theme = "custom";
menu.width = new common.Unit(200, common.UnitType.Pixel);
menu.left = new common.Unit(20, common.UnitType.Pixel);
menu.itemSize = new common.Unit(40, common.UnitType.Pixel);

// Create a new MenuItem, displaying a link.
var item = new ui.MenuItem("Home");
item.imageSrc = "../images/icon_home.png";
item.href = "http://www.mindfusion.eu";
menu.items.add(item);

// Create a new MenuItem, displaying an icon and a text.
// Add a 2-level child nodes hierarchy.
var item = new ui.MenuItem("Products");
item.imageSrc = "../images/icon_delivery.png";
menu.items.add(item);

var cat1 = new ui.MenuItem("Category 1");
var cat2 = new ui.MenuItem("Category 2");
var cat3 = new ui.MenuItem("Category 3");

item.items.add(cat1);
item.items.add(cat2);
item.items.add(cat3);

var prod1 = new ui.MenuItem("Product 1");
var prod2 = new ui.MenuItem("Product 2");
var prod3 = new ui.MenuItem("Product 3");

cat1.items.add(prod1);
cat1.items.add(prod2);
cat1.items.add(prod3);

var prod1 = new ui.MenuItem("Product 1");
var prod2 = new ui.MenuItem("Product 2");
cat2.items.add(prod1);
cat2.items.add(prod2);

var prod1 = new ui.MenuItem("Product 1");
var prod2 = new ui.MenuItem("Product 2");
cat3.items.add(prod1);
cat3.items.add(prod2);

// Create a new MenuItem, displaying an icon and a text.
var item = new ui.MenuItem("About");
item.imageSrc = "../images/icon_fish.png";
menu.items.add(item);

// Create a new MenuItem, displaying an icon and a text.
var item = new ui.MenuItem("Contact");
item.imageSrc = "../images/icon_time.png";
menu.items.add(item);

// Create a new templated MenuItem.
var card = new ui.MenuItem();
card.size = new common.Unit(160, common.UnitType.Pixel);

var t = document.createElement("div");
t.className = "cardClass";

var img = document.createElement("img");
img.src = "../images/h1.png";
img.style.width = "100px";
img.style.height = "100px";
img.style.margin = "auto";
t.appendChild(img);

var span = document.createElement("span");
span.style.fontSize = "larger";
span.innerText = "Armillaria Ponderosa";
t.appendChild(span);

var span = document.createElement("span");
span.innerText = "[50.010083,-110.113006]";
t.appendChild(span);

card.template = t.outerHTML;

item.items.add(card);

// Draw and attach the menu control.
document.body.appendChild(menu.draw());
menu.attach();