/// <reference types="../../@mindfusion/common" />
declare module "@mindfusion/common-collections" {
    /**
    * @namespace MindFusion.Common.Collections
    */
    /**
     * Copyright (c) 2015-2022, MindFusion LLC - Bulgaria.
     *
     * This source code is provided to you as part of the MindFusion software components
     * package you have purchased. You may use the source code to trace and/or fix
     * problems or customize the library as needed for your application. To get permission
     * to use the source code in any other way, please contact us at support@mindfusion.eu.
     */
    import { NotifyCollectionChangedEventArgs, NotifyCollectionChangingEventArgs, PropertyChangedEventDispatcher, NotifyCollectionChangedEventDispatcher, NotifyCollectionChangingEventDispatcher, INotifyPropertyChanged, INotifyCollectionChanged, INotifyCollectionChanging, PropertyChangedEventArgs } from '@mindfusion/common';
    /**
     * @class Represents an array of arbitrary objects.
     * @property {Array} items Gets the collection as an array.
     */
    export class IEnumerable<T> {
        /**
         * Initializes a new instance of the IEnumerable class.
         * @param {Array<T>} [items] The underlying array data structure of the collection.
         */
        constructor(items?: Array<T>);
        private _items;
        /**
         * Gets the collection as an array.
        * @returns {Array<T>} The underlying array data structure of the collection.
        */
        items(): T[];
        /**
        * Gets the collection as an array in reverse order.
        * @returns {Array<T>} The underlying array data structure of the collection in reverse order.
        */
        reverse(): T[];
        /**
        * Gets the element at the given index.
        * @param {Number} index The index.
        * @returns {T} The element at the given index.
        */
        item(index: number): T;
        /**
        * Gets the number of elements.
        * @returns {Number} The number of elements.
        */
        count(): number;
        /**
        * Checks if the given element is present in the collection.
        * @param {T} item The object to check for.
        * @returns {Boolean} True if the element is found, otherwise false.
        */
        contains(item: T): boolean;
        /**
        * Adds an object to the end of the collection.
        * @param {T} item The object to add.
        */
        add(item: T): void;
        /**
        * Adds a range of elements to the end of the collection.
        * @param {Array} range The range to add.
        */
        addRange(range: any[]): void;
        /**
        * Removes an element from the collection.
        * @param {T} item The object to remove.
        */
        remove(item: any): void;
        /**
        * Removes a range of elements starting from the given index.
        * @param {Number} index The starting index of the range.
        * @param {Number} count The length of the range.
        */
        removeRange(index: number, count: number): Array<T>;
        /**
        * Removes the element at the given index.
        * @param {Number} index The index.
        */
        removeAt(itemIndex: number): void;
        /**
        * Clears the collection.
        */
        clear(): void;
        /**
        * Creates a copy of the collection.
        * @returns {IEnumerable<T>} A copy of this collection.
        */
        clone(): IEnumerable<T>;
        /**
            * Copies a range of elements from a source collection to this collection.
            * @param {IEnumerable<T>} source The source collection.
            * @param {Number} [length] The length of the range to copy.
            * @param {Number} [sourceIndex] The starting index of the range to copy.
            * @param {Number} [destinationIndex] The index at which the range should be copied.
            */
        copyFrom(source: IEnumerable<T>, length?: number, sourceIndex?: number, destinationIndex?: number): void;
        /**
        * Copies a range of elements from this collection to a destination collection.
        * @param {IEnumerable<T>} destination The destination collection.
        * @param {Number} [length] The length of the range to copy.
        * @param {Number} [sourceIndex] The starting index of the range to copy.
        * @param {Number} [destinationIndex] The index at which the range should be copied.
        */
        copyTo(destination: IEnumerable<T>, length?: number, sourceIndex?: number, destinationIndex?: number): void;
        /**
        * Sorts the underlying array.
        * @param {Function} [compareFn] The comparing function.
        */
        sort(compareFn?: (a: T, b: T) => number): void;
        /**
        * Gets the index of a given object in a collection.
        * @param {T} obj The object to look for.
        * @param {Number} [fromIndex] The starting index to search from.
        * @returns {Number} The index of the object, or -1 if the object is not present in the collection.
        */
        indexOfItem(obj: T, fromIndex?: number): number;
        /**
        * Adds an element to the collection at the specified index.
        * @param {Number} index The index.
        * @param {T} item The object to add.
        */
        insert(index: number, item: T): void;
        /**
        * Adds a range of elements  to the collection at the specified index.
        * @param {Number} index The index.
        * @param {Array} range The range to add.
        */
        insertRange(index: number, range: any[]): void;
        /**
        * Returns a new Object array, containing the contents of the collection.
        * @returns {Array<T>} The array.
        */
        toArray(): Array<T>;
        /**
        * Invokes a transform function on each item and returns the
        * maximum value in a sequence of numbers.
        * @param {Function} selector A transform function to invoke on each element.
        * @returns {Number} The maximum number in the sequence.
        */
        max(selector: (item: T) => number): number;
        /**
        * Invokes a transform function on each item and returns the
        * minimum value in a sequence of numbers.
        * @param {Function} selector A transform function to invoke on each element.
        * @returns {Number} The minimum number in the sequence.
        */
        min(selector: (item: T) => number): number;
        /**
        * Computes the sum of the sequence of number values that are
        * obtained by invoking a transform function on each element.
        * @param {Function} selector A transform function to invoke on each element.
        * @returns {Number} The sum of the number values in the sequence.
        */
        sum(selector: (item: T) => number): number;
        /**
        * Projects each element of a sequence into a new form.
        * @param {Function} selector A transform function to invoke on each element.
        * @returns {IEnumerable<T>} An collection whose elements are the result
        * of invoking the transform function on each element.
        */
        select(selector: (item: T) => any): IEnumerable<T>;
        /**
        * Filters a sequence of values based on a predicate.
        * @param {Function} selector A function to test each element for a condition.
        * @returns {IEnumerable} An collection that contains elements from the input sequence that satisfy the condition.
        */
        where(selector: Function): IEnumerable<T>;
        /**
        * Returns the first element that satisfies the provided testing function.
        * @param {Function} selector A function to test each element for a condition.
        * @returns {Object} The first element that satisfies the provided testing function.
        */
        find(selector: Function): T;
        /**
        * Executes a provided function once for each element.
        * @param {Function} callback A function to execute for each element.
        * @param {Object} [context] The invokation context.
        */
        forEach(callback: Function, context?: any): void;
        private intersects;
        /**
        * Returns the first element in the collection.
        * @returns {Object} The first element in the collection.
        */
        first(): T;
        /**
        * Returns the last element in the collection.
        * @returns {Object} The last element in the collection.
        */
        last(): T;
    }
    /**
     * @class Represents an array of arbitrary objects.
     */
    export class List<T> extends IEnumerable<T> {
        /**
         * Initializes a new instance of the List class.
         * @param {Array<T>} [items] The underlying array data structure of the list.
         */
        constructor(items?: Array<T>);
    }
    /**
     * @class Represents a collection of arbitrary objects.
     */
    export class ObservableCollection<T> extends List<T> implements INotifyPropertyChanged, INotifyCollectionChanged, INotifyCollectionChanging {
        /**
         * Initializes a new instance of the ObservableCollection class.
         * @param {Array<T>} [items] The underlying array data structure of the collection.
         */
        constructor(items?: Array<T>);
        /**
        * Raises the collectionChanged event.
        * @param {NotifyCollectionChangedEventArgs} args An instance of the NotifyCollectionChangedEventArgs class.
        */
        protected onCollectionChanged(args: NotifyCollectionChangedEventArgs): void;
        /**
         * Occurs when a collection changes.
         * @event ObservableCollection<T>.collectionChanged
         * @type {NotifyCollectionChangedEventDispatcher}
         * @property {ObservableCollection<T>} sender
         * @property {NotifyCollectionChangedEventArgs} args
         */
        get collectionChanged(): NotifyCollectionChangedEventDispatcher;
        private m_collectionChanged;
        /**
        * Raises the propertyChanged event.
        * @param {PropertyChangedEventArgs} args An instance of the PropertyChangedEventArgs class.
        */
        protected onPropertyChanged(args: PropertyChangedEventArgs): void;
        /**
         * Occurs when a property value changes.
         * @event ObservableCollection<T>.propertyChanged
         * @type {PropertyChangedEventDispatcher}
         * @property {ObservableCollection<T>} sender
         * @property {PropertyChangedEventArgs} args
         */
        get propertyChanged(): PropertyChangedEventDispatcher;
        private m_propertyChanged;
        /**
        * Raises the collectionChanging validation event.
        * @param {NotifyCollectionChangingEventArgs} args An instance of the NotifyCollectionChangingEventArgs class.
        */
        protected onCollectionChanging(args: NotifyCollectionChangingEventArgs): boolean;
        /**
         * Occurs just before an item is added, removed, changed, moved, or the entire list is refreshed.
         * @event ObservableCollection<T>collectionChanging
         * @type {NotifyCollectionChangingEventDispatcher}
         * @property {ObservableCollection<T>} sender
         * @property {NotifyCollectionChangingEventArgs} args
         */
        get collectionChanging(): NotifyCollectionChangingEventDispatcher;
        private m_collectionChanging;
        /**
         * Adds an object to the collection.
         * @param {T} item The item to add.
         */
        add(item: T): void;
        /**
        * Adds a range of elements to the end of the collection.
        * @param {Array} range The range to add.
        */
        addRange(range: any[]): void;
        /**
        * Adds an item to the collection at the specified index.
        * @param {Number} index The index.
        * @param {Object} item The object to add.
        */
        insert(index: number, item: T): void;
        /**
        * Adds a range of elements  to the collection at the specified index.
        * @param {Number} index The index.
        * @param {Array} range The range to add.
        */
        insertRange(index: number, range: any[]): void;
        /**
         * Deletes an object from the collection
         * @param {T} item The item to remove.
         */
        remove(item: T): void;
        /**
         * Deletes a range of elements from the collection
         * @param {Number} index The starting index of the range to remove.
         * @param {Number} count The length of the range to remove.
         */
        removeRange(index: number, count: number): Array<T>;
        /**
         * Delete the element at the specified index.
         * @param {Number} itemIndex The index to remove at.
         */
        removeAt(itemIndex: number): void;
        /**
         * Clears the collection
         */
        clear(): void;
    }
}
