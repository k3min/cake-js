import DataType from './DataType';
const bytesPerElement = (type) => {
    switch (type) {
        case DataType.Int8:
        case DataType.Uint8:
            return 1;
        case DataType.Int16:
        case DataType.Uint16:
            return 2;
        case DataType.Int32:
        case DataType.Uint32:
        case DataType.Float32:
            return 4;
        default:
            throw new RangeError();
    }
};
class VertexAttribute {
    constructor(data, type = DataType.Float32, normalized = false, littleEndian = true) {
        this.value = data;
        this.type = type;
        this.normalized = normalized;
        this.length = data.length;
        this.bytesPerElement = bytesPerElement(this.type);
        this.stride = this.length * this.bytesPerElement;
        this.littleEndian = littleEndian;
        const boundary = 4;
        const offset = this.stride % boundary;
        if (offset !== 0) {
            this.stride += boundary - offset;
        }
    }
}
export default VertexAttribute;
