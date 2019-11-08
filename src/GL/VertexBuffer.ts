import Context from './Context';
import { Indexable } from '../Core/Helpers';
import Buffer, { BufferType } from './Buffer';
import { PrimitiveType, VertexArrayBuffer } from './Helpers';

class VertexBuffer<T extends Indexable<ArrayLike<number>>> extends Buffer<VertexArrayBuffer<T>> {
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

		Context.drawArrays(type, 0, this.length);
	}

	public drawInstanced(type: PrimitiveType, count: number): void {
		Context.drawArraysInstanced(type, 0, this.length, count);
	}
}

export default VertexBuffer;