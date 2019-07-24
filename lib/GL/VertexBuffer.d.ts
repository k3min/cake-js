import Indexable from '../Helpers/Indexable';
import Buffer from './Buffer';
import { PrimitiveType } from './Helpers/Drawable';
import VertexArrayBuffer from './Helpers/VertexArrayBuffer';
import VertexAttribute from './Helpers/VertexAttribute';
declare class VertexBuffer<T extends Indexable<VertexAttribute>> extends Buffer<VertexArrayBuffer<T>> {
    name: string;
    constructor(data: T[]);
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: PrimitiveType): void;
}
export default VertexBuffer;
