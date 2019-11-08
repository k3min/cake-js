import Context from '../Context';
import DataType from './DataType';
import VertexAttribute from './VertexAttribute';
class VertexArrayBuffer extends ArrayBuffer {
    constructor(data) {
        const attributes = [];
        const length = data.length;
        const attribute = data[0];
        let byteLength = 0;
        for (let name in attribute) {
            if (attribute.hasOwnProperty(name)) {
                const { location, length, type, normalized, stride } = VertexAttribute.get(attribute, name);
                attributes.push({ location, length, type, normalized, stride });
                byteLength += stride;
            }
        }
        super(length * byteLength);
        this.stride = byteLength;
        this.view = new DataView(this);
        this.attributes = attributes;
        let byteOffset = 0;
        for (let i = 0; i < length; i++) {
            const vertex = data[i];
            for (let name in vertex) {
                if (vertex.hasOwnProperty(name)) {
                    byteOffset += this.set(byteOffset, VertexAttribute.get(vertex, name));
                }
            }
        }
    }
    set(byteOffset, vertexAttribute) {
        const { type, data, bytesPerElement, stride, length, littleEndian } = vertexAttribute;
        for (let i = 0; i < length; i++) {
            switch (type) {
                case DataType.Uint32:
                    this.view.setUint32(byteOffset, data[i] * 0xffffffff, littleEndian);
                    break;
                case DataType.Uint16:
                    this.view.setUint16(byteOffset, data[i] * 0xffff, littleEndian);
                    break;
                case DataType.Uint8:
                    this.view.setUint8(byteOffset, data[i] * 0xff);
                    break;
                case DataType.Int32:
                    this.view.setInt32(byteOffset, data[i] * 0x7fffffff, littleEndian);
                    break;
                case DataType.Int16:
                    this.view.setInt16(byteOffset, data[i] * 0x7fff, littleEndian);
                    break;
                case DataType.Int8:
                    this.view.setInt8(byteOffset, data[i] * 0x7f);
                    break;
                case DataType.Float32:
                    this.view.setFloat32(byteOffset, data[i], littleEndian);
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
        for (let i = 0; i < this.attributes.length; i++) {
            const { location, length, type, normalized, stride } = this.attributes[i];
            Context.enableVertexAttribArray(location);
            Context.vertexAttribPointer(location, length, type, normalized, this.stride, offset);
            offset += stride;
        }
        return true;
    }
    unbind() {
        for (let i = 0; i < this.attributes.length; i++) {
            Context.disableVertexAttribArray(this.attributes[i].location);
        }
        return true;
    }
}
export default VertexArrayBuffer;
