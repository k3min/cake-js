import VertexAttribute from './VertexAttribute';
export declare type VA = VertexAttribute<ArrayLike<number>>;
export interface Indexable {
    readonly [attribute: string]: VA;
}
declare class VertexArrayBuffer<T extends Indexable> extends ArrayBuffer {
    readonly bytesPerElement: number;
    readonly attributes: VA[];
    readonly view: DataView;
    readonly length: number;
    constructor(data: T[]);
    static getAttributes<T extends Indexable>(item: T): VA[];
    static getBytesPerElement<T extends Indexable>(item: T): number;
    set(byteOffset: number, vertexAttribute: VA): number;
}
export default VertexArrayBuffer;
