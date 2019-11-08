import 'reflect-metadata';

import Math from '../../Math';
import DataType from './DataType';
import { Metadata, Indexable } from '../../Core/Helpers';

interface VertexAttributeMetadata {
	location: number;
	type: DataType;
	normalized: boolean;
}

export const vertexAttribute = (metadata: VertexAttributeMetadata): Metadata => {
	return Reflect.metadata(VertexAttribute.SYMBOL, metadata) as Metadata;
};

class VertexAttribute implements VertexAttributeMetadata {
	public static readonly SYMBOL: string = 'cake:vertexAttribute';
	public readonly location: number;
	public readonly data: ArrayLike<number>;
	public readonly type: DataType;
	public readonly length: number;
	public readonly bytesPerElement: number;
	public readonly stride: number;
	public readonly normalized: boolean;
	public readonly littleEndian: boolean;

	private constructor(data: ArrayLike<number>, location: number, type: DataType, normalized: boolean, littleEndian: boolean = true) {
		this.data = data;

		this.location = location;
		this.length = data.length;
		this.type = type;
		this.normalized = normalized;

		this.bytesPerElement = Math.bytesPerElement(this.type);
		this.stride = Math.nextByteBoundary(this.length * this.bytesPerElement);
		this.littleEndian = littleEndian;

		const boundary: number = 4;
		const offset: number = this.stride % boundary;

		if (offset !== 0) {
			this.stride += boundary - offset;
		}
	}

	public static get(vertex: Indexable<ArrayLike<number>>, name: string): VertexAttribute {
		const {
			location,
			type,
			normalized,
		} = Reflect.getMetadata(VertexAttribute.SYMBOL, vertex, name) as VertexAttributeMetadata;

		return new VertexAttribute(vertex[name], location, type, normalized);
	};
}

export default VertexAttribute;