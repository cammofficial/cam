declare module "Collections/Grid" {
    /**
    * @namespace MindFusion.Collections
    */
    /**
    * @class Represents a collection of tabular data.
    */
    export class Grid {
        /**
        * Initializes a new instance of the Grid class.
        * @constructor
        */
        constructor(columns: any, rows: any);
        clone(): Grid;
        get(col: any, row: any): any;
        set(col: any, row: any, value: any): void;
        clear(): void;
        data: any[];
        columns: any;
        rows: any;
        resize(columns: any, rows: any): void;
        deleteColumn(col: any): void;
        insertColumn(col: any): void;
        deleteRow(row: any): void;
        insertRow(row: any): void;
    }
}
declare module "Collections/PriorityQueue" {
    /**
    * @namespace MindFusion.Collections
    */
    export class PriorityQueue {
        constructor(compareFunction: any);
        heap: any[];
        size: number;
        compareFunction: any;
        add(v: any): void;
        popMin(): any;
        changePriority(v: any): void;
        swap(i: any, j: any): void;
        fixUp(k: any): void;
        fixDown(k: any, N: any): void;
        empty(): boolean;
        more(i: any, j: any): boolean;
    }
}
declare module "Collections/Queue" {
    /**
    * @namespace MindFusion.Collections
    */
    /**
    * @class Represents a first-in, first-out collection of objects.
    */
    export class Queue {
        /**
        * @private
        */
        private head;
        /**
        * @private
        */
        private tail;
        /**
        * @private
        */
        private size;
        /**
        * Adds an object to the end of the queue.
        * @param {Object} value The object to add.
        */
        enqueue(value: any): void;
        /**
        * Removes and returns the object at the beginning of the queue.
        * @returns {Object} The object that is removed from the beginning of the queue.
        * @remarks If the queue is empty this method will throw an exception.
        */
        dequeue(): any;
        /**
        * Gets the number of elements in the queue.
        * @returns {Number}
        */
        getSize(): number;
        get count(): number;
    }
}
declare module "Collections/Utils" {
    /**
    * @namespace MindFusion.Collections
    */
    export class Utils {
        static remove(array: any, element: any): void;
        static last(array: any): any;
        static containsAll(set: any, elements: any): boolean;
        static addAll(set: any, elements: any): void;
        static first(set: any): any;
    }
}
declare module "@mindfusion/collections" {
    export { Grid } from "Collections/Grid";
    export { PriorityQueue } from "Collections/PriorityQueue";
    export { Queue } from "Collections/Queue";
    export { Utils } from "Collections/Utils";
}
