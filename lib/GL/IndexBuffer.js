import Buffer, { BufferType } from './Buffer';
import Context from './Context';
import { DataType, PrimitiveType } from './Helpers';
class IndexBuffer extends Buffer {
    constructor(data) {
        super(BufferType.ElementArray, new Uint16Array(data), data.length);
        this.name = 'IndexBuffer';
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        Context.drawElements(type, this.length, DataType.Uint16, 0);
    }
    drawInstanced(type, count) {
        this.bind();
        Context.drawElementsInstanced(type, this.length, DataType.Uint16, 0, count);
    }
}
export default IndexBuffer;
