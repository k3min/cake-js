import gl from './index';
import Buffer from './Buffer';
class IndexBuffer extends Buffer {
    constructor(data) {
        super(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), data.length);
    }
    draw(type) {
        gl.drawElements(type || gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
    }
}
export default IndexBuffer;
