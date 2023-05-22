/// <reference path="../Scripts/jspack-vsdoc.js" />
var ui = MindFusion.Common.UI;
var d = MindFusion.Drawing;

// Create some data for the tab pages.
var data = [];
data.push({ image: "../images/h1.png", name: "Armillaria Ponderosa", title: "Wizard of light bulb moments" });
data.push({ image: "../images/h2.png", name: "Cantharellus Cibarius", title: "Chief robot whisperer" });
data.push({ image: "../images/h3.png", name: "Morchella Esculenta", title: "Software ninjaneer" });
data.push({ image: "../images/h4.png", name: "Tuber Magnatum", title: "Digital overlord" });
data.push({ image: "", name: "unknown", title: "unknown" });

// Create a new TabControl.
var host = new ui.TabControl(document.getElementById("host"));
host.setWidth("100%")
host.setHeight("100%");
host.theme = "standard";
host.tabHeaderClick.addEventListener(handleTabHeaderClick);

// Create two templated tab pages and add them to the host's tabs collection.
var tab1 = new ui.TabPage();
// The HTML of the specified page will be set as the innerHTML of a scrollable div inside the tab content element.
tab1.templateUrl = "page.html";
tab1.contentLoad.addEventListener(tabLoad);
host.tabs.add(tab1);

var tab2 = new ui.TabPage();
tab2.templateUrl = "page.html";
tab2.contentLoad.addEventListener(tabLoad);
host.tabs.add(tab2);

// Create a non-interactive tab to use as an "add tab" button.
var tab = new ui.TabPage("+");
tab.header.size = MindFusion.Common.Unit.parse("20");
// Disable drag and drop operations on the tab header.
tab.header.interactive = false;
// Disable selection of the tab.
tab.enabled = false;
host.tabs.add(tab);

// Render the host control.
host.render();

// This is the handler function of the tabs contentLoad event.
// The sender argument is the TabPage control.
// Template elements can be accessed through the DOM to set their correspoding values.
function tabLoad(sender, args)
{
    var index = Math.min(sender.parent.tabs.indexOfItem(sender), data.length - 1);
    sender.element.querySelector("#image").src = data[index].image;
    sender.element.querySelector("#name").innerText = data[index].name;
    sender.element.querySelector("#title").innerText = data[index].title;

    // Change the title of the tab's header.
    sender.header.title = data[index].name;

    // Create a tooltip for the image element.
    // The tooltip will follow the mouse cursor with the specified offset.
    var tooltip = new ui.Tooltip(sender.element.querySelector("#image"), data[index].name);
    tooltip.follow = true;
    tooltip.offset = new d.Point(20, 20);
    tooltip.render();
}

// This is the handler function of the tabControl.tabHeaderClick click.
// If the "add tab" header is clicked add a new tab with the same template.
function handleTabHeaderClick(sender, args)
{
    if (sender.title == "+")
    {
        var tab = new ui.TabPage("");
        // show the close button in the tab header.
        tab.allowClose = true;
        tab.templateUrl = "page.html";
        host.tabs.insert(host.tabs.count() - 1, tab);
        tab.contentLoad.addEventListener(tabLoad);
    }
}