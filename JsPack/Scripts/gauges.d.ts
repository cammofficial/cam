/// <reference types="../../@mindfusion/drawing" />
/// <reference types="../../@mindfusion/controls" />
declare module "Gauges/Segment" {
    /**
    * @class Represents a segment of a PathFigure object.
    */
    export class Segment {
        set isStroked(arg: boolean);
        /**
        * Gets or sets a value that indicates whether the segment is stroked.
        * @type {Boolean}
        * @summary True if the segment is stroked, otherwise false.
        */
        get isStroked(): boolean;
        /**
        * Adds the segment to the specified graphics path.
        */
        addTo(path: any, startPoint: any, isOutline: any): void;
        _isStroked: boolean;
    }
    export class LineSegment extends Segment {
        /**
        * Creates an instance of LineSegment class.
        * @constructor
        * @class Represents a line between two points.
        */
        constructor(point: any, isStroked: any);
        set point(arg: Point);
        /**
        * Gets or sets the end point of the line segment.
        * @type {Point}
        * @summary The end point of the line segment.
        */
        get point(): Point;
        _point: Point;
    }
    export class ArcSegment extends Segment {
        /**
        * Creates an instance of ArcSegment class.
        * @constructor
        * @class Represents an elliptical arc between two points.
        */
        constructor(point: any, size: any, rotationAngle: any, isLargeArc: any, isCounterclockwise: any, isStroked: any);
        set point(arg: Point);
        /**
        * Gets or sets the endpoint of the elliptical arc.
        * @type {Point}
        * @summary The endpoint of the elliptical arc.
        */
        get point(): Point;
        set size(arg: any);
        /**
        * Gets or sets the x- and y-radius of the arc as a Size structure.
        * @type {Size}
        * @summary The x- and y-radius of the arc as a Size structure.
        */
        get size(): any;
        set rotationAngle(arg: number);
        /**
        * Gets or sets the amount (in degrees) by which the ellipse is rotated about the x-axis.
        * @type {Number}
        * @summary The amount (in degrees) by which the ellipse is rotated about the x-axis.
        */
        get rotationAngle(): number;
        set isLargeArc(arg: boolean);
        /**
        * Gets or sets a value that indicates whether the arc should be greater than 180 degrees.
        * @type {Boolean}
        * @summary True if the arc should be greater than 180 degrees, otherwise false.
        */
        get isLargeArc(): boolean;
        set isCounterclockwise(arg: boolean);
        /**
        * Gets or sets a value that indicates whether the arc is drawn in counterclockwise or clockwise direction.
        * @type {Boolean}
        * @summary True if the arc is drawn in counterclockwise, otherwise false.
        */
        get isCounterclockwise(): boolean;
        getArcParams(pt1: any, pt2: any, isLargeArc: any, isCounterclockwise: any, radiusX: any, radiusY: any, angleRotation: any): (number | Point)[];
        _point: Point;
        _size: any;
        _rotationAngle: number;
        _isLargeArc: boolean;
        _isCounterclockwise: boolean;
    }
    import { Point } from "@mindfusion/drawing";
}
declare module "Gauges/EventArgs" {
    /**
    * @class Provides data for the various custom painting event.
    */
    export class PaintEventArgs extends EventArgs {
        /**
        * Creates an instance of PaintEventArgs class.
        * @constructor
        */
        constructor(args: any);
        _context: any;
        _element: any;
        /**
        * Paints the specified visual element to the underlying canvas.
        * @param {VisualElement} element The VisualElement to paint.
        * @param {Size} constraint The available size.
        */
        paintVisualElement(element: VisualElement, constraint: any): void;
        set element(arg: VisualElement);
        /**
        * Gets or sets the element being custom drawn.
        * @type {VisualElement}
        * @summary A VisualElement instance.
        */
        get element(): VisualElement;
        /**
        * Gets the canvas rendering context.
        * @type {CanvasRenderingContext2D}
        * @summary A rendering context used to draw on the Canvas element.
        */
        get context(): CanvasRenderingContext2D;
    }
    /**
    * @class Provides data for various pre-paint events.
    */
    export class PrepaintEventArgs extends PaintEventArgs {
        set cancelDefaultPainting(arg: boolean);
        /**
        * Gets or sets a value indicating whether the default painting of this element should be performed.
        * @type {Boolean}
        * @summary true if the default painting of this element should be performed; otherwise, false.
        */
        get cancelDefaultPainting(): boolean;
        _cancelDefaultPainting: boolean;
    }
    /**
    * @class Contains the arguments passed to value changing notification handlers.
    */
    export class ValueChangingEventArgs extends CancelEventArgs {
        /**
        * Creates an instance of ValueChangingEventArgs class.
        * @constructor
        */
        constructor(oldValue: any, newValue: any);
        _oldValue: any;
        _newValue: any;
        /**
        * Gets the previous value of the changing property.
        * @type {Object}
        * @summary The previous value of the changing property.
        */
        get oldValue(): any;
        /**
        * Gets the new value of the changing property.
        * @type {Object}
        * @summary The new value of the changing property.
        */
        get newValue(): any;
    }
    /**
    * @class Contains the arguments passed to value changed notification handlers.
    */
    export class ValueChangedEventArgs extends EventArgs {
        /**
        * Creates an instance of ValueChangedEventArgs class.
        * @constructor
        */
        constructor(oldValue: any, newValue: any);
        _oldValue: any;
        _newValue: any;
        /**
        * Gets the previous value of the changed property.
        * @type {Object}
        * @summary The previous value of the changed property.
        */
        get oldValue(): any;
        /**
        * Gets the new value of the changed property.
        * @type {Object}
        * @summary The new value of the changed property.
        */
        get newValue(): any;
    }
    import { EventArgs } from "@mindfusion/controls";
    import { VisualElement } from "Gauges/LoadOrder";
    import { CancelEventArgs } from "@mindfusion/controls";
}
declare module "Gauges/Utils" {
    /**
     * @class Contains helper functions.
    */
    export class Utils {
        /**
        * Creates a linear gradient brush with the specified data.
        * @returns {Object} The brush.
        */
        static createLinearGradient(angle: any, params: any): any;
        /**
        * Creates a radial gradient brush with the specified data.
        * @returns {Object} The brush.
        */
        static createRadialGradient(center: any, radius: any, params: any, center2: any, radius2: any): any;
        static offset(p: any, x: any, y: any): Point;
        static log10(value: any): number;
        static getBrush(context: any, brush: any, bounds: any, isPen: any): any;
    }
    export namespace Utils {
        const tm: number[];
        const tm10: number[];
        const tm11: number[];
    }
    import { Point } from "@mindfusion/drawing";
}
declare module "Gauges/Events" {
    /**
    * @namespace MindFusion.Gauges
    */
    /**
    * @class Defines all events raised by the Gauge component.
    */
    export class Events {
        static get prepaint(): string;
        /**
        * Raised before the gauge background is painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get prepaintBackground(): string;
        /**
        * Raised before the gauge foreground is painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get prepaintForeground(): string;
        /**
        * Raised before a gauge scale is painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get prepaintScale(): string;
        /**
        * Raised before a gauge tick is painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get prepaintTick(): string;
        /**
        * Raised before a gauge pointer is painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get prepaintPointer(): string;
        static get paint(): string;
        /**
        * Raised when the gauge background is being painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get paintBackground(): string;
        /**
        * Raised when the gauge foreground is being painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get paintForeground(): string;
        /**
        * Raised when a gauge scale is being painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get paintScale(): string;
        /**
        * Raised when a gauge tick is being painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get paintTick(): string;
        /**
        * Raised when a gauge pointer is being painted.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get paintPointer(): string;
        /**
        * Raised when the value of a pointer has changed interactively.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get valueChanging(): string;
        /**
        * Raised when the value of a pointer is being changed interactively.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get valueChanged(): string;
    }
}
declare module "Gauges/VisualElement" {
    export default VisualElement;
    /**
    * @class Represents an object with outline and fill, which can render itself to a canvas.
    */
    class VisualElement {
        type: string;
        /**
        * @private
        */
        private set width(arg);
        /**
        * @private
        */
        private get width();
        /**
        * @private
        */
        private set height(arg);
        /**
        * @private
        */
        private get height();
        set x(arg: number);
        /**
        * Gets or sets the normalized x position of this element, relative to its parent.
        * @type {Number}
        * @summary The normalized x position of this element, relative to its parent.
        */
        get x(): number;
        set y(arg: number);
        /**
        * Gets or sets the normalized y position of this element, relative to its parent.
        * @type {Number}
        * @summary The normalized y position of this element, relative to its parent.
        */
        get y(): number;
        set isVisible(arg: boolean);
        /**
        * Gets or sets a value indicating whether this element is visible.
        * @type {Boolean}
        * @summary True if the element is visible, otherwise false.
        */
        get isVisible(): boolean;
        set relativeCoordinates(arg: boolean);
        /**
        * Gets or sets a value indicating whether the metrics of this element are expressed as relative or absolute quantities.
        * @type {Boolean}
        * @summary True if the metrics are relative, otherwise false.
        */
        get relativeCoordinates(): boolean;
        set fill(arg: any);
        /**
        * Gets or sets the fill of this element.
        * @type {Object}
        * @summary The fill of this element.
        */
        get fill(): any;
        set stroke(arg: any);
        /**
        * Gets or sets the stroke of this element.
        * @type {Object}
        * @summary The stroke of this element.
        */
        get stroke(): any;
        offsetX: number;
        offsetY: number;
        eventHandlers: Map<any, any>;
        getType(): any;
        fromJson(obj: any): void;
        set name(arg: string);
        /**
            * Gets or sets the name of this element.
            * @type {String}
            * @summary The name of this element.
            * @remarks The name can be used to obtain a reference to the element through a call to the getElementByName method.
            */
        get name(): string;
        set margin(arg: Thickness);
        /**
        * Gets or sets the margin of this element.
        * @type {Thickness}
        * @summary The margin of this element.
        */
        get margin(): Thickness;
        toJson(): {
            __type: any;
            fill: any;
            stroke: any;
            name: string;
            x: number;
            y: number;
            width: any;
            height: any;
            margin: Thickness;
            relativeCoordinates: boolean;
        };
        repaint(context: any): void;
        set outline(arg: any);
        get outline(): any;
        raisePrepaint(context: any): boolean;
        raisePostpaint(context: any): void;
        measure(size: any): void;
        measureOverride(size: any): any;
        /**
        * @private
        */
        private set desiredSize(arg);
        /**
        * @private
        */
        private get desiredSize();
        arrange(): void;
        /**
        * @private
        */
        private set transform(arg);
        /**
        * @private
        */
        private get transform();
        arrangeOverride(): void;
        createPath(): any;
        applyTransform(context: any, applyRelativeScale: any): any;
        toLocal(parentCoordinates: any): Point;
        getElementByName(name: any): VisualElement;
        handleMouse(): void;
        containsPoint(point: any): void;
        raiseEvent(eventName: any, args: any): void;
        _name: string;
        _outline: any;
        _fill: any;
        /**
        * @private
        */
        private get defaultFill();
        _stroke: any;
        /**
        * @private
        */
        private get defaultStroke();
        _isVisible: boolean;
        _margin: Thickness;
        _x: number;
        _y: number;
        set bounds(arg: Rect);
        /**
        * Gets or sets the bounding rectangle of this element.
        * @type {Rect}
        * @summary The bounding rectangle of this element.
        */
        get bounds(): Rect;
        /**
        * Gets the size of this element.
        * @returns {Size} The size of this element.
        */
        getSize(): Size;
        _width: any;
        _height: any;
        _relativeCoordinates: boolean;
        set renderSize(arg: Size);
        /**
        * Gets or sets the rendering size of the element.
        * @type {Size}
        * @summary The rendering size of the element.
        */
        get renderSize(): Size;
        _renderSize: Size;
        _desiredSize: any;
        _transform: any;
        /**
        * @private
        */
        private set strokeThickness(arg);
        _strokeThickness: any;
    }
    import { Thickness } from "@mindfusion/drawing";
    import { Point } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
    import { Size } from "@mindfusion/drawing";
}
declare module "Gauges/VisualElementContainer" {
    /**
    * @private
    */
    export class PointerContainer extends VisualElementContainer {
    }
    /**
    * @class Represents a container which centers its children and makes them with square size.
    */
    export class CenterPanel extends VisualElementContainer {
        size: number;
        measureSize: any;
    }
    export default VisualElementContainer;
    /**
    * @class Represents a visual element which contains other visual elements.
    */
    class VisualElementContainer extends VisualElement {
        static arrangeChild(element: any, size: any): Rect;
        children: any[];
        set isHitTestVisible(arg: any);
        get isHitTestVisible(): any;
        _isHitTestVisible: any;
    }
    import { VisualElement } from "Gauges/LoadOrder";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Gauges/Enum" {
    /**
     * Specifies the orientation of elements.
     */
    export type Orientation = number;
    export namespace Orientation {
        const Horizontal: number;
        const Vertical: number;
    }
    /**
     * Indicates an alignment of an object relative to the scale. In the descriptions
     * below 'outbound' refers to an element's outer outline, 'inbound' refers to an
     * element's inner outline and 'center' refers to en element's center, that is,
     * the middle of the inbound and outbound.
     */
    export type Alignment = number;
    export namespace Alignment {
        const InnerInside: number;
        const InnerCenter: number;
        const InnerOutside: number;
        const OuterInside: number;
        const OuterCenter: number;
        const OuterOutside: number;
        const CenterInside: number;
        const TrueCenter: number;
        const CenterOutside: number;
    }
    /**
     * Indicates the type of the units of a Length object.
     */
    export type LengthType = number;
    export namespace LengthType {
        const Absolute: number;
        const Relative: number;
    }
    /**
     * Specifies a display condition.
     */
    export type DisplayType = number;
    export namespace DisplayType {
        const Auto: number;
        const Always: number;
        const Never: number;
    }
    /**
     * Indicates the type of a scale tick.
     */
    export type TickType = number;
    export namespace TickType {
        const None: number;
        const Major: number;
        const Middle: number;
        const Minor: number;
    }
    /**
     * Indicates the shape of a scale tick.
     */
    export type TickShape = number;
    export namespace TickShape {
        const None_1: number;
        export { None_1 as None };
        export const Custom: number;
        export const Ellipse: number;
        export const Rectangle: number;
        export const RoundRect: number;
        export const Rhombus: number;
        export const Line: number;
        export const Triangle: number;
        export const Arrow1: number;
        export const Arrow2: number;
        export const Arrow3: number;
    }
    /**
     * Indicates the type of function that will be used to distribute values along the gauge scale.
     */
    export type FunctionType = number;
    export namespace FunctionType {
        export const Linear: number;
        export const Logarithmic: number;
        const Custom_1: number;
        export { Custom_1 as Custom };
    }
    /**
     * Indicates the rotation of a label within a scale.
     */
    export type LabelRotation = number;
    export namespace LabelRotation {
        const None_2: number;
        export { None_2 as None };
        const Auto_1: number;
        export { Auto_1 as Auto };
        export const BaselineToCenter: number;
        export const BaselineAwayFromCenter: number;
        export const Sideways: number;
    }
    /**
     * Indicates the shape of a pointer.
     */
    export type PointerShape = number;
    export namespace PointerShape {
        const None_3: number;
        export { None_3 as None };
        const Custom_2: number;
        export { Custom_2 as Custom };
        export const Needle: number;
        export const Needle2: number;
        const Ellipse_1: number;
        export { Ellipse_1 as Ellipse };
        const Rectangle_1: number;
        export { Rectangle_1 as Rectangle };
    }
    /**
     * Specifies an action performed with the mouse.
     */
    export type MouseAction = number;
    export namespace MouseAction {
        const Up: number;
        const Down: number;
        const Move: number;
    }
    /**
     * Specifies the appearance of an oval gauge.
     */
    export type OvalGaugeStyle = number;
    export namespace OvalGaugeStyle {
        const Circular: number;
        const QuadraticNE: number;
        const QuadraticNW: number;
        const QuadraticSE: number;
        const QuadraticSW: number;
        const SemicircleN: number;
        const SemicircleE: number;
        const SemicircleS: number;
        const SemicircleW: number;
    }
}
declare module "Gauges/Length" {
    /**
    * @class Specifies distance expressed either absolutely, through pixels, or relatively, through a percentage of the container's size.
    */
    export class Length {
        /**
        * Creates an instance of Length class.
        * @constructor
        * @param {Number} value A number specifying the initial length value.
        * @param {LengthType} [type] A member of the LengthType enumeration specifying the length type.
        */
        constructor(value: number, type?: LengthType);
        set value(arg: number);
        /**
        * Gets or sets the value representing this length.
        * @type {Number}
        * @summary The value representing this length.
        */
        get value(): number;
        set type(arg: number);
        /**
        * Gets or sets the type of this length.
        * @type {LengthType}
        * @summary The type of this length.
        */
        get type(): number;
        /**
        * Calculates the absolute length corresponding to the specified argument, relative to the the specified area.
        */
        getAbsoluteLength(space: any): number;
        _value: number;
        _type: number;
    }
    import { LengthType } from "Gauges/Enum";
}
declare module "Gauges/Tick" {
    /**
    * @class Represents a tick mark within a gauge scale.
    */
    export class Tick extends VisualElementContainer {
        /**
        * Creates an instance of Tick class.
        * @constructor
        * @param {TickSettings} settings The TickSettings object associated with this tick.
        */
        constructor(settings: any);
        /**
        * @privatefg
        */
        set settings(arg: any);
        /**
        * Gets the TickSettings object associated with this tick.
        * @type {TickSettings}
        * @summary The TickSettings object associated with this tick.
        */
        get settings(): any;
        createVisuals(): void;
        /**
        * @private
        */
        set value(arg: number);
        /**
            * Gets the value associated with this tick.
            * @type {Number}
            * @summary The value associated with this tick.
            */
        get value(): number;
        _value: number;
        /**
        * @private
        */
        set rawValue(arg: number);
        /**
        * Gets the value associated with this tick before it was processed by any value distribution functions.
        * @type {Number}
        * @summary The value associated with this tick before it was processed by any value distribution functions.
        */
        get rawValue(): number;
        _rawValue: number;
        _settings: any;
    }
    import { VisualElementContainer } from "Gauges/LoadOrder";
}
declare module "Gauges/TickLabel" {
    /**
    * @class Represents a tick label within a gauge scale.
    */
    export class TickLabel extends VisualElementContainer {
        /**
        * Creates an instance of TickLabel class.
        * @constructor
        * @param {TickSettings} settings The TickSettings object associated with this label.
        */
        constructor(settings: any);
        /**
        * @private
        */
        set settings(arg: any);
        /**
        * Gets the TickSettings object associated with this label.
        * @type {TickSettings}
        * @summary The TickSettings object associated with this label.
        */
        get settings(): any;
        fontSize: any;
        font: Font;
        getValueAsString(): string;
        /**
        * @private
        */
        set value(arg: number);
        /**
    * Gets the value associated with this label.
    * @type {Number}
    * @summary The value associated with this label.
    */
        get value(): number;
        _value: number;
        /**
        * @private
        */
        set rawValue(arg: number);
        /**
        * Gets the value associated with this tick before it was processed by any value distribution functions.
        * @type {Number}
        * @summary The value associated with this tick before it was processed by any value distribution functions.
        */
        get rawValue(): number;
        _rawValue: number;
        /**
        * @private
        */
        set foreground(arg: any);
        /**
        * Gets the foreground color of this label.
        * @type {Color}
        * @summary The foreground color of this label.
        */
        get foreground(): any;
        _foreground: any;
        _settings: any;
    }
    import { VisualElementContainer } from "Gauges/LoadOrder";
    import { Font } from "@mindfusion/drawing";
}
declare module "Gauges/Pointer" {
    /**
    * @class Represents a needle (or arrow) within a gauge scale.
    */
    export class Pointer extends VisualElementContainer {
        set alignment(arg: number);
        /**
        * Gets or sets the alignment of the pointer relative to the scale.
        * @type {Alignment}
        * @summary The alignment of the pointer relative to the scale.
        * @remarks This property is ignored in oval gauges where the pointer is always pinned to the center of the gauge.
        */
        get alignment(): number;
        set shape(arg: number);
        /**
        * Gets or sets the shape of the pointer.
        * @type {PointerShape}
        * @summary The shape of the pointer.
        */
        get shape(): number;
        set isInteractive(arg: boolean);
        /**
        * Gets or sets a value indicating whether the pointer position should be affected by user interactions.
        * @type {Boolean}
        * @summary True if the pointer is interactive, otherwise false.
        */
        get isInteractive(): boolean;
        set isDiscrete(arg: boolean);
        /**
        * Gets or sets a value indicating whether the pointer value can be changed only discretely(the pointer Value can be only integer).
        * @type {Boolean}
        * @summary True if the pointer is discrete, otherwise false.
        */
        get isDiscrete(): boolean;
        set pointerOffset(arg: Length);
        /**
        * Gets or sets the offset of the pointer along the direction it points to.
        * @type {Length}
        * @summary The offset of the pointer along the direction it points to.
        */
        get pointerOffset(): Length;
        set value(arg: number);
        /**
            * Gets or sets the value this pointer points to.
            * @type {Number}
            * @summary The value this pointer points to.
            */
        get value(): number;
        set pointerWidth(arg: Length);
        /**
        * Gets or sets the width of the pointer.
        * @type {Length}
        * @summary The width of the pointer.
        */
        get pointerWidth(): Length;
        set pointerHeight(arg: Length);
        /**
        * Gets or sets the height of the pointer.
        * @type {Length}
        * @summary The height of the pointer.
        */
        get pointerHeight(): Length;
        set customShape(arg: string);
        /**
        * Gets or sets the definition of the pointer shape when Shape is set to Custom.
        * @type {String}
        * @summary The definition of the pointer shape when Shape is set to Custom.
        */
        get customShape(): string;
        createVisuals(): void;
        discretizeValue(): void;
        processValueChanged(oldValue: any, newValue: any): void;
        discretizingValue: boolean;
        raiseValueChanging(oldValue: any, newValue: any): any;
        raiseValueChanged(oldValue: any, newValue: any): void;
        _value: number;
        _isInteractive: boolean;
        _pointerWidth: Length;
        _pointerHeight: Length;
        _pointerOffset: Length;
        _alignment: number;
        _isDiscrete: boolean;
        _shape: number;
        customshape: string;
    }
    import { VisualElementContainer } from "Gauges/LoadOrder";
    import { Length } from "Gauges/Length";
}
declare module "Gauges/CustomInterval" {
    /**
    * @namespace MindFusion.Gauges
    */
    /**
    * @class Represents an interval with associated custom values for fill and stroke.
    */
    export class CustomInterval {
        set minValue(arg: number);
        /**
        * Gets or sets the start of this custom interval.
        * @type {Number}
        * @summary The start of this custom interval.
        */
        get minValue(): number;
        set maxValue(arg: number);
        /**
        * Gets or sets the end of this custom interval.
        * @type {Number}
        * @summary The end of this custom interval.
        */
        get maxValue(): number;
        /**
        * Checks whether the specified value falls within this interval.
        */
        contains(value: any): boolean;
        fromJson(obj: any): void;
        set fill(arg: any);
        /**
        * Gets or sets the brush to apply as a background of the elements within the custom interval.
        * @type {Object}
        * @summary The brush to apply as a background of the elements within the custom interval.
        */
        get fill(): any;
        set stroke(arg: any);
        /**
        * Gets or sets the brush to apply as an outline of the elements within the custom interval.
        * @type {Object}
        * @summary The brush to apply as an outline of the elements within the custom interval.
        */
        get stroke(): any;
        toJson(): {
            minValue: number;
            maxValue: number;
            fill: any;
            stroke: any;
            foreground: any;
        };
        _minValue: number;
        _maxValue: number;
        _fill: any;
        _stroke: any;
        set foreground(arg: any);
        /**
        * Gets or sets the color to apply as a foreground to the elements within this custom interval.
        * @type {Object}
        * @summary The color to apply as a foreground to the elements within this custom interval.
        */
        get foreground(): any;
        _foreground: any;
    }
}
declare module "Gauges/TickSettings" {
    /**
    * @class Provides settings for the ticks and labels in a gauge scale.
    */
    export class TickSettings {
        /**
        * Creates an instance of TickSettings class.
        * @constructor
        * @param {BaseScale} parent The scale these settings belong to.
        */
        constructor(parent: any);
        parent: any;
        _count: any;
        _step: any;
        _tickWidth: any;
        _tickHeight: any;
        _fill: any;
        _stroke: string;
        _showTicks: any;
        _showLabels: any;
        _labelOffset: Length;
        _tickOffset: Length;
        _labelRotation: number;
        _fontFamily: string;
        _fontSize: any;
        _fontStyle: any;
        _labelForeground: string;
        _tickAlignment: number;
        _labelAlignment: number;
        _tickShape: any;
        _showMaxValueTick: number;
        _numberPrecision: number;
        _customIntervals: any[];
        fromJson(obj: any): void;
        set count(arg: number);
        /**
        * Gets or sets the number of ticks and labels.
        * @type {Number}
        * @summary The number of ticks and labels.
        * @remarks This property is mutually exclusive with the Step property. If both are specified the Step property will take precedence.
        */
        get count(): number;
        set step(arg: number);
        /**
        * Gets or sets the value between adjacent ticks and labels.
        * @type {Number}
        * @summary The value between adjacent ticks and labels.
        * @remarks This property is mutually exclusive with the Count property. If both are specified the Step property will take precedence.
        */
        get step(): number;
        set tickWidth(arg: Length);
        /**
        * Gets or sets the width of a tick.
        * @type {Length}
        * @summary The width of a tick.
        */
        get tickWidth(): Length;
        set tickHeight(arg: Length);
        /**
        * Gets or sets the height of a tick.
        * @type {Length}
        * @summary The height of a tick.
        */
        get tickHeight(): Length;
        set fill(arg: any);
        /**
        * Gets or sets the fill brush of the ticks.
        * @type {Object}
        * @summary The fill brush of the ticks.
        */
        get fill(): any;
        set stroke(arg: any);
        /**
        * Gets or sets the stroke brush of the ticks.
        * @type {Object}
        * @summary The stroke brush of the ticks.
        */
        get stroke(): any;
        set showTicks(arg: boolean);
        /**
        * Gets or sets a value indicating whether the ticks are visible.
        * @type {Boolean}
        * @summary True if ticks are visible, otherwise false.
        */
        get showTicks(): boolean;
        set showLabels(arg: boolean);
        /**
        * Gets or sets a value indicating whether the labels are visible.
        * @type {Boolean}
        * @summary True if labels are visible, otherwise false.
        */
        get showLabels(): boolean;
        set labelOffset(arg: Length);
        /**
        * Gets or sets the offset of the labels relative to their calculated position.
        * @type {Length}
        * @summary The offset of the labels relative to their calculated position.
        */
        get labelOffset(): Length;
        set tickOffset(arg: Length);
        /**
        * Gets or sets the offset of the ticks relative to their calculated position.
        * @type {Length}
        * @summary The offset of the ticks relative to their calculated position.
        */
        get tickOffset(): Length;
        set labelRotation(arg: number);
        /**
        * Gets or sets the rotation mode of the labels.
        * @type {LabelRotation}
        * @summary The rotation mode of the labels.
        */
        get labelRotation(): number;
        set fontFamily(arg: string);
        /**
        * Gets or sets the font family of the labels.
        * @type {String}
        * @summary The font family of the labels.
        */
        get fontFamily(): string;
        set fontSize(arg: Length);
        /**
        * Gets or sets the font size of the labels.
        * @type {Length}
        * @summary The font size of the labels.
        */
        get fontSize(): Length;
        set fontStyle(arg: string);
        /**
        * Gets or sets the font style of the labels.
        * @type {String}
        * @summary The font style of the labels.
        */
        get fontStyle(): string;
        set labelForeground(arg: any);
        /**
        * Gets or sets the brush used to paint label texts.
        * @type {Object}
        * @summary The brush used to paint label texts.
        */
        get labelForeground(): any;
        set labelAlignment(arg: number);
        /**
        * Gets or sets the alignment of the labels relative to the scale.
        * @type {Alignment}
        * @summary The alignment of the labels relative to the scale.
        */
        get labelAlignment(): number;
        set tickAlignment(arg: number);
        /**
        * Gets or sets the alignment of the ticks relative to the scale.
        * @type {Alignment}
        * @summary The alignment of the ticks relative to the scale.
        */
        get tickAlignment(): number;
        set tickShape(arg: number);
        /**
        * Gets or sets the shape of the ticks.
        * @type {TickShape}
        * @summary The shape of the ticks.
        */
        get tickShape(): number;
        set showMaxValueTick(arg: boolean);
        /**
        * Gets or sets a value indicating whether to display a tick for the maxValue of the scale.
        * @type {Boolean}
        * @summary True to display a tick for the maxValue, otherwise false.
        */
        get showMaxValueTick(): boolean;
        toJson(): {
            count: number;
            tickWidth: Length;
            tickHeight: Length;
            fill: any;
            stroke: any;
            showTicks: boolean;
            showLabels: boolean;
            labelOffset: Length;
            tickOffset: Length;
            labelRotation: number;
            fontFamily: string;
            fontSize: Length;
            fontStyle: string;
            labelForeground: any;
            labelAlignment: number;
            tickAlignment: number;
            tickShape: number;
            showMaxValueTick: boolean;
        };
        set numberPrecision(arg: number);
        /**
        * Gets or sets the number recision of the labels.
        * @type {Number}
        * @summary The number recision of the labels.
        */
        get numberPrecision(): number;
        /**
        * Gets an array of CustomInterval objects, which can be used to customize the appearance of the ticks in a particular interval.
        * @type {Array}
        * @summary An array of CustomInterval objects, which can be used to customize the appearance of the ticks in a particular interval.
        */
        get customIntervals(): any[];
        /**
        * Adds a CustomInterval object to these settings' customIntervals collection.
        * @param {CustomInterval} interval The interval to add.
        */
        addCustomInterval(interval: CustomInterval): void;
        /**
        * Removes a CustomInterval object from these settings' customIntervals collection.
        * @param {CustomInterval} interval The interval to remove.
        */
        removeCustomInterval(interval: CustomInterval): void;
        get defaultStep(): any;
        get defaultFill(): any;
        get defaultStroke(): string;
        get defaultTickOffset(): Length;
        get defaultTickAlignment(): number;
        get defaultLabelFormat(): string;
        get defaultLabelOffset(): Length;
        get defaultLabelAlignment(): number;
        get defaultLabelRotation(): number;
        get defaultFontFamily(): string;
        get defaultLabelForeground(): string;
        get defaultShowMaxValueTick(): number;
        get defaultNumberPrecision(): number;
    }
    /**
    * @class Provides settings for the major ticks and labels in a gauge scale.
    */
    export class MajorTickSettings extends TickSettings {
        tickType: number;
        get defaultCount(): number;
        get defaultTickWidth(): Length;
        get defaultTickHeight(): Length;
        get defaultShowTicks(): boolean;
        get defaultShowLabels(): boolean;
        get defaultFontSize(): Length;
        get defaultFontStyle(): string;
        get defaultTickShape(): number;
    }
    /**
    * @class Provides settings for the middle ticks and labels in a gauge scale.
    */
    export class MiddleTickSettings extends TickSettings {
        tickType: number;
        get defaultCount(): number;
        get defaultTickWidth(): Length;
        get defaultTickHeight(): Length;
        get defaultShowTicks(): boolean;
        get defaultShowLabels(): boolean;
        get defaultFontSize(): Length;
        get defaultFontStyle(): string;
        get defaultTickShape(): number;
    }
    /**
    * @class Provides settings for the minor ticks and labels in a gauge scale.
    */
    export class MinorTickSettings extends TickSettings {
        tickType: number;
        get defaultCount(): number;
        get defaultTickWidth(): Length;
        get defaultTickHeight(): Length;
        get defaultShowTicks(): boolean;
        get defaultShowLabels(): boolean;
        get defaultFontSize(): Length;
        get defaultFontStyle(): string;
        get defaultTickShape(): number;
    }
    import { Length } from "Gauges/Length";
    import { CustomInterval } from "Gauges/CustomInterval";
}
declare module "Gauges/Range" {
    /**
    * @class Represents a range within a gauge scale.
    */
    export class Range extends VisualElementContainer {
        set startWidth(arg: Length);
        /**
        * Gets or sets the width of this range at its start.
        * @type {Length}
        * @summary The width of this range at its start.
        */
        get startWidth(): Length;
        set endWidth(arg: Length);
        /**
        * Gets or sets the width of this range at its end.
        * @type {Length}
        * @summary The width of this range at its end.
        */
        get endWidth(): Length;
        set strokeInside(arg: boolean);
        /**
        * Gets or sets a value indicating whether to draw a stroke at the inside of this range.
        * @type {Boolean}
        * @summary True if there should be a stroke at the inside of this range, otherwise false.
        */
        get strokeInside(): boolean;
        set strokeOutside(arg: boolean);
        /**
        * Gets or sets a value indicating whether to draw a stroke at the outside of this range.
        * @type {Boolean}
        * @summary True if there should be a stroke at the outside of this range, otherwise false.
        */
        get strokeOutside(): boolean;
        set capStart(arg: boolean);
        /**
        * Gets or sets a value indicating whether to draw a stroke in the beginning of this range.
        * @type {Boolean}
        * @summary True if there should be a stroke in the beginning of this range, otherwise false.
        */
        get capStart(): boolean;
        set capEnd(arg: boolean);
        /**
        * Gets or sets a value indicating whether to draw a stroke in the end of this range.
        * @type {Boolean}
        * @summary True if there should be a stroke in the end of this range, otherwise false.
        */
        get capEnd(): boolean;
        set offset(arg: Length);
        /**
        * Gets or sets the offset of the range from the position calculated according to its alignment.
        * @type {Length}
        * @summary The offset of the range from the position calculated according to its alignment.
        */
        get offset(): Length;
        set alignment(arg: number);
        /**
        * Gets or sets the alignment of this range relative to the scale it is associated with.
        * @type {Alignment}
        * @summary The alignment of this range relative to the scale it is associated with.
        */
        get alignment(): number;
        set minValue(arg: number);
        /**
        * Gets or sets the start value of this range.
        * @type {Number}
        * @summary The start value of this range.
        */
        get minValue(): number;
        set maxValue(arg: number);
        /**
        * Gets or sets the end value of this range.
        * @type {Number}
        * @summary The end value of this range.
        */
        get maxValue(): number;
        set autoSize(arg: boolean);
        /**
        * Gets or sets a value indicating whether the start and end width of the range will be automatically adjusted to match the width of the scale.
        * @type {Boolean}
        * @summary True if the range is autosized, otherwise false.
        * @remarks If this property is set to true the values of startWidth and endWidth properties are ignored.
        */
        get autoSize(): boolean;
        _minValue: number;
        _maxValue: number;
        _alignment: number;
        _startWidth: Length;
        _endWidth: Length;
        _offset: Length;
        _capStart: boolean;
        _capEnd: boolean;
        _strokeInside: boolean;
        _strokeOutside: boolean;
        _autoSize: boolean;
    }
    import { VisualElementContainer } from "Gauges/LoadOrder";
    import { Length } from "Gauges/Length";
}
declare module "Gauges/BaseScale" {
    export default BaseScale;
    class BaseScale extends VisualElementContainer {
        /**
        * Creates an instance of BaseScale.
        * @constructor
        * @param {BaseGauge} parent The gauge control this scale belongs to.
        * @class Represents a scale within a gauge control.
        */
        constructor(parent: any);
        parent: any;
        root: void;
        /**
        * A list of pointer objects.
        * @type {Array<Pointer>}
        */
        _pointers: Array<Pointer>;
        /**
        * A list of range objects.
        * @type {Range}
        */
        _ranges: Range;
        _minValue: number;
        _maxValue: number;
        scaleCenter: Point;
        scaleRadius: number;
        absoluteSize: Size;
        set startWidth(arg: Length);
        /**
        * Gets or sets the width of the scale at its beginning.
        * @type {Length}
        * @summary The width of the scale at its beginning.
        */
        get startWidth(): Length;
        set endWidth(arg: Length);
        /**
        * Gets or sets the width of the scale at its end.
        * @type {Length}
        * @summaryThe width of the scale at its end.
        */
        get endWidth(): Length;
        _logarithmBase: number;
        _functionType: number;
        _functionArgument: number;
        _majorTickSettings: MajorTickSettings;
        _middleTickSettings: MiddleTickSettings;
        _minorTickSettings: MinorTickSettings;
        pointerEvents: any[];
        set minValue(arg: number);
        /**
        * Gets or sets the minimal value displayed by the scale.
        * @type {Number}
        * @summary The minimal value displayed by the scale.
        */
        get minValue(): number;
        set maxValue(arg: number);
        /**
        * Gets or sets the maximal value displayed by the scale.
        * @type {Number}
        * @summary The maximal value displayed by the scale.
        */
        get maxValue(): number;
        set logarithmBase(arg: number);
        /**
        * Gets or sets the logarithm base when FunctionType is set to Logarithmic.
        * @type {Number}
        * @summary The logarithm base when functionType is set to Logarithmic.
        */
        get logarithmBase(): number;
        set functionType(arg: number);
        /**
        * Gets or sets the type of the function used to calculate the distribution of values along the scale.
        * @type {FunctionType}
        * @summary The type of the function used to calculate the distribution of values along the scale.
        */
        get functionType(): number;
        set functionArgument(arg: number);
        /**
        * Gets or sets the argument passed to custom functions.
        * @type {Number}
        * @summary The argument passed to custom functions.
        */
        get functionArgument(): number;
        set customFunction(arg: any);
        /**
        * Gets or sets the function to be used for distribution of values along the scale when functionType is set to Custom.
        * @type {FunctionDelegate}
        * @summary The function to be used for distribution of values along the scale when functionType is set to Custom.
        */
        get customFunction(): any;
        /**
        * Sets the reversed version of the function specified through customFunction.
        * @param {FunctionDelegate} value The reversed version of the function specified through CustomFunction.
        */
        set reversedCustomFunction(arg: any);
        /**
        * Gets or sets the reversed version of the function specified through customFunction.
        * @type {FunctionDelegate}
        * @summary The reversed version of the function specified through CustomFunction.
        */
        get reversedCustomFunction(): any;
        /**
        * Gets the settings for the major ticks and their associated labels.
        * @type {MajorTickSettings}
        * @summary The settings for the major ticks and their associated labels.
        */
        get majorTickSettings(): MajorTickSettings;
        /**
        * Gets the settings for the middle ticks and their associated labels.
        * @type {MiddleTickSettings}
        * @summary The settings for the middle ticks and their associated labels.
        */
        get middleTickSettings(): MiddleTickSettings;
        /**
        * Gets the settings for the minor ticks and their associated labels.
        * @type {MinorTickSettings}
        * @summary The settings for the minor ticks and their associated labels.
        */
        get minorTickSettings(): MinorTickSettings;
        createVisuals(): void;
        geometryContainer: VisualElementContainer;
        tickContainer: PointerContainer;
        rangeContainer: VisualElementContainer;
        labelContainer: VisualElementContainer;
        childrenContainer: VisualElementContainer;
        pointerContainer: PointerContainer;
        invalidate(): void;
        updateScaleGeometry(): void;
        geometry: any;
        updateTicksAndLabels(): void;
        renderTicksAndLabels(settingsQueue: any, intervalStart: any, intervalEnd: any, endRestriction: any, includeStart: any, includeEnd: any): void;
        addTickAndLabel(value: any, settings: any): void;
        getLabelValue(calculatedLabelValue: any, settings: any): any;
        convertValue(input: any): any;
        /**
        * Adds a Pointer object to the pointers collection.
        * @param {Pointer} pointer The pointer to add.
        */
        addPointer(pointer: Pointer): void;
        /**
        * Removes a Pointer object from the pointers collection.
        * @param {Pointer} pointer The pointer to remove.
        */
        removePointer(pointer: Pointer): void;
        updateInteractivePointers(point: any, started: any, finished: any): void;
        pointerStartValue: any;
        /**
        * Adds a Range object to the ranges collection.
        * @param {Range} range The ranges to add.
        */
        addRange(range: Range): void;
        /**
        * Removes a Range object from the ranges collection.
        * @param {Range} range The ranges to remove.
        */
        removeRange(range: Range): void;
        measureString(text: any, font: any, bounds: any): Size;
        convertValueBack(input: any): any;
        getTickStep(settings: any, span: any): any;
        /**
        * Returns the array of all pointers in this scale.
        * @type {Array}
        * @summary Array of all Pointer instances in the scale.
        */
        get pointers(): any[];
        /**
        * Returns the array of all ranges in this scale.
        * @type {Array}
        * @summary Array of all Range instances in the scale.
        */
        get ranges(): any[];
        _startWidth: Length;
        _endWidth: Length;
        _customFunction: any;
        _reversedCustomFunction: any;
    }
    import { VisualElementContainer } from "Gauges/LoadOrder";
    import { Pointer } from "Gauges/Pointer";
    import { Range } from "Gauges/Range";
    import { Point } from "@mindfusion/drawing";
    import { Size } from "@mindfusion/drawing";
    import { Length } from "Gauges/Length";
    import { MajorTickSettings } from "Gauges/TickSettings";
    import { MiddleTickSettings } from "Gauges/TickSettings";
    import { MinorTickSettings } from "Gauges/TickSettings";
    import { PointerContainer } from "Gauges/VisualElementContainer";
}
declare module "Gauges/GeometryFactory" {
    /**
    * @class A factory class for various geometry objects.
    */
    export class GeometryFactory {
        /**
        * Generates a linear bar geometry with the specified parameters.
        * @param {Number} centerX The x-coordinate of the generated geometry.
        * @param {Number} centerY The y-coordinate of the generated geometry.
        * @param {Number} startInnerOffset The start inner offset of the generated geometry relative to the specified center.
        * @param {Number} startOuterOffset The start outer offset of the generated geometry relative to the specified center.
        * @param {Number} endInnerOffset The end inner offset of the generated geometry relative to the specified center.
        * @param {Number} endOuterOffset The end outer offset of the generated geometry relative to the specified center.
        * @param {Number} length The length of the generated geometry.
        * @param {Boolean} isVertical A flag indicating whether the generated geometry is vertical.
        * @param {Boolean} capStart A flag indicating whether to draw a stroke at the start of the bar.
        * @param {Boolean} capEnd A flag indicating whether to draw a stroke at the end of the bar.
        * @param {Boolean} strokeInner A flag indicating whether to draw a stroke at the inner side of the bar.
        * @param {Boolean} strokeOuter A flag indicating whether to draw a stroke at the outer side of the bar.
        * @returns {PathFigure} A PathFigure representing a linear bar with the specified parameters.
        * @remarks The generated geometry is a trapezium.
        * For example, a vertical linear geometry with centerX = 10, centerY = 10,
        * startInnerOffset = 0, startOuterOffset = 5, endInnerOffset = 0, endOuerOffset = 10,
        * length = 100; will be a trapezium with points (10, 110), (15, 110), (20, 10), (10, 10).
        * A horizontal lienar geometry with the above parameters will be a trapezium
        * with points (10, 10), (10, 15), (110, 20), (110, 10).
        */
        static createLinearGeometry(centerX: number, centerY: number, startInnerOffset: number, startOuterOffset: number, endInnerOffset: number, endOuterOffset: number, length: number, isVertical: boolean, capStart: boolean, capEnd: boolean, strokeInner: boolean, strokeOuter: boolean): PathFigure;
        /**
        * Generates a radial bar geometry with the specified parameters.
        * @param {Number} centerX The x-coordinate of the generated geometry.
        * @param {Number} centerY The y-coordinate of the generated geometry.
        * @param {Number} startInnerRadius The radius of the start point of the inner outline of the bar.
        * @param {Number} startOuterRadius The radius of the start point of the outer outline of the bar.
        * @param {Number} endInnerRadius The radius of the end point of the inner outline of the bar.
        * @param {Number} endOuterRadius The radius of the end point of the outer outline of the bar.
        * @param {Number} startAngle The start angle of the radial bar.
        * @param {Number} endAngle The end angle of the radial bar.
        * @param {Boolean} capStart A flag indicating whether to draw a stroke at the start of the bar.
        * @param {Boolean} capEnd A flag indicating whether to draw a stroke at the end of the bar.
        * @param {Boolean} strokeInner A flag indicating whether to draw a stroke at the inner curve of the bar.
        * @param {Boolean} strokeOuter A flag indicating whether to draw a stroke at the outer curve of the bar.
        * @returns {PathFigure} A PathFigure representing a radial bar with the specified parameters.
        */
        static createRadialGeometry(centerX: number, centerY: number, startInnerRadius: number, startOuterRadius: number, endInnerRadius: number, endOuterRadius: number, startAngle: number, endAngle: number, capStart: boolean, capEnd: boolean, strokeInner: boolean, strokeOuter: boolean): PathFigure;
        static getOutlineRadius(startRadius: any, endRadius: any, startAngle: any, endAngle: any, angle: any): any;
    }
    import { PathFigure } from "Gauges/PathFigure";
}
declare module "Gauges/LinearScale" {
    export default LinearScale;
    /**
    * @class Represents a linear scale.
    */
    class LinearScale extends BaseScale {
        set scaleLength(arg: Length);
        /**
        * Gets or sets the length of the scale.
        * @type {Length}
        * @summary The length of the scale.
        */
        get scaleLength(): Length;
        set orientation(arg: number);
        /**
        * Gets or sets the orientation of the scale.
        * @type {Orientation}
        * @summary The orientation of the scale.
        */
        get orientation(): number;
        set scaleAlignment(arg: number);
        /**
        * Gets or sets  the alignment of the scale.
        * @type {Alignment}
        * @summary The alignment of the scale.
        * @remarks All Inner* values align a vertical scale to the left side and a horizontal
        * scale to the top side of the control. All Outer* values align a vertical
        * scale to the right side and a horizontal scale to the bottom side of the
        * control. All Center* values center the scale along its length.
        */
        get scaleAlignment(): number;
        createScaleGeometry(): import("Gauges/PathFigure").PathFigure;
        measureTick(tick: any, constraint: any): Size;
        arrangeTick(tick: any): void;
        measurePointer(pointer: any, constraint: any): Size;
        arrangePointer(pointer: any): void;
        alignBasePoint(offset: any, alignment: any, value: any, size: any): Point;
        getOutlineOffset(value: any): number;
        arrangeLabel(label: any): void;
        measureRange(range: any, constraint: any): Size;
        createRangeGeometry(range: any): import("Gauges/PathFigure").PathFigure;
        isLeftAlignment(alignment: any, offset: any): boolean;
        calculateAbsoluteLength(length: any): any;
        /**
        * BaseScale.getValueFromPoint override.
        * @param {Point} point The point to test.
        * @returns {Number} The value from the scale, corresponding to the point, possibly MinValue or
        * MaxValue if the specified point cannot be associated with a value.
        */
        getValueFromPoint(point: Point): number;
        getDistanceFromPoint(point: any): number;
        getValueFromDistance(distance: any): number;
        getDistanceFromValue(value: any): number;
        _scaleLength: Length;
        _scaleAlignment: number;
        _orientation: number;
        set left(arg: Length);
        /**
        * Gets or sets the distance between the left of this scale and the left of its container.
        * @type {Length}
        * @summary The distance between the left of this scale and the left of its container.
        */
        get left(): Length;
        _left: Length;
        set top(arg: Length);
        /**
        * Gets or sets the distance between the top of this scale and the top of its container.
        * @type {Length}
        * @summary The distance between the top of this scale and the top of its container.
        */
        get top(): Length;
        _top: Length;
        getBasePoint(): Point;
        getIsVertical(): boolean;
        getAbsoluteWidth(): number;
        getAbsoluteLength(): number;
        getAbsoluteStartWidth(): number;
        getAbsoluteEndWidth(): number;
        getAbsoluteLeft(): number;
        getAbsoluteTop(): number;
        getAbsoluteShortDim(): number;
        getAbsoluteLongDim(): number;
        getAbsoluteSize(): Size;
    }
    import { BaseScale } from "Gauges/LoadOrder";
    import { Length } from "Gauges/Length";
    import { Size } from "@mindfusion/drawing";
    import { Point } from "@mindfusion/drawing";
}
declare module "Gauges/OvalScale" {
    export default OvalScale;
    /**
    * @class Represents a radial scale.
    */
    class OvalScale extends BaseScale {
        set scaleRelativeCenter(arg: Point);
        /**
        * Gets or sets the center of the scale relative to the scale bounds.
        * @type {Point}
        * @summary The center of the scale relative to the scale bounds.
        * @remarks A value of (0.5, 0.5) indicates the center of the bounds, a value of (0, 0) indicates the top-left corner.
        */
        get scaleRelativeCenter(): Point;
        set scaleRelativeRadius(arg: number);
        /**
        * Gets or sets the radius of the scale relative to the scale bounds.
        * @type {Number}
        * @summary The radius of the scale relative to the scale bounds.
        * @remarks A value of 0.5 indicates that the radius is half the size of the scale.
        */
        get scaleRelativeRadius(): number;
        set startAngle(arg: number);
        /**
        * Gets or sets the start angle of the scale.
        * @type {Number}
        * @summary The start angle of the scale.
        */
        get startAngle(): number;
        set endAngle(arg: number);
        /**
        * Gets or sets the end angle of the scale.
        * @type {Number}
        * @summary The end angle of the scale.
        */
        get endAngle(): number;
        scaleHalfSize: number;
        scaleSize: Size;
        createScaleGeometry(): PathFigure;
        measureTick(tick: any, constraint: any): Size;
        arrangeTick(tick: any): void;
        measurePointer(pointer: any, constraint: any): Size;
        arrangePointer(pointer: any): void;
        alignBasePoint(offset: any, alignment: any, value: any, size: any): Point;
        getOutlineOffset(value: any): any;
        arrangeLabel(label: any): void;
        calculateAbsoluteLength(length: any): any;
        /**
        * BaseScale.getValueFromPoint override.
        * @param {Point} point The point to test.
        * @returns {Number} The value from the scale, corresponding to the point, possibly MinValue or
        * MaxValue if the specified point cannot be associated with a value.
        */
        getValueFromPoint(point: Point): number;
        getValueFromAngle(angle: any): number;
        getAngleFromValue(value: any): number;
        getAngleFromPoint(point: any): number;
        measureRange(range: any, constraint: any): Size;
        createRangeGeometry(range: any): PathFigure;
        distanceFromCenter(point: any): number;
        _scaleRelativeCenter: Point;
        _scaleRelativeRadius: number;
        _startAngle: number;
        _endAngle: number;
        getBasePoint(): Point;
        getAbsoluteLength(length: any): any;
    }
    import { BaseScale } from "Gauges/LoadOrder";
    import { Point } from "@mindfusion/drawing";
    import { Size } from "@mindfusion/drawing";
    import { PathFigure } from "Gauges/PathFigure";
}
declare module "Gauges/LoadOrder" {
    import VisualElement from "Gauges/VisualElement";
    import VisualElementContainer from "Gauges/VisualElementContainer";
    import BaseScale from "Gauges/BaseScale";
    import LinearScale from "Gauges/LinearScale";
    import OvalScale from "Gauges/OvalScale";
    export { VisualElement, VisualElementContainer, BaseScale, LinearScale, OvalScale };
}
declare module "Gauges/PathFigure" {
    /**
    * @class Represents a connected series of geometric segments.
    */
    export class PathFigure extends VisualElement {
        /**
        * Creates an instance of PathFigure class.
        * @constructor
        * @param {String} data The path data string.
        */
        constructor(data: string);
        segments: any[];
        parsePathData(data: any): void;
        path: Path;
        getIsClosed(): any;
        setIsClosed(value: any): void;
        isClosed: any;
        getStartPoint(): any;
        setStartPoint(value: any): void;
        startPoint: any;
    }
    import { VisualElement } from "Gauges/LoadOrder";
    import { Path } from "@mindfusion/drawing";
}
declare module "Gauges/ArcArea" {
    /**
    * @class Represents an ellipse visual.
    */
    export class ArcArea extends PathFigure {
        /**
        * Creates an instance of ArcArea class.
        * @constructor
        */
        constructor();
        createGeometry(size: any): void;
        arcPoint(ex: any, ey: any, ewidth: any, eheight: any, angle: any): Point;
        set startAngle(arg: number);
        /**
        * Gets or sets the start angle of the arc.
        * @type {Number}
        * @summary The start angle of the arc.
        */
        get startAngle(): number;
        _startAngle: number;
        set endAngle(arg: number);
        /**
        * Gets or sets  the end angle of the arc.
        * @type {Number}
        * @summary The end angle of the arc.
        */
        get endAngle(): number;
        _endAngle: number;
    }
    import { PathFigure } from "Gauges/PathFigure";
    import { Point } from "@mindfusion/drawing";
}
declare module "Gauges/MouseInfo" {
    /**
    * @namespace MindFusion.Gauges
    */
    /**
    * @class Provides mouse information when processing mouse events in the visual element hierarchy.
    */
    export class MouseInfo {
        /**
        * @private
        */
        set action(arg: any);
        /**
    * Gets the action that was performed.
    * @type {MouseAction}
    * @summary The action that was performed.
    */
        get action(): any;
        _action: any;
        /**
        * @private
        */
        set point(arg: any);
        /**
        * Gets the mouse location.
        * @type {Point}
        * @summary The mouse location.
        */
        get point(): any;
        _point: any;
    }
}
declare module "Gauges/BaseGauge" {
    /**
    * @class Represents the base class of linear and oval gauges.
    */
    export class BaseGauge extends Control {
        /**
        * Creates an instance of BaseGauge.
        * @constructor
        * @param {Object} element The Div DOM element this gauge is associated with.
        * @class Represents the base class of linear and oval gauges.
        */
        constructor(element: any, ignoreMouseEvents: any);
        stopRepaint: boolean;
        set licenseLocation(arg: string);
        /**
        * Gets or sets the URL of the gauge's license file.
        * @type {String}
        * @summary A valid URL string that specifies the location of the license key.
        */
        get licenseLocation(): string;
        /**
        * A list of scale objects.
        * @type {Array<BaseScale>}
        */
        _scales: Array<BaseScale>;
        _size: Size;
        bounds: Rect;
        repaintDelegate: () => void;
        ignoreMouseEvents: any;
        set width(arg: any);
        get width(): any;
        set height(arg: any);
        get height(): any;
        postDataField: HTMLElement;
        mouseUpDelegate: (e: any) => void;
        onPrepaintBackgroundDelegate: (sender: any, args: any) => void;
        onPrepaintForegroundDelegate: (sender: any, args: any) => void;
        onPrepaintElementDelegate: (sender: any, args: any) => void;
        onPaintBackgroundDelegate: (sender: any, args: any) => void;
        onPaintForegroundDelegate: (sender: any, args: any) => void;
        onPaintElementDelegate: (sender: any, args: any) => void;
        scaleContainer: VisualElementContainer;
        context: any;
        /**
        * Deserializes the gauge from a JSON string.
        * @param {String} json A string created by the toJson method.
        */
        fromJson(json: string): void;
        set autoPostBack(arg: boolean);
        /**
        * Gets or sets a value indicating whether the control will post back to the server when a pointer's value has changed.
        * @type {Boolean}
        * @summary true if the control should post back, otherwise, false.
        */
        get autoPostBack(): boolean;
        /**
        * Serializes the gauge into a JSON string.
        * @returns {String} A string containing the view's JSON representation.
        */
        toJson(): string;
        createVisuals(): VisualElementContainer;
        background: VisualElementContainer;
        foreground: VisualElementContainer;
        repaint(): void;
        root: VisualElementContainer;
        repaintId: number;
        invalidate(): void;
        clear(): void;
        /**
        * Adds a scale to the gauge.
        * @param {BaseScale} scale The scale to add.
        */
        addScale(scale: BaseScale): void;
        /**
        * Removes a scale from the gauge.
        * @param {BaseScale} scale The scale to remove.
        */
        removeScale(scale: BaseScale): void;
        onPrepaintBackground(sender: any, args: any): void;
        onPrepaintForeground(sender: any, args: any): void;
        onPrepaintElement(sender: any, args: any): void;
        onPaintBackground(sender: any, args: any): void;
        onPaintForeground(sender: any, args: any): void;
        onPaintElement(sender: any, args: any): void;
        onPointerValueChanging(sender: any, args: any): boolean;
        onPointerValueChanged(sender: any, args: any): void;
        postback(): void;
        /**
        * Returns the VisualElement object corresponding to the specified name.
        * @param {String} name The name of the object to find.
        */
        getElementByName(name: string): VisualElementContainer;
        onMouseDown(e: any): void;
        capture: boolean;
        onMouseMove(e: any): void;
        onMouseUp(e: any): void;
        handleMouse(action: any, point: any): void;
        onContextMenu(e: any): void;
        /**
            * Returns the array of all scales in this gauge.
            * @type {Array}
            * @summary Array of all BaseScale instances in the gauge.
            */
        get scales(): any[];
        set size(arg: Size);
        get size(): Size;
        _width: any;
        _height: any;
        _autoPostBack: boolean;
        set licenseKey(arg: any);
        _licenseLocation: any;
    }
    export namespace BaseGauge {
        const ns: string;
    }
    import { Control } from "@mindfusion/controls";
    import { BaseScale } from "Gauges/LoadOrder";
    import { Size } from "@mindfusion/drawing";
    import { Rect } from "@mindfusion/drawing";
    import { VisualElementContainer } from "Gauges/LoadOrder";
}
declare module "Gauges/Ellipse" {
    /**
     * @class Represents an ellipse visual.
    */
    export class Ellipse extends PathFigure {
        /**
        * Creates an instance of Ellipse class.
        * @constructor
        */
        constructor();
    }
    import { PathFigure } from "Gauges/PathFigure";
}
declare module "Gauges/RoundRectangle" {
    /**
    * @class Represents a rounded rectangle.
    */
    export class RoundRectangle extends VisualElement {
        set roundness(arg: number);
        /**
        * Gets or sets the relative roundness of this rectangle's corners.
        * @type {Number}
        * @summary The relative roundness of this rectangle's corners.
        */
        get roundness(): number;
        _roundness: number;
    }
    import { VisualElement } from "Gauges/LoadOrder";
}
declare module "Gauges/LinearGauge" {
    /**
    * @class Represents a linear gauge control.
    */
    export class LinearGauge extends BaseGauge {
        /**
        * Creates and initializes a new LinearGauge from the specified element.
        * This method is static and can be called without creating an instance of the class.
        * @param {Object} element The DOM element that the LinearGauge should be attached to.
        * @param {Boolean} [ignoreMouseEvents] Optional.
        * @returns {LinearGauge} A LinearGauge object that represents
        * the newly created gauge.
        */
        static create(element: any, ignoreMouseEvents?: boolean): LinearGauge;
        /**
        * Returns the specified LinearGauge object. This member is static and can be
        * invoked without creating an instance of the class.
        * @param {String} id A string that contains the ID of the LinearGauge to find.
        * @returns {LinearGauge} A LinearGauge object that contains
        * the gauge requested by id, if found; otherwise, null.
        */
        static find(id: string): LinearGauge;
        type: string;
        shortOffset: number;
        longOffset: number;
        set orientation(arg: number);
        /**
        * Gets or sets the orientation of the gauge.
        * @type {Orientation}
        * @summary The orientation of the gauge.
        */
        get orientation(): number;
        verticalMargin: Thickness;
        horizontalMargin: Thickness;
        _orientation: number;
        /**
        * @private
        */
        private getOrientationMargin;
        /**
        * @private
        */
        private get left();
        /**
        * @private
        */
        private get top();
    }
    import { BaseGauge } from "Gauges/BaseGauge";
    import { Thickness } from "@mindfusion/drawing";
}
declare module "Gauges/OvalGauge" {
    /**
    * @class Represents a circular gauge control.
    */
    export class OvalGauge extends BaseGauge {
        /**
        * Creates and initializes a new OvalGauge from the specified element.
        * This method is static and can be called without creating an instance of the class.
        * @param {Object} element The DOM element that the OvalGauge should be attached to.
        * @param {Boolean} [ignoreMouseEvents] Optional.
        * @returns {OvalGauge} A OvalGauge object that represents
        * the newly created gauge.
        */
        static create(element: any, ignoreMouseEvents?: boolean): OvalGauge;
        /**
        * Returns the specified OvalGauge object. This member is static and can be
        * invoked without creating an instance of the class.
        * @param {String} id A string that contains the ID of the OvalGauge to find.
        * @returns {OvalGauge} A OvalGauge object that contains
        * the gauge requested by id, if found; otherwise, null.
        */
        static find(id: string): OvalGauge;
        set style(arg: number);
        /**
        * Gets or sets the visual style of the gauge.
        * @type {OvalGaugeStyle}
        * @summary The visual style of the gauge.
        */
        get style(): number;
        get scaleRelativeCenter(): Point;
        get scaleRelativeRadius(): 0.5 | 0.9;
        get startAngle(): 0 | 180 | 120 | 90 | 270;
        get endAngle(): 180 | 360 | 90 | 270 | 420 | 450;
        margin(): Thickness;
        getOrientationMargin(): Thickness;
        _style: number;
    }
    import { BaseGauge } from "Gauges/BaseGauge";
    import { Point } from "@mindfusion/drawing";
    import { Thickness } from "@mindfusion/drawing";
}
declare module "@mindfusion/gauges" {
    export { ArcArea } from "Gauges/ArcArea";
    export { BaseGauge } from "Gauges/BaseGauge";
    export { CustomInterval } from "Gauges/CustomInterval";
    export { Ellipse } from "Gauges/Ellipse";
    import { Orientation, Alignment, DisplayType, FunctionType, LabelRotation, LengthType, MouseAction, OvalGaugeStyle, PointerShape, TickShape, TickType } from "Gauges/Enum";
    export { Orientation, Alignment, DisplayType, FunctionType, LabelRotation, LengthType, MouseAction, OvalGaugeStyle, PointerShape, TickShape, TickType };
    import { PaintEventArgs, ValueChangedEventArgs, PrepaintEventArgs, ValueChangingEventArgs } from "Gauges/EventArgs";
    export { PaintEventArgs, ValueChangedEventArgs, PrepaintEventArgs, ValueChangingEventArgs };
    export { Events } from "Gauges/Events";
    export { GeometryFactory } from "Gauges/GeometryFactory";
    export { Length } from "Gauges/Length";
    export { LinearGauge } from "Gauges/LinearGauge";
    export { VisualElement, VisualElementContainer, BaseScale, LinearScale, OvalScale } from "Gauges/LoadOrder";
    export { MouseInfo } from "Gauges/MouseInfo";
    export { OvalGauge } from "Gauges/OvalGauge";
    export { PathFigure } from "Gauges/PathFigure";
    export { Pointer } from "Gauges/Pointer";
    export { Range } from "Gauges/Range";
    export { RoundRectangle } from "Gauges/RoundRectangle";
    export { Segment } from "Gauges/Segment";
    export { Tick } from "Gauges/Tick";
    export { TickLabel } from "Gauges/TickLabel";
    export { TickSettings } from "Gauges/TickSettings";
    export { Utils } from "Gauges/Utils";
}
