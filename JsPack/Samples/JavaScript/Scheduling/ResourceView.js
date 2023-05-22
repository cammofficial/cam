/// <reference path="../Scripts/jspack-vsdoc.js" />

var p = MindFusion.Scheduling;

// create a new instance of the calendar
calendar = new p.Calendar(document.getElementById("calendar"));

// set the view to ResourceView, which displays the distribution of resources over a period of time
calendar.currentView = p.CalendarView.ResourceView;

calendar.theme = "business";
calendar.contactNameFormat = "L";

var resource;

// Add some contacts to the schedule.contacts collection.
resource = new p.Contact();
resource.firstName = "Emmy";
resource.lastName = "Noether";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.firstName = "Ernest";
resource.lastName = "Henley";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.firstName = "Jeffrey";
resource.lastName = "Goldstone";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.firstName = "Francesco";
resource.lastName = "Iachello";
calendar.schedule.contacts.add(resource);

// Add some locations to the schedule.locations collection.
resource = new p.Location();
resource.name = "Oxford";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "Harvard";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "Tokyo";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "Paris";
calendar.schedule.locations.add(resource);

// group the calendar
group(p.GroupType.GroupByContacts);

// render the calendar control
calendar.render();


var item = new p.Item();
item.subject = "aaaaaaaaaa";

item.contacts.add(calendar.schedule.contacts.first());
//item.startTime = p.DateTime.today();
//item.endTime = item.startTime.clone().addDays(1);
//1603944000000 	1604030400000
item.startTime = new p.DateTime(new Date(1603054800000));
item.endTime = new p.DateTime(new Date(1603141200000));
var offset = new Date().getTimezoneOffset();

// save st/et to db
var s = item.startTime._date;
var st = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes() + s.getTimezoneOffset(), s.getSeconds());
var e = item.endTime._date;
var et = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes() + e.getTimezoneOffset(), e.getSeconds());

//// load from db
//item.startTime = new p.DateTime(new Date(st));
//item.endTime = new p.DateTime(new Date(et));

////var s2 = new Date(new Date(st).toISOString());
////var st1 = new Date(new Date(s).setMinutes(offset));

////var s3 = new Date();
////s3.setUTCFullYear(s.getFullYear());
////s3.setUTCMonth(s.getMonth());
////s3.setUTCDate(s.getDate());

////s3.setUTCHours(s.getHours());
////s3.setUTCMinutes(s.getMinutes());
////s3.setUTCSeconds(s.getSeconds());


////var e3 = new Date();
////e3.setUTCFullYear(e.getFullYear());
////e3.setUTCMonth(e.getMonth());
////e3.setUTCDate(e.getDate());
////e3.setUTCHours(e.getHours());
////e3.setUTCMinutes(e.getMinutes());
////e3.setUTCSeconds(e.getSeconds());

//calendar.schedule.items.add(item);

////let dateObj = new Date();
////let offset = dateObj.getTimezoneOffset();
////var s = item.startTime._date
////s.setMinutes(s.getMinutes() - offset);
//var s1 = s.setMinutes(s.getMinutes() + offset);
var item = new p.Item();
item.subject = "bbbbbbbbbbb";
item.contacts.add(calendar.schedule.contacts.first());
item.startTime = new p.DateTime(new Date(st));
item.endTime = new p.DateTime(new Date(et));
calendar.schedule.items.add(item);

document.getElementById("timelines").value = calendar.resourceViewSettings.timelines;
document.getElementById("timelines").onchange = function () {
	calendar.resourceViewSettings.timelines = +document.getElementById("timelines").value || 3;
	document.getElementById("timelines").value = calendar.resourceViewSettings.timelines;
}

document.getElementById("cells").value = calendar.resourceViewSettings.visibleCells;
document.getElementById("cells").onchange = function () {
	calendar.resourceViewSettings.visibleCells = +document.getElementById("cells").value || 14;
	document.getElementById("cells").value = calendar.resourceViewSettings.visibleCells;
}

document.getElementById("ttunit").value = calendar.resourceViewSettings.topTimelineSettings.unit;
document.getElementById("ttunit").onchange = function () {
	calendar.resourceViewSettings.topTimelineSettings.unit = +document.getElementById("ttunit").value || p.TimeUnit.Year;
	document.getElementById("ttunit").value = calendar.resourceViewSettings.topTimelineSettings.unit;
}

document.getElementById("ttcount").value = calendar.resourceViewSettings.topTimelineSettings.unitCount;
document.getElementById("ttcount").onchange = function () {
	calendar.resourceViewSettings.topTimelineSettings.unitCount = +document.getElementById("ttcount").value || 1;
	document.getElementById("ttcount").value = calendar.resourceViewSettings.topTimelineSettings.unitCount;
}

document.getElementById("mtunit").value = calendar.resourceViewSettings.middleTimelineSettings.unit;
document.getElementById("mtunit").onchange = function () {
	calendar.resourceViewSettings.middleTimelineSettings.unit = +document.getElementById("mtunit").value || p.TimeUnit.Month;
	document.getElementById("mtunit").value = calendar.resourceViewSettings.middleTimelineSettings.unit;
}

document.getElementById("mtcount").value = calendar.resourceViewSettings.middleTimelineSettings.unitCount;
document.getElementById("mtcount").onchange = function () {
	calendar.resourceViewSettings.middleTimelineSettings.unitCount = +document.getElementById("mtcount").value || 1;
	document.getElementById("mtcount").value = calendar.resourceViewSettings.middleTimelineSettings.unitCount;
}

document.getElementById("btunit").value = calendar.resourceViewSettings.bottomTimelineSettings.unit;
document.getElementById("btunit").onchange = function () {
	calendar.resourceViewSettings.bottomTimelineSettings.unit = +document.getElementById("btunit").value || p.TimeUnit.Day;
	document.getElementById("btunit").value = calendar.resourceViewSettings.bottomTimelineSettings.unit;
}

document.getElementById("btcount").value = calendar.resourceViewSettings.bottomTimelineSettings.unitCount;
document.getElementById("btcount").onchange = function () {
	calendar.resourceViewSettings.bottomTimelineSettings.unitCount = +document.getElementById("btcount").value || 1;
	document.getElementById("btcount").value = calendar.resourceViewSettings.bottomTimelineSettings.unitCount;
}

function group(value) {
	calendar.contacts.clear();
	if (value == p.GroupType.GroupByContacts) {
		// add the contacts by which to group to the calendar.contacts collection
		calendar.contacts.addRange(calendar.schedule.contacts.items());
	}
	calendar.locations.clear();
	if (value == p.GroupType.GroupByLocations) {
		// add the locations by which to group to the calendar.locations collection
		calendar.locations.addRange(calendar.schedule.locations.items());
	}
	calendar.groupType = value;
}

function changeSchedule()
{
	group(p.GroupType.None);
	calendar.contacts.clear();
	calendar.locations.clear();
	//let ctcs = calendar.schedule.contacts.items();
	//ctcs[0].firstName = "A";
	//ctcs[0].lastName = "B";
	//let loc = calendar.schedule.locations.items();
	calendar.schedule = new p.Schedule();
	//calendar.schedule.contacts.addRange(ctcs);
	//calendar.schedule.locations.addRange(loc);
	//calendar.contacts.addRange(ctcs);
	//calendar.locations.addRange(loc);
	if (calendar.contacts.count() > 0)
	group(p.GroupType.GroupByContacts);
}