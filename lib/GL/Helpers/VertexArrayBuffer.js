import Storage from '../../Core/Helpers/Storage';
import Context from '../Context';
import Shader from '../Shader';
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
        this.attributes = new Storage();
        this.indices = new Storage();
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                this.attributes.set(attribute, item[attribute]);
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
        const shader = Shader.bound;
        if (!shader) {
            return false;
        }
        let offset = 0;
        for (let [name, attribute] of this.attributes) {
            const index = shader.attributes.get(name);
            if (index === undefined) {
                console.warn(`VertexArrayBuffer: vertex attribute '${name}' not found`);
            }
            else {
                this.indices.set(name, index);
                Context.enableVertexAttribArray(index);
                Context.vertexAttribPointer(index, attribute.length, attribute.type, attribute.normalized, this.stride, offset);
            }
            offset += attribute.stride;
        }
        return true;
    }
    unbind() {
        this.indices.forEach((index) => Context.disableVertexAttribArray(index));
        this.indices.clear();
        return true;
    }
}
export default VertexArrayBuffer;
