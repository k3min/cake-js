import Buffer from './Buffer';
declare class IndexBuffer extends Buffer<Uint16Array> {
    name: string;
    constructor(data: number[]);
    draw(type?: GLenum): void;
}
export default IndexBuffer;
