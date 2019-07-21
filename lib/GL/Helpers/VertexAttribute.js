import gl from '../index';
export var VertexAttributeType;
(function (VertexAttributeType) {
    VertexAttributeType[VertexAttributeType["Byte"] = gl.BYTE] = "Byte";
    VertexAttributeType[VertexAttributeType["Float"] = gl.FLOAT] = "Float";
    VertexAttributeType[VertexAttributeType["Int"] = gl.INT] = "Int";
    VertexAttributeType[VertexAttributeType["Short"] = gl.SHORT] = "Short";
    VertexAttributeType[VertexAttributeType["UnsignedByte"] = gl.UNSIGNED_BYTE] = "UnsignedByte";
    VertexAttributeType[VertexAttributeType["UnsignedInt"] = gl.UNSIGNED_INT] = "UnsignedInt";
    VertexAttributeType[VertexAttributeType["UnsignedShort"] = gl.UNSIGNED_SHORT] = "UnsignedShort";
})(VertexAttributeType || (VertexAttributeType = {}));
const getSize = (type) => {
    switch (type) {
        case VertexAttributeType.Byte:
        case VertexAttributeType.UnsignedByte:
            return 1;
        case VertexAttributeType.Short:
        case VertexAttributeType.UnsignedShort:
            return 2;
        case VertexAttributeType.Int:
        case VertexAttributeType.UnsignedInt:
        case VertexAttributeType.Float:
            return 4;
        default:
            throw new RangeError();
    }
};
class VertexAttribute {
    constructor(value, type = VertexAttributeType.Float, normalized = false) {
        this.value = value;
        this.type = type;
        this.normalized = normalized;
        this.size = getSize(this.type);
        this.length = value.length;
        this.stride = this.size * this.length;
    }
}
export default VertexAttribute;
