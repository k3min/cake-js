export declare enum VertexAttributeType {
    Byte,
    Float,
    Int,
    Short,
    UnsignedByte,
    UnsignedInt,
    UnsignedShort
}
declare class VertexAttribute<T extends ArrayLike<number>> {
    readonly value: T;
    readonly type: VertexAttributeType;
    readonly size: number;
    readonly length: number;
    readonly stride: number;
    readonly normalized: boolean;
    constructor(value: T, type?: VertexAttributeType, normalized?: boolean);
}
export default VertexAttribute;
