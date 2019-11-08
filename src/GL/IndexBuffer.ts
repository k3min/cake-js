import Buffer, { BufferType } from './Buffer';
import Context from './Context';
import { DataType, PrimitiveType } from './Helpers';

class IndexBuffer extends Buffer<Uint16Array> {
	public name: string = 'IndexBuffer';

	public constructor(data: number[]) {
		super(BufferType.ElementArray, new Uint16Array(data), data.length);
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		Context.drawElements(type, this.length, DataType.Uint16, 0);
	}

	public drawInstanced(type: PrimitiveType, count: number): void {
		this.bind();

		Context.drawElementsInstanced(type, this.length, DataType.Uint16, 0, count);
	}
}

export default IndexBuffer;