import GL from '../GL';
import DataType from './DataType';
class VertexArrayBuffer extends ArrayBuffer {
    constructor(data) {
        const length = data.length;
        const item = data[0];
        let stride = 0;
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                stride += item[attribute].stride;
            }
        }
        super(length * stride);
        this.stride = stride;
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
        const { type, value, bytesPerElement, stride, length, littleEndian } = vertexAttribute;
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
        return stride;
    }
    bind() {
        let offset = 0;
        for (let index = 0; index < this.attributes.length; index++) {
            GL.enableVertexAttribArray(index);
            const attribute = this.attributes[index];
            GL.vertexAttribPointer(index, attribute.length, attribute.type, attribute.normalized, this.stride, offset);
            offset += attribute.stride;
        }
        return true;
    }
    unbind() {
        for (let index = 0; index < this.attributes.length; index++) {
            GL.disableVertexAttribArray(index);
        }
        return true;
    }
}
export default VertexArrayBuffer;
