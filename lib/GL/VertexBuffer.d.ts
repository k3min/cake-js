import { Indexable } from '../Helpers';
import Buffer from './Buffer';
import { PrimitiveType, VertexArrayBuffer, VertexAttribute } from './Helpers';
declare class VertexBuffer<T extends Indexable<VertexAttribute>> extends Buffer<VertexArrayBuffer<T>> {
    name: string;
    constructor(data: T[]);
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: PrimitiveType): void;
}
export default VertexBuffer;
