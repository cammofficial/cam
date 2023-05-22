/// <reference types="../../@mindfusion/common" />
/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/drawing" />
/// <reference types="../../@mindfusion/common-collections" />
declare module "Scheduling/jsplanner/src/UIControl" {
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
declare module "Scheduling/jsplanner/src/Enum" {
    /**
     * Specifies the type of view to display in a calendar control.
     */
    export type CalendarView = number;
    export namespace CalendarView {
        const MonthRange: number;
        const SingleMonth: number;
        const WeekRange: number;
        const List: number;
        const Timetable: number;
        const ResourceView: number;
    }
    /**
     * Specifies the type of a timeline in a Resource view.
     */
    export type ResourceViewTimeline = number;
    export namespace ResourceViewTimeline {
        const Top: number;
        const Middle: number;
        const Bottom: number;
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
    }
    /**
     * Specifies the display format of a day of the week.
     */
    export type DayOfWeekFormat = number;
    export namespace DayOfWeekFormat {
        const SingleLetter: number;
        const Abbreviated: number;
        const Full: number;
    }
    /**
     * Specifies the appearance of the calendar's main header.
     */
    export type MainHeaderStyle = number;
    export namespace MainHeaderStyle {
        const None: number;
        const Title: number;
        const Buttons: number;
    }
    /**
     * Specifies the appearance of a vertical header in the calendar.
     */
    export type VerticalHeaderStyle = number;
    export namespace VerticalHeaderStyle {
        const None_1: number;
        export { None_1 as None };
        export const Left: number;
        export const Right: number;
    }
    /**
     * Specifies the appearance of a horizontal header in the calendar.
     */
    export type HorizontalHeaderStyle = number;
    export namespace HorizontalHeaderStyle {
        const None_2: number;
        export { None_2 as None };
        const Top_1: number;
        export { Top_1 as Top };
        const Bottom_1: number;
        export { Bottom_1 as Bottom };
    }
    /**
     * Specifies orientation for calendar elements.
     */
    export type Orientation = number;
    export namespace Orientation {
        const Horizontal: number;
        const Vertical: number;
    }
    /**
     * Specifies the priority of a task.
     */
    export type TaskPriority = number;
    export namespace TaskPriority {
        const Low: number;
        const Normal: number;
        const High: number;
    }
    /**
     * Specifies status values for a task.
     */
    export type TaskStatus = number;
    export namespace TaskStatus {
        const NotStarted: number;
        const InProgress: number;
        const Completed: number;
        const WaitingOther: number;
        const Deferred: number;
    }
    /**
     * Specifies the type of a reminder.
     */
    export type ReminderType = number;
    export namespace ReminderType {
        const Exact: number;
        const Leading: number;
    }
    /**
     * Specifies the recurrence state of items.
     */
    export type RecurrenceState = number;
    export namespace RecurrenceState {
        const None_3: number;
        export { None_3 as None };
        export const Occurrence: number;
        export const Exception: number;
        export const Master: number;
    }
    /**
     * Specifies the interval at which recurring events occur.
     */
    export type RecurrencePattern = number;
    export namespace RecurrencePattern {
        const Daily: number;
        const Weekly: number;
        const Monthly: number;
        const Yearly: number;
        const ByTimeInterval: number;
    }
    /**
     * Specifies daily recurrence patterns.
     */
    export type DailyRecurrence = number;
    export namespace DailyRecurrence {
        const ByDayInterval: number;
        const EveryWorkday: number;
        const EveryWeekend: number;
    }
    /**
     * Specifies monthly recurrence patterns.
     */
    export type MonthlyRecurrence = number;
    export namespace MonthlyRecurrence {
        const ByDayNumber: number;
        const ByDayType: number;
    }
    /**
     * Specifies types of yearly recurrence patterns.
     */
    export type YearlyRecurrence = number;
    export namespace YearlyRecurrence {
        export const SpecificDate: number;
        const ByDayType_1: number;
        export { ByDayType_1 as ByDayType };
    }
    /**
     * Specifies the index of occurrence.
     */
    export type Occurrence = number;
    export namespace Occurrence {
        export const First: number;
        const Second_1: number;
        export { Second_1 as Second };
        export const Third: number;
        export const Fourth: number;
        export const Last: number;
    }
    /**
     * Specifies the type of week day to use with ByDayType monthly and yearly recurrence patterns.
     */
    export type DayOfWeekType = number;
    export namespace DayOfWeekType {
        const AnyDay: number;
        const Workday: number;
        const Weekend: number;
        const Sunday: number;
        const Monday: number;
        const Tuesday: number;
        const Wednesday: number;
        const Thursday: number;
        const Friday: number;
        const Saturday: number;
    }
    /**
     * Specifies when to stop repeating recurring events.
     */
    export type RecurrenceEnd = number;
    export namespace RecurrenceEnd {
        const Never: number;
        const NumOccurrences: number;
        const EndDate: number;
    }
    /**
     * Specifies the day of the week.
     */
    export type DayOfWeek = number;
    export namespace DayOfWeek {
        const Sunday_1: number;
        export { Sunday_1 as Sunday };
        const Monday_1: number;
        export { Monday_1 as Monday };
        const Tuesday_1: number;
        export { Tuesday_1 as Tuesday };
        const Wednesday_1: number;
        export { Wednesday_1 as Wednesday };
        const Thursday_1: number;
        export { Thursday_1 as Thursday };
        const Friday_1: number;
        export { Friday_1 as Friday };
        const Saturday_1: number;
        export { Saturday_1 as Saturday };
    }
    /**
     * Specifies the day of the week. This enum allows bitwise combination of its members.
     */
    export type DaysOfWeek = number;
    export namespace DaysOfWeek {
        const None_4: number;
        export { None_4 as None };
        const Sunday_2: number;
        export { Sunday_2 as Sunday };
        const Monday_2: number;
        export { Monday_2 as Monday };
        const Tuesday_2: number;
        export { Tuesday_2 as Tuesday };
        const Wednesday_2: number;
        export { Wednesday_2 as Wednesday };
        const Thursday_2: number;
        export { Thursday_2 as Thursday };
        const Friday_2: number;
        export { Friday_2 as Friday };
        const Saturday_2: number;
        export { Saturday_2 as Saturday };
        export const All: number;
    }
    /**
     * Specifies the type of modification action used, when an item is modified.
     */
    export type ItemModifyAction = number;
    export namespace ItemModifyAction {
        const Create: number;
        const Edit: number;
        const Drag: number;
        const Resize: number;
        const InplaceEdit: number;
        const Delete: number;
        const Clone: number;
    }
    /**
     * Specifies grouping or filtering criteria for views that support grouping.
     */
    export type GroupType = number;
    export namespace GroupType {
        const None_5: number;
        export { None_5 as None };
        export const GroupByContacts: number;
        export const GroupByResources: number;
        export const GroupByLocations: number;
        export const GroupByTasks: number;
        export const FilterByContacts: number;
        export const FilterByLocations: number;
        export const FilterByTasks: number;
        export const FilterByResources: number;
    }
    /**
     * Specifies whether there are multiple weeks displayed in WeekRange view.
     */
    export type WeekRangeViewStyle = number;
    export namespace WeekRangeViewStyle {
        const WeekPerRow: number;
        const SingleWeek: number;
    }
    /**
     * Identifies special Keys.
     */
    export type Keys = number;
    export namespace Keys {
        const None_6: number;
        export { None_6 as None };
        export const Shift: number;
        export const Control: number;
        export const Alt: number;
    }
    /**
     * Specifies the type of a calendar header.
     */
    export type HeaderType = number;
    export namespace HeaderType {
        const Cell: number;
        const Main: number;
        const Group: number;
        const Timeline: number;
        const DayNames: number;
        const WeekNumbers: number;
    }
    export namespace RepaintType {
        const Full_1: number;
        export { Full_1 as Full };
        export const ViewItems: number;
        export const ViewContent: number;
    }
}
declare module "Scheduling/jsplanner/src/EventArgs" {
    /**
    * @class Specifies data for form related events
    * @augments CancelEventArgs
    */
    export class FormEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the FormEventArgs class.
        * @constructor
        * @param {BaseForm} form The form instance related to the event.
        */
        constructor(form: any);
        _form: any;
        /**
        * Gets the form related to the event.
        * @type {BaseForm}
        * @summary The BaseForm instance related to the event.
        */
        get form(): any;
    }
    /**
    * @class Specifies data for the ButtonClick event.
    * @augments CancelEventArgs
    */
    export class ButtonEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the ButtonEventArgs class.
        * @constructor
        * @param {Number} button A value indicating which navigation button is clicked.
        */
        constructor(button: number);
        _button: number;
        /**
        * Gets the index of the button related to the event.
        * @type {Number}
        * @summary The button index.
        */
        get button(): number;
    }
    /**
    * @class Specifies data for cell related events.
    * @augments EventArgs
    */
    export class CellEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the CellEventArgs class.
        * @constructor
        * @param {ViewCell} cell The calendar view cell related to the event.
        */
        constructor(cell: any);
        _cell: any;
        /**
        * Gets the calendar view cell related to the event.
        * @type {ViewCell}
        * @summary The ViewCell instance related to the event.
        */
        get cell(): any;
    }
    /**
    * @class Specifies data for header related events.
    * @augments EventArgs
    */
    export class HeaderEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the HeaderEventArgs class.
        * @constructor
        * @param {HeaderType} type The type of the header related to the event.
        */
        constructor(type: any);
        _type: any;
        /**
        * Gets the type of the header related to the event.
        * @type {HeaderType}
        * @summary One of the HeaderType enumeration values.
        */
        get type(): any;
    }
    /**
    * @class Specifies data for selection related events.
    * @augments CancelEventArgs
    */
    export class SelectionEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the SelectionEventArgs class.
        * @constructor
        * @param {DateTime} startTime The start time of the selection.
        * @param {DateTime} endTime The end time of the selection
        * @param {Resource} resource The resource related to the event.
        */
        constructor(startTime: any, endTime: any, resource: any);
        _startTime: any;
        _endTime: any;
        _resource: any;
        /**
        * Gets the start time of the selection.
        * @type {DateTime}
        * @summary The start time of the selection.
        */
        get startTime(): any;
        /**
        * Gets the end time of the selection.
        * @type {DateTime}
        * @summary The end time of the selection.
        */
        get endTime(): any;
        /**
        * Gets resource related to the event.
        * @type {Resource}
        * @summary The resource related to the event.
        */
        get resource(): any;
    }
    /**
    * @class Specifies data for the item related events.
    * @augments EventArgs
    */
    export class ItemEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the ItemEventArgs class.
        * @constructor
        * @param {Item} item The item, associated with the event.
        * @param {Object} rawEventArgs The Javascript event data.
        */
        constructor(item: any, rawEventArgs: any);
        _item: any;
        _rawEventArgs: any;
        /**
        * Gets the item, associated with the event.
        * @type {Item}
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
    * @class Specifies data for the ItemModifying event.
    * @augments CancelEventArgs
    */
    export class ItemModifyingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the ItemModifyingEventArgs class.
        * @constructor
        * @param {Item} item The new item.
        * @param {Object} changes An object containing the changed properties.
        * @param {ItemModifyAction} action The action that is modifying the item.
        */
        constructor(item: any, changes: any, action: any);
        _item: any;
        _changes: any;
        _action: any;
        /**
        * Gets the item that is modified.
        * @type {Item}
        * @summary The item that is modified.
        */
        get item(): any;
        /**
        * Gets the changed properties of the item, associated with the event.
        * @type {Object}
        * @summary An object containing the changed properties.
        */
        get changes(): any;
        /**
        * Gets the type of action that is modifying the item.
        * @type {ItemModifyAction}
        * @summary One of the ItemModifyAction enumeration values.
        */
        get action(): any;
    }
    /**
    * @class Specifies data for the ItemModified event.
    * @augments EventArgs
    */
    export class ItemModifiedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the ItemModifiedEventArgs class.
        * @constructor
        * @param {Item} item The new item.
        * @param {Item} oldItem The old item.
        * @param {ItemModifyAction} action The action that has modified the item.
        */
        constructor(item: any, oldItem: any, action: any);
        _item: any;
        _oldItem: any;
        _action: any;
        /**
        * Gets the item that was modified.
        * @type {Item}
        * @summary The item that was modified.
        */
        get item(): any;
        /**
        * Gets the item before the modification has occurred.
        * @type {Item}
        * @summary The item before the modification has occurred.
        */
        get oldItem(): any;
        /**
        * Gets the type of action that has modified the item.
        * @type {ItemModifyAction}
        * @summary One of the ItemModifyAction enumeration values.
        */
        get action(): any;
    }
    /**
    * @class Specifies data for task related events.
    * @augments CancelEventArgs
    */
    export class TaskEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the TaskEventArgs class.
        * @constructor
        * @param {Task} task The Task instance for which the event is raised.
        */
        constructor(task: any);
        _task: any;
        /**
        * Gets the task related to the event.
        * @type {Task}
        * @summary The Task instance for which the event is raised.
        */
        get task(): any;
    }
    /**
    * @class Specifies data for the VisibleDateChanged event.
    * @augments EventArgs
    */
    export class DateChangedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the DateChangedEventArgs class.
        * @constructor
        * @param {DateTime} newDate The new visible date.
        * @param {DateTime} prevDate The previous visible date.
        */
        constructor(newDate: any, prevDate: any);
        _newDate: any;
        _prevDate: any;
        /**
        * Gets the new visible date.
        * @type {DateTime}
        * @summary The  new visible date.
        */
        get newDate(): any;
        /**
        * Gets the previous visible date.
        * @type {DateTime}
        * @summary The previous visible date.
        */
        get prevDate(): any;
    }
    import { CancelEventArgs } from "@mindfusion/controls";
    import { EventArgs } from "@mindfusion/controls";
}
declare module "Scheduling/jsplanner/src/TimeSpan" {
    /**
    * @class Represents a time interval.
    */
    export class TimeSpan {
        /**
        * Returns a TimeSpan that represents a specified number of milliseconds.
        * @param {Number} milliseconds The number of milliseconds.
        * @returns {TimeSpan} The resulting time span.
        */
        static fromMilliseconds(milliseconds: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents a specified number of seconds.
        * @param {Number} seconds The number of seconds.
        * @returns {TimeSpan} The resulting time span.
        */
        static fromSeconds(seconds: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents a specified number of minutes.
        * @param {Number} minutes The number of minutes.
        * @returns {TimeSpan} The resulting time span.
        */
        static fromMinutes(minutes: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents a specified number of hours.
        * @param {Number} hours The number of hours.
        * @returns {TimeSpan} The resulting time span.
        */
        static fromHours(hours: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents a specified number of days.
        * @param {Number} days The number of days.
        * @returns {TimeSpan} The resulting time span.
        */
        static fromDays(days: number): TimeSpan;
        /**
        * Initializes a new instance of the TimeSpan class.
        * @constructor
        * @param {Number} ticks The number of ticks that represent the value of the time span.
        */
        constructor(ticks: number);
        _ticks: number;
        /**
        * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
        * @param {TimeSpan} timespan The TimeSpan object to add.
        * @returns {TimeSpan} The resulting time span.
        */
        add(timespan: TimeSpan): TimeSpan;
        /**
        * Returns a new TimeSpan object whose value is the difference between the specified TimeSpan object and this instance.
        * @param {TimeSpan} timespan The TimeSpan object to subtract.
        * @returns {TimeSpan} The resulting time span.
        */
        subtract(timespan: TimeSpan): TimeSpan;
        /**
        * Gets the number of ticks that represent the value of the time span.
        * @type {Number}
        * @summary The number of ticks.
        */
        get ticks(): number;
        /**
        * Gets the number of milliseconds that represent the value of the time span.
        * @type {Number}
        * @summary The number of milliseconds.
        */
        get milliseconds(): number;
        /**
        * Gets the number of seconds that represent the value of the time span.
        * @type {Number}
        * @summary The number of seconds.
        */
        get seconds(): number;
        /**
        * Gets the number of minutes that represent the value of the time span.
        * @type {Number}
        * @summary The number of minutes.
        */
        get minutes(): number;
        /**
        * Gets the number of hours that represent the value of the time span.
        * @type {Number}
        * @summary The number of hours.
        */
        get hours(): number;
        /**
        * Gets the number of days that represent the value of the time span.
        * @type {Number}
        * @summary The number of days.
        */
        get days(): number;
        /**
        * Creates a copy of the time span.
        * @returns {TimeSpan} The resulting time span.
        */
        clone(): TimeSpan;
        /**
        * Checks if the time span object represents the same time value as the current instance.
        * @param {TimeSpan} timespan The timespan to check.
        * @returns {Boolean} True if the time spans represent the same time value, otherwise false.
        */
        equals(timespan: TimeSpan): boolean;
    }
}
declare module "Scheduling/jsplanner/src/DateTime" {
    /**
    * @class A Javascript Date object wrapper that extends the functionality of the JavaScript Date object.
    * @remarks It has all the capabilities of the Date class, plus it adds several helper methods to manipulate its date and time components.
    * All date and time objects in the calendar are represented by this class.
    */
    export class DateTime {
        /**
         * Creates a new DateTime object, by specifying its different date and time components.
         * @param {Number} year The year component.
         * @param {Number} month The month component (0-11).
         * @param {Number} [day] The day component (1-31). If not provided, a default value of 1 will be used.
         * @param {Number} [hours] The hours component (0-23). If not provided, a default value of 0 will be used.
         * @param {Number} [minutes] The minutes component (0-59). If not provided, a default value of 0 will be used.
         * @param {Number} [seconds] The seconds component (0-59). If not provided, a default value of 0 will be used.
         * @param {Number} [milliseconds] The milliseconds component (0-999). If not provided, a default value of 0 will be used.
         * @returns {DateTime} The new DateTime object, or null if a Date instance cannot be created from the provided values.
         */
        static fromDateParts(year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): DateTime;
        /**
         * Creates a new DateTime object from a provided date string.
         * @param {String} dateString The date string to create the DateTime from.
         * @returns {DateTime} The new DateTime object, or null if a Date instance cannot be created from the provided string.
         */
        static fromDateString(dateString: string): DateTime;
        /**
         * Creates a new DateTime object from the number of milliseconds since Jan 1st 1970.
         * @param {Number} milliseconds The number of milliseconds since Jan 1st 1970;
         * @returns {DateTime} The new DateTime object, or null if a Date instance cannot be created from the provided value.
         */
        static fromMilliseconds(milliseconds: number): DateTime;
        /**
         * Combines the date component of a DateTime object and the time
         * component of another DateTime object into a new DateTime object.
         * @param {DateTime} date A DateTime object to get the date part from.
         * @param {DateTime} time A DateTime object to get the time part from.
         * @returns {DateTime} The new combined DateTime object.
         */
        static combine(date: DateTime, time: DateTime): DateTime;
        /**
         * Returns the latter of two DateTime objects.
         * @param {DateTime} date1 A DateTime object.
         * @param {DateTime} date2 A DateTime object.
         * @returns {DateTime} The latter of two DateTime objects.
         */
        static maxDate(date1: DateTime, date2: DateTime): DateTime;
        /**
         * Returns the former of two DateTime objects.
         * @param {DateTime} date1 A DateTime object.
         * @param {DateTime} date2 A DateTime object.
         * @returns {DateTime} The former of two DateTime objects.
         */
        static minDate(date1: DateTime, date2: DateTime): DateTime;
        /**
       * Returns the number of milliseconds between the specified dates.
       * @param {DateTime} date1 The date to subtract from.
       * @param {DateTime} date2 The date to subtract.
       * @returns {Number} The number of milliseconds between the specified dates.
       */
        static subtract(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the lowest possible DateTime value.
         * @returns {DateTime} The lowest possible DateTime value.
         * @remarks Represents 1 Jan 1901 00:00:00.
         */
        static minValue(): DateTime;
        /**
         * Returns the highest possible DateTime value.
         * @returns {DateTime} The highest possible DateTime value.
         * @remarks Represents 31 Dec 9999 23:59:59.
         */
        static maxValue(): DateTime;
        /**
         * Returns a DateTime object representing the current DateTime.
         * @returns {DateTime} The DateTime object representing the current DateTime.
         */
        static now(): DateTime;
        /**
         * Returns a DateTime object representing the current Date.
         * @returns {DateTime} The DateTime object representing the current Date.
         */
        static today(): DateTime;
        /**
         * Returns the year component of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @returns {Number} The year.
         */
        static getYear(date: DateTime): number;
        /**
         * Returns the month component of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @returns {Number} The month.
         */
        static getMonth(date: DateTime): number;
        /**
         * Returns the number of days in the month of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @returns {Number} The number of days.
         */
        static getDaysInMonth(date: DateTime): number;
        /**
         * Returns the day of the month of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @returns {Number} The day of the month.
         */
        static getDayOfMonth(date: DateTime): number;
        /**
         * Returns the day of the week of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @returns {Number} The day of the week.
         */
        static getDayOfWeek(date: DateTime): number;
        /**
         * Returns the beginning of the week of the specified DateTime.
         * @param {DateTime} date A DateTime instance.
         * @param {Object} [formatInfo] The formatInfo object.
         * @returns {DateTime} A DateTime instance specifying the beginning of the week.
         */
        static getWeekFirstDate(date: DateTime, formatInfo?: any): DateTime;
        /**
         * Returns the number of milliseconds between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of milliseconds.
         */
        static millisecondsBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of seconds between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of seconds.
         */
        static secondsBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of minutes between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of minutes.
         */
        static minutesBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of hours between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of hours.
         */
        static hoursBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of days between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of days.
         */
        static daysBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of weeks between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of weeks.
         */
        static weeksBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of months between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of months.
         */
        static monthsBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Returns the number of years between two DateTime instances.
         * @param {DateTime} date1 A DateTime instance.
         * @param {DateTime} date2 A DateTime instance.
         * @returns {Number} The number of years.
         */
        static yearsBetween(date1: DateTime, date2: DateTime): number;
        /**
         * Adds the specified number of milliseconds to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} milliseconds The number of milliseconds to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addMilliseconds(date: DateTime, milliseconds: number): DateTime;
        /**
         * Adds the specified number of seconds to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} seconds The number of seconds to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addSeconds(date: DateTime, seconds: number): DateTime;
        /**
         * Adds the specified number of minutes to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} minutes The number of minutes to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addMinutes(date: DateTime, minutes: number): DateTime;
        /**
         * Adds the specified number of hours to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} hours The number of hours to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addHours(date: DateTime, hours: number): DateTime;
        /**
         * Adds the specified number of days to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} days The number of days to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addDays(date: DateTime, days: number): DateTime;
        /**
         * Adds the specified number of months to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} months The number of months to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addMonths(date: DateTime, months: number): DateTime;
        /**
         * Adds the specified number of years to the specified DateTime object.
         * @param {DateTime} date The DateTime instance to modify.
         * @param {Number} years The number of years to add.
         * @returns {DateTime} The modified DateTime instance.
         */
        static addYears(date: DateTime, years: number): DateTime;
        /**
         * The milliseconds in one second.
         */
        static get MillisPerSecond(): number;
        /**
         * The milliseconds in one minute.
         */
        static get MillisPerMinute(): number;
        /**
         * The milliseconds in one hour.
         */
        static get MillisPerHour(): number;
        /**
         * The milliseconds in one day.
         */
        static get MillisPerDay(): number;
        /**
         * The ticks in one millisecond.
         */
        static get TicksPerMillisecond(): number;
        /**
         * The ticks in one second.
         */
        static get TicksPerSecond(): number;
        /**
         * The ticks in one minute.
         */
        static get TicksPerMinute(): number;
        /**
         * The ticks in one hour.
         */
        static get TicksPerHour(): number;
        /**
       * The ticks in one day.
       */
        static get TicksPerDay(): number;
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
        private static getDateToFormat;
        /**
      * For internal use only.
      * @private
      */
        private static getDate;
        /**
      * For internal use only.
      * @private
      */
        private static getTimeOfDay;
        /**
         * For internal use only.
         * @private
         * used in resource and list views
         */
        private static setTimeOfSecond;
        /**
         * For internal use only.
         * @private
         * used in resource and list views
         */
        private static setTimeOfMinute;
        /**
         * For internal use only.
         * @private
         */
        private static setTimeOfHour;
        /**
         * For internal use only.
         * @private
         */
        private static setTimeOfDay;
        /**
         * For internal use only.
         * @private
         */
        private static setDayOfWeek;
        /**
         * For internal use only.
         * @private
         */
        private static setDayOfMonth;
        /**
         * For internal use only.
         * @private
         */
        private static setDayOfYear;
        /**
         * For internal use only.
         * @private
         */
        private static addTicksToDate;
        /**
         * For internal use only.
         * @private
         */
        private static intDivision;
        /**
         * For internal use only.
         * @private
         */
        private static addMilliseconds2;
        /**
         * For internal use only.
         * @private
         */
        private static addSeconds2;
        /**
       * For internal use only.
       * @private
       */
        private static addMinutes2;
        /**
       * For internal use only.
       * @private
       */
        private static addHours2;
        /**
       * For internal use only.
       * @private
       */
        private static addDays2;
        /**
       * For internal use only.
       * @private
       */
        private static addWeeks2;
        /**
       * For internal use only.
       * @private
       */
        private static addMonths2;
        /**
       * For internal use only.
       * @private
       */
        private static addYears2;
        /**
         * For internal use only.
         * @private
         */
        private static isSameDate;
        /**
         * For internal use only.
         * @private
        * used in resource view
         */
        private static getFirstDateAfter;
        /**
         * For internal use only.
         * @private
         * used in resource view
         */
        private static truncate;
        /**
         * For internal use only.
         * @private
         * used in resource view
         */
        private static truncateWeek;
        /**
       * For internal use only.
       * @private
       * used in resource view
       */
        private static add;
        /**
       * For internal use only.
       * @private
       * used in resource view
       */
        private static getNextDate;
        /**
       * For internal use only.
       * @private
       * used in resource view
       */
        private static getPreviousDate;
        /**
       * For internal use only.
       * @private
       * used in resource view
       */
        private static isTimeSpanShorter;
        /**
        * Initializes a new instance of the DateTime class.
        * @constructor
        * @param {Date} [date] A JavaScript Date object.
        */
        constructor(date?: Date);
        _date: Date;
        _ticks: number | Date;
        /**
         * Returns a string representation of the current DateTime object.
         * @param {String} [format] The DateTime format used for the string representation.
         * @param {Object} [formatInfo] The formatInfo object used for the string representation.
         * @returns {String} The string representation of the current DateTime object.
         */
        toString(format?: string, formatInfo?: any): string;
        /**
         * Represents the primitive value of this DateTime object.
         * @returns {Number} The primitive value of this DateTime object in milliseconds.
         */
        valueOf(): number;
        /**
         * Returns a copy of the current DateTime object.
         * @returns {DateTime} The cloned DateTime object.
         */
        clone(): DateTime;
        /**
         * Returns a value indicating whether two DateTime objects are equal.
         * @param {DateTime} date The DateTime object to compare with.
         * @returns {Boolean} True if the values are equal, otherwise false.
         */
        equals(date: DateTime): boolean;
        /**
       * Subtracts the specified date from the current date and returns the number of milliseconds between them.
       * @param {DateTime} date The date to subtract.
       * @returns {Number} The number of milliseconds between the specified date and this date.
       */
        subtract(date: DateTime): number;
        /**
         * Checks if this DateTime object is greater than the specified DateTime object.
         * @param {DateTime} date The DateTime object to compare with.
         * @returns {Boolean} true if this value is greater than the specified value, otherwise false.
         */
        greaterThan(date: DateTime): boolean;
        /**
         * Checks if this DateTime object is greater than or equal to the specified DateTime object.
         * @param {DateTime} date The DateTime object to compare with.
         * @returns {Boolean} true if this value is greater than or equal to the specified value, otherwise false.
         */
        greaterThanOrEqual(date: DateTime): boolean;
        /**
         * Checks if this DateTime object is less than the specified DateTime object.
         * @param {DateTime} date The DateTime object to compare with.
         * @returns {Boolean} true if this value is less than the specified value, otherwise false.
         */
        lessThan(date: DateTime): boolean;
        /**
         * Checks if this DateTime object is less than or equal to the specified DateTime object.
         * @param {DateTime} date The DateTime object to compare with.
         * @returns {Boolean} true if this value is less than or equal to the specified value, otherwise false.
         */
        lessThanOrEqual(date: DateTime): boolean;
        /**
         * Compares the current DateTime instance with another DateTime object
         * and returns an integer that indicates whether the current instance precedes,
         * follows, or occurs in the same position in the sort order as the other object.
         * @param {DateTime} date A DateTime object to compare with this instance.
         * @returns {Number} A value that indicates the relative order of the DateTime objects being compared.
         * @remarks The return value has these meanings:
         * -1 - This instance precedes dateTime in the sort order.
         * 0 - This instance occurs in the same position in the sort order as dateTime.
         * 1 - This instance follows dateTime in the sort order.
         */
        compareTo(date: DateTime): number;
        /**
         * Adds the specified number of milliseconds to the current DateTime object.
         * @param {Number} milliseconds The number of milliseconds to add.
         */
        addMilliseconds(milliseconds: number): DateTime;
        /**
         * Adds the specified number of seconds to the current DateTime object.
         * @param {Number} seconds The number of seconds to add.
         */
        addSeconds(seconds: number): DateTime;
        /**
         * Adds the specified number of minutes to the current DateTime object.
         * @param {Number} minutes The number of minutes to add.
         */
        addMinutes(minutes: number): DateTime;
        /**
         * Adds the specified number of hours to the current DateTime object.
         * @param {Number} hours The number of hours to add.
         */
        addHours(hours: number): DateTime;
        /**
         * Adds the specified number of days to the current DateTime object.
         * @param {Number} days The number of days to add.
         */
        addDays(days: number): DateTime;
        /**
         * Adds the specified number of months to the current DateTime object.
         * @param {Number} months The number of months to add.
         */
        addMonths(months: number): DateTime;
        /**
       * Adds the specified number of years to the current DateTime object.
       * @param {Number} years The number of years to add.
       */
        addYears(years: number): DateTime;
        /**
         * Returns the Javascript Date object, corresponding to the current DateTime object.
         * @returns {Object} The Javascript Date object, corresponding to the current DateTime object.
         */
        getDate(): any;
        /**
         * Returns the month component of the current DateTime object.
         * @returns {Number} The month.
         */
        getMonth(): number;
        /**
         * Returns the number of days in the month of the current DateTime instance.
         * @returns {Number} The number of days.
         */
        getDaysInMonth(isLeapYear: any): number;
        /**
         * Returns a value indicating whether the year of the current DateTime instance is a leap year.
         * @returns {Boolean} True if it is a leap year, otherwise false.
         */
        isLeapYear(): boolean;
        /**
        * Gets the millisecond component of the date represented by this instance.
        * @type {Number}
        * @summary The milliseconds.
        */
        get millisecond(): number;
        /**
        * Gets the second component of the date represented by this instance.
        * @type {Number}
        * @summary The seconds.
       */
        get second(): number;
        /**
         * Gets the minute component of the date represented by this instance.
        * @type {Number}
        * @summary The minutes.
         */
        get minute(): number;
        /**
         * Gets the hour component of the date represented by this instance.
        * @type {Number}
        * @summary The hours.
         */
        get hour(): number;
        /**
         * Gets the day component of the date represented by this instance.
        * @type {Number}
        * @summary The day.
         */
        get day(): number;
        /**
         * Gets the month component of the date represented by this instance.
        * @type {Number}
        * @summary The month.
         */
        get month(): number;
        /**
         * Gets the year component of the date represented by this instance.
        * @type {Number}
        * @summary The year.
         */
        get year(): number;
        /**
       * Gets the date component of this DateTime object.
        * @type {Number}
        * @summary The date.
       */
        get date(): number;
        /**
         * Gets the time component of this DateTime object, expressed in milliseconds.
        * @type {Number}
        * @summary The time of day.
         */
        get timeOfDay(): number;
        /**
       * Returns the day of the month represented by this date.
        * @type {Number}
        * @summary The day of month.
       */
        get dayOfMonth(): number;
        /**
         * Returns the day of the week represented by this date.
        * @type {Number}
        * @summary The day of week.
         */
        get dayOfWeek(): number;
        /**
         * Returns the number of days in the month represented by this date.
        * @type {Number}
        * @summary The number of days.
         */
        get daysInMonth(): number;
        /**
         * For internal use only.
         * @private
         */
        private subtract2;
        /**
         * For internal use only.
         * @private
         */
        private isInDst;
        /**
         * For internal use only.
         * @private
         */
        private toUTCDate;
        /**
       * For internal use only.
       * @private
       */
        private addTicksToDate;
        /**
        * For internal use only.
        * @private
        * used in recurrence
        */
        private getTimeOfTheDay;
        /**
         * For internal use only.
         * @private
         * used in recurrence
         */
        private getDay;
        /**
         * For internal use only.
         * @private
         * used in popup
         */
        private getMonthlyOccurrenceIndex;
        /**
       * Gets the year component of this DateTime instance.
       * @returns {Number} The year (four digits).
       */
        __getFullYear(): number;
        /**
       * Gets the month component of this DateTime instance.
       * @returns {Number} The month (0-11). 0 is January, 1 is February, etc.
       */
        __getMonth(): number;
        /**
         * Gets the day component of this DateTime instance.
         * @returns {Number} The day of month (1-31).
         */
        __getDate(): number;
        /**
         * Gets the day of the week component of this DateTime instance.
         * @returns {Number} The day of the week (0-6). 0 is Sunday, 1 is Monday, etc.
         */
        __getDay(): number;
        /**
         * Gets the hours component of this DateTime instance.
         * @returns {Number} The hours (0-23).
         */
        __getHours(): number;
        /**
         * Gets the minutes component of this DateTime instance.
         * @returns {Number} The minutes (0-59).
         */
        __getMinutes(): number;
        /**
         * Gets the seconds component of this DateTime instance.
         * @returns {Number} The seconds (0-59).
         */
        __getSeconds(): number;
        /**
       * Gets the milliseconds component of this DateTime instance.
       * @returns {Number} The milliseconds (0-999).
       */
        __getMilliseconds(): number;
        /**
         * Gets the number of milliseconds between Jan 1 1970 00:00:00 and this DateTime instance.
         * @returns {Number} The number of milliseconds since Jan 1 1970 00:00:00.
         */
        __getTime(): number;
        /**
         * Gets the difference between GMT and local time in minutes.
         * @returns {Number} The difference between GMT and local time in minutes.
         */
        __getTimezoneOffset(): number;
        /**
       * Gets the year component of this DateTime instance, according to universal time.
       * @returns {Number} The year (four digits).
       */
        __getUTCFullYear(): number;
        /**
       * Gets the month component of this DateTime instance, according to universal time.
       * @returns {Number} The month (0-11). 0 is January, 1 is February, etc.
       */
        __getUTCMonth(): number;
        /**
         * Gets the day component of this DateTime instance, according to universal time.
         * @returns {Number} The day of month (1-31).
         */
        __getUTCDate(): number;
        /**
         * Gets the day of the week component of this DateTime instance, according to universal time.
         * @returns {Number} The day of the week (0-6). 0 is Sunday, 1 is Monday, etc.
         */
        __getUTCDay(): number;
        /**
         * Gets the hours component of this DateTime instance, according to universal time.
         * @returns {Number} The hours (0-23).
         */
        __getUTCHours(): number;
        /**
       * Gets the minutes component of this DateTime instance, according to universal time.
       * @returns {Number} The minutes (0-59).
       */
        __getUTCMinutes(): number;
        /**
       * Gets the seconds component of this DateTime instance, according to universal time.
       * @returns {Number} The seconds (0-59).
       */
        __getUTCSeconds(): number;
        /**
         * Gets the milliseconds component of this DateTime instance, according to universal time.
         * @returns {Number} The milliseconds (0-999).
         */
        __getUTCMilliseconds(): number;
        /**
         * Sets the year component of this DateTime instance.
         * @param {Number} year A four-digit value representing the year.
         * @param {Number} [month] An integer between 0 and 11 representing the month.
         * @param {Number} [day] An integer between 1 and 31 representing the date.
         */
        __setFullYear(year: number, month?: number, day?: number): void;
        /**
         * Sets the day component of this DateTime instance.
         * @param {Number} day The day of month (1-31).
         */
        __setDate(day: number): void;
        /**
         * Sets the hours component of this DateTime instance.
         * @param {Number} hour An integer between 0 and 23 representing the hour.
         * @param {Number} [min] An integer between 0 and 59 representing the minutes.
         * @param {Number} [sec] An integer between 0 and 59 representing the seconds.
         * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
         */
        __setHours(hour: number, min?: number, sec?: number, millisec?: number): void;
        /**
       * Sets the minutes component of this DateTime instance.
       * @param {Number} min An integer between 0 and 59 representing the minutes.
       * @param {Number} [sec] An integer between 0 and 59 representing the seconds.
       * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
       */
        __setMinutes(min: number, sec?: number, millisec?: number): void;
        /**
       * Sets the seconds component of this DateTime instance.
       * @param {Number} sec An integer between 0 and 59 representing the seconds.
       * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
       */
        __setSeconds(sec: number, millisec?: number): void;
        /**
         * Sets the milliseconds component of this DateTime instance.
         * @param {Number} millisec An integer between 0 and 999 representing the milliseconds.
         */
        __setMilliseconds(millisec: number): void;
        /**
         * Sets a date and time by adding or subtracting a specified number of milliseconds to/from midnight 1 Jan 1970.
         * @param {Number} millisec The number of milliseconds to be added to, or subtracted from, midnight 1 Jan 1970.
         */
        __setTime(millisec: number): void;
        /**
         * Sets the year component of this DateTime instance, according to universal time.
         * @param {Number} year A four-digit value representing the year.
         * @param {Number} [month] An integer between 0 and 11 representing the month.
         * @param {Number} [day] An integer between 1 and 31 representing the date.
         */
        __setUTCFullYear(year: number, month?: number, day?: number): void;
        /**
       * Sets the day component of this DateTime instance, according to universal time.
       * @param {Number} day The day of month (1-31).
       */
        __setUTCDate(day: number): void;
        /**
         * Sets the hours component of this DateTime instance, according to universal time.
         * @param {Number} hour An integer between 0 and 23 representing the hour.
         * @param {Number} [min] An integer between 0 and 59 representing the minutes.
         * @param {Number} [sec] An integer between 0 and 59 representing the seconds.
         * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
         */
        __setUTCHours(hour: number, min?: number, sec?: number, millisec?: number): void;
        /**
         * Sets the minutes component of this DateTime instance, according to universal time.
         * @param {Number} min An integer between 0 and 59 representing the minutes.
         * @param {Number} [sec] An integer between 0 and 59 representing the seconds.
         * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
         */
        __setUTCMinutes(min: number, sec?: number, millisec?: number): void;
        /**
         * Sets the seconds component of this DateTime instance, according to universal time.
         * @param {Number} sec An integer between 0 and 59 representing the seconds.
         * @param {Number} [millisec] An integer between 0 and 999 representing the milliseconds.
         */
        __setUTCSeconds(sec: number, millisec?: number): void;
        /**
       * Sets the milliseconds component of this DateTime instance, according to universal time.
       * @param {Number} millisec An integer between 0 and 999 representing the milliseconds.
       */
        __setUTCMilliseconds(millisec: number): void;
        /**
         * Converts the date component of this DateTime instance to a readable string.
         * @returns {String} A readable string representation of the date component of this DateTime instance.
         */
        __toDateString(): string;
        /**
         * Converts the date component of this DateTime instance to a readable string, using locale conventions.
         * @returns {String} A readable locale string representation of the date component of this DateTime instance.
         */
        __toLocaleDateString(): string;
        /**
         * Converts the time component of this DateTime instance to a readable string, using locale conventions.
         * @returns {String} A readable locale string representation of the time component of this DateTime instance.
         */
        __toLocaleTimeString(): string;
        /**
         * Converts this DateTime instance to a readable string, using locale conventions.
         * @returns {String} A readable locale string representation of this DateTime instance.
         */
        __toLocaleString(): string;
        /**
         * Converts this DateTime instance to a readable string.
         * @returns {String} A readable string representation of this DateTime instance.
         */
        __toString(): string;
        /**
         * Converts the time component of this DateTime instance to a readable string.
         * @returns {String} A readable string representation of the time component of this DateTime instance.
         */
        __toTimeString(): string;
        /**
         * Converts this DateTime instance to a readable string, according to universal time.
         * @returns {String} A readable string representation of this DateTime instance.
         */
        __toUTCString(): string;
        /**
         * Represents the primitive value of this DateTime object.
         * @returns {Number} The primitive value of this DateTime object.
         * @remarks The primitive value is returned as the number of millisecond since midnight January 1, 1970 (same as getTime())!
         */
        __valueOf(): number;
    }
}
declare module "Scheduling/jsplanner/src/TimeRange" {
    /**
    * @namespace MindFusion.Scheduling
    */
    /**
     * Copyright (c) 2017-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Represents a date-time range.
    */
    export class TimeRange {
        /**
        * Initializes a new instance of the TimeRange class.
        * @constructor
        * @param {DateTime} start The beginning of the range.
        * @param {DateTime} end The end of the range.
        */
        constructor(start: any, end: any);
        _start: any;
        _end: any;
        set start(arg: any);
        /**
        * Gets or sets the beginning of the range.
        * @type {DateTime}
        * @summary A DateTime instance representing the beginning of the range.
        */
        get start(): any;
        set end(arg: any);
        /**
        * Gets or sets the end of the range.
        * @type {DateTime}
        * @summary A DateTime instance representing the end of the range.
        */
        get end(): any;
        /**
        * Checks if the range is empty.
        * @returns {Boolean} true if the range is empty; otherwise false.
        */
        get isEmpty(): boolean;
        /**
        * Checks if the specified range contains the same date-time as the current instance.
        * @param {TimeRange} range The range of DateTime values to check.
        * @returns {Boolean} true if the ranges are equal; otherwise false.
        */
        equals(range: TimeRange): boolean;
        /**
        * Checks if the current range contains the specified range.
        * @param {TimeRange} range The range of DateTime values to check.
        * @returns {Boolean} true if the current range contains the specified range; otherwise false.
        */
        contains(range: TimeRange): boolean;
        /**
        * Checks if the current range intersects with the specified range.
        * @param {TimeRange} range The range of DateTime values to check.
        * @returns {Boolean} true if the current range intersects with the specified range; otherwise false.
        */
        intersects(range: TimeRange): boolean;
        /**
        * Checks if the current range starts at the same time as the specified range.
        * @param {TimeRange} range The range of DateTime values to compare to.
        * @returns {Boolean} true if the current range starts at the same time with the specified range; otherwise false.
        */
        sameStart(range: TimeRange): boolean;
        /**
        * Checks if the current range ends at the same time as the specified range.
        * @param {TimeRange} range The range of DateTime values to compare to.
        * @returns {Boolean} true if the current range ends at the same time with the specified range; otherwise false.
        */
        sameEnd(range: TimeRange): boolean;
    }
}
declare module "Scheduling/jsplanner/src/Utils" {
    /**
     * @class Contains helper functions.
     * @private
     */
    export class Utils {
        static firstRealChild(element: any): any;
        static isPointInBounds(point: any, bounds: any): boolean;
        static getPointInBounds(point: any, bounds: any): {
            x: any;
            y: any;
        };
        static extend(obj1: any, obj2: any): any;
        static getKeyByValue(obj: any, value: any): string;
    }
}
declare module "Scheduling/jsplanner/src/Forms/Controls" {
    /**
    * For internal use only.
    * @private
    */
    export class BaseControl {
        constructor(options: any, parent: any);
        id: any;
        element: any;
        initValue: any;
        formatInfo: any;
        keyUp: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * For internal use only.
        * @private
        */
        private getValue;
        /**
        * For internal use only.
        * @private
        */
        private isChanged;
        /**
        * For internal use only.
        * @private
        */
        private clearObject;
        onKeyUp(e: any): void;
    }
    /**
    * For internal use only.
    * @private
    */
    export class EditBox {
        constructor(options: any);
        id: any;
        type: any;
        initValue: any;
        value: any;
        isOpen: boolean;
        theme: any;
        oldValue: any;
        width: any;
        cssClass: string;
        parentElement: any;
        visible: any;
        formatInfo: any;
        localInfo: any;
        timeFormat: any;
        dateFormat: any;
        _textBox: HTMLInputElement;
        _buttonUp: HTMLAnchorElement;
        _buttonDown: HTMLAnchorElement;
        minValue: any;
        maxValue: any;
        increment: any;
        maxLength: any;
        _buttonDropDown: HTMLAnchorElement;
        _dropDownList: any;
        element: HTMLDivElement;
        drawControl(): HTMLDivElement;
        _onKeyUp(e: any): boolean;
        _onKeyDown(e: any): boolean;
        showDateView(): void;
        dropDown: any;
        showTimeView(): void;
        _getValueAsText(): any;
        getValue(): any;
        _updateValue(newValue: any): void;
        validateNumericInput(input: any): boolean;
        clearObject(): void;
        _closeDropDown(): void;
        isInt(x: any): boolean;
        _onButtonUpMouseDown(e: any): boolean;
        _onButtonDownMouseDown(e: any): boolean;
        onBlur(e: any): boolean;
        _onTextBoxMouseDown(e: any): void;
        _onTextBoxFocus(e: any): void;
        _onTextBoxBlur(e: any): void;
        _onTextBoxChanged(e: any): void;
        _onButtonMouseDown(e: any): void;
        buttonClicked: boolean;
        _onButtonMouseUp(e: any): void;
        createTimesView(): HTMLDivElement;
        onTimeCellClick(e: any): void;
        createDateView(): any;
        currentView: {};
        createCalendarHeader(): void;
        setCalendarHeaderText(): void;
        createCalendarContent(): void;
        createTodayButton(): void;
        changeCalendarView(): void;
        onCalendarMouseDown(e: any): void;
        calendarClicked: boolean;
        onCalendarTodayButtonClick(e: any): void;
        onCalendarPreviousYearClick(e: any): boolean;
        onCalendarPreviousMonthClick(e: any): boolean;
        onCalendarNextMonthClick(e: any): void;
        onCalendarNextYearClick(e: any): void;
        onCalendarTitleClick(e: any): void;
        onCalendarCellClick(e: any): void;
    }
    /**
    * For internal use only.
    * @private
    */
    export class CheckBoxList {
        constructor(options: any);
        id: any;
        items: any;
        selectedValues: any;
        width: any;
        height: any;
        cssClass: string;
        groupName: any;
        element: HTMLDivElement;
        /**
              * For internal use only.
              * @private
              */
        private isChecked;
        /**
        * For internal use only.
        * @private
        */
        private drawControl;
        /**
        * For internal use only.
        * @private
        */
        private drawItems;
        /**
        * For internal use only.
        * @private
        */
        private getSelected;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/Forms/BaseForm" {
    /**
    * @class The BaseForm class is the base class for all built-in forms.
    */
    export class BaseForm {
        /**
         * Initializes a new instance of the BaseForm class.
         * @param {Calendar} calendar The calendar parent object of this form.
         * @param {Item} item The item instance associated with this form.
         * @constructor
         */
        constructor(calendar: any, item: any);
        _calendar: any;
        _item: any;
        _id: string;
        _headerText: string;
        dragging: boolean;
        dragOffset: {
            x: number;
            y: number;
        };
        parentBounds: import("Drawing/Rect").Rect | import("Drawing/Size").Size;
        dimensions: {
            width: number;
            height: number;
        };
        _controls: Map<any, any>;
        elementId: string;
        mouseMoveHandler: (e: any) => void;
        mouseUpHandler: (e: any) => void;
        /**
        * For internal use only.
        * @private
        */
        private willFitParentBounds;
        /**
        * For internal use only.
        * @private
        */
        private checkBounds;
        /**
        * Renders a row element.
        */
        row(): HTMLDivElement;
        /**
        * Renders a column element.
        */
        col(): HTMLDivElement;
        /**
        * Renders a horizontal line divider.
        */
        divider(): HTMLDivElement;
        /**
        * For internal use only.
        * @private
        */
        private _getContacts;
        /**
        * For internal use only.
        * @private
        */
        private _getLocations;
        /**
        * For internal use only.
        * @private
        */
        private getChanges;
        /**
        * Adds the specified control to the collection of controls.
        * @param {Object} control The control to add.
        */
        addControl(control: any): void;
        /**
        * Removes the specified control from the collection of controls.
        * @param {Object} control The control to remove.
        */
        removeControl(control: any): void;
        /**
        * Clears all items from the collection of controls.
        */
        clearControls(): void;
        /**
        * Gets the value of the control with the specified id.
        * @param {String} controlId The id of the control to check.
        * @returns {Object} The value of the control.
        */
        getControlValue(controlId: string): any;
        /**
        * Renders the form.
        */
        showForm(): void;
        parentElement: any;
        fits: boolean;
        /**
        * For internal use only.
        * @private
        */
        private setLocation;
        /**
        * Closes the form.
        * @param {String} [formId] The Id of the form to be closed.
        */
        closeForm(formId?: string): void;
        /**
          * For internal use only.
          * @private
          */
        private getElement;
        /**
        * For internal use only.
        * @private
        */
        private getContent;
        /**
        * For internal use only.
        * @private
        */
        private getHeader;
        /**
        * For internal use only.
        * @private
        */
        private drawPopup;
        _element: HTMLDivElement;
        /**
        * Renders the form header.
        * @remarks Override this method in a derived class to render custom form header.
        */
        drawHeader(): HTMLDivElement;
        _header: HTMLDivElement;
        /**
        * Renders the form content.
        * @remarks Override this method in a derived class to render custom form content.
        */
        drawContent(): HTMLDivElement;
        _content: HTMLDivElement;
        /**
        * Renders the form buttons.
        * @remarks Override this method in a derived class to render custom form buttons.
        */
        drawButtons(): void;
        _buttons: any;
        /**
        * Creates a button with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created button.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createButton(options: any): any;
        /**
        * Creates a text area with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created text area.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createTextArea(options: any): any;
        /**
        * Creates a text box with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created text box.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createTextBox(options: any): any;
        /**
        * Creates a drop-down list with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created drop-down list.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createDropDownList(options: any): any;
        /**
        * Creates a check-box with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created check-box
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createCheckBox(options: any): any;
        /**
        * Creates a check box list with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created check-box list.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createCheckBoxList(options: any): any;
        /**
        * Creates an edit box with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created edit box.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createEditBox(options: any): any;
        /**
        * Creates a radio button with the specified options.
        * @param {Object} options Object, containing data for the new control.
        * @returns {Object} The newly created radio button.
        * @remarks The options parameter should match the following pattern: { id: id, text: text, events: {"name": handler} }
        */
        createRadioButton(options: any): any;
        /**
        * For internal use only.
        * @private
        */
        private clearObject;
        /**
        * @protected
        */
        protected onCloseButtonClick(e: any): void;
        /**
        * @protected
        */
        protected onCancelButtonClick(e: any): void;
        /**
        * @protected
        */
        protected onSaveButtonClick(e: any): void;
        /**
        * For internal use only.
        * @private
        */
        private onPopupMouseDown;
        /**
        * For internal use only.
        * @private
        */
        private onHeaderMouseDown;
        /**
        * For internal use only.
        * @private
        */
        private onMouseMove;
        /**
        * For internal use only.
        * @private
        */
        private onMouseUp;
        onKeyUp(e: any): void;
        onControlKeyUp(sender: any, e: any): boolean;
        /**
        * Gets a reference to the schedule item, whose information is displayed in the form.
        * @type {Item}
        * @summary The Item instance, whose information is displayed in the form.
        */
        get item(): any;
        /**
        * Gets a reference to the parent Calendar control.
        * @type {Calendar}
        * @summary The Calendar control, displaying the form.
        */
        get calendar(): any;
        /**
        * Gets the controls collection.
        * @type {Map}
        * @summary A dictionary, containing references to all controls present in the form.
        */
        get controls(): Map<any, any>;
        /**
        * Gets the locale object used to format and display date and time information in the form.
        * @type {Object}
        * @summary The format info object.
        */
        get formatInfo(): any;
        /**
        * Gets the locale object used to format and display localizable strings in the form.
        * @type {Object}
        * @summary The local info object.
        */
        get localInfo(): any;
        /**
        * Gets a value indicating the type of the form.
        * @type {String}
        * @summary "edit" if an existing item or recurrence object is being modified through the form, otherwise "new".
        */
        get type(): string;
        /**
        * Gets a value indicating the id of the form.
        * @type {String}
        * @summary The id of the form.
        * @remarks For the default forms possible return values are NewForm, EditForm, RecurrenceForm or ItemsCueForm.
        */
        get id(): string;
        set headerText(arg: string);
        /**
        * Gets or sets the text which is displayed in the header of the form.
        * @type {String}
        * @summary The header text.
        */
        get headerText(): string;
        /**
        * Returns a reference to the form DOM element.
        * @type {HTMLDivElement}
        * @summary The element.
        */
        get element(): HTMLDivElement;
        /**
        * Returns a reference to the DOM element of the form content.
        * @type {HTMLDivElement}
        * @summary The content element.
        */
        get content(): HTMLDivElement;
        /**
        * Returns a reference to the DOM element of the form header.
        * @type {HTMLDivElement}
        * @summary The header element.
        */
        get header(): HTMLDivElement;
    }
}
declare module "Scheduling/jsplanner/src/RecurrenceException" {
    export default RecurrenceException;
    /**
     * Copyright (c) 2017-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
     *
     * @xlass Represents an exception of the recurrence pattern.
     */
    class RecurrenceException {
        /**
         * Initializes a new instance of the RecurrenceException class.
         */
        constructor(item: any, index: any);
        _item: any;
        _index: any;
        _deleted: boolean;
        /**
         * Mark this occurrence as deleted.
         * @private
         */
        private setDeleted;
        /**
         * @private
         */
        private set index(arg);
        /**
         * Gets or sets the zero-based index of this occurrence.
         * @private
         */
        private get index();
        /**
         * @private
         */
        set item(arg: any);
        /**
         * Gets the item representing the recurrence exception.
         * @type {Item}
         * @summary The item.
         */
        get item(): any;
        /**
         * Gets a value indicating whether this event occurrence has been deleted.
         * @type {Boolean}
         * @summary True if the occurence has been deleted, otherwise false.
         */
        isDeleted(): boolean;
    }
}
declare module "Scheduling/jsplanner/src/Resource" {
    /**
     * @class Instances of the Resource class contain information about arbitrary resources.
     */
    export class Resource {
        _id: string;
        _name: string;
        _tag: any;
        set id(arg: string);
        /**
         * Gets the string identifier for this resource.
         * @type {String}
         * @summary The identifier.
         */
        get id(): string;
        set name(arg: string);
        /**
         * Gets the name of the resource.
         * @type {String}
         * @summary The name.
         */
        get name(): string;
        set tag(arg: any);
        /**
         * Gets custom data associated with the resource.
         * @type {Object}
         * @summary The tag.
         */
        get tag(): any;
        /**
        * Saves the resource content into an XML element.
        * @param {Element} element An XML DOM element that will contain the resource's data.
        * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
        */
        saveToXml(element: Element, context: any): void;
        /**
        * Loads the resource content from an XML element.
        * @param {Element} element An XML DOM element that contains the resource's serialized content.
        * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
        */
        loadFromXml(element: Element, context: any): void;
        /**
          * Serializes this resource into a JSON string.
          * @param {JsonPersistContext} context The serialization context.
          * @returns {String} A string containing the resource's JSON representation.
          */
        toJson(context: any): string;
        /**
        * Deserializes this resource from a JSON string.
        * @param {String} json A string created by the toJson method.
        * @param {JsonPersistContext} context The serialization context.
        */
        fromJson(json: string, context: any): void;
        /**
        * @private
        */
        private equals;
    }
}
declare module "Scheduling/jsplanner/src/Location" {
    /**
     * @class Specifies data that identifies a location.
     * @augments Resource
     */
    export class Location extends Resource {
        _address: string;
        _country: string;
        _city: string;
        _state: string;
        _zipCode: string;
        set address(arg: string);
        /**
         * Gets or sets the address of the location.
         * @type {String}
         * @summary The address.
         */
        get address(): string;
        set country(arg: string);
        /**
         * Gets or sets the country of this location.
         * @type {String}
         * @summary The country.
         */
        get country(): string;
        set city(arg: string);
        /**
         * Gets or sets the city of this location.
         * @type {String}
         * @summary The city.
         */
        get city(): string;
        set state(arg: string);
        /**
         * Gets or sets the state of this location.
        * @type {String}
         * @summary The state.
         */
        get state(): string;
        set zipCode(arg: string);
        /**
         * Gets or sets the zip-code of this location.
         * @type {String}
         * @summary The zio-code.
         */
        get zipCode(): string;
    }
    import { Resource } from "Scheduling/jsplanner/src/Resource";
}
declare module "Scheduling/jsplanner/src/Reminder" {
    /**
     * @class Represents reminders associated with schedule items.
     */
    export class Reminder {
        static get maxInterval(): TimeSpan;
        /**
         * Initializes a new instance of the Reminder class.
         * @param {Object} [options] For internal use.
         * @constructor
         */
        constructor(options?: any);
        _type: number;
        _timeInterval: TimeSpan;
        _time: DateTime;
        _message: string;
        _changedEvent: EventDispatcher<EventArgs>;
        /**
         * Returns an exact copy of this Reminder object.
         * @returns {Reminder} The newly created Reminder object.
         */
        clone(): Reminder;
        /**
         * Raises the changed event.
         * @private
         */
        private onChanged;
        set type(arg: number);
        /**
         * Gets or sets the type of this reminder.
         * @type {ReminderType}
         * @summary One of the ReminderType enumeration values.
         */
        get type(): number;
        set timeInterval(arg: TimeSpan);
        /**
         * Gets or sets how much time before the item's scheduled start
         * time to raise the event that triggers the reminder.
         * @type {TimeSpan}
         * @summary The time.
         * @remarks The value of this property is considered only if the type of
         * the reminder is set to ReminderType.Leading.
         */
        get timeInterval(): TimeSpan;
        set time(arg: DateTime);
        /**
         * Gets or sets the time when the Reminder is triggered.
         * @type {DateTime}
         * @summary The time.
         * @remarks The value of this property is considered only if the type of
         * the reminder is set to ReminderType.Exact.
         */
        get time(): DateTime;
        set message(arg: string);
        /**
         * Gets or sets the message to display as a reminder.
         * @type {String}
         * @summary The message.
         */
        get message(): string;
        /**
         * Raised when the reminder is changed.
         */
        get changed(): EventDispatcher<EventArgs>;
        /**
            * Saves the reminder content into an XML element.
            * @param {Element} element An XML DOM element that will contain the reminder's data.
            * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
            */
        saveToXml(element: Element, context: any): void;
        /**
        * Loads the reminder content from an XML element.
        * @param {Element} element An XML DOM element that contains the reminder's serialized content.
        * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
        */
        loadFromXml(element: Element, context: any): void;
        /**
         * Serializes this reminder into a JSON string.
         * @param {JsonPersistContext} context The serialization context.
         * @returns {String} A string containing the reminder's JSON representation.
         */
        toJson(context: any): string;
        /**
        * Deserializes this reminder from a JSON string.
        * @param {String} json A string created by the toJson method.
        * @param {JsonPersistContext} context The serialization context.
        */
        fromJson(json: string, context: any): void;
    }
    import { TimeSpan } from "Scheduling/jsplanner/src/TimeSpan";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/Task" {
    /**
    * @class Represents a task in the calendar.
    * @augments Resource
    */
    export class Task extends Resource {
        _dueDate: DateTime;
        _startDate: DateTime;
        _actualEnd: DateTime;
        _actualStart: DateTime;
        _allDayEvent: boolean;
        _subject: string;
        _details: string;
        _status: number;
        _priority: number;
        _progress: number;
        _estimatedDuration: number;
        _actualDuration: number;
        _estimatedCost: number;
        _actualCost: number;
        _reminder: any;
        set dueDate(arg: DateTime);
        /**
         * Gets or sets the task's due date.
         * @type {DateTime}
         * @summary the due date.
         */
        get dueDate(): DateTime;
        set startDate(arg: DateTime);
        /**
         * Gets or sets the task's start date.
         * @type {DateTime}
         * @summary The start date.
         */
        get startDate(): DateTime;
        set actualEnd(arg: DateTime);
        /**
         * Gets or sets the task's actual completion date.
         * @type {DateTime}
         * @summary The completion date.
         */
        get actualEnd(): DateTime;
        set actualStart(arg: DateTime);
        /**
         * Gets or set the task's actual start date.
         * @type {DateTime}
         * @summary The actual start date.
         */
        get actualStart(): DateTime;
        set subject(arg: string);
        /**
         * Gets or sets the subject of the task.
         * @type {String}
         * @summary The subject.
         */
        get subject(): string;
        set details(arg: string);
        /**
         * Gets or sets the detailed description of the Task.
         * @type {String}
         * @summary The description.
         */
        get details(): string;
        set status(arg: string);
        /**
         * Gets or sets the status of the task.
         * @type {String}
         * @summary The status.
         */
        get status(): string;
        set priority(arg: number);
        /**
         * Gets or sets the task priority.
         * @type {TaskPriority}
         * @summary One of the TaskPriority enumeration values.
         */
        get priority(): number;
        set progress(arg: number);
        /**
         * Gets or sets the task progress measured in percents.
         * @type {Number}
         * @summary The progress.
         */
        get progress(): number;
        set estimatedDuration(arg: number);
        /**
         * Gets or sets the estimated duration of the task measured in minutes.
         * @type {Number}
         * @summary The duration.
         */
        get estimatedDuration(): number;
        set actualDuration(arg: number);
        /**
         * Gets or sets the actual duration for this task measured in minutes.
         * @type {Number}
         * @summary The actual duration.
         */
        get actualDuration(): number;
        set estimatedCost(arg: number);
        /**
         * Gets or sets the estimated cost of the task.
         * @type {Number}
         * @summary The cost.
         */
        get estimatedCost(): number;
        set actualCost(arg: number);
        /**
         * Gets or sets the actual cost of this task.
         * @type {Number}
         * @summary The actual cost.
         */
        get actualCost(): number;
        set reminder(arg: Reminder);
        /**
         * Gets or sets the reminder for this task.
         * @type {Reminder}
         * @summary The reminder.
         */
        get reminder(): Reminder;
        allDayEvent: any;
    }
    import { Resource } from "Scheduling/jsplanner/src/Resource";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { Reminder } from "Scheduling/jsplanner/src/Reminder";
}
declare module "Scheduling/jsplanner/src/Item" {
    /**
     * @class Represents appointments within a schedule.
     */
    export class Item {
        static get tm(): number[];
        _startTime: DateTime;
        _endTime: DateTime;
        _allowChangeStart: boolean;
        _allowChangeEnd: boolean;
        _allowMove: boolean;
        _allDayEvent: boolean;
        _subject: string;
        _details: string;
        _locked: boolean;
        _cssClass: string;
        _reminder: Reminder;
        _id: string;
        _location: any;
        _task: any;
        _contacts: ObservableCollection<any>;
        _resources: ObservableCollection<any>;
        _visible: boolean;
        _recurrence: any;
        _recurrenceState: number;
        _occurrenceIndex: number;
        _settingRecurrence: boolean;
        _priority: number;
        _propertyChangedEvent: EventDispatcher<EventArgs>;
        _exceptionCreatedEvent: EventDispatcher<EventArgs>;
        _recurrenceResetEvent: EventDispatcher<EventArgs>;
        /**
         * Raises the propertyChanged event.
         * @private
         */
        private onPropertyChanged;
        onCollectionChanged(): void;
        /**
         * Raises the exceptionCreatedEvent event.
         * @private
         */
        private onExceptionCreated;
        /**
         * Raises the recurrenceResetEvent event.
         * @private
         */
        private onRecurrenceReset;
        /**
         * Marks the item as an occurrence of a repeating item.
         * @private
         */
        private setOccurrence;
        /**
         * Sets the recurrence state of the item to RecurrenceState.Exception.
         * @private
         */
        private setException;
        /**
         * Called by the recurrence whenever a new occurrence is generated in order to populate
         * the property fields of the instance with values from the master item.
         * @param {Item} master An Item that represents the master.
         * @private
         */
        private copyOccurrence;
        set id(arg: string);
        /**
         * Gets or sets the string identifier of this item.
         * @type {String}
         * @summary The id.
         * @remarks Used by the getItemById method of schedule.
         */
        get id(): string;
        set subject(arg: string);
        /**
         * Gets or sets header text displayed for this item by the calendar control.
         * @type {String}
         * @summary The header text.
         */
        get subject(): string;
        set details(arg: string);
        /**
        * Gets or sets the details text displayed for this item by the scheduling control.
        * @type {String}
        * @summary The details text.
        */
        get details(): string;
        set task(arg: Task);
        /**
         * Gets or sets the task associated with this item.
         * @type {Task}
         * @summary The task.
         */
        get task(): Task;
        set location(arg: Location);
        /**
         * Gets or sets the item location.
         * @type {Location}
         * @summary The location.
         */
        get location(): Location;
        set locked(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to modify this item.
         * @type {Boolean}
         * @summary True if the item is locked, otherwise false.
         */
        get locked(): boolean;
        set visible(arg: boolean);
        /**
         * Gets or sets whether the item is visible.
         * @type {Boolean}
         * @summary True if the item is visible, otherwise false.
         */
        get visible(): boolean;
        set allDayEvent(arg: boolean);
        /**
         * Gets or sets a value indicating whether the item is an all-day event.
         * @type {Boolean}
         * @summary True if the item is an all-day event, otherwise false.
         * @remarks All day events are displayed in a special header area when the Calendar displays a timetable view.
         */
        get allDayEvent(): boolean;
        set allowChangeEnd(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to change the item's end time.
         * @type {Boolean}
         * @summary True if the end time can be changed, otherwise false.
         */
        get allowChangeEnd(): boolean;
        set allowChangeStart(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to change the item's start time.
         * @type {Boolean}
         * @summary True if the start time can be changed, otherwise false.
         */
        get allowChangeStart(): boolean;
        set allowMove(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to move the item.
         * @type {Boolean}
         * @summary True if the item can be moved, otherwise false.
         */
        get allowMove(): boolean;
        set priority(arg: number);
        /**
         * Gets or sets the priority of the Item.
         * @type {Number}
         * @summary The priority.
         * @remarks Items with higher priority are rendered with preference over items with lower priority.
         */
        get priority(): number;
        set cssClass(arg: string);
        /**
         * Gets or sets the css class of the item.
         * @type {String}
         * @summary The css class.
         */
        get cssClass(): string;
        /**
         * Marks the item as exception if it is a recurrent item.
         * @private
         */
        private markException;
        /**
         * @private
         */
        private onReminderChanged;
        /**
         * Creates an exact copy of this item.
         * @returns {Item} An item, identical to this one.
         */
        clone(): Item;
        /**
         * Gets a list with all contacts associated with this item.
         * @type {ObservableCollection}
         * @summary The contacts.
         */
        get contacts(): ObservableCollection<any>;
        /**
         * Gets a list with all resources associated with this item.
         * @type {ObservableCollection}
         * @summary The resources.
         */
        get resources(): ObservableCollection<any>;
        set startTime(arg: DateTime);
        /**
         * Gets or sets the item's scheduled start time.
         * @type {DateTime}
         * @summary The start time.
         */
        get startTime(): DateTime;
        set endTime(arg: DateTime);
        /**
         * Gets or sets the item's scheduled end time.
         * @type {DateTime}
         * @summary The end time.
         */
        get endTime(): DateTime;
        set headerText(arg: string);
        /**
       * Gets or sets header text displayed for this item by the calendar control.
       * @type {String}
       * @summary The header text.
       */
        get headerText(): string;
        set descriptionText(arg: string);
        /**
        * Gets or sets the details text displayed for this item by the scheduling control.
        * @type {String}
        * @summary The details text.
        */
        get descriptionText(): string;
        set reminder(arg: Reminder);
        /**
         * Gets or sets the reminder for this item.
         * @type {Reminder}
         * @summary The reminder.
         */
        get reminder(): Reminder;
        set recurrence(arg: Recurrence);
        /**
         * Gets or sets the recurrence pattern of this item.
         * @type {Recurrence}
         * @summary The recurrence.
         */
        get recurrence(): Recurrence;
        set recurrenceState(arg: number);
        /**
         * Gets the recurrence state of this item.
         * @type {RecurrenceState}
         * @summary The recurrence state.
         */
        get recurrenceState(): number;
        /**
         * @param {Number} value The new property value.
         * @private
         */
        set occurrenceIndex(arg: number);
        /**
         * Gets the index of a repeating occurrence of a recurring item.
         * @type {Number}
         * @summary The occurrence index.
         * @remarks If the item is not recurring, this property returns -1.
         */
        get occurrenceIndex(): number;
        set tag(arg: any);
        /**
         * Gets or sets custom data associated with the item.
         * @type {Object}
         * @summary The tag.
         * @remarks Use this property to store your custom data.
         */
        get tag(): any;
        _tag: any;
        /**
         * Raised when the a property of the item is changed.
         */
        get propertyChanged(): EventDispatcher<EventArgs>;
        /**
         * Raised when the recurrence pattern associated with the item has been reset.
         */
        get recurrenceReset(): EventDispatcher<EventArgs>;
        /**
         * Raised when the item is marked as an exception of a recurrence.
         */
        get exceptionCreated(): EventDispatcher<EventArgs>;
        /**
         * @private
         */
        private setResource;
        /**
       * @private
       */
        private hasResource;
        /**
       * @private
       */
        private extend;
        /**
        * Saves the item content into an XML element.
        * @param {Element} element An XML DOM element that will contain the item's data.
        * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
        */
        saveToXml(element: Element, context: any): void;
        /**
      * Loads the item content from an XML element.
      * @param {Element} element An XML DOM element that contains the item's serialized content.
      * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
      */
        loadFromXml(element: Element, context: any): void;
        /**
        * Serializes this item into a JSON string.
        * @param {JsonPersistContext} context The serialization context.
        * @returns {String} A string containing the item's JSON representation.
        */
        toJson(context: any): string;
        /**
        * Deserializes this item from a JSON string.
        * @param {String} json A string created by the toJson method.
        * @param {JsonPersistContext} context The serialization context.
        */
        fromJson(json: string, context: any): void;
    }
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { Reminder } from "Scheduling/jsplanner/src/Reminder";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Task } from "Scheduling/jsplanner/src/Task";
    import { Location } from "Scheduling/jsplanner/src/Location";
    import { Recurrence } from "Scheduling/jsplanner/src/Recurrence";
}
declare module "Scheduling/jsplanner/src/Recurrence" {
    /**
     * @class Defines recurrence patterns for items scheduled to repeat over and over again.
     */
    export class Recurrence {
        _pattern: number;
        _daily: number;
        _monthly: number;
        _yearly: number;
        _days: number;
        _dayOfMonth: number;
        _weeks: number;
        _daysOfWeek: number;
        _months: number;
        _monthOfYear: number;
        _occurrence: number;
        _day: number;
        _interval: number;
        _startDate: DateTime;
        _end: number;
        _numOccurrences: number;
        _endDate: DateTime;
        _exceptions: Map<any, any>;
        _master: any;
        _resetEvent: EventDispatcher<EventArgs>;
        /**
         * Creates an exact copy of this Recurrence object.
         * @returns {Recurrence} A new Recurrence object, identical to the current one.
         */
        clone(): Recurrence;
        /**
         * Determines whether two Recurrence objects define the same recurrence pattern.
         * @param {Recurrence} recurrence  A Recurrence object to compare with this recurrence.
         * @returns {Boolean} true if the Recurrence instances have the same recurrence pattern; otherwise false.
         */
        samePatternAs(recurrence: Recurrence): boolean;
        /**
         * Copies the property values of the specified Recurrence object as
         * values for the properties of this Recurrence object.
         *
         * This method behaves similarly to the clone method but does not create a new object.
         * @param {Recurrence} recurrence The Recurrence object whose fields to copy.
         */
        applyPattern(recurrence: Recurrence): void;
        /**
         * Returns the end date for this recurrence. The end date is calculated based on the specified repeat number if RecurrenceEnd *
         * is set to NumOccurrences.
         * @returns {DateTime} The end date of the recurrence if the recurrence is set to expire or DateTime.MaxValue otherwise.
         */
        getEndDate(): DateTime;
        /**
         * Associates the recurrence with the specified item. If the supplied reference is null,
         * the recurrence is detached from the currently associated master.
         * @param {Item} master The item to associate with.
         */
        associateWith(master: Item): void;
        /**
         * Resets the recurrence and raises the event.
         * @private
         */
        private onReset;
        /**
         * Retrieves the number of the appropriate day within the specified month.
         * @private
         */
        private getDayOfTheMonth;
        /**
         * Locates and returns the date of the first occurrence after the specified date.
         * @private
         */
        private gotoFirstOccurrence;
        /**
         * Adjusts the date to the date of the next occurrence right after or at the specified date.
         * @private
         */
        private getNextOccurrence;
        /**
         * Gets the occurrence right after or at the specified start date. This function ignores
         * the end date of the recurrence so it will always return a valid item.
         * @private
         */
        private _getNextOccurrence;
        /**
         * Returns the occurrence with the specified index.
         * @remarks This function might take considerable amount of time if you specify a large index in an infinite recurrence.
         * @param {Number} index The index of the occurrence to retrieve.
         * @param {*} refIsDeleted If the specified occurrence is an exception, this parameter
         * indicates upon function completion whether the exception is deleted or not.
         * @param {Boolean} noException Specifies whether to return the original item, in case this occurrence is an exception.
         * @returns {Item} A reference to the occurrence with the specified index or null, if there is no such occurrence.
         */
        getOccurrence(index: number, refIsDeleted: any, noException: boolean): Item;
        /**
         * Creates occurrence items for this Recurrence in the specified date range.
         * @remarks The Calendar control uses this method to generate item occurrences
         * when a recurrent item must be displayed in the current view.
         * @param {DateTime} startDate The range start date.
         * @param {DateTime} endDate The range end date.
         * @returns {Array} A  collection of Item instances representing each occurrence of the recurrent event in the specified date range.
         */
        generateItems(startDate: DateTime, endDate: DateTime): any[];
        /**
         * Removes all exceptions of this Recurrence.
         */
        clearExceptions(): void;
        /**
         * Marks the specified item as an exception in the Recurrence pattern.
         * @remarks The Calendar control calls this method when a user drags an occurrence item or edits its text,
         * thus creating an exception of the recurrence.
         * @param {Item} item The item to be marked as an exception.
         * @param {Boolean} [deleted] Specifies whether the exception is created by deleting one
         * occurrence from the recurrent pattern or by changing the occurrence time properties.
         * @param {*} [reminder] For internal use.
         */
        markException(item: Item, deleted?: boolean, reminder?: any): void;
        /**
         * Removes the exception associated with the specified item from the recurrence.
         * @param {Item} item The item whose exception to remove.
         */
        removeException(item: Item): void;
        /**
            * Returns a localized string that represents this Recurrence using the specified date
            * and time formatting info and localization information.
            * @param {Object} formatInfo Specifies how date and time values are formatted and displayed.
            * @param {Object} localInfo Specifies localized strings used in the representation.
            * @returns {String}  A localized string representation of this Recurrence object.
            */
        toLocalizedString(formatInfo: any, localInfo: any): string;
        /**
        * @private
        */
        private getDaysOfWeekString;
        /**
      * @private
      */
        private getOccurrenceString;
        /**
      * @private
      */
        private getDayOfWeekTypeString;
        /**
      * @private
      */
        private getOutcome;
        set pattern(arg: number);
        /**
         * Gets or sets the recurrence pattern.
         * @type {RecurrencePattern}
         * @summary One of the RecurrencePattern enumeration values.
         */
        get pattern(): number;
        set dailyRecurrence(arg: number);
        /**
         * Gets or sets the type of daily recurrence.
         * @type {DailyRecurrence}
         * @summary One of the DailyRecurrence enumeration values.
         * @remarks This property is used when the Pattern is set to RecurrencePattern.Daily.
         */
        get dailyRecurrence(): number;
        set monthlyRecurrence(arg: number);
        /**
         * Gets or sets the type of monthly recurrence.
         * @type {MonthlyRecurrence}
         * @summary One of the MonthlyRecurrence enumeration values.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.Monthly.
         */
        get monthlyRecurrence(): number;
        set yearlyRecurrence(arg: number);
        /**
         * Gets or sets the type of yearly recurrence.
         * @type {YearlyRecurrence}
         * @summary One of the YearlyRecurrence enumeration values.
         * @remarks This property is used when the Pattern is set to RecurrencePattern.Yearly.
         */
        get yearlyRecurrence(): number;
        set days(arg: number);
        /**
         * Gets or sets the number of days between two consecutive occurrences of the same event.
         * @type {Number}
         * @summary The number of days.
         * @remarks This value is used when the recurrence Pattern is set to RecurrencePattern.Daily.
         */
        get days(): number;
        set dayOfMonth(arg: number);
        /**
         * Gets or sets the day of the month when the event occurs.
         * @type {Number}
         * @summary The day of the month.
         * This property is used when the Pattern is set to RecurrencePattern.Monthly or RecurrencePattern.Yearly.
         */
        get dayOfMonth(): number;
        set weeks(arg: number);
        /**
         * Gets or sets the number of weeks between two consecutive occurrences of the event.
         * @type {Number}
         * @summary The number of weeks.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.Weekly.
         */
        get weeks(): number;
        set daysOfWeek(arg: number);
        /**
         * Gets or sets the days of the week when the event occurs.
         * @type {DaysOfWeek}
         * @summary One of the DaysOfWeek enumeration values.
         * @remarks This property is used when the Pattern is set to RecurrencePattern.Weekly.
         */
        get daysOfWeek(): number;
        set months(arg: number);
        /**
         * Gets or sets the number of months between two consecutive occurrences of the same event.
         * @type {Number}
         * @summary The number of months.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.Monthly.
         */
        get months(): number;
        set monthOfYear(arg: number);
        /**
         * Gets or sets the month of the year when the event occurs.
         * @type {Number}
         * @summary The month.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.Yearly.
         */
        get monthOfYear(): number;
        set occurrence(arg: number);
        /**
         * Gets or sets on which occurrence of the week within the month the event occurs.
         * @type {Occurrence}
         * @summary The occurrence.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.Monthly or
         * RecurrencePattern.Yearly and the MonthlyRecurrence or YearlyRecurrence properties
         * are set to MonthlyRecurrence.ByDayType.
         */
        get occurrence(): number;
        set day(arg: number);
        /**
         * Gets or sets a value indicating the day of the week when the event occurs.
         * @type {DayOfWeekType}
         * @summary One of the DayOfWeekType enumeration values.
         * @remarks The property is used when Pattern is set to RecurrencePattern.Monthly or
         * RecurrencePattern.Yearly and the MonthlyRecurrence or YearlyRecurrence properties
         * are set to MonthlyRecurrence.ByDayType.
         */
        get day(): number;
        set interval(arg: number);
        /**
         * Gets or sets the interval of recurrence.
         * @type {Number}
         * @summary The interval.
         * @remarks The property is used when the Pattern is set to RecurrencePattern.ByTimeInterval.
         */
        get interval(): number;
        set startDate(arg: DateTime);
        /**
         * Gets or sets the date and time of the event's first occurrence.
         * @type {DateTime}
         * @summary The start date.
         */
        get startDate(): DateTime;
        set recurrenceEnd(arg: number);
        /**
         * Gets or sets the last time when the event occurs.
         * @type {RecurrenceEnd}
         * @summary One of the RecurrenceEnd enumeration values.
         */
        get recurrenceEnd(): number;
        set numOccurrences(arg: number);
        /**
         * Gets or sets how many times a recurring event should occur.
         * @type {Number}
         * @summary The number of occurences.
         */
        get numOccurrences(): number;
        set endDate(arg: DateTime);
        /**
         * Gets or sets the end date of the recurrence.
         * @type {DateTime}
         * @summary The end date.
         * @remarks The property is used when RecurrenceEnd is set to RecurrenceEnd.EndDate.
         */
        get endDate(): DateTime;
        /**
         * Gets a list with all recurrence exceptions.
         * @type {Map}
         * @summary A Map with all the Exceptions.
         */
        getExceptions(): Map<any, any>;
        /**
         * Gets the master item for the recurrence.
         * @type {Item}
         * @summary The master item
         * @remarks To associate a Recurrence with an Item, set the Item's Recurrence property to the Recurrence object.
         */
        get master(): Item;
        /**
         * Raised when the recurrence pattern has been reset, that is, all exceptions have been erased.
         */
        get reset(): EventDispatcher<EventArgs>;
        /**
        * @private
        */
        private extend;
        /**
        * @private
        */
        private daysOfWeekToString;
        /**
        * @private
        */
        private daysOfWeekFromString;
        /**
            * Saves the recurrence content into an XML element.
            * @param {Element} element An XML DOM element that will contain the recurrence's data.
            * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
            */
        saveToXml(element: Element, context: any): void;
        /**
      * Loads the recurrence content from an XML element.
      * @param {Element} element An XML DOM element that contains the recurrence's serialized content.
      * @param {XmlPersistContext} context An object providing contextual information about the serialization process and some helper serialization methods.
      */
        loadFromXml(element: Element, context: any): void;
        /**
       * Serializes this recurrence into a JSON string.
       * @param {JsonPersistContext} context The serialization context.
       * @returns {String} A string containing the recurrence's JSON representation.
       */
        toJson(context: any): string;
        /**
        * Deserializes this recurrence from a JSON string.
        * @param {String} json A string created by the toJson method.
        * @param {JsonPersistContext} context The serialization context.
        */
        fromJson(json: string, context: any): void;
    }
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Item } from "Scheduling/jsplanner/src/Item";
}
declare module "Scheduling/jsplanner/src/Forms/RecurrenceForm" {
    export default RecurrenceForm;
    class RecurrenceForm extends BaseForm {
        constructor(calendar: any, item: any);
        cssClass: string;
        _type: string;
        recurrence: any;
        firstLastList: {
            value: number;
            text: any;
        }[];
        dayNames: {
            value: number;
            text: any;
        }[];
        monthNames: {
            value: number;
            text: any;
        }[];
        getRadioGroupValue(radioGroup: any): number;
        /**
        * For internal use only.
        * @private
        */
        private onDeleteButtonClick;
        onPatternChange(e: any): void;
    }
    import { BaseForm } from "Scheduling/jsplanner/src/Forms/BaseForm";
}
declare module "Scheduling/jsplanner/src/Forms/EditForm" {
    export default EditForm;
    class EditForm extends BaseForm {
        constructor(calendar: any, item: any, type: any);
        _type: any;
        cssClass: string;
        reminderTexts: {
            value: number;
            text: any;
        }[];
        /**
        * For internal use only.
        * @private
        */
        private _getItemContacts;
        /**
        * For internal use only.
        * @private
        */
        private _getItemLocationIndex;
        subtractedEndDate: boolean;
        /**
        * For internal use only.
        * @private
        */
        private setRecurrence;
        recurrence: any;
        /**
        * For internal use only.
        * @private
        */
        private onDeleteButtonClick;
        /**
        * For internal use only.
        * @private
        */
        private onRecurrenceButtonClick;
        /**
        * For internal use only.
        * @private
        */
        private setTimeControls;
        /**
        * @private
        */
        private updateRecurrenceInfo;
        showRecurrenceInfo(recurrence: any): void;
        /**
        * For internal use only.
        * @private
        */
        private onAllDayChange;
        /**
        * For internal use only.
        * @private
        */
        private onReminderChange;
        /**
        * Gets the item currently modified through the form
        * @returns {Item} The item.
        */
        getItem(): any;
        /**
        * Sets the item currently modified through the form
        * @param {Item} value The item.
        */
        setItem(value: any): void;
    }
    import { BaseForm } from "Scheduling/jsplanner/src/Forms/BaseForm";
}
declare module "Scheduling/jsplanner/src/Interactions/InplaceEdit" {
    export default InplaceEdit;
    /**
    * For internal use only.
    * @private
    */
    class InplaceEdit {
        constructor(view: any, appointment: any);
        view: any;
        calendar: any;
        appointment: any;
        item: any;
        element: any;
        stopped: boolean;
        containerClickHandler: (e: any) => void;
        clickHandler: (e: any) => void;
        doubleClickHandler: (e: any) => void;
        dispose(): void;
        onContainerClick(e: any): void;
        onClick(e: any): void;
        popupMode: any;
        clickTimer: number;
        onDoubleClick(e: any): void;
        inplaceEdit(): boolean;
        inplaceInputFocusHandler: (e: any) => void;
        inplaceInputBlurHandler: (e: any) => void;
        inplaceInputKeyUpHandler: (e: any) => boolean;
        onInplaceInputFocus(e: any): void;
        onInplaceInputBlur(e: any, allowed: any): void;
        onInplaceInputKeyUp(e: any): boolean;
        clearInput(): void;
        focusInput(): void;
    }
}
declare module "Scheduling/jsplanner/src/Appointment" {
    export default Appointment;
    /**
    * Provides a visual representation for a calendar item.
    * @private
    */
    class Appointment {
        constructor(args: any);
        mouseDownHandler: (e: any) => void;
        mouseUpHandler: (e: any) => void;
        clickHandler: (e: any) => void;
        doubleClickHandler: (e: any) => void;
        inplaceEdit: InplaceEdit;
        dispose(): void;
        clearHandlers(): void;
        attachHandlers(): void;
        get element(): any;
        /**
        * For internal use only.
        * @private
        * Creates a new appointment.
        */
        private create;
        view: any;
        calendar: any;
        item: any;
        orientation: any;
        isHeader: any;
        length: number;
        /**
        * For internal use only.
        * @private
        * Creates a new appointment as a part.
        */
        private createPart;
        Dom: any;
        isPartial: any;
        partIndex: any;
        cellIndex: any;
        cellsLength: any;
        startCellIndex: any;
        lastCellIndex: any;
        monthCellIndex: any;
        groupColumnIndex: any;
        /**
        * For internal use only.
        * @private
        * Creates a new appointment as an occurrence.
        */
        private createOccurrence;
        /**
        * For internal use only.
        * @private
        * Modifies the appointment.
        */
        private edit;
        /**
        * For internal use only.
        * @private
        * Creates the appointment's visual and raises draw event.
        */
        private createVisual;
        /**
        * For internal use only.
        * @private
        * Creates the appointment's visual.
        */
        private doCreateVisual;
        /**
        * For internal use only.
        * @private
        * Recreates the appointment's visual.
        * Used when dragging appointments between header and schedule areas in Timetable view.
        */
        private recreateVisual;
        updateVisual(): void;
        /**
        * For internal use only.
        * @private
        * Updates appointments' resize handles.
        */
        private updateResizeHandles;
        /**
        * For internal use only.
        * @private
        * Updates appointments' visual for display in items cue form.
        */
        private updateCueVisual;
        /**
        * For internal use only.
        * @private
        * Updates appointments' time indicator.
        * Used for Timetable day items.
        */
        private updateTimeIndicator;
        /**
        * For internal use only.
        * @private
        * Updates appointments' visual for drag/resize interaction.
        */
        private updateDragVisual;
        /**
        * For internal use only.
        * @private
        * Returns the data needed for interactions.
        */
        private getData;
        /**
        * For internal use only.
        * @private
        * Returns the time increased by the item's length.
        */
        private getEndTime;
        /**
        * For internal use only.
        * @private
        * Returns the items' length in milliseconds.
        */
        private getLength;
        /**
        * For internal use only.
        * @private
        * Returns the first cell occuppied by this item's visuals.
        * Used in drag and resize.
        */
        private getItemStartCell;
        /**
        * For internal use only.
        * @private
        * Returns the last cell occuppied by this item's visuals.
        * Used in drag and resize.
        */
        private getItemEndCell;
        /**
        * For internal use only.
        * @private
        * Returns an array of all appointments, which are parts of the current appointment's item.
        */
        private getParts;
        /**
        * For internal use only.
        * @private
        * Returns an array of all appointments, which are parts of the current appointment's item.
        * The returned array is grouped by resource.
        */
        private getGroupParts;
        /**
        * For internal use only.
        * @private
        * Removes all other appointments, which are parts of the appointment's item.
        */
        private removeParts;
        get isMilestone(): boolean;
        get isSelected(): any;
        /**
        * For internal use only.
        * @private
        */
        private onMouseUp;
        /**
        * For internal use only.
        * @private
        */
        private onMouseDown;
        /**
        * For internal use only.
        * @private
        */
        private onClick;
        /**
        * For internal use only.
        * @private
        */
        private onDoubleClick;
    }
    import InplaceEdit from "Scheduling/jsplanner/src/Interactions/InplaceEdit";
}
declare module "Scheduling/jsplanner/src/Interactions/DragContainer" {
    export default DragContainer;
    /**
    * For internal use only.
    * @private
    */
    class DragContainer {
        constructor(view: any, data: any);
        draggable: any;
        data: any;
        view: any;
        offsetLeft: any;
        calendar: any;
        _element: any;
        resource: any;
        mouseMoveHandler: (e: any) => boolean;
        mouseUpHandler: (e: any) => void;
        dispose(): void;
        onMouseMove(e: any): boolean;
        onMouseUp(e: any): void;
        doDrag(e: any): void;
        getCell(c: any): void;
        getX(cell: any, x: any, y: any): any;
        getY(cell: any, x: any, y: any): any;
    }
}
declare module "Scheduling/jsplanner/src/Interactions/DragItem" {
    export default DragItem;
    /**
    * For internal use only.
    * @private
    */
    class DragItem {
        constructor(view: any, data: any);
        _dragWidth: any;
        data: any;
        item: any;
        view: any;
        appointment: any;
        calendar: any;
        _element: any;
        _container: any;
        mouseMoveHandler: (e: any) => boolean;
        _dragmode: string;
        dispose(): void;
        onMouseMove(e: any): boolean;
        mouseMoved(e: any): boolean;
        doDrag(e: any): boolean;
        addDraggable(e: any): boolean;
    }
}
declare module "Scheduling/jsplanner/src/Interactions/ResizePart" {
    export default ResizePart;
    /**
    * For internal use only.
    * @private
    */
    class ResizePart {
        constructor(view: any, data: any);
        view: any;
        _container: any;
        element: any;
        startCell: any;
        endCell: any;
        index: any;
        dispose(): void;
        updateVisual(): void;
    }
}
declare module "Scheduling/jsplanner/src/Interactions/ResizeContainer" {
    export default ResizeContainer;
    /**
    * For internal use only.
    * @private
    */
    class ResizeContainer {
        constructor(view: any, data: any);
        data: any;
        view: any;
        calendar: any;
        _element: any;
        resource: any;
        parts: any[];
        startCell: any;
        endCell: any;
        mouseMoveHandler: (e: any) => boolean;
        mouseUpHandler: (e: any) => void;
        cursor: string;
        dispose(): void;
        onMouseMove(e: any): boolean;
        onMouseUp(e: any): void;
        doResize(e: any): void;
        getChanges(cell: any): {
            startTime: any;
            endTime: any;
        };
        getCell(cell: any): void;
        clearParts(): void;
        createParts(cell: any): void;
        createPart(cell: any, lcell: any, index: any): void;
        draggable: ResizePart;
        createVPart(cell: any): void;
        getX(cell: any, x: any, y: any, element: any): any;
        getY(cell: any, x: any, y: any, element: any): any;
        getRX(start: any, end: any, x: any, y: any, element: any): number;
        getRY(start: any, end: any, x: any, y: any, element: any): number;
    }
    import ResizePart from "Scheduling/jsplanner/src/Interactions/ResizePart";
}
declare module "Scheduling/jsplanner/src/Interactions/ResizeItem" {
    export default ResizeItem;
    /**
    * For internal use only.
    * @private
    */
    class ResizeItem {
        constructor(view: any, data: any);
        _dragWidth: any;
        data: any;
        item: any;
        view: any;
        appointment: any;
        calendar: any;
        _element: any;
        _container: any;
        mouseMoveHandler: (e: any) => boolean;
        _mode: any;
        dispose(): void;
        onMouseMove(e: any): boolean;
        mouseMoved(e: any): boolean;
        doResize(e: any): boolean;
        addResizable(e: any): boolean;
    }
}
declare module "Scheduling/jsplanner/src/Forms/NewForm" {
    export default NewForm;
    class NewForm extends BaseForm {
        constructor(calendar: any, item: any);
        _type: string;
        cssClass: string;
        /**
        * For internal use only.
        * @private
        */
        private onOptionsButtonClick;
    }
    import { BaseForm } from "Scheduling/jsplanner/src/Forms/BaseForm";
}
declare module "Scheduling/jsplanner/src/Forms/CueForm" {
    export default CueForm;
    /**
    * @class Allows handling of hidden items in a cell.
    * @augments BaseForm
    * @remarks The CueForm is shown when an item cue of a calendar cell which isn't big enough to contain all of its items is clicked.
    */
    class CueForm extends BaseForm {
        constructor(calendar: any, items: any, cell: any);
        _type: string;
        items: any;
        cell: any;
    }
    import { BaseForm } from "Scheduling/jsplanner/src/Forms/BaseForm";
}
declare module "Scheduling/jsplanner/src/Cell" {
    export default Cell;
    /**
      * Base class for calendar views.
      * For internal use only.
      * @private
      */
    class Cell {
        constructor(calendar: any);
        calendar: any;
        Dom: {};
        items: any[];
        cueClickHandler: (e: any) => void;
        buttonClickHandler: (e: any) => void;
        headerClickHandler: (e: any) => void;
        getElement(): any;
        getContent(): any;
        getScroller(): any;
        getContainer(): any;
        getHeader(): any;
        getGroupHeader(): any;
        getTimelineHeader(): any;
        detach(): void;
        _loaded: boolean;
        attach(): void;
        draw(): HTMLDivElement;
        _element: HTMLDivElement;
        getItemAppointment(item: any): any;
        removeAppointment(appointment: any): void;
        clearAppointments(): void;
        endSelection(item: any): void;
        selectItem(e: any, data: any): boolean;
        itemData: any;
        _dragging: boolean;
        _resizing: boolean;
        _selecting: boolean;
        resize: ResizeItem;
        resizeStartCell: any;
        resizeLastCell: any;
        drag: DragItem;
        endItemDrag(changes: any): void;
        endItemResize(changes: any): void;
        cancelInteraction(action: any): void;
        stopInteraction(action: any): void;
        placeItems(): void;
        getAllItems(): void;
        itemInViewRange(item: any): boolean;
        createAppointment(args: any): any;
        /**
        * Creates a new occurrence appointment.
        */
        createOccurrence(args: any): any;
        itemsContainItem(item: any, items: any): boolean;
        getItemElements(item: any): any[];
        getItemsCount(cell: any): any;
        getHiddenItems(): void;
        isValidCell(index: any): boolean;
        getCellHeaderAt(cell: any, x: any, y: any): any;
        getDragOffset(cell: any, item: any): number;
        getColumnResource(column: any): any;
        getCues(): void;
        getFullCues(): void;
        cues: any[];
        getHiddenCues(): void;
        getItemCueCells(item: any): any[];
        get cueCells(): any;
        createCues(): void;
        clearCues(): void;
        getCueItems(cell: any): any[];
        onCueClick(e: any): void;
        onHeaderClick(e: any): void;
        getHeaderType(element: any): number;
        onNavButtonClick(e: any): void;
        onThemeChanged(oldValue: any, newValue: any): void;
        get orientation(): number;
        get formatInfo(): any;
        set startTime(arg: any);
        get startTime(): any;
        _startTime: any;
        set endTime(arg: any);
        get endTime(): any;
        _endTime: any;
        set itemsStartTime(arg: any);
        get itemsStartTime(): any;
        _itemsStartTime: any;
        set itemsEndTime(arg: any);
        get itemsEndTime(): any;
        _itemsEndTime: any;
        get settings(): any;
        get filtered(): boolean;
        get grouped(): boolean;
        get resources(): any;
        get groupResources(): any;
    }
    import ResizeItem from "Scheduling/jsplanner/src/Interactions/ResizeItem";
    import DragItem from "Scheduling/jsplanner/src/Interactions/DragItem";
}
declare module "Scheduling/jsplanner/src/ViewRow" {
    export default ViewRow;
    /**
    * For internal use only.
    * @private
    */
    class ViewRow {
        constructor(start: any, end: any, itemStart: any, itemEnd: any);
        _startTime: any;
        _endTime: any;
        _itemsStartTime: any;
        _itemsEndTime: any;
        set cells(arg: any);
        get cells(): any;
        set index(arg: any);
        get index(): any;
        _index: any;
        get startTime(): any;
        get endTime(): any;
        set itemsStartTime(arg: any);
        get itemsStartTime(): any;
        set itemsEndTime(arg: any);
        get itemsEndTime(): any;
        set rowOffset(arg: any);
        get rowOffset(): any;
        _rowOffset: any;
        _cells: any;
    }
}
declare module "Scheduling/jsplanner/src/ViewCell" {
    /**
    * @namespace MindFusion.Scheduling
    */
    /**
     * Copyright (c) 2017-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
     * @class Encapsulates data for a datetime cell in a calendar view.
     */
    export class ViewCell {
        _resource: any;
        /**
        * @private
        */
        set index(arg: number);
        /**
        * Gets the index of the cell.
        * @type {Number}
        * @summary The index.
        */
        get index(): number;
        _index: number;
        /**
        * For internal use only.
        * @private
        */
        private set cellIndex(arg);
        /**
        * For internal use only.
        * @private
        */
        private get cellIndex();
        _cellIndex: any;
        /**
        * For internal use only.
        * @private
        */
        private set rowIndex(arg);
        /**
        * For internal use only.
        * @private
        */
        private get rowIndex();
        _rowIndex: any;
        /**
        * For internal use only.
        * @private
        */
        private set columnIndex(arg);
        /**
        * For internal use only.
        * @private
        */
        private get columnIndex();
        _columnIndex: any;
        /**
        * @private
        */
        set startTime(arg: any);
        /**
        * Gets the start time of the cell.
        * @type {DateTime}
        * @summary The start time of the cell.
        */
        get startTime(): any;
        _startTime: any;
        /**
        * @private
        */
        set endTime(arg: any);
        /**
        * Gets the end time of the cell.
        * @type {DateTime}
        * @summary The end time of the cell.
        */
        get endTime(): any;
        _endTime: any;
        /**
        * @private
        */
        set resource(arg: any);
        /**
        * Gets the resource associated with the cell.
        * @type {Resource}
        * @summary The resource associated with the cell in a grouped view, or null in a non-grouped view.
        */
        get resource(): any;
        /**
        * @private
        */
        set bgCell(arg: any);
        /**
        * Gets the DOM element of the cell's content.
        * @type {DOMElement}
        * @summary The DOM element representing the cell content.
        */
        get bgCell(): any;
        _bgCell: any;
        /**
        * @private
        */
        set title(arg: any);
        /**
        * Gets the DOM element of the cell's header.
        * @type {DOMElement}
        * @summary The DOM element representing the cell header.
        */
        get title(): any;
        _title: any;
        /**
        * @private
        */
        set isHeader(arg: boolean);
        /**
        * Gets a value indicating whether this cell is a header cell.
        * @type {Boolean}
        * @summary True if it is a header cell, otherwise false.
        * @remarks Only applies to Timetable view cells.
        */
        get isHeader(): boolean;
        _isHeader: boolean;
    }
}
declare module "Scheduling/jsplanner/src/DummyItem" {
    export default DummyItem;
    /**
    * For internal use only.
    * @private
    */
    class DummyItem {
        constructor(startTime: any, endTime: any, headerText: any, allDay: any, calendar: any, resource: any);
        startTime: any;
        endTime: any;
        headerText: any;
        allDayEvent: any;
        allowMove: boolean;
        allowChangeStart: boolean;
        allowChangeEnd: boolean;
        locked: boolean;
        contacts: any;
        location: any;
        task: any;
        resources: any;
    }
}
declare module "Scheduling/jsplanner/src/MonthCell" {
    export default MonthCell;
    /**
    * For internal use only.
    * @augments Cell
    * @private
    */
    class MonthCell extends Cell {
        constructor(calendar: any, parent: any, date: any, index: any, firstLast: any, maxWeekCount: any);
        unit: number;
        index: any;
        _showLeadingDays: any;
        _showTrailingDays: any;
        _maxWeekCount: any;
        _date: any;
        parent: any;
        _settings: any;
        itemsCount: number;
        rowCellsCount: number;
        _rows: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get cssClass(): string;
        initVars(): void;
        _isSubHeaderVisible: boolean;
        _daysPerWeek: number;
        _rowsCount: any;
        _rowHeight: number;
        getWeekHeader(): any;
        getDaysHeader(): any;
        getRows(): any;
        getBgCells(): any;
        createRows(): void;
        firstVisibleCell: any;
        lastVisibleCell: any;
        getAllItemsInCell(cell: any): any[];
        getCellAt(x: any, y: any): any;
        getCellIndexAt(x: any, y: any): number;
        getDimensions(): void;
        cellWidth: number;
        calculatedCellWidth: number;
        rowHeight: number;
        headerHeight: number;
        offsetLeft: number;
        dragOffsetLeft: number;
        dragWidth: number;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        itemsToPut: any[];
        createItemsTable(row: any): void;
        /**
              * For internal use only.
              * @private
              */
        private updateItem;
        getTimeRows(start: any, end: any): {
            start: any;
            end: any;
        };
        /**
               * Gets the cell that corresponds to the specified time.
               * @param {Object} [time] The time to search for.
               * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
               false if the index of the second interval is contained.
               * @returns {Object} The cell that holds the specified time.
               */
        getTimeCell(time?: any, isEndTime?: boolean): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any): any[];
        /**
             * For internal use only.
             * @private
             */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        getItemsInCell(cell: any, items: any): any[];
        /**
              * For internal use only.
              * @private
              */
        private getFirstRowCell;
        /**
        * For internal use only.
        * @private
        */
        private getLastRowCell;
        drawHeader(): HTMLDivElement;
        drawHeaderButtons(parent: any): void;
        drawContent(): HTMLDivElement;
        drawWeekNumbersHeader(): HTMLTableElement;
        drawBackgroundTable(startDate: any, row: any): HTMLDivElement;
        drawMonthDay(day: any, isEmptyCell: any): HTMLDivElement;
        drawItemTable(startDate: any, row: any): HTMLTableElement;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
}
declare module "Scheduling/jsplanner/src/MonthRangeCell" {
    export default MonthRangeCell;
    class MonthRangeCell extends Cell {
        unit: number;
        getRows(): any;
        getBgCells(): any;
        initVars(): void;
        _date: any;
        _settings: any;
        _isHeaderVisible: boolean;
        _rows: any;
        _rowHeight: number;
        _cols: any;
        _realRows: number;
        monthCells: List<any>;
        rowCellsCount: number;
        getMaxWeekCount(date: any): number;
        createCells(): void;
        get rows(): List<any>;
        get cells(): List<any>;
        get visibleCells(): any[];
        get cssClass(): string;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        itemsToPut: any[];
        createItemsTable(monthCell: any, row: any): void;
        updateItem(appointment: any, addToItems: any): any;
        getItemsInRow(monthCell: any, row: any): any[];
        /**
           * For internal use only.
           * @private
           */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        getItemsInCell(cell: any, items: any): any[];
        /**
              * Gets the cell of the month that corresponds to the specified time.
              * @param {Object} [time] The time to check.
              * @param {Boolean} [isEndTime] true if the cell of the first interval is returned, when the time is the border between two intervals;
              false if the second interval is returned.
              * @returns {Object} The month cell.
              */
        getMonthTimeCell(time?: any, isEndTime?: boolean): any;
        /**
              * Gets the first and last month cell that correspond to the given period.
              * @param {Object} [start] The start of the period.
              * @param {Object} [end] The end of the period.
              * @returns {Object} An object that contains the start and end month cells.
              */
        getTimeMonthCells(start?: any, end?: any): any;
        /**
        * For internal use only.
        * @private
        */
        private getTimeRows;
        /**
        * Gets the cell that corresponds to the specified time.
        * @param {Object} [time] The time to check.
        * @param {Boolean} [isEndTime] true if the cell of the first interval is returned, when the time is the border between two intervals;
        false if the second interval is returned.
        * @param {Object} [cell] The month cell to look into.
        * @returns {Object} The daily cell that contains the given time.
        */
        getTimeCell(time?: any, isEndTime?: boolean, cell?: any): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any): any[];
        getDimensions(): void;
        monthRowHeight: number;
        calculatedMonthCellWidth: number;
        cellWidth: any;
        calculatedCellWidth: any;
        weekRowHeight: any;
        headerHeight: any;
        offsetLeft: number;
        dragOffsetLeft: number;
        dragWidth: any;
        itemsCount: any;
        /**
          * For internal use only.
          * @private
          */
        private getCellIndexAt;
        /**
        * Gets the cell that holds the specified point.
        * @param {Number} [x] The X-coordinate of the point.
        * @param {Number} [y] The Y-coordinate of the point.
        * @returns {Object} The cell that holds the point.
        */
        getCellAt(x?: number, y?: number): any;
        /**
        * Gets the month cell with the given coordinates.
        * @param {Number} [x] The X-coordinate of the point.
        * @param {Number} [y] The Y-coordinate of the point.
        * @returns {Object} The month cell.
        */
        getMonthCellAt(x?: number, y?: number): any;
        /**
        * For internal use only.
        * @private
        */
        private firstVisibleCellOfMonth;
        /**
        * For internal use only.
        * @private
        */
        private lastVisibleCellOfMonth;
        /**
        * For internal use only.
        * @private
        */
        private lastMonthVisibleCell;
        getNextVisibleCell(index: any, count: any): any;
        getIndexCell(index: any, findex: any): any;
        /**
        * For internal use only.
        * @private
        */
        private getFirstRowCell;
        /**
        * For internal use only.
        * @private
        */
        private getLastRowCell;
        getAllItemsInCell(cell: any): any[];
        drawHeader(): HTMLDivElement;
        drawHeaderButtons(parent: any): void;
        drawContent(): HTMLDivElement;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
}
declare module "Scheduling/jsplanner/src/WeekRangeCell" {
    export default WeekRangeCell;
    /**
    * For internal use only.
    * @private
    * @augments Cell
    */
    class WeekRangeCell extends Cell {
        unit: number;
        _settings: any;
        rows: List<any>;
        get cells(): List<any>;
        get cssClass(): string;
        initVars(): void;
        rowCellsCount: number;
        _firstVisibleDate: any;
        _endDate: any;
        _daysPerWeek: number;
        _rows: any;
        _realRows: number;
        _titleText: any;
        _rowHeight: string;
        getDimensions(): void;
        cellWidth: any;
        calculatedCellWidth: number;
        weekRowHeight: number;
        headerHeight: number;
        offsetLeft: any;
        dragOffsetLeft: number;
        dragWidth: any;
        itemsCount: any;
        getRows(): any;
        getBgCells(): any;
        updateItem(appointment: any, addToItems: any): any;
        hasVisibleParts(item: any): boolean;
        isComposite(item: any): boolean;
        /**
        * For internal use only.
        * @private
        */
        private getFirstRowCell;
        /**
        * For internal use only.
        * @private
        */
        private getLastRowCell;
        getTimeRows(start: any, end: any): {
            start: any;
            end: any;
        };
        /**
        * Gets the cell that corresponds to the specified time.
        * @param {Object} [time] The time to search for.
        * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
        false if the index of the second interval is contained.
        * @returns {Object} The cell that holds the specified time.
        */
        getTimeCell(time?: any, isEndTime?: boolean): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any): any[];
        clear(): void;
        init(): void;
        itemsToPut: any[];
        createItemsTable(row: any): void;
        getItemsInRow(row: any): any[];
        getItemsInCell(cell: any, items: any): any[];
        getAllItemsInCell(cell: any): any[];
        /**
            * Gets the cell that contains the specified coordinates.
            * @param {Number} [x] The X-ccordinate of the point.
            * @param {Number} [y] The Y-ccordinate of the point.
            * @returns {Object} The cell that contains the specified coordinate.
            */
        getCellAt(x?: number, y?: number): any;
        /**
        * For internal use only.
        * @private
        */
        private getCellIndexAt;
        createRows(): void;
        firstVisibleCell: any;
        lastVisibleCell: any;
        drawHeader(): HTMLDivElement;
        drawContent(): HTMLDivElement;
        drawBackgroundTable(startDate: any, row: any): HTMLDivElement;
        drawWeekDay(day: any): HTMLDivElement;
        drawItemTable(startDate: any, rowIndex: any): HTMLTableElement;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
}
declare module "Scheduling/jsplanner/src/ViewColumn" {
    export default ViewColumn;
    /**
    * For internal use only.
    * @private
    */
    class ViewColumn {
        constructor(index: any, date: any, start: any, end: any);
        _index: any;
        _date: any;
        _startTime: any;
        _endTime: any;
        set cells(arg: any);
        get cells(): any;
        get index(): any;
        get startTime(): any;
        get endTime(): any;
        get date(): any;
        set headerCell(arg: any);
        get headerCell(): any;
        _headerCell: any;
        _cells: any;
        get timeRange(): TimeRange;
    }
    import { TimeRange } from "Scheduling/jsplanner/src/TimeRange";
}
declare module "Scheduling/jsplanner/src/Timetable" {
    export default Timetable;
    /**
    * For internal use only.
    * @private
    * @augments Cell
    */
    class Timetable extends Cell {
        _settings: any;
        _columns: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get headerCells(): List<any>;
        get dates(): any[];
        get cssClass(): string;
        initVars(): void;
        _groupColumns: any;
        _dateColumns: any;
        _totalColumns: any;
        _totalCells: number;
        _canGroupHour: boolean;
        createColumn(date: any, index: any, resource: any): ViewColumn;
        createColumns(): void;
        headerItemsStartTime: any;
        headerItemsEndTime: any;
        rowsCount: number;
        skipNext: number;
        skipped: boolean;
        getHeaderItemsCells(): any;
        getRows(): any;
        getBgCells(): any;
        getCellAt(x: any, y: any, resource: any): any;
        getCellIndexAt(x: any, y: any, resource: any): any;
        getColumnIndexByTime(time: any, isEndTime: any, resource: any): number;
        addUnits(date: any, count: any): DateTime;
        getScheduleBounds(): import("Drawing/Rect").Rect;
        getHeaderBounds(): import("Drawing/Rect").Rect | {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        getAllItemsInCell(cell: any): any[];
        startSelect(e: any): void;
        startCol: any;
        endCol: any;
        startCell: any;
        doSelect(e: any): void;
        updateDrag(appointment: any, cell: any, e: any): void;
        /**
          * For internal use only.
          * @private
          * Updates appointment and layout during resize operation.
          */
        private updateResize;
        getDimensions(): void;
        cellWidth: number;
        cellHeight: any;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        placeItem(appointment: any): void;
        getHeaderItemRow(appointment: any): number;
        getItemCell(appointment: any): any;
        updateLayout(): void;
        /**
            * For internal use only.
            * @private
            * Updates appointment data after creation/modification.
            * Used for header items.
            */
        private updateHeaderItem;
        updateDayItem(appointment: any, addToItems: any): any;
        /**
              * For internal use only.
              * @private
              */
        private updateItem;
        getColumnsByResource(resource: any): any[];
        getItemStartColumn(item: any): number;
        getItemEndColumn(item: any, resource: any): any;
        /**
               * Gets the cell that corresponds to the specified time.
               * @param {Object} [time] The time to search for.
               * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
               false if the index of the second interval is contained.
            * @param {Object} [col] The column to look into.
               * @returns {Object} The cell that holds the specified time.
               */
        getTimeCell(time?: any, isEndTime?: boolean, col?: any): any;
        /**
         * For internal use only.
         * @private
         * Returns an array of cells that correspond to the specified time and column.
         */
        private getTimeCells;
        /**
            * For internal use only.
            * @private
            * Returns an array of all column indexes the specified appointment belongs to.
            * Both group and time parts are included.
            */
        private getItemColumns;
        /**
        * For internal use only.
        * @private
        * Returns an array of all group column indexes the specified appointment belongs to.
        * Only group parts are included.
        */
        private getItemGroupColumns;
        /**
        * For internal use only.
        * @private
        * Checks if the appointment belongs to the column.
        */
        private isItemInColumn;
        /**
        * For internal use only.
        * @private
        * Checks if the appointment belongs to more than one column.
        */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        getItemsInCell(cell: any, items: any): any[];
        drawHeader(): HTMLDivElement;
        drawColumnHeaders(): HTMLDivElement;
        drawDateHeaders(): HTMLTableRowElement;
        drawHeaderButtons(): HTMLDivElement;
        getButtonTooltip(f: any): string;
        drawGroupHeaders(): HTMLTableRowElement;
        drawContent(): HTMLDivElement;
        drawTimeline(): HTMLDivElement;
        getMinutesText(time: any): any;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
    import ViewColumn from "Scheduling/jsplanner/src/ViewColumn";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
}
declare module "Scheduling/jsplanner/src/HTimetable" {
    export default HorizontalTimetable;
    /**
    * For internal use only.
    * @augments Cell
    * @private
    */
    class HorizontalTimetable extends Cell {
        _settings: any;
        _columns: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get headerCells(): List<any>;
        get dates(): any[];
        get cssClass(): string;
        initVars(): void;
        _groupColumns: any;
        _dateColumns: any;
        _totalColumns: any;
        _totalCells: number;
        _canGroupHour: boolean;
        createColumn(date: any, index: any, resource: any): ViewColumn;
        createColumns(): void;
        headerItemsStartTime: any;
        headerItemsEndTime: any;
        rowsCount: number;
        skipNext: number;
        skipped: boolean;
        getHeaderItemsCells(): any;
        getRows(): any;
        getBgCells(): any;
        getCellAt(x: any, y: any, resource: any): any;
        getCellIndexAt(x: any, y: any, resource: any): any;
        getColumnIndexByTime(time: any, isEndTime: any, resource: any): number;
        addUnits(date: any, count: any): DateTime;
        getScheduleBounds(): import("Drawing/Rect").Rect;
        getHeaderBounds(): import("Drawing/Rect").Rect | {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        getAllItemsInCell(cell: any): any[];
        startSelect(e: any): void;
        startCol: any;
        endCol: any;
        startCell: any;
        doSelect(e: any): void;
        updateDrag(appointment: any, cell: any, e: any): void;
        /**
          * For internal use only.
          * @private
          * Updates appointment and layout during resize operation.
          */
        private updateResize;
        getDimensions(): void;
        cellWidth: any;
        cellHeight: any;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        placeItem(appointment: any): void;
        getHeaderItemRow(appointment: any): number;
        getItemCell(appointment: any): any;
        updateLayout(): void;
        /**
            * For internal use only.
            * @private
            * Updates appointment data after creation/modification.
            * Used for header items.
            */
        private updateHeaderItem;
        updateDayItem(appointment: any, addToItems: any): any;
        /**
              * For internal use only.
              * @private
              */
        private updateItem;
        getColumnsByResource(resource: any): any[];
        getItemStartColumn(item: any): number;
        getItemEndColumn(item: any, resource: any): any;
        /**
               * Gets the cell that corresponds to the specified time.
               * @param {Object} [time] The time to search for.
               * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
               false if the index of the second interval is contained.
             * @param {Object} [col] The column to look into.
               * @returns {Object} The cell that holds the specified time.
               */
        getTimeCell(time?: any, isEndTime?: boolean, col?: any): any;
        /**
         * For internal use only.
         * @private
         * Returns an array of cells that correspond to the specified time and column.
         */
        private getTimeCells;
        /**
            * For internal use only.
            * @private
            * Returns an array of all column indexes the specified appointment belongs to.
            * Both group and time parts are included.
            */
        private getItemColumns;
        /**
        * For internal use only.
        * @private
        * Returns an array of all group column indexes the specified appointment belongs to.
        * Only group parts are included.
        */
        private getItemGroupColumns;
        /**
        * For internal use only.
        * @private
        * Checks if the appointment belongs to the column.
        */
        private isItemInColumn;
        /**
        * For internal use only.
        * @private
        * Checks if the appointment belongs to more than one column.
        */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        getItemsInCell(cell: any, items: any): any[];
        drawHeader(): HTMLDivElement;
        drawColumnHeaders(): HTMLDivElement;
        drawDateHeaders(): HTMLTableElement;
        drawHeaderButtons(): HTMLDivElement;
        getButtonTooltip(f: any): string;
        drawContent(): HTMLDivElement;
        drawTimeline(): HTMLDivElement;
        getMinutesText(time: any): any;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
    import ViewColumn from "Scheduling/jsplanner/src/ViewColumn";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
}
declare module "Scheduling/jsplanner/src/HListCell" {
    export default HorizontalList;
    /**
    * For internal use only.
    * @augments Cell
    * @private
    */
    class HorizontalList extends Cell {
        _settings: any;
        _rows: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get cssClass(): string;
        initVars(): void;
        _date: DateTime;
        _lastDate: DateTime;
        _groupColumns: any;
        _totalColumns: any;
        getRows(): any;
        getBgCells(): any;
        createCells(): void;
        _columns: List<any>;
        rowCellsCount: any;
        groupCols: any[];
        getCellAt(x: any, y: any, resource: any): any;
        getCellIndexAt(x: any, y: any, resource: any): number;
        getEndCell(endIndex: any, resource: any): any;
        /**
               * For internal use only.
               * @private
               * Increases the specified date by the specified number of units.
               */
        private addUnits;
        skipNext: any;
        skipped: boolean;
        /**
              * For internal use only.
              * @private
              */
        private setTimeOfUnit;
        /**
        * For internal use only.
        * @private
        */
        private unitsBetween;
        getDimensions(): void;
        cellWidth: number;
        rowHeight: number;
        headerHeight: number;
        itemsCount: any;
        dragWidth: number;
        dragOffsetLeft: number;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        itemsToPut: any[];
        createItemsTable(row: any, groupCol: any): void;
        /**
        * For internal use only.
        * @private
        */
        private updateItem;
        /**
               * Gets the cell that corresponds to the specified time.
               * @param {Object} [time] The time to search for.
               * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
               false if the index of the second interval is contained.
               * @param {Object} [col] The column to look into.
               * @returns {Object} The cell that holds the specified time.
               */
        getTimeCell(time?: any, isEndTime?: boolean, col?: any): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any, col: any): any[];
        /**
             * For internal use only.
             * @private
             */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        checkElementBounds(bounds: any, x: any, y: any, y2: any): boolean;
        getItemsInCell(cell: any, items: any): any[];
        getAllItemsInCell(cell: any): any[];
        getItemsInCol(index: any): any[];
        getItemCols(item: any): number[];
        getItemCell(item: any): any;
        getGroupCells(col: any): any[];
        getItemRow(row: any, col: any): any;
        getItemHeight(item: any): number;
        getItemsToPut(groupCol: any): any[];
        /**
        * For internal use only.
        * @private
        */
        private getItemsToPutInCol;
        getItemsCountInRow(row: any, groupCol: any): number;
        drawGroupHeader(): HTMLDivElement;
        drawHeader(): HTMLDivElement;
        drawHeaderButtons(parent: any): HTMLDivElement;
        getHeaderButtonTooltip(step: any): string;
        drawContent(): HTMLDivElement;
        drawBackgroundTable(): HTMLDivElement;
        drawDay(day: any): HTMLDivElement;
        drawItemTable(): HTMLTableElement;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
}
declare module "Scheduling/jsplanner/src/VListCell" {
    export default VerticalList;
    /**
    * For internal use only.
    * @private
    * @augments Cell
    */
    class VerticalList extends Cell {
        _settings: any;
        _rows: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get cssClass(): string;
        initVars(): void;
        _date: DateTime;
        _lastDate: DateTime;
        _groupColumns: any;
        _totalColumns: any;
        getRows(): any;
        getBgCells(): any;
        createCells(): void;
        _columns: List<any>;
        rowCellsCount: number;
        groupCols: any[];
        getCellAt(x: any, y: any, resource: any): any;
        getCellIndexAt(x: any, y: any, resource: any): number;
        getEndCell(endIndex: any, resource: any): any;
        /**
               * For internal use only.
               * @private
               * Increases the specified date by the specified number of units.
               */
        private addUnits;
        skipNext: any;
        skipped: boolean;
        /**
              * For internal use only.
              * @private
              */
        private setTimeOfUnit;
        /**
        * For internal use only.
        * @private
        */
        private unitsBetween;
        getDimensions(): void;
        cellWidth: number;
        dayHeaderHeight: number;
        calculatedCellHeight: number;
        rowHeight: number;
        headerWidth: number;
        dragWidth: any;
        dragHeight: number;
        itemsCount: any;
        /**
        * For internal use only.
        * @private
        */
        private clear;
        init(): void;
        itemsToPut: any[];
        createItemsTable(row: any, groupCol: any): void;
        arrangeItems(): void;
        arrangeItemsInCol(col: any): void;
        /**
              * For internal use only.
              * @private
              */
        private updateItem;
        /**
               * Gets the cell that corresponds to the specified time.
               * @param {Object} [time] The time to search for.
               * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
               false if the index of the second interval is contained.
               * @param {Object} [col] The column to look into.
               * @returns {Object} The cell that holds the specified time.
               */
        getTimeCell(time?: any, isEndTime?: boolean, col?: any): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any, col: any): any[];
        /**
             * For internal use only.
             * @private
             */
        private isComposite;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        checkElementBounds(bounds: any, x: any, y: any, y2: any): boolean;
        getItemsInCell(cell: any, items: any): any[];
        getAllItemsInCell(cell: any): any[];
        getItemsInCol(index: any): any[];
        getItemCols(item: any): number[];
        getItemCell(item: any): any;
        getGroupCells(col: any): any[];
        getItemRow(row: any, col: any): any;
        getItemHeight(item: any): number;
        getItemsToPut(groupCol: any): any[];
        /**
        * For internal use only.
        * @private
        */
        private getItemsToPutInCol;
        getItemsCountInRow(row: any, groupCol: any): number;
        drawGroupHeader(): HTMLDivElement;
        drawHeader(): HTMLDivElement;
        drawHeaderButtons(parent: any): HTMLDivElement;
        getHeaderButtonTooltip(step: any): string;
        drawContent(): HTMLDivElement;
        drawBackgroundTable(): HTMLDivElement;
        drawBackgroundTable1(): HTMLTableElement;
        drawDay(day: any): HTMLDivElement;
        drawItemTable(): HTMLDivElement;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
}
declare module "Scheduling/jsplanner/src/ResourceViewCell" {
    export default ResourceViewCell;
    /**
    * For internal use only.
    * @augments Cell
    * @private
    */
    class ResourceViewCell extends Cell {
        _date: any;
        _settings: any;
        _timelineSettings: any;
        _rows: List<any>;
        _selectionPaused: boolean;
        get cells(): List<any>;
        get cssClass(): string;
        initVars(): void;
        _lastDate: any;
        _realCells: number;
        rowCellsCount: number;
        _contentWidth: string;
        _firstVisibleDate: any;
        _groupColumns: any;
        cellTicks: List<any>;
        _bottomTimelineCells: List<any>;
        _middleTimelineCells: List<any>;
        _topTimelineCells: List<any>;
        getRows(): any;
        getBgCells(): any;
        getDayCells(): any;
        createCells(): void;
        groupCols: any[];
        updateTimelines(): void;
        cellsWidthCache: any[];
        calculatedCellWidth: number;
        onScroll(e: any): void;
        updateLeftmost(offset: any): void;
        currentLeftmost: any[];
        calcLeftmostOffset(offset: any, cell: any, timeline: any): string;
        getLeftmost(offset: any): number[];
        getCellsCount(start: any, end: any, unit: any, unitCount: any): number;
        getRelativeTicks(settings: any, start: any, end: any, bottomTicks: any): any;
        getBottomRelativeTicks(settings: any): number;
        calculateCells(timeline: any, type: any): List<any>;
        getEndCell(endIndex: any, resource: any): any;
        getDimensions(): void;
        cellWidth: any;
        rowHeight: number;
        groupHeaderWidth: number;
        dragOffsetLeft: number;
        dragWidth: any;
        updateItem(appointment: any, addToItems: any): any;
        isComposite(item: any): boolean;
        /**
        * For internal use only.
        * @private
        */
        private hasVisibleParts;
        clear(): void;
        init(): void;
        itemsToPut: any[];
        createItemsTable(row: any, groupCol: any): void;
        createLanes(): void;
        /**
        * For internal use only.
        * @private
        */
        private addLaneRow;
        getItemCols(item: any): number[];
        getItemsToPutInCol(groupCol: any): any[];
        getItemsInCell(cell: any, items: any): any[];
        getAllItemsInCell(cell: any): any[];
        getGroupCells(col: any): any[];
        getTimeCell(time: any, isEndTime: any, col: any): any;
        getTimeCells(startTime: any, endTime: any, isEndTime: any, col: any): any[];
        setTimeOfUnit(time: any, day: any): number;
        /**
        * For internal use only.
        * @private
        */
        private unitsBetween;
        getItemsToPut(groupCol: any): any[];
        getRowAt(y: any): number;
        /**
        * For internal use only.
        * @private
        */
        private getCellAt;
        /**
        * For internal use only.
        * @private
        */
        private getCellIndexAt;
        drawHeader(): HTMLDivElement;
        drawContent(): HTMLDivElement;
        drawItemTable(): HTMLTableElement;
        drawBackgroundTable(): HTMLDivElement;
        drawLaneTable(): HTMLTableElement;
        drawGroupHeader(): HTMLDivElement;
        drawTimeline(type: any): HTMLDivElement;
        /**
            * For internal use only.
            * @private
            */
        private addUnits;
        skipNext: any;
        skipped: boolean;
    }
    import Cell from "Scheduling/jsplanner/src/Cell";
    import { List } from "@mindfusion/common-collections";
}
declare module "Scheduling/jsplanner/src/MonthSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a Month view.
    */
    export class MonthSettings {
        constructor(calendar: any);
        calendar: any;
        _headerStyle: number;
        _weekHeaderStyle: number;
        _dayNamesHeaderStyle: number;
        _dayOfWeekFormat: number;
        _titleFormat: string;
        _hideTrailingWeeks: boolean;
        _trailingWeekCount: number;
        _leadingWeekCount: number;
        _showPaddingDays: boolean;
        _showPaddingItems: boolean;
        _generalFormat: string;
        _firstDayOfMonthFormat: string;
        _firstDayOfYearFormat: string;
        _expandDayHeaders: boolean;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set headerStyle(arg: number);
        /**
        * Gets or sets the style of the view header.
        * @type {MainHeaderStyle}
        * @summary One of the MainHeaderStyle enumeration values.
        */
        get headerStyle(): number;
        set weekHeaderStyle(arg: number);
        /**
        * Gets or sets the style of the view week numbers header.
        * @type {VerticalHeaderStyle}
        * @summary One of the VerticalHeaderStyle enumeration values.
        */
        get weekHeaderStyle(): number;
        set dayNamesHeaderStyle(arg: number);
        /**
        * Gets or sets the style of the view day names header.
        * @type {HorizontalHeaderStyle}
        * @summary One of the HorizontalHeaderStyle enumeration values.
        */
        get dayNamesHeaderStyle(): number;
        set dayOfWeekFormat(arg: number);
        /**
        * Gets or sets the format of the day names displayed in the day names header.
        * @type {DayOfWeekFormat}
        * @summary One of the DayOfWeekFormat enumeration values.
        */
        get dayOfWeekFormat(): number;
        set titleFormat(arg: string);
        /**
        * Gets or sets the string used to format the header title.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        set hideTrailingWeeks(arg: boolean);
        /**
        * Gets or sets a value indicating whether to hide trailing weeks,
        * which do not contain days from the current month.
        * @type {Boolean}
        * @summary True to hide trailing weeks, otherwise false.
        */
        get hideTrailingWeeks(): boolean;
        set trailingWeekCount(arg: number);
        /**
        * Gets or sets the number of full weeks to display from the next month.
        * @type {Number}
        * @summary The number of full weeks to display from the next month.
        */
        get trailingWeekCount(): number;
        set leadingWeekCount(arg: number);
        /**
        * Gets or sets the number of full weeks to display from the previous month.
        * @type {Number}
        * @summary The number of full weeks to display from the previous month.
        */
        get leadingWeekCount(): number;
        set showPaddingDays(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display days from the
        * previous and next months at the beginning and the end of the current
        * one, in order to fill the whole grid of day cells.
        * @type {Boolean}
        * @summary True if padding days are displayed, otherwise false.
        */
        get showPaddingDays(): boolean;
        set showPaddingItems(arg: boolean);
        /**
        * Gets or sets a value indicating whether items are shown in padding days.
        * @type {Boolean}
        * @summary True if items are shown in padding days, otherwise false.
        */
        get showPaddingItems(): boolean;
        set expandDayHeaders(arg: boolean);
        /**
      * Gets or sets a value indicating whether day headers should fill the whole day cell.
      * @type {Boolean}
      * @summary True to expand the headers, otherwise false.
      */
        get expandDayHeaders(): boolean;
        set generalFormat(arg: string);
        /**
         * Gets or sets the string used to format cells' headers.
         * @type {String}
         * @summary The format string.
         */
        get generalFormat(): string;
        set firstDayOfMonthFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each month.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfMonthFormat(): string;
        set firstDayOfYearFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each year.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfYearFormat(): string;
        set maxItems(arg: number);
        /**
        * Gets or sets the maximum number of calendar items to display in a view cell.
        * @type {Number}
        * @summary The maximum number of calendar items to display in a view cell.
        */
        get maxItems(): number;
        /**
         * Raises the propertyChanged event.
         * @private
         */
        private onPropertyChanged;
        /**
        * For internal use only.
        * @private
        */
        private get showHeader();
        /**
        * For internal use only.
        * @private
        */
        private get showDayNamesHeader();
        /**
        * For internal use only.
        * @private
        */
        private get showWeekHeader();
        _maxItems: number;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/MonthRangeSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a MonthRange view.
    */
    export class MonthRangeSettings {
        constructor(calendar: any);
        calendar: any;
        _numberOfMonths: number;
        _monthsPerRow: number;
        _visibleRows: number;
        _headerStyle: number;
        _titleFormat: string;
        _titleSeparator: string;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set numberOfMonths(arg: number);
        /**
        * Gets or sets the total number of months to display in the view.
        * @type {Number}
        * @summary The number of months to be displayed in the view.
        */
        get numberOfMonths(): number;
        set monthsPerRow(arg: number);
        /**
        * Gets or sets the number of months to be displayed in a row.
        * @type {Number}
        * @summary The number of months to be displayed in a row.
        */
        get monthsPerRow(): number;
        set visibleRows(arg: number);
        /**
        * Gets or sets the number of rows visible at the same time.
        * @type {Number}
        * @summary The number of rows visible at the same time.
        */
        get visibleRows(): number;
        set headerStyle(arg: number);
        /**
        * Gets or sets the style of the view header.
        * @type {MainHeaderStyle}
        * @summary One of the MainHeaderStyle enumeration values.
        */
        get headerStyle(): number;
        set titleFormat(arg: string);
        /**
        * Gets or sets the string used to format the header title.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        set titleSeparator(arg: string);
        /**
        * Gets or sets the string used as a title separator.
        * @type {String}
        * @summary The separator string.
        */
        get titleSeparator(): string;
        /**
       * Raises the propertyChanged event.
       * @private
       */
        private onPropertyChanged;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/WeekRangeSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a WeekRange view.
    */
    export class WeekRangeSettings {
        constructor(calendar: any);
        calendar: any;
        _viewStyle: number;
        _visibleRows: number;
        _headerStyle: number;
        _titleFormat: string;
        _titleSeparator: string;
        _dayNamesHeaderStyle: number;
        _dayOfWeekFormat: number;
        _generalFormat: string;
        _firstDayOfMonthFormat: string;
        _firstDayOfYearFormat: string;
        _expandDayHeaders: boolean;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set viewStyle(arg: number);
        /**
        * Gets or sets the style of the view.
        * @type {WeekRangeViewStyle}
        * @summary One of the WeekRangeViewStyle enumeration values.
        */
        get viewStyle(): number;
        set visibleRows(arg: number);
        /**
        * Gets or sets the number of rows visible at the same time.
        * @type {Number}
        * @summary The number of rows visible at the same time.
        */
        get visibleRows(): number;
        set headerStyle(arg: number);
        /**
        * Gets or sets the style of the view header.
        * @type {MainHeaderStyle}
        * @summary One of the MainHeaderStyle enumeration values.
        */
        get headerStyle(): number;
        set titleFormat(arg: string);
        /**
        * Gets or sets  the string used to format the header title.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        set titleSeparator(arg: string);
        /**
        * Gets or sets the string used as a title separator.
        * @type {String}
        * @summary The separator string.
        */
        get titleSeparator(): string;
        set dayNamesHeaderStyle(arg: number);
        /**
        * Gets or sets the style of the day names header.
        * @type {HorizontalHeaderStyle}
        * @summary One of the HorizontalHeaderStyle enumeration values.
        */
        get dayNamesHeaderStyle(): number;
        set dayOfWeekFormat(arg: number);
        /**
        * Gets or sets the format of the day names displayed in the day names header.
        * @type {DayOfWeekFormat}
        * @summary One of the DayOfWeekFormat enumeration values.
        */
        get dayOfWeekFormat(): number;
        set generalFormat(arg: string);
        /**
        * Gets or sets the string used to format cells' headers.
        * @type {String}
        * @summary The format string.
        */
        get generalFormat(): string;
        set firstDayOfMonthFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each month.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfMonthFormat(): string;
        set firstDayOfYearFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each year.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfYearFormat(): string;
        set expandDayHeaders(arg: boolean);
        /**
      * Gets or sets a value indicating whether day headers should fill the whole day cell.
      * @type {Boolean}
      * @summary True to expand the headers, otherwise false.
      */
        get expandDayHeaders(): boolean;
        set maxItems(arg: number);
        /**
        * Gets or sets the maximum number of calendar items to display in a view cell.
        * @type {Number}
        * @summary The maximum number of calendar items to display in a view cell.
        */
        get maxItems(): number;
        /**
        * Raises the propertyChanged event.
        * @private
        */
        private onPropertyChanged;
        _maxItems: number;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/TimetableSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a Timetable view.
    */
    export class TimetableSettings {
        constructor(calendar: any);
        calendar: any;
        _dates: ObservableCollection<any>;
        _orientation: number;
        _startTime: number;
        _endTime: number;
        _cellSize: number;
        _cellTime: TimeSpan;
        _reverseGrouping: boolean;
        _headerStyle: number;
        _titleFormat: any;
        _showDayHeader: boolean;
        _generalFormat: string;
        _groupHours: boolean;
        _twelveHourFormat: boolean;
        _showMinutes: boolean;
        _showAM: boolean;
        _scrollStep: number;
        _maxItems: number;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set startTime(arg: number);
        /**
        * Gets or sets the start time of the timetable, expressed in minutes since the beginning of the day.
        * @type {Number}
        * @summary The start time of the timetable in minutes.
        */
        get startTime(): number;
        set endTime(arg: number);
        /**
        * Gets or sets the end time of the timetable, expressed in minutes since the beginning of the day.
        * @type {Number}
        * @summary The end time of the timetable in minutes.
        */
        get endTime(): number;
        set cellSize(arg: number);
        /**
        * Gets or sets the size of time cells.
        * @type {Number}
        * @summary The size of time cells in pixels.
        */
        get cellSize(): number;
        set cellTime(arg: TimeSpan);
        /**
        * Gets or sets the time length of a single cell in a timetable view, accurate to the nearest second.
        * @type {TimeSpan}
        * @summary A TimeSpan object representing the time length of the cell.
        * @remarks Valid values for this property range from 1 second to 1 day.
        */
        get cellTime(): TimeSpan;
        set reverseGrouping(arg: boolean);
        /**
        * Gets or sets a value indicating whether whether grouping (if enabled)  will be performed first by the resource, and then by the date.
        * @type {Boolean}
        * @summary True if grouping is reversed, otherwise false.
        * @remarks 	By default grouping is done first by available dates, then by
        * the resources specified in the current grouping type. Setting
        * this property to true reverses this behavior.
        */
        get reverseGrouping(): boolean;
        set headerStyle(arg: number);
        /**
        * Gets or sets the style of the view header.
        * @type {MainHeaderStyle}
        * @summary One of the MainHeaderStyle enumeration values.
        */
        get headerStyle(): number;
        set titleFormat(arg: string);
        /**
        * Gets or sets the string used to format header titles.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        set showDayHeader(arg: boolean);
        /**
        * Gets or sets a value indicating whether the header displaying all-day items is visible.
        * @type {Boolean}
        * @summary True if day header is visible, otherwise false.
        */
        get showDayHeader(): boolean;
        set groupHours(arg: boolean);
        /**
        * Gets or sets a value indicating whether hours displayed in the timeline are grouped.
        * @type {Boolean}
        * @summary True if hours are grouped, otherwise false.
        * @remarks Certain conditions prevent hours from grouping, such as when the hours are not divisible by the specified CellTime.
        */
        get groupHours(): boolean;
        set twelveHourFormat(arg: boolean);
        /**
        * Gets or sets a value indicating whether to use a 12-hour format.
        * @type {Boolean}
        * @summary True to use a 12-hour format, otherwise false.
        */
        get twelveHourFormat(): boolean;
        set showMinutes(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display the minutes of each hour in the timeline header when it displays whole hour cells.
        * @type {Boolean}
        * @summary True to display minutes, otherwise false.
        * @remarks Whole hour cells are displayed when the hours are divisible by the specified CellTime.
        */
        get showMinutes(): boolean;
        set showAM(arg: boolean);
        /**
        * Gets or sets a value indicating whether the AM and PM suffixes are displayed.
        * @type {Boolean}
        * @summary True to display AM and PM, otherwise false.
        */
        get showAM(): boolean;
        set scrollStep(arg: number);
        /**
        * Gets or sets the number of days to scroll when a navigation button is clicked.
        * @type {Number}
        * @summary The number of days to scroll.
        */
        get scrollStep(): number;
        set maxItems(arg: number);
        /**
        * Gets or sets the maximum number of calendar items to display in a view cell.
        * @type {Number}
        * @summary The maximum number of calendar items to display in a view cell.
        * @remarks Applies only to all day (header) items.
        */
        get maxItems(): number;
        /**
         * Raises the propertyChanged event.
         * @private
         */
        private onPropertyChanged;
        /**
        * Gets the collection of all dates visible in the timetable.
        * @type {ObservableCollection}
        * @summary A collection of DateTime objects.
        */
        get dates(): ObservableCollection<any>;
        onDatesChanged(sender: any, args: any): void;
        set orientation(arg: number);
        /**
        * Gets or sets a value indicating whether view cells are displayed horizontally or vertically.
        * @type {Orientation}
        * @summary One of the Orientation enumeration values.
        */
        get orientation(): number;
        /**
        * For internal use only.
        * @private
        */
        private get realEndTime();
        set generalFormat(arg: string);
        /**
        * Gets or sets the string used to format ungrouped time cells in the timeline header.
        * @type {String}
        * @summary The format string.
        */
        get generalFormat(): string;
    }
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { TimeSpan } from "Scheduling/jsplanner/src/TimeSpan";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/ListSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a List view.
    */
    export class ListSettings {
        constructor(calendar: any);
        calendar: any;
        _orientation: number;
        _cellUnits: number;
        _numberOfCells: number;
        _visibleCells: number;
        _headerStyle: number;
        _titleFormat: any;
        _generalFormat: string;
        _firstDayOfMonthFormat: string;
        _firstDayOfYearFormat: string;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set orientation(arg: number);
        /**
        * Gets or sets a value indicating whether view cells are displayed horizontally or vertically.
        * @type {Orientation}
        * @summary One of the Orientation enumeration values.
        */
        get orientation(): number;
        set cellUnits(arg: number);
        /**
        * Gets or sets the resolution of the view.
        * @type {TimeUnit}
        * @summary One of the TimeUnit enumeration values.
        */
        get cellUnits(): number;
        set numberOfCells(arg: number);
        /**
        * Gets or sets the total number of cells to be displayed in the view.
        * @type {Number}
        * @summary The total number of cells to be displayed in the view.
        */
        get numberOfCells(): number;
        set visibleCells(arg: number);
        /**
        * Gets or sets the number of cells visible at the same time.
        * @type {Number}
        * @summary The number of cells visible at the same time.
        */
        get visibleCells(): number;
        set headerStyle(arg: number);
        /**
        * Gets or sets the style of the view header.
        * @type {MainHeaderStyle}
        * @summary One of the MainHeaderStyle enumeration values.
        */
        get headerStyle(): number;
        set titleFormat(arg: string);
        /**
        * Gets or sets the string used to format the header title.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        set generalFormat(arg: string);
        /**
        * Gets or sets the string used to format cells' headers.
        * @type {String}
        * @summary The format string.
        */
        get generalFormat(): string;
        set firstDayOfMonthFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each month.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfMonthFormat(): string;
        set firstDayOfYearFormat(arg: string);
        /**
        * Gets or sets the string used to format the cell header of the first day of each year.
        * @type {String}
        * @summary The format string.
        */
        get firstDayOfYearFormat(): string;
        set maxItems(arg: number);
        /**
        * Gets or sets the maximum number of calendar items to display in a view cell.
        * @type {Number}
        * @summary The maximum number of calendar items to display in a view cell.
        */
        get maxItems(): number;
        /**
    * Raises the propertyChanged event.
    * @private
    */
        private onPropertyChanged;
        _maxItems: number;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/TimelineSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of timelines in a Resource view.
    */
    export class TimelineSettings {
        constructor(calendar: any, timeline: any);
        calendar: any;
        _timeline: any;
        _unit: number;
        _unitCount: number;
        _format: string;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set unit(arg: number);
        /**
        * Gets or sets the resolution of the timeline.
        * @type {TimeUnit}
        * @summary One of the TimeUnit enumeration values.
        */
        get unit(): number;
        set unitCount(arg: number);
        /**
        * Gets or sets the number of units between adjacent ticks in the timeline.
        * @type {Number}
        * @summary The number of units between adjacent ticks in the timeline.
        */
        get unitCount(): number;
        set format(arg: string);
        /**
        * Gets or sets the string used to format timeline headers.
        * @type {String}
        * @summary The format string.
        */
        get format(): string;
        /**
     * Raises the propertyChanged event.
     * @private
     */
        private onPropertyChanged;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/ResourceViewSettings" {
    /**
    * @class Defines properties that allow customization of the appearance of a Resource view.
    */
    export class ResourceViewSettings {
        constructor(calendar: any);
        calendar: any;
        _timelines: number;
        _visibleCells: number;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set timelines(arg: number);
        /**
        * Gets or sets the number of timelines displayed in the view.
        * @type {Number}
        * @summary The number of timelines displayed in the view.
        */
        get timelines(): number;
        set visibleCells(arg: number);
        /**
        * Gets or sets the number of cells visible at the same time.
        * @type {Number}
        * @summary The number of cells visible at the same time.
        */
        get visibleCells(): number;
        /**
     * Raises the propertyChanged event.
     * @private
     */
        private onPropertyChanged;
        /**
        * Gets the settings for the top timeline.
        * @type {TimelineSettings}
        * @summary The settings for the top timeline.
        */
        get topTimelineSettings(): TimelineSettings;
        _topTimelineSettings: TimelineSettings;
        /**
        * Gets the settings for the middle timeline.
        * @type {TimelineSettings}
        * @summary The settings for the middle timeline.
        */
        get middleTimelineSettings(): TimelineSettings;
        _middleTimelineSettings: TimelineSettings;
        /**
        * Gets the settings for the bottom timeline.
        * @type {TimelineSettings}
        * @summary The settings for the bottom timeline.
        */
        get bottomTimelineSettings(): TimelineSettings;
        _bottomTimelineSettings: TimelineSettings;
    }
    import { EventDispatcher } from "@mindfusion/common";
    import { TimelineSettings } from "Scheduling/jsplanner/src/TimelineSettings";
}
declare module "Scheduling/jsplanner/src/ItemSettings" {
    /**
    * @class Defines properties that enable appearance customization of schedule items in the calendar views.
    */
    export class ItemSettings {
        constructor(calendar: any);
        calendar: any;
        _cssClass: string;
        _size: number;
        _spacing: number;
        _showItems: boolean;
        _showContinuationArrows: boolean;
        _showCues: boolean;
        _titleFormat: string;
        _tooltipFormat: string;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set cssClass(arg: string);
        /**
         * Gets or sets the appointments' default css class.
         * @type {String}
         * @summary The CSS class.
        */
        get cssClass(): string;
        set size(arg: number);
        /**
         * Gets or sets the size of schedule items drawn in the calendar.
         * @type {Number}
         * @summary The size in pixels.
         * @remarks The size of an item is its height when the items are positioned horizontally or its width when positioned vertically.
        */
        get size(): number;
        set spacing(arg: number);
        /**
         * Gets or sets the amount of space between adjacent items.
         * @type {Number}
         * @sumary The amount of space between adjacent items in pixels.
        */
        get spacing(): number;
        set showItems(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display schedule items in the calendar.
        * @type {Boolean}
        * @summary True if items should be displayed, otherwise false.
        */
        get showItems(): boolean;
        set showContinuationArrows(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display small arrows
        * at the beginning or at the end of each incomplete segment to
        * indicate that the schedule item continues in an adjacent calendar
        * cell.
        * @type {Boolean}
        * @summary True if arrows should be displayed, otherwise false.
        */
        get showContinuationArrows(): boolean;
        set showCues(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display a 'more items'
        * link in a calendar cell which isn't big enough to contain all of
        * its items.
        * @type {Boolean}
        * @summary True if cues should be displayed, otherwise false.
        */
        get showCues(): boolean;
        set tooltipFormat(arg: string);
        /**
        * Gets or sets a value indicating how to format and display item tooltips.
        * @type {String}
        * @summary The format string.
        */
        get tooltipFormat(): string;
        set titleFormat(arg: string);
        /**
        * Gets or sets a value indicating how to format and display item titles.
        * @type {String}
        * @summary The format string.
        */
        get titleFormat(): string;
        /**
         * Raises the propertyChanged event.
         * @private
         */
        private onPropertyChanged;
    }
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Scheduling/jsplanner/src/Contact" {
    /**
    * @class Represents an object that holds contact data for a person.
    * @augments Resource
    */
    export class Contact extends Resource {
        _firstName: string;
        _middleName: string;
        _lastName: string;
        _address: string;
        _phone: string;
        _email: string;
        set firstName(arg: string);
        /**
         * Gets or sets the first name of the contact.
         * @type {String}
         * @summary The first name.
         */
        get firstName(): string;
        set middleName(arg: string);
        /**
         * Gets or sets the middle name of the contact.
         * @type {String}
         * @summary The middle name.
         */
        get middleName(): string;
        set lastName(arg: string);
        /**
         * Gets or sets the last name of the contact.
         * @type {String}
         * @summary The last name.
         */
        get lastName(): string;
        set address(arg: string);
        /**
         * Gets or sets the address of the contact.
         * @type {String}
         * @summary The address.
         */
        get address(): string;
        set phone(arg: string);
        /**
         * Gets or sets the phone of the contact.
         * @type {String}
         * @summary The phone.
         */
        get phone(): string;
        set email(arg: string);
        /**
         * Gets or sets the e-mail of the contact.
         * @type {String}
         * @summary The e-mail.
         */
        get email(): string;
    }
    import { Resource } from "Scheduling/jsplanner/src/Resource";
}
declare module "Scheduling/jsplanner/src/XmlPersistContext" {
    /**
    * @class Provides methods that read/write schedule data to and from XML.
    */
    export class XmlPersistContext {
        constructor(schedule: any, document: any);
        _schedule: any;
        _document: any;
        /**
        * Gets a reference to the Schedule object being serialized.
        * @type {Schedule}
        * @summary The schedule.
        */
        get schedule(): Schedule;
        /**
        * Gets a reference to the Document object containing XML-serialized schedule contents.
        * @type {Document}
        * @summary The document.
        */
        get document(): Document;
        saveResource(resource: any, collectionElement: any, elementName: any): void;
        loadResource(element: any): any;
        instantiateResource(classId: any): any;
        saveItem(item: any, collectionElement: any, elementName: any): void;
        loadItem(element: any): any;
        instantiateItem(classId: any): any;
        selectSingleNode(name: any, parentElement: any): any;
        innerText(element: any): any;
        isEmpty(element: any): boolean;
        hasValue(value: any): boolean;
        /**
      * Adds a new child node with the specified name and value to the specified parent node.
      * @param {String} elementName A string containing the name of new child element.
      * @param {Element} parentElement The parent DOM Element object.
      * @param {String} [innerText] Optional value to be added as child text node of the new element.
      * @returns {Element} The newly created DOM Element object.
      */
        addChildElement(elementName: string, parentElement: Element, innerText?: string): Element;
        /**
        * Writes a string value with the specified name.
        * @param {String} stringValue The string that should be saved in current XML document.
        * @param {String} elementName A string specifying the name of the new element.
        * @param {Element} parentElement The parent DOM Element object.
        * @returns {Element} The newly created DOM Element object.
        */
        writeString(stringValue: string, elementName: string, parentElement: Element): Element;
        /**
        * Reads a string value with the specified name.
        * @param {String} elementName The name of the string's XML element.
        * @param {Element} parentElement The parent DOM Element object.
        * @param {String} [defaultValue] The default string to return if specified child XML element does not exist.
        * @returns {String} The string loaded from XML.
        */
        readString(elementName: string, parentElement: Element, defaultValue?: string): string;
        /**
        * Writes a floating-point number with the specified name.
        * @param {Number} floatValue The number that should be saved in current XML document.
        * @param {String} elementName A string specifying the name of the new element.
        * @param {Element} parentElement The parent DOM Element object.
        * @returns {Element} The newly created DOM Element object.
        */
        writeFloat(floatValue: number, elementName: string, parentElement: Element): Element;
        /**
      * Reads a floating-point number with the specified name.
      * @param {String} elementName A string specifying the name of the number XML element.
      * @param {Element} parentElement The parent DOM Element object.
      * @param {Number} [defaultValue] The default number to return if specified child XML element does not exist.
      * @returns {Number} The number loaded from XML.
      */
        readFloat(elementName: string, parentElement: Element, defaultValue?: number): number;
        /**
        * Writes a Boolean value with the specified name.
        * @param {Boolean} boolValue The Boolean value that should be saved in current XML document.
        * @param {String} elementName A string specifying the name of the new element.
        * @param {Element} parentElement The parent DOM Element object.
        * @returns {Element} The newly created DOM Element object.
        */
        writeBool(boolValue: boolean, elementName: string, parentElement: Element): Element;
        /**
        * Reads a Boolean value with the specified name.
        * @param {String} elementName A string specifying the name of the Boolean XML element.
        * @param {Element} parentElement The parent DOM Element object.
        * @param {Boolean} [defaultValue] The default value to return if specified child XML element does not exist.
        * @returns {Boolean} The value loaded from XML.
        */
        readBool(elementName: string, parentElement: Element, defaultValue?: boolean): boolean;
        /**
        * Writes an integer number with the specified name.
        * @param {Number} intValue The number that should be saved in current XML document.
        * @param {String} elementName A string specifying the name of the new element.
        * @param {Element} parentElement The parent DOM Element object.
        * @returns {Element} The newly created DOM Element object.
        */
        writeInt(intValue: number, elementName: string, parentElement: Element): Element;
        /**
        * Reads an integer number with the specified name.
        * @param {String} elementName A string specifying the name of the number XML element.
        * @param {Element} parentElement The parent DOM Element object.
        * @param {Number} [defaultValue] The default number to return if specified child XML element does not exist.
        * @returns {Number} The number loaded from XML.
        */
        readInt(elementName: string, parentElement: Element, defaultValue?: number): number;
        /**
        * Writes a DateTime value with the specified name.
        * @param {DateTime} dateTimeValue The DateTime value that should be saved in current XML document.
        * @param {String} elementName A string specifying the name of the new element.
        * @param {Element} parentElement The parent DOM Element object.
        * @returns {Element} The newly created DOM Element object.
        */
        writeDateTime(dateTimeValue: DateTime, elementName: string, parentElement: Element): Element;
        /**
        * Reads a DateTime value with the specified name.
        * @param {String} elementName A string specifying the name of the DateTime XML element.
        * @param {Element} parentElement The parent DOM Element object.
        * @param {DateTime} [defaultValue] The default value to return if specified child XML element does not exist.
        * @returns {DateTime} The value loaded from XML.
        */
        readDateTime(elementName: string, parentElement: Element, defaultValue?: DateTime): DateTime;
        writeTag(item: any, tagValue: any, elementName: any, parentElement: any): Element;
        readTag(item: any, elementName: any, parentElement: any): string | number | boolean;
        writeObject(object: any, elementName: any, parentElement: any, raiseIfNotSerializable: any): any;
        readObject(elementName: any, parentElement: any): string | number | boolean;
        /**
      * Writes the specified Reminder object as an XML element with the specified name and the specified parent.
      * @param {Reminder} The Reminder object to write.
      * @param {String} elementName A string specifying the name of the Reminder XML element.
      * @param {Element} parentElement The parent DOM Element object.
      */
        writeReminder(reminder: any, elementName: string, parentElement: Element): any;
        /**
      * Reads a Reminder object with the specified name.
      * @param {String} elementName A string specifying the name of the Reminder XML element.
      * @param {Element} parentElement The parent DOM Element object.
      * @returns {Reminder} The Reminder object read; null if reading has failed.
      */
        readReminder(elementName: string, parentElement: Element): Reminder;
        /**
      * Writes the specified Recurrence object as an XML element with the specified name and the specified parent.
      * @param {Recurrence} The Recurrence object to write.
      * @param {String} elementName A string specifying the name of the Recurrence XML element.
      * @param {Element} parentElement The parent DOM Element object.
      */
        writeRecurrence(recurrence: any, elementName: string, parentElement: Element): any;
        /**
      * Reads a Recurrence object with the specified name.
      * @param {String} elementName A string specifying the name of the Recurrence XML element.
      * @param {Element} parentElement The parent DOM Element object.
      * @returns {Recurrence} The Recurrence object read; null if reading has failed.
      */
        readRecurrence(elementName: string, parentElement: Element): Recurrence;
    }
    import { Schedule } from "Scheduling/jsplanner/src/Schedule";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { Reminder } from "Scheduling/jsplanner/src/Reminder";
    import { Recurrence } from "Scheduling/jsplanner/src/Recurrence";
}
declare module "Scheduling/jsplanner/src/JsonPersistContext" {
    /**
    * @class Provides methods that read/write schedule data to and from JSON.
    */
    export class JsonPersistContext {
        constructor(schedule: any);
        _schedule: any;
        /**
        * Gets a reference to the Schedule object being serialized.
        * @type {Schedule}
        * @summary The schedule.
        */
        get schedule(): Schedule;
        saveResource(resource: any): any;
        loadResource(obj: any, defaultType: any): any;
        instantiateResource(classId: any): any;
        saveItem(item: any): any;
        loadItem(obj: any): any;
        instantiateItem(classId: any): any;
        /**
        * Writes a DateTime value.
        * @param {DateTime} value The DateTime value that should be saved.
        */
        writeDateTime(value: DateTime): string;
        /**
        * Reads a DateTime value.
        * @param {String} value A string representing the DateTime.
        */
        readDateTime(value: string): DateTime;
    }
    import { Schedule } from "Scheduling/jsplanner/src/Schedule";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
}
declare module "Scheduling/jsplanner/src/Schedule" {
    /**
    * @class Represents a timetable of scheduled events. In the model-view architecture,
    * Schedule instances are the documents whose data is displayed by Calendar
    * instances, which are the views.
    */
    export class Schedule {
        _items: ObservableCollection<any>;
        _itemsChanging: EventDispatcher<EventArgs>;
        _itemsChanged: EventDispatcher<EventArgs>;
        _tasks: ObservableCollection<any>;
        _contacts: ObservableCollection<any>;
        _resources: ObservableCollection<any>;
        _locations: ObservableCollection<any>;
        _changed: EventDispatcher<EventArgs>;
        _itemChanged: EventDispatcher<EventArgs>;
        itemChangedHandler: (item: any, args: any) => void;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        /**
        * Retrieves all events, including recurrent item instances, scheduled to occur in the specified time interval.
        * @param {DateTime} startTime Time interval start.
        * @param {DateTime} [endTime] Time interval end.
        * @param {Resource} [resource] A resource that must be related to the event.
        * @returns {List} The list of events scheduled to occur in the specified period.
        */
        getAllItems(startTime: DateTime, endTime?: DateTime, resource?: Resource): List<any>;
        itemInTimeRange(item: any, range: any): boolean;
        /**
        * Gets the item with the specified id.
        * @param {String} id The id of the  item.
        * @param {Number} [occurrenceIndex] The occurrence index of the item.
        * @returns {Item} The item; null if no item with the specified id has been found.
        */
        getItemById(id: string, occurrenceIndex?: number): Item;
        /**
        * In a recurrence, gets the recurrence master item with the specified id.
        * @param {String} id The id of the master item.
        * @returns {Item} The item; null if no master item with the specified id has been found.
        */
        getMasterById(id: string): Item;
        /**
        * Returns a resource from a schedule resource collection by a specified id.
        * @param {String} id The id of the resource.
        * @returns {Resource} The resource object if found, null otherwise.
        * @remarks The schedule resource collection (contacts, locations, tasks, resources) is determined automatically by the resource's id.
        */
        getResourceById(id: string): Resource;
        /**
        * Gets the collection of items in this schedule.
        * @type {ObservableCollection}
        * @summary The collection of items.
        */
        get items(): ObservableCollection<any>;
        /**
        * Gets the collection of tasks in this schedule.
        * @type {ObservableCollection}
        * @summary The collection of tasks.
        */
        get tasks(): ObservableCollection<any>;
        /**
        * Gets the collection of contacts in this schedule.
        * @type {ObservableCollection}
        * @summary The collection of contacts.
        */
        get contacts(): ObservableCollection<any>;
        /**
        * Gets the collection of resources in this schedule.
        * @type {ObservableCollection}
        * @summary The collection of resources.
        */
        get resources(): ObservableCollection<any>;
        /**
        * Gets the collection of locations in this schedule.
        * @type {ObservableCollection}
        * @summary The collection of locations.
        */
        get locations(): ObservableCollection<any>;
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
        onItemChanged(sender: any, args: any): void;
        onTasksChanged(args: any): void;
        onContactsChanged(args: any): void;
        onResourcesChanged(args: any): void;
        onLocationsChanged(args: any): void;
        onChanged(): void;
        /**
        * Raised when the items collection is changing.
        * @event itemsChanging
        * @type {EventDispatcher}
        * @property {Schedule} sender
        * @property {NotifyCollectionChangingEventArgs} args
        */
        get itemsChanging(): EventDispatcher<any>;
        /**
         * Raised when the items collection is changed.
         * @event itemsChanged
         * @type {EventDispatcher}
         * @property {Schedule} sender
         * @property {NotifyCollectionChangedEventArgs} args
        */
        get itemsChanged(): EventDispatcher<any>;
        /**
         * Raised when an item is changed.
         * @private
         */
        private get itemChanged();
        /**
         * Raised when the schedule is changed.
         */
        get changed(): EventDispatcher<EventArgs>;
        registerTypes(): void;
        /**
        * Saves the schedule to an XML file.
        * @param {String} url A URL specifying where the schedule's XML should be posted to.
        */
        saveToXml(url: string): void;
        /**
        * Saves the schedule into an XML Document.
        * @returns {Document} A DOM Document object containing XML-serialized schedule contents.
        */
        toXmlDocument(): Document;
        /**
        * Loads the schedule from an XML file.
        * @param {String} fileUrl The URL of an XML file where the data should be read from.
        * @param {Function} [onLoad] A callback that should be invoked if the file is loaded successfully.
        * @param {Function} [onError] A callback that should be invoked if the file could not be downloaded.
        */
        loadFromXml(fileUrl: string, onLoad?: Function, onError?: Function): void;
        /**
        * Loads schedule data from specified XML Document.
        * @param {Document} document A DOM Document object containing XML-serialized schedule data.
        */
        fromXmlDocument(document: Document): void;
        /**
        * Serializes the schedule into a JSON string.
        * @returns {String} A string containing the schedule's JSON representation.
        */
        toJson(): string;
        /**
            * Deserializes the diagram from a JSON string.
            * @param {String} json A string created by the toJson method.
            */
        fromJson(json: string): void;
        _loading: boolean;
    }
    export namespace Schedule {
        /**
        * Registers a schedule item or resource class for serialization support.
        * @param {Object} itemClass An object identifying the class.
        * @param {String} xmlClassId A class identifier to use when saving and loading objects of the specified type to and from XML.
        * @param {String} jsonClassId A class identifier to use when saving and loading objects of the specified type to and from JSON.
        * @param {Number} classVersion A revision number of the objects's class serialization format.
        */
        function registerClass(itemClass: any, xmlClassId: string, jsonClassId: string, classVersion: number): void;
        const xmlClassMap: Map<any, any>;
        const jsonClassMap: Map<any, any>;
    }
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { Resource } from "Scheduling/jsplanner/src/Resource";
    import { List } from "@mindfusion/common-collections";
    import { Item } from "Scheduling/jsplanner/src/Item";
}
declare module "Scheduling/jsplanner/src/Selection" {
    /**
    * @class Represents a selected date-time range.
    */
    export class Selection {
        constructor(calendar: any);
        calendar: any;
        set enabled(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to select date cells.
         * @type {Boolean}
         * @summary True if selection is enabled, otherwise false.
         */
        get enabled(): boolean;
        set allowMultiple(arg: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to select more than one date cell at a time.
         * @type {Boolean}
         * @summary True if multiple selection is enabled, otherwise false.
         */
        get allowMultiple(): boolean;
        ranges: any[];
        _cells: any[];
        _cache: any[];
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        /**
        * Gets the selection range.
        * @returns {TimeRange} The selected time range.
        */
        getRange(): TimeRange;
        /**
        * Sets the selection range.
        * @param {DateTime} start The start time of the selection.
        * @param {DateTime} [end] The end time of the selection.
        * @param {Resource} [resource] The associated resource.
        */
        setRange(start: any, end?: any, resource?: any): any;
        /**
        * Clears the selection.
        */
        clear(raiseChanged: any): void;
        /**
        * Checks if the selection is empty.
        * @returns {Boolean} true if the selection is empty; otherwise false.
        */
        isEmpty(): boolean;
        /**
        * For internal use only.
        * @private
        */
        private addItems;
        /**
        * For internal use only.
        * @private
        */
        private updateRanges;
        resource: any;
        /**
        * For internal use only.
        * @private
        */
        private sortItems;
        _enabled: any;
        _allowMultiple: any;
    }
    import { TimeRange } from "Scheduling/jsplanner/src/TimeRange";
}
declare module "Scheduling/jsplanner/src/Interactions/SelectManager" {
    export default SelectManager;
    /**
    * For internal use only.
    * @private
    */
    class SelectManager {
        constructor(calendar: any);
        calendar: any;
        view: any;
        element: any;
        cells: any;
        mouseUpHandler: (e: any) => void;
        mouseDownHandler: (e: any) => void;
        mouseMoveHandler: (e: any) => boolean;
        clickHandler: (e: any) => void;
        doubleClickHandler: (e: any) => void;
        start: any;
        end: any;
        dispose(): void;
        onMouseDown(e: any): void;
        onMouseMove(e: any): boolean;
        resource: any;
        onMouseUp(e: any): void;
        onClick(e: any): void;
        onDoubleClick(e: any): void;
        clear(): void;
        startSelect(e: any): void;
        doSelect(start: any, end: any, drag: any): void;
        endSelect(e: any): void;
        stopSelect(): void;
    }
}
declare module "Scheduling/jsplanner/src/Timer" {
    export default Timer;
    class Timer {
        constructor(calendar: any);
        calendar: any;
        minDate: Date;
        lastCheckStart: Date;
        lastCheckEnd: Date;
        checkInterval: number;
        getItems(start: any, end: any): any[];
        /**
        * For internal use only.
        * @private
        */
        private getTasks;
        /**
        * For internal use only.
        * @private
        */
        private trigger;
        /**
        * For internal use only.
        * @private
        */
        private start;
        id: number;
    }
}
declare module "Scheduling/jsplanner/src/LocalStrings" {
    /**
    * @namespace MindFusion.Scheduling
    */
    /**
     * Copyright (c) 2017-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way; } please contact us at support@mindfusion.eu.
     */
    /**
    * @class Contains the dictionary of localizable caption texts for the Calendar control.
    */
    export class LocalStrings {
        _newFormHeader: string;
        _editFormHeader: string;
        _newRecurrenceFormHeader: string;
        _editRecurrenceFormHeader: string;
        _cueFormHeader: string;
        _dateCaption: string;
        _datesCaption: string;
        _subjectCaption: string;
        _startTimeCaption: string;
        _endTimeCaption: string;
        _allDayEventCaption: string;
        _reminderCaption: string;
        _detailsCaption: string;
        _contactsCaption: string;
        _todayCaption: string;
        _locationCaption: string;
        _patternCaption: string;
        _rangeCaption: string;
        _everyCaption: string;
        _ofEveryCaption: string;
        _startCaption: string;
        _noEndCaption: string;
        _endAfterCaption: string;
        _endDateCaption: string;
        _saveButtonCaption: string;
        _optionsButtonCaption: string;
        _cancelButtonCaption: string;
        _recurrenceButtonCaption: string;
        _deleteButtonCaption: string;
        _secondsValue: string;
        _minuteValue: string;
        _minutesValue: string;
        _hourValue: string;
        _hoursValue: string;
        _dayValue: string;
        _daysValue: string;
        _weeksValue: string;
        _monthValue: string;
        _dailyValue: string;
        _weeklyValue: string;
        _monthlyValue: string;
        _yearlyValue: string;
        _intervalValue: string;
        _firstValue: string;
        _secondValue: string;
        _thirdValue: string;
        _fourthValue: string;
        _lastValue: string;
        _weekendValue: string;
        _weekdayValue: string;
        _recurrenceDailyOnePattern: string;
        _recurrenceDailyTwoPattern: string;
        _recurrenceDailyThreePattern: string;
        _recurrenceDailyFourPattern: string;
        _recurrenceWeeklyOnePattern: string;
        _recurrenceWeeklyTwoPattern: string;
        _recurrenceMonthlyOnePattern: string;
        _recurrenceMonthlyTwoPattern: string;
        _recurrenceYearlyOnePattern: string;
        _recurrenceYearlyTwoPattern: string;
        _recurrenceIntervalPattern: string;
        _recurrenceStartDatePattern: string;
        _recurrenceEndDatePattern: string;
        _recurrenceTimeOnePattern: string;
        _recurrenceTimeTwoPattern: string;
        set newFormHeader(arg: string);
        /**
        * Specifies the header text of the New form.
        * @type {String}
        * @summary A string containing the header text.
        */
        get newFormHeader(): string;
        set editFormHeader(arg: string);
        /**
        * Specifies the header text of the Edit form.
        * @type {String}
        * @summary A string containing the header text.
        */
        get editFormHeader(): string;
        set newRecurrenceFormHeader(arg: string);
        /**
        * Specifies the header text of the New Recurrence form.
        * @type {String}
        * @summary A string containing the header text.
        */
        get newRecurrenceFormHeader(): string;
        set editRecurrenceFormHeader(arg: string);
        /**
        * Specifies the header text of the Edit Recurrence form.
        * @type {String}
        * @summary A string containing the header text.
        */
        get editRecurrenceFormHeader(): string;
        set cueFormHeader(arg: string);
        /**
        * Specifies the header text of the Cue Items form.
        * @type {String}
        * @summary A string containing the header text.
        */
        get cueFormHeader(): string;
        set subjectCaption(arg: string);
        /**
        * Specifies the caption text of the "Subject" label in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get subjectCaption(): string;
        set startTimeCaption(arg: string);
        /**
        * Specifies the caption text of the "Start time" label in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get startTimeCaption(): string;
        set endTimeCaption(arg: string);
        /**
        * Specifies the caption text of the "End time" label in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get endTimeCaption(): string;
        set allDayEventCaption(arg: string);
        /**
        * Specifies the caption text of the "All day event" checkbox in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get allDayEventCaption(): string;
        set reminderCaption(arg: string);
        /**
        * Specifies the caption text of the "Reminder" checkbox in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get reminderCaption(): string;
        set detailsCaption(arg: string);
        /**
        * Specifies the caption text of the "Details" input in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get detailsCaption(): string;
        set contactsCaption(arg: string);
        /**
        * Specifies the caption text of the "Contacts" input in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get contactsCaption(): string;
        set todayCaption(arg: string);
        /**
        * Specifies the caption text of the "Today" button in a date picker control.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get todayCaption(): string;
        set locationCaption(arg: string);
        /**
        * Specifies the caption text of the "Location" input in Edit form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get locationCaption(): string;
        set patternCaption(arg: string);
        /**
        * Specifies the caption text of the "Pattern" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get patternCaption(): string;
        set everyCaption(arg: string);
        /**
        * Specifies the caption text of the "Every" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get everyCaption(): string;
        set ofEveryCaption(arg: string);
        /**
        * Specifies the caption text of the "of Every" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get ofEveryCaption(): string;
        set startCaption(arg: string);
        /**
        * Specifies the caption text of the "Start" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get startCaption(): string;
        set noEndCaption(arg: string);
        /**
        * Specifies the caption text of the "No end date" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get noEndCaption(): string;
        set endAfterCaption(arg: string);
        /**
        * Specifies the caption text of the "End after" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get endAfterCaption(): string;
        set endDateCaption(arg: string);
        /**
        * Specifies the caption text of the "End by" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get endDateCaption(): string;
        set saveButtonCaption(arg: string);
        /**
        * Specifies the caption text a "Save" button in a form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get saveButtonCaption(): string;
        set optionsButtonCaption(arg: string);
        /**
        * Specifies the caption text a "Options" button in a form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get optionsButtonCaption(): string;
        set cancelButtonCaption(arg: string);
        /**
        * Specifies the caption text a "Cancel" button in a form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get cancelButtonCaption(): string;
        set recurrenceButtonCaption(arg: string);
        /**
        * Specifies the caption text a "Recurrence" button in a form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get recurrenceButtonCaption(): string;
        set deleteButtonCaption(arg: string);
        /**
        * Specifies the caption text a "Delete" button in a form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get deleteButtonCaption(): string;
        set secondsValue(arg: string);
        /**
        * Specifies the caption text of the "Seconds" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get secondsValue(): string;
        set minutesValue(arg: string);
        /**
        * Specifies the text of the "Minutes" option in a Reminder drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get minutesValue(): string;
        set hourValue(arg: string);
        /**
        * Specifies the text of the "Hour" option in a Reminder drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get hourValue(): string;
        set hoursValue(arg: string);
        /**
        * Specifies the text of the "Hours" option in a Reminder drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get hoursValue(): string;
        set dayValue(arg: string);
        /**
        * Specifies the text of the "Day" option in a Reminder drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get dayValue(): string;
        set daysValue(arg: string);
        /**
        * Specifies the text of the "Days" option in a Reminder drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get daysValue(): string;
        set weeksValue(arg: string);
        /**
        * Specifies the caption text of the "Weeks" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get weeksValue(): string;
        set monthValue(arg: string);
        /**
        * Specifies the caption text of the "Month" input in Recurrence form.
        * @type {String}
        * @summary A string containing the caption text.
        */
        get monthValue(): string;
        set dailyValue(arg: string);
        /**
        * Specifies the text of the "Daily" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get dailyValue(): string;
        set weeklyValue(arg: string);
        /**
        * Specifies the text of the "Weekly" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get weeklyValue(): string;
        set monthlyValue(arg: string);
        /**
        * Specifies the text of the "Monthly" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get monthlyValue(): string;
        set yearlyValue(arg: string);
        /**
        * Specifies the text of the "Yearly" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get yearlyValue(): string;
        set intervalValue(arg: string);
        /**
        * Specifies the text of the "Time interval" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get intervalValue(): string;
        set firstValue(arg: string);
        /**
        * Specifies the text of the "First" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get firstValue(): string;
        set secondValue(arg: string);
        /**
        * Specifies the text of the "Second" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get secondValue(): string;
        set thirdValue(arg: string);
        /**
        * Specifies the text of the "Third" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get thirdValue(): string;
        set fourthValue(arg: string);
        /**
        * Specifies the text of the "Fourth" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get fourthValue(): string;
        set lastValue(arg: string);
        /**
        * Specifies the text of the "Last" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get lastValue(): string;
        set weekendValue(arg: string);
        /**
        * Specifies the text of the "Weekend" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get weekendValue(): string;
        set weekdayValue(arg: string);
        /**
        * Specifies the text of the "Weekday" option in a Recurrence pattern drop-down.
        * @type {String}
        * @summary A string containing the option text.
        */
        get weekdayValue(): string;
        set recurrenceDailyOnePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceDailyOnePattern(): string;
        set recurrenceDailyTwoPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceDailyTwoPattern(): string;
        set recurrenceDailyThreePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceDailyThreePattern(): string;
        set recurrenceDailyFourPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceDailyFourPattern(): string;
        set recurrenceWeeklyOnePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceWeeklyOnePattern(): string;
        set recurrenceWeeklyTwoPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceWeeklyTwoPattern(): string;
        set recurrenceMonthlyOnePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceMonthlyOnePattern(): string;
        set recurrenceMonthlyTwoPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceMonthlyTwoPattern(): string;
        set recurrenceYearlyOnePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceYearlyOnePattern(): string;
        set recurrenceYearlyTwoPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceYearlyTwoPattern(): string;
        set recurrenceIntervalPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceIntervalPattern(): string;
        set recurrenceStartDatePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceStartDatePattern(): string;
        set recurrenceEndDatePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceEndDatePattern(): string;
        set recurrenceTimeOnePattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceTimeOnePattern(): string;
        set recurrenceTimeTwoPattern(arg: string);
        /**
        * Specifies a pattern in the RecurrenceInfo text.
        * @type {String}
        * @summary A string containing the pattern.
        */
        get recurrenceTimeTwoPattern(): string;
    }
}
declare module "Scheduling/jsplanner/src/Calendar" {
    /**
    * @class The Calendar control serves as a view in document-view
    * architecture, where the document is implemented by the
    * Schedule class. The Calendar provides several schedule
    * related views, such as Month, List, Timetable, that
    * present the scheduled events in different styles and layouts.
    * @augments UIControl
    */
    export class Calendar extends UIControl {
        static set autoRepaint(arg: boolean);
        static get autoRepaint(): boolean;
        static callItemModified(sender: any, args: any): void;
        /**
         * Initializes a new instance of the Calendar class.
         * @constructor
         * @param {DomElement} element The element this Calendar is associated with.
         */
        constructor(element: any);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _view: MonthCell | MonthRangeCell | WeekRangeCell | Timetable | HorizontalTimetable | HorizontalList | VerticalList | ResourceViewCell;
        _date: DateTime;
        _contacts: ObservableCollection<any>;
        _locations: ObservableCollection<any>;
        _tasks: ObservableCollection<any>;
        _resources: ObservableCollection<any>;
        _currentView: number;
        _allowInplaceEdit: boolean;
        _useForms: boolean;
        _showTooltips: boolean;
        _itemCloneKey: number;
        _itemChangeResourceKey: number;
        _contactNameFormat: string;
        _scheduleChangedHandler: (e: any) => void;
        set schedule(arg: Schedule);
        /**
        * Gets or sets the schedule to be displayed inside the calendar.
        * @type {Schedule}
        * @summary The schedule.
        */
        get schedule(): Schedule;
        _selection: Selection;
        _itemSelection: ObservableCollection<any>;
        _popups: Map<any, any>;
        _visibleDateChanged: EventDispatcher<EventArgs>;
        _itemCreating: EventDispatcher<EventArgs>;
        _itemCreated: EventDispatcher<EventArgs>;
        _itemModifying: EventDispatcher<EventArgs>;
        _itemModified: EventDispatcher<EventArgs>;
        _itemDeleting: EventDispatcher<EventArgs>;
        _itemDeleted: EventDispatcher<EventArgs>;
        _recurringItemDeleting: EventDispatcher<EventArgs>;
        _itemReminderTriggered: EventDispatcher<EventArgs>;
        _taskReminderTriggered: EventDispatcher<EventArgs>;
        _itemDraw: EventDispatcher<EventArgs>;
        _itemClick: EventDispatcher<EventArgs>;
        _itemDoubleClick: EventDispatcher<EventArgs>;
        _selectionStart: EventDispatcher<EventArgs>;
        _selectionChanged: EventDispatcher<EventArgs>;
        _selectionEnd: EventDispatcher<EventArgs>;
        _itemSelectionChanged: EventDispatcher<EventArgs>;
        _cellClick: EventDispatcher<EventArgs>;
        _cellDoubleClick: EventDispatcher<EventArgs>;
        _headerClick: EventDispatcher<EventArgs>;
        _headerDoubleClick: EventDispatcher<EventArgs>;
        _cueClick: EventDispatcher<EventArgs>;
        _buttonClick: EventDispatcher<EventArgs>;
        _formShow: EventDispatcher<EventArgs>;
        _formClose: EventDispatcher<EventArgs>;
        _scheduleChanged: EventDispatcher<EventArgs>;
        repaintDelegate: () => void;
        repaintItemsDelegate: () => void;
        rebuildDelegate: () => void;
        /**
        * Copies property values from another object.
        * @param {Object} settings An object containing property values.
        */
        copyFrom(settings: any): void;
        set date(arg: DateTime);
        /**
        * Gets or sets the date of the calendar.
        * @type {DateTime}
        * @summary The date of the calendar.
        */
        get date(): DateTime;
        set endDate(arg: DateTime);
        /**
        * Gets or sets the end date of the calendar.
        * @type {DateTime}
        * @summary The end date of the calendar.
        */
        get endDate(): DateTime;
        set currentView(arg: number);
        /**
        * Gets or sets the type of the current view of the calendar.
        * @type {CalendarView}
        * @summary The type of the current view.
        */
        get currentView(): number;
        set groupType(arg: number);
        /**
        * Gets or sets the grouping or filtering criteria for the calendar.
        * @type {GroupType}
        * @summary The grouping criteria.
        */
        get groupType(): number;
        set allowInplaceEdit(arg: boolean);
        /**
        * Gets or sets a value indicating whether calendar's items can be inplace-edited.
        * @type {Boolean}
        * @summary True if the calendar's items can be inplace-edited, otherwise false.
        */
        get allowInplaceEdit(): boolean;
        set useForms(arg: boolean);
        /**
        * Gets or sets a value indicating whether the built-in forms for item editing will be used.
        * @type {Boolean}
        * @summary True if the built-in forms will be used, otherwise false.
        */
        get useForms(): boolean;
        set showTooltips(arg: boolean);
        /**
        * Gets or sets a value indicating whether to show tooltips.
        * @type {Boolean}
        * @summary True to show tooltips, otherwise false.
        */
        get showTooltips(): boolean;
        set contactNameFormat(arg: string);
        /**
        * Gets or sets a value indicating how to format and display contact names in view headers.
        * @type {String}
        * @summary The format string.
        * @remarks Capital letters F, M and L are used as placeholders for the
        * First, Middle and Last names. Any other character are displayed unchanged.
        */
        get contactNameFormat(): string;
        set locale(arg: Locale);
        /**
        * Gets or sets the locale object used to format and display localizable information in the calendar.
        * @type {Locale}
        * @summary The locale.
        */
        get locale(): Locale;
        /**
        * Returns a reference to the DOM element of the calendar main header.
        * @type {HTMLDivElement}
        * @summary A reference to the DOM element of the calendar main header.
        */
        get header(): HTMLDivElement;
        /**
        * Gets the collection of cells in the calendar view.
        * @type {ObservableCollection}
        * @summary The collection of cells in the calendar view.
        */
        get cells(): ObservableCollection<any>;
        selectManager: SelectManager;
        keyUpHandler: (e: any) => void;
        resizeHandler: (e: any) => void;
        /**
        * Item cloned with itemCloneKey.
        * For internal use only.
        * @private
        */
        private cloneItem;
        /**
        * Item created through popup form.
        * For internal use only.
        * @private
        */
        private createItem;
        /**
        * Item modified through popup form or inplace edit
        * For internal use only.
        * @private
        */
        private editItem;
        /**
        * Item modified by drag or resize.
        * For internal use only.
        * @private
        */
        private modifyItem;
        /**
        * Deletes the specified item.
        * For internal use only.
        * @private
        */
        private deleteItem;
        /**
        * For internal use only.
        * @private
        */
        private onItemSelectionChanged;
        /**
        * For internal use only.
        * @private
        */
        private getAppointmentById;
        /**
        * For internal use only.
        * @private
        */
        private checkResource;
        allowChangeResource(e: any): boolean;
        /**
        * For internal use only.
        * @private
        */
        private applyFilter;
        /**
        * For internal use only.
        * @private
        */
        private get view();
        rebuildId: number;
        /**
        * Repaints the calendar contents.
        * @param {Boolean} [full] True to recreate calendar items, otherwise false.
        */
        repaint(full?: boolean): void;
        repaintId: number;
        /**
        * Recalculates calendar's dimensions.
        * @remarks Use this method to recalculate the calendar's dimensions after resizing.
        */
        adjust(): void;
        /**
        * For internal use only.
        * @private
        */
        private invalidate;
        /**
        * For internal use only.
        * @private
        */
        private updateView;
        /**
        * For internal use only.
        * @private
        */
        private get filterResources();
        /**
        * For internal use only.
        * @private
        */
        private get groupResources();
        /**
        * Gets the actual group type. This is the same as GroupType unless
        * the corresponding resource collection is empty, in which case it
        * returns GroupType.None.
        * @type {GroupType}
        * @summary The actual group type.
        */
        get realGroupType(): number;
        /**
        * For internal use only.
        * @private
        */
        private processButtonClick;
        /**
        * For internal use only.
        * @private
        */
        private raiseVisibleDateChanged;
        onScheduleChanged(e: any): void;
        onCollectionChanged(): void;
        onViewSettingsChanged(args: any): void;
        onItemSettingsChanged(args: any): void;
        /**
         * Raised when the calendar's schedule has changed.
         * @event scheduleChanged
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {EventArgs} args
         */
        get scheduleChanged(): EventDispatcher<any>;
        /**
        * Raises the visibleDateChanged event.
        * @private
        */
        private onVisibleDateChanged;
        /**
         * Raised when the calendar date is changed.
         * @event visibleDateChanged
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {DateChangedEventArgs} args
         */
        get visibleDateChanged(): EventDispatcher<any>;
        /**
        * Raises the selectionStart event.
        * @private
        */
        private onSelectionStart;
        /**
         * Raised when a selection is started.
         * @event selectionStart
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {SelectionEventArgs} args
         */
        get selectionStart(): EventDispatcher<any>;
        /**
        * Raises the selectionChanged event.
        * @private
        */
        private onSelectionChanged;
        /**
         * Raised when a selection changes.
         * @event selectionChanged
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {SelectionEventArgs} args
         */
        get selectionChanged(): EventDispatcher<any>;
        /**
        * Raises the selectionEnd event.
        * @private
        */
        private onSelectionEnd;
        /**
         * Raised when a selection has ended.
         * @event selectionEnd
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {SelectionEventArgs} args
         */
        get selectionEnd(): EventDispatcher<any>;
        /**
         * Raised when a selection of items changes.
         * @event itemSelectionChanged
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {NotifyCollectionChangedEventArgs} args
         */
        get itemSelectionChanged(): EventDispatcher<any>;
        /**
        * Raises the itemCreating event.
        * @private
        */
        private onItemCreating;
        /**
         * Raised while an item is being created.
         * @event itemCreating
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifyingEventArgs} args
         */
        get itemCreating(): EventDispatcher<any>;
        /**
        * Raises the itemCreated event.
        * @private
        */
        private onItemCreated;
        /**
         * Raised when an item is created.
         * @event itemCreated
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifiedEventArgs} args
         */
        get itemCreated(): EventDispatcher<any>;
        /**
        * Raises the itemModifying event.
        * @private
        */
        private onItemModifying;
        /**
         * Raised while an item is being modified.
         * @event itemModifying
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifyingEventArgs} args
         */
        get itemModifying(): EventDispatcher<any>;
        /**
        * Raises the itemModified event.
        * @private
        */
        private onItemModified;
        /**
         * Raised when an item is modified.
         * @event itemModified
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifiedEventArgs} args
         */
        get itemModified(): EventDispatcher<any>;
        /**
        * Raises the itemDeleting event.
        * @private
        */
        private onItemDeleting;
        /**
         * Raised while an item is being deleted.
         * @event itemDeleting
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifyingEventArgs} args
         */
        get itemDeleting(): EventDispatcher<any>;
        /**
        * Raises the itemDeleted event.
        * @private
        */
        private onItemDeleted;
        /**
         * Raised when an item is deleted.
         * @event itemDeleted
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifiedEventArgs} args
         */
        get itemDeleted(): EventDispatcher<any>;
        /**
        * Raises the recurringItemDeleting event.
        * @private
        */
        private onRecurringItemDeleting;
        /**
         * Raised while a recurring item is being deleted.
         * @event recurringItemDeleting
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemModifyingEventArgs} args
         */
        get recurringItemDeleting(): EventDispatcher<any>;
        /**
        * Raises the itemReminderTriggered event.
        * @private
        */
        private onItemReminderTriggered;
        /**
         * Raised when an item remider is triggered.
         * @event itemReminderTriggered
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemEventArgs} args
         */
        get itemReminderTriggered(): EventDispatcher<any>;
        /**
        * Raises the taskReminderTriggered event.
        * @private
        */
        private onTaskReminderTriggered;
        /**
         * Raised when an task remider is triggered.
         * @event taskReminderTriggered
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {TaskEventArgs} args
         */
        get taskReminderTriggered(): EventDispatcher<any>;
        /**
        * Raises the itemDraw event.
        * @private
        */
        private onItemDraw;
        /**
         * Raised when an item is drawn.
         * @event itemDraw
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemEventArgs} args
         */
        get itemDraw(): EventDispatcher<any>;
        /**
        * Raises the itemClick event.
        * @private
        */
        private onItemClick;
        /**
         * Raised when an item is clicked.
         * @event itemClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemEventArgs} args
         */
        get itemClick(): EventDispatcher<any>;
        /**
        * Raises the itemDoubleClick event.
        * @private
        */
        private onItemDoubleClick;
        /**
         * Raised when an item is double-clicked.
         * @event itemDoubleClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ItemEventArgs} args
         */
        get itemDoubleClick(): EventDispatcher<any>;
        /**
        * Raises the formShow event.
        * @private
        */
        private onFormShow;
        /**
         * Raised when a popup form is shown.
         * @event formShow
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {FormEventArgs} args
         */
        get formShow(): EventDispatcher<any>;
        /**
        * Raises the formClose event.
        * @private
        */
        private onFormClose;
        /**
         * Raised when a popup form is closed.
         * @event formClose
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {FormEventArgs} args
         */
        get formClose(): EventDispatcher<any>;
        /**
        * Raises the buttonClick event.
        * @private
        */
        private onButtonClick;
        /**
         * Raised when a navigation button is clicked
         * @event buttonClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {ButtonEventArgs} args
         */
        get buttonClick(): EventDispatcher<any>;
        /**
        * Raises the cellClick event.
        * @private
        */
        private onCellClick;
        /**
         * Raised when a calendar time cell is clicked.
         * @event cellClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {CellEventArgs} args
         */
        get cellClick(): EventDispatcher<any>;
        /**
        * Raises the cellDoubleClick event.
        * @private
        */
        private onCellDoubleClick;
        /**
         * Raised when a calendar time cell is double-clicked.
         * @event cellDoubleClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {CellEventArgs} args
         */
        get cellDoubleClick(): EventDispatcher<any>;
        /**
        * Raises the headerClick event.
        * @private
        */
        private onHeaderClick;
        /**
         * Raised when a calendar header is clicked.
         * @event headerClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {HeaderEventArgs} args
         */
        get headerClick(): EventDispatcher<any>;
        /**
        * Raises the headerDoubleClick event.
        * @private
        */
        private onHeaderDoubleClick;
        /**
         * Raised when a calendar header is double-clicked.
         * @event headerDoubleClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {HeaderEventArgs} args
         */
        get headerDoubleClick(): EventDispatcher<any>;
        /**
        * Raises the cueClick event.
        * @private
        */
        private onCueClick;
        /**
         * Raised when an item cue is clicked.
         * @event cueClick
         * @type {EventDispatcher}
         * @property {Calendar} sender
         * @property {CellEventArgs} args
         */
        get cueClick(): EventDispatcher<any>;
        _endDate: DateTime;
        /**
        * Gets or sets the start time of the first calendar cell.
        * @type {DateTime}
        * @summary The start time of the first calendar cell.
        */
        get startTime(): DateTime;
        get endTime(): any;
        /**
        * Gets or sets the start time of the first calendar cell, that can contain items.
        * @type {DateTime}
        * @summary The start time of the first calendar cell, that can contain items.
        */
        get itemsStartTime(): DateTime;
        get itemsEndTime(): any;
        /**
        * Gets the tasks whose schedule to display when the GroupType property is set to GroupByTasks or FilterByTasks.
        * @type {ObservableCollection}
        * @summary The tasks.
        */
        get tasks(): ObservableCollection<any>;
        /**
        * Gets the contacts whose schedule to display when the GroupType property is set to GroupByContacts or FilterByContacts.
        * @type {ObservableCollection}
        * @summary The contacts.
        */
        get contacts(): ObservableCollection<any>;
        /**
        * Gets the resources whose schedule to display when the GroupType property is set to GroupByResources or FilterByResources.
        * @type {ObservableCollection}
        * @summary The resources.
        */
        get resources(): ObservableCollection<any>;
        /**
        * Gets the locations whose schedule to display when the GroupType property is set to GroupByLocations or FilterByLocations.
        * @type {ObservableCollection}
        * @summary The locations.
        */
        get locations(): ObservableCollection<any>;
        _groupType: number;
        _schedule: Schedule;
        /**
        * Gets the current calendar date-time selection.
        * @type {Selection}
        * @summary An instance of the Selection class.
        */
        get selection(): Selection;
        /**
        * Gets the current item selection.
        * @type {ObservableCollection}
        * @summary The list of currently selected items.
        */
        get itemSelection(): ObservableCollection<any>;
        get popups(): Map<any, any>;
        /**
        * Gets the MonthSettings object used to customize the appearance of the SingleMonth view.
        * @type {MonthSettings}
        * @summary The settings.
        */
        get monthSettings(): MonthSettings;
        _monthSettings: MonthSettings;
        /**
        * Gets the TimetableSettings object used to customize the appearance of the Timetable view.
        * @type {TimetableSettings}
        * @summary The settings.
        */
        get timetableSettings(): TimetableSettings;
        _timetableSettings: TimetableSettings;
        /**
        * Gets the ListSettings object used to customize the appearance of the List view.
        * @type {ListSettings}
        * @summary The settings.
        */
        get listSettings(): ListSettings;
        _listSettings: ListSettings;
        /**
        * Gets the WeekRangeSettings object used to customize the appearance of the WeekRange view
        * @type {WeekRangeSettings}
        * @summary The settings.
        */
        get weekRangeSettings(): WeekRangeSettings;
        _weekRangeSettings: WeekRangeSettings;
        /**
        * Gets the ResourceViewSettings object used to customize the appearance of the Resource view
        * @type {ResourceViewSettings}
        * @summary The settings.
        */
        get resourceViewSettings(): ResourceViewSettings;
        _resourceViewSettings: ResourceViewSettings;
        /**
        * Gets the MonthRangeSettings object used to customize the appearance of the MonthRange view
        * @type {MonthRangeSettings}
        * @summary The settings.
        */
        get monthRangeSettings(): MonthRangeSettings;
        _monthRangeSettings: MonthRangeSettings;
        /**
        * Gets the ItemSettings object used to customize the appearance of calendar items.
        * @type {ItemSettings}
        * @summary The settings.
        */
        get itemSettings(): ItemSettings;
        _itemSettings: ItemSettings;
        _locale: Locale;
        /**
        * Gets the locale object used to format and display date and time information in the calendar.
        * @type {DateSettings}
        * @summary The format info object.
        */
        get formatInfo(): DateSettings;
        /**
        * Gets the locale object used to format and display localizable strings in the calendar.
        * @type {LocalStrings}
        * @summary The dictionary of localizable strings.
        */
        get localInfo(): LocalStrings;
        /**
        * For internal use.
        * @private
        */
        private advance;
        /**
        * For internal use.
        * @private
        */
        private getMonthFirstVisibleDate;
        /**
        * For internal use.
        * @private
        */
        private getMonthFirstDate;
        /**
        * For internal use.
        * @private
        */
        private getWeekFirstDate;
        /**
        * For internal use.
        * @private
        */
        private getWeekOfYear;
        /**
        * For internal use.
        * @private
        */
        private getDayName;
        /**
        * For internal use.
        * @private
        */
        private setTimer;
        timer: Timer;
        /**
        * Checks if there are items which reminder has not come yet.
        * @returns {Boolean} true if there are items with a future reminder; otherwise false.
        */
        hasItemsToRemind(): boolean;
        /**
        * Checks if there are tasks which reminder has not come yet.
        * @returns {Boolean} true if there are tasks with a future reminder; otherwise false.
        */
        hasTasksToRemind(): boolean;
        /**
        * For internal use only.
        * @private
        */
        private isReminderOutdated;
        /**
        * Gets the calendar view cell that corresponds to the specified DateTime and resource.
        * @param {DateTime} time The time to search for.
        * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
        * false if the index of the second interval is contained. The default is false.
        * @param {Resource} [resource] The resource to search for.
        * @returns {ViewCell} The cell that corresponds the specified DateTime and resource.
        */
        getTimeCell(time: DateTime, isEndTime?: boolean, resource?: Resource): any;
        /**
        * Gets the calendar view cells that corresponds to the specified DateTime range and the specified resource.
        * @param {DateTime} startTime The start time of the range.
        * @param {DateTime} [endTime] The end time of the range.
        * @param {Boolean} [isEndTime] true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;
        false if the index of the second interval is contained. The default is false.
        * @param {Resource} [resource] The resource to search for.
        * @returns {Array} An array of ViewCell objects that correspond to the specified DateTime range and resource.
        */
        getTimeCells(startTime: DateTime, endTime?: DateTime, isEndTime?: boolean, resource?: Resource): any[];
        /**
        * Gets the calendar view cell that contains the specified coordinates.
        * @param {Number} x The X-coordinate of the point.
        * @param {Number} y The Y-coordinate of the point.
        * @returns {ViewCell} The calendar view cell that contains the specified coordinates or null if there is no cell at point.
        */
        getCellAt(x: number, y: number): any;
        /**
        * Gets the specified item's visual elements.
        * @param {Item} item The item.
        * @returns {Array} An array of div objects that represent the specified item's visual elements.
        */
        getItemDom(item: Item): any[];
        /**
        * Gets the calendar view cells that hold the specified item's visual elements.
        * @param {Item} item The item.
        * @returns {Array} An array of ViewCell objects that hold the specified item's visual elements.
        */
        getItemCells(item: Item): any[];
        /**
        * Gets the items, whose visual elements are contained in the specified calendar cell.
        * @param {ViewCell} cell The cell to check.
        * @returns {Array} An array of Item objects whose visual elements are contained in the specified calendar cell.
        */
        getCellItems(cell: any): any[];
        /**
        * For internal use only.
        * @private
        */
        private getResourceName;
        /**
        * For internal use only.
        * @private
        */
        private formatName;
        /**
        * For internal use only.
        * @private
         */
        private formatTooltip;
        /**
        * For internal use only.
        * @private
        */
        private sortAppointments;
        /**
        * For internal use only.
        * @private
        */
        private itemCloneKeyPressed;
        /**
        * For internal use only.
        * @private
        */
        private allowDelete;
        /**
        * For internal use only.
        * @private
        */
        private onKeyUp;
        /**
        * For internal use only.
        * @private
        */
        private onResize;
    }
    import { UIControl } from "Scheduling/jsplanner/src/UIControl";
    import { Unit } from "@mindfusion/common";
    import MonthCell from "Scheduling/jsplanner/src/MonthCell";
    import MonthRangeCell from "Scheduling/jsplanner/src/MonthRangeCell";
    import WeekRangeCell from "Scheduling/jsplanner/src/WeekRangeCell";
    import Timetable from "Scheduling/jsplanner/src/Timetable";
    import HorizontalTimetable from "Scheduling/jsplanner/src/HTimetable";
    import HorizontalList from "Scheduling/jsplanner/src/HListCell";
    import VerticalList from "Scheduling/jsplanner/src/VListCell";
    import ResourceViewCell from "Scheduling/jsplanner/src/ResourceViewCell";
    import { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { Schedule } from "Scheduling/jsplanner/src/Schedule";
    import { Selection } from "Scheduling/jsplanner/src/Selection";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Locale } from "@mindfusion/common";
    import SelectManager from "Scheduling/jsplanner/src/Interactions/SelectManager";
    import { MonthSettings } from "Scheduling/jsplanner/src/MonthSettings";
    import { TimetableSettings } from "Scheduling/jsplanner/src/TimetableSettings";
    import { ListSettings } from "Scheduling/jsplanner/src/ListSettings";
    import { WeekRangeSettings } from "Scheduling/jsplanner/src/WeekRangeSettings";
    import { ResourceViewSettings } from "Scheduling/jsplanner/src/ResourceViewSettings";
    import { MonthRangeSettings } from "Scheduling/jsplanner/src/MonthRangeSettings";
    import { ItemSettings } from "Scheduling/jsplanner/src/ItemSettings";
    import { DateSettings } from "@mindfusion/common";
    import { LocalStrings } from "Scheduling/jsplanner/src/LocalStrings";
    import Timer from "Scheduling/jsplanner/src/Timer";
    import { Resource } from "Scheduling/jsplanner/src/Resource";
    import { Item } from "Scheduling/jsplanner/src/Item";
}
declare module "@mindfusion/scheduling" {
    export { Calendar } from "Scheduling/jsplanner/src/Calendar";
    export { Contact } from "Scheduling/jsplanner/src/Contact";
    export { DateTime } from "Scheduling/jsplanner/src/DateTime";
    import { CalendarView, Orientation, TimeUnit, DailyRecurrence, DayOfWeek, DayOfWeekFormat, DayOfWeekType, DaysOfWeek, GroupType, HeaderType, HorizontalHeaderStyle, ItemModifyAction, Keys, MainHeaderStyle, MonthlyRecurrence, Occurrence, RecurrenceEnd, RecurrencePattern, YearlyRecurrence, RecurrenceState, ReminderType, RepaintType, ResourceViewTimeline, TaskPriority, TaskStatus, VerticalHeaderStyle, WeekRangeViewStyle } from "Scheduling/jsplanner/src/Enum";
    export { CalendarView, Orientation, TimeUnit, DailyRecurrence, DayOfWeek, DayOfWeekFormat, DayOfWeekType, DaysOfWeek, GroupType, HeaderType, HorizontalHeaderStyle, ItemModifyAction, Keys, MainHeaderStyle, MonthlyRecurrence, Occurrence, RecurrenceEnd, RecurrencePattern, YearlyRecurrence, RecurrenceState, ReminderType, RepaintType, ResourceViewTimeline, TaskPriority, TaskStatus, VerticalHeaderStyle, WeekRangeViewStyle };
    import { ButtonEventArgs, HeaderEventArgs, SelectionEventArgs, ItemEventArgs, CellEventArgs, DateChangedEventArgs, FormEventArgs, ItemModifiedEventArgs, ItemModifyingEventArgs, TaskEventArgs } from "Scheduling/jsplanner/src/EventArgs";
    export { ButtonEventArgs, HeaderEventArgs, SelectionEventArgs, ItemEventArgs, CellEventArgs, DateChangedEventArgs, FormEventArgs, ItemModifiedEventArgs, ItemModifyingEventArgs, TaskEventArgs };
    export { Item } from "Scheduling/jsplanner/src/Item";
    export { ItemSettings } from "Scheduling/jsplanner/src/ItemSettings";
    export { JsonPersistContext } from "Scheduling/jsplanner/src/JsonPersistContext";
    export { ListSettings } from "Scheduling/jsplanner/src/ListSettings";
    export { Location } from "Scheduling/jsplanner/src/Location";
    export { LocalStrings } from "Scheduling/jsplanner/src/LocalStrings";
    export { MonthRangeSettings } from "Scheduling/jsplanner/src/MonthRangeSettings";
    export { MonthSettings } from "Scheduling/jsplanner/src/MonthSettings";
    export { Recurrence } from "Scheduling/jsplanner/src/Recurrence";
    export { Reminder } from "Scheduling/jsplanner/src/Reminder";
    export { Resource } from "Scheduling/jsplanner/src/Resource";
    export { ResourceViewSettings } from "Scheduling/jsplanner/src/ResourceViewSettings";
    export { Schedule } from "Scheduling/jsplanner/src/Schedule";
    export { Selection } from "Scheduling/jsplanner/src/Selection";
    export { Task } from "Scheduling/jsplanner/src/Task";
    export { TimelineSettings } from "Scheduling/jsplanner/src/TimelineSettings";
    export { TimeRange } from "Scheduling/jsplanner/src/TimeRange";
    export { TimeSpan } from "Scheduling/jsplanner/src/TimeSpan";
    export { TimetableSettings } from "Scheduling/jsplanner/src/TimetableSettings";
    export { UIControl } from "Scheduling/jsplanner/src/UIControl";
    export { ViewCell } from "Scheduling/jsplanner/src/ViewCell";
    export { WeekRangeSettings } from "Scheduling/jsplanner/src/WeekRangeSettings";
    export { XmlPersistContext } from "Scheduling/jsplanner/src/XmlPersistContext";
    export { BaseForm } from "Scheduling/jsplanner/src/Forms/BaseForm";
}
