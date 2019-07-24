import GL from './GL';
import Buffer, { BufferType } from './Buffer';
import { PrimitiveType, VertexArrayBuffer } from './Helpers';
class VertexBuffer extends Buffer {
    constructor(data) {
        super(BufferType.Array, new VertexArrayBuffer(data), data.length);
        this.name = 'VertexBuffer';
    }
    onBind() {
        super.onBind();
        this.data.bind();
    }
    onUnbind() {
        this.data.unbind();
        super.onUnbind();
    }
    draw(type = PrimitiveType.Triangles) {
        this.bind();
        GL.drawArrays(type, 0, this.length);
    }
}
export default VertexBuffer;
