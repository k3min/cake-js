import { Indexable } from '../Core/Helpers';
import Buffer from './Buffer';
import { PrimitiveType, VertexArrayBuffer, VertexAttribute } from './Helpers';
declare class VertexBuffer<T extends Indexable<VertexAttribute>> extends Buffer<VertexArrayBuffer<T>> {
    name: string;
    constructor(data: T[]);
    protected binding(): void;
    protected unbinding(): void;
    draw(type?: PrimitiveType): void;
}
export default VertexBuffer;
