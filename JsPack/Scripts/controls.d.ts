/// <reference types="../../@mindfusion/drawing" />
declare module "Controls/Base64" {
    /**
    * @namespace MindFusion.Controls
    */
    export class Base64 {
        static get _keyStr(): string;
        static encode(input: any): string;
        static decode(input: any): string;
        static _utf8_encode(string: any): string;
        static _utf8_decode(utftext: any): string;
    }
}
declare module "Controls/ControlUtils" {
    /**
     * @class Contains helper functions.
     * @private
     */
    export class ControlUtils {
        /**
        * Generates get/set function wrappers for properties.
        */
        static generatePropFunctions(proto: any): void;
        static isInstanceOfType(typeToCheck: any, instance: any): boolean;
        /**
        * Registers a type with the specifies name and base type.
        * @param {Object} type The type to register.
        * @param {String} typeName The class name.
        * @param {Object} [baseType] The base type.
        */
        static registerClass(type: any, typeName: string, baseType?: any): void;
        static writeObject(object: any): {
            typeId: number;
            value: any;
        };
        static readObject(json: any): any;
        static writeTag(item: any, tagValue: any, propertyName: any, control: any): {};
        static readTag(json: any, item: any, propertyName: any, control: any): any;
        static isNumber(num: any): boolean;
        static isFloat(number: any): boolean;
    }
    export namespace ControlUtils {
        const generatedClasses: Map<any, any>;
    }
}
declare module "Controls/EventArgs" {
    /**
    * @class The base type of classes that define arguments passed to event handler functions.
    */
    export class EventArgs {
        static get Empty(): EventArgs;
        set handled(arg: boolean);
        /**
        * Gets or sets a value indicating whether the event has been handled.
        * @type {Boolean}
        * @summary true to indicate that the event has been handled, or false otherwise.
        */
        get handled(): boolean;
        _handled: boolean;
    }
    /**
    * @class Provides a value to use with cancellable events.
    * @augments EventArgs
    */
    export class CancelEventArgs extends EventArgs {
        set cancel(arg: boolean);
        /**
        * Gets or sets a value indicating whether to allow the current operation.
        * @type {Boolean}
        * @summary true to cancel the operation, or false otherwise.
        */
        get cancel(): boolean;
        _cancel: boolean;
    }
}
declare module "Controls/Events" {
    /**
    * @namespace MindFusion.Controls
    */
    /**
    * @class Defines all events raised in the Controls namespace.
    */
    export class Events {
        /**
        * Raised when the control is loaded.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get controlLoaded(): string;
    }
}
declare module "Controls/Control" {
    /**
    * @class Disposable abstract class.
    */
    export class Disposable {
        static eventHandlerList(): Map<any, any>;
        static registerDisposableObject(instance: any): void;
        static addHandler(instance: any, eventName: any, handler: any): void;
        static getHandler(instance: any, eventName: any): (source: any, args: any) => void;
        static removeHandler(instance: any, eventName: any, handler: any): void;
        static getEvent(instance: any, eventName: any, create: any): any;
        eventHandlers: Map<any, any>;
        unloadDelegate: () => void;
        dispose(): void;
        get loaded(): boolean;
        /**
        * Registers a single event listener on the instance.
        * @param {String} eventName The name of the event.
        * @param {Function} handler Represents the method that will handle the event specified with eventName.
        * @param {Object} [element] For internal use.
        */
        addEventListener(eventName: string, handler: Function, element?: any): void;
        /**
        * Removes a single event listener attached to the instance.
        * @param {String} eventName The name of the event.
        * @param {Function} handler Represents the method that handles the event specified with eventName.
        * @param {Object} [element] For internal use.
        */
        removeEventListener(eventName: string, handler: Function, element?: any): void;
        /**
        * Raises an event.
        * @param {String} eventName The name of the event to raise.
        * @param {EventArgs} args An instance of type EventArgs that holds data for the event specified with eventName.
        * @param {Object} [element] For internal use.
        */
        raiseEvent(eventName: string, args: EventArgs, element?: any): void;
        /**
        * For internal use only.
        * @private
        */
        private prepareScriptEvent;
    }
    /**
    * @class A base class for MindFusion controls.
    * @augments Disposable
    */
    export class Control extends Disposable {
        static createControl(type: any, element: any, args: any): any;
        static attachControl(control: any, element: any): any;
        static detachControl(control: any): void;
        static findControl(id: any): any;
        /**
      * Adds an event listener to a DOM element.
      */
        static addHandlers(element: any, events: any): void;
        /**
    * Removes all event listeners from a DOM element.
    */
        static clearHandlers(element: any): void;
        /**
        * Constructs a JavaScript object from a JSON string.
        * @returns {Object} object The corresponding to the given JSON text.
        */
        static fromJson(json: any): any;
        /**
        * Converts a JavaScript object to a JSON string.
        * @param {Object} object The object to stringify.
        * @returns {String} The JSON string.
        */
        static toJson(object: any): string;
        static set licenseLocation(arg: string);
        /**
        * Gets or sets the location of the MindFusion licensing txt file.
        * @type {String}
        * @summary the location of the MindFusion licensing txt file.
        */
        static get licenseLocation(): string;
        static set licenseKey(arg: any);
        static get licenseKey(): any;
        /**
        * Initializes a new instance of the Control class.
        * @constructor
        * @param {HTMLElement} element The DOM Element this Control is associated with.
        */
        constructor(element: HTMLElement);
        _element: HTMLElement;
        _enabled: boolean;
        initialize(): void;
        /**
        * Returns a reference to the control's DOM element.
        * @type {HTMLElement}
        * @summary The HTML element wrapped by this control.
        */
        get element(): HTMLElement;
        /**
        * For internal use only
        * @private
        */
        private preparePostback;
        /**
        * Registers an onsubmit handler for the Control's parent html form to flush postback data.
        * @param {String} id The id of the hidden field to flush the data to.
        */
        registerForSubmit(id: string): void;
        set enabled(arg: boolean);
        /**
        * Gets or sets whether mouse events are enabled.
        * @type {Boolean}
        * @summary true if the control should respond to mouse events, or false otherwise.
        */
        get enabled(): boolean;
    }
    import { EventArgs } from "Controls/EventArgs";
}
declare module "Controls/Canvas" {
    /**
    * @class Handles drawing on a CanvasRenderingContext2D.
    * @augments Disposable
    */
    export class Canvas extends Disposable {
        elements: any[];
        font: Font;
        /**
        * The unit of measure used for logical coordinates.
        * @type {GraphicsUnit}
        */
        _measureUnit: GraphicsUnit;
        /**
        * The object's bounds.
        * @type {Rect}
        */
        _bounds: Rect;
        invalidRect: any;
        set minVisibleFontSize(arg: number);
        /**
        * Gets or sets a threshold value that hides text if scaled font sizes become smaller.
        * @type {Number}
        * @summary A value specifying the smallest visible font size.
        */
        get minVisibleFontSize(): number;
        repaintDelegate: () => void;
        initialize(context: any): void;
        context: any;
        /**
        * Sets the underlying Canvas element's bounds.
        * @param {Rect} value A Rect instance.
        */
        set bounds(arg: Rect);
        /**
        * Gets the underlying Canvas element's bounds.
        * @type {Rect}
        * @summary A Rect instance.
        */
        get bounds(): Rect;
        /**
        * Gets the current scale of this Canvas.
        * @type {Number}
        * @summary The scale.
        * @private
        */
        private get scale();
        set measureUnit(arg: GraphicsUnit);
        /**
        * Gets or sets the unit of measure used for logical coordinates.
        * @type {GraphicsUnit}
        * @summary A member of the GraphicsUnit enumeration.
        */
        get measureUnit(): GraphicsUnit;
        get backgroundImage(): any;
        get backgroundImageSize(): Size;
        get backgroundImageAlign(): number;
        clear(): void;
        /**
        * Repaints the canvas.
        * @param {Object} [printOptions] For internal use.
        */
        repaint(printOptions?: any): void;
        repainting: boolean;
        repaintId: number;
        doRepaint(repaintArgs: any): void;
        isTransparent(fillStyle: any): boolean;
        drawBackground(clipRect: any): void;
        drawShadows(clipRect: any): void;
        measureString(text: any, font: any, bounds: any, styled: any, ignoreTransform: any): Rect | Size;
        measureTextLines(text: any, bounds: any): number | Rect;
        getRectIntersection(rect: any, point1: any, point2: any, pt: any): void;
        addElement(element: any): void;
        cachedZOrder: any[];
        removeElement(element: any): void;
        /**
        * Invalidates the canvas or a region of the canvas, causing it to be repainted.
        * @param {Rect} [rect] A Rect instance specifying the region that
        * should be repainted. If not specified, the whole diagram will be repainted.
        * @param {Boolean} [force] true to force redraw even if currently painting, or false otherwise.
        */
        invalidate(rect?: Rect, force?: boolean): void;
        invalidateZOrder(): void;
        getZOrder(): any[];
        drawDashLine(fromX: any, fromY: any, toX: any, toY: any): void;
        _minVisibleFontSize: number;
    }
    import { Disposable } from "Controls/Control";
    import { Font } from "@mindfusion/drawing";
    import { GraphicsUnit } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
    import { Size } from "@mindfusion/drawing";
}
declare module "Controls/CanvasControl" {
    /**
    * @class The CanvasControl class represents a wrapper class for the HTML5 Canvas element.
    * @augments Control
    */
    export class CanvasControl extends Control {
        /**
        * Initializes a new instance of the CanvasControl class.
        * @constructor
        * @param {HTMLCanvasElement} element The Canvas DOM Element this CanvasControl is associated with.
        * @param {Canvas} [canvas] The Canvas instance this CanvasControl is associated with.
        */
        constructor(element: HTMLCanvasElement, canvas?: Canvas);
        canvas: Canvas;
        _zoomFactor: number;
        _scale: number;
        canvasChangedDelegate: (sender: any, args: any) => void;
        beforeRepaintDelegate: (sender: any, args: any) => void;
        repaintDelegate: (sender: any, args: any) => void;
        get context(): any;
        initializeCanvas(): void;
        disposeCanvas(): void;
        onCanvasChanged(sender: any, args: any): void;
        onBeforeRepaint(sender: any, args: any): void;
        onRepaint(sender: any, args: any): void;
        invalidate(): void;
        /**
        * Transforms a point from client to document coordinates.
        * @param {Point} point The point to transform.
        * @returns {Point} The transformed point.
        */
        clientToDoc(point: Point): Point;
        clientToDocLength(length: any): number;
        clientToDocOffset(offset: any): Point;
        clientToDocOverflow(point: any): Point;
        /**
        * Transforms a point from document to client coordinates.
        * @param {Point} point The point to transform.
        * @returns {Point} The transformed point.
        */
        docToClient(point: Point): Point;
        docToClientOverflow(point: any): Point;
        updateScale(): void;
        set scale(arg: number);
        get scale(): number;
        updateCanvasSize(): void;
        /**
        * Sets the unit of measure used for logical coordinates.
        * @param {GraphicsUnit} value A GraphicsUnit instance.
        */
        set measureUnit(arg: GraphicsUnit);
        /**
        * Gets the unit of measure used for logical coordinates.
        * @type {GraphicsUnit}
        * @summary A member of the GraphicsUnit enumeration.
        */
        get measureUnit(): GraphicsUnit;
    }
    import { Control } from "Controls/Control";
    import { Canvas } from "Controls/Canvas";
    import { Point } from "@mindfusion/drawing";
    import { GraphicsUnit } from "@mindfusion/drawing";
}
declare module "Controls/DomUtils" {
    /**
     * @class Contains DOM-related helper functions.
     */
    export class DomUtils {
        /**
        * For internal use only.
        * @private
        */
        private static getPageScroll;
        static getCursorPos(e: any, element: any): Point;
        /**
        * For internal use only.
        * @private
        */
        private static getClientPos;
        /**
        * For internal use only.
        * @private
        */
        private static getChildrenByTagName;
        /**
        * Formats the specified string according to the specified parameters.
        */
        static formatString(...args: any[]): any;
        static escapeHtml(string: any): string;
        static unescapeHtml(escapedString: any): string;
        /**
        * Converts HTML to XHMTL.
        * @param {String} html The HTML to convert.
        * @returns {String} The resulting XHTML.
        */
        static HTMLtoXHTML(html: string): string;
        /**
        * Loads the images from the specified list of image url-s.
        * @param {Array} images An array of image url-s.
        * @returns {Promise} Promise object contaning an array of images in base64 format.
        */
        static loadImageList(images: any[]): Promise<any>;
        /**
        * Converts an image to base64 string.
        * @param {String} url The url of the image.
        * @param {Function} callback The callback function.
        * @returns {String} The base64-encoded string, representing the image.
        */
        static toDataUrl(url: string, callback: Function): string;
        /**
      * Reads a JSON file.
      * @param {String} url The url of the file.
      * @param {Function} callback The callback function.
      * @returns {String} The JSON string.
      */
        static loadJSON(url: string, callback: Function): string;
        static getCursorPosition(e: any, parent: any, scroller: any): {
            x: any;
            y: any;
        };
        static getLocation(element: any): {
            x: any;
            y: any;
        };
        static setLocation(element: any, location: any): void;
        /**
        * Gets the bounds of the specified element.
        * @param {HTMLElement} element The element to check.
        * @param {HTMLElement} [parent] The parent of the element. If supplied, the returned bounds will be relative to the parent element bounds.
        * @param {Boolean} [includeScroll] For internal use.
        * @returns {Rect} The bounding rectangle.
        */
        static getBounds(element: HTMLElement, parent?: HTMLElement, includeScroll?: boolean): Rect;
        static getBounds2(element: any): Rect;
        static getRect(element: any): Rect;
        /**
        * Sets the bounds of the specified element.
        * @param {HTMLElement} element The element.
        * @param {Rect} bounds The bounding rectangle.
        */
        static setBounds(element: HTMLElement, bounds: Rect): void;
        /**
        * Sets the size of the specified element.
        * @param {HTMLElement} element The element.
        * @param {Size} size The new size.
        */
        static setSize(element: HTMLElement, size: Size): void;
        static getRelativeBounds(element: any, parent: any): Rect;
        static getBodySize(): Size;
        static getScrollXY(): {
            scrollLeft: number;
            scrollTop: number;
        };
        static getComputedStyle(element: any): any;
        static addCssClass(element: any, className: any): void;
        static removeCssClass(element: any, className: any): void;
        static hasCssClass(element: any, className: any): any;
        static toggleCssClass(element: any, className: any): void;
        static setCssClass(element: any, className: any, value: any): void;
        static getParent(element: any, className: any): any;
        static isChildOf(element: any, parentElement: any): boolean;
        static removeNode(element: any, parentElement: any): void;
        static removeNodes(elementList: any): void;
        static eventHandled(e: any, stopPropagation: any): boolean;
        static getMaxZIndex(element: any): number;
        static getScrollbarWidth(): number;
        static getCaretPos(input: any): number;
        static setCaretPos(input: any, start: any, end: any): void;
        static mapToObject(map: any): {};
        static reverseMap(map: any): Map<any, any>;
        static keepInView(child: any, parent: any): void;
        static getTextNode(element: any): any;
        /**
        * Gets an object containing element attributes that have values.
        */
        static getElementAttributes(element: any): any[];
        static waitFor(condition: any, callback: any): void;
    }
    import { Point } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
    import { Size } from "@mindfusion/drawing";
}
declare module "Controls/Enum" {
    /**
     * *
     */
    export type ButtonType = number;
    export namespace ButtonType {
        const ScrollLeft: number;
        const ScrollUp: number;
        const ScrollRight: number;
        const ScrollDown: number;
        const ZoomIn: number;
        const ZoomOut: number;
        const ZoomScale: number;
        const ZoomSlider: number;
    }
    /**
     * *
     */
    export type Orientation = number;
    export namespace Orientation {
        const Horizontal: number;
        const Vertical: number;
    }
    /**
     * Specifies the position of trackbar ticks.
     */
    export type TickPosition = number;
    export namespace TickPosition {
        const None: number;
        const Left: number;
        const Right: number;
        const Both: number;
    }
    /**
     * Specifies the alignment of text relative to its layout rectangle.
     */
    export type Alignment = number;
    export namespace Alignment {
        const Near: number;
        const Center: number;
        const Far: number;
    }
    /**
     * Specifies the type of the mouse cursor.
     */
    export type MouseCursors = string;
    export namespace MouseCursors {
        const Auto: string;
        const Crosshair: string;
        const Default: string;
        const Pointer: string;
        const Move: string;
        const HorizontalResize: string;
        const CounterDiagonalResize: string;
        const DiagonalResize: string;
        const VerticalResize: string;
        const Text: string;
        const Wait: string;
        const Help: string;
        const Progress: string;
        const Inherit: string;
        const Rotate: string;
        const Nothing: string;
        const NotAllowed: string;
        const Pan: string;
    }
    /**
     * Specifies which button was pressed to trigger the event.
     */
    export type MouseButton = number;
    export namespace MouseButton {
        const Main: number;
        const Auxiliary: number;
        const Secondary: number;
        const Fourth: number;
        const Fifth: number;
    }
}
declare module "Controls/Button" {
    export default Button;
    class Button {
        constructor(parent: any, type: any);
        parent: any;
        type: any;
        pen: string;
        brush: string;
        decorationPen: string;
        decorationBrush: string;
        hotPen: string;
        hotBrush: string;
        hotDecorationPen: string;
        hotDecorationBrush: string;
        draw(context: any): void;
        hitTest(mousePosition: any): Button;
        setBounds(bounds: any): void;
        bounds: any;
        setShape(shape: any): void;
        shape: any;
        setDecoration(decoration: any): void;
        decoration: any;
    }
}
declare module "Controls/ZoomControl" {
    /**
    * @class The ZoomControl lets users zoom and pan a target view control interactively.
    * @augments CanvasControl
    */
    export class ZoomControl extends CanvasControl {
        /**
        * Creates and initializes a new ZoomControl from the specified element.
        * This method is static and can be called without creating an instance of the class.
        * @param {HTMLCanvasElement} element The DOM element that the zoomControl should be attached to.
        * @returns {ZoomControl} A ZoomControl object that represents
        * the newly created zoomControl.
        */
        static create(element: HTMLCanvasElement): ZoomControl;
        /**
        * Returns the specified ZoomControl object. This member is static and can be
        * invoked without creating an instance of the class.
        * @param {String} id The id of the ZoomControl's element.
        * @returns {ZoomControl} A ZoomControl object with the specified id, if found; otherwise, null.
        */
        static find(id: string): ZoomControl;
        /**
        * Creates an instance of ZoomControl.
        * @constructor
        * @param {HTMLCanvasElement} element The Canvas DOM Element this ZoomControl is associated with.
        */
        constructor(element: HTMLCanvasElement);
        controls: {};
        manipulators: any[];
        _minZoomFactor: number;
        _maxZoomFactor: number;
        _zoomStep: number;
        _snapToZoomStep: boolean;
        _scrollStep: number;
        _showLabel: boolean;
        _padding: number;
        _tickPosition: number;
        _cornerRadius: number;
        _fill: string;
        _backColor: string;
        _activeColor: string;
        _borderColor: string;
        _innerColor: string;
        _shadowColor: string;
        _textColor: string;
        postDataField: HTMLElement;
        mouseUpDelegate: (e: any) => void;
        /**
        * For internal use only
        * @private
        */
        private postback;
        /**
        * For internal use only
        * @private
        */
        private init;
        orientation: number;
        minDim: number;
        maxDim: number;
        radius: number;
        center: number;
        spacing: number;
        buttonSize: number;
        decorationSize: number;
        /**
        * For internal use only.
        * @private
        */
        private createControls;
        /**
        * For internal use only.
        * @private
        */
        private repaint;
        /**
        * For internal use only.
        * @private
        */
        private fromJson;
        targetId: any;
        set padding(arg: number);
        /**
        * Gets or sets the padding of the control's contents.
        * @type {Number}
        * @summary The padding of the control's contents.
        */
        get padding(): number;
        set minZoomFactor(arg: number);
        /**
        * Gets or sets the minimum zoom level allowed to set through this control.
        * @type {Number}
        * @summary The minimum zoom level.
        */
        get minZoomFactor(): number;
        set maxZoomFactor(arg: number);
        /**
        * Gets or sets the maximum zoom level allowed to set through this control.
        * @type {Number}
        * @summary The maximum zoom level.
        */
        get maxZoomFactor(): number;
        set zoomStep(arg: number);
        /**
        * Gets or sets the amount by which to change zoom level when + and - buttons are clicked.
        * @type {Number}
        * @summary The zoom step.
        */
        get zoomStep(): number;
        set scrollStep(arg: number);
        /**
        * Gets or sets the scroll offset added when users click the pan arrows.
        * @type {Number}
        * @summary The scroll step.
        */
        get scrollStep(): number;
        set snapToZoomStep(arg: boolean);
        /**
        * Gets or sets a value indicating whether the trackbar should snap to ZoomStep values when dragged.
        * @type {Boolean}
        * @summary True if snapping is enabled, or false otherwise.
        */
        get snapToZoomStep(): boolean;
        set showLabel(arg: boolean);
        /**
        * Gets or sets a value indicating whether the label that shows the current zoom level should be visible.
        * @type {Boolean}
        * @summary True if the label is visible, or false otherwise.
        */
        get showLabel(): boolean;
        set tickPosition(arg: number);
        /**
        * Gets or sets the current tick position of the trackbar.
        * @type {TickPosition}
        * @summary A member of the TickPosition enumeration.
        */
        get tickPosition(): number;
        set cornerRadius(arg: number);
        /**
        * Gets or sets the corner radius of rounded child elements.
        * @type {Number}
        * @summary The corner radius of rounded child elements.
        */
        get cornerRadius(): number;
        set fill(arg: string);
        /**
        * Gets or sets the color used to fill the ZoomControl elements.
        * @type {String}
        * @summary The color used to fill the ZoomControl elements.
        */
        get fill(): string;
        set backColor(arg: string);
        /**
        * Gets or sets the background color of the control.
        * @type {String}
        * @summary The color of the control background.
        */
        get backColor(): string;
        set activeColor(arg: string);
        /**
        * Gets or sets the color used to render depressed buttons.
        * @type {String}
        * @summary The color used to render depressed buttons.
        */
        get activeColor(): string;
        set borderColor(arg: string);
        /**
        * Gets or sets the color of ZoomControl elements' borders.
        * @type {String}
        * @summary The color of ZoomControl elements' borders.
        */
        get borderColor(): string;
        set innerColor(arg: string);
        /**
        * Gets or sets the color of plus, minus and arrow icons.
        * @type {String}
        * @summary The color of plus, minus and arrow icons.
        */
        get innerColor(): string;
        set shadowColor(arg: string);
        /**
        * Gets or sets the color of the control elements' shadow.
        * @type {String}
        * @summary The color of the control elements' shadow.
        */
        get shadowColor(): string;
        set textColor(arg: string);
        /**
        * Gets or sets the color of the the label that shows the current zoom level.
        * @type {String}
        * @summary The color of the the label that shows the current zoom level.
        */
        get textColor(): string;
        set autoPostBack(arg: boolean);
        /**
        * Gets or sets a value indicating whether the control will post back to the server when the control's value has changed.
        * @type {Boolean}
        * @summary true if the control should post back, or false otherwise.
        */
        get autoPostBack(): boolean;
        /**
        * For internal use only.
        * @private
        */
        private prepare;
        set target(arg: Control);
        /**
        * Gets or sets the control modified by this ZoomControl.
        * @type {Control}
        * @summary The control modified by this ZoomControl.
        */
        get target(): Control;
        /**
        * For internal use only.
        * @private
        */
        private toJson;
        _target: Control;
        onZoomChanged(): void;
        onMouseDown(e: any): void;
        mouseDownPoint: import("Drawing/Point").Point;
        currentManipulator: any;
        onMouseMove(e: any): void;
        onMouseUp(e: any): void;
        onSliderMove(e: any): void;
        hitTestManipulators(mousePosition: any): any;
        setZoomFactorInternal(value: any, applyConstraints: any, updateTarget: any): void;
        updateControls(): void;
        onButtonMouseDown(e: any, button: any): void;
        timer: number;
        onButtonClick(e: any, button: any): void;
        _autoPostBack: boolean;
        set zoomFactor(arg: number);
        /**
        * Gets or sets the zoom factor.
        * @type {Number}
        * @summary The current zoom factor.
        */
        get zoomFactor(): number;
    }
    import { CanvasControl } from "Controls/CanvasControl";
    import { Control } from "Controls/Control";
}
declare module "@mindfusion/controls" {
    export { Base64 } from "Controls/Base64";
    export { Canvas } from "Controls/Canvas";
    export { CanvasControl } from "Controls/CanvasControl";
    export { Disposable, Control } from "Controls/Control";
    export { ControlUtils } from "Controls/ControlUtils";
    export { DomUtils } from "Controls/DomUtils";
    export { EventArgs, CancelEventArgs } from "Controls/EventArgs";
    export { Events } from "Controls/Events";
    export { ZoomControl } from "Controls/ZoomControl";
    export { ButtonType, Orientation, TickPosition, Alignment, MouseCursors, MouseButton } from "Controls/Enum";
}
