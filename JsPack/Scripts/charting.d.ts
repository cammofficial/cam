/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/common-collections" />
/// <reference types="../../@mindfusion/common" />
/// <reference types="../../@mindfusion/drawing" />
/// <reference types="../../@mindfusion/gauges" />
declare module "Charting/Commands/UndoEventArgs" {
    /**
    * @namespace MindFusion.Charting.Commands
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
    import { Command } from "Charting/Commands/Command";
    /**
     * @class Contains the arguments passed to the ActionUndone and ActionRedone event handlers.
     */
    export class UndoEventArgs extends EventArgs {
        /**
         * Initializes a new instance of the UndoEventArgs class.
         * @param {Command} command The Command related to the event.
         */
        constructor(command: Command);
        /**
         * Gets a reference to the Command instance related to the event being handled.
         */
        get command(): Command;
        /**
         * Gets a reference to the Command instance related to the event being handled.
         */
        set command(value: Command);
        private m_command;
    }
}
declare module "Charting/Commands/DisposableCommand" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Command } from "Charting/Commands/Command";
    import { UndoManager } from "Charting/Commands/UndoManager";
    /**
     * @class Represents a command that implements the IDisposable interface.
     */
    export abstract class DisposableCommand extends Command {
        /**
         * Initializes a new instance of the DisposableCommand class.
         * @param {UndoManager} manager The UndoManager that contains this command.
         */
        constructor(manager: UndoManager);
        /**
         * IDisposable.Dispose implementation.
         */
        dispose(): void;
        /**
         * Disposes of this command.
         */
        clean(): void;
        /**
         * Command.Execute override.
         */
        execute(): boolean;
        /**
         * Cancels the command.
         */
        cancel(): void;
        /**
         * Command.Undo override.
         */
        undo(): void;
        /**
         * Command.Redo override.
         */
        redo(): void;
        get executed(): boolean;
        set executed(value: boolean);
        private m_executed;
        private undone;
    }
}
declare module "Charting/Commands/CompositeCommand" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { List } from '@mindfusion/common-collections';
    import { Command } from "Charting/Commands/Command";
    import { DisposableCommand } from "Charting/Commands/DisposableCommand";
    import { UndoManager } from "Charting/Commands/UndoManager";
    /**
     * @class Represents a set of Command instances as a single operation.
     * Undoing or redoing the composite action, respectively undoes or
     * redoes all its constituent subactions at the same time.
     */
    export class CompositeCommand extends DisposableCommand {
        /**
         * Initializes a new instance of the CompositeCommand class.
         * @param {UndoManager} manager The UndoManager that contains this command.
         */
        constructor(manager: UndoManager);
        /**
         * DisposableCommand.Execute override.
         */
        execute(): boolean;
        /**
         * Command.Undo override.
         */
        undo(): void;
        /**
         * Command.Redo override.
         */
        redo(): void;
        /**
         * Gets a list containing the child Command objects.
         */
        get commands(): List<Command>;
        private m_commands;
    }
}
declare module "Charting/Commands/ObjectChange" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export abstract class ObjectChange {
        abstract apply(): void;
        abstract revert(): void;
    }
}
declare module "Charting/Commands/PropertyChange" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { ObjectChange } from "Charting/Commands/ObjectChange";
    export class PropertyChange extends ObjectChange {
        constructor(target: Object, propertyName: string, oldValue: Object, newValue: Object);
        apply(): void;
        revert(): void;
        private target;
        private propertyName;
        private oldValue;
        private newValue;
    }
}
declare module "Charting/Commands/TrackChangesCommand" {
    import { INotifyPropertyValueChanged } from '@mindfusion/common';
    import { ObjectChange } from "Charting/Commands/ObjectChange";
    import { UndoManager } from "Charting/Commands/UndoManager";
    import { DisposableCommand } from "Charting/Commands/DisposableCommand";
    /**
     * @class Represents a command that can track and undo changes of
     * INotifyPropertyValueChanged objects.
     */
    export class TrackChangesCommand extends DisposableCommand {
        constructor(manager: UndoManager, target: INotifyPropertyValueChanged);
        clean(): void;
        private onPropertyValueChanged;
        registerChange(change: ObjectChange): void;
        /**
         * DisposableCommand.Undo override.
         */
        undo(): void;
        /**
         * DisposableCommand.Redo override.
         */
        redo(): void;
        /**
         * Called before undoing or redoing the command.
         */
        beginChange(): void;
        /**
         * Called after undoing or redoing the command.
         */
        endChange(): void;
        /**
         * Command.HasEffect override.
         */
        get hasEffect(): boolean;
        private target;
        private changes;
    }
    export interface ISupportInitialize {
        beginInit(): void;
        endInit(): void;
    }
}
declare module "Charting/Commands/UndoManager" {
    import { EventDispatcher } from '@mindfusion/common';
    import { Command } from "Charting/Commands/Command";
    import { UndoEventArgs } from "Charting/Commands/UndoEventArgs";
    import { CompositeCommand } from "Charting/Commands/CompositeCommand";
    import { TrackChangesCommand } from "Charting/Commands/TrackChangesCommand";
    export class UndoManager {
        constructor();
        executeCommand(command: Command): void;
        private addToHistory;
        startComposite(): CompositeCommand;
        endComposite(addToHistory?: boolean): void;
        /**
         * Creates a Command object to track subsequent changes on the specified target.
         * @param {INotifyPropertyValueChanged} target The object to track.
         * @returns {TrackChangesCommand} A TrackChangesCommand that is used to track the changes, or null, if undo is disabled.
         *
         */
        startChangeOperation(target: any): TrackChangesCommand;
        /**
         * Stops tracking changes by the specified command and reverts all changes done so far.
         */
        cancelChangeOperation(command: TrackChangesCommand): void;
        /**
         * Stops tracking changes by the specified command and saves the command in the history queue.
         */
        commitChangeOperation(command: TrackChangesCommand): void;
        undo(): void;
        redo(): void;
        raiseActionUndone(c: Command): void;
        raiseActionRedone(c: Command): void;
        onActionUndone(e: UndoEventArgs): void;
        onActionRedone(e: UndoEventArgs): void;
        get canUndo(): boolean;
        get canRedo(): boolean;
        get actionRedone(): EventDispatcher<UndoEventArgs>;
        get actionUndone(): EventDispatcher<UndoEventArgs>;
        private m_actionRedone;
        private m_actionUndone;
        private history;
        private undoIndex;
        private currentComposite;
        private startCompositeCounter;
    }
}
declare module "Charting/Commands/Command" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { UndoManager } from "Charting/Commands/UndoManager";
    /**
     * @class Represents an action that modifies an object and whose effects can be undone.
     */
    export abstract class Command {
        /**
         * Initializes a new instance of the Command class.
         * @param {UndoManager} manager The UndoManager that contains this command.
         */
        constructor(manager: UndoManager);
        /**
         * A shortcut method for executing the command through the undo engine.
         */
        commit(): void;
        /**
         * Carries out an action that changes the workbook in some way.
         */
        abstract execute(): boolean;
        /**
         * Undoes an action, restoring the workbook to the state it was in
         * before carrying out the action.
         */
        abstract undo(): void;
        /**
         * Repeats an action that has been undone.
         */
        abstract redo(): void;
        /**
         * Gets the UndoManager that contains this command.
         */
        get manager(): UndoManager;
        /**
         * Sets the UndoManager that contains this command.
         */
        set manager(value: UndoManager);
        private m_manager;
        /**
         * Gets a value indicating whether the command does anything.
         */
        get hasEffect(): boolean;
    }
}
declare module "Charting/Commands/Commands" {
    /**
    * @namespace MindFusion.Charting.Commands
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export { Command } from "Charting/Commands/Command";
}
declare module "Charting/Components/AutoSize" {
    /**
    * @namespace MindFusion.Charting.Components
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export interface AutoSize {
        measuredSize(): number;
        relativeSize(): boolean;
        setPos(value: number): void;
    }
}
declare module "Charting/Gauges/GaugeRenderer" {
    import * as Drawing from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    /**
     * @class A Component that renders gauges in the dashboard.
     * @property {Drawing.Brush} background Gets or sets a Brush used to draw the background of this gauge.
     * @property {Drawing.Brush} stroke Gets or sets a Brush used to stroke this gauge.
     * @property {Number} strokeThickness Gets or sets the thickness of the Pen used to stroke this gauge.
     * @property {Drawing.Brush} scaleBackground Gets or sets a Brush used to draw the background of the gauge scales.
     * @property {Drawing.Brush} scaleStroke Gets or sets a Brush used to stroke the gauge scales.
     * @property {Number} scaleStrokeThickness Gets or sets the thickness of the Pen used to stroke the gauge scales.
     * @property {Drawing.Brush} pointerBackground Gets or sets a Brush used to draw the background of gauge pointers.
     * @property {Drawing.Brush} pointerStroke Gets or sets a Brush used to stroke gauge pointers.
     * @property {Number} pointerStrokeThickness Gets or sets the thickness of the Pen used to stroke the gauge pointers.
     * @property {Drawing.Brush} tickBackground Gets or sets a Brush used to draw the background of gauge ticks.
     * @property {Drawing.Brush} tickStroke Gets or sets a Brush used to stroke gauge ticks.
     * @property {Number} tickStrokeThickness Gets or sets the thickness of the Pen used to stroke the gauge ticks.
     * @property {String} fontName Gets or sets the name of font used to draw text in this gauge.
     * @property {Drawing.FontStyle} fontStyle Gets or sets the style of font used to draw text in this gauge.
     * @property {Number} fontSize Gets or sets the size of font used to draw text in this gauge.
     */
    export abstract class GaugeRenderer extends Components.Component {
        /**
         * Initializes a new instance of the GaugeRenderer class.
         */
        constructor();
        /**
         * Gets the default pointer fill.
         */
        getDefaultPointerFill(pointer: any): Drawing.Brush;
        /**
         * Gets the default pointer stroke.
         */
        getDefaultPointerStroke(pointer: any): Drawing.Pen;
        /**
         * Gets or sets a Brush used to draw the background of this gauge.
         */
        get background(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of this gauge.
         */
        set background(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke this gauge.
         */
        get stroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke this gauge.
         */
        set stroke(value: Drawing.Brush);
        /**
         * Gets or sets the thickness of the Pen used to stroke this gauge.
         */
        get strokeThickness(): number;
        /**
         * Gets or sets the thickness of the Pen used to stroke this gauge.
         */
        set strokeThickness(value: number);
        /**
         * Gets or sets a Brush used to draw the background of the gauge scales.
         */
        get scaleBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of the gauge scales.
         */
        set scaleBackground(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke the gauge scales.
         */
        get scaleStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke the gauge scales.
         */
        set scaleStroke(value: Drawing.Brush);
        /**
         * Gets or sets the thickness of the Pen used to stroke the gauge scales.
         */
        get scaleStrokeThickness(): number;
        /**
         * Gets or sets the thickness of the Pen used to stroke the gauge scales.
         */
        set scaleStrokeThickness(value: number);
        /**
         * Gets or sets a Brush used to draw the background of gauge pointers.
         */
        get pointerBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of gauge pointers.
         */
        set pointerBackground(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke gauge pointers.
         */
        get pointerStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge pointers.
         */
        set pointerStroke(value: Drawing.Brush);
        /**
         * Gets or sets the thickness of the Pen used to stroke the gauge pointers.
         */
        get pointerStrokeThickness(): number;
        /**
         * Gets or sets the thickness of the Pen used to stroke the gauge pointers.
         */
        set pointerStrokeThickness(value: number);
        /**
         * Gets or sets a Brush used to draw the background of gauge ticks.
         */
        get tickBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of gauge ticks.
         */
        set tickBackground(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke gauge ticks.
         */
        get tickStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge ticks.
         */
        set tickStroke(value: Drawing.Brush);
        /**
         * Gets or sets the thickness of the Pen used to stroke gauge ticks.
         */
        get tickStrokeThickness(): number;
        /**
         * Gets or sets the thickness of the Pen used to stroke gauge ticks.
         */
        set tickStrokeThickness(value: number);
        /**
         * Gets or sets the name of font used to draw text in this gauge.
         */
        get fontName(): string;
        /**
         * Gets or sets the name of font used to draw text in this gauge.
         */
        set fontName(value: string);
        /**
         * Gets or sets the style of font used to draw text in this gauge.
         */
        get fontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw text in this gauge.
         */
        set fontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the size of font used to draw text in this gauge.
         */
        get fontSize(): number;
        /**
         * Gets or sets the size of font used to draw text in this gauge.
         */
        set fontSize(value: number);
        m_defaultLinearFill: Drawing.LinearGradientBrush;
        m_defaultPen: Drawing.Pen;
        private m_background;
        private m_stroke;
        private m_strokeThickness;
        private m_scaleBackground;
        private m_scaleStroke;
        private m_scaleStrokeThickness;
        private m_pointerBackground;
        private m_pointerStroke;
        private m_pointerStrokeThickness;
        private m_tickBackground;
        private m_tickStroke;
        private m_tickStrokeThickness;
        private m_fontName;
        private m_fontStyle;
        private m_fontSize;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/SeriesStyle" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Brush, DashStyle } from '@mindfusion/drawing';
    /**
     * @class Defines appearance attributes of series elements.
     */
    export interface SeriesStyle {
        /**
         * Returns a Brush that should be used to fill specified element of specified series.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Returns a Brush that should be used to stroke specified element of specified series.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Returns the thickness of the stroke used to draw specified element of specified series.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable number value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Returns the dash style of the stroke used to draw specified element of specified series.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): DashStyle;
        toJson(): any;
    }
}
declare module "Charting/DateTimeFormat" {
    /**
    * @namespace MindFusion.Charting
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
    * Specifies formats for DateTime values.
    * @enum
    * @name DateTimeFormat
    * @param [CustomDateTime] Indicates that the number should be formatted as a DateTime value according to a custom set string.
    * @param [FullDateTime] Indicates that the number should be formatted as a DateTime value with a full date pattern.
    * @param [LongDate] Indicates that the number should be formatted as a DateTime value with a long date pattern.
    * @param [LongTime] Indicates that the number should be formatted as a DateTime value with a long time pattern.
    * @param [MonthDateTime] Indicates that the number should be formatted as a DateTime value with a month day pattern.
    * @param [None] The DateTime value is not formatted
    * @param [ShortDate] Indicates that the number should be formatted as a DateTime value with a short date pattern.
    * @param [ShortTime] Indicates that the number should be formatted as a DateTime value with a short time pattern.
    * @param [YearDateTime] Indicates that the number should be formatted as a DateTime value with a year month date pattern.
    */
    export enum DateTimeFormat {
        /**
         * Indicates that the number should be formatted as a DateTime value according to a custom set string.
         */
        CustomDateTime = 0,
        /**
         * Indicates that the number should be formatted as a DateTime value with a full date pattern.
         */
        FullDateTime = 1,
        /**
         * Indicates that the number should be formatted as a DateTime value with a long date pattern.
         */
        LongDate = 2,
        /**
         * Indicates that the number should be formatted as a DateTime value with a long time pattern.
         */
        LongTime = 3,
        /**
         * Indicates that the number should be formatted as a DateTime value with a month day pattern.
         */
        MonthDateTime = 4,
        /**
         * The DateTime value is not formatted
         */
        None = 5,
        /**
         * Indicates that the number should be formatted as a DateTime value with a short date pattern.
         */
        ShortDate = 6,
        /**
         * Indicates that the number should be formatted as a DateTime value with a short time pattern.
         */
        ShortTime = 7,
        /**
         * Indicates that the number should be formatted as a DateTime value with a year month date pattern.
         */
        YearDateTime = 8
    }
}
declare module "Charting/LabelKinds" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies the various kinds of labels that can be drawn for data items.
    * @enum
    * @name LabelKinds
    * @param [None] Do not draw labels.
    * @param [InnerLabel] Draw inner label in graphic representation of data item.
    * @param [OuterLabel] Draw outer label nearby graphic representation of data item.
    * @param [ToolTip] Show label as a tooltip.
    * @param [XAxisLabel] Draw data label at X axis.
    * @param [YAxisLabel] Draw data label at Y axis.
    * @param [ZAxisLabel] Draw data label at Z axis.
    * @param [All] Draw all labels supported by a series.
    */
    export enum LabelKinds {
        /**
        * Do not draw labels.
        */
        None = 0,
        /**
        * Draw inner label in graphic representation of data item.
        */
        InnerLabel = 1,
        /**
        * Draw outer label nearby graphic representation of data item.
        */
        OuterLabel = 2,
        /**
        * Show label as a tooltip.
        */
        ToolTip = 4,
        /**
        * Draw data label at X axis.
        */
        XAxisLabel = 8,
        /**
        * Draw data label at Y axis.
        */
        YAxisLabel = 16,
        /**
        * Draw data label at Z axis.
        */
        ZAxisLabel = 32,
        /**
        * Draw all labels supported by a series.
        */
        All = -1
    }
}
declare module "Charting/Series" {
    /**
    * @namespace MindFusion.Charting
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
    import { EventDispatcher } from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
     * @class Specifies the interface that data providers should implement
     * in order to feed data to SeriesRenderer classes.
     */
    export interface Series {
        /**
         * Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Returns a label for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Gets a value indicating whether the series values increase monotonously in specified dimension.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Gets a value indicating whether the specified data item should be emphasized by the SeriesRenderer.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Gets the number of data items in this series.
         */
        size: number;
        /**
         * Gets the number of values (coordinates) that can be returned by each data item.
         */
        dimensions: number;
        /**
         * Gets the title of this series.
         */
        title: string;
        /**
         * Gets the kind of labels supported by this series.
         */
        supportedLabels: LabelKinds;
        /**
         * Raised when the values in this series change.
         * @event Series.dataChanged
         * @type {EventDispatcher}
         * @property {Series} sender
         * @property {EventArgs} args
         */
        dataChanged: EventDispatcher<EventArgs>;
        toJson(): any;
    }
    export interface StyleCheck {
        (style: SeriesStyle): any;
    }
}
declare module "Charting/SeriesContainer" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { IEnumerable } from '@mindfusion/common-collections';
    import { Series } from "Charting/Series";
    /**
     * @class Defines an interface for enumerating all series associated with a component of the dashboard.
     */
    export interface SeriesContainer {
        /**
         * Enumerates the series associated with this component.
         * @returns An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        /**
        * Gets the index of the dimension whose set of values should be treated as domain of plotted function.
        * @param {Series} series A Series in this container.
        * @returns The dimension index.
        */
        domainDimension(series: Series): number;
        toJson(): any;
        fromJson(json: any): any;
    }
}
declare module "Charting/Axis" {
    import { INotifyPropertyChanged, PropertyChangedEventDispatcher } from '@mindfusion/common';
    export interface ProcessInterval {
        (value: number, index: number): any;
    }
    /**
    * @class Represents an Axis range.
    * @property {String} title Gets or sets the axis title.
    * @property {Number} minValue Gets or sets the smallest value displayed on this axis.
    * @property {Number} maxValue Gets or sets the largest value displayed on this axis.
    * @property {Number} origin Gets or sets the origin of the axis.
    * @property {Number} interval Gets or sets the size of axis intervals.
    * @property {String} numberFormat Gets or sets the number format of coordinate labels.
    */
    export class Axis implements INotifyPropertyChanged {
        /**
         * Initializes a new instance of the Axis class.
         */
        constructor();
        /**
         * Determines whether specified value is within the axis range.
         * @param {Number} value The number to check.
         * @returns {Boolean} true if value is inside the current axis range, or false otherwise.
         */
        inRange(value: number): boolean;
        inExtendedRange(value: number, margin: number): boolean;
        /**
         * Raises the PropertyChanged event.
         * @param {String} propertyName Specifies the name of changed property.
         */
        protected onPropertyChanged(propertyName: string): void;
        /**
         * Occurs when a property value changes.
         * @event Axis.propertyChanged
         * @type {PropertyChangedEventDispatcher}
         * @property {Axis} sender
         * @property {PropertyChangedEventArgs} args
         */
        get propertyChanged(): PropertyChangedEventDispatcher;
        private m_propertyChanged;
        /**
         * Gets or sets the axis title.
         */
        get title(): string;
        /**
         * Gets or sets the axis title.
         */
        set title(value: string);
        /**
         * Gets or sets the smallest value displayed on this axis.
         */
        get minValue(): number;
        /**
         * Gets or sets the smallest value displayed on this axis.
         */
        set minValue(value: number);
        /**
         * Gets or sets the largest value displayed on this axis.
         */
        get maxValue(): number;
        /**
         * Gets or sets the largest value displayed on this axis.
         */
        set maxValue(value: number);
        /**
         * Gets or sets the origin of the axis.
         */
        get origin(): number;
        /**
         * Gets or sets the origin of the axis.
         */
        set origin(value: number);
        /**
         * Gets or sets the size of axis intervals.
         */
        get interval(): number;
        /**
         * Gets or sets the size of axis intervals.
         */
        set interval(value: number);
        /**
         * Gets or sets the number format of coordinate labels.
         */
        get numberFormat(): string;
        /**
         * Gets or sets the number format of coordinate labels.
         */
        set numberFormat(value: string);
        enumerateIntervals(alignToView: boolean, process: ProcessInterval, partial?: boolean): void;
        private firstDivisionInViewport;
        numIntervals(): number;
        get measuredMinValue(): number;
        set measuredMinValue(value: number);
        private m_measuredMinValue;
        get measuredMaxValue(): number;
        set measuredMaxValue(value: number);
        private m_measuredMaxValue;
        get effectiveMinValue(): number;
        get effectiveMaxValue(): number;
        /**
         * Maps a value from this axis' coordinate system to a pixel position in specified view.
         * @param {Number} value A number value.
         * @param {Number} viewSize The view size.
         * @returns {Number} X coordinate of pixel.
         */
        mapValueToPixelX(value: number, viewSize: number): number;
        /**
         * Maps a value from this axis' coordinate system to a pixel position in specified view.
         * @param {Number} value A number value.
         * @param {Number} viewSize The view size.
         * @returns {Number} Y coordinate of pixel.
         */
        mapValueToPixelY(value: number, viewSize: number): number;
        m_id: number;
        id(): number;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            id: number;
            interval: number;
            minValue: number;
            maxValue: number;
            numberFormat: string;
            title: string;
        };
        private m_minValue;
        private m_maxValue;
        private m_origin;
        private m_interval;
        private m_numberFormat;
        private m_title;
    }
}
declare module "Charting/DataReader" {
    import { Series } from "Charting/Series";
    import { Axis } from "Charting/Axis";
    export interface AxisData {
        (series: Series, dataIndex: number): number;
    }
    export class DataReader {
        constructor();
        get domainDimension(): number;
        set domainDimension(value: number);
        private m_domainDimension;
        xData(series: Series, dataIndex: number): number;
        yData(series: Series, dataIndex: number): number;
        xSorted(series: Series): boolean;
        ySorted(series: Series): boolean;
        getMinX(series: Series): number;
        getMaxX(series: Series): number;
        getMinY(series: Series): number;
        getMaxY(series: Series): number;
        getFirstInRange(series: Series, x: Axis, xData: AxisData): number;
        getLastInRange(series: Series, x: Axis, xData: AxisData): number;
    }
}
declare module "Charting/Plot" {
    /**
    * @namespace MindFusion.Charting
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
    import * as Drawing from '@mindfusion/drawing';
    import { ObservableCollection, IEnumerable } from '@mindfusion/common-collections';
    import { Components } from "Charting/LoadOrder";
    import { SeriesContainer } from "Charting/SeriesContainer";
    import { SeriesStyle } from "Charting/SeriesStyle";
    import { HitResult } from "Charting/HitResult";
    import { RenderContext } from "Charting/RenderContext";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { Series } from "Charting/Series";
    /**
    * @class The base class for components used to draw chart graphics.
    * @property {SeriesStyle} seriesStyle Gets or sets a SeriesStyle whose attributes should be used to draw series inside this plot, unless their own renderers have a local SeriesStyle value set for respetive attribute.
    * @property {MindFusion.Charting.HitResult} highlightedItem Gets or sets the data item that should be drawn highlighted.
    * @property {ObservableCollection<SeriesRenderer>} seriesRenderers Gets or sets the SeriesRenderer objects that should draw inside this plot.
    * @property {Drawing.Brush} background Gets or sets the Drawing.Brush that should be used to fill the background of this plot.
    * @property {Drawing.Brush} borderStroke Gets or sets the Drawing.Brush that should be used to stroke the borders of this plot.
    * @property {Number} borderStrokeThickness Gets or sets the stroke thickness of plot borders.
    * @property {Drawing.DashStyle} borderStrokeDashStyle Gets or sets the stroke dash style of plot borders.
    * @property {Drawing.Brush} highlightStroke Gets or sets the Drawing.Brush used to stroke highlighted item.
    * @property {Number} highlightStrokeThickness Gets or sets the stroke thickness of highlighted item.
    * @property {Drawing.DashStyle} highlightStrokeDashStyle Gets or sets the stroke dash style of highlighted item.
    */
    export class Plot extends Components.Component implements SeriesContainer {
        constructor();
        private m_seriesStyle;
        /**
         * Gets or sets a SeriesStyle whose attributes should be used to
         * draw series inside this plot, unless their own renderers
         * have a local SeriesStyle value set for respetive attribute.
         */
        get seriesStyle(): SeriesStyle;
        /**
         * Gets or sets a SeriesStyle whose attributes should be used to
         * draw series inside this plot, unless their own renderers
         * have a local SeriesStyle value set for respetive attribute.
         */
        set seriesStyle(value: SeriesStyle);
        private m_highlightedItem;
        /**
         * Gets or sets the data item that should be drawn highlighted.
         */
        get highlightedItem(): HitResult;
        /**
         * Gets or sets the data item that should be drawn highlighted.
         */
        set highlightedItem(value: HitResult);
        /**
         * Called in the beginning of data measurement pass.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        startMeasureData(context: RenderContext): void;
        /**
         * Measures data of all SeriesRenderer objects drawn inside this plot.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRanges(context: RenderContext): void;
        /**
         * Called at the end of data measurement pass.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        adjustDataRanges(context: RenderContext): void;
        /**
         * Components.Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Draw override. Draws a grid and all chart graphics
         * represented by contained SeriesRenderer objects.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Draws the plot's background and borders.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        drawPlot(context: RenderContext): void;
        /**
         * Draws the plot's grid.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        drawGrid(context: RenderContext): void;
        /**
         * Draws the plot's axis origin lines.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        drawOrigins(context: RenderContext): void;
        private m_seriesRenderers;
        /**
         * Gets or sets the SeriesRenderer objects that should draw inside this plot.
         */
        get seriesRenderers(): ObservableCollection<SeriesRenderer>;
        /**
         * Gets or sets the SeriesRenderer objects that should draw inside this plot.
         */
        set seriesRenderers(value: ObservableCollection<SeriesRenderer>);
        private subscribe;
        /**
         * Unsubscribes from DataChanged and PropertyChanged events
         * of all SeriesRenderer objects in specified list.
         * @param {ObservableCollection<SeriesRenderer>} seriesRenderers A list of SeriesRenderer objects.
         */
        private unsubscribe;
        private onSeriesRenderersCollectionChanged;
        /**
         * Called when a Series raises its DataChanged event.
         * @param {Object} sender The event sender.
         * @param {EventArgs} e An EventArgs instance.
         */
        onRendererDataChanged(e: EventArgs): void;
        private onRendererPropertyChanged;
        /**
         * Implements SeriesContainer.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        /**
        * Implements the SeriesContainer interface. Gets the index of the dimension
        * whose set of values should be treated as domain of plotted function.
        * @param {Series} series A Series in this container.
        * @returns The dimension index.
        */
        domainDimension(series: Series): number;
        /**
         * Gets the Drawing.Brush that should be used to fill the plot's background.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Brush} A Brush instance.
         */
        effectiveFill(context: RenderContext): Drawing.Brush;
        /**
         * Gets the Drawing.Pen that should be used to draw the plot's borders.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Pen} A Drawing.Pen instance.
         */
        effectiveBorder(context: RenderContext): Drawing.Pen;
        /**
         * Gets the Drawing.Brush that should be used to stroke the plot's borders.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Brush} A Brush instance.
         */
        effectiveBorderStroke(context: RenderContext): Drawing.Brush;
        /**
         * Gets the thickness of border strokes.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Number} A number value.
         */
        effectiveBorderStrokeThickness(context: RenderContext): number;
        /**
         * Gets the dash style of border strokes.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.DashStyle} A member of the Drawing.DashStyle enumeration.
         */
        effectiveStrokeDashStyle(context: RenderContext): Drawing.DashStyle;
        private m_background;
        /**
         * Gets or sets the Drawing.Brush that should be used to fill the background of this plot.
         */
        get background(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush that should be used to fill the background of this plot.
         */
        set background(value: Drawing.Brush);
        private m_borderStroke;
        /**
         * Gets or sets the Drawing.Brush that should be used to stroke the borders of this plot.
         */
        get borderStroke(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush that should be used to stroke the borders of this plot.
         */
        set borderStroke(value: Drawing.Brush);
        private m_borderStrokeThickness;
        /**
         * Gets or sets the stroke thickness of plot borders.
         */
        get borderStrokeThickness(): number;
        /**
         * Gets or sets the stroke thickness of plot borders.
         */
        set borderStrokeThickness(value: number);
        private m_borderStrokeDashStyle;
        /**
         * Gets or sets the stroke dash style of plot borders.
         */
        get borderStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the stroke dash style of plot borders.
         */
        set borderStrokeDashStyle(value: Drawing.DashStyle);
        private m_highlightStroke;
        /**
         * Gets or sets the Drawing.Brush used to stroke highlighted item.
         */
        get highlightStroke(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to stroke highlighted item.
         */
        set highlightStroke(value: Drawing.Brush);
        private m_highlightStrokeThickness;
        /**
         * Gets or sets the stroke thickness of highlighted item.
         */
        get highlightStrokeThickness(): number;
        /**
         * Gets or sets the stroke thickness of highlighted item.
         */
        set highlightStrokeThickness(value: number);
        private m_highlightStrokeDashStyle;
        /**
         * Gets or sets the stroke dash style of highlighted item.
         */
        get highlightStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the stroke dash style of highlighted item.
         */
        set highlightStrokeDashStyle(value: Drawing.DashStyle);
        effectiveHighlight(context: RenderContext): Drawing.Pen;
        effectiveHighlightStroke(context: RenderContext): Drawing.Brush;
        effectiveHighlightStrokeThickness(context: RenderContext): number;
        effectiveHighlightDashStyle(context: RenderContext): Drawing.DashStyle;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/HitResult" {
    /**
    * @namespace MindFusion.Charting
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
    import { Plot } from "Charting/Plot";
    import { Series } from "Charting/Series";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    /**
    * @class Represents the result of a hit-test operation.
    * @property {Plot} plot Gets or sets the Plot that has been hit.
    * @property {SeriesRenderer} renderer Gets or sets the SeriesRenderer that has been hit.
    * @property {Number} index Gets or sets the data item index within its Series.
    * @property {Number} value Gets or sets the data item value.
    * @property {Series} series Gets or sets the Series that has been hit.
    */
    export class HitResult extends EventArgs {
        /**
         * Initializes a new instance of the HitResult class.
         * @param {SeriesRenderer} renderer A SeriesRenderer whose data item has been hit.
         * @param {Number} index An integer index of the data item.
         * @param {Number} value The item's vaue.
         * @param {Series} series The Series that contains the found item.
         */
        constructor(renderer: SeriesRenderer, index: number, value: number, series: Series);
        /**
         * Gets the Plot that has been hit.
         */
        get plot(): Plot;
        /**
         * Gets the Plot that has been hit.
         */
        set plot(value: Plot);
        private m_plot;
        /**
         * Gets the SeriesRenderer that has been hit.
         */
        get renderer(): SeriesRenderer;
        /**
         * Gets the SeriesRenderer that has been hit.
         */
        set renderer(value: SeriesRenderer);
        private m_renderer;
        /**
         * Gets the data item index within its Series.
         */
        get index(): number;
        /**
         * Gets the data item index within its Series.
         */
        set index(value: number);
        private m_index;
        /**
         * Gets the data item value.
         */
        get value(): number;
        /**
         * Gets the data item value.
         */
        set value(value: number);
        private m_value;
        /**
         * Gets the Series that has been hit.
         */
        get series(): Series;
        /**
         * Gets the Series that has been hit.
         */
        set series(value: Series);
        private m_series;
    }
}
declare module "Charting/ToolTip" {
    import { Point, Brush, Pen, Font } from '@mindfusion/drawing';
    /**
     * @class Represents current tooltip.
     * @property {String} text Gets or sets the tooltip text.
     * @property {Point} position Gets or sets the tooltip position.
     * @property {Number} horizontalPadding Gets or sets the horizontal padding to the left and right of the tooltip text.
     * @property {Number} verticalPadding Gets or sets the vertical padding above and below the tooltip text.
     * @property {Number} horizontalOffset Gets or sets the horizontal offset from the pointer.
     * @property {Number} verticalOffset Gets or sets the horizontal offset from the pointer.
     * @property {Font} font Gets or sets the tooltip font.
     * @property {Brush} brush Gets or sets the tooltip background brush.
     * @property {Pen} pen Gets or sets the tooltip border pen.
     * @property {Brush} textBrush Gets or sets the tooltip text brush.
     */
    export class ToolTip {
        constructor();
        /**
         * Gets or sets the tooltip text.
         */
        static get text(): string;
        /**
         * Gets or sets the tooltip text.
         */
        static set text(value: string);
        private static m_text;
        /**
         * Gets or sets the tooltip position.
         */
        static get position(): Point;
        /**
         * Gets or sets the tooltip position.
         */
        static set position(value: Point);
        private static m_position;
        /**
         * Gets or sets the horizontal padding to the left and right of the tooltip text.
         */
        static get horizontalPadding(): number;
        /**
         * Gets or sets the horizontal padding to the left and right of the tooltip text.
         */
        static set horizontalPadding(value: number);
        private static m_horizontalPadding;
        /**
         * Gets or sets the vertical padding above and below the tooltip text.
         */
        static get verticalPadding(): number;
        /**
         * Gets or sets the vertical padding above and below the tooltip text.
         */
        static set verticalPadding(value: number);
        private static m_verticalPadding;
        /**
         * Gets or sets the horizontal offset from the pointer.
         */
        static get horizontalOffset(): number;
        /**
         * Gets or sets the horizontal offset from the pointer.
         */
        static set horizontalOffset(value: number);
        private static m_horizontalOffset;
        /**
         * Gets or sets the vertical offset from the pointer.
         */
        static get verticalOffset(): number;
        /**
         * Gets or sets the vertical offset from the pointer.
         */
        static set verticalOffset(value: number);
        private static m_verticalOffset;
        /**
         * Gets or sets the tooltip font.
         */
        static get font(): Font;
        /**
         * Gets or sets the tooltip font.
         */
        static set font(value: Font);
        private static m_font;
        /**
         * Gets or sets the tooltip background brush.
         */
        static get brush(): Brush;
        /**
         * Gets or sets the tooltip background brush.
         */
        static set brush(value: Brush);
        private static m_brush;
        /**
         * Gets or sets the tooltip border pen.
         */
        static get pen(): Pen;
        /**
         * Gets or sets the tooltip border pen.
         */
        static set pen(value: Pen);
        private static m_pen;
        /**
         * Gets or sets the tooltip text brush.
         */
        static get textBrush(): Brush;
        /**
         * Gets or sets the tooltip text brush.
         */
        static set textBrush(value: Brush);
        private static m_textBrush;
    }
}
declare module "Charting/TextRenderer" {
    import { Point, Rect, Size, Brush, Pen, Font, StringAlignment, StringFormat } from '@mindfusion/drawing';
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class Draws text and labels inside chart components.
    * @property {Font} labelFont Gets or sets the Font used to draw labels.
    * @property {Brush} textBrush Gets or sets the brush used to draw labels.
    */
    export class TextRenderer {
        /**
         * Initializes a new instance of the TextRenderer class.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Font} font A Font instance.
         * @param {Brush} textBrush A Brush instance.
         */
        constructor(context: RenderContext, font: Font, textBrush: Brush, background?: Brush, borderPen?: Pen);
        /**
         * Gets or sets the font used to draw labels.
         */
        get labelFont(): Font;
        /**
         * Gets or sets the font used to draw labels.
         */
        set labelFont(value: Font);
        /**
         * Gets or sets the brush used to draw labels.
         */
        get textBrush(): Brush;
        /**
         * Gets or sets the brush used to draw labels.
         */
        set textBrush(value: Brush);
        /**
         * Gets or sets the background brush used to draw labels.
         */
        get background(): Brush;
        /**
         * Gets or sets the background brush used to draw labels.
         */
        set background(value: Brush);
        /**
         * Gets or sets the pen used to draw labels borders.
         */
        get borderPen(): Pen;
        /**
         * Gets or sets the pen used to draw labels borders.
         */
        set borderPen(value: Pen);
        private m_labelFont;
        private m_textBrush;
        private m_background;
        private m_borderPen;
        private static centered;
        private static centeredLeft;
        private static centeredRight;
        private context;
        /**
         * Draws the specified label centered at specified location.
         * @param {Series} series A Series whose label to draw.
         * @param {Number} index An integer index of the label.
         * @param {Point} point A Point specifying the label's location.
         * @param {MindFusion.Charting.LabelKinds} labelKind A member of the LabelKinds enumeration.
         * @param {StringFormat} [format] A StringFormat instance.
         */
        drawLabelAtPoint(series: Series, index: number, point: Point, labelKind: LabelKinds, format?: StringFormat): void;
        drawLabelAtRadialPoint(label: string, center: Point, radius: number, angle: number): void;
        /**
         * Draws the specified label on the right side of specified point.
         * @param {Series} series A Series whose label to draw.
         * @param {Number} index An integer index of the label.
         * @param {Point} point A Point specifying the label's location.
         * @param {LabelKinds} labelKind A member of the LabelKinds enumeration.
         */
        drawRightFromPoint(series: Series, index: number, point: Point, labelKind: LabelKinds): void;
        /**
         * Draws the specified label on the left side of specified point.
         * @param {Series} series A Series whose label to draw.
         * @param {Number} index An integer index of the label.
         * @param {Point} point A Point specifying the label's location.
         * @param {LabelKinds} labelKind A member of the LabelKinds enumeration.
         */
        drawLeftFromPoint(series: Series, index: number, point: Point, labelKind: LabelKinds): void;
        /**
         * Draws a 90-degree rotated text in specified layout rectangle.
         * @param {String} text A string containing the text to draw.
         * @param {Rect} bounds A RectangleF specifying the layout rectangle.
         * @param {Brush} textBrush A Brush instance.
         * @param {StringAlignment} alignment A member of the StringAlignment enumeration.
         * @param {StringAlignment} lineAlignment A member of the StringAlignment enumeration.
         */
        drawRotatedLabelInRect(text: string, bounds: Rect, textBrush: Brush, alignment: StringAlignment, lineAlignment: StringAlignment): void;
        /**
         * Draws the specified label rotated at 90 degrees in specified layout rectangle.
         * @param {Series} series A Series whose label to draw.
         * @param {Number} index An integer index of the label.
         * @param {Rect} bounds A RectangleF specifying the layout rectangle.
         * @param {MindFusion.Charting.LabelKinds} labelKind A member of the LabelKinds enumeration.
         */
        drawRotatedLabelInRect(series: Series, index: number, bounds: Rect, labelKind: LabelKinds): void;
        drawRotatedLabelInRect(series: Series, index: number, bounds: Rect, labelKind: LabelKinds, alignment: StringAlignment, lineAlignment: StringAlignment): void;
        /**
         * Draws the specified label in specified layout rectangle.
         * @param {Series} series A Series whose label to draw.
         * @param {Number} index An integer index of the label.
         * @param {Rect} bounds A RectangleF specifying the layout rectangle.
         * @param {MindFusion.Charting.LabelKinds} labelKind A member of the LabelKinds enumeration.
         * @param {StringFormat} [format] A StringFormat instance.
         */
        drawLabelInRect(series: Series, index: number, bounds: Rect, labelKind: LabelKinds, format?: StringFormat): void;
        drawLabelInRect(series: Series, index: number, bounds: Rect, labelKind: LabelKinds, alignment: StringAlignment, lineAlignment: StringAlignment): void;
        measureLabel(label: string, angle: number): Size;
        drawRotatedLabel(text: string, center: Point, angle: number): void;
        private drawFrame;
        private textRect;
        private textRectPoint;
        private textRectCentered;
    }
}
declare module "Charting/TextStyleHint" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies text styles that can be accessed through RenderContent.
    * @enum
    * @name TextStyleHint
    * @param [Title] Identifies style used to draw chart's title.
    * @param [Subtitle] Identifies style used to draw chart's sub-title.
    * @param [AxisLabels] Identifies style used to draw axis labels.
    * @param [AxisTitle] Identifies style used to draw axis title.
    * @param [DataLabels] Identifies style used to draw data labels.
    * @param [Widget] Identifies style used to draw text in UI widgets.
    * @param [LegendTitle] Identifies style used to draw legend title.
    */
    export enum TextStyleHint {
        /**
         * Identifies style used to draw chart's title.
         */
        Title = 0,
        /**
         * Identifies style used to draw chart's sub-title.
         */
        Subtitle = 1,
        /**
         * Identifies style used to draw axis labels.
         */
        AxisLabels = 2,
        /**
         * Identifies style used to draw axis title.
         */
        AxisTitle = 3,
        /**
         * Identifies style used to draw data labels.
         */
        DataLabels = 4,
        /**
         * Identifies style used to draw text in UI widgets.
         */
        Widget = 5,
        /**
         * Identifies style used to draw legend title.
         */
        LegendTitle = 6
    }
}
declare module "Charting/SeriesRenderer" {
    /**
    * @namespace MindFusion.Charting
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
    import * as Drawing from '@mindfusion/drawing';
    import { ObservableCollection, IEnumerable } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { SeriesContainer } from "Charting/SeriesContainer";
    import { DataReader } from "Charting/DataReader";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series, StyleCheck } from "Charting/Series";
    import { SeriesStyle } from "Charting/SeriesStyle";
    import { TextRenderer } from "Charting/TextRenderer";
    /**
    * @class Base class for renderer objects that draw data series inside a Plot.
    * @property {SeriesStyle} seriesStyle A SeriesStyle instance specifying the appearance of series associated with this renderer.
    * @property {String} labelFontName Gets or sets the name of font that should be used to draw labels of data items.
    * @property {Number} labelFontSize Gets or sets the size of font that should be used to draw labels of data items.
    * @property {Drawing.FontStyle} labelFontStyle Gets or sets the style of font that should be used to draw labels of data items.
    * @property {Drawing.Brush} labelBrush Gets or sets the Brush that should be used to draw labels of data items.
    * @property {Boolean} showDataLabels Gets or sets the kind of data labels to draw.
    * @property {Boolean} showHighlight Gets or sets a value indicating whether to show highlights on data items.
    * @property {Boolean} showToolTips Gets or sets a value indicating whether to show tooltips.
    */
    export abstract class SeriesRenderer implements SeriesContainer, Common.INotifyPropertyChanged {
        /**
         * Initializes a new instance of the SeriesRenderer class.
         */
        constructor();
        dataReader: DataReader;
        private static white;
        private static black;
        /**
         * Gets the brush that should be used to fill the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Brush} A Brush instance.
         */
        effectiveFill(seriesIndex: number, dataIndex: number, context: RenderContext): Drawing.Brush;
        /**
         * Gets the brush that should be used to stroke the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Brush} A Brush instance.
         */
        effectiveStroke(seriesIndex: number, dataIndex: number, context: RenderContext): Drawing.Brush;
        /**
         * Gets the thickness of the pen that should be used to stroke the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @returns {Number} A number value.
         */
        effectiveStrokeThickness(seriesIndex: number, dataIndex: number, context: RenderContext): number;
        /**
         * Gets the dash style of the pen that should be used to stroke the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.DashStyle} A member of the Drawing.DashStyle enumeration.
         */
        effectiveStrokeDashStyle(seriesIndex: number, dataIndex: number, context: RenderContext): Drawing.DashStyle;
        /**
         * Gets the Drawing.Pen that should be used to stroke the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @returns {Drawing.Pen} A Drawing.Pen instance.
         */
        effectiveStrokePen(seriesIndex: number, dataIndex: number, context: RenderContext): Drawing.Pen;
        /**
         * A SeriesStyle instance specifying the appearance of series associated with this renderer.
         */
        get seriesStyle(): SeriesStyle;
        /**
         * A SeriesStyle instance specifying the appearance of series associated with this renderer.
         */
        set seriesStyle(value: SeriesStyle);
        private m_seriesStyle;
        /**
         * Returns a SeriesStyle object that meets specified criteria.
         * @param check A StyleCheck delegate that tests SeriesStyle for some criteria.
         * @param context A RenderContext instance used to access styles and theme from the dashboard hierarchy.
         * @returns A SeriesStyle instance, or null if none meets spcified criteria.
         */
        searchStyle(check: StyleCheck, context: RenderContext): SeriesStyle;
        /**
         * Draws the series data in specified RenderContext.
         * @param context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Draws highlighted data item in specified RenderContext.
         * @param context A RenderContext instance.
         * @param hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
         * Sets tooltip text and lcoation.
         * @param text A string specifying tooltip text.
         * @param location A Point specifying tooltip location.
         */
        setToolTip(text: string, location: Drawing.Point): void;
        /**
         * Hit-tests the visual representation of the series for a data item.
         * @param {Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for data items.
         * @returns {Charting.HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Drawing.Point): HitResult;
        /**
         * Measures the data range of rendered series and assigns it to the
         * associated Axis objects if their MinValue and MaxValue are not set.
         * @param context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * Adjusts the data range of associated Axis objects after initial measure pass.
         * @param context A RenderContext instance.
         */
        adjustDataRange(context: RenderContext): void;
        /**
         * Called to reset measure accumulators at the beginning of a measure pass.
         * @param context A RenderContext instance.
         */
        startMeasureData(context: RenderContext): void;
        /**
         * Gets or sets the name of font that should be used to draw labels of data items.
         */
        get labelFontName(): string;
        /**
         * Gets or sets the name of font that should be used to draw labels of data items.
         */
        set labelFontName(value: string);
        /**
         * Gets or sets the size of font that should be used to draw labels of data items.
         */
        get labelFontSize(): number;
        /**
         * Gets or sets the size of font that should be used to draw labels of data items.
         */
        set labelFontSize(value: number);
        /**
         * Gets or sets the style of font that should be used to draw labels of data items.
         */
        get labelFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font that should be used to draw labels of data items.
         */
        set labelFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush that should be used to draw labels of data items.
         */
        get labelBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush that should be used to draw labels of data items.
         */
        set labelBrush(value: Drawing.Brush);
        /**
         * Gets or sets the kind of data labels to draw.
         */
        get showDataLabels(): LabelKinds;
        /**
         * Gets or sets the kind of data labels to draw.
         */
        set showDataLabels(value: LabelKinds);
        private m_showDataLabels;
        /**
        * Gets a value indicating whether to show highlights on data items.
        */
        get showHighlight(): boolean;
        /**
        * Sets a value indicating whether to show highlights on data items.
        */
        set showHighlight(value: boolean);
        /**
        * Gets a value indicating whether to show tooltips.
        */
        get showToolTips(): boolean;
        /**
        * Sets a value indicating whether to show tooltips.
        */
        set showToolTips(value: boolean);
        renderDataLabels(series: Series, kind: LabelKinds): boolean;
        /**
         * Gets the Drawing.Font that should be used to draw labels of data items.
         * @param context A RenderContext instance used to find styles and theme from dashboard hierarchy.
         * @returns A Drawing.Font instance.
         */
        effectiveLabelFont(context: RenderContext): Drawing.Font;
        /**
         * Gets the System.Drawing.Brush that should be used to draw labels of data items.
         * @param context A RenderContext instance used to find styles and theme from dashboard hierarchy.
         * @returns A System.Drawing.Brush instance.
         */
        effectiveLabelBrush(context: RenderContext): Drawing.Brush;
        protected effectiveLabelBackground(context: RenderContext): Drawing.Brush;
        protected effectiveLabelBorderPen(context: RenderContext): Drawing.Pen;
        createTextRenderer(context: RenderContext): TextRenderer;
        drawIn3DPlot(): boolean;
        getFillAt(index: number): Drawing.Brush;
        getStrokeAt(index: number): Drawing.Pen;
        /**
         * Raises the PropertyChanged event.
         * @param propertyName Specifies the name of changed property.
         */
        protected onPropertyChanged(propertyName: string): void;
        /**
         * Occurs when a property value changes.
         * @event SeriesRenderer.propertyChanged
         * @type {Common.PropertyChangedEventDispatcher}
         * @property {SeriesRenderer} sender
         * @property {Common.PropertyChangedEventArgs} args
         */
        get propertyChanged(): Common.PropertyChangedEventDispatcher;
        private m_propertyChanged;
        private fills;
        private strokes;
        private m_labelFontName;
        private m_labelFontSize;
        private m_labelFontStyle;
        private m_labelBrush;
        private m_showHighlight;
        private m_showToolTips;
        /**
         * Implements the SeriesContainer interface. Enumerates the series associated with this component.
         * @returns An instance of the IEnumerable&lt;Series&gt; class.
         */
        abstract enumSeries(): IEnumerable<Series>;
        /**
        * Implements the SeriesContainer interface. Gets the index of the dimension
        * whose set of values should be treated as domain of plotted function.
        * @param {Series} series A Series in this container.
        * @returns The dimension index.
        */
        domainDimension(series: Series): number;
        /**
         * Subscribes to the DataChanged event of specified Series.
         * @param {Series} series A Series instance.
         */
        protected subscribe(series: Series): void;
        /**
         * Unsubscribes from the DataChanged event of specified Series.
         * @param {Series} series A Series instance.
         */
        protected unsubscribe(series: Series): void;
        /**
         * Called when Series raise their DataChanged event.
         * @param {Object} sender The Series raising the event.
         * @param {EventArgs} e An EventArgs instance.
         */
        protected onSeriesDataChanged(e: EventArgs): void;
        /**
         * Raised when Series raise their DataChanged event.
         * @event SeriesRenderer.dataChanged
         * @type {Components.EventDispatcher}
         * @property {SeriesRenderer} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        private m_dataChanged;
        m_id: number;
        id(): number;
        fromJson(obj: any): any;
        toJson(): any;
        static seriesFromJson(obj: any): Series | ObservableCollection<Series>;
    }
}
declare module "Charting/Utilities" {
    import { DateTimeFormat } from "Charting/DateTimeFormat";
    export class Utilities {
        static get v(): string;
        private static format1;
        static formatDateTime(ticks: number, dateTimeFormat: DateTimeFormat, customDateTimeFormat: string, labelPrefix: string, labelSuffix: string): string;
        static isInfinity(value: number): boolean;
        static isNullOrEmpty(value: string): boolean;
        static format(str: string, ...replacements: any[]): string;
        static compareTo(num: number, other: number): number;
        static parseType(typeName: string): any;
        static getType(obj: any): any;
        static genId(): number;
    }
    export class Serializer {
        static componentsIn: Map<number, any>;
        static componentsOut: Map<any, number>;
        static serializeComponent(component: any): any;
        static deserializeComponent(obj: any): any;
    }
}
declare module "Charting/MixedSeriesStyle" {
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
    * @class Implements SeriesStyle using mixed per-element and uniform values for attributes.
    * @property {Drawing.Brush} uniformFill Gets or sets a Brush used to fill all elements of all series uniformly.
    * @property {Drawing.Brush} uniformStroke Gets or sets a Brush used to stroke all elements of all series uniformly.
    * @property {Number} uniformStrokeThickness Gets or sets uniform stroke thickness for all elements of all series.
    * @property {Drawing.DashStyle} uniformStrokeDashStyle Gets or sets uniform stroke dash style for all elements of all series.
    * @property {List<Drawing.Brush>} commonFills Gets or sets a list of brushes, each Brush used to fill all elements of a series.
    * @property {List<Drawing.Brush>} commonStrokes Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
    * @property {Number} commonStrokeThicknesses Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
    * @property {Drawing.DashStyle} commonStrokeDashStyles Gets or sets a list of dash styles, each style applied to all elements of a series.
    * @property {List<List<Drawing.Brush>>} fills Gets or sets a list of Brush lists, each list used to draw a different series, and each Brush used to fill individual elements of a series.
    * @property {List<List<Drawing.Brush>>} strokes Gets or sets a list of Brush lists, each list used to stroke a different series, and each Brush used to stroke individual elements of a series.
    * @property {List<List<number>>} strokeThicknesses Gets or sets a list of number lists, each list used to stroke a different series, and each number value specifying thickness of individual elements of a series.
    * @property {List<List<Drawing.DashStyle>>} strokeDashStyles Gets or sets a list of DashStyle lists, each list used to stroke a different series, and each DashStyle value specifying style of individual elements of a series.
    */
    export class MixedSeriesStyle implements SeriesStyle {
        /**
             * Initializes a new instance of the MixedSeriesStyle class.
             * @param {Drawing.Brush} [fill] A Brush used to fill all series elements.
             * @param {Drawing.Brush} [stroke] A Brush used to stroke all series elements.
             * @param {Number} [strokeThickness] Uniform thickness of series elements' strokes.
             * @param {Drawing.DashStyle} [strokeDashStyle] Uniform dash style of series elements' strokes.
             */
        constructor(fill?: Drawing.Brush, stroke?: Drawing.Brush, strokeThickness?: number, strokeDashStyle?: Drawing.DashStyle);
        /**
         * Implements SeriesStyle.Stroke. Returns a Brush instance from
         * Fills, CommonFills or UniformFill properties.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.Stroke. Returns a Brush instance from
         * Strokes, CommonStrokes or UniformStroke properties.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.StrokeThickness. Returns a value from
         * StrokeThicknesses, CommonStrokeThicknesses or UniformStrokeThickness properties.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable number value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Implements SeriesStyle.StrokeDashStyle. Returns a value from
         * StrokeDashStyles, CommonStrokeDashStyles or UniformStrokeDashStyle properties.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): Drawing.DashStyle;
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        get uniformFill(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        set uniformFill(value: Drawing.Brush);
        private m_uniformFill;
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        get uniformStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        set uniformStroke(value: Drawing.Brush);
        private m_uniformStroke;
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        get uniformStrokeThickness(): number;
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        set uniformStrokeThickness(value: number);
        private m_uniformStrokeThickness;
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        get uniformStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        set uniformStrokeDashStyle(value: Drawing.DashStyle);
        private m_uniformStrokeDashStyle;
        /**
         * Gets or sets a list of brushes, each Brush used to fill all elements of a series.
         */
        get commonFills(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of brushes, each Brush used to fill all elements of a series.
         */
        set commonFills(value: List<Drawing.Brush>);
        private m_commonFills;
        /**
         * Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
         */
        get commonStrokes(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
         */
        set commonStrokes(value: List<Drawing.Brush>);
        private m_commonStrokes;
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        get commonStrokeThicknesses(): List<number>;
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        set commonStrokeThicknesses(value: List<number>);
        private m_commonStrokeThicknesses;
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        get commonStrokeDashStyles(): List<Drawing.DashStyle>;
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        set commonStrokeDashStyles(value: List<Drawing.DashStyle>);
        private m_commonStrokeDashStyles;
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        get fills(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        set fills(value: List<List<Drawing.Brush>>);
        private m_fills;
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        get strokes(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        set strokes(value: List<List<Drawing.Brush>>);
        private m_strokes;
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        get strokeThicknesses(): List<List<number>>;
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        set strokeThicknesses(value: List<List<number>>);
        private m_strokeThicknesses;
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        get strokeDashStyles(): List<List<Drawing.DashStyle>>;
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        set strokeDashStyles(value: List<List<Drawing.DashStyle>>);
        private m_strokeDashStyles;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/TextStyle" {
    import { Brush, FontStyle } from '@mindfusion/drawing';
    /**
    * Defines text appearance attributes.
    * @property {String} fontName Gets or sets font name.
    * @property {Number} fontSize Gets or sets font size.
    * @property {FontStyle} fontStyle Gets or sets font style.
    * @property {Brush} textBrush Gets or sets a Brush used to draw text.
    */
    export class TextStyle {
        /**
         * Initializes a new instance of the TextStyle class.
         */
        constructor();
        /**
         * Gets or sets font name.
         */
        get fontName(): string;
        /**
         * Gets or sets font name.
         */
        set fontName(value: string);
        private m_fontName;
        /**
         * Gets or sets font size.
         */
        get fontSize(): number;
        /**
         * Gets or sets font size.
         */
        set fontSize(value: number);
        private m_fontSize;
        /**
         * Gets or sets font style.
         */
        get fontStyle(): FontStyle;
        /**
         * Gets or sets font style.
         */
        set fontStyle(value: FontStyle);
        private m_fontStyle;
        /**
         * Gets or sets a Brush used to draw text.
         */
        get textBrush(): Brush;
        /**
         * Gets or sets a Brush used to draw text.
         */
        set textBrush(value: Brush);
        private m_textBrush;
        /**
         * Gets or sets a Brush used to draw text background.
         */
        get background(): Brush;
        /**
         * Gets or sets a Brush used to draw text background.
         */
        set background(value: Brush);
        private m_background;
        /**
         * Gets or sets a Brush used to draw text border.
         */
        get borderStroke(): Brush;
        /**
         * Gets or sets a Brush used to draw text border.
         */
        set borderStroke(value: Brush);
        private m_borderStroke;
        /**
         * Gets or sets the width of text border.
         */
        get borderStrokeThickness(): number;
        /**
         * Gets or sets the width of text border.
         */
        set borderStrokeThickness(value: number);
        private m_borderStrokeThickness;
        /**
         * Gets or sets the border dash style of text.
         */
        get borderStrokeDashStyle(): number;
        /**
         * Gets or sets the border dash style of text.
         */
        set borderStrokeDashStyle(value: number);
        private m_borderStrokeDashStyle;
    }
}
declare module "Charting/XmlPersistContext" {
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    /**
     * @class Contains methods that facilitate serializing and deserializing objects to and from XML documents.
    */
    export class XmlPersistContext {
        /**
         * Initializes a new instance of the XmlPersistContext class.
         * @param {XMLDocument} document
         * The associated XMLDocument.
         *
         * @param {number} fileVersion
         * Specifies the current file format number.
         *
         */
        constructor(document: Document, fileVersion: number);
        selectSingleNode(elementName: string, parentElement: Element): Element;
        hasValue(value: any): boolean;
        innerText(element: Element): string;
        /**
         * Adds a new child node with the specified name and
         * value to the specified parent node.
         */
        addChildElement(elementName: string, parentElement: Element, innerText?: string): Element;
        /**
         * Writes a string value with the specified name.
         */
        writeString(stringValue: string, elementName: string, parentElement: Element): Element;
        /**
         * Writes a boolean value with the specified name.
         */
        writeBool(boolValue: boolean, elementName: string, parentElement: Element): Element;
        /**
         * Writes an integer value with the specified name.
         */
        writeInt(intValue: number, elementName: string, parentElement: Element): Element;
        /**
         * Writes a float value with the specified name.
         */
        writeFloat(floatValue: number, elementName: string, parentElement: Element): Element;
        /**
         * Writes a reference to the specified brush. The brush
         * is registered within the internal hashtable for
         * subsequent serialization.
         */
        writeBrush(brush: Drawing.Brush, elementName: string, parentElement: Element): Element;
        /**
         * Writes all currently accumulated brushes.
         */
        writeBrushes(parentElement: Element): void;
        writeBrushContent(brushElement: Element, brush: Drawing.Brush): void;
        /**
        * Writes a list of brushes.
        */
        writeBrushList(list: List<Drawing.Brush>, elementName: string, subElementName: string, parentElement: Element): Element;
        /**
         * Writes a list of floating-point numbers.
         */
        writeFloatList(list: List<number>, elementName: string, subElementName: string, parentElement: Element): Element;
        /**
         * Writes a list of colors.
         */
        writeColorList(list: List<Drawing.Color>, elementName: string, subElementName: string, parentElement: Element): Element;
        /**
         * Writes a list of dash styles.
         */
        writeDashStyleList(list: List<Drawing.DashStyle>, elementName: string, subElementName: string, parentElement: Element): Element;
        /**
         * Writes the specified enum value.
         */
        writeEnum(enumValue: Object, elementName: string, parentElement: Element): Element;
        /**
         * Writes the specified color.
         */
        writeColor(color: Drawing.Color, elementName: string, parentElement: Element): Element;
        /**
         * Writes the specified object under the specified name.
         */
        private writeObject;
        /**
         * Reads a string value with the specified name.
         */
        readString(elementName: string, parentElement: Element, defaultValue?: string): string;
        /**
         * Reads a boolean value with the specified name.
         */
        readBool(elementName: string, parentElement: Element, defaultValue?: boolean): boolean;
        /**
         * Reads an integer value with the specified name.
         */
        readInt(elementName: string, parentElement: Element, defaultValue?: number): number;
        /**
         * Reads a float value with the specified name.
         */
        readFloat(elementName: string, parentElement: Element, defaultValue?: number): number;
        /**
         * Reads a list of floats.
         */
        readFloatList(elementName: string | Element, subElementName: string, parentElement: Element): List<number>;
        /**
         * Reads a list of dash styles.
         */
        readDashStyleList(elementName: string | Element, subElementName: string, parentElement?: Element): List<Drawing.DashStyle>;
        /**
         * Reads a Drawing.Brush object with the specified name.
         */
        readBrush(elementName: string | Element, parentElement: Element, defaultValue?: Drawing.Brush): Drawing.Brush;
        /**
         * Reads a list of brushes.
         */
        readBrushList(elementName: Element | string, subElementName: string, parentElement: Element): List<Drawing.Brush>;
        /**
         * Reads all brushes.
         */
        readBrushes(parentElement: Element): void;
        readBrushContent(brushElement: Element): Drawing.Brush;
        /**
         * Reads an enum value with the specified name.
         */
        readEnum(elementName: string, parentElement: Element, defaultValue?: number): Object;
        /**
         * Reads a color with the specified name.
         */
        readColor(elementName: string, parentElement: Element, defaultValue?: Drawing.Color): Drawing.Color;
        /**
         * Reads a Drawing.StringFormat object with the specified name.
         */
        readStringFormat(elementName: string, parentElement: Element, defultFormat?: Drawing.StringFormat): Drawing.StringFormat;
        /**
         * Reads an object with the specified name.
         */
        readObject(elementName: string, parentElement: any): Object;
        /**
         * Gets the underlying XML document.
         */
        get xmlDocument(): Document;
        /**
         * Gets the format revision number for the file being currently serialized.
         */
        get fileVersion(): number;
        /**
         * Gets or sets a value indicating whether resource accumulation is disabled.
         */
        get inplaceResources(): boolean;
        /**
         * Gets or sets a value indicating whether resource accumulation is disabled.
         */
        set inplaceResources(value: boolean);
        LatestFormat: number;
        private document;
        private brushes;
        private brushesMap;
        private m_fileVersion;
        private m_inplaceResources;
    }
}
declare module "Charting/Theme" {
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { MixedSeriesStyle } from "Charting/MixedSeriesStyle";
    import { TextStyle } from "Charting/TextStyle";
    /**
     * @class Represents a dashboard's theme defining all appearance attributes of its elements.
     * @property {String} titleFontName Gets or sets the name of font used to draw the chart title.
     * @property {Number} titleFontSize Gets or sets the size of font used to draw the chart title.
     * @property {Drawing.FontStyle} titleFontStyle Gets or sets the style of font used to draw the chart title.
     * @property {Drawing.Brush} titleBrush Gets or sets the Brush used to draw the chart title.
     * @property {String} subtitleFontName Gets or sets the name of font used to draw the chart sub-title.
     * @property {Number} subtitleFontSize Gets or sets the size of font used to draw the chart sub-title.
     * @property {Drawing.FontStyle} subtitleFontStyle Gets or sets the style of font used to draw the chart sub-title.
     * @property {Drawing.Brush} subtitleBrush Gets or sets the Brush used to draw the chart sub-title.
     * @property {String} axisLabelsFontName Gets or sets the name of font used to draw axis labels.
     * @property {Number} axisLabelsFontSize Gets or sets the size of font used to draw axis labels.
     * @property {Drawing.FontStyle} axisLabelsFontStyle Gets or sets the style of font used to draw axis labels.
     * @property {Drawing.Brush} axisLabelsBrush Gets or sets the Brush used to draw axis labels.
     * @property {String} axisTitleFontName Gets or sets the name of font used to draw axis titles.
     * @property {Number} axisTitleFontSize Gets or sets the size of font used to draw axis titles.
     * @property {Drawing.FontStyle} axisTitleFontStyle Gets or sets the style of font used to draw axis titles.
     * @property {Drawing.Brush} axisTitleBrush Gets or sets the Brush used to draw axis titles.
     * @property {String} dataLabelsFontName Gets or sets the name of font used to draw data labels.
     * @property {Number} dataLabelsFontSize Gets or sets the size of font used to draw data labels.
     * @property {Drawing.FontStyle} dataLabelsFontStyle Gets or sets the style of font used to draw data labels.
     * @property {Drawing.Brush} dataLabelsBrush Gets or sets the Drawing.Brush used to draw data labels.
     * @property {String} widgetFontName Gets or sets the name of font used to draw text in UI widgets.
     * @property {Number} widgetFontSize Gets or sets the size of font used to draw text in UI widgets.
     * @property {Drawing.FontStyle} widgetFontStyle Gets or sets the style of font used to draw text in UI widgets.
     * @property {Drawing.Brush} widgetBrush Gets or sets the Drawing.Brush used to draw text in UI widgets.
     * @property {String} legendTitleFontName Gets or sets the name of font used to draw legend titles.
     * @property {Number} legendTitleFontSize Gets or sets the size of font used to draw legend titles.
     * @property {Drawing.FontStyle} legendTitleFontStyle Gets or sets the style of font used to draw legend titles.
     * @property {Drawing.Brush} legendLabelsBrush Gets or sets the Brush used to draw legend labels.
     * @property {Drawing.Brush} uniformSeriesFill Gets or sets a Brush used to fill all elements of all series uniformly.
     * @property {Drawing.Brush} uniformSeriesStroke Gets or sets a Brush used to stroke all elements of all series uniformly.
     * @property {Number} uniformSeriesStrokeThickness Gets or sets uniform stroke thickness for all elements of all series.
     * @property {Drawing.DashStyle} uniformSeriesStrokeDashStyle Gets or sets uniform stroke dash style for all elements of all series.
     * @property {List<Drawing.Brush>} commonSeriesFills Gets or sets a list of brushes, each Brush used to fill all elements of a series.
     * @property {List<Drawing.Brush>} commonSeriesStrokes Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
     * @property {List<Number>} commonSeriesStrokeThicknesses Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
     * @property {List<Drawing.DashStyle>} commonSeriesStrokeDashStyles Gets or sets a list of dash styles, each style applied to all elements of a series.
     * @property {List<List<Drawing.Brush>>} seriesFills Gets or sets a list of Brush lists, each list used to draw a different series, and each Brush used to fill individual elements of a series.
     * @property {List<List<Drawing.Brush>>} seriesStrokes Gets or sets a list of Brush lists, each list used to stroke a different series, and each Brush used to stroke individual elements of a series.
     * @property {List<List<number>>} seriesStrokeThicknesses Gets or sets a list of number lists, each list used to stroke a different series, and each number value specifying thickness of individual elements of a series.
     * @property {List<List<Drawing.DashStyle>>} seriesStrokeDashStyles Gets or sets a list of DashStyle lists, each list used to stroke a different series, and each DashStyle value specifying style of individual elements of a series.
     * @property {Drawing.Brush} plotBackground Gets or sets a Brush used to draw the background of plots.
     * @property {Drawing.Brush} plotBorderStroke Gets or sets a Brush used to stroke plot borders.
     * @property {Number} plotBorderStrokeThickness Gets or sets the thickness of plot borders.
     * @property {Drawing.DashStyle} plotBorderStrokeDashStyle Gets or sets the thickness of plot borders.
     * @property {Drawing.Brush} legendBackground Gets or sets a Brush used to draw legend background.
     * @property {Drawing.Brush} highlightStroke Gets or sets a Brush used to stroke highlighted items.
     * @property {Number} highlightStrokeThickness Gets or sets the thickness of highlight strokes.
     * @property {Drawing.DashStyle} highlightStrokeDashStyle Gets or sets the dash style of highlight strokes.
     * @property {Drawing.Brush} axisStroke Gets or sets a Brush used to stroke axis lines.
     * @property {Number} axisStrokeThickness Gets or sets the thickness of axis lines.
     * @property {Drawing.DashStyle} axisStrokeDashStyle Gets or sets the dash style of axis lines.
     * @property {Drawing.Brush} legendBorderStroke Gets or sets a Brush used to draw legend borders.
     * @property {Number} legendBorderStrokeThickness Gets or sets the thickness of legend borders.
     * @property {Drawing.DashStyle} legendBorderStrokeDashStyle Gets or sets the dash style of legend borders.
     * @property {Drawing.Color} gridLineColor Gets or sets the line color of plot grid.
     * @property {Number} gridLineThickness Gets or sets the thickness of plot grid lines.
     * @property {Drawing.DashStyle} gridLineStyle Gets or sets the style of plot grid lines.
     * @property {Drawing.Color} gridColor1 Gets or sets the main color of plot grid.
     * @property {Drawing.Color} gridColor2 Gets or sets the alternating color of plot grid.
     * @property {Drawing.Brush} gaugeBackground Gets or sets a Brush used to draw gauge backgrounds.
     * @property {Drawing.Brush} gaugeStroke Gets or sets a Brush used to stroke gauge borders.
     * @property {Number} gaugeStrokeThickness Gets or sets the thickness of gauge borders.
     * @property {Drawing.Brush} gaugeScaleBackground Gets or sets a Brush used to draw gauge scale backgrounds.
     * @property {Drawing.Brush} gaugeScaleStroke Gets or sets a Brush used to stroke gauge scale borders.
     * @property {Number} gaugeScaleStrokeThickness Gets or sets the thickness of gauge scale borders.
     * @property {Drawing.Brush} gaugePointerBackground Gets or sets a Brush used to draw gauge pointer backgrounds.
     * @property {Drawing.Brush} gaugePointerStroke Gets or sets a Brush used to stroke gauge pointer borders.
     * @property {Number} gaugePointerStrokeThickness Gets or sets the thickness of gauge pointer borders.
     * @property {Drawing.Brush} gaugeTickBackground Gets or sets a Brush used to draw gauge tick backgrounds.
     * @property {Drawing.Brush} gaugeTickStroke Gets or sets a Brush used to stroke gauge tick borders.
     * @property {Number} gaugeTickStrokeThickness Gets or sets the thickness of gauge tick borders.
     * @property {String} gaugeFontName Gets or sets the name of font used to draw text in gauges.
     * @property {Drawing.FontStyle} gaugeFontStyle Gets or sets the style of font used to draw text in gauges.
     * @property {Number} gaugeFontSize Gets or sets the size of font used to draw text in gauges.
     */
    export class Theme implements Common.INotifyPropertyChanged {
        private static defaultDataLabelColor;
        private static defaultTextColor;
        private static defaultWidgetTextColor;
        private static defaultBackColor;
        private static defaultHighlightColor;
        private static defaultGaugeStrokeColor;
        private static defaultGaugeElementColor;
        private static generalThemeColor1;
        private static generalThemeColor2;
        private static generalThemeColor3;
        private static generalThemeColor4;
        private static generalThemeColor5;
        /**
         * Initializes a new instance of the Theme class.
         * @param {Drawing.Brush} fill A Drawing.Brush used to fill all series elements.
         * @param {Drawing.Brush} stroke A Drawing.Brush used to stroke all series elements.
         * @param {Number} strokeThickness Uniform thickness of series elements' strokes.
         * @param {Drawing.DashStyle} strokeDashStyle Uniform dash style of series elements' strokes.
         */
        constructor(fill?: Drawing.Brush, stroke?: Drawing.Brush, strokeThickness?: number, strokeDashStyle?: Drawing.DashStyle);
        private initDefaults;
        /**
         * Loads the theme values from an XML file.
         * @param {String} fileUrl The URL of an XML file where the data should be read from.
         */
        loadFrom(fileUrl: string): void;
        /**
        * Saves the theme values to specified file.
        * @param {String} fileUrl The URL where the theme's XML should be posted to.
        */
        saveTo(url: string): void;
        private loadFromXml;
        private saveToXml;
        private onPropertyChanged;
        private suppressEvent;
        /**
         * Occurs when a property value changes.
         * @event Theme.propertyChanged
         * @type {PropertyChangedEventDispatcher}
         * @property {Theme} sender
         * @property {PropertyChangedEventArgs} args
         */
        get propertyChanged(): Common.PropertyChangedEventDispatcher;
        private m_propertyChanged;
        get seriesStyle(): MixedSeriesStyle;
        set seriesStyle(value: MixedSeriesStyle);
        private m_seriesStyle;
        get titleStyle(): TextStyle;
        set titleStyle(value: TextStyle);
        private m_titleStyle;
        get subtitleStyle(): TextStyle;
        set subtitleStyle(value: TextStyle);
        private m_subtitleStyle;
        get axisLabelsStyle(): TextStyle;
        set axisLabelsStyle(value: TextStyle);
        private m_axisLabelsStyle;
        get axisTitleStyle(): TextStyle;
        set axisTitleStyle(value: TextStyle);
        private m_axisTitleStyle;
        get dataLabelsStyle(): TextStyle;
        set dataLabelsStyle(value: TextStyle);
        private m_dataLabelsStyle;
        get widgetStyle(): TextStyle;
        set widgetStyle(value: TextStyle);
        private m_widgetStyle;
        get legendTitleStyle(): TextStyle;
        set legendTitleStyle(value: TextStyle);
        private m_legendTitleStyle;
        /**
         * Gets or sets the name of font used to draw the chart title.
         */
        get titleFontName(): string;
        /**
         * Gets or sets the name of font used to draw the chart title.
         */
        set titleFontName(value: string);
        /**
         * Gets or sets the size of font used to draw the chart title.
         */
        get titleFontSize(): number;
        /**
         * Gets or sets the size of font used to draw the chart title.
         */
        set titleFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw the chart title.
         */
        get titleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw the chart title.
         */
        set titleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw the chart title.
         */
        get titleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw the chart title.
         */
        set titleBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw the chart sub-title.
         */
        get subtitleFontName(): string;
        /**
         * Gets or sets the name of font used to draw the chart sub-title.
         */
        set subtitleFontName(value: string);
        /**
         * Gets or sets the size of font used to draw the chart sub-title.
         */
        get subtitleFontSize(): number;
        /**
         * Gets or sets the size of font used to draw the chart sub-title.
         */
        set subtitleFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw the chart sub-title.
         */
        get subtitleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw the chart sub-title.
         */
        set subtitleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw the chart sub-title.
         */
        get subtitleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw the chart sub-title.
         */
        set subtitleBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw axis labels.
         */
        get axisLabelsFontName(): string;
        /**
         * Gets or sets the name of font used to draw axis labels.
         */
        set axisLabelsFontName(value: string);
        /**
         * Gets or sets the size of font used to draw axis labels.
         */
        get axisLabelsFontSize(): number;
        /**
         * Gets or sets the size of font used to draw axis labels.
         */
        set axisLabelsFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw axis labels.
         */
        get axisLabelsFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw axis labels.
         */
        set axisLabelsFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw axis labels.
         */
        get axisLabelsBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw axis labels.
         */
        set axisLabelsBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw axis titles.
         */
        get axisTitleFontName(): string;
        /**
         * Gets or sets the name of font used to draw axis titles.
         */
        set axisTitleFontName(value: string);
        /**
         * Gets or sets the size of font used to draw axis titles.
         */
        get axisTitleFontSize(): number;
        /**
         * Gets or sets the size of font used to draw axis titles.
         */
        set axisTitleFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw axis titles.
         */
        get axisTitleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw axis titles.
         */
        set axisTitleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw axis titles.
         */
        get axisTitleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw axis titles.
         */
        set axisTitleBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw data labels.
         */
        get dataLabelsFontName(): string;
        /**
         * Gets or sets the name of font used to draw data labels.
         */
        set dataLabelsFontName(value: string);
        /**
         * Gets or sets the size of font used to draw data labels.
         */
        get dataLabelsFontSize(): number;
        /**
         * Gets or sets the size of font used to draw data labels.
         */
        set dataLabelsFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw data labels.
         */
        get dataLabelsFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw data labels.
         */
        set dataLabelsFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw data labels.
         */
        get dataLabelsBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw data labels.
         */
        set dataLabelsBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw text in UI widgets.
         */
        get widgetFontName(): string;
        /**
         * Gets or sets the name of font used to draw text in UI widgets.
         */
        set widgetFontName(value: string);
        /**
         * Gets or sets the size of font used to draw text in UI widgets.
         */
        get widgetFontSize(): number;
        /**
         * Gets or sets the size of font used to draw text in UI widgets.
         */
        set widgetFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw text in UI widgets.
         */
        get widgetFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw text in UI widgets.
         */
        set widgetFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw text in UI widgets.
         */
        get widgetBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw text in UI widgets.
         */
        set widgetBrush(value: Drawing.Brush);
        /**
         * Gets or sets the name of font used to draw legend titles.
         */
        get legendTitleFontName(): string;
        /**
         * Gets or sets the name of font used to draw legend titles.
         */
        set legendTitleFontName(value: string);
        /**
         * Gets or sets the size of font used to draw legend titles.
         */
        get legendTitleFontSize(): number;
        /**
         * Gets or sets the size of font used to draw legend titles.
         */
        set legendTitleFontSize(value: number);
        /**
         * Gets or sets the style of font used to draw legend titles.
         */
        get legendTitleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw legend titles.
         */
        set legendTitleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw legend titles.
         */
        get legendTitleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw legend titles.
         */
        set legendTitleBrush(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        get uniformSeriesFill(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        set uniformSeriesFill(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        get uniformSeriesStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        set uniformSeriesStroke(value: Drawing.Brush);
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        get uniformSeriesStrokeThickness(): number;
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        set uniformSeriesStrokeThickness(value: number);
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        get uniformSeriesStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        set uniformSeriesStrokeDashStyle(value: Drawing.DashStyle);
        /**
         * Gets or sets a list of brushes, each Brush used to fill all elements of a series.
         */
        get commonSeriesFills(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of brushes, each Brush used to fill all elements of a series.
         */
        set commonSeriesFills(value: List<Drawing.Brush>);
        /**
         * Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
         */
        get commonSeriesStrokes(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of brushes, each Brush used to stroke all elements of a series.
         */
        set commonSeriesStrokes(value: List<Drawing.Brush>);
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        get commonSeriesStrokeThicknesses(): List<number>;
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        set commonSeriesStrokeThicknesses(value: List<number>);
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        get commonSeriesStrokeDashStyles(): List<Drawing.DashStyle>;
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        set commonSeriesStrokeDashStyles(value: List<Drawing.DashStyle>);
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        get seriesFills(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        set seriesFills(value: List<List<Drawing.Brush>>);
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        get seriesStrokes(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        set seriesStrokes(value: List<List<Drawing.Brush>>);
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        get seriesStrokeThicknesses(): List<List<number>>;
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        set seriesStrokeThicknesses(value: List<List<number>>);
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        get seriesStrokeDashStyles(): List<List<Drawing.DashStyle>>;
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        set seriesStrokeDashStyles(value: List<List<Drawing.DashStyle>>);
        private m_plotBackground;
        /**
         * Gets or sets a Brush used to draw the background of plots.
         */
        get plotBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of plots.
         */
        set plotBackground(value: Drawing.Brush);
        private m_plotBorderStroke;
        /**
         * Gets or sets a Brush used to stroke plot borders.
         */
        get plotBorderStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke plot borders.
         */
        set plotBorderStroke(value: Drawing.Brush);
        private m_plotBorderStrokeThickness;
        /**
         * Gets or sets the thickness of plot borders.
         */
        get plotBorderStrokeThickness(): number;
        /**
         * Gets or sets the thickness of plot borders.
         */
        set plotBorderStrokeThickness(value: number);
        private m_plotBorderStrokeDashStyle;
        /**
         * Gets or sets the dash style of plot borders.
         */
        get plotBorderStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the dash style of plot borders.
         */
        set plotBorderStrokeDashStyle(value: Drawing.DashStyle);
        private m_legendBackground;
        /**
         * Gets or sets a Brush used to draw legend background.
         */
        get legendBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw legend background.
         */
        set legendBackground(value: Drawing.Brush);
        /**
         * Gets or sets a Brush used to stroke highlighted items.
         */
        get highlightStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke highlighted items.
         */
        set highlightStroke(value: Drawing.Brush);
        private m_highlightStroke;
        /**
         * Gets or sets the thickness of highlight strokes.
         */
        get highlightStrokeThickness(): number;
        /**
         * Gets or sets the thickness of highlight strokes.
         */
        set highlightStrokeThickness(value: number);
        private m_highlightStrokeThickness;
        /**
         * Gets or sets the dash style of highlight strokes.
         */
        get highlightStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the dash style of highlight strokes.
         */
        set highlightStrokeDashStyle(value: Drawing.DashStyle);
        private m_highlightStrokeDashStyle;
        /**
         * Gets or sets a Brush used to stroke axis lines.
         */
        get axisStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke axis lines.
         */
        set axisStroke(value: Drawing.Brush);
        private m_axisStroke;
        /**
         * Gets or sets the thickness of axis lines.
         */
        get axisStrokeThickness(): number;
        /**
         * Gets or sets the thickness of axis lines.
         */
        set axisStrokeThickness(value: number);
        private m_axisStrokeThickness;
        /**
         * Gets or sets the dash style of axis lines.
         */
        get axisStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the dash style of axis lines.
         */
        set axisStrokeDashStyle(value: Drawing.DashStyle);
        private m_axisStrokeDashStyle;
        private m_legendBorderStroke;
        /**
         * Gets or sets a Brush used to draw legend borders.
         */
        get legendBorderStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw legend borders.
         */
        set legendBorderStroke(value: Drawing.Brush);
        private m_legendBorderStrokeThickness;
        /**
         * Gets or sets the thickness of legend borders.
         */
        get legendBorderStrokeThickness(): number;
        /**
         * Gets or sets the thickness of legend borders.
         */
        set legendBorderStrokeThickness(value: number);
        private m_legendBorderStrokeDashStyle;
        /**
         * Gets or sets the dash style of legend borders.
         */
        get legendBorderStrokeDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the dash style of legend borders.
         */
        set legendBorderStrokeDashStyle(value: Drawing.DashStyle);
        /**
        * Gets or sets the line color of plot grid.
        */
        get gridLineColor(): Drawing.Color;
        private m_gridLineColor;
        /**
        * Gets or sets the line color of plot grid.
        */
        set gridLineColor(value: Drawing.Color);
        /**
        * Gets or sets the thickness of plot grid lines.
        */
        get gridLineThickness(): number;
        private m_gridLineThickness;
        /**
        * Gets or sets the thickness of plot grid lines.
        */
        set gridLineThickness(value: number);
        /**
        * Gets or sets the style of plot grid lines.
        */
        get gridLineStyle(): Drawing.DashStyle;
        private m_gridLineStyle;
        /**
        * Gets or sets the style of plot grid lines.
        */
        set gridLineStyle(value: Drawing.DashStyle);
        private m_gridColor1;
        /**
         * Gets or sets the main color of plot grid.
         */
        get gridColor1(): Drawing.Color;
        /**
         * Gets or sets the main color of plot grid.
         */
        set gridColor1(value: Drawing.Color);
        private m_gridColor2;
        /**
         * Gets or sets the alternating color of plot grid.
         */
        get gridColor2(): Drawing.Color;
        /**
         * Gets or sets the alternating color of plot grid.
         */
        set gridColor2(value: Drawing.Color);
        private m_dataLabelsBackground;
        /**
         * Gets or sets the Drawing.Brush used to draw the background of data labels.
         */
        get dataLabelsBackground(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw the background of data labels.
         */
        set dataLabelsBackground(value: Drawing.Brush);
        private m_dataLabelsBorderStroke;
        /**
         * Gets or sets the Drawing.Brush used to draw the border of data labels.
         */
        get dataLabelsBorderStroke(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw the border of data labels.
         */
        set dataLabelsBorderStroke(value: Drawing.Brush);
        private m_dataLabelsBorderThickness;
        /**
         * Gets or sets the border width of data labels.
         */
        get dataLabelsBorderThickness(): number;
        /**
         * Gets or sets the border width of data labels.
         */
        set dataLabelsBorderThickness(value: number);
        private m_dataLabelsBorderDashStyle;
        /**
         * Gets or sets the border dash style of data labels.
         */
        get dataLabelsBorderDashStyle(): Drawing.DashStyle;
        /**
         * Gets or sets the border dash style of data labels.
         */
        set dataLabelsBorderDashStyle(value: Drawing.DashStyle);
        private m_gaugeBackground;
        /**
         * Gets or sets a Brush used to draw gauge backgrounds.
         */
        get gaugeBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw gauge backgrounds.
         */
        set gaugeBackground(value: Drawing.Brush);
        private m_gaugeStroke;
        /**
         * Gets or sets a Brush used to stroke gauge borders.
         */
        get gaugeStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge borders.
         */
        set gaugeStroke(value: Drawing.Brush);
        private m_gaugeStrokeThickness;
        /**
         * Gets or sets the thickness of gauge borders.
         */
        get gaugeStrokeThickness(): number;
        /**
         * Gets or sets the thickness of gauge borders.
         */
        set gaugeStrokeThickness(value: number);
        private m_gaugeScaleBackground;
        /**
         * Gets or sets a Brush used to draw the background of gauge scales.
         */
        get gaugeScaleBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw the background of gauge scales.
         */
        set gaugeScaleBackground(value: Drawing.Brush);
        private m_gaugeScaleStroke;
        /**
         * Gets or sets a Brush used to stroke gauge scales.
         */
        get gaugeScaleStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge scales.
         */
        set gaugeScaleStroke(value: Drawing.Brush);
        private m_gaugeScaleStrokeThickness;
        /**
         * Gets or sets the thickness of gauge scale strokes.
         */
        get gaugeScaleStrokeThickness(): number;
        /**
         * Gets or sets the thickness of gauge scale strokes.
         */
        set gaugeScaleStrokeThickness(value: number);
        private m_gaugePointerBackground;
        /**
         * Gets or sets a Brush used to draw gauge pointer backgrounds.
         */
        get gaugePointerBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw gauge pointer backgrounds.
         */
        set gaugePointerBackground(value: Drawing.Brush);
        private m_gaugePointerStroke;
        /**
         * Gets or sets a Brush used to stroke gauge pointers.
         */
        get gaugePointerStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge pointers.
         */
        set gaugePointerStroke(value: Drawing.Brush);
        private m_gaugePointerStrokeThickness;
        /**
         * Gets or sets the thickness of gauge pointer strokes.
         */
        get gaugePointerStrokeThickness(): number;
        /**
         * Gets or sets the thickness of gauge pointer strokes.
         */
        set gaugePointerStrokeThickness(value: number);
        private m_gaugeTickBackground;
        /**
         * Gets or sets a Brush used to draw gauge tick backgrounds.
         */
        get gaugeTickBackground(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to draw gauge tick backgrounds.
         */
        set gaugeTickBackground(value: Drawing.Brush);
        private m_gaugeTickStroke;
        /**
         * Gets or sets a Brush used to stroke gauge ticks.
         */
        get gaugeTickStroke(): Drawing.Brush;
        /**
         * Gets or sets a Brush used to stroke gauge ticks.
         */
        set gaugeTickStroke(value: Drawing.Brush);
        private m_gaugeTickStrokeThickness;
        /**
         * Gets or sets the thickness of gauge tick strokes.
         */
        get gaugeTickStrokeThickness(): number;
        /**
         * Gets or sets the thickness of gauge tick strokes.
         */
        set gaugeTickStrokeThickness(value: number);
        private m_gaugeFontName;
        /**
         * Gets or sets the name of font used to draw text in gauges.
         */
        get gaugeFontName(): string;
        /**
         * Gets or sets the name of font used to draw text in gauges.
         */
        set gaugeFontName(value: string);
        private m_gaugeFontStyle;
        /**
         * Gets or sets the style of font used to draw text in gauges.
         */
        get gaugeFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of font used to draw text in gauges.
         */
        set gaugeFontStyle(value: Drawing.FontStyle);
        private m_gaugeFontSize;
        /**
         * Gets or sets the size of font used to draw text in gauges.
         */
        get gaugeFontSize(): number;
        /**
         * Gets or sets the size of font used to draw text in gauges.
         */
        set gaugeFontSize(value: number);
        fileVersion: number;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/Renderer2D" {
    import { ObservableCollection, List, IEnumerable } from '@mindfusion/common-collections';
    import * as Components from "Charting/Components/Components";
    import { Point, Rect } from '@mindfusion/drawing';
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { Axis } from "Charting/Axis";
    /**
    * @class A base class for series renderers that draw in two dimensional Cartesian coordinate system.
    * @property {ObservableCollection<Series>} series Gets or sets a list of Series drawn by this Renderer2D.
    * @property {MindFusion.Charting.Axis} xAxis Gets the X axis associated with this Renderer2D.
    * @property {MindFusion.Charting.Axis} yAxis Gets the Y axis associated with this Renderer2D.
    */
    export class Renderer2D extends SeriesRenderer {
        /**
         * Initializes a new instance of the Renderer2D class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Gets or sets a list of Series drawn by this Renderer2D.
         */
        get series(): ObservableCollection<Series>;
        /**
         * Gets or sets a list of Series drawn by this Renderer2D.
         */
        set series(value: ObservableCollection<Series>);
        private m_series;
        private subscribeToCollection;
        private unsubscribeFromCollection;
        private onSeriesCollectionChanged;
        /**
         * Enumerates the data values of rendered series mapped to plot 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessPoint} process A ProcessPoint callback.
         * @remarks The signature of the ProcessPoint delegate is as follows:
         * 'function(seriesIndex, dataIndex, point)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} point A Point instance containing the Plot2D coordinates corresponding to current data item.
         * The method is not expected to return a value.
         */
        enumVisiblePoints1(context: RenderContext, process: ProcessPoint): void;
        domainAxis(context: RenderContext): Axis;
        imageAxis(context: RenderContext): Axis;
        domainSorted(seriesIndex: number): boolean;
        domainMin(s: Series): number;
        domainMax(s: Series): number;
        /**
         * Gets the domain axis coordinate (input value) of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @returns {Number} A number value.
         */
        domainData(seriesIndex: number, dataIndex: number): number;
        /**
         * Gets the image axis coordinate (output value) of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @returns {Number} A number value.
         */
        imageData(seriesIndex: number, dataIndex: number): number;
        get yDomain(): boolean;
        set yDomain(value: boolean);
        plotLen(context: RenderContext): number;
        /**
         * Enumerates the data values of rendered series mapped to plot 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Boolean} frontToBack true if the series list should be enumerated from front to back, or false otherwise.
         * @param {ProcessPoint} process A ProcessPoint callback.
         * @remarks The signature of the ProcessPoint delegate is as follows:
         * 'function(seriesIndex, dataIndex, point)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} point A Point instance containing the Plot2D coordinates corresponding to current data item.
         * The method is not expected to return a value.
         */
        enumVisiblePoints(context: RenderContext, frontToBack: boolean, process: ProcessPoint): void;
        rangeMargin: number;
        /**
         * Enumerates the data values of rendered series mapped to plot 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessPoints} process A ProcessPoints callback.
         * @remarks The signature of the ProcessPoints delegate is as follows:
         * 'function(seriesIndex, dataIndex, point)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} point1 A Point instance containing the Plot2D coordinates corresponding to previous data item.
         * param {Point} point2 A Point instance containing the Plot2D coordinates corresponding to current data item.
         * The method is not expected to return a value.
         */
        enumVisiblePointPairs(context: RenderContext, process: ProcessPoints): void;
        /**
         * Enumerates each series once providing a list of all visible points at each iteration.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessRange} process A ProcessRange callback.
         * @remarks The signature of the ProcessRange delegate is as follows:
         * 'function(seriesIndex, points)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {List<Point>} points A list of Point values containing the Plot2D coordinates corresponding to data items in currently visible range.
         * The method is not expected to return a value.
         */
        enumVisibleRanges(context: RenderContext, process: ProcessRange): void;
        /**
         * SeriesRenderer.StartMeasureData override. Called to reset measure
         * accumulators at the beginning of a measure pass.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        startMeasureData(context: RenderContext): void;
        findDomainMin(): number;
        findDomainMax(): number;
        /**
         * Implements the SeriesContainer interface.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        /**
         * Gets the X axis associated with this Renderer2D.
         */
        get xAxis(): Axis;
        /**
         * Gets the X axis associated with this Renderer2D.
         */
        set xAxis(value: Axis);
        private m_xAxis;
        /**
         * Gets the Y axis associated with this Renderer2D.
         */
        get yAxis(): Axis;
        /**
         * Gets the Y axis associated with this Renderer2D.
         */
        set yAxis(value: Axis);
        private m_yAxis;
        /**
         * SeriesRenderer.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        fitExponent(range: number): number;
        adjustForNonEmptyBars(context: RenderContext): void;
        /**
         * Gets the X value of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @returns {Number} A number value.
         */
        xData(seriesIndex: number, dataIndex: number): number;
        /**
         * Gets the Y value of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @returns {Number} A number value.
         */
        yData(seriesIndex: number, dataIndex: number): number;
        /**
         * Gets a value indicating whether values of specified series increase monotonously in X dimension.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @returns {Boolean} true if specified series is sorted, or false otherwise.
         */
        xSorted(seriesIndex: number): boolean;
        /**
         * Gets a value indicating whether values of specified series increase monotonously in Y dimension.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @returns {Boolean} true if specified series is sorted, or false otherwise.
         */
        ySorted(seriesIndex: number): boolean;
        /**
         * Gets the coordinates of specified data item when mapped to a Plot2D pixel.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {MindFusion.Charting.Axis} xAxis An Axis reference specifying the X axis.
         * @param {MindFusion.Charting.Axis} yAxis An Axis reference specifying the Y axis.
         * @param {Components.Components.Component} component An instance of Plot2D or derived class.
         * @returns {Point} A Point containing Plot2D coordinates corresponding to specified data item.
         */
        getPixel(seriesIndex: number, dataIndex: number, xAxis: Axis, yAxis: Axis, component: Components.Component): Point;
        /**
         * Gets the coordinates of specified data item when mapped to a Plot2D pixel.
         * @param {Number} valueX The X value of data item in logical coordinate system.
         * @param {MindFusion.Charting.Axis} xAxis The X Axis from which logical value is mapped to plot's actual width.
         * @param {Number} valueY The Y value of data item in logical coordinate system.
         * @param {MindFusion.Charting.Axis} yAxis The Y Axis from which logical value is mapped to plot's actual height.
         * @param {Components.Components.Component} component An instance of Plot2D or derived class.
         * @returns {Point}
         */
        getPixel1(valueX: number, xAxis: Axis, valueY: number, yAxis: Axis, component: Components.Component): Point;
        /**
         * Gets the maximum sum of X data values locates at same index in all series.
         * @returns {Number} A number value containing the maximum sum.
         */
        getMaxXSum(): number;
        /**
         * Gets the maximum sum of Y data values locates at same index in all series.
         * @returns {Number} A number value containing the maximum sum.
         */
        getMaxYSum(): number;
        getMaxXSumPositive(origin: number): number;
        getMinXSumNegative(origin: number): number;
        getMaxYSumPositive(origin: number): number;
        getMinYSumNegative(origin: number): number;
        /**
         * Gets the index of first data item in currently visible plot range.
         * @param {Number} s An integer value specifying index in Series list.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Number} An integer index of first visible data item.
         */
        getFirstInRange(s: number, context: RenderContext): number;
        getFirstInRange(s: number, axis: Axis): number;
        /**
         * Gets the index of last data item in currently visible plot range.
         * @param {Number} s An integer value specifying index in Series list.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Number} An integer index of last visible data item.
         */
        getLastInRange(s: number, context: RenderContext): number;
        getLastInRange(s: number, axis: Axis): number;
        /**
         * SeriesRenderer.HitTest override. Hit-tests the visual representation of the series for a data item.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for data items.
         * @returns {MindFusion.Charting.HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * SeriesRenderer.DrawHighlight override. Draws highlighted data item in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {MindFusion.Charting.HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        midX(rect: Rect): number;
        midY(rect: Rect): number;
        fromJson(json: any): any;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process a data point one element at a time.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Point} point A Point instance containing the Plot2D coordinates corresponding to current data item.
    */
    export interface ProcessPoint {
        (seriesIndex: number, dataIndex: number, point: Point): any;
    }
    /**
    * Defines the signature of delegates called to process data points in pairs.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Point} point1 A Point instance containing the Plot2D coordinates corresponding to previous data item.
    * @param {Point} point2 A Point instance containing the Plot2D coordinates corresponding to current data item.
    */
    export interface ProcessPoints {
        (seriesIndex: number, dataIndex: number, point1: Point, point2: Point): any;
    }
    /**
    * Defines the signature of delegates called to process all points from current data range at once.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {List<Point>} points A list of Point values containing the Plot2D coordinates corresponding to data items in currently visible range.
    */
    export interface ProcessRange {
        (seriesIndex: number, points: List<Point>): any;
    }
}
declare module "Charting/Point3D" {
    /**
    * @class Represents a point in 3D space.
    * @property {Number} x Gets or sets the X coordinate of this point.
    * @property {Number} y Gets or sets the Y coordinate of this point.
    * @property {Number} z Gets or sets the Z coordinate of this point.
    */
    export class Point3D {
        /**
         * Initializes a new instance of the Point3D struct.
         * @param {Number} x X coordinate of the point.
         * @param {Number} y Y coordinate of the point.
         * @param {Number} z Z coordinate of the point.
         */
        constructor(x: number, y: number, z: number);
        /**
         * Gets the distance to specified point.
         * @param {Point3D} p A Point3D instance.
         * @returns {Number} A number value representing the distance.
         */
        distance(p: Point3D): number;
        /**
         * Sums two points' coordinates.
         * @param {Point3D} p1 The first point.
         * @param {Point3D} p2 The second point.
         * @returns {Point3D} A Point3D containing sum of coordinates.
         */
        static add(p1: Point3D, p2: Point3D): Point3D;
        /**
         * Scales the point's coordinates by specified scale factor.
         * @param {Number} scale A number value by which to multiply point's coordinates.
         * @returns {Point3D} A Point3D containing scaled coordinates.
         */
        scale(scale: number): Point3D;
        /**
         * Returns a string representation of this point.
         * @returns {String} A string representation of this point.
         */
        toString(): string;
        /**
         * Gets or sets the X coordinate of this point.
         */
        get x(): number;
        /**
         * Gets or sets the X coordinate of this point.
         */
        set x(value: number);
        private m_x;
        /**
         * Gets or sets the Y coordinate of this point.
         */
        get y(): number;
        /**
         * Gets or sets the Y coordinate of this point.
         */
        set y(value: number);
        private m_y;
        /**
         * Gets or sets the Z coordinate of this point.
         */
        get z(): number;
        /**
         * Gets or sets the Z coordinate of this point.
         */
        set z(value: number);
        private m_z;
    }
}
declare module "Charting/ZoomHistory" {
    /**
    * @namespace MindFusion.Charting
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
    import { IEnumerable } from '@mindfusion/common-collections';
    import { EventDispatcher } from '@mindfusion/common';
    import * as Components from "Charting/Components/Components";
    import { Axis } from "Charting/Axis";
    export class ZoomHistory {
        constructor(parent: Components.Component);
        merge(axes: IEnumerable<Axis>): void;
        register(axes: IEnumerable<Axis>): void;
        restore(): void;
        reset(): void;
        private restoreState;
        private onChanged;
        get changed(): EventDispatcher<EventArgs>;
        private m_changed;
        get canRestore(): boolean;
        get isZoomedOut(): boolean;
        set isZoomedOut(value: boolean);
        private m_isZoomedOut;
        private parent;
        private plotStates;
    }
}
declare module "Charting/Vector" {
    import { Point } from '@mindfusion/drawing';
    /**
     * @class Represents a two-dimensional vector.
     * @property {Number} x Gets or sets the X component of this vector.
     * @property {Number} y Gets or sets the Y component of this vector.
     * @property {Number} length Gets the length of this vector.
     * @property {Number} lengthSquared Gets the squared length of this vector.
     */
    export class Vector {
        /**
         * Initializes a new instance of the Vector struct.
         * @param {Number} x X component of the vector.
         * @param {Number} y Y component of the vector.
         */
        constructor(x: number, y: number);
        /**
         * Makes this vector a unit vector.
         */
        normalize(): void;
        /**
         * Returns the size of cross-product of two vectors.
         * @param {MindFusion.Charting.Vector} vector1 The first vector.
         * @param {MindFusion.Charting.Vector} vector2 The second vector.
         * @returns {Number} The size of cross-product.
         */
        static crossProduct(vector1: Vector, vector2: Vector): number;
        /**
         * Determines the angle between two vectors.
         * @param {MindFusion.Charting.Vector} vector1 The first vector.
         * @param {MindFusion.Charting.Vector} vector2 The second vector.
         * @returns {Number} The angle between specified vectors.
         */
        static angleBetween(vector1: Vector, vector2: Vector): number;
        /**
         * Reverses the direction of this vector.
         */
        negate(): void;
        /**
         * Adds two vectors.
         * @param {MindFusion.Charting.Vector} vector1 The first vector.
         * @param {MindFusion.Charting.Vector} vector2 The second vector.
         * @returns {MindFusion.Charting.Vector} A vector representing the sum of specified vectors.
         */
        static add(vector1: Vector, vector2: Vector): Vector;
        /**
         * Translates point by a vector.
         * @param {MindFusion.Charting.Vector} vector The vector to add.
         * @param {Point} point The reference point.
         * @returns {Point} The translated point.
         */
        static addPoint(vector: Vector, point: Point): Point;
        /**
         * Subtracts two vectors.
         * @param {MindFusion.Charting.Vector} vector1 The first vector.
         * @param {MindFusion.Charting.Vector} vector2 The second vector.
         * @returns {MindFusion.Charting.Vector} A vector representing the difference between specified vectors.
         */
        static subtract(vector1: Vector, vector2: Vector): Vector;
        /**
         * Multiplies vector by a scalar.
         * @param {MindFusion.Charting.Vector} vector The vector to multiply.
         * @param {Number} scalar The scalar value.
         * @returns {MindFusion.Charting.Vector} A vector containing the multiplication result.
         */
        static multiplyVectorAndScalar(vector: Vector, scalar: number): Vector;
        /**
         * Multiplies vector by a scalar.
         * @param {Number} scalar The scalar value.
         * @param {MindFusion.Charting.Vector} vector The vector to multiply.
         * @returns {MindFusion.Charting.Vector} A vector containing the multiplication result.
         */
        static multiplyScalarAndVector(scalar: number, vector: Vector): Vector;
        /**
     * Returns the dot product of two vectors.
     * @param {MindFusion.Charting.Vector} vector1 The first vector.
     * @param {MindFusion.Charting.Vector} vector2 The second vector.
     * @returns {Number} The dot product.
     */
        static multiply(vector1: Vector, vector2: Vector): number;
        /**
         * Divides a vector by a scalar.
         * @param {MindFusion.Charting.Vector} vector The vector to divide.
         * @param {Number} scalar The scalar value.
         * @returns {MindFusion.Charting.Vector} A vector containing the division result.
         */
        static divide(vector: Vector, scalar: number): Vector;
        /**
         * Finds the determinant of two vectors.
         * @param {MindFusion.Charting.Vector} vector1 The first vector.
         * @param {MindFusion.Charting.Vector} vector2 The second vector.
         * @returns {Number} The determinant.
         */
        static determinant(vector1: Vector, vector2: Vector): number;
        /**
         * Gets or sets the X component of this vector.
         */
        get x(): number;
        /**
         * Gets or sets the X component of this vector.
         */
        set x(value: number);
        /**
         * Gets or sets the Y component of this vector.
         */
        get y(): number;
        /**
         * Gets or sets the Y component of this vector.
         */
        set y(value: number);
        /**
         * Gets the length of this vector.
         */
        get length(): number;
        /**
         * Gets the squared length of this vector.
         */
        get lengthSquared(): number;
        private m_x;
        private m_y;
    }
}
declare module "Charting/PlotController" {
    import { Graphics } from '@mindfusion/drawing';
    import { Component, ComponentController, ComponentAnimation, CursorHint } from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class A base class for controllers implementing user interaction with Plot components.
    * @property {Component} component Gets the component controlled by this PlotController.
     */
    export class PlotController implements ComponentController {
        /**
         * Initializes a new instance of the PlotController class.
         * @param {MindFusion.Charting.RenderContext} renderContext A RenderContext instance.
         */
        constructor(renderContext: RenderContext);
        /**
         * Implements ComponentController.OnMouseDown. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseMove. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseUp. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        /**
         * Implements ComponentController.onMouseWheel. Called when the user scrolls with the middle mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         * @param {Number} delta A number value specifying the amount and the direction for the mouse scroll.
         */
        onMouseWheel(x: number, y: number, delta: number): void;
        /**
         * Implements ComponentController.DrawInteraction. Draws a representation
         * of the current state of user interaction on specified IGraphics surface.
         * @param {IGraphics} graphics An IGraphics instance.
         */
        drawInteraction(graphics: Graphics): void;
        /**
         * For internal use.
         * @returns {ComponentAnimation} An instance of a ComponentAnimation -derived class.
         */
        getRunningAnimation(): ComponentAnimation;
        /**
         * For internal use.
         * @returns {CursorHint} A member of the CursorHint enumeration.
         */
        getCursorHint(x: number, y: number): CursorHint;
        /**
         * Gets the component controlled by this PlotController.
         */
        get component(): Component;
        protected renderContext: RenderContext;
    }
}
declare module "Charting/Plot2DController" {
    import { RenderContext } from "Charting/RenderContext";
    import { PlotController } from "Charting/PlotController";
    import { Axis } from "Charting/Axis";
    /**
    * @class A base class for controllers that let users interact with Plot2D objects.
    * @property {Boolean} vertical Gets or sets a value indicating whether interaction is done along the X or Y axis.
    * @property {Map<Axis, AxisInfo>} axisRanges Contains information about Axis ranges processed by this controller.
    */
    export class Plot2DController extends PlotController {
        /**
         * Initializes a new instance of the Plot2DController class.
         * @param {MindFusion.Charting.RenderContext} renderContext A RenderContext instance.
         * @param {Boolean} vertical
         * true to implement interaction along the Y axis, or false for the X axis.
         *
         */
        constructor(renderContext: RenderContext, vertical: boolean);
        recalculate(): void;
        /**
         * PlotController.OnMouseDown override. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Converts a plot pixel position to a logical value from specified axis' coordinate system.
         * @param {MindFusion.Charting.Axis} axis The target Axis.
         * @param {Number} value The value to convert.
         * @returns {Number} The converted value.
         */
        plotToAxisValue(axis: Axis, value: number): number;
        plotToZoomAxisValue(axis: Axis, value: number): number;
        /**
         * Gets or sets a value indicating whether interaction is done along the X or Y axis.
         */
        get vertical(): boolean;
        /**
         * Gets or sets a value indicating whether interaction is done along the X or Y axis.
         */
        set vertical(value: boolean);
        private m_vertical;
        /**
        * Contains information about Axis ranges processed by this controller.
        */
        axisRanges: Map<Axis, AxisInfo>;
    }
    /**
    * @class Stores information about Axis ranges processed by this controller.
    * @property {Number} resolution The axis resolution.
    * @property {Number} origin The axis origin.
    * @property {Number} range The axis range.
    */
    export class AxisInfo {
        /**
        * The axis resolution.
        * @type {Number}
        */
        resolution: number;
        /**
        * The axis origin.
        * @type {Number}
        */
        origin: number;
        /**
        * The axis range.
        * @type {Number}
        */
        range: number;
    }
}
declare module "Charting/PanController.Animation" {
    import { ComponentAnimation } from "Charting/Components/Components";
    import { Vector } from "Charting/Vector";
    import { PanController } from "Charting/PanController";
    /**
     * Represents a controller that pans its plot's data range.
     */
    export class PanControllerAnimation implements ComponentAnimation {
        constructor(controller: PanController, dir: Vector);
        start(): void;
        stop(): void;
        private onTick;
        set setFriction(a: number);
        get getFriction(): number;
        private friction;
        private controller;
        private dir;
        private timer;
        private previousTime;
    }
}
declare module "Charting/PanController" {
    import { ComponentAnimation } from "Charting/Components/Components";
    import { Vector } from "Charting/Vector";
    import { Plot2DController } from "Charting/Plot2DController";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a controller that pans its plot's data range.
    * @property {Boolean} enableAnimation Gets or sets whether to enable pan inertia.
    */
    export class PanController extends Plot2DController {
        /**
         * Initializes a new instance of the PanController class.
         * @param {RenderContext} renderContext A RenderContext instance.
         * @param {Boolean} vertical
         * true to implement interaction along the Y axis, or false for the X axis.
         *
         */
        constructor(renderContext: RenderContext, vertical: boolean);
        /**
         * Plot2DController.OnMouseDown override. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * PlotController.OnMouseMove override. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * PlotController.OnMouseUp override. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        update(dvalue: Vector): void;
        /**
         * For internal use.
         * @returns {ComponentAnimation} An instance of a ComponentAnimation -derived class.
         */
        getRunningAnimation(): ComponentAnimation;
        /**
         * Gets or sets whether to enable pan inertia.
         */
        get enableAnimation(): boolean;
        /**
         * Gets or sets whether to enable pan inertia.
         */
        set enableAnimation(value: boolean);
        private m_enableAnimation;
        private id;
        private start;
        private animation;
        private previousTouch;
        private previousTime;
        private previousTouch2;
        private previousTime2;
    }
}
declare module "Charting/GridType" {
    /**
    * @namespace MindFusion.Charting
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
    * Indicates Plot2D grid type.
    * @enum
    * @name GridType
    * @param [None] Do not draw grid.
    * @param [Horizontal] Draw horizontal stripes.
    * @param [Vertical] Draw vertical stripes.
    * @param [Crossed] Draw crossed stripes.
    */
    export enum GridType {
        /**
        * Do not draw grid.
        */
        None = 0,
        /**
        * Draw horizontal stripes.
        */
        Horizontal = 1,
        /**
        * Draw vertical stripes.
        */
        Vertical = 2,
        /**
        * Draw crossed stripes.
        */
        Crossed = 3
    }
}
declare module "Charting/Plot2D" {
    /**
    * @namespace MindFusion.Charting
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
    import * as Drawing from '@mindfusion/drawing';
    import { IEnumerable } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import * as Components from "Charting/Components/Components";
    import { Plot } from "Charting/Plot";
    import { ZoomHistory } from "Charting/ZoomHistory";
    import { RenderContext } from "Charting/RenderContext";
    import { GridType } from "Charting/GridType";
    import { Axis } from "Charting/Axis";
    /**
    * @class A plot whose series are rendered relatively to a two-dimensional Cartesian coordinate system.
    * @property {MindFusion.Charting.Axis} xAxis Gets or sets default Axis instance used to map X data coordinates of series rendered inside this plot to the plot's pixels.
    * @property {MindFusion.Charting.Axis} yAxis Gets or sets default Axis instance used to map Y data coordinates of series rendered inside this plot to the plot's pixels.
    * @property {GridType} gridType Gets or sets the type of grid to draw in this plot.
    * @property {Boolean} pinGrid Gets or sets a value indicating whether grid stripes should be pinned in place or scroll together with the plot when users pan it.
    * @property {Boolean} isZoomed Gets or sets a value indicating whether the user has zoomed into this plot.
    * @property {Boolean} allowPan Gets or sets a value indicating whether users are allowed to pan this plot.
    * @property {Boolean} verticalScroll Specifies whether the plot should scroll vertically when panned.
    * @property {Drawing.Color} gridColor1 Gets or sets the main color of the grid.
    * @property {Drawing.Color} gridColor2 Gets or sets the alternating color of the grid.
    */
    export class Plot2D extends Plot {
        /**
         * Initializes a new instance of the Plot2D class.
         */
        constructor();
        /**
         * Component.CreateController override. Returns a Components.ComponentController
         * used to interact with this component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} An instance of the PanController class.
         */
        createController(context: RenderContext): Components.ComponentController;
        getDelta(): number;
        private onZoomChanged;
        /**
         * Raised when the user zooms into this plot's data range.
         * @event Plot2D.zoomChanged
         * @type {Charting.Common.EventDispatcher}
         * @property {Plot2D} sender
         * @property {EventArgs} args
         */
        get zoomChanged(): Common.EventDispatcher<EventArgs>;
        private m_zoomChanged;
        xAxes(renderContext: RenderContext): IEnumerable<Axis>;
        yAxes(renderContext: RenderContext): IEnumerable<Axis>;
        private m_xAxis;
        /**
         * Gets or sets default Axis instance used to map X data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        get xAxis(): Axis;
        /**
         * Gets or sets default Axis instance used to map X data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        set xAxis(value: Axis);
        private m_yAxis;
        /**
         * Gets or sets default Axis instance used to map Y data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        get yAxis(): Axis;
        /**
         * Gets or sets default Axis instance used to map Y data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        set yAxis(value: Axis);
        /**
         * Gets or sets the type of grid to draw in this plot.
         */
        get gridType(): GridType;
        /**
         * Gets or sets the type of grid to draw in this plot.
         */
        set gridType(value: GridType);
        /**
         * Gets or sets a value indicating whether grid stripes should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        get pinGrid(): boolean;
        /**
         * Gets or sets a value indicating whether grid stripes should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        set pinGrid(value: boolean);
        /**
         * Component.Visit override. Calls visitor's VisitPlot method.
         * @param {ComponentVisitor} visitor An instance of a ComponentVisitor -derived class.
         */
        visit(visitor: Components.ComponentVisitor): void;
        /**
         * Plot.DrawGrid override. Draws the grid specified by GridType property.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        drawGrid(context: RenderContext): void;
        /**
         *Plot.DrawOrigins override. Draws the plot's axis origin lines.
        * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
        */
        drawOrigins(context: RenderContext): void;
        private effectiveGridColor;
        private effectiveGridLineColor;
        private effectiveGridLineThickness;
        private effectiveGridLineStyle;
        private drawGridLines;
        private drawGridStripes;
        /**
         * Zooms out from current data range.
         * @param {IEnumerable<Axis>} axes The axes whose ranges should be scaled.
         */
        zoomOut(axes: IEnumerable<Axis>): void;
        /**
         * Resets the zoom level to original axis ranges.
         */
        resetZoom(): void;
        /**
         * Gets or sets a value indicating whether the user has zoomed into this plot.
         */
        get isZoomed(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to pan this plot.
         */
        get allowPan(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to pan this plot.
         */
        set allowPan(value: boolean);
        /**
         * Specifies whether the plot should scroll vertically when panned.
         */
        get verticalScroll(): boolean;
        /**
         * Specifies whether the plot should scroll vertically when panned.
         */
        set verticalScroll(value: boolean);
        private m_verticalScroll;
        private m_gridType;
        private m_pinGrid;
        /**
         * Gets or sets the main color of the grid.
         */
        get gridColor1(): Drawing.Color;
        /**
         * Gets or sets the main color of the grid.
         */
        set gridColor1(value: Drawing.Color);
        private m_gridColor1;
        /**
         * Gets or sets the alternating color of the grid.
         */
        get gridColor2(): Drawing.Color;
        /**
         * Gets or sets the alternating color of the grid.
         */
        set gridColor2(value: Drawing.Color);
        private m_gridColor2;
        /**
         * Gets or sets the color of the grid lines.
         */
        get gridLineColor(): Drawing.Color;
        /**
         * Gets or sets the color of the grid lines.
         */
        set gridLineColor(value: Drawing.Color);
        private m_gridLineColor;
        /**
        * Gets or sets the thickness of plot grid lines.
        */
        get gridLineThickness(): number;
        private m_gridLineThickness;
        /**
        * Gets or sets the thickness of plot grid lines.
        */
        set gridLineThickness(value: number);
        /**
        * Gets or sets the style of plot grid lines.
        */
        get gridLineStyle(): Drawing.DashStyle;
        private m_gridLineStyle;
        /**
        * Gets or sets the style of plot grid lines.
        */
        set gridLineStyle(value: Drawing.DashStyle);
        zoomHistory: ZoomHistory;
        private m_allowPan;
        fromJson(json: any): void;
        toJson(): any;
    }
}
declare module "Charting/RenderContext" {
    import { Rect, Graphics, Pen } from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    import { Theme } from "Charting/Theme";
    import { Axis } from "Charting/Axis";
    import { Renderer2D } from "Charting/Renderer2D";
    import { Point3D } from "Charting/Point3D";
    import { TextStyleHint } from "Charting/TextStyleHint";
    import { TextStyle } from "Charting/TextStyle";
    /**
    * @class Provides contextual information about the dashboard to its child components
    * when calling their draw, layout and user input methods.
    * @property {Graphics} graphics Gets or sets the current drawing surface.
    * @property {Components.Component} component Gets or sets the component currently being painted.
    * @property {MindFusion.Charting.Axis} xAxis Gets the chart's XAxis.
    * @property {MindFusion.Charting.Axis} yAxis Gets the chart's YAxis.
    * @property {Theme} theme Gets or sets the Theme used to resolve appearance attributes.
    */
    export class RenderContext {
        /**
         * Initializes a new instance of the RenderContext clas.
         * @param {Rect} clipRect A Rect specifying the clip rectangle.
         * @param {Theme} theme A Theme instance where appearance attributes should be derived from.
         */
        constructor(clipRect: Rect, theme: Theme);
        /**
         * Gets or sets the current drawing surface.
         */
        get graphics(): Graphics;
        /**
         * Gets or sets the current drawing surface.
         */
        set graphics(value: Graphics);
        private m_graphics;
        /**
         * Gets or sets the component currently being painted.
         */
        get component(): Components.Component;
        /**
         * Gets or sets the component currently being painted.
         */
        set component(value: Components.Component);
        private m_component;
        /**
         * Gets the X axis assigned to a Renderer2D or returns one from parent plot or chart.
         * @param {Renderer2D} [series] A Renderer2D instance.
         * @returns {Axis} An Axis instance.
         */
        getXAxis(series?: Renderer2D): Axis;
        /**
         * Gets the Y axis assigned to a Renderer2D or returns one from parent plot or chart.
         * @param {Renderer2D} [series] A Renderer2D instance.
         * @returns {Axis} An Axis instance.
         */
        getYAxis(series?: Renderer2D): Axis;
        private defaultAxisX;
        private defaultAxisY;
        /**
         * Gets the chart's XAxis.
         */
        get xAxis(): Axis;
        /**
         * Gets the chart's YAxis.
         */
        get yAxis(): Axis;
        /**
         * Gets or sets the Theme used to resolve appearance attributes.
         */
        get theme(): Theme;
        /**
         * Gets or sets the Theme used to resolve appearance attributes.
         */
        set theme(value: Theme);
        private m_theme;
        get clipRect(): Rect;
        set clipRect(value: Rect);
        private m_clipRect;
        /**
         * Gets the clip rectangle relative to specified Components.Component.
         * @param {Components.Component} relativeTo A Components.Component instance.
         * @returns {Rect} A Rect instance.
         */
        getClipRect(relativeTo: Components.Component): Rect;
        /**
         * Gets a TextStyle from current Theme.
         * @param {TextStyleHint} hint A member of the TextStyleHint enumeration.
         * @returns {TextStyle} A TextStyle instance.
         */
        textStyle(hint: TextStyleHint): TextStyle;
        toPoints3D(bounds: Rect, zBottomLeft: number, zTopRight: number): Point3D[];
        highlightPen(): Pen;
    }
}
declare module "Charting/Gauges/LinearGaugeController" {
    /**
    * @namespace MindFusion.Charting.Gauges
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Graphics } from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { LinearGaugeRenderer } from "Charting/Gauges/LinearGaugeRenderer";
    /**
     * @class Controls user interaction with linear gauges.
     * @property {Component} component Implements ComponentController.Component. Gets the component modified by this controller.
     */
    export class LinearGaugeController implements Components.ComponentController {
        /**
         * Initializes a new instance of the LinearGaugeController class.
         * @param {LinearGaugeRenderer} r A LinearGaugeRenderer instance controlled by this object.
         * @param {RenderContext} context A RenderContext instance.
         */
        constructor(r: LinearGaugeRenderer, context: RenderContext);
        /**
         * Implements ComponentController.OnMouseDown. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseMove. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseUp. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseWheel. Called when the user scrolls with the middle mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         * @param {Number} delta A number value specifying the amount and the direction for the mouse scroll.
         */
        onMouseWheel(x: number, y: number, delta: number): void;
        /**
         * Implements ComponentController.DrawInteraction. Draws a representation
         * of the current state of user interaction on specified IGraphics surface.
         * @param {IGraphics} graphics An IGraphics instance.
         */
        drawInteraction(graphics: Graphics): void;
        /**
         * For internal use.
         * @returns {ComponentAnimation} An instance of a ComponentAnimation -derived class.
         */
        getRunningAnimation(): Components.ComponentAnimation;
        /**
         * For internal use.
         * @returns {CursorHint} A member of the CursorHint enumeration.
         */
        getCursorHint(x: number, y: number): Components.CursorHint;
        /**
         * Implements ComponentController.Component. Gets the component modified by this controller.
         */
        get component(): Components.Component;
        private m_renderer;
        private m_context;
    }
}
declare module "Charting/Gauges/LinearGaugeRenderer" {
    import * as Components from "Charting/Components/Components";
    import * as Gauges from '@mindfusion/gauges';
    import { GaugeRenderer } from "Charting/Gauges/GaugeRenderer";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class A Component that renders linear gauges in the dashboard.
     * @property {object} gauge Gets or sets the LinearGauge represented by this renderer.
     */
    export class LinearGaugeRenderer extends GaugeRenderer {
        /**
         * Initializes a new instance of the LinearGaugeRenderer class.
         */
        constructor(element: HTMLCanvasElement);
        /**
         * Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Component.Arrange override. Sets the location and size of this component relatively to its parent.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Component.Draw override. Draws this component in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Component.CreateController override. Returns a ComponentController
         * used to interact with this component.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {ComponentController} An instance of the LinearGaugeController class.
         */
        createController(context: RenderContext): Components.ComponentController;
        private onGaugeInvalidated;
        private onGaugePrepaintBackground;
        /**
         * Gets or sets the LinearGauge represented by this renderer.
         */
        get gauge(): Gauges.LinearGauge;
        /**
         * Gets or sets the LinearGauge represented by this renderer.
         */
        set gauge(value: Gauges.LinearGauge);
        private m_gauge;
        private renderContext;
        private painting;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/Gauges/OvalGaugeController" {
    /**
    * @namespace MindFusion.Charting.Gauges
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Graphics } from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { OvalGaugeRenderer } from "Charting/Gauges/OvalGaugeRenderer";
    /**
     * @class Controls user interaction with oval gauges.
     * @property {Component} component Implements ComponentController.Component. Gets the component modified by this controller.
     */
    export class OvalGaugeController implements Components.ComponentController {
        /**
         * Initializes a new instance of the OvalGaugeController class.
         * @param {OvalGaugeRenderer} r An OvalGaugeRenderer instance controlled by this object.
         * @param {RenderContext} context A RenderContext instance.
         */
        constructor(r: OvalGaugeRenderer, context: RenderContext);
        /**
         * Implements ComponentController.OnMouseDown. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseMove. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseUp. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseWheel. Called when the user scrolls with the middle mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         * @param {Number} delta A number value specifying the amount and the direction for the mouse scroll.
         */
        onMouseWheel(x: number, y: number, delta: number): void;
        /**
         * Implements ComponentController.DrawInteraction. Draws a representation
         * of the current state of user interaction on specified IGraphics surface.
         * @param {IGraphics} graphics An IGraphics instance.
         */
        drawInteraction(graphics: Graphics): void;
        /**
         * For internal use.
         * @returns {ComponentAnimation} An instance of a ComponentAnimation -derived class.
         */
        getRunningAnimation(): Components.ComponentAnimation;
        /**
         * For internal use.
         * @returns {CursorHint} A member of the CursorHint enumeration.
         */
        getCursorHint(x: number, y: number): Components.CursorHint;
        /**
         * Implements ComponentController.Component. Gets the component modified by this controller.
         */
        get component(): Components.Component;
        private m_renderer;
        private m_context;
    }
}
declare module "Charting/Gauges/OvalGaugeRenderer" {
    import * as Gauges from '@mindfusion/gauges';
    import * as Components from "Charting/Components/Components";
    import { GaugeRenderer } from "Charting/Gauges/GaugeRenderer";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class A Component that renders oval gauges in the dashboard.
     * @property {object} gauge Gets or sets the OvalGauge represented by this renderer.
     */
    export class OvalGaugeRenderer extends GaugeRenderer {
        /**
         * Initializes a new instance of the OvalGaugeRenderer class.
         */
        constructor(element: HTMLCanvasElement);
        /**
         * Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Component.Arrange override. Sets the location and size of this component relatively to its parent.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Component.Draw override. Draws this component in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Component.CreateController override. Returns a ComponentController
         * used to interact with this component.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {ComponentController} An instance of the OvalGaugeController class.
         */
        createController(context: RenderContext): Components.ComponentController;
        private onGaugeInvalidated;
        private onGaugePrepaintBackground;
        /**
         * Gets or sets the OvalGauge represented by this renderer.
         */
        get gauge(): Gauges.OvalGauge;
        /**
         * Gets or sets the OvalGauge represented by this renderer.
         */
        set gauge(value: Gauges.OvalGauge);
        private m_gauge;
        private renderContext;
        private painting;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/Gauges/Gauges" {
    /**
    * @namespace MindFusion.Charting.Gauges
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export { GaugeRenderer } from "Charting/Gauges/GaugeRenderer";
    export { LinearGaugeRenderer } from "Charting/Gauges/LinearGaugeRenderer";
    export { LinearGaugeController } from "Charting/Gauges/LinearGaugeController";
    export { OvalGaugeRenderer } from "Charting/Gauges/OvalGaugeRenderer";
    export { OvalGaugeController } from "Charting/Gauges/OvalGaugeController";
}
declare module "Charting/ThreeD/Model3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import * as Drawing from '@mindfusion/drawing';
    /**
     * @class Represents a three-dimensional model.
     */
    export class Model3D {
        /**
         * Initializes a new instance of the Model3D class.
         * @param {Drawing.Brush} [brush] The Brush used to fill this model's projection.
         */
        constructor(brush?: Drawing.Brush);
        get brush(): Drawing.Brush;
        set brush(value: Drawing.Brush);
        private m_brush;
    }
}
declare module "Charting/ThreeD/Label3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Rect, Font } from '@mindfusion/drawing';
    import { Point3D } from "Charting/Point3D";
    import { Model3D } from "Charting/ThreeD/Model3D";
    /**
    * @class Represents a text label in 3D scene.
    * @property {Point3D} topRight Gets or sets the top-right corner of label's layout rectangle.
    * @property {Point3D} bottomLeft Gets or sets the bottom-left corner of label's layout rectangle.
    * @property {String} text Gets or sets the label's text.
    * @property {Font} font Gets or sets the label's font.
    * @property {Number} rotationAngle Gets or sets the label's rotation angle.
    */
    export class Label3D extends Model3D {
        /**
         * Gets or sets the top-right corner of label's layout rectangle.
         */
        get topRight(): Point3D;
        /**
         * Gets or sets the top-right corner of label's layout rectangle.
         */
        set topRight(value: Point3D);
        private m_topRight;
        /**
         * Gets or sets the bottom-left corner of label's layout rectangle.
         */
        get bottomLeft(): Point3D;
        /**
         * Gets or sets the bottom-left corner of label's layout rectangle.
         */
        set bottomLeft(value: Point3D);
        private m_bottomLeft;
        /**
         * Gets or sets the label's text.
         */
        get text(): string;
        /**
         * Gets or sets the label's text.
         */
        set text(value: string);
        private m_text;
        /**
         * Gets or sets the label's font.
         */
        get font(): Font;
        /**
         * Gets or sets the label's font.
         */
        set font(value: Font);
        private m_font;
        /**
         * Gets or sets the label's rotation angle.
         */
        get rotationAngle(): number;
        /**
         * Gets or sets the label's rotation angle.
         */
        set rotationAngle(value: number);
        private m_rotationAngle;
        drawLabel: DrawLabelDelegate;
    }
    /**
    * Gets or sets the signature of callback methods used to render text at projected point.
    */
    export interface DrawLabelDelegate {
        (bounds: Rect): void;
    }
}
declare module "Charting/ThreeD/Projection" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class Defines the interface of 3D model projections.
     */
    export interface Projection {
        /**
         * Draws the projections in specified RenderContext.
         * @param {Charting.RenderContext} context A RenderContext instance.
         */
        drawAsProjection(context: RenderContext): void;
        /**
         * A value by which projections are sorted in depth buffer.
         */
        zSort: number;
    }
}
declare module "Charting/ThreeD/LabelProjection" {
    import { Point3D } from "Charting/Point3D";
    import { RenderContext } from "Charting/RenderContext";
    import { Label3D } from "Charting/ThreeD/Label3D";
    import { Projection } from "Charting/ThreeD/Projection";
    /**
    * @class Represents the projection of a Label3D on the projection plane.
    * @property {Label3D} label Gets ot sets the projected Label3D.
    * @property {Point3D} projectionTopLeft Gets or sets the projection of top-left corner of label's layout rectangle.
    * @property {Point3D} projectionBottomRight Gets or sets the projection of bottom-right corner of label's layout rectangle.
    * @property {Number} zSort Gets or sets a value by which projections are sorted in depth buffer.
    */
    export class LabelProjection implements Projection {
        /**
         * Initializes a new instance of the LabelProjection class.
         * @param {Label3D} label The projected Label3D.
         * @param {Point3D} projTL Projection of top-left corner of Label3D's layout rectangle.
         * @param {Point3D} projBR Projection of bottom-right corner of Label3D's layout rectangle.
         */
        constructor(label: Label3D, projTL: Point3D, projBR: Point3D);
        /**
         * Gets ot sets the projected Label3D.
         */
        get label(): Label3D;
        /**
         * Gets ot sets the projected Label3D.
         */
        set label(value: Label3D);
        private m_label;
        /**
         * Gets or sets the projection of top-left corner of label's layout rectangle.
         */
        get projectionTopLeft(): Point3D;
        /**
         * Gets or sets the projection of top-left corner of label's layout rectangle.
         */
        set projectionTopLeft(value: Point3D);
        private m_projectionTopLeft;
        /**
         * Gets or sets the projection of bottom-right corner of label's layout rectangle.
         */
        get projectionBottomRight(): Point3D;
        /**
         * Gets or sets the projection of bottom-right corner of label's layout rectangle.
         */
        set projectionBottomRight(value: Point3D);
        private m_projectionBottomRight;
        /**
         * A value by which projections are sorted in depth buffer.
         */
        get zSort(): number;
        /**
         * A value by which projections are sorted in depth buffer.
         */
        set zSort(value: number);
        /**
         * Draws this projection in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        drawAsProjection(context: RenderContext): void;
    }
}
declare module "Charting/ThreeD/Vector3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Point3D } from "Charting/Point3D";
    /**
    * @class Represents a three-dimensional vector.
    * @property {Number} x Gets or sets the X component of this vector.
    * @property {Number} y Gets or sets the Y component of this vector.
    * @property {Number} z Gets or sets the Z component of this vector.
    */
    export class Vector3D {
        /**
         * Initializes a new instance of the Vector3D class.
         */
        constructor();
        /**
         * Initializes a new instance of the Vector3D class.
         * @param {Number} x X component of the vector.
         * @param {Number} y Y component of the vector.
         * @param {Number} z Z component of the vector.
         */
        constructor(x: number, y: number, z: number);
        /**
         * Initializes a new instance of the Vector3D class.
         * @param {Point3D} p1 Start point of the vector.
         * @param {Point3D} p2 End point of the vector.
         */
        constructor(p1: Point3D, p2: Point3D);
        /**
         * Calculates the cross-product of two vectors.
         * @param {Vector3D} a A Vector3D instance.
         * @param {Vector3D} b A Vector3D instance.
         * @returns {Vector3D} A Vector3D representing the cross-product of specified vectors.
         */
        static crossProduct(a: Vector3D, b: Vector3D): Vector3D;
        /**
         * Calculates the length of this vector.
         * @returns {Number} A double value representing the vector length.
         */
        length(): number;
        /**
         * Divides the vector by specified measure.
         * @param {Number} s A double value representing the divisor.
         * @returns {Vector3D} A Vector3D representing the result.
         */
        div(s: number): Vector3D;
        /**
         * Gets or sets the X component of this vector.
         */
        get x(): number;
        /**
         * Gets or sets the X component of this vector.
         */
        set x(value: number);
        private m_x;
        /**
         * Gets or sets the Y component of this vector.
         */
        get y(): number;
        /**
         * Gets or sets the Y component of this vector.
         */
        set y(value: number);
        private m_y;
        /**
         * Gets or sets the Z component of this vector.
         */
        get z(): number;
        /**
         * Gets or sets the Z component of this vector.
         */
        set z(value: number);
        private m_z;
    }
}
declare module "Charting/ThreeD/Polygon3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Brush, Pen } from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { Point3D } from "Charting/Point3D";
    import { Vector3D } from "Charting/ThreeD/Vector3D";
    import { Projection } from "Charting/ThreeD/Projection";
    /**
    * @class Represents a polygon in 3D space.
    * @property {List<Point3D>} points Gets or sets the polygon's vertices.
    * @property {Number} zSort Gets or sets a value by which projections are sorted in depth buffer.
    */
    export class Polygon3D implements Projection {
        /**
         * Initializes a new instance of the Polygon3D class.
         * @param {IEnumerable<Point3D>} [points] A list of 3D points.
         * @param {Brush} [brush] A Brush used to fill the polygon.
         * @param {Array<Vector3D>} [normals] An array with the normal vectors in each vertex.
         */
        constructor(points?: List<Point3D>, brush?: Brush, normals?: Vector3D[]);
        /**
         * Draws this projection in specified RenderContext.
         * @param {Charting.RenderContext} context A RenderContext instance.
         */
        drawAsProjection(context: RenderContext): void;
        private getPoints;
        /**
         * Gets the polygon's normal vector.
         * @returns {Vector3D} A Vector3D representing the polygon's normal vector.
         */
        normal(): Vector3D;
        /**
         * Gets the distance from specified point to polygon's plane.
         * @param {Point3D} p A Point3D instance.
         * @returns {Number} A number value representing the distance.
         */
        pointToPlaneDist(p: Point3D): number;
        /**
         * Gets the distance from specified point to specified plane.
         * @param {Point3D} p A Point3D instance.
         * @param {Point3D} planePoint A point from the plane.
         * @param {Vector3D} planeNormal The plane's normal vector.
         * @returns {Number} A number value representing the distance.
         */
        static pointToPlaneDist(p: Point3D, planePoint: Point3D, planeNormal: Vector3D): number;
        /**
         * Returns the polygon's middle point.
         * @returns {Point3D} A Point3D instance representing the middle point.
         */
        midPoint(): Point3D;
        calculateIllumination(): void;
        private processColor;
        private processColors;
        private applyIllumination;
        /**
         * Gets or sets the polygon's vertices.
         */
        get points(): List<Point3D>;
        /**
         * Gets or sets the polygon's vertices.
         */
        set points(value: List<Point3D>);
        private m_points;
        normals: Vector3D[];
        get owner(): Object;
        set owner(value: Object);
        private m_owner;
        /**
         * A value by which projections are sorted in depth buffer.
         */
        get zSort(): number;
        /**
         * A value by which projections are sorted in depth buffer.
         */
        set zSort(value: number);
        private m_zSort;
        get brush(): Brush;
        set brush(value: Brush);
        private m_brush;
        get pen(): Pen;
        set pen(value: Pen);
        private m_pen;
        private illumination;
    }
}
declare module "Charting/ThreeD/Mesh3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { Polygon3D } from "Charting/ThreeD/Polygon3D";
    import { Point3D } from "Charting/Point3D";
    import { Vector3D } from "Charting/ThreeD/Vector3D";
    import { Model3D } from "Charting/ThreeD/Model3D";
    /**
    * @class Represents a 3D mesh.
    * @property {List<Polygon3D>} faces Gets or sets the mesh faces.
    */
    export class Mesh3D extends Model3D {
        /**
         * Initializes a new instance of the Mesh3D class.
         * @param {List<List<Point3D>>} facePoints Lists of points defining mesh faces.
         * @param {Drawing.Brush} brush The Brush used to paint this mesh.
         * @param {Array<Array<Vector3D>>} [normals] An array with the normal vectors in each vertex.
         */
        constructor(facePoints: List<List<Point3D>>, brush: Drawing.Brush, normals?: Vector3D[][]);
        get pen(): Drawing.Pen;
        set pen(value: Drawing.Pen);
        /**
         * Gets or sets the mesh faces.
         */
        get faces(): List<Polygon3D>;
        /**
         * Gets or sets the mesh faces.
         */
        set faces(value: List<Polygon3D>);
        private m_faces;
    }
}
declare module "Charting/ThreeD/Matrix3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
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
    * @class Represents a a mathematical matrix, specialized in 3D transformations.
    */
    export class Matrix3D extends Array {
        /**
         * Initializes a new instance of the Matrix3D class.
         * @param {number} width The width of the matrix.
         * @param {number} height The height of the matrix.
         */
        constructor(width: number, height: number);
        /**
         * Fills the matrix with zeros.
         */
        nullify(): void;
        /**
         * Fills the matrix with an array, starting from the top left, filling horisontally.
         * @param {number[]} array The array to be filled in the matrix.
         */
        fill(array: any, start?: any, end?: any): this;
        /**
         * @return {Float32Array} An array version of the matrix staring top left, going horisontally.
         */
        getArray(): Float32Array;
        /**
         * Multiplys 2 matrices.
         * @param {Matrix3D} m The left matrix.
         * @param {Matrix3D} n The right matrix.
         * @return {Matrix3D} The two matrices multiplyed.
         */
        static multiply(m: Matrix3D, n: Matrix3D): Matrix3D;
        /**
         * Multiplys the current matrix times a second matrix.
         * @param {Matrix3D} mat The right matrix.
         */
        multiply(mat: Matrix3D): void;
        private static subtract;
        /**
        * A 4x4 Identety Matrix
        * @return {Matrix3D} Identety Matrix:
        */
        static Identety: () => Matrix3D;
        /**
        * A 4x4 matrix, allowing scaling.
        * @param {number} width The amount of scaling on the X axis in percent/100.
        * @param {number} height The amount of scaling on the Y axis in percent/100.
        * @param {number} depth The amount of scaling on the Z axis in percent/100.
        * @return {Matrix3D} Scale Matrix:
        */
        static Scale: (width: number, height: number, depth: number) => Matrix3D;
        /**
        * A 4x4 matrix, allowing translation.
        * @param {number} x The amount of translation on the X axis.
        * @param {number} y The amount of translation on the Y axis.
        * @param {number} z The amount of translation on the Z axis.
        * @return {Matrix3D} Translate Matrix:
        */
        static Translate(x: number, y: number, z: number): Matrix3D;
        /**
        * A 4x4 matrix, allowing rotation around the X axis.
        * @param {number} angle The amount of rotation around the X axis in radians.
        * @return {Matrix3D} RotateX Matrix:
        */
        static RotateX(angle: number): Matrix3D;
        /**
         * A 4x4 matrix, allowing rotation around the Y axis.
        * @param {number} angle The amount of rotation around the Y axis in radians.
        * @return {Matrix3D} RotateY Matrix:
        */
        static RotateY(angle: number): Matrix3D;
        /**
        * A 4x4 matrix, allowing rotation around the Z axis.
        * @param {number} angle The amount of rotation around the Z axis in radians.
        * @return {Matrix3D} RotateZ Matrix:
        */
        static RotateZ(angle: number): Matrix3D;
        /**
        * A 4x4 matrix, allowing perspective and vercitile coordinates.
        * @param {number} filedOfView The angle of the camera.
        * @param {number} aspectRatio The width devided by height of the viewing window.
        * @param {number} near The nearest coordinate, where the object will still be drawn.
        * @param {number} far The furthest coordinate, where the object will still be drawn.
        * @return {Matrix3D} Perspective Matrix:
        */
        static Perspective(fieldOfView: number, aspectRatio: number, near: number, far: number): Matrix3D;
        private static Perspective2;
        private static CopyZ;
        width: number;
        height: number;
    }
}
declare module "Charting/ThreeD/Graphics3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import * as Drawing from '@mindfusion/drawing';
    import { Matrix3D } from "Charting/ThreeD/Matrix3D";
    import { Polygon3D } from "Charting/ThreeD/Polygon3D";
    export class Graphics3D {
        constructor(context: WebGLRenderingContext, flength: number, width: number, height: number);
        private loadShaders;
        loadObject(poly: Polygon3D): {
            buffer: WebGLBuffer;
            numItems: number;
            itemSize: number;
            normal: any;
            color: Drawing.Brush;
            model: Matrix3D;
        };
        drawObject(obj: any): void;
        getMatrices(): Matrix3D;
        moveCamera(mat: Matrix3D): void;
        reloadScene(): void;
        private view;
        projection: Matrix3D;
        private program;
        private normalPosition;
        private positionPoisition;
        private colorPosition;
        private modelPosition;
        private viewPosition;
        private projectionPosition;
        private fragmentShaderSource;
        private vertexShaderSource;
        context: WebGLRenderingContext;
    }
}
declare module "Charting/ThreeD/Scene3D" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Point, Brush } from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { Point3D } from "Charting/Point3D";
    import { Model3D } from "Charting/ThreeD/Model3D";
    import { Polygon3D } from "Charting/ThreeD/Polygon3D";
    import { Mesh3D } from "Charting/ThreeD/Mesh3D";
    import { Projection } from "Charting/ThreeD/Projection";
    /**
    * @class Represents a 3D scene.
    * @property {List<Model3D>} models Gets or sets a list of models in this scene.
    * @property {List<Projection>} projections Gets or sets a list of projections in this scene.
    * @property {Point3D} cameraPosition Gets or sets the camera position.
    * @property {Point3D} cameraOrientation Gets or sets the camera orientation.
    * @property {Number} focalLength Gets or sets the camera focal length.
    * @property {Point} viewportCenter Gets or sets the viewport center.
    */
    export class Scene3D {
        /**
         * Initializes a new instance of the Scene3D class.
         */
        constructor();
        /**
         * Adds a cuboid model to the scene.
         * @param {Point3D} p1 A corner point of the cuboid.
         * @param {Point3D} p2 The diametrically opposite corner of specified point.
         * @param {Brush} brush The Brush used to paint the cuboid model.
         */
        addCuboid(p1: Point3D, p2: Point3D, brush: Brush): void;
        /**
         * Adds a cuboid model to the scene.
         * @param {Number} x1 X coordinate of a corner point of the cuboid.
         * @param {Number} y1 Y coordinate of a corner point of the cuboid.
         * @param {Number} z1 Z coordinate of a corner point of the cuboid.
         * @param {Number} x2 X coordinate of diametrically opposite corner.
         * @param {Number} y2 Y coordinate of diametrically opposite corner.
         * @param {Number} z2 Z coordinate of diametrically opposite corner.
         * @param {Brush} brush The Brush used to paint the cuboid model.
         */
        addCuboid(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, brush: Brush): void;
        /**
         * Creates a cuboid model.
         * @param {Number} x1 X coordinate of a corner point of the cuboid.
         * @param {Number} y1 Y coordinate of a corner point of the cuboid.
         * @param {Number} z1 Z coordinate of a corner point of the cuboid.
         * @param {Number} x2 X coordinate of diametrically opposite corner.
         * @param {Number} y2 Y coordinate of diametrically opposite corner.
         * @param {Number} z2 Z coordinate of diametrically opposite corner.
         * @param {Brush} brush The Brush used to paint the cuboid model.
         * @returns {Mesh3D} A Mesh3D containing the cuboid faces.
         */
        buildCuboid(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, brush: Brush): Mesh3D;
        buildCylinder(x: number, z: number, y: number, rad: number, hei: number, res: number, brush: Brush): Mesh3D;
        /**
         * Draws a projection of this scene in specified RenderContext.
         * @param {Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        private compareProjections;
        /**
         * Projects specified point on projection plane.
         * @param {Point3D} point A Point3D to project.
         * @returns {Point3D} A Point3D containing projection coordinates.
         */
        project(point: Point3D): Point3D;
        /**
         * Projects specified model on projection plane.
         * @param {Model3D} model A Model3D to project.
         * @returns {IEnumerable<Projection>} Enumeration of Projection objects.
         */
        project(model: Model3D): List<Projection>;
        /**
         * Projects specified polygon on projection plane.
         * @param {Polygon3D} polygon A Polygon3D to project.
         * @returns {Polygon3D} A Polygon3D containing projection coordinates.
         */
        project(polygon: Polygon3D): Polygon3D;
        /**
         * Gets or sets a list of models in this scene.
         */
        get models(): List<Model3D>;
        /**
         * Gets or sets a list of models in this scene.
         */
        set models(value: List<Model3D>);
        private m_models;
        /**
         * Gets or sets a list of projections in this scene.
         */
        get projections(): List<Projection>;
        /**
         * Gets or sets a list of projections in this scene.
         */
        set projections(value: List<Projection>);
        private m_projections;
        /**
         * Gets or sets the camera position.
         */
        get cameraPosition(): Point3D;
        /**
         * Gets or sets the camera position.
         */
        set cameraPosition(value: Point3D);
        private m_cameraPosition;
        /**
         * Gets or sets the camera orientation.
         */
        get cameraOrientation(): Point3D;
        /**
         * Gets or sets the camera orientation.
         */
        set cameraOrientation(value: Point3D);
        private m_cameraOrientation;
        /**
         * Gets or sets the camera focal length.
         */
        get focalLength(): number;
        /**
         * Gets or sets the camera focal length.
         */
        set focalLength(value: number);
        private m_focalLength;
        /**
         * Gets or sets the viewport center.
         */
        get viewportCenter(): Point;
        /**
         * Gets or sets the viewport center.
         */
        set viewportCenter(value: Point);
        private m_viewportCenter;
        private gr3d;
        private gl;
        private glc;
        private yDir;
    }
}
declare module "Charting/ThreeD/ThreeD" {
    /**
    * @namespace MindFusion.Charting.ThreeD
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export { Scene3D } from "Charting/ThreeD/Scene3D";
    export { Label3D } from "Charting/ThreeD/Label3D";
    export { Mesh3D } from "Charting/ThreeD/Mesh3D";
}
declare module "Charting/ZoomController" {
    import { Graphics } from '@mindfusion/drawing';
    import { Plot2DController } from "Charting/Plot2DController";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class Represents a controller that zooms into plot's data range.
     */
    export class ZoomController extends Plot2DController {
        /**
         * Initializes a new instance of the ZoomController class.
         * @param {MindFusion.Charting.RenderContext} renderContext A RenderContext instance.
         * @param {Boolean} vertical
         * true to implement interaction along the Y axis, or false for the X axis.
         *
         */
        constructor(renderContext: RenderContext, vertical: boolean);
        /**
         * Plot2DController.OnMouseDown override. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * PlotController.OnMouseMove override. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * PlotController.OnMouseUp override. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        /**
         * PlotController.OnMouseWheel override. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         * @param {Number} delta A number value specifying the direction and the amount of scrolling needed.
         */
        onMouseWheel(x: number, y: number, delta: number): void;
        /**
         * PlotController.drawInteraction override. Draws the currently selected data range
         * that that controller will zoom into when the user releases the mouse button.
         * @param {Graphics} graphics A Graphics instance.
         */
        drawInteraction(graphics: Graphics): void;
        private start;
        private current;
    }
}
declare module "Charting/LegendController" {
    import { PlotController } from "Charting/PlotController";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class Lets users move a legend within the boundaries of its parent Panel.
    */
    export class LegendController extends PlotController {
        /**
         * Initializes a new instance of the LegendController class.
         * @param {RenderContext} renderContext A RenderContext instance.
         */
        constructor(renderContext: RenderContext);
        /**
         * Implements ComponentController.OnMouseDown. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Implements ComponentController.OnMouseMove. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        private update;
        private startPoint;
        private plotSize;
    }
}
declare module "Charting/AxisRenderer" {
    import { FontStyle, Font, DashStyle, Pen, Brush } from '@mindfusion/drawing';
    import { SeriesContainer } from "Charting/SeriesContainer";
    import { RenderContext } from "Charting/RenderContext";
    import { Axis } from "Charting/Axis";
    import { DataReader } from "Charting/DataReader";
    import { Component } from "Charting/Components/Components";
    /**
    * @class A base class for components that render Axis ranges.
    * @property {Axis} axis Gets or sets the Axis that will be drawn by this object.
    * @property {Boolean} pinLabels Gets or sets a value indicating whether coordinate labels should be pinned in place or scroll together with the plot when users pan it.
    * @property {SeriesContainer} labelsSource Gets or sets the object whose Series labels should be rendered along this axis.
    * @property {Boolean} showCoordinates Gets or sets a value indicating whether this AxisRenderer should draw axis coordinates.
    * @property {Boolean} showSeriesLabels Gets or sets a value indicating whether this AxisRenderer should draw data labels.
    * @property {Boolean} showTicks Gets or sets a value indicating whether this AxisRenderer should draw axis ticks.
    * @property {Brush} labelBrush Gets or sets the Brush that should be used to draw axis labels.
    * @property {String} labelFontName Gets or sets the name of font that should be used to draw axis labels.
    * @property {Number} labelFontSize Gets or sets the size of font that should be used to draw axis labels.
    * @property {FontStyle} labelFontStyle Gets or sets the style of font that should be used to draw axis labels.
    * @property {Number} labelPadding Gets or sets the padding space between the axis line and coordinate labels.
    * @property {Number} labelRotationAngle Gets or sets the rotation angle of the labels.
    * @property {Brush} titleBrush Gets or sets the Brush that should be used to draw the axis Title.
    * @property {String} titleFontName Gets or sets the name of font that should be used to draw the axis Title.
    * @property {Number} titleFontSize Gets or sets the size of font that should be used to draw the axis Title.
    * @property {FontStyle} titleFontStyle Gets or sets the style of font that should be used to draw the axis Title.
    * @property {Brush} axisStroke Gets or sets the Brush that should be used to draw axis lines.
    * @property {Number} axisStrokeThickness Gets or sets the thickness axis lines should be stroked with.
    * @property {DashStyle} axisStrokeDashStyle Gets or sets the dash style axis lines should be stroked with.
    */
    export abstract class AxisRenderer extends Component {
        /**
         * Initializes a new instance of the AxisRenderer class.
         * @param {Axis} axis The Axis that will be drawn by this object.
         */
        constructor(axis: Axis);
        private onAxisPropertyChanged;
        /**
         * The Axis that will be drawn by this object.
         */
        get axis(): Axis;
        /**
         * The Axis that will be drawn by this object.
         */
        set axis(value: Axis);
        private m_axis;
        /**
         * Gets the effective Axis in current context, getting one from Plot2D
         * or chart control if there's no local Axis associated with this renderer.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Axis} An Axis instance.
         */
        abstract effectiveAxis(context: RenderContext): Axis;
        private m_pinLabels;
        /**
         * Gets or sets a value indicating whether coordinate labels should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        get pinLabels(): boolean;
        /**
         * Gets or sets a value indicating whether coordinate labels should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        set pinLabels(value: boolean);
        getLabel(index: number, value: number, context: RenderContext): string;
        /**
         * Gets or sets the object whose Series labels should be rendered along this axis.
         */
        get labelsSource(): SeriesContainer;
        /**
         * Gets or sets the object whose Series labels should be rendered along this axis.
         */
        set labelsSource(value: SeriesContainer);
        private m_labelsSource;
        private m_showCoordinates;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw axis coordinates.
         */
        get showCoordinates(): boolean;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw axis coordinates.
         */
        set showCoordinates(value: boolean);
        private m_showSeriesLabels;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw data labels.
         */
        get showSeriesLabels(): boolean;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw data labels.
         */
        set showSeriesLabels(value: boolean);
        private m_showTicks;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw axis ticks.
         */
        get showTicks(): boolean;
        /**
         * Gets or sets a value indicating whether this AxisRenderer should draw axis ticks.
         */
        set showTicks(value: boolean);
        private m_tickLength;
        get tickLength(): number;
        set tickLength(value: number);
        /**
         * Gets the Font that should be used to draw axis labels.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Font} A System.Drawing.Font instance.
         */
        effectiveLabelFont(context: RenderContext): Font;
        /**
         * Gets the Brush that should be used to draw axis labels.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {SysBrush} A System.Brush instance.
         */
        effectiveLabelBrush(context: RenderContext): Brush;
        /**
         * Gets the Font that should be used to draw the axis Title.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Font} A System.Drawing.Font instance.
         */
        effectiveTitleFont(context: RenderContext): Font;
        /**
         * Gets the Brush that should be used to draw the axis Title.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {SysBrush} A System.Brush instance.
         */
        effectiveTitleBrush(context: RenderContext): Brush;
        /**
         * Gets or sets the Brush that should be used to draw axis labels.
         */
        get labelBrush(): Brush;
        /**
         * Gets or sets the Brush that should be used to draw axis labels.
         */
        set labelBrush(value: Brush);
        /**
         * Gets or sets the name of font that should be used to draw axis labels.
         */
        get labelFontName(): string;
        /**
         * Gets or sets the name of font that should be used to draw axis labels.
         */
        set labelFontName(value: string);
        /**
         * Gets or sets the size of font that should be used to draw axis labels.
         */
        get labelFontSize(): number;
        /**
         * Gets or sets the size of font that should be used to draw axis labels.
         */
        set labelFontSize(value: number);
        /**
         * Gets or sets the style of font that should be used to draw axis labels.
         */
        get labelFontStyle(): FontStyle;
        /**
         * Gets or sets the style of font that should be used to draw axis labels.
         */
        set labelFontStyle(value: FontStyle);
        /**
         * Gets or sets the padding space between the axis line and coordinate labels.
         */
        get labelPadding(): number;
        /**
         * Gets or sets the padding space between the axis line and coordinate labels.
         */
        set labelPadding(value: number);
        /**
         * Gets or sets the rotation angle of the labels.
         */
        get labelRotationAngle(): number;
        /**
         * Gets or sets the rotation angle of the labels.
         */
        set labelRotationAngle(value: number);
        /**
         * Gets or sets the Brush that should be used to draw the axis Title.
         */
        get titleBrush(): Brush;
        /**
         * Gets or sets the Brush that should be used to draw the axis Title.
         */
        set titleBrush(value: Brush);
        /**
         * Gets or sets the name of font that should be used to draw the axis Title.
         */
        get titleFontName(): string;
        /**
         * Gets or sets the name of font that should be used to draw the axis Title.
         */
        set titleFontName(value: string);
        /**
         * Gets or sets the size of font that should be used to draw the axis Title.
         */
        get titleFontSize(): number;
        /**
         * Gets or sets the size of font that should be used to draw the axis Title.
         */
        set titleFontSize(value: number);
        /**
         * Gets or sets the style of font that should be used to draw the axis Title.
         */
        get titleFontStyle(): FontStyle;
        /**
         * Gets or sets the style of font that should be used to draw the axis Title.
         */
        set titleFontStyle(value: FontStyle);
        private m_axisStroke;
        /**
         * Gets or sets the Brush that should be used to draw axis lines.
         */
        get axisStroke(): Brush;
        /**
         * Gets or sets the Brush that should be used to draw axis lines.
         */
        set axisStroke(value: Brush);
        private m_axisStrokeThickness;
        /**
         * Gets or sets the thickness axis lines should be stroked with.
         */
        get axisStrokeThickness(): number;
        /**
         * Gets or sets the thickness axis lines should be stroked with.
         */
        set axisStrokeThickness(value: number);
        private m_axisStrokeDashStyle;
        /**
         * Gets or sets the dash style axis lines should be stroked with.
         */
        get axisStrokeDashStyle(): DashStyle;
        /**
         * Gets or sets the dash style axis lines should be stroked with.
         */
        set axisStrokeDashStyle(value: DashStyle);
        private bounds;
        /**
         * Gets the Pen that should be used to draw axis lines.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Pen} A System.Pen instance.
         */
        effectivePen(context: RenderContext): Pen;
        /**
         * Gets the Brush that should be used to stroke axis lines.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Brush} A Brush instance.
         */
        effectiveAxisStroke(context: RenderContext): Brush;
        /**
         * Gets the thickness of axis line strokes.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Number} A number value.
         */
        effectiveAxisStrokeThickness(context: RenderContext): number;
        /**
         * Gets the dash style of axis line strokes.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {DashStyle} A member of the DashStyle enumeration.
         */
        effectiveAxisDashStyle(context: RenderContext): DashStyle;
        fromJson(json: any): any;
        toJson(): any;
        dataReader: DataReader;
        private m_labelBrush;
        private m_labelFontName;
        private m_labelFontSize;
        private m_labelFontStyle;
        private m_labelPadding;
        private m_labelRotationAngle;
        private m_titleBrush;
        private m_titleFontName;
        private m_titleFontSize;
        private m_titleFontStyle;
    }
}
declare module "Charting/XAxisRenderer" {
    import { RenderContext } from "Charting/RenderContext";
    import { Axis } from "Charting/Axis";
    import { AxisRenderer } from "Charting/AxisRenderer";
    /**
     * @class A Component that renders horizontal Axis ranges.
     * @property {Boolean} plotBottomSide Gets or sets whether this XAxisRenderer is shown at the bottom side of a plot.
     */
    export class XAxisRenderer extends AxisRenderer {
        /**
         * Initializes a new instance of the XAxisRenderer class.
         * @param {MindFusion.Charting.Axis} axis The Axis that will be drawn by this object.
         */
        constructor(axis: Axis);
        private counter;
        private y;
        private titleHeightSize;
        /**
         * AxisRenderer.effectiveAxis override. Gets the effective horizontal Axis in current context,
         * getting one from Plot2D or chart control if there's no local Axis associated with this renderer.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {MindFusion.Charting.Axis} An Axis instance.
         */
        effectiveAxis(context: RenderContext): Axis;
        /**
         * Component.measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        private drawCoordinates;
        private drawLabels;
        private drawTitle;
        private drawTicks;
        /**
         * Component.draw override. Draws this component in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        get maxLabelHeight(): number;
        set maxLabelHeight(value: number);
        private m_maxLabelHeight;
        private seriesLabelRows;
        private m_plotBottomSide;
        /**
         * Gets or sets whether this XAxisRenderer is shown at the bottom side of a plot.
         */
        get plotBottomSide(): boolean;
        /**
         * Gets or sets whether this XAxisRenderer is shown at the bottom side of a plot.
         */
        set plotBottomSide(value: boolean);
        private xSorted;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/YAxisRenderer" {
    import { StringAlignment } from '@mindfusion/drawing';
    import { RenderContext } from "Charting/RenderContext";
    import { Axis } from "Charting/Axis";
    import { AxisRenderer } from "Charting/AxisRenderer";
    /**
     * @class A Component that renders vertical Axis ranges.
     * @property {Boolean} plotLeftSide Gets or sets whether this YAxisRenderer is shown at the left side of a plot.
     */
    export class YAxisRenderer extends AxisRenderer {
        private x;
        private counter;
        /**
         * Initializes a new instance of the YAxisRenderer class.
         * @param {MindFusion.Charting.Axis} axis The Axis that will be drawn by this object.
         * @param {MindFusion.Charting.Axis} [xAxis] The Axis used to check data item visibility.
         */
        constructor(axis: Axis, xAxis?: Axis);
        /**
         * AxisRenderer.effectiveAxis override. Gets the effective vertical Axis in current context,
         * getting one from Plot2D or chart control if there's no local Axis associated with this renderer.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {MindFusion.Charting.Axis} An Axis instance.
         */
        effectiveAxis(context: RenderContext): Axis;
        /**
         * Component.measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        private drawCoordinates;
        private drawTitle;
        private drawLabels;
        private labelsToDraw;
        private drawTicks;
        /**
         * Component.draw override. Draws this component in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        get maxLabelWidth(): number;
        set maxLabelWidth(value: number);
        private m_maxLabelWidth;
        private xAxis;
        private seriesLabelsCols;
        private m_plotLeftSide;
        /**
         * Gets or sets whether this YAxisRenderer is shown at the left side of a plot.
         */
        get plotLeftSide(): boolean;
        /**
         * Gets or sets whether this YAxisRenderer is shown at the left side of a plot.
         */
        set plotLeftSide(value: boolean);
        private m_labelAlignment;
        /**
        * Gets the horizontal alignment of axis label
        */
        get labelAlignment(): StringAlignment;
        /**
        * Sets the horizontal alignment of axis label
        */
        set labelAlignment(value: StringAlignment);
        private effectiveXAxis;
        private xSorted;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/AreaRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Series } from "Charting/Series";
    import { Renderer2D } from "Charting/Renderer2D";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class A SeriesRenderer that draws each series as an area in its containing plot.
    * @property {Number} areaOpacity Gets or sets the opacity of area polygons.
    */
    export class AreaRenderer extends Renderer2D {
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Initializes a new instance of the AreaRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as areas.
         */
        constructor(series: ObservableCollection<Series>);
        private m_areaOpacity;
        /**
         * Gets or sets the opacity of area polygons.
         */
        get areaOpacity(): number;
        /**
         * Gets or sets the opacity of area polygons.
         */
        set areaOpacity(value: number);
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/StepAreaRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class A SeriesRenderer that draws series as filled steps between data points.
    * @property {Number} areaOpacity ets or sets the opacity of area polygons.
    */
    export class StepAreaRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the StepAreaRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        private m_areaOpacity;
        /**
         * Gets or sets the opacity of area polygons.
         */
        get areaOpacity(): number;
        /**
         * Gets or sets the opacity of area polygons.
         */
        set areaOpacity(value: number);
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/Controls/LayoutBuilder" {
    import { Component, StackPanel, GridPanel } from "Charting/Components/Components";
    import { XAxisRenderer } from "Charting/XAxisRenderer";
    import { YAxisRenderer } from "Charting/YAxisRenderer";
    import { Plot2D } from "Charting/Plot2D";
    import { Dashboard } from "Charting/Controls/Dashboard";
    /**
     * @class Provides shortcut methods for building fragments of dashboard's user interface.
     */
    export class LayoutBuilder {
        /**
         * Initializes a new instance of the LayoutBuilder class.
         * @param {Dashboard} board A Dashboard instance.
         */
        constructor(board: Dashboard);
        private board;
        /**
         * Creates a two-row stack panel whose second row is a horizontal stack of two components.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Component} row1 The component on first row.
         * @param {Component} row2col1 The first component on second row.
         * @param {Component} row2col2 The second component on second row.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAdd1By2RowLayout(row1: Component, row2col1: Component, row2col2: Component): StackPanel;
        /**
         * Creates a two-row stack panel whose first row is a horizontal stack of two components.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Component} row1col1 The first component on first row.
         * @param {Component} row1col2 The second component on first row.
         * @param {Component} row2 The component on first row.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAdd2By1RowLayout(row1col1: Component, row1col2: Component, row2: Component): StackPanel;
        /**
         * Creates a two-column stack panel whose first column is a vertical stack of two components.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Component} col1row1 The first component in first column.
         * @param {Component} col1row2 The second component in first column.
         * @param {Component} col2 The component in second column.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAdd2By1ColumnLayout(col1row1: Component, col1row2: Component, col2: Component): StackPanel;
        /**
         * Creates a two-column stack panel whose first column is a vertical stack of two components.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Component} col1 The component in first column.
         * @param {Component} col2row1 The first component in second column.
         * @param {Component} col2row2 The second component in second column.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAdd1By2ColumnLayout(col1: Component, col2row1: Component, col2row2: Component): StackPanel;
        /**
         * Creates horizontal stack panels for components on same row
         * and adds them to a vertical stack panel.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Component} row1col1 The first component on first row.
         * @param {Component} row1col2 The second component on first row.
         * @param {Component} row2col1 The first component on second row.
         * @param {Component} row2col2 The second component on second row.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAdd2By2Layout(row1col1: Component, row1col2: Component, row2col1: Component, row2col2: Component): StackPanel;
        /**
         * Creates horizontal stack panels for components on same row
         * and adds them to a vertical stack panel.
         * @param {Component} row1col1 The first component on first row.
         * @param {Component} row1col2 The second component on first row.
         * @param {Component} row2col1 The first component on second row.
         * @param {Component} row2col2 The second component on second row.
         * @returns {StackPanel} A StackPanel instance.
         */
        create2By2Layout(row1col1: Component, row1col2: Component, row2col1: Component, row2col2: Component): StackPanel;
        /**
         * Creates a two-row stack panel whose second row is a horizontal stack of two components.
         * @param {Component} row1 The component on first row.
         * @param {Component} row2col1 The first component on second row.
         * @param {Component} row2col2 The second component on second row.
         * @returns {StackPanel} A StackPanel instance.
         */
        create1By2RowLayout(row1: Component, row2col1: Component, row2col2: Component): StackPanel;
        /**
         * Creates a two-row stack panel whose first row is a horizontal stack of two components.
         * @param {Component} row1col1 The first component on first row.
         * @param {Component} row1col2 The second component on first row.
         * @param {Component} row2 The component on first row.
         * @returns {StackPanel} A StackPanel instance.
         */
        create2By1RowLayout(row1col1: Component, row1col2: Component, row2: Component): StackPanel;
        /**
         * Creates a two-column stack panel whose first column is a vertical stack of two components.
         * @param {Component} col1row1 The first component in first column.
         * @param {Component} col1row2 The second component in first column.
         * @param {Component} col2 The component in second column.
         * @returns {StackPanel} A StackPanel instance.
         */
        create2By1ColumnLayout(col1row1: Component, col1row2: Component, col2: Component): StackPanel;
        /**
         * Creates a two-column stack panel whose first column is a vertical stack of two components.
         * @param {Component} col1 The component in first column.
         * @param {Component} col2row1 The first component in second column.
         * @param {Component} col2row2 The second component in second column.
         * @returns {StackPanel} A StackPanel instance.
         */
        create1By2ColumnLayout(col1: Component, col2row1: Component, col2row2: Component): StackPanel;
        /**
         * Creates a StackPanel for each array of components and
         * adds it to a parent StackPanel with opposite orientation.
         * @param {Boolean} horizontal The orientation of the parent panel.
         * @param {Component[]} c1 The first stack of components.
         * @param {Component[]} c2 The second stack of components.
         * @param {Component[]} c3 The third stack of components.
         * @returns {StackPanel} A StackPanel instance.
         */
        createLayout(horizontal: boolean, c1: Component[], c2: Component[], c3: Component[]): StackPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer[]} top An array of XAxisRenderer components that should be placed at top side of the plot.
         * @param {YAxisRenderer[]} left An array of YAxisRenderer components that should be placed at left side of the plot.
         * @param {XAxisRenderer[]} bottom An array of XAxisRenderer components that should be placed at bottom side of the plot.
         * @param {YAxisRenderer[]} right An array of YAxisRenderer components that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createAndAddPlotAndAxes(plot: Plot2D, top: XAxisRenderer[], left: YAxisRenderer[], bottom: XAxisRenderer[], right: YAxisRenderer[]): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plot.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createAndAddPlotWithTopAndLeftAxes(plot: Plot2D, top: XAxisRenderer, left: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plot.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createAndAddPlotWithTopAndRightAxes(plot: Plot2D, top: XAxisRenderer, right: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plot.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createAndAddPlotWithBottomAndRightAxes(plot: Plot2D, bottom: XAxisRenderer, right: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plot.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createAndAddPlotWithBottomAndLeftAxes(plot: Plot2D, bottom: XAxisRenderer, left: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer[]} top An array of XAxisRenderer components that should be placed at top side of the plot.
         * @param {YAxisRenderer[]} left An array of YAxisRenderer components that should be placed at left side of the plot.
         * @param {XAxisRenderer[]} bottom An array of XAxisRenderer components that should be placed at bottom side of the plot.
         * @param {YAxisRenderer[]} right An array of YAxisRenderer components that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createPlotAndAxes(plot: Plot2D, top: XAxisRenderer[], left: YAxisRenderer[], bottom: XAxisRenderer[], right: YAxisRenderer[]): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plot.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createPlotWithTopAndLeftAxes(plot: Plot2D, top: XAxisRenderer, left: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plot.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createPlotWithTopAndRightAxes(plot: Plot2D, top: XAxisRenderer, right: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plot.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createPlotWithBottomAndLeftAxes(plot: Plot2D, bottom: XAxisRenderer, left: YAxisRenderer): GridPanel;
        /**
         * Creates a GridPanel containing the specified plot and axis renderers.
         * @param {Plot2D} plot A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plot.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plot.
         * @returns {GridPanel} A GridPanel instance.
         */
        createPlotWithBottomAndRightAxes(plot: Plot2D, bottom: XAxisRenderer, right: YAxisRenderer): GridPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {XAxisRenderer[]} top An array of XAxisRenderer components that should be placed at top side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {XAxisRenderer[]} bottom An array of XAxisRenderer components that should be placed at bottom side of the plot.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddColumnLayout(top: XAxisRenderer[], plots: Plot2D[], bottom: XAxisRenderer[]): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderer.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddColumnLayout(top: XAxisRenderer, plot1: Plot2D, plot2: Plot2D): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddColumnLayout(top: XAxisRenderer, plots: Plot2D[], bottom: XAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @param {Plot2D} plot3 A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at top side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddColumnLayout(top: XAxisRenderer, plot1: Plot2D, plot2: Plot2D, plot3: Plot2D, bottom: XAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {XAxisRenderer[]} top An array of XAxisRenderer components that should be placed at top side of the plot.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {XAxisRenderer[]} bottom An array of XAxisRenderer components that should be placed at bottom side of the plot.
         * @returns {StackPanel} A StackPanel instance.
         */
        createColumnLayout(top: XAxisRenderer[], plots: Plot2D[], bottom: XAxisRenderer[]): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderer.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @returns {StackPanel} A StackPanel instance.
         */
        createColumnLayout(top: XAxisRenderer, plot1: Plot2D, plot2: Plot2D): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @param {Plot2D} plot3 A Plot2D instance.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at top side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createColumnLayout(top: XAxisRenderer, plot1: Plot2D, plot2: Plot2D, plot3: Plot2D, bottom: XAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {XAxisRenderer} top An XAxisRenderer that should be placed at top side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {XAxisRenderer} bottom An XAxisRenderer that should be placed at bottom side of the plot.
         * @returns {StackPanel} A StackPanel instance.
         */
        createColumnLayout(top: XAxisRenderer, plots: Plot2D[], bottom: XAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {YAxisRenderer[]} left An array of YAxisRenderer components that should be placed at left side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {YAxisRenderer[]} right An array of YAxisRenderer components that should be placed at right side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddRowLayout(left: YAxisRenderer[], plots: Plot2D[], right: YAxisRenderer[]): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderer.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddRowLayout(left: YAxisRenderer, plot1: Plot2D, plot2: Plot2D): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @param {Plot2D} plot3 A Plot2D instance.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createAndAddRowLayout(left: YAxisRenderer, plot1: Plot2D, plot2: Plot2D, plot3: Plot2D, right: YAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * The panel is automatically added to the dashboard's LayoutPanel.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plots.
         * @returns A StackPanel instance.
         */
        createAndAddRowLayout(left: YAxisRenderer, plots: Plot2D[], right: YAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {YAxisRenderer[]} left An array of YAxisRenderer components that should be placed at left side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {YAxisRenderer[]} right An array of YAxisRenderer components that should be placed at right side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createRowLayout(left: YAxisRenderer[], plots: Plot2D[], right: YAxisRenderer[]): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderer.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @returns {StackPanel} A StackPanel instance.
         */
        createRowLayout(left: YAxisRenderer, plot1: Plot2D, plot2: Plot2D): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D} plot1 A Plot2D instance.
         * @param {Plot2D} plot2 A Plot2D instance.
         * @param {Plot2D} plot3 A Plot2D instance.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createRowLayout(left: YAxisRenderer, plot1: Plot2D, plot2: Plot2D, plot3: Plot2D, right: YAxisRenderer): StackPanel;
        /**
         * Creates a StackPanel containing the specified plots and axis renderers.
         * @param {YAxisRenderer} left A YAxisRenderer that should be placed at left side of the plots.
         * @param {Plot2D[]} plots An array of Plot2D instances.
         * @param {YAxisRenderer} right A YAxisRenderer that should be placed at right side of the plots.
         * @returns {StackPanel} A StackPanel instance.
         */
        createRowLayout(left: YAxisRenderer, plots: Plot2D[], right: YAxisRenderer): StackPanel;
    }
}
declare module "Charting/Controls/StartMeasureVisitor" {
    import { ComponentVisitor } from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { Plot } from "Charting/Plot";
    export class StartMeasureVisitor extends ComponentVisitor {
        private context;
        constructor(context: RenderContext);
        visitPlot(plot: Plot): void;
    }
}
declare module "Charting/Controls/AdjustRangesVisitor" {
    import { ComponentVisitor } from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { Plot } from "Charting/Plot";
    export class AdjustRangesVisitor extends ComponentVisitor {
        private context;
        constructor(context: RenderContext);
        visitPlot(plot: Plot): void;
    }
}
declare module "Charting/Controls/MeasureRangesVisitor" {
    import { ComponentVisitor } from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { Plot } from "Charting/Plot";
    export class MeasureRangesVisitor extends ComponentVisitor {
        private context;
        constructor(context: RenderContext);
        visitPlot(plot: Plot): void;
    }
}
declare module "Charting/Controls/Dashboard" {
    /**
    * @namespace MindFusion.Charting.Controls
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
    import { Rect, Graphics, Pen, ImageAlign, Brush, Color } from '@mindfusion/drawing';
    import { Component, RootControl, CursorHint, StackPanel, Panel } from "Charting/Components/Components";
    import { EventDispatcher } from '@mindfusion/common';
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { LayoutBuilder } from "Charting/Controls/LayoutBuilder";
    import { Theme } from "Charting/Theme";
    /**
    * @class A control that contains multiple chart plots and gauges and manages their layout.
    * @property {Panel} rootPanel Gets the root Panel in the hierarchy of dashboard components.
    */
    /**
    * @property {LayoutBuilder} layoutBuilder Gets a LayoutBuilder instance that provides shortcut methods for building fragments of dashboard's user interface.
     */
    /**
    * @property {String} licenseKey Gets or sets the license key of the control.
    * @property {String} licenseLocation Gets or sets the path to the license file.
    */
    /**
    * @property {StackPanel} layoutPanel Gets a Panel containing dashboard components that should participate in layout measurements and be arranged relatively to each other.
    * @property {Theme} theme Gets or sets a Theme specifying appearance of dashboard elements.
    * @property {Color} backColor Gets or sets dashboard's back color.
    * @property {String} backgroundImageLocation Gets or sets dashboard's background image.
    * @property {Boolean} backgroundImageAutoSize Gets or sets whether auto-size mode is enabled for BackgroundImage.
    * @property {ImageAlign} backgroundImageAlign Gets or sets the alignment of BackgroundImage relatively to dashboard boundaries.
    * @property {Boolean} allowZoom Gets or sets a value indicating whether users are allowed to zoom into plots' data ranges.
    */
    export class Dashboard implements RootControl {
        private clientRectangle;
        private element;
        private context;
        private lastHighlight;
        private _element;
        /**
         * Initializes a new instance of the Dashboard class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this dashboard with.
         */
        constructor(element: HTMLCanvasElement);
        static find(id: string): Dashboard;
        /**
         * Gets the root Panel in the hierarchy of dashboard components.
         */
        get rootPanel(): Panel;
        /**
         * Gets the root Panel in the hierarchy of dashboard components.
         */
        set rootPanel(value: Panel);
        private m_rootPanel;
        private m_layoutPanel;
        /**
         * Gets a LayoutBuilder instance that provides shortcut methods for
         * building fragments of dashboard's user interface.
         */
        get layoutBuilder(): LayoutBuilder;
        /**
         * Gets a LayoutBuilder instance that provides shortcut methods for
         * building fragments of dashboard's user interface.
         */
        set layoutBuilder(value: LayoutBuilder);
        private m_layoutBuilder;
        /**
         * Gets a Panel containing dashboard components that should participate
         * in layout measurements and be arranged relatively to each other.
         */
        get layoutPanel(): StackPanel;
        /**
         * Gets a Panel containing dashboard components that should participate
         * in layout measurements and be arranged relatively to each other.
         */
        set layoutPanel(value: StackPanel);
        private resizeEnd;
        /**
         * Control.OnResize override. Invalidates the layout of child components and runs a new layout pass.
         * @param {EventArgs} e An EventArgs instance.
         */
        onResize(): void;
        handleResize(): void;
        /**
         * Binds the chart to current DataSource.
         */
        dataBind(): void;
        dataBindInternal(): void;
        onUnbind(): void;
        onBind(): void;
        /**
         * Draws the dashboard on specified Graphics surface.
         * @param {Graphics} g A Graphics instance.
         * @param {Rect} layoutRect Current layout rectangle.
         * @param {Rect} clipRect Current clip rectangle.
         */
        draw(): void;
        private drawBackground;
        /**
         * Creates a RenderContext instance.
         * @param {Graphics} graphics A Graphics surface where dashboard elements should be rendered.
         * @param {Rect} clipRect The current clip rectangle.
         * @returns {RenderContext} A RenderContext instance.
         */
        createRenderContext(graphics: Graphics, clipRect: Rect): RenderContext;
        private hitTest;
        private hitTest2;
        private onDataItemClicked;
        /**
         * Raised when the user clicks on a data item inside a plot.
         * @event Dashboard.dataItemClicked
         * @type {EventDispatcher}
         * @property {Dashboard} sender
         * @property {HitResult} args
         */
        get dataItemClicked(): EventDispatcher<HitResult>;
        private m_dataItemClicked;
        /**
         * Raises the DataItemClicked event
         * if the user has clicked on data element in a plot.
         * @param {MouseEvent} e A MouseEvent instance.
         */
        protected onClick(e: MouseEvent): void;
        /**
         * Handles the HTMLCanvasElement mousedown event.
         * @param {MouseEvent} e A MouseEvent instance.
         */
        protected onMouseDown(e: MouseEvent): void;
        private onMouseWheel;
        private onWheel;
        private currentCursor;
        /**
         * Handles the HTMLCanvasElement mousemove event.
         * @param {MouseEvent} e A MouseEvent instance.
         */
        onMouseMove(e: MouseEvent): void;
        getCursorHint(x: number, y: number): CursorHint;
        private getTooltipAt;
        tooltipBrush: Brush;
        tooltipPen: Pen;
        toolTipTextBrush: Brush;
        private lastTooltip;
        private drawToolTip;
        private resetToolTip;
        /**
         * Handles the HTMLCanvasElement mouseup event.
         * @param {MouseEvent} e A MouseEvent instance.
         */
        onMouseUp(e: MouseEvent): void;
        protected onMouseLeave(e: MouseEvent): void;
        private currentController;
        private currentAnimation;
        private layoutInvalid;
        /**
         * Implements RootControl.InvalidateLayout. Invalidates layout of specified component.
         * @param {Components.Component} panel The component to invalidate.
         */
        invalidateLayout(panel: Component): void;
        /**
         * Implements RootControl.InvalidateLayout. Invalidates the specified region of a component.
         * @param {RectD} [rect] The area to invalidate and redraw.
         * @param {Components.Component} [panel] The reference Component.
         */
        invalidate(rect?: Rect, panel?: Component): void;
        private m_repaintId;
        private m_theme;
        /**
         * Gets or sets a Theme specifying appearance of dashboard elements.
         */
        get theme(): Theme;
        /**
         * Gets or sets a Theme specifying appearance of dashboard elements.
         */
        set theme(value: Theme);
        private onThemePropertyChanged;
        private m_backColor;
        /**
        * Gets or sets dashboard's back color.
        */
        get backColor(): Color;
        /**
         * Gets or sets dashboard's back color.
         */
        set backColor(value: Color);
        private m_backgroundImage;
        /**
         * Gets or sets dashboard's background image.
         */
        get backgroundImageLocation(): string;
        /**
         * Gets or sets dashboard's background image.
         */
        set backgroundImageLocation(value: string);
        /**
         * Gets or sets whether auto-size mode is enabled for BackgroundImage.
         */
        get backgroundImageAutoSize(): boolean;
        /**
         * Gets or sets whether auto-size mode is enabled for BackgroundImage.
         */
        set backgroundImageAutoSize(value: boolean);
        /**
         * Gets or sets the alignment of BackgroundImage relatively to dashboard boundaries.
         */
        get backgroundImageAlign(): ImageAlign;
        /**
         * Gets or sets the alignment of BackgroundImage relatively to dashboard boundaries.
         */
        set backgroundImageAlign(value: ImageAlign);
        private m_allowZoom;
        /**
         * Gets or sets a value indicating whether users are allowed to zoom into plots' data ranges.
         */
        get allowZoom(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to zoom into plots' data ranges.
         */
        set allowZoom(value: boolean);
        bindingsValid: boolean;
        /**
        * Gets or sets the path to the license file.
        */
        get licenseLocation(): string;
        /**
         * Gets or sets the path to the license file.
         */
        set licenseLocation(value: string);
        private m_licenseLocation;
        /**
         * Gets or sets the license key of the control.
         */
        get licenseKey(): string;
        /**
         * Gets or sets the license key of the control.
         */
        set licenseKey(value: string);
        private m_licenseKey;
        protected m_gridFrameDashStops: number[];
        /**
         * Deserializes the control's data from JSON string.
         */
        fromJson(json: string): any;
        /**
         * Serializes the control's data to JSON string.
         */
        toJson(): any;
        protected toJsonPre(): any;
        initialize(): void;
        preparePostback(sender: any, args: any): void;
        onControlLoaded(): void;
        get controlLoaded(): EventDispatcher<EventArgs>;
        private m_controlLoaded;
        private req;
    }
}
declare module "Charting/Margins" {
    /**
    * @class Describes rectangular margins.
    * @property {Number} left Gets or sets the width of the left side of the frame.
    * @property {Number} top Gets or sets the width of the top side of the frame.
    * @property {Number} right Gets or sets the width of the right side of the frame.
    * @property {Number} bottom Gets or sets the width of the bottom side of the frame.
    * @property {Number} width Returns the sum of Left and Right margins.
    * @property {Number} height Returns the sum of Top and Bottom margins.
    */
    export class Margins {
        /**
         * Initializes a new instance of the Margins structure.
         */
        constructor(left: number, top?: number, right?: number, bottom?: number);
        /**
         * Gets or sets the width of the left side of the frame.
         */
        get left(): number;
        /**
         * Gets or sets the width of the left side of the frame.
         */
        set left(value: number);
        /**
         * Gets or sets the width of the top side of the frame.
         */
        get top(): number;
        /**
         * Gets or sets the width of the top side of the frame.
         */
        set top(value: number);
        /**
         * Gets or sets the width of the right side of the frame.
         */
        get right(): number;
        /**
         * Gets or sets the width of the right side of the frame.
         */
        set right(value: number);
        /**
         * Gets or sets the width of the bottom side of the frame.
         */
        get bottom(): number;
        /**
         * Gets or sets the width of the bottom side of the frame.
         */
        set bottom(value: number);
        /**
         * Returns the sum of Left and Right margins.
         */
        get width(): number;
        /**
         * Returns the sum of Top and Bottom margins.
         */
        get height(): number;
        fromJson(obj: any): void;
        toJson(): any;
        private m_left;
        private m_top;
        private m_right;
        private m_bottom;
    }
}
declare module "Charting/LegendRenderer" {
    import { Brush, FontStyle, Pen, Font, DashStyle } from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { RenderContext } from "Charting/RenderContext";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class A component that renders chart legend.
    * @property {ObservableCollection<SeriesRenderer>} content Gets or sets a list of SeriesRenderer objects whose Series should be displayed in this legend.
    * @property {String} title Gets or sets the legend's title.
    * @property {Brush} titleCharting.Brush Gets or sets the Brush that should be used to draw the legend's Title.
    * @property {String} titleFontName Gets or sets the name of font that should be used to draw the legend's Title.
    * @property {Number} titleFontSize Gets or sets the size of font that should be used to draw the legend's Title.
    * @property {FontStyle} titleFontStyle Gets or sets the style of font that should be used to draw the legend's Title.
    * @property {Boolean} showTitle Gets or sets a value indicating whether to display the legend title.
    * @property {Number} padding Gets or sets the padding space between content and borders of this legend.
    * @property {Number} spacing Gets or sets the distance between adjacent entries in the legend.
    * @property {Boolean} allowMove Gets or sets a value indicating whether users are allowed to move this legend.
    * @property {Brush} background Gets or sets the Brush that should be used to fill the background of this legend.
    * @property {Brush} borderStroke Gets or sets the Brush that should be used to stroke the borders of this legend.
    * @property {Number} borderStrokeThickness Gets or sets the stroke thickness of legend borders.
    * @property {DashStyle} borderStrokeDashStyle Gets or sets the stroke dash style of legend borders.
    * @property {LabelKinds} elementLabelKind Gets or sets the type of label to show for series elements. This property is used only when showSeriesElements is set to true.
    * @property {Boolean} showSeriesElements Gets or sets a value, indicatating whether this legend will display individual series element labels instead of the series titles.
    * @property {Number} maxItemsPerColumn Gets or sets the maximum number ot items per display column.
    */
    export class LegendRenderer extends Components.Component {
        /**
         * Initializes a new instance of the LegendRenderer class.
         */
        constructor();
        /**
         * Components.Component.CreateController override. Returns a Components.ComponentController
         * used to interact with this component.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} Instance of the LegendController class.
         */
        createController(context: RenderContext): Components.ComponentController;
        private onModelCollectionChanged;
        /**
         * Components.Component.Draw override. Draws legend elements in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Components.Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Gets or sets a list of SeriesRenderer objects whose Series
         * should be displayed in this legend.
         */
        get content(): ObservableCollection<SeriesRenderer>;
        /**
         * Gets or sets a list of SeriesRenderer objects whose Series
         * should be displayed in this legend.
         */
        set content(value: ObservableCollection<SeriesRenderer>);
        /**
         * Gets or sets the legend's title.
         */
        get title(): string;
        /**
         * Gets or sets the legend's title.
         */
        set title(value: string);
        /**
         * Gets the Font that should be used to draw the legend's Title.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Font} A System.Font instance.
         */
        effectiveTitleFont(context: RenderContext): Font;
        /**
         * Gets the Brush that should be used to draw the legend's Title.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {SysCharting.Brush} A System.Brush instance.
         */
        effectiveTitleBrush(context: RenderContext): Brush;
        /**
         * Gets or sets the Brush that should be used to draw the legend's Title.
         */
        get titleBrush(): Brush;
        /**
         * Gets or sets the Brush that should be used to draw the legend's Title.
         */
        set titleBrush(value: Brush);
        /**
         * Gets or sets the name of font that should be used to draw the legend's Title.
         */
        get titleFontName(): string;
        /**
         * Gets or sets the name of font that should be used to draw the legend's Title.
         */
        set titleFontName(value: string);
        /**
         * Gets or sets the size of font that should be used to draw the legend's Title.
         */
        get titleFontSize(): number;
        /**
         * Gets or sets the size of font that should be used to draw the legend's Title.
         */
        set titleFontSize(value: number);
        /**
         * Gets or sets the style of font that should be used to draw the legend's Title.
         */
        get titleFontStyle(): FontStyle;
        /**
         * Gets or sets the style of font that should be used to draw the legend's Title.
         */
        set titleFontStyle(value: FontStyle);
        /**
         * Gets a value indicating whether to display the legend title.
         */
        get showTitle(): boolean;
        /**
         * Sets a value indicating whether to display the legend title.
         */
        set showTitle(value: boolean);
        /**
         * Gets the padding space between content and borders of this legend.
         */
        get padding(): number;
        /**
         * Sets the padding space between content and borders of this legend.
         */
        set padding(value: number);
        /**
         * Gets the distance between adjacent entries in the legend.
         */
        get spacing(): number;
        /**
         * Sets the distance between adjacent entries in the legend.
         */
        set spacing(value: number);
        /**
         * Gets or sets a value indicating whether users are allowed to move this legend.
         */
        get allowMove(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to move this legend.
         */
        set allowMove(value: boolean);
        /**
         * Gets the Brush that should be used to fill the legend background.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Brush} A Brush instance.
         */
        effectiveFill(context: RenderContext): Brush;
        /**
         * Gets the Pen that should be used to draw the legend borders.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Pen} A Pen instance.
         */
        effectiveBorderPen(context: RenderContext): Pen;
        /**
         * Gets the Brush that should be used to stroke the legend borders.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Brush} A Brush instance.
         */
        effectiveBorderStroke(context: RenderContext): Brush;
        /**
         * Gets the thickness of border strokes.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Number} A number value.
         */
        effectiveBorderStrokeThickness(context: RenderContext): number;
        /**
         * Gets the dash style of border strokes.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {DashStyle} A member of the DashStyle enumeration.
         */
        effectiveStrokeDashStyle(context: RenderContext): DashStyle;
        private m_content;
        private m_background;
        /**
         * Gets or sets the Brush that should be used to fill the background of this legend.
         */
        get background(): Brush;
        /**
         * Gets or sets the Brush that should be used to fill the background of this legend.
         */
        set background(value: Brush);
        private m_borderStroke;
        /**
         * Gets or sets the Brush that should be used to stroke the borders of this legend.
         */
        get borderStroke(): Brush;
        /**
         * Gets or sets the Brush that should be used to stroke the borders of this legend.
         */
        set borderStroke(value: Brush);
        private m_borderStrokeThickness;
        /**
         * Gets or sets the stroke thickness of legend borders.
         */
        get borderStrokeThickness(): number;
        /**
         * Gets or sets the stroke thickness of legend borders.
         */
        set borderStrokeThickness(value: number);
        private m_borderStrokeDashStyle;
        /**
         * Gets or sets the stroke dash style of legend borders.
         */
        get borderStrokeDashStyle(): DashStyle;
        /**
         * Gets or sets the stroke dash style of legend borders.
         */
        set borderStrokeDashStyle(value: DashStyle);
        /**
        * Gets or sets a value, indicatating whether this legend will display individual
        * series element labels instead of the series titles.
        */
        get showSeriesElements(): boolean;
        /**
    * Gets or sets a value, indicatating whether this legend will display individual
    * series element labels instead of the series titles.
    */
        set showSeriesElements(value: boolean);
        /**
        * Gets or sets the type of label to show for series elements.
        * This property is used only when showSeriesElements is set to true.
        */
        get elementLabelKind(): LabelKinds;
        /**
        * Gets or sets the type of label to show for series elements.
        * This property is used only when showSeriesElements is set to true.
        */
        set elementLabelKind(value: LabelKinds);
        /**
        * Gets or sets the maximum number ot items per display column.
        */
        get maxItemsPerColumn(): number;
        /**
    * Gets or sets the maximum number ot items per display column.
    */
        set maxItemsPerColumn(value: number);
        fromJson(obj: any): void;
        toJson(): any;
        private m_title;
        private m_titleBrush;
        private m_titleFontName;
        private m_titleFontSize;
        private m_titleFontStyle;
        private m_showTitle;
        private m_padding;
        private m_spacing;
        private m_allowMove;
        private m_maxItemsPerColumn;
        private m_showSeriesElements;
        private m_elementLabelKind;
    }
}
declare module "Charting/DataBoundSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import * as Common from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    /**
    * @class Represents a series whose data items are retrieved from a data source.
    * @property {any} dataSource Gets or sets the data source this series is bound to.
    * @property {String} xDataField Gets or sets the name of X data field in the data source.
    * @property {String} yDataField Gets or sets the name of Y data field in the data source.
    * @property {String} zDataField Gets or sets the name of Z data field in the data source.
    * @property {String} innerLabelsDataField Gets or sets the name of inner labels data field in the data source.
    * @property {String} outerLabelsDataField Gets or sets the name of inner labels data field in the data source.
    * @property {String} toolTipsDataField Gets or sets the name of tooltips data field in the data source.
    * @property {String} xAxisLabelsDataField Gets or sets the name of X axis labels data field in the data source.
    * @property {String} yAxisLabelsDataField Gets or sets the name of Y axis labels data field in the data source.
    * @property {String} zAxisLabelsDataField Gets or sets the name of Z axis labels data field in the data source.
    * @property {Number} size Implements Series.Size. Gets the number of data items in the data source.
    * @property {Number} dimensions Implements Series.Dimensions. Returns the number of X/Y/ZDataField properties set.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    * @property {LabelKinds} supportedLabels Implements Series.SupportedLabels. Result depends on which *LabelsDataField properties are set.
    */
    export class DataBoundSeries implements Series {
        /**
         * Initializes a new instance of the DataBoundSeries class.
         * @param { any | Array<any> | IEnumerable<any>} dataSource A reference to the data source object.
         */
        constructor(dataSource: any);
        /**
         * Gets or sets the data source this series is bound to.
         */
        get dataSource(): any;
        /**
         * Gets or sets the data source this series is bound to.
         */
        set dataSource(value: any);
        private registerChangedEvents;
        private unregisterChangedEvents;
        private onCollectionChanged;
        private raiseDataChanged;
        private dataCache;
        get enumerableDataSource(): boolean;
        get arrayDataSource(): boolean;
        /**
         * Gets or sets the name of X data field in the data source.
         */
        get xDataField(): string;
        /**
         * Gets or sets the name of X data field in the data source.
         */
        set xDataField(value: string);
        /**
         * Gets or sets the name of Y data field in the data source.
         */
        get yDataField(): string;
        /**
         * Gets or sets the name of Y data field in the data source.
         */
        set yDataField(value: string);
        /**
         * Gets or sets the name of Z data field in the data source.
         */
        get zDataField(): string;
        /**
         * Gets or sets the name of Z data field in the data source.
         */
        set zDataField(value: string);
        /**
         * Gets or sets the name of inner labels data field in the data source.
         */
        get innerLabelsDataField(): string;
        /**
         * Gets or sets the name of inner labels data field in the data source.
         */
        set innerLabelsDataField(value: string);
        /**
         * Gets or sets the name of outer labels data field in the data source.
         */
        get outerLabelsDataField(): string;
        /**
         * Gets or sets the name of outer labels data field in the data source.
         */
        set outerLabelsDataField(value: string);
        /**
         * Gets or sets the name of tooltips data field in the data source.
         */
        get toolTipsDataField(): string;
        /**
         * Gets or sets the name of tooltips data field in the data source.
         */
        set toolTipsDataField(value: string);
        /**
         * Gets or sets the name of X axis labels data field in the data source.
         */
        get xAxisLabelsDataField(): string;
        /**
         * Gets or sets the name of X axis labels data field in the data source.
         */
        set xAxisLabelsDataField(value: string);
        /**
         * Gets or sets the name of Y axis labels data field in the data source.
         */
        get yAxisLabelsDataField(): string;
        /**
         * Gets or sets the name of Y axis labels data field in the data source.
         */
        set yAxisLabelsDataField(value: string);
        /**
         * Gets or sets the name of Z axis labels data field in the data source.
         */
        get zAxisLabelsDataField(): string;
        /**
         * Gets or sets the name of Z axis labels data field in the data source.
         */
        set zAxisLabelsDataField(value: string);
        private getElement;
        private static objectToDouble;
        private static objectToString;
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in the data source.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the data source.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns a label for the specified data item in the data source.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. DataBoundSeries always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. Gets a value indicating whether
         * the series values increase monotonously in specified dimension.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Gets the number of data items in the data source.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns the number of X/Y/ZDataField properties set.
         */
        get dimensions(): number;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        /**
         * Implements Series.SupportedLabels. Result depends on which *LabelsDataField properties are set.
         */
        get supportedLabels(): LabelKinds;
        private m_dataSource;
        private m_xDataField;
        private m_yDataField;
        private m_zDataField;
        private m_innerLabelsDataField;
        private m_outerLabelsDataField;
        private m_toolTipsDataField;
        private m_xAxisLabelsDataField;
        private m_yAxisLabelsDataField;
        private m_zAxisLabelsDataField;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event DataBoundSeries.dataChanged
         * @type {Common.EventDispatcher}
         * @property {DataBoundSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            innerLabelsDataField: string;
            outerLabelsDataField: string;
            toolTipsDataField: string;
            xAxisLabelsDataField: string;
            yAxisLabelsDataField: string;
            zAxisLabelsDataField: string;
            xDataField: string;
            yDataField: string;
            zDataField: string;
            title: string;
            dataSource: any;
        };
    }
}
declare module "Charting/Controls/Chart" {
    /**
    * @namespace MindFusion.Charting.Controls
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
    import * as Drawing from '@mindfusion/drawing';
    import { ObservableCollection, List } from '@mindfusion/common-collections';
    import { Components, Controls } from "Charting/LoadOrder";
    import { Margins } from "Charting/Margins";
    import { Plot } from "Charting/Plot";
    import { Series } from "Charting/Series";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { LabelKinds } from "Charting/LabelKinds";
    import { LegendRenderer } from "Charting/LegendRenderer";
    /**
    * @class A base class for chart controls.
    * @property {Components.Panel} plotPanel Gets the Components.Panel that contains the chart's plot and associated elements.
    * @property {List<Series>} dataBoundSeries Contains series generated from DataSource data.
    * @property {Plot} plot Gets the chart's Plot component.
    * @property {Components.GridPanel} chartPanel Gets or sets the Components.GridPanel that contains the chart's PlotPanel and axis renderers.
    * @property {String} title Gets or sets the title of this chart.
    * @property {Margins} titleMargin Gets or sets the margin space around Title.
    * @property {String} titleFontName Gets or sets the name of Drawing.Font used to draw chart's Title.
    * @property {Number} titleFontSize Gets or sets the size of Drawing.Font used to draw chart's Title.
    * @property {Drawing.FontStyle} titleFontStyle Gets or sets the style of Drawing.Font used to draw chart's Title.
    * @property {Drawing.Brush} titleBrush Gets or sets the Drawing.Brush used to draw chart's Title.
    * @property {String} plotImageLocation Gets or sets the Image drawn inside chart's plot area.
    * @property {Boolean} plotImageAutoSize Gets or sets whether auto-size mode is enabled for PlotImage.
    * @property {Drawing.ImageAlign} plotImageAlign Gets or sets the alignment of PlotImage relatively to the plot boundaries.
    * @property {String} legendTitle Gets or sets the legend title.
    * @property {Boolean} showLegendTitle Gets a value indicating whether to display the legend title.
    * @property {Number} legendSpacing Gets the distance between adjacent entries in the legend.
    * @property {Components.LayoutAlignment} legendHorizontalAlignment Gets or sets the horizontal alignment of the legend.
    * @property {Components.LayoutAlignment} legendVerticalAlignment Gets or sets the vertical alignment of the legend.
    * @property {Margins} legendMargin Gets or sets the margin space around the legend.
    * @property {Boolean} showLegend Gets or sets a value indicating whether the chart should draw a legend.
    * @property {LegendRenderer} legendRenderer Gets the LegendRenderer component used to draw the chart's legend.
    * @property {Boolean} showZoomWidgets Gets or sets a value indicating whether the plot should show zoom buttons.
    * @property {Boolean} showDataLabels Gets or sets what kind of labels from data series should be drawn.
    * @property {Boolean} showHighlight Gets a value indicating whether to show highlights on data items.
    * @property {Boolean} showToolTips Gets a value indicating whether to show tooltips.
    * @property {Boolean} allowMoveLegend Gets or sets a value indicating whether users are allowed to move the legend.
    * @property {Object} dataSource Gets or sets the chart's data source.
    * @property {ObservableCollection<String>} xDataFields Gets or sets the names of fields in the data source whose values are assigned to X coordinates of rendered graphical elements.
    * @property {ObservableCollection<String>} yDataFields Gets or sets the names of fields in the data source whose values are assigned to Y coordinates of rendered graphical elements.
    * @property {ObservableCollection<String>} zDataFields Gets or sets the names of fields in the data source whose values are assigned to Z coordinates of rendered graphical elements.
    * @property {ObservableCollection<String>} innerLabelsDataFields Gets or sets the names of fields in the data source whose values are shown as inner labels of rendered graphical elements.
    * @property {ObservableCollection<String>} outerLabelsDataFields Gets or sets the names of fields in the data source whose values are shown as outer labels of rendered graphical elements.
    * @property {ObservableCollection<String>} toolTipsDataFields Gets or sets the names of fields in the data source whose values are shown as tooltips of rendered graphical elements.
    * @property {ObservableCollection<String>} xAxisLabelsDataFields Gets or sets the names of fields in the data source whose values are shown as X axis labels of rendered graphical elements.
    * @property {ObservableCollection<String>} yAxisLabelsDataFields Gets or sets the names of fields in the data source whose values are shown as Y axis labels of rendered graphical elements.
    * @property {ObservableCollection<String>} zAxisLabelsDataFields Gets or sets the names of fields in the data source whose values are shown as Z axis labels of rendered graphical elements.
    */
    /**
    * @property {String} subtitle Gets or sets the sub-title of this chart.
    * @property {Margins} subtitleMargin Gets or sets the margin space around Subtitle.
    * @property {String} subtitleFontName Gets or sets the name of Drawing.Font used to draw chart's Subtitle.
    * @property {Number} subtitleFontSize Gets or sets the size of Drawing.Font used to draw chart's Subtitle.
    * @property {Drawing.FontStyle} subtitleFontStyle Gets or sets the style of Drawing.Font used to draw chart's Subtitle.
    * @property {Drawing.Brush} subtitleBrush Gets or sets the Drawing.Brush used to draw chart's Subtitle.
    */
    export abstract class Chart extends Controls.Dashboard {
        /**
         * Initializes a new instance of the Chart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {SeriesRenderer} [renderer] A SeriesRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, renderer?: SeriesRenderer);
        /**
         * Gets the chart's Plot component.
         */
        get plot(): Plot;
        /**
         * Gets the Components.Panel that contains the chart's plot and associated elements.
         */
        get plotPanel(): Components.Panel;
        /**
         * Contains series generated from DataSource data.
         */
        get dataBoundSeries(): List<Series>;
        /**
         * Contains series generated from DataSource data.
         */
        set dataBoundSeries(value: List<Series>);
        private m_dataBoundSeries;
        /**
         * Gets the Components.GridPanel that contains the chart's PlotPanel and axis renderers.
         */
        get chartPanel(): Components.GridPanel;
        /**
         * Gets the Components.GridPanel that contains the chart's PlotPanel and axis renderers.
         */
        set chartPanel(value: Components.GridPanel);
        get titlePanel(): Components.TextComponent;
        set titlePanel(value: Components.TextComponent);
        private m_titlePanel;
        get subtitlePanel(): Components.TextComponent;
        set subtitlePanel(value: Components.TextComponent);
        /**
         * Creates the Plot type corresponding to this chart.
         * @returns {Plot} An instance of Plot -derived class.
         */
        createPlot(): Plot;
        /**
         * Zooms out of current data range.
         */
        zoomOut(): void;
        /**
         * Resets zoom level to original data range.
         */
        resetZoom(): void;
        /**
         * Control.OnPaddingChanged override.
         * @param {EventArgs} e An EventArgs instance.
         */
        onPaddingChanged(e: EventArgs): void;
        /**
         * Control.OnSizeChanged override.
         * @param {EventArgs} e An EventArgs instance.
         */
        onSizeChanged(e: EventArgs): void;
        private onLayoutUpdate;
        /**
         * Gets or sets the title of this chart.
         */
        get title(): string;
        /**
         * Gets or sets the title of this chart.
         */
        set title(value: string);
        /**
         * Gets or sets the margin space around Title.
         */
        get titleMargin(): Margins;
        /**
         * Gets or sets the margin space around Title.
         */
        set titleMargin(value: Margins);
        /**
         * Gets or sets the name of Drawing.Font used to draw chart's Title.
         */
        get titleFontName(): string;
        /**
         * Gets or sets the name of Drawing.Font used to draw chart's Title.
         */
        set titleFontName(value: string);
        /**
         * Gets or sets the size of Drawing.Font used to draw chart's Title.
         */
        get titleFontSize(): number;
        /**
         * Gets or sets the size of Drawing.Font used to draw chart's Title.
         */
        set titleFontSize(value: number);
        /**
         * Gets or sets the style of Drawing.Font used to draw chart's Title.
         */
        get titleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of Drawing.Font used to draw chart's Title.
         */
        set titleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw chart's Title.
         */
        get titleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw chart's Title.
         */
        set titleBrush(value: Drawing.Brush);
        /**
         * Gets or sets the sub-title of this chart.
         */
        get subtitle(): string;
        /**
         * Gets or sets the sub-title of this chart.
         */
        set subtitle(value: string);
        /**
         * Gets or sets the margin space around Subtitle.
         */
        get subtitleMargin(): Margins;
        /**
         * Gets or sets the margin space around Subtitle.
         */
        set subtitleMargin(value: Margins);
        /**
         * Gets or sets the name of Drawing.Font used to draw chart's Subtitle.
         */
        get subtitleFontName(): string;
        /**
         * Gets or sets the name of Drawing.Font used to draw chart's Subtitle.
         */
        set subtitleFontName(value: string);
        /**
         * Gets or sets the size of Drawing.Font used to draw chart's Subtitle.
         */
        get subtitleFontSize(): number;
        /**
         * Gets or sets the size of Drawing.Font used to draw chart's Subtitle.
         */
        set subtitleFontSize(value: number);
        /**
         * Gets or sets the style of Drawing.Font used to draw chart's Subtitle.
         */
        get subtitleFontStyle(): Drawing.FontStyle;
        /**
         * Gets or sets the style of Drawing.Font used to draw chart's Subtitle.
         */
        set subtitleFontStyle(value: Drawing.FontStyle);
        /**
         * Gets or sets the Drawing.Brush used to draw chart's Subtitle.
         */
        get subtitleBrush(): Drawing.Brush;
        /**
         * Gets or sets the Drawing.Brush used to draw chart's Subtitle.
         */
        set subtitleBrush(value: Drawing.Brush);
        /**
         * Gets or sets the Image drawn inside chart's plot area.
         */
        get plotImageLocation(): string;
        /**
         * Gets or sets the Image drawn inside chart's plot area.
         */
        set plotImageLocation(value: string);
        /**
         * Gets or sets whether auto-size mode is enabled for PlotImage.
         */
        get plotImageAutoSize(): boolean;
        /**
         * Gets or sets whether auto-size mode is enabled for PlotImage.
         */
        set plotImageAutoSize(value: boolean);
        /**
         * Gets or sets the alignment of PlotImage relatively to the plot boundaries.
         */
        get plotImageAlign(): Drawing.ImageAlign;
        /**
         * Gets or sets the alignment of PlotImage relatively to the plot boundaries.
         */
        set plotImageAlign(value: Drawing.ImageAlign);
        /**
         * Gets the default SeriesRenderer for this chart.
         */
        get seriesRenderer(): SeriesRenderer;
        protected m_seriesRenderer: SeriesRenderer;
        /**
         * Gets or sets the legend title.
         */
        get legendTitle(): string;
        /**
         * Gets or sets the legend title.
         */
        set legendTitle(value: string);
        /**
        * Gets a value indicating whether to display the legend title.
        */
        get showLegendTitle(): boolean;
        /**
        * Sets a value indicating whether to display the legend title.
        */
        set showLegendTitle(value: boolean);
        /**
        * Gets the distance between adjacent entries in the legend.
        */
        get legendSpacing(): number;
        /**
        * Sets the distance between adjacent entries in the legend.
        */
        set legendSpacing(value: number);
        /**
         * Gets or sets the horizontal alignment of the legend.
         */
        get legendHorizontalAlignment(): Components.LayoutAlignment;
        /**
         * Gets or sets the horizontal alignment of the legend.
         */
        set legendHorizontalAlignment(value: Components.LayoutAlignment);
        /**
         * Gets or sets the vertical alignment of the legend.
         */
        get legendVerticalAlignment(): Components.LayoutAlignment;
        /**
         * Gets or sets the vertical alignment of the legend.
         */
        set legendVerticalAlignment(value: Components.LayoutAlignment);
        /**
         * Gets or sets the margin space around the legend.
         */
        get legendMargin(): Margins;
        /**
         * Gets or sets the margin space around the legend.
         */
        set legendMargin(value: Margins);
        /**
         * Gets or sets a value indicating whether the chart should draw a legend.
         */
        get showLegend(): boolean;
        /**
         * Gets or sets a value indicating whether the chart should draw a legend.
         */
        set showLegend(value: boolean);
        /**
         * Gets the LegendRenderer component used to draw the chart's legend.
         */
        get legendRenderer(): LegendRenderer;
        /**
         * Gets or sets a value indicating whether the plot should show zoom buttons.
         */
        get showZoomWidgets(): boolean;
        /**
         * Gets or sets a value indicating whether the plot should show zoom buttons.
         */
        set showZoomWidgets(value: boolean);
        /**
         * Gets or sets what kind of labels from data series should be drawn.
         */
        get showDataLabels(): LabelKinds;
        /**
         * Gets or sets what kind of labels from data series should be drawn.
         */
        set showDataLabels(value: LabelKinds);
        /**
        * Gets a value indicating whether to show highlights on data items.
        */
        get showHighlight(): boolean;
        /**
        * Sets a value indicating whether to show highlights on data items.
        */
        set showHighlight(value: boolean);
        /**
        * Gets a value indicating whether to show tooltips.
        */
        get showToolTips(): boolean;
        /**
        * Sets a value indicating whether to show tooltips.
        */
        set showToolTips(value: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to move the legend.
         */
        get allowMoveLegend(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to move the legend.
         */
        set allowMoveLegend(value: boolean);
        static getField(fields: List<string>, i: number): string;
        dataBindInternal(): void;
        /**
         * Gets or sets the chart's data source.
         */
        get dataSource(): Object;
        /**
         * Gets or sets the chart's data source.
         */
        set dataSource(value: Object);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to X coordinates of rendered graphical elements.
         */
        get xDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to X coordinates of rendered graphical elements.
         */
        set xDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to Y coordinates of rendered graphical elements.
         */
        get yDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to Y coordinates of rendered graphical elements.
         */
        set yDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to Z coordinates of rendered graphical elements.
         */
        get zDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are assigned to Z coordinates of rendered graphical elements.
         */
        set zDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as inner labels of rendered graphical elements.
         */
        get innerLabelsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as inner labels of rendered graphical elements.
         */
        set innerLabelsDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as outer labels of rendered graphical elements.
         */
        get outerLabelsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as outer labels of rendered graphical elements.
         */
        set outerLabelsDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as tooltips of rendered graphical elements.
         */
        get toolTipsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as tooltips of rendered graphical elements.
         */
        set toolTipsDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as X axis labels of rendered graphical elements.
         */
        get xAxisLabelsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as X axis labels of rendered graphical elements.
         */
        set xAxisLabelsDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as Y axis labels of rendered graphical elements.
         */
        get yAxisLabelsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as Y axis labels of rendered graphical elements.
         */
        set yAxisLabelsDataFields(value: ObservableCollection<string>);
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as Z axis labels of rendered graphical elements.
         */
        get zAxisLabelsDataFields(): ObservableCollection<string>;
        /**
         * Gets or sets the names of fields in the data source whose values
         * are shown as Z axis labels of rendered graphical elements.
         */
        set zAxisLabelsDataFields(value: ObservableCollection<string>);
        private onDataFieldsChanged;
        fromJson(json: string): any;
        toJson(): any;
        private m_chartPanel;
        private m_subtitlePanel;
        private m_plot;
        private m_plotPanel;
        private m_plotImage;
        private m_legendRenderer;
        private m_showZoomWidgets;
        private zoomWidgetsPanel;
        private m_dataSource;
        private m_xDataFields;
        private m_yDataFields;
        private m_zDataFields;
        private m_innerLabelsDataFields;
        private m_outerLabelsDataFields;
        private m_toolTipsDataFields;
        private m_xAxisLabelsDataFields;
        private m_yAxisLabelsDataFields;
        private m_zAxisLabelsDataFields;
    }
}
declare module "Charting/RotationController.Animation" {
    import { Point } from '@mindfusion/drawing';
    import { ComponentAnimation } from "Charting/Components/Components";
    import { RotationController } from "Charting/RotationController";
    /**
     * Represents a controller that rotates a polar plot by changing its StartAngle.
     */
    export class RotationControllerAnimation implements ComponentAnimation {
        constructor(controller: RotationController, dir: number, originPoint: Point, endPoint: Point);
        start(): void;
        stop(): void;
        private onTick;
        private controller;
        private dir;
        private timer;
        private previousTime;
        private tps;
    }
}
declare module "Charting/RotationController" {
    import { ComponentAnimation } from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { PlotController } from "Charting/PlotController";
    /**
    * @class Represents a controller that rotates a polar plot by changing its StartAngle.
    * @property {Boolean} enableAnimation Gets or sets whether to enable rotation inertia.
    */
    export class RotationController extends PlotController {
        /**
         * Initializes a new instance of the RotationController class.
         * @param {MindFusion.Charting.RenderContext} renderContext A RenderContext instance.
         */
        constructor(renderContext: RenderContext);
        /**
         * PlotController.OnMouseDown override. Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * PlotController.OnMouseMove override. Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * PlotController.OnMouseUp override. Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        update(dangle: number): void;
        /**
         * For internal use.
         * @returns {ComponentAnimation} An instance of a ComponentAnimation -derived class.
         */
        getRunningAnimation(): ComponentAnimation;
        /**
         * Gets or sets whether to enable rotation inertia.
         */
        get enableAnimation(): boolean;
        /**
         * Gets or sets whether to enable rotation inertia.
         */
        set enableAnimation(value: boolean);
        private m_enableAnimation;
        private startAngle;
        private animation;
        private previousTouch;
        private previousTouch2;
        private previousTime;
        private previousTime2;
    }
}
declare module "Charting/PolarPlot" {
    import { Point } from '@mindfusion/drawing';
    import * as Components from "Charting/Components/Components";
    import { RenderContext } from "Charting/RenderContext";
    import { Plot } from "Charting/Plot";
    /**
    * @class A plot used to draw graphics in polar coordinate system.
    * @property {Number} padding Gets or set padding space between the plot's border and series graphics.
    * @property {Number} startAngle Gets or set the angle where first data item of series should be drawn.
    * @property {Boolean} allowRotate Gets or sets a value indicating whether users are allowed to rotate this plot.
    */
    export class PolarPlot extends Plot {
        /**
         * Initializes a new instance of the PolarPlot class.
         */
        constructor();
        /**
         * Component.CreateController override. Returns a Components.ComponentController
         * used to interact with this component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} An instance of the RotationController class.
         */
        createController(context: RenderContext): Components.ComponentController;
        /**
         * Component.Visit override. Calls visitor's VisitPlot method.
         * @param {ComponentVisitor} visitor An instance of a ComponentVisitor -derived class.
         */
        visit(visitor: Components.ComponentVisitor): void;
        /**
         * Rotates point around specified rotation center at specified angle.
         * @param {Point} pointToRotate The point to rotate.
         * @param {Point} centerPoint The rotation center.
         * @param {Number} angleInDegrees The rotation angle.
         * @returns {Point}
         */
        rotatePoint(pointToRotate: Point, centerPoint: Point, angleInDegrees: number): Point;
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        get padding(): number;
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        set padding(value: number);
        private m_padding;
        /**
         * Gets or set the angle where first data item of series should be drawn.
         */
        get startAngle(): number;
        /**
         * Gets or set the angle where first data item of series should be drawn.
         */
        set startAngle(value: number);
        private m_startAngle;
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this plot.
         */
        get allowRotate(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this plot.
         */
        set allowRotate(value: boolean);
        private m_allowRotate;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/ScatterType" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies the shapes rendered by a ScatterRenderer.
    * @enum
    * @name ScatterType
    * @param [None] Do not draw scatter.
    * @param [Circle] Draw circles.
    * @param [Diamond] Draw diamonds.
    * @param [Square] Draw squares.
    * @param [Triangle] Draw triangles.
    */
    export enum ScatterType {
        /**
        * Do not draw scatter.
        */
        None = 0,
        /**
        * Draw circles.
        */
        Circle = 1,
        /**
        * Draw diamonds.
        */
        Diamond = 2,
        /**
        * Draw squares.
        */
        Square = 3,
        /**
        * Draw triangles.
        */
        Triangle = 4
    }
}
declare module "Charting/ScatterRenderer" {
    import { Point } from '@mindfusion/drawing';
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { Renderer2D } from "Charting/Renderer2D";
    import { HitResult } from "Charting/HitResult";
    import { ScatterType } from "Charting/ScatterType";
    import { ProcessPoint } from "Charting/Renderer2D";
    /**
    * @class A SeriesRenderer that draws scatter in its containing plot.
    * @property {ScatterType} shape Gets or sets the type of scatter shapes.
    * @property {Number} shapeSize Gets or sets the size of scatter shapes.
    */
    export class ScatterRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the ScatterRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as scatter.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Enumerates the data values of rendered series mapped to plot 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessPoint} process A ProcessPoint callback.
         * @remarks The signature of the ProcessPoint delegate is as follows:
         * 'function(seriesIndex, dataIndex, point)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} point A Point instance containing the Plot2D coordinates corresponding to current data item.
         * The method is not expected to return a value.
         */
        enumPoints(context: RenderContext, process: ProcessPoint): void;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the scatter representations of data items.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for data items.
         * @returns {MindFusion.Charting.HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted shape in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {MindFusion.Charting.HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private static getShapePoly;
        private m_shapeSize;
        /**
         * Gets or sets the size of scatter shapes.
         */
        get shapeSize(): number;
        /**
         * Gets or sets the size of scatter shapes.
         */
        set shapeSize(value: number);
        private m_shape;
        /**
         * Gets or sets the type of scatter shapes.
         */
        get shape(): ScatterType;
        /**
         * Gets or sets the type of scatter shapes.
         */
        set shape(value: ScatterType);
        drawIn3DPlot(): boolean;
        fromJson(json: string): void;
        toJson(): any;
    }
}
declare module "Charting/AnnotationRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Renderer2D } from "Charting/Renderer2D";
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    /**
     * @class A SeriesRenderer that draws annotations in its containing plot.
     */
    export class AnnotationRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the AnnotationRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as annotations.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        drawIn3DPlot(): boolean;
        fromJson(json: any): any;
        toJson(): any;
    }
}
declare module "Charting/RenderContext2D" {
    import { Rect } from '@mindfusion/drawing';
    import type { Controls } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    import { Axis } from "Charting/Axis";
    /**
    * @class Provides contextual information about the dashboard to its child components
    * when calling their draw, layout and user input methods.
    * @property {MindFusion.Charting.Axis} xAxis Gets the chart's XAxis.
    * @property {MindFusion.Charting.Axis} yAxis Gets the chart's YAxis.
    * @property {BiaxialChart} chart Gets the chart.
    */
    export class RenderContext2D extends RenderContext {
        /**
         * Initializes a new instance of the RenderContext clas.
         * @param clipRect A RectD specifying the clip rectangle.
         * @param theme A Theme instance where appearance attributes should be derived from.
         */
        constructor(chart: Controls.BiaxialChart, clipRect: Rect);
        get xAxis(): Axis;
        get yAxis(): Axis;
        get chart(): Controls.BiaxialChart;
        set chart(value: Controls.BiaxialChart);
        private m_chart;
    }
}
declare module "Charting/Controls/BiaxialChart" {
    import { Rect, StringAlignment, Graphics } from '@mindfusion/drawing';
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { GridType } from "Charting/GridType";
    import { RenderContext2D } from "Charting/RenderContext2D";
    import { Axis } from "Charting/Axis";
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { Controls } from "Charting/LoadOrder";
    /**
    * @class A base class for charts that display X and Y axes.
    * @property {ObservableCollection<Series>} series Gets or sets the list of series whose data is drawn in this chart.
    * @property {GridType} gridType Gets or sets the type of grid to draw in this chart.
    * @property {Boolean} pinGrid Gets or sets a value indicating whether grid stripes should be pinned in place or scroll together with the plot when users pan it.
    * @property {Axis} xAxis Gets or sets an Axis object representing horizontal data range.
    * @property {Axis} yAxis Gets or sets an Axis object representing vertical data range.
    * @property {ObservableCollection<Series>} annotations Gets or sets the list of series whose labels are drawn as annotations.
    * @property {Boolean} allowPan Gets or sets a value indicating whether users are allowed to pan the chart's plot.
    * @property {Boolean} showScatter Gets or sets a value indicating whether the chart should render scatter shapes.
    * @property {Boolean} showXCoordinates Gets or sets a value indicating whether to show X axis coordinates.
    * @property {Boolean} showYCoordinates Gets or sets a value indicating whether to show Y axis coordinates.
    * @property {Boolean} showXTicks Gets or sets a value indicating whether to show X axis ticks.
    * @property {Boolean} showYTicks Gets or sets a value indicating whether to show Y axis ticks.
    * @property {Number} xAxisTickLength Gets or sets the length of X axis ticks.
    * @property {Number} yAxisTickLength Gets or sets the length of Y axis ticks.
    * @property {Number} xAxisLabelRotationAngle Gets or sets the rotation angle of the X axis labels.
    * @property {Number} yAxisLabelRotationAngle Gets or sets the rotation angle of the Y axis labels.
    * @property {StringAlignment} yLabelAlignment Gets the horizontal alignment of Y-axis labels.
    * @property {Boolean} showXRangeSelector Gets or sets a value indicating whether to show a RangeSelector for the X axis, to let users scroll or resize the currently visible horizontal data window.
    * @property {Boolean} showYRangeSelector Gets or sets a value indicating whether to show a RangeSelector for the Y axis, to let users scroll or resize the currently visible vertical data window.
    * @property {Number} xScrollRangeMin Gets or sets the smallest value allowed to scroll to using the X axis' RangeSelector.
    * @property {Number} yScrollRangeMin Gets or sets the smallest value allowed to scroll to using the Y axis' RangeSelector.
    * @property {Number} xScrollRangeMax Gets or sets the largest value allowed to scroll to using the X axis' RangeSelector.
    * @property {Number} yScrollRangeMax Gets or sets the largest value allowed to scroll to using the Y axis' RangeSelector.
    */
    export abstract class BiaxialChart extends Controls.Chart {
        /**
         * Initializes a new instance of the BiaxialChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {Renderer2D} [seriesRenderer] A SeriesRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: Renderer2D);
        private init;
        /**
         * Dashboard.CreateRenderContext override. Creates a RenderContext instance.
         * @param {Graphics} graphics An Graphics surface where dashboard elements should be rendered.
         * @param {Rect} clipRect The current clip rectangle.
         * @returns {RenderContext} A RenderContext instance.
         */
        createRenderContext(graphics: Graphics, clipRect: Rect): RenderContext2D;
        onUnbind(): void;
        onBind(): void;
        private m_y1Stack;
        private m_x1Stack;
        private set y1Stack(value);
        private set x1Stack(value);
        private get y1Stack();
        private get x1Stack();
        /**
         * Chart.zoomOut override. Zooms out of current data range.
         */
        zoomOut(): void;
        /**
         * Chart.resetZoom override. Resets zoom level to original data range.
         */
        resetZoom(): void;
        /**
         * Gets or sets the type of grid to draw in this chart.
         */
        get gridType(): GridType;
        /**
         * Gets or sets the type of grid to draw in this chart.
         */
        set gridType(value: GridType);
        /**
         * Gets or sets a value indicating whether grid stripes should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        get pinGrid(): boolean;
        /**
         * Gets or sets a value indicating whether grid stripes should be pinned
         * in place or scroll together with the plot when users pan it.
         */
        set pinGrid(value: boolean);
        /**
         * Gets or sets an Axis object representing horizontal data range.
         */
        get xAxis(): Axis;
        /**
         * Gets or sets an Axis object representing horizontal data range.
         */
        set xAxis(value: Axis);
        /**
         * Gets or sets an Axis object representing vertical data range.
         */
        get yAxis(): Axis;
        /**
         * Gets or sets an Axis object representing vertical data range.
         */
        set yAxis(value: Axis);
        /**
         * Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets the list of series whose labels are drawn as annotations.
         */
        get annotations(): ObservableCollection<Series>;
        /**
         * Gets or sets the list of series whose labels are drawn as annotations.
         */
        set annotations(value: ObservableCollection<Series>);
        /**
         * Gets or sets a value indicating whether the chart should render
         shapes.
         */
        get showScatter(): boolean;
        /**
         * Gets or sets a value indicating whether the chart should render scatter shapes.
         */
        set showScatter(value: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to pan the chart's plot.
         */
        get allowPan(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to pan the chart's plot.
         */
        set allowPan(value: boolean);
        /**
         * Gets or sets a value indicating whether to show X axis coordinates.
         */
        get showXCoordinates(): boolean;
        /**
         * Gets or sets a value indicating whether to show X axis coordinates.
         */
        set showXCoordinates(value: boolean);
        /**
         * Gets or sets a value indicating whether to show Y axis coordinates.
         */
        get showYCoordinates(): boolean;
        /**
         * Gets or sets a value indicating whether to show Y axis coordinates.
         */
        set showYCoordinates(value: boolean);
        /**
         * Gets or sets a value indicating whether to show X axis ticks.
         */
        get showXTicks(): boolean;
        /**
         * Gets or sets a value indicating whether to show X axis ticks.
         */
        set showXTicks(value: boolean);
        /**
         * Gets or sets a value indicating whether to show Y axis ticks.
         */
        get showYTicks(): boolean;
        /**
         * Gets or sets a value indicating whether to show Y axis ticks.
         */
        set showYTicks(value: boolean);
        /**
        * Gets the length of X axis ticks.
        */
        get xAxisTickLength(): number;
        /**
        * Sets the length of X axis ticks.
        */
        set xAxisTickLength(value: number);
        /**
        * Gets the length of Y axis ticks.
        */
        get yAxisTickLength(): number;
        /**
        * Sets the length of Y axis ticks.
        */
        set yAxisTickLength(value: number);
        /**
         * Gets the rotation angle of the X axis labels.
         */
        get xAxisLabelRotationAngle(): number;
        /**
         * Sets the rotation angle of the X axis labels.
         */
        set xAxisLabelRotationAngle(value: number);
        /**
         * Gets the rotation angle of the Y axis labels.
         */
        get yAxisLabelRotationAngle(): number;
        /**
         * Sets the rotation angle of the Y axis labels.
         */
        set yAxisLabelRotationAngle(value: number);
        /**
        * Gets the horizontal alignment of Y-axis labels.
        */
        get yLabelAlignment(): StringAlignment;
        /**
        * Sets the horizontal alignment of Y-axis labels.
        */
        set yLabelAlignment(value: StringAlignment);
        /**
         * Gets a value indicating whether to show a RangeSelector for the X axis,
         * to let users scroll or resize the currently visible horizontal data window.
         */
        get showXRangeSelector(): boolean;
        /**
         * Sets a value indicating whether to show a RangeSelector for the X axis,
         * to let users scroll or resize the currently visible horizontal data window.
         */
        set showXRangeSelector(value: boolean);
        /**
         * Gets the smallest value allowed to scroll to using the X axis' RangeSelector.
         */
        get xScrollRangeMin(): number;
        /**
         * Sets the smallest value allowed to scroll to using the X axis' RangeSelector.
         */
        set xScrollRangeMin(value: number);
        /**
         * Gets the largest value allowed to scroll to using the X axis' RangeSelector.
         */
        get xScrollRangeMax(): number;
        /**
         * Sets the largest value allowed to scroll to using the X axis' RangeSelector.
         */
        set xScrollRangeMax(value: number);
        /**
         * Gets a value indicating whether to show a RangeSelector for the Y axis,
         * to let users scroll or resize the currently visible vertical data window.
         */
        get showYRangeSelector(): boolean;
        /**
         * Sets a value indicating whether to show a RangeSelector for the Y axis,
         * to let users scroll or resize the currently visible vertical data window.
         */
        set showYRangeSelector(value: boolean);
        /**
         * Gets the smallest value allowed to scroll to using the Y axis' RangeSelector.
         */
        get yScrollRangeMin(): number;
        /**
         * Sets the smallest value allowed to scroll to using the Y axis' RangeSelector.
         */
        set yScrollRangeMin(value: number);
        /**
         * Gets the largest value allowed to scroll to using the Y axis' RangeSelector.
         */
        get yScrollRangeMax(): number;
        /**
         * Sets the largest value allowed to scroll to using the Y axis' RangeSelector.
         */
        set yScrollRangeMax(value: number);
        fromJson(json: string): any;
        toJson(): string;
        private m_xAxes;
        private m_yAxes;
        private m_xAxisRenderers;
        private m_yAxisRenderers;
        private set xAxes(value);
        private set yAxes(value);
        private set xAxisRenderers(value);
        private set yAxisRenderers(value);
        private get xAxes();
        private get yAxes();
        private get xAxisRenderers();
        private get yAxisRenderers();
        private annotationRenderer;
        private m_showScatter;
        private scatterRenderer;
        private m_xRangeSelector;
        private m_yRangeSelector;
        private m_showXRangeSelector;
        private m_xScrollRangeMin;
        private m_xScrollRangeMax;
        private m_showYRangeSelector;
        private m_yScrollRangeMin;
        private m_yScrollRangeMax;
    }
}
declare module "Charting/BarContainer" {
    /**
    * @namespace MindFusion.Charting
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
     * @class Defines properties common to all bar-chart renderers.
     */
    export interface BarContainer {
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        horizontalBars: boolean;
        /**
        * Gets or sets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        stackOuterLabels: boolean;
        /**
        * Gets or sets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        outerLabelRotation: number;
        /**
        * Gets or sets the rotation angle of inner labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        innerLabelRotation: number;
        /**
         * Gets or sets the ratio of empty space between bars to space occupied by bars.
         */
        barSpacingRatio: number;
    }
}
declare module "Charting/BarSpacing" {
    import { Axis } from "Charting/Axis";
    export class BarSpacing {
        constructor(axis: Axis, barsPerGroup: number, groups: number, dataRange: number, lenPixels: number, sameIndexSpacingRatio: number, barSpacingRatio: number);
        barWidth: number;
        padding: number;
        external: number;
        seriesOffset: number;
    }
}
declare module "Charting/BarRenderer" {
    import { Rect, Point } from '@mindfusion/drawing';
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Renderer2D } from "Charting/Renderer2D";
    import { BarContainer } from "Charting/BarContainer";
    import { RenderContext } from "Charting/RenderContext";
    import { TextRenderer } from "Charting/TextRenderer";
    import { HitResult } from "Charting/HitResult";
    import { Series } from "Charting/Series";
    /**
    * @class A SeriesRenderer that draws bars in its containing plot.
    * @property {Boolean} horizontalBars Gets or sets a value identifying whether bars should be horizontal.
    * @property {Boolean} stackOuterLabels Gets whether outer labels are displayed stacked on top of stacked bars, instead of showing them on the bar sides.
    * @property {Number} outerLabelRotation Gets the rotation angle of outer labels. If not specified, labels are rotated at predefiend angles depending on bars' orientation and layout.
    * @property {Number} innerLabelRotation Gets the rotation angle of inner labels. If not specified, labels are rotated at predefiend angles depending on bars' orientation and layout.
    * @property {Number} barSpacingRatio Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
    * @property {Number} sameIndexSpacingRatio Gets or sets the ratio of empty space to occupied space in bar groups drawn for data items as same index in each series.
    */
    export class BarRenderer extends Renderer2D implements BarContainer {
        /**
         * Initializes a new instance of the BarRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as bars.
         */
        constructor(series: ObservableCollection<Series>);
        private calcBarSpacing;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        get horizontalBars(): boolean;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        set horizontalBars(value: boolean);
        private m_stackOuterLabels;
        /**
        * Gets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        get stackOuterLabels(): boolean;
        /**
        * Sets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        set stackOuterLabels(value: boolean);
        private m_outerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get outerLabelRotation(): number;
        /**
        * Sets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set outerLabelRotation(value: number);
        private m_innerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get innerLabelRotation(): number;
        /**
        * Sets the rotation angle of inner labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set innerLabelRotation(value: number);
        /**
         * Enumerates the bars visible in current data range.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessBars} process A ProcessBars callback.
         * @remarks The signature of the ProcessBars delegate is as follows:
         * 'function(seriesIndex, dataIndex, bounds)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Rect} bounds A Rect representing the boundaries of current bar.
         * The method is not expected to return a value.
         */
        enumVisibleBars(context: RenderContext, process: ProcessBars): void;
        private m_sameIndexSpacingRatio;
        /**
         * Gets or sets the ratio of empty space to occupied space
         * in bar groups drawn for data items as same index in each series.
         */
        get sameIndexSpacingRatio(): number;
        /**
         * Gets or sets the ratio of empty space to occupied space
         * in bar groups drawn for data items as same index in each series.
         */
        set sameIndexSpacingRatio(value: number);
        private m_barSpacingRatio;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        get barSpacingRatio(): number;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        set barSpacingRatio(value: number);
        /**
         * Renderer2D.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * SeriesRenderer.AdjustDataRange override. Adjusts the data range of associated
         * Axis objects after initial measure pass.
         * @param {RenderContext} context A RenderContext instance.
         */
        adjustDataRange(context: RenderContext): void;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        drawLabels(context: RenderContext, s: number, i: number, bounds: Rect, labelRenderer: TextRenderer, oppositeDirection: boolean): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the bar representations of data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a bar.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted bar in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private domainStart;
        private domainEnd;
        fromJson(json: string): void;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process bars.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Rect} bounds A Rect representing the boundaries of current bar.
    * @param {Boolean} oppositeDirection The bar is drawn below the axis origin.
    */
    export interface ProcessBars {
        (seriesIndex: number, dataIndex: number, bounds: Rect, oppositeDirection: boolean): void;
    }
}
declare module "Charting/StackRenderer" {
    import { ObservableCollection, List } from '@mindfusion/common-collections';
    import * as Components from "Charting/Components/Components";
    import { Point } from '@mindfusion/drawing';
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { Axis } from "Charting/Axis";
    /**
     * @class A base SeriesRenderer for stacked graphics.
     */
    export class StackRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the StackRenderer class.
         * @param {ObservableCollection<Series>} series
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Enumerates the data values of rendered series mapped to plot 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessStackPoint} process A ProcessStackPoint callback.
         * @remarks The signature of the ProcessStackPoint delegate is as follows:
         * 'function(seriesIndex, dataIndex, stackPoint, prevPoint)'.
         * param {Number} seriesIndexAn integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} stackPoint A Point instance containing the Plot2D coordinates corresponding to current data item.
         * param {Point} prevPoint A Point instance containing the Plot2D coordinates corresponding to previous data item.
         * The method is not expected to return a value.
         */
        enumVisibleStackPoints(context: RenderContext, process: ProcessStackPoint): void;
        enumVisibleStackPointsRelativeTo(context: RenderContext, origin: number, process: ProcessStackPoint): void;
        /**
         * Enumerates each series once providing a list of all visible points at each iteration.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessStackRange} process A ProcessStackRange callback.
         * @remarks The signature of the ProcessStackRange delegate is as follows:
         * 'function(seriesIndex, points, prevPoints)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {List<Point>} points A list of Point values containing the Plot2D coordinates
         * corresponding to data items in currently visible range.
         * param {List<Point>} prevPoints A list of Point values containing the Plot2D coordinates
         * corresponding to previous series in currently visible range.
         * The method is not expected to return a value.
         */
        enumVisibleStackRanges(context: RenderContext, process: ProcessStackRange): void;
        enumVisibleStackRangesRelativeTo(context: RenderContext, origin: number, process: ProcessStackRange): void;
        /**
         * Gets the coordinates of specified data item when mapped to a Plot2D pixel.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {MindFusion.Charting.Axis} xAxis An Axis reference specifying the X axis.
         * @param {MindFusion.Charting.Axis} yAxis An Axis reference specifying the Y axis.
         * @param {Components.Component} component An instance of Plot2D or derived class.
         * @returns {Point} A Point containing Plot2D coordinates corresponding to specified data item.
         */
        getPixel(seriesIndex: number, dataIndex: number, xAxis: Axis, yAxis: Axis, component: Components.Component): Point;
        /**
         * Renderer2D.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        measureDataRangeRelativeTo(context: RenderContext, origin: number): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the stack representations of data items.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a data point.
         * @returns {MindFusion.Charting.HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
    }
    /**
    * Defines the signature of delegates called to process a data point one element at a time.
    * @param {Number} seriesIndexAn integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Point} stackPoint A Point instance containing the Plot2D coordinates corresponding to current data item.
    * @param {Point} prevPoint A Point instance containing the Plot2D coordinates corresponding to previous data item.
    */
    export interface ProcessStackPoint {
        (seriesIndex: number, dataIndex: number, stackPoint: Point, prevPoint: Point): void;
    }
    /**
    * Defines the signature of delegates called to process all points from current data range at once.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {List<Point>} points A list of Point values containing the Plot2D coordinates
    * corresponding to data items in currently visible range.
    * @param {List<Point>} prevPoints A list of Point values containing the Plot2D coordinates
    * corresponding to previous series in currently visible range.
    */
    export interface ProcessStackRange {
        (seriesIndex: number, points: List<Point>, prevPoints: List<Point>): void;
    }
}
declare module "Charting/BarStackRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Rect, Point } from '@mindfusion/drawing';
    import { StackRenderer } from "Charting/StackRenderer";
    import { BarContainer } from "Charting/BarContainer";
    import { Series } from "Charting/Series";
    import { TextRenderer } from "Charting/TextRenderer";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    /**
    * @class A SeriesRenderer that draws stacked bars in its containing plot.
    * @property {Boolean} horizontalBars Gets or sets a value identifying whether bars should be horizontal.
    * @property {Number} barSpacingRatio Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
    */
    export class BarStackRenderer extends StackRenderer implements BarContainer {
        /**
         * Initializes a new instance of the BarStackRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as stacked bars.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        get horizontalBars(): boolean;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        set horizontalBars(value: boolean);
        private calcBarSpacing;
        /**
         * Enumerates the bars visible in current data range.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessStackBars} process A ProcessStackBars callback.
         * @remarks The signature of the ProcessStackBars delegate is as follows:
         * 'function(seriesIndex, dataIndex, bounds)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Rect} bounds A RectangleF representing the boundaries of current bar.
         * The method is not expected to return a value.
         */
        enumVisibleStackBars(context: RenderContext, process: ProcessStackBars): void;
        private m_barSpacingRatio;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        get barSpacingRatio(): number;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        set barSpacingRatio(value: number);
        /**
         * StackRenderer.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * seriesRenderer.AdjustDataRange override. Adjusts the data range of associated
         * Axis objects after initial measure pass.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        adjustDataRange(context: RenderContext): void;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        drawLabels(context: RenderContext, s: number, i: number, bounds: Rect, labelRenderer: TextRenderer, oppositeDirection: boolean): void;
        static offset(rect: Rect, dx: number, dy: number): Rect;
        /**
         * StackRenderer.HitTest override. Hit-tests the bar representations of data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a bar.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted bar in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private m_stackOuterLabels;
        /**
        * Gets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        get stackOuterLabels(): boolean;
        /**
        * Sets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        set stackOuterLabels(value: boolean);
        private m_outerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get outerLabelRotation(): number;
        /**
        * Sets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set outerLabelRotation(value: number);
        private m_innerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get innerLabelRotation(): number;
        /**
        * Sets the rotation angle of inner labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set innerLabelRotation(value: number);
        private domainStart;
        private domainEnd;
        fromJson(json: string): void;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process stacked bars.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Rect} bounds A RectangleF representing the boundaries of current bar.
    */
    export interface ProcessStackBars {
        (seriesIndex: number, dataIndex: number, bounds: Rect, oppositeDirection: boolean): void;
    }
}
declare module "Charting/BarLayout" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies supported bar placements when rendering multiple series.
    * @enum
    * @name BarLayout
    * @param [SideBySide] Render elements at same index from all series as a group of side-by-side bars.
    * @param [Stack] Render elements at same index from all series as stacked bars.
    * @param [Overlay] Render elements at same index from all series as overlaid bars.
    */
    export enum BarLayout {
        /**
        * Render elements at same index from all series as a group of side-by-side bars.
        */
        SideBySide = 0,
        /**
        * Render elements at same index from all series as stacked bars.
        */
        Stack = 1,
        /**
        * Render elements at same index from all series as overlaid bars.
        */
        Overlay = 2
    }
}
declare module "Charting/BarOverlayRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Rect, Point } from '@mindfusion/drawing';
    import { Renderer2D } from "Charting/Renderer2D";
    import { BarContainer } from "Charting/BarContainer";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { TextRenderer } from "Charting/TextRenderer";
    /**
    * @class A SeriesRenderer that draws overlaying bars in its containing plot.
    * @property {Boolean} horizontalBars Gets or sets a value identifying whether bars should be horizontal.
    * @property {Number} barSpacingRatio Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
    */
    export class BarOverlayRenderer extends Renderer2D implements BarContainer {
        /**
         * Initializes a new instance of the BarOverlayRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as overlaying bars.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        get horizontalBars(): boolean;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        set horizontalBars(value: boolean);
        private calcBarSpacing;
        /**
         * Gets the ratio between widths of backmost and frontmost bars.
         * @returns {Number} 3
         */
        backToFrontRatio(): number;
        /**
         * Enumerates the bars visible in current data range.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Boolean} frontToBack true to enumerate from front bar to back bar, or false otherwise.
         * @param {ProcessBars} process A ProcessBars callback.
         * @remarks The signature of the ProcessBars delegate is as follows:
         * 'function(seriesIndex, dataIndex, bounds)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Rect} bounds A RectangleF representing the boundaries of current bar.
         * The method is not expected to return a value.
         */
        enumVisibleOverlays(context: RenderContext, frontToBack: boolean, process: ProcessBars): void;
        private m_barSpacingRatio;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        get barSpacingRatio(): number;
        /**
         * Gets or sets the ratio of empty space between adjacent bar groups to space occupied by bars.
         */
        set barSpacingRatio(value: number);
        /**
         * Renderer2D.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * seriesRenderer.AdjustDataRange override. Adjusts the data range of associated
         * Axis objects after initial measure pass.
         * @param {RenderContext} context A RenderContext instance.
         */
        adjustDataRange(context: RenderContext): void;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        drawLabels(context: RenderContext, s: number, i: number, bounds: Rect, labelRenderer: TextRenderer, oppositeDirection: boolean): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the bar representations of data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a bar.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted bar in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private m_stackOuterLabels;
        /**
        * Gets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        get stackOuterLabels(): boolean;
        /**
        * Sets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        set stackOuterLabels(value: boolean);
        private m_outerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get outerLabelRotation(): number;
        /**
        * Sets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set outerLabelRotation(value: number);
        private m_innerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get innerLabelRotation(): number;
        /**
        * Sets the rotation angle of inner labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set innerLabelRotation(value: number);
        private domainStart;
        private domainEnd;
        fromJson(json: string): void;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process bars.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Rect} bounds A RectangleF representing the boundaries of current bar.
    */
    export interface ProcessBars {
        (seriesIndex: number, dataIndex: number, bounds: Rect, oppositeDirection: boolean): void;
    }
}
declare module "Charting/Controls/BarChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Plot } from "Charting/Plot";
    import { BarLayout } from "Charting/BarLayout";
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    /**
    * @class A control used to draw bar charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {BarLayout} barLayout Gets or sets how to arrange bars when rendering multiple series.
    * @property {Boolean} horizontalBars Gets or sets a value identifying whether bars should be horizontal.
    * @property {Boolean} stackOuterLabels Gets whether outer labels are displayed stacked on top of stacked bars, instead of showing them on the bar sides.
    * @property {Number} outerLabelRotation Gets the rotation angle of outer labels. If not specified, labels are rotated at predefiend angles depending on bars' orientation and layout.
    * @property {Number} innerLabelRotation Gets the rotation angle of inner labels. If not specified, labels are rotated at predefiend angles depending on bars' orientation and layout.
    * @property {Number} barSpacingRatio Gets or sets the ratio of empty space between bars to space occupied by bars.
    */
    export class BarChart extends BiaxialChart {
        /**
        * Initializes a new instance of the BarChart class.
        * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
        * @param {BarLayout} [barLayout] A member of the BarLayout enumeration.
        * @param {Renderer2D} [seriesRenderer] A Renderer2D used to draw chart's data series.
        */
        constructor(element: HTMLCanvasElement, barLayout?: BarLayout, seriesRenderer?: Renderer2D);
        static createRenderer(series: ObservableCollection<Series>, layout: BarLayout, horizontalBars: boolean): Renderer2D;
        /**
         * Chart.CreatePlot override. Creates the Plot type corresponding to this chart.
         * @returns {Plot} An instance of the Plot2D class.
         */
        createPlot(): Plot;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        private m_barLayout;
        /**
         * Gets or sets how to arrange bars when rendering multiple series.
         */
        get barLayout(): BarLayout;
        /**
         * Gets or sets how to arrange bars when rendering multiple series.
         */
        set barLayout(value: BarLayout);
        private m_horizontalBars;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        get horizontalBars(): boolean;
        /**
         * Gets or sets a value identifying whether bars should be horizontal.
         */
        set horizontalBars(value: boolean);
        private m_stackOuterLabels;
        /**
        * Gets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        get stackOuterLabels(): boolean;
        /**
        * Sets whether outer labels are displayed stacked on top of stacked bars,
        * instead of showing them on the bar sides.
        */
        set stackOuterLabels(value: boolean);
        private m_outerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get outerLabelRotation(): number;
        /**
        * Sets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set outerLabelRotation(value: number);
        private m_innerLabelRotation;
        /**
        * Gets the rotation angle of outer labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        get innerLabelRotation(): number;
        /**
        * Sets the rotation angle of inner labels. If not specified, labels
        * are rotated at predefiend angles depending on bars' orientation and layout.
        */
        set innerLabelRotation(value: number);
        private m_barSpacingRatio;
        /**
         * Gets or sets the ratio of empty space between bars to space occupied by bars.
         */
        get barSpacingRatio(): number;
        /**
         * Gets or sets the ratio of empty space between bars to space occupied by bars.
         */
        set barSpacingRatio(value: number);
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/LineRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { Renderer2D } from "Charting/Renderer2D";
    /**
     * @class A SeriesRenderer that draws series as polylines.
     */
    export class LineRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the LineRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as polylines.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        fromJson(json: string): void;
        toJson(): any;
    }
}
declare module "Charting/LineType" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies how to connect adjacent data points in line and area charts.
    * @enum
    * @name LineType
    * @param [Polyline] Connect points using straight line segments.
    * @param [Step] Connect points using steps.
    * @param [Curve] Connect points using a cardinal spline.
    */
    export enum LineType {
        /**
        * Connect points using straight line segments.
        */
        Polyline = 0,
        /**
        * Connect points using steps.
        */
        Step = 1,
        /**
        * Connect points using a cardinal spline.
        */
        Curve = 2
    }
}
declare module "Charting/StepRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    /**
     *
     * @class A SeriesRenderer that draws series as steps between data points.
     */
    export class StepRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the StepRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        fromJson(json: string): void;
        toJson(): any;
    }
}
declare module "Charting/CurveRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { LineRenderer } from "Charting/LineRenderer";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class A SeriesRenderer that draws series as a cardinal spline.
     */
    export class CurveRenderer extends LineRenderer {
        /**
         * Initializes a new instance of the CurveRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as a cardinal spline.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * LineRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        fromJson(json: string): void;
        toJson(): any;
    }
}
declare module "Charting/Controls/LineChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { LineRenderer } from "Charting/LineRenderer";
    import { LineType } from "Charting/LineType";
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    /**
    * @class A control used to draw line charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {LineType} lineType Gets or sets what type of line segments to draw between data points.
    */
    export class LineChart extends BiaxialChart {
        /**
         * Initializes a new instance of the LineChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {LineRenderer} [seriesRenderer] A LineRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: LineRenderer);
        static createRenderer(series: ObservableCollection<Series>, lineType: LineType): Renderer2D;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets what type of line segments to draw between data points.
         */
        get lineType(): LineType;
        set lineType(value: LineType);
        private m_lineType;
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/SimpleSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    /**
    * @class Represents one-dimensional series defined by e list of data values and a list of labels.
    * @property {Number} size Implements Series.Size. Returns the number of elements in Data list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 1.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns InnerLabel.
    * @property {List<Number>} data Gets or sets the data values contained in this series.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class SimpleSeries implements Series {
        /**
         * Initializes a new instance of the SimpleSeries class.
         * @param {List<Number> | Array<Number>} values A list of data values.
         * @param {List<String> | Array<String>} labels A list of labels.
         * @param {List<String> | Array<String>} [tooltips] A list of tooltips.
         */
        constructor(values: List<number> | Array<number>, labels: List<string> | Array<string>, tooltips?: List<string> | Array<string>);
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns an element of the labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. Gets a value indicating whether
         * the specified data item should be emphasized by the SeriesRenderer.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. SimpleSeries always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in Data list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 1.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        /**
         * Gets or sets the data values contained in this series.
         */
        get data(): List<number>;
        /**
         * Gets or sets the data values contained in this series.
         */
        set data(value: List<number>);
        protected values: List<number>;
        protected labels: List<string>;
        protected tooltips: List<string>;
        protected emphasizedIndices: List<number>;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event SimpleSeries.dataChanged
         * @type {Charting.Common.EventDispatcher}
         * @property {SimpleSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(json: any): void;
        toJson(): any;
    }
}
declare module "Charting/PieSeries" {
    import { List } from '@mindfusion/common-collections';
    import { SimpleSeries } from "Charting/SimpleSeries";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class Represents one-dimensional series defined by e list of data values and lists of
    * inner and outer labels, convenient for providing data to PieRenderer.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns a combination of InnerLabel and OuterLabel.
    * @property {List<String>} outerLabels Gets or sets the outer labels.
    * @property {List<String>} innerLabels Gets or sets the inner labels.
    * @property {List<Number>} detachedSlices Gets or sets indices of detached slices.
    */
    export class PieSeries extends SimpleSeries {
        /**
         * Initializes a new instance of the PieSeries class.
         * @param {List<Number> | Array<Number>} values A list of data values.
         * @param {List<String> | Array<String>} innerLabels A list of inner labels.
         * @param {List<String> | Array<String>} outerLabels A list of outer labels.
         */
        constructor(values: List<number> | Array<number>, innerLabels: List<string> | Array<string>, outerLabels: List<string> | Array<string>);
        /**
         * SimpleSeries.GetLabel override. Returns an element of the inner or outer label lists.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Gets or sets the outer labels.
         */
        get outerLabels(): List<string>;
        /**
         * Gets or sets the outer labels.
         */
        set outerLabels(value: List<string>);
        /**
         * Gets or sets the inner labels.
         */
        get innerLabels(): List<string>;
        /**
         * Gets or sets the inner labels.
         */
        set innerLabels(value: List<string>);
        /**
         * Gets or sets indices of emphasized data items. PieRenderer draws
         * their corresponding slices as pulled out of the pie.
         */
        get detachedSlices(): List<number>;
        /**
         * Gets or sets indices of emphasized data items. PieRenderer draws
         * their corresponding slices as pulled out of the pie.
         */
        set detachedSlices(value: List<number>);
        private m_outerLabels;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/PieRenderer" {
    import { Rect, Point } from '@mindfusion/drawing';
    import { IEnumerable } from '@mindfusion/common-collections';
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { HitResult } from "Charting/HitResult";
    /**
    * @class A SeriesRenderer that draws pies in its containing plot.
    * @property {Series} series Gets or sets the Series drawn by this PieRenderer.
    * @property {Number} dimension Gets or sets the dimension index that should be used to read data from the Series.
    * @property {Boolean} doughnut Gets or sets a value indicating whether the pie should be rendered as a doughnut.
    */
    export class PieRenderer extends SeriesRenderer {
        /**
         * Initializes a new instance of the PieRenderer class.
         * @param {Series} series The Series that should be rendered as a pie.
         * @param {Number} [dimension] Specifies the Series dimension index that should be used to access data.
         */
        constructor(series: Series, dimension?: number);
        /**
         * Gets or sets the Series drawn by this PieRenderer.
         */
        get series(): Series;
        /**
         * Gets or sets the Series drawn by this PieRenderer.
         */
        set series(value: Series);
        private m_series;
        /**
         * Enumerates the slices of the pie.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessSlice} process A ProcessBars callback.
         * @remarks The signature of the ProcessSlice delegate is as follows:
         * 'function(dataIndex, rect, diameter, startAngle, sweepAngle)'.
         * param {Number} dataIndex An integer index of data item in Series.
         * param {Rect} rect The bounding rectangle of the slice' circle.
         * param {Number} diameter The diameter of the pie.
         * param {Number} startAngle The start angle of the slice' sector.
         * param {Number} sweepAngle The sweep angle of the slice' sector.
         * The method is not expected to return a value.
         */
        enumSlices(context: RenderContext, process: ProcessSlice): void;
        private m_doughnut;
        /**
         * Gets or sets a value indicating whether the pie should be rendered as a doughnut.
         */
        get doughnut(): boolean;
        /**
         * Gets or sets a value indicating whether the pie should be rendered as a doughnut.
         */
        set doughnut(value: boolean);
        private m_dimension;
        /**
         * Gets or sets the dimension index that should be used to read data from the Series.
         */
        get dimension(): number;
        /**
         * Gets or sets the dimension index that should be used to read data from the Series.
         */
        set dimension(value: number);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * SeriesRenderer.DrawHighlight override. Draws highlighted slice in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {MindFusion.Charting.HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
         * SeriesRenderer.HitTest override. Hit-tests the slices representing data items.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a pie slice.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        private drawSlice;
        private highlightSlice;
        private hasDetachedSlice;
        /**
         * Implements the SeriesContainer interface.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        fromJson(json: string): any;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process pie slices.
    * @param {Number} dataIndex An integer index of data item in Series.
    * @param {Rect} rect The bounding rectangle of the slice' circle.
    * @param {Number} diameter The diameter of the pie.
    * @param {Number} startAngle The start angle of the slice' sector.
    * @param {Number} sweepAngle The sweep angle of the slice' sector.
    */
    export interface ProcessSlice {
        (dataIndex: number, rect: Rect, diameter: number, startAngle: number, sweepAngle: number): void;
    }
}
declare module "Charting/Controls/PieChart" {
    import { List } from '@mindfusion/common-collections';
    import { Plot } from "Charting/Plot";
    import { PieRenderer } from "Charting/PieRenderer";
    import { Series } from "Charting/Series";
    import { Chart } from "Charting/Controls/Chart";
    /**
    * @class A control used to draw pie charts.
    * @property {Series} series Gets or sets the series whose data is drawn in this chart.
    * @property {Number} startAngle Gets or sets the angle where first data item of series should be drawn.
    * @property {Boolean} allowRotate Gets or sets a value indicating whether users are allowed to rotate this chart.
    * @property {Number} chartPadding Gets or set padding space between the plot's border and series graphics.
    * @property {List<Number>} detachedSlices Gets or sets indices of detached slices.
    * @property {Boolean} doughnut Gets or sets a value indicating whether the pie should be rendered as a doughnut.
    */
    export class PieChart extends Chart {
        /**
         * Initializes a new instance of the PieChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {PieRenderer} [seriesRenderer] A PieRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: PieRenderer);
        /**
         * Chart.CreatePlot override. Creates the Plot type corresponding to this chart.
         * @returns {Plot} An instance of the PolarPlot class.
         */
        createPlot(): Plot;
        onUnbind(): void;
        onBind(): void;
        /**
         * Gets or sets the series whose data is drawn in this chart.
         */
        get series(): Series;
        /**
         * Gets or sets the series whose data is drawn in this chart.
         */
        set series(value: Series);
        /**
         * Gets or sets the angle where first data item of series should be drawn.
         */
        get startAngle(): number;
        /**
         * Gets or sets the angle where first data item of series should be drawn.
         */
        set startAngle(value: number);
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this chart.
         */
        get allowRotate(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this chart.
         */
        set allowRotate(value: boolean);
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        get chartPadding(): number;
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        set chartPadding(value: number);
        /**
         * Gets or sets a value indicating whether the pie should be rendered as a doughnut.
         */
        get doughnut(): boolean;
        /**
         * Gets or sets a value indicating whether the pie should be rendered as a doughnut.
         */
        set doughnut(value: boolean);
        /**
         * Gets or sets indices of detached slices.
         */
        get detachedSlices(): List<number>;
        /**
         * Gets or sets indices of detached slices.
         */
        set detachedSlices(value: List<number>);
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/TowerLayout" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * Specifies how to arrange segments in tower charts.
    * @enum
    * @name TowerLayout
    * @param [Interleave] Segments from the two series are interleaved.
    * @param [Stack] Segments in each series are stacked on top of each other.
    * @param [Timeline] Segments are positioned proportionally to their time value.
    */
    export enum TowerLayout {
        /**
        * Segments from the two series are interleaved.
        */
        Interleave = 0,
        /**
        * Segments in each series are stacked on top of each other.
        */
        Stack = 1,
        /**
        * Segments are positioned proportionally to their time value.
        */
        Timeline = 2
    }
}
declare module "Charting/TowerSegmentShape" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * Identifies the shapes rendered by a ScatterRenderer.
    * @enum
    * @name TowerSegmentShape
    * @param [Triangle] Draw triangular segments.
    * @param [Rectangle] Draw rectangular segments.
    */
    export enum TowerSegmentShape {
        /**
        * Draw triangular segments.
        */
        Triangle = 0,
        /**
        * Draw rectangular segments.
        */
        Rectangle = 1
    }
}
declare module "Charting/TowerRenderer" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { IEnumerable, List } from "@mindfusion/common-collections";
    import { Point } from "@mindfusion/drawing";
    import { HitResult } from "Charting/HitResult";
    import { Margins } from "Charting/Margins";
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { TowerLayout } from "Charting/TowerLayout";
    import { TowerSegmentShape } from "Charting/TowerSegmentShape";
    /**
    * @class Implements a SeriesRenderer used to draw tower charts, rendering series
    * side by side to allow comparing data sequence and sizes.
    */
    export class TowerRenderer extends SeriesRenderer {
        /**
         * Initializes a new instance of the TowerRenderer class.
         * @param {Series} leftSeries The Series that should be rendered on left side of the chart.
         * @param {Series} rightSeries The Series that should be rendered on right side of the chart.
         */
        constructor(leftSeries: Series, rightSeries: Series);
        /**
         * Gets or sets the left-side Series drawn by this TowerRenderer.
         */
        get leftSeries(): Series;
        /**
         * Gets or sets the left-side Series drawn by this TowerRenderer.
         */
        set leftSeries(value: Series);
        /**
        * Gets or sets the right-side Series drawn by this TowerRenderer.
        */
        get rightSeries(): Series;
        /**
         * Gets or sets the left-side Series drawn by this TowerRenderer.
         */
        set rightSeries(value: Series);
        /**
        * Enumerates the segments of the tower chart.
        * @param {RenderContext} context A RenderContext instance.
        * @param {ProcessSegment} process A ProcessSegment callback.
        */
        enumSegments(context: RenderContext, process: ProcessSegment): void;
        enumInterleavedTriangles(context: RenderContext, process: ProcessSegment): void;
        enumInterleavedRectangles(context: RenderContext, process: ProcessSegment): void;
        enumStackedSegments(context: RenderContext, process: ProcessSegmentPlot): void;
        enumStackedTriangles(context: RenderContext, process: ProcessSegment): void;
        enumStackedRectangles(context: RenderContext, process: ProcessSegment): void;
        enumTimelineSegments(context: RenderContext, process: ProcessSegmentPlot): void;
        enumTimelineTriangles(context: RenderContext, process: ProcessSegment): void;
        enumTimelineRectangles(context: RenderContext, process: ProcessSegment): void;
        /**
        * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
        * @param {RenderContext} context A RenderContext instance.
        */
        draw(context: RenderContext): void;
        /**
        * SeriesRenderer.DrawHighlight override. Draws highlighted segment in specified RenderContext.
        * @param {RenderContext} context A RenderContext instance.
        * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
        */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
        * SeriesRenderer.HitTest override. Hit-tests the segments representing data items.
        * @param {RenderContext} context A RenderContext instance.
        * @param {Point} location A Point specifying where to look for a tower segment.
        * @returns A HitResult instance identifying the found data item.
        */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Implements the SeriesContainer interface.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        private m_layout;
        /**
         * Gets or sets the layout of tower segments.
         */
        get layout(): TowerLayout;
        /**
         * Gets or sets the layout of tower segments.
         */
        set layout(value: TowerLayout);
        private m_segmentShape;
        /**
         * Gets or sets the shape of tower segments.
         */
        get segmentShape(): TowerSegmentShape;
        /**
         * Gets or sets the shape of tower segments.
         */
        set segmentShape(value: TowerSegmentShape);
        private m_range;
        /**
         * Gets or sets fixed data range size.
         */
        get range(): number;
        /**
         * Gets or sets fixed data range size.
         */
        set range(value: number);
        private m_seriesPadding;
        /**
         * Gets or sets the padding distance between series.
         */
        get seriesPadding(): number;
        /**
         * Gets or sets the padding distance between series.
         */
        set seriesPadding(value: number);
        private m_margins;
        /**
         * Gets or sets the size of margins around chart graphics.
         */
        get margins(): Margins;
        /**
         * Gets or sets the size of margins around chart graphics.
         */
        set margins(value: Margins);
        private m_leftSeries;
        private m_rightSeries;
    }
    class Segment {
        constructor(series: Series, dataIndex: number, left: boolean);
        series: Series;
        dataIndex: number;
        left: boolean;
        polygon: List<Point>;
    }
    class PlotVars {
        mx: number;
        xRes: number;
        yRes: number;
        leftProgress: number;
        rightProgress: number;
        bottom: number;
    }
    /**
    * Defines the signature of delegates called to process tower chart segments.
    */
    export interface ProcessSegment {
        (segment: Segment): void;
    }
    /**
    * Defines the signature of delegates called to process tower chart segment plots.
    */
    export interface ProcessSegmentPlot {
        (segment: Segment, vars: PlotVars): void;
    }
}
declare module "Charting/Controls/TowerChart" {
    import { TowerLayout } from "Charting/TowerLayout";
    import { Margins } from "Charting/Margins";
    import { Series } from "Charting/Series";
    import { TowerRenderer } from "Charting/TowerRenderer";
    import { TowerSegmentShape } from "Charting/TowerSegmentShape";
    import { Chart } from "Charting/Controls/Chart";
    /**
     * @class A control used to draw tower charts, rendering series
     * side by side to allow comparing data sequence and sizes.
     */
    export class TowerChart extends Chart {
        /**
    * Initializes a new instance of the TowerChart class.
    * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
    * @param {CandlestickRenderer} [seriesRenderer] A TowerRenderer used to draw chart's data series.
    */
        constructor(element: HTMLCanvasElement, seriesRenderer?: TowerRenderer);
        onUnbind(): void;
        onBind(): void;
        /**
        * Gets or sets the series whose data is drawn on the left side of this chart.
        */
        get leftSeries(): Series;
        /**
         * Gets or sets the series whose data is drawn on the left side of this chart.
         */
        set leftSeries(value: Series);
        /**
         * Gets or sets the series whose data is drawn on the right side of this chart.
         */
        get rightSeries(): Series;
        /**
         * Gets or sets the series whose data is drawn on the right side of this chart.
         */
        set rightSeries(value: Series);
        /**
         * Chart.SeriesRenderer override. Gets the default SeriesRenderer for this chart.
         */
        get seriesRenderer(): TowerRenderer;
        /**
         * Gets or sets the layout of tower segments.
         */
        get towerLayout(): TowerLayout;
        /**
         * Gets or sets the layout of tower segments.
         */
        set towerLayout(value: TowerLayout);
        /**
         * Gets or sets the shape of tower segments.
         */
        get segmentShape(): TowerSegmentShape;
        /**
         * Gets or sets the shape of tower segments.
         */
        set segmentShape(value: TowerSegmentShape);
        /**
         * Gets or sets fixed data range size.
         */
        get range(): number;
        /**
         * Gets or sets fixed data range size.
         */
        set range(value: number);
        /**
         * Gets or sets the padding distance between series.
         */
        get seriesPadding(): number;
        /**
         * Gets or sets the padding distance between series.
         */
        set seriesPadding(value: number);
        /**
         * Gets or sets the size of margins around chart graphics.
         */
        get margins(): Margins;
        /**
         * Gets or sets the size of margins around chart graphics.
         */
        set margins(value: Margins);
    }
}
declare module "Charting/CurveAreaRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { AreaRenderer } from "Charting/AreaRenderer";
    import { Series } from "Charting/Series";
    /**
     * @class A SeriesRenderer that draws each series as an area with curved boundaries in its containing plot.
     */
    export class CurveAreaRenderer extends AreaRenderer {
        /**
         * Initializes a new instance of the CurveAreaRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as areas.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * AreaRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        fromJson(json: string): void;
        toJson(): any;
    }
}
declare module "Charting/Controls/AreaChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Controls } from "Charting/LoadOrder";
    import { LineType } from "Charting/LineType";
    import { AreaRenderer } from "Charting/AreaRenderer";
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    /**
    * @class A control used to draw area charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {LineType} lineType Gets or sets what type of line segments to draw between data points.
    * @property {Number} areaOpacity Gets or sets the opacity of area polygons.
    */
    export class AreaChart extends Controls.BiaxialChart {
        /**
         * Initializes a new instance of the AreaChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {LineType} [lineType] A member of the LineType enumeration.
         * @param {AreaRenderer} [seriesRenderer] An AreaRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, lineType?: LineType, seriesRenderer?: AreaRenderer);
        static createRenderer(series: ObservableCollection<Series>, lineType: LineType): Renderer2D;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets what type of line segments to draw between data points.
         */
        get lineType(): LineType;
        /**
         * Gets or sets what type of line segments to draw between data points.
         */
        set lineType(value: LineType);
        /**
         * Gets or sets the opacity of area polygons.
         */
        get areaOpacity(): number;
        /**
         * Gets or sets the opacity of area polygons.
         */
        set areaOpacity(value: number);
        fromJson(json: string): void;
        toJson(): string;
        private m_lineType;
    }
}
declare module "Charting/Renderer3D" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import * as ThreeD from "Charting/ThreeD/ThreeD";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class Defines the interface called by Plot3D to build 3D models.
     */
    export interface Renderer3D {
        /**
         * Adds models for the series data to specified scene.
         * @param {Scene3D} scene A Scene3D instance.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        buildModels(scene: ThreeD.Scene3D, context: RenderContext): void;
    }
}
declare module "Charting/Plot3D" {
    import { RenderContext } from "Charting/RenderContext";
    import { Axis } from "Charting/Axis";
    import { Plot2D } from "Charting/Plot2D";
    /**
    * @class A plot whose series are rendered relatively to a three-dimensional Cartesian coordinate system.
    * @property {MindFusion.Charting.Axis} zAxis Gets or sets default Axis instance used to map Z data coordinates of series rendered inside this plot to the plot's pixels.
    */
    export class Plot3D extends Plot2D {
        constructor();
        /**
         * Plot.Draw override. Draws a projection of 3D models
         * generated by contained Renderer3D objects.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        getDelta(): number;
        private scene;
        private m_zAxis;
        /**
         * Gets or sets default Axis instance used to map Z data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        get zAxis(): Axis;
        /**
         * Gets or sets default Axis instance used to map Z data coordinates of series
         * rendered inside this plot to the plot's pixels.
         */
        set zAxis(value: Axis);
    }
}
declare module "Charting/BarModel3D" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies supported bar shapes when rendering multiple series.
    * @enum
    * @name BarModel3D
    * @param [Bar] Draw bars as rectangular cuboids.
    * @param [Cylinder] Draw bars as cylinders.
    */
    export enum BarModel3D {
        Bar = 0,
        Cylinder = 1
    }
}
declare module "Charting/ShapeBuilder" {
    import * as ThreeD from "Charting/ThreeD/ThreeD";
    export class ShapeBuilder {
        constructor(scene: ThreeD.Scene3D);
        build(shape: any, p: any, brush: any): ThreeD.Mesh3D;
        scene: ThreeD.Scene3D;
    }
}
declare module "Charting/BarRenderer3D" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import * as ThreeD from "Charting/ThreeD/ThreeD";
    import { Renderer3D } from "Charting/Renderer3D";
    import { BarRenderer } from "Charting/BarRenderer";
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { BarModel3D } from "Charting/BarModel3D";
    /**
     * @class A SeriesRenderer that draws 3D bars in its containing plot.
     */
    export class BarRenderer3D extends BarRenderer implements Renderer3D {
        /**
         * Initializes a new instance of the BarRenderer3D class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as 3D bars.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Implements Renderer3D.BuildModels. Adds 3D bar models for the series data to specified scene.
         * @param {Scene3D} scene A Scene3D instance.
         * @param {RenderContext} context A RenderContext instance.
         */
        buildModels(scene: ThreeD.Scene3D, context: RenderContext): void;
        barModel: BarModel3D;
    }
}
declare module "Charting/BarStackRenderer3D" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import * as ThreeD from "Charting/ThreeD/ThreeD";
    import { RenderContext } from "Charting/RenderContext";
    import { Renderer3D } from "Charting/Renderer3D";
    import { BarStackRenderer } from "Charting/BarStackRenderer";
    import { Series } from "Charting/Series";
    import { BarModel3D } from "Charting/BarModel3D";
    /**
     * @class A SeriesRenderer that draws stacked 3D bars in its containing plot.
     */
    export class BarStackRenderer3D extends BarStackRenderer implements Renderer3D {
        /**
         * Initializes a new instance of the BarStackRenderer3D class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as stacked bars.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Implements Renderer3D.BuildModels. Adds 3D bar models for the series data to specified scene.
         * @param {Scene3D} scene A Scene3D instance.
         * @param {RenderContext} context A RenderContext instance.
         */
        buildModels(scene: ThreeD.Scene3D, context: RenderContext): void;
        barModel: BarModel3D;
    }
}
declare module "Charting/BarOverlayRenderer3D" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import * as ThreeD from "Charting/ThreeD/ThreeD";
    import { RenderContext } from "Charting/RenderContext";
    import { BarOverlayRenderer } from "Charting/BarOverlayRenderer";
    import { Renderer3D } from "Charting/Renderer3D";
    import { Series } from "Charting/Series";
    import { BarModel3D } from "Charting/BarModel3D";
    /**
     * @class A SeriesRenderer that draws a row of 3D bars for each series.
     */
    export class BarOverlayRenderer3D extends BarOverlayRenderer implements Renderer3D {
        /**
         * Initializes a new instance of the BarOverlayRenderer3D class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as rows of bars.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * BarOverlayRenderer.BackToFrontRatio override. Gets the ratio
         * between widths of backmost and frontmost bars.
         * @returns {Number} 1.
         */
        backToFrontRatio(): number;
        /**
         * Implements Renderer3D.BuildModels. Adds 3D bar models for the series data to specified scene.
         * @param {Scene3D} scene A Scene3D instance.
         * @param {RenderContext} context A RenderContext instance.
         */
        buildModels(scene: ThreeD.Scene3D, context: RenderContext): void;
        barModel: BarModel3D;
    }
}
declare module "Charting/Controls/BarChart3D" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Plot } from "Charting/Plot";
    import { Renderer2D } from "Charting/Renderer2D";
    import { BarModel3D } from "Charting/BarModel3D";
    import { BarLayout } from "Charting/BarLayout";
    import { Series } from "Charting/Series";
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    /**
    * @class A control used to draw 3D bar charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {BarLayout} barLayout Gets or sets how to arrange bars when rendering multiple series.
    * @property {BarModel3D} barModel Gets or sets how to visualize the bars when rendering multiple series.
    */
    export class BarChart3D extends BiaxialChart {
        /**
         * Initializes a new instance of the BarChart3D class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {BarLayout} [barLayout] A member of the BarLayout enumeration.
         * @param {BarModel3D} [barModel] A member of the BarModel3D enumeration.
         * @param {Renderer2D} [seriesRenderer] A Renderer2D used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, barLayout?: BarLayout, barModel?: BarModel3D, seriesRenderer?: Renderer2D);
        /**
         * Chart.CreatePlot override. Creates the Plot type corresponding to this chart.
         * @returns {Plot} An instance of the Plot3D class.
         */
        createPlot(): Plot;
        static createRenderer(series: ObservableCollection<Series>, layout: BarLayout, barModel: BarModel3D): Renderer2D;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets how to arrange bars when rendering multiple series.
         */
        get barLayout(): BarLayout;
        /**
         * Gets or sets how to arrange bars when rendering multiple series.
         */
        set barLayout(value: BarLayout);
        /**
     * Gets or sets the model to be drawn
     */
        get barModel(): BarModel3D;
        set barModel(value: BarModel3D);
        private m_barModel;
        private m_barLayout;
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/BubbleLabelAlignment" {
    /**
    * @namespace MindFusion.Charting
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
    * Specifies the alignment of a label relative to its associated bubble.
    * @enum
    * @name BubbleLabelAlignment
    * @param [Center] Indicates that the label is centered inside the bubble.
    * @param [Above] Indicates that the label is positioned above the bubble.
    * @param [Below] Indicates that the label is positioned below the bubble.
    * @param [Left] Indicates that the label is positioned to the left of the bubble.
    * @param [Right] Indicates that the label is positioned to the right of the bubble.
    */
    export enum BubbleLabelAlignment {
        /**
        * Indicates that the label is centered inside the bubble.
        */
        Center = 0,
        /**
        * Indicates that the label is positioned above the bubble.
        */
        Above = 1,
        /**
        * Indicates that the label is positioned below the bubble.
        */
        Below = 2,
        /**
        * Indicates that the label is positioned to the left of the bubble.
        */
        Left = 3,
        /**
        * Indicates that the label is positioned to the right of the bubble.
        */
        Right = 4
    }
}
declare module "Charting/BubbleRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Point } from '@mindfusion/drawing';
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { BubbleLabelAlignment } from "Charting/BubbleLabelAlignment";
    /**
    * @class A SeriesRenderer that draws bubbles representing data items in its containing plot.
    * @property {BubbleLabelAlignment} labelAlignment Gets or sets the label alignment.
    */
    export class BubbleRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the BubbleRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as bubbles.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws bubbles representing data items in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the bubble representations of data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a bubble.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted bubble in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
        * Gets the label alignment.
        */
        get labelAlignment(): BubbleLabelAlignment;
        /**
        * Sets the label alignment.
        */
        set labelAlignment(value: BubbleLabelAlignment);
        private m_labelAlignment;
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Controls/BubbleChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { BubbleRenderer } from "Charting/BubbleRenderer";
    import { BubbleLabelAlignment } from "Charting/BubbleLabelAlignment";
    import { Series } from "Charting/Series";
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    /**
    * @class A control used to draw bubble charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {BubbleLabelAlignment} labelAlignment Gets or sets the alignment of labels relative to their associated bubbles.
    */
    export class BubbleChart extends BiaxialChart {
        /**
         * Initializes a new instance of the BubbleChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {BubbleRenderer} [seriesRenderer] A LineRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: BubbleRenderer);
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
        * Gets the alignment of labels relative to their associated bubbles.
        */
        get labelAlignment(): BubbleLabelAlignment;
        /**
        * Sets the alignment of labels relative to their associated bubbles.
        */
        set labelAlignment(value: BubbleLabelAlignment);
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/CandlestickRenderer" {
    import { Rect, Point, Brush } from '@mindfusion/drawing';
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Renderer2D } from "Charting/Renderer2D";
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { HitResult } from "Charting/HitResult";
    import { TextRenderer } from "Charting/TextRenderer";
    /**
    * @class A SeriesRenderer that draws candlesticks in its containing plot.
    * @property {Number} openDimension  Gets or sets the index of the dimension, containing open values.
    * @property {Number} closeDimension  Gets or sets the index of the dimension, containing close values.
    * @property {Number} lowDimension  Gets or sets the index of the dimension, containing low values.
    * @property {Number} highDimension  Gets or sets the index of the dimension, containing high values.
    * @property {Number} candlestickWidth  Gets or sets the width of the candlesticks.
    */
    export class CandlestickRenderer extends Renderer2D {
        /**
         * Initializes a new instance of the CandlestickRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Enumerates the candlesticks visible in current data range.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessCandlesticks} process A ProcessBars callback.
         * @remarks The signature of the ProcessCandlesticks delegate is as follows:
         * 'function(seriesIndex, dataIndex, points, bounds)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point[]} points An array of four points containing wick ends' coordinates.
         * param {Rect} bounds A RectangleF representing the boundaries of current candlestick.
         * The method is not expected to return a value.
         */
        enumVisibleCandlesticks(context: RenderContext, process: ProcessCandlesticks): void;
        private getMinY;
        private getMaxY;
        /**
         * Renderer2D.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        drawLabels(context: RenderContext, s: number, i: number, bounds: Rect, labelRenderer: TextRenderer): void;
        /**
         * Renderer2D.HitTest override. Hit-tests the bar representations of data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a candlestick.
         * @returns {HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Renderer2D.DrawHighlight override. Draws highlighted candlestick in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private m_openDimension;
        /**
         * Gets or sets the index of the dimension, containing open values.
         */
        get openDimension(): number;
        /**
         * Gets or sets the index of the dimension, containing open values.
         */
        set openDimension(value: number);
        private m_closeDimension;
        /**
         * Gets or sets the index of the dimension, containing close values.
         */
        get closeDimension(): number;
        /**
         * Gets or sets the index of the dimension, containing close values.
         */
        set closeDimension(value: number);
        private m_lowDimension;
        /**
         * Gets or sets the index of the dimension, containing low values.
         */
        get lowDimension(): number;
        /**
         * Gets or sets the index of the dimension, containing low values.
         */
        set lowDimension(value: number);
        private m_highDimension;
        /**
         * Gets or sets the index of the dimension, containing high values.
         */
        get highDimension(): number;
        /**
         * Gets or sets the index of the dimension, containing high values.
         */
        set highDimension(value: number);
        private m_candlestickWidth;
        /**
         * Gets or sets the width of the candlesticks.
         */
        get candlestickWidth(): number;
        /**
         * Gets or sets the width of the candlesticks.
         */
        set candlestickWidth(value: number);
        /**
         * Gets the brush that should be used to fill the representation of specified data item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this SeriesRenderer.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @param {RenderContext} context A RenderContext instance.
         * @returns {Brush} A Brush instance.
         */
        effectiveFill(seriesIndex: number, dataIndex: number, context: RenderContext): Brush;
        fromJson(json: string): any;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process candlesticks.
    * @param {Number} seriesIndex An integer index of series in Series list.
    * @param {Number} dataIndex An integer index of data item in specified series.
    * @param {Point[]} points An array of four points containing wick ends' coordinates.
    * @param {Rect} bounds A RectangleF representing the boundaries of current candlestick.
    */
    export interface ProcessCandlesticks {
        (seriesIndex: number, dataIndex: number, points: Point[], bounds: Rect): void;
    }
}
declare module "Charting/Controls/CandlestickChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { CandlestickRenderer } from "Charting/CandlestickRenderer";
    import { Series } from "Charting/Series";
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    /**
    * @class A control used to draw candlestick charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {Number} candlestickWidth Gets or sets the width of the candlesticks.
    */
    export class CandlestickChart extends BiaxialChart {
        /**
         * Initializes a new instance of the CandlestickChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {CandlestickRenderer} [seriesRenderer] A CandlestickRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: CandlestickRenderer);
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets the width of the candlesticks.
         */
        get candlestickWidth(): number;
        /**
         * Gets or sets the width of the candlesticks.
         */
        set candlestickWidth(value: number);
        fromJson(json: string): any;
        toJson(): string;
    }
}
declare module "Charting/FunnelRenderer" {
    import { Point } from '@mindfusion/drawing';
    import { IEnumerable } from '@mindfusion/common-collections';
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { Series } from "Charting/Series";
    import { HitResult } from "Charting/HitResult";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class A SeriesRenderer that is used to represent stages in a sales process
    * and show the amount of potential revenue for each stage.
    * @property {Series} series Gets or sets the Series drawn by this FunnelRenderer.
    * @property {Number} dimension Gets or sets the dimension index that should be used to read data from the Series.
    * @property {Number} segmentSpacing Gets or sets the spacing between segments.
    * @property {Number} stemWidth Gets or sets the width of the funnel stem.
    */
    export class FunnelRenderer extends SeriesRenderer {
        /**
         * Initializes a new instance of the FunnelRenderer class.
         * @param {Series} series The Series that should be rendered as a funnel.
         * @param {Number} [dimension] Specifies the Series dimension index that should be used to access data.
         */
        constructor(series: Series, dimension?: number);
        /**
         * Enumerates the segments of the funnel.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessSegment} process A ProcessSegment callback.
         * @remarks The signature of the ProcessSegment delegate is as follows:
         * 'function(dataIndex, points)'.
         * param {Number} dataIndex An integer index of data item in Series.
         * param {Point[]} points The defining points of the segment's bounding polygon.
         * @remarks The method is not expected to return a value.
         */
        protected enumSegments(context: RenderContext, process: ProcessSegment): void;
        private getSegmentPoly;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * SeriesRenderer.DrawHighlight override. Draws highlighted slice in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
         * SeriesRenderer.HitTest override. Hit-tests the slices representing data items.
         * @param {RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for a pie slice.
         * @returns {HitResult} A HitResult instance identifying the found data item.
        */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Implements the SeriesContainer interface.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        /**
         * Gets or sets the Series drawn by this FunnelRenderer.
         */
        get series(): Series;
        /**
         * Gets or sets the Series drawn by this FunnelRenderer.
         */
        set series(value: Series);
        /**
         * Gets or sets the dimension index that should be used to read data from the Series.
         */
        get dimension(): number;
        /**
         * Gets or sets the dimension index that should be used to read data from the Series.
         */
        set dimension(value: number);
        /**
         * Gets or sets the spacing between segments.
         */
        get segmentSpacing(): number;
        /**
         * Gets or sets the spacing between segments.
         */
        set segmentSpacing(value: number);
        /**
         * Gets or sets the width of the funnel base.
         */
        get stemWidth(): number;
        /**
         * Gets or sets the width of the funnel base.
         */
        set stemWidth(value: number);
        private m_series;
        private m_dimension;
        private m_segmentSpacing;
        private m_stemWidth;
        fromJson(json: string): any;
        toJson(): any;
    }
    export interface ProcessSegment {
        (dataIndex: number, points: Point[]): any;
    }
}
declare module "Charting/Controls/FunnelChart" {
    import { FunnelRenderer } from "Charting/FunnelRenderer";
    import { Series } from "Charting/Series";
    import { Chart } from "Charting/Controls/Chart";
    /**
    * @class A control used to draw funnel charts.
    * @property {Series} series Gets or sets the series whose data is drawn in this chart.
    * @property {Number} dimension Gets or sets the dimension index that should be used to read data from the Series.
    * @property {Number} segmentSpacing Gets or sets the spacing between segments.
    * @property {Number} stemWidth Gets or sets the width of the funnel stem.
    */
    export class FunnelChart extends Chart {
        /**
         * Initializes a new instance of the FunnelChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {FunnelRenderer} [seriesRenderer] A FunnelRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: FunnelRenderer);
        onUnbind(): void;
        onBind(): void;
        /**
         * Gets or sets the series whose data is drawn in this chart.
         */
        get series(): Series;
        /**
         * Gets or sets the series whose data is drawn in this chart.
         */
        set series(value: Series);
        /**
     * Gets or sets the dimension index that should be used to read data from the Series.
     */
        get dimension(): number;
        /**
         * Gets or sets the dimension index that should be used to read data from the Series.
         */
        set dimension(value: number);
        /**
         * Gets or sets the spacing between segments.
         */
        get segmentSpacing(): number;
        /**
         * Gets or sets the spacing between segments.
         */
        set segmentSpacing(value: number);
        /**
         * Gets or sets the width of the funnel stem.
         */
        get stemWidth(): number;
        /**
         * Gets or sets the width of the funnel stem.
         */
        set stemWidth(value: number);
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/RadarAxisOptions" {
    import { RenderContext } from "Charting/RenderContext";
    import { AxisRenderer } from "Charting/AxisRenderer";
    import { Axis } from "Charting/Axis";
    /**
     * @class Provides properties for customizing axis rendering in radar charts.
     */
    export class RadarAxisOptions extends AxisRenderer {
        /**
         * Initializes a new instance of the RadarAxisOptions class.
         */
        constructor(axis: Axis);
        /**
         * AxisRenderer.EffectiveAxis override.
         */
        effectiveAxis(context: RenderContext): Axis;
        /**
         * AxisRenderer.Measure override.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * AxisRenderer.Draw override.
         */
        draw(context: RenderContext): void;
    }
}
declare module "Charting/RadarGridType" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies the grid types supported by RadarPlot.
    * @enum
    * @name RadarGridType
    * @param [Spiderweb] Identifies spider-web grid consisting as concentric regular polygons.
    * @param [Radar] Identifies radar grid consisting as concentric circles.
    */
    export enum RadarGridType {
        /**
        * Identifies spider-web grid consisting as concentric regular polygons.
        */
        Spiderweb = 0,
        /**
        * Identifies radar grid consisting as concentric circles.
        */
        Radar = 1
    }
}
declare module "Charting/RadarPlot" {
    import * as Drawing from '@mindfusion/drawing';
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { PolarPlot } from "Charting/PolarPlot";
    import { Axis } from "Charting/Axis";
    import { RadarAxisOptions } from "Charting/RadarAxisOptions";
    import { RadarGridType } from "Charting/RadarGridType";
    /**
    * @class A plot containing radar-chart graphics.
    * @property {ObservableCollection<Axis>} axes Gets the list of Axis objects representing ranges of variables represented in the radar chart.
    * @property {MindFusion.Charting.Axis} defaultAxis ets a default Axis object used when data item index does not have corresponding element in the Axes collection.
    * @property {RadarAxisOptions} axisOptions Gets a RadarAxisOptions object providing properties for customizing axis rendering in radar charts.
    * @property {RadarGridType} gridType Gets or sets the type of grid to draw in this plot.
    * @property {Number} gridDivisions Gets the number of concentric shapes to draw in the grid.
    * @property {Boolean} uniformScale Gets or sets a value indicating whether all axes should display same data range.
    * @property {Boolean} showCoordinates Gets or sets a value indicating whether the grid should display axis coordinates.
    * @property {Drawing.Color} gridColor1 Gets or sets the main color of the grid.
    * @property {Drawing.Color} gridColor2 Gets or sets the alternating color of the grid.
    */
    export class RadarPlot extends PolarPlot {
        /**
         * Initializes a new instance of the RadarPlot class.
         */
        constructor();
        private m_axes;
        /**
         * Gets the list of Axis objects representing ranges
         * of variables represented in the radar chart.
         */
        get axes(): ObservableCollection<Axis>;
        /**
         * Gets a default Axis object used when data item index does not
         * have corresponding element in the Axes collection.
         */
        get defaultAxis(): Axis;
        /**
         * Gets a default Axis object used when data item index does not
         * have corresponding element in the Axes collection.
         */
        set defaultAxis(value: Axis);
        /**
         * Gets a RadarAxisOptions object providing properties for customizing
         * axis rendering in radar charts.
         */
        get axisOptions(): RadarAxisOptions;
        /**
         * Gets a RadarAxisOptions object providing properties for customizing
         * axis rendering in radar charts.
         */
        set axisOptions(value: RadarAxisOptions);
        private m_axisOptions;
        /**
         * Gets the Axis representing the range for specified data variable index.
         * @param {Number} index An integer index of data items in series.
         * @returns {MindFusion.Charting.Axis} The associated Axis.
         */
        getEffectiveAxis(index: number): Axis;
        getRadius(): {
            coef: number;
            radius: number;
        };
        /**
         * Plot.DrawGrid override. Draws spiderweb ot radial grid.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        drawGrid(context: RenderContext): void;
        /**
         * Plot.StartMeasureData override. Called in the beginning of data measurement pass.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        startMeasureData(context: RenderContext): void;
        /**
         * Gets or sets the type of grid to draw in this plot.
         */
        get gridType(): RadarGridType;
        /**
         * Gets or sets the type of grid to draw in this plot.
         */
        set gridType(value: RadarGridType);
        /**
         * Gets the number of concentric shapes to draw in the grid.
         */
        get gridDivisions(): number;
        /**
         * Gets the number of concentric shapes to draw in the grid.
         */
        set gridDivisions(value: number);
        /**
         * Gets or sets a value indicating whether all axes should display same data range.
         */
        get uniformScale(): boolean;
        /**
         * Gets or sets a value indicating whether all axes should display same data range.
         */
        set uniformScale(value: boolean);
        /**
         * Gets or sets a value indicating whether the grid should display axis coordinates.
         */
        get showCoordinates(): boolean;
        /**
         * Gets or sets a value indicating whether the grid should display axis coordinates.
         */
        set showCoordinates(value: boolean);
        /**
         * Gets or sets the main color of the grid.
         */
        get gridColor1(): Drawing.Color;
        /**
         * Gets or sets the main color of the grid.
         */
        set gridColor1(value: Drawing.Color);
        private m_gridColor1;
        /**
         * Gets or sets the alternating color of the grid.
         */
        get gridColor2(): Drawing.Color;
        /**
         * Gets or sets the alternating color of the grid.
         */
        set gridColor2(value: Drawing.Color);
        private m_gridColor2;
        axesCount: number;
        private m_defaultAxis;
        private m_gridType;
        private m_gridDivisions;
        private m_uniformScale;
        private m_showCoordinates;
        fromJson(json: any): void;
        toJson(): any;
    }
}
declare module "Charting/RadarRenderer" {
    import { Point } from '@mindfusion/drawing';
    import { ObservableCollection, List, IEnumerable } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { SeriesRenderer } from "Charting/SeriesRenderer";
    import { HitResult } from "Charting/HitResult";
    /**
    * @class A SeriesRenderer that draws series as polygons in polar coordinate system,
    * where adjacent data points are at equal angular distances and radial
    * coordinates correspond to magnitude of data item values.
    * @property {ObservableCollection<Series>} series Gets or sets a list of Series drawn by this RadarRenderer.
    * @property {Number} areaOpacity Gets or sets the opacity of radar polygons.
    */
    export class RadarRenderer extends SeriesRenderer {
        /**
         * Initializes a new instance of the RadarRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Gets or sets a list of Series drawn by this RadarRenderer.
         */
        get series(): ObservableCollection<Series>;
        /**
         * Gets or sets a list of Series drawn by this RadarRenderer.
         */
        set series(value: ObservableCollection<Series>);
        protected m_series: ObservableCollection<Series>;
        private subscribeToCollection;
        private unsubscribeFromCollection;
        private onSeriesCollectionChanged;
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Enumerates each series once providing a list of all visible points at each iteration.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessRange} process A ProcessRange callback.
         * @remarks The signature of the ProcessRange delegate is as follows:
         * 'function(seriesIndex, points)'.
         * param {Number} seriesIndexAn integer index of series in Series list.
         * param {List<Point>} points A list of Point values containing the plot coordinates
         * corresponding to data items in currently visible range.
         * The method is not expected to return a value.
         */
        enumVisibleRanges(context: RenderContext, process: ProcessRange): void;
        /**
         * SeriesRenderer.DrawHighlight override. Draws highlighted data item in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {MindFusion.Charting.HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        /**
         * SeriesRenderer.HitTest override. Hit-tests the visual representation of the series for a data item.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Point} location A Point specifying where to look for data items.
         * @returns {MindFusion.Charting.HitResult} A HitResult instance identifying the found data item.
         */
        hitTest(context: RenderContext, location: Point): HitResult;
        /**
         * Returns the data value of specified series item.
         * @param {Number} seriesIndex An integer index of a Series within the list of series rendered by this Renderer2D.
         * @param {Number} dataIndex An integer index of the data item in specified series.
         * @returns {Number} A number value.
         */
        data(seriesIndex: number, dataIndex: number): number;
        /**
         * SeriesRenderer.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the  associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * Implement SeriesContainer.
         * @returns {IEnumerable<Series>} An instance of the IEnumerable&lt;Series&gt; class.
         */
        enumSeries(): IEnumerable<Series>;
        /**
         * Gets the minimum value from all series located at specified index.
         * @param {Number} index An integer index of data element in the series.
         * @returns {Number} A number value representing the smallest data element.
         */
        getMinValue(index: number): number;
        /**
         * Gets the maximum value from all series located at specified index.
         * @param {Number} index An integer index of data element in the series.
         * @returns {Number} A number value representing the largest data element.
         */
        getMaxValue(index: number): number;
        private m_areaOpacity;
        /**
         * Gets or sets the opacity of radar polygons.
         */
        get areaOpacity(): number;
        /**
         * Gets or sets the opacity of radar polygons.
         */
        set areaOpacity(value: number);
        fromJson(json: string): any;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process all points from current data range at once.
    * @param {Number} seriesIndexAn integer index of series in Series list.
    * @param {List<Point>} points A list of Point values containing the plot coordinates
    * corresponding to data items in currently visible range.
    */
    export interface ProcessRange {
        (seriesIndex: number, points: List<Point>): void;
    }
}
declare module "Charting/RadarType" {
    /**
    * @namespace MindFusion.Charting
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
    * Identifies the type of radar-chart.
    * @enum
    * @name RadarType
    * @param [Polygon] Draw each series as a polygon.
    * @param [Pie] Draw data items as circular sectors.
    */
    export enum RadarType {
        /**
         * Draw each series as a polygon.
         */
        Polygon = 0,
        /**
         * Draw data items as circular sectors.
         */
        Pie = 1
    }
}
declare module "Charting/RadarScatterRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    import { ScatterRenderer } from "Charting/ScatterRenderer";
    import { ProcessPoint } from "Charting/Renderer2D";
    /**
     * @class A SeriesRenderer that draws scatter in radar plots.
     */
    export class RadarScatterRenderer extends ScatterRenderer {
        private radarRenderer;
        /**
         * Initializes a new instance of the RadarScatterRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as scatter.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * Renderer2D.MeasureDataRange override. Measures the data range of
         * rendered series and assigns it to the associated Axis objects if
         * their MinValue and MaxValue are not set.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measureDataRange(context: RenderContext): void;
        /**
         * ScatterRenderer.EnumPoints override. Enumerates the data values
         * of rendered series mapped to plot's 2D coordinates.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {ProcessPoint} process A ProcessPoint callback.
         * @remarks The signature of the ProcessPoint delegate is as follows:
         * 'function(seriesIndex, dataIndex, point)'.
         * param {Number} seriesIndex An integer index of series in Series list.
         * param {Number} dataIndex An integer index of data item in specified series.
         * param {Point} point A Point instance containing the Plot2D coordinates corresponding to current data item.
         * The method is not expected to return a value.
         */
        enumPoints(context: RenderContext, process: ProcessPoint): void;
    }
}
declare module "Charting/PieRadarRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Rect, Point } from '@mindfusion/drawing';
    import { Series } from "Charting/Series";
    import { RenderContext } from "Charting/RenderContext";
    import { RadarRenderer } from "Charting/RadarRenderer";
    import { HitResult } from "Charting/HitResult";
    /**
    * @class A SeriesRenderer that draws pie-radars, where data items are represented
    * by circular sectors of equal central angles, and the sector corresponding to a data item has radius proportional to its value.
    * @property {Boolean} alignToAxis Gets or sets a value indicating whether sectors should be aligned to axes in the radar grid or centered around them.
    */
    export class PieRadarRenderer extends RadarRenderer {
        /**
         * Initializes a new instance of the PieRadarRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered by this object.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * RadarRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Enumerates the pie-radar sectors corresponding to each series.
         * @param {RenderContext} context A RenderContext instance.
         * @param {ProcessSectors} process A ProcessSectors callback.
         */
        enumSectors(context: RenderContext, process: ProcessSector): void;
        /**
         * RadarRenderer.DrawHighlight override. Draws highlighted data item in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {HitResult} hitResult A HitResult instance identifying highlighted data item.
         */
        drawHighlight(context: RenderContext, hitResult: HitResult): void;
        private m_alignToAxis;
        /**
         * Gets or sets a value indicating whether sectors should be aligned to
         * axes in the radar grid or centered around them.
         */
        get alignToAxis(): boolean;
        /**
         * Gets or sets a value indicating whether sectors should be aligned to
         * axes in the radar grid or centered around them.
         */
        set alignToAxis(value: boolean);
        fromJson(json: string): void;
        toJson(): any;
    }
    /**
    * Defines the signature of delegates called to process sectors generated for a series.
    *@param {Number} seriesIndex An integer index of series in Series list.
    *@param {List<Point>} points A list of Point values containing the plot coordinates corresponding to data items.
    *@param {List<GraphicsPath>} paths A list of GraphicsPath objects representing pie-radar sectors.
    */
    export interface ProcessSector {
        (seriesIndex: number, dataIndex: number, point: Point, rect: Rect, offset: number, startAngle: number, angle: number): void;
    }
}
declare module "Charting/Controls/RadarChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Color } from '@mindfusion/drawing';
    import { Axis } from "Charting/Axis";
    import { RadarRenderer } from "Charting/RadarRenderer";
    import { RadarGridType } from "Charting/RadarGridType";
    import { RadarType } from "Charting/RadarType";
    import { Series } from "Charting/Series";
    import { Plot } from "Charting/Plot";
    import { Chart } from "Charting/Controls/Chart";
    /**
    * @class A control used to draw radar charts.
    * @property {ObservableCollection<Series>} series Gets or sets the list of series whose data is drawn in this chart.
    * @property {Boolean} showScatter Gets or sets a value indicating whether the chart should render scatter shapes.
    * @property {RadarType} radarType Gets or sets the type of radar graphics drawn in this chart.
    * @property {RadarGridType} gridType Gets or sets the type of grid drawn in this chart.
    * @property {MindFusion.Charting.Axis} defaultAxis Gets a default Axis object used when data item index does not have corresponding element in the Axes collection.
    * @property {ObservableCollection<Axis>} axes Gets the list of Axis objects representing ranges of variables represented in the radar chart.
    * @property {Number} gridDivisions Gets or sets the number of grid divisions.
    * @property {Boolean} uniformScale Gets or sets a value indicating whether all axes should display same data range.
    * @property {Boolean} showCoordinates Gets or sets a value indicating whether the chart should show axis coordinates.
    * @property {Color} gridColor1 Gets or sets the main color of the grid.
    * @property {Color} gridColor2 Gets or sets the alternating color of the grid.
    * @property {Number} areaOpacity Gets or sets the opacity of radar polygons.
    * @property {Boolean} alignToAxis Gets or sets whether pie-radar sectors should be aligned to axes in the radar grid or centered around them.
    * @property {Boolean} allowRotate Gets or sets a value indicating whether users are allowed to rotate this chart.
    * @property {Number} startAngle Gets or sets the angle where first data item of series should be drawn.
    * @property {Number} chartPadding Gets or set padding space between the plot's border and series graphics.
    */
    export class RadarChart extends Chart {
        /**
         * Initializes a new instance of the RadarChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {RadarRenderer} [seriesRenderer] A RadarRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: RadarRenderer);
        /**
         * Chart.CreatePlot override. Creates the Plot type corresponding to this chart.
         * @returns {Plot} An instance of the RadarPlot class.
         */
        createPlot(): Plot;
        onUnbind(): void;
        onBind(): void;
        /**
         * Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets a value indicating whether the chart should render scatter shapes.
         */
        get showScatter(): boolean;
        /**
         * Gets or sets a value indicating whether the chart should render scatter shapes.
         */
        set showScatter(value: boolean);
        /**
         * Gets or sets the type of radar graphics drawn in this chart.
         */
        get radarType(): RadarType;
        /**
         * Gets or sets the type of radar graphics drawn in this chart.
         */
        set radarType(value: RadarType);
        /**
         * Gets or sets the type of grid drawn in this chart.
         */
        get gridType(): RadarGridType;
        /**
         * Gets or sets the type of grid drawn in this chart.
         */
        set gridType(value: RadarGridType);
        /**
         * Gets a default Axis object used when data item index does not
         * have corresponding element in the Axes collection.
         */
        get defaultAxis(): Axis;
        /**
         * Gets a default Axis object used when data item index does not
         * have corresponding element in the Axes collection.
         */
        set defaultAxis(value: Axis);
        /**
         * Gets the list of Axis objects representing ranges
         * of variables represented in the radar chart.
         */
        get axes(): ObservableCollection<Axis>;
        /**
         * Gets or sets the number of grid divisions.
         */
        get gridDivisions(): number;
        /**
         * Gets or sets the number of grid divisions.
         */
        set gridDivisions(value: number);
        /**
         * Gets or sets a value indicating whether all axes should display same data range.
         */
        get uniformScale(): boolean;
        /**
         * Gets or sets a value indicating whether all axes should display same data range.
         */
        set uniformScale(value: boolean);
        /**
         * Gets or sets a value indicating whether the chart should show axis coordinates.
         */
        get showCoordinates(): boolean;
        /**
         * Gets or sets a value indicating whether the chart should show axis coordinates.
         */
        set showCoordinates(value: boolean);
        /**
         * Gets or sets the main color of the grid.
         */
        get gridColor1(): Color;
        /**
         * Gets or sets the main color of the grid.
         */
        set gridColor1(value: Color);
        /**
         * Gets or sets the alternating color of the grid.
         */
        get gridColor2(): Color;
        /**
         * Gets or sets the alternating color of the grid.
         */
        set gridColor2(value: Color);
        /**
         * Gets or sets the opacity of radar polygons.
         */
        get areaOpacity(): number;
        /**
         * Gets or sets the opacity of radar polygons.
         */
        set areaOpacity(value: number);
        /**
         * Gets or sets whether pie-radar sectors should be aligned to
         * axes in the radar grid or centered around them.
         */
        get alignToAxis(): boolean;
        /**
         * Gets or sets whether pie-radar sectors should be aligned to
         * axes in the radar grid or centered around them.
         */
        set alignToAxis(value: boolean);
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this chart.
         */
        get allowRotate(): boolean;
        /**
         * Gets or sets a value indicating whether users are allowed to rotate this chart.
         */
        set allowRotate(value: boolean);
        /**
         * Gets or sets the angle where first data item of series should be drawn.
         */
        get startAngle(): number;
        /**
         * Gets or sets the angle where first data item of series should be drawn.
         */
        set startAngle(value: number);
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        get chartPadding(): number;
        /**
         * Gets or set padding space between the plot's border and series graphics.
         */
        set chartPadding(value: number);
        private m_showScatter;
        private scatterRenderer;
        private m_radarType;
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/Controls/ScatterChart" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { BiaxialChart } from "Charting/Controls/BiaxialChart";
    import { ScatterRenderer } from "Charting/ScatterRenderer";
    import { ScatterType } from "Charting/ScatterType";
    import { Series } from "Charting/Series";
    /**
    * @class A control used to draw scatter charts.
    * @property {ObservableCollection<Series>} series BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
    * @property {ScatterType} shape Gets or sets the type of scatter shapes.
    * @property {Number} shapeSize Gets or sets the size of scatter shapes.
    */
    export class ScatterChart extends BiaxialChart {
        /**
         * Initializes a new instance of the ScatterChart class.
         * @param {HTMLCanvasElement} element The canvas DOM element to associate this chart with.
         * @param {ScatterRenderer} [seriesRenderer] A ScatterRenderer used to draw chart's data series.
         */
        constructor(element: HTMLCanvasElement, seriesRenderer?: ScatterRenderer);
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        get series(): ObservableCollection<Series>;
        /**
         * BiaxialChart.Series override. Gets or sets the list of series whose data is drawn in this chart.
         */
        set series(value: ObservableCollection<Series>);
        /**
         * Gets or sets the type of scatter shapes.
         */
        get shape(): ScatterType;
        /**
         * Gets or sets the type of scatter shapes.
         */
        set shape(value: ScatterType);
        /**
         * Gets or sets the size of scatter shapes.
         */
        get shapeSize(): number;
        /**
         * Gets or sets the size of scatter shapes.
         */
        set shapeSize(value: number);
        fromJson(json: string): void;
        toJson(): string;
    }
}
declare module "Charting/Controls/Controls" {
    /**
    * @namespace MindFusion.Charting.Controls
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export { Dashboard } from "Charting/Controls/Dashboard";
    export { Chart } from "Charting/Controls/Chart";
    export { BiaxialChart } from "Charting/Controls/BiaxialChart";
    export { BarChart } from "Charting/Controls/BarChart";
    export { LineChart } from "Charting/Controls/LineChart";
    export { PieChart } from "Charting/Controls/PieChart";
    export { TowerChart } from "Charting/Controls/TowerChart";
    export { LayoutBuilder } from "Charting/Controls/LayoutBuilder";
    export { AreaChart } from "Charting/Controls/AreaChart";
    export { BarChart3D } from "Charting/Controls/BarChart3D";
    export { BubbleChart } from "Charting/Controls/BubbleChart";
    export { CandlestickChart } from "Charting/Controls/CandlestickChart";
    export { FunnelChart } from "Charting/Controls/FunnelChart";
    export { RadarChart } from "Charting/Controls/RadarChart";
    export { ScatterChart } from "Charting/Controls/ScatterChart";
}
declare module "Charting/LoadOrder" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export * as Commands from "Charting/Commands/Commands";
    export * as Gauges from "Charting/Gauges/Gauges";
    export * as ThreeD from "Charting/ThreeD/ThreeD";
    export * as Components from "Charting/Components/Components";
    export * as Controls from "Charting/Controls/Controls";
}
declare module "Charting/Components/Component" {
    import { Rect, Point } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import { Margins } from "Charting/Margins";
    import type { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a user interface component.
    * @property {Number} desiredWidth Gets a nullable number value specifying the component's desired width. Valid only after calling measure.
    * @property {Number} desiredHeight Gets a nullable number value specifying the component's desired height. Valid only after calling measure.
    * @property {Number} actualWidth Gets a number value specifying the component's assigned width. Valid only after calling arrange.
    * @property {Number} actualHeight Gets a number value specifying the component's assigned height. Valid only after calling arrange.
    * @property {Number} xInParent Gets a number value specifying the component's horizontal position relative to its parent.
    * @property {Number} yInParent Gets a number value specifying the component's vertical position relative to its parent.
    * @property {Number} rectInParent Gets the boundaries of this component relative to its parent.
    * @property {Number} gridRow Gets or sets the row index of this component when placed inside a Components.GridPanel.
    * @property {Number} gridColumn Gets or sets the column index of this component when placed inside a Components.GridPanel.
    * @property {Components.LayoutAlignment} horizontalAlignment Gets or sets the horizontal alignment of this component inside the layout rectangle allocated by its parent panel.
    * @property {Components.LayoutAlignment} verticalAlignment Gets or sets the vertical alignment of this component inside the layout rectangle allocated by its parent panel.
    * @property {Margins} margin Gets the margin space around this component relative to the layout rectangle allocated by its parent panel.
    * @property {Components.Visibility} visibility Gets or sets the visibility of this component.
    * @property {Components.HitTestVisibility} hitTestVisibility Gets or sets the hit-test visibility of this component.
    * @property {String} toolTip Gets or sets the component's tooltip text.
    * @property {Number} width Gets or sets a fixed width for this component.
    * @property {Number} height Gets or sets a fixed height for this component.
    */
    export abstract class Component {
        /**
         * Initializes a new instance of the Component class.
         */
        constructor();
        /**
         * Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Sets the location and size of this component relatively to its parent.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Draws this component in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Arranges a child component in specified layout rectangle.
         * @param {Component} child A Component instance specifying the child to arrange.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @param {Number} x Layout rectangle's horizontal position.
         * @param {Number} y Layout rectangle's vertical position.
         * @param {Number} w Layout rectangle's width.
         * @param {Number} h Layout rectangle's height.
         */
        arrangeInRect(child: Component, context: RenderContext, x: number, y: number, w: number, h: number): void;
        /**
         * Returns a Components.ComponentController used to interact with this component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} Instance of a Components.ComponentController -derived class.
         */
        createController(context: RenderContext): Components.ComponentController;
        /**
         * Invoked while the mouse is moved to let your application set the mouse cursor.
         * @param {Number} x A double value specifying the horizontal position of mouse pointer.
         * @param {Number} y A double value specifying the vertical position of mouse pointer.
         * @returns {Components.CursorHint} A member of the Components.CursorHint enumeration.
         */
        getCursorHint(x: number, y: number): Components.CursorHint;
        /**
         * Sums specified nullable number values.
         * @param {Number} value1 The first term to sum.
         * @param {Number} value2 The second term to sum.
         * @returns {Number} A nullable number value representing the sum.
         */
        add(value1?: number, value2?: number): number;
        /**
         * Returns the larger of specified values.
         * @param {Number} value1 The first value to compare.
         * @param {Number} value2 The second value to compare.
         * @returns {Number} A nullable number value representing the larger value.
         */
        max(value1?: number, value2?: number): number;
        /**
         * Implements the visitor design pattern.
         * @param {Components.ComponentVisitor} visitor An instance of a Components.ComponentVisitor -derived class.
         */
        visit(visitor: Components.ComponentVisitor): void;
        /**
         * Returns the component containing specified point.
         * @param {Number} x X coordinate of the point to test.
         * @param {Number} y Y coordinate of the point to test.
         * @returns {Component} A Component instance if one contains the point, or null otherwise.
         */
        hitTest(x: number, y: number): Component;
        localToParent(point: Point): Point;
        parentToLocal(point: Point): Point;
        /**
         * Transforms the specified point to the coordinate system of the root panel.
         * @param {Point} point A Point instance containing coordinates local to this component.
         * @returns {Point} A Point instance containing coordinates relative to the root panel.
         */
        localToRoot(point: Point): Point;
        /**
         * Transforms the specified point to the coordinate system of this component.
         * @param {Point} point A Point instance containing coordinates relative to the root panel.
         * @returns {Point} A Point instance containing coordinates local to this component.
         */
        rootToLocal(point: Point): Point;
        /**
         * Invalidates the current layout and runs a new layout pass before next draw operation.
         */
        invalidateLayout(): void;
        /**
         * Invalidates the appearance of this component and calls its Draw method at next draw operation.
         * @param {Rect} [rect] A RectD instance specifying the invalid rectangle.
         */
        invalidate(rect?: Rect): void;
        /**
         * Gets a nullable number value specifying the component's desired width. Valid only after calling Measure.
         */
        get desiredWidth(): number;
        /**
         * Sets a nullable number value specifying the component's desired width. Valid only after calling Measure.
         */
        set desiredWidth(value: number);
        private m_desiredWidth;
        /**
         * Gets a nullable number value specifying the component's desired height. Valid only after calling Measure.
         */
        get desiredHeight(): number;
        /**
         * Sets a nullable number value specifying the component's desired height. Valid only after calling Measure.
         */
        set desiredHeight(value: number);
        private m_desiredHeight;
        /**
         * TGets a number value specifying the component's assigned width. Valid only after calling Arrange.
         */
        get actualWidth(): number;
        /**
         * Sets a number value specifying the component's assigned width. Valid only after calling Arrange.
         */
        set actualWidth(value: number);
        private m_actualWidth;
        /**
         * Gets a number value specifying the component's assigned height. Valid only after calling Arrange.
         */
        get actualHeight(): number;
        /**
         * Sets a number value specifying the component's assigned height. Valid only after calling Arrange.
         */
        set actualHeight(value: number);
        private m_actualHeight;
        /**
         * Gets a number value specifying the component's horizontal position relative to its parent.
         */
        get xInParent(): number;
        /**
         * Sets a number value specifying the component's horizontal position relative to its parent.
         */
        set xInParent(value: number);
        private m_xInParent;
        /**
         * A number value specifying the component's vertical position relative to its parent.
         */
        get yInParent(): number;
        /**
         * A number value specifying the component's vertical position relative to its parent.
         */
        set yInParent(value: number);
        private m_yInParent;
        /**
         * Gets the boundaries of this component relative to its parent.
         */
        get rectInParent(): Rect;
        private m_gridRow;
        /**
         * Gets or sets the row index of this component when placed inside a Components.GridPanel.
         */
        get gridRow(): number;
        /**
         * Gets or sets the row index of this component when placed inside a Components.GridPanel.
         */
        set gridRow(value: number);
        private m_gridColumn;
        /**
         * Gets or sets the column index of this component when placed inside a Components.GridPanel.
         */
        get gridColumn(): number;
        /**
         * Gets or sets the column index of this component when placed inside a Components.GridPanel.
         */
        set gridColumn(value: number);
        get parent(): Component;
        set parent(value: Component);
        private m_parent;
        /**
         * Gets the horizontal alignment of this component inside the
         * layout rectangle allocated by its parent panel.
         */
        get horizontalAlignment(): Components.LayoutAlignment;
        /**
         * Sets the horizontal alignment of this component inside the
         * layout rectangle allocated by its parent panel.
         */
        set horizontalAlignment(value: Components.LayoutAlignment);
        /**
         * Gets the vertical alignment of this component inside the
         * layout rectangle allocated by its parent panel.
         */
        get verticalAlignment(): Components.LayoutAlignment;
        /**
         * Sets the vertical alignment of this component inside the
         * layout rectangle allocated by its parent panel.
         */
        set verticalAlignment(value: Components.LayoutAlignment);
        /**
         * Gets the margin space around this component relative to the
         * layout rectangle allocated by its parent panel.
         */
        get margin(): Margins;
        /**
         * Sets the margin space around this component relative to the
         * layout rectangle allocated by its parent panel.
         */
        set margin(value: Margins);
        /**
         * Gets the visibility of this component.
         */
        get visibility(): Components.Visibility;
        /**
         * Sets the visibility of this component.
         */
        set visibility(value: Components.Visibility);
        /**
         * Gets the hit-test visibility of this component.
         */
        get hitTestVisibility(): Components.HitTestVisibility;
        /**
         * Sets the hit-test visibility of this component.
         */
        set hitTestVisibility(value: Components.HitTestVisibility);
        /**
         * Gets the component's tooltip text.
         */
        get toolTip(): string;
        /**
         * Sets the component's tooltip text.
         */
        set toolTip(value: string);
        private m_toolTip;
        /**
         * Gets a fixed width for this component.
         */
        get width(): number;
        /**
         * Sets a fixed width for this component.
         */
        set width(value: number);
        /**
         * Gets or sets a fixed height for this component.
         */
        get height(): number;
        /**
         * Gets or sets a fixed height for this component.
         */
        set height(value: number);
        desiredWidthMargins(): number;
        desiredHeightMargins(): number;
        effectiveMeasuredWidth(): number;
        effectiveMeasuredHeight(): number;
        m_id: number;
        id(): number;
        fromJson(obj: any): any;
        toJson(): any;
        private m_horizontalAlignment;
        private m_verticalAlignment;
        private m_margin;
        private m_visibility;
        private m_hitTestVisibility;
        private m_width;
        private m_height;
    }
}
declare module "Charting/Components/BorderComponent" {
    import { Brush } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import type { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a border UI component.
    * @property {Component} content Gets or sets the Component displayed inside this border.
    * @property {Number} padding Gets or sets the padding space between this border and its Content.
    * @property {Number} borderThickness Gets or sets the border thickness.
    * @property {Brush} borderBrush Gets or sets the Brush used to draw the border outlines.
    */
    export class BorderComponent extends Components.Component {
        /**
         * Initializes a new instance of the BorderComponent class.
         */
        constructor();
        /**
         * Component.Measure override. Measures the desired size of this border and its Content.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Component.Arrange override. Sets the location and size of this border and arranges its Content.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Component.Draw override. Draws this border in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Gets or sets the Component displayed inside this border.
         */
        get content(): Components.Component;
        /**
         * Gets or sets the Component displayed inside this border.
         */
        set content(value: Components.Component);
        /**
         * Gets or sets the padding space between this border and its Content.
         */
        get padding(): number;
        /**
         * Gets or sets the padding space between this border and its Content.
         */
        set padding(value: number);
        /**
         * Gets or sets the border thickness.
         */
        get borderThickness(): number;
        /**
         * Gets or sets the border thickness.
         */
        set borderThickness(value: number);
        /**
         * Gets or sets the Brush used to draw the border outlines.
         */
        get borderBrush(): Brush;
        /**
         * Gets or sets the Brush used to draw the border outlines.
         */
        set borderBrush(value: Brush);
        private m_content;
        private m_padding;
        private m_cornerRadiusTopLeft;
        private m_cornerRadiusTopRight;
        private m_cornerRadiusBottomLeft;
        private m_cornerRadiusBottomRight;
        private m_borderThickness;
        private m_borderBrush;
    }
}
declare module "Charting/Components/ButtonComponent" {
    /**
    * @namespace MindFusion.Charting.Components
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
    import { EventDispatcher } from '@mindfusion/common';
    import { Components } from "Charting/LoadOrder";
    import type { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a button UI component.
    * @property {Components.Component} content Gets or sets the Components.Component displayed inside this border.
    * @property {Number} padding Gets or sets the padding space between this border and its Content.
    */
    export class ButtonComponent extends Components.Component {
        /**
         * Initializes a new instance of the ButtonComponent class.
         */
        constructor();
        /**
         * Components.Component.Measure override. Measures the desired size of this button.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Arrange override. Sets the location and size of this button relatively to its parent.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Components.Component.Draw override. Draws this button in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Components.Component.CreateController override. Returns a controller used to interact with this button.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} Instance of a Components.ComponentController -derived class.
         */
        createController(context: RenderContext): Components.ComponentController;
        raiseClicked(): void;
        /**
         * Raises the Clicked event.
         * @param {EventArgs} e An instance of the EventArgs class.
         */
        onClicked(e: EventArgs): void;
        /**
         * Raises the CustomDraw event.
         * @param {Components.ButtonDrawEventArgs} e An instance of the Components.ButtonDrawEventArgs class.
         */
        onCustomDraw(e: Components.ButtonDrawEventArgs): void;
        /**
         * Raised when the user clicks on this button.
         * @event ButtonComponent.clicked
         * @type {EventDispatcher}
         * @property {ButtonComponent} sender
         * @property {EventArgs} args
         */
        get clicked(): EventDispatcher<EventArgs>;
        private m_clicked;
        /**
         * Raised to let you custom-draw button graphics.
         * @event ButtonComponent.customDraw
         * @type {Components.ButtonDrawEventDispatcher}
         * @property {ButtonComponent} sender
         * @property {Components.ButtonDrawEventArgs} args
         */
        get customDraw(): Components.ButtonDrawEventDispatcher;
        private m_customDraw;
        /**
         * Gets or sets the content displayed inside this button.
         */
        get content(): Components.Component;
        /**
         * Gets or sets the content displayed inside this button.
         */
        set content(value: Components.Component);
        /**
         * Gets or sets the padding space between button's content and its borders.
         */
        get padding(): number;
        /**
         * Gets or sets the padding space between button's content and its borders.
         */
        set padding(value: number);
        get isPressed(): boolean;
        set isPressed(value: boolean);
        private m_content;
        private m_padding;
        private m_isPressed;
    }
}
declare module "Charting/Components/ComponentController" {
    /**
    * @namespace MindFusion.Charting.Components
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Components } from "Charting/LoadOrder";
    import { Graphics } from "@mindfusion/drawing";
    /**
     * @class Defines the interface that controller classes should implement
     * to get user input from the Dashboard control.
     */
    export interface ComponentController {
        /**
         * Called when the user presses a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseDown(x: number, y: number): void;
        /**
         * Called when the user moves the mouse.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseMove(x: number, y: number): void;
        /**
         * Called when the user releases a mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         */
        onMouseUp(x: number, y: number): void;
        /**
         * Called when the user scrolls with the middle mouse button.
         * @param {Number} x A number value specifying the horizontal position of mouse pointer.
         * @param {Number} y A number value specifying the vertical position of mouse pointer.
         * @param {Number} delta A number value specifying the amount and the direction for the mouse scroll.
         */
        onMouseWheel(x: number, y: number, delta: number): void;
        /**
         * Draws a representation of the current state of user interaction on specified Graphics surface.
         * @param {Graphics} graphics A Graphics instance.
         */
        drawInteraction(graphics: Graphics): void;
        /**
         * Invoked while the mouse is moved to let your application set the mouse cursor.
         * @param {Number} x A double value specifying the horizontal position of mouse pointer.
         * @param {Number} y A double value specifying the vertical position of mouse pointer.
         * @returns {Components.CursorHint} A member of the Components.CursorHint enumeration.
         */
        getCursorHint(x: number, y: number): Components.CursorHint;
        /**
         * For internal use.
         * @returns {Components.ComponentAnimation} An instance of a Components.ComponentAnimation -derived class.
         */
        getRunningAnimation(): Components.ComponentAnimation;
        /**
         * Gets the component modified by this ComponentController.
         */
        component: Components.Component;
    }
}
declare module "Charting/Components/ComponentAnimation" {
    /**
    * @namespace MindFusion.Charting.Components
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
     * @class Represents an animation.
     */
    export interface ComponentAnimation {
        /**
         * Stops this animation.
         */
        stop(): void;
    }
}
declare module "Charting/Components/ComponentVisitor" {
    import { Components } from "Charting/LoadOrder";
    import type { Plot } from "Charting/Plot";
    /**
     * @class Defines the base visitor class for hierarchy of Component objects.
     */
    export class ComponentVisitor {
        constructor();
        /**
         * Visits a Panel component.
         * @param panel A Panel instance.
         */
        visitPanel(panel: Components.Panel): void;
        /**
         * Visits a Plot component.
         * @param {Plot} plot A Plot instance.
         */
        visitPlot(plot: Plot): void;
    }
}
declare module "Charting/Components/LayoutAlignment" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Indicates how child components are aligned within the layout rectangle
    * allocated to them by their parent component.
    * @enum
    * @name LayoutAlignment
    * @param [Near] Align the child component to the left or top side.
    * @param [Center] Center the child component.
    * @param [Far] Align the child component to the right or bottom side.
    * @param [Stretch] Stretch the child component.
    */
    export enum LayoutAlignment {
        /**
         * Align the child component to the left or top side.
         */
        Near = 0,
        /**
         * Center the child component.
         */
        Center = 1,
        /**
         * Align the child component to the right or bottom side.
         */
        Far = 2,
        /**
         * Stretch the child component.
         */
        Stretch = 3
    }
}
declare module "Charting/Components/Visibility" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Identifies visibility of components.
    * @enum
    * @name Visibility
    * @param [Hidden] The component is hidden but participates in layout measurements.c
    * @param [Collapsed] The component is hidden and does not participate in layout measurements.
    * @param [Visible] The component is visible.
    */
    export enum Visibility {
        /**
        * The component is hidden but participates in layout measurements.
        */
        Hidden = 0,
        /**
        * The component is hidden and does not participate in layout measurements.
        */
        Collapsed = 1,
        /**
        * The component is visible.
        */
        Visible = 2
    }
}
declare module "Charting/Components/CursorHint" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Specifies what mouse cursor to display while a user interacts with the control.
    * @enum
    * @name CursorHint
    * @param [Move] Indicates the cursor specified by the MoveCursor property.
    * @param [Rotate] Indicates the cursor specified by the RotateCursor property.
    * @param [HorizontalResize] Indicates the cursor specified by the HorizontalResizeCursor property.
    * @param [VerticalResize] Indicates the cursor specified by the VerticalResize property.
    * @param [DiagonalResize] Indicates the cursor specified by the DiagonalResize property.
    * @param [CounterDiagonalResize] Indicates the cursor specified by the CounterDiagonalResize property.
    * @param [Pointer] Indicates the cursor specified by the PointerCursor property.
    * @param [Disallow] Indicates the cursor specified by the DisallowCursor property.
    * @param [DontChange] Indicates the cursor specified by the Cursor property.
    */
    export enum CursorHint {
        /**
         * Indicates the cursor specified by the MoveCursor property.
         */
        Move,
        /**
         * Indicates the cursor specified by the RotateCursor property.
         */
        Rotate,
        /**
        * Indicates the cursor specified by the HorizontalResizeCursor property.
        */
        HorizontalResize,
        /**
         * Indicates the cursor specified by the VerticalResizeCursor property.
         */
        VerticalResize,
        /**
        * Indicates the cursor specified by the DiagonalResizeCursor property.
        */
        DiagonalResize,
        /**
         * Indicates the cursor specified by the CounterDiagonalResizeCursor property.
         */
        CounterDiagonalResize,
        /**
        * Indicates the cursor specified by the PointerCursor property.
        */
        Pointer,
        /**
         * Indicates the cursor specified by the DisallowCursor property.
         */
        NotAllowed,
        /**
        * Indicates the cursor specified by the Cursor property.
        */
        DontChange,
        /**
        * Indicates the default browser cursor
        */
        Default
    }
}
declare module "Charting/Components/LengthType" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Indicates how GridPanel determines dimensions of its rows and columns.
    * @enum
    * @name LengthType
    * @param [Auto] The row or column is auto-sized to fit its child components.
    * @param [Relative] The size of relative elements is calculated from available space in the GridPanel proportionally to the number of other relative elements.
    */
    export enum LengthType {
        /**
        * The row or column is auto-sized to fit its child components.
        */
        Auto = 0,
        /**
        * The size of relative elements is calculated from available space in the GridPanel
        * proportionally to the number of other relative elements.
        */
        Relative = 1
    }
}
declare module "Charting/Components/Orientation" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Identifies layout orientation.
    * @enum
    * @name Orientation
    * @param [Horizontal] Horizontal orientation.
    * @param [Vertical] Vertical orientation.
    */
    export enum Orientation {
        /**
         * Horizontal orientation.
         */
        Horizontal = 0,
        /**
         * Vertical orientation.
         */
        Vertical = 1
    }
}
declare module "Charting/Components/HitTestVisibility" {
    /**
    * @namespace MindFusion.Charting.Components
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
    * Identifies hit-test visibility of a component.
    * @enum
    * @name HitTestVisibility
    * @param [HitTestVisibility] Do not participate in hit-testing.
    * @param [Children] Only hit-test child components.
    * @param [SelfAndChildren] Hit-test this component and its children.
    */
    export enum HitTestVisibility {
        /**
         * Do not participate in hit-testing.
         */
        Hidden = 0,
        /**
         * Only hit-test child components.
         */
        Children = 1,
        /**
         * Hit-test this component and its children.
         */
        SelfAndChildren = 2
    }
}
declare module "Charting/Components/RootControl" {
    /**
    * @namespace MindFusion.Charting.Components
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { Rect } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    /**
     * @class Interface used to communicate with host DOM element.
     */
    export interface RootControl {
        /**
         * Invalidates the specified region of a component.
         * @param rect The area to invalidate and redraw.
         * @param panel The reference Components.Component.
         */
        invalidate(rect: Rect, panel: Components.Component): void;
        /**
         * Invalidates layout of specified component.
         * @param panel The component to invalidate.
         */
        invalidateLayout(panel: Components.Component): void;
    }
}
declare module "Charting/Components/Panel" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { Rect, Size } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    import { ComponentVisitor } from "Charting/Components/ComponentVisitor";
    import { RootControl } from "Charting/Components/RootControl";
    /**
    * @class Represents a component that contains multiple child components and manages their layout.
    * @property {ObservableCollection<Component>} children Gets the list of child components of this panel.
    * @property {RootControl} parentControl Gets or sets a reference to the control containing this panel.
    */
    export class Panel extends Components.Component {
        /**
         * Initializes a new instance of the Panel class.
         */
        constructor();
        /**
         * Component.Draw override. Draws child components in specified RenderContext.
         * @param context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        /**
         * Component.Measure override. Measures the desired size of this panel and its child components.
         * @param maxWidth The maximum width provided by parent component.
         * @param maxHeight The maximum height provided by parent component.
         * @param context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Component.Visit override. Implements the visitor design pattern.
         * @param visitor An instance of a ComponentVisitor -derived class.
         */
        visit(visitor: ComponentVisitor): void;
        /**
         * Component.HitTest override. Returns the component containing specified point.
         * @param {Number} x X coordinate of the point to test.
         * @param {Number} y Y coordinate of the point to test.
         * @returns {Component} A Component instance if one contains the point, or null otherwise.
         */
        hitTest(x: number, y: number): Components.Component;
        /**
         * Component.Invalidate override. Invalidates the appearance
         * of this panel and calls its Draw method at next draw operation.
         * @param {Rect} [rect] A Rect instance specifying the invalid rectangle.
         */
        invalidate(rect?: Rect): void;
        /**
         * Component.InvalidateLayout override. Invalidates the current layout
         * and runs a new layout pass before next draw operation.
         */
        invalidateLayout(): void;
        private onChildrenCollectionChanged;
        measureChild(child: Components.Component, maxWidth: number, maxHeight: number, context: RenderContext): Size;
        /**
        * Gets the list of child components of this panel.
        */
        get children(): ObservableCollection<Components.Component>;
        private m_children;
        /**
         * Gets or sets a reference to the control containing this panel.
         */
        get parentControl(): RootControl;
        /**
         * Gets or sets a reference to the control containing this panel.
         */
        set parentControl(value: RootControl);
        private m_parentControl;
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Components/SimplePanel" {
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    /**
     * @class Represents a layout panel that arranges its child components over each other.
     */
    export class SimplePanel extends Components.Panel {
        constructor();
        /**
         * Components.Panel.Measure override. Measures the desired size of this panel and its child components.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Arrange override. Sets the location and size
         * of this panel and arranges its child components.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
    }
}
declare module "Charting/Components/StackPanel" {
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a layout panel that arranges its child components in a stack.
    * @property {Components.Orientation} orientation Gets or sets the stack orientation.
    */
    export class StackPanel extends Components.Panel {
        constructor();
        /**
         * Components.Panel.Measure override. Measures the desired size of this panel and its child components.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Arrange override. Sets the location and size
         * of this panel and arranges its child components.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        private m_orientation;
        /**
         * Gets or sets the stack orientation.
         */
        get orientation(): Components.Orientation;
        /**
         * Gets or sets the stack orientation.
         */
        set orientation(value: Components.Orientation);
        private primaryMeasure;
        private secondaryMeasure;
        private primarySize;
        private secondarySize;
        private arrangeChild;
        private setMeasures;
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Components/ImageComponent" {
    import { ImageAlign } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a component that draws a bitmap image.
    * @property {String} location Gets or sets Image by its file location.
    * @property {Boolean} autoSize Gets or sets a value indicating whether the component should auto-size to match the dimensions of its Image.
    * @property {ImageAlign} imageAlign Gets or sets the image alignment relative to the component.
    */
    export class ImageComponent extends Components.Component {
        /**
         * Initializes a new instance of the ImageComponent class.
         */
        constructor();
        /**
         * Components.Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        private loadImage;
        /**
         * Components.Component.Draw override. Draws associated Image in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        private m_image;
        private m_location;
        /**
         * Gets or sets Image by its file location.
         */
        get location(): string;
        /**
         * Gets or sets Image by its file location.
         */
        set location(value: string);
        private m_autoSize;
        /**
         * Gets or sets a value indicating whether the component
         * should auto-size to match the dimensions of its Image.
         */
        get autoSize(): boolean;
        /**
         * Gets or sets a value indicating whether the component
         * should auto-size to match the dimensions of its Image.
         */
        set autoSize(value: boolean);
        private m_imageAlign;
        /**
         * Gets or sets the image alignment relative to the component.
         */
        get imageAlign(): ImageAlign;
        /**
         * Gets or sets the image alignment relative to the component.
         */
        set imageAlign(value: ImageAlign);
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Components/GridPanel" {
    import { List } from '@mindfusion/common-collections';
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    /**
    * @class Represents a layout panel that arranges its child components in a grid.
    * @property {List<Components.GridRow>} rows Gets or sets a list of Components.GridRow objects specifying row attributes.
    * @property {List<Components.GridColumn>} columns Gets or sets a list of Components.GridColumn objects specifying column attributes.
    */
    export class GridPanel extends Components.Panel {
        /**
         * Initializes a new instance of the GridPanel class.
         */
        constructor();
        /**
         * Components.Panel.Measure override. Measures the desired size of this panel and its child components.
         * @param maxWidth The maximum width provided by parent component.
         * @param maxHeight The maximum height provided by parent component.
         * @param context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        private assignCoords;
        /**
         * Component.Arrange override. Sets the location and size
         * of this panel and arranges its child components.
         * @param x A number value specifying horizontal position.
         * @param y A number value specifying vertical position.
         * @param w A number value specifying the component's width.
         * @param h A number value specifying the component's height.
         * @param context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Gets or sets a list of Components.GridRow objects specifying row attributes.
         */
        get rows(): List<Components.GridRow>;
        /**
         * Gets or sets a list of Components.GridRow objects specifying row attributes.
         */
        set rows(value: List<Components.GridRow>);
        private m_rows;
        /**
         * Gets or sets a list of Components.GridColumn objects specifying column attributes.
         */
        get columns(): List<Components.GridColumn>;
        /**
         * Gets or sets a list of Components.GridColumn objects specifying column attributes.
         */
        set columns(value: List<Components.GridColumn>);
        private m_columns;
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Components/GridRow" {
    import { Components } from "Charting/LoadOrder";
    /**
    * @class Represents a row in a GridPanel.
    * @property {Components.LengthType} lengthType Gets or sets the row's sizing mode.
    * @property {Number} height Gets or sets fixed height for this row.
    */
    export class GridRow implements Components.AutoSize {
        constructor();
        /**
         * Returns the row's measured height.
         * @return A number value representing the row's height.
         */
        measuredSize(): number;
        /**
         * Sets the row's position.
         * @param value Y coordinate of the row.
         */
        setPos(value: number): void;
        /**
         * Gets or sets the row's sizing mode.
         */
        get lengthType(): Components.LengthType;
        /**
         * Gets or sets the row's sizing mode.
         */
        set lengthType(value: Components.LengthType);
        private m_lengthType;
        /**
         * Gets whether the row should be sized relatively to other rows in the grid panel.
         * @return true to apply relative size to this row, or false otherwise.
         */
        relativeSize(): boolean;
        /**
         * Gets or sets fixed height for this row.
         */
        get height(): number;
        /**
         * Gets or sets fixed height for this row.
         */
        set height(value: number);
        private m_height;
        get yInParent(): number;
        set yInParent(value: number);
        private m_yInParent;
        get measuredHeight(): number;
        set measuredHeight(value: number);
        private m_measuredHeight;
        fromJson(obj: any): any;
        toJson(): any;
    }
}
declare module "Charting/Components/GridColumn" {
    import { Components } from "Charting/LoadOrder";
    /**
    * @class Represents a column in a GridPanel.
    * @property {Components.LengthType} lengthType Gets or sets the column's sizing mode.
    * @property {Number} width Gets or sets fixed width for this column.
    */
    export class GridColumn implements Components.AutoSize {
        constructor();
        /**
         * Returns the column's measured width.
         * @returns {Number} A number value representing the column's width.
         */
        measuredSize(): number;
        /**
         * Sets the column's position.
         * @param {Number} value X coordinate of the column.
         */
        setPos(value: number): void;
        /**
         * Gets or sets the column's sizing mode.
         */
        get lengthType(): Components.LengthType;
        /**
         * Gets or sets the column's sizing mode.
         */
        set lengthType(value: Components.LengthType);
        private m_lengthType;
        /**
         * Gets whether the column should be sized relatively to other columns in the grid panel.
         * @returns {Boolean} true to apply relative size to this column, or false otherwise.
         */
        relativeSize(): boolean;
        /**
         * Gets or sets fixed width for this column.
         */
        get width(): number;
        /**
         * Gets or sets fixed width for this column.
         */
        set width(value: number);
        private m_width;
        get xInParent(): number;
        set xInParent(value: number);
        private m_xInParent;
        get measuredWidth(): number;
        set measuredWidth(value: number);
        private m_measuredWidth;
        fromJson(obj: any): any;
        toJson(): any;
    }
}
declare module "Charting/Components/RangeSelector" {
    import { StringAlignment, Brush } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import type { SeriesContainer } from "Charting/SeriesContainer";
    import type { RenderContext } from "Charting/RenderContext";
    import type { Axis } from "Charting/Axis";
    /**
    * @class Represents a control that handles zooming and scrolling of axes.
    * @property {Axis} axis Gets or sets the Axis that will be handled by this component.
    * @property {Number} minValue Gets or sets the smallest value of the displayed range.
    * @property {Number} maxValue Gets or sets the largest value of the displayed range.
    * @property {Number} size Gets or sets the width or height of the component.
    * @property {Number} handleSize Gets or sets the width or height of resize handles.
    * @property {Brush} brush Gets or sets the Brush used to paint the component's background.
    * @property {Brush} thumbBrush Gets or sets the Brush used to paint the thumb.
    * @property {Brush} handleBrush Gets or sets the Brush used to paint resize handles.
    * @property {Components.Orientation} orientation Gets or sets the orientation of the component.
    * @property {SeriesContainer} axesSource Gets or sets the object whose Axes will be handled by this component.
    */
    export class RangeSelector extends Components.Component {
        /**
         * Initializes a new instance of the RangeSelector class.
         */
        constructor(axis: Axis, minValue: number, maxValue: number);
        private onAxisPropertyChanged;
        /**
         * Components.Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Arrange override. Sets the location and size of this component relatively to its parent.
         * @param {Number} x A number value specifying horizontal position.
         * @param {Number} y A number value specifying vertical position.
         * @param {Number} w A number value specifying the component's width.
         * @param {Number} h A number value specifying the component's height.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        arrange(x: number, y: number, w: number, h: number, context: RenderContext): void;
        /**
         * Components.Component.Draw override. Draws this component in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        getCursorHint(x: number, y: number): Components.CursorHint;
        private getThumbRect;
        getZoomMode(x: number, y: number): StringAlignment;
        /**
         * Components.Component.CreateController override. Returns a controller used to interact with this component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         * @returns {Components.ComponentController} Instance of a Components.ComponentController -derived class.
         */
        createController(context: RenderContext): Components.ComponentController;
        get effectiveMinValue(): number;
        get effectiveMaxValue(): number;
        /**
        * Gets the object whose Axes will be handled by this component.
        */
        get axesSource(): SeriesContainer;
        /**
         * Gets the object whose Axes will be handled by this component.
         */
        set axesSource(value: SeriesContainer);
        private m_axesSource;
        /**
         * Gets the Axis that will be handled by this component.
         */
        get axis(): Axis;
        /**
         * Sets the Axis that will be handled by this component.
         */
        set axis(value: Axis);
        /**
         * Gets the orientation of the component.
         */
        get orientation(): Components.Orientation;
        /**
         * Sets the orientation of the component.
         */
        set orientation(value: Components.Orientation);
        /**
         * Gets the smallest value of the displayed range.
         */
        get minValue(): number;
        /**
         * Sets the smallest value of the displayed range.
         */
        set minValue(value: number);
        /**
         * Gets the largest value of the displayed range.
         */
        get maxValue(): number;
        /**
         * Sets the largest value of the displayed range.
         */
        set maxValue(value: number);
        /**
         * Gets the width or height of the component.
         */
        get size(): number;
        /**
         * Sets the width or height of the component.
         */
        set size(value: number);
        /**
         * Gets the width or height of resize handles.
         */
        get handleSize(): number;
        /**
         * Sets the width or height of resize handles.
         */
        set handleSize(value: number);
        /**
         * Gets the Brush used to paint the component's background.
         */
        get brush(): Brush;
        /**
         * Sets the Brush used to paint the component's background.
         */
        set brush(value: Brush);
        /**
        * Gets the Brush used to paint the thumb.
        */
        get thumbBrush(): Brush;
        /**
         * Sets the Brush used to paint the thumb.
         */
        set thumbBrush(value: Brush);
        /**
        * Gets the Brush used to paint the resize handles.
        */
        get handleBrush(): Brush;
        /**
         * Sets the Brush used to paint the resize handles.
         */
        set handleBrush(value: Brush);
        private m_axis;
        private m_minValue;
        private m_maxValue;
        private m_orientation;
        private m_size;
        private m_handleSize;
        private m_brush;
        private m_thumbBrush;
        private m_handleBrush;
    }
}
declare module "Charting/Components/TextComponent" {
    import { FontStyle, Brush } from '@mindfusion/drawing';
    import { Components } from "Charting/LoadOrder";
    import { RenderContext } from "Charting/RenderContext";
    import { TextStyleHint } from "Charting/TextStyleHint";
    /**
    * @class Represents a Components.Component that draws text.
    * @property {String} text Gets or sets the text that should be drawn inside this component.
    * @property {String} fontName Gets or sets the name of the font that should be used to draw the component's text.
    * @property {Number} fontSize Gets or sets the size of the font that should be used to draw the component's text.
    * @property {FontStyle} fontStyle Gets or sets the style of the font that should be used to draw the component's text.
    * @property {Brush} textBrush Gets or sets the Brush that should be used to draw the component's text.
    * @property {TextStyleHint} styleHint Gets or sets a value indicating which attribute values this component should inherit from current Theme if its local text appearance properties are not set.
    */
    export class TextComponent extends Components.Component {
        constructor();
        /**
         * Components.Component.Measure override. Measures the desired size of this component.
         * @param {Number} maxWidth The maximum width provided by parent component.
         * @param {Number} maxHeight The maximum height provided by parent component.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        measure(maxWidth: number, maxHeight: number, context: RenderContext): void;
        /**
         * Components.Component.Draw override. Draws associated Text in specified RenderContext.
         * @param {MindFusion.Charting.RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
        private effectiveFont;
        private effectiveBrush;
        private m_text;
        /**
         * Gets or sets the text that should be drawn inside this component.
         */
        get text(): string;
        /**
         * Gets or sets the text that should be drawn inside this component.
         */
        set text(value: string);
        private m_fontName;
        /**
         * Gets or sets the name of the font that should be used to draw the component's text.
         */
        get fontName(): string;
        /**
         * Gets or sets the name of the font that should be used to draw the component's text.
         */
        set fontName(value: string);
        private m_fontSize;
        /**
         * Gets or sets the size of the font that should be used to draw the component's text.
         */
        get fontSize(): number;
        /**
         * Gets or sets the size of the font that should be used to draw the component's text.
         */
        set fontSize(value: number);
        private m_fontStyle;
        /**
         * Gets or sets the style of the font that should be used to draw the component's text.
         */
        get fontStyle(): FontStyle;
        /**
         * Gets or sets the style of the font that should be used to draw the component's text.
         */
        set fontStyle(value: FontStyle);
        private m_textBrush;
        /**
         * Gets or sets the Brush that should be used to draw the component's text.
         */
        get textBrush(): Brush;
        /**
         * Gets or sets the Brush that should be used to draw the component's text.
         */
        set textBrush(value: Brush);
        private m_styleHint;
        /**
         * Gets or sets a value indicating which attribute values this component should inherit
         * from current Theme if its local text appearance properties are not set.
         */
        get styleHint(): TextStyleHint;
        /**
         * Gets or sets a value indicating which attribute values this component should inherit
         * from current Theme if its local text appearance properties are not set.
         */
        set styleHint(value: TextStyleHint);
        fromJson(json: string): any;
        toJson(): any;
    }
}
declare module "Charting/Components/ButtonDrawEventArgs" {
    /**
    * @namespace MindFusion.Charting.Components
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
    import { Rect, Graphics } from '@mindfusion/drawing';
    import { EventDispatcher } from '@mindfusion/common';
    /**
     * @class Contains arguments passed to the CustomDraw event of buttons.
    * @property {Graphics} graphics Gets the Graphics surface where the event handler should draw.
    * @property {Rect} clipBounds Gets the current clip rectangle.
     */
    export class ButtonDrawEventArgs extends EventArgs {
        constructor(graphics: Graphics, clipBounds: Rect);
        /**
         * Gets the Graphics surface where the event handler should draw.
         */
        get graphics(): Graphics;
        /**
         * Gets the Graphics surface where the event handler should draw.
         */
        set graphics(value: Graphics);
        private m_graphics;
        /**
         * Gets the current clip rectangle.
         */
        get clipBounds(): Rect;
        /**
         * Gets the current clip rectangle.
         */
        set clipBounds(value: Rect);
        private m_clipBounds;
    }
    /**
    * @class Represents a dispatcher for ButtonDraw events.
    */
    export class ButtonDrawEventDispatcher extends EventDispatcher<ButtonDrawEventArgs> {
    }
}
declare module "Charting/Components/Components" {
    /**
    * @namespace MindFusion.Charting.Components
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export { AutoSize } from "Charting/Components/AutoSize";
    export { Component } from "Charting/Components/Component";
    export { BorderComponent } from "Charting/Components/BorderComponent";
    export { ButtonComponent } from "Charting/Components/ButtonComponent";
    export { ComponentController } from "Charting/Components/ComponentController";
    export { ComponentAnimation } from "Charting/Components/ComponentAnimation";
    export { ComponentVisitor } from "Charting/Components/ComponentVisitor";
    export { LayoutAlignment } from "Charting/Components/LayoutAlignment";
    export { Visibility } from "Charting/Components/Visibility";
    export { CursorHint } from "Charting/Components/CursorHint";
    export { LengthType } from "Charting/Components/LengthType";
    export { Orientation } from "Charting/Components/Orientation";
    export { Panel } from "Charting/Components/Panel";
    export { SimplePanel } from "Charting/Components/SimplePanel";
    export { StackPanel } from "Charting/Components/StackPanel";
    export { RootControl } from "Charting/Components/RootControl";
    export { ImageComponent } from "Charting/Components/ImageComponent";
    export { GridPanel } from "Charting/Components/GridPanel";
    export { GridRow } from "Charting/Components/GridRow";
    export { GridColumn } from "Charting/Components/GridColumn";
    export { RangeSelector } from "Charting/Components/RangeSelector";
    export { TextComponent } from "Charting/Components/TextComponent";
    export { HitTestVisibility } from "Charting/Components/HitTestVisibility";
    export { ButtonDrawEventArgs, ButtonDrawEventDispatcher } from "Charting/Components/ButtonDrawEventArgs";
}
declare module "Charting/AreaStackRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { StackRenderer } from "Charting/StackRenderer";
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    /**
     * @class A SeriesRenderer that draws stacked areas in its containing plot.
     */
    export class AreaStackRenderer extends StackRenderer {
        /**
         * Initializes a new instance of the AreaStackRenderer class.
         * @param {ObservableCollection<Series>} series A list of Series that should be rendered as stacked areas.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
    }
}
declare module "Charting/BarSeries" {
    import { List } from '@mindfusion/common-collections';
    import { LabelKinds } from "Charting/LabelKinds";
    import { SimpleSeries } from "Charting/SimpleSeries";
    /**
    * @class Represents one-dimensional series defined by e list of data values
    * and several lists of labels.
    * @property {LabelKinds} supportedLabels SimpleSeries.SupportedLabels override. Returns a combination of InnerLabel, OuterLabel and XAxisLabel.
    * @property {List<String>} innerLabels Gets or sets the inner labels.
    * @property {List<String>} topLabels Gets or sets the top labels.
    * @property {List<String>} xAxisLabels Gets or sets the X axis labels.
    */
    export class BarSeries extends SimpleSeries {
        /**
         * Initializes a new instance of the BarSeries class.
         * @param {List<Number> | Array<Nuber>} values A list of data values.
         * @param {List<String> | Array<String>} innerLabels A list of inner labels.
         * @param {List<String> | Array<String>} [topLabels] A list of top labels.
         * @param {List<String> | Array<String>} [xAxisLabels] A list of X axis labels.
         */
        constructor(values: List<number> | Array<number>, innerLabels: List<string> | Array<string>, topLabels?: List<string> | Array<string>, xAxisLabels?: List<string> | Array<string>);
        /**
         * SimpleSeries.GetLabel override. Returns an element of a labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Gets or sets the inner labels.
         */
        get innerLabels(): List<string>;
        /**
         * Gets or sets the inner labels.
         */
        set innerLabels(value: List<string>);
        /**
         * Gets or sets the top labels.
         */
        get topLabels(): List<string>;
        /**
         * Gets or sets the top labels.
         */
        set topLabels(value: List<string>);
        /**
         * Gets or sets the X axis labels.
         */
        get xAxisLabels(): List<string>;
        /**
         * Gets or sets the X axis labels.
         */
        set xAxisLabels(value: List<string>);
        fromJson(obj: any): void;
        toJson(): any;
        private m_topLabels;
        private m_xAxisLabels;
    }
}
declare module "Charting/CandlestickSeriesStyle" {
    import { Brush, DashStyle } from '@mindfusion/drawing';
    import { CandlestickRenderer } from "Charting/CandlestickRenderer";
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
    * @class Defines appearance attributes for candlestick charts.
    * @property {Brush} risingBrush Gets or sets a Brush used to fill candlesticks, which open value is smaller or equal to its close value.
    * @property {Brush} fallingBrush Gets or sets a Brush used to fill candlesticks, which open value is greater than its close value.
    */
    export class CandlestickSeriesStyle implements SeriesStyle {
        /**
         * Initializes a new instance of CandlestickSeriesStyle.
         */
        constructor(risingBrush: Brush, fallingBrush: Brush, stroke: Brush, strokeThickness: number, strokeDashStyle: DashStyle, renderer: CandlestickRenderer);
        /**
         * Implements SeriesStyle.Fill. Returns a Brush instance, depending on the series data.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Implements SeriesStyle.Stroke.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Implements SeriesStyle.StrokeThickness.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable number value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Implements SeriesStyle.StrokeDashStyle.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): DashStyle;
        /**
         * Gets or sets a Brush used to fill candlesticks, which open value is smaller or equal to its close value.
         */
        get risingBrush(): Brush;
        /**
         * Gets or sets a Brush used to fill candlesticks, which open value is smaller or equal to its close value.
         */
        set risingBrush(value: Brush);
        private m_risingBrush;
        /**
         * Gets or sets a Brush used to fill candlesticks, which open value is greater than its close value.
         */
        get fallingBrush(): Brush;
        /**
         * Gets or sets a Brush used to fill candlesticks, which open value is greater than its close value.
         */
        set fallingBrush(value: Brush);
        private m_fallingBrush;
        private m_stroke;
        private m_strokeThickness;
        private m_strokeDashStyle;
        private renderer;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/CurveAreaStackRenderer" {
    import { ObservableCollection } from '@mindfusion/common-collections';
    import { StackRenderer } from "Charting/StackRenderer";
    import { RenderContext } from "Charting/RenderContext";
    import { Series } from "Charting/Series";
    /**
     * @class A SeriesRenderer that draws stacked areas in its containing plot.
     */
    export class CurveAreaStackRenderer extends StackRenderer {
        /**
         * Initializes a new instance of the CurveAreaStackRenderer class.
         * @param {Charting.ObservableCollection<Series>} series A list of Series that should be rendered as stacked areas.
         */
        constructor(series: ObservableCollection<Series>);
        /**
         * SeriesRenderer.Draw override. Draws the series data in specified RenderContext.
         * @param {RenderContext} context A RenderContext instance.
         */
        draw(context: RenderContext): void;
    }
}
declare module "Charting/DateTimeSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    import { DateTimeFormat } from "Charting/DateTimeFormat";
    /**
    * @class Represents a series that contains Date values as X coordinates and number values as Y coordinates.
    * @property {Number} size Implements Series.Size. Returns the number of elements provided in Date list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 2.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    * @property {LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns LabelKinds.XAxisLabel.
    * @property {List<Date>} dates Gets or sets a list of Date values used as X coordinates of this series.
    * @property {Number} minValue Gets or sets the coordinate corresponding to MinDate.
    * @property {Number} maxValue Gets or sets the coordinate corresponding to MaxDate.
    * @property {Date} minDate Gets or sets the start of the time range.
    * @property {Date} maxDate Gets or sets the end of the time range.
    * @property {String} dateTimeFormat Gets or sets a value indicating how to format Date values as labels.
    * @property {String} customDateTimeFormat Gets or sets a custom format string for Date labels.
    * @property {String} labelPrefix Gets or sets a prefix added in front of formatted Date labels.
    * @property {String} labelSuffix Gets or sets a suffix appended to formatted Date labels.
    */
    export class DateTimeSeries implements Series {
        /**
         * Initializes a new instance of the DateTimeSeries class.
         * @param {List<Date> | Array<Date>} dates A list of Date values.
         * @param {List<Number> | Array<Number>} values A list of number values.
         * @param {Date} minDate Identifies the start of the time range.
         * @param {Date} maxDate Identifies the end of the time range.
         */
        constructor(dates: List<Date> | Array<Date>, values: List<number> | Array<number>, minDate: Date, maxDate: Date);
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns Date value at specified index as an XAxisLabel.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsSorted. DateTimeSeries always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.IsEmphasized. DateTimeSeries always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements provided in Date list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 2.
         */
        get dimensions(): number;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets a list of Date values used as X coordinates of this series.
         */
        get dates(): List<Date>;
        /**
         * Gets or sets a list of Date values used as X coordinates of this series.
         */
        set dates(value: List<Date>);
        /**
         * Gets or sets the coordinate corresponding to MinDate.
         */
        get minValue(): number;
        /**
         * Gets or sets the coordinate corresponding to MinDate.
         */
        set minValue(value: number);
        /**
         * Gets or sets the coordinate corresponding to MaxDate.
         */
        get maxValue(): number;
        /**
         * Gets or sets the coordinate corresponding to MaxDate.
         */
        set maxValue(value: number);
        /**
         * Gets or sets the start of the time range.
         */
        get minDate(): Date;
        /**
         * Gets or sets the start of the time range.
         */
        set minDate(value: Date);
        /**
         * Gets or sets the end of the time range.
         */
        get maxDate(): Date;
        /**
         * Gets or sets the end of the time range.
         */
        set maxDate(value: Date);
        /**
         * Gets or sets a value indicating how to format Date values as labels.
         */
        get dateTimeFormat(): DateTimeFormat;
        /**
         * Gets or sets a value indicating how to format Date values as labels.
         */
        set dateTimeFormat(value: DateTimeFormat);
        /**
         * Gets or sets a custom format string for Date labels.
         */
        get customDateTimeFormat(): string;
        /**
         * Gets or sets a custom format string for Date labels.
         */
        set customDateTimeFormat(value: string);
        /**
         * Gets or sets a prefix added in front of formatted Date labels.
         */
        get labelPrefix(): string;
        /**
         * Gets or sets a prefix added in front of formatted Date labels.
         */
        set labelPrefix(value: string);
        /**
         * Gets or sets a suffix appended to formatted Date labels.
         */
        get labelSuffix(): string;
        /**
         * Gets or sets a suffix appended to formatted Date labels.
         */
        set labelSuffix(value: string);
        private m_dates;
        private values;
        private m_minDate;
        private m_maxDate;
        private m_minValue;
        private m_maxValue;
        private m_dateTimeFormat;
        private m_customDateTimeFormat;
        private m_labelPrefix;
        private m_labelSuffix;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event DateTimeSeries.dataChanged
         * @type {Common.EventDispatcher}
         * @property {DateTimeSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            values: number[];
            minDate: number;
            maxDate: number;
            title: string;
            labelPrefix: string;
            labelSuffix: string;
            dateTimeFormat: DateTimeFormat;
            customDateTimeFormat: string;
        };
    }
}
declare module "Charting/EventSeries" {
    /**
    * @namespace MindFusion.Charting
    */
    /**
     * Copyright (c) 2015-2021, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { List } from "@mindfusion/common-collections";
    import { EventArgs } from "@mindfusion/controls";
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    import * as Common from '@mindfusion/common';
    /**
    * @class Represents a series containing order or timing data, useful for
    * showing event sequences in tower charts.
    */
    export class EventSeries implements Series {
        /**
        * Initializes a new instance of the EventSeries class.
        * @param {List<ChartEvent> | Array<ChartEvent>} values A list of ChartEvent objects.
        */
        constructor(values: List<ChartEvent> | Array<ChartEvent>);
        /**
        * Implements Series.GetValue. Returns a coordinate of specified point in this series.
        * @param {Number} index An integer value specifying the index of a data item.
        * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
        * @returns {Number} A double-precision number representing the value of a data item in the series.
        */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. EventSeries always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements provided in Values list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 3.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets a list of values used as X coordinates of this series.
         */
        get values(): List<ChartEvent>;
        /**
         * Gets or sets a list of Date values used as X coordinates of this series.
         */
        set values(value: List<ChartEvent>);
        private m_values;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event DateTimeSeries.dataChanged
         * @type {Common.EventDispatcher}
         * @property {DateTimeSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            values: ChartEvent[];
            title: string;
        };
    }
    /**
    * @class Represents a timed event, useful for showing event sequences in tower charts.
    */
    export class ChartEvent {
        /**
        * Initializes a new instance of the ChartEvent class.
        */
        constructor(time: number, duration: number, value: number);
        /**
        * Gets or sets the event time or order.
        */
        time: number;
        /**
        * Gets or sets the event duration.
        */
        duration: number;
        /**
        * Gets or sets the event value.
        */
        value: number;
        /**
        * Gets or sets label to display inside chart segments.
        */
        innerLabel: string;
        /**
        * Gets or sets label to display outside chart segments.
        */
        outerLabel: string;
        /**
        * Gets or sets segment's tooltip.
        */
        toolTip: string;
    }
}
declare module "Charting/FunctionSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import { EventDispatcher } from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    /**
    * @class Represents a series that calculates its values from provided formula.
    * @property {Number} size Implements Series.Size. Returns the number of elements in Data list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 2.
    * @property {LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns None.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    * @property {Function} expression Gets the function used to evaluate the series at a specific X.
    */
    export class FunctionSeries implements Series {
        /**
         * Initializes a new instance of the FunctionSeries class.
         * @param {Function} expression The function used to evaluate the series at a specific X.
         * @param {number} size An integer value specifying the number of values to calculate.
         * @param {number} minX A double-precision number specifying the minimum value of function range.
         * @param {number} maxX A double-precision number specifying the maximum value of function range.
         */
        constructor(expression: Function, size: number, minX: number, maxX: number);
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
        * Implements Series.GetLabel. Returns an element of the labels list.
        * @param {Number} index An integer value specifying the index of a data item.
        * @param {LabelKinds} kind A member of the LabelKinds enumeration.
        * @returns {String} A string containing the item's label.
        */
        getLabel(index: number, kind: LabelKinds): string;
        /**
        * Implements Series.IsSorted.
        * @param {Number} dimension An integer value identifying the dimension.
        * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
        */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.IsEmphasized. Gets a value indicating whether
         * the specified data item should be emphasized by the SeriesRenderer.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in Data list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 2.
         */
        get dimensions(): number;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
        * Gets the function used to evaluate the series at a specific X.
        */
        get expression(): Function;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event SimpleSeries.dataChanged
         * @type {EventDispatcher<EventArgs>}
         * @property {SimpleSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(json: any): void;
        toJson(): any;
        private m_expression;
        private m_size;
        private minX;
        private maxX;
    }
}
declare module "Charting/Pair" {
    /**
    * @class Contains two values.
    * @property {T1} first Gets or sets the first value.
    * @property {T1} second Gets or sets the second value.
    */
    export class Pair<T1, T2> {
        /**
         * Initializes a new instance of the Pair class.
         * @param first The first value.
         * @param second The second value.
         */
        constructor(first?: T1, second?: T2);
        /**
         * Object.ToString override.
         * @return A string representation of the pair.
         */
        toString(): string;
        /**
         * Gets or sets the first value.
         */
        get first(): T1;
        /**
         * Gets or sets the first value.
         */
        set first(value: T1);
        private mfirst;
        /**
         * Gets or sets the second value.
         */
        get second(): T2;
        /**
         * Gets or sets the second value.
         */
        set second(value: T2);
        private msecond;
    }
}
declare module "Charting/PerElementSeriesStyle" {
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
    * @class Implements SeriesStyle using different attributes for each data item.
    * @property {List<List<Drawing.Brush>>} fills Gets or sets a list of Brush lists, each list used to draw a different series, and each Brush used to fill individual elements of a series.
    * @property {List<List<Drawing.Brush>>} strokes Gets or sets a list of Brush lists, each list used to stroke a different series, and each Brush used to stroke individual elements of a series.
    * @property {List<List<number>>} strokeThicknesses Gets or sets a list of number lists, each list used to stroke a different series, and each number value specifying thickness of individual elements of a series.
    * @property {List<List<Drawing.DashStyle>>} strokeDashStyles Gets or sets a list of DashStyle lists, each list used to stroke a different series, and each DashStyle value specifying style of individual elements of a series.
    */
    export class PerElementSeriesStyle implements SeriesStyle {
        /**
         * Initializes a new instance of PerElementSeriesStyle.
         * @param {List<List<Drawing.Brush>>} [fills]
         * A list of Drawing.Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         *
         * @param {List<List<Drawing.Brush>>} [strokes]
         * A list of Drawing.Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         *
         * @param {List<List<Number>>} [strokeThicknesses]
         * A list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         *
         * @param {List<List<Drawing.DashStyle>>} [strokeDashStyles]
         * A list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         *
         */
        constructor(fills?: List<List<Drawing.Brush>>, strokes?: List<List<Drawing.Brush>>, strokeThicknesses?: List<List<number>>, strokeDashStyles?: List<List<Drawing.DashStyle>>);
        /**
         * Implements SeriesStyle.Fill. Returns a Brush from the Fills list
         * that matches specified series and data indices.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.Stroke. Returns a Brush from the Strokes list
         * that matches specified series and data indices.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.StrokeThickness. Returns a value from
         * the StrokeThicknesses list that matches specified series and data indices.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable number value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Implements SeriesStyle.StrokeDashStyle. Returns a value from
         * the StrokeDashStyles list that matches specified series and data indices.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): Drawing.DashStyle;
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        get fills(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to draw a different series,
         * and each Brush used to fill individual elements of a series.
         */
        set fills(value: List<List<Drawing.Brush>>);
        private m_fills;
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        get strokes(): List<List<Drawing.Brush>>;
        /**
         * Gets or sets a list of Brush lists, each list used to stroke a different series,
         * and each Brush used to stroke individual elements of a series.
         */
        set strokes(value: List<List<Drawing.Brush>>);
        private m_strokes;
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        get strokeThicknesses(): List<List<number>>;
        /**
         * Gets or sets a list of number lists, each list used to stroke a different series,
         * and each number value specifying thickness of individual elements of a series.
         */
        set strokeThicknesses(value: List<List<number>>);
        private m_strokeThicknesses;
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        get strokeDashStyles(): List<List<Drawing.DashStyle>>;
        /**
         * Gets or sets a list of DashStyle lists, each list used to stroke a different series,
         * and each DashStyle value specifying style of individual elements of a series.
         */
        set strokeDashStyles(value: List<List<Drawing.DashStyle>>);
        private m_strokeDashStyles;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/PerSeriesStyle" {
    import * as Drawing from '@mindfusion/drawing';
    import { List } from '@mindfusion/common-collections';
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
    * @class Implements SeriesStyle using a different set of attributes for each series,
    * where all elements in a single series have common appearance.
    * @property {List<Drawing.Brush>} fills Gets or sets a list of Brushes, each Brush used to fill all elements of a series.
    * @property {List<Drawing.Brush>} strokes Gets or sets a list of Brushes, each Brush used to stroke all elements of a series.
    * @property {List<Number>} strokeThicknesses Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
    * @property {List<Drawing.DashStyle>} strokeDashStyles Gets or sets a list of dash styles, each style applied to all elements of a series.
    */
    export class PerSeriesStyle implements SeriesStyle {
        /**
         * Initializes a new instance of the PerSeriesStyle class.
         * @param {List<Drawing.Brush>} [fills] A list of Drawing.Brushes, each Brush used to fill all elements of a series.
         * @param {List<Drawing.Brush>} [strokes] A list of Drawing.Brushes, each Brush used to stroke all elements of a series.
         * @param {List<Number>} [strokeThicknesses] A list of stroke thicknesses, each thickness applied to all elements of a series.
         * @param {List<Drawing.DashStyle>} [strokeDashStyles] A list of dash styles, each style applied to all elements of a series.
         */
        constructor(fills?: List<Drawing.Brush>, strokes?: List<Drawing.Brush>, strokeThicknesses?: List<number>, strokeDashStyles?: List<Drawing.DashStyle>);
        /**
         * Implements SeriesStyle.Fill. Returns a Brush from
         * the Fills list that matches specified series index.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.Stroke. Returns a Brush from
         * the Strokes list that matches specified series index.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Drawing.Brush;
        /**
         * Implements SeriesStyle.StrokeThickness. Returns a value from
         * the StrokeThicknesses list that matches specified series index.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable number value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Implements SeriesStyle.StrokeDashStyle. Returns a value from
         * the StrokeDashStyles list that matches specified series index.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Drawing.DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): Drawing.DashStyle;
        /**
         * Gets or sets a list of Brushes, each Brush used to fill all elements of a series.
         */
        get fills(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of Brushes, each Brush used to fill all elements of a series.
         */
        set fills(value: List<Drawing.Brush>);
        private m_fills;
        /**
         * Gets or sets a list of Brushes, each Brush used to stroke all elements of a series.
         */
        get strokes(): List<Drawing.Brush>;
        /**
         * Gets or sets a list of Brushes, each Brush used to stroke all elements of a series.
         */
        set strokes(value: List<Drawing.Brush>);
        private m_strokes;
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        get strokeThicknesses(): List<number>;
        /**
         * Gets or sets a list of stroke thicknesses, each thickness applied to all elements of a series.
         */
        set strokeThicknesses(value: List<number>);
        private m_strokeThicknesses;
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        get strokeDashStyles(): List<Drawing.DashStyle>;
        /**
         * Gets or sets a list of dash styles, each style applied to all elements of a series.
         */
        set strokeDashStyles(value: List<Drawing.DashStyle>);
        private m_strokeDashStyles;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/PointSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { Point } from "@mindfusion/drawing";
    import { Series } from "Charting/Series";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class Represents a data series defined by a list of Point objects.
    * @property {Number} size Implements Series.Size. Returns the number of elements in Points list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 2.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns InnerLabel.
    * @property {List<Point>} points Gets or sets the series' points.
    * @property {List<String>} labels Gets or sets the data labels.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class PointSeries implements Series {
        /**
         * Initializes a new instance of the PointSeries class.
         * @param {List<Point> | Array<Point>} points A list of points.
         * @param {List<String> | Array<String>} labels A list of labels.
         */
        constructor(points: List<Point> | Array<Point>, labels: List<string> | Array<string>);
        /**
         * Implements Series.GetValue. Returns a coordinate of specified point in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns an element of the Labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. PointSeries always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. PointSeries always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in Points list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 2.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets the series' points.
         */
        get points(): List<Point>;
        /**
         * Gets or sets the series' points.
         */
        set points(value: List<Point>);
        /**
         * Gets or sets the data labels.
         */
        get labels(): List<string>;
        /**
         * Gets or sets the data labels.
         */
        set labels(value: List<string>);
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private m_points;
        private m_labels;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event PointSeries.dataChanged
         * @type {Common.EventDispatcher}
         * @property {PointSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            points: Point[];
            labels: string[];
            title: string;
        };
    }
}
declare module "Charting/PointSeries3D" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { Series } from "Charting/Series";
    import { LabelKinds } from "Charting/LabelKinds";
    import { Point3D } from "Charting/Point3D";
    /**
    * @class Represents a data series defined by a list of Point3D objects.
    * @property {Number} size Implements Series.Size. Returns the number of elements in Points list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 3.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns InnerLabel.
    * @property {List<Point3D>} points Gets or sets the series' points.
    * @property {List<String>} labels Gets or sets the data labels.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class PointSeries3D implements Series {
        /**
         * Initializes a new instance of the PointSeries3D class.
         * @param {List<Point3D> | Array<Point3D>} points A list of 3D points.
         * @param {List<String> | Array<String>} labels A list of labels.
         */
        constructor(points: List<Point3D> | Array<Point3D>, labels: List<string> | Array<string>);
        /**
         * Implements Series.GetValue. Returns a coordinate of specified point in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns an element of the Labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. PointSeries3D always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. PointSeries3D always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in Points list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 3.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets the series' points.
         */
        get points(): List<Point3D>;
        /**
         * Gets or sets the series' points.
         */
        set points(value: List<Point3D>);
        /**
         * Gets or sets the data labels.
         */
        get labels(): List<string>;
        /**
         * Gets or sets the data labels.
         */
        set labels(value: List<string>);
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private m_points;
        private m_labels;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event PointSeries3D.dataChanged
         * @type {Common.EventDispatcher}
         * @property {PointSeries3D} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            points: Point3D[];
            labels: string[];
            title: string;
        };
    }
}
declare module "Charting/Series2D" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { LabelKinds } from "Charting/LabelKinds";
    import { Series } from "Charting/Series";
    /**
    * @class Represents a data series defined by two lists of values containing
    * respectively X and Y coordinates.
    * @property {Number} size Implements Series.Size. Returns the number of elements in XData list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 2.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Gets or sets the kind of labels reported as supported by this series.
    * @property {List<Number>} xData Gets or sets the X coordinates of data items.
    * @property {List<Number>} yData Gets or sets the Y coordinates of data items.
    * @property {List<String>} labels Gets or sets the data labels.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class Series2D implements Series {
        /**
         * Initializes a new instance of the Series2D class.
         * @param {List<Number> | Array<Number>} xValues A list of X coordinates.
         * @param {List<Number> | Array<Number>} yValues A list of Y coordinates.
         * @param {List<String> | Array<String>} labels A list of labels.
         */
        constructor(xValues: List<number> | Array<number>, yValues: List<number> | Array<number>, labels: List<string> | Array<string>);
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns an element of the Labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. Series2D always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. Series2D always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in XData list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 2.
         */
        get dimensions(): number;
        private m_supportedLabels;
        /**
         * Implements Series.SupportedLabels. Gets or sets the kind of labels
         * reported as supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the kind of labels
         * reported as supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        /**
         * Gets or sets the X coordinates of data items.
         */
        get xData(): List<number>;
        /**
         * Gets or sets the X coordinates of data items.
         */
        set xData(value: List<number>);
        /**
         * Gets or sets the Y coordinates of data items.
         */
        get yData(): List<number>;
        /**
         * Gets or sets the Y coordinates of data items.
         */
        set yData(value: List<number>);
        /**
         * Gets or sets the data labels.
         */
        get labels(): List<string>;
        /**
         * Gets or sets the data labels.
         */
        set labels(value: List<string>);
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private xValues;
        private yValues;
        private m_labels;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event Series2D.dataChanged
         * @type {Common.EventDispatcher}
         * @property {Series2D} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            xValues: number[];
            yValues: number[];
            labels: string[];
            title: string;
        };
    }
}
declare module "Charting/Series3D" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { Series } from "Charting/Series";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class Represents a data series defined by three lists of values containing
    * respectively X, Y and Z coordinates.
    * @property {Number} size Implements Series.Size. Returns the number of elements in XData list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 3.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns InnerLabel.
    * @property {List<Number>} xData Gets or sets the X coordinates of data items.
    * @property {List<Number>} yData Gets or sets the Y coordinates of data items.
    * @property {List<Number>} zData Gets or sets the Z coordinates of data items.
    * @property {List<String>} labels Gets or sets the data labels.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class Series3D implements Series {
        /**
         * Initializes a new instance of the Series3D class.
         * @param {List<Number> | Array<Number>} xValues A list of X coordinates.
         * @param {List<Number> | Array<Number>} yValues A list of Y coordinates.
         * @param {List<Number> | Array<Number>} zValues A list of Z coordinates.
         * @param {List<String> | Array<String>} labels A list of labels.
         */
        constructor(xValues: List<number> | Array<number>, yValues: List<number> | Array<number>, zValues: List<number> | Array<number>, labels: List<string> | Array<string>);
        /**
         * Implements Series.GetValue. Returns a value for the specified data item in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns an element of the Labels list.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. Series3D always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. Series3D always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in XData list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 3.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets the X coordinates of data items.
         */
        get xData(): List<number>;
        /**
         * Gets or sets the X coordinates of data items.
         */
        set xData(value: List<number>);
        /**
         * Gets or sets the Y coordinates of data items.
         */
        get yData(): List<number>;
        /**
         * Gets or sets the Y coordinates of data items.
         */
        set yData(value: List<number>);
        /**
         * Gets or sets the X coordinates of data items.
         */
        get zData(): List<number>;
        /**
         * Gets or sets the X coordinates of data items.
         */
        set zData(value: List<number>);
        /**
         * Gets or sets the data labels.
         */
        get labels(): List<string>;
        /**
         * Gets or sets the data labels.
         */
        set labels(value: List<string>);
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private xValues;
        private yValues;
        private zValues;
        private m_labels;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event Series3D.dataChanged
         * @type {Common.EventDispatcher}
         * @property {Series3D} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            xValues: number[];
            yValues: number[];
            zValues: number[];
            labels: string[];
        };
    }
}
declare module "Charting/StockPriceSeries" {
    /**
    * @namespace MindFusion.Charting
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
    import { List } from '@mindfusion/common-collections';
    import * as Common from '@mindfusion/common';
    import { DateTimeFormat } from "Charting/DateTimeFormat";
    import { Series } from "Charting/Series";
    import { LabelKinds } from "Charting/LabelKinds";
    /**
    * @class Represents a data series defined by a list of StockPrice objects.
    * @property {Number} size Implements Series.Size. Returns the number of elements in Values list.
    * @property {Number} dimensions Implements Series.Dimensions. Returns 5.
    * @property {MindFusion.Charting.LabelKinds} supportedLabels Implements Series.SupportedLabels. Returns InnerLabel.
    * @property {List<StockPrice>} values Gets or sets the series' points.
    * @property {DateTimeFormat} dateTimeFormat Gets or sets a value indicating how to format DateTime values as labels.
    * @property {String} customDateTimeFormat Gets or sets a custom format string for DateTime labels.
    * @property {String} labelPrefix Gets or sets a prefix added in front of formatted DateTime labels.
    * @property {String} labelSuffix Gets or sets a suffix appended to formatted DateTime labels.
    * @property {String} title Implements Series.Title. Gets or sets the title of this series.
    */
    export class StockPriceSeries implements Series {
        /**
         * Initializes a new instance of the StockPriceSeries class.
         * @param {List<StockPrice> | Array<StockPrice>} values A list of StockPrice objects.
         */
        constructor(values: List<StockPrice> | Array<StockPrice>);
        /**
         * Implements Series.GetValue. Returns a coordinate of specified point in this series.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {Number} dimension An integer value specifying the dimension whose coordinate to return.
         * @returns {Number} A double-precision number representing the value of a data item in the series.
         */
        getValue(index: number, dimension: number): number;
        /**
         * Implements Series.GetLabel. Returns DateTime value at specified index as an XAxisLabel.
         * @param {Number} index An integer value specifying the index of a data item.
         * @param {MindFusion.Charting.LabelKinds} kind A member of the LabelKinds enumeration.
         * @returns {String} A string containing the item's label.
         */
        getLabel(index: number, kind: LabelKinds): string;
        /**
         * Implements Series.IsEmphasized. StockPriceSeries always returns false.
         * @param {Number} index An integer value specifying the index of a data item.
         * @returns {Boolean} true to emphasize the specified data item, or false otherwise.
         */
        isEmphasized(index: number): boolean;
        /**
         * Implements Series.IsSorted. StockPriceSeries always returns false.
         * @param {Number} dimension An integer value identifying the dimension.
         * @returns {Boolean} true if the values are sorted in specified dimension, or false otherwise.
         */
        isSorted(dimension: number): boolean;
        /**
         * Implements Series.Size. Returns the number of elements in Values list.
         */
        get size(): number;
        /**
         * Implements Series.Dimensions. Returns 5.
         */
        get dimensions(): number;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        get supportedLabels(): LabelKinds;
        /**
         * Implements Series.SupportedLabels. Gets or sets the labels supported by this series.
         */
        set supportedLabels(value: LabelKinds);
        private m_supportedLables;
        /**
         * Gets or sets the series' points.
         */
        get values(): List<StockPrice>;
        /**
         * Gets or sets the series' points.
         */
        set values(value: List<StockPrice>);
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        get title(): string;
        /**
         * Implements Series.Title. Gets or sets the title of this series.
         */
        set title(value: string);
        private m_title;
        private m_values;
        /**
         * Gets or sets a value indicating how to format DateTime values as labels.
         */
        get dateTimeFormat(): DateTimeFormat;
        /**
         * Gets or sets a value indicating how to format DateTime values as labels.
         */
        set dateTimeFormat(value: DateTimeFormat);
        /**
         * Gets or sets a custom format string for DateTime labels.
         */
        get customDateTimeFormat(): string;
        /**
         * Gets or sets a custom format string for DateTime labels.
         */
        set customDateTimeFormat(value: string);
        /**
         * Gets or sets a prefix added in front of formatted DateTime labels.
         */
        get labelPrefix(): string;
        /**
         * Gets or sets a prefix added in front of formatted DateTime labels.
         */
        set labelPrefix(value: string);
        /**
         * Gets or sets a suffix appended to formatted DateTime labels.
         */
        get labelSuffix(): string;
        /**
         * Gets or sets a suffix appended to formatted DateTime labels.
         */
        set labelSuffix(value: string);
        private m_dateTimeFormat;
        private m_customDateTimeFormat;
        private m_labelPrefix;
        private m_labelSuffix;
        private m_dataChanged;
        /**
         * Raised when the values in this series change.
         * @event StockPriceSeries.dataChanged
         * @type {Common.EventDispatcher}
         * @property {StockPriceSeries} sender
         * @property {EventArgs} args
         */
        get dataChanged(): Common.EventDispatcher<EventArgs>;
        /**
         * Raises the DataChanged event.
         */
        protected onDataChanged(): void;
        fromJson(obj: any): void;
        toJson(): {
            __type: any;
            title: string;
            labelPrefix: string;
            labelSuffix: string;
            dateTimeFormat: DateTimeFormat;
            customDateTimeFormat: string;
        };
    }
    /**
     * Represents a data object, containing open, close, low and high values for a certain date.
     */
    export class StockPrice {
        /**
         * Initializes a new instance of the StockPrice class.
         * @param {Number} open The open value.
         * @param {Number} close The close value.
         * @param {Number} low The low value.
         * @param {Number} high The high value.
         * @param {Date} [date] The corresponding date.
         */
        constructor(open: number, close: number, low: number, high: number, date?: Date);
        /**
         * Gets or sets the open value.
         */
        get open(): number;
        /**
         * Gets or sets the open value.
         */
        set open(value: number);
        private m_open;
        /**
         * Gets or sets the close value.
         */
        get close(): number;
        /**
         * Gets or sets the close value.
         */
        set close(value: number);
        private m_close;
        /**
         * Gets or sets the low value.
         */
        get low(): number;
        /**
         * Gets or sets the low value.
         */
        set low(value: number);
        private m_low;
        /**
         * Gets or sets the high value.
         */
        get high(): number;
        /**
         * Gets or sets the high value.
         */
        set high(value: number);
        private m_high;
        /**
         * Gets or sets the date.
         */
        get date(): Date;
        /**
         * Gets or sets the date.
         */
        set date(value: Date);
        private m_date;
        fromJson(obj: any): any;
        toJson(): any;
    }
}
declare module "Charting/UniformSeriesStyle" {
    import { DashStyle, Brush } from '@mindfusion/drawing';
    import { SeriesStyle } from "Charting/SeriesStyle";
    /**
     * @class Implements SeriesStyle using uniform attributes for all elements in all series.
     * @property {Brush} uniformFill Gets or sets a Brush used to fill all elements of all series uniformly.
     * @property {Brush} uniformStroke Gets or sets a Brush used to stroke all elements of all series uniformly.
     * @property {Number} uniformStrokeThickness Gets or sets uniform stroke thickness for all elements of all series.
     * @property {DashStyle} uniformStrokeDashStyle Gets or sets uniform stroke dash style for all elements of all series.
     */
    export class UniformSeriesStyle implements SeriesStyle {
        /**
         * Initializes a new instance of the UniformSeriesStyle class.
         * @param {Brush} [fill] A Brush used to fill all series elements.
         * @param {Brush} [stroke] A Brush used to stroke all series elements.
         * @param {Number} [strokeThickness] Uniform thickness of series elements' strokes.
         * @param {DashStyle} [strokeDashStyle] Uniform dash style of series elements' strokes.
         */
        constructor(fill?: Brush, stroke?: Brush, strokeThickness?: number, strokeDashStyle?: DashStyle);
        /**
         * Implements SeriesStyle.Fill. Returns UniformFill for any data item.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        fill(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Implements SeriesStyle.Stroke. Returns UniformStroke for any data item.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Brush} A Brush instance.
         */
        stroke(seriesIndex: number, dataIndex: number): Brush;
        /**
         * Implements SeriesStyle.StrokeThickness. Returns UniformStrokeThickness for any data item.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {Number} A nullable double value specifying stroke thickness.
         */
        strokeThickness(seriesIndex: number, dataIndex: number): number;
        /**
         * Implements SeriesStyle.StrokeDashStyle. Returns UniformStrokeDashStyle for any data item.
         * @param {Number} seriesIndex An integer index of a Series.
         * @param {Number} dataIndex An integer index of a data item in specified series.
         * @returns {DashStyle} A nullable DashStyle value specifying stroke dash style.
         */
        strokeDashStyle(seriesIndex: number, dataIndex: number): DashStyle;
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        get uniformFill(): Brush;
        /**
         * Gets or sets a Brush used to fill all elements of all series uniformly.
         */
        set uniformFill(value: Brush);
        private m_uniformFill;
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        get uniformStroke(): Brush;
        /**
         * Gets or sets a Brush used to stroke all elements of all series uniformly.
         */
        set uniformStroke(value: Brush);
        private m_uniformStroke;
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        get uniformStrokeThickness(): number;
        /**
         * Gets or sets uniform stroke thickness for all elements of all series.
         */
        set uniformStrokeThickness(value: number);
        private m_uniformStrokeThickness;
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        get uniformStrokeDashStyle(): DashStyle;
        /**
         * Gets or sets uniform stroke dash style for all elements of all series.
         */
        set uniformStrokeDashStyle(value: DashStyle);
        private m_uniformStrokeDashStyle;
        fromJson(obj: any): void;
        toJson(): any;
    }
}
declare module "Charting/VelocityCalculator" {
    import { Vector } from "Charting/Vector";
    export class VelocityCalculator {
        constructor(sampleSize?: number);
        reset(): void;
        addSample(movement: Vector, time: number): void;
        calculate(): Vector;
        get canCalculate(): boolean;
        Epsilon: number;
        private sampleSize;
        private samples;
    }
}
declare module "@mindfusion/charting" {
    export * as Commands from "Charting/Commands/Commands";
    export * as Components from "Charting/Components/Components";
    export * as Controls from "Charting/Controls/Controls";
    export * as Gauges from "Charting/Gauges/Gauges";
    export * as ThreeD from "Charting/ThreeD/ThreeD";
    export { AnnotationRenderer } from "Charting/AnnotationRenderer";
    export { AreaRenderer } from "Charting/AreaRenderer";
    export { AreaStackRenderer } from "Charting/AreaStackRenderer";
    export { Axis } from "Charting/Axis";
    export { AxisRenderer } from "Charting/AxisRenderer";
    export { BarContainer } from "Charting/BarContainer";
    export { BarLayout } from "Charting/BarLayout";
    export { BarModel3D } from "Charting/BarModel3D";
    export { BarOverlayRenderer } from "Charting/BarOverlayRenderer";
    export { BarOverlayRenderer3D } from "Charting/BarOverlayRenderer3D";
    export { BarRenderer } from "Charting/BarRenderer";
    export { BarRenderer3D } from "Charting/BarRenderer3D";
    export { BarSeries } from "Charting/BarSeries";
    export { BarSpacing } from "Charting/BarSpacing";
    export { BarStackRenderer } from "Charting/BarStackRenderer";
    export { BarStackRenderer3D } from "Charting/BarStackRenderer3D";
    export { BubbleLabelAlignment } from "Charting/BubbleLabelAlignment";
    export { BubbleRenderer } from "Charting/BubbleRenderer";
    export { CandlestickRenderer } from "Charting/CandlestickRenderer";
    export { CandlestickSeriesStyle } from "Charting/CandlestickSeriesStyle";
    export { CurveAreaRenderer } from "Charting/CurveAreaRenderer";
    export { CurveAreaStackRenderer } from "Charting/CurveAreaStackRenderer";
    export { CurveRenderer } from "Charting/CurveRenderer";
    export { DataBoundSeries } from "Charting/DataBoundSeries";
    export { DataReader } from "Charting/DataReader";
    export { DateTimeFormat } from "Charting/DateTimeFormat";
    export { DateTimeSeries } from "Charting/DateTimeSeries";
    export { EventSeries, ChartEvent } from "Charting/EventSeries";
    export { FunctionSeries } from "Charting/FunctionSeries";
    export { FunnelRenderer } from "Charting/FunnelRenderer";
    export { GridType } from "Charting/GridType";
    export { HitResult } from "Charting/HitResult";
    export { LabelKinds } from "Charting/LabelKinds";
    export { LegendController } from "Charting/LegendController";
    export { LegendRenderer } from "Charting/LegendRenderer";
    export { LineRenderer } from "Charting/LineRenderer";
    export { LineType } from "Charting/LineType";
    export { Margins } from "Charting/Margins";
    export { MixedSeriesStyle } from "Charting/MixedSeriesStyle";
    export { Pair } from "Charting/Pair";
    export { PanControllerAnimation } from "Charting/PanController.Animation";
    export { PanController } from "Charting/PanController";
    export { PerElementSeriesStyle } from "Charting/PerElementSeriesStyle";
    export { PerSeriesStyle } from "Charting/PerSeriesStyle";
    export { PieRadarRenderer } from "Charting/PieRadarRenderer";
    export { PieRenderer } from "Charting/PieRenderer";
    export { PieSeries } from "Charting/PieSeries";
    export { Plot } from "Charting/Plot";
    export { Plot2D } from "Charting/Plot2D";
    export { Plot2DController } from "Charting/Plot2DController";
    export { Plot3D } from "Charting/Plot3D";
    export { PlotController } from "Charting/PlotController";
    export { Point3D } from "Charting/Point3D";
    export { PointSeries } from "Charting/PointSeries";
    export { PointSeries3D } from "Charting/PointSeries3D";
    export { PolarPlot } from "Charting/PolarPlot";
    export { RadarAxisOptions } from "Charting/RadarAxisOptions";
    export { RadarGridType } from "Charting/RadarGridType";
    export { RadarPlot } from "Charting/RadarPlot";
    export { RadarRenderer } from "Charting/RadarRenderer";
    export { RadarScatterRenderer } from "Charting/RadarScatterRenderer";
    export { RadarType } from "Charting/RadarType";
    export { RenderContext } from "Charting/RenderContext";
    export { RenderContext2D } from "Charting/RenderContext2D";
    export { Renderer2D } from "Charting/Renderer2D";
    export { Renderer3D } from "Charting/Renderer3D";
    export { RotationControllerAnimation } from "Charting/RotationController.Animation";
    export { RotationController } from "Charting/RotationController";
    export { ScatterRenderer } from "Charting/ScatterRenderer";
    export { ScatterType } from "Charting/ScatterType";
    export { Series } from "Charting/Series";
    export { Series2D } from "Charting/Series2D";
    export { Series3D } from "Charting/Series3D";
    export { SeriesContainer } from "Charting/SeriesContainer";
    export { SeriesRenderer } from "Charting/SeriesRenderer";
    export { SeriesStyle } from "Charting/SeriesStyle";
    export { ShapeBuilder } from "Charting/ShapeBuilder";
    export { SimpleSeries } from "Charting/SimpleSeries";
    export { StackRenderer } from "Charting/StackRenderer";
    export { StepAreaRenderer } from "Charting/StepAreaRenderer";
    export { StepRenderer } from "Charting/StepRenderer";
    export { StockPriceSeries, StockPrice } from "Charting/StockPriceSeries";
    export { TextRenderer } from "Charting/TextRenderer";
    export { TextStyle } from "Charting/TextStyle";
    export { TextStyleHint } from "Charting/TextStyleHint";
    export { Theme } from "Charting/Theme";
    export { ToolTip } from "Charting/ToolTip";
    export { TowerLayout } from "Charting/TowerLayout";
    export { TowerRenderer } from "Charting/TowerRenderer";
    export { TowerSegmentShape } from "Charting/TowerSegmentShape";
    export { UniformSeriesStyle } from "Charting/UniformSeriesStyle";
    export { Utilities } from "Charting/Utilities";
    export { Vector } from "Charting/Vector";
    export { VelocityCalculator } from "Charting/VelocityCalculator";
    export { XAxisRenderer } from "Charting/XAxisRenderer";
    export { XmlPersistContext } from "Charting/XmlPersistContext";
    export { YAxisRenderer } from "Charting/YAxisRenderer";
    export { ZoomController } from "Charting/ZoomController";
    export { ZoomHistory } from "Charting/ZoomHistory";
}
