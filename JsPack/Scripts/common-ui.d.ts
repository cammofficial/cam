/// <reference types="../../@mindfusion/common" />
/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/drawing" />
/// <reference types="../../@mindfusion/common-collections" />
declare module "Common/UI/UIControl" {
    /**
    * @class A base class for UI controls.
    */
    export class UIControl extends Control {
        static get tm(): number[];
        static get tm2(): number[];
        static get ns(): string;
        _messenger: {
            message(control: any): void;
            setKey(value: any): void;
        };
        get targetElement(): Element;
        setLicenseKey(value: any): void;
        get tm2(): number[];
    }
    import { Control } from "@mindfusion/common";
}
declare module "Common/UI/Enum" {
    /**
     * Specifies how a window is displayed.
     */
    export type WindowState = number;
    export namespace WindowState {
        const Normal: number;
        const Minimized: number;
        const Maximized: number;
    }
    /**
     * Specifies a type of interaction.
     */
    export type InteractionType = number;
    export namespace InteractionType {
        const Drag: number;
        const Resize: number;
        const Toggle: number;
    }
    /**
     * Represents the return value of a modal dialog.
     */
    export type ModalResult = number;
    export namespace ModalResult {
        const None: number;
        const OK: number;
        const Cancel: number;
    }
    /**
     * Specifies orientation.
     */
    export type Orientation = number;
    export namespace Orientation {
        const Horizontal: number;
        const Vertical: number;
    }
    /**
     * Specifies how a toolStrip item is displayed.
     */
    export type ToolStripItemType = number;
    export namespace ToolStripItemType {
        const Default: number;
        const Separator: number;
        const Label: number;
        const Icon: number;
    }
    /**
     * Specifies the position of a tooltip relative to its target element.
     */
    export type TooltipPosition = number;
    export namespace TooltipPosition {
        const Left: number;
        const Right: number;
        const Top: number;
        const Bottom: number;
        const Center: number;
        const Cursor: number;
    }
    /**
     * Specifies the event, which shows the tooltip.
     */
    export type TooltipTrigger = number;
    export namespace TooltipTrigger {
        const None_1: number;
        export { None_1 as None };
        export const Hover: number;
        export const Focus: number;
        export const Click: number;
    }
    /**
     * Specifies how expand/collapse of tree nodes will be triggered.
     */
    export type ToggleMode = number;
    export namespace ToggleMode {
        const HeaderClick: number;
        const IconClick: number;
    }
    /**
     * Specifies a time resolution.
     */
    export type TimeUnit = number;
    export namespace TimeUnit {
        const Second: number;
        const Minute: number;
        const Hour: number;
        const Day: number;
        const Week: number;
        const Month: number;
        const Year: number;
        const Decade: number;
    }
    /**
     * Specifies the validation state of a control.
     */
    export type ValidationState = number;
    export namespace ValidationState {
        const Invalid: number;
        const Valid: number;
    }
    /**
     * Specifies the display mode of a DateTimePicker control.
     */
    export type DateTimePickerMode = number;
    export namespace DateTimePickerMode {
        const Date: number;
        const Time: number;
        const DateTime: number;
    }
    /**
     * Specifies the display mode of the button in a Picker control.
     */
    export type PickerButtonStyle = number;
    export namespace PickerButtonStyle {
        const None_2: number;
        export { None_2 as None };
        export const Block: number;
        export const Inline: number;
    }
    /**
     * Specifies the type of a CheckListBox control.
     */
    export type CheckListBoxType = number;
    export namespace CheckListBoxType {
        const List: number;
        const Flags: number;
    }
}
declare module "Common/UI/EventArgs" {
    /**
    * @class Specifies data for the item related events.
    * @augments EventArgs
    */
    export class ItemEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the ItemEventArgs class.
        * @constructor
        * @param {ListItem} item The item, associated with the event.
        * @param {Object} rawEventArgs The Javascript event data.
        */
        constructor(item: any, rawEventArgs: any);
        _item: any;
        _rawEventArgs: any;
        /**
        * Gets the item, associated with the event.
        * @type {ListItem}
        * @summary The item, associated with the event.
        */
        get item(): any;
        /**
        * Gets the Javascript event data.
        * @type {Object}
        * @summary The Javascript event data.
        */
        get rawEventArgs(): any;
    }
    /**
    * @class Contains the arguments passed to handlers of interaction-related events.
    * @augments CancelEventArgs
    */
    export class InteractionEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the InteractionEventArgs class.
        * @constructor
        * @param {Object} rawEventArgs The Javascript event data.
        * @param {InteractionType} action The action associated with the event.
        */
        constructor(rawEventArgs: any, action: any);
        _rawEventArgs: any;
        _action: any;
        /**
        * Gets the Javascript event data.
        * @type {Object}
        * @summary The Javascript event data.
        */
        get rawEventArgs(): any;
        /**
        * Gets the action associated with the event.
        * @type {InteractionType}
        * @summary One of the InteractionType enumeration values.
        */
        get action(): any;
    }
    /**
    * @class Specifies data for validation events, related to control changes.
    * @augments CancelEventArgs
    */
    export class ControlModifyingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the ControlModifyingEventArgs class.
        * @constructor
        * @param {Control} control The control that is being modified
        * @param {Object} changes An object containing the changed properties.
        */
        constructor(control: any, changes: any);
        _control: any;
        _changes: any;
        /**
        * Gets the control that is modified.
        * @type {Control}
        * @summary The control that is modified.
        */
        get control(): any;
        /**
        * Gets the changed properties of the control, associated with the event.
        * @type {Object}
        * @summary An object containing the changed properties.
        */
        get changes(): any;
    }
    /**
    * @class Specifies data for notification events, related to control changes.
    * @augments EventArgs
    */
    export class ControlModifiedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the ControlModifiedEventArgs class.
        * @constructor
        * @param {Control} control The control that is being modified
        * @param {Object} changes An object containing the changed properties.
        */
        constructor(control: any, changes: any);
        _control: any;
        _changes: any;
        /**
        * Gets the control that is modified.
        * @type {Control}
        * @summary The control that is modified.
        */
        get control(): any;
        /**
        * Gets the changed properties of the control, associated with the event.
        * @type {Object}
        * @summary An object containing the changed properties.
        */
        get changes(): any;
    }
    /**
    * @class Specifies data for selectedItemChanging events.
    * @augments CancelEventArgs
    */
    export class SelectedItemChangingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the SelectedItemChangingEventArgs class.
        * @constructor
        * @param {ListItem} oldItem The selected item before the change.
        * @param {ListItem} newItem The new selected item.
        */
        constructor(oldItem: any, newItem: any);
        _oldItem: any;
        _newItem: any;
        /**
        * Gets the selected item before the change.
        * @type {ListItem}
        * @summary The selected item before the change.
        */
        get oldItem(): any;
        /**
        * Gets new selected item.
        * @type {ListItem}
        * @summary The new selected item.
        */
        get newItem(): any;
    }
    /**
    * @class Specifies data for selectedItemChanged events.
    * @augments EventArgs
    */
    export class SelectedItemChangedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the SelectedItemChangedEventArgs class.
        * @constructor
        * @param {ListItem} oldItem Gets the selected item before the change.
        * @param {ListItem} newItem Gets the new selected item.
        */
        constructor(oldItem: any, newItem: any);
        _oldItem: any;
        _newItem: any;
        /**
        * Gets the selected item before the change.
        * @type {ListItem}
        * @summary The selected item before the change.
        */
        get oldItem(): any;
        /**
        * Gets new selected item.
        * @type {ListItem}
        * @summary The new selected item.
        */
        get newItem(): any;
    }
    /**
    * @class Specifies data for drag and drop related events.
    * @augments CancelEventArgs
    */
    export class DragDropEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the DragDropEventArgs class.
        * @constructor
        * @param {ListItem} dragItem The item, associated with the event.
        * @param {Object} dropTarget An object, containing data about the target of the operation.
        */
        constructor(dragItem: any, dropTarget: any);
        _dragItem: any;
        _dropTarget: any;
        /**
        * Gets the item, associated with the event.
        * @type {ListItem}
        * @summary The item, associated with the event.
        */
        get dragItem(): any;
        /**
        * Gets an object, containing data about the target of the operation.
        * @type {Object}
        * @summary An object, containing data about the target of the operation.
        */
        get dropTarget(): any;
    }
    /**
    * @class Specifies data for valueChanging events.
    * @augments CancelEventArgs
    */
    export class ValueChangingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the ValueChangingEventArgs class.
        * @constructor
        * @param {Object} oldValue The value before the change.
        * @param {Object} newValue The new value.
        */
        constructor(oldValue: any, newValue: any);
        _oldValue: any;
        _newValue: any;
        /**
        * Gets the value before the change.
        * @type {Object}
        * @summary The value before the change.
        */
        get oldValue(): any;
        /**
        * Gets the new value.
        * @type {Object}
        * @summary The new value.
        */
        get newValue(): any;
    }
    /**
    * @class Specifies data for valueChanged events.
    * @augments EventArgs
    */
    export class ValueChangedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the ValueChangedEventArgs class.
        * @constructor
        * @param {Object} oldValue Gets the value before the change.
        * @param {Object} newValue The new value.
        */
        constructor(oldValue: any, newValue: any);
        _oldValue: any;
        _newValue: any;
        /**
        * Gets the value before the change.
        * @type {Object}
        * @summary The value before the change.
        */
        get oldValue(): any;
        /**
        * Gets the new value.
        * @type {Object}
        * @summary The new value.
        */
        get newValue(): any;
    }
    import { EventArgs } from "@mindfusion/controls";
    import { CancelEventArgs } from "@mindfusion/controls";
}
declare module "Common/UI/DomRenderer" {
    /**
    * @namespace MindFusion.Common.UI
    */
    /**
     * Copyright (c) 2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class A base class for list renderers.
    */
    export class DomRenderer {
        set list(arg: any);
        /**
        * Gets or sets the list control this renderer is attached to.
        * @type {ListContainer}
        * @summary The list control.
        */
        get list(): any;
        _list: any;
        /**
        * Implement this method in a derived class to handle the rendering of the list control.
        */
        drawList(): void;
        /**
        * Implement this method in a derived class to handle the rendering of items.
        * @param {ListItem} item The item to render.
        * @param {Number} index The item index.
        */
        drawItem(item: any, index: number): void;
        /**
        * Implement this method in a derived class to handle DOM cleanup when an item is removed.
        * @param {ListItem} item The item to render.
        */
        removeItem(item: any): void;
        /**
        * Implement this method in a derived class to handle re-rendering of items.
        * @param {ListItem} item The item to re-render.
        */
        redrawItem(item: any): void;
        /**
        * Implement this method in a derived class to handle item selection.
        * @param {ListItem} item The item.
        * @param {Boolean} value True to select the item, otherwise false.
        */
        toggleSelection(): void;
        /**
        * Implement this method in a derived class to handle a hover action on an item.
        * @param {ListItem} item The item.
        */
        toggleActive(): void;
        /**
        * Implement this method in a derived class to handle rendering of child nodes of a tree node.
        * @param {TreeNode} item The item.
        */
        drawChildren(): void;
        /**
        * Implement this method in a derived class to handle expand/collapse actions on a tree node.
        * @param {ListItem} item The item.
        * @param {Boolean} value True to expand the item, otherwise false.
        */
        toggleExpanded(): void;
        /**
        * Gets a value indicating whether to late-bind items' event handlers.
        * @type {Boolean}
        * @summary Implement this property in a derived class to handle items attach/detach logic.
        */
        get attachItemsFromParent(): boolean;
    }
}
declare module "Common/UI/ListRenderer" {
    export default ListRenderer;
    /**
    * @class Contains render methods for a list control.
    */
    class ListRenderer extends DomRenderer {
    }
    import { DomRenderer } from "Common/UI/DomRenderer";
}
declare module "Common/UI/TemplatedItem" {
    export default TemplatedItem;
    /**
    * @class Represents an item which can be templated.
    */
    class TemplatedItem {
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * For internal use only.
        * @private
        */
        private drawContent;
        set template(arg: string);
        /**
        * Gets or sets the item template.
        * @type {String}
        * @summary An HTML string representing the item template.
        */
        get template(): string;
        _template: string;
        /**
        * Control.onPropertyChanged override.
        * @protected
        */
        protected onPropertyChanged(name: any, oldValue: any, newValue: any): void;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/ListItem" {
    /**
    * @class Represents an item in a list control.
    * @augments TemplatedItem
    */
    export class ListItem extends TemplatedItem {
        /**
         * Initializes a new instance of the ListItem class.
         * @constructor
         * @param {String} [title] The display text of this item.
         */
        constructor(title?: string);
        _size: Unit;
        _enabled: boolean;
        _visible: boolean;
        _interactive: boolean;
        _title: string;
        _controlState: number;
        _itemDraw: EventDispatcher<EventArgs>;
        _mouseEnter: EventDispatcher<EventArgs>;
        _mouseLeave: EventDispatcher<EventArgs>;
        _mouseDown: EventDispatcher<EventArgs>;
        _click: EventDispatcher<EventArgs>;
        _doubleClick: EventDispatcher<EventArgs>;
        mouseLeaveHandler: (e: any) => void;
        mouseEnterHandler: (e: any) => void;
        mouseDownHandler: (e: any) => void;
        clickHandler: (e: any) => void;
        doubleClickHandler: (e: any) => void;
        mouseOverHandler: (e: any) => void;
        /**
        * Attach event handlers.
        * @private
        */
        private attach;
        /**
        * Detach event handlers.
        * @private
        */
        private detach;
        /**
        * Returns a reference to the item's DOM element.
        * @type {HTMLElement}
        * @summary A reference to the item's DOM element.
        */
        get element(): HTMLElement;
        /**
        * Returns a reference to the item's content element.
        * @type {HTMLElement}
        * @summary A reference to the item's content element.
        */
        get contentElement(): HTMLElement;
        /**
        * Draws the item.
        * @returns {HTMLElement} The item DOM element.
        */
        draw(): HTMLElement;
        _element: HTMLLIElement;
        /**
        * Serializes this item to an object.
        * @returns {Object} The serialized item.
        * @private
        */
        private toJson;
        /**
        * Deserializes this item from an object.
        * @param {Object} json The object containing item data.
        * @private
        */
        private fromJson;
        set title(arg: string);
        /**
        * Gets or sets the title text of this item.
        * @type {String}
        * @summary The title.
        */
        get title(): string;
        set enabled(arg: boolean);
        /**
        * Gets or sets a value indicating whether user interactions are allowed for this item.
        * @type {Boolean}
        * @summary true if user interactions are allowed, otherwise false.
        */
        get enabled(): boolean;
        set visible(arg: boolean);
        /**
        * Gets or sets the visibility of this item.
        * @type {Boolean}
        * @summary true if the item is visible, otherwise false.
        */
        get visible(): boolean;
        set interactive(arg: boolean);
        /**
        * Gets or sets a value indicating whether drag and drop operations are allowed for this item.
        * @type {Boolean}
        * @summary true if drag and drop operations are allowed, otherwise false.
        */
        get interactive(): boolean;
        set dataIndex(arg: number);
        /**
        * Gets or sets the unique index of the item.
        * @type {Number}
        * @summary The index.
        */
        get dataIndex(): number;
        set data(arg: any);
        /**
        * Gets or sets an object, holding custom user data.
        * @type {Object}
        * @summary The custom user data.
        */
        get data(): any;
        set tooltip(arg: string);
        /**
        * Gets or sets the tooltip of this item.
        * @type {String}
        * @summary The tooltip.
        */
        get tooltip(): string;
        set cssClass(arg: string);
        /**
        * Gets or sets the css class of this item.
        * @type {String}
        * @summary The css class.
        */
        get cssClass(): string;
        set imageSrc(arg: string);
        /**
        * Gets or sets the URL of the image displayed by this item.
        * @type {String}
        * @summary The image URL.
        */
        get imageSrc(): string;
        set size(arg: Unit);
        /**
        * Gets or sets the size of this item.
        * @type {Unit}
        * @summary The size.
        */
        get size(): Unit;
        /**
        * Gets a value indicating whether this item is loaded and ready for interaction.
        * @type {Boolean}
        * @summary true if the item is loaded, otherwise false.
        */
        get loaded(): boolean;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this item.
        * @type {ListContainer}
        * @summary The parent control of this item.
        */
        get parent(): any;
        _parent: any;
        /**
        * Gets the DOM element in the item's hierarchy which will serve as a target for the drag behavior.
        * @type {HTMLElement}
        * @summary The element to use as a drag target.
        */
        get dragElement(): HTMLElement;
        /**
        * Gets the DOM element in the item's hierarchy which will serve as a handle for the drag behavior.
        * @type {HTMLElement}
        * @summary The element to use as a drag handle.
        */
        get dragHandle(): HTMLElement;
        /**
        * Gets the HTML to show in the tooltip, displayed during a drag operation.
        * @type {String}
        * @summary The HTML string.
        */
        get dragHTML(): string;
        set selected(arg: boolean);
        /**
        * Gets or sets a value indicating whether the item is selected.
        * @type {Boolean}
        * @summary true if the item is selected, otherwise false.
        */
        get selected(): boolean;
        _dataIndex: any;
        _data: any;
        _imageSrc: any;
        _tooltip: any;
        _cssClass: any;
        /**
        * Gets the bounds of this item.
        * @type {Rect}
        * @summary The bounds.
        */
        get bounds(): Rect;
        /**
        * Handles the mousedown event.
        * @private
        */
        private onMouseDown;
        /**
        * Handles the click event.
        * @private
        */
        private onClick;
        /**
        * Handles the dblclick event.
        * @private
        */
        private onDoubleClick;
        /**
        * Handles the mouseEnter event.
        * @private
        */
        private onMouseEnter;
        /**
        * Handles the mouseLeave event.
        * @private
        */
        private onMouseLeave;
        /**
        * Handles the mouseover event.
        * @private
        */
        private onMouseOver;
        /**
        * Raises the draw event.
        * @private
        */
        private raiseDraw;
        /**
         * Raised when the item is being drawn.
         * @private
         */
        private get itemDraw();
    }
    import TemplatedItem from "Common/UI/TemplatedItem";
    import { Unit } from "@mindfusion/common";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Common/UI/Interactions/DragBehavior" {
    export default DragBehavior;
    /**
    * @private
    */
    class DragBehavior {
        /**
         * Initializes a new instance of the DragBehavior class.
         * @constructor
         */
        constructor(control: any, options: any);
        _control: any;
        /**
        * The DOM Element object that the DragBehavior is associated with.
        * @type {Object}
        * @private
        */
        private _target;
        set handle(arg: any);
        /**
        * Gets the DOM Element object from which the drag operation can be initiated.
        * @returns {Object} The DOM Element object.
        */
        get handle(): any;
        /**
        * Sets the parent DOM Element object that will define the constrains of a drag operation.
        * @param {Object} value The DOM Element object.
        */
        set parent(arg: any);
        /**
        * Gets the parent DOM Element object that will define the constrains of a drag operation.
        * @returns {Object} The DOM Element object.
        */
        get parent(): any;
        /**
        * Defines whether the dragging operation should be constrained by the bounds of the parent object.
        * @type {Boolean}
        * @remarks The default value is true.
        * @private
        */
        private stayInParent;
        dragCursor: any;
        threshold: any;
        /**
        * Caches the body cursor style.
        * @private
        */
        private cacheBodyCursor;
        mouseDownHandler: (e: any) => void;
        mouseMoveHandler: (e: any) => void;
        mouseUpHandler: (e: any) => void;
        _dragStart: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _drag: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _dragEnd: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        get control(): any;
        detach(): void;
        /**
        * Raises the dragStart event.
        */
        onDragStart(e: any, action: any): boolean;
        get dragStart(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Raises the drag event.
        */
        onDrag(e: any, action: any): boolean;
        get drag(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
      * Raises the dragEnd event.
      */
        onDragEnd(e: any, action: any): boolean;
        get dragEnd(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Determines whether to start the drag operation.
        * @param {Object} e The mouse event args data.
        * @returns {Boolean} true if the drag operation should start, otherwise false.
        * @private
        */
        private mouseMoved;
        /**
        * Starts a drag operation.
        * @param {Object} e The mouse event args data.
        * @private
        */
        private startDrag;
        isDragging: boolean;
        addOverlay(): void;
        overlay: HTMLDivElement;
        /**
        * Performs drag.
        * @param {Object} e The mouse event args data.
        * @private
        */
        private doDrag;
        currentPos: Point;
        /**
        * Finalizes a drag operation.
        * @param {Object} e The mouse event args data.
        * @private
        */
        private endDrag;
        /**
        * Changes the cursor depending on the current state of the drag operation.
        * @param {Number} value -1 for not-allowed cursor.
        * @private
        */
        private setCursor;
        getCursorPos(e: any, element: any): {
            x: any;
            y: any;
        };
        /**
        * Handles the mousedown event.
        * @private
        */
        private onMouseDown;
        initialRect: Rect;
        startPos: Point;
        startPoint: {
            x: any;
            y: any;
        };
        /**
        * Handles the mousemove event.
        * @private
        */
        private onMouseMove;
        /**
        * Handles the mousemove event.
        * @private
        */
        private onMouseUp;
        /**
        * Gets the DOM Element object that the DragBehavior is associated with.
        * @returns {Object} The DOM Element object.
        */
        get target(): any;
        _handle: any;
        _parent: any;
    }
    import { EventDispatcher } from "@mindfusion/common";
    import { Point } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Common/UI/Tooltip" {
    /**
    * @class Represents a popup window, containing a custom message.
    * @augments UIControl
    */
    export class Tooltip extends UIControl {
        /**
         * Initializes a new instance of the Tooltip class.
         * @constructor
         * @param {HTMLElement} target The HTML element that will trigger the tooltip.
         * @param {String} [text] The display text of the tooltip.
         */
        constructor(target: HTMLElement, text?: string);
        _target: HTMLElement;
        _text: string;
        _position: number;
        _trigger: number;
        _follow: boolean;
        _offset: Point;
        mouseOverHandler: (e: any) => void;
        mouseOutHandler: (e: any) => void;
        focusHandler: (e: any) => void;
        clickHandler: (e: any) => void;
        mouseMoveHandler: (e: any) => void;
        tooltipMouseMoveHandler: (e: any) => void;
        tooltipMouseDownHandler: (e: any) => void;
        tooltipClickHandler: (e: any) => void;
        content: TemplatedItem;
        _tooltipShowing: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _tooltipShow: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _tooltipHiding: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _tooltipHide: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        set text(arg: string);
        /**
        * Gets or sets the text of this tooltip.
        * @type {String}
        * @summary The text.
        */
        get text(): string;
        set template(arg: string);
        /**
        * Gets or sets the tooltip content template.
        * @type {String}
        * @summary An HTML string representing the content template.
        */
        get template(): string;
        /**
        * @private
        */
        set target(arg: HTMLElement);
        /**
        * Gets the target element.
        * @type {HTMLElement}
        * @summary The target element.
        */
        get target(): HTMLElement;
        set position(arg: number);
        /**
        * Gets or sets the position of the tooltip.
        * @type {TooltipPosition}
        * @summary The position.
        */
        get position(): number;
        set trigger(arg: number);
        /**
        * Gets or sets the event that shows the tooltip.
        * @type {TooltipTrigger}
        * @summary One of the TooltipTrigger enumeration values.
        */
        get trigger(): number;
        set follow(arg: boolean);
        /**
        * Gets or sets a value indicating whether the tooltip will follow the mouse cursor.
        * @type {Boolean}
        * @summary true if the tooltip will follow the cursor, otherwise false.
        */
        get follow(): boolean;
        set offset(arg: Point);
        /**
        * Gets or sets the offset of the tooltip.
        * @type {Point}
        * @summary A Point instance representing the horizontal and vertical offset.
        */
        get offset(): Point;
        /**
        * Shows the tooltip.
        * @param {Point} [position] The point at which to display the tooltip if its position is set to TooltipPosition.Cursor.
        */
        show(position?: Point): void;
        doShow(point: any): void;
        tryShow(position: any, point: any): boolean;
        /**
        * Shows the tooltip without raising events.
        */
        doShow1(position: any): void;
        /**
        * Hides the tooltip.
        */
        hide(): void;
        /**
        * Hides the tooltip without raising events.
        */
        doHide(): void;
        /**
        * Toggles the tooltip's visibility.
        */
        toggle(): void;
        /**
        * Raises the showing event.
        * @private
        */
        private raiseShowing;
        /**
        * Raised when the tooltip is showing.
        * @event tooltipShowing
        * @type {EventDispatcher}
        * @property {Tooltip} sender
        * @property {ControlModifyingEventArgs} args
        */
        get tooltipShowing(): EventDispatcher<any>;
        /**
        * Raises the show event.
        * @private
        */
        private raiseShow;
        /**
        * Raised when the tooltip is shown.
        * @event tooltipShow
        * @type {EventDispatcher}
        * @property {Tooltip} sender
        * @property {ControlModifiedEventArgs} args
        */
        get tooltipShow(): EventDispatcher<any>;
        /**
        * Raises the hiding event.
        * @private
        */
        private raiseHiding;
        /**
        * Raised when the tooltip is hiding.
        * @event tooltipHiding
        * @type {EventDispatcher}
        * @property {Tooltip} sender
        * @property {ControlModifyingEventArgs} args
        */
        get tooltipHiding(): EventDispatcher<any>;
        /**
        * Raises the hide event.
        * @private
        */
        private raiseHide;
        /**
        * Raised when the tooltip is hidden.
        * @event tooltipHide
        * @type {EventDispatcher}
        * @property {Tooltip} sender
        * @property {ControlModifiedEventArgs} args
        */
        get tooltipHide(): EventDispatcher<any>;
        /**
        * Handles the mouseover event.
        * @private
        */
        private onMouseOver;
        /**
        * Handles the mouseout event.
        * @private
        */
        private onMouseOut;
        /**
        * Handles the focus event.
        * @private
        */
        private onFocus;
        /**
        * Handles the click event.
        * @private
        */
        private onClick;
        onMouseMove(e: any): void;
        onTooltipMouseMove(e: any): void;
        onTooltipMouseDown(e: any): void;
        onTooltipClick(e: any): void;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { Point } from "@mindfusion/drawing";
    import TemplatedItem from "Common/UI/TemplatedItem";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/ListContainer" {
    /**
    * @class A base class for UI controls, which serve as a container for a list of items.
    * @augments UIControl
    */
    export class ListContainer extends UIControl {
        /**
         * Initializes a new instance of the ListContainer class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         * @param {Object} [renderer] Optional.
         */
        constructor(element?: HTMLElement, renderer?: any);
        _items: ObservableCollection<any>;
        _itemsChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemsChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _selection: ObservableCollection<any>;
        _selectionChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _selectionChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _orientation: number;
        _allowMultipleSelection: boolean;
        _allowDrag: boolean;
        _allowDrop: boolean;
        _allowAutoSearch: boolean;
        _itemSize: Unit;
        _searchString: string;
        renderer: any;
        _itemPropertyChangedHandler: (sender: any, args: any) => void;
        _itemDraw: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemDrawHandler: (sender: any, args: any) => void;
        _itemMouseEnter: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemMouseEnterHandler: (sender: any, args: any) => void;
        _itemMouseLeave: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemMouseLeaveHandler: (sender: any, args: any) => void;
        _itemMouseDown: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemMouseDownHandler: (sender: any, args: any) => void;
        _itemClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemClickHandler: (sender: any, args: any) => void;
        _itemDoubleClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemDoubleClickHandler: (sender: any, args: any) => void;
        _itemDragStart: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemDrag: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemDragEnd: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemDragStartHandler: (sender: any, args: any) => void;
        _itemDragHandler: (sender: any, args: any) => void;
        _itemDragEndHandler: (sender: any, args: any) => void;
        _itemDrop: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _dragOver: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _dragDrop: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _mouseOverHandler: (e: any) => void;
        _mouseUpHandler: (e: any) => void;
        /**
        * Returns a reference to the container's content element.
        * @type {HTMLUListElement}
        * @summary A reference to the container's content element.
        */
        get content(): HTMLUListElement;
        getContent(): any;
        _dragPopup: Tooltip;
        /**
        * Detaches event handlers from a child item.
        * @private
        */
        private detachItem;
        /**
        * Attaches event handlers to a child item.
        * @private
        */
        private attachItem;
        /**
        * Draws and attaches an item.
        * @private
        */
        private addItem;
        /**
        * Detaches and removes an item.
        * @private
        */
        private removeItem;
        /**
        * Redraws and reattaches an item.
        * @private
        */
        private reattachItem;
        /**
        * @private
        */
        private getItemIndex;
        /**
        * @private
        */
        private getDataIndexItem;
        /**
        * @private
        */
        private getDataItem;
        /**
        * Gets the collection of items as a flat list.
        * @type {List}
        * @summary The list of items.
        */
        get flatItems(): any;
        /**
        * Gets the collection of loaded items as a flat list.
        * @type {List}
        * @summary The list of loaded items.
        */
        get loadedItems(): any;
        /**
        * Gets the collection of items, displayed in the view.
        * @type {ObservableCollection}
        * @summary The collection of items.
        */
        get items(): ObservableCollection<any>;
        /**
        * Gets the collection of currently selected items.
        * @type {ObservableCollection}
        * @summary The collection of selected items.
        */
        get selection(): ObservableCollection<any>;
        /**
        * @private
        */
        private set activeIndex(arg);
        /**
        * @private
        */
        private get activeIndex();
        /**
        * @private
        */
        private set activeItem(arg);
        /**
       * @private
       */
        private get activeItem();
        _activeItem: any;
        set allowMultipleSelection(arg: boolean);
        /**
        * Gets or sets a value indicating whether users are allowed to select more than one item at a time.
        * @type {Boolean}
        * @summary true if multiple items can be selected, otherwise false.
        */
        get allowMultipleSelection(): boolean;
        set allowDrag(arg: boolean);
        /**
        * Gets or sets a value indicating whether drag and drop capabilities are enabled.
        * @type {Boolean}
        * @summary true if drag and drop is enabled, otherwise false.
        */
        get allowDrag(): boolean;
        set allowDrop(arg: boolean);
        /**
        * Gets or sets a value indicating whether the control can be used as a drop target.
        * @type {Boolean}
        * @summary true if items can be dropped, otherwise false.
        */
        get allowDrop(): boolean;
        set acceptDrop(arg: ListItem);
        /**
        * Gets or sets the ListItem instance that can be dropped.
        * @type {ListItem}
        * @summary A ListItem instance.
        */
        get acceptDrop(): ListItem;
        _acceptDrop: any;
        set allowAutoSearch(arg: boolean);
        /**
        * Gets or sets a value indicating whether users are allowed to perform search by typing.
        * @type {Boolean}
        * @summary true if auto search is enabled, otherwise false.
        */
        get allowAutoSearch(): boolean;
        set orientation(arg: number);
        /**
        * Gets or sets a value indicating how to arrange child items.
        * @type {Orientation}
        * @summary the orientation of the control.
        */
        get orientation(): number;
        set itemSize(arg: Unit);
        /**
        * Gets or sets the size of the items.
        * @type {Unit}
        * @summary The size.
        */
        get itemSize(): Unit;
        /**
         * Selects an item.
         * @param {ListItem} [item] The item to select.
         * @param {Number} [index] The index of the item to select.
         * @param {Boolean} [single] True to clear existing selection, otherwise false to add the item to the existing selection.
         */
        selectItem(item?: ListItem, index?: number, single?: boolean): void;
        /**
         * Deselects an item.
         * @param {ListItem} item The item to deselect.
         */
        deselectItem(item: ListItem): void;
        /**
         * Gets the item at the specified point.
         * @param {Point} point The point to check.
         * @returns {ListItem} The item at the specified point.
         */
        getItemAt(point: Point): ListItem;
        /**
         * Gets the drop target at the specified point.
         * @private
         */
        private getDropTargetAt;
        autoSearch(searchString: any): void;
        /**
         * Loads items from a data object.
         * @param {Object} data The object containing the items data.
         */
        fromObject(data: any): void;
        /**
         * Serializes items to a JSON string.
         * @returns {String} The serialized JSON.
         */
        toJson(): string;
        /**
         * Deserializes items from a JSON string.
         * @param {String} json A string created by the toJson method.
         */
        fromJson(json: string): void;
        /**
        * Raises the itemsChanging event.
        * @private
        */
        private onItemsChanging;
        /**
        * Raises the itemsChanged event.
        * @private
        */
        private onItemsChanged;
        /**
        * Raises the selectionChanging event.
        * @private
        */
        private onSelectionChanging;
        /**
        * Raises the selectionChanged event.
        * @private
        */
        private onSelectionChanged;
        /**
        * Handles the propertyChanged event in a child item.
        * Triggers redraw of the item if a layout-depending property is changed.
        * @private
        */
        private onItemPropertyChanged;
        /**
         * Raised when the items collection is changing.
         * @event itemsChanging
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {NotifyCollectionChangingEventArgs} args
         */
        get itemsChanging(): EventDispatcher<any>;
        /**
         * Raised when the items collection is changed.
         * @event itemsChanged
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {NotifyCollectionChangedEventArgs} args
         */
        get itemsChanged(): EventDispatcher<any>;
        /**
         * Raised when the selection collection is changing.
         * @event selectionChanging
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {NotifyCollectionChangingEventArgs} args
         */
        get selectionChanging(): EventDispatcher<any>;
        /**
         * Raised when the selection collection is changed.
         * @event selectionChanged
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {NotifyCollectionChangedEventArgs} args
         */
        get selectionChanged(): EventDispatcher<any>;
        /**
         * Raised when an item is being drawn.
         * @event itemDraw
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemDraw(): EventDispatcher<any>;
        /**
        * Handles the draw event in a child item.
        * @private
        */
        private onItemDraw;
        /**
         * Raised when a mouseenter event occurs in an item's element.
         * @event itemMouseEnter
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemMouseEnter(): EventDispatcher<any>;
        /**
        * Handles the mouseenter event in a child item.
        * @private
        */
        private onItemMouseEnter;
        /**
         * Raised when a mouseleave event occurs in an item's element.
         * @event itemMouseLeave
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemMouseLeave(): EventDispatcher<any>;
        /**
        * Handles the mouseleave event in a child item.
        * @private
        */
        private onItemMouseLeave;
        /**
         * Raised when a mousedown event occurs in an item's element.
         * @event itemMouseDown
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemMouseDown(): EventDispatcher<any>;
        /**
        * Handles the mousedown event in an item.
        * @private
        */
        private onItemMouseDown;
        /**
         * Raised when an item is clicked.
         * @event itemClick
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemClick(): EventDispatcher<any>;
        /**
        * Handles the click event in a child item.
        * @private
        */
        private onItemClick;
        /**
         * Raised when an item is double-clicked.
         * @event itemDoubleClick
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {ItemEventArgs} args
         */
        get itemDoubleClick(): EventDispatcher<any>;
        /**
        * Handles the double-clicked event in a child item.
        * @private
        */
        private onItemDoubleClick;
        /**
        * Handles the items DragBehavior dragStart event.
        * @private
        */
        private onItemDragStart;
        _dragTarget: any;
        _dropTarget: {
            holder: HTMLDivElement;
        };
        /**
        * Handles the items DragBehavior drag event.
        * @private
        */
        private onItemDrag;
        /**
        * Handles the items DragBehavior dragEnd event.
        * @private
        */
        private onItemDragEnd;
        dropAccepted(): boolean;
        /**
        * Finalizes a drag-drop operation.
        * @private
        */
        private addDroppedItem;
        /**
        * Handles drop operations started from outside the control.
        * @private
        */
        private onMouseOver;
        /**
        * Handles drop operations started from outside the control.
        * @private
        */
        private onMouseUp;
        _clearSearchTimeout: number;
        /**
        * Raises the itemDragStart event.
        * @private
        */
        private raiseItemDragStart;
        /**
        * Raised when a drag operation on an item is started.
        * @event itemDragStart
        * @type {EventDispatcher}
        * @property {ListItem} sender
        * @property {InteractionEventArgs} args
        */
        get itemDragStart(): EventDispatcher<any>;
        /**
        * Raises the itemDrag event.
        * @private
        */
        private raiseItemDrag;
        /**
        * Raised when an item is dragged.
        * @event itemDrag
        * @type {EventDispatcher}
        * @property {ListItem} sender
        * @property {InteractionEventArgs} args
        */
        get itemDrag(): EventDispatcher<any>;
        /**
        * Raises the itemDragEnd event.
        */
        raiseItemDragEnd(sender: any, args: any): boolean;
        /**
        * Raised when a drag operation on an item is finished.
        * @event itemDragEnd
        * @type {EventDispatcher}
        * @property {ListItem} sender
        * @property {InteractionEventArgs} args
        */
        get itemDragEnd(): EventDispatcher<any>;
        /**
        * Raises the dragOver event.
        * @private
        */
        private raiseDragOver;
        /**
         * Raised when an item is dragged over the control.
         * @event dragOver
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {DragDropEventArgs} args
         */
        get dragOver(): EventDispatcher<any>;
        /**
        * Raises the dragDrop event.
        * @private
        */
        private raiseDragDrop;
        /**
         * Raised when an item is dropped onto the control.
         * @event dragDrop
         * @type {EventDispatcher}
         * @property {ListContainer} sender
         * @property {DragDropEventArgs} args
         */
        get dragDrop(): EventDispatcher<any>;
        /**
        * Raises the itemDrop event.
        * @private
        */
        private raiseItemDrop;
        /**
        * Raised when a drop operation is finished.
        * @event itemDrop
        * @type {EventDispatcher}
        * @property {ListContainer} sender
        * @property {ItemEventArgs} args
        */
        get itemDrop(): EventDispatcher<any>;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { EventDispatcher } from "@mindfusion/common";
    import { Unit } from "@mindfusion/common";
    import { Tooltip } from "Common/UI/Tooltip";
    import { ListItem } from "Common/UI/ListItem";
    import { Point } from "@mindfusion/drawing";
}
declare module "Common/UI/ToolStripItem" {
    /**
    * @class Represents an item in a ToolStrip control.
    * @augments ListItem
    */
    export class ToolStripItem extends ListItem {
        /**
         * Initializes a new instance of the ToolStripItem class.
         * @constructor
         * @param {ToolStripItemType} [type] The type of this item.
         * @param {String} [title] The display text of this item.
         */
        constructor(type?: ToolStripItemType, title?: string);
        _type: number;
        maxSize: Unit;
        /**
        * Gets the type of the item.
        * @type {ToolStripItemType}
        * @summary The type of the item.
        */
        get type(): number;
    }
    import { ListItem } from "Common/UI/ListItem";
    import { Unit } from "@mindfusion/common";
    import { ToolStripItemType } from "Common/UI/Enum";
}
declare module "Common/UI/ToolStrip" {
    /**
     * Represents a container of toolbar buttons.
     * @augments ListContainer
     */
    export class ToolStrip extends ListContainer {
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _collapsible: boolean;
        _scrollable: boolean;
        _itemDragOut: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        scrollDelegate: (sender: any) => void;
        _scrollIndex: number;
        _scrollDirection: number;
        /**
        * Collapses the toolstrip.
        */
        collapse(): void;
        /**
        * Expands the toolstrip.
        */
        expand(): void;
        bringIntoView(item: any): void;
        /**
        * @private
        */
        private set scrollIndex(arg);
        /**
        * @private
        */
        private get scrollIndex();
        set scrollable(arg: boolean);
        /**
        * Gets or sets a value indicating whether the toolstrip displays scroll arrows when there is not enough room to display all items.
        * @type {Boolean}
        * @summary true if the toolstrip displays scroll arrows, otherwise false.
        */
        get scrollable(): boolean;
        set collapsible(arg: boolean);
        /**
        * Gets or sets a value indicating whether the toolstrip can be collapsed.
        * @type {Boolean}
        * @summary true if the toolstrip can be collapsed, otherwise false.
        */
        get collapsible(): boolean;
        /**
        * Gets a value indicating whether the toolstrip is currently expanded.
        * @type {Boolean}
        * @summary true if the toolstrip is expanded, otherwise false.
        */
        get expanded(): boolean;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this toolstrip.
        * @type {Control}
        * @summary The parent control of this toolstrip.
        */
        get parent(): any;
        _parent: any;
        startScroll(e: any): void;
        scrollInterval: number;
        scroll(): void;
        stopScroll(): void;
        resetCues(): void;
        scrollMaxed(): boolean;
        /**
        * Handles transitionend event for collapsible toolStrip.
        * @private
        */
        private onTransitionEnd;
        /**
        * Raises the itemDragOut event.
        * @private
        */
        private raiseItemDragOut;
        /**
        * Raised when a child item is dragged outside the control element.
        * @private
        */
        private get itemDragOut();
    }
    import { ListContainer } from "Common/UI/ListContainer";
    import { Unit } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/DateTimeView" {
    /**
    * @class A base class for calendar views.
    * @augments UIControl
    */
    export class DateTimeView extends UIControl {
        /**
         * Initializes a new instance of the DateTimeView class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         * @param {HTMLElement} [calendar] Optional.
         */
        constructor(element?: HTMLElement, calendar?: HTMLElement);
        _date: Date;
        _buttonClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _toolstripButtonClickHandler: (sender: any, args: any) => void;
        _cellClickHandler: (e: any) => void;
        _footerClickHandler: (e: any) => void;
        private set calendar(arg);
        /**
        * Gets or sets the host calendar of this view.
        * @type {Calendar}
        * @summary The host calendar of this view.
        * @private
        */
        private get calendar();
        _commandStrip: ToolStrip;
        cells: any;
        _min: Date;
        _max: Date;
        /**
        * Gets a reference to the default commands toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        * @private
        */
        private get commandStrip();
        /**
        * For internal use only.
        * @private
        */
        private drawHeader;
        /**
        * For internal use only.
        * @private
        */
        private drawContent;
        updateSelection(): void;
        selection: any;
        inRange(date: any): boolean;
        _calendar: any;
        set date(arg: Date);
        /**
        * Gets or sets the date represented by this view.
        * @type {Date}
        * @summary A Date instance.
        */
        get date(): Date;
        set locale(arg: any);
        /**
        * Gets or sets the locale object used to format and display localizable information in the view.
        * @type {Object}
        * @summary The locale.
        */
        get locale(): any;
        _locale: any;
        /**
        * Gets the locale object used to format and display date and time information in the view.
        * @type {Object}
        * @summary The format info object.
        */
        get formatInfo(): any;
        /**
        * Raises the cellClick event.
        * @private
        */
        private raiseCellClick;
        /**
         * Raised when a date-time cell is clicked.
         * @event cellClick
         * @type {EventDispatcher}
         * @property {DateTimeView} sender
         * @property {ItemEventArgs} args
         */
        get cellClick(): EventDispatcher<any>;
        /**
        * Raises the buttonClick event.
        * @private
        */
        private raiseButtonClick;
        /**
         * Raised when a button in the command strip is clicked.
         * @event buttonClick
         * @type {EventDispatcher}
         * @property {DateTimeView} sender
         * @property {ItemEventArgs} args
         */
        get buttonClick(): EventDispatcher<any>;
        /**
        * Handles the toolstrip buttonclick event.
        * @private
        */
        private onToolstripButtonClick;
        onCellClick(e: any): void;
        onFooterClick(e: any): void;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { EventDispatcher } from "@mindfusion/common";
    import { ToolStrip } from "Common/UI/ToolStrip";
}
declare module "Common/UI/MonthView" {
    /**
    * @class Displays a month, represented by a grid of day cells.
    * @augments DateTimeView
    */
    export class MonthView extends DateTimeView {
        span: number;
        getTitle(): any;
        increment(): void;
        decrement(): void;
        get dateValue(): Date;
    }
    import { DateTimeView } from "Common/UI/DateTimeView";
}
declare module "Common/UI/YearView" {
    /**
    * @class Displays a year, represented by a grid of month cells.
    * @augments DateTimeView
    */
    export class YearView extends DateTimeView {
        span: number;
        increment(): void;
        decrement(): void;
        get dateValue(): Date;
    }
    import { DateTimeView } from "Common/UI/DateTimeView";
}
declare module "Common/UI/DecadeView" {
    /**
    * @class Displays a decade, represented by a grid of year cells.
    * @augments DateTimeView
    */
    export class DecadeView extends DateTimeView {
        span: number;
        getDecadeStart(): Date;
        getTitle(): string;
        increment(): void;
        decrement(): void;
        get dateValue(): Date;
    }
    import { DateTimeView } from "Common/UI/DateTimeView";
}
declare module "Common/UI/DayView" {
    /**
    * @class Displays a day, represented by a grid of arbitrary time interval cells.
    * @augments DateTimeView
    */
    export class DayView extends DateTimeView {
        span: number;
        _minTime: number;
        _maxTime: number;
        _interval: number;
        columns: number;
        _minDate: Date;
        _maxDate: Date;
        getTitle(): any;
        increment(): void;
        decrement(): void;
        get dateValue(): Date;
        set interval(arg: number);
        /**
        * Gets or sets the time interval of a view cell.
        * @type {Number}
        * @summary The time interval in milliseconds.
        */
        get interval(): number;
        set minTime(arg: number);
        /**
        * Gets or sets the minimum value displayed in the view.
        * @type {Number}
        * @summary The minimum value in milliseconds.
        */
        get minTime(): number;
        set maxTime(arg: number);
        /**
        * Gets or sets the maximum value displayed in the view.
        * @type {Number}
        * @summary The maximum value in milliseconds.
        */
        get maxTime(): number;
        get format(): any;
    }
    import { DateTimeView } from "Common/UI/DateTimeView";
}
declare module "Common/UI/Calendar" {
    /**
    * @class Represents a month calendar.
    * @augments UIControl
    */
    export class Calendar extends UIControl {
        /**
         * Initializes a new instance of the Calendar class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _buttonClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _viewClickHandler: (sender: any, args: any) => void;
        _toolstripButtonClickHandler: (sender: any, args: any) => void;
        _selectedDateChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _selectedDateChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _viewChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _date: Date;
        _span: number;
        _minSpan: number;
        _maxSpan: number;
        _commandStrip: ToolStrip;
        onViewClick(sender: any, args: any): void;
        set date(arg: Date);
        /**
        * Gets or sets the date of the calendar.
        * @type {Date}
        * @summary The date.
        */
        get date(): Date;
        set span(arg: number);
        /**
        * Gets or sets the current date-time span of the calendar.
        * @type {TimeUnit}
        * @summary One of the TimeUnit enumeration values.
        * @remarks Currently supported values are TimeSpan.Day, TimeSpan.Month, TimeSpan.Year and TimeSpan.Decade.
        */
        get span(): number;
        updateView(span: any): void;
        /**
        * @private
        */
        set view(arg: any);
        /**
        * Gets the current calendar view.
        * @type {DateTimeView}
        * @summary The current view.
        */
        get view(): any;
        detachView(): void;
        attachView(): void;
        /**
        * Gets a reference to the default commands toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        * @private
        */
        private get commandStrip();
        /**
        * For internal use only.
        * @private
        */
        private drawFooter;
        set minSpan(arg: number);
        /**
        * Gets or sets the minimum date-time span of the calendar.
        * @type {TimeUnit}
        * @summary One of the TimeUnit enumeration values.
        * @remarks Currently supported values are TimeSpan.Day, TimeSpan.Month, TimeSpan.Year and TimeSpan.Decade.
        */
        get minSpan(): number;
        set maxSpan(arg: number);
        /**
        * Gets or sets the maximum date-time span of the calendar.
        * @type {TimeUnit}
        * @summary One of the TimeUnit enumeration values.
        * @remarks Currently supported values are TimeSpan.Day, TimeSpan.Month, TimeSpan.Year and TimeSpan.Decade.
        */
        get maxSpan(): number;
        _view: any;
        set locale(arg: Locale);
        /**
        * Gets or sets the locale object used to format and display localizable information in the calendar.
        * @type {Locale}
        * @summary The locale.
        */
        get locale(): Locale;
        _locale: Locale;
        /**
        * Gets the DateSettings object used to format and display date and time information in the calendar.
        * @type {DateSettings}
        * @summary The format info object.
        */
        get formatInfo(): any;
        /**
        * Handles the toolstrip buttonclick event.
        * @private
        */
        private onToolstripButtonClick;
        /**
        * Raised when the selected date is changing.
        * @event selectedDateChanging
        * @type {EventDispatcher<ValueChangingEventArgs>}
        * @property {Calendar} sender
        * @property {ValueChangingEventArgs} args
        */
        get selectedDateChanging(): EventDispatcher<ValueChangingEventArgs>;
        /**
        * Raises the selectedDateChanging event.
        * @private
        */
        private onSelectedDateChanging;
        /**
        * Raised when the selected date is changed.
        * @event selectedDateChanged
        * @type {EventDispatcher<ValueChangedEventArgs>}
        * @property {Calendar} sender
        * @property {ValueChangedEventArgs} args
        */
        get selectedDateChanged(): EventDispatcher<ValueChangedEventArgs>;
        /**
        * Raises the selectedDateChanged event.
        * @private
        */
        private onSelectedDateChanged;
        /**
        * Raised when the selected view is changed.
        * @event viewChanged
        * @type {EventDispatcher<ControlModifiedEventArgs>}
        * @property {Calendar} sender
        * @property {ControlModifiedEventArgs} args
        */
        get viewChanged(): EventDispatcher<ControlModifiedEventArgs>;
        /**
        * Raises the viewChanged event.
        * @private
        */
        private onViewChanged;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { EventDispatcher } from "@mindfusion/common";
    import { Unit } from "@mindfusion/common";
    import { ToolStrip } from "Common/UI/ToolStrip";
    import { Locale } from "@mindfusion/common";
    import { ValueChangingEventArgs } from "Common/UI/EventArgs";
    import { ValueChangedEventArgs } from "Common/UI/EventArgs";
    import { ControlModifiedEventArgs } from "Common/UI/EventArgs";
}
declare module "Common/UI/WindowBase" {
    export default WindowBase;
    /**
    * @class Represents a window, which can be either templated or rendered as an IFrame.
    * @augments UIControl
    */
    class WindowBase extends UIControl {
        /**
         * Initializes a new instance of the WindowBase class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _buttonClick: EventDispatcher<EventArgs>;
        _contentLoad: EventDispatcher<EventArgs>;
        _windowOpening: EventDispatcher<EventArgs>;
        _windowOpen: EventDispatcher<EventArgs>;
        _windowClosing: EventDispatcher<EventArgs>;
        _windowClose: EventDispatcher<EventArgs>;
        _stateChanging: EventDispatcher<EventArgs>;
        _stateChanged: EventDispatcher<EventArgs>;
        contentLoadHandler: (e: any) => void;
        getInnerContent(): any;
        /**
        * For internal use only.
        * @private
        */
        private drawContent;
        set template(arg: string);
        /**
        * Gets or sets the window content template.
        * @type {String}
        * @summary An HTML string representing the content template.
        */
        get template(): string;
        _template: string;
        set templateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded in the control.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded in the control's content IFrame.
        */
        get templateUrl(): string;
        _templateUrl: string;
        set navigateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded in the control.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded in the control's content IFrame.
        */
        get navigateUrl(): string;
        _navigateUrl: string;
        /**
        * @private
        */
        set host(arg: any);
        /**
        * Gets the host of this window.
        * @type {Container}
        * @summary The host control.
        */
        get host(): any;
        _host: any;
        /**
        * Gets the host element.
        * @type {HTMLElement}
        * @summary The host element.
        */
        get hostElement(): HTMLElement;
        set windowState(arg: number);
        /**
        * Gets or sets the state of this window.
        * @type {WindowState}
        * @summary The window state.
        */
        get windowState(): number;
        _windowState: any;
        /**
        * Raises the contentLoad event.
        * @private
        */
        private raiseContentLoad;
        /**
        * Raised when the windows's contents are loaded.
        * @event contentLoad
        * @type {EventDispatcher}
        * @property {WindowBase} sender
        * @property {EventArgs} args
        */
        get contentLoad(): EventDispatcher<any>;
        /**
        * Raises the opening event.
        * @private
        */
        private raiseOpening;
        /**
        * Raised when the window is opening.
        * @event windowOpening
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifyingEventArgs} args
        */
        get windowOpening(): EventDispatcher<any>;
        /**
        * Raises the open event.
        * @private
        */
        private raiseOpen;
        /**
        * Raised when the window is opened.
        * @event windowOpen
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifiedEventArgs} args
        */
        get windowOpen(): EventDispatcher<any>;
        /**
        * Raises the closing event.
        * @private
        */
        private raiseClosing;
        /**
        * Raised when the window is closing.
        * @event windowClosing
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifyingEventArgs} args
        */
        get windowClosing(): EventDispatcher<any>;
        /**
        * Raises the close event.
        * @private
        */
        private raiseClose;
        /**
        * Raised when the window is closed.
        * @event windowClose
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifiedEventArgs} args
        */
        get windowClose(): EventDispatcher<any>;
        /**
        * Raises the stateChanging event.
        * @private
        */
        private raiseStateChanging;
        /**
        * Raised when the window's state is changing.
        * @event stateChanging
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifyingEventArgs} args
        */
        get stateChanging(): EventDispatcher<any>;
        /**
        * Raises the stateChanged event.
        * @private
        */
        private raiseStateChanged;
        /**
        * Raised when the window's state is changed.
        * @event stateChanged
        * @type {EventDispatcher}
        * @property {WindowBase} sender
          * @property {ControlModifiedEventArgs} args
        */
        get stateChanged(): EventDispatcher<any>;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/Interactions/ResizeBehavior" {
    export default ResizeBehavior;
    /**
    * @private
    */
    class ResizeBehavior {
        /**
         * Initializes a new instance of the ResizeBehavior class.
         * @constructor
         */
        constructor(control: any, options: any);
        _control: any;
        _target: any;
        _handles: any;
        /**
        * Sets the parent DomElement object that will define the constrains of a drag operation.
        * @param {Object} value The DomElement object.
        */
        set parent(arg: any);
        /**
        * Gets the parent DomElement object that will define the constrains of a drag operation.
        * @returns {Object} The DomElement object.
        */
        get parent(): any;
        stayInParent: any;
        set minSize(arg: any);
        get minSize(): any;
        cacheParentCursor: any;
        content: any;
        overlayed: any;
        mouseDownHandler: (e: any) => void;
        mouseMoveHandler: (e: any) => void;
        mouseUpHandler: (e: any) => void;
        _resizeStart: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resize: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resizeEnd: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        get control(): any;
        detach(): void;
        onMouseDown(e: any): void;
        startPos: {
            x: any;
            y: any;
        };
        curHandle: any;
        initialPos: Point;
        initialBounds: Rect;
        initialRect: Rect;
        onMouseMove(e: any): void;
        onMouseUp(e: any): void;
        startResize(e: any): void;
        isResizing: boolean;
        addOverlay(): void;
        overlay: HTMLDivElement;
        doResize(e: any): void;
        currentRect: any;
        endResize(e: any): void;
        /**
        * Raises the resizeStart event.
        */
        onResizeStart(e: any, action: any): boolean;
        get resizeStart(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Raises the resize event.
        */
        onResize(e: any, action: any): boolean;
        get resize(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
      * Raises the resizeEnd event.
      */
        onResizeEnd(e: any, action: any): boolean;
        get resizeEnd(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
        mouseMoved(e: any): boolean;
        makeRect(x1: any, y1: any, x2: any, y2: any, bounds: any, handle: any): Rect;
        setCursor(handle: any): void;
        getCursorPos(e: any, element: any): {
            x: any;
            y: any;
        };
        /**
        * Gets the DomElement object that the ResizeBehavior is associated with.
        * @returns {Object} The DomElement object.
        */
        get target(): any;
        /**
        * Gets the DomElement object from which the drag operation can be initiated.
        * @returns {Object} The DomElement object.
        */
        get handles(): any;
        _parent: any;
        _minSize: any;
    }
    import { EventDispatcher } from "@mindfusion/common";
    import { Point } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Common/UI/Window" {
    /**
    * @class Represents a window with title and contents, which can be moved, resized and arranged interactively.
    * @augments WindowBase
    */
    export class Window extends WindowBase {
        _modal: boolean;
        _allowPin: boolean;
        _allowRefresh: boolean;
        _allowDrag: boolean;
        _allowResize: boolean;
        _allowMinimize: boolean;
        _allowMaximize: boolean;
        _allowClose: boolean;
        set title(arg: string);
        /**
        * Gets or sets the title text of this window.
        * @type {String}
        * @summary The title.
        */
        get title(): string;
        set minWidth(arg: Unit);
        /**
        * Gets or sets  the minimum allowed width of this window.
        * @type {Unit}
        * @summary The minimum allowed width.
        */
        get minWidth(): Unit;
        set minHeight(arg: Unit);
        /**
        * Gets or sets the minimum allowed height of this window.
        * @type {Unit}
        * @summary The minimum allowed height.
        */
        get minHeight(): Unit;
        _dragStartHandler: (sender: any, args: any) => void;
        _dragEndHandler: (sender: any, args: any) => void;
        _resizeStartHandler: (sender: any, args: any) => void;
        _resizeEndHandler: (sender: any, args: any) => void;
        _toolstripButtonClickHandler: (sender: any, args: any) => void;
        _headerClickHandler: (e: any) => void;
        _headerDoubleClickHandler: (e: any) => void;
        _dragStart: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _dragEnd: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resizeStart: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resizeEnd: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _headerClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _commandStrip: ToolStrip;
        /**
        * Returns a reference to the DOM element of the window header.
        * @type {HTMLElement}
        * @summary A reference to the DOM element of the window header.
        */
        get header(): HTMLElement;
        /**
        * Returns a reference to the DOM element of the window footer.
        * @type {HTMLElement}
        * @summary A reference to the DOM element of the window footer.
        */
        get footer(): HTMLElement;
        getContent(): any;
        getHeader(): any;
        getResizeHandles(): any;
        getFooter(): any;
        getDimensions(): void;
        /**
        * @private
        */
        private drawHeader;
        /**
        * @private
        */
        private drawFooter;
        /**
        * Shows the window.
        */
        open(): void;
        /**
        * Closes the window.
        */
        close(): void;
        /**
        * Minimizes the window.
        */
        minimize(): void;
        /**
        * Maximizes the window.
        */
        maximize(): void;
        /**
        * Restores the window to a normal state.
        */
        restore(): void;
        /**
        * Reloads the window iframe.
        */
        refresh(): void;
        /**
        * Pins the window. Pinned windows cannot be moved or resized.
        */
        pin(): void;
        set pinned(arg: boolean);
        /**
        * Gets or sets a value, indicating whether this window is pinned.
        * @type {Boolean}
        * @summary true if the window is pinned, otherwise false.
        * @remarks Pinned windows cannot be moved or resized.
        */
        get pinned(): boolean;
        /**
        * Unpins the window.
        */
        unpin(): void;
        /**
        * Resizes the window to fit its contents.
        */
        autoSize(): void;
        _title: any;
        set useFrameTitle(arg: boolean);
        /**
        * Gets or sets a value indicating whether the window will display the title of its content iframe.
        * @type {Boolean}
        * @summary true if the window should display the iframe title, otherwise false
        */
        get useFrameTitle(): boolean;
        _useFrameTitle: any;
        set iconSrc(arg: string);
        /**
        * Gets or sets the icon, displayed in the headerof this window.
        * @type {String}
        * @summary The URL of the icon.
        */
        get iconSrc(): string;
        _iconSrc: any;
        /**
        * Gets a reference to the default commands toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        * @private
        */
        private get commandStrip();
        set allowPin(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show a pin button in the header toolStrip.
        * @type {Boolean}
        * @summary true to show a pin button, otherwise false.
        */
        get allowPin(): boolean;
        set allowRefresh(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show a refresh button in the header toolStrip.
        * @type {Boolean}
        * @summary true to show a refresh button, otherwise false.
        */
        get allowRefresh(): boolean;
        set allowMinimize(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show a minimize button in the header toolStrip.
        * @type {Boolean}
        * @summary true to show a minimize button, otherwise false.
        */
        get allowMinimize(): boolean;
        set allowMaximize(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show a maximize button in the header toolStrip.
        * @type {Boolean}
        * @summary true to show a maximize button, otherwise false.
        */
        get allowMaximize(): boolean;
        set allowDrag(arg: boolean);
        /**
        * Gets or sets a value indicating whether this window can be dragged.
        * @type {Boolean}
        * @summary true if the window can be dragged, otherwise false.
        */
        get allowDrag(): boolean;
        set allowResize(arg: boolean);
        /**
        * Gets or sets a value indicating whether this window can be resized.
        * @type {Boolean}
        * @summary true if the window can be resized, otherwise false.
        */
        get allowResize(): boolean;
        set allowClose(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show a close button in the header toolStrip.
        * @type {Boolean}
        * @summary true to show a close button, otherwise false.
        */
        get allowClose(): boolean;
        _minWidth: any;
        _minHeight: any;
        set modal(arg: boolean);
        /**
        * Gets or sets a value indicating whether this window should be modal.
        * @type {Boolean}
        * @summary true if the window should be modal, otherwise false.
        */
        get modal(): boolean;
        _pinned: any;
        /**
        * Closes the window without raising events.
        */
        doClose(): void;
        /**
        * Opens the window without raising events.
        */
        doOpen(): void;
        /**
        * Positions the window in the center of its host element or specified rect.
        * @param {Rect} [rect] The rect to center in.
        */
        center(rect?: Rect): void;
        /**
        * Updates window dimensions after applying changes to DOM elements.
        * @param {Boolean} [autoSize] True to autosize the window, otherwise false.
        */
        updateBounds(autoSize?: boolean): void;
        /**
        * Restores the window to its original state and bounds.
        * @private
        */
        private doRestore;
        restoreSize(): void;
        doMinimize(): void;
        _restoreBounds: Rect;
        doMaximize(): void;
        /**
        * Resets interaction behaviors.
        * @private
        */
        private resetInteraction;
        /**
        * Resets drag behavior.
        * @private
        */
        private resetDragInteraction;
        dragBehavior: DragBehavior;
        /**
        * Resets resize behavior.
        * @private
        */
        private resetResizeInteraction;
        resizeBehavior: ResizeBehavior;
        resetState(oldState: any, newState: any): void;
        resetCommandStrip(): void;
        /**
        * Resets the modal overlay.
        * @private
        */
        private resetModalOverlay;
        overlay: HTMLDivElement;
        /**
        * Raises the headerClick event.
        * @private
            */
        private raiseHeaderClick;
        /**
         * Raised when the window header is clicked.
         * @event headerClick
         * @type {EventDispatcher}
         * @property {Window} sender
         * @property {MouseEvent} args
         */
        get headerClick(): EventDispatcher<any>;
        /**
        * Raises the dragStart event.
        * @private
        */
        private raiseDragStart;
        /**
        * Raised when a drag operation is started.
        * @event dragStart
        * @type {EventDispatcher}
        * @property {Window} sender
        * @property {InteractionEventArgs} args
        */
        get dragStart(): EventDispatcher<any>;
        /**
        * Raises the dragEnd event.
        * @private
        */
        private raiseDragEnd;
        /**
        * Raised when drag operation is finished.
        * @event dragEnd
        * @type {EventDispatcher}
        * @property {Window} sender
        * @property {InteractionEventArgs} args
        */
        get dragEnd(): EventDispatcher<any>;
        /**
        * Raises the resizeStart event.
        * @private
        */
        private raiseResizeStart;
        /**
        * Raised when a resize operation is started.
        * @event resizeStart
        * @type {EventDispatcher}
        * @property {Window} sender
        * @property {InteractionEventArgs} args
        */
        get resizeStart(): EventDispatcher<any>;
        /**
        * Raises the resizeEnd event.
        * @private
        */
        private raiseResizeEnd;
        /**
        * Raised when a resize operation is finished.
        * @event resizeEnd
        * @type {EventDispatcher}
        * @property {Window} sender
        * @property {InteractionEventArgs} args
        */
        get resizeEnd(): EventDispatcher<any>;
        /**
        * Raises the buttonClick event.
        * @private
        */
        private raiseButtonClick;
        /**
         * Raised when a button in the command strip is clicked.
         * @event buttonClick
         * @type {EventDispatcher}
         * @property {Window} sender
         * @property {ItemEventArgs} args
         */
        get buttonClick(): EventDispatcher<any>;
        /**
        * Handles the header click event.
        * @private
        */
        private onHeaderClick;
        /**
        * Handles the header doubleClick event.
        * @private
        */
        private onHeaderDoubleClick;
        /**
        * Handles the DragBehavior dragStart event.
        * @private
        */
        private onDragStart;
        /**
        * Handles the DragBehavior dragEnd event.
        * @private
        */
        private onDragEnd;
        /**
        * Handles the ResizeBehavior resizeStart event.
        * @private
        */
        private onResizeStart;
        /**
        * Handles the ResizeBehavior resizeEnd event.
        * @private
        */
        private onResizeEnd;
        /**
        * Handles the toolstrip buttonclick event.
        * @private
        */
        private onToolstripButtonClick;
    }
    import WindowBase from "Common/UI/WindowBase";
    import { Unit } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
    import { ToolStrip } from "Common/UI/ToolStrip";
    import { Rect } from "@mindfusion/drawing";
    import DragBehavior from "Common/UI/Interactions/DragBehavior";
    import ResizeBehavior from "Common/UI/Interactions/ResizeBehavior";
}
declare module "Common/UI/Dialog" {
    export default Dialog;
    /**
    * @class Represents a modal dialog box.
    * @augments Win
    */
    class Dialog extends Win {
        /**
         * Initializes a new instance of the Dialog class.
         * @constructor
         * @param {HTMLElement} parent The DOM element to which to append the dialog.
         */
        constructor(parent: HTMLElement);
        _hostElement: HTMLElement;
        modalResult: number;
        clickHandler: (e: any) => void;
        keyUpHandler: (e: any) => any;
        /**
        * Gets the parent element of this dialog.
        * @returns {HTMLElement} The parent element.
        */
        get parent(): HTMLElement;
        /**
        * Handles the click event.
        * @private
        */
        private onButtonClick;
    }
    import { Window as Win } from "Common/UI/Window";
}
declare module "Common/UI/ConfirmDialog" {
    /**
    * @class Represents a modal dialog box with OK and Cancel buttons.
    * @augments Dialog
    */
    export class ConfirmDialog extends Dialog {
        /**
         * Initializes a new instance of the ConfirmDialog class.
         * @constructor
         * @param {String} [title] The text to display as a dialog title.
         * @param {String} [message] The message to display as the dialog text.
         * @param {HTMLElement} [parent] The Dom element to append the dialog to.
         * If the parameter is not specified, the dialog will be appended to document.body.
         */
        constructor(title?: string, message?: string, parent?: HTMLElement);
        /**
         * Creates the dialog contents.
         * @private
         */
        private createTemplate;
        /**
        * Handles the keyup event.
        * @private
        */
        private onKeyUp;
    }
    import Dialog from "Common/UI/Dialog";
}
declare module "Common/UI/Container" {
    export default Container;
    /**
    * @class A base class for UI container controls.
    * @augments UIControl
    */
    class Container extends UIControl {
        /**
         * Initializes a new instance of the Container class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _children: ObservableCollection<any>;
        _childFocusHandler: (sender: any, args: any) => void;
        resizeHandler: (e: any) => void;
        /**
        * Returns a reference to the container's content element.
        * @type {HTMLDivElement}
        * @summary A reference to the container's content element.
        */
        get content(): HTMLDivElement;
        getContent(): any;
        zOrder: Map<any, any>;
        baseZIndex: number;
        detachChild(window: any): void;
        attachChild(window: any): void;
        /**
        * Ensures that a child window fits into content bounds.
        * @param {WindowBase} window The child window to check.
        */
        fit(window: any): void;
        /**
        * Resizes a child window to fit parent bounds.
        * @param {WindowBase} window The child window.
        * @param {Rect} bounds the new bounds.
        * @private
        */
        private fitInBounds;
        /**
        * Relocates a child window to fit parent bounds.
        * @param {WindowBase} window The child window.
        * @param {Point} location The new location.
        * @private
        */
        private moveToBounds;
        /**
        * Brings a child window to the front, effectively making it topmost and active.
        * @param {WindowBase} window The window to bring to front.
        */
        bringToFront(window: any, ofStack: any): void;
        /**
        * Sends a child window to the back.
        * @param {WindowBase} window The window to send to back.
        */
        sendToBack(window: any, ofStack: any): void;
        /**
        * Moves a child window up or down in the zOrder list.
        * @param {WindowBase} window The window to move.
        * @param {Boolean} up True to move to the end of the zOrder list (bring to front), or false otherwise.
        * @param {Boolean} ofStack True to move only within the stack of windows with the same windowState
        * @private
        */
        private moveInZOrder;
        /**
        * @private
        */
        private getStackZIndex;
        /**
        * Updates the zOrder dictionary to reflect changes in the zIndex positions.
        * @private
        */
        private updateZOrder;
        /**
        * Gets the collection of child windows.
        * @type {ObservableCollection}
        * @summary The collection of child windows.
        */
        get children(): ObservableCollection<any>;
        /**
        * Gets the topmost child window.
        * @type {WindowBase}
        * @summary The topmost child.
        */
        get activeChild(): any;
        /**
        * Gets the bounds of this container's content.
        * @type {Rect}
        * @summary The bounds.
        */
        get contentBounds(): Rect;
        /**
        * Gets the bounding rect of this container's content.
        * @type {Rect}
        * @summary The bounding rect.
        */
        get contentRect(): Rect;
        /**
        * Attaches event handlers to a new child window.
        * @param {WindowBase} child The new child window.
        * @private
        */
        private addChild;
        /**
        * Detaches event handlers from a child window.
        * @param {WindowBase} child The child window.
        * @private
        */
        private removeChild;
        onChildrenChanged(sender: any, args: any): void;
        /**
        * Bring a child window to front on focus.
        * @private
        */
        private onChildFocus;
        /**
        * Refit child windows on browser window change.
        * @private
        */
        private onResize;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { Unit } from "@mindfusion/common";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Common/UI/Content" {
    export default Content;
    /**
    * @class Represents a content, which can be either templated or rendered as an IFrame.
    * @private
    */
    class Content {
        /**
         * Initializes a new instance of the Content class.
         * @constructor
         */
        constructor(parent: any);
        _parent: any;
        _contentLoad: EventDispatcher<EventArgs>;
        contentLoadHandler: (e: any) => void;
        get element(): HTMLDivElement;
        get innerContent(): ChildNode;
        /**
        * @private
        */
        private detach;
        /**
        * @private
        */
        private attach;
        /**
        * For internal use only.
        * @private
        */
        private draw;
        _element: HTMLDivElement;
        updateBounds(): void;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this content.
        * @type {Object}
        * @summary The parent control of this content.
        */
        get parent(): any;
        set template(arg: string);
        /**
        * Gets or sets the content template.
        * @type {String}
        * @summary An HTML string representing the content template.
        */
        get template(): string;
        _template: string;
        set templateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded as a content.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded as a content.
        */
        get templateUrl(): string;
        _templateUrl: string;
        set navigateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded as a content.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded as a content.
        */
        get navigateUrl(): string;
        _navigateUrl: string;
        /**
        * Control.onPropertyChanged override.
        * @protected
        */
        protected onPropertyChanged(name: any, oldValue: any, newValue: any): void;
        /**
        * Raises the contentLoad event.
        */
        raiseContentLoad(args: any): void;
        /**
        * Raised when the content is loaded.
        */
        get contentLoad(): EventDispatcher<EventArgs>;
    }
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/DropDown" {
    /**
    * @class Represents a dropdown for a Picker control.
    * @augments Tooltip
    */
    export class DropDown extends Tooltip {
        /**
         * Initializes a new instance of the DropDown class.
         * @constructor
         * @param {Picker} parent The parent Picker control.
         */
        constructor(parent: any);
        _drop: EventDispatcher<EventArgs>;
        /**
        * Handles transitionend event for collapsible toolStrip.
        * @private
        */
        private onTransitionEnd;
    }
    import { Tooltip } from "Common/UI/Tooltip";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/Picker" {
    /**
    * @class A base class for picker controls.
    * @augments UIControl
    */
    export class Picker extends UIControl {
        /**
       * Closes all open pickers.
       */
        static closePickers(): void;
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _dropdownWidth: Unit;
        _dropdownHeight: Unit;
        _valueChanging: EventDispatcher<EventArgs>;
        _valueChanged: EventDispatcher<EventArgs>;
        _stateChanged: EventDispatcher<EventArgs>;
        _dropDownShow: EventDispatcher<EventArgs>;
        _dropDownClose: EventDispatcher<EventArgs>;
        _focusHandler: (e: any) => void;
        _blurHandler: (e: any) => void;
        _clickHandler: (e: any) => void;
        _buttonMouseDownHandler: (e: any) => void;
        _clearButtonClickHandler: (e: any) => void;
        _dropShowHandler: (e: any) => boolean;
        _dropCloseHandler: (e: any) => boolean;
        _closeDropdownHandler: (e: any) => void;
        mouseWheelHandler: (e: any) => void;
        dropdown: DropDown;
        _dropdownOffset: Point;
        _allowEmptyInput: boolean;
        _buttonStyle: number;
        _clearButtonStyle: number;
        _state: number;
        _invalidString: string;
        _createWrapper: boolean;
        _wrapper: HTMLDivElement;
        /**
        * Opens the picker.
        */
        open(): void;
        /**
        * Closes an open picker.
        */
        close(): void;
        button: HTMLDivElement;
        clearButton: HTMLDivElement;
        calcWidth(): number;
        calcOffset(): Point;
        /**
        * Validates the value.
        * @private
        */
        private validateValue;
        validateMinMax(value: any): boolean;
        /**
        * Updates the display value.
        * @private
        */
        private updateValue;
        /**
        * Set value from textbox input.
        * @private
        */
        private updateValueFromInput;
        set value(arg: any);
        /**
        * Gets or sets the value of this control.
        * @type {Object}
        * @summary The value.
        */
        get value(): any;
        /**
        * Validates keyboard input.
        */
        validateInput(e: any): boolean;
        checkEqual(value1: any, value2: any): boolean;
        _value: any;
        set state(arg: number);
        /**
        * Gets or sets the validation state of this control.
        * @type {ValidationState}
        * @summary One of the ValidationState enumeration values.
        */
        get state(): number;
        /**
        * Gets the picker value as a string.
        * @type {String}
        * @summary The string value.
        */
        get displayValue(): string;
        set buttonStyle(arg: number);
        /**
        * Gets or sets a value indicating the display mode of the dropdown button.
        * @type {PickerButtonStyle}
        * @summary One of the PickerButtonStyle enumeration values.
        */
        get buttonStyle(): number;
        set clearButtonStyle(arg: number);
        /**
        * Gets or sets a value indicating the display mode of the clear button.
        * @type {PickerButtonStyle}
        * @summary One of the PickerButtonStyle enumeration values.
        */
        get clearButtonStyle(): number;
        set allowEmptyInput(arg: boolean);
        /**
        * Gets or sets a value indicating whether empty input will be considered valid.
        * @type {Boolean}
        * @summary true if empty input will be considered valid, otherwise false.
        */
        get allowEmptyInput(): boolean;
        set invalidString(arg: string);
        /**
        * Gets or sets the string to display in the control when the value is invalid.
        * @type {String}
        * @summary The display string.
        */
        get invalidString(): string;
        set dropdownOffset(arg: Point);
        /**
        * Gets or sets the offset of the dropdown.
        * @type {Point}
        * @summary A Point instance representing the horizontal and vertical offset.
        */
        get dropdownOffset(): Point;
        set dropdownWidth(arg: Unit);
        /**
        * Gets or sets  the width of the dropdown.
        * @type {Unit}
        * @summary The width.
        */
        get dropdownWidth(): Unit;
        set dropdownHeight(arg: Unit);
        /**
        * Gets or sets the height of the dropdown.
        * @type {Unit}
        * @summary The height.
        */
        get dropdownHeight(): Unit;
        set createWrapper(arg: boolean);
        /**
        * Gets or sets a value indicating whether a wrapper div element should be created for the control.
        * @type {Boolean}
        * @summary true to create the wrapper, otherwise false.
        * @remarks Default value is true. Set to false, if you wish to provide the wrapper yourself,
        * (e.g.) when the control is used as an inplace editor.
        */
        get createWrapper(): boolean;
        get closeOnChange(): boolean;
        /**
       * Raised when the control value is changing.
       * @event valueChanging
       * @type {EventDispatcher}
       * @property {Picker} sender
       * @property {ValueChangingEventArgs} args
       */
        get valueChanging(): EventDispatcher<any>;
        /**
        * Raises the valueChanging event.
        * @private
        */
        private onValueChanging;
        /**
        * Raised when the control value is changed.
        * @event valueChanged
        * @type {EventDispatcher}
        * @property {Picker} sender
        * @property {ValueChangedEventArgs} args
        */
        get valueChanged(): EventDispatcher<any>;
        /**
        * Raises the valueChanged event.
        * @private
        */
        private onValueChanged;
        /**
       * Raised when the control validation state is changed.
       * @event stateChanged
       * @type {EventDispatcher}
       * @property {Picker} sender
       * @property {ValueChangedEventArgs} args
       */
        get stateChanged(): EventDispatcher<any>;
        /**
        * Raises the stateChanged event.
        * @private
        */
        private onStateChanged;
        /**
         * Raised when the dropdown is shown.
         * @event dropDownShow
         * @type {EventDispatcher}
         * @property {Picker} sender
         * @property {EventArgs} args
         */
        get dropDownShow(): EventDispatcher<any>;
        /**
        * Raises the dropDownShow event.
        * @private
        */
        private onDropDownShow;
        /**
        * Raised when the dropdown is closed.
        * @event dropDownClose
        * @type {EventDispatcher}
        * @property {Picker} sender
        * @property {EventArgs} args
        */
        get dropDownClose(): EventDispatcher<any>;
        /**
        * Raises the dropDownClose event.
        * @private
        */
        private onDropDownClose;
        onClick(e: any): void;
        onFocus(e: any): void;
        onBlur(e: any): void;
        onClearButtonClick(e: any): void;
        onButtonMouseDown(): void;
        get scroll(): any;
        get scrollIncrement(): any;
        onMouseWheel(e: any): void;
        timeStamp: number;
    }
    import { UIControl } from "Common/UI/UIControl";
    import { Unit } from "@mindfusion/common";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { DropDown } from "Common/UI/DropDown";
    import { Point } from "@mindfusion/drawing";
}
declare module "Common/UI/DateTimePicker" {
    /**
    * @class Represents an input control with the ability to parse and select dates from a popup calendar and/or time from a popup list.
    * @augments Picker
    */
    export class DateTimePicker extends Picker {
        /**
         * Initializes a new instance of the DateTimePicker class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _mode: number;
        _dropDownDrop: (sender: any, args: any) => void;
        _dropDownShowing: (sender: any, args: any) => void;
        _calendarDateChanged: (sender: any, args: any) => void;
        _calendarViewChanged: (sender: any, args: any) => void;
        calendar: Calendar;
        _datePartSelect: boolean;
        _interval: number;
        _minTime: number;
        _maxTime: number;
        _autoComplete: boolean;
        onDropDownDrop(sender: any, args: any): void;
        /**
        * Parses a string to a Date.
        * @returns {Date} The parsed Date. If the Date is not successfully parsed, NaN is returned.
        * @private
        */
        private parseDate;
        /**
        * Increments the value of the control.
        * @private
        */
        private increment;
        /**
        * Decrements the value of the control.
        * @private
        */
        private decrement;
        /**
        * Advances the control's date with the specified number of years, months and/or days.
        * @param {Number} [years] The number of years to advance.
        * @param {Number} [months] The number of months to advance.
        * @param {Number} [days] The number of days to advance.
        * @param {Number} [hours] The number of hours to advance.
        * @param {Number} [minutes] The number of minutes to advance.
        * @param {Number} [seconds] The number of seconds to advance.
        */
        advance(years?: number, months?: number, days?: number, hours?: number, minutes?: number, seconds?: number): void;
        /**
        * Gets a date part by index.
        * @private
        */
        private getDatePart;
        /**
        * Gets the array of date parts.
        * @private
        */
        private getDateParts;
        /**
        * Gets a date part from cursor position.
        * @private
        */
        private getDatePartFromPosition;
        /**
        * Selects a date part.
        * @private
        */
        private selectDatePart;
        datePart: any;
        /**
        * Gets the formatting of the date displayed in the control.
        * @type {String}
        * @summary The format string.
        */
        get format(): string;
        set mode(arg: number);
        /**
        * Gets or sets the mode of the control.
        * @type {DateTimePickerMode}
        * @summary One of the DateTimePickerMode enumeration values.
        */
        get mode(): number;
        set autoComplete(arg: boolean);
        /**
        * Gets or sets a value indicating whether the control will try to parse incomplete input.
        * @type {Boolean}
        * @summary true to try to parse incomplete input, otherwise false.
        */
        get autoComplete(): boolean;
        set datePartSelect(arg: boolean);
        /**
        * Gets or sets a value indicating whether date part selection is enabled.
        * @type {Boolean}
        * @summary true if date part selection should be enabled, otherwise false.
        */
        get datePartSelect(): boolean;
        set minTime(arg: number);
        /**
        * Gets or sets the minimum time value, displayed in a Day view.
        * @type {Number}
        * @summary The minimum time value.
        */
        get minTime(): number;
        set maxTime(arg: number);
        /**
        * Gets or sets the maximum time value, which is considered valid.
        * @type {Number}
        * @summary The maximum time value.
        */
        get maxTime(): number;
        set interval(arg: number);
        /**
        * Gets or sets the time interval.
        * @type {Number}
        * @summary The time interval in milliseconds.
        */
        get interval(): number;
        set locale(arg: any);
        /**
        * Gets or sets the locale object used to format and display dates.
        * @type {Locale}
        * @summary The locale.
        */
        get locale(): any;
        resetMode(): void;
        onDropDownShowing(sender: any, args: any): void;
        onCalendarDateChanged(sender: any, args: any): void;
        onCalendarViewChanged(sender: any, args: any): void;
    }
    import { Picker } from "Common/UI/Picker";
    import { Calendar } from "Common/UI/Calendar";
}
declare module "Common/UI/InfoDialog" {
    /**
    * @class Represents a modal dialog box, displaying a custom message.
    * @augments Dialog
    */
    export class InfoDialog extends Dialog {
        /**
         * Initializes a new instance of the InfoDialog class.
         * @constructor
         * @param {String} [title] The text to display as a dialog title.
         * @param {String} [message] The message to display as the dialog text.
         * @param {HTMLElement} [parent] The Dom element to append the dialog to.
         * If the parameter is not specified, the dialog will be appended to document.body.
         */
        constructor(title?: string, message?: string, parent?: HTMLElement);
        /**
        * Handles the keyup event.
        * @private
        */
        private onKeyUp;
    }
    import Dialog from "Common/UI/Dialog";
}
declare module "Common/UI/InputDialog" {
    /**
    * @class Represents a modal dialog box, displaying a custom input control.
    * @augments ConfirmDialog
    */
    export class InputDialog extends ConfirmDialog {
        /**
         * Initializes a new instance of the InputDialog class.
         * @constructor
         * @param {String} [title] The text to display as a dialog title.
         * @param {String} [message] The message to display as the dialog text.
         * @param {HTMLElement} [parent] The Dom element to append the dialog to.
         * If the parameter is not specified, the dialog will be appended to document.body.
         * @param {HTMLElement} [input] The input control to show in the dialog.
         * If the parameter is not specified, an empty HTML text input will be displayed.
         * @param {String} [property] The name of the property of the input control, whose value will be passed as the second argument to the callback function.
         * If the parameter is not specified, the value property will be used.
         * @param {String} [initialValue] The initial value of the input control.
         */
        constructor(title?: string, message?: string, parent?: HTMLElement, input?: HTMLElement, property?: string, initialValue?: string);
        initialValue: string;
        property: string;
        /**
        * Returns a reference to the dialog's input element.
        * @type {HTMLElement}
        * @summary The input.
        */
        get input(): HTMLElement;
        result: any;
    }
    import { ConfirmDialog } from "Common/UI/ConfirmDialog";
}
declare module "Common/UI/TemplatedDialog" {
    /**
    * @class Represents a modal dialog box, displaying custom HTML content.
    * @augments ConfirmDialog
    */
    export class TemplatedDialog {
        /**
         * Initializes a new instance of the TemplatedDialog class.
         * @constructor
         * @param {String} [title] The text to display as a dialog title.
         * @param {HTMLElement} [parent] The Dom element to append the dialog to.
         * If the parameter is not specified, the dialog will be appended to document.body.
         * @param {HTMLElement} [templateElement] The HTML content to display;
         * @param {Map} [initialValues] Contains inital values mapped to element id-s.
         */
        constructor(title?: string, parent?: HTMLElement, templateElement?: HTMLElement, initialValues?: Map<any, any>);
        title: string;
        templateElement: HTMLElement;
        initialValues: Map<any, any>;
        visibility: string;
        display: string;
        elementParent: Node & ParentNode;
        template: string;
        detach(): void;
        /**
        * Dialog.draw override.
        */
        draw(): void;
        /**
         * Creates the dialog contents.
         * @private
         */
        private createTemplate;
        collectValues(): Map<any, any>;
        /**
        * Dialog.onButtonClick override.
        * @private
        */
        private onButtonClick;
        modalResult: number;
        result: Map<any, any>;
        /**
        * Handles the keyup event.
        * @private
        */
        private onKeyUp;
    }
}
declare module "Common/UI/TreeNode" {
    /**
    * @class Represents an expandable list item.
    * @augments ListItem
    */
    export class TreeNode extends ListItem {
        _expanded: boolean;
        _level: number;
        _items: ObservableCollection<any>;
        root: TreeNode;
        _itemToggling: EventDispatcher<EventArgs>;
        _itemToggle: EventDispatcher<EventArgs>;
        set expanded(arg: boolean);
        /**
        * Gets or sets a value indicating whether the tree node is expanded.
        * @type {Boolean}
        * @summary true if the tree node is expanded, otherwise false.
        */
        get expanded(): boolean;
        /**
        * Gets a value indicating whether the tree node is expandable.
        * @type {Boolean}
        * @summary true if the tree node has children, otherwise false.
        */
        get expandable(): boolean;
        /**
        * Gets the depth of this tree node in the tree view hierarchy.
        * @type {Number}
        * @summary A zero-based index of the depth.
        */
        get level(): number;
        /**
        * Gets the children of this tree node.
        * @type {ObservableCollection}
        * @summary The children.
        */
        get items(): ObservableCollection<any>;
        /**
        * Gets the collection of items as a flat list.
        * @type {List}
        * @summary The list of items.
        */
        get flatItems(): List<any>;
        loadItem(json: any): TreeNode;
        addDroppedItem(item: any, dropTarget: any): void;
        /**
        * Handles the itemsChanged event.
        * @private
        */
        private onItemsChanged;
        /**
        * Raises the toggle event.
        * @private
        */
        private raiseToggling;
        /**
         * Raised when the item is being expanded or collapsed.
         * @private
         */
        private get itemToggling();
        /**
        * Raises the toggle event.
        * @private
        */
        private raiseToggle;
        /**
         * Raised when the item is expanded or collapsed.
         * @private
         */
        private get itemToggle();
    }
    import { ListItem } from "Common/UI/ListItem";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { List } from "@mindfusion/common-collections";
}
declare module "Common/UI/MenuItem" {
    /**
    * @class Represents an item in a menu.
    * @augments TreeNode
    */
    export class MenuItem extends TreeNode {
        /**
         * Initializes a new instance of the MenuItem class.
         * @constructor
         * @param {String} [title] The display text of this item.
         * @param {String} [href] The URL this item is pointing to.
         */
        constructor(title?: string, href?: string);
        _href: string;
        childrenContainer: HTMLUListElement;
        /**
        * Gets a reference to the DOM element to which menu items will be attached.
        * @private
        */
        private get absoluteParent();
        set href(arg: string);
        /**
        * Gets or sets the URL this item is pointing to.
        * @type {String}
        * @summary The URL.
        */
        get href(): string;
        set target(arg: string);
        /**
        * Gets or sets a value indicating where the linked document is loaded.
        * @type {String}
        * @summary One of the allowed HTML link target attribute values.
        */
        get target(): string;
        _target: any;
        setCollapseTimeout(): void;
        _collapseTimeout: number;
        clearCollapseTimeout(): void;
    }
    import { TreeNode } from "Common/UI/TreeNode";
}
declare module "Common/UI/Menu" {
    /**
    * @class Represents a vertical menu.
    * @augments ListContainer
    */
    export class Menu extends ListContainer {
        /**
         * Initializes a new instance of the Menu class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _loadOnDemand: boolean;
        _closeTimeout: number;
        collapse(): void;
        set closeTimeout(arg: number);
        /**
        * Gets or sets the number of milliseconds to wait before closing an item.
        * @type {Number}
        * @summary The close timeout in milliseconds.
        */
        get closeTimeout(): number;
        set loadOnDemand(arg: boolean);
        /**
        * Gets or sets a value indicating whether menu items DOM will be created only after their parent item is expanded.
        * @type {Boolean}
        * @summary true if items are loaded on demand, otherwise false.
        */
        get loadOnDemand(): boolean;
    }
    import { ListContainer } from "Common/UI/ListContainer";
}
declare module "Common/UI/Dialogs" {
    /**
    * @class Contains static methods for different user dialogs.
    */
    export class Dialogs {
        /**
        * Shows an info dialog, which displays a message and an OK button.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * @param {HTMLElement} [parentElement] The Dom element to append the dialog to.
        * If the parameter is not specified, the dialog will be appended to document.body.
        * @param {String} [theme] The theme of the dialog.
        * @param {Object} [context] Contains custom parameteres passed to the callback function.
        */
        static showInfoDialog(title?: string, message?: string, callback?: Function, parentElement?: HTMLElement, theme?: string, context?: any): void;
        /**
        * Shows a confirm dialog, which displays a message and OK and Cancel buttons.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * The dialog's modalResult will be passed as a parameter to the callback function.
        * @param {HTMLElement} [parentElement] The Dom element to append the dialog to.
        * If the parameter is not specified, the dialog will be appended to document.body.
        * @param {String} [theme] The theme of the dialog.
        * @param {Object} [context] Contains custom parameteres passed to the callback function.
        */
        static showConfirmDialog(title?: string, message?: string, callback?: Function, parentElement?: HTMLElement, theme?: string, context?: any): void;
        /**
        * Shows an input dialog, which displays a message, a custom input control and OK and Cancel buttons.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * The dialog's modalResult will be passed as the first, and the specified property value of the input control
        * will be passed as the second parameter to the callback function.
        * @param {HTMLElement} [parentElement] The Dom element to append the dialog to.
        * If the parameter is not specified, the dialog will be appended to document.body.
        * @param {HTMLElement} [input] The input control to show in the dialog.
        * If the parameter is not specified, an empty HTML text input will be displayed.
        * @param {String} [property] The name of the property of the input control, whose value will be passed as the second argument to the callback function.
        * If the parameter is not specified, the value property will be used.
        * @param {Object} [initialValue] The initial value of the input control.
        * @param {String} [theme] The theme of the dialog.
        * @param {Object} [context] Contains custom parameteres passed to the callback function.
        */
        static showInputDialog(title?: string, message?: string, callback?: Function, parentElement?: HTMLElement, input?: HTMLElement, property?: string, initialValue?: any, theme?: string, context?: any): void;
        /**
        * Shows a dialog, which displays custom HTML content and OK and Cancel buttons.
        * @param {String} [title] The text to display as a dialog title.
        * @param {HTMLElement} [templateElement] The HTML content to display;
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * The dialog's modalResult will be passed as the first parameter to the callback function.
        * The seconds parameter is Map instance, containing the values of the HTML elements,
        * marked with a data-prop attribute.
        * @param {HTMLElement} [parentElement] The Dom element to append the dialog to.
        * If the parameter is not specified, the dialog will be appended to document.body.
        * @param {Map} [initialValues] Contains inital values mapped to element id-s.
        * @param {String} [theme] The theme of the dialog.
        * @param {Object} [context] Contains custom parameteres passed to the callback function.
        */
        static showTemplatedDialog(title?: string, templateElement?: HTMLElement, callback?: Function, parentElement?: HTMLElement, initialValues?: Map<any, any>, theme?: string, context?: any): void;
        static showContextMenu(items: any, position: any, callback: any, parentElement: any, theme: any, context: any): Menu;
    }
    import { Menu } from "Common/UI/Menu";
}
declare module "Common/UI/ListView" {
    /**
    * @class Represents a list view control.
    * @augments ListContainer
    */
    export class ListView extends ListContainer {
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        drawList(): HTMLElement;
    }
    import { ListContainer } from "Common/UI/ListContainer";
    import { Unit } from "@mindfusion/common";
}
declare module "Common/UI/ImagePicker" {
    /**
    * @class Represents an input control with the ability select images from the filesystem or a predefined list.
    * @augments Picker
    */
    export class ImagePicker extends Picker {
        /**
        * Loads the images from the specified list of image url-s.
        * @param {Array} images An array of image url-s.
        */
        static loadImageList(images: any[]): Promise<any>;
        /**
         * Initializes a new instance of the ImagePicker class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _dropDownDrop: (sender: any, args: any) => void;
        _selectedImageChanged: (sender: any, args: any) => void;
        _imageList: any[];
        _buttonClickHandler: (e: any) => void;
        _inputChangeHandler: (e: any) => void;
        list: ListView;
        onDropDownDrop(sender: any, args: any): void;
        /**
        * Creates the drop-down list contents.
        * @private
        */
        private resetImageList;
        updateListSelection(): void;
        set imageList(arg: any[]);
        /**
        * Gets or sets the list of images, displayed in the dropdown.
        * @type {Array}
        * @summary The list of images.
        */
        get imageList(): any[];
        set itemSize(arg: Unit);
        /**
        * Gets or sets the size of the dropdown items.
        * @type {Unit}
        * @summary The size.
        */
        get itemSize(): Unit;
        set imageIndex(arg: number);
        /**
        * Gets or sets the index of the selected image.
        * @type {Number}
        * @summary The index.
        */
        get imageIndex(): number;
        get isList(): boolean;
        onButtonClick(e: any): void;
        onInputChange(e: any): void;
        onSelectedImageChanged(sender: any, args: any): void;
    }
    import { Picker } from "Common/UI/Picker";
    import { ListView } from "Common/UI/ListView";
    import { Unit } from "@mindfusion/common";
}
declare module "Common/UI/TabStrip" {
    /**
    * @class Provides a container for tab headers.
    * @augments ToolStrip
    */
    export class TabStrip extends ToolStrip {
        /**
        * @private
        */
        private autoSize;
        private set tabMaxSize(arg);
        /**
        * Gets or sets the maximum size of the tabs.
        * @type {Unit}
        * @summary The size.
        * @private
        */
        private get tabMaxSize();
        _tabMaxSize: any;
    }
    import { ToolStrip } from "Common/UI/ToolStrip";
}
declare module "Common/UI/TabControl" {
    /**
    * @class Represents a tab pages container.
    * @augments ListContainer
    */
    export class TabControl extends ListContainer {
        set tabStripSize(arg: Unit);
        /**
       * Gets or sets the size of the tabStrip.
       * @type {Unit}
       * @summary The height of the tabStrip in a vertical tabControl, or the width of the tabStrip in a horizontal tabControl.
       */
        get tabStripSize(): Unit;
        set tabSize(arg: Unit);
        /**
       * Gets the size of the tabs.
       * @type {Unit}
       * @summary The width of the tab headers in a vertical tabControl, or the height of the tab headers in a horizontal tabControl.
       */
        get tabSize(): Unit;
        _tabDrawHandler: (sender: any, args: any) => void;
        _tabDropHandler: (sender: any, args: any) => void;
        header: TabStrip;
        _tabMouseDownHandler: (sender: any, args: any) => void;
        _tabClickHandler: (sender: any, args: any) => void;
        _tabHeaderClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _tabHeaderDraw: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _selectedItemChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _selectedItemChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        set selectedItem(arg: any);
        /**
        * Gets or sets the currently selected tab page.
        * @type {TabPage}
        * @summary The selected tab page.
        */
        get selectedItem(): any;
        /**
        * @private
        */
        private getTabToSelect;
        /**
        * @private
        */
        private getItemByHeader;
        /**
        * Gets the collection of tab pages.
        * @type {ObservableCollection}
        * @summary The collection of tab pages.
        */
        get tabs(): any;
        set selectedIndex(arg: number);
        /**
        * Gets or sets the index of the currently selected tab page.
        * @type {Number}
        * @summary The index of the selected tab page.
        */
        get selectedIndex(): number;
        _selectedItem: any;
        _tabSize: any;
        /**
        * @private
        */
        private resetLayout;
        /**
        * Handles the tabStrip itemDraw event.
        * @private
        */
        private onTabDraw;
        onTabDrop(sender: any, args: any): void;
        /**
        * Handles the tabStrip itemMouseDown event.
        * @private
        */
        private onTabMouseDown;
        /**
        * Handles the tabStrip buttonClick event.
        * @private
        */
        private onTabClick;
        /**
        * Raised when a tab header is drawn.
        * @event tabHeaderDraw
        * @type {EventDispatcher}
        * @property {TabPage} sender
        * @property {ItemEventArgs} args
        */
        get tabHeaderDraw(): EventDispatcher<any>;
        /**
        * Handles the draw event in a tab header.
        * @private
        */
        private onTabHeaderDraw;
        /**
        * Raised when a tab header is clicked.
        * @event tabHeaderClick
        * @type {EventDispatcher}
        * @property {TabPage} sender
        * @property {ItemEventArgs} args
        */
        get tabHeaderClick(): EventDispatcher<any>;
        /**
        * Handles the click event in a tab header.
        * @private
        */
        private onTabHeaderClick;
        /**
        * Raised when the selected tab is changing.
        * @event selectedItemChanging
        * @type {EventDispatcher}
        * @property {TabControl} sender
        * @property {SelectedItemChangingEventArgs} args
        */
        get selectedItemChanging(): EventDispatcher<any>;
        /**
        * Raises the selectedItemChanging event.
        * @private
        */
        private onSelectedItemChanging;
        /**
        * Raised when the selected tab is changed.
        * @event selectedItemChanging
        * @type {EventDispatcher}
        * @property {TabControl} sender
        * @property {SelectedItemChangedEventArgs} args
        */
        get selectedItemChanged(): EventDispatcher<any>;
        /**
        * Raises the selectedItemChanged event.
        * @private
        */
        private onSelectedItemChanged;
    }
    import { ListContainer } from "Common/UI/ListContainer";
    import { Unit } from "@mindfusion/common";
    import { TabStrip } from "Common/UI/TabStrip";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/TabPage" {
    /**
    * @class Represents a tab page in a TabControl.
    * @augments ListItem
    */
    export class TabPage extends ListItem {
        _allowClose: boolean;
        _contentLoadHandler: (sender: any, args: any) => void;
        header: ToolStripItem;
        content: Content;
        _contentLoad: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        set templateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded as a content template.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded as a content template.
        */
        get templateUrl(): string;
        set navigateUrl(arg: string);
        /**
        * Gets or sets the URL of the page that will be loaded in the control.
        * @type {String}
        * @summary A string specifying the URL of the web page, that will be loaded in the control's content IFrame.
        */
        get navigateUrl(): string;
        set allowClose(arg: boolean);
        /**
       * Gets or sets a value indicating whether to show a close button in the header of this tab page.
       * @type {Boolean}
       * @summary true to show a close button, otherwise false.
       */
        get allowClose(): boolean;
        onContentLoad(sender: any, args: any): void;
        /**
        * Raised when the page's content is loaded.
        * @event contentLoad
        * @type {EventDispatcher}
        * @property {TabPage} sender
        * @property {EventArgs} args
        */
        get contentLoad(): EventDispatcher<any>;
    }
    import { ListItem } from "Common/UI/ListItem";
    import { ToolStripItem } from "Common/UI/ToolStripItem";
    import Content from "Common/UI/Content";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/TreeView" {
    /**
    * @class Represents a tree view control.
    * @augments ListContainer
    */
    export class TreeView extends ListContainer {
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _toggleMode: number;
        _loadOnDemand: boolean;
        _itemToggling: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemTogglingHandler: (sender: any, args: any) => void;
        _itemToggle: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _itemToggleHandler: (sender: any, args: any) => void;
        drawList(): HTMLElement;
        /**
         * Selects a tree node.
         * @param {TreeNode} node The node to select.
         * @param {Boolean} [selectChildren] True to select all of the node's children, otherwise false.
         */
        selectNode(node: TreeNode, selectChildren?: boolean): void;
        /**
         * Deselects a tree node.
         * @param {TreeNode} node The node to deselect.
         * @param {Boolean} [deselectChildren] True to deselect all of the node's children, otherwise false.
         */
        deselectNode(node: TreeNode, deselectChildren?: boolean): void;
        set loadOnDemand(arg: boolean);
        /**
        * Gets or sets a value indicating whether tree nodes DOM will be created only after their parent node is expanded.
        * @type {Boolean}
        * @summary true if items are loaded on demand, otherwise false.
        */
        get loadOnDemand(): boolean;
        set toggleMode(arg: number);
        /**
        * Gets or sets a value indicating how nodes expand/collapse will be triggered.
        * @type {ToggleMode}
        * @summary the toggle mode.
        */
        get toggleMode(): number;
        /**
        * Creates tree nodes from data object.
        * @private
        */
        private fromObj;
        /**
         * Raised when a tree node is being expanded or collapsed.
         * @event itemToggling
         * @type {EventDispatcher}
         * @property {TreeView} sender
         * @property {InteractionEventArgs} args
         */
        get itemToggling(): EventDispatcher<any>;
        /**
         * Raised when a tree node is expanded or collapsed.
         * @event itemToggle
         * @type {EventDispatcher}
         * @property {TreeView} sender
         * @property {ItemEventArgs} args
         */
        get itemToggle(): EventDispatcher<any>;
        /**
        * Handles the toggling event in a child item.
        * @private
        */
        private onItemToggling;
        /**
        * Handles the toggle event in a child item.
        * @private
        */
        private onItemToggle;
    }
    import { ListContainer } from "Common/UI/ListContainer";
    import { Unit } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
    import { TreeNode } from "Common/UI/TreeNode";
}
declare module "Common/UI/WindowHost" {
    /**
    * @class Represents a container for Window objects.
    * @augments Container
    */
    export class WindowHost extends Container {
        _windowOpeningHandler: (sender: any, args: any) => void;
        _windowOpenHandler: (sender: any, args: any) => void;
        _windowClosingHandler: (sender: any, args: any) => void;
        _windowCloseHandler: (sender: any, args: any) => void;
        _windowStateChangingHandler: (sender: any, args: any) => void;
        _windowStateChangedHandler: (sender: any, args: any) => void;
        _windowInteractionStartHandler: (sender: any, args: any) => void;
        _windowInteractionEndHandler: (sender: any, args: any) => void;
        _toolstripButtonClickHandler: (sender: any, args: any) => void;
        _toolstripItemDragOutHandler: (sender: any, args: any) => void;
        _toolstripPropertyChangedHandler: (sender: any, args: any) => void;
        keepMinimizedOnTop: boolean;
        _windowOpening: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _windowOpen: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _windowClosing: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _windowClose: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _windowStateChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _windowStateChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _commandStrip: ToolStrip;
        _maximizedStrip: ToolStrip;
        _minimizedStrip: ToolStrip;
        /**
        * Closes all open child windows.
        */
        closeAll(): void;
        /**
        * Restores all minimized and maximized child windows.
        */
        restoreAll(): void;
        /**
        * Opens all closed child windows.
        */
        openAll(): void;
        /**
        * Minimizes all child windows.
        */
        minimizeAll(): void;
        /**
        * Shows an info dialog.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        */
        showInfoDialog(title?: string, message?: string, callback?: Function): void;
        /**
        * Shows a confirmation dialog.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * The dialog's modalResult will be passed as a parameter to the callback function.
        */
        showConfirmDialog(title?: string, message?: string, callback?: Function): void;
        /**
        * Shows an input dialog.
        * @param {String} [title] The text to display as a dialog title.
        * @param {String} [message] The message to display as the dialog text.
        * @param {Function} [callback] The callback function to invoke when the dialog is closed.
        * The dialog's modalResult will be passed as the first, and the specified property value of the input control
        * will be passed as the second parameter to the callback function.
        * @param {HTMLElement} [input] The input control to show in the dialog.
        * If the parameter is not specified, an empty HTML text input will be displayed.
        * @param {String} [property] The name of the property of the input control, whose value will be passed as the second argument to the callback function.
        * If the parameter is not specified, the value property will be used.
        */
        showInputDialog(title?: string, message?: string, callback?: Function, input?: HTMLElement, property?: string): void;
        resetToolStrips(): void;
        resetMaximizedStrip(): void;
        resetMinimizedStrip(): void;
        /**
        * Adds a div overlay during interactions to prevent interactions with non-active windows and their content in response to mouse events.
        * @private
        */
        private addInteractionOverlay;
        overlay: HTMLDivElement;
        /**
        * Removes the div overlay.
        * @private
        */
        private removeInteractionOverlay;
        /**
        * Gets the collection of child windows.
        * @type {ObservableCollection}
        * @summary The collection of child windows.
        */
        get windows(): any;
        /**
        * Gets a reference to the default commands toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        */
        get commandStrip(): ToolStrip;
        /**
        * Gets a reference to the maximized windows toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        */
        get maximizedStrip(): ToolStrip;
        /**
        * Gets a reference to the minimized windows toolStrip.
        * @type {ToolStrip}
        * @summary A ToolStrip instance.
        */
        get minimizedStrip(): ToolStrip;
        /**
        * Handles the opening event in a child window.
        * @private
        */
        private onWindowOpening;
        /**
        * Raised when a child window is being opened.
        * @event windowOpening
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifyingEventArgs} args
        */
        get windowOpening(): EventDispatcher<any>;
        /**
        * Handles the open event in a child window.
        * @private
        */
        private onWindowOpen;
        /**
        * Raised when a child window is opened.
        * @event windowOpen
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifiedEventArgs} args
        */
        get windowOpen(): EventDispatcher<any>;
        /**
        * Handles the closing event in a child window.
        * @private
        */
        private onWindowClosing;
        /**
        * Raised when a child window is being closed.
        * @event windowClosing
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifyingEventArgs} args
        */
        get windowClosing(): EventDispatcher<any>;
        /**
        * Handles the close event in a child window.
        * @private
        */
        private onWindowClose;
        /**
        * Raised when a child window is closed.
        * @event windowClose
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifiedEventArgs} args
        */
        get windowClose(): EventDispatcher<any>;
        /**
        * Handles the stateChanging event in a child window.
        * @private
        */
        private onWindowStateChanging;
        /**
        * Raised when the state of a child window is being modified.
        * @event windowStateChanging
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifyingEventArgs} args
        */
        get windowStateChanging(): EventDispatcher<any>;
        /**
        * Handles the stateChange event in a child window.
        * @private
        */
        private onWindowStateChanged;
        /**
        * Raised when the state of a child window is modified.
        * @event windowStateChanged
        * @type {EventDispatcher}
        * @property {WindowHost} sender
        * @property {ControlModifiedEventArgs} args
        */
        get windowStateChanged(): EventDispatcher<any>;
        /**
        * Handles dragStart and resizeStart events of child windows.
        * @private
        */
        private onWindowInteractionStart;
        /**
        * Handles dragEnd and resizeEnd events of child windows.
        * @private
        */
        private onWindowInteractionEnd;
        /**
        * Handles the toolstrip buttonClick event.
        * @private
        */
        private onToolstripButtonClick;
        onToolstripItemDragOut(sender: any, args: any): void;
        onToolstripPropertyChanged(sender: any, args: any): void;
    }
    import Container from "Common/UI/Container";
    import { EventDispatcher } from "@mindfusion/common";
    import { ToolStrip } from "Common/UI/ToolStrip";
}
declare module "Common/UI/CheckListItem" {
    /**
    * @class Represents an item in a CheckListBox control.
    * @augments ListItem
    * @private
    */
    export class CheckListItem extends ListItem {
        /**
        * Returns a reference to the checkbox element.
        * @type {HTMLElement}
        * @summary A reference to the checkbox element.
        */
        get control(): HTMLElement;
        set checked(arg: boolean);
        /**
        * Gets or sets a value indicating whether this item is checked.
        * @type {Boolean}
        * @summary True if the items is checked, otherwise false.
        */
        get checked(): boolean;
        _checked: any;
    }
    import { ListItem } from "Common/UI/ListItem";
}
declare module "Common/UI/CheckListBox" {
    /**
    * @class Displays a list of check-box items.
    * @augments ListContainer
    */
    export class CheckListBox extends ListContainer {
        /**
         * Initializes a new instance of the CheckListBox class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _mode: number;
        _multiple: boolean;
        _values: Map<any, any>;
        _valueChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _valueChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * @private
        */
        private itemChecked;
        /**
        * @private
        */
        private resetList;
        /**
        * Gets the bits value corresponding to the checked items.
        * @private
        */
        private valuesToBits;
        /**
        * Gets the array of keys corresponding to the checked items.
        * @private
        */
        private getValuesArray;
        refreshValue(): void;
        set value(arg: any[]);
        /**
        * Gets or sets the value of this control.
        * @type {Array}
        * @summary The array of selected items' keys.
        */
        get value(): any[];
        set mode(arg: number);
        /**
        * Gets or sets the mode of the control.
        * @type {CheckListBoxType}
        * @summary One of the CheckListBoxType enumeration values.
        */
        get mode(): number;
        set values(arg: Map<any, any>);
        /**
        * Gets or sets the dictionary of items, displayed in this control.
        * @type {Map}
        * @summary The dictionary of items.
        */
        get values(): Map<any, any>;
        _value: any[];
        set multiple(arg: boolean);
        /**
        * Gets or sets a value indicating whether multiple items can be checked.
        * @type {Boolean}
        * @summary True if multiple items can be checked, otherwise false.
        */
        get multiple(): boolean;
        /**
        * Gets a value indicating whether to show check-boxes
        * @type {Boolean}
        * @private
        */
        private get showChecks();
        /**
        * Raised when the control value is changing.
        * @event valueChanging
        * @type {EventDispatcher}
        * @property {CheckListBox} sender
        * @property {ValueChangingEventArgs} args
        */
        get valueChanging(): EventDispatcher<any>;
        /**
        * Raises the valueChanging event.
        * @private
        */
        private onValueChanging;
        /**
        * Raised when the control value is changed.
        * @event valueChanged
        * @type {EventDispatcher}
        * @property {CheckListBox} sender
        * @property {ValueChangedEventArgs} args
        */
        get valueChanged(): EventDispatcher<any>;
        /**
        * Raises the valueChanged event.
        * @private
        */
        private onValueChanged;
    }
    import { ListContainer } from "Common/UI/ListContainer";
    import { Unit } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Common/UI/CheckListPicker" {
    /**
    * @class Represents an input control, that displays a drop-down list of check-box items.
    * @augments Picker
    */
    export class CheckListPicker extends Picker {
        /**
        * Gets the bits value as string.
        * @private
        */
        private static bitsToString;
        /**
        * Gets the keys value as string.
        * @private
        */
        private static keysToString;
        /**
        * Gets the bits value as map.
        * @private
        */
        private static bitsValues;
        /**
        * Gets the keys value as map.
        * @private
        */
        private static keysValues;
        static getStringValue(mode: any, value: any, values: any): string;
        /**
         * Initializes a new instance of the CheckListPicker class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        scrollable: boolean;
        list: CheckListBox;
        _valueChangingHandler: (sender: any, args: any) => any;
        _valueChangedHandler: (sender: any, args: any) => void;
        set values(arg: Map<any, any>);
        /**
        * Gets or sets the dictionary of items, displayed in this control.
        * @type {Map}
        * @summary The dictionary of items.
        */
        get values(): Map<any, any>;
        set itemSize(arg: Unit);
        /**
        * Gets or sets the size of the dropdown items.
        * @type {Unit}
        * @summary The size.
        */
        get itemSize(): Unit;
        set multiple(arg: boolean);
        /**
        * Gets or sets a value indicating whether multiple items can be checked.
        * @type {Boolean}
        * @summary True if multiple items can be checked, otherwise false.
        */ get multiple(): boolean;
        set mode(arg: number);
        /**
        * Gets or sets the mode of the control.
        * @type {CheckListBoxType}
        * @summary One of the CheckListBoxType enumeration values.
        */
        get mode(): number;
        onSpanClick(e: any): void;
    }
    import { Picker } from "Common/UI/Picker";
    import { CheckListBox } from "Common/UI/CheckListBox";
    import { Unit } from "@mindfusion/common";
}
declare module "@mindfusion/common-ui" {
    export { Calendar } from "Common/UI/Calendar";
    export { ConfirmDialog } from "Common/UI/ConfirmDialog";
    export * as Container from "Common/UI/Container";
    export * as Content from "Common/UI/Content";
    export { DateTimePicker } from "Common/UI/DateTimePicker";
    export { DateTimeView } from "Common/UI/DateTimeView";
    export { DayView } from "Common/UI/DayView";
    export { DecadeView } from "Common/UI/DecadeView";
    export * as Dialog from "Common/UI/Dialog";
    export { Dialogs } from "Common/UI/Dialogs";
    export { DropDown } from "Common/UI/DropDown";
    import { WindowState, InteractionType, ModalResult, Orientation, ToolStripItemType, TooltipPosition, TooltipTrigger, ToggleMode, TimeUnit, ValidationState, DateTimePickerMode, PickerButtonStyle, CheckListBoxType } from "Common/UI/Enum";
    export { WindowState, InteractionType, ModalResult, Orientation, ToolStripItemType, TooltipPosition, TooltipTrigger, ToggleMode, TimeUnit, ValidationState, DateTimePickerMode, PickerButtonStyle, CheckListBoxType };
    import { ItemEventArgs, InteractionEventArgs, ControlModifyingEventArgs, ControlModifiedEventArgs, SelectedItemChangingEventArgs, SelectedItemChangedEventArgs, DragDropEventArgs, ValueChangingEventArgs, ValueChangedEventArgs } from "Common/UI/EventArgs";
    export { ItemEventArgs, InteractionEventArgs, ControlModifyingEventArgs, ControlModifiedEventArgs, SelectedItemChangingEventArgs, SelectedItemChangedEventArgs, DragDropEventArgs, ValueChangingEventArgs, ValueChangedEventArgs };
    export { ImagePicker } from "Common/UI/ImagePicker";
    export { InfoDialog } from "Common/UI/InfoDialog";
    export { InputDialog } from "Common/UI/InputDialog";
    export { ListContainer } from "Common/UI/ListContainer";
    export { ListItem } from "Common/UI/ListItem";
    export { ListView } from "Common/UI/ListView";
    export { Menu } from "Common/UI/Menu";
    export { MenuItem } from "Common/UI/MenuItem";
    export { MonthView } from "Common/UI/MonthView";
    export { Picker } from "Common/UI/Picker";
    export { TabControl } from "Common/UI/TabControl";
    export { TabPage } from "Common/UI/TabPage";
    export { TabStrip } from "Common/UI/TabStrip";
    export { TemplatedDialog } from "Common/UI/TemplatedDialog";
    export * as TemplatedItem from "Common/UI/TemplatedItem";
    export { ToolStrip } from "Common/UI/ToolStrip";
    export { ToolStripItem } from "Common/UI/ToolStripItem";
    export { Tooltip } from "Common/UI/Tooltip";
    export { TreeNode } from "Common/UI/TreeNode";
    export { TreeView } from "Common/UI/TreeView";
    export { UIControl } from "Common/UI/UIControl";
    export { Window } from "Common/UI/Window";
    export * as WindowBase from "Common/UI/WindowBase";
    export { WindowHost } from "Common/UI/WindowHost";
    export { YearView } from "Common/UI/YearView";
    export { CheckListBox } from "Common/UI/CheckListBox";
    export { CheckListItem } from "Common/UI/CheckListItem";
    export { CheckListPicker } from "Common/UI/CheckListPicker";
}
