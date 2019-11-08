import { Indexable } from '../Core/Helpers';
import Buffer from './Buffer';
import { PrimitiveType, VertexArrayBuffer } from './Helpers';
declare class VertexBuffer<T extends Indexable<ArrayLike<number>>> extends Buffer<VertexArrayBuffer<T>> {
    name: string;
    constructor(data: T[]);
    protected binding(): void;
    protected unbinding(): void;
    draw(type?: PrimitiveType): void;
    drawInstanced(type: PrimitiveType, count: number): void;
}
export default VertexBuffer;
