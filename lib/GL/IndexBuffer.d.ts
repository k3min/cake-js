import PrimitiveType from './Helpers/PrimitiveType';
import Buffer from './Buffer';
declare class IndexBuffer extends Buffer<Uint16Array> {
    protected readonly identifier: string;
    constructor(data: number[]);
    draw(type?: PrimitiveType): void;
}
export default IndexBuffer;
