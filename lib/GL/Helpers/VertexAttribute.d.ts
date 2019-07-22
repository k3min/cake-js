declare class VertexAttribute<T extends ArrayLike<number>> {
    readonly value: T;
    readonly type: GLenum;
    readonly length: GLint;
    readonly bytesPerElement: number;
    readonly byteLength: number;
    readonly normalized: GLboolean;
    readonly littleEndian: boolean;
    constructor(value: T, type?: GLenum, normalized?: boolean, littleEndian?: boolean);
    private static getBytesPerElement;
}
export default VertexAttribute;
