import gl from '..';

const getSize = (type: GLenum): number => {
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

class VertexAttribute<T extends ArrayLike<number>> {
	public readonly value: T;
	public readonly type: GLenum;
	public readonly size: number;
	public readonly length: number;
	public readonly stride: number;
	public readonly normalized: boolean;

	public constructor(value: T, type?: GLenum, normalized: boolean = false) {
		this.value = value;
		this.type = type || gl.FLOAT;
		this.normalized = normalized;
		this.size = getSize(this.type);
		this.length = value.length;
		this.stride = this.size * this.length;
	}
}

export default VertexAttribute;