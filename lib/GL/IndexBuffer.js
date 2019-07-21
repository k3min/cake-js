import PrimitiveType from './Helpers/PrimitiveType';
import gl from './index';
import Buffer, { BufferTarget } from './Buffer';
import { VertexAttributeType } from './Helpers/VertexAttribute';
class IndexBuffer extends Buffer {
    get identifier() {
        return 'indexBuffer';
    }
    constructor(data) {
        super(BufferTarget.ElementArray, new Uint16Array(data), data.length);
    }
    draw(type = PrimitiveType.Triangles) {
        gl.drawElements(type, this.length, VertexAttributeType.UnsignedShort, 0);
    }
}
export default IndexBuffer;
