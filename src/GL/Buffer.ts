import Drawable from '../Helpers/Drawable';
import BindableObject from '../Helpers/BindableObject';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import PrimitiveType from './Helpers/PrimitiveType';
import gl from './index';

export enum BufferTarget {
	ElementArray = gl.ELEMENT_ARRAY_BUFFER,
	Array = gl.ARRAY_BUFFER
}

export enum BufferUsage {
	Static = gl.STATIC_DRAW,
	Dynamic = gl.DYNAMIC_DRAW
}

abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
	protected readonly data: T;
	private readonly target: BufferTarget;
	private readonly usage: BufferUsage;
	public readonly length: number;

	public static get bound(): Null<Buffer<ArrayBuffer>> {
		return BindableObject.map.get('buffer') as Null<Buffer<ArrayBuffer>>;
	}

	protected constructor(target: BufferTarget, data: T, length: number, usage: BufferUsage = BufferUsage.Static) {
		super(gl.createBuffer, (handle) => gl.bindBuffer(target, handle), gl.deleteBuffer);

		this.target = target;
		this.data = data;
		this.length = length;
		this.usage = usage;

		this.apply();
		this.unbind();
	}

	public apply(): void {
		this.bind();

		gl.bufferData(this.target, this.data, this.usage);
	}

	public static unbind(type: BufferTarget): void {
		gl.bindBuffer(type, null);
	}

	public abstract draw(type: PrimitiveType): void;
}

export default Buffer;