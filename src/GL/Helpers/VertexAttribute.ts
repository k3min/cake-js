import DataType from './DataType';

const bytesPerElement = (type: DataType): number => {
	switch (type) {
		case DataType.Int8:
		case DataType.Uint8:
			return 1;

		case DataType.Int16:
		case DataType.Uint16:
			return 2;

		case DataType.Int32:
		case DataType.Uint32:
		case DataType.Float32:
			return 4;

		default:
			throw new RangeError();
	}
};

class VertexAttribute<T extends ArrayLike<number> = ArrayLike<number>> {
	public readonly value: T;
	public readonly type: DataType;
	public readonly length: number;
	public readonly bytesPerElement: number;
	public readonly stride: number;
	public readonly normalized: boolean;
	public readonly littleEndian: boolean;

	public constructor(data: T, type: DataType = DataType.Float32, normalized: boolean = false, littleEndian: boolean = true) {
		this.value = data;
		this.type = type;
		this.normalized = normalized;
		this.length = data.length;
		this.bytesPerElement = bytesPerElement(this.type);
		this.stride = this.length * this.bytesPerElement;
		this.littleEndian = littleEndian;

		const boundary: number = 4;
		const offset: number = this.stride % boundary;

		if (offset !== 0) {
			this.stride += boundary - offset;
		}
	}
}

export default VertexAttribute;