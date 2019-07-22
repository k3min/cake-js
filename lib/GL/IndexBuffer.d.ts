import Buffer from './Buffer';
declare class IndexBuffer extends Buffer<Uint16Array> {
    constructor(data: number[]);
    draw(type?: GLenum): void;
}
export default IndexBuffer;
