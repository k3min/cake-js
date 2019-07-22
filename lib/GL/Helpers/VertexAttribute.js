import gl from '..';
class VertexAttribute {
    constructor(value, type, normalized = false) {
        this.value = value;
        this.type = type || gl.FLOAT;
        this.normalized = normalized;
        this.length = value.length;
        this.bytesPerElement = VertexAttribute.getBytesPerElement(this.type);
        this.byteLength = this.length * this.bytesPerElement;
    }
    static getBytesPerElement(type) {
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
    }
    ;
}
export default VertexAttribute;
