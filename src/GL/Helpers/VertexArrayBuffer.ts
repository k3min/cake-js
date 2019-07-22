import gl from '..';
import VertexAttribute from './VertexAttribute';

export type VA = VertexAttribute<ArrayLike<number>>;

export interface Indexable {
	readonly [attribute: string]: VA;
}

class VertexArrayBuffer<T extends Indexable> extends ArrayBuffer {
	public readonly bytesPerElement: number;
	public readonly attributes: VA[];
	public readonly view: DataView;
	public readonly length: number;

	public constructor(data: T[]) {
		const item: T = data[0];

		const length: number = data.length;
		const bytesPerElement: number = VertexArrayBuffer.getBytesPerElement(item);

		super(length * bytesPerElement);

		this.length = length;
		this.bytesPerElement = bytesPerElement;
		this.attributes = VertexArrayBuffer.getAttributes(item);
		this.view = new DataView(this);

		let byteOffset: number = 0;

		for (let i = 0; i < length; i++) {
			const item: T = data[i];

			for (let attribute in item) {
				if (item.hasOwnProperty(attribute)) {
					byteOffset += this.set(byteOffset, item[attribute]);
				}
			}
		}
	}

	public static getAttributes<T extends Indexable>(item: T): VA[] {
		const attributes: VA[] = new Array<VA>();

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				attributes.push(item[attribute] as VA);
			}
		}

		return attributes;
	}

	public static getBytesPerElement<T extends Indexable>(item: T): number {
		let size: number = 0;

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				size += (item[attribute] as VA).byteLength;
			}
		}

		return size;
	}

	public set(byteOffset: number, vertexAttribute: VA): number {
		const type: GLenum = vertexAttribute.type;
		const value: ArrayLike<number> = vertexAttribute.value;
		const bytesPerElement: GLint = vertexAttribute.bytesPerElement;
		const byteLength: number = vertexAttribute.byteLength;
		const length = vertexAttribute.length;
		const littleEndian = vertexAttribute.littleEndian;

		for (let i = 0; i < length; i++) {
			switch (type) {
				case gl.UNSIGNED_INT:
					this.view.setUint32(byteOffset, value[i] * 0xffffffff, littleEndian);
					break;

				case gl.UNSIGNED_SHORT:
					this.view.setUint16(byteOffset, value[i] * 0xffff, littleEndian);
					break;

				case gl.UNSIGNED_BYTE:
					this.view.setUint8(byteOffset, value[i] * 0xff);
					break;

				case gl.INT:
					this.view.setInt32(byteOffset, value[i] * 0x7fffffff, littleEndian);
					break;

				case gl.SHORT:
					this.view.setInt16(byteOffset, value[i] * 0x7fff, littleEndian);
					break;

				case gl.BYTE:
					this.view.setInt8(byteOffset, value[i] * 0x7f);
					break;

				case gl.FLOAT:
					this.view.setFloat32(byteOffset, value[i], littleEndian);
					break;

				default:
					throw new RangeError();
			}

			byteOffset += bytesPerElement;
		}

		return byteLength;
	}
}

export default VertexArrayBuffer;