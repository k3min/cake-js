import { Bindable } from '../../Core';
import { Indexable } from '../../Core/Helpers';
import Context from '../Context';
import DataType from './DataType';
import VertexAttribute from './VertexAttribute';

interface VA {
	location: number,
	length: number,
	type: DataType,
	normalized: boolean,
	stride: number
}

class VertexArrayBuffer<T extends Indexable<ArrayLike<number>>> extends ArrayBuffer implements Bindable {
	private readonly stride: number;
	private readonly attributes: VA[];
	private readonly view: DataView;

	public constructor(data: T[]) {
		const attributes: VA[] = [];
		const length: number = data.length;
		const attribute: T = data[0];

		let byteLength: number = 0;

		for (let name in attribute) {
			if (attribute.hasOwnProperty(name)) {
				const { location, length, type, normalized, stride } = VertexAttribute.get(attribute, name);
				attributes.push({ location, length, type, normalized, stride });
				byteLength += stride;
			}
		}

		super(length * byteLength);

		this.stride = byteLength;
		this.view = new DataView(this);
		this.attributes = attributes;

		let byteOffset: number = 0;

		for (let i = 0; i < length; i++) {
			const vertex: T = data[i];

			for (let name in vertex) {
				if (vertex.hasOwnProperty(name)) {
					byteOffset += this.set(byteOffset, VertexAttribute.get(vertex, name));
				}
			}
		}
	}

	public set(byteOffset: number, vertexAttribute: VertexAttribute): number {
		const { type, data, bytesPerElement, stride, length, littleEndian } = vertexAttribute;

		for (let i = 0; i < length; i++) {
			switch (type) {
				case DataType.Uint32:
					this.view.setUint32(byteOffset, data[i] * 0xffffffff, littleEndian);
					break;

				case DataType.Uint16:
					this.view.setUint16(byteOffset, data[i] * 0xffff, littleEndian);
					break;

				case DataType.Uint8:
					this.view.setUint8(byteOffset, data[i] * 0xff);
					break;

				case DataType.Int32:
					this.view.setInt32(byteOffset, data[i] * 0x7fffffff, littleEndian);
					break;

				case DataType.Int16:
					this.view.setInt16(byteOffset, data[i] * 0x7fff, littleEndian);
					break;

				case DataType.Int8:
					this.view.setInt8(byteOffset, data[i] * 0x7f);
					break;

				case DataType.Float32:
					this.view.setFloat32(byteOffset, data[i], littleEndian);
					break;

				default:
					throw new RangeError();
			}

			byteOffset += bytesPerElement;
		}

		return stride;
	}

	public bind(): boolean {
		let offset: number = 0;

		for (let i = 0; i < this.attributes.length; i++) {
			const { location, length, type, normalized, stride } = this.attributes[i];

			Context.enableVertexAttribArray(location);

			Context.vertexAttribPointer(
				location,
				length,
				type,
				normalized,
				this.stride,
				offset,
			);

			offset += stride;
		}

		return true;
	}

	public unbind(): boolean {
		for (let i = 0; i < this.attributes.length; i++) {
			Context.disableVertexAttribArray(this.attributes[i].location);
		}

		return true;
	}
}

export default VertexArrayBuffer;