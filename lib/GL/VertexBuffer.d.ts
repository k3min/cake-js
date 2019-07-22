import Buffer from './Buffer';
import VertexArrayBuffer, { Indexable } from './Helpers/VertexArrayBuffer';
declare class VertexBuffer<T extends Indexable> extends Buffer<VertexArrayBuffer<T>> {
    name: string;
    constructor(data: T[]);
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: GLenum): void;
}
export default VertexBuffer;
