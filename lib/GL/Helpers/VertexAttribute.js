import gl from '../index';
const getSize = (type) => {
    switch (type) {
        case gl.BYTE:
        case gl.UNSIGNED_BYTE:
            return 1;
        case gl.SHORT:
        case gl.UNSIGNED_SHORT:
            return 2;
        case gl.INT:
        case gl.UNSIGNED_INT:
        case gl.FLOAT:
            return 4;
        default:
            throw new RangeError();
    }
};
class VertexAttribute {
    constructor(value, type, normalized = false) {
        this.value = value;
        this.type = type || gl.FLOAT;
        this.normalized = normalized;
        this.size = getSize(this.type);
        this.length = value.length;
        this.stride = this.size * this.length;
    }
}
export default VertexAttribute;
