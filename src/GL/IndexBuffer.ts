import Buffer, { BufferType } from './Buffer';
import GL from './GL';
import DataType from './Helpers/DataType';
import { PrimitiveType } from './Helpers/Drawable';

class IndexBuffer extends Buffer<Uint16Array> {
	public name: string = 'IndexBuffer';

	public constructor(data: number[]) {
		super(BufferType.ElementArray, new Uint16Array(data), data.length);
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		this.bind();

		GL.drawElements(type, this.length, DataType.Uint16, 0);
	}
}

export default IndexBuffer;