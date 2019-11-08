import 'reflect-metadata';
import Math from '../../Math';
export const vertexAttribute = (metadata) => {
    return Reflect.metadata(VertexAttribute.SYMBOL, metadata);
};
class VertexAttribute {
    constructor(data, location, type, normalized, littleEndian = true) {
        this.data = data;
        this.location = location;
        this.length = data.length;
        this.type = type;
        this.normalized = normalized;
        this.bytesPerElement = Math.bytesPerElement(this.type);
        this.stride = Math.nextByteBoundary(this.length * this.bytesPerElement);
        this.littleEndian = littleEndian;
        const boundary = 4;
        const offset = this.stride % boundary;
        if (offset !== 0) {
            this.stride += boundary - offset;
        }
    }
    static get(vertex, name) {
        const { location, type, normalized, } = Reflect.getMetadata(VertexAttribute.SYMBOL, vertex, name);
        return new VertexAttribute(vertex[name], location, type, normalized);
    }
    ;
}
VertexAttribute.SYMBOL = 'cake:vertexAttribute';
export default VertexAttribute;
