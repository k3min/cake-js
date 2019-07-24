var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["Points"] = 0] = "Points";
    PrimitiveType[PrimitiveType["Lines"] = 1] = "Lines";
    PrimitiveType[PrimitiveType["LineLoop"] = 2] = "LineLoop";
    PrimitiveType[PrimitiveType["LineStrip"] = 3] = "LineStrip";
    PrimitiveType[PrimitiveType["Triangles"] = 4] = "Triangles";
    PrimitiveType[PrimitiveType["TriangleStrip"] = 5] = "TriangleStrip";
    PrimitiveType[PrimitiveType["TriangleFan"] = 6] = "TriangleFan";
})(PrimitiveType || (PrimitiveType = {}));
export default PrimitiveType;
