/// <reference types="../../@mindfusion/controls" />
/// <reference types="../../@mindfusion/drawing" />
/// <reference types="../../@mindfusion/common" />
/// <reference types="../../@mindfusion/common-collections" />
declare module "Mapping/jsmaps/src/LatLong" {
    /**
    * @namespace MindFusion.Mapping
    */
    /**
     * Copyright (c) 2019, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Specifies a location in a geographic coordinate system.
    */
    export class LatLong {
        static fromObject(obj: any): LatLong;
        /**
        * Initializes a new instance of the LatLong class.
        * @constructor
        * @param {Number} latitude The latitude of the location.
        * @param {Number} longitude The longitude of the location.
        */
        constructor(latitude: number, longitude: number);
        _latitude: number;
        _longitude: number;
        /**
        * Gets the latitude of the location.
        * @type {Number}
        * @summary The latitude in degrees.
        */
        get latitude(): number;
        /**
        * Gets the longitude of the location.
        * @type {Number}
        * @summary The longitude in degrees.
        */
        get longitude(): number;
        toObject(): {
            latitude: number;
            longitude: number;
        };
    }
}
declare module "Mapping/jsmaps/src/Decoration" {
    /**
    * @class Represents a decoration element drawn over the map.
    */
    export class Decoration {
        /**
         * Initializes a new instance of the Decoration class.
         * @constructor
         * @param {LatLong} [location] The location of this decoration in geographical coordinates.
         */
        constructor(location?: LatLong);
        _location: LatLong;
        _offset: Point;
        _visible: boolean;
        align: string;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        /**
        * Returns a reference to the decoration DOM element.
        */
        get element(): HTMLDivElement;
        fromJson(obj: any): void;
        set location(arg: LatLong);
        /**
        * Gets or sets the location of this decoration.
        * @type {LatLong}
        * @summary LatLong instance representing the geographic coordinates of this decoration.
        */
        get location(): LatLong;
        set offset(arg: Point);
        /**
        * Gets or sets the offset of this decoration.
        * @type {Point}
        * @summary A Point instance representing the client offset of this decoration.
        */
        get offset(): Point;
        set visible(arg: boolean);
        /**
        * Gets or sets the visibility of this decoration.
        * @type {Boolean}
        * @summary True if the decoration is visible, otherwise false.
        */
        get visible(): boolean;
        set cssClass(arg: string);
        /**
        * Gets or sets the css class of the decoration.
        * @type {String}
        * @summary The name of the css class of the decoration.
        */
        get cssClass(): string;
        set text(arg: string);
        /**
         * Gets or sets the display text of the decoration.
         * @type {String}
         * @summary The text.
         */
        get text(): string;
        set id(arg: string);
        /**
        * Gets or sets the string identificator of the decoration.
        * @type {String}
        * @summary The string identificator.
        */
        get id(): string;
        set data(arg: any);
        /**
        * Gets or sets an object, holding custom user data.
        * @type {Object}
        * @summary The custom user data.
        */
        get data(): any;
        toJson(): {
            location: {
                latitude: number;
                longitude: number;
            };
            offset: Point;
            visible: boolean;
            cssClass: string;
            text: string;
            id: string;
            data: any;
        };
        dispose(): void;
        draw(): HTMLDivElement;
        _element: HTMLDivElement;
        updatePos(position: any): void;
        bounds: any;
        show(): void;
        hide(): void;
        _cssClass: string;
        _text: any;
        _id: string;
        _data: any;
        onPropertyChanged(name: any, oldValue: any, newValue: any): void;
    }
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Point } from "@mindfusion/drawing";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Mapping/jsmaps/src/Bubble" {
    /**
    * @class Represents a text decoration.
    */
    export class Bubble extends Decoration {
        /**
         * Initializes a new instance of the Bubble class.
         * @constructor
       * @param {LatLong} [location] The location of this bubble in geographical coordinates.
       * @param {String} [text] The text of this bubble.
         */
        constructor(location?: any, text?: string);
        _multiline: boolean;
        closeClickHandler: (e: any) => void;
        set multiline(arg: boolean);
        /**
        * Gets or sets a value indicating whether the bubble's text can be on more than one line.
        * @type {Boolean}
        * @summary true if the text can be on more than one line, otherwise false.
        */
        get multiline(): boolean;
        onCloseClick(e: any): void;
    }
    import { Decoration } from "Mapping/jsmaps/src/Decoration";
}
declare module "Mapping/jsmaps/src/LatLongRect" {
    /**
    * @class Specifies a rectangular area in a geographic coordinate system.
    */
    export class LatLongRect {
        /**
        * Creates a LatLongRect instance from center coordinate and size.
        * @param {LatLong} location The center coordinate.
        * @param {Size} size The size in meters.
        * @returns {LatLongRect} A LatLongRect instance.
        */
        static fromCenter(location: LatLong, size: any): LatLongRect;
        static fromObject(obj: any): LatLongRect;
        /**
        * Initializes a new instance of the LatLongRect class.
        * @constructor
        * @param {Number} minLatitude The minimum latitude of the area.
        * @param {Number} minLongitude The minimum longitude of the area.
        * @param {Number} maxLatitude The maximum latitude of the area.
        * @param {Number} maxLongitude The maximum longitude of the area.
        */
        constructor(minLatitude: number, minLongitude: number, maxLatitude: number, maxLongitude: number);
        _minLatitude: number;
        _minLongitude: number;
        _maxLatitude: number;
        _maxLongitude: number;
        /**
        * Gets the minimum latitude of the area.
        * @type {Number}
        * @summary The minimum latitude in degrees.
        */
        get minLatitude(): number;
        /**
        * Gets the minimum longitude of the area.
        * @type {Number}
        * @summary The minimum longitude in degrees.
        */
        get minLongitude(): number;
        /**
        * Gets the maximum latitude of the area.
        * @type {Number}
        * @summary The maximum latitude in degrees.
        */
        get maxLatitude(): number;
        /**
        * Gets the maximum longitude of the area.
        * @type {Number}
        * @summary The maximum longitude in degrees.
        */
        get maxLongitude(): number;
        /**
        * Gets the minimum coordinate of the area.
        * @type {LatLong}
        * @summary The minimum coordinate of the area.
        */
        get minLatLong(): LatLong;
        /**
        * Gets the maximum coordinate of the area.
        * @type {LatLong}
        * @summary The maximum coordinate of the area.
        */
        get maxLatLong(): LatLong;
        toObject(): {
            minLatitude: number;
            minLongitude: number;
            maxLatitude: number;
            maxLongitude: number;
        };
    }
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
}
declare module "Mapping/jsmaps/src/Hint" {
    /**
    * @class Represents a hint that shows the marker text when hovered.
    * @private
    */
    export class Hint extends Decoration {
        /**
         * Initializes a new instance of the Hint class.
         * @constructor
         */
        constructor(location: any, text: any);
    }
    import { Decoration } from "Mapping/jsmaps/src/Decoration";
}
declare module "Mapping/jsmaps/src/Drawing" {
    /**
    * @class Represents a decoration drawing.
    */
    export class Drawing {
        _visible: boolean;
        _fill: any;
        _stroke: string;
        _strokeThickness: number;
        _strokeDashStyle: number;
        _pixelThickness: boolean;
        _propertyChanged: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        fromJson(obj: any): void;
        set visible(arg: boolean);
        /**
        * Gets or sets the visibility of this drawing.
        * @type {Boolean}
        * @summary True if the drawing is visible, otherwise false.
        */
        get visible(): boolean;
        set fill(arg: any);
        /**
         * Gets or sets the fill of the drawing.
         * @type {Object}
         * @summary An object specifying the fill of the drawing.
         */
        get fill(): any;
        set stroke(arg: any);
        /**
       * Gets or sets the stroke of the drawing.
       * @type {Object}
       * @summary An object specifying the stroke of the drawing.
       */
        get stroke(): any;
        set strokeThickness(arg: number);
        /**
       * Gets or sets the stroke thickness of the drawing.
       * @type {Number}
       * @summary The thickness in meters or pixels.
       * @remarks If the pixelThickness property is set to true, the value will be considered in pixels, otherwise in meters (the default).
       * Thicknesses defined in meters will be scaled according to the current zoom factor, while thicknesses defined in pixels stay static.
       */
        get strokeThickness(): number;
        set pixelThickness(arg: boolean);
        /**
       * Gets or sets a value indicating whether the stroke thickness is set in pixels.
       * @type {Boolean}
       * @summary True if the stroke thickness is in pixels, otherwise false.
       */
        get pixelThickness(): boolean;
        set strokeDashStyle(arg: number);
        /**
       * Gets or sets the line dash pattern applied when stroking the drawing's frame.
       * @type {DashStyle}
       * @summary A member of the DashStyle enumeration.
       */
        get strokeDashStyle(): number;
        set text(arg: string);
        /**
        * Gets or sets the hint text of the drawing.
        * @type {String}
        * @summary The text.
        */
        get text(): string;
        set id(arg: string);
        /**
        * Gets or sets the string identificator of the decoration.
        * @type {String}
        * @summary The string identificator.
        */
        get id(): string;
        set data(arg: any);
        /**
      * Gets or sets an object, holding custom user data.
      * @type {Object}
      * @summary The custom user data.
      */
        get data(): any;
        toJson(): {
            visible: boolean;
            fill: any;
            stroke: any;
            strokeThickness: number;
            pixelThickness: boolean;
            strokeDashStyle: number;
            text: string;
            id: string;
            data: any;
        };
        draw(context: any): void;
        containsPoint(point: any): any;
        getPoints(): any[];
        getBounds(): any;
        getPath(): any;
        get hintAnchor(): any;
        get scaledThickness(): any;
        _scaledThickness: any;
        _text: any;
        _id: string;
        _data: any;
        onPropertyChanged(name: any, oldValue: any, newValue: any): void;
        hint: Hint;
    }
    import { EventDispatcher } from "@mindfusion/common";
    import { Hint } from "Mapping/jsmaps/src/Hint";
}
declare module "Mapping/jsmaps/src/Circle" {
    /**
    * @class Represents a circle drawing.
    */
    export class Circle extends Drawing {
        /**
         * Initializes a new instance of the Circle class.
         * @constructor
       * @param {LatLong} [center] The center of this drawing in geographical coordinates.
       * @param {Number} [radius] The radius of this drawing.
         */
        constructor(center?: LatLong, radius?: number);
        _center: LatLong;
        _radius: number;
        _pixelRadius: boolean;
        resolvePath(): void;
        path: Path;
        _clientRect: any;
        get scaledRect(): any;
        set center(arg: LatLong);
        /**
       * Gets or sets the center point of this drawing.
       * @type {LatLong}
       * @summary The center point in geographical coordinates.
       */
        get center(): LatLong;
        set radius(arg: number);
        /**
       * Gets or sets the radius of this drawing.
       * @type {Number}
       * @summary The radius in meters.
       */
        get radius(): number;
        set pixelRadius(arg: boolean);
        /**
        * Gets or sets a value indicating whether the radius is set in pixels.
        * @type {Boolean}
        * @summary True if the radius is in pixels, otherwise false.
        */
        get pixelRadius(): boolean;
    }
    import { Drawing } from "Mapping/jsmaps/src/Drawing";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Path } from "@mindfusion/drawing";
}
declare module "Mapping/jsmaps/src/Poly" {
    /**
    * @class Represents a polyline drawing.
    */
    export class Poly extends Drawing {
        /**
         * Initializes a new instance of the Poly class.
         * @constructor
       * @param {LatLong[]} [points] The array of points in geographical coordinates.
       * @param {Boolean} [closed] True if the drawing should be closed, otherwise false.
         */
        constructor(points?: LatLong[], closed?: boolean);
        _points: LatLong[];
        _closed: boolean;
        _smooth: boolean;
        set closed(arg: boolean);
        /**
         * Gets or sets a value indicating whether the drawing should be closed.
         * @type {Boolean}
         * @summary True of the drawing should be closed, otherwise false.
         */
        get closed(): boolean;
        set smooth(arg: boolean);
        /**
        * Gets or sets a value indicating whether to smooth the drawing vertices.
        * @type {Boolean}
        * @summary True to smooth the vertices, otherwise false.
        */
        get smooth(): boolean;
        resolvePath(): void;
        path: Path;
        _clientPoints: any[];
        set points(arg: LatLong[]);
        /**
       * Gets or sets the array of points in geographic coordinates.
       * @type {LatLong[]}
       * @summary An array of LatLong instances.
       */
        get points(): LatLong[];
    }
    import { Drawing } from "Mapping/jsmaps/src/Drawing";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Path } from "@mindfusion/drawing";
}
declare module "Mapping/jsmaps/src/CanvasLayer" {
    /**
    * @class Represents a canvas layer, containing decoration drawings.
    */
    export class CanvasLayer {
        /**
         * Initializes a new instance of the CanvasLayer class.
         * @constructor
       * @param {String} [id] The id of this layer.
         */
        constructor(id?: string);
        _id: string;
        _visible: boolean;
        _decorations: ObservableCollection<any>;
        _decorationPropertyChangedHandler: (sender: any, args: any) => void;
        repaintDelegate: () => void;
        /**
         * Draws and attaches a decoration.
         * @private
        */
        private addDecoration;
        /**
        * Detaches and removes a decoration.
        * @private
        */
        private removeDecoration;
        onDecorationsChanged(sender: any, args: any): void;
        /**
       * Handles the propertyChanged event in a decoration.
       * @private
       */
        private onDecorationPropertyChanged;
        detach(): void;
        attach(): void;
        fromJson(obj: any): void;
        set visible(arg: boolean);
        /**
        * Gets or sets a value indicating whether the layer is visible.
        * @type {Boolean}
        * @summary True if the layer is visible, otherwise false.
        */
        get visible(): boolean;
        toJson(): {
            id: string;
            visible: boolean;
            type: string;
        };
        draw(): HTMLDivElement;
        container: HTMLDivElement;
        load(): void;
        repaintId: number;
        invalidate(): void;
        getDecorationsAt(point: any): any[];
        getMarkersAt(point: any): any[];
        setVisible(value: any): void;
        onResize(): void;
        /**
        * Gets the id of this layer.
        * @type {String}
        * @summary The id of this layer.
        */
        get id(): string;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this layer.
        * @type {MapView}
        * @summary The parent control of this layer.
        */
        get parent(): any;
        _parent: any;
        /**
        * Gets the collection of decorations, displayed by this layer.
        * @type {ObservableCollection}
        * @summary A collection of Decoration instances.
        */
        get decorations(): ObservableCollection<any>;
    }
    import { ObservableCollection } from "@mindfusion/common-collections";
}
declare module "Mapping/jsmaps/src/CircleMarker" {
    /**
    * @class Represents a circle decoration.
    */
    export class CircleMarker extends Decoration {
        /**
         * Initializes a new instance of the CircleMarker class.
         * @constructor
         * @param {LatLong} [location] The location of this marker in geographical coordinates.
         * @param {Number} [radius] The radius of this marker in meters.
         */
        constructor(location?: any, radius?: number);
        _radius: number;
        set radius(arg: number);
        /**
       * Gets or sets the radius of this marker.
       * @type {Number}
       * @summary The radius in meters.
       */
        get radius(): number;
        get hintAnchor(): any;
        hint: Hint;
    }
    import { Decoration } from "Mapping/jsmaps/src/Decoration";
    import { Hint } from "Mapping/jsmaps/src/Hint";
}
declare module "Mapping/jsmaps/src/Marker" {
    /**
    * @class Represents an image decoration.
    */
    export class Marker extends Decoration {
        /**
         * Initializes a new instance of the Marker class.
         * @constructor
       * @param {LatLong} [location] The location of this marker in geographical coordinates.
         */
        constructor(location?: any);
        loadHandler: (e: any) => void;
        set imageSrc(arg: string);
        /**
       * Gets or sets the URL of the image displayed by this marker.
       * @type {String}
       * @summary The image URL.
       */
        get imageSrc(): string;
        onLoad(): void;
        pos: any;
        get hintAnchor(): Point;
        _imageSrc: any;
        hint: Hint;
    }
    import { Decoration } from "Mapping/jsmaps/src/Decoration";
    import { Point } from "@mindfusion/drawing";
    import { Hint } from "Mapping/jsmaps/src/Hint";
}
declare module "Mapping/jsmaps/src/DecorationLayer" {
    /**
    * @class Represents a layer, containing decoration elements.
    */
    export class DecorationLayer {
        /**
         * Initializes a new instance of the DecorationLayer class.
         * @constructor
         * @param {String} [id] The id of this layer.
         */
        constructor(id?: string);
        _id: string;
        _visible: boolean;
        _decorations: ObservableCollection<any>;
        _decorationPropertyChangedHandler: (sender: any, args: any) => void;
        /**
         * Draws and attaches a decoration.
         * @private
       */
        private addDecoration;
        /**
        * Detaches and removes a decoration.
        * @private
        */
        private removeDecoration;
        onDecorationsChanged(sender: any, args: any): void;
        /**
       * Handles the propertyChanged event in a decoration.
       * @private
       */
        private onDecorationPropertyChanged;
        detach(): void;
        attach(): void;
        fromJson(obj: any): void;
        set visible(arg: boolean);
        /**
        * Gets or sets a value indicating whether the layer is visible.
        * @type {Boolean}
        * @summary True if the layer is visible, otherwise false.
        */
        get visible(): boolean;
        toJson(): {
            id: string;
            visible: boolean;
            type: string;
        };
        draw(): HTMLDivElement;
        container: HTMLDivElement;
        clear(): void;
        load(): void;
        getDecorationsAt(point: any): any[];
        getMarkersAt(point: any): any[];
        setVisible(value: any): void;
        /**
        * Gets the id of this layer.
        * @type {String}
        * @summary The id of this layer.
        */
        get id(): string;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this layer.
        * @type {MapView}
        * @summary The parent control of this layer.
        */
        get parent(): any;
        _parent: any;
        /**
        * Gets the collection of decorations, displayed by this layer.
        * @type {ObservableCollection}
        * @summary A collection of Decoration instances.
        */
        get decorations(): ObservableCollection<any>;
        /**
        * Gets the collection of markers, displayed by this layer.
        * @type {ObservableCollection}
        * @summary A collection of Marker instances.
        */
        get markers(): ObservableCollection<any>;
        /**
        * Gets the collection of bubbles, displayed by this layer.
        * @type {ObservableCollection}
        * @summary A collection of Bubble instances.
        */
        get bubbles(): ObservableCollection<any>;
        /**
        * Gets the collection of circle markers, displayed by this layer.
        * @type {ObservableCollection}
        * @summary A collection of CircleMarker instances.
        */
        get circles(): ObservableCollection<any>;
    }
    import { ObservableCollection } from "@mindfusion/common-collections";
}
declare module "Mapping/jsmaps/src/Enum" {
    /**
     * Specifies the pivot point of the mouse wheel zoom in a MapView control.
     */
    export type ZoomPivot = number;
    export namespace ZoomPivot {
        const Cursor: number;
        const Center: number;
    }
}
declare module "Mapping/jsmaps/src/EventArgs" {
    /**
    * @class Specifies data for map related events.
    * @augments EventArgs
    */
    export class MapEventArgs extends EventArgs {
        /**
        * Initializes a new instance of the MapEventArgs class.
        * @constructor
        * @param {LatLong} location The geographic cooordinates related to the event.
        * @param {Point} position The client position related to the event.
        * @param {Object} rawEventArgs The Javascript event data.
        */
        constructor(location: LatLong, position: any, rawEventArgs: any);
        _location: LatLong;
        _position: any;
        _rawEventArgs: any;
        /**
        * Gets the geographic cooordinates related to the event.
        * @type {LatLong}
        * @summary A LatLong instance.
        */
        get location(): LatLong;
        /**
        * Gets the client position related to the event.
        * @type {Point}
        * @summary A point instance, containing the client coordinates.
        */
        get position(): any;
        /**
        * Gets the Javascript event data.
        * @type {Object}
        * @summary The event data.
        */
        get rawEventArgs(): any;
        toObject(): {
            name: string;
            location: {
                latitude: number;
                longitude: number;
            };
            position: any;
            button: any;
        };
    }
    /**
    * @class Specifies data for map decoration related events.
    * @augments MapEventArgs
    */
    export class DecorationEventArgs extends MapEventArgs {
        /**
        * Initializes a new instance of the DecorationEventArgs class.
        * @constructor
        * @param {Decoration} decoration The the decoration related to the event.
        * @param {LatLong} location The geographic cooordinates related to the event.
        * @param {Point} position The client position related to the event.
        * @param {Object} rawEventArgs The Javascript event data.
        */
        constructor(decoration: Decoration, location: LatLong, position: any, rawEventArgs: any);
        _decoration: Decoration;
        /**
        * Gets the decoration related to the event.
        * @type {Decoration}
        * @summary The Decoration instance related to the event.
        */
        get decoration(): Decoration;
    }
    import { EventArgs } from "@mindfusion/controls";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Decoration } from "Mapping/jsmaps/src/Decoration";
}
declare module "Mapping/jsmaps/src/Utils" {
    export default Utils;
    /**
     * @class Contains helper functions.
     * @private
     */
    class Utils {
        static latLongToTile(latlong: any, zoom: any): {
            tile: Point;
            offset: {
                x: number;
                y: number;
            };
        };
        static tileToLatLong(point: any, zoom: any): LatLong;
        /**
        * The formulas are taken form: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Implementations
        */
        static long2tile(longitude: any, zoom: any): number;
        static lat2tile(latitude: any, zoom: any): number;
        static tile2long(x: any, z: any): number;
        static tile2lat(y: any, z: any): number;
    }
    import { Point } from "@mindfusion/drawing";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
}
declare module "Mapping/jsmaps/src/MapLayer" {
    /**
    * @class Represents a layer containing map tiles.
    */
    export class MapLayer {
        /**
         * Initializes a new instance of the MapLayer class.
         * @constructor
         * @param {String} [id] The id of this layer.
         */
        constructor(id?: string);
        _id: string;
        tiles: Map<any, any>;
        loadExtras: boolean;
        _layerLoad: EventDispatcher<EventArgs>;
        detach(): void;
        attach(): void;
        fromJson(obj: any): void;
        set urlTemplate(arg: string);
        /**
      * Gets or sets the template string of the tile server URL.
      * @type {String}
      * @summary The template string of the tile server URL.
      */
        get urlTemplate(): string;
        set attribution(arg: string);
        /**
        * Gets or sets the attribution HTML of the layer.
        * @type {String}
        * @summary The attribution HTML of the layer.
        */
        get attribution(): string;
        toJson(): {
            id: string;
            urlTemplate: string;
            attribution: string;
        };
        draw(): HTMLDivElement;
        container: HTMLDivElement;
        getTile(tileX: any, tileY: any): any;
        checkTileBounds(tileX: any, tileY: any): boolean;
        loadTile(row: any, col: any): any;
        unmarkTiles(): void;
        clearExtras(): void;
        loadTiles(tile: any, pos: any): void;
        startTile: Point;
        _total: number;
        load(latlong: any, offset: any): void;
        checkState(): void;
        clientToTile(cursor: any): {
            tile: Point;
            offset: Point;
        };
        /**
         *
         * @param {Point} cursor
         * @returns {LatLong}
         */
        clientToLatLong(cursor: Point): LatLong;
        latLongToClient(latlong: any): Point;
        latLongRectToClient(latlongRect: any): Rect;
        clearTiles(unmarked: any): void;
        setVisible(value: any): void;
        setAttribution(): void;
        getZoom(): any;
        /**
        * Gets the id of this layer.
        * @type {String}
        * @summary The id of this layer.
        */
        get id(): string;
        /**
        * @private
        */
        set parent(arg: any);
        /**
        * Gets the parent control of this layer.
        * @type {MapView}
        * @summary The parent control of this layer.
        */
        get parent(): any;
        _parent: any;
        _urlTemplate: any;
        _attribution: any;
    }
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Point } from "@mindfusion/drawing";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Rect } from "@mindfusion/drawing";
}
declare module "Mapping/jsmaps/src/UIControl" {
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
declare module "Mapping/jsmaps/src/Controllers/ZoomController" {
    /**
    * @class Represents a controller with zoom in and zoom out buttons.
    * @private
    */
    export class ZoomController extends Control {
        /**
         * Initializes a new instance of the ZoomController class.
         * @constructor
         */
        constructor(target: any);
        target: any;
        clickHandler: (e: any) => void;
        _changed: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        zoomInButton: HTMLAnchorElement;
        zoomOutButton: HTMLAnchorElement;
        setEnabled(): void;
        onClick(e: any): void;
        get changed(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
    }
    import { Control } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Mapping/jsmaps/src/Controllers/LayerController" {
    /**
    * @class Represents a layers list controller.
    * @private
    */
    export class LayerController extends Control {
        /**
         * Initializes a new instance of the LayerController class.
         * @constructor
         */
        constructor(target: any);
        target: any;
        changeHandler: (e: any) => void;
        _changed: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        onChange(e: any): void;
        get changed(): EventDispatcher<import("Controls/EventArgs").EventArgs>;
    }
    import { Control } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
}
declare module "Mapping/jsmaps/src/MapView" {
    /**
    * @class Represents a container for map layers.
    * @augments UIControl
    */
    export class MapView extends UIControl {
        /**
         * Initializes a new instance of the MapView class.
         * @constructor
         * @param {HTMLElement} [element] The control's associated Dom element.
         */
        constructor(element?: HTMLElement);
        _defaultWidth: Unit;
        _defaultHeight: Unit;
        _layers: ObservableCollection<any>;
        mapLoaded: boolean;
        _scrollX: number;
        _scrollY: number;
        _minZoomLevel: number;
        _maxZoomLevel: number;
        _zoomStep: number;
        _zoomLevel: number;
        _zoomPivot: number;
        _allowPan: boolean;
        _allowZoom: boolean;
        zoomController: ZoomController;
        _showZoomController: boolean;
        layerController: LayerController;
        _showLayerController: boolean;
        defaultOverlay: DecorationLayer;
        mouseUpHandler: (e: any) => void;
        mouseMoveHandler: (e: any) => void;
        mouseWheelHandler: (e: any) => void;
        resizeHandler: (e: any) => void;
        _viewLoad: EventDispatcher<EventArgs>;
        _layerLoad: EventDispatcher<EventArgs>;
        _click: EventDispatcher<EventArgs>;
        _hover: EventDispatcher<EventArgs>;
        _decorationClick: EventDispatcher<EventArgs>;
        _decorationHover: EventDispatcher<EventArgs>;
        layerLoadHandler: (sender: any, args: any) => void;
        /**
        * Adds a new layer.
        * @param {Layer} layer The new layer.
        * @private
        */
        private addLayer;
        /**
        * Removes a layer.
        * @param {Layer} layer The layer.
        * @private
        */
        private removeLayer;
        onLayersChanged(sender: any, args: any): void;
        mapRect: Rect;
        fromJson(json: any): void;
        set minZoomLevel(arg: number);
        /**
       * Gets or sets the minimum zoom level of the map.
       * @type {Number}
       * @summary The minimum zoom level.
       */
        get minZoomLevel(): number;
        set maxZoomLevel(arg: number);
        /**
       * Gets or sets the maxmimum zoom level of the map.
       * @type {Number}
       * @summary The maxmimum zoom level.
       */
        get maxZoomLevel(): number;
        set mapBounds(arg: LatLongRect);
        /**
        * Gets or sets the geographical bounds of the map.
        * @type {LatLongRect}
        * @summary A LatLongRect instance, representing the geographical bounds of the map.
        */
        get mapBounds(): LatLongRect;
        dashStops: any;
        toJson(json: any): string;
        eventData: any;
        /**
        * For internal use only
        * @private
        */
        private preparePostback;
        tileContainer: HTMLDivElement;
        markerContainer: HTMLDivElement;
        hintContainer: HTMLDivElement;
        controlContainer: HTMLDivElement;
        /**
        * Loads all layers.
        * @param {LatLong} center A LatLong instance representing the geographical center of the map.
        * @param {Number} [zoomLevel] The zoom level of the map.
        * @param {Point} [offset] Optional.
        */
        load(center: LatLong, zoomLevel?: number, offset?: Point): void;
        _lastCenter: LatLong;
        /**
        * Loads decoration layers.
        */
        loadOverlays(): void;
        /**
        * Pans the map to a new center location.
        * @param {LatLong} center A LatLong instance representing the geographic location of the new map center.
        */
        panTo(center: LatLong): void;
        /**
        * Scrolls the map to a new center point.
        * @param {Point} center A Point instance representing the client position of the new map center.
        */
        scrollTo(center: Point): void;
        /**
        * Scrolls the map by the specified amount.
        * @param {Number} x The number of pixels to scroll horizontally.
        * @param {Number} [y] The number of pixels to scroll vertically.
        */
        scrollBy(x: number, y?: number): void;
        /**
        * Converts the specified client point to geographic coordinates.
        * @param {Point} point The client point to convert.
        * @returns {LatLong} A LatLong instance representing the geographic location.
        */
        clientToLatLong(point: Point): LatLong;
        /**
        * Converts the specified geographic coordinates to a client position.
        * @param {LatLong} location The location to convert.
        * @returns {Point} A Point instance representing The client point.
        */
        latLongToClient(location: LatLong): Point;
        /**
        * Gets the list of decoration at a specified client position.
        * @param {Point} point The point to test.
        * @returns {Array} An array of Decoration instances.
        */
        getDecorationsAt(point: Point): any[];
        getMarkersAt(point: any): any[];
        getMarkerHintAt(point: any): any;
        getControllerAt(point: any): ZoomController | LayerController;
        /**
        * Gets the collection of all layers.
        * @type {ObservableCollection}
        * @summary A collection of MapLayers and DecorationLayers instances.
        */
        get layers(): ObservableCollection<any>;
        /**
        * Gets the collection of map layers.
        * @type {ObservableCollection}
        * @summary A collection of MapLayers instances.
        */
        get mapLayers(): ObservableCollection<any>;
        /**
        * Gets the collection of decoration layers.
        * @type {ObservableCollection}
        * @summary A collection of DecorationLayers instances.
        */
        get overlays(): ObservableCollection<any>;
        /**
        * Gets the default decorations collection.
        * @type {ObservableCollection}
        * @summary The default decorations collection.
        */
        get decorations(): ObservableCollection<any>;
        /**
        * Gets the geographical center of a loaded map.
        * @type {LatLong}
        * @summary A LatLong instance, representing the geographical center of the map.
        */
        get mapCenter(): LatLong;
        _mapBounds: LatLongRect;
        set activeLayer(arg: MapLayer);
        /**
        * Gets or sets the active map layer.
        * @type {MapLayer}
        * @summary The active map layer.
        */
        get activeLayer(): MapLayer;
        setActiveLayer(value: any): void;
        _activeLayer: any;
        _resetActiveLayer: boolean;
        set allowPan(arg: boolean);
        /**
        * Gets or sets a value indicating whether drag panning is enabled.
        * @type {Boolean}
        * @summary True if drag panning is enabled, otherwise false.
        */
        get allowPan(): boolean;
        set allowZoom(arg: boolean);
        /**
        * Gets or sets a value indicating whether mouse wheel zooming is enabled.
        * @type {Boolean}
        * @summary True if mouse wheel zooming is enabled, otherwise false.
        */
        get allowZoom(): boolean;
        set showZoomController(arg: boolean);
        /**
        * Gets or sets the visibility of the built-in zoom controller.
        * @type {Boolean}
        * @summary True if the controller is visible, otherwise false.
        */
        get showZoomController(): boolean;
        set showLayerController(arg: boolean);
        /**
        * Gets or sets the visibility of the built-in layer controller.
        * @type {Boolean}
        * @summary True if the controller is visible, otherwise false.
        */
        get showLayerController(): boolean;
        set zoomLevel(arg: number);
        /**
        * Gets or sets the zoom level of the map.
        * @type {Number}
        * @summary The zoom level.
        */
        get zoomLevel(): number;
        set zoomStep(arg: number);
        /**
       * Gets or sets the zoom step of the map.
       * @type {Number}
       * @summary The zoom step.
       */
        get zoomStep(): number;
        set zoomPivot(arg: number);
        /**
       * Gets or sets the zoom pivot point of the mouse wheel zoom.
       * @type {ZoomPivot}
       * @summary One of the ZoomPivot enumeration values.
       */
        get zoomPivot(): number;
        /**
        * Gets or sets the map's horizontal scroll position relative to the control bounds.
        * @type {Number}
        * @summary A number specifying the horizontal scroll position.
        */
        get scrollX(): number;
        get scrollY(): number;
        setScroll(x: any, y: any): void;
        mouseDownPos: Point;
        panPoint: Point;
        onMouseMove(e: any): void;
        cursor: {
            x: any;
            y: any;
        };
        _hoverTimeout: number;
        currentHint: any;
        raiseHover(e: any): void;
        raiseClick(e: any): void;
        onMouseUp(e: any): void;
        onMapMoved(): void;
        onMouseWheel(e: any): void;
        timeStamp: number;
        onResize(e: any): void;
        onZoomChanged(sender: any, delta: any): void;
        onLayerLoad(sender: any, args: any): void;
        onLayerChanged(index: any): void;
        /**
         * Raised when map view layers are loaded.
         * @event MapView.viewLoad
         * @type {EventDispatcher<EventArgs>}
         * @property {MapView} sender
         * @property {EventArgs} args
         */
        get viewLoad(): EventDispatcher<EventArgs>;
        /**
         * Raised when all tiles in a map layer are loaded.
         * @event MapView.layerLoad
         * @type {EventDispatcher<EventArgs>}
         * @property {MapLayer} sender
         * @property {EventArgs} args
         */
        get layerLoad(): EventDispatcher<EventArgs>;
        /**
         * Raised when the user clicks on the map surface.
         * @event MapView.click
         * @type {EventDispatcher<MapEventArgs>}
         * @property {MapView} sender
         * @property {MapEventArgs} args
         */
        get click(): EventDispatcher<MapEventArgs>;
        /**
         * Raised when the user hovers over the map surface.
         * @event MapView.hover
         * @type {EventDispatcher<MapEventArgs>}
         * @property {MapView} sender
         * @property {MapEventArgs} args
         */
        get hover(): EventDispatcher<MapEventArgs>;
        /**
         * Raised when the user clicks on a decoration element.
         * @event MapView.decorationClick
         * @type {EventDispatcher<DecorationEventArgs>}
         * @property {MapView} sender
         * @property {DecorationEventArgs} args
         */
        get decorationClick(): EventDispatcher<DecorationEventArgs>;
        /**
         * Raised when the user hovers over a decoration element.
         * @event MapView.decorationHover
         * @type {EventDispatche<DecorationEventArgs>r}
         * @property {MapView} sender
         * @property {DecorationEventArgs} args
         */
        get decorationHover(): any;
    }
    import { UIControl } from "Mapping/jsmaps/src/UIControl";
    import { Unit } from "@mindfusion/common";
    import { ObservableCollection } from "@mindfusion/common-collections";
    import { ZoomController } from "Mapping/jsmaps/src/Controllers/ZoomController";
    import { LayerController } from "Mapping/jsmaps/src/Controllers/LayerController";
    import { DecorationLayer } from "Mapping/jsmaps/src/DecorationLayer";
    import { EventArgs } from "@mindfusion/controls";
    import { EventDispatcher } from "@mindfusion/common";
    import { Rect } from "@mindfusion/drawing";
    import { LatLongRect } from "Mapping/jsmaps/src/LatLongRect";
    import { LatLong } from "Mapping/jsmaps/src/LatLong";
    import { Point } from "@mindfusion/drawing";
    import { MapLayer } from "Mapping/jsmaps/src/MapLayer";
    import { MapEventArgs } from "Mapping/jsmaps/src/EventArgs";
    import { DecorationEventArgs } from "Mapping/jsmaps/src/EventArgs";
}
declare module "@mindfusion/mapping" {
    export { Bubble } from "Mapping/jsmaps/src/Bubble";
    export { LatLong } from "Mapping/jsmaps/src/LatLong";
    export { LatLongRect } from "Mapping/jsmaps/src/LatLongRect";
    export { CanvasLayer } from "Mapping/jsmaps/src/CanvasLayer";
    export { Circle } from "Mapping/jsmaps/src/Circle";
    export { CircleMarker } from "Mapping/jsmaps/src/CircleMarker";
    export { Decoration } from "Mapping/jsmaps/src/Decoration";
    export { DecorationLayer } from "Mapping/jsmaps/src/DecorationLayer";
    export { Drawing } from "Mapping/jsmaps/src/Drawing";
    export { ZoomPivot } from "Mapping/jsmaps/src/Enum";
    export { DecorationEventArgs, MapEventArgs, } from "Mapping/jsmaps/src/EventArgs";
    export { Hint } from "Mapping/jsmaps/src/Hint";
    export { MapLayer } from "Mapping/jsmaps/src/MapLayer";
    export { MapView } from "Mapping/jsmaps/src/MapView";
    export { Marker } from "Mapping/jsmaps/src/Marker";
    export { Poly } from "Mapping/jsmaps/src/Poly";
    export { UIControl } from "Mapping/jsmaps/src/UIControl";
    export * as Utils from "Mapping/jsmaps/src/Utils";
}
