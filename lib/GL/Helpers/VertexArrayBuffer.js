import { VertexAttributeType } from './VertexAttribute';
class VertexArrayBuffer extends ArrayBuffer {
    constructor(data) {
        const item = data[0];
        const length = data.length;
        const stride = VertexArrayBuffer.getSize(item);
        super(length * stride);
        this.length = length;
        this.stride = stride;
        this.attributes = VertexArrayBuffer.getAttributes(item);
        this.view = new DataView(this);
        let byteOffset = 0;
        data.forEach((vertex) => {
            for (let attribute in vertex) {
                if (vertex.hasOwnProperty(attribute)) {
                    byteOffset += this.set(byteOffset, vertex[attribute]);
                }
            }
        });
    }
    static getAttributes(item) {
        const attributes = new Array();
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                attributes.push(item[attribute]);
            }
        }
        return attributes;
    }
    static getSize(item) {
        let size = 0;
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                size += item[attribute].stride;
            }
        }
        return size;
    }
    set(byteOffset, vertexAttribute) {
        const type = vertexAttribute.type;
        const value = vertexAttribute.value;
        const size = vertexAttribute.size;
        const byteLength = vertexAttribute.stride;
        for (let i = 0; i < vertexAttribute.length; i++) {
            switch (type) {
                case VertexAttributeType.UnsignedInt:
                    this.view.setUint32(byteOffset, value[i] * 0xffffffff);
                    break;
                case VertexAttributeType.UnsignedShort:
                    this.view.setUint16(byteOffset, value[i] * 0xffff);
                    break;
                case VertexAttributeType.UnsignedByte:
                    this.view.setUint8(byteOffset, value[i] * 0xff);
                    break;
                case VertexAttributeType.Int:
                    this.view.setInt32(byteOffset, value[i] * 0x7fffffff);
                    break;
                case VertexAttributeType.Short:
                    this.view.setInt16(byteOffset, value[i] * 0x7fff);
                    break;
                case VertexAttributeType.Byte:
                    this.view.setInt8(byteOffset, value[i] * 0x7f);
                    break;
                case VertexAttributeType.Float:
                    this.view.setFloat32(byteOffset, value[i]);
                    break;
            }
            byteOffset += size;
        }
        return byteLength;
    }
}
export default VertexArrayBuffer;
