import gl from '../index';

export enum VertexAttributeType {
	Byte = gl.BYTE,
	Float = gl.FLOAT,
	Int = gl.INT,
	Short = gl.SHORT,
	UnsignedByte = gl.UNSIGNED_BYTE,
	UnsignedInt = gl.UNSIGNED_INT,
	UnsignedShort = gl.UNSIGNED_SHORT
}

const getSize = (type: VertexAttributeType): number => {
	switch (type) {
		case VertexAttributeType.Byte:
		case VertexAttributeType.UnsignedByte:
			return 1;

		case VertexAttributeType.Short:
		case VertexAttributeType.UnsignedShort:
			return 2;

		case VertexAttributeType.Int:
		case VertexAttributeType.UnsignedInt:
		case VertexAttributeType.Float:
			return 4;

		default:
			throw new RangeError();
	}
};

class VertexAttribute<T extends ArrayLike<number>> {
	public readonly value: T;
	public readonly type: VertexAttributeType;
	public readonly size: number;
	public readonly length: number;
	public readonly stride: number;
	public readonly normalized: boolean;

	public constructor(value: T, type: VertexAttributeType = VertexAttributeType.Float, normalized: boolean = false) {
		this.value = value;
		this.type = type;
		this.normalized = normalized;
		this.size = getSize(this.type);
		this.length = value.length;
		this.stride = this.size * this.length;
	}
}

export default VertexAttribute;