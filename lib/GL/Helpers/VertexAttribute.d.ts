declare class VertexAttribute<T extends ArrayLike<number>> {
    readonly value: T;
    readonly type: GLenum;
    readonly length: GLint;
    readonly bytesPerElement: number;
    readonly byteLength: number;
    readonly normalized: GLboolean;
    constructor(value: T, type?: GLenum, normalized?: boolean);
    private static getBytesPerElement;
}
export default VertexAttribute;
