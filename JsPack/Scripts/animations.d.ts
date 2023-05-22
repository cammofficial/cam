/// <reference types="../../@mindfusion/controls" />
declare module "Animations/Enum" {
    /**
     * Specifies the animation function used by an Animation object.
     */
    export type AnimationType = number;
    export namespace AnimationType {
        const Linear: number;
        const Power: number;
        const Exponential: number;
        const Circular: number;
        const BackBow: number;
        const Bounce: number;
        const Elastic: number;
        const Custom: number;
    }
    /**
     * Specifies the easing applied to an animation.
     */
    export type EasingType = number;
    export namespace EasingType {
        const EaseIn: number;
        const EaseOut: number;
        const EaseInOut: number;
        const EaseOutIn: number;
    }
}
declare module "Animations/Events" {
    /**
    * @namespace MindFusion.Animations
    */
    /**
    * @class Defines all events raised in the Animations namespace.
    */
    export class Events {
        /**
        * Raised when an Animation is complete.
        * @type {String}
        * @summary A string containing the event name.
        */
        static get animationComplete(): string;
    }
}
declare module "Animations/Animation" {
    /**
    * @class Represents an object that is used to animate diagram items on the canvas.
    */
    export class Animation extends Disposable {
        /**
        * Initializes a new instance of the Animation class.
        * @constructor
        * @param {DiagramItem} item The diagram item to animate.
        * @param {Object} [options] An object used to specify various property values for the animation.
        * @param {Function} [onUpdateCallback] A callback function called on every animation tick.
        * @param {Function} [onCustomFunctionCallback] A callback function called when the animation type is set to Custom.
        */
        constructor(item: any, options?: any, onUpdateCallback?: Function, onCustomFunctionCallback?: Function);
        /**
        * The DiagramItem associated with this animation.
        * @type {DiagramItem}
        */
        item: any;
        set duration(arg: number);
        /**
        * Gets or sets the duration of the animation function in milliseconds.
        * @type {Number}
        * @summary The duration of the animation. The default value is 1000.
        */
        get duration(): number;
        set fromValue(arg: any);
        /**
        * Gets or sets the initial value of the property that will be animated.
        * @type {Object}
        * @summary The initial value.
        */
        get fromValue(): any;
        set toValue(arg: any);
        /**
        * Gets or sets the target value of the property that will be animated.
        * @type {Object}
        * @summary The target value.
        */
        get toValue(): any;
        set animationType(arg: number);
        /**
        * Gets or sets the type of the animation.
        * @type {AnimationType}
        * @summary A member of the AnimationType enumeration.
        */
        get animationType(): number;
        set param(arg: any);
        /**
        * Gets or sets an optional value passed to the animation function.
        * @type {Object}
        * @summary The optional parameter. The default value is null.
        */
        get param(): any;
        set easingType(arg: number);
        /**
        * Gets or sets the easing type of the animation.
        * @type {EasingType}
        * @summary A member of the EasingType enumeration.
        */
        get easingType(): number;
        set repeat(arg: boolean);
        /**
        * Gets or sets a value indicating whether to restart the animation after it completes.
        * @type {Boolean}
        * @summary true to loop the animation, or false otherwise. The default value is false.
        */
        get repeat(): boolean;
        set reverse(arg: boolean);
        /**
        * Gets or sets a value indicating whether to swap the from and to values after an animation loop completes.
        * @type {Boolean}
        * @summary true to reverse the animation, or false otherwise. The default value is false.
        */
        get reverse(): boolean;
        onUpdateDelegate: (animation: any, animationDelta: any) => any;
        onCustomFunctionDelegate: (progress: any, prm: any) => any;
        ellapsedTime: number;
        _progress: number;
        animationId: any;
        /**
        * Starts or resumes the animation.
        */
        start(): void;
        startTimeStamp: number;
        /**
        * Stops the animation.
        */
        stop(): void;
        /**
        * Indicates whether the animation is currently running.
        * @type {Boolean}
        * @summary true if animation currently in progress, ot false otherwise.
        */
        get isRunning(): boolean;
        /**
        * Gets the progress of the current animation iteration.
        * @type {Number}
        * @summary Animation progress in 0-1 range.
        */
        get progress(): number;
        animationProgress(progress: any): any;
        onCustomFunction(progress: any, prm: any): any;
        easeIn(progress: any): any;
        easeOut(progress: any): number;
        easeInOut(progress: any): number;
        easeOutIn(progress: any): number;
        update(): void;
        onUpdate(animation: any, animationDelta: any): void;
        _duration: any;
        _fromValue: any;
        _toValue: any;
        _animationType: any;
        _param: any;
        _easingType: any;
        _repeat: any;
        _reverse: any;
    }
    export namespace Animation {
        const requestAnimationFrame: any;
        const cancelAnimationFrame: any;
    }
    import { Disposable } from "@mindfusion/controls";
}
declare module "@mindfusion/animations" {
    export { Animation } from "Animations/Animation";
    export { AnimationType } from "Animations/Enum";
    export { EasingType } from "Animations/Enum";
    export { Events } from "Animations/Events";
}
