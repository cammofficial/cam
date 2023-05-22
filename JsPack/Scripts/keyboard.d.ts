/// <reference types="../../@mindfusion/common" />
/// <reference types="../../@mindfusion/controls" />
declare module "Keyboard/jskeyboard/src/KeyboardState" {
    /**
    * @namespace MindFusion.Keyboard
    */
    /**
     * Copyright (c) 2020-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    /**
    * @class Specifies state of modifier keys.
    */
    export class KeyboardState {
        /**
        * Sets a boolean value specifying state of Shift modifier.
        */
        static set Shift(arg: boolean);
        /**
        * Gets a boolean value specifying state of Shift modifier.
        */
        static get Shift(): boolean;
        /**
        * Sets a boolean value specifying state of Ctrl modifier.
        */
        static set Ctrl(arg: boolean);
        /**
        * Gets a boolean value specifying state of Ctrl modifier.
        */
        static get Ctrl(): boolean;
        /**
        * Sets a boolean value specifying state of Alt modifier.
        */
        static set Alt(arg: boolean);
        /**
        * Gets a boolean value specifying state of Alt modifier.
        */
        static get Alt(): boolean;
        /**
        * Sets a boolean value specifying state of Caps Lock.
        */
        static set CapsLock(arg: boolean);
        /**
        * Gets a boolean value specifying state of Caps Lock.
        */
        static get CapsLock(): boolean;
        /**
        * Sets a boolean value specifying state of Caps Lock.
        */
        static set NumLock(arg: boolean);
        /**
        * Gets a boolean value specifying state of Num Lock.
        */
        static get NumLock(): boolean;
        /**
        * Sets a boolean value specifying state of the Insert key.
        */
        static set Insert(arg: boolean);
        /**
        * Gets a boolean value specifying state of the Insert key.
        */
        static get Insert(): boolean;
    }
    export namespace KeyboardState {
        const shift: boolean;
        const ctrl: boolean;
        const alt: boolean;
        const capsLock: boolean;
        const numLock: boolean;
        const insert: boolean;
    }
}
declare module "Keyboard/jskeyboard/src/Keys" {
    /**
     * Defines keyboard key codes.
     */
    export type Keys = any;
    export namespace Keys {
        const A: number;
        const Add: number;
        const Apps: number;
        const Attn: number;
        const B: number;
        const Back: number;
        const BrowserBack: number;
        const BrowserFavorites: number;
        const BrowserForward: number;
        const BrowserHome: number;
        const BrowserRefresh: number;
        const BrowserSearch: number;
        const BrowserStop: number;
        const C: number;
        const Cancel: number;
        const Capital: number;
        const CapsLock: number;
        const Clear: number;
        const Control: number;
        const Crsel: number;
        const D: number;
        const D0: number;
        const D1: number;
        const D2: number;
        const D3: number;
        const D4: number;
        const D5: number;
        const D6: number;
        const D7: number;
        const D8: number;
        const D9: number;
        const Decimal: number;
        const Delete: number;
        const Divide: number;
        const Down: number;
        const E: number;
        const End: number;
        const Enter: number;
        const EraseEof: number;
        const Escape: number;
        const Execute: number;
        const Exsel: number;
        const F: number;
        const F1: number;
        const F10: number;
        const F11: number;
        const F12: number;
        const F13: number;
        const F14: number;
        const F15: number;
        const F16: number;
        const F17: number;
        const F18: number;
        const F19: number;
        const F2: number;
        const F20: number;
        const F21: number;
        const F22: number;
        const F23: number;
        const F24: number;
        const F3: number;
        const F4: number;
        const F5: number;
        const F6: number;
        const F7: number;
        const F8: number;
        const F9: number;
        const FinalMode: number;
        const G: number;
        const H: number;
        const HanguelMode: number;
        const HangulMode: number;
        const HanjaMode: number;
        const Help: number;
        const Home: number;
        const I: number;
        const IMEAccept: number;
        const IMEAceept: number;
        const IMEConvert: number;
        const IMEModeChange: number;
        const IMENonconvert: number;
        const Insert: number;
        const J: number;
        const JunjaMode: number;
        const K: number;
        const KanaMode: number;
        const KanjiMode: number;
        const KeyCode: number;
        const L: number;
        const LaunchApplication1: number;
        const LaunchApplication2: number;
        const LaunchMail: number;
        const LButton: number;
        const Left: number;
        const LineFeed: number;
        const LWin: number;
        const M: number;
        const MButton: number;
        const MediaNextTrack: number;
        const MediaPlayPause: number;
        const MediaPreviousTrack: number;
        const MediaStop: number;
        const Alt: number;
        const Modifiers: number;
        const Multiply: number;
        const N: number;
        const Next: number;
        const NoName: number;
        const None: number;
        const NumLock: number;
        const NumPad0: number;
        const NumPad1: number;
        const NumPad2: number;
        const NumPad3: number;
        const NumPad4: number;
        const NumPad5: number;
        const NumPad6: number;
        const NumPad7: number;
        const NumPad8: number;
        const NumPad9: number;
        const O: number;
        const Oem1: number;
        const Oem102: number;
        const Oem2: number;
        const Oem3: number;
        const Oem4: number;
        const Oem5: number;
        const Oem6: number;
        const Oem7: number;
        const Oem8: number;
        const OemBackslash: number;
        const OemClear: number;
        const OemCloseBrackets: number;
        const Oemcomma: number;
        const OemMinus: number;
        const OemOpenBrackets: number;
        const OemPeriod: number;
        const OemPipe: number;
        const Oemplus: number;
        const OemQuestion: number;
        const OemQuotes: number;
        const OemSemicolon: number;
        const Oemtilde: number;
        const P: number;
        const Pa1: number;
        const Packet: number;
        const PageDown: number;
        const PageUp: number;
        const Pause: number;
        const Play: number;
        const Print: number;
        const PrintScreen: number;
        const Prior: number;
        const ProcessKey: number;
        const Q: number;
        const R: number;
        const RButton: number;
        const Return: number;
        const Right: number;
        const RWin: number;
        const S: number;
        const Scroll: number;
        const Select: number;
        const SelectMedia: number;
        const Separator: number;
        const Shift: number;
        const Sleep: number;
        const Snapshot: number;
        const Space: number;
        const Subtract: number;
        const T: number;
        const Tab: number;
        const U: number;
        const Up: number;
        const V: number;
        const VolumeDown: number;
        const VolumeMute: number;
        const VolumeUp: number;
        const W: number;
        const X: number;
        const XButton1: number;
        const XButton2: number;
        const Y: number;
        const Z: number;
        const Zoom: number;
    }
}
declare module "Keyboard/jskeyboard/src/KeyboardLayout" {
    /**
    * @class Defines layout of keyboard keys.
    */
    export class KeyboardLayout {
        static compactLayout(): KeyboardLayout;
        static defaultLayout(): KeyboardLayout;
        static extendedLayout(): KeyboardLayout;
        static createLayout(extraKeys: any, xOffset: any, yOffset: any): KeyboardLayout;
        /**
        * Creates and initializes a new KeyboardLayout from the specified definition object.
        * @param {Object} layoutDef A JavaScipt layout definition generated by Keyboard Creator tool.
        * @returns {KeyboardLayout} A KeyboardLayout object.
        */
        static create(layoutDef: any): KeyboardLayout;
        static createKeys(layoutDef: any): KeyboardLayout;
        static win32ToJavaCode(keyCode: any): any;
        static numMixin(code: any): {
            code: number;
            content: string;
            num?: undefined;
        } | {
            code: number;
            num: string;
            content?: undefined;
        };
        static get charLayoutConst(): {
            code: number;
            type: string;
            content: string;
            left: number;
            top: number;
            width: number;
            height: number;
        }[];
        static get compactLayoutConst(): {
            code: number;
            type: string;
            content: string;
            left: number;
            top: number;
            width: number;
            height: number;
        }[];
        static get defaultLayoutConst(): {
            code: number;
            type: string;
            content: string;
            left: number;
            top: number;
            width: number;
            height: number;
        }[];
        static get extendedLayoutConst(): ({
            code: number;
            type: string;
            content: string;
            left: number;
            top: number;
            width: number;
            height: number;
            num?: undefined;
        } | {
            code: number;
            type: string;
            num: string;
            content: string;
            left: number;
            top: number;
            width: number;
            height: number;
        })[];
        static get numpadKeysConst(): ({
            code: number;
            content: string;
            num?: undefined;
        } | {
            code: number;
            num: string;
            content?: undefined;
        })[];
        set keyboardLayoutId(arg: any);
        get keyboardLayoutId(): any;
        /**
        * Adds a new key with specified content and position to the layout.
        * @param {String} content A string containing the key's character.
        * @param {Number} left A number specifying key's horizontal position.
        * @param {Number} top A number specifying key's vertical position.
        * @param {Number} width A number specifying key's width.
        * @param {Number} height A number specifying key's height.
        */
        addKey(content: string, left: number, top: number, width: number, height: number): Key;
        _keyboardLayoutId: any;
    }
    export namespace KeyboardLayout {
        const defLayout: any[];
        const layouts: any[];
    }
    import { Key } from "Keyboard/jskeyboard/src/Key";
}
declare module "Keyboard/jskeyboard/src/Key" {
    /**
    * @class Represents a key in the keyboard.
    */
    export class Key {
        static findQuillEditor(element: any): any;
        static targetEditable(): boolean;
        static insertChar(character: any): void;
        static onChar(): void;
        static onBack(): void;
        static onTab(): void;
        static onDelete(): void;
        static onLeft(): void;
        static onRight(): void;
        static caretLineUp(target: any, layout: any): void;
        static quillCaretLineUp(quill: any): void;
        static caretLineDown(target: any, layout: any): void;
        static quillCaretLineDown(quill: any): void;
        static caretLineStart(target: any, layout: any): void;
        static caretLineEnd(target: any, layout: any): void;
        static quillVisibleLinesCount(quill: any): number;
        static onHome(): void;
        static onEnd(): void;
        static onUp(): void;
        static onDown(): void;
        static onPageUp(): void;
        static onPageDown(): void;
        static onEnter(): void;
        static getTextLayout(textarea: any): {
            line: number;
            index: number;
            x: any;
        }[];
        static onCapsLock(): boolean;
        static onInsert(): void;
        static onShift(): boolean;
        static onCtrl(): void;
        static onAlt(): void;
        static onNumLock(): boolean;
        /**
        * Initializes a new instance of the Key class.
        * @constructor
        * @param {Object} config An object literal whose fields are assigned to respective Key properties.
        */
        constructor(config: any);
        code: any;
        action: typeof Key.onEnter;
        character: string;
        draw(): HTMLInputElement;
        button: HTMLInputElement;
        /**
        * Sends this key as input to focused element.
        */
        send(): any;
        updateKey(): void;
        label: any;
    }
}
declare module "Keyboard/jskeyboard/src/LocaleLabels" {
    /**
    * @namespace MindFusion.Keyboard
    */
    /**
     * Copyright (c) 2020-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    export class KeyLabels {
        constructor(keyCode: any, lowerCase: any, shiftCase: any);
        keyCode: any;
        lowerCase: any;
        shiftCase: any;
    }
    export class LocaleLabels {
        static getKeyLabels(locale: any): KeyLabels[];
        static get enLabels(): KeyLabels[];
        static get deLabels(): KeyLabels[];
        static get frLabels(): KeyLabels[];
        static get esLabels(): KeyLabels[];
        static get ptLabels(): KeyLabels[];
        static get ruLabels(): KeyLabels[];
        static get bgLabels(): KeyLabels[];
    }
}
declare module "Keyboard/jskeyboard/src/UIControl" {
    /**
    * @class A base class for UI controls.
    * @augments Control
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
declare module "Keyboard/jskeyboard/src/VirtualKeyboard" {
    /**
    * @class Implements a reusable Virtual Keyboard component.
    * @augments Control
    */
    export class VirtualKeyboard extends Control {
        /**
        * Creates and initializes a new VirtualKeyboard on the specified DOM element.
        * This method is static and can be called without creating an instance of the class.
        * @param {Object} element The DOM element that the keyboard should be attached to.
        * @returns {VirtualKeyboard} A VirtualKeyboard object that represents
        * the newly created keyboard.
        */
        static create(element: any): VirtualKeyboard;
        /**
        * Identifies keyboard layout modes.
        * @enum
        * @name KeyboardMode
        * @param [Compact] A layout containing only the alpha-numeric block of keys.
        * @param [Default] Laptop-like layout containing alpha-numeric and functional keys.
        * @param [Extended] Desktop-like layout which also adds a num-pad block.
        */
        static get KeyboardMode(): {
            Compact: number;
            Default: number;
            Extended: number;
        };
        static preventFocus(e: any): void;
        static layoutId(locale: any): 135661590 | 67568647 | 67767306 | 67896332 | 67699721 | 68289554 | 68748313 | -256965630;
        /**
        * Initializes a new instance of the VirtualKeyboard class.
        * @constructor
        * @param {HTMLDivElement} [element] The control's associated Dom element.
        */
        constructor(element?: HTMLDivElement);
        _scaleToFitParent: boolean;
        _currentKey: any;
        _autoRepeatTimer: number;
        _autoReleaseModifierKeys: boolean;
        _autoRepeat: boolean;
        _layoutMode: number;
        set inputLocale(arg: string);
        /**
        * Gets or sets the current input language.
        * @type {String}
        * @summary A string specifying keyboard's locale.
        */
        get inputLocale(): string;
        _keyPressed: EventDispatcher<import("Controls/EventArgs").EventArgs>;
        resizeHandler: (e: any) => void;
        attachKey(key: any): void;
        container: HTMLDivElement;
        parentWidth: any;
        parentHeight: number;
        addKey(content: any, left: any, top: any, width: any, height: any): Key;
        /**
        * Sends the specified key as input to focused element.
        * @param {Key} key The virtual key that should be sent.
        */
        sendKey(key: Key): void;
        updateLanguage(locale: any): void;
        set layout(arg: KeyboardLayout);
        /**
        * Gets or sets the current keyboard layout.
        * @type {KeyboardLayout}
        * @summary An instance of the KeyboardLayout class.
        */
        get layout(): KeyboardLayout;
        updateKeys(repaint: any): void;
        currentKey: any;
        autoRepeatTimer: number;
        onMouseLeave(e: any): void;
        stopAutoRepeat(): void;
        onAutoRepeatTimer(): void;
        onClick(e: any): void;
        onResize(): void;
        _layout: any;
        set scaleToFitParent(arg: boolean);
        /**
        * Gets or sets a value indicating whether the keyboard scales to fit inside its parent element.
        * @type {Boolean}
        * @summary true to scale the keyboard, or false otherwise.
        */
        get scaleToFitParent(): boolean;
        set autoReleaseModifierKeys(arg: boolean);
        /**
        * Gets or sets a value indicating whether pressing a regular key should automatically release
        * modifier keys such as shift, alt, control etc. (except CapsLock).
        * @type {Boolean}
        * @summary true to release modifier keys automatically, or false otherwise.
        */
        get autoReleaseModifierKeys(): boolean;
        set autoRepeat(arg: boolean);
        /**
        * Gets or sets a value indicating whether the component should synthesize keyboard events repeatedly
        * when a virtual key is pressed down, until the key is released.
        * @type {Boolean}
        * @summary true to enable automatic repeat, or false otherwise.
        */
        get autoRepeat(): boolean;
        set layoutMode(arg: any);
        /**
        * Gets or sets the current keyboard layout mode.
        * @type {KeyboardMode}
        * @summary A member of the KeyboardMode enumeration specifying current layout mode.
        */
        get layoutMode(): any;
        _inputLocale: string;
        get targetElement(): Element;
        /**
         * Raised when a key is pressed.
         * @event keyPressed
         * @type {EventDispatcher}
         * @property {VirtialKeyboard} sender
         * @property {Key} key
         */
        get keyPressed(): EventDispatcher<any>;
    }
    import { Control } from "@mindfusion/common";
    import { EventDispatcher } from "@mindfusion/common";
    import { Key } from "Keyboard/jskeyboard/src/Key";
    import { KeyboardLayout } from "Keyboard/jskeyboard/src/KeyboardLayout";
}
declare module "@mindfusion/keyboard" {
    export { Key } from "Keyboard/jskeyboard/src/Key";
    export { KeyboardLayout } from "Keyboard/jskeyboard/src/KeyboardLayout";
    export { KeyboardState } from "Keyboard/jskeyboard/src/KeyboardState";
    export { Keys } from "Keyboard/jskeyboard/src/Keys";
    export { LocaleLabels } from "Keyboard/jskeyboard/src/LocaleLabels";
    export { VirtualKeyboard } from "Keyboard/jskeyboard/src/VirtualKeyboard";
}
