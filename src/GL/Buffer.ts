import Drawable, { PrimitiveType } from './Helpers/Drawable';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';

export enum BufferType {
	Array = 34962, // GL_ARRAY_BUFFER
	ElementArray = 34963
}

abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
	public name: string = 'Buffer';

	protected readonly data: T;
	private readonly target: BufferType;
	public readonly length: number;

	protected get identifier(): string {
		return 'Buffer';
	}

	protected constructor(target: BufferType, data: T, length: number) {
		super(() => GL.createBuffer(), (handle) => GL.bindBuffer(target, handle), (handle) => GL.deleteBuffer(handle));

		this.target = target;
		this.data = data;
		this.length = length;

		this.apply();
	}

	public apply(): void {
		this.bind();

		GL.bufferData(this.target, this.data, GL.STATIC_DRAW);
	}

	public abstract draw(type: PrimitiveType): void;
}

export default Buffer;