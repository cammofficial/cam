import * as p from '@mindfusion/scheduling';
import * as Controls from "@mindfusion/controls";
import * as Common from "@mindfusion/common";
namespace MinApp {


	// create a new instance of the calendar 
	var calendar = new p.Calendar(<HTMLDivElement>document.getElementById("calendar"));

	var date = new p.DateTime();

	for (var i = 0; i < 5; i++) {
		var item = new p.Item();
		item.subject = "calendar item" + i.toString();
		item.startTime = date.clone().addDays(Math.floor((Math.random() * 30) + 1));
		item.endTime = item.startTime.clone().addDays(Math.floor(Math.random() * 5));
		calendar.schedule.items.add(item);
	}

	// render the calendar control
	calendar.render();


	export function changeView(value) {
		calendar.currentView = value;
	}

	let theme = document.getElementById("theme") as HTMLInputElement;
	theme.onchange = () => {
		calendar.theme = theme.value;
	}

	let locale = document.getElementById("locale") as HTMLInputElement;
	locale.onchange = () => {
		var locale = (<HTMLSelectElement>document.getElementById("locale")).value;
		var url = 'https://unpkg.com/cldr-dates-full/main/' + locale + '/ca-gregorian.json';
		fetch(url)
			.then(response => response.json())
			.then((data) => {
				var localeObj = new Common.Locale(locale);
				localeObj.fromJson(JSON.stringify(data));
				localeObj.dateFormats.shortDate = localeObj.dateFormats.shortDate.replace("yy", "yyyy");
				if (locale == "ru")
					localeObj.dateSettings.firstDayOfWeek = 1;
				var fileName = './localization/' + locale + '.json';
				Controls.DomUtils.loadJSON(fileName, (response) => {
					localeObj.strings = JSON.parse(response);
					calendar.locale = localeObj;
				});
			})
			.catch(err => { throw err });
	}
}

global["MinApp"] = MinApp;