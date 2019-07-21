declare class VertexAttribute<T extends ArrayLike<number>> {
    readonly value: T;
    readonly type: GLenum;
    readonly size: number;
    readonly length: number;
    readonly stride: number;
    readonly normalized: boolean;
    constructor(value: T, type?: GLenum, normalized?: boolean);
}
export default VertexAttribute;
