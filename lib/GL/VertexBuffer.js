import Context from './Context';
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
        Context.drawArrays(type, 0, this.length);
    }
    drawInstanced(type, count) {
        Context.drawArraysInstanced(type, 0, this.length, count);
    }
}
export default VertexBuffer;
