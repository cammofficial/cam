import * as Scheduling from "@mindfusion/scheduling";
import * as Keyboard from "@mindfusion/keyboard";

class CustomForm extends Scheduling.BaseForm
{
	constructor(calendar, item)
	{
		super(calendar, item);

		this._id = "CustomForm";
		this._type = "edit";
		this.headerText = "Custom Form";
	}

	drawContent()
	{
		super.drawContent();

		var content = this.content;

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
		var vkElement = document.createElement("div");
		vkElement.id = "keyboard";
		var vk = new Keyboard.VirtualKeyboard(vkElement);
		vk.scaleToFitParent = true;
		vk.theme = this.calendar.theme;

		row = this.row();
		row.appendChild(vkElement);
		content.appendChild(row);

		return content;
	}

	// override BaseForm's drawButtons method to create form buttons
	drawButtons()
	{
		var thisObj = this;

		var btnSave = this.createButton({
			id: "btnSave",
			text: this.localInfo.saveButtonCaption,
			events: {
				"click": function click(e)
				{
					return thisObj.onSaveButtonClick(e);
				}
			}
		});

		var btnCancel = this.createButton({
			id: "btnCancel",
			text: this.localInfo.cancelButtonCaption,
			events: {
				click: function click(e)
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

	onSaveButtonClick(e)
	{
		// update the item with the form data
		this.item.subject = this.getControlValue("subject");

		// close the form
		this.closeForm();

		// repaint the calendar
		this.calendar.repaint(true);
	};

	onCancelButtonClick(e)
	{
		// close the form
		this.closeForm();
	};

	private _type: string;
    get type(): string
	{
        return this._type;
    }
    set type(value: string)
	{
        this._type = value;
    }
}

export default CustomForm;
