import { Bindable } from '../../Core';
import { Indexable } from '../../Core/Helpers';
import Storage from '../../Core/Helpers/Storage';
import Context from '../Context';
import Shader from '../Shader';
import DataType from './DataType';
import VertexAttribute from './VertexAttribute';

class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
	private readonly stride: number;
	private readonly attributes: Storage<VertexAttribute>;
	private readonly view: DataView;
	private readonly indices: Storage<number>;

	private readonly log: Indexable<string>;

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
		this.attributes = new Storage<VertexAttribute>();
		this.indices = new Storage<number>();
		this.log = {};

		for (let attribute in item) {
			if (item.hasOwnProperty(attribute)) {
				this.attributes.set(attribute, item[attribute] as VertexAttribute);
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
		const shader: Shader = Shader.bound as Shader;

		if (!shader) {
			return false;
		}

		let offset: number = 0;

		for (let [name, attribute] of this.attributes) {
			const index: number = shader.variant.attributes.get(name) as number;

			if (index === undefined) {
				this.logAttributeNotFound(name);
			} else {
				this.indices.set(name, index);

				Context.enableVertexAttribArray(index);

				Context.vertexAttribPointer(
					index,
					attribute.length,
					attribute.type,
					attribute.normalized,
					this.stride,
					offset,
				);
			}

			offset += attribute.stride;
		}

		return true;
	}

	private logAttributeNotFound(name: string): void {
		if (name in this.log) {
			return;
		}

		const log: string = `VertexArrayBuffer: attribute ${ name } not found`;

		console.warn(log);

		this.log[name] = log;
	}

	public unbind(): boolean {
		this.indices.forEach((index) => Context.disableVertexAttribArray(index));
		this.indices.clear();

		return true;
	}
}

export default VertexArrayBuffer;