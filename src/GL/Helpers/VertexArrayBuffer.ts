import VertexAttribute, { VertexAttributeType } from './VertexAttribute';

type VA = VertexAttribute<ArrayLike<number>>;

export interface Indexable {
	readonly [attribute: string]: VA;
}

class VertexArrayBuffer<T extends Indexable> extends ArrayBuffer {
	public readonly stride: number;
	public readonly attributes: VA[];
	public readonly view: DataView;
	public readonly length: number;

	public constructor(data: T[]) {
		const item: T = data[0];

		const length: number = data.length;
		const stride: number = VertexArrayBuffer.getSize(item);

		super(length * stride);

		this.length = length;
		this.stride = stride;
		this.attributes = VertexArrayBuffer.getAttributes(item);
		this.view = new DataView(this);

		let byteOffset: number = 0;

		data.forEach((vertex: T): void => {
			for (let attribute in vertex) {
				if (vertex.hasOwnProperty(attribute)) {
					byteOffset += this.set(byteOffset, vertex[attribute]);
				}
			}
		});
	}

	public static getAttributes<T extends Indexable>(item: T): VA[] {
		const attributes: VA[] = new Array<VA>();

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				attributes.push(item[attribute]);
			}
		}

		return attributes;
	}

	public static getSize<T extends Indexable>(item: T): number {
		let size: number = 0;

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				size += item[attribute].stride;
			}
		}

		return size;
	}

	public set(byteOffset: number, vertexAttribute: VA): number {
		const type: VertexAttributeType = vertexAttribute.type;
		const value: ArrayLike<number> = vertexAttribute.value;
		const size: number = vertexAttribute.size;
		const byteLength: number = vertexAttribute.stride;

		for (let i = 0; i < vertexAttribute.length; i++) {
			switch (type) {
				case VertexAttributeType.UnsignedInt:
					this.view.setUint32(byteOffset, value[i] * 0xffffffff);
					break;

				case VertexAttributeType.UnsignedShort:
					this.view.setUint16(byteOffset, value[i] * 0xffff);
					break;

				case VertexAttributeType.UnsignedByte:
					this.view.setUint8(byteOffset, value[i] * 0xff);
					break;

				case VertexAttributeType.Int:
					this.view.setInt32(byteOffset, value[i] * 0x7fffffff);
					break;

				case VertexAttributeType.Short:
					this.view.setInt16(byteOffset, value[i] * 0x7fff);
					break;

				case VertexAttributeType.Byte:
					this.view.setInt8(byteOffset, value[i] * 0x7f);
					break;

				case VertexAttributeType.Float:
					this.view.setFloat32(byteOffset, value[i]);
					break;
			}

			byteOffset += size;
		}

		return byteLength;
	}
}

export default VertexArrayBuffer;