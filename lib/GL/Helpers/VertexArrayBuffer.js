import gl from '..';
class VertexArrayBuffer extends ArrayBuffer {
    constructor(data) {
        const item = data[0];
        const length = data.length;
        const bytesPerElement = VertexArrayBuffer.getBytesPerElement(item);
        super(length * bytesPerElement);
        this.length = length;
        this.bytesPerElement = bytesPerElement;
        this.attributes = VertexArrayBuffer.getAttributes(item);
        this.view = new DataView(this);
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
    static getAttributes(item) {
        const attributes = new Array();
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                attributes.push(item[attribute]);
            }
        }
        return attributes;
    }
    static getBytesPerElement(item) {
        let size = 0;
        for (let attribute in item) {
            if (item.hasOwnProperty(attribute)) {
                size += item[attribute].byteLength;
            }
        }
        return size;
    }
    set(byteOffset, vertexAttribute) {
        const type = vertexAttribute.type;
        const value = vertexAttribute.value;
        const bytesPerElement = vertexAttribute.bytesPerElement;
        const byteLength = vertexAttribute.byteLength;
        const length = vertexAttribute.length;
        for (let i = 0; i < length; i++) {
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
            byteOffset += bytesPerElement;
        }
        return byteLength;
    }
}
export default VertexArrayBuffer;
