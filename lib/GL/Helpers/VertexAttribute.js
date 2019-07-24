import DataType, { bytesPerElement } from './DataType';
class VertexAttribute {
    constructor(value, type = DataType.Float32, normalized = false, littleEndian = true) {
        this.value = value;
        this.type = type;
        this.normalized = normalized;
        this.length = value.length;
        this.bytesPerElement = bytesPerElement(this.type);
        this.byteLength = this.length * this.bytesPerElement;
        this.littleEndian = littleEndian;
    }
}
export default VertexAttribute;
