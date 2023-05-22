/// <reference path="MindFusion.Scheduling-vsdoc.js" />

var p = MindFusion.Scheduling;

// create a new instance of the calendar 
var calendar = new p.Calendar(document.getElementById("calendar"));
var date = new p.DateTime();

// add some items to the calendar schedule
for (var i = 0; i < 5; i++) {
	var item = new p.Item();
	item.subject = "calendar item" + i.toString();
	item.startTime = date.clone().addDays(Math.floor((Math.random() * 30) + 1));
	item.endTime = item.startTime.clone().addDays(Math.floor(Math.random() * 5));
	calendar.schedule.items.add(item);
}

// render the calendar control
calendar.render();


function changeView(value) {
	// change the calendar view
	this.calendar.currentView = value;
}

document.getElementById("theme").onchange = function () {
	calendar.theme = document.getElementById("theme").value;
}

document.getElementById("locale").onchange = function () {
	var locale = document.getElementById("locale").value;
	var url = 'https://unpkg.com/cldr-dates-full/main/' + locale + '/ca-gregorian.json';
	fetch(url)
		.then(response => response.json())
		.then((data) => {
			var localeObj = new MindFusion.Common.Locale(locale);
			localeObj.fromJson(JSON.stringify(data));
			localeObj.dateFormats.shortDate = localeObj.dateFormats.shortDate.replace("yy", "yyyy");
			if (locale == "ru")
				localeObj.dateSettings.firstDayOfWeek = 1;
			var fileName = './localization/' + document.getElementById("locale").value + '.json';
			MindFusion.Controls.DomUtils.loadJSON(fileName, (response) => {
				localeObj.strings = JSON.parse(response).strings;
				calendar.locale = localeObj;
			});
		})
		.catch(err => { throw err });
}

