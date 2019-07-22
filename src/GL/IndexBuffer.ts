import gl from './index';
import Buffer from './Buffer';

class IndexBuffer extends Buffer<Uint16Array> {
	public constructor(data: number[]) {
		super(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), data.length);
	}

	public draw(type?: GLenum): void {
		gl.drawElements(type || gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
	}
}

export default IndexBuffer;