import DataType from './DataType';
declare class VertexAttribute<T extends ArrayLike<number> = ArrayLike<number>> {
    readonly data: T;
    readonly type: DataType;
    readonly length: number;
    readonly bytesPerElement: number;
    readonly stride: number;
    readonly normalized: boolean;
    readonly littleEndian: boolean;
    constructor(data: T, type?: DataType, normalized?: boolean, littleEndian?: boolean);
}
export default VertexAttribute;
