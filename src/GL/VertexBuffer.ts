import gl from './index';
import Buffer from './Buffer';
import VertexArrayBuffer, { Indexable, VA } from './Helpers/VertexArrayBuffer';

class VertexBuffer<T extends Indexable> extends Buffer<VertexArrayBuffer<T>> {
	public name: string = 'VertexBuffer';

	public constructor(data: T[]) {
		super(gl.ARRAY_BUFFER, new VertexArrayBuffer<T>(data), data.length);
	}

	protected onBind(): void {
		super.onBind();

		let offset: number = 0;

		for (let index = 0; index < this.data.attributes.length; index++) {
			gl.enableVertexAttribArray(index);

			let attribute: VA = this.data.attributes[index];

			gl.vertexAttribPointer(
				index,
				attribute.length,
				attribute.type,
				attribute.normalized,
				this.data.bytesPerElement,
				offset,
			);

			offset += attribute.byteLength;
		}
	}

	protected onUnbind(): void {
		for (let index = 0; index < this.data.attributes.length; index++) {
			gl.disableVertexAttribArray(index);
		}

		super.onUnbind();
	}

	public draw(type?: GLenum): void {
		this.bind();

		gl.drawArrays(type || gl.TRIANGLES, 0, this.length);
	}
}

export default VertexBuffer;