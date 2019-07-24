import { Bindable, Indexable } from '../../Helpers';
import gl from '../GL';
import DataType from './DataType';
import VertexAttribute from './VertexAttribute';

class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
	private readonly bytesPerElement: number;
	private readonly attributes: VertexAttribute[];
	private readonly view: DataView;

	public constructor(data: T[]) {
		const length: number = data.length;
		const item: T = data[0];

		let bytesPerElement: number = 0;

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				bytesPerElement += (item[attribute] as VertexAttribute).byteLength;
			}
		}

		super(length * bytesPerElement);

		this.bytesPerElement = bytesPerElement;
		this.view = new DataView(this);
		this.attributes = new Array<VertexAttribute>();

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				this.attributes.push(item[attribute]);
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
		const type: DataType = vertexAttribute.type;
		const value: ArrayLike<number> = vertexAttribute.value;
		const bytesPerElement: number = vertexAttribute.bytesPerElement;
		const byteLength: number = vertexAttribute.byteLength;
		const length: number = vertexAttribute.length;
		const littleEndian: boolean = vertexAttribute.littleEndian;

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

		return byteLength;
	}

	public bind(): boolean {
		let offset: number = 0;

		for (let index = 0; index < this.attributes.length; index++) {
			gl.enableVertexAttribArray(index);

			const attribute: VertexAttribute = this.attributes[index];

			gl.vertexAttribPointer(
				index,
				attribute.length,
				attribute.type,
				attribute.normalized,
				this.bytesPerElement,
				offset,
			);

			offset += attribute.byteLength;
		}

		return true;
	}

	public unbind(): boolean {
		for (let index = 0; index < this.attributes.length; index++) {
			gl.disableVertexAttribArray(index);
		}

		return true;
	}
}

export default VertexArrayBuffer;