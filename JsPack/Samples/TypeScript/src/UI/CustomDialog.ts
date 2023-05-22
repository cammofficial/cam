

import * as ui from "@mindfusion/common-ui";

namespace CustomDialog {
	// Create a select input
	var input = document.createElement("select");
	input.setAttribute("type", "select");
	input.setAttribute("multiple", "multiple");
	input.setAttribute("id", "theme");

	var option = document.createElement("option");
	option.value = option.text = "Arts";
	input.appendChild(option);

	option = document.createElement("option");
	option.value = option.text = "Politics";
	input.appendChild(option);

	option = document.createElement("option");
	option.value = option.text = "Science";
	input.appendChild(option);

	option = document.createElement("option");
	option.value = option.text = "Computers and Internet";
	input.appendChild(option);

	option = document.createElement("option");
	option.value = option.text = "Sports";
	input.appendChild(option);

	showDialog();

	function showDialog() {
		// Show input dialog with the created input.
		ui.Dialogs.showInputDialog("Your Hobby",
			"Choose an area of interest:",
			inputCallback.bind(this),
			<HTMLElement>document.getElementById("content"),
			input,
			"selectedOptions",
			null,
			"sky");
	};

	// This is the callback function of the input dialog.
	// The first parameter stores the modal result of the dialog (e.g. which button was pressed).
	// The second parameter stores the value result of the dialog (e.g. what is the value of the input).
	function inputCallback(result, value) {
		if (result == ui.ModalResult.OK) {

			var selectedList = "";
			for (let i = 0; i < value.length; i++) {
				selectedList += value[i].label + ", ";
			}

			alert("You are interested in: " + selectedList.replace(/,([^,]*)$/, ".$1"));
		}
	}


	let btnShow = document.getElementById('btnShow') as HTMLInputElement;
	btnShow.onclick = () => {
		showDialog();
	}
}