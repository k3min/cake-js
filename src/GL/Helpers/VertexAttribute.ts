import Math from '../../Math';
import DataType from './DataType';

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
		this.bytesPerElement = Math.bytesPerElement(this.type);
		this.stride = Math.nextByteBoundary(this.length * this.bytesPerElement);
		this.littleEndian = littleEndian;

		const boundary: number = 4;
		const offset: number = this.stride % boundary;

		if (offset !== 0) {
			this.stride += boundary - offset;
		}
	}
}

export default VertexAttribute;