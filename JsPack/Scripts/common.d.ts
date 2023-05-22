/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/drawing" />
declare module "Common/AnimationTimer" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Creates a timer, that is called in each frame while it is active.
    */
    export class AnimationTimer {
        constructor(callback: any, autoStart?: boolean);
        stop(): void;
        start(): void;
        repeat(): void;
        private timer;
        private callback;
    }
}
declare module "Common/Events" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { EventArgs, CancelEventArgs } from '@mindfusion/controls';
    /**
    * Describes an action that triggered a INotifyCollectionChanged.collectionChanged event.
     * @enum {Number}
    * @name NotifyCollectionChangedAction
    */
    export enum NotifyCollectionChangedAction {
        /**
        * Item was added to the collection.
        */
        Add = 0,
        /**
        * One or more items were removed from the collection.
        */
        Remove = 1,
        /**
        * The contents of the collection changed dramatically.
        */
        Reset = 2
    }
    export class EmptyEventArgs extends EventArgs {
        /** Initializes a new instance of the EmptyEventArgs class. */
        constructor();
    }
    export class ElapsedEventArgs extends EventArgs {
        /** Initializes a new instance of the ElapsedEventArgs class. */
        constructor();
        signalTime: Date;
    }
    /**
    * @class Provides data for PropertyChanged events.
    */
    export class PropertyChangedEventArgs extends EventArgs {
        /** Initializes a new instance of the PropertyChangedEventArgs class. */
        constructor(propertyName: string);
        /**
        * Gets the name of the property that changed.
        * @type {String}
        * @summary The name of the property.
        */
        get propertyName(): string;
        private m_propertyName;
    }
    /**
    * @class Provides data for CollectionChanged events.
    */
    export class NotifyCollectionChangedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the NotifyCollectionChangedEventArgs class.
        * @param {NotifyCollectionChangedAction} action The action that caused the event.
        * @param {Array} [changes] The items affected by the change.
        * @param {Number} [index] The index where the change occurred.
        */
        constructor(action: NotifyCollectionChangedAction, changes?: Array<any>, index?: number);
        /**
        * Gets the action that caused the vent.
        * @type {NotifyCollectionChangedAction}
        * @summary The action that caused the event.
        */
        get action(): NotifyCollectionChangedAction;
        /**
        * Gets a list of the items affected by a Remove action.
        * @type {Array}
        * @summary The list of affected items.
        */
        get oldItems(): Array<any>;
        /**
        * Gets the list of new items involved in the change.
        * @type {Array}
        * @summary The list of involed items.
        */
        get newItems(): Array<any>;
        /**
        * Gets index where the change occurred.
        * @type {Number}
        * @summary The index.
        */
        get index(): Number;
        private m_action;
        private m_oldItems;
        private m_newItems;
        private m_index;
    }
    /**
    * @class Provides data for CollectionChanging events.
    */
    export class NotifyCollectionChangingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the NotifyCollectionChangingEventArgs class.
        * @param {NotifyCollectionChangedAction} action The action that caused the event.
        * @param {Array} [changes] The items affected by the change.
        * @param {Number} [index] The index where the change occurred.
        */
        constructor(action: NotifyCollectionChangedAction, changes?: Array<any>, index?: number);
        /**
        * Gets the action that caused the event.
        * @type {NotifyCollectionChangedAction}
        * @summary The action that caused the event.
        */
        get action(): NotifyCollectionChangedAction;
        /**
        * Gets a list of the items affected by a Remove action.
        * @type {Array}
        * @summary	The list of affected items.
        */
        get oldItems(): Array<any>;
        /**
        * Gets the list of new items involved in the change.
        * @type {Array}
        * @summary The list of involed items.
        */
        get newItems(): Array<any>;
        /**
        * Gets a value indicating whether to allow the current operation.
        * @returns {Boolean} true to cancel the operation; otherwise, false.
        */
        getCancel(): boolean;
        /**
        * Sets a value indicating whether to allow the current operation.
        * @param {Boolean} value true to cancel the operation; otherwise, false.
        */
        setCancel(value: boolean): void;
        private m_action;
        private m_oldItems;
        private m_newItems;
        private m_cancel;
    }
    /**
    * @class Provides data for PropertyValueChanged events.
    */
    export class PropertyEventArgs extends EventArgs {
        /**
        * Initlializes a new instance of the PropertyEventArgs class.
        * @param {String} propertyName The name of the property that changed.
        * @param {Object} oldValue The old value of the property.
        * @param {Object} newValue The new value of the property.
        */
        constructor(propertyName: string, oldValue: any, newValue: any);
        /**
        * Gets the name of the property that changed.
        * @type {String}
        * @summary	The property name.
        */
        get propertyName(): string;
        /**
        * Gets the value of the property before the change.
        * @type {Object}
        * @summary	The value before the change.
        */
        get oldValue(): any;
        /**
        * Gets the current value of the property.
        * @type {Object}
        * @summary	The value after the change.
        */
        get newValue(): any;
        private m_propertyName;
        private m_oldValue;
        private m_newValue;
    }
}
declare module "Common/NotifyChanged" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { EventArgs } from '@mindfusion/controls';
    import { PropertyEventArgs } from "Common/Events";
    import { PropertyChangedEventDispatcher, NotifyCollectionChangedEventDispatcher, NotifyCollectionChangingEventDispatcher, EventDispatcher } from "Common/EventDispatcher";
    /**
    * @class Represents a dispatcher for an generic event.
    */
    export interface IEventDispatcher<T extends EventArgs> {
        /**
        * Subcribes an event listener to this event.
        */
        addEventListener: (handler: (sender: any, args: T) => void) => void;
        /**
        * Removes an event listener from this event.
        */
        removeEventListener: (handler: (sender: any, args: T) => void) => void;
    }
    /**
    * @class Notifies clients that a property value has changed.
    */
    export interface INotifyPropertyChanged {
        /**
         * Occurs when a property value changes.
         * @event INotifyPropertyChanged.propertyChanged
         * @type {PropertyChangedEventDispatcher}
         * @property {INotifyPropertyChanged} sender
         * @property {PropertyChangedEventArgs} args
         */
        propertyChanged: PropertyChangedEventDispatcher;
    }
    /**
    * @class Notifies clients that a collection has changed.
    */
    export interface INotifyCollectionChanged {
        /**
         * Occurs when a collection changes.
         * @event INotifyCollectionChanged.collectionChanged
         * @type {NotifyCollectionChangedEventDispatcher}
         * @property {INotifyCollectionChanged} sender
         * @property {NotifyCollectionChangedEventArgs} args
         */
        collectionChanged: NotifyCollectionChangedEventDispatcher;
    }
    /**
    * @class Notifies clients that a collection is changing.
    */
    export interface INotifyCollectionChanging {
        /**
         * Occurs just before a collection changes.
         * @event INotifyCollectionChanging.collectionChanging
         * @type {NotifyCollectionChangingEventDispatcher}
         * @property {INotifyCollectionChanging} sender
         * @property {NotifyCollectionChangingEventArgs} args
         */
        collectionChanging: NotifyCollectionChangingEventDispatcher;
    }
    /**
    * @class Notifies clients that a property has changed.
    */
    export interface INotifyPropertyValueChanged {
        /**
         * Occurs when a property changes.
         * @event INotifyPropertyValueChanged.collectionChanging
         * @type {EventDispatcher}
         * @property {INotifyPropertyValueChanged} sender
         * @property {PropertyEventArgs} args
         */
        propertyValueChanged: EventDispatcher<PropertyEventArgs>;
    }
}
declare module "Common/EventDispatcher" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { EventArgs } from '@mindfusion/controls';
    import { IEventDispatcher } from "Common/NotifyChanged";
    import { NotifyCollectionChangedEventArgs, NotifyCollectionChangingEventArgs, PropertyChangedEventArgs } from "Common/Events";
    /**
    * @class Represents a dispatcher for an event.
    */
    export class EventDispatcher<T extends EventArgs> implements IEventDispatcher<EventArgs> {
        /**
        * Subcribes an event listener to this event.
        */
        addEventListener(handler: (sender: any, args: T) => void): void;
        /**
        * Removes an event listener from this event.
        */
        removeEventListener(handler: (sender: any, args: T) => void): void;
        /**
        * Raises this event.
        */
        raiseEvent(sender: any, args: T): void;
        private handlers;
    }
    /**
    * @class Represents a dispatcher for PropertyChanged events.
    */
    export class PropertyChangedEventDispatcher extends EventDispatcher<PropertyChangedEventArgs> {
    }
    /**
    * @class Represents a dispatcher for NotifyCollectionChanged events.
    */
    export class NotifyCollectionChangedEventDispatcher extends EventDispatcher<NotifyCollectionChangedEventArgs> {
    }
    /**
    * @class Represents a dispatcher for NotifyCollectionChanging events.
    */
    export class NotifyCollectionChangingEventDispatcher extends EventDispatcher<NotifyCollectionChangingEventArgs> {
    }
}
declare module "Common/Timer" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Executes a callback function after a set interval.
    */
    export class Timer {
        constructor(callback: any, interval?: number, autoRepeat?: boolean);
        start(): void;
        stop(): void;
        interval: number;
        private autoRepeat;
        private timer;
        private callback;
    }
}
declare module "Common/IdGenerator" {
    /**
    * @namespace MindFusion.Common
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
    * @class Generates unique ids.
     */
    export class IdGenerator {
        /**
         * Generates a new id that starts with the specified prefix.
         * @param {String} prefix A prefix to insert at the beginning of the identifier.
         * @returns {String} A string containing the generated identifier.
         */
        static generate(prefix: string): string;
    }
}
declare module "Common/Unit" {
    /**
    * @namespace MindFusion.Common
    */
    /**
    * @class Represents a length measurement.
    * @property {Number} value The unit value.
    * @property {UnitType} type The unit type.
    * @property {Boolean} isEmpty Gets a value representing whether this Unit instance has a set value.
    **/
    export class Unit {
        /**
         * Creates a Unit instance from a string representation.
         * @param {String} value The string representation of the unit.
         * @returns {Unit} The new Unit, or null if the string is invalid.
         */
        static parse(value: string): Unit;
        /**
         * Creates a Unit instance with the specified value and UnitType.Pixel.
         * @param {Number} value The value of the unit.
         * @returns {Unit} The new Unit.
         */
        static pixel(value: number): Unit;
        /**
         * Creates a Unit instance with the specified value and UnitType.Percent.
         * @param {Number} value The value of the unit.
         * @returns {Unit} The new Unit.
         */
        static percentage(value: number): Unit;
        /**
         * Creates an empty Unit instance.
         * @returns {Unit} The new Unit.
         */
        static empty(): Unit;
        /**
         * Initializes a new instance of the Unit class.
         * @constructor
         * @param {Number} [value] The value of the unit.
         * @param {UnitType} [type] The type of the unit.
         */
        constructor(value?: number, type?: UnitType);
        value: number;
        type: number;
        /**
         * Gets a value representing whether this Unit instance has a set value.
         * @type {Boolean}
         * @summary true if the Unit's value is null, or false otherwise.
         */
        get isEmpty(): boolean;
        /**
         * Returns a string representation of this Unit.
         * @returns {String} The string representation.
         */
        toString(): string;
    }
    /**
     * Specifies a unit of measurement.
     */
    export type UnitType = number;
    export namespace UnitType {
        const Pixel: number;
        const Percent: number;
    }
}
declare module "Common/Enum" {
    /**
     * Specifies a control state.
     */
    export type ControlState = number;
    export namespace ControlState {
        const Loaded: number;
        const Unloaded: number;
    }
}
declare module "Common/Control" {
    /**
    * @class A base class for UI controls.
    */
    export class Control {
        static get isPack(): boolean;
        static registerControl(id: any, control: any): void;
        /**
        * Returns the control with the specified ID.
        * @param {String} id The ID.
        * @returns {Control} The control with the specified ID, if found; otherwise, null.
        */
        static find(id: string): Control;
        static fromJson(json: any): any;
        static toJson(instance: any): string;
        /**
         * Initializes a new instance of the Control class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         * @param {String} [tagName] The tag name of the element.
         */
        constructor(element?: HTMLElement, tagName?: string);
        _element: HTMLElement;
        _freeElement: boolean;
        Dom: {};
        _visible: boolean;
        _enabled: boolean;
        _focusable: boolean;
        _left: Unit;
        _top: Unit;
        _width: Unit;
        _height: Unit;
        _cssClasses: any[];
        _licenseLocation: string;
        _controlLoad: EventDispatcher<EventArgs>;
        _controlUnload: EventDispatcher<EventArgs>;
        _propertyChanged: EventDispatcher<EventArgs>;
        _focus: EventDispatcher<EventArgs>;
        _controlState: number;
        mouseDownHandler: (e: any) => void;
        keyDownHandler: (e: any) => void;
        unloadHandler: (e: any) => void;
        get maxIndex(): number;
        /**
        * Disposes the control.
        * @remarks Detaches control event handlers and removes its element from the DOM, if it was internally created.
        */
        dispose(): void;
        getElement(): Element;
        /**
        * Returns a reference to the control DOM element.
        * @type {HTMLElement}
        * @summary A reference to the control DOM element.
        */
        get element(): HTMLElement;
        /**
        * Attach control event handlers.
        */
        attach(): void;
        /**
        * Detach control event handlers.
        */
        detach(): void;
        /**
        * Draws the control.
        * @returns {HTMLElement} The control DOM element.
        */
        draw(): HTMLElement;
        /**
        * Draws the control and prepares it for user interaction.
        */
        render(): void;
        /**
        * Toggles the disabled overlay.
        * @private
        */
        private resetOverlay;
        disabledOverlay: HTMLDivElement;
        changeCursor(value: any): void;
        /**
        * Sets the X-coordinate of the location of this control.
        * @param {Object} value An object representing the X-coordinate of the control's location.
        */
        setLeft(value: any): void;
        set left(arg: Unit);
        /**
        * Gets or sets the X-coordinate of the location of this control.
        * @type {Unit}
        * @summary The X-coordinate of the control's location.
        */
        get left(): Unit;
        /**
        * Sets the Y-coordinate of the location of this control.
        * @param {Object} value An object representing the Y-coordinate of the control's location.
        */
        setTop(value: any): void;
        set top(arg: Unit);
        /**
        * Gets or sets the Y-coordinate of the location of this control.
        * @type {Unit}
        * @summary The Y-coordinate of the control's location.
        */
        get top(): Unit;
        /**
        * Sets the width of this control.
        * @param {Object} value An object representing the width of the control.
        */
        setWidth(value: any): void;
        set width(arg: Unit);
        /**
        * Gets or sets the width of this control.
        * @type {Unit}
        * @summary The width.
        */
        get width(): Unit;
        /**
        * Sets the height of this control.
        * @param {Object} value An object representing the height of the control.
        */
        setHeight(value: any): void;
        set height(arg: Unit);
        /**
        * Gets or sets the height of this control.
        * @type {Unit}
        * @summary The height.
        */
        get height(): Unit;
        /**
        * Sets the control bounds.
        * @private
        */
        private setBounds;
        copySettings(settings: any): void;
        /**
        * Gets a value indicating whether this control is loaded and ready for interaction.
        * @type {Boolean}
        * @summary true if the control is loaded, or false otherwise.
        */
        get loaded(): boolean;
        set visible(arg: boolean);
        /**
        * Gets or sets the visibility of this control.
        * @type {Boolean}
        * @summary true if the control is visible, or false otherwise.
        */
        get visible(): boolean;
        set enabled(arg: boolean);
        /**
        * Gets or sets a value indicating whether user interactions are allowed for this control.
        * @type {Boolean}
        * @summary true if user interactions are allowed, or false otherwise.
        */
        get enabled(): boolean;
        /**
        * Gets the bounds of this control.
        * @type {Rect}
        * @summary The bounds.
        */
        get bounds(): Rect;
        /**
        * Gets the bounding rect of this control.
        * @type {Rect}
        * @summary The bounding rect.
        */
        get rect(): Rect;
        set data(arg: any);
        /**
        * Gets or sets an object holding custom data.
        * @type {Object}
        * @summary The custom data.
        */
        get data(): any;
        _data: any;
        set theme(arg: string);
        /**
        * Gets or sets the current theme of the control.
        * @type {String}
        * @summary The current theme.
        */
        get theme(): string;
        _theme: string;
        set cssClass(arg: string);
        /**
        * Gets or sets the css class of the control.
        * @type {String}
        * @summary The name of the css class of the control.
        */
        get cssClass(): string;
        _cssClass: string;
        get cssClasses(): any[];
        set licenseLocation(arg: string);
        /**
        * Gets or sets the URL of control's license file.
        * @type {String}
        * @summary A URL string that specifies the location of the license key.
        */
        get licenseLocation(): string;
        /**
        * Handles the mousedown event.
        * @private
        */
        private onMouseDown;
        onKeyDown(e: any): void;
        /**
        * Raises the controlLoad event.
        * @private
        */
        private raiseControlLoad;
        /**
         * Raised when the control is loaded.
         * @event controlLoad
         * @type {EventDispatcher}
         * @property {Control} sender
         * @property {EventArgs} args
         */
        get controlLoad(): EventDispatcher<any>;
        /**
        * Raises the controlUnload event.
        * @private
        */
        private raiseControlUnload;
        /**
         * Raised when the control is unloaded.
         * @event controlUnload
         * @type {EventDispatcher}
         * @property {Control} sender
         * @property {EventArgs} args
         */
        get controlUnload(): EventDispatcher<any>;
        /**
        * Raises the focus event.
        * @private
        */
        private raiseFocus;
        /**
         * Raised when the control is focused.
         * @event focus
         * @type {EventDispatcher}
         * @property {Control} sender
         * @property {EventArgs} args
         */
        get focus(): EventDispatcher<any>;
        /**
        * Raises the propertyChanged event.
        * @protected
        */
        protected onPropertyChanged(name: any, oldValue: any, newValue: any): void;
    }
    import { Unit } from "Common/Unit";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "Common/EventDispatcher";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Common/DateUtils" {
    /**
    * @namespace MindFusion.Common
    */
    /**
     * @class Contains helper functions for Dates manipulation.
     * @private
     */
    export class DateUtils {
        /**
       * Formats a Date instance by the specified format string.
       * @private
       */
        private static formatDate;
        /**
        * @remarks This function matches a date string with a format string.
        * If the date string matches the format string, it returns the
        * getTime() of the date. If it does not match, it returns 0.
        * @private
        */
        private static parseDate;
        /**
          * @private
          */
        private static parseComplete;
    }
}
declare module "Common/Locale" {
    /**
    * @namespace MindFusion.Common
    */
    /**
    * @class Provides culture-specific information.
    **/
    export class Locale {
        static fromObject(localeObj: any): Locale;
        /**
         * Returns a default Locale object.
         * @returns {Locale} A locale object with default settings.
         */
        static default(): Locale;
        /**
         * Initializes a new instance of the Locale class.
         * @constructor
         * @param {String} [id] The string identifier of the locale.
         */
        constructor(id?: string);
        _id: string;
        _dateSettings: DateSettings;
        /**
        * Gets the string identifier of the locale.
        * @type {String}
        * @summary The id.
        */
        get id(): string;
        /**
        * Gets the DateSettings object used to hold date-specific information.
        * @type {DateSettings}
        * @summary The settings object.
        */
        get dateSettings(): DateSettings;
        /**
        * Gets the DateFormats object used to hold date and time format strings.
        * @type {DateFormats}
        * @summary The formats object.
        */
        get dateFormats(): DateFormats;
        set strings(arg: any);
        /**
        * Gets or sets the dictionary of custom strings.
        * @type {Object}
        * @summary The dictionary of custom strings.
        */
        get strings(): any;
        _strings: any;
        /**
         * Deserializes the locale from a JSON string.
         * @param {String} dateSettingsJson A string containing data for the date settings.
         */
        fromJson(dateSettingsJson: string): void;
    }
    /**
    * @class Defines properties that allow customization of date-specific information.
    **/
    export class DateSettings {
        /**
         * Initializes a new instance of the DateSettings class.
         * @constructor
         * @param {String} localeId The string identifier of the locale.
         */
        constructor(localeId: string);
        _localeId: string;
        _firstDayOfWeek: number;
        _dateFormats: DateFormats;
        _longMonths: any[];
        _shortMonths: any[];
        _narrowMonths: any[];
        _longDays: any[];
        _shortDays: any[];
        _narrowDays: any[];
        _dayPeriodAM: string;
        _dayPeriodPM: string;
        _dateSeparator: string;
        _timeSeparator: string;
        /**
        * Deserializes the settings from a JSON string.
        * @param {String} json A string containing data for the settings.
        */
        fromJson(json: string): void;
        copyFrom(settings: any): void;
        _dayPeriods: any;
        generate(): void;
        set firstDayOfWeek(arg: number);
        /**
        * Gets or sets a value indicating the first day of the week to use.
        * @type {Number}
        * @summary The index of the first day of the week.
        * @remarks 0 is Sunday, 6 is Saturday.
        */
        get firstDayOfWeek(): number;
        /**
        * Gets the DateFormats object used to hold date and time format strings.
        * @type {DateFormats}
        * @summary The DateFormats object.
        */
        get dateFormats(): DateFormats;
        /**
        * Gets an object containing lists of month names.
        * @type {Object}
        * @summary An object containing lists of month names.
        */
        get months(): any;
        set longMonths(arg: any[]);
        /**
        * Gets or sets a list of long month names.
        * @type {Array}
        * @summary An array of long month names.
        */
        get longMonths(): any[];
        set shortMonths(arg: any[]);
        /**
        * Gets or sets a list of short month names.
        * @type {Array}
        * @summary An array of short month names.
        */
        get shortMonths(): any[];
        set narrowMonths(arg: any[]);
        /**
        * Gets or sets a list of narrow month names.
        * @type {Array}
        * @summary An array of narrow month names.
        */
        get narrowMonths(): any[];
        /**
        * Gets an object containing lists of day names.
        * @type {Object}
        * @summary An object containing lists of day names.
        */
        get days(): any;
        set longDays(arg: any[]);
        /**
        * Gets or sets a list of long day names.
        * @type {Array}
        * @summary An array of long day names.
        */
        get longDays(): any[];
        set shortDays(arg: any[]);
        /**
        * Gets or sets a list of short month names.
        * @type {Array}
        * @summary An array of short month names.
        */
        get shortDays(): any[];
        set narrowDays(arg: any[]);
        /**
        * Gets or sets a list of narrow day names.
        * @type {Array}
        * @summary An array of narrow day names.
        */
        get narrowDays(): any[];
        /**
        * Gets an object containing the time designators.
        * @type {Object}
        * @summary An object containing the time designators.
        */
        get dayPeriods(): any;
        set dayPeriodAM(arg: string);
        /**
        * Gets or sets the before noon time designator.
        * @type {String}
        * @summary The AM time designator.
        */
        get dayPeriodAM(): string;
        set dayPeriodPM(arg: string);
        /**
        * Gets or sets the after noon time designator.
        * @type {String}
        * @summary The PM time designator.
        */
        get dayPeriodPM(): string;
        set dateSeparator(arg: string);
        /**
        * Gets or sets the date separator character.
        * @type {String}
        * @summary The date separator.
        */
        get dateSeparator(): string;
        set timeSeparator(arg: string);
        /**
        * Gets or sets the time separator character.
        * @type {String}
        * @summary The time separator.
        */
        get timeSeparator(): string;
    }
    /**
    * @class Defines format string for dates and time.
    **/
    export class DateFormats {
        _dayMonth: string;
        _yearMonth: string;
        set shortDate(arg: string);
        /**
        * Gets or sets the short date format string.
        * @type {String}
        * @summary The short date format string.
        */
        get shortDate(): string;
        _shortDate: string;
        set shortTime(arg: string);
        /**
        * Gets or sets the short time format string.
        * @type {String}
        * @summary The short time format string.
        */
        get shortTime(): string;
        _shortTime: string;
        set shortDateTime(arg: string);
        /**
        * Gets or sets the short date-time format string.
        * @type {String}
        * @summary The short date-time format string.
        */
        get shortDateTime(): string;
        _shortDateTime: string;
        set longDate(arg: string);
        /**
        * Gets or sets the long date format string.
        * @type {String}
        * @summary The long date format string.
        */
        get longDate(): string;
        _longDate: string;
        set longTime(arg: string);
        /**
        * Gets or sets the long time format string.
        * @type {String}
        * @summary The long time format string.
        */
        get longTime(): string;
        _longTime: string;
        set longDateTime(arg: string);
        /**
        * Gets or sets the long date-time format string.
        * @type {String}
        * @summary The long date-time format string.
        */
        get longDateTime(): string;
        _longDateTime: string;
        set dayMonth(arg: string);
        /**
        * Gets or sets the day-month format string.
        * @type {String}
        * @summary The day-month format string.
        */
        get dayMonth(): string;
        set yearMonth(arg: string);
        /**
        * Gets or sets the year-month format string.
        * @type {String}
        * @summary The long year-month format string.
        */
        get yearMonth(): string;
    }
}
declare module "@mindfusion/common" {
    export { AnimationTimer } from "Common/AnimationTimer";
    export { EventDispatcher } from "Common/EventDispatcher";
    export { PropertyChangedEventDispatcher } from "Common/EventDispatcher";
    export { NotifyCollectionChangingEventDispatcher } from "Common/EventDispatcher";
    export { NotifyCollectionChangedEventDispatcher } from "Common/EventDispatcher";
    export { PropertyEventArgs } from "Common/Events";
    export { PropertyChangedEventArgs } from "Common/Events";
    export { NotifyCollectionChangedEventArgs } from "Common/Events";
    export { NotifyCollectionChangingEventArgs } from "Common/Events";
    export { IEventDispatcher } from "Common/NotifyChanged";
    export { INotifyPropertyChanged } from "Common/NotifyChanged";
    export { INotifyPropertyValueChanged } from "Common/NotifyChanged";
    export { INotifyCollectionChanging } from "Common/NotifyChanged";
    export { INotifyCollectionChanged } from "Common/NotifyChanged";
    export { NotifyCollectionChangedAction } from "Common/Events";
    export { Timer } from "Common/Timer";
    export { Control } from "Common/Control";
    export { DateUtils } from "Common/DateUtils";
    export { ControlState } from "Common/Enum";
    export { IdGenerator } from "Common/IdGenerator";
    export { Locale, DateSettings } from "Common/Locale";
    export { Unit } from "Common/Unit";
    export { UnitType } from "Common/Unit";
}
