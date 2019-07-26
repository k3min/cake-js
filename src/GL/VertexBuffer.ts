import GL from './GL';
import { Indexable } from '../Core/Helpers';
import Buffer, { BufferType } from './Buffer';
import { PrimitiveType, VertexArrayBuffer, VertexAttribute } from './Helpers';

class VertexBuffer<T extends Indexable<VertexAttribute>> extends Buffer<VertexArrayBuffer<T>> {
	public name: string = 'VertexBuffer';

	public constructor(data: T[]) {
		super(BufferType.Array, new VertexArrayBuffer<T>(data), data.length);
	}

	protected binding(): void {
		super.binding();

		this.data.bind();
	}

	protected unbinding(): void {
		this.data.unbind();

		super.unbinding();
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		GL.drawArrays(type, 0, this.length);
	}
}

export default VertexBuffer;