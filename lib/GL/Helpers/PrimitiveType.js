import gl from '../index';
var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["LineLoop"] = gl.LINE_LOOP] = "LineLoop";
    PrimitiveType[PrimitiveType["Lines"] = gl.LINES] = "Lines";
    PrimitiveType[PrimitiveType["LineStrip"] = gl.LINE_STRIP] = "LineStrip";
    PrimitiveType[PrimitiveType["Points"] = gl.POINTS] = "Points";
    PrimitiveType[PrimitiveType["TriangleFan"] = gl.TRIANGLE_FAN] = "TriangleFan";
    PrimitiveType[PrimitiveType["Triangles"] = gl.TRIANGLES] = "Triangles";
    PrimitiveType[PrimitiveType["TriangleStrip"] = gl.TRIANGLE_STRIP] = "TriangleStrip";
})(PrimitiveType || (PrimitiveType = {}));
export default PrimitiveType;
