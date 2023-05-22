var p = MindFusion.Scheduling;
var mk = MindFusion.Keyboard;

var CustomForm = function (calendar, item, type)
{
	p.BaseForm.call(this, calendar, item);

	this._id = "CustomForm";
	this._type = "edit";
	this.headerText = "Custom Form";
}

CustomForm.prototype = Object.create(p.BaseForm.prototype);
CustomForm.prototype.constructor = CustomForm;

CustomForm.prototype.drawContent = function ()
{
	p.BaseForm.prototype.drawContent.call(this);

	var content = this.getContent();

	var row = this.row();
	row.innerHTML = this.localInfo.subjectCaption;
	content.appendChild(row);

	// create a text-area for the item subject
	var control = this.createTextArea({ id: "subject", initValue: this.item.subject });
	control.element.style.width = "100%";
	this.addControl(control);

	row = this.row();
	row.appendChild(control.element);
	content.appendChild(row);

	var vkElement = document.createElement("div");
	vkElement.id = "keyboard";
	var vk = new mk.VirtualKeyboard(vkElement);
	vk.scaleToFitParent = true;
	vk.theme = this.calendar.theme;

	row = this.row();
	row.appendChild(vkElement);
	content.appendChild(row);

	return content;
};

// override BaseForm's drawButtons method to create form buttons
CustomForm.prototype.drawButtons = function ()
{
	var thisObj = this;

	var btnSave = this.createButton({
		id: "btnSave",
		text: this.localInfo.saveButtonCaption,
		events: { "click": function click(e)
		{
			return thisObj.onSaveButtonClick(e);
		}
		}
	});

	var btnCancel = this.createButton({
		id: "btnCancel",
		text: this.localInfo.cancelButtonCaption,
		events: { click: function click(e)
		{
			return thisObj.onCancelButtonClick(e);
		}
		}
	});

	var buttons = this.row();
	buttons.classList.add("mfp-buttons-row");
	buttons.appendChild(btnSave.element);
	buttons.appendChild(btnCancel.element);

	return buttons;
};

CustomForm.prototype.onSaveButtonClick = function (e)
{
	// update the item with the form data
	this.item.subject = this.getControlValue("subject");

	// close the form
	this.closeForm();

	// repaint the calendar
	this.calendar.repaint(true);
};

CustomForm.prototype.onCancelButtonClick = function (e)
{
	// close the form
	this.closeForm();
};



