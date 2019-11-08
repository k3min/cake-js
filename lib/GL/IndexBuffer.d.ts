import Buffer from './Buffer';
import { PrimitiveType } from './Helpers';
declare class IndexBuffer extends Buffer<Uint16Array> {
    name: string;
    constructor(data: number[]);
    draw(type?: PrimitiveType): void;
    drawInstanced(type: PrimitiveType, count: number): void;
}
export default IndexBuffer;
