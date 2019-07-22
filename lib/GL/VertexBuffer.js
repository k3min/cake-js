import gl from './index';
import Buffer from './Buffer';
import VertexArrayBuffer from './Helpers/VertexArrayBuffer';
class VertexBuffer extends Buffer {
    constructor(data) {
        super(gl.ARRAY_BUFFER, new VertexArrayBuffer(data), data.length);
    }
    get identifier() {
        return 'vertexBuffer';
    }
    afterBind() {
        super.afterBind();
        let offset = 0;
        for (let index = 0; index < this.data.attributes.length; index++) {
            gl.enableVertexAttribArray(index);
            let attribute = this.data.attributes[index];
            gl.vertexAttribPointer(index, attribute.length, attribute.type, attribute.normalized, this.data.stride, offset);
            offset += attribute.stride;
        }
    }
    afterUnbind() {
        for (let index = 0; index < this.data.attributes.length; index++) {
            gl.disableVertexAttribArray(index);
        }
        super.afterUnbind();
    }
    draw(type) {
        gl.drawArrays(type || gl.TRIANGLES, 0, this.length);
    }
}
export default VertexBuffer;
