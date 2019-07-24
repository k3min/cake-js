import GL from './GL';
import { Indexable } from '../Helpers';
import Buffer, { BufferType } from './Buffer';
import { PrimitiveType, VertexArrayBuffer, VertexAttribute } from './Helpers';

class VertexBuffer<T extends Indexable<VertexAttribute>> extends Buffer<VertexArrayBuffer<T>> {
	public name: string = 'VertexBuffer';

	public constructor(data: T[]) {
		super(BufferType.Array, new VertexArrayBuffer<T>(data), data.length);
	}

	protected onBind(): void {
		super.onBind();

		this.data.bind();
	}

	protected onUnbind(): void {
		this.data.unbind();

		super.onUnbind();
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		GL.drawArrays(type, 0, this.length);
	}
}

export default VertexBuffer;