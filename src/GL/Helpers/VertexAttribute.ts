import DataType, { bytesPerElement } from './DataType';

class VertexAttribute<T extends ArrayLike<number> = ArrayLike<number>> {
	public readonly value: T;
	public readonly type: DataType;
	public readonly length: number;
	public readonly bytesPerElement: number;
	public readonly byteLength: number;
	public readonly normalized: boolean;
	public readonly littleEndian: boolean;

	public constructor(value: T, type: DataType = DataType.Float32, normalized: boolean = false, littleEndian: boolean = true) {
		this.value = value;
		this.type = type;
		this.normalized = normalized;
		this.length = value.length;
		this.bytesPerElement = bytesPerElement(this.type);
		this.byteLength = this.length * this.bytesPerElement;
		this.littleEndian = littleEndian;
	}
}

export default VertexAttribute;