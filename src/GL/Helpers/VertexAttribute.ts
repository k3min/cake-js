import gl from '..';

class VertexAttribute<T extends ArrayLike<number>> {
	public readonly value: T;
	public readonly type: GLenum;
	public readonly length: GLint;
	public readonly bytesPerElement: number;
	public readonly byteLength: number;
	public readonly normalized: GLboolean;
	public readonly littleEndian: boolean;

	public constructor(value: T, type?: GLenum, normalized: boolean = false, littleEndian: boolean = false) {
		this.value = value;
		this.type = type || gl.FLOAT;
		this.normalized = normalized;
		this.length = value.length;
		this.bytesPerElement = VertexAttribute.getBytesPerElement(this.type);
		this.byteLength = this.length * this.bytesPerElement;
		this.littleEndian = littleEndian;
	}

	private static getBytesPerElement(type: GLenum): number {
		switch (type) {
			case gl.BYTE:
			case gl.UNSIGNED_BYTE:
				return 1;

			case gl.SHORT:
			case gl.UNSIGNED_SHORT:
				return 2;

			case gl.INT:
			case gl.UNSIGNED_INT:
			case gl.FLOAT:
				return 4;

			default:
				throw new RangeError();
		}
	};
}

export default VertexAttribute;