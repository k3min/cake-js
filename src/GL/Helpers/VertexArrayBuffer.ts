import { Bindable } from '../../Core';
import { Indexable } from '../../Core/Helpers';
import GL from '../GL';
import DataType from './DataType';
import VertexAttribute from './VertexAttribute';

class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
	private readonly stride: number;
	private readonly attributes: VertexAttribute[];
	private readonly view: DataView;

	public constructor(data: T[]) {
		const length: number = data.length;
		const item: T = data[0];

		let stride: number = 0;

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				stride += (item[attribute] as VertexAttribute).stride;
			}
		}

		super(length * stride);

		this.stride = stride;
		this.view = new DataView(this);
		this.attributes = new Array<VertexAttribute>();

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				this.attributes.push(item[attribute] as VertexAttribute);
			}
		}

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

	public set(byteOffset: number, vertexAttribute: VertexAttribute): number {
		const { type, value, bytesPerElement, stride, length, littleEndian }: VertexAttribute = vertexAttribute;

		for (let i = 0; i < length; i++) {
			switch (type) {
				case DataType.Uint32:
					this.view.setUint32(byteOffset, value[i] * 0xffffffff, littleEndian);
					break;

				case DataType.Uint16:
					this.view.setUint16(byteOffset, value[i] * 0xffff, littleEndian);
					break;

				case DataType.Uint8:
					this.view.setUint8(byteOffset, value[i] * 0xff);
					break;

				case DataType.Int32:
					this.view.setInt32(byteOffset, value[i] * 0x7fffffff, littleEndian);
					break;

				case DataType.Int16:
					this.view.setInt16(byteOffset, value[i] * 0x7fff, littleEndian);
					break;

				case DataType.Int8:
					this.view.setInt8(byteOffset, value[i] * 0x7f);
					break;

				case DataType.Float32:
					this.view.setFloat32(byteOffset, value[i], littleEndian);
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

		for (let index = 0; index < this.attributes.length; index++) {
			GL.enableVertexAttribArray(index);

			const attribute: VertexAttribute = this.attributes[index];

			GL.vertexAttribPointer(
				index,
				attribute.length,
				attribute.type,
				attribute.normalized,
				this.stride,
				offset,
			);

			offset += attribute.stride;
		}

		return true;
	}

	public unbind(): boolean {
		for (let index = 0; index < this.attributes.length; index++) {
			GL.disableVertexAttribArray(index);
		}

		return true;
	}
}

export default VertexArrayBuffer;