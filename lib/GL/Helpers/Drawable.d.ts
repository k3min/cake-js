export declare enum PrimitiveType {
    Points = 0,
    Lines = 1,
    LineLoop = 2,
    LineStrip = 3,
    Triangles = 4,
    TriangleStrip = 5,
    TriangleFan = 6
}
interface Drawable {
    draw(type: PrimitiveType): void;
}
export default Drawable;
