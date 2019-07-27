import Math from '../../Math';
import DataType from './DataType';
class VertexAttribute {
    constructor(data, type = DataType.Float32, normalized = false, littleEndian = true) {
        this.value = data;
        this.type = type;
        this.normalized = normalized;
        this.length = data.length;
        this.bytesPerElement = Math.bytesPerElement(this.type);
        this.stride = Math.nextByteBoundary(this.length * this.bytesPerElement);
        this.littleEndian = littleEndian;
        const boundary = 4;
        const offset = this.stride % boundary;
        if (offset !== 0) {
            this.stride += boundary - offset;
        }
    }
}
export default VertexAttribute;
