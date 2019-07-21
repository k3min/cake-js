import gl from '../index';

enum PrimitiveType {
	LineLoop = gl.LINE_LOOP,
	Lines = gl.LINES,
	LineStrip = gl.LINE_STRIP,
	Points = gl.POINTS,
	TriangleFan = gl.TRIANGLE_FAN,
	Triangles = gl.TRIANGLES,
	TriangleStrip = gl.TRIANGLE_STRIP
}

export default PrimitiveType;