import gl from '../GL';
import DataType from './DataType';
class VertexArrayBuffer extends ArrayBuffer {
    constructor(data) {
        const length = data.length;
        const item = data[0];
        let bytesPerElement = 0;
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                bytesPerElement += item[attribute].byteLength;
            }
        }
        super(length * bytesPerElement);
        this.bytesPerElement = bytesPerElement;
        this.view = new DataView(this);
        this.attributes = new Array();
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                this.attributes.push(item[attribute]);
            }
        }
        let byteOffset = 0;
        for (let i = 0; i < length; i++) {
            const item = data[i];
            for (let attribute in item) {
                if (item.hasOwnProperty(attribute)) {
                    byteOffset += this.set(byteOffset, item[attribute]);
                }
            }
        }
    }
    set(byteOffset, vertexAttribute) {
        const type = vertexAttribute.type;
        const value = vertexAttribute.value;
        const bytesPerElement = vertexAttribute.bytesPerElement;
        const byteLength = vertexAttribute.byteLength;
        const length = vertexAttribute.length;
        const littleEndian = vertexAttribute.littleEndian;
        for (let i = 0; i < length; i++) {
            switch (type) {
                case DataType.Uint32:
                    this.view.setUint32(byteOffset, value[i] * 0xffffffff, littleEndian);
                    break;
                case DataType.Uint16:
                    this.view.setUint16(byteOffset, value[i] * 0xffff, littleEndian);
                    break;
                case DataType.Uint8:
                    this.view.setUint8(byteOffset, value[i] * 0xff);
                    break;
                case DataType.Int32:
                    this.view.setInt32(byteOffset, value[i] * 0x7fffffff, littleEndian);
                    break;
                case DataType.Int16:
                    this.view.setInt16(byteOffset, value[i] * 0x7fff, littleEndian);
                    break;
                case DataType.Int8:
                    this.view.setInt8(byteOffset, value[i] * 0x7f);
                    break;
                case DataType.Float32:
                    this.view.setFloat32(byteOffset, value[i], littleEndian);
                    break;
                default:
                    throw new RangeError();
            }
            byteOffset += bytesPerElement;
        }
        return byteLength;
    }
    bind() {
        let offset = 0;
        for (let index = 0; index < this.attributes.length; index++) {
            gl.enableVertexAttribArray(index);
            const attribute = this.attributes[index];
            gl.vertexAttribPointer(index, attribute.length, attribute.type, attribute.normalized, this.bytesPerElement, offset);
            offset += attribute.byteLength;
        }
        return true;
    }
    unbind() {
        for (let index = 0; index < this.attributes.length; index++) {
            gl.disableVertexAttribArray(index);
        }
        return true;
    }
}
export default VertexArrayBuffer;
