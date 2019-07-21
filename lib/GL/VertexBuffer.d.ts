import Buffer from './Buffer';
import VertexArrayBuffer, { Indexable } from './Helpers/VertexArrayBuffer';
declare class VertexBuffer<T extends Indexable> extends Buffer<VertexArrayBuffer<T>> {
    protected readonly identifier: string;
    constructor(data: T[]);
    afterBind(): void;
    afterUnbind(): void;
    draw(type?: GLenum): void;
}
export default VertexBuffer;
