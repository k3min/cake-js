import DataType from './DataType';
declare class VertexAttribute<T extends ArrayLike<number> = ArrayLike<number>> {
    readonly value: T;
    readonly type: DataType;
    readonly length: number;
    readonly bytesPerElement: number;
    readonly byteLength: number;
    readonly normalized: boolean;
    readonly littleEndian: boolean;
    constructor(value: T, type?: DataType, normalized?: boolean, littleEndian?: boolean);
}
export default VertexAttribute;
