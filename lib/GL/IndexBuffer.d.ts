import Buffer from './Buffer';
import { PrimitiveType } from './Helpers';
declare class IndexBuffer extends Buffer<Uint16Array> {
    name: string;
    constructor(data: number[]);
    draw(type?: PrimitiveType): void;
}
export default IndexBuffer;
