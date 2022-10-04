// Type definitions for intersystems-iris-native 1.0.0.
// Definitions by Jonathan Willeke.

/**
 * The type of most Iris method arguments.
 * SharedArrayBuffer, the type that results from slicing Buffer.buffer,
 * is purposely excluded; assert its type as ArrayBuffer if necessary:
 *
 *   b.buffer.slice(b.byteOffset, b.byteOffset+b.byteLength) as ArrayBuffer
 */
export type Scalar = boolean|number|string|null|ArrayBuffer;
export type ScalarOrList = Scalar|IRISList;


/**
 * The Native API connection object.
 *
 * This is declared as an interface, rather than a class, because there is no
 * usable constructor.  A Connection object is created by the module's
 * createConnection() method.
 */
export interface Connection {
    close(): null;
    createIris(): Iris;
    isClosed(): boolean;
    isUsingSharedMemory(): boolean;
}

export interface GlobalIterator<T> extends IterableIterator<T> {
    entries(): GlobalIterator<T>;
    keys(): GlobalIterator<T>;
    reversed(): GlobalIterator<T>;
    startFrom(sub: Scalar): GlobalIterator<T>;
    values(): GlobalIterator<T>;
}

/**
 * The main Native API object.
 *
 * This is declared as an interface, rather than a class, because there is no
 * usable constructor.  An Iris object is created by a Connection object's
 * createIris() method.
 */
export interface Iris {
    classMethodIRISList(className: string, methodName: string, ...args: ScalarOrList[]): IRISList;
    classMethodValue(className: string, methodName: string, ...args: ScalarOrList[]): Scalar;
    classMethodVoid(className: string, methodName: string, ...args: ScalarOrList[]): null;
    function(routineName: string, label: string, ...args: ScalarOrList[]): Scalar;
	functionIRISList(routineName: string, label: string, ...args: ScalarOrList[]): IRISList;
    get(globalName: string, ...subs: ScalarOrList[])
    getAPIVersion(): string;
    getBoolean(globalName: string, ...subs: ScalarOrList[]): boolean;
    getBytes(globalName: string, ...subs: ScalarOrList[]): ArrayBuffer;
    getList(globalName: string, ...subs: ScalarOrList[]): IRISList;
    getNumber(globalName: string, ...subs: ScalarOrList[]): number;
    getServerVersion(): string;
    getString(globalName: string, ...subs: ScalarOrList[]): string;
    getTLevel(): number;
    increment(value: number, globalName: string, ...subs: ScalarOrList[]): number;
    isDefined(globalName: string, ...subs: ScalarOrList[]): number;
    iterator(globalName: string, ...subs: ScalarOrList[]): GlobalIterator<Scalar|Scalar[]>;
    kill(globalName: string, ...subs: ScalarOrList[]): null;
    lock(mode: string, seconds: number, name: string, ...subs: ScalarOrList[]): boolean;
    procedure(routineName: string, label: string, ...args: ScalarOrList[]): null;
    releaseAllLocks(): null;
    set(value: Buffer|ScalarOrList, globalName: string, ...subs: ScalarOrList[]): null;
    tCommit(): null;
    tRollback(): null;
    tRollbackOne(): null;
    tStart(): null;        
    unlock(mode: string, name: string, ...subs: ScalarOrList[]): null;
    createList() : IRISList;
    nextSubscript(reversed: boolean, globalName: string, ...subs: ScalarOrList[]) : string;
}

/**
 * The IRISList object.
 *
 * Unlike the Connection and Iris objects, an IRISList object is constructed
 * using the new keyword.  It can also be returned by an IRISList object's
 * getList() method, or by one of the following methods of an Iris object:
 * 
 * - classMethodList()
 * - functionList()
 * - getList()
 */
export class IRISList {
    constructor(value?: IRISList|Uint8Array);
    add(value: ScalarOrList): null;
    clear(): null;
    count(): number;
    get(index: number): Scalar;
    getBuffer(): Buffer;
    getList(index: number): IRISList;
    remove(index: number): boolean;
    set(index: number, value: ScalarOrList): null;
    size(): number;
	equals(IRISList): boolean;
    toString(): string;
}

export interface ConnectionInfo {
    host: string;
    port: number;
    ns: string;
    user: string;
    pwd: string;
    sharedmemory?: boolean;
    timeout?: number;
    logfile?: string;
}

export function createConnection(connectionInfo: ConnectionInfo): Connection;
export function createConnection(connectionInfo: ConnectionInfo, callback: (err, c: Connection) => void): void;
