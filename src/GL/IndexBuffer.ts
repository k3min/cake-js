import PrimitiveType from './Helpers/PrimitiveType';
import gl from './index';
import Buffer, { BufferTarget } from './Buffer';
import { VertexAttributeType } from './Helpers/VertexAttribute';

class IndexBuffer extends Buffer<Uint16Array> {
	protected get identifier(): string {
		return 'indexBuffer';
	}

	public constructor(data: number[]) {
		super(BufferTarget.ElementArray, new Uint16Array(data), data.length);
	}

	public draw(type: PrimitiveType = PrimitiveType.Triangles): void {
		gl.drawElements(type, this.length, VertexAttributeType.UnsignedShort, 0);
	}
}

export default IndexBuffer;