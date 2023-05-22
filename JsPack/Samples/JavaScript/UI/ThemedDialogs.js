/// <reference path="../Scripts/jspack-vsdoc.js" />
var ui = MindFusion.Common.UI;

var infoDialog = new ui.InfoDialog("Warning", "Your certificate expires soon!", document.getElementById("content"));
infoDialog.theme = "gray";
infoDialog.iconSrc = "../images/icon_warning.png";
infoDialog.render();
infoDialog.left = infoDialog.top = MindFusion.Common.Unit.percentage(30);
infoDialog.modal = false;

var inputDialog = new ui.InputDialog("Share", "Type in the name of the file to share:", document.getElementById("content"));
inputDialog.theme = "gray";
inputDialog.iconSrc = "../images/icon_share.png";
inputDialog.controlUnload.addEventListener(function () {
	return inputCallback(inputDialog.modalResult, inputDialog.result);
});
inputDialog.render();
inputDialog.left = MindFusion.Common.Unit.percentage(50);
inputDialog.modal = false;

var confirmDialog = new ui.ConfirmDialog("Delete", "Do you want to delete the log file?", document.getElementById("content"));
confirmDialog.theme = "gray";
confirmDialog.iconSrc = "../images/icon_stop.png";
confirmDialog.controlUnload.addEventListener(function () {
	return confirmCallback(confirmDialog.modalResult);
});
confirmDialog.render();
confirmDialog.left = confirmDialog.top = MindFusion.Common.Unit.percentage(40);


// This is the callback function of the confirm dialog.
// The parameter stores the modal result of the dialog (e.g. which button was pressed).
function confirmCallback(result) {
	if (result == ui.ModalResult.OK) {
		ui.Dialogs.showInfoDialog("Information", "Log file deleted", null, document.getElementById("content"), "gray");
	}
}

// This is the callback function of the input dialog.
// The first parameter stores the modal result of the dialog (e.g. which button was pressed).
// The second parameter stores the value result of the dialog (e.g. what is the value of the input).
function inputCallback(result, value) {
	if (result == ui.ModalResult.OK && value) {
		ui.Dialogs.showInfoDialog("Information", "File shared:" + value, null, document.getElementById("content"), "gray");
	}
}
