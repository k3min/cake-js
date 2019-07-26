import GL from './GL';
import Buffer, { BufferType } from './Buffer';
import { PrimitiveType, VertexArrayBuffer } from './Helpers';
class VertexBuffer extends Buffer {
    constructor(data) {
        super(BufferType.Array, new VertexArrayBuffer(data), data.length);
        this.name = 'VertexBuffer';
    }
    binding() {
        super.binding();
        this.data.bind();
    }
    unbinding() {
        this.data.unbind();
        super.unbinding();
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        GL.drawArrays(type, 0, this.length);
    }
}
export default VertexBuffer;
