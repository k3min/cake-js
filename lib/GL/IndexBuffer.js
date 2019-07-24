import Buffer, { BufferType } from './Buffer';
import GL from './GL';
import { DataType, PrimitiveType } from './Helpers';
class IndexBuffer extends Buffer {
    constructor(data) {
        super(BufferType.ElementArray, new Uint16Array(data), data.length);
        this.name = 'IndexBuffer';
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        GL.drawElements(type, this.length, DataType.Uint16, 0);
    }
}
export default IndexBuffer;
