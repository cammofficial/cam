/// <reference types="../../@mindfusion/common-ui" />
/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/common" />
declare module "DataViews/jsdv/src/DataType" {
    export default DataType;
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
   * @class A base class for data types.
   */
    class DataType {
        static sortFunction(value1: any, value2: any): void;
        static createEditor(element: any, displayValue: any, value: any, view: any): void;
        static parse(text: any): void;
        static equals(value1: any, value2: any): void;
    }
}
declare module "DataViews/jsdv/src/Enum" {
    /**
     * Specifies a row action.
     */
    export type RowAction = number;
    export namespace RowAction {
        const Select: number;
        const Create: number;
        const Update: number;
        const Delete: number;
        const Command: number;
        const Render: number;
        const Load: number;
        const Expand: number;
        const Collapse: number;
    }
}
declare module "DataViews/jsdv/src/StringType" {
    /**
    * @class Provides functionality for grid columns, that display string data.
    */
    export class StringType extends DataType {
        static sortFunction(value1: any, value2: any): any;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement;
        static updateValueFromInput(newValue: any, element: any, view: any, row: any, column: any): void;
        static updateCell(view: any, element: any, r: any, c: any, displayValue: any): void;
        static parse(text: any): any;
        static format(value: any, meta: any): any;
        static equals(value1: any, value2: any): boolean;
        static get textAlign(): string;
    }
    import DataType from "DataViews/jsdv/src/DataType";
}
declare module "DataViews/jsdv/src/DateType" {
    /**
    * @class Provides functionality for grid columns, that display dates.
    */
    export class DateType extends DataType {
        static sortFunction(value1: any, value2: any): number;
        static get customEditor(): DateTimePicker;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement | DateTimePicker;
        static createDefaultEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement;
        static createCustomEditor(editor: any, options: any, element: any, displayValue: any, value: any, view: any): void;
        static parse(text: any): number;
        static format(value: any, meta: any): any;
        static equals(value1: any, value2: any): boolean;
    }
    import DataType from "DataViews/jsdv/src/DataType";
    import { DateTimePicker } from "@mindfusion/common-ui";
}
declare module "DataViews/jsdv/src/DateTimeType" {
    /**
    * @class Provides functionality for grid columns, that display date-time values.
    */
    export class DateTimeType extends DateType {
    }
    import { DateType } from "DataViews/jsdv/src/DateType";
}
declare module "DataViews/jsdv/src/BooleanType" {
    /**
    * @class Provides functionality for grid columns, that display boolean data.
    */
    export class BooleanType extends StringType {
        static sortFunction(value1: any, value2: any): number;
        static parse(text: any): boolean;
        static format(value: any, meta: any): string;
    }
    import { StringType } from "DataViews/jsdv/src/StringType";
}
declare module "DataViews/jsdv/src/ObjectType" {
    /**
    * @class Provides functionality for grid cells, that display expandable objects.
    */
    export class ObjectType extends DataType {
        static sortFunction(value1: any, value2: any): number;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLButtonElement;
        static parse(text: any): any;
        static format(value: any, meta: any): any;
        static equals(value1: any, value2: any): boolean;
    }
    import DataType from "DataViews/jsdv/src/DataType";
}
declare module "DataViews/jsdv/src/IntegerType" {
    /**
    * @class Provides functionality for grid columns, that display integer data.
    */
    export class IntegerType extends DataType {
        static sortFunction(value1: any, value2: any): number;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement;
        static parse(text: any): number;
        static format(value: any, meta: any): string;
        static equals(value1: any, value2: any): boolean;
        static get textAlign(): string;
    }
    import DataType from "DataViews/jsdv/src/DataType";
}
declare module "DataViews/jsdv/src/LookupType" {
    /**
    * @class Provides functionality for grid columns, that display lookup or value lists.
    */
    export class LookupType extends DataType {
        static sortFunction(value1: any, value2: any): any;
        static get customEditor(): CheckListPicker;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLSelectElement | CheckListPicker;
        static createDefaultEditor(element: any, displayValue: any, value: any, view: any): HTMLSelectElement;
        static createCustomEditor(editor: any, options: any, element: any, displayValue: any, value: any, view: any): void;
        static format(value: any, meta: any): any;
        static equals(value1: any, value2: any): boolean;
    }
    import DataType from "DataViews/jsdv/src/DataType";
    import { CheckListPicker } from "@mindfusion/common-ui";
}
declare module "DataViews/jsdv/src/RealNumberType" {
    /**
    * @class Provides functionality for grid columns, that display real number data.
    */
    export class RealNumberType extends IntegerType {
    }
    import { IntegerType } from "DataViews/jsdv/src/IntegerType";
}
declare module "DataViews/jsdv/src/DynamicType" {
    /**
    * @class Provides functionality for grid columns, that display data of different types.
    */
    export class DynamicType extends DataType {
        static sortFunction(valueObj1: any, valueObj2: any): any;
        static resolveValueType(value: any, meta: any): any;
        static createEditor(element: any, displayValue: any, value: any, view: any): any;
        static parse(text: any): any;
        static format(value: any, meta: any): any;
        static equals(value1: any, value2: any): any;
        static get textAlign(): string;
        static resolveDataTypeCallback(): any;
        static getCellValueCallback(): any;
        static resolveCellMetaDataCallback(): any;
        static formatCellValueCallback(text: any): any;
    }
    import DataType from "DataViews/jsdv/src/DataType";
}
declare module "DataViews/jsdv/src/ArrayModel" {
    /**
    * @class Represents a grid model, that uses an array of objects as a backing store.
    */
    export class ArrayModel {
        /**
         * Initializes a new instance of the ArrayModel class.
         * @constructor
         * @param {Array} values The array to use as a backing store.
         * @param {Array} columns The list of display columns.
         * @param {String} [keyField] The name of the unique key field.
         */
        constructor(values: any[], columns: any[], keyField?: string);
        _values: any[];
        _columns: any[];
        _keyField: string;
        _autoKey: string;
        /**
        * Gets the maximum value in the unique key column.
        * @returns {Object} The maximum value.
        */
        getMaxKey(): any;
        /**
        * Gets the key of the specified row.
        * @returns {Object} The key.
        */
        getRowKey(row: any): any;
        /**
        * Gets the row with the specified key.
        * @returns {Number} The row index.
        */
        getKeyRow(key: any): number;
        /**
        * Gets the type of the specified column.
        * @param {Number} column The column index.
        * @returns {DataType} The type.
        */
        columnType(column: number): any;
        /**
        * Gets the name of the specified column.
        * @param {Number} column The column index.
        * @returns {String} The name of the field displayed in this column.
        */
        columnName(column: number): string;
        /**
        * Gets the display text of the specified column.
        * @param {Number} column The column index.
        * @returns {String} The display text.
        */
        columnCaption(column: number): string;
        /**
        * Gets a value, indicating whether the cells in the specified column can be edited.
        * @param {Number} column The column index.
        * @returns {Boolean} True if the cells in this column can be edited, otherwise false.
        */
        columnEditable(column: number): boolean;
        /**
        * Gets a value, indicating whether the specified column can be sorted.
        * @param {Number} column The column index.
        * @returns {Boolean} True if the specified column can be sorted, otherwise false.
        */
        columnSortable(column: number): boolean;
        /**
        * Gets a value, indicating whether the specified column is currently displayed.
        * @param {Number} column The column index.
        * @returns {Boolean} True if the specified column should not be displayed, otherwise false.
        */
        columnHidden(column: number): boolean;
        /**
        * Gets the column meta data object.
        * @param {Number} column The column index.
        * @returns {Map} A Map instance containing the column meta data.
        */
        columnMetaData(column: number): Map<any, any>;
        /**
        * Gets the cell meta data object.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {Map} A Map instance containing the cell meta data.
        */
        cellMetaData(row: number, column: number): Map<any, any>;
        /**
        * Gets the cell data type.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {DataType} The data type of the cell.
        */
        cellDataType(row: number, column: number): any;
        /**
        * Sets a value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @param {Object} value The value.
        */
        setValue(row: number, column: number, value: any): void;
        /**
        * Gets the value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {Object} The value.
        */
        value(row: number, column: number): any;
        /**
        * Gets the display value of the cell in the the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {String} The display value.
        */
        displayValue(row: number, column: number): string;
        /**
        * Gets the values at the specified row index.
        * @param {Number} row The row index.
        * @returns {Object} An object containing the values at the specified row index.
        */
        getRowData(row: number): any;
        /**
        * Adds a row to the backing array.
        * @param {Object} [rowData] The values to add.
        * @param {Number} [index] The index at which to insert the data.
        * If not specified, the data will be appended to the end of the backing array.
        */
        addRow(rowData?: any, index?: number): number;
        /**
        * Removes the row at the specified index from the backing array.
        * @param {Number} row The row index.
        */
        deleteRow(row: number): void;
        /**
        * Gets the number of array items.
        * @type {Number}
        * @summary The row count.
        */
        get rowCount(): number;
        /**
        * Gets the number of display columns.
        * @type {Number}
        * @summary The column count.
        */
        get columnCount(): number;
    }
}
declare module "DataViews/jsdv/src/Command" {
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class A base class for grid row commands.
    */
    export class Command {
        /**
        * Override this method in a derived class to customize the command controller.
        * @param {Object} [sender] Optional.
        * @param {Object} [args] Optional.
        * @returns {HTMLElement} The controller.
        */
        static createControl(sender?: any, args?: any): HTMLElement;
        /**
        * Gets the command string identifier.
        * @type {String}
        * @summary Override this property in a derived class to set the command string identifier.
        */
        static get commandName(): string;
        /**
        * Gets the event, that will trigger the command action.
        * @type {String}
        * @summary Override this property in a derived class to change the trigger event for the command action.
        */
        static get eventName(): string;
        /**
        * Attaches the handler to the controller.
        * @private
        */
        private static attach;
    }
}
declare module "DataViews/jsdv/src/EventArgs" {
    /**
    * @class Specifies data for row action validation events.
    * @augments CancelEventArgs
    */
    export class RowModifyingEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the RowModifyingEventArgs class.
        * @constructor
        * @param {Number} row The index of the row that is being modified.
        * @param {RowAction} action The row action.
        * @param {Object} rowData The row data.
        * @param {Map} oldValues The dictionary of the original field name/value pairs.
        * @param {Map} newValues The dictionary of the new field name/value pairs.
        */
        constructor(row: number, action: RowAction, rowData: any, oldValues: Map<any, any>, newValues: Map<any, any>);
        _row: number;
        _action: number;
        _rowData: any;
        _oldValues: Map<any, any>;
        _newValues: Map<any, any>;
        /**
        * Gets the row that is being modified.
        * @type {Number}
        * @summary The index of the row that is being modified.
        */
        get row(): number;
        /**
        * Gets the row data.
        * @type {Object}
        * @summary An object containing the row data.
        */
        get rowData(): any;
        /**
        * Gets the row action.
        * @type {RowAction}
        * @summary One of the RowAction enumeration values.
        */
        get action(): number;
        /**
        * Gets the dictionary of the original field name/value pairs.
        * @type {Map}
        * @summary The dictionary of the original field name/value pairs.
        */
        get oldValues(): Map<any, any>;
        /**
        * Gets the dictionary of the new field name/value pairs.
        * @type {Map}
        * @summary The dictionary of the new field name/value pairs.
        */
        get newValues(): Map<any, any>;
    }
    /**
    * @class Specifies data for row action notification events.
    * @augments EventArgs
    */
    export class RowModifiedEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the RowModifiedEventArgs class.
        * @constructor
        * @param {Number} row The index of the row that was modified.
        * @param {RowAction} action The row action.
        * @param {Object} rowData The row data.
        * @param {Map} oldValues The dictionary of the original field name/value pairs.
        * @param {Map} newValues The dictionary of the new field name/value pairs.
        */
        constructor(row: number, action: RowAction, rowData: any, oldValues: Map<any, any>, newValues: Map<any, any>);
        _row: number;
        _action: number;
        _rowData: any;
        _oldValues: Map<any, any>;
        _newValues: Map<any, any>;
        /**
        * Gets the row that was modified.
        * @type {Number}
        * @summary The index of the row that was modified.
        */
        get row(): number;
        /**
        * Gets the row data.
        * @type {Object}
        * @summary An object containing the row data.
        */
        get rowData(): any;
        /**
        * Gets the row action.
        * @type {RowAction}
        * @summary One of the RowAction enumeration values.
        */
        get action(): number;
        /**
        * Gets the dictionary of the original field name/value pairs.
        * @type {Map}
        * @summary The dictionary of the original field name/value pairs.
        */
        get oldValues(): Map<any, any>;
        /**
        * Gets the dictionary of the new field name/value pairs.
        * @type {Map}
        * @summary The dictionary of the new field name/value pairs.
        */
        get newValues(): Map<any, any>;
    }
    /**
    * @class Specifies data for the rowCommand event.
    * @augments RowModifyingEventArgs
    */
    export class CommandEventArgs extends RowModifyingEventArgs {
        /**
        * Initializes a new instance of the RowModifiedEventArgs class.
        * @constructor
        * @param {String} commandName The string identifier of the executed command.
        * @param {HTMLElement} control The controller that triggered the command.
        * @param {Number} row The index of the row, for which the command is executed.
        * @param {Object} rowData The row data.
        */
        constructor(commandName: string, control: HTMLElement, row: number, rowData: any);
        _commandName: string;
        _control: HTMLElement;
        /**
        * Gets the string identifier of the executed command.
        * @type {String}
        * @summary The command name.
        */
        get commandName(): string;
        /**
        * Gets the controller that triggered the command.
        * @type {HTMLElement}
        * @summary The HTML control.
        */
        get control(): HTMLElement;
    }
    /**
    * @class Provides data for the cell related validation events.
    * @augments CancelEventArgs
    */
    export class CellValidateEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the CellValidateEventArgs class.
        * @constructor
        * @param {Number} row The row index of the cell.
        * @param {Number} column The column index of the cell.
        */
        constructor(row: number, column: number, value: any, displayValue: any);
        _row: number;
        _column: number;
        _value: any;
        _displayValue: any;
        /**
        * Gets the row of the cell, associated with the event.
        * @type {Number}
        * @summary The row index.
        */
        get row(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @type {Number}
        * @summary The column index.
        */
        get column(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @type {Number}
        * @summary The column index.
        */
        get value(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @returns {Number} The column index.
        */
        get displayValuelu(): number;
    }
    /**
    * @class Provides data for the cell related notification events.
    * @augments EventArgs
    */
    export class CellEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the CellEventArgs class.
        * @constructor
        * @param {Number} row The row index of the cell.
        * @param {Number} column The column index of the cell.
        */
        constructor(row: number, column: number, value: any, displayValue: any);
        _row: number;
        _column: number;
        _value: any;
        _displayValue: any;
        /**
        * Gets the row of the cell, associated with the event.
        * @type {Number}
        * @summary The row index.
        */
        get row(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @type {Number}
        * @summary The column index.
        */
        get column(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @returns {Number} The column index.
        */
        get value(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @returns {Number} The column index.
        */
        get displayValuelu(): number;
    }
    /**
    * @class Provides data for custom draw events.
    * @augments CellEventArgs
    */
    export class CellCustomDrawEventArgs extends CellEventArgs {
        /**
        * Initializes a new instance of the CellCustomDrawEventArgs class.
        * @constructor
        * @param {Number} row The row index of the cell.
        * @param {Number} column The column index of the cell.
        * @param {Node} defaultContent The default content displayed in the cell.
        */
        constructor(row: number, column: number, defaultContent: Node);
        _defaultContent: Node;
        /**
        * Gets the default content, displayed in the cell.
        * @type {Node}
        * @summary The default content.
        */
        get defaultContent(): Node;
        set content(arg: Node);
        /**
        * Gets or sets the new content to be displayed in the cell.
        * @type {Node}
        * @summary The new content.
        */
        get content(): Node;
        _content: Node;
    }
    /**
    * @class Provides data for events, raised by dynamic columns.
    * @augments EventArgs
    */
    export class CellResolveEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the CellResolveEventArgs class.
        * @constructor
        * @param {Number} row The row index of the cell.
        * @param {Number} column The column index of the cell.
        * @param {Object} value The cell value.
        * @param {Object} result The data, passed back from the event.
        */
        constructor(row: number, column: number, value: any, result: any);
        _row: number;
        _column: number;
        _value: any;
        _result: any;
        /**
        * Gets the row of the cell, associated with the event.
        * @type {Number}
        * @summary The row index.
        */
        get row(): number;
        /**
        * Gets the column of the cell, associated with the event.
        * @type {Number}
        * @summary The column index.
        */
        get column(): number;
        /**
        * Gets the value of the cell, associated with the event.
        * @returns {Object} The cell value.
        */
        get value(): any;
        set result(arg: any);
        /**
        * Gets or sets the data, passed from the event.
        * @returns {Object} The result.
        */
        get result(): any;
    }
    /**
    * @class Provides data for events raised by the PropertyGrid control.
    * @augments CancelEventArgs
    */
    export class PropertyEventArgs extends CancelEventArgs {
        /**
        * Initializes a new instance of the PropertyEventArgs class.
        * @constructor
        * @param {RowAction} action The action associated with the event.
        * @param {String} propertyName The name of the property.
        * @param {Object} propertyValue The value of the property.
        * @param {Object} oldValue The value of the property.
        * @param {Number} index The index of the object, associated with the event.
        * @param {Map} meta The metaData of the property.
        */
        constructor(action: RowAction, propertyName: string, index: number, propertyValue: any, oldValue: any, newValue: any, meta: Map<any, any>);
        _action: number;
        _propertyName: string;
        _index: number;
        _propertyValue: any;
        _oldValue: any;
        _newValue: any;
        _meta: Map<any, any>;
        /**
        * Gets the action associated with the event.
        * @type {RowAction}
        * @summary One of the RowAction enumeration values.
        */
        get action(): number;
        /**
        * Gets the name of the property.
        * @type {String}
        * @summary The property name.
        */
        get propertyName(): string;
        /**
        * Gets the index of the object associated with the event.
        * @type {Number}
        * @summary The index.
        */
        get index(): number;
        /**
        * Gets the value of the property.
        * @type {Object}
        * @summary The property value.
        */
        get propertyValue(): any;
        /**
        * Gets the old value of the property.
        * @type {Object}
        * @summary The old property value.
        */
        get oldValue(): any;
        set newValue(arg: any);
        /**
        * Gets or sets the new value of the property.
        * @type {Object}
        * @summary The new property value.
        */
        get newValue(): any;
        /**
        * Gets the metaData of the property.
        * @type {Map}
        * @summary The metaData dictionary.
        */
        get meta(): Map<any, any>;
    }
    import { CancelEventArgs } from "@mindfusion/controls";
    import { RowAction } from "DataViews/jsdv/src/Enum";
    import { EventArgs } from "@mindfusion/controls";
}
declare module "DataViews/jsdv/src/CommandType" {
    /**
    * @class Provides functionality for command columns.
    */
    export class CommandType {
        static createContent(element: any, view: any): void;
    }
}
declare module "DataViews/jsdv/src/CurrencyType" {
    /**
    * @class Provides functionality for grid columns, that display currency data.
    */
    export class CurrencyType extends RealNumberType {
    }
    import { RealNumberType } from "DataViews/jsdv/src/RealNumberType";
}
declare module "DataViews/jsdv/src/DeleteCommand" {
    /**
    * @class Handles row deletion, triggered by a command grid column.
    */
    export class DeleteCommand extends Command {
        static execute(sender: any, args: any): void;
    }
    import { Command } from "DataViews/jsdv/src/Command";
}
declare module "DataViews/jsdv/src/DomRenderer" {
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class A base class for grid renderers.
    */
    export class DomRenderer {
        set grid(arg: any);
        /**
        * Gets or sets the grid control this renderer is attached to.
        * @type {Grid}
        * @summary The grid control.
        */
        get grid(): any;
        _grid: any;
        /**
        * Gets the array of DOM elements of the visible rows.
        * @type {HTMLCollection}
        * @summary Implement this property in a derived class to provide access to the array of DOM elements of the visible rows.
        */
        get visibleRows(): HTMLCollection;
        /**
        * Gets the array of DOM elements of the visible cells.
        * @type {HTMLCollection}
        * @ summary Implement this property in a derived class to provide access to the array of DOM elements of the visible cells.
        */
        get visibleCells(): HTMLCollection;
        /**
        * Implement this method in a derived class to handle the initial rendering of the grid control.
        */
        renderGrid(): void;
        /**
        * Implement this method in a derived class to handle re-rendering of the grid control.
        */
        invalidate(): void;
        /**
        * Implement this method in a derived class to handle re-rendering of a row range.
        * @param {Number} index The start index of the range.
        * @param {Number} count The length of the range.
        */
        refreshRows(index: number, count: number): void;
        /**
        * Implement this method in a derived class to handle updates of grid cells after inplace-editing.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        */
        updateCell(row: number, column: number): void;
        /**
        * Implement this method in a derived class to handle row creation.
        */
        onRowCreated(): void;
        /**
        * Implement this method in a derived class to handle row deletion.
        */
        onRowDeleted(): void;
        /**
        * Implement this method in a derived class to handle scrolling.
        */
        onScroll(): void;
        /**
        * Implement this method in a derived class to handle selection.
        */
        onSelect(): void;
        /**
        * Implement this method in a derived class to handle sorting.
        */
        onSort(): void;
    }
}
declare module "DataViews/jsdv/src/UIControl" {
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
declare module "DataViews/jsdv/src/ProxyModel" {
    export default ProxyModel;
    class ProxyModel {
        constructor(sourceModel: any);
        sourceModel: any;
        _filter: any;
        _sortedColumn: number;
        _sortAscending: boolean;
        _groupColumn: number;
        indexMap: any[];
        getMaxKey(): any;
        getKeyRow(key: any): any;
        getRowKey(index: any): any;
        columnType(column: any): any;
        columnName(column: any): any;
        columnCaption(column: any): any;
        columnEditable(column: any): any;
        columnSortable(column: any): any;
        columnHidden(column: any): any;
        columnMetaData(column: any): any;
        cellMetaData(row: any, column: any): any;
        cellDataType(row: any, column: any): any;
        setValue(row: any, column: any, value: any): void;
        value(row: any, column: any): any;
        displayValue(row: any, column: any): any;
        getRowData(row: any): any;
        addRow(rowData: any, index: any): number;
        deleteRow(row: any): void;
        get rowCount(): any;
        get columnCount(): any;
        invalidate(): void;
        ensureIndexMap(): void;
        set filter(arg: any);
        get filter(): any;
        set sortedColumn(arg: number);
        get sortedColumn(): number;
        set sortAscending(arg: boolean);
        get sortAscending(): boolean;
        set groupColumn(arg: number);
        get groupColumn(): number;
        isGroupRow(row: any): any;
    }
}
declare module "DataViews/jsdv/src/ImageType" {
    /**
    * @class Provides functionality for grid columns, that display image data.
    */
    export class ImageType extends DataType {
        static sortFunction(value1: any, value2: any): any;
        static createEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement | ImagePicker;
        static createDefaultEditor(element: any, displayValue: any, value: any, view: any): HTMLInputElement;
        static updateCell(view: any, element: any, r: any, c: any, displayValue: any): void;
        static createCustomEditor(editor: any, options: any, element: any, displayValue: any, value: any, view: any): void;
        static parse(text: any): any;
        static equals(value1: any, value2: any): boolean;
        static format(value: any, meta: any): string;
        static get textAlign(): string;
    }
    import DataType from "DataViews/jsdv/src/DataType";
    import { ImagePicker } from "@mindfusion/common-ui";
}
declare module "DataViews/jsdv/src/GridRenderer" {
    export default GridRenderer;
    /**
    * @class Contains render methods for a grid control.
    */
    class GridRenderer extends DomRenderer {
        repaintId: number;
        draw(): void;
        drawHeader(): HTMLDivElement;
        drawContent(): HTMLDivElement;
        drawRows(): void;
        rowHeight: number;
        rowsHeight: number;
        drawRow(model: any, r: any): HTMLDivElement;
        drawFooter(): HTMLDivElement;
        refreshRow(model: any, r: any): void;
        addSelectedFlag(element: any): void;
        removeSelectedFlag(element: any): void;
        clearSelection(): void;
        updateSelection(): void;
    }
    import { DomRenderer } from "DataViews/jsdv/src/DomRenderer";
}
declare module "DataViews/jsdv/src/Selection" {
    export default Selection;
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Represents a selection in a grid control.
    */
    class Selection {
        /**
         * Initializes a new instance of the Selection class.
         * @constructor
         * @param {Grid} grid The associated grid control.
         */
        constructor(grid: any);
        _grid: any;
        _cells: any[];
        _rows: any[];
        set cells(arg: any[]);
        /**
        * Gets or sets the array of selected cells.
        * @type {Array}
        * @summary The array of selected cells.
        */
        get cells(): any[];
        _columns: any[];
        set rows(arg: any[]);
        /**
        * Gets or sets the array of selected rows.
        * @type {Array}
        * @summary The array of selected rows.
        */
        get rows(): any[];
    }
}
declare module "DataViews/jsdv/src/GridModel" {
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class The interface for grid models.
    */
    export class GridModel {
        /**
        * Gets the key of the specified row.
        * @returns {Object} The key.
        */
        getRowKey(row: any): any;
        /**
        * Gets the row with the specified key.
        * @returns {Number} The row index.
        */
        getKeyRow(key: any): number;
        /**
        * Gets the type of the specified column.
        * @param {Number} column The column index.
        * @returns {DataType} The type.
        */
        columnType(column: number): any;
        /**
        * Gets the name of the specified column.
        * @param {Number} column The column index.
        * @returns {String} The name of the field displayed in this column.
        */
        columnName(column: number): string;
        /**
        * Gets the display text of the specified column.
        * @param {Number} column The column index.
        * @returns {String} The display text.
        */
        columnCaption(column: number): string;
        /**
        * Gets a value, indicating whether the cells in the specified column can be edited.
        * @param {Number} column The column index.
        * @returns {Boolean} True if the cells in this column can be edited, otherwise false.
        */
        columnEditable(column: number): boolean;
        /**
        * Gets a value, indicating whether the specified column can be sorted.
        * @param {Number} column The column index.
        * @returns {Boolean} True if the specified column can be sorted, otherwise false.
        */
        columnSortable(column: number): boolean;
        /**
        * Gets the column meta data object.
        * @param {Number} column The column index.
        * @returns {Map} A Map instance containing the column meta data.
        */
        columnMetaData(column: number): Map<any, any>;
        cellDataType(row: any, column: any): any;
        /**
        * Sets a value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @param {Object} value The value.
        */
        setValue(row: number, column: number, value: any): void;
        /**
        * Gets the value at the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {Object} The value.
        */
        value(row: number, column: number): any;
        /**
        * Gets the display value of the cell in the the specified position.
        * @param {Number} row The row index.
        * @param {Number} column The column index.
        * @returns {String} The display value.
        */
        displayValue(row: number, column: number): string;
        /**
        * Gets the values at the specified row index.
        * @param {Number} row The row index.
        * @returns {Object} An object containing the values at the specified row index.
        */
        getRowData(row: number): any;
        /**
        * Adds a row to the backing store.
        * @param {Object} [rowData] The values to add.
        * @param {Number} [index] The index at which to insert the data.
        * @returns {Number} index The index of the new row.
        */
        addRow(rowData?: any, index?: number): number;
        /**
        * Removes the row at the specified index from the backing store.
        * @param {Number} row The row index.
        */
        deleteRow(row: number): void;
        /**
        * Gets the number of rows in the backing store.
        * @type {Number}
        * @summary The row count.
        */
        get rowCount(): number;
        /**
        * Gets the number of display columns.
        * @type {Number}
        * @summary The column count.
        */
        get columnCount(): number;
    }
}
declare module "DataViews/jsdv/src/GridCell" {
    /**
    * @namespace MindFusion.DataViews
    */
    /**
     * Copyright (c) 2020, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Represents a data cell in a grid control.
    */
    export class GridCell {
        /**
         * Initializes a new instance of the GridCell class.
         * @constructor
         * @private
         */
        private constructor();
        _parent: any;
        _row: any;
        _column: any;
        _rowKey: any;
        /**
         * @private
         */
        private focus;
        /**
         * @private
         */
        private invalidateKey;
        /**
        * Gets the row index of this cell.
        * @type {Number}
        * @summary The row index.
        */
        get row(): number;
        /**
        * Gets the column index of this cell.
        * @type {Number}
        * @summary The column index.
        */
        get column(): number;
        /**
        * Gets the DOM element of this cell.
        * @type {HTMLDivElement}
        * @summary The DOM element,
        */
        get element(): HTMLDivElement;
        /**
        * Gets the parent control] of this cell.
        * @type {Grid}
        * @summary The parent control.
        */
        get parent(): any;
    }
}
declare module "DataViews/jsdv/src/Grid" {
    /**
    * @class Represents a grid view control.
    * @augments UIControl
    */
    export class Grid extends UIControl {
        /**
         * Initializes a new instance of the Grid class.
         * @constructor
         * @param {HTMLDivElement} [element] The control's associated Dom element.
         * @param {Object} [renderer] Optional.
         */
        constructor(element?: HTMLDivElement, renderer?: any);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _model: any;
        _proxyModel: ProxyModel;
        _allowEdit: boolean;
        _allowAppend: boolean;
        _allowDelete: boolean;
        _allowCellSelect: boolean;
        _allowScroll: boolean;
        _filter: any;
        _sortedColumn: number;
        _sortAscending: boolean;
        renderer: any;
        _scrollRow: number;
        _columnWidths: any[];
        _rowHeaderWidth: number;
        _focusedCell: any;
        _activeEditor: any;
        _tableShouldFocus: boolean;
        selection: Selection;
        queuedEvents: any[];
        _rowLoading: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowRendered: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowCreating: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowCreated: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowDeleting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowDeleted: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowUpdating: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowUpdated: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowSelecting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowSelected: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellSelecting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellSelected: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellFocusing: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellFocused: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _customDrawCell: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _customDrawHeader: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowCommand: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resolveCellDataType: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resolveCellMetaData: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _getCellValue: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _formatCellValue: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _objectButtonClick: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _scrollHandler: (e: any) => boolean;
        mouseWheelHandler: (e: any) => void;
        get wrapper(): Element;
        /**
        * Returns a reference to the grid header DOM element.
        * @type {HTMLDivElement}
        * @summary The header element.
        */
        get header(): HTMLDivElement;
        /**
        * Returns a reference to the grid data table DOM element.
        * @type {HTMLDivElement}
        * @summary The data table element.
        */
        get dataTable(): HTMLDivElement;
        /**
        * Returns the array of DOM elements of the visible rows.
        * @type {Array}
        * @summary An array of row DOM elements.
        * @private
        */
        private get visibleRows();
        /**
        * Returns the array of DOM elements of the visible cells.
        * @type {Array}
        * @summary A two-dimensional array of cell DOM elements.
        * @private
        */
        private get visibleCells();
        scroll: Element;
        resizeHandler: (e: any) => void;
        /**
        * Called before the grid contents are rendered by the current renderer.
        * @private
        */
        private onBeforeRender;
        /**
        * Called after the grid contents are rendered by the current renderer.
        * @private
        */
        private onAfterRender;
        rowHeight: number;
        rowsCount: number;
        stopEvents: boolean;
        /**
        * Repaints the grid contents.
        * @param {Boolean} [selected] True to repaint only the selected rows.
        */
        refresh(selected?: boolean): Promise<any>;
        /**
        * Sets the focus to the cell at the specified position.
        * @param {Number} row The cell row.
        * @param {Number} column The cell column.
        * @param {Boolean} [moveBackwards] True to move backwards.
        * @remarks If the cell at the specified position is not editable, the focus is set
        * to the next editable cell, if such exists.
        */
        focusCell(row: number, column: number, moveBackwards?: boolean): void;
        /**
        * Selects the cell at the specified position.
        * @param {Number} row The cell row.
        * @param {Number} column The cell column.
        */
        selectCell(row: number, column: number): void;
        /**
        * Selects the rows in the specified range.
        * @param {Number} index The start index of the range to select.
        * @param {Number} [count] The length of the range.
        */
        selectRows(index: number, count?: number): void;
        /**
        * Gets the indices of selected rows.
        * @type {Array}
        * @summary An array of indices.
        */
        get selectedRowIndices(): any[];
        /**
        * Gets the selected cells.
        * @type {Array}
        * @summary An array of GridCell instances.
        */
        get selectedCells(): any[];
        /**
        * Invalidates the current renderer.
        * @private
        */
        private invalidateDom;
        /**
        * Repaints a range of rows.
        * @param {Number} index The start index of the row range to repaint.
        * @param {Number} [count] The length of the range.
        */
        refreshRows(index: number, count?: number): Promise<any>;
        /**
        * Adds a row.
        * @param {Object} rowData The values to add.
        * @param {Number} [index] Optional.
        */
        addRow(rowData: any, index?: number): Promise<any>;
        /**
        * Removes a range of rows.
        * @param {Number} index The start index of the row range to remove.
        * @param {Number} [count] The length of the range.
        */
        removeRows(index: number, count?: number): Promise<any>;
        /**
         * Removes a range of rows from the data table starting from the given index.
         * @param {Number} index The starting row index.
         * @param {Number} count The length of the range.
         * @private
         */
        private removeRowRange;
        scrollRangeInvalid: boolean;
        /**
        * Sorts by the specified column and sort direction.
        * @param {Number} index The index of the column to sort by, or null to clear the sorting.
        * @param {Boolean} [sortAscending] True to sort ascending, otherwise false.
        */
        sortByColumn(index: number, sortAscending?: boolean): void;
        set sortedColumn(arg: number);
        /**
         * Gets or sets the index of the column, by which the data is sorted.
         * @type {Number}
         * @summary The column index, or -1 if no sorting is applied to the grid.
         */
        get sortedColumn(): number;
        set sortAscending(arg: boolean);
        /**
         * Gets or sets a value, indicating whether the sorting is in Ascending order.
         * @type {Boolean}
         * @summary True if the sorting is in Ascending order, otherwise false.
         */
        get sortAscending(): boolean;
        /**
        * Calculates the scroll fix amount.
        * @private
        */
        private calcScrollFix;
        scrollFixAmount: number;
        /**
         * Updates the scroll range based on current rows count and height.
         * @private
         */
        private updateScrollRange;
        scrollIncrement: number;
        /**
        * Sets equal column widths in pixels based on flex calculations.
        * @private
        */
        private initColumnWidths;
        /**
         * For internal use only.
         * @private
         */
        private resizeColumn;
        set model(arg: GridModel);
        /**
         * Gets or sets the data model of this grid.
         * @type {GridModel}
         * @summary The model.
         */
        get model(): GridModel;
        /**
         * Refreshes the grid after external modifications to the grid model.
         */
        rebind(): void;
        set scrollRow(arg: number);
        /**
        * Gets or sets the index of the first visible row.
        * @type {Number}
        * @summary The row index.
        */
        get scrollRow(): number;
        get effectiveModel(): any;
        ensureProxyModel(): void;
        set allowEdit(arg: boolean);
        /**
         * Gets or sets a value, indicating whether inplace editing is enabled.
         * @type {Boolean}
         * @summary True if inplace editing is enabled, otherwise false.
         */
        get allowEdit(): boolean;
        set allowAppend(arg: boolean);
        /**
         * Gets or sets a value, indicating whether to show a new empty row at the bottom of the grid and a 'New row' option in the row context menu.
         * @type {Boolean}
         * @summary True to show a new row, otherwise false.
         */
        get allowAppend(): boolean;
        set allowDelete(arg: boolean);
        /**
         * Gets or sets a value, indicating whether to show a 'Delete row' option in the row context menu.
         * @type {Boolean}
         * @summary True to show the option, otherwise false.
         */
        get allowDelete(): boolean;
        set allowCellSelect(arg: boolean);
        /**
         * Gets or sets a value, indicating whether single cell selection is enabled.
         * @type {Boolean}
         * @summary True if single cell selection is enabled, otherwise false.
         */
        get allowCellSelect(): boolean;
        set allowScroll(arg: boolean);
        /**
         * Gets or sets a value, indicating whether scrolling is enabled.
         * @type {Boolean}
         * @summary True if inplace scrolling is enabled, otherwise false.
         */
        get allowScroll(): boolean;
        set filter(arg: any);
        get filter(): any;
        onScroll(e: any): boolean;
        headerMouseOver(e: any): void;
        headerMouseLeave(e: any): void;
        columnHeaderContextMenu(e: any): void;
        contextMenu: import("@mindfusion/common-ui").Menu;
        columnHeaderMouseDown(e: any): void;
        columnHeaderClicked(e: any): void;
        set focusedCell(arg: GridCell);
        /**
        * Gets the active grid cell.
        * @type {GridCell}
        * @summary the cell.
        */
        get focusedCell(): GridCell;
        rowHeaderMouseDown(e: any): void;
        rowHeaderContextMenu(e: any): void;
        contextMenuCallback(item: any): void;
        tableKeyDown(e: any): void;
        tableKeyUp(e: any): void;
        tableCellClicked(e: any): void;
        /**
         * Gets the cell at the provided coordinates, if it is focusable, or the nearest focusable cell in the specified direction.
         * @param {Number} row The cell row.
         * @param {Number} column The cell column.
         * @param {Boolean} back True to search backwards.
         * @private
         */
        private getFocusableCell;
        moveFocusedCell(row: any, column: any, back: any): void;
        moveFocusedCellLeft(): void;
        moveFocusedCellRight(): void;
        get focusedItem(): GridCell | {
            row: any;
            column: number;
        };
        /**
         * Gets the DOM element of the cell in the specified coordinates.
         * @param {Number} row The cell row.
         * @param {Number} column The cell column.
         * @returns {HTMLDivElement} the cell's DOM element.
         */
        getCellElement(row: number, column: number): HTMLDivElement;
        /**
         * Gets the DOM element of the specified row.
         * @param {Number} row The row index.
         * @returns {HTMLDivElement} the row's DOM element.
         */
        getRowElement(row: number): HTMLDivElement;
        /**
         * Checks if the row at the specified index is currently visible.
         * @param {Number} row The row index.
         * @returns {Boolean} True if the row is visible, otherwise false.
         */
        isRowVisible(row: number): boolean;
        isCellVisible(row: any, column: any): boolean;
        /**
        * Scrolls to the specified row.
        * @param {Number} row The row.
        * @private
        */
        private bringRowIntoView;
        isRepainting: boolean;
        /**
        * Ensures that the specified row is visible.
        * @param {Number} row The row.
        */
        bringIntoView(row: number): Promise<any>;
        /**
        * Applies an additional translate transform to the data table when scrolling
        * to the first or last row, if the row is partly visible.
        * @param {Number} row The relative row index.
        * @private
        */
        private scrollFix;
        /**
        * Checks if the row at the specified index is a group row.
        * @param {Number} row The row index.
        * @private
        */
        private isGroupRow;
        /**
        * Scrolls to the specified row.
        * @param {Number} row The row index.
        * @private
        */
        private scrollToRow;
        /**
        * Disposes the active grid cell editor.
        */
        disposeActiveEditor(): void;
        set activeEditor(arg: any);
        /**
        * Gets the active editor.
        * @type {Object}
        * @summary The editor.
        */
        get activeEditor(): any;
        /**
        * Gets the index of the last grid row.
        * @private
        */
        private get lastRowIndex();
        /**
        * Gets the height of rows viewport.
        * @type {Number}
        * @summary The height.
        * @private
        */
        private get contentHeight();
        /**
        * Gets the height of rows viewport minus the horizontal scrollbar height.
        * @type {Number}
        * @summary The height.
        * @private
        */
        private get contentClientHeight();
        /**
         * Gets the width of the specified grid column.
         * @param {Number} column The column index.
         * @returns {Number} The width in pixels.
         */
        getColumnWidth(column: number): number;
        /**
         * Sets the width of the specified grid column.
         * @param {Number} column The column index.
         * @param {Number} width The width in pixels.
         */
        setColumnWidth(column: number, width: number): void;
        /**
         * Disposes the current context menu.
         */
        disposeContextMenu(): void;
        /**
         * Sets selected rows after raising selection events.
         * @private
         */
        private setRowSelection;
        /**
         * Gets the row with the specified key.
         * @param {Object} key The key.
         * @returns {Number} The row index.
         */
        getKeyRow(key: any): number;
        /**
         * Gets the key of the row at the specified index.
        * @param {Number} index The row index.
        * @returns {Object} The row key.
        */
        getRowKey(index: number): any;
        /**
        * Recalculates grid's dimensions.
        * @remarks Use this method to recalculate the grid's dimensions after resizing.
        */
        adjust(): void;
        /**
        * For internal use only.
        * @private
        */
        private onResize;
        onMouseWheel(e: any): void;
        timeStamp: number;
        /**
        * Raises the corresponding validation event when a row action is performed.
        * @private
        */
        private onRowValidateAction;
        /**
        * Raises the corresponding notification event after a row action is performed.
        * @private
        */
        private onRowAction;
        onCellAction(row: any, column: any, value: any, displayValue: any): void;
        /**
        * Adds an event to the queued events that will be raised after the grid finished repainting.
        * @private
        */
        private queueEvent;
        /**
        * Raises all queued events.
        * @private
        */
        private raiseQueuedEvents;
        /**
        * Raises the rowCommand event.
        * @private
        */
        private onRowCommand;
        /**
         * Raised when a row data is loading.
         * @event rowLoading
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowLoading(): EventDispatcher<any>;
        /**
         * Raised when a row is rendered.
         * @event rowRendered
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowRendered(): EventDispatcher<any>;
        /**
         * Raised before a row is selected.
         * @event rowSelecting
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowSelecting(): EventDispatcher<any>;
        /**
         * Raised when a row is selected.
         * @event rowSelected
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowSelected(): EventDispatcher<any>;
        /**
         * Raised before a new row is created.
         * @event rowCreating
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowCreating(): EventDispatcher<any>;
        /**
         * Raised when a new row is created.
         * @event rowCreated
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowCreated(): EventDispatcher<any>;
        /**
         * Raised before a row is deleted.
         * @event rowDeleting
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowDeleting(): EventDispatcher<any>;
        /**
         * Raised when a row is deleted.
         * @event rowDeleted
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowDeleted(): EventDispatcher<any>;
        /**
         * Raised before a row is updated.
         * @event rowUpdating
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowUpdating(): EventDispatcher<any>;
        /**
         * Raised when a row is updated.
         * @event rowUpdated
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowUpdated(): EventDispatcher<any>;
        /**
         * Raised before a cell is selected.
         * @event cellSelecting
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellEventArgs} args
         */
        get cellSelecting(): EventDispatcher<any>;
        /**
        * Raises the onCellSelecting event.
        * @private
        */
        private onCellSelecting;
        /**
         * Raised when a cell is selected.
         * @event cellSelected
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellEventArgs} args
         */
        get cellSelected(): EventDispatcher<any>;
        /**
        * Raises the cellSelected event.
        * @private
        */
        private onCellSelected;
        /**
         * Raised before a cell is focused.
         * @event cellFocusing
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellEventArgs} args
         */
        get cellFocusing(): EventDispatcher<any>;
        /**
        * Raises the cellFocusing event.
        * @private
        */
        private onCellFocusing;
        /**
         * Raised when a cell is focused.
         * @event cellFocused
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellEventArgs} args
         */
        get cellFocused(): EventDispatcher<any>;
        /**
        * Raises the cellFocused event.
        * @private
        */
        private onCellFocused;
        /**
        * Raises the customDrawCell event.
        * @private
        */
        private onCustomDrawCell;
        /**
         * Raised when a cell's contents are about to be rendered, to allow custom drawing.
         * @event customDrawCell
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellCustomDrawEventArgs} args
         */
        get customDrawCell(): EventDispatcher<any>;
        /**
        * Raises the customDrawHeader event.
        * @private
        */
        private onCustomDrawHeader;
        /**
         * Raised when a header cell's contents are about to be rendered, to allow custom drawing.
         * @event customDrawHeader
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellCustomDrawEventArgs} args
         */
        get customDrawHeader(): EventDispatcher<any>;
        /**
         * Raised when a command is executed on a row.
         * @event rowCommand
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowCommand(): EventDispatcher<any>;
        /**
         * Raised when the data type of a cell in a DynamicType column has to be resolved.
         * @event resolveCellDataType
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellResolveEventArgs} args
         */
        get resolveCellDataType(): EventDispatcher<any>;
        /**
        * Raised when the value of a cell in a DynamicType column is retrieved.
        * @event getCellValue
        * @type {EventDispatcher}
        * @property {Grid} sender
        * @property {CellResolveEventArgs} args
        */
        get getCellValue(): EventDispatcher<any>;
        /**
        * Raised when the data type of a cell in a DynamicType column has to be resolved.
        * @event resolveCellDataType
        * @type {EventDispatcher}
        * @property {Grid} sender
        * @property {CellResolveEventArgs} args
        */
        get resolveCellMetaData(): EventDispatcher<any>;
        /**
        * Raised when the value of a cell in a DynamicType column has to be formatted.
        * @event formatCellValue
        * @type {EventDispatcher}
        * @property {Grid} sender
        * @property {CellResolveEventArgs} args
        */
        get formatCellValue(): EventDispatcher<any>;
        /**
        * Raised when an expander button is clicked
        * @private
        */
        private get objectButtonClick();
    }
    import { UIControl } from "DataViews/jsdv/src/UIControl";
    import { Unit } from "@mindfusion/common";
    import ProxyModel from "DataViews/jsdv/src/ProxyModel";
    import Selection from "DataViews/jsdv/src/Selection";
    import { EventDispatcher } from "@mindfusion/common";
    import { GridModel } from "DataViews/jsdv/src/GridModel";
    import { GridCell } from "DataViews/jsdv/src/GridCell";
}
declare module "DataViews/jsdv/src/GridColumn" {
    /**
    * @class Represents a column in a grid control.
    */
    export class GridColumn {
        /**
         * Initializes a new instance of the GridColumn class.
         * @constructor
         * @param {String} [name] The name of the field, displayed in the column.
         * @param {DataType} [dataType] The type of the column.
         * @param {Boolean} [editable] A value indicating whether the cells in this column can be edited.
         */
        constructor(name?: string, dataType?: any, editable?: boolean);
        _name: string;
        _dataType: any;
        _metaData: Map<any, any>;
        _editable: boolean;
        _sortable: boolean;
        _hidden: boolean;
        set name(arg: string);
        /**
        * Gets or sets the name of the field, displayed in the column.
        * @type {String}
        * @summary The field name.
        */
        get name(): string;
        set dataType(arg: any);
        /**
        * Gets or sets the type of this column.
        * @type {DataType}
        * @summary The type.
        */
        get dataType(): any;
        set metaData(arg: Map<any, any>);
        /**
        * Gets or sets the metadata, associated with this column.
        * @type {Map}
        * @summary The metadata.
        */
        get metaData(): Map<any, any>;
        set caption(arg: string);
        /**
        * Gets or sets the text, diplayed in the header of this column.
        * @type {String}
        * @summary The display text.
        */
        get caption(): string;
        _caption: string;
        set editable(arg: boolean);
        /**
        * Gets or sets a value, indicating whether the cells in this column can be edited.
        * @type {Boolean}
        * @summary True if the cells in this column can be edited, otherwise false.
        */
        get editable(): boolean;
        set sortable(arg: boolean);
        /**
        * Gets or sets a value, indicating whether this column can be sorted.
        * @type {Boolean}
        * @summary True if the column can be sorted, otherwise false.
        */
        get sortable(): boolean;
        set hidden(arg: boolean);
        /**
        * Gets or sets a value, indicating whether this column is hidden.
        * @type {Boolean}
        * @summary True if the column is hidden, otherwise false.
        */
        get hidden(): boolean;
    }
}
declare module "DataViews/jsdv/src/PropertyGridModel" {
    /**
    * @class Represents the grid model of the PropertyGrid control.
    * @private
    */
    export class PropertyGridModel extends ArrayModel {
        /**
         * Initializes a new instance of the PropertyGridModel class.
         * @constructor
         * @param {Array} values The array to use as a backing store.
         * @param {Map} meta The meta data dictionary.
         */
        constructor(values: any[], meta: Map<any, any>);
    }
    import { ArrayModel } from "DataViews/jsdv/src/ArrayModel";
}
declare module "DataViews/jsdv/src/CollectionType" {
    /**
    * @class Provides functionality for grid cells, that display collection objects.
    */
    export class CollectionType extends ObjectType {
        static format(value: any, meta: any): string;
    }
    import { ObjectType } from "DataViews/jsdv/src/ObjectType";
}
declare module "DataViews/jsdv/src/PropertyGridContent" {
    /**
    * @class Represents a content grid in a PropertyGrid control.
    * @augments UIControl
    * @private
    */
    export class PropertyGridContent extends UIControl {
        /**
         * Initializes a new instance of the PropertyGridContent class.
         * @constructor
         * @param {Object} obj The object whose properties will be shown in the grid.
         */
        constructor(obj: any);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _selectedObject: any;
        _model: any;
        _proxyModel: ProxyModel;
        _metaData: Map<any, any>;
        _excludedProperties: string[];
        _allowEdit: boolean;
        _allowCellSelect: boolean;
        _allowScroll: boolean;
        _filter: any;
        _sortedColumn: number;
        _sortAscending: boolean;
        renderer: GridRenderer;
        _scrollRow: number;
        _columnWidths: any[];
        _rowHeaderWidth: number;
        _focusedCell: any;
        _activeEditor: any;
        _tableShouldFocus: boolean;
        _searchString: string;
        _scrollBarSize: number;
        selection: Selection;
        queuedEvents: any[];
        _expandObject: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _columnSorted: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _groupingChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowLoading: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowRendered: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowExpanding: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowExpanded: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowCreating: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowCreated: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowDeleting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowDeleted: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowUpdating: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowUpdated: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowSelecting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowSelected: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellSelecting: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellSelected: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellFocusing: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _cellFocused: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        scrollHandler: (e: any) => boolean;
        mouseWheelHandler: (e: any) => void;
        get wrapper(): Element;
        /**
        * Returns a reference to the grid header DOM element.
        * @type {HTMLDivElement} The header element.
        */
        get header(): HTMLDivElement;
        /**
        * Returns a reference to the grid data table DOM element.
        * @returns {HTMLDivElement} The data table element.
        */
        get dataTable(): HTMLDivElement;
        /**
        * Returns the array of DOM elements of the visible rows.
        * @returns {Array} An array of row DOM elements.
        * @private
        */
        private get visibleRows();
        /**
        * Returns the array of DOM elements of the visible cells.
        * @returns {Array} A two-dimensional array of cell DOM elements.
        * @private
        */
        private get visibleCells();
        rowHeaderMouseDown(e: any): void;
        set focusedCell(arg: GridCell);
        /**
        * Gets the active grid cell.
        * @type {GridCell}
        * @summary the cell.
        */
        get focusedCell(): GridCell;
        scroll: Element;
        resizeHandler: (e: any) => void;
        /**
        * Called before the grid contents are rendered by the current renderer.
        * @private
        */
        private onBeforeRender;
        /**
        * Called after the grid contents are rendered by the current renderer.
        * @private
        */
        private onAfterRender;
        rowsCount: number;
        rowHeight: number;
        /**
        * Repaints the grid contents.
        * @param {Boolean} [selected] True to repaint only the selected rows.
        */
        refresh(selected?: boolean): Promise<any>;
        /**
        * Sets the focus to the cell at the specified position.
        * @param {Number} row The cell row.
        * @param {Number} column The cell column.
        * @param {Boolean} [moveBackwards] True to move backwards.
        * @remarks If the cell at the specified position is not editable, the focus is set
        * to the next editable cell, if such exists.
        */
        focusCell(row: number, column: number, moveBackwards?: boolean): void;
        /**
        * Selects the cell at the specified position.
        * @param {Number} row The cell row.
        * @param {Number} column The cell column.
        */
        selectCell(row: number, column: number): void;
        /**
        * Selects the rows in the specified range.
        * @param {Number} index The start index of the range to select.
        * @param {Number} [count] The length of the range.
        */
        selectRows(index: number, count?: number): void;
        /**
        * Gets the indices of selected rows.
        * @returns {Array} An array of indices.
        */
        get selectedRowIndices(): any[];
        /**
        * Gets the selected cells.
        * @type {Array}
        * @summary An array of GridCell instances.
        */
        get selectedCells(): any[];
        /**
        * Invalidates the current renderer.
        * @private
        */
        private invalidateDom;
        /**
        * Repaints a range of rows.
        * @param {Number} index The start index of the row range to repaint.
        * @param {Number} [count] The length of the range.
        */
        refreshRows(index: number, count?: number): Promise<any>;
        addRow(): void;
        removeRowRange(index: any, count: any): void;
        scrollRangeInvalid: boolean;
        /**
        * Sorts by the specified column and sort direction.
        * @param {Number} index The index of the column to sort by, or null to clear the sorting.
        * @param {Boolean} [sortAscending] True to sort ascending, otherwise false.
        */
        sortByColumn(index: number, sortAscending?: boolean): void;
        set sortedColumn(arg: number);
        /**
         * Gets or sets the index of the column, by which the data is sorted.
         * @type {Number}
         * @summary The column index, or -1 if no sorting is applied to the grid.
         */
        get sortedColumn(): number;
        set sortAscending(arg: boolean);
        /**
         * Gets or sets a value, indicating whether the sorting is in Ascending order.
         * @type {Boolean}
         * @summary True if the sorting is in Ascending order, otherwise false.
         */
        get sortAscending(): boolean;
        /**
        * Groups by the specified column.
        * @param {Number} index The index of the column to group by, or null to clear the grouping.
        */
        groupByColumn(index: number): void;
        private set groupColumn(arg);
        /**
         * Gets the index of the column, by which the data is grouped.
         * @returns {Number} The column index, or -1 if no grouping is applied to the grid.
         * @private
         */
        private get groupColumn();
        /**
        * Calculates the scroll fix amount.
        * @private
        */
        private calcScrollFix;
        scrollFixAmount: number;
        /**
         * Updates the scroll range based on current rows count and height.
         * @private
         */
        private updateScrollRange;
        scrollIncrement: number;
        /**
        * Sets equal column widths in pixels based on flex calculations.
        * @private
        */
        private initColumnWidths;
        /**
         * For internal use only.
         * @private
         */
        private resizeColumn;
        set model(arg: any);
        /**
         * Gets or sets the effective data model of this grid.
         * @type {GridModel}
         * @summary The model.
         */
        get model(): any;
        getAllPropertyDescriptors(obj: any): any;
        set selectedObject(arg: any);
        get selectedObject(): any;
        generateData(values: any): void;
        /**
        * Sets the metadata, associated with this grid.
        * @param {Map} value The metadata.
        */
        set metaData(arg: Map<any, any>);
        /**
        * Gets the metadata, associated with this grid.
        * @returns {Map} The metadata.
        */
        get metaData(): Map<any, any>;
        /**
        * Gets a value indicating whether to enumerate the properties that don't have setters.
        * @type {Boolean}
        * @summary True to enumerate read-only properties, otherwise false.
        */
        get showAllProperties(): boolean;
        /**
        * Gets a value indicating whether to enumerate the properties that don't have setters.
        * @type {Boolean}
        * @summary True to enumerate read-only properties, otherwise false.
        */
        get showReadonlyProperties(): boolean;
        /**
        * Gets a value indicating whether properties that don't have setters can be edited.
        * @type {Boolean}
        * @summary True if read-only properties can be edited, otherwise false.
        */
        get editReadonlyProperties(): boolean;
        /**
         * Refreshes the grid after external modifications to the grid model.
         */
        rebind(): void;
        set scrollRow(arg: number);
        /**
        * Gets or sets the index of the first visible row.
        * @type {Number}
        * @summary The row index.
        */
        get scrollRow(): number;
        get effectiveModel(): any;
        ensureProxyModel(): void;
        set allowEdit(arg: boolean);
        /**
         * Gets or sets a value, indicating whether inplace editing is enabled.
         * @type {Boolean}
         * @summary True if inplace editing is enabled, otherwise false.
         */
        get allowEdit(): boolean;
        set allowCellSelect(arg: boolean);
        /**
         * Gets or sets a value, indicating whether single cell selection is enabled.
         * @type {Boolean}
         * @summary True if single cell selection is enabled, otherwise false.
         */
        get allowCellSelect(): boolean;
        set allowScroll(arg: boolean);
        /**
         * Gets or sets a value, indicating whether scrolling is enabled.
         * @type {Boolean}
         * @summary True if inplace scrolling is enabled, otherwise false.
         */
        get allowScroll(): boolean;
        set filter(arg: any);
        get filter(): any;
        _groupColumn: any;
        onScroll(e: any): boolean;
        headerMouseOver(e: any): void;
        headerMouseLeave(e: any): void;
        columnHeaderMouseDown(e: any): void;
        rowHeaderContextMenu(e: any, selection: any): void;
        contextMenu: import("@mindfusion/common-ui").Menu;
        contextMenuCallback(item: any): void;
        /**
          * Disposes the current context menu.
          */
        disposeContextMenu(): void;
        tableKeyDown(e: any): void;
        _clearSearchTimeout: number;
        autoSearch(searchString: any): void;
        tableKeyUp(e: any): void;
        tableCellClicked(e: any): void;
        getNextFocusableRow(row: any, back: any): any;
        /**
         * Gets the cell at the provided coordinates, if it is focusable, or the nearest focusable cell in the specified direction.
         * @param {Number} row The cell row.
         * @param {Number} column The cell column.
         * @param {Boolean} back True to search backwards.
         * @private
         */
        private getFocusableCell;
        moveFocusedCell(row: any, column: any, back: any): void;
        moveFocusedCellLeft(): void;
        moveFocusedCellRight(): void;
        get focusedItem(): GridCell | {
            row: any;
            column: number;
        };
        get firstFocusableColumn(): number;
        get lastFocusableColumn(): number;
        /**
         * Gets the DOM element of the cell in the specified coordinates.
         * @param {Number} row The cell row.
         * @param {Number} column The cell column.
         * @returns {HTMLDivElement} the cell's DOM element.
         */
        getCellElement(row: number, column: number): HTMLDivElement;
        /**
         * Gets the DOM element of the specified row.
         * @param {Number} row The row index.
         * @returns {HTMLDivElement} the row's DOM element.
         */
        getRowElement(row: number): HTMLDivElement;
        /**
         * Checks if the row at the specified index is currently visible.
         * @param {Number} row The row index.
         * @returns {Boolean} True if the row is visible, otherwise false.
         */
        isRowVisible(row: number): boolean;
        isCellVisible(row: any, column: any): boolean;
        /**
        * Scrolls to the specified row.
        * @param {Number} row The row.
        * @private
        */
        private bringRowIntoView;
        isRepainting: boolean;
        /**
        * Ensures that the specified row is visible.
        * @param {Number} row The row.
        */
        bringIntoView(row: number): Promise<any>;
        /**
        * Applies an additional translate transform to the data table when scrolling
        * to the first or last row, if the row is partly visible.
        * @param {Number} row The relative row index.
        * @private
        */
        private scrollFix;
        /**
        * Checks if the row at the specified index is a group row.
        * @param {Number} row The row index.
        * @private
        */
        private isGroupRow;
        /**
        * Scrolls to the specified row.
        * @param {Number} row The row index.
        * @private
        */
        private scrollToRow;
        /**
        * Disposes the active grid cell editor.
        */
        disposeActiveEditor(): void;
        set activeEditor(arg: any);
        /**
        * Gets the active editor.
        * @type {Object}
        * @summary The editor.
        */
        get activeEditor(): any;
        /**
        * Gets the index of the last grid row.
        * @private
        */
        private get lastRowIndex();
        /**
        * Gets the height of rows viewport.
        * @type {Number}
        * @summary The height.
        * @private
        */
        private get contentHeight();
        /**
        * Gets the height of rows viewport minus the horizontal scrollbar height.
        * @type {Number}
        * @summary The height.
        * @private
        */
        private get contentClientHeight();
        get parent(): any;
        /**
         * Gets the width of the specified grid column.
         * @param {Number} column The column index.
         * @returns {Number} The width in pixels.
         */
        getColumnWidth(column: number): number;
        /**
         * Sets the width of the first grid column.
         * @param {Number} width The width in pixels.
         */
        setColumnWidth(width: number): void;
        /**
         * Sets selected rows after raising selection events.
         * @private
         */
        private setRowSelection;
        /**
         * Gets the row with the specified key.
         * @param {Object} key The key.
         * @returns {Number} The row index.
         */
        getKeyRow(key: any): number;
        /**
         * Gets the key of the row at the specified index.
        * @param {Number} index The row index.
        * @returns {Object} The row key.
        */
        getRowKey(index: number): any;
        /**
        * Recalculates grid's dimensions.
        * @remarks Use this method to recalculate the grid's dimensions after resizing.
        */
        adjust(): void;
        /**
        * For internal use only.
        * @private
        */
        private onResize;
        onMouseWheel(e: any): void;
        timeStamp: number;
        /**
        * Raises the corresponding validation event when a row action is performed.
        * @private
        */
        private onRowValidateAction;
        /**
        * Raises the corresponding notification event after a row action is performed.
        * @private
        */
        private onRowAction;
        onCellAction(row: any, column: any): void;
        /**
          * Raised when a column is sorted.
          * @event columnSorted
          * @type {EventDispatcher}
          * @property {PropertyGridContent} sender
          * @property {Object} args
          */
        get columnSorted(): EventDispatcher<any>;
        /**
          * Raised when a column is sorted.
          * @event groupingChanged
          * @type {EventDispatcher}
          * @property {PropertyGridContent} sender
          * @property {Object} args
          */
        get groupingChanged(): EventDispatcher<any>;
        /**
         * Raised when a row data is loading.
         * @event rowLoading
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowLoading(): EventDispatcher<any>;
        /**
         * Raised when a row is rendered.
         * @event rowRendered
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowRendered(): EventDispatcher<any>;
        /**
         * Raised before a row is selected.
         * @event rowSelecting
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowSelecting(): EventDispatcher<any>;
        /**
         * Raised when a row is selected.
         * @event rowSelected
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowSelected(): EventDispatcher<any>;
        /**
         * Raised before a row is expanded.
         * @event rowExpanding
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowExpanding(): EventDispatcher<any>;
        /**
         * Raised when a row is expanded.
         * @event rowExpanded
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowExpanded(): EventDispatcher<any>;
        /**
         * Raised before a new row is created.
         * @event rowCreating
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowCreating(): EventDispatcher<any>;
        /**
         * Raised when a new row is created.
         * @event rowCreated
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowCreated(): EventDispatcher<any>;
        /**
         * Raised before a row is deleted.
         * @event rowDeleting
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowDeleting(): EventDispatcher<any>;
        /**
         * Raised when a row is deleted.
         * @event rowDeleted
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowDeleted(): EventDispatcher<any>;
        /**
         * Raised before a row is updated.
         * @event rowUpdating
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifyingEventArgs} args
         */
        get rowUpdating(): EventDispatcher<any>;
        /**
         * Raised when a row is updated.
         * @event rowUpdated
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {RowModifiedEventArgs} args
         */
        get rowUpdated(): EventDispatcher<any>;
        /**
         * Raised before a cell is selected.
         * @event cellSelecting
         * @type {EventDispatcher}
         * @property {PropertyGridContent} sender
         * @property {CellEventArgs} args
         */
        get cellSelecting(): EventDispatcher<any>;
        /**
        * Raises the onCellSelecting event.
        * @private
        */
        private onCellSelecting;
        /**
         * Raised when a cell is selected.
         * @event cellSelected
         * @type {EventDispatcher}
         * @property {Grid} sender
         * @property {CellEventArgs} args
         */
        get cellSelected(): EventDispatcher<any>;
        /**
        * Raises the cellSelected event.
        * @private
        */
        private onCellSelected;
        onCellFocusing(cell: any): boolean;
        onCellFocused(): void;
        onRowRender(row: any): void;
        cellReadonly(row: any, column: any): boolean;
        onCustomDrawHeader(row: any, column: any, defaultContent: any): any;
        onCustomDrawCell(row: any, column: any, defaultContent: any): any;
    }
    import { UIControl } from "DataViews/jsdv/src/UIControl";
    import { Unit } from "@mindfusion/common";
    import ProxyModel from "DataViews/jsdv/src/ProxyModel";
    import GridRenderer from "DataViews/jsdv/src/GridRenderer";
    import Selection from "DataViews/jsdv/src/Selection";
    import { EventDispatcher } from "@mindfusion/common";
    import { GridCell } from "DataViews/jsdv/src/GridCell";
}
declare module "DataViews/jsdv/src/PropertyGridPage" {
    /**
    * @class Represents a page in a PropertyGrid control.
    * @augments ListItem
    * @private
    */
    export class PropertyGridPage extends ListItem {
        /**
         * Initializes a new instance of the PropertyGridPage class.
         * @constructor
         * @param {String} propertyName The property name.
         * @param {Number} index The index of the oject within its collection.
         * @param {Object} obj The object which properties will be shown in the page.
         * @param {Map} meta The meta data dictionary, associated with this object.
         * @param {Boolean} main Indicates whether this page is the control's main page.
         */
        constructor(propertyName: string, index: number, obj: any, meta: Map<any, any>, main: boolean);
        _propertyName: string;
        _propertyIndex: number;
        _selectedObject: any;
        _mainPage: boolean;
        _collectionPage: boolean;
        content: PropertyGridContent;
        headers: ToolStripItem[];
        footers: ToolStripItem[];
    }
    import { ListItem } from "@mindfusion/common-ui";
    import { PropertyGridContent } from "DataViews/jsdv/src/PropertyGridContent";
    import { ToolStripItem } from "@mindfusion/common-ui";
}
declare module "DataViews/jsdv/src/PropertyGrid" {
    /**
    * @class Provides a user interface for browsing and editing the properties of an object.
    * @augments UIControl
    */
    export class PropertyGrid extends UIControl {
        /**
         * Initializes a new instance of the PropertyGrid class.
         * @constructor
         * @param {HTMLDivElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLDivElement);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        header: ToolStrip;
        footer: ToolStrip;
        _metaData: Map<any, any>;
        _sortAscending: boolean;
        _grouped: boolean;
        _showAllProperties: boolean;
        _showReadonlyProperties: boolean;
        _editReadonlyProperties: boolean;
        _defaultCategoryName: string;
        _currentProperty: string;
        _currentIndex: number;
        _rowLoading: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _rowRendered: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _currentObjectChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _currentObjectChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _propertyValueChanging: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _propertyValueChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _resolveCellDataType: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _formatCellValue: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        _headerButtonClick: (sender: any, args: any) => void;
        _footerButtonClick: (sender: any, args: any) => void;
        _rowValidateActionHandler: (sender: any, args: any) => void;
        _rowActionHandler: (sender: any, args: any) => void;
        _cellSelectHandler: (sender: any, args: any) => void;
        _sortedHandler: (sender: any, args: any) => void;
        getContent(): any;
        beforeAddItem(item: any, index: any): void;
        /**
          * ListContainer.detachItem override.
          * @private
          */
        private detachItem;
        /**
        * ListContainer.attachItem override.
        * @private
        */
        private attachItem;
        /**
        * ListContainer.addItem override.
        * @private
        */
        private addItem;
        private set selectedItem(arg);
        /**
        * Gets or sets the current PropertyGridPage.
        * @type {PropertyGridPage}
        * @private
        */
        private get selectedItem();
        /**
        * ListContainer.removeItem override.
        * @private
        */
        private removeItem;
        /**
        * @private
        */
        private getTabToSelect;
        /**
        * Refreshes the grid after external modifications to the selected object.
        */
        rebind(): void;
        /**
        * Expands the specified property.
        * @param {String} propertyName The name of the property to expand.
        * @param {Number} [index] The index of the object, if that object is within a collection property.
        * @remarks Expands a property of the currently selected object.
        */
        expandProperty(propertyName: string, index?: number): Promise<any>;
        /**
        * Collapses the specified property.
        * @param {String} propertyName The name of the property to collapse.
        * @param {Number} [index] The index of the object, if that object is within a collection property.
        * @remarks Collapses a property of the currently selected object.
        */
        collapseProperty(propertyName: string, index?: number): void;
        /**
        * Closes the specified page.
        * @private
        */
        private closeItem;
        set selectedObject(arg: any);
        /**
        * Gets or sets the object whose properties can be edited by this control.
        * @type {Object}
        * @summary The object to edit.
        */
        get selectedObject(): any;
        _selectedObject: any;
        /**
        * Gets the object whose properties are currently displayed by this control.
        * @type {Object}
        * @summary The object whose properties are currently displayed.
        */
        get currentObject(): any;
        /**
        * Gets the name of the selected property.
        * @type {String}
        * @summary The selected property name.
        */
        get currentProperty(): string;
        /**
        * Gets the index of the currently selected object, if that object is within a collection property.
        * @type {Number}
        * @summary The index of the current object within the collection, or -1.
        */
        get currentIndex(): number;
        set metaData(arg: Map<any, any>);
        /**
        * Gets or sets the meta data dictionary, associated with this control.
        * @type {Map}
        * @summary The meta data dictionary.
        */
        get metaData(): Map<any, any>;
        set showAllProperties(arg: boolean);
        /**
        * Gets or sets a value indicating whether to enumerate the properties, that are not included in the meta data dictionary.
        * @type {Boolean}
        * @summary True to enumerate all properties, otherwise false.
        */
        get showAllProperties(): boolean;
        set showReadonlyProperties(arg: boolean);
        /**
        * Gets or sets a value indicating whether to enumerate the properties that don't have setters.
        * @type {Boolean}
        * @summary True to enumerate read-only properties, otherwise false.
        */
        get showReadonlyProperties(): boolean;
        set editReadonlyProperties(arg: boolean);
        /**
        * Gets or sets a value indicating whether properties that don't have setters can be edited.
        * @type {Boolean}
        * @summary True if read-only properties can be edited, otherwise false.
        */
        get editReadonlyProperties(): boolean;
        set allowEdit(arg: boolean);
        /**
         * Gets or sets a value, indicating whether inplace editing is enabled.
         * @type {Boolean}
         * @summary True if inplace editing is enabled, otherwise false.
         */
        get allowEdit(): boolean;
        _allowEdit: any;
        set allowCellSelect(arg: boolean);
        /**
         * Gets or sets a value, indicating whether single cell selection is enabled.
         * @type {Boolean}
         * @summary True if single cell selection is enabled, otherwise false.
         */
        get allowCellSelect(): boolean;
        _allowCellSelect: any;
        set allowScroll(arg: boolean);
        /**
         * Gets or sets a value, indicating whether scrolling is enabled.
         * @type {Boolean}
         * @summary True if scrolling is enabled, otherwise false.
         */
        get allowScroll(): boolean;
        _allowScroll: any;
        _selectedItem: PropertyGridPage;
        set allowDrag(arg: boolean);
        /**
        * ListContainer.allowDrag override.
        * @type {Boolean}
        * @summary false - not applicable.
        */
        get allowDrag(): boolean;
        set allowDrop(arg: boolean);
        /**
        * ListContainer.allowDrop override.
        * @type {Boolean}
        * @summary false - not applicable.
        */
        get allowDrop(): boolean;
        set acceptDrop(arg: any);
        /**
        * ListContainer.acceptDrop override.
        * @type {ListItem}
        * @summary null - not applicable.
        */
        get acceptDrop(): any;
        /**
         * Raised when a row data is loading.
         * @event rowLoading
         * @type {EventDispatcher}
         * @property {PropertyGrid} sender
         * @property {PropertyEventArgs} args
         */
        get rowLoading(): EventDispatcher<any>;
        /**
         * Raised when a row is rendered.
         * @event rowRendered
         * @type {EventDispatcher}
         * @property {PropertyGrid} sender
         * @property {PropertyEventArgs} args
         */
        get rowRendered(): EventDispatcher<any>;
        /**
         * Raised when the current object is changing.
         * @event currentObjectChanging
         * @type {EventDispatcher}
         * @property {PropertyGrid} sender
         * @property {PropertyEventArgs} args
         */
        get currentObjectChanging(): EventDispatcher<any>;
        /**
          * Raised when the current object is changed.
         * @event currentObjectChanged
         * @type {EventDispatcher}
         * @property {PropertyGrid} sender
         * @property {PropertyEventArgs} args
         */
        get currentObjectChanged(): EventDispatcher<any>;
        /**
          * Raised when a property value is changing.
          * @event propertyValueChanging
          * @type {EventDispatcher}
          * @property {PropertyGrid} sender
          * @property {PropertyEventArgs} args
          */
        get propertyValueChanging(): EventDispatcher<any>;
        /**
         * Raised when a property value is changed.
         * @event propertyValueChanged
         * @type {EventDispatcher}
         * @property {PropertyGrid} sender
         * @property {PropertyEventArgs} args
         */
        get propertyValueChanged(): EventDispatcher<any>;
        /**
        * Handles the click event in the header toolstrip.
        * @private
        */
        private onHeaderButtonClick;
        /**
        * Handles the click event in the footer toolstrip.
        * @private
        */
        private onFooterButtonClick;
        /**
        * Handles a validating row action event in the grid.
        * @private
        */
        private onRowValidateAction;
        /**
        * Handles a row action event in the grid.
        * @private
        */
        private onRowAction;
        /**
        * Handles a cell select event in the grid.
        * @private
        */
        private onCellSelect;
        onSort(sender: any, args: any): void;
        /**
        * onItemsChanging override.
        * @protected
        */
        protected onItemsChanging(sender: any, args: any): void;
    }
    import { UIControl } from "DataViews/jsdv/src/UIControl";
    import { Unit } from "@mindfusion/common";
    import { ToolStrip } from "@mindfusion/common-ui";
    import { EventDispatcher } from "@mindfusion/common";
    import { PropertyGridPage } from "DataViews/jsdv/src/PropertyGridPage";
}
declare module "@mindfusion/dataviews" {
    export { ArrayModel } from "DataViews/jsdv/src/ArrayModel";
    export { Command } from "DataViews/jsdv/src/Command";
    export { CommandType } from "DataViews/jsdv/src/CommandType";
    export { CurrencyType } from "DataViews/jsdv/src/CurrencyType";
    export { DateTimeType } from "DataViews/jsdv/src/DateTimeType";
    export { DateType } from "DataViews/jsdv/src/DateType";
    export { DeleteCommand } from "DataViews/jsdv/src/DeleteCommand";
    export { DomRenderer } from "DataViews/jsdv/src/DomRenderer";
    import { RowAction } from "DataViews/jsdv/src/Enum";
    import { CellCustomDrawEventArgs, CellEventArgs, CellValidateEventArgs, CommandEventArgs, RowModifiedEventArgs, RowModifyingEventArgs } from "DataViews/jsdv/src/EventArgs";
    export { RowAction, CellCustomDrawEventArgs, CellEventArgs, CellValidateEventArgs, CommandEventArgs, RowModifiedEventArgs, RowModifyingEventArgs };
    export { Grid } from "DataViews/jsdv/src/Grid";
    export { GridCell } from "DataViews/jsdv/src/GridCell";
    export { GridColumn } from "DataViews/jsdv/src/GridColumn";
    export { GridModel } from "DataViews/jsdv/src/GridModel";
    export { ImageType } from "DataViews/jsdv/src/ImageType";
    export { IntegerType } from "DataViews/jsdv/src/IntegerType";
    export { LookupType } from "DataViews/jsdv/src/LookupType";
    export { RealNumberType } from "DataViews/jsdv/src/RealNumberType";
    export { StringType } from "DataViews/jsdv/src/StringType";
    export { UIControl } from "DataViews/jsdv/src/UIControl";
    export { PropertyGrid } from "DataViews/jsdv/src/PropertyGrid";
    export { DynamicType } from "DataViews/jsdv/src/DynamicType";
    export { BooleanType } from "DataViews/jsdv/src/BooleanType";
    export { ObjectType } from "DataViews/jsdv/src/ObjectType";
    export { CollectionType } from "DataViews/jsdv/src/CollectionType";
}
