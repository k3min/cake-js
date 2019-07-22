import gl from '..';
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
                case gl.UNSIGNED_INT:
                    this.view.setUint32(byteOffset, value[i] * 0xffffffff);
                    break;
                case gl.UNSIGNED_SHORT:
                    this.view.setUint16(byteOffset, value[i] * 0xffff);
                    break;
                case gl.UNSIGNED_BYTE:
                    this.view.setUint8(byteOffset, value[i] * 0xff);
                    break;
                case gl.INT:
                    this.view.setInt32(byteOffset, value[i] * 0x7fffffff);
                    break;
                case gl.SHORT:
                    this.view.setInt16(byteOffset, value[i] * 0x7fff);
                    break;
                case gl.BYTE:
                    this.view.setInt8(byteOffset, value[i] * 0x7f);
                    break;
                case gl.FLOAT:
                    this.view.setFloat32(byteOffset, value[i]);
                    break;
                default:
                    throw new RangeError();
            }
            byteOffset += size;
        }
        return byteLength;
    }
}
export default VertexArrayBuffer;
