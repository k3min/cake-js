import gl from './index';
import Buffer from './Buffer';
import VertexAttribute from './Helpers/VertexAttribute';
import VertexArrayBuffer, { Indexable } from './Helpers/VertexArrayBuffer';

class VertexBuffer<T extends Indexable> extends Buffer<VertexArrayBuffer<T>> {
	public constructor(data: T[]) {
		super(gl.ARRAY_BUFFER, new VertexArrayBuffer<T>(data), data.length);
	}

	public afterBind(): void {
		super.afterBind();

		let offset: number = 0;

		for (let index = 0; index < this.data.attributes.length; index++) {
			gl.enableVertexAttribArray(index);

			let attribute: VertexAttribute<ArrayLike<number>> = this.data.attributes[index];

			gl.vertexAttribPointer(
				index,
				attribute.length,
				attribute.type,
				attribute.normalized,
				this.data.stride,
				offset,
			);

			offset += attribute.stride;
		}
	}

	public afterUnbind(): void {
		for (let index = 0; index < this.data.attributes.length; index++) {
			gl.disableVertexAttribArray(index);
		}

		super.afterUnbind();
	}

	public draw(type?: GLenum): void {
		gl.drawArrays(type || gl.TRIANGLES, 0, this.length);
	}
}

export default VertexBuffer;