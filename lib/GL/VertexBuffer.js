import gl from './index';
import Buffer from './Buffer';
import VertexArrayBuffer from './Helpers/VertexArrayBuffer';
class VertexBuffer extends Buffer {
    constructor(data) {
        super(gl.ARRAY_BUFFER, new VertexArrayBuffer(data), data.length);
        this.name = 'VertexBuffer';
    }
    onBind() {
        super.onBind();
        let offset = 0;
        for (let index = 0; index < this.data.attributes.length; index++) {
            gl.enableVertexAttribArray(index);
            let attribute = this.data.attributes[index];
            gl.vertexAttribPointer(index, attribute.length, attribute.type, attribute.normalized, this.data.bytesPerElement, offset);
            offset += attribute.byteLength;
        }
    }
    onUnbind() {
        for (let index = 0; index < this.data.attributes.length; index++) {
            gl.disableVertexAttribArray(index);
        }
        super.onUnbind();
    }
    draw(type) {
        this.bind();
        gl.drawArrays(type || gl.TRIANGLES, 0, this.length);
    }
}
export default VertexBuffer;
