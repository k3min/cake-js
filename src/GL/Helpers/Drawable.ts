export enum PrimitiveType {
	Points = 0, // GL_POINTS
	Lines,
	LineLoop,
	LineStrip,
	Triangles,
	TriangleStrip,
	TriangleFan
}

interface Drawable {
	draw(type: PrimitiveType): void;
}

export default Drawable;